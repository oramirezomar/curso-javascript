import type { Lesson } from "@/lib/types";

// Une líneas de código sin tener que escapar backticks ni `${}` dentro de template literals.
const L = (...lines: string[]) => lines.join("\n");

// Contenido validado contra fuentes actuales en noviembre de 2026 (ver sección "Fuentes").
export const day05: Lesson = {
  day: 5,
  slug: "constantes-const-objetos-arreglos",
  title: "Constantes con const: objetos, arreglos y cuándo usar const, let o var",
  section: "Fundamentos del lenguaje",
  estimatedMinutes: 40,
  icon: "🔒",
  objectives: [
    "Declarar constantes con const y conocer sus reglas: valor inicial obligatorio, sin reasignación y ámbito de bloque",
    "Diferenciar «reasignar» de «modificar» y entender por qué const permite cambiar el contenido de objetos y arreglos",
    "Reconocer un objeto y un arreglo a primera vista y usar push y las propiedades con punto",
    "Saber qué hace Object.freeze y por qué es superficial",
    "Elegir con criterio entre const, let y var",
  ],
  blocks: [
    // ───────────────────────── Apertura ─────────────────────────
    {
      type: "paragraph",
      text:
        "En la lección anterior vimos las diferencias entre `var` y `let`: variables globales o de función frente a variables de bloque, y por qué usar variables globales es una mala práctica. Desde ECMAScript 2015 existe una tercera palabra reservada, `const`, para guardar valores que no van a cambiar durante el flujo de la aplicación. Hoy completamos la regla de qué palabra usar en cada caso.",
    },
    {
      type: "keyFacts",
      items: [
        { value: "ES2015", label: "Año en que llegó const, junto con let" },
        { value: "TypeError", label: "Lo que lanza reasignar una constante" },
        { value: "SyntaxError", label: "Lo que lanza declarar una constante sin valor" },
        { value: "Bloque", label: "Ámbito de const, igual que let" },
        { value: "Superficial", label: "Lo que protege Object.freeze: solo el primer nivel" },
        { value: "const → let", label: "Orden de preferencia; var, solo en código antiguo" },
      ],
    },
    {
      type: "callout",
      variant: "success",
      text:
        "Contenido verificado en noviembre de 2026 con MDN Web Docs y guías de estilo ampliamente usadas. Al final hay una tabla con datos que suelen aparecer desactualizados y la lista de fuentes.",
    },

    // ───────────────────────── const ─────────────────────────
    { type: "heading", level: 2, text: "Declarar una constante" },
    {
      type: "paragraph",
      text:
        "Con `const` se declaran variables cuyo valor no vas a reasignar. El ejemplo clásico es el número pi: todos lo conocemos desde la primaria como 3,14 y siempre vale lo mismo. Cuando sabes que un valor no va a cambiar durante el programa, `const` expresa esa intención y evita cambios accidentales.",
    },
    {
      type: "code",
      lang: "js",
      title: "Una constante",
      code: L(
        "const PI = 3.1416;",
        "console.log(PI); // 3.1416",
        "",
        "// Para pi no hace falta escribirlo a mano: JavaScript ya lo trae",
        "console.log(Math.PI); // 3.141592653589793",
        "",
        "// Se pueden declarar varias a la vez",
        "const ANCHO = 800, ALTO = 600;",
      ),
    },
    {
      type: "paragraph",
      text:
        "Las constantes tienen cuatro reglas que debes conocer, y las dos primeras las hacen diferentes de `let`:",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "Deben inicializarse en la misma declaración. No puedes declarar una constante vacía: tendría que quedar sin valor para siempre, porque no se puede asignar después.",
        "No se pueden reasignar. Intentarlo lanza un `TypeError` («Assignment to constant variable»).",
        "Tienen ámbito de bloque y zona muerta temporal, igual que `let`: solo existen dentro del par de llaves donde se declaran y no se pueden usar antes de la línea de su declaración.",
        "No se pueden redeclarar en el mismo ámbito (ni con `const`, ni con `let`, ni con `var`), y no crean propiedades en el objeto global.",
      ],
    },
    {
      type: "playground",
      title: "Experimento 1 · Reasignar una constante",
      description: "Intenta cambiar el valor de pi y observa que el valor original no se altera.",
      code: L(
        "const PI = 3.1416;",
        "console.log(PI);",
        "",
        "try {",
        "  PI = 3.15;",
        "} catch (error) {",
        "  console.log(error.name);",
        "}",
        "",
        "console.log(PI);",
      ),
      expected: L("3.1416", "TypeError", "3.1416"),
    },
    {
      type: "heading",
      level: 3,
      text: "Por qué let sí admite variables vacías y const no",
    },
    {
      type: "paragraph",
      text:
        "A veces necesitas una variable vacía que se irá llenando según lo que haga el usuario en tu sitio o en tu aplicación. Con `let` (y también con `var`) puedes declararla sin valor y asignarlo después. Con `const` eso no tiene sentido y el motor lo rechaza con un error de sintaxis.",
    },
    {
      type: "code",
      lang: "js",
      title: "let admite una declaración sin valor",
      code: L(
        "let edad;              // declarada, sin valor: vale undefined",
        "console.log(edad);     // undefined",
        "",
        "edad = 35;             // se asigna cuando se necesite",
        "console.log(edad);     // 35",
        "",
        "// const nueve;        // SyntaxError: Missing initializer in const declaration",
      ),
    },
    {
      type: "playground",
      title: "Experimento 2 · Declarar sin valor",
      description:
        "Comprueba qué declaraciones admiten quedarse vacías. (Usa `new Function` solo con fines didácticos.)",
      code: L(
        "const intentos = {",
        '  "const sin valor": "const nueve;",',
        '  "let sin valor": "let nueve;",',
        '  "var sin valor": "var nueve;",',
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
      expected: L(
        "const sin valor → SyntaxError",
        "let sin valor → permitido",
        "var sin valor → permitido",
      ),
    },
    {
      type: "table",
      caption: "var, let y const lado a lado",
      headers: ["", "var", "let", "const"],
      rows: [
        ["Ámbito", "Función o global", "Bloque", "Bloque"],
        ["¿Se puede reasignar?", "Sí", "Sí", "No"],
        ["¿Se puede declarar sin valor?", "Sí", "Sí", "No"],
        ["¿Se puede redeclarar en el mismo ámbito?", "Sí", "No", "No"],
        ["Usar antes de declarar", "Vale `undefined`", "`ReferenceError` (TDZ)", "`ReferenceError` (TDZ)"],
        ["¿Crea propiedad del objeto global (script clásico)?", "Sí", "No", "No"],
        ["Uso recomendado", "Evitar en código nuevo", "Cuando el valor se reasigna", "Por defecto"],
      ],
    },

    // ───────────────────────── Objetos y arreglos ─────────────────────────
    { type: "heading", level: 2, text: "Un adelanto: objetos y arreglos" },
    {
      type: "paragraph",
      text:
        "Para entender el comportamiento más importante de `const` necesitamos conocer, a grandes rasgos, dos valores compuestos. Más adelante habrá lecciones dedicadas a cada uno; por ahora basta con reconocerlos.",
    },
    {
      type: "image",
      src: "/img/dia-05/objeto-y-arreglo.svg",
      alt: "Un objeto entre llaves con propiedades de nombre y valor, parecido a una regla de CSS, y un arreglo entre corchetes con una lista ordenada de valores accesibles por su posición, que empieza en cero.",
      caption: "Objeto: propiedades con nombre. Arreglo: lista ordenada de valores.",
    },
    {
      type: "list",
      items: [
        "Un objeto, escrito entre llaves `{ }`, es una colección de atributos (propiedades) con su valor. Si has trabajado con CSS te resultará familiar, porque se parece a una regla: cada propiedad tiene un nombre y un valor.",
        "Un arreglo, escrito entre corchetes `[ ]`, es una lista ordenada de valores; se accede a cada uno por su posición, que empieza en 0. Es como una variable que guarda varias.",
        "Para añadir una propiedad a un objeto se usa el punto: `objeto.correo = \"...\"`. Para añadir un elemento a un arreglo se usa el método `push`.",
      ],
    },
    {
      type: "playground",
      title: "Experimento 3 · Modificar un objeto y un arreglo declarados con const",
      description:
        "Los dos están declarados con `const` y, aun así, crecen. Predice el resultado antes de ejecutar.",
      code: L(
        'const persona = { nombre: "Ana", edad: 35 };',
        'const colores = ["blanco", "negro", "azul"];',
        "",
        'console.log("Antes:", Object.keys(persona).length, "propiedades y", colores.length, "colores");',
        "",
        'persona.correo = "ana@ejemplo.com";   // añadir una propiedad',
        'colores.push("naranja");              // añadir un elemento',
        "",
        'console.log("Después:", Object.keys(persona).length, "propiedades y", colores.length, "colores");',
        'console.log(colores.join(", "));',
      ),
      expected: L(
        "Antes: 2 propiedades y 3 colores",
        "Después: 3 propiedades y 4 colores",
        "blanco, negro, azul, naranja",
      ),
    },
    {
      type: "paragraph",
      text:
        "Esto suele sorprender: declaramos con `const` y el objeto y el arreglo cambiaron sin ningún error. Si una constante no cambia, ¿qué está pasando?",
    },

    // ───────────────────────── Referencia ─────────────────────────
    { type: "heading", level: 2, text: "Reasignar no es lo mismo que modificar" },
    {
      type: "paragraph",
      text:
        "La clave está en lo que vimos en la lección de tipos de datos. Con los valores primitivos (cadenas, números, booleanos) accedes directamente al valor: en `const PI = 3.1416`, la constante contiene el 3,1416 y cualquier cambio exige asignar otro valor, algo que `const` prohíbe. Con los valores compuestos (objetos y arreglos) la variable guarda una referencia, una especie de coordenada que dice dónde está el objeto.",
    },
    {
      type: "paragraph",
      text:
        "`const` bloquea esa referencia: no puedes hacer que la constante apunte a otro objeto distinto. Pero no congela lo que hay dentro del objeto. Dicho con precisión: `const` crea un enlace inmutable, no un valor inmutable. Por eso añadir una propiedad o un elemento está permitido: la referencia sigue siendo la misma, y para JavaScript el objeto sigue siendo el mismo objeto, solo que ahora tiene más propiedades.",
    },
    {
      type: "image",
      src: "/img/dia-05/const-referencia.svg",
      alt: "La constante colores apunta a un arreglo. Reasignarla a otro arreglo lanza un TypeError, pero el contenido del arreglo puede crecer con push y sigue siendo el mismo arreglo.",
      caption: "const bloquea el enlace entre el nombre y el objeto, no el contenido del objeto.",
    },
    {
      type: "callout",
      variant: "info",
      text:
        "Una metáfora que ayuda: tú eres la misma persona desde que naces hasta que mueres, aunque cambien tu cuerpo, tus gustos y tus amistades. Del mismo modo, un objeto o un arreglo con `const` sigue siendo el mismo aunque gane o pierda propiedades o elementos. Lo que `const` te prohíbe es sustituir a esa persona por otra.",
    },
    {
      type: "table",
      caption: "Qué permite const sobre un objeto o un arreglo",
      headers: ["Operación", "¿Permitida con const?", "Por qué"],
      rows: [
        ["`colores = [\"rojo\"]`", "No (`TypeError`)", "Es una reasignación: apuntaría a otro arreglo."],
        ["`colores.push(\"naranja\")`", "Sí", "Modifica el mismo arreglo."],
        ["`persona.edad = 36`", "Sí", "Cambia una propiedad del mismo objeto."],
        ["`persona.correo = \"...\"`", "Sí", "Añade una propiedad al mismo objeto."],
        ["`persona = { nombre: \"Luis\" }`", "No (`TypeError`)", "Es una reasignación."],
      ],
    },
    {
      type: "playground",
      title: "Experimento 4 · Mismo arreglo, aunque cambie",
      description:
        "Se guarda una segunda referencia al arreglo y se compara con el original. Después se intenta reasignar la constante.",
      code: L(
        'const colores = ["blanco", "negro", "azul"];',
        "const mismo = colores;",
        "",
        'colores.push("naranja");',
        'console.log("mismo arreglo:", mismo === colores, "·", mismo.length, "elementos");',
        "",
        "try {",
        '  colores = ["rojo"];',
        "} catch (error) {",
        '  console.log("reasignar:", error.name);',
        "}",
      ),
      expected: L("mismo arreglo: true · 4 elementos", "reasignar: TypeError"),
    },
    {
      type: "playground",
      title: "Experimento 5 · ¿Es un objeto o un arreglo?",
      description:
        "`typeof` no distingue arreglos de objetos; para eso existe `Array.isArray`.",
      code: L(
        "console.log(typeof {});",
        "console.log(typeof []);",
        "console.log(Array.isArray([]));",
        "console.log(Array.isArray({}));",
      ),
      expected: L("object", "object", "true", "false"),
    },

    // ───────────────────────── freeze ─────────────────────────
    { type: "heading", level: 2, text: "Si de verdad quieres que no cambie: Object.freeze" },
    {
      type: "paragraph",
      text:
        "Cuando necesitas que un objeto o un arreglo no se pueda modificar, `const` no basta: hay que congelarlo con `Object.freeze()`. Un objeto congelado no admite añadir, eliminar ni cambiar propiedades. En modo normal esos intentos se ignoran en silencio; en modo estricto lanzan un `TypeError`.",
    },
    {
      type: "paragraph",
      text:
        "Pero cuidado: `Object.freeze` es superficial. Solo congela las propiedades directas del objeto. Si alguna propiedad contiene a su vez un objeto o un arreglo, ese objeto interno sigue siendo modificable, salvo que también lo congeles.",
    },
    {
      type: "image",
      src: "/img/dia-05/freeze-superficial.svg",
      alt: "Un objeto config congelado con Object.freeze: su propiedad tema no se puede cambiar, pero el objeto anidado opciones sigue siendo modificable.",
      caption: "Object.freeze protege solo el primer nivel.",
    },
    {
      type: "playground",
      title: "Experimento 6 · Congelar un objeto",
      description:
        "Observa qué cambio se ignora y cuál sí se aplica. (Un cambio ignorado en silencio es una buena razón para usar el modo estricto.)",
      code: L(
        'const config = Object.freeze({ tema: "claro", opciones: { idioma: "es" } });',
        "",
        'config.tema = "oscuro";            // se ignora (sin error en modo normal)',
        'config.opciones.idioma = "en";     // el objeto anidado NO está congelado',
        "",
        "console.log(config.tema);",
        "console.log(config.opciones.idioma);",
        "console.log(Object.isFrozen(config), Object.isFrozen(config.opciones));",
      ),
      expected: L("claro", "en", "true false"),
    },

    // ───────────────────────── Cómo elegir ─────────────────────────
    { type: "heading", level: 2, text: "Cómo elegir entre const, let y var" },
    {
      type: "paragraph",
      text:
        "La pregunta práctica es cuál usar. La respuesta se resume en una sola idea: ¿vas a reasignar la variable? Si el valor va a cambiar a lo largo del programa (por ejemplo, empieza como una cadena de texto, luego pasa a ser un número y después un objeto), declárala con `let`. Si la naturaleza de la variable no va a cambiar (siempre será un arreglo, con más o menos elementos; siempre será un objeto, con más o menos propiedades; siempre será una cadena que no se modifica), usa `const`.",
    },
    {
      type: "image",
      src: "/img/dia-05/elegir-declaracion.svg",
      alt: "Diagrama de decisión: si vas a reasignar la variable usa let; si no, usa const aunque sea un objeto o arreglo que cambie por dentro; var queda solo para mantener código antiguo.",
      caption: "Empieza con const; cambia a let solo si necesitas reasignar.",
    },
    {
      type: "table",
      caption: "Ejemplos de decisión",
      headers: ["Situación", "Declaración", "Por qué"],
      rows: [
        ["El valor de pi, una tasa de IVA, un texto fijo", "`const`", "Nunca se reasigna."],
        ["Un arreglo al que irás añadiendo elementos", "`const`", "Se modifica el contenido, no se reasigna la variable."],
        ["Un objeto al que irás añadiendo propiedades", "`const`", "Igual que el arreglo."],
        ["Un contador que va subiendo", "`let`", "Cada paso asigna un valor nuevo."],
        ["Una variable que se declara vacía y se llena según lo que haga el usuario", "`let`", "Se declara sin valor y se asigna después."],
        ["Código antiguo con `var`", "Cámbialo por `let` o `const`", "Revisa antes que no dependa de la elevación ni del ámbito global."],
      ],
    },
    {
      type: "callout",
      variant: "info",
      text:
        "La práctica más extendida, y la que recomienda la guía de estilo de MDN, es usar `const` siempre que la variable no se reasigne. Algunos equipos prefieren `let` para los objetos que se van modificando, y ambas opciones son válidas si se aplican con coherencia. Los linters ayudan: la regla `prefer-const` de ESLint avisa cuando una variable declarada con `let` nunca se reasigna.",
    },
    {
      type: "heading",
      level: 3,
      text: "Y los nombres de las constantes",
    },
    {
      type: "paragraph",
      text:
        "Recuerda la convención de la lección 3: los valores realmente fijos (números, textos) suelen escribirse en CONSTANT_CASE, como `PI` o `TASA_DE_IVA`. Un objeto o arreglo que declaras con `const` pero que vas modificando no es una constante en sentido estricto, así que por claridad se nombra en lowerCamelCase, como `colores` o `persona`.",
    },
    {
      type: "checklist",
      title: "Conclusión: la regla en cuatro líneas",
      items: [
        "Olvídate de `var`: cuando la veas en código antiguo, cámbiala por `let` o `const` (con la revisión indicada).",
        "Usa `const` cuando el valor, o la naturaleza de la variable, no va a cambiar.",
        "Usa `let` cuando el valor se reasigna o cuando necesitas declarar una variable vacía que se llenará después.",
        "Si dudas, empieza con `const`; si luego necesitas reasignar, cámbiala a `let`.",
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
          "const hace que el valor sea inmutable.",
          "Crea un enlace inmutable, no un valor inmutable: no se puede reasignar, pero el contenido de un objeto o arreglo sí se puede modificar. Para evitarlo hay que usar `Object.freeze`.",
        ],
        [
          "Object.freeze hace el objeto completamente inmutable.",
          "Es superficial: congela solo las propiedades directas. Los objetos anidados siguen siendo modificables salvo que también se congelen.",
        ],
        [
          "Usa `let` para los objetos y arreglos que van creciendo.",
          "La práctica más extendida es `const` siempre que no se reasigne la variable (así lo recomiendan MDN y guías como la de Airbnb). Algunos equipos prefieren `let` para objetos que se mutan.",
        ],
        [
          "Para pi usa 3.14 o 3.1416.",
          "JavaScript ya incluye `Math.PI` (3.141592653589793).",
        ],
        [
          "Todas las constantes se escriben en MAYÚSCULAS.",
          "Es una convención habitual para valores primitivos realmente fijos. Un objeto o arreglo que se modifica se nombra normalmente en lowerCamelCase.",
        ],
        [
          "`typeof []` devuelve \"array\".",
          "Devuelve \"object\". Para comprobar si algo es un arreglo se usa `Array.isArray()`.",
        ],
      ],
    },

    // ───────────────────────── FAQ ─────────────────────────
    {
      type: "accordion",
      title: "Preguntas frecuentes de esta lección",
      items: [
        {
          title: "Si declaro un objeto con const, ¿puedo cambiar sus propiedades?",
          text:
            "Sí. `const` solo impide reasignar la variable. Para impedir cambios en las propiedades debes congelar el objeto con `Object.freeze` (recuerda que es superficial).",
        },
        {
          title: "¿Puedo declarar una constante sin valor y asignarlo después?",
          text:
            "No: es un error de sintaxis. Si necesitas declarar primero y asignar después, usa `let`.",
        },
        {
          title: "¿Puedo usar el mismo nombre de constante dentro de un bloque?",
          text:
            "Sí, dentro de un bloque anidado crea una constante nueva que oculta a la exterior mientras estás ahí. En el mismo ámbito no se puede redeclarar.",
        },
        {
          title: "¿Por qué `const` no da error con `colores.push(...)`?",
          text:
            "Porque `push` modifica el arreglo existente; no reasigna la variable `colores`. La referencia sigue apuntando al mismo arreglo.",
        },
        {
          title: "¿Y si quiero copiar un objeto para que no cambie el original?",
          text:
            "Asignar un objeto a otra variable copia la referencia, no el objeto, y por eso ambas ven los cambios. Las formas de copiar un objeto se verán en la lección de objetos.",
        },
        {
          title: "¿Hay alguna diferencia de rendimiento entre const y let?",
          text:
            "Para tu código del día a día, la diferencia no es un criterio de elección. Elige por claridad: `const` comunica que no vas a reasignar.",
        },
      ],
    },

    // ───────────────────────── Cierre ─────────────────────────
    { type: "heading", level: 2, text: "Cierre" },
    {
      type: "paragraph",
      text:
        "Con `var`, `let` y `const` ya sabes cuándo y cómo declarar variables. En la próxima lección empezamos a ver, uno por uno, los tipos de datos: cadenas de texto, números, booleanos, `undefined`, objetos y los demás, con sus propiedades y métodos.",
    },
    {
      type: "checklist",
      title: "Antes de pasar al Día 6, verifica que puedes explicar…",
      items: [
        "Las reglas de const: valor inicial obligatorio, sin reasignación, ámbito de bloque.",
        "Qué error lanza reasignar una constante y cuál lanza declararla sin valor.",
        "Qué es un objeto y qué es un arreglo, y cómo añadir una propiedad y un elemento.",
        "Por qué una constante puede contener un objeto que cambia por dentro.",
        "Qué hace Object.freeze y por qué es superficial.",
        "Cuándo usar const, cuándo let y por qué evitar var.",
        "Qué es Math.PI y cuándo usar CONSTANT_CASE.",
      ],
    },
    { type: "heading", level: 3, text: "Fuentes consultadas (noviembre de 2026)" },
    {
      type: "list",
      items: [
        "[MDN: const](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const)",
        "[MDN: let](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let)",
        "[MDN: Object.freeze()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze)",
        "[MDN: Array.isArray()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray)",
        "[MDN: Math.PI](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/PI)",
        "[Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)",
        "[ESLint: regla prefer-const](https://eslint.org/docs/latest/rules/prefer-const)",
      ],
    },
  ],
  selfCheck: [
    {
      question: "¿Qué ocurre al ejecutar `const nueve;`?",
      options: [
        "Se crea la constante con valor undefined",
        "Lanza un SyntaxError: una constante debe inicializarse al declararla",
        "Lanza un TypeError",
        "No pasa nada hasta que se use",
      ],
      correctIndex: 1,
      explanation:
        "Una constante requiere un valor inicial en la misma declaración, porque no puede asignarse después.",
    },
    {
      question: "Con `const PI = 3.1416;`, ¿qué lanza `PI = 3.15;`?",
      options: ["SyntaxError", "ReferenceError", "TypeError", "Nada: cambia el valor"],
      correctIndex: 2,
      explanation:
        "Reasignar una constante lanza un TypeError («Assignment to constant variable»).",
    },
    {
      question: "¿Cuál es el ámbito de una constante declarada dentro de un bloque `{ }`?",
      options: [
        "Toda la función",
        "El ámbito global",
        "Solo ese bloque",
        "Solo la línea donde se declara",
      ],
      correctIndex: 2,
      explanation:
        "`const` tiene ámbito de bloque, igual que `let`.",
    },
    {
      question: "Con `const colores = [\"blanco\"];`, ¿qué sentencia lanza un error?",
      options: [
        "`colores.push(\"negro\");`",
        "`colores[0] = \"rojo\";`",
        "`colores = [\"azul\"];`",
        "`console.log(colores.length);`",
      ],
      correctIndex: 2,
      explanation:
        "Reasignar la constante a otro arreglo es lo que está prohibido. Modificar el contenido del mismo arreglo (push, asignar por posición) sí se permite.",
    },
    {
      question: "¿Por qué una constante puede contener un objeto que cambia por dentro?",
      options: [
        "Porque los objetos no son valores",
        "Porque const guarda una referencia inmutable: el enlace no cambia, pero el contenido del objeto sí puede cambiar",
        "Porque JavaScript ignora const con objetos",
        "Porque los objetos se congelan automáticamente",
      ],
      correctIndex: 1,
      explanation:
        "`const` crea un enlace inmutable, no un valor inmutable. El objeto sigue siendo el mismo aunque gane o pierda propiedades.",
    },
    {
      question: "¿Qué hace `Object.freeze(obj)` con los objetos anidados dentro de `obj`?",
      options: [
        "Los congela también, a cualquier profundidad",
        "No los congela: freeze es superficial y solo afecta a las propiedades directas",
        "Los elimina",
        "Lanza siempre un error",
      ],
      correctIndex: 1,
      explanation:
        "Es superficial. Para congelar un objeto anidado hay que aplicarle también `Object.freeze`.",
    },
    {
      question: "¿Qué devuelve `typeof []`?",
      options: ["\"array\"", "\"object\"", "\"list\"", "undefined"],
      correctIndex: 1,
      explanation:
        "Los arreglos son objetos, así que `typeof` devuelve \"object\". Para distinguirlos se usa `Array.isArray([])`.",
    },
    {
      question: "Necesitas una variable que empieza vacía y se llenará según lo que haga el usuario. ¿Qué usas?",
      options: ["`const`", "`let`", "`var` siempre", "Ninguna: no se puede"],
      correctIndex: 1,
      explanation:
        "`let` permite declarar sin valor y asignarlo más tarde; `const` exige un valor inicial.",
    },
    {
      question: "¿Cuál es la regla práctica más extendida para elegir una declaración?",
      options: [
        "Usar `var` por compatibilidad",
        "Usar `const` por defecto, `let` si hay que reasignar y evitar `var`",
        "Usar siempre `let`",
        "Usar `const` solo para números",
      ],
      correctIndex: 1,
      explanation:
        "Es la práctica recomendada por MDN y por guías de estilo muy usadas, y la regla `prefer-const` de ESLint la refuerza.",
    },
    {
      question: "¿Cuál es la forma de obtener pi en JavaScript sin escribirlo a mano?",
      options: ["`pi()`", "`Math.PI`", "`const.PI`", "`Number.PI`"],
      correctIndex: 1,
      explanation:
        "`Math.PI` es una constante integrada con el valor 3.141592653589793.",
    },
  ],
};
