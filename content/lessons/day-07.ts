import type { Lesson } from "@/lib/types";

// Une líneas de código sin tener que escapar backticks ni `${}` dentro de template literals.
const L = (...lines: string[]) => lines.join("\n");

// Contenido validado contra fuentes actuales en noviembre de 2026 (ver sección "Fuentes").
export const day07: Lesson = {
  day: 7,
  slug: "concatenacion-interpolacion-plantillas",
  title: "Concatenación, interpolación y plantillas de texto",
  section: "Tipos de datos básicos",
  estimatedMinutes: 45,
  icon: "🧩",
  objectives: [
    "Unir cadenas con el operador `+` y con `+=`, y reconocer sus trampas con números",
    "Interpolar valores y expresiones dentro de una plantilla de texto con acento grave y `${ }`",
    "Escribir texto en varias líneas y generar HTML legible con plantillas",
    "Entender qué texto produce cada tipo de valor al interpolarlo",
    "Reconocer el riesgo de XSS al mezclar datos de usuario con HTML y cómo evitarlo",
  ],
  blocks: [
    // ───────────────────────── Apertura ─────────────────────────
    {
      type: "paragraph",
      text:
        "En la lección anterior vimos las cadenas de texto, sus propiedades y sus métodos. Hoy vemos dos características más: la concatenación y la interpolación. Sirven para construir mensajes que cambian según lo que haga el usuario, como un aviso de error de inicio de sesión que dice «el correo ana@ejemplo.com no existe en nuestra base de datos», donde el texto es genérico y solo cambia el dato.",
    },
    {
      type: "keyFacts",
      items: [
        { value: "+", label: "Operador de concatenación (y de suma, según los operandos)" },
        { value: "`  `", label: "Acento grave: delimita una plantilla de texto" },
        { value: "${ }", label: "Marcador donde se inserta el valor de una expresión" },
        { value: "ES2015", label: "Año en que llegaron las plantillas de texto" },
        { value: "Multilínea", label: "Las plantillas conservan saltos de línea y sangría" },
        { value: "XSS", label: "El riesgo de insertar datos de usuario como HTML" },
      ],
    },
    {
      type: "callout",
      variant: "success",
      text:
        "Contenido verificado en noviembre de 2026 con MDN Web Docs, las guías de OWASP y la documentación de Trusted Types de Chrome. Al final hay una tabla con datos que suelen aparecer desactualizados y la lista de fuentes.",
    },

    // ───────────────────────── Concatenar ─────────────────────────
    { type: "heading", level: 2, text: "Concatenar: unir cadenas con +" },
    {
      type: "paragraph",
      text:
        "Concatenar significa unir una cadena de texto con otra cadena o con una variable de tipo string. Se hace con el operador de suma `+`. Imagina dos variables, `nombre` y `apellido`, y que quieres construir un saludo. Tienes que cuidar los detalles: si quieres un espacio entre el nombre y el apellido, debes concatenarlo tú, y si quieres terminar con un punto, también.",
    },
    {
      type: "code",
      lang: "js",
      title: "Concatenación con +",
      code: L(
        'const nombre = "Ana";',
        'const apellido = "Pérez";',
        "",
        "// Cada trozo se une con +, y los espacios los pones tú",
        'const saludo = "Hola, mi nombre es " + nombre + " " + apellido + ".";',
        "console.log(saludo); // Hola, mi nombre es Ana Pérez.",
        "",
        "// Un mensaje que cambia según el dato",
        'const correo = "ana@ejemplo.com";',
        'console.log("El correo " + correo + " no existe en nuestra base de datos.");',
      ),
    },
    {
      type: "paragraph",
      text:
        "Funciona, pero es incómodo: hay que abrir y cerrar comillas todo el tiempo, y es fácil olvidar un espacio. Además hay un detalle importante. Como vimos al hablar del tipado débil, el operador `+` hace dos cosas distintas: suma números y concatena texto. Si uno de los operandos es una cadena, concatena; si no, suma. Eso produce resultados que sorprenden cuando se mezclan números y texto.",
    },
    {
      type: "playground",
      title: "Experimento 1 · El operador + con texto y números",
      description: "Predice cada resultado antes de ejecutar. Se evalúa de izquierda a derecha.",
      code: L(
        'console.log("5" + 3);        // texto + número',
        'console.log("5" - 3);        // resta: convierte a número',
        'console.log(1 + 2 + "3");    // primero suma, luego concatena',
        'console.log("1" + 2 + 3);    // desde el principio concatena',
        'console.log("Total: " + (2 + 3));',
      ),
      expected: L("53", "2", "33", "123", "Total: 5"),
    },
    {
      type: "callout",
      variant: "warning",
      text:
        "Consejo: cuando mezcles números con texto, convierte o agrupa de forma explícita (por ejemplo con paréntesis). Y si el valor viene de un campo de formulario, recuerda que siempre llega como texto: `\"2\" + \"3\"` da `\"23\"`, no 5.",
    },

    // ───────────────────────── Acumular con += ─────────────────────────
    { type: "heading", level: 3, text: "Acumular con +=" },
    {
      type: "paragraph",
      text:
        "Cuando quieres añadir texto al final de una variable que ya tienes, puedes usar el operador `+=`: es una forma abreviada de «toma lo que valga la variable y agrégale lo que viene». Hay que usar `let`, porque se reasigna la variable. Esta técnica de concatenación es la que veremos en acción al generar HTML más abajo.",
    },
    {
      type: "code",
      lang: "js",
      title: "El operador +=",
      code: L(
        'let mensaje = "Hola";',
        'mensaje += ", ";            // mensaje = mensaje + ", "',
        'mensaje += "mundo";',
        "console.log(mensaje);       // Hola, mundo",
      ),
    },

    // ───────────────────────── Interpolar ─────────────────────────
    { type: "heading", level: 2, text: "Interpolar con plantillas de texto" },
    {
      type: "paragraph",
      text:
        "Interpolar significa insertar dentro de una cadena, de forma dinámica, el valor de una variable o de una expresión. Para eso existen las plantillas de texto (template literals, también llamadas template strings), que llegaron con ECMAScript 2015. En lugar de comillas, se delimitan con el acento grave (también llamado backtick o acento invertido), y los valores se insertan con el marcador `${ }`.",
    },
    {
      type: "image",
      src: "/img/dia-07/anatomia-plantilla.svg",
      alt: "Una plantilla de texto empieza y termina con acento grave, mezcla texto fijo con marcadores con la forma dólar y llaves que se sustituyen por el valor de una expresión, y produce una sola cadena.",
      caption: "Texto fijo + marcadores ${ } = una sola cadena.",
    },
    {
      type: "paragraph",
      text:
        "Fíjate en que no es el acento normal del español (la tilde), sino el acento grave. En qué tecla se encuentra depende de la distribución de tu teclado: en muchos es una tecla propia, en otros se obtiene con Alt Gr. Si no la encuentras, busca «acento grave» junto al nombre de tu teclado. Tu editor de código suele colorear de forma distinta lo que va dentro de `${ }`, lo que ayuda a distinguirlo del texto.",
    },
    {
      type: "playground",
      title: "Experimento 2 · Concatenar o interpolar",
      description: "Los dos saludos son idénticos. Compara cómo se escribe cada uno.",
      code: L(
        'const nombre = "Ana";',
        'const apellido = "Pérez";',
        "",
        'const saludo1 = "Hola, mi nombre es " + nombre + " " + apellido + ".";',
        "const saludo2 = `Hola, mi nombre es ${nombre} ${apellido}.`;",
        "",
        "console.log(saludo1);",
        "console.log(saludo2);",
        "console.log(saludo1 === saludo2);",
      ),
      expected: L(
        "Hola, mi nombre es Ana Pérez.",
        "Hola, mi nombre es Ana Pérez.",
        "true",
      ),
    },
    {
      type: "paragraph",
      text:
        "La versión con plantilla es más declarativa y más natural de leer: se parece al texto que producirá, sin la cadena de comillas y signos `+` que puede resultar confusa. Y dentro de `${ }` no solo caben variables: puedes poner cualquier expresión, como una operación, una condición con el operador ternario o la llamada a un método.",
    },
    {
      type: "playground",
      title: "Experimento 3 · Expresiones dentro de ${ }",
      description: "Cualquier expresión vale: operaciones, condiciones y llamadas a métodos.",
      code: L(
        "const a = 5;",
        "const b = 10;",
        "const edad = 20;",
        "",
        "console.log(`${a} + ${b} = ${a + b}`);",
        "console.log(`2a + b = ${2 * a + b}`);",
        'console.log(`Es ${edad >= 18 ? "mayor" : "menor"} de edad`);',
        'console.log(`En mayúsculas: ${"hola".toUpperCase()}`);',
      ),
      expected: L(
        "5 + 10 = 15",
        "2a + b = 20",
        "Es mayor de edad",
        "En mayúsculas: HOLA",
      ),
    },
    {
      type: "heading",
      level: 3,
      text: "Qué texto produce cada valor",
    },
    {
      type: "paragraph",
      text:
        "Lo que va dentro de `${ }` se convierte en texto. Con números y booleanos el resultado es el esperable, pero con un arreglo o con un objeto puede sorprender: un objeto normal se convierte en `[object Object]`. Para mostrar el contenido de un objeto hay que construir el texto a mano o usar `JSON.stringify()`.",
    },
    {
      type: "playground",
      title: "Experimento 4 · Cómo se convierten los valores",
      description: "Observa qué texto aparece al interpolar distintos tipos de valor.",
      code: L(
        "console.log(`Arreglo: ${[1, 2, 3]}`);",
        "console.log(`Objeto: ${{ a: 1 }}`);",
        "console.log(`JSON: ${JSON.stringify({ a: 1 })}`);",
        "console.log(`Nulo e indefinido: ${null} ${undefined}`);",
        "console.log(`Booleano: ${3 > 2}`);",
      ),
      expected: L(
        "Arreglo: 1,2,3",
        "Objeto: [object Object]",
        'JSON: {"a":1}',
        "Nulo e indefinido: null undefined",
        "Booleano: true",
      ),
    },
    {
      type: "image",
      src: "/img/dia-07/comparar-comillas.svg",
      alt: "Comparación de comillas dobles, comillas simples y acento grave: solo el acento grave permite insertar valores con dólar y llaves, escribir en varias líneas sin escapes y usar etiquetas de plantilla; las comillas dobles y simples requieren escapar la propia comilla, y el acento grave solo si el texto lleva un acento grave.",
      caption: "Tres formas de escribir una cadena y lo que permite cada una.",
    },
    {
      type: "code",
      lang: "js",
      title: "Escapes en las plantillas",
      code: L(
        "// Para escribir un acento grave literal, escápalo con \\",
        "console.log(`Usa el acento grave \\` para plantillas`);",
        "",
        "// Para escribir ${ literalmente, escapa el dólar",
        "console.log(`El marcador se escribe \\${ }`);",
      ),
    },
    {
      type: "callout",
      variant: "info",
      text:
        "Hay una diferencia sutil entre las dos formas: una plantilla convierte directamente cada expresión a texto, mientras que el operador `+` primero convierte los operandos a valores primitivos. En el uso del día a día el resultado es el mismo. Existe, además, una forma avanzada llamada «etiquetas de plantilla» (tagged templates), que permite procesar una plantilla con una función; no la necesitas por ahora.",
    },

    // ───────────────────────── HTML dinámico ─────────────────────────
    { type: "heading", level: 2, text: "Generar HTML dinámicamente" },
    {
      type: "paragraph",
      text:
        "Más adelante, cuando lleguemos al DOM (la representación del documento HTML que los navegadores ofrecen a JavaScript), vamos a necesitar generar código HTML dinámicamente. Es el caso de, por ejemplo, una lista de viñetas con las estaciones del año. Conviene ver desde ahora por qué las plantillas ayudan tanto en ese trabajo.",
    },
    {
      type: "paragraph",
      text:
        "Con comillas normales, el HTML tiene que quedar en una sola línea de código. Si escribes el HTML con su sangría y saltos de línea dentro de una cadena entre comillas, el editor marca un error: una cadena normal no admite saltos de línea sin más. (Se puede continuar una cadena en la línea siguiente terminando la línea con una barra invertida `\\`, pero entonces el texto queda unido, y no es nada cómodo.) La alternativa con comillas es ir añadiendo trozos con `+=`.",
    },
    {
      type: "image",
      src: "/img/dia-07/html-dinamico.svg",
      alt: "Con concatenación y más igual, el HTML se genera trozo a trozo y el resultado queda todo de corrido, sin sangría. Con una plantilla de texto el código se escribe en varias líneas con su sangría, y el resultado la conserva.",
      caption: "El mismo HTML con concatenación y con una plantilla.",
    },
    {
      type: "playground",
      title: "Experimento 5 · HTML con concatenación (+=)",
      description:
        "El resultado sale «de corrido»: los saltos y la sangría que ponemos en el código no pasan al texto.",
      code: L(
        'let lista = "<ul>";',
        'lista += "<li>Primavera</li>";',
        'lista += "<li>Verano</li>";',
        'lista += "<li>Otoño</li>";',
        'lista += "<li>Invierno</li>";',
        'lista += "</ul>";',
        "",
        "console.log(lista);",
      ),
      expected:
        "<ul><li>Primavera</li><li>Verano</li><li>Otoño</li><li>Invierno</li></ul>",
    },
    {
      type: "paragraph",
      text:
        "Las plantillas resuelven el problema: permiten saltos de línea y respetan la sangría tal cual la escribes, de modo que puedes escribir el HTML ordenado, como lo harías en un archivo HTML, sin ningún carácter de escape. Para quien programa es mucho más cómodo, sobre todo cuando la estructura es compleja y tiene muchas líneas.",
    },
    {
      type: "playground",
      title: "Experimento 6 · HTML con una plantilla",
      description: "Mismo HTML, en varias líneas y con valores insertados por interpolación.",
      code: L(
        'const estaciones = ["Primavera", "Verano", "Otoño", "Invierno"];',
        "",
        "const lista = `<ul>",
        "  <li>${estaciones[0]}</li>",
        "  <li>${estaciones[1]}</li>",
        "  <li>${estaciones[2]}</li>",
        "  <li>${estaciones[3]}</li>",
        "</ul>`;",
        "",
        "console.log(lista);",
        'console.log("Líneas:", lista.split("\\n").length);',
      ),
      expected: L(
        "<ul>",
        "  <li>Primavera</li>",
        "  <li>Verano</li>",
        "  <li>Otoño</li>",
        "  <li>Invierno</li>",
        "</ul>",
        "Líneas: 6",
      ),
    },
    {
      type: "callout",
      variant: "info",
      text:
        "Las bibliotecas y frameworks orientados a componentes (React, Angular, Vue, Svelte y otros) generan HTML dinámicamente con su propia sintaxis, pero con JavaScript nativo esto se puede hacer precisamente con plantillas de texto. Y cuando un valor es un número o una fecha, no dependas de la conversión automática: existen `toFixed()` y `Intl.NumberFormat` para darles el formato adecuado.",
    },

    // ───────────────────────── Seguridad ─────────────────────────
    { type: "heading", level: 2, text: "Cuidado: datos de usuario dentro de HTML" },
    {
      type: "paragraph",
      text:
        "Hay un riesgo que conviene conocer desde el principio. Si el texto que insertas en una plantilla de HTML lo escribió un usuario (un comentario, un nombre, un parámetro de la dirección) y lo asignas a la página como HTML, un atacante puede escribir etiquetas con código dentro. Es el ataque conocido como XSS (cross-site scripting). MDN señala que `innerHTML` es probablemente el vector más común de este tipo de ataques.",
    },
    {
      type: "image",
      src: "/img/dia-07/xss-innerhtml.svg",
      alt: "Un texto de usuario con una etiqueta img y un controlador onerror se coloca en una plantilla. Con innerHTML el navegador lo interpreta como HTML y se ejecuta el código (ataque XSS). Con textContent se muestra como texto plano y es seguro. Para HTML legítimo hay que sanear con una biblioteca como DOMPurify y activar Trusted Types.",
      caption: "El mismo dato es inofensivo como texto y peligroso como HTML.",
    },
    {
      type: "list",
      items: [
        "Si el contenido es texto plano, muéstralo con `textContent`: el navegador no lo interpreta como HTML.",
        "Si necesitas insertar HTML legítimo, sanéalo antes con una biblioteca especializada (por ejemplo, DOMPurify) y apóyate en Trusted Types y en una política de seguridad de contenido (CSP).",
        "Si generas HTML a mano con plantillas, escapa los caracteres especiales de cada dato que no controles.",
        "Los frameworks modernos suelen escapar automáticamente el texto que interpolas; es una de sus ventajas.",
      ],
    },
    {
      type: "playground",
      title: "Experimento 7 · Escapar el HTML",
      description:
        "Sustituir los caracteres especiales evita que el navegador interprete el texto como etiquetas. Aquí solo se imprime texto: no se ejecuta nada.",
      code: L(
        "function escaparHTML(texto) {",
        "  return texto",
        '    .replaceAll("&", "&amp;")',
        '    .replaceAll("<", "&lt;")',
        '    .replaceAll(">", "&gt;")',
        "    .replaceAll('\"', \"&quot;\")",
        '    .replaceAll("\'", "&#39;");',
        "}",
        "",
        'const comentario = "<img src=x onerror=robar()>";',
        "",
        "console.log(`<p>${comentario}</p>`);",
        "console.log(`<p>${escaparHTML(comentario)}</p>`);",
      ),
      expected: L(
        "<p><img src=x onerror=robar()></p>",
        "<p>&lt;img src=x onerror=robar()&gt;</p>",
      ),
    },
    {
      type: "callout",
      variant: "warning",
      text:
        "Una función de escape casera sirve para entender la idea, pero en proyectos reales es preferible apoyarse en `textContent`, en las protecciones del framework o en una biblioteca de saneamiento mantenida. Y recuerda: validar y sanear también debe hacerse en el servidor, no solo en el navegador.",
    },

    // ───────────────────────── Datos que cambian ─────────────────────────
    { type: "heading", level: 2, text: "Datos que suelen aparecer desactualizados" },
    {
      type: "table",
      caption: "Material antiguo frente a información verificada",
      headers: ["Suele decirse", "Información verificada"],
      rows: [
        [
          "Las plantillas de texto son una novedad.",
          "Llegaron con ECMAScript 2015 y hoy son una característica estándar y soportada por todos los motores actuales.",
        ],
        [
          "Esa comilla se llama «acento invertido».",
          "Su nombre habitual es acento grave (en inglés, backtick). No es la tilde del español.",
        ],
        [
          "Con comillas normales el texto tiene que ir siempre en una sola línea.",
          "Una cadena normal no admite saltos de línea sueltos, pero puedes continuar la línea terminando con una barra invertida (`\\`) o usar `\\n`. Con una plantilla los saltos se escriben tal cual.",
        ],
        [
          "Concatenar con `+` y usar una plantilla son exactamente lo mismo.",
          "El resultado suele coincidir, pero la plantilla convierte las expresiones directamente a texto y `+` convierte antes a valores primitivos. Además, `+` suma si ambos operandos son números.",
        ],
        [
          "Para generar HTML basta con asignar la plantilla a `innerHTML`.",
          "MDN advierte de que `innerHTML` es un vector habitual de XSS cuando recibe datos de usuario. Usa `textContent` para texto plano o sanea el HTML.",
        ],
        [
          "Interpolar un objeto muestra su contenido.",
          "Un objeto normal se convierte en `[object Object]`. Usa `JSON.stringify()` o construye el texto.",
        ],
      ],
    },

    // ───────────────────────── FAQ ─────────────────────────
    {
      type: "accordion",
      title: "Preguntas frecuentes de esta lección",
      items: [
        {
          title: "¿Cuándo uso `+` y cuándo una plantilla?",
          text:
            "Para unir dos trozos muy simples, `+` basta. En cuanto haya varios valores, expresiones o varias líneas, la plantilla es más legible y menos propensa a errores de espacios y comillas.",
        },
        {
          title: "¿Puedo anidar una plantilla dentro de otra?",
          text:
            "Sí, dentro de `${ }` puedes escribir otra plantilla con sus propios acentos graves. Es útil para textos condicionales, pero no abuses: hazlo solo cuando mejore la legibilidad.",
        },
        {
          title: "¿Por qué mi `\"2\" + \"3\"` da 23?",
          text:
            "Porque ambos operandos son texto y `+` concatena. Para sumar hay que convertir antes a número, algo que veremos al estudiar los números.",
        },
        {
          title: "¿Las plantillas son más lentas que la concatenación?",
          text:
            "En la práctica la diferencia es irrelevante para un uso normal y los motores modernos optimizan ambas formas. Elige por legibilidad. Si construyes un texto muy grande dentro de un bucle, suele acumularse en un arreglo y unirse al final con `join()`.",
        },
        {
          title: "¿Qué es una etiqueta de plantilla (tagged template)?",
          text:
            "Una función colocada justo antes de la plantilla que recibe sus partes y puede procesarlas. Es una función avanzada y la veremos más adelante, si procede.",
        },
        {
          title: "¿`textContent` o `innerHTML`?",
          text:
            "`textContent` para texto plano, siempre que sea posible. `innerHTML` solo cuando necesitas HTML y estás seguro de que el contenido es de confianza o ha sido saneado.",
        },
      ],
    },

    // ───────────────────────── Cierre ─────────────────────────
    { type: "heading", level: 2, text: "Cierre" },
    {
      type: "paragraph",
      text:
        "Con la concatenación, la interpolación y las plantillas de texto ya puedes construir mensajes dinámicos y HTML legible. En la próxima lección continuamos con el siguiente tipo de dato básico.",
    },
    {
      type: "checklist",
      title: "Antes de pasar al Día 8, verifica que puedes explicar…",
      items: [
        "Qué es concatenar y por qué `\"1\" + 2 + 3` y `1 + 2 + \"3\"` dan resultados distintos.",
        "Cómo se acumula texto con `+=` y por qué hay que usar `let`.",
        "Cómo escribir una plantilla con acento grave y `${ }`, y qué puede ir dentro de las llaves.",
        "Qué texto producen un arreglo, un objeto, `null` y `undefined` al interpolarlos.",
        "Qué ventajas tienen las plantillas para escribir varias líneas y generar HTML.",
        "Qué es un ataque XSS y cuándo usar `textContent` en lugar de `innerHTML`.",
      ],
    },
    { type: "heading", level: 3, text: "Fuentes consultadas (noviembre de 2026)" },
    {
      type: "list",
      items: [
        "[MDN: Template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)",
        "[MDN: Operador de adición (+)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Addition)",
        "[MDN: Element.innerHTML (consideraciones de seguridad)](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML)",
        "[MDN: Node.textContent](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent)",
        "[MDN: String.prototype.replaceAll()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replaceAll)",
        "[OWASP: Cross Site Scripting Prevention](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)",
        "[OWASP: DOM based XSS Prevention](https://cheatsheetseries.owasp.org/cheatsheets/DOM_based_XSS_Prevention_Cheat_Sheet.html)",
        "[Chrome: Prevent DOM-based XSS with Trusted Types](https://developer.chrome.com/docs/modern-web-guidance/guides/security/trusted-types)",
      ],
    },
  ],
  selfCheck: [
    {
      question: "¿Qué es concatenar?",
      options: [
        "Dividir una cadena en partes",
        "Unir una cadena con otra cadena o con una variable de texto",
        "Convertir una cadena a mayúsculas",
        "Contar los caracteres de una cadena",
      ],
      correctIndex: 1,
      explanation:
        "Concatenar es unir texto, normalmente con el operador `+`.",
    },
    {
      question: "¿Qué devuelve `1 + 2 + \"3\"`?",
      options: ["\"123\"", "\"33\"", "6", "Un error"],
      correctIndex: 1,
      explanation:
        "Se evalúa de izquierda a derecha: 1 + 2 suma 3, y después 3 + \"3\" concatena y da \"33\".",
    },
    {
      question: "¿Qué devuelve `\"1\" + 2 + 3`?",
      options: ["6", "\"15\"", "\"123\"", "\"33\""],
      correctIndex: 2,
      explanation:
        "Como el primer operando es texto, `+` concatena desde el principio: \"1\" + 2 = \"12\" y \"12\" + 3 = \"123\".",
    },
    {
      question: "¿Qué hace `mensaje += \"mundo\"`?",
      options: [
        "Resta el texto",
        "Añade \"mundo\" al final del valor actual de `mensaje` (la variable debe poder reasignarse)",
        "Crea una constante",
        "Compara dos cadenas",
      ],
      correctIndex: 1,
      explanation:
        "`+=` es la abreviatura de `mensaje = mensaje + \"mundo\"`, por lo que la variable debe declararse con `let`.",
    },
    {
      question: "¿Con qué carácter se delimita una plantilla de texto?",
      options: [
        "Comillas dobles",
        "Comillas simples",
        "Acento grave (backtick)",
        "La tilde del español",
      ],
      correctIndex: 2,
      explanation:
        "Las plantillas usan el acento grave y los marcadores `${ }`; no es la tilde del español.",
    },
    {
      question: "¿Qué muestra `${{ a: 1 }}` dentro de una plantilla?",
      options: ["{ a: 1 }", "a: 1", "[object Object]", "undefined"],
      correctIndex: 2,
      explanation:
        "Un objeto normal se convierte en el texto \"[object Object]\". Para ver su contenido se usa `JSON.stringify()`.",
    },
    {
      question: "¿Qué ventaja tienen las plantillas al escribir HTML?",
      options: [
        "Hacen que el HTML sea más seguro automáticamente",
        "Permiten varias líneas y respetan la sangría sin escapes",
        "Evitan tener que usar variables",
        "Solo funcionan en Node.js",
      ],
      correctIndex: 1,
      explanation:
        "Los saltos de línea se conservan tal cual. Pero no son más seguras: los datos de usuario hay que escaparlos o sanearlos igualmente.",
    },
    {
      question: "¿Qué debes usar para mostrar un texto escrito por un usuario como texto plano, sin que se interprete como HTML?",
      options: ["innerHTML", "textContent", "eval", "document.write"],
      correctIndex: 1,
      explanation:
        "`textContent` inserta texto sin interpretarlo como HTML, así que evita el XSS en ese caso.",
    },
    {
      question: "¿Qué es un ataque XSS?",
      options: [
        "Una forma de acelerar el código",
        "Inyectar código en una página a través de datos que se tratan como HTML sin sanear",
        "Un error de sintaxis",
        "Un tipo de variable",
      ],
      correctIndex: 1,
      explanation:
        "En el cross-site scripting, un atacante consigue que el navegador ejecute su código porque un dato no confiable se insertó como HTML.",
    },
    {
      question: "¿Desde qué versión del estándar existen las plantillas de texto?",
      options: ["ECMAScript 5", "ECMAScript 2015", "ECMAScript 2020", "Siempre existieron"],
      correctIndex: 1,
      explanation:
        "Las plantillas de texto llegaron con ECMAScript 2015 (ES6), junto con `let` y `const`.",
    },
  ],
};
