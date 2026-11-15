import type { Lesson } from "@/lib/types";

// Une líneas de código sin tener que escapar backticks ni `${}` dentro de template literals.
const L = (...lines: string[]) => lines.join("\n");

// Contenido validado contra fuentes actuales en noviembre de 2026 (ver sección "Fuentes").
export const day10: Lesson = {
  day: 10,
  slug: "undefined-null-nan",
  title: "undefined, null y NaN: valores ausentes e inválidos",
  section: "Tipos de datos básicos",
  estimatedMinutes: 50,
  icon: "🕳️",
  objectives: [
    "Explicar qué representa `undefined`, qué representa `null` y en qué situaciones aparece cada uno",
    "Reconocer las cuatro situaciones que producen `undefined` y los errores `TypeError` y `ReferenceError` relacionados",
    "Entender el origen de `NaN`, por qué contagia las operaciones y cómo detectarlo correctamente",
    "Aplicar `===`, `== null`, `?.`, `??` y los parámetros por defecto con estos valores",
    "Repasar los siete tipos primitivos y el resultado de `typeof` para cada uno",
  ],
  blocks: [
    // ───────────────────────── Apertura ─────────────────────────
    {
      type: "paragraph",
      text:
        "En la lección anterior vimos los booleanos. Hoy cerramos los valores primitivos con tres casos muy particulares de JavaScript: `undefined`, `null` y `NaN`. Generan confusión incluso entre programadores con experiencia, sobre todo la diferencia entre `null` y `undefined`. Aquí vamos a separar los conceptos con ejemplos que puedes ejecutar.",
    },
    {
      type: "keyFacts",
      items: [
        { value: "undefined", label: "Una variable o propiedad sin valor asignado" },
        { value: "null", label: "Una ausencia de valor puesta a propósito" },
        { value: "NaN", label: "Un resultado numérico inválido (de tipo number)" },
        { value: "typeof null", label: "Devuelve \"object\" por un error histórico" },
        { value: "Number.isNaN()", label: "La forma correcta de detectar NaN" },
        { value: "7 primitivos", label: "string, number, bigint, boolean, undefined, null y symbol" },
      ],
    },
    {
      type: "callout",
      variant: "success",
      text:
        "Contenido verificado en noviembre de 2026 con MDN Web Docs (páginas de `undefined`, `null`, `NaN`, `typeof`, encadenamiento opcional y estructuras de datos). Los resultados de los ejemplos se comprobaron ejecutándolos. Al final hay una tabla con datos que suelen aparecer desactualizados y la lista de fuentes.",
    },
    {
      type: "image",
      src: "/img/dia-10/tres-valores-especiales.svg",
      alt: "Tres tarjetas. undefined: no hay valor, lo asigna JavaScript, typeof devuelve undefined. null: ausencia intencional de objeto, lo asigna el programador o una API, typeof devuelve object. NaN: resultado numérico inválido, typeof devuelve number.",
      caption: "Tres valores especiales, tres significados distintos.",
    },

    // ───────────────────────── undefined ─────────────────────────
    { type: "heading", level: 2, text: "undefined: la variable no tiene valor" },
    {
      type: "paragraph",
      text:
        "Tanto `null` como `undefined` representan un valor ausente, es decir, algo que no tiene valor. La diferencia está en cómo se llega ahí. `undefined` es lo que JavaScript le asigna a algo que no ha sido inicializado. Si declaras una variable y no le das valor (algo que quizá hiciste en un ejemplo inicial de las lecciones de cadenas de texto), JavaScript detecta que no tiene valor y la trata como no definida.",
    },
    {
      type: "paragraph",
      text:
        "No es la única situación. MDN resume las cuatro más comunes: una variable declarada sin valor, un parámetro de función al que no se le pasó argumento, una propiedad que no existe en un objeto y una función que no devuelve nada (sin `return`). En todas ellas el resultado es `undefined`.",
    },
    {
      type: "image",
      src: "/img/dia-10/de-donde-viene-undefined.svg",
      alt: "Cuatro cajas con código: una variable declarada sin valor, un argumento omitido, una propiedad inexistente y una función sin return. Todas producen undefined.",
      caption: "Cuatro situaciones que producen undefined.",
    },
    {
      type: "playground",
      title: "Experimento 1 · Cuándo aparece undefined",
      description: "Cada línea imprime undefined por una razón distinta.",
      code: L(
        "let indefinida;",
        'console.log("variable sin valor:", indefinida);',
        'console.log("typeof:", typeof indefinida);',
        "",
        "function saluda(nombre) { return nombre; }",
        'console.log("argumento omitido:", saluda());',
        "",
        "function sinRetorno() { const x = 1; }",
        'console.log("función sin return:", sinRetorno());',
        "",
        'const persona = { nombre: "Ana" };',
        'console.log("propiedad inexistente:", persona.edad);',
        'console.log("posición fuera del arreglo:", [1, 2][5]);',
      ),
      expected: L(
        "variable sin valor: undefined",
        "typeof: undefined",
        "argumento omitido: undefined",
        "función sin return: undefined",
        "propiedad inexistente: undefined",
        "posición fuera del arreglo: undefined",
      ),
    },
    {
      type: "callout",
      variant: "info",
      text:
        "`undefined` es una propiedad del objeto global, no una palabra reservada, aunque en los navegadores y entornos actuales no se puede modificar ahí. Dentro de una función sí es posible declarar una variable llamada `undefined`, pero MDN lo califica de muy mala idea: no lo hagas.",
    },

    // ───────────────────────── null ─────────────────────────
    { type: "heading", level: 2, text: "null: una ausencia intencional" },
    {
      type: "paragraph",
      text:
        "`null` también es un valor especial que indica que la variable está vacía. La diferencia con `undefined` se suele explicar así: `undefined` es lo que JavaScript asigna cuando detecta que algo no tiene valor, mientras que `null` lo asigna a propósito el programador. Es una buena regla práctica, y a ambos se les puede considerar «valores ausentes».",
    },
    {
      type: "paragraph",
      text:
        "Con una precisión importante: no es el programador el único que produce `null`. Muchas funciones del propio lenguaje y del navegador lo devuelven cuando esperaban un objeto y no lo encontraron: `document.querySelector()` devuelve `null` si ningún elemento coincide, y `\"texto\".match(/z/)` devuelve `null` si no hay coincidencia. MDN lo resume como una diferencia semántica pequeña: `undefined` es la ausencia de un valor y `null` es la ausencia de un objeto.",
    },
    {
      type: "playground",
      title: "Experimento 2 · null, undefined y typeof",
      description: "`typeof null` devuelve \"object\": es un error histórico que no se puede corregir.",
      code: L(
        "const vacia = null;",
        "console.log(vacia, typeof vacia);",
        "console.log(typeof undefined);",
        "",
        "console.log(null === undefined, null == undefined);",
        "console.log(null === null);",
        "console.log(Boolean(null), Boolean(undefined));",
      ),
      expected: L("null object", "undefined", "false true", "true", "false false"),
    },
    {
      type: "callout",
      variant: "warning",
      text:
        "No uses `typeof` para detectar `null`: devuelve `\"object\"`, igual que para un objeto cualquiera. Compáralo directamente con `valor === null`. Este comportamiento se remonta a los primeros días del lenguaje y no puede corregirse sin romper millones de páginas web.",
    },

    // ───────────────────────── errores ─────────────────────────
    { type: "heading", level: 3, text: "Dos errores que se confunden: TypeError y ReferenceError" },
    {
      type: "paragraph",
      text:
        "Acceder a una propiedad de `null` o de `undefined` lanza un `TypeError`, porque no hay un objeto del que leerla. Una variable que no existe en absoluto (nunca declarada) lanza un `ReferenceError`, que es otro caso distinto de `undefined`: una variable declarada sin valor existe y vale `undefined`. Curiosamente, `typeof` es la única forma de consultar una variable no declarada sin que explote.",
    },
    {
      type: "playground",
      title: "Experimento 3 · Tres tipos de «no hay nada»",
      description: "Cada caso falla (o no) de forma diferente.",
      code: L(
        'try { null.nombre; } catch (e) { console.log("null:", e.name); }',
        'try { undefined.nombre; } catch (e) { console.log("undefined:", e.name); }',
        'try { noDeclarada; } catch (e) { console.log("no declarada:", e.name); }',
        'console.log("typeof no declarada:", typeof noDeclarada);',
      ),
      expected: L(
        "null: TypeError",
        "undefined: TypeError",
        "no declarada: ReferenceError",
        "typeof no declarada: undefined",
      ),
    },

    // ───────────────────────── diferencias prácticas ─────────────────────────
    { type: "heading", level: 2, text: "Dónde se nota la diferencia en la práctica" },
    {
      type: "paragraph",
      text:
        "Ambos son falsy y se parecen mucho, pero se comportan distinto en tres sitios: al convertirlos a número, al serializarlos como JSON y al usar parámetros por defecto. Conviene conocerlos porque aparecen constantemente.",
    },
    {
      type: "playground",
      title: "Experimento 4 · Conversión a número y a texto",
      description: "`undefined` se convierte en NaN y `null` en 0. Es una fuente típica de errores.",
      code: L(
        "console.log(Number(undefined), Number(null));",
        "console.log(undefined + 1, null + 1);",
        "console.log(`${null} ${undefined}`);",
      ),
      expected: L("NaN 0", "NaN 1", "null undefined"),
    },
    {
      type: "playground",
      title: "Experimento 5 · JSON conserva null pero no undefined",
      description: "Al serializar un objeto, las propiedades con undefined desaparecen.",
      code: L(
        "console.log(JSON.stringify({ a: undefined, b: null, c: 1 }));",
        "console.log(JSON.stringify([undefined, null]));",
      ),
      expected: L('{"b":null,"c":1}', "[null,null]"),
    },
    {
      type: "paragraph",
      text:
        "Los parámetros por defecto solo se activan con `undefined`, no con `null`. Y desde ECMAScript 2020 hay herramientas pensadas para ambos valores a la vez, que MDN llama «nulos» (nullish): el encadenamiento opcional `?.`, que devuelve `undefined` en vez de lanzar un error si algo a mitad del camino es `null` o `undefined`, y el operador `??` que ya conoces de la lección anterior.",
    },
    {
      type: "playground",
      title: "Experimento 6 · Parámetros por defecto, ?. y ??",
      description: "Observa cuándo se activa el valor por defecto y cómo se evita el TypeError.",
      code: L(
        "function f(a, b = 10) { return [a, b]; }",
        "console.log(f(1)[1], f(1, undefined)[1], f(1, null)[1]);",
        "",
        'const persona = { nombre: "Ana" };',
        "console.log(persona?.direccion?.calle);",
        'console.log(persona.direccion?.calle ?? "sin calle");',
        "",
        "let valor = null;",
        'valor ??= "asignado";',
        "console.log(valor);",
      ),
      expected: L("10 10 null", "undefined", "sin calle", "asignado"),
    },
    {
      type: "playground",
      title: "Experimento 7 · Comparar con null y undefined",
      description: "`== null` es verdadero para ambos; `=== undefined` solo para undefined.",
      code: L(
        "let x;",
        "console.log(x === undefined, x == null);",
        "",
        "const y = null;",
        "console.log(y === undefined, y == null);",
        "",
        "// Una rareza de las comparaciones con 0",
        "console.log(null == 0, null >= 0, undefined == 0);",
      ),
      expected: L("true true", "false true", "false true false"),
    },
    {
      type: "callout",
      variant: "info",
      text:
        "Comprobar `valor == null` (con dos signos) es una excepción aceptada a la regla de usar siempre `===`, porque comprueba `null` y `undefined` a la vez. Pero no te fíes de las comparaciones con `0`: `null >= 0` es `true` mientras `null == 0` es `false`.",
    },

    // ───────────────────────── NaN ─────────────────────────
    { type: "heading", level: 2, text: "NaN: no es un número" },
    {
      type: "paragraph",
      text:
        "El tercer valor aparece cuando haces operaciones aritméticas con datos que no son números. Se escribe `NaN` y significa «Not a Number», es decir, «no es un número». Aunque su nombre lo niega, su tipo es `number`: es el resultado numérico inválido. La consola del navegador lo muestra con el color de los números.",
    },
    {
      type: "paragraph",
      text:
        "Por ejemplo, creamos una variable llamada `noEsUnNumero` (con la convención de escritura lowerCamelCase que vimos en las primeras lecciones: la primera palabra en minúscula y la inicial de las siguientes en mayúscula) e intentamos multiplicar `3.7` por un texto. El resultado no tiene sentido, y JavaScript responde con `NaN`. Si ves un `NaN` en la consola de una aplicación, suele indicar que se mezclaron tipos de datos que no son números en una operación aritmética.",
    },
    {
      type: "paragraph",
      text:
        "MDN agrupa los orígenes de `NaN` en cinco familias: conversiones numéricas fallidas (`parseInt(\"blabla\")`, `Number(undefined)`), operaciones sin resultado real (`Math.sqrt(-1)`), formas indeterminadas (`0 * Infinity`, `Infinity - Infinity`), operaciones que reciben un `NaN` (7 * `NaN`, es contagioso) y otros casos que necesitan representar un número inválido (una fecha inválida, por ejemplo).",
    },
    {
      type: "playground",
      title: "Experimento 8 · De dónde sale NaN",
      description: "Todas estas líneas producen NaN por motivos distintos.",
      code: L(
        'const noEsUnNumero = 3.7 * "texto";',
        "console.log(noEsUnNumero);",
        "console.log(typeof noEsUnNumero);",
        "console.log(noEsUnNumero + 1);",
        "",
        "console.log(0 / 0, Math.sqrt(-1));",
        'console.log(parseInt("blabla"), Number("12px"));',
        "console.log(Infinity - Infinity, 0 * Infinity);",
        'console.log(new Date("blabla").getTime());',
      ),
      expected: L(
        "NaN",
        "number",
        "NaN",
        "NaN NaN",
        "NaN NaN",
        "NaN NaN",
        "NaN",
      ),
    },
    {
      type: "image",
      src: "/img/dia-10/nan-contagioso.svg",
      alt: "3.7 por la cadena texto da NaN, y NaN más 1 sigue siendo NaN. NaN no es igual a sí mismo, así que NaN === NaN es false. Para detectarlo sirven Number.isNaN, Object.is y x !== x.",
      caption: "NaN se propaga y no se compara con ===.",
    },
    {
      type: "paragraph",
      text:
        "`NaN` tiene una propiedad que desconcierta: no es igual a ningún valor, ni siquiera a sí mismo. Es una regla del estándar IEEE 754 para números de coma flotante, no un capricho de JavaScript. Por eso `x === NaN` siempre es `false` y no sirve para detectarlo. Las formas correctas son `Number.isNaN(x)`, `Object.is(x, NaN)` o la comparación `x !== x`.",
    },
    {
      type: "playground",
      title: "Experimento 9 · Detectar NaN",
      description: "Compara `isNaN()` global con `Number.isNaN()` y mira cómo lo trata un arreglo.",
      code: L(
        "console.log(NaN === NaN, NaN !== NaN);",
        "console.log(Number.isNaN(NaN), Object.is(NaN, NaN));",
        'console.log(isNaN("hola"), Number.isNaN("hola"));',
        "console.log(NaN > 1, NaN < 1);",
        "",
        "const arr = [2, 4, NaN, 12];",
        "console.log(arr.indexOf(NaN), arr.includes(NaN));",
      ),
      expected: L("false true", "true true", "true false", "false false", "-1 true"),
    },
    {
      type: "callout",
      variant: "warning",
      text:
        "Prefiere `Number.isNaN()`: devuelve `true` solo si el valor ya es `NaN`. La función global `isNaN()` convierte antes su argumento a número, por lo que da `true` para cualquier texto no numérico como `\"hola\"`. Además, `indexOf()` no encuentra `NaN`, pero `includes()` sí.",
    },

    // ───────────────────────── Recapitulación ─────────────────────────
    { type: "heading", level: 2, text: "Recapitulación: los siete tipos primitivos" },
    {
      type: "paragraph",
      text:
        "Con esto cerramos los tipos primitivos. Un valor primitivo es un dato que no es un objeto y no tiene métodos propios (los métodos que usamos, como `toFixed()`, funcionan porque JavaScript lo envuelve de forma temporal). MDN lista siete: los cinco que ya conoces y `symbol`, que se usa para crear identificadores únicos y que veremos más adelante.",
    },
    {
      type: "table",
      caption: "Los siete tipos primitivos de JavaScript",
      headers: ["Tipo", "Resultado de typeof", "Ejemplo", "Dónde lo vimos"],
      rows: [
        ["string", "\"string\"", "\"Hola\"", "Lecciones 6 y 7"],
        ["number", "\"number\"", "7.19, NaN, Infinity", "Lección 8"],
        ["bigint", "\"bigint\"", "10n", "Lección 8"],
        ["boolean", "\"boolean\"", "true, false", "Lección 9"],
        ["undefined", "\"undefined\"", "undefined", "Esta lección"],
        ["null", "\"object\" (error histórico)", "null", "Esta lección"],
        ["symbol", "\"symbol\"", "Symbol(\"id\")", "Más adelante"],
      ],
    },
    {
      type: "paragraph",
      text:
        "Todo lo que no es primitivo es un objeto: los arreglos, las funciones, las fechas y los objetos literales. A estos se les llama tipos compuestos o complejos (también tipos de referencia). En la próxima lección empezamos con ellos, comenzando por las funciones, y más adelante vendrán los objetos, los arreglos y las clases, que se tratarán con calma cuando lleguemos a la programación orientada a objetos.",
    },

    // ───────────────────────── Datos que cambian ─────────────────────────
    { type: "heading", level: 2, text: "Datos que suelen aparecer desactualizados" },
    {
      type: "table",
      caption: "Material antiguo frente a información verificada",
      headers: ["Suele decirse", "Información verificada"],
      rows: [
        [
          "`undefined` lo asigna JavaScript y `null` lo asigna siempre el programador.",
          "Es una buena regla práctica, no una ley. Puedes asignar `undefined` a mano, y el propio lenguaje y el navegador devuelven `null` (`querySelector()`, `match()`, el final de la cadena de prototipos).",
        ],
        [
          "`null` y `undefined` significan lo mismo.",
          "Comparten ser falsy y «nulos», pero se comportan distinto con `typeof`, `Number()`, `JSON.stringify()` y los parámetros por defecto.",
        ],
        [
          "`typeof null` es `\"null\"`.",
          "Devuelve `\"object\"`: es un error histórico que no puede corregirse por compatibilidad.",
        ],
        [
          "`NaN` es un tipo de dato aparte.",
          "Es un valor del tipo `number`. `typeof NaN` es `\"number\"`.",
        ],
        [
          "`NaN` se comprueba con `==` o `===`.",
          "Nunca es igual a nada, ni a sí mismo. Usa `Number.isNaN()`, `Object.is()` o `x !== x`.",
        ],
        [
          "`NaN` solo aparece al operar con texto.",
          "También sale de `0 / 0`, `Math.sqrt(-1)`, `Infinity - Infinity` y fechas inválidas, entre otros casos.",
        ],
        [
          "Para evitar errores al leer propiedades anidadas hay que anidar varios `if`.",
          "Desde ECMAScript 2020 existe el encadenamiento opcional `?.`, que devuelve `undefined` si algo del camino es `null` o `undefined`.",
        ],
      ],
    },

    // ───────────────────────── FAQ ─────────────────────────
    {
      type: "accordion",
      title: "Preguntas frecuentes de esta lección",
      items: [
        {
          title: "¿Debo asignar `undefined` a mano?",
          text:
            "Normalmente no. Para indicar «vacío a propósito» usa `null`; para «sin asignar», simplemente no inicialices la variable. Si diseñas una API, MDN recomienda tratar `null` y `undefined` como equivalentes en las entradas.",
        },
        {
          title: "¿Por qué `typeof null` es `\"object\"`?",
          text:
            "Es un error de las primeras versiones del lenguaje que se ha conservado para no romper el código existente. No significa que `null` sea un objeto: es un primitivo.",
        },
        {
          title: "¿Cómo compruebo si una variable existe?",
          text:
            "Si puede no estar declarada, `typeof variable === \"undefined\"` no lanza error. Si ya está declarada, compara con `=== undefined`. Con `let` y `const`, usar `typeof` antes de la declaración lanza un `ReferenceError` por la zona muerta temporal.",
        },
        {
          title: "¿Es `NaN` falsy?",
          text:
            "Sí, igual que `null` y `undefined`. Los tres figuran en la lista de valores falsy de la lección anterior.",
        },
        {
          title: "¿Es lo mismo `NaN` que `Number.NaN`?",
          text:
            "Sí, son el mismo valor. `NaN` es una propiedad del objeto global y `Number.NaN` es la misma, accesible desde `Number`.",
        },
        {
          title: "¿Qué hago si un cálculo devuelve `NaN`?",
          text:
            "Rastrea la operación: `NaN` se propaga, así que el origen suele estar antes del lugar donde lo ves. Revisa las conversiones (`Number()`, `parseFloat()`) y los datos que llegan de formularios, que son texto.",
        },
      ],
    },

    // ───────────────────────── Cierre ─────────────────────────
    { type: "heading", level: 2, text: "Cierre" },
    {
      type: "paragraph",
      text:
        "Ya conoces los tres valores especiales y completaste los tipos primitivos. En la próxima lección pasamos a los tipos compuestos, empezando por las funciones declaradas y las funciones expresadas.",
    },
    {
      type: "checklist",
      title: "Antes de pasar al Día 11, verifica que puedes explicar…",
      items: [
        "Qué diferencia hay entre `undefined` y `null`, y en qué casos aparece cada uno.",
        "Las cuatro situaciones en que una expresión da `undefined`.",
        "Por qué `typeof null` es `\"object\"` y cómo comprobar `null` correctamente.",
        "Qué diferencia hay entre un `TypeError` (acceder a una propiedad de `null`) y un `ReferenceError` (variable inexistente).",
        "Qué dan `Number(undefined)`, `Number(null)` y `JSON.stringify({ a: undefined })`.",
        "Por qué `NaN === NaN` es `false` y cómo detectar `NaN` con `Number.isNaN()`.",
        "Los siete tipos primitivos de JavaScript.",
      ],
    },
    { type: "heading", level: 3, text: "Fuentes consultadas (noviembre de 2026)" },
    {
      type: "list",
      items: [
        "[MDN: undefined](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined)",
        "[MDN: null](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/null)",
        "[MDN: NaN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NaN)",
        "[MDN: Number.isNaN()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN)",
        "[MDN: isNaN()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/isNaN)",
        "[MDN: typeof](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof)",
        "[MDN: Optional chaining (?.)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining)",
        "[MDN: Nullish](https://developer.mozilla.org/en-US/docs/Glossary/Nullish)",
        "[MDN: Default parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters)",
        "[MDN: JSON.stringify()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)",
        "[MDN: Estructuras y tipos de datos en JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures)",
        "[MDN: Equality comparisons and sameness](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Equality_comparisons_and_sameness)",
      ],
    },
  ],
  selfCheck: [
    {
      question: "¿Qué valor tiene una variable declarada con `let x;` sin asignarle nada?",
      options: ["null", "undefined", "0", "NaN"],
      correctIndex: 1,
      explanation: "JavaScript le asigna `undefined` a lo que no tiene valor.",
    },
    {
      question: "¿Cuál de estas situaciones NO produce `undefined`?",
      options: [
        "Leer una propiedad que no existe en un objeto",
        "Llamar a una función sin pasar un argumento y devolver ese parámetro",
        "Una función sin `return`",
        "Asignar `null` a una variable y leerla",
      ],
      correctIndex: 3,
      explanation: "Una variable con `null` vale `null`: la asignación fue intencional.",
    },
    {
      question: "¿Qué devuelve `typeof null`?",
      options: ["\"null\"", "\"undefined\"", "\"object\"", "\"number\""],
      correctIndex: 2,
      explanation: "Es un error histórico del lenguaje que no puede corregirse por compatibilidad.",
    },
    {
      question: "¿Qué devuelve `null == undefined`?",
      options: ["true", "false", "NaN", "Un error"],
      correctIndex: 0,
      explanation: "Con `==` son iguales, pero con `===` no (`null === undefined` es `false`).",
    },
    {
      question: "¿Qué error lanza `null.nombre`?",
      options: ["ReferenceError", "SyntaxError", "TypeError", "RangeError"],
      correctIndex: 2,
      explanation:
        "Acceder a una propiedad de `null` o `undefined` lanza un `TypeError`. Un `ReferenceError` es para variables que no existen.",
    },
    {
      question: "¿Qué devuelve `Number(null)`?",
      options: ["NaN", "0", "null", "undefined"],
      correctIndex: 1,
      explanation: "`Number(null)` es 0, mientras que `Number(undefined)` es `NaN`.",
    },
    {
      question: "¿Cuál es el tipo (typeof) de `NaN`?",
      options: ["\"NaN\"", "\"undefined\"", "\"number\"", "\"object\""],
      correctIndex: 2,
      explanation: "`NaN` es un valor numérico inválido, pero sigue siendo del tipo `number`.",
    },
    {
      question: "¿Cuál es la forma correcta de comprobar si un valor ya es `NaN`?",
      options: ["x === NaN", "x == NaN", "Number.isNaN(x)", "typeof x === \"NaN\""],
      correctIndex: 2,
      explanation:
        "`NaN` no es igual a nada, ni a sí mismo. Se usa `Number.isNaN(x)`, `Object.is(x, NaN)` o `x !== x`.",
    },
    {
      question: "¿Qué devuelve `3.7 * \"texto\"`?",
      options: ["0", "\"3.7texto\"", "NaN", "Un error"],
      correctIndex: 2,
      explanation:
        "El texto no se puede convertir a número, así que la multiplicación da `NaN` en lugar de lanzar un error.",
    },
    {
      question: "¿Qué hace `persona.direccion?.calle` si `persona.direccion` es `undefined`?",
      options: [
        "Lanza un TypeError",
        "Devuelve undefined sin lanzar error",
        "Devuelve null",
        "Devuelve una cadena vacía",
      ],
      correctIndex: 1,
      explanation:
        "El encadenamiento opcional `?.` corta la expresión y devuelve `undefined` si lo anterior es `null` o `undefined`.",
    },
  ],
};
