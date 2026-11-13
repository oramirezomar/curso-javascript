import type { Lesson } from "@/lib/types";

// Une líneas de código sin tener que escapar backticks ni `${}` dentro de template literals.
const L = (...lines: string[]) => lines.join("\n");

// Contenido validado contra fuentes actuales en noviembre de 2026 (ver sección "Fuentes").
export const day04: Lesson = {
  day: 4,
  slug: "variables-var-let-ambito",
  title: "Variables: cómo declararlas bien, el ámbito (scope) y la diferencia entre var y let",
  section: "Fundamentos del lenguaje",
  estimatedMinutes: 45,
  icon: "📦",
  objectives: [
    "Preparar un entorno de práctica: editor, extensiones útiles, servidor local y consola del navegador",
    "Explicar qué es una variable y declararla con var y con let",
    "Distinguir los ámbitos global, de función y de bloque, y entender por qué var ignora los bloques",
    "Entender la elevación (hoisting) de var y la zona muerta temporal (TDZ) de let",
    "Saber cuándo una declaración crea una propiedad del objeto global y por qué conviene evitarlo",
  ],
  blocks: [
    // ───────────────────────── Apertura ─────────────────────────
    {
      type: "paragraph",
      text:
        "En esta lección vemos qué es una variable y cómo declararla de manera correcta con el JavaScript actual. Antes de empezar a escribir código preparamos un pequeño entorno de práctica. Con él podrás ejecutar todos los ejemplos del curso también en tu propio equipo, además de en los editores integrados de cada lección.",
    },
    {
      type: "keyFacts",
      items: [
        { value: "3", label: "Formas de declarar una variable: var, let y const (const, en la próxima lección)" },
        { value: "ES2015", label: "Año en que llegaron let y const" },
        { value: "3 ámbitos", label: "Global, de función y de bloque" },
        { value: "2022", label: "Año en que se descontinuó el editor Atom" },
        { value: "v10", label: "Versión actual de ESLint (febrero de 2026)" },
        { value: "ReferenceError", label: "Lo que lanza let si la usas antes de declararla" },
      ],
    },
    {
      type: "callout",
      variant: "success",
      text:
        "Contenido verificado en noviembre de 2026 con MDN Web Docs, la documentación de ESLint y los anuncios oficiales de las herramientas. Al final hay una tabla con datos que suelen aparecer desactualizados y la lista de fuentes.",
    },

    // ───────────────────────── Entorno ─────────────────────────
    { type: "heading", level: 2, text: "Prepara tu entorno de práctica" },
    {
      type: "paragraph",
      text:
        "Para practicar necesitas un editor de código y un navegador. Visual Studio Code es la opción más extendida: en la encuesta de desarrolladores de Stack Overflow de 2025, Visual Studio Code y Visual Studio mantuvieron por cuarto año los primeros puestos entre los entornos de desarrollo. Cualquier otro editor actual sirve, siempre que tenga extensiones equivalentes.",
    },
    {
      type: "callout",
      variant: "warning",
      text:
        "Si ves una guía que recomienda el editor Atom, está desactualizada: GitHub anunció su cierre el 8 de junio de 2022 y archivó el proyecto el 15 de diciembre de 2022. Sus herramientas dejaron de recibir actualizaciones y soporte.",
    },
    {
      type: "image",
      src: "/img/dia-04/entorno-trabajo.svg",
      alt: "Un editor de código con un linter, un formateador y un servidor local con recarga automática. El servidor muestra el HTML en el navegador y la consola imprime lo que escribe console.log, indicando el archivo y la línea.",
      caption: "Del editor a la consola del navegador, con recarga automática al guardar.",
    },
    {
      type: "table",
      caption: "Tres extensiones que te facilitan la vida",
      headers: ["Herramienta", "Para qué sirve", "Qué tener en cuenta hoy"],
      rows: [
        [
          "Un linter (por ejemplo ESLint)",
          "Analiza el código mientras lo escribes y avisa de errores y advertencias (variables sin usar, uso de `var`, etc.).",
          "ESLint 10 se publicó en febrero de 2026. Desde la versión 9 su configuración por defecto es `eslint.config.js` (flat config) y el antiguo `.eslintrc` se eliminó en la 10.",
        ],
        [
          "Live Server",
          "Levanta un servidor local y recarga el navegador cada vez que guardas, sin que tengas que ir a refrescar.",
          "Es una extensión de VS Code. Muchas herramientas de desarrollo (como Vite) incluyen su propio servidor con recarga.",
        ],
        [
          "Prettier",
          "Formatea automáticamente HTML, CSS y JavaScript: sangrías, comillas, punto y coma, saltos de línea.",
          "Ideal si te cuesta mantener el estilo uniforme; complementa al linter en lugar de reemplazarlo.",
        ],
      ],
    },
    {
      type: "paragraph",
      text:
        "Para empezar, crea una carpeta con un archivo HTML (por ejemplo `javascript-fundamentos.html`), haz clic derecho sobre el documento y elige «Open with Live Server». Se levanta un servidor local y la página se abre en el navegador; cuando guardas un cambio en el archivo, se refleja al instante. Para detenerlo, usa la opción «Stop Live Server».",
    },
    {
      type: "tabs",
      title: "Dónde escribir JavaScript en una página",
      tabs: [
        {
          label: "Dentro del HTML",
          lang: "html",
          code: L(
            "<!DOCTYPE html>",
            '<html lang="es">',
            "  <head>",
            '    <meta charset="UTF-8" />',
            "    <title>Fundamentos de JavaScript</title>",
            "  </head>",
            "  <body>",
            "    <script>",
            '      var hola = "Hola mundo";',
            "      console.log(hola);",
            "    </script>",
            "  </body>",
            "</html>",
          ),
          note: "Lo más rápido para practicar. Colocar el script al final del body asegura que el HTML ya existe cuando se ejecuta.",
        },
        {
          label: "Archivo externo",
          lang: "html",
          code: L(
            "<head>",
            '  <script src="app.js" defer></script>',
            "</head>",
          ),
          note: "`defer` descarga el archivo en paralelo y lo ejecuta cuando el HTML ya está listo.",
        },
        {
          label: "Módulo",
          lang: "html",
          code: L(
            "<head>",
            '  <script type="module" src="app.js"></script>',
            "</head>",
          ),
          note: "Los módulos ES tienen su propio ámbito y se ejecutan en modo estricto. Los usaremos más adelante.",
        },
      ],
    },
    {
      type: "paragraph",
      text:
        "Para ver el resultado abre la consola de las herramientas de desarrollo: en el navegador, haz clic derecho sobre la página, elige «Inspeccionar» y abre la pestaña «Consola» (también con F12). Vamos a usarla muchísimo, porque en esta etapa es la forma más directa de ver lo que hace tu código. La consola indica en qué archivo y en qué línea se ejecutó cada mensaje.",
    },

    // ───────────────────────── ¿Qué es una variable? ─────────────────────────
    { type: "heading", level: 2, text: "¿Qué es una variable?" },
    {
      type: "paragraph",
      text:
        "Una variable es un lugar en la memoria de la computadora donde se guardan datos, al que le damos un nombre para poder usarlo después. En la lección anterior vimos los tipos de datos: los primitivos (cadenas de texto, números, booleanos…) y los compuestos (objetos, arreglos, funciones, clases…). Todos esos valores se pueden almacenar en una variable.",
    },
    {
      type: "heading",
      level: 3,
      text: "Mostrar valores con console.log",
    },
    {
      type: "paragraph",
      text:
        "`console.log()` imprime en la consola lo que le pases. Lo vamos a utilizar muchísimo en los fundamentos: puedes pasarle un valor, una variable o varios argumentos separados por comas.",
    },
    {
      type: "heading",
      level: 3,
      text: "Comentarios",
    },
    {
      type: "paragraph",
      text:
        "Un comentario es texto que el motor ignora; sirve para explicar el código o desactivar una línea temporalmente. Hay dos formas: de una línea, con `//`, y de varias líneas, entre `/*` y `*/` (igual que en CSS).",
    },
    {
      type: "code",
      lang: "js",
      title: "Comentarios y console.log",
      code: L(
        "// Esto es un comentario de una línea",
        "",
        "/*",
        "  Esto es un comentario",
        "  de varias líneas",
        "*/",
        "",
        'console.log("Hola");',
        'console.log("Un número:", 42);',
        "// console.log(\"Esta línea no se ejecuta porque está comentada\");",
      ),
    },

    // ───────────────────────── Declarar con var ─────────────────────────
    { type: "heading", level: 2, text: "Declarar una variable" },
    {
      type: "paragraph",
      text:
        "Una variable se declara con una palabra reservada seguida de su nombre; opcionalmente se le asigna un valor inicial con `=`. Históricamente se usaba solo `var`. Desde 2015 existen `let` y `const`, que son las formas recomendadas. Empecemos por `var` para entender por qué se dejó de usar.",
    },
    {
      type: "code",
      lang: "js",
      title: "Tu primera variable",
      code: L(
        'var hola = "Hola mundo";',
        "console.log(hola); // Hola mundo",
        "",
        "// Con el JavaScript moderno:",
        'let saludo = "Hola mundo";',
        "console.log(saludo);",
      ),
    },

    // ───────────────────────── Ámbito ─────────────────────────
    { type: "heading", level: 2, text: "El ámbito (scope) de una variable" },
    {
      type: "paragraph",
      text:
        "Toda variable tiene un ámbito de existencia, conocido como scope: la zona del código desde la que se puede usar. Antes de 2015 JavaScript solo tenía dos: el ámbito global, que alcanza a todo el documento, y el ámbito de función, donde las variables declaradas dentro de una función están disponibles en todo el cuerpo de esa función.",
    },
    {
      type: "paragraph",
      text:
        "En muchos otros lenguajes, como Java, el ámbito es por bloque. Un bloque es un trozo de código delimitado por un par de llaves `{ }`; las estructuras condicionales (`if`) y repetitivas (`for`, `while`) crean bloques, y las veremos más adelante. En esos lenguajes una variable declarada dentro de un bloque solo existe dentro de él, y era una de las críticas habituales de quienes venían de otros lenguajes a JavaScript.",
    },
    {
      type: "image",
      src: "/img/dia-04/ambitos.svg",
      alt: "Tres ámbitos anidados: global, de función y de bloque. Una variable declarada con var dentro de un bloque se ve en toda la función; una declarada con let solo se ve en su bloque.",
      caption: "Los ámbitos se anidan: desde dentro se puede mirar hacia fuera, nunca al revés.",
    },
    {
      type: "heading",
      level: 3,
      text: "var: ámbito de función (o global), no de bloque",
    },
    {
      type: "paragraph",
      text:
        "Una variable declarada con `var` pertenece a la función que la contiene o, si no hay ninguna función, al ámbito global del script. Ignora los bloques. Esto significa que, si dentro de un bloque `if` o `for` declaras una variable con `var`, esa variable sigue existiendo fuera del bloque, y si la vuelves a declarar con el mismo nombre dentro del bloque, estás hablando de la misma variable. Es el origen de muchos errores.",
    },
    {
      type: "playground",
      title: "Experimento 1 · var ignora los bloques",
      description:
        "Predice qué valor tendrá `musica` después del bloque y ejecuta.",
      code: L(
        'var musica = "rock";',
        'console.log("Variable música antes del bloque:", musica);',
        "",
        "{",
        "  // Esto es un bloque (llaves). Aquí se redeclara LA MISMA variable",
        '  var musica = "pop";',
        '  console.log("Variable música dentro del bloque:", musica);',
        "}",
        "",
        'console.log("Variable música después del bloque:", musica);',
      ),
      expected: L(
        "Variable música antes del bloque: rock",
        "Variable música dentro del bloque: pop",
        "Variable música después del bloque: pop",
      ),
    },
    {
      type: "paragraph",
      text:
        "El resultado confunde a quien empieza: la lógica diría que al terminar el bloque la variable vuelve a valer `rock`, pero vale `pop`. Quien vaya ganando experiencia notará estos pequeños detalles, y quien no tenga fundamentos de otro lenguaje puede caer en malas prácticas sin darse cuenta.",
    },
    {
      type: "heading",
      level: 3,
      text: "let: ámbito de bloque",
    },
    {
      type: "paragraph",
      text:
        "Con ECMAScript 2015 llegó `let`, que sí respeta los bloques: la variable existe solo dentro del par de llaves donde se declara (y en los bloques anidados dentro de él). Así, redeclarar el mismo nombre dentro de un bloque crea una variable distinta, solo válida en ese bloque. Es el comportamiento que cabe esperar si vienes de otro lenguaje.",
    },
    {
      type: "image",
      src: "/img/dia-04/var-vs-let.svg",
      alt: "Con var la variable música vale rock, pop y pop antes, dentro y después del bloque. Con let vale rock, pop y rock porque la de dentro del bloque es otra variable.",
      caption: "El mismo código: con var el valor se escapa del bloque; con let no.",
    },
    {
      type: "playground",
      title: "Experimento 2 · let respeta los bloques",
      description:
        "Es el mismo código del experimento anterior, pero con `let`. Fíjate en el valor final.",
      code: L(
        'let musica2 = "rock";',
        'console.log("Variable música antes del bloque:", musica2);',
        "",
        "{",
        "  // Aquí se declara OTRA variable, distinta y solo válida en este bloque",
        '  let musica2 = "pop";',
        '  console.log("Variable música dentro del bloque:", musica2);',
        "}",
        "",
        'console.log("Variable música después del bloque:", musica2);',
      ),
      expected: L(
        "Variable música antes del bloque: rock",
        "Variable música dentro del bloque: pop",
        "Variable música después del bloque: rock",
      ),
    },
    {
      type: "playground",
      title: "Experimento 3 · Función, bloque y fuera",
      description: "Qué se ve desde dónde: una variable `var`, otra `let` y una declarada en la función.",
      code: L(
        "function demo() {",
        '  var deFuncion = "visible en toda la función";',
        "",
        "  if (true) {",
        '    var conVar = "var: escapa del if";',
        '    let conLet = "let: se queda en el if";',
        "  }",
        "",
        "  console.log(conVar);",
        "  console.log(typeof conLet);",
        "}",
        "",
        "demo();",
        "console.log(typeof deFuncion);",
      ),
      expected: L("var: escapa del if", "undefined", "undefined"),
    },

    // ───────────────────────── Elevación y TDZ ─────────────────────────
    { type: "heading", level: 2, text: "Elevación (hoisting) y zona muerta temporal" },
    {
      type: "paragraph",
      text:
        "La elevación (en inglés, hoisting) es la razón por la que `var` provoca estos comportamientos. Antes de ejecutar el código, el motor procesa todas las declaraciones `var` y las trata como si estuvieran al principio de su ámbito (la función o el script). Lo que se eleva es solo la declaración, no la inicialización: la asignación del valor sigue ocurriendo en la línea donde la escribiste. Hasta entonces, la variable existe pero vale `undefined`.",
    },
    {
      type: "paragraph",
      text:
        "Esto explica el Experimento 1. Como `var musica` dentro del bloque no crea una variable nueva, solo hay una `musica` en todo el ámbito, y el valor `pop` se queda. Y cuando no hay funciones, esa única declaración se eleva hasta el ámbito global.",
    },
    {
      type: "image",
      src: "/img/dia-04/elevacion-tdz.svg",
      alt: "Con var, leer la variable antes de su declaración da undefined. Con let, leerla antes de su declaración lanza un ReferenceError porque está en la zona muerta temporal.",
      caption: "Leer una variable antes de declararla: undefined con var, error con let.",
    },
    {
      type: "paragraph",
      text:
        "`let` y `const` funcionan distinto. La variable existe desde el inicio de su bloque, pero no se puede usar hasta que la ejecución llega a la línea donde se declara: ese tramo se llama zona muerta temporal (TDZ, de Temporal Dead Zone), y acceder a la variable dentro de ella lanza un `ReferenceError`. Se dice «temporal» porque depende del orden de ejecución, no de la posición en el texto. Por eso se suele decir que `let` y `const` «no se elevan», aunque técnicamente el motor sí conoce la declaración.",
    },
    {
      type: "playground",
      title: "Experimento 4 · Usar antes de declarar",
      description: "Mira la diferencia entre `var` (undefined) y `let` (error).",
      code: L(
        "// var: la declaración se eleva, el valor no",
        "console.log(antes);",
        'var antes = "ya tengo valor";',
        "console.log(antes);",
        "",
        "// let: zona muerta temporal",
        "try {",
        "  console.log(despues);",
        '  let despues = "valor";',
        "} catch (error) {",
        "  console.log(error.name);",
        "}",
      ),
      expected: L("undefined", "ya tengo valor", "ReferenceError"),
    },

    // ───────────────────────── Objeto global ─────────────────────────
    { type: "heading", level: 2, text: "El objeto global y las variables globales" },
    {
      type: "paragraph",
      text:
        "En JavaScript, el ámbito global se corresponde con un objeto: el objeto global. En un navegador es `window`, que representa la ventana del navegador y contiene todas sus propiedades. Cuando escribes `console.log(window)` ves la lista completa. Si declaras una variable con `var` directamente en un script clásico, aparece entre esas propiedades; una declarada con `let` no.",
    },
    {
      type: "playground",
      title: "Experimento 5 · var y let frente a window (script clásico)",
      description:
        "Este editor ejecuta el código como un `<script>` clásico del navegador, igual que si lo escribieras dentro de una etiqueta `<script>` sin `type`.",
      mode: "script",
      code: L(
        'var conVar = "soy var";',
        'let conLet = "soy let";',
        "",
        'console.log("window.conVar:", window.conVar);',
        'console.log("window.conLet:", window.conLet);',
        'console.log("conLet a secas:", conLet);',
      ),
      expected: L(
        "window.conVar: soy var",
        "window.conLet: undefined",
        "conLet a secas: soy let",
      ),
    },
    {
      type: "paragraph",
      text:
        "Esto es importante porque cuanto más crece un proyecto, más peligroso se vuelve tener variables globales: cualquier otra parte del código, o una librería, puede reasignar o pisar su valor, y se produce un problema de reasignación de valores difícil de rastrear. Con `let`, las variables nacen en su bloque y no ensucian el objeto global.",
    },
    {
      type: "image",
      src: "/img/dia-04/objeto-global.svg",
      alt: "Tabla de cuándo var crea una propiedad del objeto global: sí en un script clásico del navegador y en la consola interactiva de Node.js; no en módulos del navegador ni en archivos de Node.js. let y const nunca lo hacen.",
      caption: "Cuándo una variable var termina como propiedad del objeto global.",
    },
    {
      type: "heading",
      level: 3,
      text: "Matiz importante: depende de cómo se ejecuta el código",
    },
    {
      type: "paragraph",
      text:
        "Que `var` cree una propiedad en el objeto global solo ocurre en los scripts clásicos del navegador. Si el código se carga como módulo (`<script type=\"module\">`), el nivel superior pertenece al módulo y `var` no toca `window`. Lo mismo sucede en Node.js: en los archivos (CommonJS o módulos ES) las variables de nivel superior son locales del módulo y no se agregan al objeto global. La excepción es la consola interactiva de Node.js (REPL), que evalúa cada línea en el ámbito global.",
    },
    {
      type: "playground",
      title: "Experimento 6 · En un módulo, var no llega a window",
      description:
        "Ahora el mismo código se ejecuta como `<script type=\"module\">`. Compara con el experimento anterior.",
      mode: "module",
      code: L(
        'var conVar = "soy var";',
        "",
        'console.log("window.conVar:", window.conVar);',
        'console.log("this en un módulo:", this);',
      ),
      expected: L("window.conVar: undefined", "this en un módulo: undefined"),
    },
    {
      type: "paragraph",
      text:
        "En Node.js el objeto global se llama `global`, mientras que en el navegador es `window`. Para no depender del entorno existe un nombre estándar que funciona en ambos: `globalThis`. Úsalo cuando necesites el objeto global en código que debe ejecutarse en varios entornos.",
    },
    {
      type: "code",
      lang: "js",
      title: "Un nombre para el objeto global en cualquier entorno",
      code: L(
        "// Navegador: globalThis === window",
        "// Node.js:   globalThis === global",
        'console.log(typeof globalThis);          // "object"',
        'console.log(typeof globalThis.Math);     // "object"',
      ),
    },
    {
      type: "heading",
      level: 3,
      text: "Variables globales accidentales",
    },
    {
      type: "paragraph",
      text:
        "Hay otra forma de crear una variable global sin querer: asignar un valor a un nombre sin declararlo. En el modo normal el motor lo permite y crea la variable en el ámbito global; en modo estricto lanza un `ReferenceError`. Es otra razón para declarar siempre con `let` o `const`.",
    },
    {
      type: "playground",
      title: "Experimento 7 · Olvidar declarar una variable",
      description: "Sin `let` ni `const`, la asignación crea una global. El modo estricto lo impide.",
      code: L(
        "function sinDeclarar() {",
        "  total = 10; // ¡falta let o const!",
        "}",
        "",
        "sinDeclarar();",
        "console.log(typeof total, globalThis.total);",
        "",
        "// En modo estricto es un error",
        "try {",
        "  new Function('\"use strict\"; olvidada = 5;')();",
        "} catch (error) {",
        '  console.log("En modo estricto:", error.name);',
        "}",
      ),
      expected: L("number 10", "En modo estricto: ReferenceError"),
    },

    // ───────────────────────── Buenas prácticas ─────────────────────────
    { type: "heading", level: 2, text: "Qué usar hoy: la regla práctica" },
    {
      type: "paragraph",
      text:
        "La recomendación actual es no usar `var` en código nuevo. Los motivos son los que acabas de ver: ignora los bloques, se eleva, puede crear variables globales y permite redeclararse sin avisar. En la práctica se recomienda: usar `const` por defecto (se explica en la próxima lección), `let` cuando necesites reasignar el valor, y evitar `var`, salvo al mantener código antiguo.",
    },
    {
      type: "table",
      caption: "var frente a let",
      headers: ["", "var", "let"],
      rows: [
        ["Ámbito", "Función (o global). Ignora los bloques.", "Bloque, función o global."],
        ["Usar antes de declarar", "Vale `undefined` (elevación).", "`ReferenceError` (zona muerta temporal)."],
        ["Redeclarar en el mismo ámbito", "Permitido, sin error.", "Error de sintaxis."],
        ["Propiedad del objeto global (script clásico)", "Sí.", "No."],
        ["Recomendado en código nuevo", "No.", "Sí, cuando el valor cambia; si no, `const`."],
      ],
    },
    {
      type: "callout",
      variant: "info",
      text:
        "Si encuentras en un foro o en una documentación un ejemplo con `var`, normalmente puedes cambiarlo por `let` (o `const`). Antes de hacerlo revisa que el código no dependa de la elevación, de redeclarar la misma variable ni de que sea global, porque en esos casos el comportamiento cambia. Los linters ayudan: ESLint tiene las reglas `no-var` y `prefer-const` para detectar estos usos.",
    },

    // ───────────────────────── Datos que cambian ─────────────────────────
    { type: "heading", level: 2, text: "Datos que suelen aparecer desactualizados" },
    {
      type: "table",
      caption: "Material antiguo frente a información verificada",
      headers: ["Suele decirse", "Información verificada"],
      rows: [
        [
          "Si usas otro editor, como Atom, las extensiones también están disponibles.",
          "Atom se descontinuó: se anunció en junio de 2022 y el proyecto se archivó el 15 de diciembre de 2022.",
        ],
        [
          "Las variables `var` tienen ámbito global.",
          "Tienen ámbito de función; solo son globales cuando se declaran fuera de cualquier función en un script clásico.",
        ],
        [
          "Todo lo declarado con `var` termina en `window` (navegador) o en `global` (Node.js).",
          "Solo en scripts clásicos del navegador y en la consola interactiva (REPL) de Node.js. No en módulos ni en archivos de Node.js.",
        ],
        [
          "La elevación mueve la variable y su valor al inicio.",
          "Solo se eleva la declaración; el valor se asigna donde está la línea. Hasta entonces la variable vale `undefined`.",
        ],
        [
          "`let` no se eleva.",
          "El motor conoce la declaración desde el inicio del bloque, pero hasta que se ejecuta está en la zona muerta temporal y usarla lanza `ReferenceError`.",
        ],
        [
          "El objeto global de Node.js es `global`, y el del navegador `window`.",
          "Es cierto, pero `globalThis` es el nombre estándar y funciona en todos los entornos.",
        ],
        [
          "ESLint se configura en `.eslintrc`.",
          "Desde ESLint 9 el formato por defecto es `eslint.config.js` (flat config) y en ESLint 10 (febrero de 2026) `.eslintrc` ya no se admite.",
        ],
      ],
    },

    // ───────────────────────── FAQ ─────────────────────────
    {
      type: "accordion",
      title: "Preguntas frecuentes de esta lección",
      items: [
        {
          title: "¿Puedo seguir usando `var`?",
          text:
            "Funciona y lo verás en mucho código antiguo, pero en código nuevo se recomienda `const` y `let`. Si mantienes código existente, entiende su comportamiento antes de cambiarlo.",
        },
        {
          title: "¿Qué es exactamente un bloque?",
          text:
            "Un trozo de código delimitado por un par de llaves `{ }`. Los crean, entre otros, las estructuras condicionales y repetitivas, y también puedes escribir un bloque suelto.",
        },
        {
          title: "¿Por qué `typeof` de una variable inexistente no da error?",
          text:
            "Porque `typeof` es el único operador que tolera nombres no declarados y devuelve `\"undefined\"`. Con una variable `let` en su zona muerta temporal sí lanza `ReferenceError`.",
        },
        {
          title: "¿La elevación también ocurre con las funciones?",
          text:
            "Sí: las declaraciones de función se elevan completas y se pueden llamar antes de escribirlas. Lo estudiaremos en la lección de funciones.",
        },
        {
          title: "¿Es obligatorio usar Live Server?",
          text:
            "No. Es solo una comodidad. Puedes abrir el archivo HTML directamente en el navegador, pero tendrás que recargar a mano; algunas funciones del navegador exigen además que la página se sirva desde un servidor.",
        },
        {
          title: "¿Qué pasa si declaro la misma variable con `let` dos veces?",
          text:
            "En el mismo ámbito es un error de sintaxis. En un bloque anidado sí puedes usar el mismo nombre, porque es una variable nueva que oculta a la exterior mientras estás dentro.",
        },
      ],
    },

    // ───────────────────────── Cierre ─────────────────────────
    { type: "heading", level: 2, text: "Cierre" },
    {
      type: "paragraph",
      text:
        "Ya sabes declarar variables y, sobre todo, por qué `var` se abandonó y qué aporta `let`. En la próxima lección veremos una nueva forma de declarar variables que no van a cambiar su valor, las constantes (`const`), y completaremos la regla de qué palabra usar en cada caso.",
    },
    {
      type: "checklist",
      title: "Antes de pasar al Día 5, verifica que puedes explicar…",
      items: [
        "Qué es una variable y cómo imprimir su valor con `console.log`.",
        "Cómo escribir comentarios de una línea y de varias líneas.",
        "Qué es el ámbito (scope) y cuáles son los tres ámbitos.",
        "Por qué `var` «escapa» de los bloques y `let` no.",
        "Qué es la elevación (hoisting) y qué significa la zona muerta temporal.",
        "Cuándo una variable `var` se convierte en propiedad del objeto global y cuándo no.",
        "Qué es `globalThis` y cuándo conviene usarlo.",
        "Qué usar hoy: `const` por defecto, `let` si el valor cambia y evitar `var`.",
      ],
    },
    { type: "heading", level: 3, text: "Fuentes consultadas (noviembre de 2026)" },
    {
      type: "list",
      items: [
        "[MDN: var](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var)",
        "[MDN: let](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let)",
        "[MDN: globalThis](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/globalThis)",
        "[Atom: anuncio de cierre](https://atom.io/)",
        "[Atom (Wikipedia)](https://en.wikipedia.org/wiki/Atom_(text_editor))",
        "[Stack Overflow Developer Survey 2025](https://survey.stackoverflow.co/2025/)",
        "[ESLint v10.0.0](https://eslint.org/blog/2026/02/eslint-v10.0.0-released/)",
        "[ESLint: guía de migración a flat config](https://eslint.org/docs/latest/use/configure/migration-guide)",
        "[Live Server para VS Code](https://ritwickdey.github.io/vscode-live-server/)",
      ],
    },
  ],
  selfCheck: [
    {
      question: "¿Qué es una variable?",
      options: [
        "Un valor que nunca cambia",
        "Un lugar en la memoria con un nombre donde se guardan datos de cualquier tipo",
        "Una función del navegador",
        "Un comentario del código",
      ],
      correctIndex: 1,
      explanation:
        "Una variable asocia un nombre a un espacio de memoria que puede guardar valores primitivos o compuestos.",
    },
    {
      question: "¿Cuál es el ámbito de una variable declarada con `var` dentro de un bloque `if`?",
      options: [
        "Solo el bloque `if`",
        "La función que la contiene (o el ámbito global si no hay función)",
        "Solo la línea donde se declara",
        "Ninguno: es un error",
      ],
      correctIndex: 1,
      explanation:
        "`var` ignora los bloques: su ámbito es la función o el script. Por eso «escapa» del bloque.",
    },
    {
      question: "Con `var musica = \"rock\"; { var musica = \"pop\"; }`, ¿cuánto vale `musica` después del bloque?",
      options: ["\"rock\"", "\"pop\"", "undefined", "Error"],
      correctIndex: 1,
      explanation:
        "La redeclaración dentro del bloque no crea una variable nueva, es la misma. Con `let` valdría \"rock\".",
    },
    {
      question: "¿Qué significa «hoisting» o elevación?",
      options: [
        "Que el motor sube la declaración de `var` al inicio de su ámbito, pero no el valor asignado",
        "Que las variables se guardan en la nube",
        "Que el código se ejecuta de abajo hacia arriba",
        "Que las variables se vuelven constantes",
      ],
      correctIndex: 0,
      explanation:
        "Se procesa la declaración antes de ejecutar el código; el valor se asigna en la línea original. Hasta entonces vale `undefined`.",
    },
    {
      question: "¿Qué ocurre si usas una variable `let` antes de la línea donde se declara?",
      options: [
        "Vale undefined",
        "Vale null",
        "Lanza un ReferenceError (está en la zona muerta temporal)",
        "Se crea una variable global",
      ],
      correctIndex: 2,
      explanation:
        "`let` y `const` no se pueden usar hasta que la ejecución alcanza su declaración: ese tramo es la zona muerta temporal.",
    },
    {
      question: "En un script clásico del navegador, ¿qué devuelve `window.x` si declaraste `let x = 1` en el nivel superior?",
      options: ["1", "undefined", "null", "Error"],
      correctIndex: 1,
      explanation:
        "`let` no crea propiedades en el objeto global. Con `var x = 1` en un script clásico, `window.x` valdría 1.",
    },
    {
      question: "¿Qué pasa con `var` de nivel superior en un archivo de Node.js (no en el REPL)?",
      options: [
        "Se agrega siempre a `global`",
        "Es local del módulo y no se agrega al objeto global",
        "Lanza un error",
        "Se convierte en `const`",
      ],
      correctIndex: 1,
      explanation:
        "En Node.js los archivos son módulos con su propio ámbito. Solo la consola interactiva (REPL) evalúa en el ámbito global.",
    },
    {
      question: "¿Qué nombre estándar funciona para el objeto global en el navegador y en Node.js?",
      options: ["window", "global", "globalThis", "self"],
      correctIndex: 2,
      explanation:
        "`globalThis` es el nombre estándar y funciona en todos los entornos; `window` solo existe en el navegador y `global` en Node.js.",
    },
    {
      question: "¿Qué recomendación actual aplica al elegir cómo declarar una variable?",
      options: [
        "Usar siempre `var`",
        "Usar `const` por defecto, `let` si el valor cambia y evitar `var` en código nuevo",
        "Usar `let` en todos los casos",
        "No declarar las variables",
      ],
      correctIndex: 1,
      explanation:
        "Es la práctica extendida y la que recomiendan guías como la de MDN: `const` si no se reasigna, `let` si se reasigna, y `var` solo para mantener código antiguo.",
    },
    {
      question: "¿Qué ocurre si asignas un valor a un nombre que nunca declaraste, en modo normal?",
      options: [
        "Siempre es un error",
        "Se crea una variable global accidental (en modo estricto sería un ReferenceError)",
        "Se crea una constante",
        "Se ignora la línea",
      ],
      correctIndex: 1,
      explanation:
        "Sin declarar, el motor crea la variable en el ámbito global en modo normal, y por eso conviene usar siempre `let` o `const` y el modo estricto.",
    },
  ],
};
