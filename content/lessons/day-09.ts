import type { Lesson } from "@/lib/types";

// Une líneas de código sin tener que escapar backticks ni `${}` dentro de template literals.
const L = (...lines: string[]) => lines.join("\n");

// Contenido validado contra fuentes actuales en noviembre de 2026 (ver sección "Fuentes").
export const day09: Lesson = {
  day: 9,
  slug: "booleanos-truthy-falsy",
  title: "Booleanos: true, false y valores truthy y falsy",
  section: "Tipos de datos básicos",
  estimatedMinutes: 45,
  icon: "✅",
  objectives: [
    "Reconocer los dos valores booleanos, `true` y `false`, y distinguirlos de las cadenas \"true\" y \"false\"",
    "Convertir un valor a booleano con `Boolean()` y con `!!`, y saber por qué no usar `new Boolean()`",
    "Memorizar la lista completa de valores falsy y entender que todo lo demás es truthy",
    "Evitar las trampas habituales: `\"0\"`, `[]` y `{}` son truthy, y `[] == false` es `true`",
    "Entender que `||`, `&&` y `??` devuelven uno de sus operandos, y cuándo conviene cada uno",
  ],
  blocks: [
    // ───────────────────────── Apertura ─────────────────────────
    {
      type: "paragraph",
      text:
        "En la lección anterior vimos los números. Hoy vemos el booleano, un tipo de dato presente en prácticamente todos los lenguajes de programación. Solo tiene dos valores posibles, `true` (verdadero) y `false` (falso), y es la base de todas las decisiones de un programa: si el usuario inició sesión o no, si un campo está lleno o vacío, si un número es mayor que otro.",
    },
    {
      type: "keyFacts",
      items: [
        { value: "true / false", label: "Los dos únicos valores del tipo boolean" },
        { value: "Boolean()", label: "Convierte cualquier valor a booleano (sin new)" },
        { value: "!!", label: "Doble negación: atajo para convertir a booleano" },
        { value: "8 falsy", label: "false, 0, -0, 0n, \"\", null, undefined y NaN" },
        { value: "Truthy", label: "Todo valor que no es falsy" },
        { value: "??", label: "Usa el valor de la derecha solo con null o undefined" },
      ],
    },
    {
      type: "callout",
      variant: "success",
      text:
        "Contenido verificado en noviembre de 2026 con MDN Web Docs (guía de `Boolean`, glosarios Falsy y Truthy y las páginas de los operadores lógicos). Los resultados de los ejemplos se comprobaron ejecutándolos. Al final hay una tabla con datos que suelen aparecer desactualizados y la lista de fuentes.",
    },

    // ───────────────────────── true y false ─────────────────────────
    { type: "heading", level: 2, text: "Los dos valores: true y false" },
    {
      type: "paragraph",
      text:
        "Un booleano solo puede ser `true` o `false`. Escríbelos sin comillas y en minúscula: son palabras reservadas del lenguaje, y por eso tu editor los colorea distinto de un texto. Si los pones entre comillas (`\"true\"`) ya no son booleanos sino cadenas de texto, y se comportan como tales. Puedes comprobarlo con el operador `typeof`.",
    },
    {
      type: "paragraph",
      text:
        "En la práctica casi nunca escribes `true` o `false` a mano: los booleanos suelen ser el resultado de una comparación (`edad >= 18`), de una negación (`!activo`) o de una función que responde sí o no, como `Array.isArray()`.",
    },
    {
      type: "playground",
      title: "Experimento 1 · Booleanos frente a cadenas",
      description: "Observa el tipo de cada valor y que las comparaciones producen booleanos.",
      code: L(
        "console.log(typeof true, typeof false);",
        'console.log(typeof "true");',
        'console.log(true === "true");',
        "",
        "const edad = 20;",
        "console.log(edad >= 18, typeof (edad >= 18));",
        'console.log(5 === "5", 5 == "5");',
        "console.log(3 > 2 && 2 > 1);",
      ),
      expected: L("boolean boolean", "string", "false", "true boolean", "false true", "true"),
    },
    {
      type: "callout",
      variant: "info",
      text:
        "En el material antiguo se dice que el booleano es «el último tipo de dato convencional». En realidad hay siete tipos primitivos: `string`, `number`, `bigint`, `boolean`, `undefined`, `null` y `symbol`. Los números y las cadenas ya los vimos; `undefined`, `null` y `NaN` son el tema de la próxima lección.",
    },

    // ───────────────────────── Constructor ─────────────────────────
    { type: "heading", level: 2, text: "Crear booleanos: Boolean() y por qué evitar new Boolean()" },
    {
      type: "paragraph",
      text:
        "Igual que con los números, existe un constructor, `Boolean`. Se puede usar de dos maneras muy distintas. Llamado como función, `Boolean(valor)`, convierte un valor a booleano y devuelve un primitivo. Llamado con `new`, crea un objeto envoltorio, y ahí empiezan los problemas: todos los objetos son truthy, incluso un `Boolean` que envuelve `false`.",
    },
    {
      type: "playground",
      title: "Experimento 2 · Boolean() frente a new Boolean()",
      description: "Un objeto Boolean que contiene false se comporta como true en un condicional.",
      code: L(
        "console.log(typeof Boolean(0));",
        "console.log(typeof new Boolean(0));",
        "",
        'console.log(new Boolean(false) ? "verdadero" : "falso");',
        "console.log(Boolean(new Boolean(false)));",
        "console.log(new Boolean(false) == false);",
        "console.log(new Boolean(false) === false);",
        "console.log(new Boolean(false).valueOf());",
      ),
      expected: L("boolean", "object", "verdadero", "true", "true", "false", "false"),
    },
    {
      type: "callout",
      variant: "warning",
      text:
        "Regla práctica: para convertir a booleano usa `Boolean(valor)` o `!!valor`, nunca `new Boolean(valor)`. El material antiguo lo describe como «no es lo óptimo»; en realidad es una fuente de errores, porque `if (new Boolean(false))` entra en el bloque.",
    },
    {
      type: "image",
      src: "/img/dia-09/convertir-a-booleano.svg",
      alt: "Tres formas correctas de convertir un valor a booleano: la función Boolean, la doble negación y la conversión automática en un if, while o condicional. Una forma incorrecta: new Boolean, que crea un objeto siempre truthy.",
      caption: "Formas de convertir un valor a booleano, y la que debes evitar.",
    },

    // ───────────────────────── Truthy y falsy ─────────────────────────
    { type: "heading", level: 2, text: "Valores truthy y falsy" },
    {
      type: "paragraph",
      text:
        "Existen valores que no son ni `true` ni `false`, pero que JavaScript convierte a uno de los dos cuando los necesita en un contexto booleano, como la condición de un `if`. A los que se convierten en `false` se les llama falsy; a todos los demás, truthy. En el material antiguo se dice que «tienden» a verdadero o a falso, pero no es una tendencia: la conversión está definida con exactitud por el estándar.",
    },
    {
      type: "paragraph",
      text:
        "Lo más útil es memorizar la lista corta, la de los falsy: todo lo que no esté en ella es truthy. Según MDN son `false`, `0`, `-0`, `0n` (el cero de BigInt), la cadena vacía `\"\"` (con comillas simples, dobles o acento grave), `null`, `undefined` y `NaN`. Además existe un noveno heredado, `document.all`, que está en desuso.",
    },
    {
      type: "image",
      src: "/img/dia-09/valores-falsy.svg",
      alt: "Los valores falsy son false, 0, menos 0, 0n, la cadena vacía, null, undefined y NaN. Todo lo demás es truthy, incluidos la cadena 0, la cadena false, un espacio, un arreglo vacío, un objeto vacío, los números negativos e Infinity.",
      caption: "Ocho valores falsy; todo lo demás es truthy.",
    },
    {
      type: "playground",
      title: "Experimento 3 · Los valores falsy",
      description: "Convierte cada valor falsy con Boolean(). Todos dan false.",
      code: L(
        'console.log("false:", Boolean(false));',
        'console.log("0:", Boolean(0));',
        'console.log("-0:", Boolean(-0));',
        'console.log("0n:", Boolean(0n));',
        'console.log("cadena vacía:", Boolean(""));',
        'console.log("null:", Boolean(null));',
        'console.log("undefined:", Boolean(undefined));',
        'console.log("NaN:", Boolean(NaN));',
      ),
      expected: L(
        "false: false",
        "0: false",
        "-0: false",
        "0n: false",
        "cadena vacía: false",
        "null: false",
        "undefined: false",
        "NaN: false",
      ),
    },
    {
      type: "paragraph",
      text:
        "Ahora los valores que más confunden: los que parecen vacíos o negativos pero son truthy. Un número distinto de cero (incluso negativo o decimal), una cadena con cualquier carácter (aunque sea solo un espacio en blanco), un arreglo vacío `[]`, un objeto vacío `{}` o una fecha son truthy. Y también lo son las cadenas `\"0\"` y `\"false\"`, porque no están vacías.",
    },
    {
      type: "playground",
      title: "Experimento 4 · Valores truthy que sorprenden",
      description: "Todos los resultados son true, aunque algunos parezcan «vacíos» o «falsos».",
      code: L(
        'console.log(\'"0":\', Boolean("0"));',
        'console.log(\'"false":\', Boolean("false"));',
        'console.log("espacio en blanco:", Boolean(" "));',
        'console.log("[]:", Boolean([]));',
        'console.log("{}:", Boolean({}));',
        'console.log("-1:", Boolean(-1));',
        'console.log("3.14:", Boolean(3.14));',
        'console.log("Infinity:", Boolean(Infinity));',
        'console.log("fecha:", Boolean(new Date()));',
      ),
      expected: L(
        '"0": true',
        '"false": true',
        "espacio en blanco: true",
        "[]: true",
        "{}: true",
        "-1: true",
        "3.14: true",
        "Infinity: true",
        "fecha: true",
      ),
    },
    {
      type: "callout",
      variant: "info",
      text:
        "El documento de MDN también menciona `document.all` como el único objeto falsy. Es una rareza heredada del DOM de navegadores antiguos, no estándar y desaconsejada: no lo necesitarás. Los objetos normales, vacíos o no, son siempre truthy.",
    },

    // ───────────────────────── Negación ─────────────────────────
    { type: "heading", level: 3, text: "El operador ! y el atajo !!" },
    {
      type: "paragraph",
      text:
        "El operador `!` (NOT lógico) convierte su operando a booleano y lo invierte. Si lo aplicas dos veces, `!!valor`, el resultado es la conversión a booleano del valor original: es un atajo muy usado equivalente a `Boolean(valor)`. Cuál usar es cuestión de estilo; `Boolean()` es más explícito y `!!` más corto.",
    },
    {
      type: "playground",
      title: "Experimento 5 · Negación y doble negación",
      description: "El primer ! invierte; el segundo vuelve al valor booleano original.",
      code: L(
        'console.log(!0, !"hola");',
        'console.log(!!"hola", !!0);',
        "console.log(!!null, !![]);",
        'console.log(Boolean("hola") === !!"hola");',
      ),
      expected: L("true false", "true false", "false true", "true"),
    },

    // ───────────────────────── Trampa == ─────────────────────────
    { type: "heading", level: 3, text: "Una trampa: truthy no es lo mismo que == true" },
    {
      type: "paragraph",
      text:
        "Ser truthy o falsy es una propiedad de la conversión a booleano. El operador de igualdad flexible `==` sigue otras reglas: convierte los operandos a número o texto antes de compararlos. Por eso hay valores truthy que son `== false`, como el arreglo vacío. Es la razón principal por la que se recomienda usar siempre `===`.",
    },
    {
      type: "playground",
      title: "Experimento 6 · Truthy frente a == false",
      description: "El arreglo vacío es truthy, y aun así `[] == false` es true.",
      code: L(
        'console.log("Boolean([]):", Boolean([]));',
        'console.log("[] == false:", [] == false);',
        'console.log(\'"0" == false:\', "0" == false);',
        'console.log(\'"" == false:\', "" == false);',
        'console.log("null == false:", null == false);',
        'console.log("NaN == false:", NaN == false);',
        'console.log("[] === false:", [] === false);',
      ),
      expected: L(
        "Boolean([]): true",
        "[] == false: true",
        '"0" == false: true',
        '"" == false: true',
        "null == false: false",
        "NaN == false: false",
        "[] === false: false",
      ),
    },
    {
      type: "callout",
      variant: "info",
      text:
        "MDN recomienda escribir `if (condicion)` y `if (!condicion)` en lugar de `if (condicion === true)`: así aprovechas la conversión a booleano. Y si necesitas distinguir un valor concreto (por ejemplo, un `0` válido de un campo vacío), compara de forma explícita con `===`.",
    },

    // ───────────────────────── Operadores lógicos ─────────────────────────
    { type: "heading", level: 2, text: "Dónde importa: condicionales y operadores lógicos" },
    {
      type: "paragraph",
      text:
        "Los valores truthy y falsy se usan constantemente dentro de los condicionales (`if`, `while`, el operador ternario `? :`), que veremos más adelante. Hay una consecuencia que conviene adelantar: los operadores lógicos `||` y `&&` no devuelven necesariamente `true` o `false`, sino uno de sus operandos. `||` devuelve el primer valor truthy y `&&` el primer falsy (o el último si todos son truthy).",
    },
    {
      type: "paragraph",
      text:
        "Esto da lugar a un patrón muy extendido para valores por defecto: `nombre || \"anónimo\"`. Pero tiene un fallo: si el valor es un `0` o una cadena vacía legítimos, también se reemplaza. Desde ECMAScript 2020 existe `??` (fusión de nulos), que solo usa el valor de la derecha cuando el de la izquierda es `null` o `undefined`.",
    },
    {
      type: "image",
      src: "/img/dia-09/operadores-logicos.svg",
      alt: "Tabla con seis expresiones: 0 || 10 da 10; la cadena vacía || anónimo da anónimo; 0 ?? 10 da 0; null ?? 10 da 10; true && dog da dog; 0 && dog da 0.",
      caption: "Los operadores lógicos devuelven uno de sus operandos.",
    },
    {
      type: "playground",
      title: "Experimento 7 · ||, && y ??",
      description: "Observa qué hace cada operador con un 0, que es falsy pero puede ser un dato válido.",
      code: L(
        "console.log(0 || 10);",
        'console.log("" || "sin nombre");',
        "console.log(0 ?? 10);",
        "console.log(null ?? 10);",
        'console.log(true && "dog");',
        'console.log(0 && "dog");',
        "",
        "// Una cantidad válida de 0",
        "let cantidad = 0;",
        "console.log(cantidad || 1, cantidad ?? 1);",
      ),
      expected: L("10", "sin nombre", "0", "10", "dog", "0", "1 0"),
    },
    {
      type: "paragraph",
      text:
        "Por último, los booleanos también participan en operaciones aritméticas y de texto, pero rara vez conviene aprovecharlo: `true` se convierte en 1 y `false` en 0 al convertir a número, y en `\"true\"` o `\"false\"` al concatenar con texto.",
    },
    {
      type: "playground",
      title: "Experimento 8 · Booleanos convertidos a número y a texto",
      description: "Recuerda la lección sobre `+`: con texto concatena, con números suma.",
      code: L(
        "console.log(Number(true), Number(false));",
        "console.log(true + true);",
        "console.log(String(true));",
        'console.log(true + "1");',
      ),
      expected: L("1 0", "2", "true", "true1"),
    },

    // ───────────────────────── Tres valores particulares ─────────────────────────
    { type: "heading", level: 2, text: "Adelanto: null, undefined y NaN" },
    {
      type: "paragraph",
      text:
        "En la segunda lección vimos que JavaScript tiene valores muy particulares que también aparecen en la lista de falsy: `null`, `undefined` y `NaN`. Hay una precisión: `NaN` no es un tipo aparte, sino un valor especial del tipo `number`, como vimos en la lección de números. En la próxima lección se explica con calma la diferencia entre `null` y `undefined`, que incluso programadores con experiencia confunden a veces.",
    },

    // ───────────────────────── Datos que cambian ─────────────────────────
    { type: "heading", level: 2, text: "Datos que suelen aparecer desactualizados" },
    {
      type: "table",
      caption: "Material antiguo frente a información verificada",
      headers: ["Suele decirse", "Información verificada"],
      rows: [
        [
          "El booleano es el último tipo de dato convencional.",
          "Hay siete tipos primitivos: `string`, `number`, `bigint`, `boolean`, `undefined`, `null` y `symbol`.",
        ],
        [
          "Los falsy son `false`, `null`, `undefined`, `0`, `NaN` y la cadena vacía.",
          "La lista oficial tiene ocho valores: además de esos seis, `-0` y `0n`. A ellos se suma `document.all`, heredado y no estándar.",
        ],
        [
          "Los valores «tienden» a verdadero o a falso.",
          "No es una tendencia: el estándar define con exactitud qué valores son falsy. Todo lo demás es truthy.",
        ],
        [
          "Crear booleanos con `new Boolean()` es válido pero no es lo óptimo.",
          "Es una trampa: crea un objeto, y todo objeto es truthy, incluso `new Boolean(false)`. Usa `Boolean(valor)` o `!!valor`.",
        ],
        [
          "`null`, `undefined` y `NaN` son tres valores primitivos especiales.",
          "`null` y `undefined` son tipos primitivos. `NaN` es un valor del tipo `number`.",
        ],
        [
          "Un arreglo vacío o un objeto vacío son falsy.",
          "Son truthy. Para saber si un arreglo está vacío se comprueba su `length`.",
        ],
        [
          "Para valores por defecto basta con `||`.",
          "`||` también reemplaza `0` y `\"\"`. Desde ECMAScript 2020 existe `??`, que solo actúa con `null` y `undefined`.",
        ],
      ],
    },

    // ───────────────────────── FAQ ─────────────────────────
    {
      type: "accordion",
      title: "Preguntas frecuentes de esta lección",
      items: [
        {
          title: "¿Por qué `\"0\"` y `\"false\"` son truthy?",
          text:
            "Porque son cadenas con contenido. En JavaScript solo la cadena vacía es falsy; el texto no se interpreta, sea cual sea.",
        },
        {
          title: "¿Cómo compruebo si un arreglo tiene elementos?",
          text:
            "Con su longitud: `if (lista.length)` funciona porque `0` es falsy y cualquier otro número es truthy. Si prefieres ser explícito, `lista.length > 0`.",
        },
        {
          title: "¿Cuándo uso `!!`?",
          text:
            "Cuando necesitas un booleano de verdad y no el valor original, por ejemplo al devolver el resultado de una función. En un `if` no hace falta: la conversión ya es automática.",
        },
        {
          title: "¿`==` o `===`?",
          text:
            "Casi siempre `===`. El operador `==` convierte los tipos antes de comparar y produce resultados difíciles de recordar, como `[] == false`.",
        },
        {
          title: "¿Puedo usar `??` ya?",
          text:
            "Sí. Forma parte del estándar desde ECMAScript 2020 y lo soportan los navegadores y versiones de Node.js actuales.",
        },
        {
          title: "¿`NaN` es falsy?",
          text:
            "Sí. Y como `NaN === NaN` es `false`, para detectarlo se usa `Number.isNaN()`.",
        },
      ],
    },

    // ───────────────────────── Cierre ─────────────────────────
    { type: "heading", level: 2, text: "Cierre" },
    {
      type: "paragraph",
      text:
        "Con esto cierras los tipos de datos básicos más habituales: cadenas, números y booleanos. Ya sabes convertir a booleano, recitar la lista de falsy y evitar las trampas más comunes. En la próxima lección veremos `undefined`, `null` y `NaN`.",
    },
    {
      type: "checklist",
      title: "Antes de pasar al Día 10, verifica que puedes explicar…",
      items: [
        "Qué diferencia hay entre `true` y `\"true\"`, y cómo lo comprobarías con `typeof`.",
        "Por qué se usa `Boolean(valor)` o `!!valor` y no `new Boolean(valor)`.",
        "Los ocho valores falsy: `false`, `0`, `-0`, `0n`, `\"\"`, `null`, `undefined` y `NaN`.",
        "Por qué `\"0\"`, `[]`, `{}` y un espacio en blanco son truthy.",
        "Por qué `[] == false` es `true` aunque `[]` sea truthy, y qué operador de igualdad conviene usar.",
        "Qué devuelven `0 || 10`, `0 ?? 10` y `0 && \"dog\"`.",
      ],
    },
    { type: "heading", level: 3, text: "Fuentes consultadas (noviembre de 2026)" },
    {
      type: "list",
      items: [
        "[MDN: Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)",
        "[MDN: Falsy](https://developer.mozilla.org/en-US/docs/Glossary/Falsy)",
        "[MDN: Truthy](https://developer.mozilla.org/en-US/docs/Glossary/Truthy)",
        "[MDN: Primitive](https://developer.mozilla.org/en-US/docs/Glossary/Primitive)",
        "[MDN: Logical NOT (!)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_NOT)",
        "[MDN: Logical OR (||)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_OR)",
        "[MDN: Logical AND (&&)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_AND)",
        "[MDN: Nullish coalescing operator (??)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing)",
        "[MDN: Equality comparisons and sameness](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Equality_comparisons_and_sameness)",
      ],
    },
  ],
  selfCheck: [
    {
      question: "¿Cuántos valores puede tener el tipo boolean?",
      options: ["Uno", "Dos: true y false", "Tres", "Infinitos"],
      correctIndex: 1,
      explanation: "Solo `true` y `false`, escritos sin comillas.",
    },
    {
      question: "¿Qué devuelve `typeof \"true\"`?",
      options: ["\"boolean\"", "\"string\"", "\"true\"", "\"object\""],
      correctIndex: 1,
      explanation: "Entre comillas es una cadena de texto, no un booleano.",
    },
    {
      question: "¿Cuál es la forma correcta de convertir un valor a booleano?",
      options: ["new Boolean(valor)", "Boolean(valor)", "boolean(valor)", "toBoolean(valor)"],
      correctIndex: 1,
      explanation:
        "`Boolean(valor)` sin `new` devuelve un primitivo. `new Boolean(valor)` crea un objeto, que siempre es truthy.",
    },
    {
      question: "¿Qué hace `if (new Boolean(false))`?",
      options: [
        "No entra en el bloque",
        "Entra en el bloque, porque un objeto siempre es truthy",
        "Lanza un error",
        "Devuelve undefined",
      ],
      correctIndex: 1,
      explanation: "Todos los objetos son truthy, incluso uno que envuelve `false`.",
    },
    {
      question: "¿Cuál de estos valores es falsy?",
      options: ["\"0\"", "[]", "0n", "\"false\""],
      correctIndex: 2,
      explanation:
        "`0n` (el cero de BigInt) es falsy. `\"0\"`, `[]` y `\"false\"` son truthy.",
    },
    {
      question: "¿Cuál de estos valores es truthy?",
      options: ["\"\"", "null", "NaN", "\" \" (un espacio)"],
      correctIndex: 3,
      explanation:
        "Una cadena con cualquier carácter, aunque sea un espacio, es truthy. Solo la cadena vacía es falsy.",
    },
    {
      question: "¿Qué devuelve `!!\"hola\"`?",
      options: ["false", "true", "\"hola\"", "undefined"],
      correctIndex: 1,
      explanation:
        "La doble negación convierte el valor a booleano. Una cadena no vacía es truthy, así que da `true`.",
    },
    {
      question: "¿Qué devuelve `0 || 10`?",
      options: ["0", "10", "true", "false"],
      correctIndex: 1,
      explanation: "`||` devuelve el primer operando truthy. Como `0` es falsy, devuelve `10`.",
    },
    {
      question: "¿Qué devuelve `0 ?? 10`?",
      options: ["10", "0", "null", "undefined"],
      correctIndex: 1,
      explanation:
        "`??` solo usa el valor de la derecha cuando el de la izquierda es `null` o `undefined`. `0` se conserva.",
    },
    {
      question: "¿Por qué `[] == false` da `true` aunque `[]` sea truthy?",
      options: [
        "Porque [] es falsy",
        "Porque `==` convierte los tipos antes de comparar, con reglas distintas a la conversión booleana",
        "Es un error del navegador",
        "Porque false es un objeto",
      ],
      correctIndex: 1,
      explanation:
        "`==` convierte ambos lados a número o texto antes de comparar. Por eso se recomienda `===`.",
    },
  ],
};
