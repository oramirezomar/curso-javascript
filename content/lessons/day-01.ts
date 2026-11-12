import type { Lesson } from "@/lib/types";

// Une líneas de código sin tener que escapar backticks ni `${}` dentro de template literals.
const L = (...lines: string[]) => lines.join("\n");

// Contenido validado contra fuentes actuales en noviembre de 2026 (ver sección "Fuentes").
export const day01: Lesson = {
  day: 1,
  slug: "introduccion-historia-javascript",
  title: "Introducción a JavaScript: origen, evolución y el enfoque moderno del curso",
  section: "Introducción y contexto",
  estimatedMinutes: 35,
  icon: "🧭",
  objectives: [
    "Conocer quién creó JavaScript, cuándo y para qué, y por qué no tiene relación con Java",
    "Ubicar en una línea de tiempo las versiones de ECMAScript y entender por qué ES2015 (ES6) marca un antes y un después",
    "Entender el problema cross-browser que resolvió jQuery y cómo Node.js, los frameworks y los navegadores modernos cambiaron el ecosistema",
    "Comprender el enfoque del curso: bases del lenguaje con las características modernas desde el primer día (`let`/`const` y arrow functions)",
    "Ejecutar tus primeras líneas de JavaScript en el editor interactivo de la lección",
  ],
  blocks: [
    // ───────────────────────── Bienvenida ─────────────────────────
    {
      type: "paragraph",
      text:
        "Bienvenido al curso de JavaScript. Empezamos totalmente desde las bases, pero con todas las actualizaciones que el lenguaje ha recibido en los últimos años. Gracias a esos avances, a JavaScript se le han ido agregando características que lo hacen cada vez mejor como lenguaje de programación.",
    },
    {
      type: "paragraph",
      text:
        "En muchos cursos se enseña primero el JavaScript «viejo» y solo al final se agregan las características nuevas. Para quien está entrando hoy al mundo de la web, lo más útil es adquirir esas características desde el principio, es decir, las que existen desde ECMAScript 2015 (también llamado ES6). Por eso este curso va orientado desde las bases, pero con todas las actualizaciones recibidas hasta el momento.",
    },
    {
      type: "paragraph",
      text:
        "Esta primera lección es introductoria: repasa los puntos importantes para tener contexto de cómo llegó JavaScript hasta hoy. A partir de la siguiente lección cada concepto queda englobado en una unidad corta, para que avances a tu ritmo.",
    },
    {
      type: "keyFacts",
      items: [
        { value: "1995", label: "Nace JavaScript (más de 30 años de historia)" },
        { value: "~10 días", label: "Lo que tardó el primer prototipo, en mayo de 1995" },
        { value: "2009", label: "ES5 y el nacimiento de Node.js" },
        { value: "2015", label: "ES2015 (ES6): cambia el ritmo del lenguaje" },
        { value: "1 por año", label: "Ediciones del estándar desde 2015, aprobadas en junio" },
        { value: "ES2026", label: "Edición 17, aprobada el 30 de junio de 2026" },
      ],
    },
    {
      type: "callout",
      variant: "success",
      text:
        "Contenido verificado en noviembre de 2026 contra fuentes oficiales y de referencia (Ecma International, el blog de jQuery, Node.js, Adobe, Microsoft y los registros de lanzamiento de los navegadores). Al final de la lección hay una tabla con datos que suelen aparecer desactualizados o incorrectos en materiales antiguos.",
    },

    // ───────────────────────── Origen ─────────────────────────
    { type: "heading", level: 2, text: "El origen: Brendan Eich y Netscape" },
    {
      type: "image",
      src: "/img/dia-01/origen-netscape.svg",
      alt: "Diagrama: Netscape Navigator compite con Internet Explorer; Brendan Eich crea el primer prototipo de JavaScript en unos 10 días de mayo de 1995 para hacer páginas dinámicas.",
      caption: "JavaScript nace en 1995 dentro de Netscape para dar dinamismo al navegador.",
    },
    {
      type: "paragraph",
      text:
        "JavaScript fue creado en 1995 por Brendan Eich. En los años noventa Eich trabajaba en Netscape, una empresa que hoy ya no existe como tal: fue adquirida por AOL a finales de los noventa y su código dio origen al proyecto Mozilla. Su producto era el navegador Netscape Navigator, que competía en esa época con Internet Explorer.",
    },
    {
      type: "paragraph",
      text:
        "Netscape necesitaba una tecnología que pudiera implementar en el navegador para hacer cosas dinámicas: reaccionar a botones, validar y enviar formularios junto con el HTML y, en general, darle interactividad a las páginas.",
    },
    {
      type: "paragraph",
      text:
        "Eich construyó el primer prototipo en unos diez días de mayo de 1995, para cumplir el calendario de la versión beta de Navigator 2.0. Esa velocidad es parte de la historia del lenguaje: él es, prácticamente, el padre del lenguaje favorito de muchos desarrolladores hoy, y sus primeras decisiones de diseño se hicieron a toda prisa y se fueron puliendo con los años gracias a un estándar.",
    },
    {
      type: "callout",
      variant: "info",
      text:
        "Algunos materiales hablan de «13 días». Las fuentes consultadas coinciden en unos 10 días para el primer prototipo, en mayo de 1995. Lo importante no es la cifra exacta, sino que el lenguaje nació como un diseño rápido y evolucionó después.",
    },

    // ───────────────────────── Java vs JavaScript ─────────────────────────
    { type: "heading", level: 2, text: "Java no es JavaScript" },
    {
      type: "paragraph",
      text:
        "Muy importante: no los confundas. Es común encontrar personas que empiezan en el mundo de la web sin perfil técnico y dicen «sé un poco de Java» cuando en realidad lo que saben es un poco de JavaScript. Son lenguajes distintos.",
    },
    {
      type: "image",
      src: "/img/dia-01/java-vs-javascript.svg",
      alt: "Java y JavaScript son lenguajes distintos. JavaScript se llamó antes Mocha y LiveScript. La analogía: ham y hamster empiezan igual pero no se relacionan.",
      caption: "Compartir letras en el nombre no significa compartir tecnología.",
    },
    {
      type: "heading",
      level: 3,
      text: "¿Por qué se llama JavaScript?",
    },
    {
      type: "paragraph",
      text:
        "Al inicio el lenguaje tuvo varios nombres: primero Mocha (el prototipo de mayo de 1995), luego LiveScript (septiembre de 1995, en la beta de Navigator 2.0) y finalmente JavaScript, en diciembre de 1995, a raíz de un acuerdo entre Netscape y Sun Microsystems. En esa década Java era la tecnología de moda, una alternativa a lenguajes como C y C++, y vivía su propio boom, igual que hoy lo viven las aplicaciones nativas y las librerías reactivas de JavaScript.",
    },
    {
      type: "paragraph",
      text:
        "Así como hoy empresas como Google, Meta o Microsoft tienen eventos anuales que vemos por streaming para conocer sus novedades, en los noventa también existían los grandes anuncios, solo que sin redes sociales el círculo era mucho más cerrado. En ese contexto, Netscape y Sun anunciaron JavaScript como un lenguaje de scripting complementario a Java. El nombre fue, en la práctica, una decisión de marketing para aprovechar el boom de Java.",
    },
    {
      type: "paragraph",
      text:
        "Sun Microsystems fue adquirida por Oracle en 2010, así que Java hoy pertenece a Oracle. De ahí viene la confusión que persiste: todavía hay quien cree que Java y JavaScript tienen algo que ver, y realmente solo coinciden en parte del nombre.",
    },
    {
      type: "quote",
      text:
        "No porque «jamón» y «hámster» empiecen con las mismas letras en inglés (ham y hamster) tienen algo que ver. Son dos cosas totalmente diferentes. Con Java y JavaScript pasa exactamente lo mismo.",
      author: "Analogía para recordarlo",
    },
    {
      type: "tabs",
      title: "El mismo «Hola» en cada lenguaje: se ven (y funcionan) distinto",
      tabs: [
        {
          label: "Java",
          lang: "java",
          code: L(
            "public class Hola {",
            "  public static void main(String[] args) {",
            '    System.out.println("Hola, mundo");',
            "  }",
            "}",
          ),
          note: "Java necesita definir una clase y compilarse antes de ejecutarse.",
        },
        {
          label: "JavaScript",
          lang: "js",
          code: 'console.log("Hola, mundo");',
          note: "JavaScript se ejecuta directamente, por ejemplo en la consola del navegador.",
        },
      ],
    },
    {
      type: "callout",
      variant: "warning",
      text:
        "Regla de oro: Java y JavaScript son lenguajes diferentes. Si alguien te dice que «sabe Java» y solo ha hecho interactividad en una página web, probablemente sabe JavaScript.",
    },

    // ───────────────────────── ECMAScript ─────────────────────────
    { type: "heading", level: 2, text: "La evolución: el estándar ECMAScript" },
    {
      type: "paragraph",
      text:
        "Para entender el JavaScript de hoy conviene ver cómo ha evolucionado. JavaScript nace en 1995 y su especificación se estandariza en Ecma International bajo el nombre ECMAScript (documento ECMA-262). Por eso se habla de versiones de ECMAScript y no solo de «versiones de JavaScript».",
    },
    {
      type: "paragraph",
      text:
        "Si programaste en Flash con el lenguaje ActionScript, vas a encontrar muchas similitudes: ActionScript también se basaba en ECMAScript (ActionScript 3 incluso tomó ideas de los borradores de la cuarta edición). Aprender un lenguaje basado en el mismo estándar ayuda a aprender el siguiente. Flash Player ya no existe: Adobe terminó su soporte el 31 de diciembre de 2020 y bloqueó su contenido desde el 12 de enero de 2021.",
    },
    {
      type: "image",
      src: "/img/dia-01/ecmascript-evolucion.svg",
      alt: "Línea de tiempo del estándar: 1995 JavaScript, 1997 ES1, 1998 ES2, 1999 ES3, ES4 abandonada, una década sin versión nueva, 2009 ES5, 2011 ES5.1 y 2015 ES2015.",
      caption: "Versiones del estándar ECMAScript. Observa la década de «sequía» entre ES3 y ES5.",
    },
    {
      type: "table",
      caption: "Resumen de versiones",
      headers: ["Año", "Versión", "Qué pasó"],
      rows: [
        ["1995", "JavaScript", "Nace en Netscape de la mano de Brendan Eich."],
        ["1997", "ECMAScript 1 (ES1)", "Se publica la primera edición del estándar."],
        ["1998", "ECMAScript 2 (ES2)", "Segunda edición."],
        ["1999", "ECMAScript 3 (ES3)", "Tercera edición. Pasa una década sin ediciones nuevas."],
        [
          "2008",
          "ECMAScript 4 (ES4)",
          "Se abandonó por diferencias en el comité sobre la complejidad del lenguaje. Muchas de sus ideas se descartaron y algunas llegaron después a ES6. Ese número se omite.",
        ],
        ["2009", "ECMAScript 5 (ES5)", "Llega una década después de ES3 (diciembre de 2009)."],
        ["2011", "ECMAScript 5.1", "Pequeña actualización (junio de 2011)."],
        ["2015", "ECMAScript 2015 (ES6)", "Cambia el ritmo: desde aquí hay una edición cada año, aprobada en junio."],
        ["2016", "ECMAScript 2016 (ES7)", "Segunda edición del ciclo anual, y así sucesivamente cada año."],
        ["2026", "ECMAScript 2026", "Edición 17, aprobada por Ecma International el 30 de junio de 2026."],
      ],
    },
    {
      type: "callout",
      variant: "info",
      text:
        "¿Por qué se salta del 3 al 5? Cuando una versión se abandona, se respeta ese número y se pasa al siguiente. Le pasó algo parecido a PHP, que fue de la versión 5 a la 7 porque la 6 nunca se liberó. Además, desde 2015 los nombres «ES6», «ES7»… son los alias antiguos de ES2015, ES2016…; hoy se usa el año.",
    },
    {
      type: "paragraph",
      text:
        "Entre ECMAScript 3 (1999) y ECMAScript 5 (2009) pasó una década. En esos años gran parte de los sitios interactivos y multimedia se hacían con tecnología Flash, y por eso Flash tuvo tanta importancia durante la primera década de este siglo.",
    },

    // ───────────────────────── Línea de tiempo interactiva ─────────────────────────
    {
      type: "heading",
      level: 2,
      text: "Recorre la historia hito por hito",
    },
    {
      type: "paragraph",
      text:
        "Usa la línea de tiempo para navegar por los hechos principales de esta lección. Haz clic en un año o usa los botones Anterior y Siguiente.",
    },
    {
      type: "timeline",
      title: "JavaScript: de 1995 a hoy",
      items: [
        {
          year: "1995",
          title: "Nace JavaScript en Netscape",
          text:
            "Brendan Eich crea el primer prototipo en unos 10 días de mayo, bajo el nombre Mocha. En septiembre se llama LiveScript y en diciembre, tras el acuerdo entre Netscape y Sun, JavaScript. Netscape Navigator competía entonces con Internet Explorer.",
        },
        {
          year: "1997",
          title: "ECMAScript 1: primera edición del estándar",
          text:
            "El lenguaje se estandariza en Ecma International bajo el nombre ECMAScript. Es la base común de JavaScript y de otros lenguajes, como ActionScript, el de Flash.",
        },
        {
          year: "1998",
          title: "ECMAScript 2",
          text: "Segunda edición del estándar.",
        },
        {
          year: "1999",
          title: "ECMAScript 3",
          text:
            "Llega ECMAScript 3, que durante años fue la base sobre la que se programó para la web. Después comienza una década sin ediciones nuevas, mientras Flash domina buena parte de los sitios interactivos. Ese mismo año Microsoft introduce XMLHTTP como control ActiveX en Internet Explorer 5, origen de AJAX.",
        },
        {
          year: "2006",
          title: "jQuery y la era cross-browser",
          text:
            "El 14 de enero de 2006 John Resig presenta jQuery. Resuelve las diferencias entre navegadores: Internet Explorer era el más usado y no siempre seguía los estándares. Ese año Internet Explorer 7 incorpora el objeto XMLHttpRequest nativo.",
          code: {
            lang: "js",
            code: L(
              "// Con jQuery, una sola línea funcionaba en todos los navegadores",
              '$.ajax({ url: "/api/usuarios", method: "GET" });',
            ),
          },
        },
        {
          year: "2008",
          title: "ES4 se abandona",
          text:
            "La cuarta edición, en desarrollo durante años, se abandona por diferencias en el comité sobre su complejidad. Su número se omite y parte de sus ideas reaparecen más tarde en ES6.",
        },
        {
          year: "2009",
          title: "ES5 y Node.js",
          text:
            "En noviembre Ryan Dahl presenta Node.js en JSConf EU y en diciembre se publica ECMAScript 5. JavaScript sale del navegador: ahora también se usa en el servidor, lo que le da autoridad y estructura como lenguaje de programación.",
        },
        {
          year: "2010",
          title: "Backbone y AngularJS",
          text:
            "Aparecen librerías que intentan llevar al cliente el patrón modelo-vista-controlador del servidor (arquitecturas MV*): Backbone y AngularJS, este último impulsado por Google.",
        },
        {
          year: "2011",
          title: "ES5.1 y Ember",
          text:
            "Sale ES5.1, una pequeña actualización. También nace Ember, otra librería de la primera ola de frameworks MV*.",
        },
        {
          year: "2012",
          title: "Chrome supera a Internet Explorer",
          text:
            "Según StatCounter, Chrome superó por primera vez a Internet Explorer como navegador más usado en marzo de 2012 y lo hizo un mes completo en mayo de ese año.",
        },
        {
          year: "2013",
          title: "React",
          text:
            "Facebook publica React como código abierto. Impulsa el desarrollo orientado a componentes y un estilo de escritura declarativo.",
        },
        {
          year: "2014",
          title: "Vue",
          text:
            "Se publica Vue, la tercera gran librería de la nueva ola de desarrollo por componentes junto con Angular y React.",
        },
        {
          year: "2015",
          title: "ES2015 (ES6): el estándar vivo",
          text:
            "Llega la mayor actualización del lenguaje y, desde entonces, hay una edición nueva cada año: ES2016, ES2017 y así sucesivamente. Aparecen `let`, `const`, las arrow functions y las plantillas de texto, entre otras.",
          code: {
            lang: "js",
            code: L(
              "// Características que llegaron con ES2015",
              "const saludo = (nombre) => `Hola, ${nombre}`;",
              'let curso = "JavaScript moderno";',
              "console.log(saludo(curso));",
            ),
          },
        },
        {
          year: "2017",
          title: "CSS Grid llega a los navegadores",
          text:
            "En marzo de 2017 CSS Grid se activa casi a la vez en Firefox 52 (7 de marzo), Chrome 57 (9 de marzo) y Safari 10.1 (26-27 de marzo). Los navegadores ya se ponen de acuerdo para soportar las mismas características casi al mismo tiempo.",
        },
        {
          year: "2020-22",
          title: "Se retiran Flash e Internet Explorer",
          text:
            "Adobe termina el soporte de Flash Player el 31 de diciembre de 2020. Microsoft retira Internet Explorer el 15 de junio de 2022; su sucesor es Microsoft Edge. En 2021 también termina el soporte de AngularJS (la versión 1.x).",
        },
        {
          year: "2026",
          title: "ES2026, jQuery 4.0 y Node.js 26 LTS",
          text:
            "El 30 de junio de 2026 se aprueba ECMAScript 2026, la edición 17. En enero de 2026 se publica jQuery 4.0.0, su primera versión mayor en casi una década. En octubre de 2026 Node.js 26 pasa a soporte de largo plazo (LTS).",
        },
        {
          year: "ESNext",
          title: "Lo que viene",
          text:
            "ESNext no es una edición, sino el nombre genérico para las características que llegarán en la próxima edición del estándar. Cada año las propuestas avanzan en el proceso del comité técnico TC39 hasta quedar incluidas.",
        },
      ],
    },

    // ───────────────────────── jQuery ─────────────────────────
    { type: "heading", level: 2, text: "jQuery y el problema cross-browser" },
    {
      type: "image",
      src: "/img/dia-01/cross-browser-jquery.svg",
      alt: "Tu código llama a jQuery; jQuery detecta el navegador y usa ActiveXObject en Internet Explorer 6 y anteriores, o XMLHttpRequest en los demás navegadores.",
      caption: "jQuery escondía las diferencias entre navegadores detrás de una sola API.",
    },
    {
      type: "paragraph",
      text:
        "En enero de 2006 se presenta jQuery, una librería que permitía escribir código «cross-browser». En esa década el navegador más usado del mundo era Internet Explorer, y el problema era que Microsoft implementaba cosas a su manera en lugar de seguir los estándares.",
    },
    {
      type: "paragraph",
      text:
        "El ejemplo clásico es AJAX. En Internet Explorer 5 y 6 la petición se hacía con un objeto `ActiveXObject`, mientras que los demás navegadores usaban el estándar: el objeto `XMLHttpRequest`. Internet Explorer 7 (2006) ya incluyó `XMLHttpRequest` nativo, pero aún había que dar soporte a las versiones anteriores. Por eso librerías como jQuery tuvieron tanto éxito: detectaban tras bambalinas en qué navegador estabas y ejecutaban la función adecuada.",
    },
    {
      type: "tabs",
      title: "Una petición AJAX: antes, con jQuery y hoy",
      tabs: [
        {
          label: "Antes (a mano)",
          lang: "js",
          code: L(
            "// Había que detectar el navegador uno mismo",
            "let peticion;",
            "if (window.XMLHttpRequest) {",
            "  // Navegadores que siguen el estándar (y IE 7 en adelante)",
            "  peticion = new XMLHttpRequest();",
            "} else {",
            "  // Internet Explorer 6 y anteriores",
            '  peticion = new ActiveXObject("Microsoft.XMLHTTP");',
            "}",
            "",
            'peticion.open("GET", "/api/usuarios");',
            "peticion.onreadystatechange = function () {",
            "  if (peticion.readyState === 4 && peticion.status === 200) {",
            "    console.log(peticion.responseText);",
            "  }",
            "};",
            "peticion.send();",
          ),
          note: "El mismo trabajo requería ramas distintas según el navegador.",
        },
        {
          label: "Con jQuery",
          lang: "js",
          code: L(
            "// jQuery decide por ti qué objeto usar",
            "$.ajax({",
            '  url: "/api/usuarios",',
            '  method: "GET",',
            "}).done(function (datos) {",
            "  console.log(datos);",
            "});",
          ),
          note: "Una sola forma de escribirlo; la librería detecta el navegador.",
        },
        {
          label: "Hoy (estándar)",
          lang: "js",
          code: L(
            "// Con el JavaScript moderno ya no hace falta la librería",
            'const respuesta = await fetch("/api/usuarios");',
            "const datos = await respuesta.json();",
            "console.log(datos);",
          ),
          note: "`fetch` y `await` los estudiaremos más adelante en el curso.",
        },
      ],
    },
    {
      type: "playground",
      title: "Detección de capacidades",
      description:
        "Esto es lo que jQuery hacía por ti: averiguar qué ofrece el navegador. Ejecuta y compara.",
      code: L(
        "// ¿Qué soporta este entorno?",
        'console.log("XMLHttpRequest:", typeof XMLHttpRequest === "function");',
        'console.log("fetch:", typeof fetch === "function");',
        'console.log("ActiveXObject (solo IE antiguo):", typeof ActiveXObject !== "undefined");',
      ),
      expected: L("XMLHttpRequest: true", "fetch: true", "ActiveXObject (solo IE antiguo): false"),
    },
    {
      type: "heading",
      level: 3,
      text: "¿Y jQuery hoy?",
    },
    {
      type: "paragraph",
      text:
        "jQuery no está muerto, aunque en proyectos nuevos suele ya no hacer falta porque el navegador incluye de forma estándar casi todo lo que antes aportaba. Sigue presente en la mayoría de los sitios web según encuestas como W3Techs, en buena parte porque WordPress lo incluye en su núcleo y muchos temas y plugins dependen de él. El proyecto sigue activo: jQuery 4.0.0 se publicó el 17 de enero de 2026, quitó el soporte de Internet Explorer anterior al 11 y eliminó APIs obsoletas.",
    },

    // ───────────────────────── Node.js ─────────────────────────
    { type: "heading", level: 2, text: "2009: JavaScript sale del navegador con Node.js" },
    {
      type: "paragraph",
      text:
        "En 2009 se presenta Node.js, un entorno para ejecutar JavaScript del lado del servidor. Ese año también se publica ECMAScript 5 y HTML5 y CSS3 empiezan a ganar tracción como las nuevas generaciones de los estándares web.",
    },
    {
      type: "paragraph",
      text:
        "Fue el gran salto de autoridad y de estructura para JavaScript como lenguaje de programación. Antes, muchos programadores lo veían simplemente como una herramienta para generar interactividad en el front-end, y no lo respetaban como lenguaje porque le faltaban características. Con Node.js se empezó a usar también para el back-end y las herramientas de desarrollo.",
    },
    {
      type: "callout",
      variant: "info",
      text:
        "Estado actual: a noviembre de 2026, Node.js 26 es la línea LTS más reciente (pasó a LTS el 28 de octubre de 2026). Node.js publica una versión mayor al año y las versiones pares reciben soporte de largo plazo.",
    },

    // ───────────────────────── Frameworks ─────────────────────────
    { type: "heading", level: 2, text: "2010-2014: arquitecturas MV* y frameworks" },
    {
      type: "image",
      src: "/img/dia-01/frameworks-mv.svg",
      alt: "El patrón MVC del servidor se replica en el cliente con variantes MV*; surgen Backbone y AngularJS en 2010, Ember en 2011, React en 2013 y Vue en 2014.",
      caption: "De MVC en el servidor a los frameworks de componentes del front-end.",
    },
    {
      type: "paragraph",
      text:
        "Tras ES5 hubo años en los que el estándar casi no se movió (ES5.1 en 2011 fue una pequeña actualización). Pero entre 2010 y 2015 el ecosistema creció rápido: surgieron librerías que intentan replicar en el cliente el patrón modelo-vista-controlador que existe del lado del servidor.",
    },
    {
      type: "paragraph",
      text:
        "Aparecen así patrones de arquitectura con nombres como modelo-vista-presentador (MVP) o modelo-vista-vistamodelo (MVVM), todos de la familia «MV*». Con ellos llegan las primeras librerías: Backbone, AngularJS y Ember.",
    },
    {
      type: "paragraph",
      text:
        "Después se consolidan las tres librerías que marcaron la nueva ola del desarrollo orientado a componentes y la programación reactiva: Angular, React y Vue. Comparten un enfoque de escritura más declarativo y cercano a la programación funcional, y siguen vigentes hoy junto con otras alternativas.",
    },
    {
      type: "list",
      items: [
        "Backbone y AngularJS (2010) y Ember (2011): primeras librerías que llevan el patrón MV* al cliente.",
        "React (2013): publicado como código abierto por Facebook.",
        "Vue (2014): tercera gran librería de la ola de componentes.",
        "Angular a secas es la reescritura del framework (desde 2016); AngularJS es la versión 1.x, cuyo soporte terminó en 2021.",
      ],
    },

    // ───────────────────────── Navegadores ─────────────────────────
    { type: "heading", level: 2, text: "De la guerra de navegadores a la ruta común" },
    {
      type: "image",
      src: "/img/dia-01/guerra-navegadores.svg",
      alt: "Hasta 2012 Internet Explorer era el más usado y se apartaba de los estándares; después Chrome lo superó y Microsoft lo retiró en 2022. CSS Grid llegó en marzo de 2017 a Firefox 52, Chrome 57 y Safari 10.1 con pocos días de diferencia.",
      caption: "Los navegadores actuales avanzan casi al mismo tiempo.",
    },
    {
      type: "paragraph",
      text:
        "Chrome superó a Internet Explorer como navegador más usado hacia 2012 (según StatCounter, primero un día de marzo y un mes completo en mayo). Microsoft retiró Internet Explorer el 15 de junio de 2022 y lo reemplazó por Microsoft Edge, hoy basado en Chromium. Los navegadores actuales (Chrome, Firefox, Safari, Edge) siguen una ruta común al implementar nuevas características.",
    },
    {
      type: "paragraph",
      text:
        "Un ejemplo: CSS Grid llegó a los navegadores en marzo de 2017 con Firefox 52 (7 de marzo), Chrome 57 (9 de marzo) y Safari 10.1 (26-27 de marzo); Edge lo sumó más tarde ese año. Hoy los navegadores se ponen de acuerdo para soportar las mismas características más o menos al mismo tiempo: ya pasamos por esa «época oscura» de la guerra de los navegadores.",
    },

    // ───────────────────────── Estándar vivo ─────────────────────────
    { type: "heading", level: 2, text: "Desde 2015: un estándar vivo" },
    {
      type: "image",
      src: "/img/dia-01/estandar-vivo.svg",
      alt: "Una edición de ECMAScript por año, aprobada en junio: ES2015, ES2016 y así hasta ES2026, la edición 17. ESNext designa lo que viene después.",
      caption: "Una edición nueva cada año: el estándar es «vivo».",
    },
    {
      type: "paragraph",
      text:
        "A partir de 2015, el comité que lleva el estándar ECMAScript decidió trabajar con un estándar vivo: cada año se publica una edición con las propuestas que ya están maduras, y se aprueba en junio. Por eso desde 2015 hablamos de ECMAScript 2015 (ES6), ECMAScript 2016 (ES7) y así sucesivamente, hasta ECMAScript 2026, la edición 17.",
    },
    {
      type: "paragraph",
      text:
        "ESNext es un nombre genérico, no una edición: sirve para referirse a las características que vendrán con la siguiente. Lo importante es que desde 2015 hay características nuevas cada año y la mayoría llega bien soportada en los navegadores y en Node.js.",
    },

    // ───────────────────────── Enfoque del curso ─────────────────────────
    { type: "heading", level: 2, text: "El enfoque de este curso" },
    {
      type: "paragraph",
      text:
        "Este curso enseña JavaScript desde los fundamentos y las bases del lenguaje, pero incorporando desde el inicio todas las características nuevas que existen desde 2015.",
    },
    {
      type: "paragraph",
      text:
        "En otros cursos introductorios primero se explica cómo se escribía JavaScript en los primeros años y, al final, después de hablar de cadenas, tipos de datos, objetos y funciones, aparece ES6. Para quien aprende el lenguaje desde cero, lo mejor es incorporar lo moderno desde el principio. Dos ejemplos:",
    },
    {
      type: "list",
      items: [
        "En lugar de la palabra `var` para declarar variables, usaremos `let` o `const`, dependiendo del caso.",
        "En lugar de funciones anónimas sin nombre, usaremos arrow functions, para aprovechar el contexto `this` del elemento padre en el que se encuentra la función.",
      ],
    },
    {
      type: "comparison",
      lang: "js",
      before: {
        title: "Antes: var y function",
        code: L(
          "var nombre = 'Ana';",
          "",
          "setTimeout(function () {",
          "  console.log('Hola, ' + nombre);",
          "}, 1000);",
        ),
      },
      after: {
        title: "Ahora: const y arrow function",
        code: L(
          "const nombre = 'Ana';",
          "",
          "setTimeout(() => {",
          "  console.log(`Hola, ${nombre}`);",
          "}, 1000);",
        ),
      },
    },
    {
      type: "paragraph",
      text:
        "No te preocupes si aún no entiendes cada detalle: todo esto se explica paso a paso en las próximas lecciones. Por ahora, prueba estos tres experimentos para ver la diferencia con tus propios ojos.",
    },
    {
      type: "playground",
      title: "Experimento 1 · Tu primera ejecución",
      description: "Cambia el texto y pulsa «Ejecutar».",
      code: L(
        "// Edita los valores y vuelve a ejecutar",
        'const curso = "JavaScript moderno";',
        "const desde = 1995;",
        "",
        "console.log(`Bienvenido al curso de ${curso}`);",
        "console.log(`JavaScript nació en ${desde}, hace ${new Date().getFullYear() - desde} años`);",
      ),
    },
    {
      type: "playground",
      title: "Experimento 2 · var frente a let y const",
      description: "`var` se «escapa» del bloque; `let` no. Y `const` no se puede reasignar.",
      code: L(
        "// var: el alcance es la FUNCIÓN, así que se ve fuera del if",
        "if (true) {",
        '  var conVar = "soy visible fuera del if";',
        "}",
        "console.log(conVar);",
        "",
        "// let: el alcance es el BLOQUE, así que no existe fuera del if",
        "if (true) {",
        '  let conLet = "solo vivo dentro del if";',
        "}",
        "console.log(typeof conLet);",
        "",
        "// const: no admite reasignación",
        "const PI = 3.1416;",
        "try {",
        "  PI = 3;",
        "} catch (error) {",
        '  console.log(error.name + ": " + error.message);',
        "}",
      ),
      expected: L(
        "soy visible fuera del if",
        "undefined",
        "TypeError: Assignment to constant variable.",
      ),
    },
    {
      type: "playground",
      title: "Experimento 3 · this en una function y en una arrow function",
      description:
        "La arrow function conserva el `this` del contexto padre; la función anónima no.",
      code: L(
        "const contador = {",
        "  segundos: 0,",
        "",
        "  conFuncionAnonima() {",
        "    const revisar = function () {",
        "      return this === contador;",
        "    };",
        "    return revisar();",
        "  },",
        "",
        "  conArrowFunction() {",
        "    const revisar = () => this === contador;",
        "    return revisar();",
        "  },",
        "};",
        "",
        'console.log("function anónima conserva this:", contador.conFuncionAnonima());',
        'console.log("arrow function conserva this:", contador.conArrowFunction());',
      ),
      expected: L("function anónima conserva this: false", "arrow function conserva this: true"),
    },

    // ───────────────────────── Datos que cambian ─────────────────────────
    { type: "heading", level: 2, text: "Datos que suelen aparecer desactualizados" },
    {
      type: "paragraph",
      text:
        "Al estudiar con videos, artículos o libros antiguos es normal encontrar cifras que ya no son correctas. Esta tabla resume las más comunes y lo que dicen las fuentes actuales.",
    },
    {
      type: "table",
      caption: "Material antiguo frente a información verificada",
      headers: ["Suele decirse", "Información verificada"],
      rows: [
        ["Eich creó JavaScript en 13 días.", "El primer prototipo tardó unos 10 días, en mayo de 1995."],
        ["JavaScript tiene unos 25 años.", "Nació en 1995: tiene más de 30 años."],
        ["jQuery nació en 2005.", "Se presentó el 14 de enero de 2006."],
        ["jQuery está muerto.", "Sigue muy extendido (WordPress lo incluye) y publicó la versión 4.0.0 en enero de 2026, aunque en proyectos nuevos suele no ser necesario."],
        ["Internet Explorer usaba ActiveXObject para AJAX.", "Solo IE 6 y anteriores. IE 7 (2006) ya traía XMLHttpRequest nativo."],
        ["Chrome superó a Internet Explorer en 2015.", "Ocurrió hacia 2012 según StatCounter. Internet Explorer se retiró el 15 de junio de 2022."],
        ["Angular salió en 2013, React en 2014 y Vue en 2015-2016.", "AngularJS 2010, React 2013, Vue 2014 (Angular a secas es la reescritura de 2016)."],
        ["Firefox soportó CSS Grid primero y Chrome una semana después.", "Firefox 52 (7 de marzo de 2017), Chrome 57 (9 de marzo) y Safari 10.1 (26-27 de marzo): todos en el mismo mes."],
        ["ESNext salió «el año pasado» y es una versión.", "ESNext no es una edición: designa lo que vendrá. La edición más reciente es ECMAScript 2026 (17.ª)."],
        ["Flash domina los sitios interactivos.", "Adobe terminó el soporte de Flash Player el 31 de diciembre de 2020."],
      ],
    },

    // ───────────────────────── Preguntas frecuentes ─────────────────────────
    {
      type: "accordion",
      title: "Preguntas frecuentes de esta lección",
      items: [
        {
          title: "¿JavaScript es lo mismo que Java?",
          text:
            "No. Son lenguajes distintos. El nombre JavaScript se adoptó en diciembre de 1995 por un acuerdo entre Netscape y Sun, aprovechando el boom de Java; antes se llamó Mocha y LiveScript.",
        },
        {
          title: "¿Qué es ECMAScript?",
          text:
            "Es el estándar (ECMA-262) en el que se basa JavaScript. Por eso se habla de ECMAScript 5, ECMAScript 2015 (ES6), etc. ActionScript, el lenguaje de Flash, también se basaba en él.",
        },
        {
          title: "¿Por qué no existe ECMAScript 4?",
          text:
            "Se abandonó en 2008 por diferencias en el comité sobre la complejidad del lenguaje. Su número se omite, como pasó con PHP al saltar de la 5 a la 7.",
        },
        {
          title: "¿Por qué fue tan popular jQuery?",
          text:
            "Porque resolvía el problema cross-browser. Internet Explorer, el navegador más usado, hacía las cosas a su manera (por ejemplo, `ActiveXObject` en las versiones 5 y 6 en lugar de `XMLHttpRequest`), y jQuery detectaba el navegador y ejecutaba la función adecuada.",
        },
        {
          title: "¿Qué significa ESNext?",
          text:
            "Es el nombre genérico de las características que llegarán con la próxima edición anual del estándar. No es una versión concreta.",
        },
        {
          title: "¿Debo aprender primero el JavaScript «viejo»?",
          text:
            "Según el enfoque de este curso, no: se aprenden las bases del lenguaje usando directamente las características modernas (`let`/`const`, arrow functions, etc.).",
        },
      ],
    },

    // ───────────────────────── Cierre ─────────────────────────
    { type: "heading", level: 2, text: "Cierre" },
    {
      type: "paragraph",
      text:
        "Esta fue una introducción ligera: se mencionaron los puntos importantes sin extenderse en lo histórico. Desde la siguiente lección hay unidades cortas, para que cada concepto quede englobado en una sola lección y avances a tu ritmo.",
    },
    {
      type: "checklist",
      title: "Antes de pasar al Día 2, verifica que puedes explicar…",
      items: [
        "Quién creó JavaScript, en qué empresa y para qué.",
        "Por qué se llama JavaScript y por qué no tiene relación con Java.",
        "Qué es ECMAScript y por qué no existe la versión 4.",
        "Qué problema resolvía jQuery y qué diferencia había entre `ActiveXObject` y `XMLHttpRequest`.",
        "Qué le aportó Node.js a JavaScript como lenguaje.",
        "Qué son Angular, React y Vue y qué enfoque comparten.",
        "Qué significa «estándar vivo» y qué es ESNext.",
        "Por qué en este curso usaremos `let`/`const` y arrow functions desde el inicio.",
      ],
    },
    { type: "heading", level: 3, text: "Fuentes consultadas (noviembre de 2026)" },
    {
      type: "list",
      items: [
        "[Ecma International: ECMA-262](https://ecma-international.org/publications-and-standards/standards/ecma-262/)",
        "[ECMAScript version history](https://en.wikipedia.org/wiki/ECMAScript_version_history)",
        "[Brendan Eich (Wikipedia)](https://en.wikipedia.org/wiki/Brendan_Eich)",
        "[Ars Technica: el hack de 10 días de 1995](https://arstechnica.com/gadgets/2025/12/in-1995-a-netscape-employee-wrote-a-hack-in-10-days-that-now-runs-the-internet/)",
        "[Blog oficial de jQuery](https://blog.jquery.com/)",
        "[Microsoft: Native XMLHttpRequest object (IE7)](https://learn.microsoft.com/en-us/archive/blogs/ie/native-xmlhttprequest-object)",
        "[The Register: CSS Grid llega a los navegadores](https://www.theregister.com/2017/03/31/css_grids_browser_support/)",
        "[Adobe: fin de vida de Flash Player](https://www.adobe.com/my_en/products/flashplayer/end-of-life.html)",
        "[RTVE: Chrome supera a Internet Explorer (2012)](https://www.rtve.es/noticias/20120322/chrome-supera-por-primera-vez-a-internet-explorer-como-navegador-mas-usado/509401.shtml)",
        "[Al Jazeera: Microsoft retira Internet Explorer (2022)](https://www.aljazeera.com/news/2022/6/15/microsoft-retires-internet-explorer-what-does-it-mean-for-you)",
        "[Cronología de tecnologías front-end](https://github.com/mcmire/timeline-of-frontend)",
        "[Calendario de versiones de Node.js](https://github.com/nodejs/Release/blob/main/README.md)",
        "[W3Techs: uso de tecnologías web](https://w3techs.com/)",
      ],
    },
  ],
  selfCheck: [
    {
      question: "¿Quién creó JavaScript y para qué empresa trabajaba en ese momento?",
      options: [
        "Brendan Eich, en Netscape",
        "James Gosling, en Sun Microsystems",
        "Brendan Eich, en Oracle",
        "Tim Berners-Lee, en Microsoft",
      ],
      correctIndex: 0,
      explanation:
        "JavaScript lo creó Brendan Eich en 1995 mientras trabajaba en Netscape, la empresa detrás del navegador Netscape Navigator. El primer prototipo le tomó unos 10 días.",
    },
    {
      question: "¿Por qué el lenguaje terminó llamándose JavaScript?",
      options: [
        "Porque es una versión simplificada de Java",
        "Porque está escrito en Java",
        "Por una decisión de marketing: en diciembre de 1995 Netscape y Sun lo anunciaron junto a Java; antes se llamó Mocha y LiveScript",
        "Porque lo desarrolló Sun Microsystems",
      ],
      correctIndex: 2,
      explanation:
        "El nombre aprovechó el boom de Java. Pero son lenguajes distintos, como ham y hamster que solo comparten letras.",
    },
    {
      question: "¿Qué pasó con ECMAScript 4?",
      options: [
        "Se lanzó en 1999 junto con Flash",
        "Se abandonó (2008) y su número se omitió; se pasó de la edición 3 a la 5",
        "Se renombró como ES6",
        "Solo existe en Node.js",
      ],
      correctIndex: 1,
      explanation:
        "La cuarta edición se abandonó por diferencias en el comité sobre la complejidad del lenguaje. Su número se omitió, igual que PHP con su versión 6.",
    },
    {
      question: "¿Qué problema resolvía principalmente jQuery en su época?",
      options: [
        "Hacía JavaScript más rápido que cualquier otro lenguaje",
        "Permitía programar en el servidor",
        "Reemplazaba a HTML y CSS",
        "Ocultaba las diferencias entre navegadores (cross-browser), por ejemplo ActiveXObject frente a XMLHttpRequest",
      ],
      correctIndex: 3,
      explanation:
        "Internet Explorer 5 y 6 usaban ActiveXObject mientras los demás navegadores seguían el estándar XMLHttpRequest. jQuery detectaba el navegador y ejecutaba la función adecuada.",
    },
    {
      question: "¿Qué le aportó Node.js a JavaScript a partir de 2009?",
      options: [
        "Permitió ejecutarlo del lado del servidor, lo que le dio autoridad y estructura como lenguaje de programación",
        "Reemplazó el estándar ECMAScript",
        "Eliminó la necesidad de los navegadores",
        "Lo convirtió en un lenguaje compilado",
      ],
      correctIndex: 0,
      explanation:
        "Con Node.js JavaScript dejó de verse solo como una herramienta de interactividad en el front-end y pasó a respetarse como lenguaje de programación completo.",
    },
    {
      question: "¿Con qué ritmo se publican las ediciones de ECMAScript desde 2015?",
      options: [
        "Cada cinco años",
        "Una cada década, como entre ES3 y ES5",
        "Una edición cada año, aprobada en junio (estándar vivo): ES2015, ES2016, …",
        "Solo cuando Chrome lo decide",
      ],
      correctIndex: 2,
      explanation:
        "Desde 2015 hay una edición anual. La más reciente, ECMAScript 2026, es la 17.ª y se aprobó el 30 de junio de 2026. ESNext es el nombre genérico de lo que viene después.",
    },
    {
      question: "¿Es cierto que jQuery está «muerto»?",
      options: [
        "Sí, dejó de mantenerse en 2015",
        "No: sigue muy extendido (por ejemplo, WordPress lo incluye) y publicó la versión 4.0.0 en enero de 2026, aunque en proyectos nuevos suele no hacer falta",
        "Sí, los navegadores modernos lo bloquean",
        "No, es obligatorio en todo proyecto de JavaScript",
      ],
      correctIndex: 1,
      explanation:
        "jQuery se mantiene activo y está presente en la mayoría de los sitios web, pero el JavaScript moderno cubre casi todo lo que antes hacía falta resolver con la librería.",
    },
    {
      question: "¿Qué enfoque usa este curso al enseñar el lenguaje?",
      options: [
        "Primero `var` y funciones anónimas; las novedades se ven al final",
        "Desde las bases, pero con las características modernas desde el inicio (`let`/`const`, arrow functions)",
        "Solo ES6 sin explicar los fundamentos",
        "Solo programación del lado del servidor",
      ],
      correctIndex: 1,
      explanation:
        "El curso enseña los fundamentos usando directamente lo moderno: `let` o `const` en lugar de `var`, y arrow functions para aprovechar el `this` del contexto padre.",
    },
  ],
};
