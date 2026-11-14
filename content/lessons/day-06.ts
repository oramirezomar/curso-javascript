import type { Lesson } from "@/lib/types";

// Une líneas de código sin tener que escapar backticks ni `${}` dentro de template literals.
const L = (...lines: string[]) => lines.join("\n");

// Contenido validado contra fuentes actuales en noviembre de 2026 (ver sección "Fuentes").
export const day06: Lesson = {
  day: 6,
  slug: "cadenas-de-texto-propiedades-metodos-mdn",
  title: "Cadenas de texto: propiedades, métodos y cómo leer la documentación de MDN",
  section: "Tipos de datos básicos",
  estimatedMinutes: 50,
  icon: "🔤",
  objectives: [
    "Consultar la documentación de MDN Web Docs e interpretar sus insignias de estado y su tabla de compatibilidad",
    "Diferenciar propiedad y método, y entender por qué un valor primitivo puede usar ambos",
    "Crear cadenas de texto con comillas y saber por qué se evita el constructor `new String()`",
    "Usar `length` sabiendo qué cuenta realmente, y los métodos `toUpperCase`, `toLowerCase`, `includes`, `trim` y `split`",
    "Entender que las cadenas son inmutables: los métodos devuelven una cadena nueva",
  ],
  blocks: [
    // ───────────────────────── Apertura ─────────────────────────
    {
      type: "paragraph",
      text:
        "En la lección anterior cerramos el estudio de las variables. A partir de hoy recorremos, uno por uno, los tipos de datos básicos de JavaScript, con sus propiedades y métodos. Empezamos por el más habitual: la cadena de texto (string). No vamos a ver todos sus métodos, porque el curso sería interminable; veremos los más importantes y, sobre todo, cómo encontrar y entender el resto en la documentación.",
    },
    {
      type: "keyFacts",
      items: [
        { value: "7", label: "Tipos primitivos; String es uno de ellos" },
        { value: "0", label: "Posición del primer carácter de una cadena" },
        { value: "UTF-16", label: "Codificación de las cadenas: length cuenta unidades de código" },
        { value: "Inmutables", label: "Los métodos devuelven una cadena nueva" },
        { value: "ES2015", label: "Año en que llegaron includes y las plantillas de texto" },
        { value: "Deprecated", label: "Insignia de MDN para lo que ya no se recomienda" },
      ],
    },
    {
      type: "callout",
      variant: "success",
      text:
        "Contenido verificado en noviembre de 2026 con MDN Web Docs (en inglés), la documentación de Prettier y el RFC 5321. Al final hay una tabla con datos que suelen aparecer desactualizados y la lista de fuentes.",
    },

    // ───────────────────────── MDN ─────────────────────────
    { type: "heading", level: 2, text: "Antes de empezar: MDN Web Docs, tu documentación de referencia" },
    {
      type: "paragraph",
      text:
        "MDN Web Docs (el antiguo Mozilla Developer Network) es la documentación de referencia más usada para JavaScript, HTML y CSS. La mantienen Mozilla y una comunidad de colaboradores. No es la norma oficial del lenguaje (esa es la especificación ECMA-262), pero resume el estándar con explicaciones y ejemplos, y cada vez que tengas una duda sobre JavaScript es el primer sitio que conviene consultar. Para encontrar una página basta con buscar, por ejemplo, «MDN String» o «MDN includes».",
    },
    {
      type: "image",
      src: "/img/dia-06/mdn-anatomia.svg",
      alt: "Esquema de una página de referencia de MDN: menú lateral con constructor, métodos estáticos, propiedades y métodos de instancia con insignias de estado; contenido con título, ejemplo ejecutable, sintaxis, ejemplos y especificaciones; y tabla de compatibilidad con navegadores.",
      caption: "Una página de referencia de MDN: menú lateral, contenido y compatibilidad.",
    },
    {
      type: "paragraph",
      text:
        "Una página de referencia como la de `String` incluye un resumen breve, un ejemplo que puedes ejecutar y, en el menú lateral, la lista de sus propiedades y métodos. Más abajo encuentras la sintaxis con sus parámetros y el valor que devuelve, ejemplos de uso y una tabla que indica desde qué versión de cada navegador (y de Node.js) está disponible.",
    },
    {
      type: "table",
      caption: "Insignias de estado en MDN",
      headers: ["Insignia", "Qué significa", "Qué hacer"],
      rows: [
        ["Deprecated", "Ya no se recomienda. Puede eliminarse en el futuro o mantenerse solo por compatibilidad.", "Evítala en código nuevo."],
        ["Experimental", "Está en proceso de incorporarse a la plataforma web; suele estar implementada en un solo motor de navegador o con una configuración especial.", "Piénsalo bien antes de usarla en producción y comprueba la tabla de compatibilidad."],
        ["Non-standard", "No forma parte de ninguna especificación.", "No la uses en sitios públicos: no funcionará para todos."],
        ["Sin insignia", "Característica estable y soportada.", "Puedes usarla con normalidad, revisando la compatibilidad si lo necesitas."],
      ],
    },
    {
      type: "callout",
      variant: "warning",
      text:
        "MDN ya no usa el término «obsoleto»: lo que antes se marcaba así hoy aparece como Deprecated. Y sobre el idioma: MDN mantiene versiones activas en varios idiomas, entre ellos el español, pero las traducciones pueden ir por detrás de la versión en inglés. Si algo muy reciente no aparece en español, o la explicación parece distinta, consulta la versión en inglés, que es la de referencia. El inglés técnico no tiene por qué ser un obstáculo: es el idioma de la programación.",
    },

    // ───────────────────────── Todo es un objeto ─────────────────────────
    { type: "heading", level: 2, text: "«En JavaScript todo es un objeto»: matices" },
    {
      type: "paragraph",
      text:
        "Seguramente oirás esta frase mucho. Es útil como idea general, porque casi todo en el lenguaje se comporta como un objeto, pero conviene precisarla: los valores primitivos (cadenas, números, booleanos, `undefined`, `null`, `BigInt` y `Symbol`) no son objetos. Lo que ocurre es que, cuando accedes a una propiedad o llamas a un método de un primitivo (por ejemplo `\"hola\".length`), JavaScript lo envuelve automáticamente y temporalmente en el objeto correspondiente (`String`, `Number`, `Boolean`…). Por eso un valor primitivo puede tener propiedades y métodos sin ser un objeto.",
    },
    {
      type: "paragraph",
      text:
        "Dos palabras que debes dominar si estás empezando a programar son propiedad y método. Un objeto es una colección de información. Sus propiedades describen o definen algo del objeto, como la longitud de una cadena. Sus métodos son acciones que el objeto puede realizar. La diferencia práctica en el código es que los métodos se llaman con paréntesis, y entre ellos puedes pasar los datos que necesiten para trabajar; lo entenderemos a fondo en la lección de funciones.",
    },
    {
      type: "image",
      src: "/img/dia-06/propiedades-metodos.svg",
      alt: "Una cadena con sus propiedades, que describen y se leen sin paréntesis, como length, y sus métodos, que son acciones que se llaman con paréntesis, como toUpperCase, trim, includes y split.",
      caption: "Propiedades describen; métodos actúan.",
    },

    // ───────────────────────── Crear cadenas ─────────────────────────
    { type: "heading", level: 2, text: "Crear cadenas de texto" },
    {
      type: "paragraph",
      text:
        "Una cadena de texto es una secuencia de caracteres encerrada entre comillas. Pueden ser comillas dobles (`\"…\"`) o comillas simples (`'…'`): no hay ninguna diferencia de funcionamiento. En la próxima lección veremos una tercera forma, las plantillas de texto con acento grave.",
    },
    {
      type: "paragraph",
      text:
        "Entonces, ¿cuáles usar? No hay un estándar único. Prettier, el formateador que vimos, elige la que requiere menos caracteres de escape y, si hay empate, usa comillas dobles por defecto (se puede cambiar con su opción `singleQuote`). La guía de estilo de Airbnb, en cambio, exige comillas simples. Lo importante es escoger una y ser consistente en todo el proyecto.",
    },
    {
      type: "paragraph",
      text:
        "También existe una forma «formal» de crear una cadena: `new String(\"hola\")`, con el operador `new`, que crea un objeto de un cierto tipo. Casi nadie la usa, y con razón: no produce una cadena primitiva sino un objeto envoltorio. MDN avisa de que rara vez debería usarse como constructor. En cambio, llamar a `String()` sin `new` sí es útil: convierte cualquier valor en una cadena primitiva.",
    },
    {
      type: "code",
      lang: "js",
      title: "Comillas y caracteres de escape",
      code: L(
        'const nombre = "Ana";',
        "const apellido = 'Pérez';",
        "",
        "// Si el texto contiene comillas, usa las otras o escápalas con \\",
        'const frase1 = "Dijo: \\"hola\\"";',
        "const frase2 = 'Dijo: \"hola\"';",
        "",
        "// Otros escapes habituales",
        'const dosLineas = "línea 1\\nlínea 2";   // \\n = salto de línea',
        'const ruta = "C:\\\\carpeta";               // \\\\ = una barra invertida',
      ),
    },
    {
      type: "playground",
      title: "Experimento 1 · Literales, constructor y String()",
      description:
        "Compara una cadena literal con el objeto que crea `new String`, y con la función `String()`.",
      code: L(
        'const nombre = "Ana";',
        "const apellido = 'Pérez';",
        'const saludo = new String("Hola mundo");   // objeto envoltorio: se evita',
        "",
        "// console.log admite varios argumentos separados por comas",
        "console.log(nombre, apellido, saludo.valueOf());",
        "console.log(typeof nombre, typeof saludo);",
        "console.log(String(42), typeof String(42));",
        'console.log("Dijo: \\"hola\\"");',
      ),
      expected: L(
        "Ana Pérez Hola mundo",
        "string object",
        "42 string",
        'Dijo: "hola"',
      ),
    },

    // ───────────────────────── length ─────────────────────────
    { type: "heading", level: 2, text: "La propiedad length" },
    {
      type: "paragraph",
      text:
        "Para saber cuántos caracteres tiene una cadena se usa su propiedad `length`. Se lee sin paréntesis, porque es una propiedad. Cada carácter ocupa una posición que empieza en 0, y el espacio en blanco también cuenta como carácter: `\"Hola mundo\"` tiene diez, no nueve.",
    },
    {
      type: "image",
      src: "/img/dia-06/cadena-indices.svg",
      alt: "La cadena Hola mundo con sus diez caracteres numerados del 0 al 9, incluido el espacio en la posición 4. La propiedad length vale 10.",
      caption: "Cada carácter tiene una posición que empieza en 0; el espacio también cuenta.",
    },
    {
      type: "callout",
      variant: "info",
      text:
        "Matiz importante: `length` no cuenta caracteres sino unidades de código UTF-16, y los emojis y algunos símbolos ocupan dos. Para letras latinas, cirílicas o los caracteres chinos habituales coincide con el número de caracteres, pero no siempre. Para contar caracteres (puntos de código) puedes usar `[...cadena].length`, y para contar lo que el usuario percibe como un carácter (por ejemplo, una familia de emojis) se usa `Intl.Segmenter`.",
    },
    {
      type: "playground",
      title: "Experimento 2 · Longitud y posiciones",
      description: "Predice cuántas unidades tiene un emoji antes de ejecutar.",
      code: L(
        'const saludo = "Hola mundo";',
        "console.log(saludo.length);             // el espacio también cuenta",
        "console.log(saludo[0], saludo.at(-1));  // primera y última letra",
        "",
        "// length cuenta unidades UTF-16, no siempre «letras»",
        'const emoji = "😀";',
        "console.log(emoji.length);",
        "console.log([...emoji].length);",
      ),
      expected: L("10", "H o", "2", "1"),
    },

    // ───────────────────────── Métodos ─────────────────────────
    { type: "heading", level: 2, text: "Algunos métodos importantes" },
    {
      type: "paragraph",
      text:
        "Veamos los métodos más comunes con casos reales. Piensa, por ejemplo, en una aplicación que te pide el correo electrónico: lo habitual es que se guarde en minúsculas, aunque la persona lo haya escrito en mayúsculas.",
    },
    {
      type: "table",
      caption: "Cinco métodos para empezar",
      headers: ["Método", "Qué hace", "Ejemplo", "Devuelve"],
      rows: [
        ["`toUpperCase()`", "Convierte todo el texto a mayúsculas.", "`\"Ana\".toUpperCase()`", "`\"ANA\"`"],
        ["`toLowerCase()`", "Convierte todo el texto a minúsculas.", "`\"Pérez\".toLowerCase()`", "`\"pérez\"`"],
        ["`includes(texto)`", "Indica si la cadena contiene el texto buscado (distingue mayúsculas de minúsculas).", "`\"Lorem ipsum\".includes(\"ipsum\")`", "`true`"],
        ["`trim()`", "Quita los espacios en blanco del inicio y del final.", "`\"  hola  \".trim()`", "`\"hola\"`"],
        ["`split(separador)`", "Parte la cadena por el separador y devuelve un arreglo.", "`\"a,b,c\".split(\",\")`", "`[\"a\", \"b\", \"c\"]`"],
      ],
    },
    {
      type: "paragraph",
      text:
        "`split` es muy útil cuando recibes una sola cadena con varios datos separados por un carácter: por ejemplo el nombre, el correo y el teléfono de una persona separados por comas, o un texto cuyas palabras están separadas por espacios. Un arreglo es una variable que contiene varios valores; los estudiaremos a fondo más adelante. Si usas el espacio como separador, cada palabra queda en una posición del arreglo.",
    },
    {
      type: "playground",
      title: "Experimento 3 · Los métodos en acción",
      description: "Cambia los textos, añade tus propias pruebas y vuelve a ejecutar.",
      code: L(
        'const nombre = "Ana";',
        'const apellido = "Pérez";',
        "console.log(nombre.toUpperCase(), apellido.toLowerCase());",
        "console.log(nombre);                       // la original no cambia",
        "",
        'const lorem = "  Lorem ipsum, dolor sit amet  ";',
        'console.log(lorem.includes("amet"));',
        'console.log(lorem.includes("Ana"));',
        'console.log("[" + lorem.trim() + "]");',
        "",
        'const palabras = lorem.trim().split(" ");',
        "console.log(palabras.length, palabras[0]);",
        'console.log("a,b,c".split(",").length);',
      ),
      expected: L(
        "ANA pérez",
        "Ana",
        "true",
        "false",
        "[Lorem ipsum, dolor sit amet]",
        "5 Lorem",
        "3",
      ),
    },
    {
      type: "callout",
      variant: "warning",
      text:
        "Sobre el correo electrónico en minúsculas: en la práctica, casi todos los proveedores ignoran las mayúsculas, y por eso muchas aplicaciones guardan o comparan el correo en minúsculas. Técnicamente, el estándar (RFC 5321) define la parte local (lo que va antes de la arroba) como sensible a mayúsculas, y el dominio no. Es una decisión de diseño que conviene tomar conscientemente. Y recuerda: transformar texto en el navegador no sustituye a validarlo en el servidor.",
    },

    // ───────────────────────── Inmutabilidad ─────────────────────────
    { type: "heading", level: 2, text: "Las cadenas no se modifican" },
    {
      type: "paragraph",
      text:
        "Una característica clave: las cadenas son inmutables. Una vez creada, no se puede cambiar. Los métodos como `toUpperCase()` o `trim()` no modifican la cadena original, sino que devuelven una cadena nueva. Si no guardas ese resultado en una variable, se pierde.",
    },
    {
      type: "image",
      src: "/img/dia-06/metodos-nueva-cadena.svg",
      alt: "Al llamar a toUpperCase sobre la cadena Ana se obtiene una cadena nueva ANA y la variable original sigue valiendo Ana. Para conservar el resultado hay que guardarlo en otra variable.",
      caption: "Un método de cadena produce un valor nuevo; la original no cambia.",
    },
    {
      type: "playground",
      title: "Experimento 4 · Inmutabilidad",
      description:
        "El último intento (cambiar una letra por posición) se ignora en silencio en modo normal y lanza un `TypeError` en modo estricto.",
      code: L(
        'const nombre = "Ana";',
        "nombre.toUpperCase();                // el resultado se descarta",
        "console.log(nombre);",
        "",
        "const grito = nombre.toUpperCase();   // aquí sí se guarda",
        "console.log(grito);",
        "",
        'let palabra = "casa";',
        'palabra[0] = "m";                     // se ignora: las cadenas no se modifican',
        "console.log(palabra);",
      ),
      expected: L("Ana", "ANA", "casa"),
    },

    // ───────────────────────── Más métodos ─────────────────────────
    { type: "heading", level: 2, text: "Otros métodos que encontrarás en MDN" },
    {
      type: "paragraph",
      text:
        "La documentación enumera decenas de métodos. Estos son algunos de los más usados; no hace falta memorizarlos, sino saber que existen y buscarlos cuando los necesites.",
    },
    {
      type: "table",
      caption: "Métodos habituales de cadenas",
      headers: ["Método", "Para qué sirve", "Ejemplo"],
      rows: [
        ["`slice(inicio, fin)`", "Extrae un fragmento de la cadena.", "`\"JavaScript\".slice(0, 4)` → `\"Java\"`"],
        ["`startsWith()` / `endsWith()`", "Comprueba cómo empieza o termina.", "`\"hola\".startsWith(\"ho\")` → `true`"],
        ["`indexOf(texto)`", "Posición de la primera coincidencia, o -1 si no existe.", "`\"banana\".indexOf(\"n\")` → `2`"],
        ["`replaceAll(a, b)`", "Reemplaza todas las coincidencias.", "`\"a-b-c\".replaceAll(\"-\", \"/\")` → `\"a/b/c\"`"],
        ["`padStart(largo, relleno)`", "Rellena al inicio hasta alcanzar un largo.", "`\"7\".padStart(3, \"0\")` → `\"007\"`"],
        ["`repeat(n)`", "Repite la cadena n veces.", "`\"ab\".repeat(3)` → `\"ababab\"`"],
      ],
    },
    {
      type: "callout",
      variant: "info",
      text:
        "Cada tipo de dato tiene sus propias propiedades y métodos. Con las cadenas nos falta una característica que llegó con ECMAScript 2015: las plantillas de texto (template strings), junto con la concatenación y la interpolación de variables. Las vemos en la próxima lección.",
    },

    // ───────────────────────── Datos que cambian ─────────────────────────
    { type: "heading", level: 2, text: "Datos que suelen aparecer desactualizados" },
    {
      type: "table",
      caption: "Material antiguo frente a información verificada",
      headers: ["Suele decirse", "Información verificada"],
      rows: [
        [
          "MDN es la documentación «no oficial» de Mozilla Developer Network.",
          "Hoy se llama MDN Web Docs y la mantienen Mozilla y una comunidad de colaboradores. La norma oficial del lenguaje es la especificación ECMA-262; MDN es la referencia práctica más usada.",
        ],
        [
          "Casi todo MDN está traducido al español y al día.",
          "El español es una de las versiones activas, pero las traducciones pueden ir por detrás del inglés, y MDN archivó muchos otros idiomas. La versión en inglés es la de referencia.",
        ],
        [
          "En MDN el rojo indica que algo va a eliminarse y el azul que es seguro.",
          "MDN usa insignias con nombre: Deprecated, Experimental y Non-standard. Ya no emplea el término «obsoleto».",
        ],
        [
          "En JavaScript todo es un objeto.",
          "Los primitivos no son objetos: el motor los envuelve temporalmente al acceder a sus propiedades o métodos.",
        ],
        [
          "`length` es el número de caracteres.",
          "Es el número de unidades de código UTF-16. Los emojis y algunos símbolos ocupan dos.",
        ],
        [
          "`new String(\"hola\")` es la forma formal de crear una cadena.",
          "Crea un objeto envoltorio (`typeof` da `\"object\"`). Se usan literales; `String()` sin `new` sirve para convertir valores.",
        ],
        [
          "Las comillas dobles son el estándar.",
          "No hay un estándar. Prettier elige la que requiere menos escapes y usa dobles en caso de empate; Airbnb exige simples. Sé consistente.",
        ],
        [
          "`substr()` es una forma de extraer texto.",
          "MDN recomienda evitarlo: usa `slice()` o `substring()`, que tienen un comportamiento más predecible.",
        ],
        [
          "Los correos siempre son sensibles a las mayúsculas.",
          "El estándar (RFC 5321) define la parte local como sensible a mayúsculas, pero en la práctica casi todos los proveedores la tratan sin distinguirlas, y el dominio nunca las distingue.",
        ],
      ],
    },

    // ───────────────────────── FAQ ─────────────────────────
    {
      type: "accordion",
      title: "Preguntas frecuentes de esta lección",
      items: [
        {
          title: "¿Por qué `\"hola\".length` funciona si una cadena no es un objeto?",
          text:
            "Porque al acceder a una propiedad de un primitivo, JavaScript lo envuelve temporalmente en un objeto `String`, lee la propiedad y descarta el envoltorio.",
        },
        {
          title: "¿Cómo convierto todo a mayúsculas respetando un idioma concreto?",
          text:
            "Existen `toLocaleUpperCase()` y `toLocaleLowerCase()`, que tienen en cuenta las reglas del idioma. Para la mayoría de los casos, `toUpperCase()` basta.",
        },
        {
          title: "¿`includes` distingue mayúsculas de minúsculas?",
          text:
            "Sí. Para una búsqueda sin distinguirlas, convierte antes ambos textos a minúsculas.",
        },
        {
          title: "¿Puedo cambiar una letra de una cadena por su posición?",
          text:
            "No: las cadenas son inmutables. Se crea una cadena nueva con métodos como `slice` o `replaceAll`.",
        },
        {
          title: "¿Qué hago si un método aparece como Deprecated en MDN?",
          text:
            "Busca la alternativa que recomienda la propia página y úsala en código nuevo. El método suele seguir funcionando, pero no es seguro que lo haga siempre.",
        },
        {
          title: "¿Cómo sé si puedo usar un método en el navegador de mis usuarios?",
          text:
            "Consulta la tabla de compatibilidad al final de la página de MDN: indica desde qué versión de cada navegador y de Node.js está disponible.",
        },
      ],
    },

    // ───────────────────────── Cierre ─────────────────────────
    { type: "heading", level: 2, text: "Cierre" },
    {
      type: "paragraph",
      text:
        "Ya sabes crear cadenas, medirlas, transformarlas y consultar la documentación cuando algo no esté en la lección. En la próxima veremos las plantillas de texto, la concatenación y la interpolación de variables.",
    },
    {
      type: "checklist",
      title: "Antes de pasar al Día 7, verifica que puedes explicar…",
      items: [
        "Qué es MDN Web Docs y cómo leer sus insignias y su tabla de compatibilidad.",
        "Por qué un valor primitivo puede tener propiedades y métodos aunque no sea un objeto.",
        "La diferencia entre una propiedad (sin paréntesis) y un método (con paréntesis).",
        "Cómo crear una cadena y por qué se evita `new String()`.",
        "Qué cuenta realmente `length` y cuál es la posición del primer carácter.",
        "Qué hacen `toUpperCase`, `toLowerCase`, `includes`, `trim` y `split`.",
        "Por qué las cadenas son inmutables y qué implica para guardar el resultado.",
      ],
    },
    { type: "heading", level: 3, text: "Fuentes consultadas (noviembre de 2026)" },
    {
      type: "list",
      items: [
        "[MDN: String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)",
        "[MDN: String.length](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/length)",
        "[MDN: constructor String()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/String)",
        "[MDN: String.prototype.substr()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/substr)",
        "[MDN: estructuras de datos de JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Data_structures)",
        "[MDN: Experimental, deprecated y obsolete](https://developer.mozilla.org/en-US/docs/MDN/Guidelines/Conventions_definitions)",
        "[MDN: localización (idiomas activos)](https://developer.mozilla.org/en-US/docs/MDN/Community/Translated_content)",
        "[Prettier: racionalidad (comillas)](https://prettier.io/docs/rationale)",
        "[Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)",
        "[RFC 5321: SMTP](https://www.rfc-editor.org/rfc/rfc5321)",
        "[Email address (Wikipedia)](https://en.wikipedia.org/wiki/Email_address)",
      ],
    },
  ],
  selfCheck: [
    {
      question: "¿Qué es MDN Web Docs?",
      options: [
        "El estándar oficial del lenguaje",
        "Una documentación de referencia mantenida por Mozilla y una comunidad, que explica JavaScript, HTML y CSS con ejemplos",
        "Un editor de código",
        "Un navegador",
      ],
      correctIndex: 1,
      explanation:
        "MDN es la referencia práctica más usada. La norma oficial de JavaScript es la especificación ECMA-262.",
    },
    {
      question: "En MDN, ¿qué indica la insignia «Deprecated»?",
      options: [
        "Que la característica es nueva y estable",
        "Que ya no se recomienda y conviene evitarla en código nuevo",
        "Que solo funciona en Firefox",
        "Que está traducida al español",
      ],
      correctIndex: 1,
      explanation:
        "Deprecated marca algo que ya no se recomienda; puede eliminarse en el futuro o mantenerse solo por compatibilidad.",
    },
    {
      question: "¿Cuál es la diferencia práctica entre una propiedad y un método?",
      options: [
        "No hay ninguna",
        "La propiedad describe al valor y se lee sin paréntesis; el método es una acción y se llama con paréntesis",
        "Los métodos solo existen en los números",
        "Las propiedades siempre cambian el valor",
      ],
      correctIndex: 1,
      explanation:
        "Por ejemplo `texto.length` es una propiedad y `texto.toUpperCase()` es un método.",
    },
    {
      question: "¿Por qué `\"hola\".length` funciona si una cadena primitiva no es un objeto?",
      options: [
        "Porque JavaScript la convierte para siempre en objeto",
        "Porque el motor la envuelve temporalmente en un objeto String para leer la propiedad",
        "Porque `length` es una palabra reservada",
        "En realidad no funciona",
      ],
      correctIndex: 1,
      explanation:
        "Es el mecanismo de envoltura automática de los primitivos.",
    },
    {
      question: "¿Qué devuelve `typeof new String(\"hola\")`?",
      options: ["\"string\"", "\"object\"", "\"text\"", "undefined"],
      correctIndex: 1,
      explanation:
        "El constructor con `new` crea un objeto envoltorio, no una cadena primitiva. Por eso se usan literales.",
    },
    {
      question: "¿Cuánto vale `\"Hola mundo\".length`?",
      options: ["9", "10", "11", "2"],
      correctIndex: 1,
      explanation:
        "Son nueve letras más un espacio, y el espacio también cuenta.",
    },
    {
      question: "Con `const nombre = \"Ana\"; nombre.toUpperCase();`, ¿cuánto vale `nombre` después?",
      options: ["\"ANA\"", "\"Ana\"", "undefined", "Da error por ser const"],
      correctIndex: 1,
      explanation:
        "Las cadenas son inmutables: `toUpperCase()` devuelve una cadena nueva y la original no cambia. Si no guardas el resultado, se pierde.",
    },
    {
      question: "¿Qué devuelve `\"Lorem ipsum\".includes(\"ipsum\")`?",
      options: ["La posición 6", "El texto \"ipsum\"", "true", "Un arreglo"],
      correctIndex: 2,
      explanation:
        "`includes` devuelve un booleano: `true` si la cadena contiene el texto buscado.",
    },
    {
      question: "¿Qué devuelve `\"a,b,c\".split(\",\")`?",
      options: ["Una cadena nueva", "Un número", "Un arreglo con tres elementos", "undefined"],
      correctIndex: 2,
      explanation:
        "`split` parte la cadena por el separador y devuelve un arreglo: [\"a\", \"b\", \"c\"].",
    },
    {
      question: "¿Qué hay que hacer con `substr()`?",
      options: [
        "Usarlo siempre porque es el más rápido",
        "Evitarlo y usar `slice()` o `substring()`, según recomienda MDN",
        "Reemplazarlo por `new String()`",
        "Nada: es obligatorio",
      ],
      correctIndex: 1,
      explanation:
        "MDN anima a evitar `substr()`; `slice()` y `substring()` son las alternativas con un comportamiento más predecible.",
    },
  ],
};
