import type { Lesson } from "@/lib/types";

// Une líneas de código sin tener que escapar backticks ni `${}` dentro de template literals.
const L = (...lines: string[]) => lines.join("\n");

// Contenido validado contra fuentes actuales en noviembre de 2026 (ver sección "Fuentes").
export const day16: Lesson = {
  day: 16,
  slug: "ciclos-while-do-while-for-in-of",
  title: "Ciclos: while, do...while, for, for...in y for...of",
  section: "Control de flujo",
  estimatedMinutes: 90,
  icon: "🔁",
  objectives: [
    "Explicar qué es un ciclo (o bucle), qué es una iteración y por qué toda repetición necesita algo que cambie la condición",
    "Escribir ciclos `while` y `do...while`, y explicar en qué momento evalúa cada uno su condición",
    "Reconocer y evitar un bucle infinito",
    "Escribir un `for` con sus tres partes y recorrer un arreglo con un límite dinámico",
    "Distinguir `for...in` (claves de un objeto) de `for...of` (valores de un iterable) y elegir el ciclo adecuado",
  ],
  blocks: [
    // ───────────────────────── Apertura ─────────────────────────
    {
      type: "paragraph",
      text:
        "En la lección anterior viste las estructuras condicionales, que deciden qué camino sigue un programa. Ahora vemos las estructuras repetitivas, también llamadas ciclos o bucles: permiten ejecutar un bloque de código varias veces sin copiarlo y pegarlo. Con ellas puedes recorrer un arreglo, repetir una tarea hasta que se cumpla una condición o construir una lista de elementos a partir de datos.",
    },
    {
      type: "keyFacts",
      items: [
        { value: "while", label: "Repite mientras la condición sea verdadera; la evalúa antes de cada vuelta" },
        { value: "do...while", label: "Ejecuta el cuerpo y después evalúa; corre al menos una vez" },
        { value: "for", label: "Inicialización, condición y actualización en una sola línea" },
        { value: "for...in", label: "Recorre las claves enumerables de un objeto" },
        { value: "for...of", label: "Recorre los valores de un iterable: arreglos, textos, Map y Set" },
        { value: "Iteración", label: "Cada vuelta que da un ciclo" },
      ],
    },
    {
      type: "callout",
      variant: "success",
      text:
        "Contenido verificado en noviembre de 2026 con MDN Web Docs (guía de bucles e iteración, y las páginas de `while`, `do...while`, `for`, `for...in` y `for...of`) y con la documentación de ESLint. Los resultados de los ejemplos se comprobaron ejecutándolos. Al final hay una tabla con datos que suelen aparecer desactualizados y la lista de fuentes.",
    },

    // ───────────────────────── Qué es un ciclo ─────────────────────────
    { type: "heading", level: 2, text: "Qué es un ciclo y para qué sirve" },
    {
      type: "paragraph",
      text:
        "Un ciclo ejecuta unas líneas de código una y otra vez hasta que se cumple (o deja de cumplirse) una condición. Cada pasada completa por el cuerpo del ciclo se llama iteración. Para que el ciclo termine, algo tiene que cambiar entre una iteración y la siguiente: normalmente una variable que se incrementa (suma 1) o se decrementa (resta 1) hasta llegar al valor deseado.",
    },
    {
      type: "paragraph",
      text:
        "Un ejemplo muy práctico: imagina que una aplicación recibe de una API la lista de compras de un usuario en una tienda en línea. Si el usuario hizo diez compras, la interfaz debe mostrar diez tarjetas de producto. En lugar de escribir el mismo código diez veces, se recorre la lista y, por cada elemento, se construye una tarjeta. Ese proceso repetitivo es exactamente lo que resuelve un ciclo, y si mañana la lista tiene veinte compras, el mismo código sigue funcionando.",
    },
    {
      type: "paragraph",
      text:
        "En esta lección vemos cinco formas de escribir un ciclo: `while`, `do...while`, `for`, y las dos variantes de `for` que llegaron después, `for...in` y `for...of`.",
    },
    {
      type: "callout",
      variant: "info",
      text:
        "A veces se dice que `while` y `do...while` están «obsoletos». No lo están: son parte del lenguaje y son la herramienta adecuada cuando no sabes de antemano cuántas vueltas habrá. Lo que sí es cierto es que, para recorrer colecciones, hoy se usan más `for...of` y los métodos de los arreglos (como `forEach`), que son más declarativos: describen qué quieres hacer con cada elemento y no cómo llevar la cuenta. JavaScript admite varios estilos de programación, y conviene conocer los dos.",
    },

    // ───────────────────────── while ─────────────────────────
    { type: "heading", level: 2, text: "while: repite mientras la condición sea verdadera" },
    {
      type: "paragraph",
      text:
        "`while` significa «mientras». Se escribe la palabra `while`, entre paréntesis la condición y entre llaves el cuerpo. Antes de cada vuelta, JavaScript evalúa la condición: si es verdadera, ejecuta el cuerpo y vuelve a preguntar; si es falsa, sale del ciclo. Como la variable de control se declara fuera del ciclo, también hay que cambiarla dentro de él.",
    },
    {
      type: "code",
      lang: "js",
      title: "Forma básica de while",
      code: L(
        "let contador = 0;          // 1. variable de control, fuera del ciclo",
        "",
        "while (contador < 10) {    // 2. condición, se evalúa antes de cada vuelta",
        "  console.log(contador);   // 3. cuerpo",
        "  contador++;              // 4. cambio: acerca la variable al final",
        "}",
      ),
    },
    {
      type: "playground",
      title: "Experimento 1 · Contar del 0 al 9 con while",
      description: "Reunimos los valores en un arreglo para verlos en una sola línea. Al salir, el contador vale 10, no 9.",
      code: L(
        "let contador = 0;",
        "const vistos = [];",
        "",
        "while (contador < 10) {",
        "  vistos.push(contador);",
        "  contador++;",
        "}",
        "",
        'console.log(vistos.join(" "));',
        'console.log("al salir, contador vale", contador);',
      ),
      expected: L("0 1 2 3 4 5 6 7 8 9", "al salir, contador vale 10"),
    },
    { type: "heading", level: 3, text: "El peligro del bucle infinito" },
    {
      type: "paragraph",
      text:
        "Si en el cuerpo del ciclo no hay nada que acerque la variable al final, la condición nunca se vuelve falsa y el ciclo no termina jamás. Es un bucle infinito. Si en el ejemplo anterior olvidas `contador++`, `contador` valdrá siempre 0, la condición `0 < 10` será siempre verdadera y el programa imprimirá 0 sin parar. Por eso es importante que cada iteración incluya un incremento o un decremento, los operadores que viste en la lección de operadores.",
    },
    {
      type: "image",
      src: "/img/dia-16/bucle-infinito.svg",
      alt: "A la izquierda, un while sin incremento donde la variable contador siempre vale 0, así que la condición contador menor que 10 siempre es verdadera y el programa no termina. A la derecha, el mismo while con contador++ dentro del cuerpo, que termina tras diez vueltas. Abajo, una guarda de seguridad que añade un límite de vueltas a la condición.",
      caption: "Todo ciclo necesita algo que, tarde o temprano, vuelva falsa la condición.",
    },
    {
      type: "paragraph",
      text:
        "En el navegador, un bucle infinito suele dejar la pestaña sin responder hasta que el navegador te ofrece detener el script. Para practicar sin riesgo, añade una guarda a la condición: un segundo contador que corte el ciclo tras un número razonable de vueltas. En el experimento siguiente el error está a propósito (falta `contador++`), pero la guarda `vueltas < 5` evita que el programa se congele.",
    },
    {
      type: "playground",
      title: "Experimento 2 · Un bucle infinito controlado con una guarda",
      description: "Sin `contador++`, el contador sigue en 0. Lo único que detiene el ciclo es la guarda.",
      code: L(
        "let contador = 0;",
        "let vueltas = 0;",
        "",
        "// Error a propósito: falta contador++.",
        "// La guarda (vueltas < 5) evita que el ciclo no termine nunca.",
        "while (contador < 10 && vueltas < 5) {",
        "  vueltas++;",
        "}",
        "",
        'console.log("vueltas:", vueltas, "contador:", contador);',
      ),
      expected: "vueltas: 5 contador: 0",
    },
    {
      type: "callout",
      variant: "warning",
      text:
        "Una condición que siempre es verdadera (como `while (true)`) solo es correcta si el ciclo tiene otra forma de terminar. Con las instrucciones `break` y `continue`, que veremos en una lección posterior, se puede salir de un ciclo o saltar una iteración. ESLint avisa de las condiciones constantes con la regla `no-constant-condition`.",
    },

    // ───────────────────────── do...while ─────────────────────────
    { type: "heading", level: 2, text: "do...while: ejecuta primero, pregunta después" },
    {
      type: "paragraph",
      text:
        "`do...while` es casi idéntico, pero con el orden invertido: primero ejecuta el bloque y al final evalúa la condición. La consecuencia es que el cuerpo siempre se ejecuta al menos una vez, aunque la condición sea falsa desde el principio. Fíjate en que, a diferencia de `while`, esta estructura se cierra con un punto y coma después del paréntesis.",
    },
    {
      type: "code",
      lang: "js",
      title: "Forma básica de do...while",
      code: L(
        "let contador = 0;",
        "",
        "do {",
        "  console.log(contador);",
        "  contador++;",
        "} while (contador < 10);   // la condición se evalúa al final",
      ),
    },
    {
      type: "image",
      src: "/img/dia-16/while-vs-do-while.svg",
      alt: "Dos diagramas de flujo. En while, primero se evalúa la condición contador menor que 10: si es verdadera se ejecuta el cuerpo y se vuelve a preguntar, y si es falsa el ciclo termina, por lo que puede no ejecutar el cuerpo ni una vez. En do...while, primero se ejecuta el cuerpo y luego se evalúa la condición, por lo que el cuerpo corre al menos una vez.",
      caption: "while pregunta primero; do...while ejecuta primero.",
    },
    {
      type: "playground",
      title: "Experimento 3 · while frente a do...while con la condición falsa",
      description: "Con el contador en 10, la condición `< 10` es falsa desde el inicio. `while` no entra; `do...while` entra una vez.",
      code: L(
        "let a = 10;",
        "let vecesWhile = 0;",
        "while (a < 10) {",
        "  vecesWhile++;",
        "  a++;",
        "}",
        "",
        "let b = 10;",
        "let vecesDo = 0;",
        "do {",
        "  vecesDo++;",
        "  b++;",
        "} while (b < 10);",
        "",
        'console.log("while:", vecesWhile, "do...while:", vecesDo);',
        'console.log("a =", a, "b =", b);',
      ),
      expected: L("while: 0 do...while: 1", "a = 10 b = 11"),
    },
    {
      type: "paragraph",
      text:
        "Si el contador empieza en 0, los dos ciclos dan el mismo resultado: la única diferencia es el momento en que se evalúa la condición. En la práctica, `do...while` se usa poco. Sirve cuando tiene sentido hacer algo antes de poder decidir si repetirlo, por ejemplo, pedir un dato y volver a pedirlo hasta que sea válido.",
    },
    {
      type: "paragraph",
      text:
        "`while` por su parte sigue siendo la mejor opción cuando no sabes cuántas vueltas habrá. En este ejemplo, no se conoce de antemano cuántas veces hay que dividir 100 entre 2 hasta que el resultado baje de 1: depende del valor, y la condición lo resuelve.",
    },
    {
      type: "playground",
      title: "Experimento 4 · while cuando no se sabe cuántas vueltas habrá",
      description: "100 se divide entre 2 mientras el valor sea 1 o mayor.",
      code: L(
        "let valor = 100;",
        "let divisiones = 0;",
        "",
        "while (valor >= 1) {",
        "  valor = valor / 2;",
        "  divisiones++;",
        "}",
        "",
        "console.log(divisiones, valor);",
      ),
      expected: "7 0.78125",
    },

    // ───────────────────────── for ─────────────────────────
    { type: "heading", level: 2, text: "for: el ciclo más usado" },
    {
      type: "paragraph",
      text:
        "En `while` necesitábamos tres cosas dispersas: declarar la variable de control, evaluar la condición y cambiar la variable al final de cada vuelta. El ciclo `for` reúne esas tres partes en una sola línea, separadas por punto y coma. Es el ciclo más utilizado cuando se conoce el número de vueltas o se necesita un índice.",
    },
    {
      type: "image",
      src: "/img/dia-16/anatomia-for.svg",
      alt: "El ciclo for (let i = 0; i menor que 5; i++) con sus tres partes en colores: la inicialización let i = 0, que se ejecuta una sola vez antes de la primera vuelta; la condición i menor que 5, que se evalúa antes de cada vuelta; y la actualización i++, que se ejecuta después de cada vuelta. Debajo, el orden: 1, 2, cuerpo, 3, 2, cuerpo, 3, y así hasta que la condición es falsa.",
      caption: "Inicialización una vez, condición antes de cada vuelta, actualización después de cada vuelta.",
    },
    {
      type: "code",
      lang: "js",
      title: "Forma básica de for",
      code: L(
        "for (inicialización; condición; actualización) {",
        "  // cuerpo: las líneas que se repiten",
        "}",
        "",
        "for (let index = 0; index < 10; index++) {",
        "  console.log(index);",
        "}",
      ),
    },
    {
      type: "paragraph",
      text:
        "Declarar la variable con `let` dentro del paréntesis hace que exista solo dentro del ciclo. Las tres partes son opcionales (puedes dejar alguna vacía, pero los dos signos de punto y coma son obligatorios), y la actualización no tiene por qué ser un incremento: puede restar, sumar de tres en tres o lo que necesites.",
    },
    {
      type: "playground",
      title: "Experimento 5 · for con incremento, decremento y partes opcionales",
      description: "Contar hacia arriba, hacia abajo de 3 en 3, y un `for` con la inicialización fuera.",
      code: L(
        "const arriba = [];",
        "for (let i = 0; i < 10; i++) {",
        "  arriba.push(i);",
        "}",
        'console.log(arriba.join(" "));',
        "",
        "const abajo = [];",
        "for (let i = 10; i > 0; i -= 3) {",
        "  abajo.push(i);",
        "}",
        'console.log(abajo.join(" "));',
        "",
        "// La inicialización puede ir fuera; los punto y coma se mantienen",
        "let i3 = 0;",
        "for (; i3 < 3; i3++) {}",
        "console.log(i3);",
      ),
      expected: L("0 1 2 3 4 5 6 7 8 9", "10 7 4 1", "3"),
    },
    { type: "heading", level: 3, text: "Recorrer un arreglo con un límite dinámico" },
    {
      type: "paragraph",
      text:
        "Un uso muy común es recorrer un arreglo. La variable de control funciona como índice (la posición del elemento), empieza en 0 y la condición compara contra `numeros.length`. Recuerda que un arreglo de 4 elementos tiene posiciones de 0 a 3, por eso la condición es «menor que» la longitud y no «menor o igual». La ventaja es que el límite es dinámico: si el arreglo crece o se reduce, el ciclo sigue recorriendo todos sus elementos. Con un número fijo (como 5), el ciclo se queda en esa posición aunque haya más datos.",
    },
    {
      type: "paragraph",
      text:
        "También puedes lograr lo mismo con el método `forEach` de los arreglos, que recibe una función y la ejecuta con cada elemento. Es la versión más declarativa; el `for` es la más imperativa, porque tú llevas el índice. `forEach` no devuelve nada (devuelve `undefined`), así que sirve para ejecutar acciones, no para producir un resultado.",
    },
    {
      type: "playground",
      title: "Experimento 6 · Recorrer un arreglo con for y con forEach",
      description: "Comparamos un límite dinámico, un límite fijo de 5 y `forEach`.",
      code: L(
        "const numeros = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];",
        "",
        "const conFor = [];",
        "for (let i = 0; i < numeros.length; i++) {",
        "  conFor.push(numeros[i]);",
        "}",
        'console.log(conFor.join(" "));',
        "",
        "// Límite fijo: se queda corto si hay más datos",
        "const fijo = [];",
        "for (let i = 0; i < 5; i++) {",
        "  fijo.push(numeros[i]);",
        "}",
        'console.log(fijo.join(" "));',
        "",
        "// La versión declarativa",
        "const conForEach = [];",
        "numeros.forEach(function (n) {",
        "  conForEach.push(n);",
        "});",
        'console.log(conForEach.join(" ") === conFor.join(" "));',
        "",
        "// forEach no devuelve nada",
        "console.log(numeros.forEach(function () {}));",
      ),
      expected: L(
        "10 20 30 40 50 60 70 80 90 100",
        "10 20 30 40 50",
        "true",
        "undefined",
      ),
    },
    {
      type: "paragraph",
      text:
        "Los ciclos se pueden anidar: un ciclo dentro de otro. Por cada vuelta del ciclo externo, el interno da todas sus vueltas. Así se recorren tablas, matrices o se generan combinaciones. Y para acumular un resultado, como una suma, basta con una variable fuera del ciclo que se va actualizando en cada iteración.",
    },
    {
      type: "playground",
      title: "Experimento 7 · Acumular una suma y ciclos anidados",
      description: "La suma de 1 a 100 y una tabla de multiplicar de 3 por 3.",
      code: L(
        "let suma = 0;",
        "for (let i = 1; i <= 100; i++) {",
        "  suma += i;",
        "}",
        "console.log(suma);",
        "",
        "const tabla = [];",
        "for (let fila = 1; fila <= 3; fila++) {",
        "  const celdas = [];",
        "  for (let col = 1; col <= 3; col++) {",
        "    celdas.push(fila * col);",
        "  }",
        '  tabla.push(celdas.join(" "));',
        "}",
        'console.log(tabla.join(" | "));',
      ),
      expected: L("5050", "1 2 3 | 2 4 6 | 3 6 9"),
    },
    { type: "heading", level: 3, text: "var o let en la variable del ciclo" },
    {
      type: "paragraph",
      text:
        "La variable de control se declara casi siempre con `let`. La diferencia con `var` aparece cuando guardas funciones dentro del ciclo para ejecutarlas después. Con `var` hay una sola variable para todo el ciclo, así que, cuando las funciones se ejecutan, todas ven su valor final. Con `let`, cada vuelta tiene su propia copia. Además, una variable `var` sigue existiendo después del ciclo, y una `let` no.",
    },
    {
      type: "image",
      src: "/img/dia-16/var-vs-let-ciclo.svg",
      alt: "A la izquierda, un for con var: tres funciones comparten una sola variable i cuyo valor final es 3, así que las tres imprimen 3, 3, 3, y la variable sigue existiendo tras el ciclo. A la derecha, un for con let: cada función ve su propia copia de i con los valores 0, 1 y 2, y la variable no existe tras el ciclo.",
      caption: "Con var hay una sola variable en todo el ciclo; con let, una nueva en cada vuelta.",
    },
    {
      type: "playground",
      title: "Experimento 8 · var, let y const en la variable de un for",
      description: "Con `const` no se puede actualizar el contador: falla en la primera actualización. El `try` y el `catch` se estudian en la próxima lección; aquí solo muestran el tipo de error.",
      code: L(
        "const conVar = [];",
        "for (var iv = 0; iv < 3; iv++) {",
        "  conVar.push(function () { return iv; });",
        "}",
        "",
        "const conLet = [];",
        "for (let il = 0; il < 3; il++) {",
        "  conLet.push(function () { return il; });",
        "}",
        "",
        'console.log(conVar.map(function (f) { return f(); }).join(" "));',
        'console.log(conLet.map(function (f) { return f(); }).join(" "));',
        "console.log(typeof iv, typeof il);",
        "",
        "// const en un for clásico: el i++ intenta reasignarlo",
        "try {",
        "  for (const k = 0; k < 3; k++) {",
        '    console.log("k =", k);',
        "  }",
        "} catch (error) {",
        "  console.log(error.name);",
        "}",
      ),
      expected: L("3 3 3", "0 1 2", "number undefined", "k = 0", "TypeError"),
    },
    {
      type: "callout",
      variant: "info",
      text:
        "Por eso, en un `for` clásico se usa `let` (o `var` en código antiguo), nunca `const`. Más adelante verás que en `for...in` y `for...of` sí puedes usar `const`, porque cada vuelta declara una variable nueva. La regla `prefer-const` de ESLint te lo sugiere. Y si defines funciones dentro de un ciclo, la regla `no-loop-func` te avisa del problema de arriba.",
    },

    // ───────────────────────── for...in ─────────────────────────
    { type: "heading", level: 2, text: "for...in: recorrer las propiedades de un objeto" },
    {
      type: "paragraph",
      text:
        "Con ECMAScript 2015 (ES6) el lenguaje ganó una variante muy usada, `for...of`, y existía otra más antigua pensada para objetos, `for...in`. La segunda se llama así por el operador `in`. Se declara una variable que representa, en cada vuelta, el nombre de una propiedad del objeto. La variable guarda ese nombre como texto, no el valor.",
    },
    {
      type: "paragraph",
      text:
        "Para obtener el valor hay que acordarse de las dos formas de acceder a una propiedad que viste en la lección de objetos. La notación de punto, `persona.propiedad`, busca una propiedad que se llame literalmente «propiedad», que no existe, y da `undefined`. Para usar el contenido de la variable hay que usar corchetes: `persona[propiedad]`.",
    },
    {
      type: "playground",
      title: "Experimento 9 · for...in y los dos modos de acceder a una propiedad",
      description: "Las tres primeras líneas usan corchetes y funcionan. Las tres últimas usan punto y dan `undefined`.",
      code: L(
        'const persona = { nombre: "Ana", apellido: "Pérez", edad: 35 };',
        "",
        "for (const propiedad in persona) {",
        "  console.log(propiedad, persona[propiedad]);",
        "}",
        "",
        "// Con la notación de punto se busca una propiedad llamada «propiedad»",
        "for (const propiedad in persona) {",
        "  console.log(persona.propiedad);",
        "}",
      ),
      expected: L(
        "nombre Ana",
        "apellido Pérez",
        "edad 35",
        "undefined",
        "undefined",
        "undefined",
      ),
    },
    { type: "heading", level: 3, text: "Dos sorpresas de for...in" },
    {
      type: "paragraph",
      text:
        "`for...in` tiene dos particularidades que conviene conocer. La primera: recorre también las propiedades enumerables que el objeto hereda de otro (su prototipo), no solo las suyas. Si quieres solo las propias, `Object.keys` las da. La segunda: con un arreglo, la variable recibe los índices como texto («0», «1»…) y, si el arreglo tiene propiedades adicionales, también las recorre. Por eso no se recomienda para arreglos: ahí se usa un `for` clásico o `for...of`. La regla `guard-for-in` de ESLint existe precisamente por el primer problema.",
    },
    {
      type: "playground",
      title: "Experimento 10 · Propiedades heredadas e índices como texto",
      description: "El objeto `hijo` hereda de `base` sin definirlo él mismo. Un arreglo con una propiedad extra enseña lo que recorre `for...in`.",
      code: L(
        "const base = { heredada: 1 };",
        "const hijo = Object.create(base);",
        "hijo.propia = 2;",
        "",
        "const claves = [];",
        "for (const k in hijo) {",
        "  claves.push(k);",
        "}",
        'console.log(claves.join(","), "|", Object.keys(hijo).join(","));',
        "",
        'const arreglo = ["a", "b"];',
        'arreglo.extra = "x";',
        "const tipos = [];",
        "for (const k in arreglo) {",
        '  tipos.push(k + ":" + typeof k);',
        "}",
        'console.log(tipos.join(" "));',
      ),
      expected: L("propia,heredada | propia", "0:string 1:string extra:string"),
    },

    // ───────────────────────── for...of ─────────────────────────
    { type: "heading", level: 2, text: "for...of: recorrer los valores de un iterable" },
    {
      type: "paragraph",
      text:
        "`for...of` es la variante para recorrer valores. La variable recibe, en cada vuelta, un elemento de un objeto iterable: un objeto que sabe entregar sus elementos uno por uno. Son iterables los arreglos, los textos, los `Map`, los `Set` y otros objetos del lenguaje. Lo mejor es que se lee casi como una frase: «para cada elemento de numeros».",
    },
    {
      type: "playground",
      title: "Experimento 11 · for...of con arreglos, textos, Map y Set",
      description: "Un mismo ciclo sirve con distintos tipos de iterables.",
      code: L(
        "const numeros = [10, 20, 30];",
        "const vistos = [];",
        "for (const elemento of numeros) {",
        "  vistos.push(elemento);",
        "}",
        'console.log(vistos.join(" "));',
        "",
        "const letras = [];",
        'for (const caracter of "hola mundo") {',
        "  letras.push(caracter);",
        "}",
        'console.log(letras.join("|"));',
        "",
        'const mapa = new Map([["a", 1], ["b", 2]]);',
        "const pares = [];",
        "for (const par of mapa) {",
        '  pares.push(par[0] + "=" + par[1]);',
        "}",
        'console.log(pares.join(" "));',
        "",
        "const conjunto = new Set([1, 1, 2]);",
        "const unicos = [];",
        "for (const v of conjunto) {",
        "  unicos.push(v);",
        "}",
        'console.log(unicos.join(" "));',
      ),
      expected: L("10 20 30", "h|o|l|a| |m|u|n|d|o", "a=1 b=2", "1 2"),
    },
    {
      type: "paragraph",
      text:
        "Una aclaración importante: un objeto literal, como `{ nombre: \"Ana\" }`, no es iterable, por lo que `for...of` falla con un `TypeError`. A veces se dice que `for...of` recorre «cualquier objeto», y no es así: recorre iterables. Para un objeto literal, conviértelo antes en un arreglo con `Object.keys` (las claves), `Object.values` (los valores) u `Object.entries` (pares clave y valor) y recórrelo con `for...of`.",
    },
    {
      type: "playground",
      title: "Experimento 12 · Un objeto literal no es iterable",
      description: "El primer intento falla. Con `Object.entries` obtenemos un arreglo de pares que sí se puede recorrer.",
      code: L(
        'const persona = { nombre: "Ana", edad: 35 };',
        "",
        "try {",
        "  for (const x of persona) {",
        "    console.log(x);",
        "  }",
        "} catch (error) {",
        "  console.log(error.name);",
        "}",
        "",
        "for (const par of Object.entries(persona)) {",
        "  console.log(par[0], par[1]);",
        "}",
        'console.log(Object.keys(persona).join(","), Object.values(persona).join(","));',
      ),
      expected: L("TypeError", "nombre Ana", "edad 35", "nombre,edad Ana,35"),
    },
    { type: "heading", level: 3, text: "Los textos se recorren por puntos de código" },
    {
      type: "paragraph",
      text:
        "Al recorrer un texto, `for...of` entrega un punto de código Unicode en cada vuelta, no una unidad de 16 bits. La diferencia se nota con caracteres como los emojis: `length` cuenta unidades de 16 bits, y un emoji ocupa dos. Con `for...of`, el emoji es un solo elemento. (Tampoco equivale siempre a lo que ves como «un carácter»: algunos símbolos visibles están formados por varios puntos de código.)",
    },
    {
      type: "playground",
      title: "Experimento 13 · length frente a for...of en un texto con emoji",
      description: "El texto tiene 3 caracteres visibles, pero `length` dice 4.",
      code: L(
        'const texto = "a😀b";',
        "console.log(texto.length, Array.from(texto).length);",
        "",
        "const partes = [];",
        "for (const c of texto) {",
        "  partes.push(c);",
        "}",
        'console.log(partes.join("|"));',
      ),
      expected: L("4 3", "a|😀|b"),
    },
    {
      type: "image",
      src: "/img/dia-16/for-in-vs-for-of.svg",
      alt: "Tabla comparativa. for...in recorre las claves enumerables de un objeto, incluidas las heredadas; la variable guarda un texto con el nombre de la clave; no conviene con arreglos; existe desde la primera edición del lenguaje. for...of recorre los valores de un iterable como arreglos, textos, Map y Set; la variable guarda cada elemento; no sirve con objetos literales, que no son iterables; apareció en ES2015.",
      caption: "for...in recorre claves; for...of recorre valores.",
    },

    // ───────────────────────── Aplicación ─────────────────────────
    { type: "heading", level: 2, text: "Un caso real: las compras de un usuario" },
    {
      type: "paragraph",
      text:
        "Volvamos al ejemplo del comienzo. Tenemos una lista de compras (un arreglo de objetos) y queremos mostrar cada una y calcular el total. `for...of` hace el código muy claro. Si en lugar de texto planteáramos construir HTML, con una lista de elementos `<li>`, hay que recordar la lección de concatenación: los datos que vienen de un usuario o de una API nunca deben insertarse sin escapar en `innerHTML`; hay que usar `textContent` o crear los nodos con el DOM.",
    },
    {
      type: "playground",
      title: "Experimento 14 · Recorrer una lista de compras y construir una lista HTML",
      description: "Un arreglo de objetos se recorre con `for...of`; el total se acumula en una variable.",
      code: L(
        "const compras = [",
        '  { producto: "Libro", precio: 12 },',
        '  { producto: "Taza", precio: 8 },',
        '  { producto: "Lámpara", precio: 30 },',
        "];",
        "",
        "let total = 0;",
        "for (const compra of compras) {",
        '  console.log(compra.producto + ": $" + compra.precio);',
        "  total += compra.precio;",
        "}",
        'console.log("total:", total);',
        "",
        "// Construir una lista HTML con datos propios (no escritos por un usuario)",
        'const colores = ["rojo", "verde", "azul"];',
        'let html = "";',
        "for (const color of colores) {",
        '  html += "<li>" + color + "</li>";',
        "}",
        "console.log(html);",
      ),
      expected: L(
        "Libro: $12",
        "Taza: $8",
        "Lámpara: $30",
        "total: 50",
        "<li>rojo</li><li>verde</li><li>azul</li>",
      ),
    },

    // ───────────────────────── Cuál usar ─────────────────────────
    { type: "heading", level: 2, text: "¿Qué ciclo elegir?" },
    {
      type: "table",
      caption: "Qué ciclo usar según el problema",
      headers: ["Situación", "Ciclo recomendado"],
      rows: [
        ["No sabes cuántas vueltas habrá; depende de una condición", "`while`"],
        ["El cuerpo debe ejecutarse al menos una vez", "`do...while`"],
        ["Conoces el número de vueltas o necesitas el índice", "`for`"],
        ["Recorrer los elementos de un arreglo, texto, Map o Set", "`for...of`"],
        ["Recorrer las claves o los valores de un objeto literal", "`Object.keys`, `Object.values` u `Object.entries` con `for...of`"],
        ["Aplicar una acción a cada elemento de un arreglo", "`forEach` (o `for...of`)"],
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
          "`while` y `do...while` están obsoletos.",
          "Son parte del lenguaje y son la opción adecuada cuando no se conoce el número de vueltas. Para recorrer colecciones se prefieren hoy `for...of` y los métodos de arreglos.",
        ],
        [
          "`for...in` y `for...of` llegaron con ES2015.",
          "`for...of` es de ES2015. `for...in` existe desde la primera edición del lenguaje (ES1).",
        ],
        [
          "`for...in` recorre las propiedades de un objeto.",
          "Recorre las claves enumerables de tipo texto, incluidas las heredadas. Para solo las propias, usa `Object.keys`.",
        ],
        [
          "`for...in` sirve para recorrer arreglos.",
          "Da los índices como texto y también propiedades adicionales. Para arreglos se usa `for`, `for...of` o `forEach`.",
        ],
        [
          "`for...of` recorre cualquier objeto.",
          "Recorre iterables (arreglos, textos, Map, Set…). Un objeto literal no lo es y lanza un `TypeError`.",
        ],
        [
          "`for...of` recorre un texto carácter por carácter.",
          "Lo recorre por puntos de código Unicode: un emoji es un solo elemento, aunque `length` lo cuente como 2.",
        ],
        [
          "Da igual usar `var` o `let` en la variable de un `for`.",
          "Con `let`, cada vuelta tiene su propia variable; con `var`, hay una sola y sigue existiendo al terminar.",
        ],
        [
          "Se puede declarar la variable de un `for` con `const`.",
          "En un `for` clásico no, porque se reasigna en cada vuelta. En `for...in` y `for...of` sí, porque cada vuelta declara una nueva.",
        ],
        [
          "Un bucle infinito hace colapsar el equipo.",
          "En el navegador suele congelar la pestaña (o el hilo donde corre el código) hasta detener el script. Se evita con una condición que cambie y, al practicar, con una guarda.",
        ],
      ],
    },

    // ───────────────────────── FAQ ─────────────────────────
    {
      type: "accordion",
      title: "Preguntas frecuentes de esta lección",
      items: [
        {
          title: "¿Cuándo uso `for` y cuándo `for...of`?",
          text:
            "Usa `for...of` si solo necesitas los elementos. Usa `for` si necesitas el índice, recorrer en otro orden (por ejemplo, de atrás hacia adelante) o saltar de a más de uno.",
        },
        {
          title: "¿Por qué `i++` y no `i = i + 1`?",
          text:
            "Son equivalentes en un ciclo. `i++` es la forma habitual y más corta. Algunas guías de estilo prefieren `i += 1`, y ESLint tiene la regla `no-plusplus` para exigirlo, pero es una decisión de estilo.",
        },
        {
          title: "¿Puedo salir de un ciclo antes de que termine?",
          text:
            "Sí, con la instrucción `break`, y saltar solo una iteración con `continue`. Las veremos en una lección posterior. Ten en cuenta que `forEach` no se puede interrumpir con `break`.",
        },
        {
          title: "¿Qué pasa si modifico el arreglo mientras lo recorro?",
          text:
            "Puede dar resultados inesperados, porque el ciclo sigue usando índices o posiciones que ya cambiaron. Es mejor construir un arreglo nuevo en lugar de modificar el que recorres.",
        },
        {
          title: "¿Por qué el `for` conserva sus dos signos de punto y coma aunque deje partes vacías?",
          text:
            "Porque separan las tres partes. `for (;;)` es válido y equivale a un ciclo sin condición: no termina hasta que se salga de él con `break`.",
        },
        {
          title: "¿Y los ciclos con datos asíncronos?",
          text:
            "Es un tema aparte, que veremos con las promesas y `async`/`await`. Por ahora, los ciclos de esta lección son síncronos: cada vuelta termina antes de empezar la siguiente.",
        },
      ],
    },

    // ───────────────────────── Cierre ─────────────────────────
    { type: "heading", level: 2, text: "Cierre" },
    {
      type: "paragraph",
      text:
        "Con esta lección terminas los fundamentos de control de flujo: sabes decidir (condicionales) y repetir (ciclos). `while` y `do...while` dependen de una condición, `for` reúne inicialización, condición y actualización, `for...in` recorre claves y `for...of` recorre valores. En la próxima lección vemos cómo manejar los errores con `try`, `catch` y `finally`, y después las instrucciones `break` y `continue` para controlar mejor el interior de los ciclos.",
    },
    {
      type: "checklist",
      title: "Antes de pasar al Día 17, verifica que puedes explicar…",
      items: [
        "Qué es una iteración y por qué un ciclo necesita algo que cambie su condición.",
        "Qué hace `while` con una condición falsa desde el principio, y qué hace `do...while` en el mismo caso.",
        "Cómo se produce un bucle infinito y cómo evitarlo al practicar.",
        "Las tres partes de un `for` y cuándo se ejecuta cada una.",
        "Por qué conviene comparar con `numeros.length` y no con un número fijo.",
        "En qué se diferencian `for...in` y `for...of`, y por qué `for...in` no se usa con arreglos.",
        "Por qué un objeto literal no se puede recorrer con `for...of` y qué usar en su lugar.",
        "Qué cambia entre `var` y `let` en la variable de un `for`.",
      ],
    },
    { type: "heading", level: 3, text: "Fuentes consultadas (noviembre de 2026)" },
    {
      type: "list",
      items: [
        "[MDN: Bucles e iteración (guía)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration)",
        "[MDN: while](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/while)",
        "[MDN: do...while](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/do...while)",
        "[MDN: for](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for)",
        "[MDN: for...in](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in)",
        "[MDN: for...of](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of)",
        "[MDN: Protocolos de iteración](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols)",
        "[MDN: let](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let)",
        "[MDN: Object.entries()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries)",
        "[MDN: Array.prototype.forEach()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)",
        "[MDN: Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)",
        "[MDN: Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)",
        "[MDN: break](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/break)",
        "[MDN: continue](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/continue)",
        "[ESLint: no-constant-condition](https://eslint.org/docs/latest/rules/no-constant-condition)",
        "[ESLint: no-loop-func](https://eslint.org/docs/latest/rules/no-loop-func)",
        "[ESLint: prefer-const](https://eslint.org/docs/latest/rules/prefer-const)",
        "[ESLint: guard-for-in](https://eslint.org/docs/latest/rules/guard-for-in)",
        "[ESLint: no-plusplus](https://eslint.org/docs/latest/rules/no-plusplus)",
      ],
    },
  ],
  selfCheck: [
    {
      question: "¿Qué hace un `while` si su condición es falsa desde el principio?",
      options: [
        "Ejecuta el cuerpo una vez",
        "No ejecuta el cuerpo ninguna vez",
        "Lanza un error",
        "Entra en un bucle infinito",
      ],
      correctIndex: 1,
      explanation:
        "`while` evalúa la condición antes de cada vuelta, incluida la primera. Si es falsa, el cuerpo no se ejecuta.",
    },
    {
      question: "Con `let n = 10; do { ... } while (n < 10);`, ¿cuántas veces se ejecuta el cuerpo?",
      options: ["Ninguna", "Una", "Diez", "Infinitas"],
      correctIndex: 1,
      explanation:
        "`do...while` ejecuta el cuerpo y después evalúa la condición, así que corre al menos una vez.",
    },
    {
      question: "¿Qué suele causar un bucle infinito en un `while`?",
      options: [
        "Usar `let` en lugar de `var`",
        "Que nada en el cuerpo acerque la variable al valor que vuelve falsa la condición",
        "Escribir las llaves en otra línea",
        "Usar `console.log` dentro del ciclo",
      ],
      correctIndex: 1,
      explanation:
        "Si, por ejemplo, olvidas `contador++`, la condición nunca se vuelve falsa y el ciclo no termina.",
    },
    {
      question: "En `for (let i = 0; i < 5; i++)`, ¿cuándo se ejecuta cada una de las tres partes?",
      options: [
        "Las tres, antes de cada vuelta",
        "La inicialización una vez, la condición antes de cada vuelta y la actualización después de cada vuelta",
        "La inicialización antes de cada vuelta y las otras dos al final",
        "La condición una vez y las demás en cada vuelta",
      ],
      correctIndex: 1,
      explanation:
        "La inicialización corre una sola vez; la condición se evalúa antes de cada vuelta y la actualización se ejecuta después de cada vuelta.",
    },
    {
      question: "¿Qué imprime `for (let i = 0; i < 3; i++) console.log(i);`?",
      options: ["1 2 3", "0 1 2", "0 1 2 3", "0 1 2 y luego un error"],
      correctIndex: 1,
      explanation: "Empieza en 0 y, como la condición es `i < 3`, el 3 ya no entra: imprime 0, 1 y 2.",
    },
    {
      question: "¿Por qué conviene escribir `i < numeros.length` en lugar de `i < 5` para recorrer un arreglo?",
      options: [
        "Porque `5` no es un número válido",
        "Porque el límite se adapta al tamaño del arreglo si este cambia",
        "Porque `length` es más rápido",
        "Porque `for` solo acepta propiedades",
      ],
      correctIndex: 1,
      explanation:
        "Con un límite dinámico el ciclo siempre recorre todos los elementos, aunque el arreglo crezca o se reduzca.",
    },
    {
      question: "En `for (const k in [\"a\", \"b\"])`, ¿qué valor recibe `k` en la primera vuelta?",
      options: ["\"a\"", "El número 0", "El texto \"0\"", "undefined"],
      correctIndex: 2,
      explanation:
        "`for...in` entrega las claves como texto. En un arreglo, las claves son los índices: \"0\", \"1\"…",
    },
    {
      question: "¿Qué ocurre con `for (const x of { a: 1 })`?",
      options: [
        "Recorre la clave `a`",
        "Recorre el valor 1",
        "Lanza un `TypeError`, porque un objeto literal no es iterable",
        "No hace nada",
      ],
      correctIndex: 2,
      explanation:
        "`for...of` necesita un iterable. Para un objeto literal usa `Object.keys`, `Object.values` u `Object.entries`.",
    },
    {
      question: "Con `\"a😀b\"`, ¿cuántas vueltas da un `for...of`?",
      options: ["2", "3", "4", "5"],
      correctIndex: 1,
      explanation:
        "`for...of` recorre por puntos de código: `a`, el emoji y `b` son tres elementos, aunque `length` dé 4.",
    },
    {
      question: "Si guardas tres funciones `() => i` dentro de un `for`, ¿qué las diferencia según uses `var` o `let`?",
      options: [
        "Nada: dan el mismo resultado",
        "Con `var` las tres ven el valor final (3, 3, 3); con `let` cada una ve el de su vuelta (0, 1, 2)",
        "Con `let` fallan siempre",
        "Con `var` imprimen 0, 1, 2",
      ],
      correctIndex: 1,
      explanation:
        "`var` comparte una sola variable en todo el ciclo; `let` crea una nueva en cada vuelta.",
    },
  ],
};
