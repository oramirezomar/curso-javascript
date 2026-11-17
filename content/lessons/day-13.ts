import type { Lesson } from "@/lib/types";

// Une líneas de código sin tener que escapar backticks ni `${}` dentro de template literals.
const L = (...lines: string[]) => lines.join("\n");

// Contenido validado contra fuentes actuales en noviembre de 2026 (ver sección "Fuentes").
export const day13: Lesson = {
  day: 13,
  slug: "objetos-propiedades-metodos",
  title: "Objetos: propiedades, métodos, this, keys y values",
  section: "Funciones y tipos compuestos",
  estimatedMinutes: 70,
  icon: "🧱",
  objectives: [
    "Crear un objeto con un literal `{}` y entender que es una colección de pares clave y valor de cualquier tipo",
    "Acceder, agregar, modificar y eliminar propiedades con la notación de punto y la de corchetes",
    "Distinguir una propiedad de un método y escribir un método que use `this`",
    "Listar y comprobar propiedades con `Object.keys()`, `Object.values()`, `Object.entries()` y `Object.hasOwn()`",
    "Entender qué significa «en JavaScript todo es un objeto» y qué parte de esa frase es una simplificación",
  ],
  blocks: [
    // ───────────────────────── Apertura ─────────────────────────
    {
      type: "paragraph",
      text:
        "Con los objetos cerramos los tipos compuestos básicos: ya vimos las funciones y los arreglos. Los objetos son una de las piezas más importantes de JavaScript: casi todo lo que harás con el lenguaje (datos de un usuario, respuestas de un servidor, configuración, módulos) se representa con ellos. Entre quienes programan en JavaScript circula la frase «en JavaScript todo es un objeto». Es una buena guía para empezar, pero tiene matices que revisaremos.",
    },
    {
      type: "keyFacts",
      items: [
        { value: "{ }", label: "Literal de objeto: la forma habitual de crearlo" },
        { value: "clave: valor", label: "Cada propiedad es un par; los pares van separados por comas" },
        { value: "objeto.clave", label: "Notación de punto, la más usada para acceder" },
        { value: "Método", label: "Una propiedad cuyo valor es una función" },
        { value: "this", label: "Dentro de un método, el objeto que lo invoca" },
        { value: "Object.keys()", label: "Lista las claves de un objeto" },
      ],
    },
    {
      type: "callout",
      variant: "success",
      text:
        "Contenido verificado en noviembre de 2026 con MDN Web Docs (guía de objetos, inicializador de objetos, acceso a propiedades, `this`, definición de métodos y los métodos estáticos de `Object`). Los resultados de los ejemplos se comprobaron ejecutándolos. Al final hay una tabla con datos que suelen aparecer desactualizados y la lista de fuentes.",
    },

    // ───────────────────────── Qué es un objeto ─────────────────────────
    { type: "heading", level: 2, text: "Qué es un objeto" },
    {
      type: "paragraph",
      text:
        "Un objeto es una colección de pares clave y valor. Si ya viste CSS, el parecido es inmediato: una regla de CSS tiene una propiedad (`font-size`), dos puntos y un valor (`16px`). En un objeto también hay una clave, dos puntos y un valor, y los pares se separan con comas. La diferencia con un arreglo es cómo se accede: en un arreglo cada elemento tiene una posición numérica y en un objeto cada valor tiene un nombre.",
    },
    {
      type: "paragraph",
      text:
        "Igual que `[]` es un arreglo vacío, un par de llaves `{}` es un objeto vacío. Y el valor de una clave puede ser de cualquier tipo: un texto, un número, un booleano, un arreglo, otro objeto e incluso una función. Esto último es lo que da pie a los métodos, que vemos más abajo.",
    },
    {
      type: "image",
      src: "/img/dia-13/objeto-clave-valor.svg",
      alt: "Un objeto persona con propiedades de distintos tipos: nombre es un texto, edad un número, pasatiempos un arreglo, soltero un booleano, contacto otro objeto y saludar una función que se llama método. A la derecha, una regla de CSS como comparación.",
      caption: "Un objeto agrupa pares clave: valor de cualquier tipo.",
    },
    {
      type: "playground",
      title: "Experimento 1 · Crear un objeto y mirar sus propiedades",
      description: "Cada valor conserva su tipo; las funciones no se incluyen al convertir a JSON.",
      code: L(
        "const persona = {",
        '  nombre: "Ana",',
        '  apellido: "Pérez",',
        "  edad: 35,",
        '  pasatiempos: ["correr", "leer", "dar clases"],',
        "  soltero: false,",
        "  contacto: {",
        '    email: "ana@ejemplo.com",',
        '    twitter: "@ana",',
        '    movil: "5512345678",',
        "  },",
        "  saludar: function () {",
        '    return "Hola :)";',
        "  },",
        "};",
        "",
        "console.log(typeof persona.nombre, typeof persona.edad, typeof persona.pasatiempos);",
        "console.log(typeof persona.soltero, typeof persona.contacto, typeof persona.saludar);",
        "console.log(JSON.stringify(persona));",
      ),
      expected: L(
        "string number object",
        "boolean object function",
        '{"nombre":"Ana","apellido":"Pérez","edad":35,"pasatiempos":["correr","leer","dar clases"],"soltero":false,"contacto":{"email":"ana@ejemplo.com","twitter":"@ana","movil":"5512345678"}}',
      ),
    },
    {
      type: "paragraph",
      text:
        "Sobre cómo declararlo: como en los arreglos, se puede usar `const` o `let`, y es en parte cuestión de estilo. Con `const` evitas reasignar la variable a otro objeto, es decir, que otro objeto ocupe la referencia que la variable tenía en memoria. Pero el contenido del objeto puede cambiar libremente. También existe `new Object()`, pero casi nadie lo usa: el literal `{}` es más corto y más claro.",
    },
    {
      type: "paragraph",
      text:
        "Las claves se escriben sin comillas cuando son nombres válidos (letras, números y guion bajo, sin empezar por número). Si la clave tiene un guion, un espacio u otro carácter especial, se escribe entre comillas. Las claves numéricas se convierten en texto, y si repites una clave, gana la última.",
    },
    {
      type: "playground",
      title: "Experimento 2 · Claves entre comillas y claves repetidas",
      description: "Las claves siempre acaban siendo texto; las que parecen enteros se ordenan primero.",
      code: L(
        'const raro = { "mi-clave": 1, 2: "dos", "con espacio": true };',
        "",
        'console.log(raro["mi-clave"], raro[2], raro["2"]);',
        'console.log(Object.keys(raro).join(", "));',
        "",
        "// Si una clave se repite, gana la última",
        "console.log({ a: 1, a: 2 }.a);",
      ),
      expected: L("1 dos dos", "2, mi-clave, con espacio", "2"),
    },

    // ───────────────────────── Todo es un objeto ─────────────────────────
    { type: "heading", level: 3, text: "«En JavaScript todo es un objeto»: ¿es cierto?" },
    {
      type: "paragraph",
      text:
        "La frase se hizo popular, pero es una simplificación. Los arreglos, las funciones, las fechas y las expresiones regulares son objetos. Los valores primitivos (texto, número, booleano, `bigint`, `symbol`, `undefined` y `null`) no lo son. Lo que ocurre es que, cuando usas un método sobre un texto, como `\"x\".toUpperCase()`, JavaScript lo envuelve de forma temporal en un objeto `String` para poder ejecutarlo. Por eso parece que el texto es un objeto, pero no lo es.",
    },
    {
      type: "paragraph",
      text:
        "En las lecciones de primitivos vimos que se puede crear una cadena con el constructor, `new String(\"hola\")`. Ese valor no es un primitivo: es un objeto envoltorio (su `typeof` es `\"object\"`), y por eso se desaconseja. Más adelante, en la parte de programación orientada a objetos, entenderás por qué esta idea es tan poderosa.",
    },
    {
      type: "playground",
      title: "Experimento 3 · Primitivos frente a objetos",
      description: "`instanceof Object` es true solo para valores que son objetos.",
      code: L(
        'console.log(typeof "x", typeof new String("x"));',
        'console.log("x".toUpperCase());',
        'console.log("x" instanceof Object, new String("x") instanceof Object);',
        "console.log(5 instanceof Object, [] instanceof Object, (function () {}) instanceof Object);",
        "console.log(typeof {}, Array.isArray({}));",
      ),
      expected: L("string object", "X", "false true", "false true true", "object false"),
    },

    // ───────────────────────── Acceder ─────────────────────────
    { type: "heading", level: 2, text: "Acceder a las propiedades" },
    {
      type: "paragraph",
      text:
        "Con los tipos compuestos no se accede directamente al valor, sino a una referencia a él, como las coordenadas que usábamos con los arreglos. Con los objetos existen dos notaciones. La notación de punto, `persona.nombre`, es la más usada y la más aceptada. La notación de corchetes, `persona[\"nombre\"]`, es equivalente, y se usa cuando la clave no es un nombre válido (por ejemplo, tiene un guion) o cuando la clave está en una variable (`persona[clave]`).",
    },
    {
      type: "paragraph",
      text:
        "Se pueden encadenar los accesos: para el pasatiempo de la posición 1 (un elemento de un arreglo) se escribe `persona.pasatiempos[1]`, y para el Twitter dentro del objeto de contacto, `persona.contacto.twitter`. Si pides una propiedad que no existe obtienes `undefined`, sin error. Pero acceder a una propiedad de algo que es `undefined` sí lanza un `TypeError`, como vimos en la lección de `undefined` y `null`; el encadenamiento opcional `?.` lo evita.",
    },
    {
      type: "image",
      src: "/img/dia-13/acceso-objeto.svg",
      alt: "Tabla con siete expresiones y su resultado: persona.nombre, persona[nombre] entre comillas y persona[clave] dan Ana; persona.pasatiempos[1] da leer; persona.contacto.twitter da @ana; persona.direccion da undefined y persona.direccion?.calle da undefined sin error.",
      caption: "Notación de punto, de corchetes y accesos encadenados.",
    },
    {
      type: "playground",
      title: "Experimento 4 · Acceder, encadenar y evitar errores",
      description: "Observa la diferencia entre `persona.clave` y `persona[clave]`.",
      code: L(
        "const persona = {",
        '  nombre: "Ana",',
        '  apellido: "Pérez",',
        "  edad: 35,",
        "  soltero: false,",
        '  pasatiempos: ["correr", "leer", "dar clases"],',
        '  contacto: { twitter: "@ana" },',
        "};",
        "",
        'console.log(persona.nombre, persona["apellido"]);',
        "",
        'const clave = "edad";',
        "console.log(persona[clave], persona.clave);",
        "",
        "console.log(persona.soltero);",
        "console.log(persona.pasatiempos[1]);",
        "console.log(persona.contacto.twitter);",
        "",
        "console.log(persona.nacimiento);",
        "try {",
        "  persona.direccion.calle;",
        "} catch (e) {",
        "  console.log(e.name);",
        "}",
        "console.log(persona.direccion?.calle);",
      ),
      expected: L(
        "Ana Pérez",
        "35 undefined",
        "false",
        "leer",
        "@ana",
        "undefined",
        "TypeError",
        "undefined",
      ),
    },

    // ───────────────────────── Modificar ─────────────────────────
    { type: "heading", level: 2, text: "Agregar, modificar y eliminar propiedades" },
    {
      type: "paragraph",
      text:
        "Un objeto es mutable: se pueden agregar propiedades asignándolas, cambiar su valor volviendo a asignarlas, y quitarlas con `delete`. Todo esto es posible aunque el objeto esté declarado con `const`, porque `const` solo impide reasignar la variable. Recuerda también que la variable guarda una referencia: asignar un objeto a otra variable no lo copia, y dos objetos con el mismo contenido no son iguales con `===`.",
    },
    {
      type: "playground",
      title: "Experimento 5 · Agregar, cambiar y eliminar",
      description: "`const` no impide cambiar el contenido, pero sí reasignar la variable.",
      code: L(
        'const coche = { marca: "Mazda" };',
        "",
        'coche.modelo = "3";          // agregar',
        'coche["año"] = 2024;         // agregar con corchetes',
        'coche.marca = "Kia";         // modificar',
        "console.log(JSON.stringify(coche));",
        "",
        "console.log(delete coche.modelo, JSON.stringify(coche));",
        "",
        "try {",
        "  coche = {};",
        "} catch (e) {",
        "  console.log(e.name);",
        "}",
        "",
        "// Asignar no copia: son el mismo objeto",
        "const mismo = coche;",
        'mismo.marca = "Seat";',
        "console.log(coche.marca, coche === mismo, { a: 1 } === { a: 1 });",
      ),
      expected: L(
        '{"marca":"Kia","modelo":"3","año":2024}',
        'true {"marca":"Kia","año":2024}',
        "TypeError",
        "Seat true false",
      ),
    },

    // ───────────────────────── Propiedades y métodos ─────────────────────────
    { type: "heading", level: 2, text: "Propiedades y métodos" },
    {
      type: "paragraph",
      text:
        "Dentro de un objeto, a las variables se las llama propiedades (en el material antiguo también se oye «atributos») y a las funciones, métodos. Un método es, simplemente, una propiedad cuyo valor es una función. Se invoca con la notación de punto y los paréntesis, porque una función se invoca con paréntesis: `persona.saludar()`.",
    },
    {
      type: "paragraph",
      text:
        "Esa distinción la has visto ya con los arreglos. `length` es una propiedad: un valor que devuelve el número de elementos, sin paréntesis. `forEach()`, `push()` o `fill()` son métodos, funciones que pertenecen al objeto `Array`, y por eso llevan paréntesis y pueden recibir parámetros.",
    },
    {
      type: "table",
      caption: "Propiedades y métodos",
      headers: ["Término", "Qué es", "Ejemplo"],
      rows: [
        ["Propiedad", "Una variable que pertenece a un objeto", "`persona.nombre`, `lista.length`"],
        ["Método", "Una función que pertenece a un objeto", "`persona.saludar()`, `lista.push(4)`"],
      ],
    },
    {
      type: "playground",
      title: "Experimento 6 · Un método dentro de un objeto",
      description: "El método se invoca con paréntesis; sin ellos solo lo nombras.",
      code: L(
        "const persona = {",
        '  nombre: "Ana",',
        "  saludar: function () {",
        '    return "Hola :)";',
        "  },",
        "};",
        "",
        "console.log(persona.saludar());",
        "console.log(typeof persona.saludar, typeof persona.saludar());",
        "",
        "// En los arreglos: length es propiedad, forEach es método",
        "console.log([1, 2, 3].length, typeof [1, 2, 3].forEach);",
      ),
      expected: L("Hola :)", "function string", "3 function"),
    },
    {
      type: "callout",
      variant: "info",
      text:
        "Desde ECMAScript 2015 hay una sintaxis abreviada para definir métodos: en lugar de `saludar: function () { ... }` puedes escribir `saludar() { ... }`. No es una función flecha ni necesita entenderlas: es solo una forma más corta de escribir lo mismo. Las funciones flecha las veremos más adelante.",
    },

    // ───────────────────────── this ─────────────────────────
    { type: "heading", level: 2, text: "this: el objeto desde el que se invoca el método" },
    {
      type: "paragraph",
      text:
        "Imagina un método que debe usar datos del propio objeto, por ejemplo uno que dice «Hola, me llamo» seguido del nombre y el apellido guardados en el mismo objeto. Dentro de un método, la palabra reservada `this` se refiere al objeto sobre el que se invoca el método, es decir, el que está antes del punto: `persona.decirMiNombre()` hace que `this` sea `persona`. Así, `this.nombre` es la propiedad `nombre` de ese mismo objeto, y `this.contacto.twitter` baja un nivel más.",
    },
    {
      type: "paragraph",
      text:
        "En JavaScript, `this` es más complejo que en otros lenguajes, donde suele apuntar siempre al objeto en el que está escrito el método. Aquí depende de cómo se invoca la función. Más adelante le dedicaremos una lección completa; por ahora basta con quedarte con esta idea: en un método, `this` es el objeto que lo invoca.",
    },
    {
      type: "image",
      src: "/img/dia-13/this-en-metodo.svg",
      alt: "El método presentarse usa this.nombre. Al invocar persona.presentarse(), this es persona y devuelve Hola, soy Ana. Dos casos donde se pierde this: guardar el método en una variable suelta y llamarlo, y escribir el método como una función flecha.",
      caption: "this es el objeto antes del punto cuando se invoca el método.",
    },
    {
      type: "playground",
      title: "Experimento 7 · this depende de quién invoca el método",
      description: "El mismo método da resultados distintos según el objeto desde el que se invoque.",
      code: L(
        "const persona = {",
        '  nombre: "Ana",',
        '  apellido: "Pérez",',
        "  edad: 35,",
        '  contacto: { twitter: "@ana" },',
        "  decirMiNombre: function () {",
        "    return `Hola, me llamo ${this.nombre} ${this.apellido} y tengo ${this.edad} años. Sígueme en ${this.contacto.twitter}`;",
        "  },",
        "};",
        "",
        "console.log(persona.decirMiNombre());",
        "",
        "// Reutilizamos el mismo método en otro objeto",
        "const otra = {",
        '  nombre: "Luis",',
        '  apellido: "Gómez",',
        "  edad: 28,",
        '  contacto: { twitter: "@luis" },',
        "  decirMiNombre: persona.decirMiNombre,",
        "};",
        "console.log(otra.decirMiNombre());",
      ),
      expected: L(
        "Hola, me llamo Ana Pérez y tengo 35 años. Sígueme en @ana",
        "Hola, me llamo Luis Gómez y tengo 28 años. Sígueme en @luis",
      ),
    },
    {
      type: "callout",
      variant: "warning",
      text:
        "Dos situaciones en las que `this` deja de ser el objeto. Si guardas el método en una variable y lo llamas suelto (`const f = persona.decirMiNombre; f()`), ya no hay un objeto antes del punto. Y una función flecha, por ejemplo `decirMiNombre: () => this.nombre`, no tiene su propio `this`, así que no sirve como método que use `this`. Por eso, en un método, se usa la sintaxis normal o la abreviada.",
    },

    // ───────────────────────── Object.keys etc ─────────────────────────
    { type: "heading", level: 2, text: "Listar y comprobar propiedades" },
    {
      type: "paragraph",
      text:
        "El propio objeto `Object` de JavaScript ofrece métodos muy útiles. Se llaman como `Object.metodo(objeto)`, porque son funciones estáticas del constructor (igual que `Number.isNaN()`), y esperan recibir un objeto. `Object.keys()` devuelve un arreglo con las claves del objeto, `Object.values()` con sus valores y `Object.entries()` con los pares `[clave, valor]`. Con ellos y `forEach()` puedes recorrer un objeto.",
    },
    {
      type: "image",
      src: "/img/dia-13/metodos-object.svg",
      alt: "Con el objeto nombre Ana y edad 35: Object.keys devuelve el arreglo de claves, Object.values el arreglo de valores, Object.entries el arreglo de pares clave y valor, y Object.hasOwn devuelve true o false según el objeto tenga la propiedad.",
      caption: "keys, values, entries y hasOwn sobre un mismo objeto.",
    },
    {
      type: "paragraph",
      text:
        "Para saber si un objeto tiene una propiedad se usa `Object.hasOwn(objeto, \"clave\")`, que devuelve `true` o `false`. Es la versión moderna (ECMAScript 2022) del método `hasOwnProperty()` que verás en material antiguo, y MDN la recomienda porque funciona en más casos. Solo mira las propiedades propias del objeto; el operador `in`, en cambio, también cuenta las heredadas.",
    },
    {
      type: "playground",
      title: "Experimento 8 · keys, values, entries y hasOwn",
      description: "Se usa JSON.stringify para ver los arreglos resultantes en una línea.",
      code: L(
        'const persona = { nombre: "Ana", edad: 35 };',
        "",
        "console.log(JSON.stringify(Object.keys(persona)));",
        "console.log(JSON.stringify(Object.values(persona)));",
        "console.log(JSON.stringify(Object.entries(persona)));",
        "console.log(Object.keys(persona).length);",
        "",
        'console.log(Object.hasOwn(persona, "nombre"), Object.hasOwn(persona, "nacimiento"));',
        "",
        "// hasOwn mira solo las propias; in también las heredadas",
        'console.log("toString" in persona, Object.hasOwn(persona, "toString"));',
      ),
      expected: L(
        '["nombre","edad"]',
        '["Ana",35]',
        '[["nombre","Ana"],["edad",35]]',
        "2",
        "true false",
        "true false",
      ),
    },
    {
      type: "playground",
      title: "Experimento 9 · Recorrer un objeto",
      description: "Se combinan Object.keys(), forEach() y la notación de corchetes con la clave en una variable.",
      code: L(
        'const persona = { nombre: "Ana", edad: 35, soltero: false };',
        "",
        "Object.keys(persona).forEach(function (clave) {",
        '  console.log(clave + " = " + persona[clave]);',
        "});",
        "",
        "// ¿Está vacío?",
        "console.log(Object.keys({}).length === 0);",
      ),
      expected: L("nombre = Ana", "edad = 35", "soltero = false", "true"),
    },

    // ───────────────────────── JSON ─────────────────────────
    { type: "heading", level: 2, text: "Objetos y JSON" },
    {
      type: "paragraph",
      text:
        "Los objetos son la base de JSON (JavaScript Object Notation), el formato de texto más usado para intercambiar datos entre aplicaciones. JSON se parece a un literal de objeto, pero es texto: las claves siempre van entre comillas dobles y no admite funciones ni `undefined`. Por eso `JSON.stringify()` descarta las propiedades con funciones y con `undefined` (como vimos en la lección anterior), y `JSON.parse()` convierte el texto de nuevo en un objeto. Bases de datos de documentos como MongoDB, CouchDB o Firebase guardan sus datos con una estructura muy parecida, aunque no son objetos de JavaScript.",
    },
    {
      type: "playground",
      title: "Experimento 10 · De objeto a texto y de vuelta",
      description: "Las funciones y undefined no sobreviven a JSON; null sí.",
      code: L(
        'const persona = { nombre: "Ana", edad: 35, soltero: false, saludar: function () {}, pendiente: undefined, nada: null };',
        "",
        "const texto = JSON.stringify(persona);",
        "console.log(texto);",
        "",
        "const vuelta = JSON.parse(texto);",
        "console.log(vuelta.nombre, typeof texto, typeof vuelta);",
      ),
      expected: L(
        '{"nombre":"Ana","edad":35,"soltero":false,"nada":null}',
        "Ana string object",
      ),
    },
    { type: "heading", level: 3, text: "Copiar un objeto" },
    {
      type: "paragraph",
      text:
        "Como asignar no copia, para obtener un objeto independiente hay que copiarlo. La sintaxis de propagación `{ ...objeto }` hace una copia superficial: las propiedades de primer nivel se duplican, pero los objetos anidados siguen compartidos. Para una copia profunda existe `structuredClone()`.",
    },
    {
      type: "playground",
      title: "Experimento 11 · Copia superficial y copia profunda",
      description: "El objeto anidado `contacto` es compartido por la copia superficial.",
      code: L(
        'const original = { nombre: "Ana", contacto: { twitter: "@ana" } };',
        "",
        "const copia = { ...original };",
        'copia.nombre = "Luis";',
        'copia.contacto.twitter = "@luis";',
        "console.log(original.nombre, original.contacto.twitter);",
        "",
        "const profunda = structuredClone(original);",
        'profunda.contacto.twitter = "@otro";',
        "console.log(original.contacto.twitter);",
      ),
      expected: L("Ana @luis", "@luis"),
    },

    // ───────────────────────── Datos que cambian ─────────────────────────
    { type: "heading", level: 2, text: "Datos que suelen aparecer desactualizados" },
    {
      type: "table",
      caption: "Material antiguo frente a información verificada",
      headers: ["Suele decirse", "Información verificada"],
      rows: [
        [
          "En JavaScript todo es un objeto.",
          "Los arreglos, funciones y fechas lo son. Los primitivos (texto, número, booleano, `bigint`, `symbol`, `undefined` y `null`) no. Se envuelven temporalmente solo para usar métodos.",
        ],
        [
          "`new String(\"x\")` es un valor primitivo.",
          "Es un objeto envoltorio: `typeof new String(\"x\")` es `\"object\"`. Un primitivo es `\"x\"`.",
        ],
        [
          "Las variables de un objeto se llaman atributos.",
          "En JavaScript el término habitual es propiedades. «Atributo» se usa sobre todo en HTML.",
        ],
        [
          "Hay que escribir los métodos con `function`.",
          "Desde ECMAScript 2015 existe la forma abreviada `saludar() { }`, que no tiene nada que ver con las funciones flecha.",
        ],
        [
          "Para comprobar una propiedad se usa `hasOwnProperty()`.",
          "MDN recomienda `Object.hasOwn()` (ECMAScript 2022), que además funciona con objetos sin prototipo.",
        ],
        [
          "`Object.keys` y `Object.values` son métodos del prototipo.",
          "Son funciones estáticas del constructor `Object` y se llaman como `Object.keys(objeto)`.",
        ],
        [
          "`this` es el objeto en el que está escrito el método.",
          "Depende de cómo se invoca: en `persona.metodo()` es `persona`, pero un método guardado en una variable y llamado suelto pierde ese `this`.",
        ],
        [
          "Con `const` el objeto no puede cambiar.",
          "`const` protege la variable, no el contenido. Para evitar cambios se usa `Object.freeze()`, que es superficial.",
        ],
        [
          "Un objeto y JSON son lo mismo.",
          "JSON es un formato de texto: claves entre comillas dobles, sin funciones ni `undefined`.",
        ],
      ],
    },

    // ───────────────────────── FAQ ─────────────────────────
    {
      type: "accordion",
      title: "Preguntas frecuentes de esta lección",
      items: [
        {
          title: "¿Cuándo uso un objeto y cuándo un arreglo?",
          text:
            "Un arreglo es una lista ordenada de elementos accesibles por posición. Un objeto agrupa datos con nombre. Es muy habitual combinarlos: un arreglo de objetos, por ejemplo una lista de usuarios, donde cada uno tiene nombre, edad y correo.",
        },
        {
          title: "¿Cómo sé si un objeto está vacío?",
          text:
            "Con `Object.keys(objeto).length === 0`. Un objeto vacío `{}` es truthy, así que no basta con `if (objeto)`.",
        },
        {
          title: "¿Se pueden comparar dos objetos con `===`?",
          text:
            "Solo compara referencias: dos objetos distintos con el mismo contenido no son iguales. Para comparar contenido hay que comparar las propiedades una a una (o usar una biblioteca).",
        },
        {
          title: "¿Qué pasa con `typeof null`?",
          text:
            "Devuelve `\"object\"`, un error histórico del lenguaje que vimos en la lección de `undefined` y `null`. `null` no es un objeto.",
        },
        {
          title: "¿Cómo evito que un objeto cambie?",
          text:
            "`Object.freeze(objeto)` impide agregar, modificar y eliminar propiedades, pero solo en el primer nivel: los objetos anidados siguen siendo modificables.",
        },
        {
          title: "¿Puedo usar una variable como clave al crear el objeto?",
          text:
            "Sí, con claves calculadas: `{ [variable]: valor }`. También existe la forma abreviada `{ nombre, edad }`, que usa el nombre de la variable como clave. Ambas son de ECMAScript 2015.",
        },
      ],
    },

    // ───────────────────────── Cierre ─────────────────────────
    { type: "heading", level: 2, text: "Cierre" },
    {
      type: "paragraph",
      text:
        "Con los objetos terminamos los tipos de datos compuestos básicos: funciones, arreglos y objetos. Sabes crear un objeto, acceder a sus propiedades, agregarlas y eliminarlas, escribir métodos que usan `this` y listar sus claves y valores. Los objetos tienen más propiedades y métodos; para conocerlos, el objeto `Object` y su documentación en MDN son el siguiente paso. Y más adelante, con la programación orientada a objetos, entenderás a fondo los prototipos y la frase de que en JavaScript «todo es un objeto». En la próxima lección vemos los operadores: aritméticos, relacionales, lógicos y unarios.",
    },
    {
      type: "checklist",
      title: "Antes de pasar al Día 14, verifica que puedes explicar…",
      items: [
        "Qué es un objeto y en qué se parece y en qué se diferencia de un arreglo.",
        "Qué es cierto y qué es una simplificación en «en JavaScript todo es un objeto».",
        "Cuándo conviene la notación de punto y cuándo la de corchetes.",
        "Qué devuelve una propiedad que no existe, y qué error aparece al acceder a una propiedad de `undefined`.",
        "Cómo agregar, modificar y eliminar propiedades de un objeto declarado con `const`.",
        "Qué diferencia hay entre una propiedad y un método, y qué es `this` dentro de un método.",
        "Qué hacen `Object.keys()`, `Object.values()`, `Object.entries()` y `Object.hasOwn()`.",
      ],
    },
    { type: "heading", level: 3, text: "Fuentes consultadas (noviembre de 2026)" },
    {
      type: "list",
      items: [
        "[MDN: Trabajar con objetos (guía)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_objects)",
        "[MDN: Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)",
        "[MDN: Inicializador de objetos](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer)",
        "[MDN: Acceso a propiedades](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Property_accessors)",
        "[MDN: Definición de métodos](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Method_definitions)",
        "[MDN: this](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)",
        "[MDN: Object.keys()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)",
        "[MDN: Object.values()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values)",
        "[MDN: Object.entries()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries)",
        "[MDN: Object.hasOwn()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwn)",
        "[MDN: Object.prototype.hasOwnProperty()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty)",
        "[MDN: Object.freeze()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze)",
        "[MDN: delete](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/delete)",
        "[MDN: in](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/in)",
        "[MDN: Encadenamiento opcional (?.)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining)",
        "[MDN: Sintaxis de propagación](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)",
        "[MDN: structuredClone()](https://developer.mozilla.org/en-US/docs/Web/API/Window/structuredClone)",
        "[MDN: JSON](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON)",
        "[MDN: Primitive](https://developer.mozilla.org/en-US/docs/Glossary/Primitive)",
      ],
    },
  ],
  selfCheck: [
    {
      question: "¿Qué es un objeto en JavaScript?",
      options: [
        "Una lista ordenada de elementos por posición",
        "Una colección de pares clave: valor",
        "Un tipo de dato primitivo",
        "Un texto con formato especial",
      ],
      correctIndex: 1,
      explanation:
        "Un objeto agrupa propiedades con nombre. Los arreglos son las listas por posición.",
    },
    {
      question: "¿Qué crea `const a = {};`?",
      options: ["Un arreglo vacío", "Un objeto vacío", "Un error", "Una función"],
      correctIndex: 1,
      explanation: "Un par de llaves vacías es un objeto vacío, igual que `[]` es un arreglo vacío.",
    },
    {
      question: "¿Cuál es la forma más habitual de acceder a la propiedad `nombre` de `persona`?",
      options: ["persona->nombre", "persona.nombre", "persona(nombre)", "persona::nombre"],
      correctIndex: 1,
      explanation: "La notación de punto, `persona.nombre`. La de corchetes, `persona[\"nombre\"]`, es equivalente.",
    },
    {
      question: "Si `const clave = \"edad\"`, ¿qué devuelve `persona.clave`?",
      options: [
        "El valor de la propiedad edad",
        "undefined, porque busca una propiedad llamada clave",
        "Un error",
        "\"edad\"",
      ],
      correctIndex: 1,
      explanation:
        "Con el punto se busca literalmente la propiedad `clave`. Para usar el valor de la variable hay que escribir `persona[clave]`.",
    },
    {
      question: "¿Qué ocurre al leer `persona.direccion.calle` si `persona.direccion` no existe?",
      options: [
        "Devuelve undefined",
        "Lanza un TypeError",
        "Devuelve null",
        "Crea la propiedad",
      ],
      correctIndex: 1,
      explanation:
        "`persona.direccion` es `undefined`, y leer una propiedad de `undefined` lanza un `TypeError`. Con `?.` devolvería `undefined`.",
    },
    {
      question: "¿Qué es un método?",
      options: [
        "Una variable dentro de un objeto",
        "Una propiedad cuyo valor es una función",
        "Una clave entre comillas",
        "Un objeto sin propiedades",
      ],
      correctIndex: 1,
      explanation:
        "Una propiedad es una variable del objeto; un método es una propiedad cuyo valor es una función.",
    },
    {
      question: "Dentro de `persona.decirMiNombre()`, ¿a qué apunta `this`?",
      options: [
        "A la ventana del navegador siempre",
        "Al objeto persona, que es el que invoca el método",
        "A la función decirMiNombre",
        "A undefined siempre",
      ],
      correctIndex: 1,
      explanation:
        "En un método, `this` es el objeto sobre el que se invoca, es decir, el que está antes del punto.",
    },
    {
      question: "¿Qué devuelve `Object.keys({ a: 1, b: 2 })`?",
      options: ["[1, 2]", "[\"a\", \"b\"]", "[[\"a\", 1], [\"b\", 2]]", "2"],
      correctIndex: 1,
      explanation:
        "`Object.keys()` devuelve las claves. `Object.values()` daría `[1, 2]` y `Object.entries()` los pares.",
    },
    {
      question: "¿Qué método moderno se recomienda para comprobar si un objeto tiene una propiedad propia?",
      options: ["Object.has()", "Object.hasOwn()", "Object.exists()", "typeof"],
      correctIndex: 1,
      explanation:
        "`Object.hasOwn(objeto, \"clave\")` (ECMAScript 2022) sustituye al antiguo `hasOwnProperty()`.",
    },
    {
      question: "¿Qué es cierto sobre la frase «en JavaScript todo es un objeto»?",
      options: [
        "Es literalmente cierta, incluidos los textos y números",
        "Es una simplificación: arreglos y funciones son objetos, pero los valores primitivos no",
        "Solo es cierta para los objetos literales",
        "Es falsa: los arreglos no son objetos",
      ],
      correctIndex: 1,
      explanation:
        "Los primitivos no son objetos; JavaScript los envuelve temporalmente en un objeto solo cuando usas un método sobre ellos.",
    },
  ],
};
