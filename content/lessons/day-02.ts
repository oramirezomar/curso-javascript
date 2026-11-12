import type { Lesson } from "@/lib/types";

// Une líneas de código sin tener que escapar backticks ni `${}` dentro de template literals.
const L = (...lines: string[]) => lines.join("\n");

// Contenido validado contra fuentes actuales en noviembre de 2026 (ver sección "Fuentes").
export const day02: Lesson = {
  day: 2,
  slug: "como-aprovechar-el-curso-progreso-pwa",
  title: "Cómo aprovechar este curso: ruta de aprendizaje, progreso en el navegador y apps instalables (PWA)",
  section: "Introducción y contexto",
  estimatedMinutes: 30,
  icon: "🗺️",
  objectives: [
    "Entender por qué el aprendizaje de JavaScript no termina y cómo se mantiene actualizado este curso",
    "Recorrer la ruta de aprendizaje y elegir por dónde empezar según tu perfil",
    "Usar `localStorage` para guardar datos en el navegador, conociendo sus límites y riesgos",
    "Comprender qué es una PWA (aplicación web progresiva) y cómo se instala",
    "Saber cómo funcionan las notificaciones web y por qué el permiso se pide tras una acción del usuario",
  ],
  blocks: [
    // ───────────────────────── Apertura ─────────────────────────
    {
      type: "paragraph",
      text:
        "Antes de entrar en la sintaxis, esta lección explica cómo está organizado el curso y cómo sacarle el máximo provecho. Además, la propia forma en que el curso funciona sirve de ejemplo para tres tecnologías web que vas a necesitar más adelante: el almacenamiento en el navegador (`localStorage`), las aplicaciones web progresivas (PWA) y las notificaciones web.",
    },
    {
      type: "keyFacts",
      items: [
        { value: "62 %", label: "de los encuestados de Stack Overflow 2026 programó de forma extensa en JavaScript el último año (el lenguaje más citado)" },
        { value: "1 por año", label: "Ediciones de ECMAScript, aprobadas cada junio" },
        { value: "5 MiB", label: "Espacio aproximado de localStorage por origen" },
        { value: "192 y 512 px", label: "Iconos que exigen los navegadores Chromium para instalar una PWA" },
        { value: "iOS 16.4", label: "Versión desde la que existen notificaciones web en iPhone y iPad (apps añadidas a inicio)" },
        { value: "0 cuentas", label: "Este curso guarda tu progreso solo en tu navegador" },
      ],
    },
    {
      type: "callout",
      variant: "success",
      text:
        "Contenido verificado en noviembre de 2026 con MDN Web Docs, la encuesta de desarrolladores de Stack Overflow y documentación de los navegadores. Al final de la lección hay una tabla con datos que suelen aparecer desactualizados y la lista de fuentes.",
    },

    // ───────────────────────── El aprendizaje no termina ─────────────────────────
    { type: "heading", level: 2, text: "JavaScript: el lenguaje que da vida a la web" },
    {
      type: "paragraph",
      text:
        "JavaScript es el lenguaje que da vida a las interacciones que hacemos a través de un navegador web: botones que responden, formularios que validan, contenido que cambia sin recargar la página. Sigue siendo, además, el lenguaje de programación más utilizado: en la encuesta de desarrolladores de Stack Overflow de 2026 encabeza la lista, con el 62,0 % de los encuestados, por delante de SQL, HTML/CSS y Python. TypeScript, que se compila a JavaScript, aparece con el 43,8 %, lo que confirma que dominar JavaScript es la base de todo el ecosistema.",
    },
    {
      type: "paragraph",
      text:
        "Como vimos en la lección anterior, el estándar ECMAScript incorpora nuevas características cada año. Por eso es muy difícil «terminar» de aprender JavaScript: siempre habrá algo nuevo que incorporar. A la vez, otras cosas dejan de recomendarse o desaparecen. Este curso está pensado para convivir con ese cambio constante.",
    },
    { type: "heading", level: 3, text: "Un curso vivo: lo nuevo entra y lo obsoleto se actualiza" },
    {
      type: "paragraph",
      text:
        "El lenguaje se transforma día a día y permanece dinámico prácticamente siempre. Así como aparecen novedades, otras cosas caen en desuso o cambia la manera correcta de aplicarlas. Para que tu aprendizaje no se quede atrás, cada lección de este curso se valida con fuentes actuales, indica el mes de verificación e incluye la lista de fuentes consultadas. Cuando un tema cambie, se actualiza en el propio curso.",
    },
    {
      type: "list",
      items: [
        "Flash dejó de tener soporte el 31 de diciembre de 2020.",
        "Internet Explorer se retiró el 15 de junio de 2022.",
        "AngularJS (la versión 1.x) terminó su soporte en 2021.",
        "`ActiveXObject` solo se necesitaba para Internet Explorer 6 y anteriores.",
        "En código nuevo se prefiere `let` y `const` en lugar de `var`.",
      ],
    },
    {
      type: "callout",
      variant: "info",
      text:
        "Regla para estudiar: cuando veas un video, artículo o libro, mira siempre la fecha. Si tiene varios años, comprueba en la documentación oficial (por ejemplo MDN Web Docs) si lo que explica sigue vigente.",
    },

    // ───────────────────────── Ruta de aprendizaje ─────────────────────────
    { type: "heading", level: 2, text: "La ruta de aprendizaje" },
    {
      type: "paragraph",
      text:
        "El contenido de un curso de JavaScript completo se divide en bloques temáticos. Se empieza con la introducción, luego los tipos de datos: variables, constantes, cadenas de texto, números y booleanos. Después vienen las funciones, los arreglos, los objetos, las estructuras de control (como los condicionales) y la programación orientada a objetos. A continuación se trabaja con el DOM, que permite que JavaScript interactúe con el HTML y el CSS, y con AJAX y REST para consumir datos. Al final aparecen las aplicaciones de una sola página (SPA).",
    },
    {
      type: "image",
      src: "/img/dia-02/ruta-aprendizaje.svg",
      alt: "Ruta de aprendizaje en doce paradas: introducción, variables, tipos de datos, funciones, arreglos, objetos, estructuras de control, programación orientada a objetos, DOM, AJAX y REST, aplicaciones de una sola página y cursos complementarios. Hay ejercicios tras la sintaxis básica, el DOM y AJAX con REST.",
      caption: "Ruta orientativa. Los temas se publican día a día y puedes saltar a la parada que necesites.",
    },
    {
      type: "topicTracker",
      title: "Marca los temas que ya dominas",
      description:
        "Selecciona algunos y pulsa «Recargar la página»: el avance se conserva. Abajo ves exactamente qué se guardó.",
      storageKey: "ruta-aprendizaje",
      items: [
        "Introducción a JavaScript",
        "Variables y constantes",
        "Cadenas de texto",
        "Números",
        "Booleanos",
        "Funciones",
        "Arreglos",
        "Objetos",
        "Estructuras de control",
        "Condicionales",
        "Programación orientada a objetos",
        "DOM",
        "AJAX",
        "REST",
        "Aplicaciones de una sola página (SPA)",
      ],
    },
    {
      type: "accordion",
      title: "¿Por dónde empiezo?",
      items: [
        {
          title: "Estoy empezando en el diseño y el desarrollo web",
          text:
            "Sigue la ruta paso a paso, en orden, y completa cada bloque antes de pasar al siguiente. El orden está pensado para que cada tema se apoye en el anterior.",
        },
        {
          title: "Soy programador back-end y me piden consumir una API",
          text:
            "Puedes ir directamente a las paradas de AJAX y REST en cuanto estén publicadas. Antes conviene repasar funciones, objetos y el formato JSON, porque la mayoría de las respuestas de una API llegan en ese formato.",
        },
        {
          title: "Aprendí JavaScript hace años",
          text:
            "Revisa la lección de introducción y los temas que cambiaron desde ECMAScript 2015: `let` y `const`, arrow functions y las demás novedades que el curso usa desde el primer día.",
        },
        {
          title: "Me interesan las aplicaciones instaladas o el servidor",
          text:
            "Al terminar la ruta principal tienes dos caminos complementarios: las aplicaciones web progresivas (PWA) y JavaScript en el servidor con Node.js. A noviembre de 2026, Node.js 26 es la línea LTS más reciente.",
        },
      ],
    },
    {
      type: "callout",
      variant: "info",
      text:
        "En este curso no hay bloqueo secuencial: puedes abrir cualquier lección publicada desde el índice. Eso permite que quien ya tiene conocimientos vaya directo al contenido que le interesa.",
    },

    // ───────────────────────── Tipos de contenido ─────────────────────────
    { type: "heading", level: 2, text: "Tipos de contenido y cómo usarlos" },
    {
      type: "paragraph",
      text:
        "Un buen curso combina varios formatos. Es habitual encontrar código que se puede descargar y seguir paso a paso (con ejercicios teóricos y prácticos), videos y artículos que complementan la teoría. En este curso todo vive dentro de cada lección:",
    },
    {
      type: "table",
      caption: "Formatos de las lecciones",
      headers: ["Tipo", "Para qué sirve", "Dónde lo encuentras"],
      rows: [
        ["Texto explicativo", "Teoría y contexto de cada concepto.", "Párrafos, listas, tablas y llamadas de atención."],
        ["Código", "Ver, copiar y estudiar ejemplos reales.", "Bloques de código y pestañas con botón «Copiar»."],
        ["Editor ejecutable", "Probar y modificar código sin instalar nada.", "Bloques «Pruébalo tú mismo» con botón «Ejecutar»."],
        ["Imágenes y líneas de tiempo", "Visualizar relaciones y orden de los hechos.", "Ilustraciones y líneas de tiempo navegables."],
        ["Autoevaluación", "Comprobar lo aprendido al terminar.", "Preguntas al final de cada lección."],
        ["Progreso", "Saber qué has completado.", "Barra de la izquierda y botón «Marcar día como completado»."],
      ],
    },
    { type: "heading", level: 3, text: "Practicar es parte del aprendizaje" },
    {
      type: "paragraph",
      text:
        "Leer no basta: la lógica de programación se entrena escribiendo código. Por eso la ruta contempla bloques de ejercicios prácticos al terminar los grandes temas: después de la sintaxis básica del lenguaje, después de los conceptos importantes del DOM y después de AJAX y REST. Aprovecha cada editor ejecutable de las lecciones y modifica los ejemplos hasta romperlos y arreglarlos.",
    },
    {
      type: "checklist",
      title: "Hábitos de estudio recomendados",
      items: [
        "Ejecuta cada ejemplo del editor y cambia al menos un valor antes de seguir.",
        "Responde la autoevaluación sin mirar la teoría y revisa las explicaciones de lo que falles.",
        "Marca el día como completado solo cuando puedas explicar el tema con tus palabras.",
        "Al terminar un bloque temático, resuelve ejercicios propios antes de pasar al siguiente.",
        "Revisa la fecha de verificación y las fuentes de cada lección cuando necesites profundizar.",
      ],
    },

    // ───────────────────────── localStorage ─────────────────────────
    { type: "heading", level: 2, text: "Tu progreso se guarda en tu navegador: localStorage" },
    {
      type: "paragraph",
      text:
        "Este curso te permite marcar tu avance y conservarlo la próxima vez que vuelvas. Para lograrlo no necesita que crees una cuenta ni usa una base de datos: el progreso se guarda en el propio navegador con una API llamada `localStorage`. Esto significa que no se envía a ningún servidor y que, como no hay cuentas de usuario, tampoco hay datos personales que gestionar.",
    },
    {
      type: "image",
      src: "/img/dia-02/localstorage-flujo.svg",
      alt: "La página usa setItem para guardar un par clave y valor de texto en el almacenamiento del navegador y getItem para recuperarlo. No interviene ningún servidor ni cuenta.",
      caption: "localStorage guarda pares clave/valor de texto en el navegador del dispositivo.",
    },
    {
      type: "callout",
      variant: "warning",
      text:
        "Consecuencia práctica: como el avance vive solo en tu navegador y en tu dispositivo, marca siempre tu progreso en el mismo navegador y en el mismo equipo donde lo hiciste la primera vez. Otro navegador u otro dispositivo no verá esos datos.",
    },
    {
      type: "paragraph",
      text:
        "`localStorage` guarda pares de clave y valor. Estas son las cuatro operaciones básicas; las veremos en detalle cuando lleguemos al navegador y al DOM.",
    },
    {
      type: "tabs",
      title: "Operaciones básicas con localStorage",
      tabs: [
        {
          label: "Guardar",
          lang: "js",
          code: L(
            "// setItem(clave, valor): ambos son texto",
            'localStorage.setItem("tema", "oscuro");',
          ),
        },
        {
          label: "Leer",
          lang: "js",
          code: L(
            "// getItem(clave): devuelve el texto o null si no existe",
            'const tema = localStorage.getItem("tema");',
            "console.log(tema); // \"oscuro\"",
          ),
        },
        {
          label: "Borrar",
          lang: "js",
          code: L(
            "// Una sola clave",
            'localStorage.removeItem("tema");',
            "",
            "// Todas las claves de este origen",
            "localStorage.clear();",
          ),
        },
        {
          label: "Objetos y listas",
          lang: "js",
          code: L(
            "// localStorage solo guarda texto: convierte con JSON",
            "const avance = { completados: [1, 2], ultimoDia: 2 };",
            'localStorage.setItem("avance", JSON.stringify(avance));',
            "",
            'const guardado = JSON.parse(localStorage.getItem("avance") ?? "null");',
            "console.log(guardado.completados); // [1, 2]",
          ),
          note: "`JSON.stringify` convierte a texto y `JSON.parse` lo vuelve a convertir en objeto.",
        },
        {
          label: "Con control de errores",
          lang: "js",
          code: L(
            "function guardar(clave, valor) {",
            "  try {",
            "    localStorage.setItem(clave, JSON.stringify(valor));",
            "    return true;",
            "  } catch (error) {",
            "    // QuotaExceededError (lleno), almacenamiento bloqueado o modo privado",
            '    console.warn("No se pudo guardar:", error.name);',
            "    return false;",
            "  }",
            "}",
          ),
          note: "Los navegadores lanzan QuotaExceededError al llenarse el espacio; conviene envolver las escrituras en try...catch.",
        },
      ],
    },
    {
      type: "playground",
      title: "Los objetos se guardan como texto",
      description:
        "Compara qué ocurre sin JSON y con JSON. (Este editor corre aislado y no tiene acceso a localStorage; la demo de arriba sí lo usa.)",
      code: L(
        "const avance = { completados: [1, 2], ultimoDia: 2 };",
        "",
        '// Sin JSON: un objeto se convierte en "[object Object]" y se pierde la información',
        "console.log(String(avance));",
        "",
        "// Con JSON se conserva toda la estructura",
        "const texto = JSON.stringify(avance);",
        "console.log(texto);",
        "",
        "const recuperado = JSON.parse(texto);",
        "console.log(recuperado.completados.length, recuperado.ultimoDia);",
      ),
      expected: L("[object Object]", '{"completados":[1,2],"ultimoDia":2}', "2 2"),
    },
    {
      type: "table",
      caption: "localStorage frente a sessionStorage y cookies",
      headers: ["", "localStorage", "sessionStorage", "Cookies"],
      rows: [
        ["Duración", "Hasta que se borre; sobrevive al cerrar el navegador.", "Solo mientras la pestaña está abierta.", "Según su fecha de caducidad."],
        ["Espacio", "Unos 5 MiB por origen.", "Unos 5 MiB por origen.", "Muy pequeño."],
        ["Alcance", "Todas las pestañas del mismo origen.", "Una sola pestaña.", "Según dominio y ruta."],
        ["¿Viaja al servidor?", "No.", "No.", "Sí, en cada petición."],
        ["Tipo de datos", "Solo texto.", "Solo texto.", "Texto."],
      ],
    },
    {
      type: "callout",
      variant: "warning",
      text:
        "Seguridad: cualquier script que se ejecute en tu página puede leer `localStorage`. No guardes en él contraseñas, tokens de acceso ni datos personales. Úsalo para preferencias, borradores y estado de la interfaz, como el progreso de este curso. Además, los datos se pierden si el usuario limpia los datos del sitio, y en ventanas privadas suelen borrarse al cerrarlas.",
    },
    {
      type: "paragraph",
      text:
        "Puedes ver lo que un sitio guarda en tu navegador desde las herramientas de desarrollo: en Chrome y Edge, en la pestaña «Application» (Aplicación) → «Local Storage»; en Firefox, en la pestaña «Storage» (Almacenamiento).",
    },

    // ───────────────────────── PWA ─────────────────────────
    { type: "heading", level: 2, text: "Aplicaciones web progresivas (PWA)" },
    {
      type: "paragraph",
      text:
        "Una PWA es un sitio web que el navegador permite instalar como si fuera una aplicación: aparece con su propio icono en el escritorio o en la pantalla de inicio y se abre en su propia ventana, aunque sigue siendo una web. Se puede instalar en una tablet, un teléfono móvil o un ordenador, y es una buena opción para tener a mano un sitio en el que vas marcando tu avance, como un curso.",
    },
    {
      type: "image",
      src: "/img/dia-02/pwa-instalacion.svg",
      alt: "Un sitio con HTTPS y manifiesto puede instalarse desde el navegador: en ordenador con el icono Instalar, en Android desde el menú y en iPhone o iPad con Compartir y Añadir a pantalla de inicio.",
      caption: "Qué necesita un sitio para ser instalable y cómo se instala en cada dispositivo.",
    },
    {
      type: "paragraph",
      text:
        "Para que un navegador basado en Chromium (Chrome, Edge, Samsung Internet) ofrezca instalar un sitio, este debe servirse por HTTPS e incluir un manifiesto de aplicación web: un archivo JSON que describe cómo debe verse y comportarse la aplicación. El manifiesto necesita como mínimo un nombre (`name` o `short_name`), iconos de 192 y 512 píxeles, una `start_url` y un modo de visualización (`display`).",
    },
    {
      type: "tabs",
      title: "Las piezas de una PWA",
      tabs: [
        {
          label: "manifest.json",
          lang: "json",
          code: L(
            "{",
            '  "name": "Curso de JavaScript",',
            '  "short_name": "Curso JS",',
            '  "start_url": "/curso",',
            '  "display": "standalone",',
            '  "background_color": "#ffffff",',
            '  "theme_color": "#b45f06",',
            '  "icons": [',
            '    { "src": "/icons/icon-192.png", "sizes": "192x192", "type": "image/png" },',
            '    { "src": "/icons/icon-512.png", "sizes": "512x512", "type": "image/png" }',
            "  ]",
            "}",
          ),
          note: "Cada página de la aplicación debe enlazar el manifiesto.",
        },
        {
          label: "HTML",
          lang: "html",
          code: L(
            "<head>",
            '  <link rel="manifest" href="/manifest.json" />',
            '  <meta name="theme-color" content="#b45f06" />',
            "</head>",
          ),
        },
        {
          label: "Service worker (opcional)",
          lang: "js",
          code: L(
            "// Registro del service worker (en tu script principal)",
            'if ("serviceWorker" in navigator) {',
            '  navigator.serviceWorker.register("/sw.js");',
            "}",
          ),
          note: "Un service worker permite funcionar sin conexión y recibir notificaciones push, pero ya no es requisito para poder instalar.",
        },
      ],
    },
    {
      type: "paragraph",
      text:
        "Cómo se instala en la práctica: en un ordenador con Chrome o Edge aparece un icono de instalar en la barra de direcciones; al pulsarlo y confirmar, la aplicación queda instalada y se abre en su propia ventana con su icono, igual que una aplicación de escritorio (en Windows, macOS o Linux). En Android, el menú del navegador ofrece «Instalar aplicación» o «Añadir a la pantalla de inicio». En iPhone y iPad se usa el botón Compartir y la opción «Añadir a pantalla de inicio».",
    },
    {
      type: "playground",
      title: "¿Qué soporta este navegador?",
      description:
        "Detección de capacidades: la misma idea que usaba jQuery para el cross-browser, ahora aplicada a las funciones de una PWA.",
      code: L(
        'console.log("Service workers:", "serviceWorker" in navigator);',
        'console.log("API de notificaciones:", "Notification" in window);',
        'console.log("API push:", "PushManager" in window);',
        'console.log("Abierto como app instalada:", window.matchMedia("(display-mode: standalone)").matches);',
      ),
      expected: L(
        "Service workers: true",
        "API de notificaciones: true",
        "API push: true",
        "Abierto como app instalada: false",
      ),
    },
    {
      type: "callout",
      variant: "info",
      text:
        "Estado de este curso: hoy se usa directamente desde el navegador, sin instalación, y guarda el progreso con localStorage. No está empaquetado como PWA ni envía notificaciones; esta lección explica cómo funcionan esas tecnologías para que sepas construirlas tú más adelante.",
    },

    // ───────────────────────── Notificaciones ─────────────────────────
    { type: "heading", level: 2, text: "Notificaciones web" },
    {
      type: "paragraph",
      text:
        "Un sitio puede avisarte cuando hay novedades, por ejemplo una nueva sección de contenido, de forma parecida a cuando estás suscrito a un canal y abres el navegador. Para eso se combinan dos APIs: la API de Notificaciones, que muestra el aviso, y la API Push, que permite recibirlo aunque la página no esté abierta. El usuario debe dar su permiso.",
    },
    {
      type: "code",
      lang: "js",
      title: "Pedir permiso y mostrar una notificación",
      code: L(
        'const boton = document.querySelector("#activar-avisos");',
        "",
        'boton.addEventListener("click", async () => {',
        "  // El permiso se pide como respuesta a un clic, nunca al cargar la página",
        "  const permiso = await Notification.requestPermission();",
        "",
        '  if (permiso === "granted") {',
        '    new Notification("Avisos activados", {',
        '      body: "Te avisaremos cuando haya contenido nuevo.",',
        "    });",
        "  } else {",
        '    console.log("Permiso:", permiso); // "denied" o "default"',
        "  }",
        "});",
      ),
    },
    {
      type: "paragraph",
      text:
        "No te preocupes por entender cada línea todavía: `addEventListener`, `async` y `await` se explican más adelante. Lo importante ahora son las reglas del permiso.",
    },
    {
      type: "list",
      items: [
        "El permiso tiene tres valores posibles: `granted` (concedido), `denied` (denegado) y `default` (el usuario aún no decidió).",
        "Solo debes pedirlo como respuesta a un gesto del usuario, como un clic en un botón. Firefox y Safari lo exigen y MDN lo recomienda para todos.",
        "Chrome aconseja no pedir permisos al cargar la página y esperar a que el usuario muestre interés. Si lo deniega, el sitio normalmente no podrá volver a pedirlo.",
        "Para recibir avisos con la página cerrada, el servidor envía el mensaje a un servicio push del navegador, que despierta al service worker del sitio y este muestra la notificación.",
        "En iPhone y iPad las notificaciones web funcionan desde iOS y iPadOS 16.4, y solo si el sitio se añadió a la pantalla de inicio y se abre desde ahí.",
        "En Android, Chrome exige mostrar las notificaciones desde un service worker.",
      ],
    },
    {
      type: "callout",
      variant: "warning",
      text:
        "Buena práctica: explica al usuario qué avisos recibirá antes de pedir el permiso y no abuses. Un permiso denegado casi nunca se recupera, y los avisos excesivos hacen que la gente los bloquee.",
    },

    // ───────────────────────── AJAX y REST ─────────────────────────
    { type: "heading", level: 2, text: "Un adelanto: AJAX y REST" },
    {
      type: "paragraph",
      text:
        "Dos siglas que aparecerán en la ruta y que conviene ubicar desde ya. AJAX es la técnica que permite pedir datos al servidor sin recargar la página; el término lo acuñó Jesse James Garrett el 18 de febrero de 2005. REST es un estilo de arquitectura para diseñar servicios web, definido por Roy Fielding en su tesis doctoral del año 2000. Un programador back-end que necesita consumir datos de un servicio va a usar ambos.",
    },
    {
      type: "table",
      caption: "AJAX y REST de un vistazo",
      headers: ["Concepto", "Qué es", "Cómo se hace hoy"],
      rows: [
        [
          "AJAX",
          "Pedir o enviar datos al servidor sin recargar la página.",
          "Con `fetch`, en lugar de `XMLHttpRequest` o librerías.",
        ],
        [
          "REST",
          "Estilo para organizar un servicio web en recursos que se manejan con los métodos HTTP (GET, POST, PUT, DELETE…).",
          "Las API REST suelen responder en JSON, no en XML.",
        ],
      ],
    },
    {
      type: "code",
      lang: "js",
      title: "Vista previa: consumir una API REST con fetch",
      code: L(
        "// Se estudiará en detalle en la parada «AJAX y REST»",
        'const respuesta = await fetch("/api/usuarios");',
        "const usuarios = await respuesta.json();",
        "console.log(usuarios);",
      ),
    },

    // ───────────────────────── Complementos ─────────────────────────
    { type: "heading", level: 2, text: "Cursos complementarios" },
    {
      type: "paragraph",
      text:
        "Al terminar la ruta principal, el siguiente paso depende de tus objetivos. Dos caminos habituales son un taller de aplicaciones web progresivas, para convertir un sitio en una aplicación instalable, y el estudio de JavaScript del lado del servidor con Node.js, el entorno que vimos en la lección anterior. Ambos se apoyan en lo que aprenderás en la ruta.",
    },

    // ───────────────────────── Datos que cambian ─────────────────────────
    { type: "heading", level: 2, text: "Datos que suelen aparecer desactualizados" },
    {
      type: "table",
      caption: "Material antiguo frente a información verificada",
      headers: ["Suele decirse", "Información verificada"],
      rows: [
        [
          "Una PWA necesita obligatoriamente un service worker para poder instalarse.",
          "Para instalar en navegadores Chromium se exige un manifiesto (nombre, iconos de 192 y 512 px, `start_url` y `display`) y HTTPS. El service worker no es requisito, aunque se usa para el modo sin conexión.",
        ],
        [
          "Las notificaciones web no existen en iPhone.",
          "Existen desde iOS y iPadOS 16.4, pero solo para sitios añadidos a la pantalla de inicio y abiertos desde ahí.",
        ],
        [
          "localStorage guarda 10 MB.",
          "MDN indica unos 5 MiB de localStorage y otros 5 MiB de sessionStorage por origen; 10 MiB es el máximo conjunto de Web Storage.",
        ],
        [
          "El permiso de notificaciones se puede pedir al cargar la página.",
          "Se recomienda pedirlo tras un gesto del usuario; Firefox y Safari lo exigen. Chrome desaconseja pedirlo al cargar.",
        ],
        [
          "AJAX significa necesariamente XML.",
          "El nombre nació con XML en 2005. Hoy se usa sobre todo JSON y la API `fetch`.",
        ],
        [
          "Un curso de hace unos años refleja el estado actual del lenguaje.",
          "JavaScript cambia cada año. Comprueba siempre la fecha y contrasta con MDN y con el estándar vigente (ECMAScript 2026 es la edición 17).",
        ],
      ],
    },

    // ───────────────────────── FAQ ─────────────────────────
    {
      type: "accordion",
      title: "Preguntas frecuentes de esta lección",
      items: [
        {
          title: "¿Necesito crear una cuenta para guardar mi progreso?",
          text:
            "No. El progreso se guarda en tu navegador con `localStorage`. No hay cuentas ni base de datos, por lo que tampoco se recopilan datos personales para esto.",
        },
        {
          title: "¿Por qué mi progreso no aparece en otro dispositivo?",
          text:
            "Porque `localStorage` es local: pertenece a un navegador concreto de un dispositivo concreto. Usa siempre el mismo navegador y el mismo equipo para marcar tu avance.",
        },
        {
          title: "He limpiado los datos del navegador y perdí mi avance, ¿es normal?",
          text:
            "Sí. Al borrar los datos del sitio se borra `localStorage`. En ventanas privadas, además, suele borrarse al cerrarlas.",
        },
        {
          title: "¿Puedo guardar contraseñas en localStorage?",
          text:
            "No. Cualquier script de la página puede leerlo. Úsalo para preferencias y estado de la interfaz, nunca para secretos.",
        },
        {
          title: "¿Qué diferencia hay entre una web y una PWA?",
          text:
            "Una PWA es una web que cumple los requisitos para instalarse (HTTPS y manifiesto) y que puede añadir funciones como el modo sin conexión con un service worker. Se instala desde el navegador, sin tienda de aplicaciones.",
        },
        {
          title: "¿Tengo que seguir las lecciones en orden?",
          text:
            "Si estás empezando, sí conviene. Si ya tienes experiencia, puedes saltar a las lecciones que te interesen: el índice no bloquea ninguna.",
        },
      ],
    },

    // ───────────────────────── Cierre ─────────────────────────
    { type: "heading", level: 2, text: "Cierre" },
    {
      type: "checklist",
      title: "Antes de pasar al Día 3, verifica que puedes explicar…",
      items: [
        "Por qué el aprendizaje de JavaScript no termina y cómo comprobar si un material sigue vigente.",
        "Cuáles son las paradas de la ruta de aprendizaje y por dónde empezarías tú.",
        "Qué es `localStorage`, qué tipo de datos guarda y por qué hay que usar `JSON.stringify` y `JSON.parse`.",
        "Qué datos no deben guardarse en `localStorage` y por qué.",
        "Qué necesita un sitio para poder instalarse como PWA.",
        "Por qué el permiso de notificaciones se pide tras una acción del usuario.",
        "Qué son AJAX y REST a nivel general.",
      ],
    },
    { type: "heading", level: 3, text: "Fuentes consultadas (noviembre de 2026)" },
    {
      type: "list",
      items: [
        "[MDN: Storage quotas and eviction criteria](https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria)",
        "[MDN: Using the Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API)",
        "[MDN: Making PWAs installable](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable)",
        "[MDN: Notifications API](https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API)",
        "[MDN: Notification.requestPermission()](https://developer.mozilla.org/en-US/docs/Web/API/Notification/requestPermission_static)",
        "[MDN: Push API, buenas prácticas](https://developer.mozilla.org/en-US/docs/Web/API/Push_API/Best_Practices)",
        "[Stack Overflow Developer Survey 2026: lenguajes](https://survey.stackoverflow.co/2026/technology/data/languages)",
        "[MobiLoud: notificaciones push en PWA (iOS 16.4+)](https://mobiloud.com/blog/pwa-push-notifications)",
        "[heise: 20 años de AJAX](https://www.heise.de/en/news/20-years-ago-AJAX-revolutionizes-web-development-10285844.html)",
        "[Roy Fielding: tesis doctoral (REST, 2000)](https://ics.uci.edu/~fielding/pubs/dissertation/fielding_dissertation.pdf)",
        "[Calendario de versiones de Node.js](https://github.com/nodejs/Release/blob/main/README.md)",
      ],
    },
  ],
  selfCheck: [
    {
      question: "¿Por qué se dice que el aprendizaje de JavaScript «no termina»?",
      options: [
        "Porque el lenguaje es imposible de dominar",
        "Porque el estándar suma novedades cada año y otras cosas caen en desuso, así que hay que actualizarse siempre",
        "Porque cada navegador lo reinventa",
        "Porque solo se puede aprender con un curso de pago",
      ],
      correctIndex: 1,
      explanation:
        "ECMAScript publica una edición cada año y algunas prácticas, tecnologías o APIs dejan de recomendarse. Por eso conviene comprobar siempre la fecha y la vigencia del material.",
    },
    {
      question: "¿Qué tipo de datos guarda `localStorage`?",
      options: [
        "Cualquier objeto de JavaScript, tal cual",
        "Solo texto; los objetos y listas hay que convertirlos con JSON.stringify",
        "Solo números",
        "Archivos de hasta 1 GB",
      ],
      correctIndex: 1,
      explanation:
        "`localStorage` almacena pares clave/valor de texto. Para guardar objetos o listas se usa `JSON.stringify` y para recuperarlos `JSON.parse`.",
    },
    {
      question: "Marcaste tu avance en el portátil. ¿Por qué no lo ves en el móvil?",
      options: [
        "Porque el curso está roto en móviles",
        "Porque el progreso vive en el localStorage de ese navegador y ese dispositivo, no en un servidor ni en una cuenta",
        "Porque hay que pagar para sincronizar",
        "Porque el móvil usa otra versión de JavaScript",
      ],
      correctIndex: 1,
      explanation:
        "El almacenamiento local pertenece a un navegador concreto de un dispositivo concreto. Por eso se recomienda marcar el avance siempre en el mismo navegador y equipo.",
    },
    {
      question: "¿Qué NO deberías guardar en `localStorage`?",
      options: [
        "El tema claro u oscuro elegido",
        "El borrador de un texto",
        "Una contraseña o un token de acceso",
        "El número del último día visitado",
      ],
      correctIndex: 2,
      explanation:
        "Cualquier script que se ejecute en la página puede leer `localStorage`, así que no es un lugar seguro para secretos ni datos personales.",
    },
    {
      question: "¿Qué necesita como mínimo un sitio para que Chrome o Edge ofrezcan instalarlo como PWA?",
      options: [
        "Un service worker obligatorio y nada más",
        "HTTPS y un manifiesto con nombre, iconos de 192 y 512 px, start_url y display; el service worker es opcional",
        "Estar publicado en una tienda de aplicaciones",
        "Haber sido escrito con un framework concreto",
      ],
      correctIndex: 1,
      explanation:
        "Los navegadores Chromium exigen HTTPS y un manifiesto con esos miembros. El service worker se usa para el modo sin conexión y las notificaciones push, pero no es requisito para instalar.",
    },
    {
      question: "¿Cuándo debe un sitio pedir permiso para enviar notificaciones?",
      options: [
        "Nada más cargar la página, para no perder tiempo",
        "Como respuesta a una acción del usuario, como pulsar un botón",
        "Cada vez que el usuario cambia de pestaña",
        "Nunca; las notificaciones no requieren permiso",
      ],
      correctIndex: 1,
      explanation:
        "MDN recomienda pedir el permiso tras un gesto del usuario, Firefox y Safari lo exigen y Chrome desaconseja pedirlo al cargar. Un permiso denegado casi nunca se recupera.",
    },
    {
      question: "¿Qué hace falta para recibir notificaciones web en un iPhone?",
      options: [
        "Nada, funcionan en cualquier pestaña de Safari",
        "iOS o iPadOS 16.4 o superior, y que el sitio se haya añadido a la pantalla de inicio y se abra desde ahí",
        "Instalar una aplicación nativa del sitio",
        "No es posible en iPhone",
      ],
      correctIndex: 1,
      explanation:
        "Las notificaciones web llegaron a iPhone y iPad con iOS y iPadOS 16.4, pero solo para sitios instalados en la pantalla de inicio.",
    },
    {
      question: "¿Qué se usa hoy normalmente para pedir datos a un servidor sin recargar la página?",
      options: [
        "`fetch` con respuestas en JSON",
        "Siempre `ActiveXObject` con XML",
        "Recargar la página completa",
        "Flash",
      ],
      correctIndex: 0,
      explanation:
        "AJAX nació con XML y `XMLHttpRequest`, pero hoy lo habitual es `fetch` con datos en JSON, sobre todo en las API REST.",
    },
  ],
};
