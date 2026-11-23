import type { Lesson } from "@/lib/types";

// Une líneas de código sin tener que escapar backticks ni `${}` dentro de template literals.
const L = (...lines: string[]) => lines.join("\n");

// Contenido validado contra fuentes actuales en noviembre de 2026 (ver sección "Fuentes").
export const day29: Lesson = {
  day: 29,
  slug: "objeto-math-redondeo-y-azar",
  title: "Objeto Math: round, floor, ceil y random",
  section: "Objetos nativos y utilidades",
  estimatedMinutes: 75,
  icon: "🧰",
  objectives: [
    "Explicar qué es el objeto `Math` y por qué no se usa con `new`",
    "Elegir entre `ceil`, `floor`, `round` y `trunc`, también con números negativos",
    "Calcular valores absolutos, signos, potencias, raíces, mínimos y máximos",
    "Generar enteros aleatorios dentro de un rango sin sesgo, y saber cuándo `Math.random` no es suficiente",
    "Entender los límites de los decimales y redondear con cuidado",
    "Usar las funciones trigonométricas y logarítmicas con ángulos en radianes",
  ],
  blocks: [
    // ───────────────────────── Apertura ─────────────────────────
    {
      type: "paragraph",
      text:
        "Después de `console` y `Date`, otro objeto nativo que aparece en casi todos los proyectos: `Math`. Reúne constantes matemáticas y funciones para redondear, calcular potencias y raíces, encontrar mínimos y máximos, generar números aleatorios y hacer trigonometría. Es la caja de herramientas de cualquier cálculo que vaya más allá de sumar y restar. En esta lección verás las más usadas, con las trampas que conviene conocer: el redondeo de negativos, el sesgo al generar enteros aleatorios y los errores de los decimales.",
    },
    {
      type: "keyFacts",
      items: [
        { value: "Math.round / floor / ceil", label: "Redondean al entero más cercano, hacia abajo o hacia arriba" },
        { value: "Math.random()", label: "Un decimal de 0 hasta casi 1: nunca llega a 1" },
        { value: "Math.max / min", label: "Reciben valores sueltos; con un arreglo, se usa el spread" },
        { value: "Radianes", label: "Las funciones trigonométricas no usan grados" },
        { value: "No es un constructor", label: "Todo es estático: se usa como Math.algo" },
        { value: "Solo Number", label: "Math no funciona con BigInt" },
      ],
    },
    {
      type: "callout",
      variant: "success",
      text:
        "Contenido verificado en noviembre de 2026 con MDN Web Docs (`Math`, `round`, `random`, `max`, `pow`, `sin` y `Crypto.getRandomValues`). Los resultados de los ejemplos se comprobaron ejecutándolos. Al final hay una tabla con datos que suelen aparecer desactualizados y la lista de fuentes.",
    },

    // ───────────────────────── Qué es ─────────────────────────
    { type: "heading", level: 2, text: "Math: un objeto de utilidades" },
    {
      type: "paragraph",
      text:
        "`Math` es un objeto, no una función ni un constructor. MDN lo describe como un objeto de espacio de nombres con propiedades y métodos estáticos: no se crea con `new`, no se puede invocar como `Math()`, y todo lo que tiene se usa directamente, como `Math.round(7.5)` o `Math.PI`. Sus constantes se escriben en mayúsculas porque son valores fijos que no se pueden modificar: `Math.PI`, `Math.E`, `Math.SQRT2` y otras. Si imprimes el objeto en la consola de un navegador verás todos sus métodos, aunque no aparezcan al listarlo con `Object.keys`, porque no son enumerables. Hay dos límites que conviene tener presentes desde el principio: `Math` trabaja con el tipo `Number` y no admite `BigInt`, y varias de sus funciones tienen una precisión que depende de la implementación, así que navegadores distintos pueden devolver resultados con diferencias minúsculas.",
    },
    {
      type: "image",
      src: "/img/dia-29/mapa-de-math.svg",
      alt: "Ocho grupos de miembros del objeto Math. Constantes: PI, E, SQRT2, SQRT1_2, LN2, LN10, LOG2E y LOG10E. Redondeo: ceil, floor, round y trunc. Signo y valor: abs y sign. Potencias y raíces: pow, sqrt, cbrt, hypot y exp. Comparar: min y max. Azar: random, que no sirve para seguridad. Trigonometría, con ángulos en radianes: sin, cos, tan, asin, acos, atan y atan2. Logaritmos: log, log2 y log10.",
      caption: "Los miembros de Math, por familias.",
    },
    {
      type: "playground",
      title: "Experimento 1 · Math es un objeto de constantes y funciones",
      description: "`new Math()` y `Math()` fallan. Las constantes no se pueden modificar: en modo estricto, intentarlo lanza un error. `toFixed` se usa para mostrar solo seis decimales.",
      code: L(
        "// Math es un objeto, no un constructor ni una función",
        "console.log(typeof Math, Object.prototype.toString.call(Math));",
        "try {",
        "  new Math();",
        "} catch (e) {",
        "  console.log(\"new Math() →\", e.name);",
        "}",
        "try {",
        "  Math();",
        "} catch (e) {",
        "  console.log(\"Math() →\", e.name);",
        "}",
        "",
        "// Las constantes se escriben en mayúsculas: no cambian",
        "console.log(Math.PI);",
        "console.log(Math.E);",
        "console.log(Math.SQRT2.toFixed(6), Math.SQRT1_2.toFixed(6));",
        "console.log(Math.LN2.toFixed(6), Math.LN10.toFixed(6));",
        "console.log(Math.LOG2E.toFixed(6), Math.LOG10E.toFixed(6));",
        "",
        "// No se pueden modificar: en modo estricto, intentarlo lanza un error",
        "const intentar = new Function('\"use strict\"; Math.PI = 3;');",
        "try {",
        "  intentar();",
        "} catch (e) {",
        "  console.log(\"Math.PI = 3 →\", e.name);",
        "}",
        "",
        "// Sus métodos no aparecen al listar el objeto, aunque existen",
        "console.log(Object.keys(Math).length, typeof Math.round);",
      ),
      expected: L(
        "object [object Math]",
        "new Math() → TypeError",
        "Math() → TypeError",
        "3.141592653589793",
        "2.718281828459045",
        "1.414214 0.707107",
        "0.693147 2.302585",
        "1.442695 0.434294",
        "Math.PI = 3 → TypeError",
        "0 function",
      ),
    },

    // ───────────────────────── Redondeo ─────────────────────────
    { type: "heading", level: 2, text: "Redondear: ceil, floor, round y trunc" },
    {
      type: "paragraph",
      text:
        "Hay cuatro formas de convertir un decimal en entero. `Math.ceil` («techo») sube siempre al entero siguiente. `Math.floor` («piso») baja siempre al entero anterior. `Math.round` va al entero más cercano. Y `Math.trunc` simplemente quita los decimales. Con números positivos, `floor` y `trunc` dan lo mismo. Con negativos no: `floor(-7.2)` es `-8`, porque baja, mientras que `trunc(-7.2)` es `-7`, porque solo quita los decimales. Y hay una regla de `round` que sorprende: cuando la parte decimal es exactamente `.5`, redondea hacia más infinito. Por eso `Math.round(7.5)` es `8`, pero `Math.round(-7.5)` es `-7`, y no `-8`, como podría esperarse.",
    },
    {
      type: "image",
      src: "/img/dia-29/redondeo.svg",
      alt: "Tabla con el resultado de Math.ceil, Math.floor, Math.round y Math.trunc para seis números. Con 7.2: ceil 8, floor 7, round 7, trunc 7. Con 7.5: 8, 7, 8, 7. Con 7.8: 8, 7, 8, 7. Con menos 7.2: ceil menos 7, floor menos 8, round menos 7, trunc menos 7. Con menos 7.5: menos 7, menos 8, menos 7, menos 7. Con menos 7.8: menos 7, menos 8, menos 8, menos 7. Con negativos, floor baja y trunc solo quita los decimales. Un .5 exacto sube hacia más infinito: round de 7.5 es 8 y round de menos 7.5 es menos 7.",
      caption: "El mismo número, cuatro redondeos: los negativos cambian el resultado.",
    },
    {
      type: "playground",
      title: "Experimento 2 · Los cuatro redondeos con positivos y negativos",
      description: "La primera línea es un encabezado. Mira las filas negativas: `floor` y `trunc` ya no coinciden, y `round(-7.5)` es `-7`. `Math.abs` devuelve la cantidad sin el signo.",
      code: L(
        "console.log(\"n    ceil floor round trunc\");",
        "for (const n of [7.2, 7.5, 7.8, -7.2, -7.5, -7.8]) {",
        "  console.log(n, Math.ceil(n), Math.floor(n), Math.round(n), Math.trunc(n));",
        "}",
        "",
        "// Valor absoluto: la cantidad sin el signo",
        "console.log(Math.abs(-7.8), Math.abs(7.8), Math.abs(0));",
        "",
        "// Quedarse con la parte entera",
        "console.log(Math.trunc(9.99), Math.trunc(-9.99), parseInt(\"9.99\"));",
      ),
      expected: L(
        "n    ceil floor round trunc",
        "7.2 8 7 7 7",
        "7.5 8 7 8 7",
        "7.8 8 7 8 7",
        "-7.2 -7 -8 -7 -7",
        "-7.5 -7 -8 -7 -7",
        "-7.8 -7 -8 -8 -7",
        "7.8 7.8 0",
        "9 -9 9",
      ),
    },

    // ───────────────────────── Potencias ─────────────────────────
    { type: "heading", level: 2, text: "Potencias, raíces y signo" },
    {
      type: "paragraph",
      text:
        "`Math.pow(base, exponente)` calcula una potencia: `Math.pow(2, 5)` es `32`. Desde ECMAScript 2016 existe también el operador `**`, y MDN indica que `Math.pow` es equivalente, salvo que solo acepta números. `Math.sqrt` calcula la raíz cuadrada y `Math.cbrt` la cúbica, que sí acepta negativos: `Math.cbrt(-8)` es `-2`. La raíz cuadrada de un negativo no existe entre los reales y da `NaN`. `Math.hypot(a, b)` devuelve la raíz de la suma de los cuadrados, es decir, la hipotenusa de un triángulo rectángulo, que sirve para calcular distancias. `Math.sign` informa del signo: `-1` si es negativo, `1` si es positivo y `0` si es cero. Con un valor que no es un número da `NaN`.",
    },
    {
      type: "playground",
      title: "Experimento 3 · Potencias, raíces, hipotenusa y signo",
      description: "`Math.pow(-8, 1 / 3)` da `NaN`, porque una base negativa con exponente fraccionario no está definida. Para la raíz cúbica de un negativo se usa `cbrt`.",
      code: L(
        "// Potencias y raíces",
        "console.log(Math.pow(2, 5), 2 ** 5);",
        "console.log(Math.sqrt(81), Math.sqrt(2).toFixed(4));",
        "console.log(Math.cbrt(27), Math.cbrt(-8));",
        "console.log(Math.sqrt(-1), Math.pow(-8, 1 / 3));",
        "",
        "// Hipotenusa: la distancia en línea recta",
        "console.log(Math.hypot(3, 4));",
        "console.log(Math.hypot(5, 12));",
        "",
        "// Signo: -1, 0 o 1",
        "console.log(Math.sign(-7.8), Math.sign(0), Math.sign(0.3), Math.sign(6.9));",
        "console.log(Math.sign(\"abc\"));",
      ),
      expected: L(
        "32 32",
        "9 1.4142",
        "3 -2",
        "NaN NaN",
        "5",
        "13",
        "-1 0 1 1",
        "NaN",
      ),
    },

    // ───────────────────────── Min / max ─────────────────────────
    { type: "heading", level: 2, text: "Mínimo y máximo" },
    {
      type: "paragraph",
      text:
        "`Math.max` y `Math.min` devuelven el mayor y el menor de los valores que reciben. Reciben los valores sueltos, no un arreglo: para usarlos con un arreglo hay que expandirlo con el operador spread, `Math.max(...notas)`, que ya conoces. Si le pasas el arreglo directamente, JavaScript intenta convertirlo en número y el resultado es `NaN`. Sin argumentos, `Math.max()` da `-Infinity` y `Math.min()` da `Infinity`, y cualquier valor que no sea un número convierte el resultado en `NaN`. MDN advierte además de que el spread falla o da un resultado erróneo con arreglos de muchísimos elementos, así que para listas muy grandes se usa `reduce`. Combinando los dos, se escribe una utilidad muy común: acotar un valor entre un mínimo y un máximo.",
    },
    {
      type: "playground",
      title: "Experimento 4 · max, min, spread y acotar",
      description: "`acotar` fuerza un valor a quedar dentro de un rango. Observa los tres casos: por encima, por debajo y dentro del rango.",
      code: L(
        "console.log(Math.max(3, 9, 4), Math.min(3, 9, 4));",
        "",
        "// Con un arreglo, se expande con el operador spread",
        "const notas = [6.5, 9.2, 4.8, 8];",
        "console.log(Math.max(...notas), Math.min(...notas));",
        "console.log(Math.max(notas));",
        "",
        "// Sin argumentos, los valores neutros son infinitos",
        "console.log(Math.max(), Math.min());",
        "",
        "// Un valor que no es número da NaN",
        "console.log(Math.max(1, \"dos\", 3));",
        "",
        "// Acotar un valor a un rango",
        "function acotar(valor, minimo, maximo) {",
        "  return Math.min(Math.max(valor, minimo), maximo);",
        "}",
        "console.log(acotar(150, 0, 100), acotar(-20, 0, 100), acotar(42, 0, 100));",
      ),
      expected: L(
        "9 3",
        "9.2 4.8",
        "NaN",
        "-Infinity Infinity",
        "NaN",
        "100 0 42",
      ),
    },

    // ───────────────────────── Random ─────────────────────────
    { type: "heading", level: 2, text: "Números aleatorios con Math.random" },
    {
      type: "paragraph",
      text:
        "`Math.random()` devuelve un decimal mayor o igual que 0 y menor que 1, con distribución aproximadamente uniforme. Nunca devuelve 1. Para obtener otros rangos hay que escalarlo. Para un entero entre `min` y `max`, ambos incluidos, la fórmula es `Math.floor(Math.random() * (max - min + 1)) + min`: se multiplica por el tamaño del rango, se quitan los decimales con `floor` y se desplaza al mínimo. Es tentador usar `Math.round`, y es un error clásico: con `round`, el primer y el último valor solo salen la mitad de veces que los intermedios, porque reciben la mitad de intervalo. En una rifa de 0 a 1000, los números 0 y 1000 tendrían la mitad de probabilidades que cualquier otro.",
    },
    {
      type: "image",
      src: "/img/dia-29/azar-en-un-rango.svg",
      alt: "Para obtener un entero aleatorio entre 1 y 6, ambos incluidos, se multiplica Math.random por 6, se aplica Math.floor y se suma 1. Con 0.83, el resultado es 4.98, luego 4 y luego 5. Debajo se comparan dos conversiones al recorrer 6000 valores uniformes. Con Math.round de r por 3, los valores 0 y 3 salen 1000 veces y los valores 1 y 2 salen 2000 veces: los extremos salen la mitad. Con Math.floor de r por 4, los cuatro valores salen 1500 veces cada uno: reparto parejo.",
      caption: "Con floor el reparto es parejo; con round, los extremos salen menos.",
    },
    {
      type: "callout",
      variant: "warning",
      text:
        "`Math.random()` no es criptográficamente seguro. MDN lo dice de forma explícita: no lo uses para nada relacionado con seguridad, como contraseñas, tokens o códigos de verificación. Para eso existe la API Web Crypto, en concreto `crypto.getRandomValues()`. Tampoco puedes fijar su semilla para repetir una secuencia.",
    },
    {
      type: "playground",
      title: "Experimento 5 · Enteros aleatorios sin sesgo",
      description: "Para poder comprobar los resultados, las funciones aceptan el valor `r` como parámetro, con `Math.random()` como valor por defecto. La parte final recorre 6000 valores uniformes de `r` y cuenta cuántas veces sale cada entero con `round` y con `floor`.",
      code: L(
        "// Math.random() devuelve un número decimal desde 0 hasta casi 1 (nunca llega a 1)",
        "const r = Math.random();",
        "console.log(r >= 0 && r < 1, typeof r);",
        "",
        "// Entero aleatorio entre min y max, ambos incluidos.",
        "// El parámetro r permite probar la función con valores conocidos.",
        "function enteroEntre(min, max, r = Math.random()) {",
        "  return Math.floor(r * (max - min + 1)) + min;",
        "}",
        "console.log(enteroEntre(1, 6, 0), enteroEntre(1, 6, 0.5), enteroEntre(1, 6, 0.999999));",
        "",
        "// Elegir un elemento al azar de un arreglo",
        "function elegir(lista, r = Math.random()) {",
        "  return lista[Math.floor(r * lista.length)];",
        "}",
        "console.log(elegir([\"rojo\", \"verde\", \"azul\"], 0.1), elegir([\"rojo\", \"verde\", \"azul\"], 0.9));",
        "",
        "// Por qué NO redondear con Math.round: los extremos salen la mitad de veces.",
        "// Se recorren 6000 valores uniformes de r y se cuenta cuántos caen en 0, 1, 2 y 3.",
        "function contar(convertir) {",
        "  const cuenta = [0, 0, 0, 0];",
        "  for (let i = 0; i < 6000; i++) {",
        "    const r = (i + 0.5) / 6000;",
        "    cuenta[convertir(r)]++;",
        "  }",
        "  return cuenta.join(\" \");",
        "}",
        "console.log(\"round:\", contar((r) => Math.round(r * 3)));",
        "console.log(\"floor:\", contar((r) => Math.floor(r * 4)));",
      ),
      expected: L(
        "true number",
        "1 4 6",
        "rojo azul",
        "round: 1000 2000 2000 1000",
        "floor: 1500 1500 1500 1500",
      ),
    },

    // ───────────────────────── Decimales ─────────────────────────
    { type: "heading", level: 2, text: "Decimales y precisión" },
    {
      type: "paragraph",
      text:
        "Redondear a dos decimales con `Math.round(n * 100) / 100` es una receta muy repetida, y funciona casi siempre, pero los números decimales de JavaScript son binarios y muchos no se representan con exactitud: `0.1 + 0.2` da `0.30000000000000004`. Eso se nota al redondear: `2.345 * 100` da `234.50000000000003`, que sube a `2.35`, mientras que `1.005 * 100` da `100.49999999999999`, que baja a `1`, aunque a mano ambos valores terminan en 5. Y `toFixed`, que devuelve un texto, tampoco se libra: `(1.005).toFixed(2)` da `\"1.00\"`. Para mostrar cantidades con formato según el idioma existe `Intl.NumberFormat`. Y para dinero, la práctica más segura es trabajar en la unidad mínima, con enteros: centavos en vez de euros, y convertir al mostrar.",
    },
    {
      type: "paragraph",
      text:
        "Un último detalle sobre los tipos: `Math` convierte los textos que representan números (`Math.sqrt(\"16\")` da `4`), pero no admite `BigInt`: `Math.sqrt(16n)` lanza un `TypeError`.",
    },
    {
      type: "playground",
      title: "Experimento 6 · Redondeo a decimales, centavos y tipos",
      description: "Los resultados de `0.1 + 0.2` y de las multiplicaciones salen de cómo se representan los decimales. Las operaciones con enteros, como los centavos, son exactas.",
      code: L(
        "// Redondear a 2 decimales: la receta clásica",
        "const aDosDecimales = (n) => Math.round(n * 100) / 100;",
        "console.log(aDosDecimales(2.567), aDosDecimales(7.5));",
        "",
        "// Pero los decimales binarios no son exactos, y el resultado puede sorprender",
        "console.log(0.1 + 0.2);",
        "console.log(2.345 * 100);",
        "console.log(aDosDecimales(2.345), aDosDecimales(1.005));",
        "console.log((1.005).toFixed(2));",
        "",
        "// Con dinero, es más seguro trabajar en centavos (enteros)",
        "const precioEnCentavos = Math.round(19.99 * 100);",
        "const total = precioEnCentavos * 3;",
        "console.log(precioEnCentavos, total, (total / 100).toFixed(2));",
        "",
        "// Math solo acepta números: convierte textos, pero no admite BigInt",
        "console.log(Math.sqrt(\"16\"), Math.abs(\"-5\"), Math.round(\"2.6\"));",
        "try {",
        "  Math.sqrt(16n);",
        "} catch (e) {",
        "  console.log(\"BigInt →\", e.name);",
        "}",
      ),
      expected: L(
        "2.57 7.5",
        "0.30000000000000004",
        "234.50000000000003",
        "2.35 1",
        "1.00",
        "1999 5997 59.97",
        "4 5 3",
        "BigInt → TypeError",
      ),
    },

    // ───────────────────────── Trigonometría ─────────────────────────
    { type: "heading", level: 2, text: "Trigonometría y logaritmos" },
    {
      type: "paragraph",
      text:
        "`Math.sin`, `Math.cos`, `Math.tan` y sus inversas `asin`, `acos`, `atan` y `atan2` trabajan con ángulos en radianes, no en grados. Para convertir, se multiplica por `Math.PI` y se divide entre 180: 180 grados son `Math.PI` radianes. Es una fuente habitual de errores: `Math.sin(30)` no da `0.5`, porque el 30 se interpreta como 30 radianes. Además, el cálculo con decimales deja errores diminutos: `Math.cos(Math.PI / 2)` no es exactamente `0`, sino un número del orden de `6e-17`. Por eso, para comparar resultados de funciones matemáticas se usa un margen, y no `===`. `Math.atan2(y, x)` devuelve el ángulo de un punto respecto al eje horizontal. Y para logaritmos hay `Math.log` (natural), `Math.log2` y `Math.log10`, además de `Math.exp`.",
    },
    {
      type: "image",
      src: "/img/dia-29/grados-y-radianes.svg",
      alt: "Las funciones trigonométricas de Math reciben radianes. Radianes es grados por Math.PI entre 180, y grados es radianes por 180 entre Math.PI. Tabla: 0 grados son 0 radianes, seno 0, coseno 1. 30 grados son pi sexto, seno 0.5, coseno 0.866. 45 grados son pi cuarto, seno 0.707, coseno 0.707. 90 grados son pi medio, seno 1, coseno casi 0. 180 grados son pi, seno casi 0, coseno menos 1. 360 grados son 2 pi, seno casi 0, coseno 1. Math.sin de 30 no da 0.5 porque se toma como 30 radianes y da menos 0.988.",
      caption: "Los ángulos de Math son radianes: hay que convertir los grados.",
    },
    {
      type: "playground",
      title: "Experimento 7 · Radianes, grados y logaritmos",
      description: "Se usa `toFixed` para mostrar un número fijo de decimales y no depender de los últimos dígitos, que pueden variar entre motores. La comparación con `=== 0` falla, y la comparación con margen funciona.",
      code: L(
        "// Las funciones trigonométricas trabajan en RADIANES, no en grados",
        "function aRadianes(grados) {",
        "  return (grados * Math.PI) / 180;",
        "}",
        "function aGrados(radianes) {",
        "  return (radianes * 180) / Math.PI;",
        "}",
        "console.log(aRadianes(180) === Math.PI, aGrados(Math.PI));",
        "console.log(aRadianes(90).toFixed(4), Math.PI / 2);",
        "",
        "console.log(Math.sin(Math.PI / 2), Math.cos(Math.PI));",
        "console.log(Math.sin(aRadianes(30)).toFixed(10));",
        "console.log(Math.tan(aRadianes(45)).toFixed(10));",
        "",
        "// Los resultados con decimales pueden tener errores diminutos: compara con margen",
        "console.log(Math.cos(Math.PI / 2) === 0, Math.abs(Math.cos(Math.PI / 2)) < 1e-10);",
        "",
        "// Ángulo de un punto (x, y) respecto al eje horizontal",
        "console.log(aGrados(Math.atan2(1, 1)).toFixed(2));",
        "",
        "// Logaritmos y exponencial",
        "console.log(Math.log(Math.E), Math.log10(1000), Math.log2(8), Math.exp(0));",
      ),
      expected: L(
        "true 180",
        "1.5708 1.5707963267948966",
        "1 -1",
        "0.5000000000",
        "1.0000000000",
        "false true",
        "45.00",
        "1 3 3 1",
      ),
    },

    // ───────────────────────── Aplicaciones ─────────────────────────
    { type: "heading", level: 2, text: "Pequeños problemas reales" },
    {
      type: "paragraph",
      text:
        "Con lo que has visto se resuelven muchos problemas cotidianos. La distancia entre dos puntos es una hipotenusa. El promedio, el máximo y el mínimo de una lista salen de `reduce`, `Math.max` y `Math.min`. Un porcentaje se redondea con `Math.round`. Y para paginar resultados, `Math.ceil` indica cuántas páginas hacen falta: 53 resultados de 10 en 10 ocupan 6 páginas, porque la sexta queda incompleta. En sentido contrario, `Math.floor` da las unidades completas: 53 unidades en cajas de 10 llenan 5 cajas y sobran 3, que es el resto de la división (`%`).",
    },
    {
      type: "playground",
      title: "Experimento 8 · Distancia, promedio, porcentaje y paginación",
      description: "Cada línea resuelve un problema pequeño con una función de `Math`. Cambia los números y vuelve a ejecutar.",
      code: L(
        "// Distancia entre dos puntos",
        "function distancia(a, b) {",
        "  return Math.hypot(b.x - a.x, b.y - a.y);",
        "}",
        "console.log(distancia({ x: 1, y: 2 }, { x: 4, y: 6 }));",
        "",
        "// Promedio, máximo y mínimo de una lista",
        "const ventas = [120, 80, 150, 95];",
        "const suma = ventas.reduce((total, v) => total + v, 0);",
        "console.log(suma / ventas.length, Math.max(...ventas), Math.min(...ventas));",
        "",
        "// Porcentaje redondeado al entero más cercano",
        "const aprobados = 17;",
        "const total = 24;",
        "console.log(Math.round((aprobados / total) * 100) + \"%\");",
        "",
        "// Cuántas páginas hacen falta para mostrar 53 resultados de 10 en 10",
        "console.log(Math.ceil(53 / 10));",
        "",
        "// Cuántas cajas completas salen de 53 unidades en cajas de 10",
        "console.log(Math.floor(53 / 10), 53 % 10);",
      ),
      expected: L(
        "5",
        "111.25 150 80",
        "71%",
        "6",
        "5 3",
      ),
    },
    {
      type: "table",
      caption: "Qué función usar según lo que necesites",
      headers: ["Qué necesitas", "Función"],
      rows: [
        ["Redondear al entero más cercano", "`Math.round(n)`"],
        ["Redondear siempre hacia arriba o hacia abajo", "`Math.ceil(n)` y `Math.floor(n)`"],
        ["Quitar los decimales", "`Math.trunc(n)`"],
        ["Valor sin signo, o saber el signo", "`Math.abs(n)` y `Math.sign(n)`"],
        ["Elevar a una potencia", "`Math.pow(base, exp)` o `base ** exp`"],
        ["Raíz cuadrada y raíz cúbica", "`Math.sqrt(n)` y `Math.cbrt(n)`"],
        ["Distancia o hipotenusa", "`Math.hypot(a, b)`"],
        ["El mayor y el menor de una lista", "`Math.max(...lista)` y `Math.min(...lista)`"],
        ["Un entero aleatorio entre min y max", "`Math.floor(Math.random() * (max - min + 1)) + min`"],
        ["Un elemento al azar de un arreglo", "`lista[Math.floor(Math.random() * lista.length)]`"],
        ["Aleatoriedad para seguridad", "`crypto.getRandomValues()`, nunca `Math.random()`"],
        ["Pasar de grados a radianes", "`(grados * Math.PI) / 180`"],
      ],
    },

    // ───────────────────────── Datos que cambian ─────────────────────────
    { type: "heading", level: 2, text: "Datos que suelen aparecer desactualizados" },
    {
      type: "table",
      caption: "Material antiguo frente a información verificada",
      headers: ["Suele decirse", "Información verificada"],
      rows: [
        [
          "`Math` es un prototipo o una clase que se puede instanciar.",
          "Es un objeto de espacio de nombres: no es un constructor, no se usa con `new` ni se invoca como función, y todo lo que contiene es estático.",
        ],
        [
          "`Math.round` siempre redondea el .5 hacia arriba, o alejándose del cero.",
          "Con un .5 exacto redondea hacia +∞: `Math.round(7.5)` es 8, y `Math.round(-7.5)` es -7.",
        ],
        [
          "`floor` y `trunc` hacen lo mismo.",
          "Solo con positivos. Con negativos, `floor(-7.2)` es -8 y `trunc(-7.2)` es -7.",
        ],
        [
          "`Math.round(Math.random() * 1000)` da un entero equiprobable entre 0 y 1000.",
          "Los extremos, 0 y 1000, salen la mitad de veces que el resto. La fórmula correcta usa `floor` y suma uno al tamaño del rango.",
        ],
        [
          "`Math.random()` puede devolver 1.",
          "Devuelve un valor mayor o igual que 0 y menor que 1: nunca llega a 1.",
        ],
        [
          "`Math.random()` sirve para generar contraseñas o tokens.",
          "No es criptográficamente seguro. MDN indica usar `crypto.getRandomValues()` para cualquier cosa relacionada con seguridad.",
        ],
        [
          "`Math.max(lista)` funciona con un arreglo.",
          "Recibe valores sueltos. Con un arreglo hay que expandirlo, `Math.max(...lista)`; sin spread, el resultado es `NaN`.",
        ],
        [
          "`Math.pow` es la única forma de elevar a una potencia.",
          "El operador `**` hace lo mismo, y MDN lo describe como equivalente, salvo que `pow` solo acepta números.",
        ],
        [
          "`Math.sin` y compañía reciben grados.",
          "Reciben radianes. 180 grados son `Math.PI` radianes.",
        ],
        [
          "`Math.round(n * 100) / 100` siempre redondea como se espera.",
          "Los decimales binarios no son exactos: `1.005` se redondea a 1 y no a 1.01. Para dinero se trabaja en centavos enteros.",
        ],
        [
          "`Math` funciona con cualquier tipo numérico.",
          "Solo con `Number`. Con `BigInt`, como `Math.sqrt(16n)`, lanza un `TypeError`.",
        ],
        [
          "Las funciones de `Math` devuelven siempre el mismo resultado en todos los navegadores.",
          "MDN indica que muchas tienen una precisión que depende de la implementación, así que pueden variar en los últimos dígitos.",
        ],
      ],
    },

    // ───────────────────────── FAQ ─────────────────────────
    {
      type: "accordion",
      title: "Preguntas frecuentes de esta lección",
      items: [
        {
          title: "¿Cómo obtengo un entero aleatorio entre 1 y 100?",
          text:
            "Con `Math.floor(Math.random() * 100) + 1`. Es la fórmula general con `min` igual a 1 y `max` igual a 100: el tamaño del rango es 100.",
        },
        {
          title: "¿Puedo fijar la semilla de Math.random para repetir la misma secuencia?",
          text:
            "No: MDN indica que la implementación elige la semilla y que no se puede escoger ni reiniciar. Si necesitas resultados repetibles, por ejemplo en pruebas, inyecta el valor aleatorio como parámetro, como en el experimento 5.",
        },
        {
          title: "¿Cuál es la diferencia entre Math.round y toFixed?",
          text:
            "`Math.round` devuelve un número entero. `toFixed(n)` devuelve un texto con `n` decimales, y por eso no conviene para seguir calculando. Ninguno de los dos corrige los errores de representación de los decimales.",
        },
        {
          title: "¿Por qué Math.max() sin argumentos devuelve -Infinity?",
          text:
            "Porque es el valor neutro del máximo: cualquier número es mayor que -Infinity. Igual que `Math.min()` devuelve `Infinity`.",
        },
        {
          title: "¿Qué hago con listas enormes en Math.max(...lista)?",
          text:
            "MDN advierte de que el spread falla o da un resultado erróneo con arreglos de muchísimos elementos. En ese caso, usa `lista.reduce((mayor, valor) => Math.max(mayor, valor), -Infinity)`.",
        },
        {
          title: "¿Cómo elijo un elemento al azar de un arreglo?",
          text:
            "Con `lista[Math.floor(Math.random() * lista.length)]`. Es la misma fórmula del entero aleatorio, con el rango de las posiciones del arreglo: de 0 a `lista.length - 1`.",
        },
      ],
    },

    // ───────────────────────── Cierre ─────────────────────────
    { type: "heading", level: 2, text: "Cierre" },
    {
      type: "paragraph",
      text:
        "`Math` es un objeto de utilidades estáticas. Con `ceil`, `floor`, `round` y `trunc` controlas el redondeo, sabiendo que los negativos se comportan distinto. `max` y `min` necesitan el spread con arreglos. Para enteros aleatorios, la fórmula con `floor` evita el sesgo, y `Math.random` nunca debe usarse para seguridad. Los decimales son aproximados, y los ángulos van en radianes. En la próxima lección vemos el operador de cortocircuito, `||` y `&&`, que permite escribir condiciones y valores por defecto de forma muy compacta.",
    },
    {
      type: "checklist",
      title: "Antes de pasar al Día 30, verifica que puedes explicar…",
      items: [
        "Por qué `new Math()` falla y qué significa que todo en `Math` sea estático.",
        "Qué diferencia hay entre `ceil`, `floor`, `round` y `trunc`, también con negativos.",
        "Por qué `Math.round(-7.5)` es `-7`.",
        "Cómo se calculan potencias, raíces y la hipotenusa.",
        "Cómo se usa `Math.max` con un arreglo, y qué pasa sin spread.",
        "Qué devuelve `Math.random()` y por qué nunca llega a 1.",
        "Cómo se obtiene un entero aleatorio entre `min` y `max` sin sesgo.",
        "Por qué `Math.random` no sirve para contraseñas ni tokens.",
        "Por qué `Math.round(1.005 * 100) / 100` da 1, y cómo se trabaja con dinero.",
        "En qué unidad trabajan `Math.sin` y `Math.cos`, y cómo se convierten los grados.",
        "Por qué no se compara el resultado de una función trigonométrica con `===`.",
      ],
    },
    { type: "heading", level: 3, text: "Fuentes consultadas (noviembre de 2026)" },
    {
      type: "list",
      items: [
        "[MDN: Math](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math)",
        "[MDN: Math.round()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round)",
        "[MDN: Math.trunc()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/trunc)",
        "[MDN: Math.sign()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sign)",
        "[MDN: Math.pow()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/pow)",
        "[MDN: Math.cbrt()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/cbrt)",
        "[MDN: Math.hypot()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/hypot)",
        "[MDN: Math.max()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/max)",
        "[MDN: Math.random()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random)",
        "[MDN: Math.sin()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sin)",
        "[MDN: Math.PI](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/PI)",
        "[MDN: Crypto.getRandomValues()](https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues)",
      ],
    },
  ],
  selfCheck: [
    {
      question: "¿Qué ocurre al ejecutar `new Math()`?",
      options: [
        "Crea un objeto Math nuevo",
        "Lanza un `TypeError`, porque Math no es un constructor",
        "Devuelve `undefined`",
        "Devuelve el número pi",
      ],
      correctIndex: 1,
      explanation:
        "Math es un objeto de espacio de nombres con miembros estáticos: no se instancia ni se invoca como función.",
    },
    {
      question: "¿Cuál es el resultado de `Math.floor(-7.2)`?",
      options: ["`-7`", "`-8`", "`7`", "`-7.2`"],
      correctIndex: 1,
      explanation:
        "`floor` baja siempre al entero anterior, y el entero anterior a -7.2 es -8. Para quitar los decimales sin bajar, se usa `Math.trunc`, que da -7.",
    },
    {
      question: "¿Qué devuelve `Math.round(-7.5)`?",
      options: ["`-8`", "`-7`", "`7`", "`-7.5`"],
      correctIndex: 1,
      explanation:
        "Un .5 exacto se redondea hacia +∞, así que -7.5 pasa a -7. En cambio, `Math.round(7.5)` es 8.",
    },
    {
      question: "¿Cómo se obtiene el mayor valor de un arreglo `notas`?",
      options: [
        "`Math.max(notas)`",
        "`Math.max(...notas)`",
        "`Math.max.notas()`",
        "`notas.Math.max()`",
      ],
      correctIndex: 1,
      explanation:
        "`Math.max` recibe valores sueltos. Con el spread se expande el arreglo; sin él, el arreglo se convierte en número y el resultado es `NaN`.",
    },
    {
      question: "¿Qué rango tiene `Math.random()`?",
      options: [
        "De 0 a 1, ambos incluidos",
        "De 0, incluido, a 1, excluido",
        "De 1 a 100",
        "De -1 a 1",
      ],
      correctIndex: 1,
      explanation:
        "Devuelve un valor mayor o igual que 0 y menor que 1: nunca llega a 1.",
    },
    {
      question: "¿Cuál es la fórmula correcta para un entero aleatorio entre `min` y `max`, ambos incluidos?",
      options: [
        "`Math.round(Math.random() * max)`",
        "`Math.floor(Math.random() * (max - min + 1)) + min`",
        "`Math.random() * (max - min) + min`",
        "`Math.ceil(Math.random() * max) - min`",
      ],
      correctIndex: 1,
      explanation:
        "Se escala al tamaño del rango, se quitan los decimales con `floor` y se desplaza al mínimo. Con `round`, los extremos saldrían la mitad de veces.",
    },
    {
      question: "¿Para qué NO debe usarse `Math.random()`?",
      options: [
        "Para elegir un elemento al azar en un juego",
        "Para generar contraseñas o tokens de seguridad",
        "Para barajar una lista de reproducción",
        "Para simular un dado",
      ],
      correctIndex: 1,
      explanation:
        "No es criptográficamente seguro. Para seguridad se usa `crypto.getRandomValues()`.",
    },
    {
      question: "¿En qué unidad reciben el ángulo `Math.sin` y `Math.cos`?",
      options: ["Grados", "Radianes", "Gradianes", "Minutos de arco"],
      correctIndex: 1,
      explanation:
        "Trabajan en radianes. Para convertir grados, se multiplica por `Math.PI` y se divide entre 180.",
    },
    {
      question: "¿Qué ocurre con `Math.sqrt(16n)`, donde `16n` es un BigInt?",
      options: [
        "Devuelve `4n`",
        "Devuelve `4`",
        "Lanza un `TypeError`, porque Math no admite BigInt",
        "Devuelve `NaN`",
      ],
      correctIndex: 2,
      explanation:
        "Math trabaja con el tipo Number. Con BigInt se produce un `TypeError`.",
    },
    {
      question: "Quieres mostrar 53 resultados de 10 en 10. ¿Cuántas páginas necesitas y con qué función se calcula?",
      options: [
        "5, con `Math.floor`",
        "6, con `Math.ceil`",
        "5.3, con `Math.round`",
        "6, con `Math.trunc`",
      ],
      correctIndex: 1,
      explanation:
        "`Math.ceil(53 / 10)` es 6: la sexta página queda incompleta, pero hace falta.",
    },
  ],
};
