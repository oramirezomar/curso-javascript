import type { Lesson } from "@/lib/types";

// Une líneas de código sin tener que escapar backticks ni `${}` dentro de template literals.
const L = (...lines: string[]) => lines.join("\n");

// Contenido validado contra fuentes actuales en noviembre de 2026 (ver sección "Fuentes").
export const day22: Lesson = {
  day: 22,
  slug: "arrow-functions-funciones-flecha",
  title: "Arrow functions: funciones flecha",
  section: "Sintaxis moderna (ES2015)",
  estimatedMinutes: 75,
  icon: "🏹",
  objectives: [
    "Convertir una función expresada en una función flecha y explicar qué cambia en la sintaxis",
    "Aplicar las reglas de paréntesis, llaves y `return` según el número de parámetros y el tipo de cuerpo",
    "Usar funciones flecha como callbacks de `forEach`, `map`, `filter` y `sort`",
    "Explicar que una flecha no tiene su propio `this` y por qué no sirve como método de un objeto",
    "Reconocer lo que una flecha no puede hacer: usarse con `new`, tener su propio `arguments` o ser generadora",
  ],
  blocks: [
    // ───────────────────────── Apertura ─────────────────────────
    {
      type: "paragraph",
      text:
        "Las funciones flecha (en inglés, arrow functions) son otra mejora de ECMAScript 2015. Son una forma más corta y más expresiva de escribir funciones anónimas, con una flecha gruesa (`=>`) en lugar de la palabra `function`. Las verás todo el tiempo: en los métodos de los arreglos como `forEach`, `map` y `filter`, en los temporizadores y en el código de las librerías. Pero no son simplemente una abreviatura: tienen una diferencia importante con `this`, y eso es lo que más conviene entender bien.",
    },
    {
      type: "keyFacts",
      items: [
        { value: "=>", label: "La flecha sustituye a la palabra function" },
        { value: "() => 1", label: "Sin parámetros, los paréntesis son obligatorios" },
        { value: "n => n * 2", label: "Con un parámetro simple, los paréntesis son opcionales" },
        { value: "Retorno implícito", label: "Sin llaves, la expresión es el valor devuelto" },
        { value: "this", label: "No tienen el suyo: usan el del lugar donde se escribieron" },
        { value: "new", label: "No se pueden usar como constructores" },
      ],
    },
    {
      type: "callout",
      variant: "success",
      text:
        "Contenido verificado en noviembre de 2026 con MDN Web Docs (funciones flecha, `this`, `call`, `bind` y `apply`) y con la documentación de ESLint. Los resultados de los ejemplos se comprobaron ejecutándolos. Al final hay una tabla con datos que suelen aparecer desactualizados y la lista de fuentes.",
    },

    // ───────────────────────── Punto de partida ─────────────────────────
    { type: "heading", level: 2, text: "El punto de partida: funciones declaradas y expresadas" },
    {
      type: "paragraph",
      text:
        "En la lección de funciones viste dos formas de crearlas. Una función declarada (`function saludar() { ... }`) se puede llamar incluso antes de la línea donde se escribe, porque JavaScript la prepara antes de ejecutar el código (hoisting). Una función expresada es una función anónima que se guarda en una variable (`const saludar = function () { ... }`), y solo se puede usar a partir de la línea donde se asigna. Una función flecha es siempre una expresión: es una nueva forma de escribir una función anónima, así que se comporta, en esto, como la función expresada.",
    },
    {
      type: "playground",
      title: "Experimento 1 · Una función declarada y una flecha, antes y después de su línea",
      description: "La declarada funciona antes de su línea. La flecha, guardada en una `const`, todavía no existe y lanza un `ReferenceError`.",
      code: L(
        "// Función declarada: se puede llamar antes de definirla (hoisting)",
        "console.log(declarada());",
        'function declarada() { return "hola desde la declarada"; }',
        "",
        "// Flecha guardada en const: no se puede usar antes de su línea",
        "try {",
        "  saludar();",
        "} catch (error) {",
        "  console.log(error.name);",
        "}",
        'const saludar = () => "hola";',
        "console.log(saludar());",
      ),
      expected: L("hola desde la declarada", "ReferenceError", "hola"),
    },

    // ───────────────────────── Primera flecha ─────────────────────────
    { type: "heading", level: 2, text: "De function a flecha" },
    {
      type: "paragraph",
      text:
        "Convertir una función expresada en una flecha es mecánico: se quita la palabra `function` y se escribe `=>` (un igual seguido de un mayor que) entre los paréntesis y las llaves. La función sigue haciendo lo mismo. Cuando el cuerpo es una sola expresión, se pueden omitir también las llaves y el `return`, porque el valor de esa expresión se devuelve automáticamente: es el retorno implícito. Y cuando hay un único parámetro, se pueden omitir los paréntesis.",
    },
    {
      type: "image",
      src: "/img/dia-22/de-function-a-flecha.svg",
      alt: "Cuatro pasos. Primero, una función expresada: const sumar = function (a, b) { return a + b; }. Segundo, se quita function y se añade la flecha: const sumar = (a, b) => { return a + b; }. Tercero, como el cuerpo es una sola expresión, se quitan las llaves y el return, y queda const sumar = (a, b) => a + b. Cuarto, con un solo parámetro se pueden omitir los paréntesis: const doble = n => n * 2.",
      caption: "De function a flecha en cuatro pasos.",
    },
    {
      type: "playground",
      title: "Experimento 2 · Tres formas de la misma función",
      description: "Con `function`, con flecha y llaves, y con flecha sin llaves. En la última, el cuerpo es una sola expresión.",
      code: L(
        'const conFunction = function () { console.log("hola (function)"); };',
        'const conFlecha = () => { console.log("hola (flecha)"); };',
        'const sinLlaves = () => console.log("hola (sin llaves)");',
        "",
        "conFunction();",
        "conFlecha();",
        "sinLlaves();",
      ),
      expected: L("hola (function)", "hola (flecha)", "hola (sin llaves)"),
    },

    // ───────────────────────── Parámetros ─────────────────────────
    { type: "heading", level: 2, text: "Parámetros y paréntesis" },
    {
      type: "paragraph",
      text:
        "Las reglas son pocas. Sin parámetros, los paréntesis son obligatorios: `() => ...`. Con un solo parámetro, son opcionales: `nombre => ...` o `(nombre) => ...`. Con dos o más, son obligatorios: `(a, b) => ...`. Hay una excepción para el caso de uno: si el parámetro tiene un valor por defecto, se desestructura o es un parámetro rest, los paréntesis también son obligatorios. Muchas guías de estilo prefieren escribir siempre los paréntesis para ser consistentes (la regla `arrow-parens` de ESLint lo define).",
    },
    {
      type: "image",
      src: "/img/dia-22/reglas-flecha.svg",
      alt: "Tabla de reglas. Sin parámetros, () => con paréntesis obligatorios. Con un parámetro, n => con paréntesis opcionales, salvo valor por defecto, desestructuración o rest. Con dos o más, (a, b) => con paréntesis obligatorios. Un cuerpo de una expresión se escribe sin llaves ni return. Varias instrucciones llevan llaves y return explícito. Para devolver un objeto se envuelve entre paréntesis: () => ({ a: 1 }).",
      caption: "Reglas de paréntesis, llaves y return.",
    },
    {
      type: "playground",
      title: "Experimento 3 · Funciones flecha con cero, uno y dos parámetros",
      description: "Sin pasar argumentos, `sumar` da `NaN`: `a` y `b` valen `undefined`. Con un valor por defecto, los paréntesis son obligatorios.",
      code: L(
        'const saludar = nombre => "Hola, " + nombre;',
        "const sumar = (a, b) => a + b;",
        "const cinco = () => 5;",
        'const conDefecto = (nombre = "mundo") => "Hola, " + nombre;',
        "",
        'console.log(saludar("Irma"));',
        "console.log(sumar(9, 9));",
        "console.log(sumar());",
        "console.log(cinco());",
        "console.log(conDefecto());",
        'console.log(conDefecto("Ana"));',
      ),
      expected: L("Hola, Irma", "18", "NaN", "5", "Hola, mundo", "Hola, Ana"),
    },

    // ───────────────────────── Cuerpo ─────────────────────────
    { type: "heading", level: 2, text: "El cuerpo: retorno implícito y llaves" },
    {
      type: "paragraph",
      text:
        "Hay dos formas de cuerpo. Si el cuerpo es una sola expresión, sin llaves, su valor se devuelve solo (retorno implícito). Si usas llaves, el cuerpo es un bloque como el de una función normal: puede tener varias instrucciones, pero ahora sí necesitas `return` para devolver algo; sin él, la función devuelve `undefined`. Esto es una causa habitual de errores: añadir llaves y olvidar el `return`.",
    },
    {
      type: "playground",
      title: "Experimento 4 · Varias instrucciones, return explícito y retorno implícito",
      description: "Con llaves y sin `return`, el resultado es `undefined`, aunque la expresión `5;` esté escrita dentro.",
      code: L(
        "const imprimir = () => {",
        "  console.log(1);",
        "  console.log(2);",
        "  console.log(3);",
        "};",
        "imprimir();",
        "",
        "const varias = () => {",
        "  const x = 1;",
        "  return x + 1;",
        "};",
        "console.log(varias());",
        "",
        "const sinReturn = () => { 5; };",
        "console.log(sinReturn());",
        "",
        "const implicita = () => 5;",
        "console.log(implicita());",
      ),
      expected: L("1", "2", "3", "2", "undefined", "5"),
    },
    {
      type: "paragraph",
      text:
        "Un caso especial: devolver un objeto literal con retorno implícito. Si escribes `() => { a: 1 }`, JavaScript interpreta las llaves como un bloque de código (y `a:` como una etiqueta), y la función devuelve `undefined`. Para que las llaves se lean como un objeto, hay que envolverlas entre paréntesis: `() => ({ a: 1 })`.",
    },
    {
      type: "playground",
      title: "Experimento 5 · Devolver un objeto desde una flecha",
      description: "Sin paréntesis, las llaves son un bloque. Con paréntesis, son un objeto, y se pueden combinar con las propiedades abreviadas.",
      code: L(
        "const objMal = () => { a: 1 };",
        "const objBien = () => ({ a: 1 });",
        "console.log(objMal());",
        "console.log(JSON.stringify(objBien()));",
        "",
        "const crear = (nombre, edad) => ({ nombre, edad });",
        'console.log(JSON.stringify(crear("Ana", 35)));',
      ),
      expected: L("undefined", '{"a":1}', '{"nombre":"Ana","edad":35}'),
    },

    // ───────────────────────── Callbacks ─────────────────────────
    { type: "heading", level: 2, text: "Donde más se usan: los callbacks" },
    {
      type: "paragraph",
      text:
        "Una función que se pasa a otra función se llama callback. Los métodos de los arreglos reciben callbacks, y las flechas los hacen más cortos y claros. Con `forEach` recibes el elemento y su posición. Otros dos métodos que verás en detalle más adelante: `filter` se queda con los elementos para los que el callback devuelve `true`, y `map` transforma cada elemento. Se pueden encadenar. Y `sort` usa un callback de comparación. Los temporizadores (`setTimeout`, `setInterval`) también reciben callbacks.",
    },
    {
      type: "playground",
      title: "Experimento 6 · Flechas como callbacks de forEach, filter, map y sort",
      description: "`filter` deja los pares, `map` los multiplica por 10 y `sort` ordena de menor a mayor.",
      code: L(
        "const numeros = [10, 20];",
        'numeros.forEach((elemento, index) => console.log("el elemento " + elemento + " está en la posición " + index));',
        "",
        "const resultado = [1, 2, 3, 4].filter((n) => n % 2 === 0).map((n) => n * 10);",
        'console.log(resultado.join(","));',
        "",
        'console.log([3, 1, 2].sort((a, b) => a - b).join(","));',
      ),
      expected: L(
        "el elemento 10 está en la posición 0",
        "el elemento 20 está en la posición 1",
        "20,40",
        "1,2,3",
      ),
    },

    // ───────────────────────── this ─────────────────────────
    { type: "heading", level: 2, text: "La diferencia importante: this" },
    {
      type: "paragraph",
      text:
        "Recuerda que `this` hace referencia al contexto en el que se ejecuta una función. En una función normal o en un método, `this` depende de cómo se llame: en `perro.ladrar()`, `this` es `perro`. Una función flecha no tiene su propio `this`: usa el del lugar donde fue escrita, y eso no cambia, se llame como se llame. Por eso se dice que su `this` es léxico.",
    },
    {
      type: "paragraph",
      text:
        "La consecuencia práctica más importante: no uses una flecha para definir un método de un objeto que necesite leer `this`. En un objeto literal, la flecha no está dentro de ningún método, así que su `this` es el del ámbito exterior (el objeto global en un script del navegador, o `undefined` en modo estricto y en módulos), no el objeto. Para los métodos, usa la forma abreviada que viste en la lección anterior (`ladrar() { ... }`).",
    },
    {
      type: "image",
      src: "/img/dia-22/this-lexico.svg",
      alt: "A la izquierda, un método abreviado ladrar() dentro del objeto perro: al llamar perro.ladrar(), this es el objeto perro y devuelve Rex. A la derecha, ladrar definido como flecha dentro del mismo objeto: la flecha no tiene su propio this, usa el del lugar donde se escribió, que no es perro, y no devuelve Rex. Abajo, un caso donde la flecha sí conviene: dentro de un método, una flecha como callback toma el this del método.",
      caption: "Una flecha no tiene su propio this.",
    },
    {
      type: "paragraph",
      text:
        "Lo mismo, visto al revés, es una ventaja. Dentro de un método, una flecha usada como callback toma el `this` del método, y no tienes que preocuparte por perderlo. Hasta ahora había que recurrir a `bind`, `call` o `apply` para enlazar el contexto de una función. Pero con una flecha esos tres métodos no sirven para cambiar `this`: se ignora el que les pases.",
    },
    {
      type: "playground",
      title: "Experimento 7 · this en un método, en una flecha y en un callback",
      description: "Comparamos con `this === perro` para que el resultado no dependa del entorno. `call` cambia el `this` de una función normal, pero no el de una flecha.",
      code: L(
        "const perro = {",
        '  nombre: "Rex",',
        "  metodo() { return this === perro; },",
        "  flecha: () => this === perro,",
        "};",
        "console.log(perro.metodo());",
        "console.log(perro.flecha());",
        "",
        "// Dentro de un método, una flecha toma el this del método",
        "const equipo = {",
        '  nombre: "A",',
        '  miembros: ["Ana", "Luis"],',
        "  listar() {",
        '    return this.miembros.map((m) => m + " en " + this.nombre).join(",");',
        "  },",
        "};",
        "console.log(equipo.listar());",
        "",
        "// call cambia el this de una función normal, pero no el de una flecha",
        "function conThis() { return this.nombre; }",
        "const flecha = () => typeof this;",
        'console.log(conThis.call({ nombre: "A" }), flecha.call({ nombre: "A" }) === flecha());',
      ),
      expected: L("true", "false", "Ana en A,Luis en A", "A true"),
    },
    {
      type: "callout",
      variant: "info",
      text:
        "Una nota sobre `this` en una función normal, fuera de un objeto: no es siempre `window`. En un script de navegador sin modo estricto lo es (técnicamente, el objeto global). En modo estricto o dentro de un módulo, es `undefined`. Esto se verá con más detalle cuando lleguemos a los prototipos y las clases, donde también se explica por qué en los componentes de clase de React se solía enlazar (`bind`) cada método, o escribirlo como una flecha.",
    },

    // ───────────────────────── Otras diferencias ─────────────────────────
    { type: "heading", level: 2, text: "Otras cosas que una flecha no hace" },
    {
      type: "paragraph",
      text:
        "Una función flecha no se puede usar como constructor: llamarla con `new` lanza un `TypeError`, y no tiene la propiedad `prototype`. Tampoco tiene su propio objeto `arguments`: si lo usas, es el de la función que la contiene. Si necesitas recibir una cantidad variable de argumentos, usa un parámetro rest (`(...args) => ...`), que sí funciona en las flechas. No pueden ser generadoras (no admiten `yield`). Y no se permite un salto de línea entre los parámetros y la flecha. Aunque no tienen nombre propio, toman el de la variable a la que se asignan.",
    },
    {
      type: "playground",
      title: "Experimento 8 · Lo que una flecha no puede hacer",
      description: "`new` falla con `TypeError`. Dos de las reglas son errores de sintaxis, así que se prueban con `new Function`.",
      code: L(
        "const F = () => {};",
        "try {",
        "  new F();",
        "} catch (error) {",
        '  console.log("new con flecha →", error.name);',
        "}",
        "console.log(typeof F.prototype, typeof function () {}.prototype);",
        'console.log(F.name === "F");',
        "",
        "const sintaxis = [",
        '  ["salto de línea antes de =>", "const f = (a)\\n=> a;"],',
        '  ["yield dentro de una flecha", "const g = () => { yield 1; };"],',
        "];",
        "sintaxis.forEach((caso) => {",
        "  try {",
        "    new Function(caso[1]);",
        '    console.log(caso[0] + " → sin error");',
        "  } catch (error) {",
        '    console.log(caso[0] + " → " + error.name);',
        "  }",
        "});",
      ),
      expected: L(
        "new con flecha → TypeError",
        "undefined object",
        "true",
        "salto de línea antes de => → SyntaxError",
        "yield dentro de una flecha → SyntaxError",
      ),
    },

    // ───────────────────────── Cuándo usar ─────────────────────────
    { type: "heading", level: 2, text: "¿Flecha o función normal?" },
    {
      type: "image",
      src: "/img/dia-22/cuando-flecha.svg",
      alt: "A la izquierda, buenas opciones para una flecha: callbacks cortos como forEach, map, filter y setTimeout; funciones de una sola expresión; y callbacks dentro de un método, que toman el this del método. A la derecha, casos donde conviene otra forma: los métodos de un objeto que usan this, donde se usa el método abreviado; los constructores que se usan con new, donde se usa function o class; las funciones que necesitan su propio arguments, donde se usan parámetros rest; y las funciones generadoras, que usan function con asterisco.",
      caption: "Para callbacks y funciones cortas, la flecha; para métodos y constructores, la forma tradicional.",
    },
    {
      type: "table",
      caption: "Qué forma usar según el problema",
      headers: ["Situación", "Qué usar"],
      rows: [
        ["Un callback corto para `forEach`, `map`, `filter` o un temporizador", "Función flecha"],
        ["Una función de una sola expresión", "Flecha con retorno implícito"],
        ["Un método de un objeto literal que usa `this`", "Método abreviado: `ladrar() { }`"],
        ["Una función que se usará con `new`", "`function` o, más adelante, `class`"],
        ["Una función con cantidad variable de argumentos", "Flecha con parámetro rest: `(...args) => ...`"],
        ["Un callback dentro de un método que necesita el `this` del método", "Función flecha"],
        ["Una función que debe poder llamarse antes de su línea", "Función declarada"],
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
          "Las funciones flecha solo son una forma más corta de escribir `function`.",
          "También cambian el comportamiento: no tienen `this` propio, ni `arguments` propio, no pueden usarse con `new` y no pueden ser generadoras.",
        ],
        [
          "La flecha «captura el contexto del objeto» en el que está.",
          "No tiene `this` propio: toma el del ámbito donde se escribió. Dentro de un objeto literal, ese ámbito es el exterior, no el objeto.",
        ],
        [
          "Las funciones flecha no tienen hoisting, así que dan error.",
          "La variable existe pero aún no está inicializada: con `const` o `let` da `ReferenceError`; con `var`, `TypeError`.",
        ],
        [
          "Con un parámetro, los paréntesis son siempre opcionales.",
          "No lo son si el parámetro tiene valor por defecto, se desestructura o es un parámetro rest.",
        ],
        [
          "Con una sola línea se pueden omitir las llaves.",
          "Solo si esa línea es una expresión. Al omitirlas, el valor se devuelve solo (retorno implícito).",
        ],
        [
          "Para devolver un objeto basta con `() => { ... }`.",
          "Las llaves se leen como un bloque. Hay que envolver el objeto entre paréntesis: `() => ({ ... })`.",
        ],
        [
          "En una función normal, `this` es siempre `window`.",
          "Depende de cómo se llame. En un método es el objeto. Sin objeto, es el objeto global en modo no estricto y `undefined` en modo estricto o en módulos.",
        ],
        [
          "Con `bind`, `call` o `apply` se puede cambiar el `this` de una flecha.",
          "No: una flecha ignora el `this` que le pases.",
        ],
        [
          "Los métodos de un objeto literal se escriben como flechas.",
          "Se escriben con la forma abreviada (`ladrar() { }`), que sí tiene el `this` del objeto.",
        ],
      ],
    },

    // ───────────────────────── FAQ ─────────────────────────
    {
      type: "accordion",
      title: "Preguntas frecuentes de esta lección",
      items: [
        {
          title: "¿Una flecha puede tener nombre?",
          text:
            "No lo escribes tú en la flecha, pero toma el nombre de la variable a la que se asigna: `const saludar = () => {}` tiene `saludar.name === \"saludar\"`.",
        },
        {
          title: "¿Puedo usar una flecha en un addEventListener?",
          text:
            "Sí, pero dentro de ella `this` no será el elemento que recibió el evento. Si necesitas el elemento, usa `evento.currentTarget`.",
        },
        {
          title: "¿Cómo se escribe una función que se ejecuta de inmediato con una flecha?",
          text:
            "Envolviéndola entre paréntesis y llamándola: `(() => { ... })();`.",
        },
        {
          title: "¿Por qué `() => {}` devuelve undefined?",
          text:
            "Porque las llaves forman un bloque vacío, no un objeto. Una función sin `return` devuelve `undefined`. Para devolver un objeto vacío, escribe `() => ({})`.",
        },
        {
          title: "¿Qué pasa con las flechas dentro de las clases?",
          text:
            "En las clases se pueden definir propiedades con una flecha, que conservan el `this` de la instancia. Lo veremos cuando lleguemos a las clases, después de los prototipos.",
        },
        {
          title: "¿Cuál es mejor para un callback: una flecha o una función normal?",
          text:
            "Las dos funcionan. Se prefiere la flecha por brevedad, y porque conserva el `this` de donde se escribió. Para eso existe la regla `prefer-arrow-callback` de ESLint.",
        },
      ],
    },

    // ───────────────────────── Cierre ─────────────────────────
    { type: "heading", level: 2, text: "Cierre" },
    {
      type: "paragraph",
      text:
        "Las funciones flecha acortan las funciones anónimas: se quita `function`, se escribe `=>`, y con una sola expresión se omiten las llaves y el `return`. Con cero o varios parámetros, los paréntesis son obligatorios; con uno simple, opcionales; y para devolver un objeto hay que envolverlo entre paréntesis. Lo más importante: no tienen su propio `this` (ni `arguments`), no sirven como constructores y no son la mejor opción para los métodos de un objeto. Son ideales para callbacks. En la próxima lección empezamos con la programación orientada a objetos: los prototipos.",
    },
    {
      type: "checklist",
      title: "Antes de pasar al Día 23, verifica que puedes explicar…",
      items: [
        "Cómo se convierte `function (a, b) { return a + b; }` en una función flecha, paso a paso.",
        "Cuándo son obligatorios, y cuándo opcionales, los paréntesis de los parámetros.",
        "Qué es el retorno implícito y qué pasa si usas llaves y olvidas el `return`.",
        "Cómo devolver un objeto literal desde una flecha de una sola expresión.",
        "Por qué una flecha guardada en `const` da `ReferenceError` si se llama antes de su línea.",
        "Qué significa que el `this` de una flecha sea léxico.",
        "Por qué no se debe usar una flecha como método de un objeto literal, y qué usar en su lugar.",
        "Qué cosas no puede hacer una flecha: usarse con `new`, tener su propio `arguments` y ser generadora.",
      ],
    },
    { type: "heading", level: 3, text: "Fuentes consultadas (noviembre de 2026)" },
    {
      type: "list",
      items: [
        "[MDN: Funciones flecha](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)",
        "[MDN: Funciones (referencia)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions)",
        "[MDN: Funciones (guía)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions)",
        "[MDN: this](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)",
        "[MDN: Function.prototype.bind()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)",
        "[MDN: Function.prototype.call()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call)",
        "[MDN: Function.prototype.apply()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)",
        "[MDN: Parámetros rest](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters)",
        "[MDN: Parámetros por defecto](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters)",
        "[MDN: Definiciones de métodos](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Method_definitions)",
        "[MDN: Array.prototype.forEach()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)",
        "[MDN: Array.prototype.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)",
        "[MDN: Array.prototype.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)",
        "[MDN: Hoisting](https://developer.mozilla.org/en-US/docs/Glossary/Hoisting)",
        "[MDN: new](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new)",
        "[ESLint: prefer-arrow-callback](https://eslint.org/docs/latest/rules/prefer-arrow-callback)",
        "[ESLint: arrow-body-style](https://eslint.org/docs/latest/rules/arrow-body-style)",
        "[ESLint: arrow-parens](https://eslint.org/docs/latest/rules/arrow-parens)",
        "[ESLint: no-confusing-arrow](https://eslint.org/docs/latest/rules/no-confusing-arrow)",
        "[ESLint: func-style](https://eslint.org/docs/latest/rules/func-style)",
      ],
    },
  ],
  selfCheck: [
    {
      question: "¿Qué devuelve `((a, b) => a + b)(2, 3)`?",
      options: ["23", "5", "undefined", "Lanza un error"],
      correctIndex: 1,
      explanation:
        "La flecha tiene un cuerpo de una sola expresión, así que devuelve el valor de `a + b`: 5.",
    },
    {
      question: "¿Cuándo son obligatorios los paréntesis de los parámetros en una flecha?",
      options: [
        "Nunca",
        "Siempre",
        "Sin parámetros, con dos o más, y con un parámetro que tenga valor por defecto, desestructuración o rest",
        "Solo con un parámetro",
      ],
      correctIndex: 2,
      explanation:
        "Solo se pueden omitir cuando hay un único parámetro simple, como `n => n * 2`.",
    },
    {
      question: "¿Qué devuelve `const f = () => { 5; }; f()`?",
      options: ["5", "undefined", "null", "Lanza un error"],
      correctIndex: 1,
      explanation:
        "Con llaves, el cuerpo es un bloque: hace falta un `return`. Sin él, la función devuelve `undefined`.",
    },
    {
      question: "¿Cómo se escribe una flecha que devuelve el objeto `{ a: 1 }` con retorno implícito?",
      options: [
        "`() => { a: 1 }`",
        "`() => ({ a: 1 })`",
        "`() => [a: 1]`",
        "`() => return { a: 1 }`",
      ],
      correctIndex: 1,
      explanation:
        "Las llaves se leen como un bloque. Envolver el objeto entre paréntesis lo convierte en una expresión.",
    },
    {
      question: "¿Qué ocurre con `saludar()` si se llama antes de la línea `const saludar = () => \"hola\";`?",
      options: [
        "Devuelve \"hola\"",
        "Devuelve `undefined`",
        "Lanza un `ReferenceError`",
        "Lanza un `SyntaxError`",
      ],
      correctIndex: 2,
      explanation:
        "La variable existe, pero aún no está inicializada. Una función declarada con `function` sí se puede llamar antes.",
    },
    {
      question: "¿De dónde toma el `this` una función flecha?",
      options: [
        "Del objeto sobre el que se llama",
        "Del lugar donde fue escrita (ámbito exterior)",
        "Siempre es `window`",
        "Del último `call` que se haga",
      ],
      correctIndex: 1,
      explanation:
        "No tiene `this` propio: usa el del ámbito donde se definió, y no cambia según cómo se la llame.",
    },
    {
      question: "¿Por qué no conviene definir un método de un objeto literal como una flecha que use `this`?",
      options: [
        "Porque las flechas no pueden recibir parámetros",
        "Porque su `this` no es el objeto",
        "Porque las flechas no se pueden guardar en objetos",
        "Porque son más lentas",
      ],
      correctIndex: 1,
      explanation:
        "Dentro de un objeto literal, el `this` de la flecha es el del ámbito exterior. Para los métodos se usa la forma abreviada (`ladrar() { }`).",
    },
    {
      question: "¿Qué ocurre con `new` aplicado a una función flecha?",
      options: [
        "Crea un objeto nuevo",
        "Lanza un `TypeError`",
        "Devuelve `undefined`",
        "Lanza un `SyntaxError`",
      ],
      correctIndex: 1,
      explanation:
        "Las flechas no son constructoras y no tienen la propiedad `prototype`.",
    },
    {
      question: "¿Qué hace `conThis.call(obj)` si `conThis` es una función flecha?",
      options: [
        "Cambia su `this` a `obj`",
        "Lanza un error",
        "Ignora `obj`: el `this` de una flecha no cambia",
        "La convierte en una función normal",
      ],
      correctIndex: 2,
      explanation:
        "`call`, `apply` y `bind` no sirven para cambiar el `this` de una flecha.",
    },
    {
      question: "Si necesitas una cantidad variable de argumentos en una flecha, ¿qué usas?",
      options: [
        "El objeto `arguments` de la flecha",
        "Un parámetro rest: `(...args) => ...`",
        "Una variable global",
        "No se puede",
      ],
      correctIndex: 1,
      explanation:
        "Las flechas no tienen su propio `arguments`. Un parámetro rest funciona igual de bien en ellas.",
    },
  ],
};
