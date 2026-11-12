import type { Lesson } from "@/lib/types";

// Une líneas de código sin tener que escapar backticks ni `${}` dentro de template literals.
const L = (...lines: string[]) => lines.join("\n");

// Contenido validado contra fuentes actuales en noviembre de 2026 (ver sección "Fuentes").
export const day03: Lesson = {
  day: 3,
  slug: "caracteristicas-gramatica-tipos-de-datos",
  title: "Características de JavaScript, reglas de escritura y tipos de datos",
  section: "Fundamentos del lenguaje",
  estimatedMinutes: 45,
  icon: "🧱",
  objectives: [
    "Explicar qué es el isomorfismo y por qué JavaScript permite construir una aplicación completa con un solo lenguaje",
    "Describir las características del lenguaje: alto nivel, ejecución con compilación JIT, tipado dinámico y débil, multiparadigma y sensible a mayúsculas",
    "Aplicar las reglas para nombrar identificadores y las convenciones de escritura (camelCase, PascalCase, CONSTANT_CASE)",
    "Entender el papel del punto y coma y de las palabras reservadas",
    "Distinguir entre tipos primitivos y tipos compuestos (por valor y por referencia)",
  ],
  blocks: [
    // ───────────────────────── Apertura ─────────────────────────
    {
      type: "paragraph",
      text:
        "Con esta lección termina la introducción y empieza la gramática del lenguaje: las reglas que hay que seguir al escribir código. Algunas están definidas y son obligatorias; otras son opcionales o simples convenciones. Son el equivalente a la ortografía de la programación.",
    },
    {
      type: "keyFacts",
      items: [
        { value: "7", label: "Tipos de datos primitivos" },
        { value: "64 bits", label: "Formato de todos los números (doble precisión, IEEE 754)" },
        { value: "2009", label: "Año en que Node.js llevó el motor V8 al servidor" },
        { value: "4 niveles", label: "Ignition, Sparkplug, Maglev y TurboFan en el motor V8" },
        { value: "Sí", label: "JavaScript distingue mayúsculas de minúsculas" },
        { value: "Opcional", label: "El punto y coma, con matices importantes" },
      ],
    },
    {
      type: "callout",
      variant: "success",
      text:
        "Contenido verificado en noviembre de 2026 con MDN Web Docs, el blog del motor V8, la documentación de Node.js y del estándar WebAssembly. Al final hay una tabla con datos que suelen aparecer desactualizados y la lista de fuentes.",
    },

    // ───────────────────────── Isomorfismo ─────────────────────────
    { type: "heading", level: 2, text: "Un solo lenguaje de principio a fin" },
    {
      type: "paragraph",
      text:
        "En la introducción vimos cómo JavaScript pasó de ser una herramienta para dar interactividad al HTML a ser uno de los lenguajes más usados del mundo: en la encuesta de desarrolladores de Stack Overflow de 2026 es el lenguaje con más uso (62,0 %). Una de las razones es que permite el isomorfismo.",
    },
    {
      type: "paragraph",
      text:
        "Isomorfismo viene de «iso» (igual) y «morphos» (forma). En desarrollo web describe aplicaciones cuyo código JavaScript puede ejecutarse tanto en el cliente (el navegador) como en el servidor; a veces se le llama también JavaScript universal. En la práctica significa construir una aplicación de principio a fin con una sola tecnología.",
    },
    {
      type: "image",
      src: "/img/dia-03/stack-isomorfico.svg",
      alt: "Comparación de dos pilas en las capas vista, controlador y modelo: una tradicional con JavaScript, PHP y SQL, y otra con JavaScript en el navegador, Node.js en el servidor y una base de datos documental parecida a JSON.",
      caption: "Con una pila JavaScript, el mismo lenguaje cubre las tres capas del patrón MVC.",
    },
    {
      type: "paragraph",
      text:
        "Piensa en una aplicación PHP con el patrón MVC (modelo-vista-controlador): en el front-end usas JavaScript, en el back-end PHP y en la base de datos SQL (MySQL, PostgreSQL, SQL Server…). Son tres lenguajes distintos. Con JavaScript puedes cubrir las tres capas:",
    },
    {
      type: "list",
      items: [
        "Vista: la interfaz en el navegador, que solo entiende JavaScript de forma nativa.",
        "Controlador: la lógica de negocio en el servidor con Node.js, el entorno que llevó el motor V8 de Chrome al servidor en 2009.",
        "Modelo: las bases de datos documentales (MongoDB, Firestore, Couchbase y otras) almacenan documentos con una estructura muy parecida a un objeto JavaScript o a un JSON; MongoDB usa BSON, una representación binaria de JSON.",
      ],
    },
    {
      type: "callout",
      variant: "warning",
      text:
        "Matiz importante: JavaScript no es el único lenguaje que se puede usar en el servidor, ni el único que puede llegar al navegador. Lo que lo distingue es que es el único que los navegadores ejecutan de forma nativa. Otros lenguajes llegan al navegador compilándose a JavaScript (TypeScript, Dart…) o a WebAssembly.",
    },
    {
      type: "paragraph",
      text:
        "Por eso los metalenguajes y compiladores como TypeScript tienen que producir código JavaScript para que los navegadores lo ejecuten. WebAssembly es otro destino de compilación: un formato binario que todos los navegadores principales soportan y que se estandarizó en su versión 3.0 en septiembre de 2025, de modo que lenguajes como Rust, C++, Java, Kotlin o Dart pueden ejecutarse en el navegador. No se escribe a mano y, normalmente, convive con JavaScript.",
    },
    {
      type: "callout",
      variant: "info",
      text:
        "Novedad en Node.js: desde Node.js 22.18 y 23.6 puede ejecutar archivos TypeScript directamente eliminando las anotaciones de tipos («type stripping»). Solo admite la sintaxis de TypeScript que desaparece al borrar los tipos y no comprueba los tipos: para eso se sigue usando el compilador `tsc`.",
    },

    // ───────────────────────── Más allá de la web ─────────────────────────
    { type: "heading", level: 2, text: "JavaScript más allá de la web" },
    {
      type: "paragraph",
      text:
        "Desde el nacimiento de Node.js, hace ya más de una década, JavaScript se ha expandido mucho. Además del diseño y desarrollo web, hoy se usa en áreas muy diversas:",
    },
    {
      type: "image",
      src: "/img/dia-03/usos-javascript.svg",
      alt: "JavaScript en el centro con ocho áreas: web, servidor, bases de datos documentales, móvil e híbridas, videojuegos y 3D, realidad virtual y aumentada, hardware y aprendizaje automático.",
      caption: "Áreas de uso de JavaScript. Los nombres de librerías son ejemplos.",
    },
    {
      type: "table",
      caption: "Áreas de uso y ejemplos",
      headers: ["Área", "Qué se puede hacer", "Ejemplos de tecnologías"],
      rows: [
        ["Videojuegos y gráficos 3D", "Juegos y experiencias 3D que corren en el navegador.", "WebGL y WebGPU (soportado en todos los navegadores principales desde noviembre de 2025), Three.js, Babylon.js."],
        ["Realidad virtual y aumentada", "Experiencias inmersivas desde el navegador.", "WebXR. El soporte es desigual: funciona en navegadores Chromium y en el navegador de Meta Quest, y no en Firefox ni en Safari de iPhone."],
        ["Hardware", "Controlar placas, electrodomésticos, drones y robots.", "Johnny-Five (Arduino y otras placas)."],
        ["Aplicaciones híbridas y móviles", "Apps para iOS y Android con tecnologías web o con JavaScript.", "Ionic Framework con Capacitor, React Native."],
        ["Aprendizaje automático", "Entrenar y ejecutar modelos en el navegador o en Node.js.", "TensorFlow.js."],
      ],
    },
    {
      type: "callout",
      variant: "success",
      text:
        "Por eso JavaScript es una muy buena opción como primer lenguaje: a partir de él puedes ir al desarrollo web y a todas estas áreas.",
    },
    { type: "heading", level: 3, text: "Un recordatorio: Java no es JavaScript" },
    {
      type: "paragraph",
      text:
        "Como vimos en la primera lección, son dos tecnologías totalmente diferentes que solo comparten parte del nombre, igual que ham (jamón) y hamster (hámster) comparten letras sin tener relación. Conviene repetirlo porque la confusión es muy frecuente.",
    },

    // ───────────────────────── Características ─────────────────────────
    { type: "heading", level: 2, text: "Características del lenguaje" },
    {
      type: "table",
      caption: "Resumen de características",
      headers: ["Característica", "Qué significa", "Ejemplo"],
      rows: [
        ["Alto nivel", "Ofrece abstracciones: no gestionas la memoria ni la recolección de basura.", "Creas un objeto y el motor libera su memoria cuando ya no se usa."],
        ["Se ejecuta sin compilar antes (con JIT)", "No hay una fase de compilación aparte; el motor compila mientras ejecuta.", "Guardas el archivo y lo ejecutas."],
        ["Dinámico y débilmente tipado", "El tipo pertenece al valor, no a la variable, y hay conversiones implícitas.", "`42 + \"1\"` da `\"421\"`."],
        ["Multiparadigma", "Admite programación estructurada, orientada a objetos y funcional.", "Clases, funciones y código imperativo o declarativo."],
        ["Sensible a mayúsculas", "`perro` y `PERRO` son identificadores distintos.", "`let perro; let PERRO;`"],
        ["Punto y coma opcional", "El motor lo inserta automáticamente en muchos casos.", "Con matices que veremos."],
      ],
    },

    { type: "heading", level: 3, text: "Lenguaje de alto nivel" },
    {
      type: "paragraph",
      text:
        "Que sea de alto nivel significa que JavaScript te da abstracciones: no tienes que preocuparte por gestionar la memoria ni por la recolección de basura (liberar los recursos que ya no se usan) para mejorar el rendimiento. Eso es lo que lo diferencia de un lenguaje de bajo nivel, donde sí debes ocuparte de esas circunstancias.",
    },

    { type: "heading", level: 3, text: "Dinámico y compilado en tiempo de ejecución" },
    {
      type: "paragraph",
      text:
        "No necesitas una fase de compilación previa seguida de una fase de ejecución: escribes el código y el navegador (o Node.js) lo ejecuta. Es habitual leer que JavaScript es «interpretado», y MDN lo describe como un lenguaje interpretado o compilado justo a tiempo (JIT). Cada navegador tiene su propio motor: V8 en Chrome, Edge y Node.js, SpiderMonkey en Firefox y JavaScriptCore en Safari.",
    },
    {
      type: "image",
      src: "/img/dia-03/motor-v8.svg",
      alt: "El código se analiza, Ignition genera bytecode y lo ejecuta, y el código que se ejecuta muchas veces se compila con Sparkplug, Maglev y TurboFan a código máquina optimizado. El recolector de basura libera la memoria.",
      caption: "El motor V8 empieza interpretando y optimiza el código «caliente» mientras el programa corre.",
    },
    {
      type: "paragraph",
      text:
        "En el caso de V8, todo el código se convierte primero en bytecode que el intérprete Ignition ejecuta. Mientras tanto el motor observa cómo se comporta el programa y, cuando una función se ejecuta mucho, la compila a código máquina optimizado con compiladores JIT (Sparkplug, Maglev y TurboFan). No necesitas profundizar en esto ahora: basta con saber que tu código se compila en tiempo de ejecución, y eso es lo que lo vuelve dinámico.",
    },

    { type: "heading", level: 3, text: "Dinámicamente y débilmente tipado" },
    {
      type: "paragraph",
      text:
        "Cuando creas una variable, esta no queda ligada a un tipo de dato. Una variable puede empezar con una cadena de texto y, más adelante en el flujo del programa, guardar un número, un objeto o una función. En otros lenguajes debes especificar el tipo al declarar la variable: en ActionScript (Flash) o en Java, por ejemplo, el tipo se asocia al identificador, es decir, al nombre de la variable. En JavaScript el tipo está ligado al valor, y por eso puede cambiar de un momento a otro.",
    },
    {
      type: "paragraph",
      text:
        "Además es débilmente tipado: cuando una operación mezcla tipos distintos, JavaScript hace conversiones implícitas en lugar de lanzar un error. Es cómodo, pero puede producir resultados sorprendentes. Si necesitas tipos estáticos, TypeScript los añade encima de JavaScript.",
    },
    {
      type: "playground",
      title: "Experimento 1 · Tipos dinámicos, conversión implícita y mayúsculas",
      description: "Observa cómo cambia el tipo de una misma variable y qué hace el operador `+` con tipos mezclados.",
      code: L(
        "// Una variable puede cambiar de tipo según el valor que guarda",
        'let dato = "hola";',
        "console.log(typeof dato);",
        "dato = 42;",
        "console.log(typeof dato);",
        'dato = { nombre: "Ana" };',
        "console.log(typeof dato);",
        "dato = function () {};",
        "console.log(typeof dato);",
        "",
        "// Conversión implícita (tipado débil)",
        'console.log(42 + "1");',
        'console.log("10" - 2);',
        "",
        "// Sensible a mayúsculas y minúsculas",
        'const perro = "en minúsculas";',
        'const PERRO = "en mayúsculas";',
        "console.log(perro, PERRO);",
      ),
      expected: L(
        "string",
        "number",
        "object",
        "function",
        "421",
        "8",
        "en minúsculas en mayúsculas",
      ),
    },

    { type: "heading", level: 3, text: "Multiparadigma" },
    {
      type: "paragraph",
      text:
        "JavaScript permite programación estructurada, programación orientada a objetos y programación funcional. El código puede escribirse con sentencias imperativas (indicas paso a paso cómo hacerlo) o declarativas (describes qué quieres obtener). Según lo que estés haciendo se aplica un paradigma u otro, y lo veremos poco a poco.",
    },

    { type: "heading", level: 3, text: "Sensible a mayúsculas y minúsculas" },
    {
      type: "paragraph",
      text:
        "JavaScript distingue mayúsculas de minúsculas (case sensitive). Si declaras una variable `PERRO` con las cinco letras en mayúscula, será una variable totalmente distinta de `perro` en minúsculas. Es una fuente habitual de errores al empezar: un solo carácter con otro tamaño crea otro identificador.",
    },

    // ───────────────────────── Punto y coma ─────────────────────────
    { type: "heading", level: 2, text: "El punto y coma es opcional... con matices" },
    {
      type: "paragraph",
      text:
        "En muchos lenguajes terminar cada línea con punto y coma es una regla, y sin él el código ni siquiera compila. En JavaScript no es obligatorio: el motor aplica la inserción automática de punto y coma (ASI, por Automatic Semicolon Insertion). Hay desarrolladores que consideran buena práctica ponerlos aunque no hagan falta y otros que prefieren omitirlos; no hace falta ser estricto. Muchas personas dejan que el editor y los formateadores de código los agreguen o los quiten automáticamente, así que realmente no tienes que preocuparte: usa punto y coma si estás acostumbrado, y si no los pones, normalmente no pasará nada.",
    },
    {
      type: "paragraph",
      text:
        "Normalmente no pasa nada, salvo en algunos casos concretos en los que la inserción automática produce un resultado distinto del que esperabas: poner varias sentencias en la misma línea, que una línea empiece con corchete o con paréntesis (el motor puede unirla a la línea anterior), o un `return` seguido de un salto de línea.",
    },
    {
      type: "playground",
      title: "Experimento 2 · Cuando falta el punto y coma",
      description: "Primer caso: un `return` seguido de un salto de línea. El objeto de la siguiente línea nunca se devuelve.",
      code: L(
        "function obtenerConfiguracion() {",
        "  return",
        "  {",
        "    activo: true",
        "  }",
        "}",
        "",
        "// JavaScript inserta un ; justo después de return",
        "console.log(obtenerConfiguracion());",
      ),
      expected: "undefined",
    },
    {
      type: "playground",
      title: "Experimento 3 · Una línea que empieza con paréntesis",
      description:
        "Segundo caso: JavaScript une la línea que empieza con `(` a la anterior y la trata como una llamada. El mensaje exacto del error varía según el navegador.",
      code: L(
        "const base = 5",
        "const altura = base",
        '(function () { console.log("hola") })()',
      ),
      expected: "TypeError: base is not a function",
    },
    {
      type: "callout",
      variant: "info",
      text:
        "Regla práctica: puedes escribir con o sin punto y coma, pero sé consistente. Si decides omitirlos, ten cuidado con las líneas que empiezan con `(`, `[` o con una plantilla de texto. Una herramienta como ESLint te avisa de estos casos.",
    },

    // ───────────────────────── Identificadores ─────────────────────────
    { type: "heading", level: 2, text: "Gramática: reglas para nombrar identificadores" },
    {
      type: "paragraph",
      text:
        "Un identificador es el nombre que le das a una variable, una función, una clase, etc. Las reglas son estas:",
    },
    {
      type: "list",
      items: [
        "Debe empezar con una letra, con el símbolo de dólar (`$`) o con un guion bajo (`_`).",
        "Después pueden venir letras, números, `$` y `_`.",
        "Nunca puede empezar con un número ni con otro carácter especial, como el guion medio (`-`).",
        "No puede contener espacios en blanco.",
        "No puede ser una palabra reservada del lenguaje.",
        "No puedes repetir el mismo identificador en el mismo ámbito: declarar `let arbol` y luego una función `arbol` es un error de sintaxis.",
      ],
    },
    {
      type: "table",
      caption: "Ejemplos de identificadores",
      headers: ["Identificador", "¿Válido?", "Motivo"],
      rows: [
        ["`a`", "Sí", "Empieza con una letra."],
        ["`$am`", "Sí", "Empieza con el símbolo de dólar."],
        ["`_a`", "Sí", "Empieza con un guion bajo."],
        ["`-a`", "No", "No puede empezar con un guion medio: error de sintaxis."],
        ["`1a`", "No", "No puede empezar con un número."],
        ["`mi variable`", "No", "No admite espacios."],
        ["`mi-variable`", "No", "El guion medio se interpreta como una resta."],
        ["`árbol`", "Sí, pero evítalo", "La especificación admite letras Unicode, aunque se recomienda evitar acentos y la ñ por compatibilidad y comodidad al teclear."],
      ],
    },
    {
      type: "playground",
      title: "Experimento 4 · ¿Qué nombres son válidos?",
      description:
        "Prueba tus propios nombres añadiéndolos a la lista. (Usa `new Function` solo con fines didácticos: nunca ejecutes texto que escriba un usuario.)",
      code: L(
        "const candidatos = [",
        '  "edad", "$precio", "_privado", "1numero",',
        '  "mi-variable", "mi variable", "árbol",',
        '  "class", "enum", "abstract",',
        "];",
        "",
        "for (const nombre of candidatos) {",
        "  try {",
        "    // Si el nombre no es un identificador válido, esta línea lanza un SyntaxError",
        "    new Function(`let ${nombre} = 1;`);",
        '    console.log(nombre.padEnd(14), "válido");',
        "  } catch (error) {",
        '    console.log(nombre.padEnd(14), "inválido");',
        "  }",
        "}",
      ),
      expected: L(
        "edad           válido",
        "$precio        válido",
        "_privado       válido",
        "1numero        inválido",
        "mi-variable    inválido",
        "mi variable    inválido",
        "árbol          válido",
        "class          inválido",
        "enum           inválido",
        "abstract       válido",
      ),
    },
    {
      type: "playground",
      title: "Experimento 5 · Identificadores repetidos",
      description:
        "Con `let` y con funciones repetir el nombre es un error; `var` lo permite, pero es una razón más para evitarlo.",
      code: L(
        "const intentos = {",
        '  "let + let": "let arbol = 1; let arbol = 2;",',
        '  "let + function": "let arbol = 1; function arbol() {}",',
        '  "var + var": "var arbol = 1; var arbol = 2;",',
        "};",
        "",
        "// (No te preocupes por entender cada línea todavía)",
        "for (const [nombre, codigo] of Object.entries(intentos)) {",
        "  try {",
        "    new Function(codigo);",
        '    console.log(nombre, "→ permitido");',
        "  } catch (error) {",
        '    console.log(nombre, "→", error.name);',
        "  }",
        "}",
      ),
      expected: L("let + let → SyntaxError", "let + function → SyntaxError", "var + var → permitido"),
    },

    // ───────────────────────── Convenciones ─────────────────────────
    { type: "heading", level: 2, text: "Convenciones de escritura" },
    {
      type: "paragraph",
      text:
        "Además de las reglas obligatorias hay convenciones: acuerdos de estilo que no cambian cómo funciona el código, pero que lo hacen más legible. Como no se pueden usar espacios, existen varias técnicas para unir palabras en un nombre:",
    },
    {
      type: "table",
      caption: "Técnicas para escribir nombres con varias palabras",
      headers: ["Nombre de la técnica", "Cómo se escribe", "Ejemplo"],
      rows: [
        ["snake_case", "Minúsculas separadas por guion bajo.", "`mi_archivo`"],
        ["kebab-case", "Minúsculas separadas por guion medio (solo en nombres de archivo, no en identificadores).", "`mi-archivo`"],
        ["lowerCamelCase", "Primera palabra en minúsculas y cada palabra siguiente con inicial mayúscula.", "`nombreCompleto`"],
        ["UpperCamelCase (PascalCase)", "Cada palabra con inicial mayúscula, incluida la primera.", "`NombreCompleto`"],
        ["CONSTANT_CASE", "Todo en mayúsculas separado por guion bajo.", "`TASA_DE_IVA`"],
      ],
    },
    {
      type: "table",
      caption: "Qué convención usar en cada caso",
      headers: ["Elemento", "Convención", "Ejemplo"],
      rows: [
        ["Variables, funciones, objetos, arreglos y cadenas de texto", "lowerCamelCase. Si el nombre tiene una sola palabra va toda en minúsculas.", "`edad`, `nombreCompleto`, `calcularTotal`"],
        ["Constantes (valores que no cambian)", "CONSTANT_CASE. Si tienen varias palabras se separan con guion bajo.", "`PI`, `TASA_DE_IVA`"],
        ["Clases (programación orientada a objetos; existen desde ES2015)", "UpperCamelCase.", "`Persona`, `CarritoDeCompras`"],
        ["Nombres de archivo", "Minúsculas con guion bajo o guion medio. Sigue la convención de tu proyecto.", "`mi_archivo.js`, `mi-archivo.js`"],
      ],
    },
    {
      type: "callout",
      variant: "warning",
      text:
        "Para los nombres de archivo no hay una única norma. La guía de estilo de Google admite minúsculas con guion bajo o con guion medio, y el kebab-case es muy habitual. Los frameworks orientados a componentes (Angular, React, Vue) tienen sus propias costumbres, por ejemplo nombrar los componentes en UpperCamelCase. Lo importante es seguir la convención del proyecto y ser consistente.",
    },
    {
      type: "code",
      lang: "js",
      title: "Las convenciones en código",
      code: L(
        "const TASA_DE_IVA = 0.19;                  // constante: CONSTANT_CASE",
        'let nombreCompleto = "Ana Pérez";           // variable: lowerCamelCase',
        "",
        "function calcularTotal(subtotal) {          // función: lowerCamelCase",
        "  return subtotal * (1 + TASA_DE_IVA);",
        "}",
        "",
        "class CarritoDeCompras {                    // clase: UpperCamelCase",
        "  constructor() {",
        "    this.productos = [];",
        "  }",
        "}",
      ),
    },
    {
      type: "paragraph",
      text:
        "Si ahora no sabes qué es un valor primitivo, una función o una instancia, no te preocupes: lo iremos viendo poco a poco. Lo que importa desde el principio es conocer las reglas para escribir el código.",
    },

    // ───────────────────────── Palabras reservadas ─────────────────────────
    { type: "heading", level: 2, text: "Palabras reservadas" },
    {
      type: "paragraph",
      text:
        "Las palabras reservadas son palabras que el lenguaje ya usa para sus propias funcionalidades, así que no puedes usarlas como identificadores. Esta es la lista vigente según MDN Web Docs:",
    },
    {
      type: "table",
      caption: "Palabras reservadas de JavaScript",
      headers: ["Categoría", "Palabras", "Cuándo se reservan"],
      rows: [
        [
          "Siempre reservadas",
          "`break`, `case`, `catch`, `class`, `const`, `continue`, `debugger`, `default`, `delete`, `do`, `else`, `enum`, `export`, `extends`, `false`, `finally`, `for`, `function`, `if`, `import`, `in`, `instanceof`, `new`, `null`, `return`, `super`, `switch`, `this`, `throw`, `true`, `try`, `typeof`, `var`, `void`, `while`, `with`",
          "En todo el código.",
        ],
        [
          "Solo en modo estricto",
          "`let`, `static`, `yield`, `implements`, `interface`, `package`, `private`, `protected`, `public`",
          "En código con modo estricto (los módulos y el cuerpo de las clases lo activan automáticamente).",
        ],
        ["Solo en módulos y funciones async", "`await`", "Dentro de módulos y de funciones `async`."],
        [
          "Con significado especial, pero no reservadas",
          "`async`, `of`, `get`, `set`, `from`, `as`, `arguments`, `eval`",
          "Tienen un significado en ciertos contextos. `arguments` y `eval` no pueden declararse como identificador en modo estricto.",
        ],
      ],
    },
    {
      type: "callout",
      variant: "warning",
      text:
        "Atención a las listas antiguas: es común ver listas que incluyen `abstract`, `boolean`, `byte`, `char`, `double`, `final`, `float`, `goto`, `int`, `long`, `native`, `short`, `synchronized`, `throws`, `transient` y `volatile`. Esas palabras estaban reservadas en las ediciones 1 a 3 de ECMAScript y hoy ya no lo están (compruébalo en el Experimento 4: `abstract` es válido). Aun así, usarlas como nombre confunde, por lo que conviene evitarlas.",
    },
    {
      type: "callout",
      variant: "info",
      text:
        "`undefined`, `NaN` e `Infinity` no son palabras reservadas, pero tampoco debes redefinirlos ni usarlos como nombres de variables.",
    },

    // ───────────────────────── Orden del código ─────────────────────────
    { type: "heading", level: 2, text: "Cómo ordenar tu código" },
    {
      type: "paragraph",
      text:
        "Esto depende del proyecto y del paradigma (orientado a objetos, funcional, componentes), pero en la medida de lo posible ordenar el código siempre de la misma manera da buena estructura y disciplina para saber dónde está cada cosa. Un orden recomendado:",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "Importación de los módulos externos que utilices. Los módulos ECMAScript (`import` y `export`) son parte del estándar desde ES2015 y permiten usar archivos JavaScript dentro de otros.",
        "Declaración de las variables y constantes.",
        "Declaración de las funciones.",
        "Ejecuciones de código: crear una instancia de una clase, llamar a métodos de un objeto, asignar eventos, etc.",
      ],
    },
    {
      type: "code",
      lang: "js",
      title: "Un archivo ordenado",
      code: L(
        "// 1. Importación de módulos",
        'import { formatearPrecio } from "./utilidades.js";',
        "",
        "// 2. Variables y constantes",
        "const TASA_DE_IVA = 0.19;",
        "let total = 0;",
        "",
        "// 3. Funciones",
        "function calcularTotal(subtotal) {",
        "  return subtotal * (1 + TASA_DE_IVA);",
        "}",
        "",
        "// 4. Ejecución",
        "total = calcularTotal(100);",
        "console.log(formatearPrecio(total));",
      ),
      highlightLines: [1, 4, 8, 13],
    },

    // ───────────────────────── Tipos de datos ─────────────────────────
    { type: "heading", level: 2, text: "Tipos de datos: un primer vistazo" },
    {
      type: "paragraph",
      text:
        "Los tipos de datos se explican en detalle en las próximas lecciones. Por ahora basta con saber que existen dos grandes familias: los datos primitivos y los datos compuestos (también llamados complejos).",
    },
    {
      type: "image",
      src: "/img/dia-03/tipos-de-datos.svg",
      alt: "Siete tipos primitivos (String, Number, BigInt, Boolean, Undefined, Null y Symbol) con ejemplos y su resultado de typeof, y los objetos como tipo compuesto, que incluyen arreglos, funciones y clases.",
      caption: "Los siete tipos primitivos y los objetos.",
    },
    { type: "heading", level: 3, text: "Tipos primitivos" },
    {
      type: "paragraph",
      text:
        "En un valor primitivo accedes directamente al valor en el momento en que creas la variable. JavaScript tiene siete tipos primitivos:",
    },
    {
      type: "list",
      items: [
        "Cadenas de texto (`String`).",
        "Números (`Number`). A diferencia de otros lenguajes, donde hay enteros, flotantes y de doble precisión, aquí todos los números usan un único formato de 64 bits (doble precisión). `NaN` («Not a Number») es un valor especial de este tipo, no un tipo aparte.",
        "Enteros de tamaño arbitrario (`BigInt`), para enteros más grandes de lo que un `Number` puede representar con seguridad.",
        "Valores booleanos (`Boolean`): verdadero o falso (`true` o `false`).",
        "Indefinido (`undefined`): ausencia de valor.",
        "Nulo (`null`): ausencia de objeto.",
        "Símbolos (`Symbol`): valores únicos, útiles como claves de propiedades.",
      ],
    },
    {
      type: "playground",
      title: "Experimento 6 · typeof y los números",
      description: "El operador `typeof` indica el tipo de un valor. Fíjate en las rarezas: `null` y los números.",
      code: L(
        'console.log(typeof "hola");',
        "console.log(typeof 42);",
        "console.log(typeof 10n);",
        "console.log(typeof true);",
        "console.log(typeof undefined);",
        "console.log(typeof Symbol('id'));",
        "console.log(typeof null);        // una rareza histórica",
        "console.log(typeof NaN);         // NaN es un número",
        "",
        "// Todos los números son de doble precisión",
        "console.log(0.1 + 0.2);",
        "console.log(Number.MAX_SAFE_INTEGER);",
      ),
      expected: L(
        "string",
        "number",
        "bigint",
        "boolean",
        "undefined",
        "symbol",
        "object",
        "number",
        "0.30000000000000004",
        "9007199254740991",
      ),
    },
    { type: "heading", level: 3, text: "Tipos compuestos (por referencia)" },
    {
      type: "paragraph",
      text:
        "Con los tipos compuestos no accedes directamente al valor, sino a una referencia de dónde se encuentra. Imagina las coordenadas en un tablero de ajedrez: decir «caballo a e5» te indica en qué fila y columna está la pieza, no es la pieza. Los objetos, los arreglos, las funciones y las clases son tipos compuestos, y con el tiempo se han ido agregando más objetos que complementan este tipo de valores (como `Map`, `Set` o `Date`). En la práctica, todo lo que no es primitivo es un objeto.",
    },
    {
      type: "image",
      src: "/img/dia-03/valor-vs-referencia.svg",
      alt: "Con primitivos cada variable guarda su propia copia: al cambiar b, a no cambia. Con objetos dos variables apuntan al mismo objeto: al cambiarlo desde una, la otra también lo ve.",
      caption: "Copiar un primitivo duplica el valor; copiar un objeto duplica la referencia.",
    },
    {
      type: "playground",
      title: "Experimento 7 · Por valor y por referencia",
      description: "Predice la salida antes de ejecutar.",
      code: L(
        "// Primitivo: b recibe una copia del valor",
        "let a = 10;",
        "let b = a;",
        "b = 20;",
        "console.log(a, b);",
        "",
        "// Objeto: o2 recibe la referencia al mismo objeto",
        "const o1 = { n: 1 };",
        "const o2 = o1;",
        "o2.n = 2;",
        "console.log(o1.n, o2.n);",
      ),
      expected: L("10 20", "2 2"),
    },

    // ───────────────────────── Datos que cambian ─────────────────────────
    { type: "heading", level: 2, text: "Datos que suelen aparecer desactualizados" },
    {
      type: "table",
      caption: "Material antiguo frente a información verificada",
      headers: ["Suele decirse", "Información verificada"],
      rows: [
        [
          "JavaScript es el único lenguaje con el que se puede hacer una aplicación de principio a fin.",
          "Otros lenguajes también pueden usarse en el servidor y, compilados a WebAssembly (estándar 3.0 desde septiembre de 2025), en el navegador. Lo que distingue a JavaScript es que es el único que los navegadores ejecutan de forma nativa.",
        ],
        [
          "El motor V8 llegó al servidor en 2019.",
          "Fue en 2009, con Node.js.",
        ],
        [
          "JavaScript es un lenguaje solo interpretado.",
          "Los motores modernos combinan un intérprete con compilación JIT. V8 usa Ignition, Sparkplug, Maglev y TurboFan.",
        ],
        [
          "Los tipos primitivos son string, number, boolean, null, undefined y NaN.",
          "Son siete: String, Number, BigInt, Boolean, Undefined, Null y Symbol. NaN es un valor del tipo Number.",
        ],
        [
          "Palabras como abstract, boolean, byte, char o int están reservadas.",
          "Lo estaban en las ediciones 1 a 3 de ECMAScript. En la lista vigente ya no aparecen.",
        ],
        [
          "No se pueden usar acentos ni caracteres que no sean del inglés en los nombres.",
          "La especificación admite letras Unicode en los identificadores. Se recomienda evitarlos por compatibilidad y comodidad.",
        ],
        [
          "Los nombres de archivo deben ir en snake_case.",
          "No hay una norma única: guion bajo o guion medio son habituales. Sigue la convención de tu proyecto.",
        ],
        [
          "Sin punto y coma «no pasa nada en el 99 % de los casos».",
          "Es cierto en la mayoría, pero hay casos concretos (`return` seguido de salto de línea, líneas que empiezan con `(`, `[` o una plantilla de texto) que cambian el resultado.",
        ],
        [
          "TypeScript siempre hay que compilarlo antes de ejecutarlo.",
          "Node.js 22.18 y 23.6 en adelante ejecutan TypeScript directamente quitando los tipos, sin comprobarlos.",
        ],
      ],
    },

    // ───────────────────────── FAQ ─────────────────────────
    {
      type: "accordion",
      title: "Preguntas frecuentes de esta lección",
      items: [
        {
          title: "¿Es obligatorio el punto y coma?",
          text:
            "No, JavaScript lo inserta automáticamente en muchos casos. Puedes usarlo o no, pero sé consistente y conoce los casos en que la inserción automática cambia el resultado.",
        },
        {
          title: "¿JavaScript es compilado o interpretado?",
          text:
            "Ambas cosas, según el momento: los motores modernos interpretan el código al principio y compilan a código máquina (JIT) lo que se ejecuta mucho. Para ti, basta con saber que no hay un paso de compilación separado.",
        },
        {
          title: "¿Puedo usar la ñ o acentos en los nombres de variables?",
          text:
            "La especificación lo permite, pero se recomienda evitarlos por compatibilidad entre herramientas y porque dificultan escribir el código.",
        },
        {
          title: "¿Por qué `typeof null` devuelve «object»?",
          text:
            "Es una rareza histórica del lenguaje. `null` es un tipo primitivo; para comprobarlo se usa `valor === null`.",
        },
        {
          title: "¿Qué es un identificador?",
          text:
            "El nombre que le das a una variable, una función, una clase, etc.",
        },
        {
          title: "¿Por qué no uso la palabra `var` en este curso?",
          text:
            "Porque desde ES2015 existen `let` y `const`, con un comportamiento más predecible. La siguiente lección explica cuándo usar cada una.",
        },
      ],
    },

    // ───────────────────────── Cierre ─────────────────────────
    { type: "heading", level: 2, text: "Cierre" },
    {
      type: "paragraph",
      text:
        "Con esto cierra el panorama general del lenguaje y de sus reglas de escritura. En la siguiente lección veremos el concepto de variable y empezaremos con las características que trajo el estándar a partir de 2015: la diferencia entre `var`, `let` y `const`. Los tipos de datos también se tratarán con más detalle.",
    },
    {
      type: "checklist",
      title: "Antes de pasar al Día 4, verifica que puedes explicar…",
      items: [
        "Qué es el isomorfismo y qué capas de una aplicación puede cubrir JavaScript.",
        "Por qué se dice que JavaScript es de alto nivel y qué hace un motor como V8.",
        "Qué significa dinámicamente y débilmente tipado, con un ejemplo.",
        "Qué significa que distinga mayúsculas de minúsculas.",
        "Qué es la inserción automática de punto y coma y dos casos en los que falla.",
        "Las reglas para nombrar un identificador y por qué no puedes repetirlo.",
        "Qué convención usar para variables, constantes, clases y archivos.",
        "Qué son las palabras reservadas y por qué no hay que fiarse de las listas antiguas.",
        "Los siete tipos primitivos y la diferencia entre valor y referencia.",
      ],
    },
    { type: "heading", level: 3, text: "Fuentes consultadas (noviembre de 2026)" },
    {
      type: "list",
      items: [
        "[MDN: Lexical grammar (identificadores, palabras reservadas, ASI)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar)",
        "[MDN: JavaScript data structures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Data_structures)",
        "[MDN: JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)",
        "[MDN: JavaScript language overview](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Language_overview)",
        "[V8: Ignition, el intérprete](https://v8.dev/blog/ignition-interpreter)",
        "[V8: Sparkplug](https://v8.dev/blog/sparkplug)",
        "[V8: Maglev](https://v8.dev/blog/maglev)",
        "[Node.js: Running TypeScript natively](https://nodejs.org/learn/typescript/run-natively)",
        "[WebAssembly: Wasm 3.0 completed](https://webassembly.org/news/2025-09-17-wasm-3.0/)",
        "[MDN: WebAssembly concepts](https://developer.mozilla.org/en-US/docs/WebAssembly/Guides/Concepts)",
        "[Web Almanac 2025: WebAssembly](https://almanac.httparchive.org/en/2025/webassembly)",
        "[Google JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html)",
        "[Stack Overflow Developer Survey 2026: lenguajes](https://survey.stackoverflow.co/2026/technology/data/languages)",
        "[Isomorphic JavaScript (Sanity glossary)](https://www.sanity.io/glossary/isomorphic-javascript)",
        "[WebGPU (Wikipedia)](https://en.wikipedia.org/wiki/WebGPU)",
        "[WebXR browser support](https://www.lambdatest.com/web-technologies/webxr-firefox)",
        "[Johnny-Five](https://johnny-five.io/)",
        "[Capacitor](https://capacitorjs.com/)",
        "[TensorFlow.js](https://www.tensorflow.org/js/tutorials/applications/react_native)",
      ],
    },
  ],
  selfCheck: [
    {
      question: "¿Qué significa que una aplicación sea «isomórfica» (o universal)?",
      options: [
        "Que está escrita solo en JavaScript antiguo",
        "Que su código JavaScript puede ejecutarse tanto en el cliente como en el servidor, permitiendo construir la aplicación con una sola tecnología",
        "Que solo funciona en un navegador concreto",
        "Que no usa base de datos",
      ],
      correctIndex: 1,
      explanation:
        "«Isomorfismo» viene de «iso» (igual) y «morphos» (forma): se comparte la misma tecnología y, a menudo, el mismo código entre cliente y servidor.",
    },
    {
      question: "¿Por qué lenguajes como TypeScript necesitan un paso de compilación (o, desde Node.js 22.18, quitar los tipos)?",
      options: [
        "Porque los navegadores ejecutan de forma nativa JavaScript, no TypeScript",
        "Porque TypeScript no tiene variables",
        "Porque los navegadores solo entienden Java",
        "Porque JavaScript no puede ejecutarse sin TypeScript",
      ],
      correctIndex: 0,
      explanation:
        "JavaScript es el único lenguaje que los navegadores ejecutan de forma nativa; otros lenguajes se compilan a JavaScript (o a WebAssembly).",
    },
    {
      question: "¿Qué significa que JavaScript sea un lenguaje de alto nivel?",
      options: [
        "Que solo se usa en servidores potentes",
        "Que ofrece abstracciones: no tienes que gestionar la memoria ni la recolección de basura",
        "Que es más difícil que otros lenguajes",
        "Que requiere compilarse antes de ejecutarse",
      ],
      correctIndex: 1,
      explanation:
        "El motor se ocupa de gestionar la memoria y liberar lo que ya no se usa; en un lenguaje de bajo nivel debes encargarte tú.",
    },
    {
      question: "¿Qué muestra `console.log(42 + \"1\")`?",
      options: ["43", "\"421\"", "Un error de tipos", "undefined"],
      correctIndex: 1,
      explanation:
        "JavaScript es débilmente tipado: convierte el número a texto y concatena. El resultado es la cadena \"421\".",
    },
    {
      question: "Declaraste `let perro = 1;`. ¿Qué pasa si escribes `PERRO`?",
      options: [
        "Es la misma variable",
        "Es un identificador distinto, porque JavaScript distingue mayúsculas de minúsculas",
        "Se convierte automáticamente a minúsculas",
        "Es un error de sintaxis",
      ],
      correctIndex: 1,
      explanation:
        "JavaScript es sensible a mayúsculas y minúsculas: `perro` y `PERRO` son identificadores distintos.",
    },
    {
      question: "¿Cuál de estos NO es un identificador válido?",
      options: ["$precio", "_privado", "1numero", "total"],
      correctIndex: 2,
      explanation:
        "Un identificador no puede empezar con un número. Puede empezar con una letra, `$` o `_`.",
    },
    {
      question: "¿Qué convención se recomienda para una clase y para una constante?",
      options: [
        "Clase en UpperCamelCase (`CarritoDeCompras`) y constante en CONSTANT_CASE (`TASA_DE_IVA`)",
        "Ambas en minúsculas con guion medio",
        "Clase en CONSTANT_CASE y constante en UpperCamelCase",
        "No existen convenciones",
      ],
      correctIndex: 0,
      explanation:
        "Las clases se escriben en UpperCamelCase (PascalCase) y las constantes en mayúsculas separadas por guion bajo. Variables y funciones, en lowerCamelCase.",
    },
    {
      question: "¿Qué devuelve una función que tiene `return` en una línea y `{ ok: true }` en la línea siguiente?",
      options: ["Un objeto { ok: true }", "undefined", "true", "Un error de sintaxis"],
      correctIndex: 1,
      explanation:
        "La inserción automática de punto y coma pone un `;` justo después de `return` cuando le sigue un salto de línea, así que la función devuelve undefined.",
    },
    {
      question: "¿Cuántos tipos de datos primitivos tiene JavaScript hoy?",
      options: [
        "Cinco: string, number, boolean, null y undefined",
        "Siete: String, Number, BigInt, Boolean, Undefined, Null y Symbol",
        "Seis, contando NaN",
        "Uno solo: object",
      ],
      correctIndex: 1,
      explanation:
        "Son siete. `NaN` no es un tipo: es un valor del tipo Number. Todo lo que no es primitivo es un objeto.",
    },
    {
      question: "Si `const o1 = { n: 1 }; const o2 = o1; o2.n = 2;`, ¿cuánto vale `o1.n`?",
      options: ["1", "2", "undefined", "Da error"],
      correctIndex: 1,
      explanation:
        "Los objetos se copian por referencia: `o1` y `o2` apuntan al mismo objeto, así que el cambio hecho desde `o2` también se ve desde `o1`.",
    },
  ],
};
