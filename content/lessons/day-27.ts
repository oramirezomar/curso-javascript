import type { Lesson } from "@/lib/types";

// Une líneas de código sin tener que escapar backticks ni `${}` dentro de template literals.
const L = (...lines: string[]) => lines.join("\n");

// Contenido validado contra fuentes actuales en noviembre de 2026 (ver sección "Fuentes").
export const day27: Lesson = {
  day: 27,
  slug: "objeto-console",
  title: "Objeto console: log, table, group, time y assert",
  section: "Objetos nativos y utilidades",
  estimatedMinutes: 75,
  icon: "🧰",
  objectives: [
    "Elegir el método de `console` adecuado a cada nivel de mensaje: `log`, `info`, `warn`, `error` y `debug`",
    "Mostrar varios valores y usar sustituciones de formato como `%s`, `%d` y `%f`",
    "Organizar la salida con `group`, `groupCollapsed`, `table` y `dir`",
    "Contar ejecuciones con `count` y medir tiempos con `time`, `timeLog` y `timeEnd`",
    "Verificar condiciones con `assert` sin detener el programa",
    "Saber qué hace `clear` y por qué conviene no dejar mensajes de depuración en producción",
  ],
  blocks: [
    // ───────────────────────── Apertura ─────────────────────────
    {
      type: "paragraph",
      text:
        "Con esta lección empieza un nuevo bloque: los objetos que JavaScript trae listos para usar y que aparecen en casi cualquier proyecto real. El primero es un viejo conocido: `console`. Lo has usado en todas las lecciones para ver resultados, pero `console.log` es solo uno de sus métodos. El objeto `console` también sirve para marcar errores y avisos, agrupar mensajes, mostrar tablas, contar cuántas veces se ejecuta un fragmento de código, cronometrar operaciones y comprobar condiciones. Son herramientas de depuración muy útiles cuando el código crece.",
    },
    {
      type: "keyFacts",
      items: [
        { value: "log, info, warn, error", label: "Mensajes con distinto nivel de severidad" },
        { value: "%s %d %f", label: "Sustituciones de formato dentro del primer texto" },
        { value: "group / table", label: "Organizan la salida en bloques y tablas" },
        { value: "count / time", label: "Cuentan ejecuciones y miden milisegundos" },
        { value: "assert", label: "Escribe un error solo si la condición es falsa" },
        { value: "Console Standard", label: "El estándar que define estos métodos" },
      ],
    },
    {
      type: "callout",
      variant: "success",
      text:
        "Contenido verificado en noviembre de 2026 con el Console Standard (WHATWG), MDN Web Docs, la documentación de Chrome DevTools y la de Node.js. Los resultados de los ejemplos se comprobaron ejecutándolos. Al final hay una tabla con datos que suelen aparecer desactualizados y la lista de fuentes.",
    },

    // ───────────────────────── Qué es ─────────────────────────
    { type: "heading", level: 2, text: "Qué es el objeto console" },
    {
      type: "paragraph",
      text:
        "`console` es un objeto global, igual que `Math` o `JSON`. Una precisión útil: no forma parte del lenguaje ECMAScript en sí, sino que lo define el Console Standard, un estándar vivo del WHATWG que implementan los navegadores, Node.js y otros entornos. Por eso su salida depende de dónde ejecutes el código: en un navegador aparece en la pestaña Consola de las herramientas de desarrollo, y en Node.js, en la terminal. Los métodos principales son los mismos en todos, aunque el aspecto de la salida varía.",
    },
    {
      type: "image",
      src: "/img/dia-27/mapa-de-metodos.svg",
      alt: "Cinco grupos de métodos de console. Mostrar mensajes: log, info, warn, error y debug. Organizar la salida: group, groupCollapsed, groupEnd, table y dir. Medir y contar: time, timeLog, timeEnd, count y countReset. Verificar: assert, que escribe un error solo si la condición es falsa y no detiene el programa. Limpiar: clear, que borra los mensajes anteriores si el entorno lo permite.",
      caption: "Los métodos de console, agrupados por finalidad.",
    },
    {
      type: "callout",
      variant: "info",
      text:
        "El editor de esta página implementa los métodos que verás hoy y muestra su resultado como texto. En las herramientas de desarrollo de un navegador algunos se dibujan de forma más rica: las tablas son tablas gráficas, los grupos se pliegan y los objetos se despliegan. Para ver esas diferencias, prueba los mismos ejemplos en la consola de tu navegador.",
    },

    // ───────────────────────── Niveles ─────────────────────────
    { type: "heading", level: 2, text: "Niveles de mensaje: log, info, warn, error y debug" },
    {
      type: "paragraph",
      text:
        "Los cinco métodos escriben un mensaje, pero con distinta severidad. `console.log` es el de uso general. `console.info` es igual, para mensajes informativos, como un registro de lo que va pasando en la aplicación. `console.warn` marca un aviso, y las herramientas de desarrollo lo pintan con fondo amarillo. `console.error` marca un error, con fondo rojo, y no es lo mismo que lanzar una excepción: solo escribe el mensaje y el programa continúa. `console.debug` es de nivel más bajo: en Chrome solo se ve si activas el nivel Verbose.",
    },
    {
      type: "paragraph",
      text:
        "¿Para qué sirve diferenciarlos? Porque las herramientas de desarrollo permiten filtrar por nivel, con el menú Log Levels de Chrome, y mostrar solo los errores, o ocultar el ruido. Además, en Node.js `console.error` y `console.warn` escriben en la salida de errores (stderr) y los demás en la salida estándar, lo que permite redirigirlos por separado. Usa el nivel correcto: un aviso o un error que se pierde entre cien `log` es difícil de encontrar.",
    },
    {
      type: "image",
      src: "/img/dia-27/niveles-de-severidad.svg",
      alt: "Tabla de niveles de severidad según Chrome DevTools. console.log e console.info son de nivel Info y se ven como texto normal. console.warn es de nivel Warning y se ve con fondo amarillo. console.error es de nivel Error y se ve con fondo rojo. console.debug es de nivel Verbose y solo se ve con ese nivel activado. console.assert es de nivel Error y solo escribe cuando la condición es falsa.",
      caption: "Cada método tiene un nivel de severidad.",
    },
    {
      type: "playground",
      title: "Experimento 1 · Los cinco niveles de mensaje",
      description: "El texto de salida es el mismo, pero el editor pinta cada nivel con un color distinto: `info` en azul, `warn` en ámbar y `error` en rojo.",
      code: L(
        "console.log(\"mensaje normal\");",
        "console.info(\"información útil\");",
        "console.warn(\"esto es un aviso\");",
        "console.error(\"esto es un error\");",
        "console.debug(\"detalle para depurar\");",
      ),
      expected: L(
        "mensaje normal",
        "información útil",
        "esto es un aviso",
        "esto es un error",
        "detalle para depurar",
      ),
    },

    // ───────────────────────── Argumentos y formato ─────────────────────────
    { type: "heading", level: 2, text: "Varios argumentos y sustituciones de formato" },
    {
      type: "paragraph",
      text:
        "Todos los métodos anteriores aceptan cualquier cantidad de argumentos, que se imprimen en una sola línea separados por un espacio. Así puedes mezclar texto y variables sin concatenar. Otra opción es usar una plantilla de texto, que ya conoces. Y hay una tercera: las sustituciones de formato. Si el primer argumento es un texto con especificadores como `%s`, cada uno se reemplaza por el argumento siguiente, en orden. Es la misma idea de `printf` en lenguajes como C y PHP.",
    },
    {
      type: "image",
      src: "/img/dia-27/sustituciones-de-formato.svg",
      alt: "Tabla de especificadores de formato. Porcentaje s convierte a texto: Hola Ana. Porcentaje d o porcentaje i convierten a entero: 35 años. Porcentaje f convierte a decimal: 19.99 euros. Porcentaje o muestra un objeto con el formato más útil. Porcentaje O muestra un objeto con formato genérico. Porcentaje c aplica estilos CSS y solo tiene efecto en los navegadores.",
      caption: "Cada % del texto toma el siguiente argumento.",
    },
    {
      type: "paragraph",
      text:
        "Según MDN, `%s` inserta un texto, `%d` y `%i` un entero, `%f` un número decimal, `%o` y `%O` un objeto, y `%c` aplica estilos CSS al texto que sigue. Cuidado con `%d`: convierte el valor a entero, así que `3.9` se muestra como `3`; para decimales, usa `%f`. Algunos navegadores admiten especificadores extra, como `%.2f` para fijar los decimales, pero no son estándar y no funcionan en todas partes. Otro truco muy útil, sin sustituciones: si escribes `console.log({ nombre, edad })`, con la sintaxis abreviada de objetos que viste en una lección anterior, cada valor sale etiquetado con el nombre de su variable.",
    },
    {
      type: "playground",
      title: "Experimento 2 · Argumentos, plantillas y sustituciones",
      description: "Las tres primeras líneas producen el mismo texto. Fíjate en que `%d` convierte `3.9` en `3`. El editor muestra los objetos como JSON; en el navegador son objetos desplegables.",
      code: L(
        "const nombre = \"Ana\";",
        "const apellido = \"Ruiz\";",
        "const edad = 35;",
        "",
        "// Varios argumentos: se imprimen en una sola línea, separados por un espacio",
        "console.log(\"Hola, mi nombre es\", nombre, apellido, \"y tengo\", edad, \"años\");",
        "",
        "// Plantilla de texto: lo que ya conoces",
        "console.log(`Hola, mi nombre es ${nombre} ${apellido} y tengo ${edad} años`);",
        "",
        "// Sustituciones de formato: %s texto, %d entero, %f decimal",
        "console.log(\"Hola, mi nombre es %s %s y tengo %d años\", nombre, apellido, edad);",
        "console.log(\"Precio: %f euros, descuento del %d%\", \"19.99\", 15);",
        "console.log(\"Dividido en %i partes\", 3.9);",
        "",
        "// Un objeto con propiedades abreviadas etiqueta cada valor",
        "console.log({ nombre, edad });",
      ),
      expected: L(
        "Hola, mi nombre es Ana Ruiz y tengo 35 años",
        "Hola, mi nombre es Ana Ruiz y tengo 35 años",
        "Hola, mi nombre es Ana Ruiz y tengo 35 años",
        "Precio: 19.99 euros, descuento del 15%",
        "Dividido en 3 partes",
        "{",
        "  \"nombre\": \"Ana\",",
        "  \"edad\": 35",
        "}",
      ),
    },
    {
      type: "paragraph",
      text:
        "El especificador `%c` merece un ejemplo, porque con él se pueden escribir mensajes llamativos en la consola del navegador, por ejemplo advertencias para quien abra las herramientas de desarrollo en un sitio. Los estilos solo tienen efecto en los navegadores; en Node.js y en el editor de esta página se ignoran y solo se imprime el texto.",
    },
    {
      type: "code",
      lang: "js",
      title: "Un mensaje con estilo en la consola del navegador",
      code: L(
        'console.log(',
        '  "%cAlto: esta función es solo para desarrolladores",',
        '  "color: red; font-size: 24px; font-weight: bold",',
        ");",
      ),
    },

    // ───────────────────────── Agrupar y tabular ─────────────────────────
    { type: "heading", level: 2, text: "Agrupar mensajes con group" },
    {
      type: "paragraph",
      text:
        "Cuando una función escribe muchos mensajes, conviene agruparlos. `console.group(etiqueta)` abre un grupo, y todo lo que se escribe después aparece con un nivel más de sangría, hasta que `console.groupEnd()` lo cierra. Los grupos se pueden anidar. En las herramientas de desarrollo, el grupo funciona como un acordeón con un triángulo para plegarlo. La variante `console.groupCollapsed()` hace lo mismo, pero el grupo empieza plegado: hay que desplegarlo para ver su contenido.",
    },
    {
      type: "playground",
      title: "Experimento 3 · Grupos anidados",
      description: "Cada nivel de grupo añade sangría. El editor no puede plegar grupos, así que el contenido de `groupCollapsed` aparece desplegado.",
      code: L(
        "console.group(\"Cursos\");",
        "console.log(\"JavaScript\");",
        "console.group(\"Avanzados\");",
        "console.log(\"Prototipos\");",
        "console.log(\"Clases\");",
        "console.groupEnd();",
        "console.log(\"Flexbox\");",
        "console.groupEnd();",
        "console.log(\"Fuera de los grupos\");",
        "",
        "// groupCollapsed hace lo mismo, pero empieza plegado en las herramientas del navegador",
        "console.groupCollapsed(\"Detalles\");",
        "console.info(\"Solo se ve al desplegar el grupo\");",
        "console.groupEnd();",
      ),
      expected: L(
        "Cursos",
        "  JavaScript",
        "  Avanzados",
        "    Prototipos",
        "    Clases",
        "  Flexbox",
        "Fuera de los grupos",
        "Detalles",
        "  Solo se ve al desplegar el grupo",
      ),
    },
    { type: "heading", level: 2, text: "Mostrar datos como tabla con table" },
    {
      type: "paragraph",
      text:
        "`console.table(datos)` muestra un arreglo o un objeto como tabla. La primera columna, `(index)`, contiene los índices del arreglo o los nombres de las propiedades del objeto. Si los elementos son valores simples, hay una segunda columna `Values`. Si son objetos, cada propiedad se convierte en una columna, y las que un elemento no tiene quedan vacías. Un segundo parámetro, un arreglo con nombres de propiedades, limita las columnas que se muestran. Es mucho más legible que un `console.log` con muchos datos, y te evita escribir un bucle solo para ver el contenido.",
    },
    {
      type: "playground",
      title: "Experimento 4 · console.table con arreglos y objetos",
      description: "El editor dibuja la tabla con caracteres de texto; en las herramientas del navegador es una tabla gráfica. Observa que el segundo elemento tiene una propiedad extra, `ciudad`, y el primero deja esa celda vacía.",
      code: L(
        "// Un arreglo de valores simples: columnas (index) y Values",
        "console.table([\"a\", \"e\", \"i\"]);",
        "",
        "// Un arreglo de objetos: una fila por objeto y una columna por propiedad",
        "const personas = [",
        "  { nombre: \"Ana\", edad: 35 },",
        "  { nombre: \"Luis\", edad: 28, ciudad: \"Lima\" },",
        "];",
        "console.table(personas);",
        "",
        "// El segundo parámetro limita las columnas",
        "console.table(personas, [\"nombre\"]);",
        "",
        "// Un objeto: una fila por propiedad",
        "console.table({ nombre: \"Bonnie\", raza: \"boxer\", color: \"café\" });",
      ),
      expected: L(
        "┌─────────┬────────┐",
        "│ (index) │ Values │",
        "├─────────┼────────┤",
        "│ 0       │ 'a'    │",
        "│ 1       │ 'e'    │",
        "│ 2       │ 'i'    │",
        "└─────────┴────────┘",
        "┌─────────┬────────┬──────┬────────┐",
        "│ (index) │ nombre │ edad │ ciudad │",
        "├─────────┼────────┼──────┼────────┤",
        "│ 0       │ 'Ana'  │ 35   │        │",
        "│ 1       │ 'Luis' │ 28   │ 'Lima' │",
        "└─────────┴────────┴──────┴────────┘",
        "┌─────────┬────────┐",
        "│ (index) │ nombre │",
        "├─────────┼────────┤",
        "│ 0       │ 'Ana'  │",
        "│ 1       │ 'Luis' │",
        "└─────────┴────────┘",
        "┌─────────┬──────────┐",
        "│ (index) │ Values   │",
        "├─────────┼──────────┤",
        "│ nombre  │ 'Bonnie' │",
        "│ raza    │ 'boxer'  │",
        "│ color   │ 'café'   │",
        "└─────────┴──────────┘",
      ),
    },
    { type: "heading", level: 3, text: "Inspeccionar con dir" },
    {
      type: "paragraph",
      text:
        "`console.dir(objeto)` muestra las propiedades de un objeto como una lista jerárquica, sin intentar darle formato especial. Con objetos simples da el mismo resultado que `console.log`, pero con objetos de otro tipo cambia. MDN lo ilustra con un elemento del DOM: `console.log(elemento)` lo muestra como en el inspector de elementos, con su HTML, mientras que `console.dir(elemento)` muestra la lista de sus propiedades como objeto de JavaScript. Lo mismo ocurre con `document`, que verás cuando lleguemos al DOM.",
    },

    // ───────────────────────── Contar y medir ─────────────────────────
    { type: "heading", level: 2, text: "Contar ejecuciones con count" },
    {
      type: "paragraph",
      text:
        "A veces quieres saber cuántas veces se ejecuta un fragmento de código: cuántas veces el usuario pulsa un botón, cuántas peticiones se hacen, cuántas veces se llama a una función que debería llamarse una sola vez. `console.count(etiqueta)` escribe la etiqueta y el número de veces que se ha llamado con ella. Sin etiqueta, usa `default`. Cada etiqueta lleva su propia cuenta, y `console.countReset(etiqueta)` la vuelve a cero.",
    },
    {
      type: "playground",
      title: "Experimento 5 · Contadores con etiqueta",
      description: "Cada etiqueta tiene su propio contador. Tras `countReset`, la cuenta de `código` vuelve a empezar en 1.",
      code: L(
        "for (let i = 1; i <= 3; i++) {",
        "  console.count(\"código\");",
        "}",
        "console.count();",
        "console.count(\"otro\");",
        "console.count(\"código\");",
        "",
        "console.countReset(\"código\");",
        "console.count(\"código\");",
      ),
      expected: L(
        "código: 1",
        "código: 2",
        "código: 3",
        "default: 1",
        "otro: 1",
        "código: 4",
        "código: 1",
      ),
    },
    { type: "heading", level: 2, text: "Medir tiempos con time, timeLog y timeEnd" },
    {
      type: "paragraph",
      text:
        "Para saber cuánto tarda un bloque de código, por ejemplo una operación pesada o, más adelante, una petición a un servidor, se usa un cronómetro con nombre. `console.time(etiqueta)` lo arranca. `console.timeLog(etiqueta)` muestra el tiempo transcurrido sin detenerlo, y admite valores extra para escribirlos a la vez. `console.timeEnd(etiqueta)` muestra el tiempo final y borra el cronómetro. La etiqueta debe ser exactamente la misma en todas las llamadas. Si no la pasas, se usa `default`, y si llamas a `timeEnd` con una etiqueta que no existe, aparece un aviso. MDN indica que el tiempo se muestra en milisegundos y que puede haber hasta 10.000 cronómetros activos en una página.",
    },
    {
      type: "image",
      src: "/img/dia-27/como-funciona-time.svg",
      alt: "Cinco pasos con la etiqueta llenar. Uno: console.time llenar arranca el cronómetro. Dos: el código que se quiere medir se ejecuta mientras el cronómetro corre. Tres: console.timeLog llenar muestra el tiempo parcial y el cronómetro sigue. Cuatro: console.timeEnd llenar muestra el tiempo final y borra el cronómetro. Cinco: una segunda llamada a timeEnd muestra un aviso, porque el cronómetro ya no existe. Debajo: la etiqueta debe ser idéntica, sin etiqueta se usa default, y el tiempo se mide en milisegundos.",
      caption: "Un cronómetro con nombre: se arranca, se consulta y se cierra.",
    },
    {
      type: "playground",
      title: "Experimento 6 · Cronometrar un bucle",
      description: "El tiempo cambia en cada ejecución y en cada equipo, así que este experimento no tiene una salida esperada exacta. Verás una línea de `timeLog` con los valores extra, una de `timeEnd`, y el aviso de la segunda llamada, en ámbar.",
      code: L(
        "// El tiempo exacto cambia en cada ejecución y en cada equipo",
        "console.time(\"llenar\");",
        "",
        "const numeros = [];",
        "for (let i = 0; i < 200000; i++) {",
        "  numeros.push(i);",
        "}",
        "",
        "console.timeLog(\"llenar\", \"con\", numeros.length, \"elementos\");",
        "console.timeEnd(\"llenar\");",
        "",
        "// La etiqueta ya no existe: aparece un aviso",
        "console.timeEnd(\"llenar\");",
      ),
    },
    {
      type: "paragraph",
      text:
        "Con `console.time` obtienes una medición rápida, útil para comparar dos formas de resolver lo mismo. Para mediciones más finas, con valores que puedas guardar y calcular, existe `performance.now()`, que devuelve el tiempo en milisegundos como un número. Y como en cualquier medición, repite el experimento varias veces: el tiempo cambia de una ejecución a otra.",
    },

    // ───────────────────────── assert ─────────────────────────
    { type: "heading", level: 2, text: "Verificar condiciones con assert" },
    {
      type: "paragraph",
      text:
        "`console.assert(condición, mensaje)` comprueba una condición que debería ser verdadera. Si lo es, no ocurre nada. Si es falsa, escribe un mensaje de error que empieza por `Assertion failed`, seguido de los argumentos que pases. El mensaje admite las mismas sustituciones de formato que `log`. Importante: `assert` no lanza una excepción ni detiene el programa, solo escribe en la consola. Es una forma mínima de dejar comprobaciones en el código mientras lo desarrollas, por ejemplo «aquí `x` siempre debería ser menor que `y`». No sustituye a una librería de pruebas como Jest o Vitest, que dan informes, agrupan casos y permiten automatizar todo.",
    },
    {
      type: "playground",
      title: "Experimento 7 · assert con y sin mensaje",
      description: "La primera aserción se cumple y no escribe nada. Las otras dos fallan, se pintan como error y el programa sigue.",
      code: L(
        "const x = 1;",
        "const y = 2;",
        "",
        "// Si la condición es verdadera, no pasa nada",
        "console.assert(x < y, \"x debe ser menor que y\");",
        "console.log(\"la primera prueba pasó\");",
        "",
        "// Si es falsa, se escribe un error, pero el programa NO se detiene",
        "const z = 3;",
        "console.assert(z < y, \"z debe ser menor que y, pero vale %d\", z);",
        "console.assert(false);",
        "console.log(\"el código sigue ejecutándose\");",
      ),
      expected: L(
        "la primera prueba pasó",
        "Assertion failed: z debe ser menor que y, pero vale 3",
        "Assertion failed",
        "el código sigue ejecutándose",
      ),
    },

    // ───────────────────────── clear y dir ─────────────────────────
    { type: "heading", level: 2, text: "Limpiar la consola con clear" },
    {
      type: "paragraph",
      text:
        "`console.clear()` borra los mensajes anteriores, si el entorno lo permite: en un navegador quita todo, y en una terminal de Node.js intenta limpiar la pantalla. Es útil al principio de un programa que se ejecuta muchas veces, para ver solo la salida actual. Una advertencia de la documentación de Chrome: si está activada la opción Preserve Log, `console.clear()` queda deshabilitado.",
    },
    {
      type: "playground",
      title: "Experimento 8 · clear y dir",
      description: "El mensaje anterior a `clear` desaparece, y solo queda la salida de `dir`.",
      code: L(
        "console.log(\"esto se borrará\");",
        "console.clear();",
        "",
        "// dir muestra las propiedades de un objeto",
        "console.dir({ lenguaje: \"JavaScript\", año: 1995, tipado: \"dinámico\" });",
      ),
      expected: L(
        "{",
        "  \"lenguaje\": \"JavaScript\",",
        "  \"año\": 1995,",
        "  \"tipado\": \"dinámico\"",
        "}",
      ),
    },
    {
      type: "paragraph",
      text:
        "Hay más métodos, como `console.trace()`, que escribe la pila de llamadas que condujo hasta ese punto, y `console.dirxml()`. Además, algunos entornos añaden métodos y propiedades que no están en el estándar. Los que hemos visto hoy son los que conviene dominar.",
    },
    {
      type: "table",
      caption: "Qué método usar según lo que quieras",
      headers: ["Qué quieres", "Método"],
      rows: [
        ["Un mensaje de uso general", "`console.log(...)`"],
        ["Marcar un aviso o un error", "`console.warn(...)` y `console.error(...)`"],
        ["Insertar valores dentro de un texto", "`console.log(\"Hola %s\", nombre)` o una plantilla de texto"],
        ["Etiquetar variables al imprimirlas", "`console.log({ nombre, edad })`"],
        ["Agrupar mensajes con sangría", "`console.group(...)` y `console.groupEnd()`"],
        ["Ver un arreglo o un objeto como tabla", "`console.table(datos)`"],
        ["Ver las propiedades de un objeto", "`console.dir(objeto)`"],
        ["Contar cuántas veces se ejecuta algo", "`console.count(\"etiqueta\")`"],
        ["Medir cuánto tarda un bloque de código", "`console.time(...)` y `console.timeEnd(...)`"],
        ["Comprobar una condición sin detener el programa", "`console.assert(condición, mensaje)`"],
        ["Borrar los mensajes anteriores", "`console.clear()`"],
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
          "`console` es parte del lenguaje JavaScript.",
          "No está en ECMAScript. Lo define el Console Standard del WHATWG, y lo implementan los navegadores, Node.js y otros entornos.",
        ],
        [
          "`console.assert` lanza un error y detiene el programa.",
          "Solo escribe un mensaje de error en la consola cuando la condición es falsa. La ejecución continúa.",
        ],
        [
          "`console.group` y `console.groupCollapsed` son lo mismo.",
          "`groupCollapsed` crea el grupo plegado, y hay que desplegarlo para ver su contenido. `group` lo crea desplegado.",
        ],
        [
          "`console.table` solo sirve con objetos.",
          "Acepta arreglos y objetos, y un segundo parámetro con las columnas que se quieren mostrar.",
        ],
        [
          "`console.dir` es igual que `console.log`.",
          "Con objetos simples se parecen, pero con elementos del DOM `log` los muestra como en el inspector y `dir` muestra la lista de propiedades.",
        ],
        [
          "`%d` imprime el número tal cual, con sus decimales.",
          "`%d` y `%i` convierten a entero; para decimales se usa `%f`. Los formatos de precisión, como `%.2f`, no son estándar.",
        ],
        [
          "`console.time` necesita siempre una etiqueta.",
          "Es opcional: sin ella se usa `default`. Eso sí, `timeEnd` debe llevar la misma etiqueta que `time`; si no existe, aparece un aviso.",
        ],
        [
          "`new Array(1000000)` está en desuso, hay que usar solo corchetes.",
          "El constructor `Array` no está obsoleto. Crea un arreglo con huecos (posiciones vacías) de esa longitud. Los corchetes son más cómodos para listas, y `Array.from` para generar valores.",
        ],
        [
          "Dejar `console.log` en producción no tiene consecuencias.",
          "Cualquier usuario puede abrir la consola y ver esos mensajes, y los datos internos que contengan. Por eso ESLint tiene la regla `no-console`, que los señala.",
        ],
      ],
    },

    // ───────────────────────── FAQ ─────────────────────────
    {
      type: "accordion",
      title: "Preguntas frecuentes de esta lección",
      items: [
        {
          title: "¿Dónde veo la salida de console?",
          text:
            "En un navegador, en la pestaña Consola de las herramientas de desarrollo (suele abrirse con F12). En Node.js, en la terminal donde ejecutas el programa.",
        },
        {
          title: "¿Funcionan igual en Node.js?",
          text:
            "Los métodos principales sí. En Node.js, `console.error` y `console.warn` escriben en `stderr`, y `console.log` e `info` en `stdout`, y `console.table` dibuja la tabla con texto en la terminal.",
        },
        {
          title: "¿Por qué no veo mis mensajes de `console.debug` en Chrome?",
          text:
            "Porque tienen nivel Verbose, y Chrome puede tenerlo desactivado. Actívalo en el menú Log Levels de la consola.",
        },
        {
          title: "¿Por qué `console.clear()` no limpia nada en Chrome?",
          text:
            "Según la documentación de Chrome DevTools, si la opción Preserve Log está activada, `console.clear()` queda deshabilitado.",
        },
        {
          title: "¿Cuántos cronómetros puedo tener a la vez?",
          text:
            "MDN indica que puede haber hasta 10.000 cronómetros activos en una página, cada uno con una etiqueta distinta.",
        },
        {
          title: "¿Debo dejar los console.log en el código que subo?",
          text:
            "No: son una herramienta de desarrollo. Quítalos antes de publicar, o usa una regla como `no-console` de ESLint para detectarlos, y una librería de registro (logging) si necesitas guardar mensajes de forma permanente.",
        },
      ],
    },

    // ───────────────────────── Cierre ─────────────────────────
    { type: "heading", level: 2, text: "Cierre" },
    {
      type: "paragraph",
      text:
        "El objeto `console` es mucho más que `console.log`. Usa `warn` y `error` para lo que lo merece, aprovecha las sustituciones de formato y los objetos con propiedades abreviadas para imprimir con claridad, agrupa la salida con `group`, muestra datos con `table`, cuenta con `count`, cronometra con `time` y deja comprobaciones con `assert`. Con ellas depurarás más rápido. En la próxima lección seguimos con otro objeto nativo muy usado: `Date`, para trabajar con fechas y horas.",
    },
    {
      type: "checklist",
      title: "Antes de pasar al Día 28, verifica que puedes explicar…",
      items: [
        "En qué se diferencian `log`, `info`, `warn`, `error` y `debug`, y por qué conviene usar el nivel correcto.",
        "Cómo se escriben varios valores en una línea y cómo funcionan `%s`, `%d` y `%f`.",
        "Por qué `%d` convierte `3.9` en `3`.",
        "Para qué sirve `console.log({ nombre, edad })`.",
        "Cómo se abren, anidan y cierran los grupos, y qué cambia con `groupCollapsed`.",
        "Qué muestra `console.table` y cómo se limitan sus columnas.",
        "En qué se diferencian `console.log` y `console.dir`.",
        "Cómo se cuentan ejecuciones con `count` y se reinician con `countReset`.",
        "Cómo se mide un tiempo con `time`, `timeLog` y `timeEnd`, y por qué la etiqueta debe coincidir.",
        "Qué hace `assert` cuando la condición es falsa y qué no hace.",
        "Por qué no conviene dejar mensajes de depuración en producción.",
      ],
    },
    { type: "heading", level: 3, text: "Fuentes consultadas (noviembre de 2026)" },
    {
      type: "list",
      items: [
        "[Console Standard (WHATWG)](https://console.spec.whatwg.org)",
        "[MDN: console](https://developer.mozilla.org/en-US/docs/Web/API/console)",
        "[MDN: console.assert()](https://developer.mozilla.org/en-US/docs/Web/API/console/assert_static)",
        "[MDN: console.table()](https://developer.mozilla.org/en-US/docs/Web/API/console/table_static)",
        "[MDN: console.groupCollapsed()](https://developer.mozilla.org/en-US/docs/Web/API/console/groupCollapsed_static)",
        "[MDN: console.dir()](https://developer.mozilla.org/en-US/docs/Web/API/console/dir_static)",
        "[MDN: console.count()](https://developer.mozilla.org/en-US/docs/Web/API/console/count_static)",
        "[MDN: console.time()](https://developer.mozilla.org/en-US/docs/Web/API/console/time_static)",
        "[MDN: console.clear()](https://developer.mozilla.org/en-US/docs/Web/API/console/clear_static)",
        "[MDN: Performance.now()](https://developer.mozilla.org/en-US/docs/Web/API/Performance/now)",
        "[MDN: constructor Array()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Array)",
        "[Chrome DevTools: registrar mensajes en la consola](https://developer.chrome.com/docs/devtools/console/log)",
        "[Chrome DevTools: referencia de la API de la consola](https://developer.chrome.com/docs/devtools/console/api)",
        "[Node.js: console](https://nodejs.org/api/console.html)",
        "[ESLint: no-console](https://eslint.org/docs/latest/rules/no-console)",
      ],
    },
  ],
  selfCheck: [
    {
      question: "¿Cuál de estos métodos se usa para marcar un aviso, que las herramientas del navegador pintan con fondo amarillo?",
      options: ["`console.info`", "`console.warn`", "`console.error`", "`console.debug`"],
      correctIndex: 1,
      explanation:
        "`warn` es de nivel Warning. `error` se pinta en rojo, y ni uno ni otro detienen el programa.",
    },
    {
      question: "¿Qué escribe `console.log(\"Hola %s, tienes %d años\", \"Ana\", 35)`?",
      options: [
        "`Hola %s, tienes %d años Ana 35`",
        "`Hola Ana, tienes 35 años`",
        "`Hola Ana tienes 35 años`",
        "Un error de sintaxis",
      ],
      correctIndex: 1,
      explanation:
        "Cada especificador se reemplaza por el argumento siguiente: `%s` por el texto y `%d` por el entero.",
    },
    {
      question: "¿Qué muestra `console.log(\"Partes: %d\", 3.9)`?",
      options: ["`Partes: 3.9`", "`Partes: 3`", "`Partes: 4`", "`Partes: NaN`"],
      correctIndex: 1,
      explanation:
        "`%d` convierte a entero y descarta los decimales. Para un decimal se usa `%f`.",
    },
    {
      question: "¿Para qué sirve `console.log({ nombre, edad })`?",
      options: [
        "Para guardar los datos en un archivo",
        "Para imprimir un objeto con cada valor etiquetado con el nombre de su variable",
        "Para lanzar un error",
        "Para borrar las variables",
      ],
      correctIndex: 1,
      explanation:
        "Gracias a la sintaxis abreviada de los objetos literales, cada propiedad toma el nombre de la variable.",
    },
    {
      question: "¿Qué hace `console.groupCollapsed(\"Detalles\")`?",
      options: [
        "Cierra el grupo actual",
        "Crea un grupo que empieza plegado, de modo que hay que desplegarlo para ver su contenido",
        "Borra todos los grupos",
        "Muestra una tabla",
      ],
      correctIndex: 1,
      explanation:
        "Es igual que `group`, pero el grupo se crea plegado. Se cierra con `console.groupEnd()`.",
    },
    {
      question: "¿Cómo se limita `console.table` a mostrar solo la columna `nombre` de un arreglo de objetos?",
      options: [
        "`console.table(datos, \"nombre\")`",
        "`console.table(datos, [\"nombre\"])`",
        "`console.table(datos.nombre)`",
        "No se puede limitar",
      ],
      correctIndex: 1,
      explanation:
        "El segundo parámetro es un arreglo con los nombres de las propiedades que se quieren mostrar.",
    },
    {
      question: "Llamas a `console.count(\"clic\")` tres veces y luego a `console.countReset(\"clic\")`. ¿Qué escribe la siguiente llamada a `console.count(\"clic\")`?",
      options: ["`clic: 4`", "`clic: 1`", "`clic: 0`", "Un error"],
      correctIndex: 1,
      explanation:
        "`countReset` pone el contador de esa etiqueta a cero, así que la siguiente llamada vuelve a mostrar 1.",
    },
    {
      question: "Llamas a `console.time(\"carga\")` y después a `console.timeEnd(\"Carga\")`. ¿Qué ocurre?",
      options: [
        "Se muestra el tiempo normalmente",
        "Aparece un aviso, porque la etiqueta debe ser exactamente la misma",
        "El programa se detiene",
        "Se muestra 0 ms",
      ],
      correctIndex: 1,
      explanation:
        "Las etiquetas distinguen mayúsculas y minúsculas. Con una etiqueta que no existe, se escribe un aviso.",
    },
    {
      question: "¿Qué hace `console.assert(x < y, \"x debe ser menor que y\")` cuando `x` es mayor que `y`?",
      options: [
        "Lanza una excepción y detiene el programa",
        "Escribe un mensaje de error en la consola, y el programa continúa",
        "No hace nada",
        "Cambia el valor de `x`",
      ],
      correctIndex: 1,
      explanation:
        "Escribe `Assertion failed` con el mensaje. No lanza ninguna excepción.",
    },
    {
      question: "¿Cuál es la diferencia entre `console.log(elemento)` y `console.dir(elemento)` con un elemento del DOM?",
      options: [
        "No hay ninguna",
        "`log` lo muestra como en el inspector de elementos, y `dir` lista sus propiedades como objeto de JavaScript",
        "`dir` lo borra de la página",
        "`log` solo funciona con texto",
      ],
      correctIndex: 1,
      explanation:
        "Según MDN, `dir` no intenta darle formato especial: muestra la lista de propiedades.",
    },
  ],
};
