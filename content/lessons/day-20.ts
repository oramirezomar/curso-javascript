import type { Lesson } from "@/lib/types";

// Une líneas de código sin tener que escapar backticks ni `${}` dentro de template literals.
const L = (...lines: string[]) => lines.join("\n");

// Contenido validado contra fuentes actuales en noviembre de 2026 (ver sección "Fuentes").
export const day20: Lesson = {
  day: 20,
  slug: "objetos-literales-sintaxis-abreviada",
  title: "Objetos literales: la sintaxis abreviada de ES6",
  section: "Sintaxis moderna (ES2015)",
  estimatedMinutes: 65,
  icon: "🧩",
  objectives: [
    "Explicar qué es un objeto literal y qué se abrevió con ES2015",
    "Escribir propiedades abreviadas (`{ nombre, edad }`) y saber que copian el valor de la variable en ese momento",
    "Escribir métodos abreviados (`ladrar() { }`) y conocer sus diferencias con `ladrar: function () { }`",
    "Usar nombres de propiedad calculados (`[expresión]: valor`) y reconocer los getters y setters",
    "Combinar estas formas con la desestructuración y en funciones que crean objetos",
  ],
  blocks: [
    // ───────────────────────── Apertura ─────────────────────────
    {
      type: "paragraph",
      text:
        "En la lección anterior viste la desestructuración, una de las novedades de ECMAScript 2015 (ES6). Hoy vemos otra que va en la dirección contraria: en lugar de sacar valores de un objeto, los metemos al crear uno. Un objeto literal es el que defines directamente con llaves, como `{ nombre: \"Rex\" }`. Esa forma de crear objetos existía desde siempre. Lo que ES2015 añadió son atajos para escribirlos con menos repetición: propiedades abreviadas, métodos abreviados y nombres de propiedad calculados.",
    },
    {
      type: "keyFacts",
      items: [
        { value: "{ nombre, edad }", label: "Propiedad abreviada: usa la variable del mismo nombre" },
        { value: "ladrar() { }", label: "Método abreviado: sin la palabra function ni los dos puntos" },
        { value: "[expr]: valor", label: "Nombre calculado: el resultado de la expresión es el nombre" },
        { value: "Se copia el valor", label: "La abreviatura no enlaza con la variable" },
        { value: "new + método", label: "Un método abreviado no se puede usar como constructor" },
        { value: "get / set", label: "Propiedades que ejecutan código al leerse o escribirse" },
      ],
    },
    {
      type: "callout",
      variant: "success",
      text:
        "Contenido verificado en noviembre de 2026 con MDN Web Docs (inicializador de objetos, definiciones de métodos, getters y setters) y con la documentación de ESLint. Los resultados de los ejemplos se comprobaron ejecutándolos. Al final hay una tabla con datos que suelen aparecer desactualizados y la lista de fuentes.",
    },

    // ───────────────────────── Punto de partida ─────────────────────────
    { type: "heading", level: 2, text: "El punto de partida: la forma larga" },
    {
      type: "paragraph",
      text:
        "Imagina que ya tienes dos variables sueltas, `nombre` y `edad`, y quieres crear un objeto `perro` con esas dos propiedades y con un método `ladrar` que imprima un mensaje. Hasta ahora lo escribirías así: cada propiedad con su nombre, dos puntos y la variable, y el método como una propiedad cuyo valor es una función. Observa que `nombre: nombre` repite la misma palabra dos veces.",
    },
    {
      type: "playground",
      title: "Experimento 1 · Un objeto con la forma larga",
      description: "Dos propiedades tomadas de variables y un método. `JSON.stringify` no incluye las funciones, por eso el método se muestra aparte.",
      code: L(
        'const nombre = "Rex";',
        "const edad = 7;",
        "",
        "const perro = {",
        "  nombre: nombre,",
        "  edad: edad,",
        "  ladrar: function () {",
        '    console.log("guau guau");',
        "  },",
        "};",
        "",
        'console.log(Object.keys(perro).join(","));',
        "perro.ladrar();",
      ),
      expected: L("nombre,edad,ladrar", "guau guau"),
    },

    // ───────────────────────── Propiedades abreviadas ─────────────────────────
    { type: "heading", level: 2, text: "Propiedades abreviadas" },
    {
      type: "paragraph",
      text:
        "Los creadores del estándar notaron que, muy a menudo, se guarda una variable en una propiedad que tiene su mismo nombre. Para ese caso, basta con escribir el nombre una vez: `{ nombre, edad }`. JavaScript entiende que la propiedad se llama como la variable y que su valor es el que la variable contiene en ese momento. Puedes mezclar propiedades abreviadas con las normales, como una `raza` que no sale de ninguna variable.",
    },
    {
      type: "image",
      src: "/img/dia-20/antes-despues-objeto.svg",
      alt: "A la izquierda, el objeto perro en forma larga, con nombre dos puntos nombre, edad dos puntos edad y ladrar dos puntos function. A la derecha, el mismo objeto en forma abreviada, con nombre, edad y ladrar con paréntesis, sin la palabra function. Los dos tienen las mismas propiedades y el mismo método.",
      caption: "Mismo objeto, menos código.",
    },
    {
      type: "playground",
      title: "Experimento 2 · Propiedades abreviadas mezcladas con una normal",
      description: "`nombre` y `edad` se abrevian; `raza` se escribe completa porque no hay una variable con ese nombre.",
      code: L(
        'const nombre = "Rex";',
        "const edad = 7;",
        "",
        "const perro = {",
        "  nombre,",
        "  edad,",
        '  raza: "callejero",',
        "  ladrar() {",
        '    console.log("guau guau");',
        "  },",
        "};",
        "",
        "console.log(JSON.stringify(perro));",
        "perro.ladrar();",
      ),
      expected: L('{"nombre":"Rex","edad":7,"raza":"callejero"}', "guau guau"),
    },
    { type: "heading", level: 3, text: "Se copia el valor, no la variable" },
    {
      type: "paragraph",
      text:
        "La abreviatura no crea ningún enlace entre la propiedad y la variable: copia el valor que la variable tiene en el momento de crear el objeto. Si la variable cambia después, la propiedad no se entera. Si el valor es un arreglo o un objeto, lo que se copia es la referencia, así que ambos nombres apuntan al mismo dato (lo mismo que viste con la desestructuración). Además, la variable debe existir: si no está declarada, se produce un `ReferenceError`. Si existe pero vale `undefined`, la propiedad se crea con ese valor.",
    },
    {
      type: "image",
      src: "/img/dia-20/valor-copiado.svg",
      alt: "Tres pasos. Primero, let x = 1 crea la variable x con valor 1. Segundo, const o = { x } crea un objeto con la propiedad x que copia el valor 1. Tercero, x = 2 cambia la variable a 2, pero la propiedad del objeto sigue valiendo 1, porque no hay un enlace con la variable.",
      caption: "{ x } toma el valor de x en el momento de crear el objeto.",
    },
    {
      type: "playground",
      title: "Experimento 3 · La propiedad abreviada copia el valor",
      description: "Cambiar `x` después no cambia `o.x`. Una variable no declarada falla, y una que vale `undefined` crea la propiedad.",
      code: L(
        "let x = 1;",
        "const o = { x };",
        "x = 2;",
        "console.log(o.x, x);",
        "",
        "try {",
        "  const roto = { noDeclarada };",
        "} catch (error) {",
        "  console.log(error.name);",
        "}",
        "",
        "const indef = undefined;",
        "const q = { indef };",
        'console.log("indef" in q, q.indef);',
      ),
      expected: L("1 2", "ReferenceError", "true undefined"),
    },

    // ───────────────────────── Métodos abreviados ─────────────────────────
    { type: "heading", level: 2, text: "Métodos abreviados" },
    {
      type: "paragraph",
      text:
        "Los métodos también tienen su forma corta. En lugar de `ladrar: function () { ... }`, se escribe directamente el nombre del método seguido de los paréntesis y las llaves: `ladrar() { ... }`. Se quita la palabra `function` y los dos puntos. Se invoca igual: `perro.ladrar()`. En la lección de objetos se usó la forma larga porque el curso avanza paso a paso; a partir de ahora puedes usar la corta.",
    },
    {
      type: "paragraph",
      text:
        "Conviene saber que no son exactamente equivalentes. Según MDN, un método definido con la forma abreviada no es una función constructora: si intentas usarlo con `new`, lanza un `TypeError`, mientras que una propiedad cuyo valor es una función sí puede usarse con `new`. Además, solo los métodos abreviados pueden usar la palabra `super`, que verás con las clases. Para el día a día, la diferencia es que la forma abreviada es más corta y más coherente con los métodos de las clases.",
    },
    {
      type: "playground",
      title: "Experimento 4 · Método largo frente a método abreviado",
      description: "Los dos se llaman y se nombran igual. La diferencia aparece al intentar usarlos con `new`.",
      code: L(
        'const largo = { ladrar: function () { return "guau"; } };',
        'const corto = { ladrar() { return "guau"; } };',
        "console.log(largo.ladrar(), corto.ladrar());",
        "console.log(largo.ladrar.name, corto.ladrar.name);",
        "",
        "console.log(typeof new largo.ladrar());",
        "try {",
        "  new corto.ladrar();",
        "} catch (error) {",
        '  console.log("new con método abreviado →", error.name);',
        "}",
      ),
      expected: L(
        "guau guau",
        "ladrar ladrar",
        "object",
        "new con método abreviado → TypeError",
      ),
    },
    {
      type: "paragraph",
      text:
        "Dentro de un método, `this` apunta al objeto sobre el que se llamó, y permite leer y modificar sus otras propiedades. Esto funciona igual con la forma larga y con la abreviada. Un `return this` al final del método permite encadenar llamadas. Ten cuidado con las funciones flecha, que verás dentro de poco: en una propiedad definida con una flecha, `this` no apunta al objeto, por lo que no son una buena opción para los métodos que necesitan leer el objeto.",
    },
    {
      type: "playground",
      title: "Experimento 5 · this dentro de los métodos",
      description: "Cada método usa `this` para llegar a las propiedades del mismo objeto. Como `subir` devuelve `this`, se pueden encadenar.",
      code: L(
        "const perro = {",
        '  nombre: "Rex",',
        "  presentarse() {",
        '    return "Soy " + this.nombre;',
        "  },",
        "};",
        "console.log(perro.presentarse());",
        "",
        "const contador = {",
        "  valor: 0,",
        "  subir() {",
        "    this.valor++;",
        "    return this;",
        "  },",
        "  ver() {",
        "    return this.valor;",
        "  },",
        "};",
        "contador.subir().subir();",
        "console.log(contador.ver());",
      ),
      expected: L("Soy Rex", "2"),
    },

    // ───────────────────────── Funciones que crean objetos ─────────────────────────
    { type: "heading", level: 2, text: "Funciones que crean objetos" },
    {
      type: "paragraph",
      text:
        "Donde más se agradece la forma abreviada es en las funciones que construyen y devuelven un objeto a partir de sus parámetros: los parámetros ya tienen el nombre de las propiedades, así que se abrevian sin más. Y se une muy bien con lo que viste en la lección anterior: desestructurar un objeto en variables y volver a armarlo con las propiedades abreviadas.",
    },
    {
      type: "playground",
      title: "Experimento 6 · Una función que devuelve un objeto, y desestructuración",
      description: "Los parámetros `nombre` y `edad` se convierten en propiedades. El método usa el parámetro `nombre`, porque lo recuerda.",
      code: L(
        "function crearPerro(nombre, edad) {",
        "  return {",
        "    nombre,",
        "    edad,",
        "    ladrar() {",
        '      return nombre + ": guau";',
        "    },",
        "  };",
        "}",
        "",
        'const luna = crearPerro("Luna", 3);',
        "console.log(luna.nombre, luna.edad, luna.ladrar());",
        "",
        "// Sacar dos propiedades y armar un objeto nuevo con ellas",
        "const { nombre, edad } = luna;",
        "const copia = { nombre, edad };",
        "console.log(JSON.stringify(copia));",
      ),
      expected: L("Luna 3 Luna: guau", '{"nombre":"Luna","edad":3}'),
    },

    // ───────────────────────── Nombres calculados ─────────────────────────
    { type: "heading", level: 2, text: "Nombres de propiedad calculados" },
    {
      type: "paragraph",
      text:
        "Hasta aquí, el nombre de cada propiedad estaba escrito en el código. ES2015 permite también calcularlo: si lo pones entre corchetes, JavaScript evalúa la expresión y usa el resultado como nombre. Puede ser el valor de una variable, una concatenación o una plantilla de texto. Es útil cuando el nombre no se conoce hasta que el programa se ejecuta, por ejemplo, al guardar un campo cuyo nombre llega desde un formulario. También funciona con los métodos.",
    },
    {
      type: "image",
      src: "/img/dia-20/claves-calculadas.svg",
      alt: "Un objeto con tres nombres de propiedad entre corchetes. [clave] crea la propiedad edad porque la variable clave vale edad. [\"x\" + 1] crea la propiedad x1. Una plantilla de texto con k y 1 + 1 crea la propiedad k2. La propiedad nombre, sin corchetes, usa su nombre literal.",
      caption: "El resultado de la expresión entre corchetes es el nombre de la propiedad.",
    },
    {
      type: "playground",
      title: "Experimento 7 · Nombres calculados en propiedades y en métodos",
      description: "Sin corchetes, `{ clave: 7 }` crea una propiedad que se llama literalmente `clave`.",
      code: L(
        'const clave = "edad";',
        "const o = {",
        "  [clave]: 7,",
        '  ["x" + 1]: "y",',
        "  [`k${1 + 1}`]: true,",
        '  nombre: "Rex",',
        "};",
        "console.log(JSON.stringify(o));",
        "",
        'const metodo = "saludar";',
        'const conMetodo = { [metodo]() { return "hola"; } };',
        "console.log(conMetodo.saludar(), conMetodo.saludar.name);",
        "",
        "// Sin corchetes, el nombre es literal",
        "const literal = { clave: 7 };",
        'console.log(Object.keys(literal).join(","));',
        "",
        "// Un campo cuyo nombre llega como dato",
        "function campoDinamico(campo, valor) {",
        "  return { [campo]: valor };",
        "}",
        'console.log(JSON.stringify(campoDinamico("color", "rojo")));',
      ),
      expected: L(
        '{"edad":7,"x1":"y","k2":true,"nombre":"Rex"}',
        "hola saludar",
        "clave",
        '{"color":"rojo"}',
      ),
    },

    // ───────────────────────── get / set ─────────────────────────
    { type: "heading", level: 2, text: "Getters y setters" },
    {
      type: "paragraph",
      text:
        "Una última forma que conviene reconocer: las propiedades de acceso. Con `get` defines una propiedad que, al leerla, ejecuta una función; con `set`, una que ejecuta una función al asignarle un valor. Se leen y se escriben como cualquier propiedad, sin paréntesis, aunque por dentro corran código. Aparecen en las propiedades del objeto igual que las normales. Los getters y los setters no son de ES2015 (existen desde ES5), pero comparten la sintaxis con los métodos abreviados. Los métodos también pueden ser `async` o generadores, algo que verás más adelante.",
    },
    {
      type: "playground",
      title: "Experimento 8 · Un getter y un setter",
      description: "`descripcion` se calcula cada vez que se lee. Asignar `edadNueva` ejecuta el setter y cambia `edad`.",
      code: L(
        "const perro = {",
        '  nombre: "Rex",',
        "  edad: 7,",
        "  get descripcion() {",
        '    return this.nombre + " (" + this.edad + ")";',
        "  },",
        "  set edadNueva(valor) {",
        "    this.edad = valor;",
        "  },",
        "};",
        "",
        "console.log(perro.descripcion);",
        "perro.edadNueva = 8;",
        "console.log(perro.descripcion);",
        'console.log(Object.keys(perro).join(","));',
      ),
      expected: L("Rex (7)", "Rex (8)", "nombre,edad,descripcion,edadNueva"),
    },
    {
      type: "image",
      src: "/img/dia-20/formas-objeto-literal.svg",
      alt: "Tabla con las formas de escribir un objeto literal. Propiedad abreviada, con la sintaxis { nombre, edad }, desde ES2015. Método abreviado, con { ladrar() { } }, desde ES2015, que no se puede usar con new. Nombre calculado, con { [expresión]: valor }, desde ES2015. Getter y setter, con { get x() { } }, desde ES5. Spread, con { ...otro }, desde ES2018, que se verá en una lección posterior.",
      caption: "Resumen de las formas dentro de un objeto literal.",
    },

    // ───────────────────────── Claves ─────────────────────────
    { type: "heading", level: 2, text: "Claves repetidas y claves entre comillas" },
    {
      type: "paragraph",
      text:
        "Dos detalles que completan el cuadro. Si repites una clave en el mismo objeto literal, no hay error: gana la última (la regla `no-dupe-keys` de ESLint lo marca, porque casi siempre es un descuido). Y si el nombre de una propiedad no es un identificador válido (tiene un guion, un espacio…), se escribe entre comillas y se lee con corchetes. Al enumerar las propiedades, los nombres que son números enteros van primero, en orden ascendente, y después los demás en el orden en que se crearon.",
    },
    {
      type: "playground",
      title: "Experimento 9 · Claves repetidas, entre comillas y numéricas",
      description: "Observa el orden en que `Object.keys` entrega las propiedades.",
      code: L(
        "const o = { a: 1, a: 2 };",
        "console.log(o.a);",
        "",
        'const extra = { "mi-clave": 1, "con espacio": 2, 3: "tres" };',
        'console.log(extra["mi-clave"], extra["con espacio"], extra[3]);',
        'console.log(Object.keys(extra).join(","));',
      ),
      expected: L("2", "1 2 tres", "3,mi-clave,con espacio"),
    },

    // ───────────────────────── Cuándo usar ─────────────────────────
    { type: "heading", level: 2, text: "¿Qué forma usar en cada caso?" },
    {
      type: "table",
      caption: "Qué forma usar según el problema",
      headers: ["Situación", "Qué usar"],
      rows: [
        ["La variable y la propiedad se llaman igual", "Propiedad abreviada: `{ nombre }`"],
        ["La variable y la propiedad se llaman distinto", "Forma normal: `{ nombre: miVariable }`"],
        ["Un método dentro de un objeto literal", "Método abreviado: `ladrar() { }`"],
        ["Un objeto que se usará con `new`", "Una función constructora o una clase, no un método abreviado"],
        ["El nombre de la propiedad se conoce al ejecutar", "Nombre calculado: `{ [campo]: valor }`"],
        ["Una propiedad que se calcula al leerla", "Getter: `get nombre() { }`"],
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
          "Los objetos literales son una novedad de ES6.",
          "El objeto literal (llaves) existe desde siempre. Lo que ES2015 añadió son los atajos: propiedades abreviadas, métodos abreviados y nombres calculados.",
        ],
        [
          "`ladrar() { }` es lo mismo que `ladrar: function () { }`.",
          "Casi: el método abreviado no se puede usar con `new` (lanza `TypeError`) y es el único que puede usar `super`.",
        ],
        [
          "La propiedad abreviada queda enlazada a la variable.",
          "Copia el valor en el momento de crear el objeto. Si la variable cambia después, la propiedad no cambia.",
        ],
        [
          "Los nombres de propiedad son siempre fijos.",
          "Pueden calcularse con corchetes: `{ [expresión]: valor }`.",
        ],
        [
          "Repetir una clave en un objeto literal da un error.",
          "No da error: gana la última. ESLint lo avisa con `no-dupe-keys`.",
        ],
        [
          "Los getters y setters son de ES6.",
          "Existen desde ES5. Lo que comparten con ES2015 es la sintaxis de método.",
        ],
        [
          "Las propiedades de un objeto se enumeran siempre en el orden en que se crearon.",
          "Los nombres que son enteros van primero, en orden ascendente. Después, los demás en orden de creación.",
        ],
        [
          "En un método con función flecha, `this` es el objeto.",
          "No: las funciones flecha no tienen su propio `this`. Para métodos que usan `this`, se usa la forma abreviada.",
        ],
      ],
    },

    // ───────────────────────── FAQ ─────────────────────────
    {
      type: "accordion",
      title: "Preguntas frecuentes de esta lección",
      items: [
        {
          title: "¿Debo usar siempre las formas abreviadas?",
          text:
            "Es una convención muy extendida (la regla `object-shorthand` de ESLint la exige), pero la forma larga sigue siendo válida. Puedes mezclar las dos en el mismo objeto.",
        },
        {
          title: "¿Se puede abreviar si los nombres son distintos?",
          text:
            "No. La abreviatura exige que la variable y la propiedad se llamen igual. Si no, escribe `propiedad: variable`.",
        },
        {
          title: "¿La sintaxis de método sirve también en las clases?",
          text:
            "Sí. Es la misma sintaxis, con la diferencia de que en una clase no se separan los métodos con comas.",
        },
        {
          title: "¿Y si la variable abreviada vale undefined?",
          text:
            "La propiedad se crea igualmente, con el valor `undefined`. Se puede comprobar con el operador `in`.",
        },
        {
          title: "¿Qué relación tiene con la desestructuración?",
          text:
            "Son operaciones inversas con una sintaxis parecida: `const { nombre, edad } = persona;` saca propiedades en variables, y `const persona = { nombre, edad };` las vuelve a juntar.",
        },
        {
          title: "¿Cómo copio las propiedades de otro objeto?",
          text:
            "Con los tres puntos (`{ ...otro }`), que veremos en la lección sobre rest y spread.",
        },
      ],
    },

    // ───────────────────────── Cierre ─────────────────────────
    { type: "heading", level: 2, text: "Cierre" },
    {
      type: "paragraph",
      text:
        "Las formas abreviadas de los objetos literales no cambian lo que puedes hacer, pero reducen la repetición: `{ nombre, edad }` cuando la variable y la propiedad se llaman igual, `ladrar() { }` para los métodos, y `[expresión]: valor` cuando el nombre se calcula. Recuerda que la propiedad abreviada copia el valor del momento, que un método abreviado no se puede usar con `new`, y que los getters y setters se leen y se escriben como propiedades. En la próxima lección vemos los parámetros rest y el operador spread.",
    },
    {
      type: "checklist",
      title: "Antes de pasar al Día 21, verifica que puedes explicar…",
      items: [
        "Qué es un objeto literal y qué se añadió con ES2015.",
        "Cómo se escribe `{ nombre: nombre, edad: edad }` de forma abreviada.",
        "Por qué la propiedad abreviada no se actualiza si la variable cambia después.",
        "Qué ocurre si la variable abreviada no está declarada.",
        "Cómo se escribe un método abreviado y qué pasa si se usa con `new`.",
        "Para qué sirven los corchetes en `{ [clave]: valor }`.",
        "Cómo se comporta un getter frente a un método normal.",
        "Qué pasa cuando una clave se repite en un objeto literal.",
      ],
    },
    { type: "heading", level: 3, text: "Fuentes consultadas (noviembre de 2026)" },
    {
      type: "list",
      items: [
        "[MDN: Inicializador de objetos](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer)",
        "[MDN: Definiciones de métodos](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Method_definitions)",
        "[MDN: get](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get)",
        "[MDN: set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/set)",
        "[MDN: Trabajar con objetos (guía)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_objects)",
        "[MDN: this](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)",
        "[MDN: new](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new)",
        "[MDN: Error «no es un constructor»](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Not_a_constructor)",
        "[MDN: Object.keys()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)",
        "[MDN: Asignación por desestructuración](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring)",
        "[MDN: Funciones flecha](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)",
        "[MDN: Sintaxis spread](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)",
        "[ESLint: object-shorthand](https://eslint.org/docs/latest/rules/object-shorthand)",
        "[ESLint: no-dupe-keys](https://eslint.org/docs/latest/rules/no-dupe-keys)",
        "[ESLint: no-useless-computed-key](https://eslint.org/docs/latest/rules/no-useless-computed-key)",
        "[ESLint: no-undef](https://eslint.org/docs/latest/rules/no-undef)",
      ],
    },
  ],
  selfCheck: [
    {
      question: "¿Con qué es equivalente `const o = { nombre, edad };`?",
      options: [
        "`{ nombre: edad, edad: nombre }`",
        "`{ nombre: nombre, edad: edad }`",
        "`{ \"nombre\", \"edad\" }`",
        "`{ nombre: undefined, edad: undefined }`",
      ],
      correctIndex: 1,
      explanation:
        "La propiedad abreviada usa el nombre de la variable como nombre de la propiedad y su valor como valor.",
    },
    {
      question: "¿Qué ocurre con `const o = { noDeclarada };` si esa variable no existe?",
      options: [
        "Crea la propiedad con `undefined`",
        "Lanza un `ReferenceError`",
        "Crea un objeto vacío",
        "Lanza un `SyntaxError`",
      ],
      correctIndex: 1,
      explanation:
        "La variable tiene que existir. Si no está declarada, se lanza un `ReferenceError`.",
    },
    {
      question: "Con `let x = 1; const o = { x }; x = 2;`, ¿cuánto vale `o.x`?",
      options: ["1", "2", "undefined", "Lanza un error"],
      correctIndex: 0,
      explanation:
        "La propiedad abreviada copia el valor en el momento de crear el objeto. No queda enlazada con la variable.",
    },
    {
      question: "¿Cuál es la forma abreviada de `ladrar: function () { ... }`?",
      options: [
        "`ladrar => { ... }`",
        "`ladrar() { ... }`",
        "`function ladrar { ... }`",
        "`ladrar: () { ... }`",
      ],
      correctIndex: 1,
      explanation:
        "Se quita la palabra `function` y los dos puntos: `ladrar() { ... }`.",
    },
    {
      question: "¿Qué ocurre con `new obj.metodo()` si `metodo` se definió con la forma abreviada?",
      options: [
        "Crea un objeto nuevo",
        "Lanza un `TypeError`, porque no es un constructor",
        "Devuelve `undefined`",
        "Lanza un `SyntaxError`",
      ],
      correctIndex: 1,
      explanation:
        "Los métodos abreviados no son constructores. Una propiedad con `function` sí se puede usar con `new`.",
    },
    {
      question: "Con `const clave = \"edad\";`, ¿qué crea `{ [clave]: 7 }`?",
      options: [
        "Una propiedad llamada `clave`",
        "Una propiedad llamada `edad`",
        "Un arreglo con el 7",
        "Un error",
      ],
      correctIndex: 1,
      explanation:
        "Los corchetes evalúan la expresión: `clave` vale `\"edad\"`, y ese es el nombre de la propiedad.",
    },
    {
      question: "¿Y qué crea `{ clave: 7 }`, sin corchetes?",
      options: [
        "Una propiedad llamada `edad`",
        "Una propiedad llamada literalmente `clave`",
        "Un error",
        "Una propiedad sin nombre",
      ],
      correctIndex: 1,
      explanation:
        "Sin corchetes, el nombre se toma tal cual está escrito.",
    },
    {
      question: "¿Cómo se usa un getter, como `get descripcion() { ... }`?",
      options: [
        "`obj.descripcion()`",
        "`obj.descripcion`, como una propiedad",
        "`obj.get(\"descripcion\")`",
        "Con `new obj.descripcion`",
      ],
      correctIndex: 1,
      explanation:
        "Un getter se lee como una propiedad, sin paréntesis, aunque por dentro ejecute código.",
    },
    {
      question: "¿Qué pasa si una clave se repite en un objeto literal, como `{ a: 1, a: 2 }`?",
      options: [
        "Lanza un error",
        "Gana la última: `a` vale 2",
        "Gana la primera: `a` vale 1",
        "Se crea un arreglo con los dos valores",
      ],
      correctIndex: 1,
      explanation:
        "No hay error: la última sobrescribe a la anterior. ESLint avisa con la regla `no-dupe-keys`.",
    },
    {
      question: "¿Con qué versión del estándar llegaron las propiedades abreviadas, los métodos abreviados y los nombres calculados?",
      options: ["ES5", "ES2015 (ES6)", "ES2018", "ES2020"],
      correctIndex: 1,
      explanation:
        "Las tres llegaron con ECMAScript 2015, también conocido como ES6.",
    },
  ],
};
