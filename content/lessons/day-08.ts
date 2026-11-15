import type { Lesson } from "@/lib/types";

// Une líneas de código sin tener que escapar backticks ni `${}` dentro de template literals.
const L = (...lines: string[]) => lines.join("\n");

// Contenido validado contra fuentes actuales en noviembre de 2026 (ver sección "Fuentes").
export const day08: Lesson = {
  day: 8,
  slug: "numeros-conversion-decimales",
  title: "Números: conversión, formato y el problema de los decimales",
  section: "Tipos de datos básicos",
  estimatedMinutes: 55,
  icon: "🔢",
  objectives: [
    "Explicar que JavaScript tiene un tipo `number` para enteros y decimales, y que `bigint` existe aparte",
    "Dar formato a un número con `toFixed()` sabiendo que devuelve texto, y con `Intl.NumberFormat`",
    "Convertir texto a número con `Number()`, `parseInt()` y `parseFloat()` y elegir la adecuada",
    "Entender por qué un valor de formulario llega como texto y qué pasa al sumarlo",
    "Reconocer el error de punto flotante (`0.1 + 0.2`) y las estrategias para manejarlo",
    "Distinguir un método de instancia (`toFixed`) de una función estática (`Number.parseFloat`)",
  ],
  blocks: [
    // ───────────────────────── Apertura ─────────────────────────
    {
      type: "paragraph",
      text:
        "En la lección anterior terminamos con las plantillas de texto, y con ellas el tipo de dato `string`. Hoy pasamos al siguiente tipo de dato básico: los números. Parece el tema más sencillo, pero encierra varias trampas que aparecen en cualquier aplicación real: valores que llegan como texto desde un formulario, sumas que producen resultados raros y decimales con ceros que nadie pidió.",
    },
    {
      type: "keyFacts",
      items: [
        { value: "number", label: "Un único tipo para enteros y decimales" },
        { value: "toFixed()", label: "Fija los decimales, pero devuelve texto" },
        { value: "parseInt()", label: "Lee un entero al comienzo de un texto" },
        { value: "parseFloat()", label: "Lee un decimal al comienzo de un texto" },
        { value: "Number()", label: "Convierte un texto completo, o da NaN" },
        { value: "IEEE 754", label: "Estándar binario que explica 0.1 + 0.2" },
      ],
    },
    {
      type: "callout",
      variant: "success",
      text:
        "Contenido verificado en noviembre de 2026 con MDN Web Docs y la propuesta Decimal de TC39. Los resultados de los ejemplos se comprobaron ejecutándolos. Al final hay una tabla con datos que suelen aparecer desactualizados y la lista de fuentes.",
    },

    // ───────────────────────── Un solo tipo ─────────────────────────
    { type: "heading", level: 2, text: "Un único tipo numérico: number" },
    {
      type: "paragraph",
      text:
        "En otros lenguajes los números se clasifican en muchos tipos: coma flotante de simple o doble precisión, enteros pequeños, medianos o largos. En JavaScript, en cambio, simplemente tenemos números: el tipo `number`. Un `7`, un `7.19` y un `-3` son del mismo tipo, y por eso `5` y `5.0` son exactamente el mismo valor. Por dentro, un `number` es un decimal binario de 64 bits (doble precisión, según el estándar IEEE 754).",
    },
    {
      type: "image",
      src: "/img/dia-08/un-solo-tipo-numero.svg",
      alt: "A la izquierda, otros lenguajes separan los números en byte, short, int, long, float y double. A la derecha, JavaScript usa un único tipo number de 64 bits para enteros y decimales, y un tipo aparte llamado bigint para enteros de cualquier tamaño.",
      caption: "Otros lenguajes tienen muchos tipos numéricos; JavaScript tiene number y, aparte, bigint.",
    },
    {
      type: "playground",
      title: "Experimento 1 · Todos son number",
      description: "Enteros, decimales y valores especiales comparten el mismo tipo.",
      code: L(
        "console.log(typeof 7);",
        "console.log(typeof 7.19);",
        "console.log(5 === 5.0);",
        "console.log(Number.isInteger(5.0), Number.isInteger(5.5));",
        "console.log(typeof NaN, typeof Infinity);",
        "console.log(typeof 10n);",
      ),
      expected: L("number", "number", "true", "true false", "number number", "bigint"),
    },
    {
      type: "callout",
      variant: "info",
      text:
        "El material antiguo dice que JavaScript solo tiene un tipo de número. Hoy hay una segunda opción: `bigint` (ECMAScript 2020), pensado para enteros de cualquier tamaño, que se escriben con una `n` al final (`10n`). Veremos cuándo hace falta en la sección sobre punto flotante.",
    },

    // ───────────────────────── Constructor ─────────────────────────
    { type: "heading", level: 3, text: "Crear un número con su constructor (y por qué no conviene)" },
    {
      type: "paragraph",
      text:
        "Un número también puede crearse con su constructor: `new Number(1)`. Si lo imprimes en la consola del navegador verás que no es el valor suelto, sino un objeto de tipo `Number`, con su prototipo y con un valor primitivo (`1`) guardado en su interior. Es un envoltorio: un objeto que contiene al número. Por eso se comporta distinto del valor literal.",
    },
    {
      type: "playground",
      title: "Experimento 2 · El valor primitivo frente al objeto envoltorio",
      description: "`Number(x)` sin `new` es una conversión; `new Number(x)` crea un objeto.",
      code: L(
        "console.log(typeof 1);",
        "console.log(typeof new Number(1));",
        'console.log(typeof Number("1"));',
        "console.log(new Number(1) === 1);",
        "console.log(new Number(1) == 1);",
        "console.log(new Number(1).valueOf() === 1);",
      ),
      expected: L("number", "object", "number", "false", "true", "true"),
    },
    {
      type: "callout",
      variant: "warning",
      text:
        "En el código real no se usa `new Number()`: se escriben los números como literales (`1`, `7.19`) y, para convertir, se llama a `Number(valor)` sin `new`. Se desaconseja porque los objetos envoltorio generan comparaciones que sorprenden, como `new Number(1) === 1`, que es `false`.",
    },
    {
      type: "paragraph",
      text:
        "Entonces, ¿por qué un número literal como `7.19` puede llamar a métodos como `toFixed()`? Porque JavaScript envuelve el valor primitivo en un objeto `Number` de forma temporal y automática solo para ejecutar el método. Tú no ves ese objeto. Los métodos y propiedades de los números están documentados en MDN, en la referencia de `Number`; te invito a recorrerla.",
    },

    // ───────────────────────── toFixed ─────────────────────────
    { type: "heading", level: 2, text: "Fijar decimales con toFixed()" },
    {
      type: "paragraph",
      text:
        "Imagina que tienes un tercer valor, `7.19`. El método `toFixed()` recibe cuántos decimales quieres. Con `1`, el número se redondea a `7.2`; con `5`, se rellena con ceros hasta `7.19000`; con `0` queda `7`. Es útil para dar formato a un número que vas a mostrar. Fíjate en un detalle que suele pasar por alto: `toFixed()` no devuelve un número, devuelve una cadena de texto.",
    },
    {
      type: "playground",
      title: "Experimento 3 · toFixed() y su resultado de tipo texto",
      description: "Observa el redondeo, el relleno con ceros y el tipo del resultado.",
      code: L(
        "const c = 7.19;",
        "",
        "console.log(c.toFixed(1));",
        "console.log(c.toFixed(5));",
        "console.log(c.toFixed(0));",
        "",
        "// El resultado es texto: + concatena",
        "console.log(typeof c.toFixed(1));",
        "console.log(c.toFixed(1) + 1);",
        "console.log(Number(c.toFixed(1)) + 1);",
      ),
      expected: L("7.2", "7.19000", "7", "string", "7.21", "8.2"),
    },
    {
      type: "paragraph",
      text:
        "El argumento debe estar entre 0 y 100; fuera de ese rango lanza un `RangeError`. Y hay un matiz de redondeo: `toFixed()` trabaja con el valor binario real del número, no con el decimal que ves escrito, así que algunos casos que parecen «de mitad» no redondean como se espera.",
    },
    {
      type: "playground",
      title: "Experimento 4 · Redondeos que sorprenden",
      description: "El número 1.005 en realidad se guarda como 1.00499999999999989…, por eso baja.",
      code: L(
        "console.log((1.005).toFixed(2));",
        "console.log((1.45).toFixed(1));",
        "console.log((2.5).toFixed(0));",
        "console.log((8.345).toFixed(2));",
      ),
      expected: L("1.00", "1.4", "3", "8.35"),
    },
    {
      type: "paragraph",
      text:
        "Conclusión práctica: `toFixed()` sirve para mostrar, no para redondear dinero de forma exacta. Si necesitas el resultado como número, conviértelo después con `Number()`; si necesitas exactitud, mira la sección sobre punto flotante.",
    },

    // ───────────────────────── Intl ─────────────────────────
    { type: "heading", level: 3, text: "Formato según el idioma y la moneda: Intl.NumberFormat" },
    {
      type: "paragraph",
      text:
        "Para formatear números que se muestran a las personas existen librerías externas, pero hoy no hace falta recurrir a ellas en la mayoría de los casos: el propio lenguaje incluye `Intl.NumberFormat` y el método `toLocaleString()`. Aplican separadores de miles, decimales, moneda y porcentajes según el idioma y la región, y devuelven texto.",
    },
    {
      type: "playground",
      title: "Experimento 5 · Formato por idioma y región",
      description: "El mismo número se escribe distinto en Colombia y en Estados Unidos.",
      code: L(
        "const n = 1234567.891;",
        "",
        'console.log(n.toLocaleString("es-CO"));',
        'console.log(n.toLocaleString("en-US"));',
        'console.log((7.19).toLocaleString("es-CO", { minimumFractionDigits: 3 }));',
        "",
        'const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });',
        "console.log(usd.format(1234.5));",
        'console.log(new Intl.NumberFormat("en-US", { style: "percent" }).format(0.256));',
      ),
      expected: L("1.234.567,891", "1,234,567.891", "7,190", "$1,234.50", "26%"),
    },

    // ───────────────────────── parseInt y parseFloat ─────────────────────────
    { type: "heading", level: 2, text: "Leer números dentro de un texto: parseInt() y parseFloat()" },
    {
      type: "paragraph",
      text:
        "`parseInt()` recibe un texto (o un valor que pueda convertirse a texto) y devuelve la parte entera que encuentra al comienzo. `parseFloat()` hace lo mismo pero conserva la parte decimal. Con `7.19`, `parseInt()` da `7` y no redondea: simplemente corta. Con el texto `\"5.6\"`, `parseInt()` da `5` y `parseFloat()` da `5.6`.",
    },
    {
      type: "playground",
      title: "Experimento 6 · parseInt y parseFloat",
      description: "Comprueba qué lee cada función y qué hace cuando el texto no empieza por un número.",
      code: L(
        "const c = 7.19;",
        'const d = "5.6";',
        "",
        "console.log(parseInt(c));",
        "console.log(parseInt(d));",
        "console.log(parseFloat(d));",
        'console.log(parseFloat("5.6abc"));',
        'console.log(parseInt("42px", 10));',
        'console.log(parseInt("abc", 10));',
        'console.log(parseInt("ff", 16));',
        'console.log(parseInt("101", 2));',
      ),
      expected: L("7", "5", "5.6", "5.6", "42", "NaN", "255", "5"),
    },
    {
      type: "list",
      items: [
        "Ambas leen de izquierda a derecha y se detienen en el primer carácter que no encaja. Si el primero ya no encaja, devuelven `NaN`.",
        "`parseInt()` acepta un segundo argumento, la base (de 2 a 36). Conviene escribirlo siempre: `parseInt(texto, 10)`. Sin él, un texto que empieza por `0x` se interpreta como hexadecimal.",
        "Antes, un texto como `\"08\"` podía leerse como octal en navegadores antiguos. Desde ECMAScript 5 ya no ocurre, pero pasar la base sigue siendo buena práctica.",
        "`parseInt()` primero convierte su argumento a texto. Con números muy grandes o muy pequeños (`0.0000005` se escribe `5e-7`) da resultados absurdos: para truncar un número usa `Math.trunc()`.",
        "Que `parseInt()` y `parseFloat()` devuelvan un número entero o decimal no cambia el tipo: ambos devuelven `number`.",
      ],
    },
    {
      type: "playground",
      title: "Experimento 7 · Cuidado al truncar números",
      description: "`parseInt` trabaja con texto; para un número, `Math.trunc` es la herramienta correcta.",
      code: L(
        "console.log(parseInt(0.0000005));",
        "console.log(Math.trunc(0.0000005));",
        "console.log(Math.trunc(7.9), Math.trunc(-7.9));",
      ),
      expected: L("5", "0", "7 -7"),
    },

    // ───────────────────────── Formulario ─────────────────────────
    { type: "heading", level: 2, text: "El caso del formulario: el valor llega como texto" },
    {
      type: "paragraph",
      text:
        "Imagina una aplicación con un formulario donde el usuario escribe su edad. Podrías usar un campo de tipo `number` para que no acepte letras, pero cuando procesas el formulario con JavaScript, el valor que escribió el usuario te llega como cadena de texto. El operador `typeof`, que devuelve el tipo de un valor, lo confirma: el número `7.19` es de tipo `number`, y el `\"5.6\"` que viene del formulario es de tipo `string`.",
    },
    {
      type: "image",
      src: "/img/dia-08/formulario-texto.svg",
      alt: "Un campo de formulario de tipo number contiene 5.6, pero value entrega el texto 5.6. Sumarlo con 7.19 concatena y da 7.195.6. Convertirlo antes con Number o parseFloat permite sumar y da 12.79.",
      caption: "Lo que escribe el usuario llega como texto; hay que convertirlo antes de calcular.",
    },
    {
      type: "paragraph",
      text:
        "Entonces, ¿qué pasa si intentamos una operación aritmética? Con dos números, la suma funciona. Pero si uno de los operandos es una cadena, `+` no suma: concatena, igual que en la lección anterior. Se convierte el número en texto y se pega al otro: `7.19 + \"5.6\"` da `\"7.195.6\"`. En la consola del navegador se aprecia la diferencia: el texto sale de un color y los números de otro.",
    },
    {
      type: "paragraph",
      text:
        "La solución es hacer una conversión de tipo, lo que en el mundo de la programación se conoce como casting. Si quiero sumar `c` (número) con `d` (texto con un número), primero convierto `d` a número.",
    },
    {
      type: "playground",
      title: "Experimento 8 · De texto a número antes de sumar",
      description: "Compara la concatenación con las tres formas de convertir.",
      code: L(
        "const c = 7.19;",
        'const d = "5.6";',
        "",
        "console.log(typeof c);",
        "console.log(typeof d);",
        "console.log(c + d);",
        "console.log(c + parseInt(d));",
        "console.log(c + parseFloat(d));",
        "console.log(c + Number(d));",
        "console.log(c + +d);",
      ),
      expected: L(
        "number",
        "string",
        "7.195.6",
        "12.190000000000001",
        "12.79",
        "12.79",
        "12.79",
      ),
    },
    {
      type: "paragraph",
      text:
        "Observa la cuarta línea de resultados: al convertir con `parseInt()` solo se suma la parte entera de `\"5.6\"` (es decir, 5), así que el resultado esperado sería `12.19` y no `12.79`. Sin embargo, JavaScript muestra `12.190000000000001`, con una cola de ceros y un uno. Ese exceso de decimales no lo causa `parseInt()`: viene del punto flotante, y es el tema de la sección siguiente. Con `parseFloat()` o `Number()` se suma el valor completo y el resultado es `12.79`.",
    },
    {
      type: "heading",
      level: 3,
      text: "Number() frente a parseInt() y parseFloat()",
    },
    {
      type: "paragraph",
      text:
        "`Number()` es más estricto: convierte el texto completo y devuelve `NaN` si no es un número válido. `parseInt()` y `parseFloat()` son más tolerantes: leen el principio e ignoran el resto. No hay una mejor en general; depende de lo que quieras. Si el texto debe ser un número y no otra cosa, `Number()` detecta el error. Si es algo como `\"42px\"` y solo quieres el 42, usa `parseInt()`.",
    },
    {
      type: "image",
      src: "/img/dia-08/comparar-conversion.svg",
      alt: "Tabla con siete textos y lo que devuelven Number, parseInt y parseFloat. Number exige que todo el texto sea numérico; parseInt lee un entero inicial; parseFloat lee un decimal inicial.",
      caption: "Mismos textos, resultados distintos según la función.",
    },
    {
      type: "playground",
      title: "Experimento 9 · Los casos que sorprenden de Number()",
      description: "El texto vacío o con solo espacios se convierte en 0, no en NaN.",
      code: L(
        'console.log(Number(""));',
        'console.log(Number("  42  "));',
        'console.log(Number("12px"));',
        'console.log(Number("0x1f"));',
        'console.log(Number("1e3"));',
        'console.log(Number("1,5"));',
        "console.log(Number(null), Number(undefined), Number(true));",
      ),
      expected: L("0", "42", "NaN", "31", "1000", "NaN", "0 NaN 1"),
    },
    {
      type: "callout",
      variant: "info",
      text:
        "Un campo `<input type=\"number\">` también tiene la propiedad `valueAsNumber`, que entrega directamente un número (o `NaN` si el campo está vacío o no es válido), sin tener que convertir a mano. La propiedad `value` sigue devolviendo texto.",
    },
    {
      type: "code",
      lang: "html",
      title: "Leer el valor de un campo numérico",
      code: L(
        '<input type="number" id="edad" value="25">',
        "",
        "<script>",
        '  const campo = document.querySelector("#edad");',
        "",
        '  console.log(campo.value);          // "25"  (texto)',
        "  console.log(campo.valueAsNumber);  // 25    (número)",
        "",
        "  // Valida antes de usarlo",
        "  if (Number.isNaN(campo.valueAsNumber)) {",
        '    console.log("Escribe un número válido");',
        "  }",
        "</script>",
      ),
    },

    // ───────────────────────── NaN ─────────────────────────
    { type: "heading", level: 3, text: "NaN: «no es un número» (y aun así es de tipo number)" },
    {
      type: "paragraph",
      text:
        "Cuando una conversión falla se obtiene `NaN` (Not a Number). Es un valor especial del tipo `number` que tiene una propiedad curiosa: no es igual ni a sí mismo. Para detectarlo, usa `Number.isNaN()`, que no hace conversiones. La función global `isNaN()` convierte antes su argumento y por eso da `true` para texto como `\"abc\"`.",
    },
    {
      type: "playground",
      title: "Experimento 10 · Detectar NaN",
      description: "NaN no es igual a sí mismo, así que no se detecta con ===.",
      code: L(
        "console.log(typeof NaN);",
        "console.log(NaN === NaN);",
        "console.log(Number.isNaN(NaN));",
        'console.log(isNaN("abc"));',
        'console.log(Number.isNaN("abc"));',
        "console.log(Object.is(NaN, NaN));",
        "console.log(1 / 0, -1 / 0);",
      ),
      expected: L("number", "false", "true", "true", "false", "true", "Infinity -Infinity"),
    },

    // ───────────────────────── Punto flotante ─────────────────────────
    { type: "heading", level: 2, text: "El punto débil: los decimales y el punto flotante" },
    {
      type: "paragraph",
      text:
        "Aquí aparece el detalle importante de los números en JavaScript. Cuando haces muchas operaciones con decimales verás resultados como `12.190000000000001`, con una cola de ceros y un uno al final. Los números se guardan en binario, y muchos decimales (como `0.1` o `0.2`) no tienen una representación binaria exacta. Es el mismo fenómeno que ocurre en el sistema decimal con un tercio: no se puede escribir exactamente como `0.333…`.",
    },
    {
      type: "image",
      src: "/img/dia-08/punto-flotante.svg",
      alt: "0.1 más 0.2 da 0.30000000000000004 porque los números se guardan en binario. Estrategias: formatear al mostrar con toFixed o Intl.NumberFormat, guardar el dinero como enteros en la unidad mínima, comparar con tolerancia usando Number.EPSILON, o usar una biblioteca decimal o BigInt.",
      caption: "El error es pequeño y predecible; lo importante es saber cómo manejarlo.",
    },
    {
      type: "paragraph",
      text:
        "En el video original se presenta esto como una debilidad propia de JavaScript, y se atribuye el error a `parseInt()`. Ninguna de las dos cosas es exacta. El comportamiento viene del estándar IEEE 754 para números de coma flotante, y lo comparten la mayoría de los lenguajes que usan `double`, entre ellos Java, C# y Python (`float`). Lo que sí es cierto es que en JavaScript lo encuentras con más frecuencia, porque no hay un tipo entero aparte que te proteja.",
    },
    {
      type: "playground",
      title: "Experimento 11 · El error de punto flotante y cómo manejarlo",
      description: "Los resultados exactos dependen de la representación binaria; cada línea muestra una estrategia.",
      code: L(
        "console.log(0.1 + 0.2);",
        "console.log(0.1 + 0.2 === 0.3);",
        "",
        "// Comparar con tolerancia",
        "console.log(Math.abs(0.1 + 0.2 - 0.3) < Number.EPSILON);",
        "",
        "console.log(1.1 + 2.2);",
        "console.log(0.57 * 100);",
        "",
        "// Dinero: trabajar con enteros (centavos) y dividir al final",
        "console.log((10 + 20) / 100);",
        "",
        "// Redondear el resultado y volverlo número",
        "console.log(Number((0.1 + 0.2).toFixed(2)));",
      ),
      expected: L(
        "0.30000000000000004",
        "false",
        "true",
        "3.3000000000000003",
        "56.99999999999999",
        "0.3",
        "0.3",
      ),
    },
    {
      type: "paragraph",
      text:
        "Si tu aplicación hace muchos cálculos aritméticos con decimales, como contabilidad o finanzas, hay dos caminos. El primero es guardar las cantidades como enteros en la unidad más pequeña (centavos en lugar de pesos) y dividir solo para mostrar. El segundo es apoyarse en una librería decimal (por ejemplo `decimal.js` o `big.js`) que resuelve el problema por ti. Existe además una propuesta de TC39 llamada Decimal para incorporar decimales exactos al lenguaje, pero todavía no forma parte del estándar.",
    },
    {
      type: "heading",
      level: 3,
      text: "Enteros grandes: el límite seguro y BigInt",
    },
    {
      type: "paragraph",
      text:
        "Como los números son de 64 bits, los enteros solo son exactos hasta cierto tamaño: `Number.MAX_SAFE_INTEGER`, que vale 9007199254740991 (2⁵³ − 1). Por encima de ese valor, números distintos pueden dar el mismo resultado. Para enteros más grandes existe `bigint`, que no se puede mezclar con `number` en una operación.",
    },
    {
      type: "playground",
      title: "Experimento 12 · Enteros seguros y BigInt",
      description: "Mezclar bigint con number lanza un TypeError.",
      code: L(
        "console.log(Number.MAX_SAFE_INTEGER);",
        "console.log(2 ** 53 === 2 ** 53 + 1);",
        "console.log(Number.isSafeInteger(2 ** 53));",
        "",
        "// BigInt conserva todos los dígitos",
        "console.log(String(9007199254740993n + 1n));",
        "",
        "try {",
        "  console.log(10n + 1);",
        "} catch (e) {",
        "  console.log(e.name);",
        "}",
      ),
      expected: L("9007199254740991", "true", "false", "9007199254740994", "TypeError"),
    },

    // ───────────────────────── Estáticos vs instancia ─────────────────────────
    {
      type: "heading",
      level: 2,
      text: "¿Por qué toFixed() se llama desde la variable y parseInt() no?",
    },
    {
      type: "paragraph",
      text:
        "Habrás notado que escribimos `c.toFixed(1)`, pero `parseInt(d)`. En el video se explica con la analogía de `var` y el objeto `window`, y se dice que ambos son métodos del constructor `Number`. Es una buena intuición, pero conviene matizarla, porque hay dos casos distintos.",
    },
    {
      type: "table",
      caption: "Dos tipos de funciones relacionadas con los números",
      headers: ["Tipo", "Cómo se llama", "Ejemplos"],
      rows: [
        [
          "De instancia: actúan sobre un número concreto",
          "Sobre el valor: `c.toFixed(2)`",
          "`toFixed()`, `toString()`, `toLocaleString()`",
        ],
        [
          "Estáticas: no dependen de ningún número en particular",
          "Sobre el constructor: `Number.parseFloat(d)`",
          "`Number.parseInt()`, `Number.parseFloat()`, `Number.isNaN()`, `Number.isInteger()`",
        ],
        [
          "Globales: existen desde siempre en el objeto global",
          "Directamente: `parseInt(d)`",
          "`parseInt()`, `parseFloat()`, `isNaN()`, `isFinite()`",
        ],
      ],
    },
    {
      type: "paragraph",
      text:
        "`parseInt()` y `parseFloat()` son funciones globales (cuelgan del objeto global, igual que lo que declarabas con `var` en un navegador). Desde ECMAScript 2015 también existen como `Number.parseInt()` y `Number.parseFloat()`, y son la misma función: no es una copia. Por eso puedes escribir de forma indistinta `parseFloat(d)` o `Number.parseFloat(d)`. En cambio, `toFixed()` es una función de instancia: no existe como función global.",
    },
    {
      type: "playground",
      title: "Experimento 13 · Dónde vive cada función",
      description: "Comprueba que las funciones globales y las estáticas son la misma.",
      code: L(
        "console.log(Number.parseInt === parseInt);",
        "console.log(Number.parseFloat === parseFloat);",
        "console.log(globalThis.parseInt === parseInt);",
        "",
        'console.log(Number.prototype.hasOwnProperty("toFixed"));',
        'console.log(Number.hasOwnProperty("toFixed"));',
        'console.log(Number.hasOwnProperty("parseFloat"));',
        "console.log(typeof (7.19).parseInt);",
      ),
      expected: L("true", "true", "true", "true", "false", "true", "undefined"),
    },
    {
      type: "callout",
      variant: "info",
      text:
        "Esto se entiende del todo con los prototipos y los constructores, que veremos en la parte de programación orientada a objetos con JavaScript. Por ahora basta con quedarse con la regla práctica: las funciones que actúan sobre un número se llaman desde el número; las que lo convierten o lo comprueban se llaman desde `Number` o directamente.",
    },

    // ───────────────────────── Datos que cambian ─────────────────────────
    { type: "heading", level: 2, text: "Datos que suelen aparecer desactualizados" },
    {
      type: "table",
      caption: "Material antiguo frente a información verificada",
      headers: ["Suele decirse", "Información verificada"],
      rows: [
        [
          "JavaScript solo tiene un tipo numérico.",
          "`number` es el tipo principal para enteros y decimales, pero desde ECMAScript 2020 existe también `bigint` para enteros de cualquier tamaño.",
        ],
        [
          "`toFixed()` redondea un número.",
          "Devuelve una cadena de texto, no un número. Si necesitas un número, conviértelo con `Number()`.",
        ],
        [
          "Para formatear números hay que usar una librería externa.",
          "El lenguaje incluye `Intl.NumberFormat` y `toLocaleString()` con separadores, monedas y porcentajes por idioma.",
        ],
        [
          "El error de `12.190000000000001` lo causa `parseInt()`.",
          "Es consecuencia del punto flotante binario (IEEE 754). Aparece con cualquier suma, por ejemplo `0.1 + 0.2`.",
        ],
        [
          "Es una debilidad exclusiva de JavaScript.",
          "La comparten los lenguajes que usan números de coma flotante binaria de doble precisión.",
        ],
        [
          "`parseInt()` y `parseFloat()` son métodos de los números.",
          "Son funciones globales y, desde ECMAScript 2015, también estáticas de `Number` (la misma función).",
        ],
        [
          "`parseInt(\"08\")` da 0 porque se interpreta como octal.",
          "Ya no ocurre desde ECMAScript 5; da 8. Aun así, es buena práctica indicar la base: `parseInt(texto, 10)`.",
        ],
        [
          "`new Number(1)` es la forma de crear un número.",
          "Crea un objeto envoltorio. Usa literales y `Number(valor)` para convertir.",
        ],
        [
          "No hay decimales exactos en JavaScript.",
          "Hay librerías decimales y la propuesta Decimal de TC39, aún en proceso y no estandarizada.",
        ],
      ],
    },

    // ───────────────────────── FAQ ─────────────────────────
    {
      type: "accordion",
      title: "Preguntas frecuentes de esta lección",
      items: [
        {
          title: "¿Uso `Number()`, `parseInt()` o `parseFloat()`?",
          text:
            "Para validar que un texto es un número, `Number()`: si no lo es, da `NaN`. Para extraer el comienzo numérico de un texto como `\"42px\"`, `parseInt(texto, 10)` o `parseFloat(texto)`. Con un campo `type=\"number\"`, `valueAsNumber`.",
        },
        {
          title: "¿Por qué `Number(\"\")` da 0?",
          text:
            "Porque el texto vacío o con solo espacios se convierte en 0. Es una fuente típica de errores con campos sin rellenar: valida antes de convertir, o comprueba que el texto no esté vacío (`texto.trim() !== \"\"`).",
        },
        {
          title: "¿Cómo redondeo y sigo teniendo un número?",
          text:
            "`Number(x.toFixed(2))`. Ten presente los casos de redondeo del punto flotante y, para dinero, trabaja con enteros o una librería decimal.",
        },
        {
          title: "¿Por qué `typeof NaN` es `\"number\"`?",
          text:
            "Porque `NaN` es un valor del tipo `number` que representa un resultado numérico inválido. Para distinguirlo usa `Number.isNaN()`.",
        },
        {
          title: "¿Cuándo uso `bigint`?",
          text:
            "Cuando necesites enteros que superan `Number.MAX_SAFE_INTEGER`, como identificadores muy largos. No se puede mezclar con `number` en una operación y no sirve para decimales.",
        },
        {
          title: "¿Qué es `Math`?",
          text:
            "Un objeto con constantes y funciones matemáticas (`Math.round()`, `Math.trunc()`, `Math.max()`, `Math.random()`…). Lo veremos más adelante; aquí solo usamos `Math.trunc()` y `Math.abs()`.",
        },
        {
          title: "¿Y los números con separador `_` como `1_000_000`?",
          text:
            "Son válidos en el código desde ECMAScript 2021 y solo ayudan a leer: el valor es `1000000`. No funcionan dentro de un texto que conviertes con `Number()`.",
        },
      ],
    },

    // ───────────────────────── Cierre ─────────────────────────
    { type: "heading", level: 2, text: "Cierre" },
    {
      type: "paragraph",
      text:
        "Ya sabes lo esencial de los números: un tipo para enteros y decimales, cómo darles formato, cómo convertir texto sin sorpresas y por qué un decimal puede traer una cola de ceros. En la próxima lección veremos los tipos de datos booleanos.",
    },
    {
      type: "checklist",
      title: "Antes de pasar al Día 9, verifica que puedes explicar…",
      items: [
        "Por qué `5` y `5.0` son el mismo valor y qué es `bigint`.",
        "Qué devuelve `toFixed()` (texto) y qué formas hay de dar formato a un número para mostrarlo.",
        "En qué se diferencian `Number()`, `parseInt()` y `parseFloat()` con `\"5.6px\"`, `\"\"` y `\"1,5\"`.",
        "Por qué el valor de un campo de formulario es texto y qué pasa al sumarlo con un número.",
        "Qué es `NaN`, por qué `NaN === NaN` es `false` y cómo detectarlo.",
        "Por qué `0.1 + 0.2` no da `0.3` y dos estrategias para manejarlo.",
        "Qué diferencia hay entre `c.toFixed()` y `Number.parseFloat()`.",
      ],
    },
    { type: "heading", level: 3, text: "Fuentes consultadas (noviembre de 2026)" },
    {
      type: "list",
      items: [
        "[MDN: Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)",
        "[MDN: Number.prototype.toFixed()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed)",
        "[MDN: parseInt()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt)",
        "[MDN: parseFloat()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseFloat)",
        "[MDN: Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat)",
        "[MDN: BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)",
        "[MDN: HTMLInputElement.valueAsNumber](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/valueAsNumber)",
        "[MDN: input type=number](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/number)",
        "[TC39: propuesta Decimal](https://github.com/tc39/proposal-decimal)",
      ],
    },
  ],
  selfCheck: [
    {
      question: "¿Cuál es el tipo de `typeof 7.19`?",
      options: ["\"float\"", "\"decimal\"", "\"number\"", "\"double\""],
      correctIndex: 2,
      explanation:
        "JavaScript usa el tipo `number` tanto para enteros como para decimales.",
    },
    {
      question: "¿Qué devuelve `(7.19).toFixed(1)`?",
      options: ["El número 7.2", "El texto \"7.2\"", "El número 7", "Un error"],
      correctIndex: 1,
      explanation:
        "`toFixed()` devuelve una cadena de texto. Por eso `(7.19).toFixed(1) + 1` da \"7.21\".",
    },
    {
      question: "¿Qué devuelve `7.19 + \"5.6\"`?",
      options: ["12.79", "\"7.195.6\"", "NaN", "Un error"],
      correctIndex: 1,
      explanation:
        "Si un operando es texto, `+` concatena: el número se convierte en texto y se pega al otro.",
    },
    {
      question: "¿Qué devuelve `parseInt(\"5.6\")`?",
      options: ["5.6", "6", "5", "NaN"],
      correctIndex: 2,
      explanation:
        "`parseInt()` lee solo la parte entera inicial y no redondea.",
    },
    {
      question: "¿Qué devuelve `Number(\"5.6px\")`?",
      options: ["5.6", "5", "0", "NaN"],
      correctIndex: 3,
      explanation:
        "`Number()` exige que todo el texto sea numérico. `parseFloat(\"5.6px\")` sí devolvería 5.6.",
    },
    {
      question: "¿Qué devuelve `Number(\"\")`?",
      options: ["NaN", "0", "undefined", "Un error"],
      correctIndex: 1,
      explanation:
        "El texto vacío (o solo espacios) se convierte en 0. Conviene validar antes de convertir.",
    },
    {
      question: "¿Cómo se detecta correctamente un `NaN`?",
      options: [
        "valor === NaN",
        "Number.isNaN(valor)",
        "typeof valor === \"NaN\"",
        "valor == NaN",
      ],
      correctIndex: 1,
      explanation:
        "`NaN` no es igual ni siquiera a sí mismo, así que se usa `Number.isNaN()`.",
    },
    {
      question: "¿Por qué `0.1 + 0.2` no da exactamente `0.3`?",
      options: [
        "Es un fallo exclusivo de JavaScript",
        "Porque los números se guardan en binario y 0.1 y 0.2 no tienen representación exacta",
        "Porque `+` redondea mal",
        "Porque `parseFloat()` está roto",
      ],
      correctIndex: 1,
      explanation:
        "Es una consecuencia del estándar IEEE 754, compartida por los lenguajes que usan coma flotante binaria de doble precisión.",
    },
    {
      question: "¿Cuál es una buena estrategia para manejar dinero sin errores de decimales?",
      options: [
        "Guardar los importes como enteros en la unidad mínima (centavos) y dividir al mostrar",
        "Usar siempre `toFixed(20)`",
        "Usar `new Number()`",
        "Convertir todo a texto",
      ],
      correctIndex: 0,
      explanation:
        "Con enteros no hay error de punto flotante. Otra opción es una librería decimal.",
    },
    {
      question: "¿Qué relación hay entre `parseInt` y `Number.parseInt`?",
      options: [
        "Son dos funciones distintas con el mismo nombre",
        "Son la misma función",
        "`Number.parseInt` no existe",
        "`parseInt` solo existe en navegadores",
      ],
      correctIndex: 1,
      explanation:
        "Desde ECMAScript 2015 `Number.parseInt === parseInt` es `true`.",
    },
  ],
};
