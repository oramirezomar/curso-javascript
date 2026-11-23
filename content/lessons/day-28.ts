import type { Lesson } from "@/lib/types";

// Une líneas de código sin tener que escapar backticks ni `${}` dentro de template literals.
const L = (...lines: string[]) => lines.join("\n");

// Contenido validado contra fuentes actuales en noviembre de 2026 (ver sección "Fuentes").
export const day28: Lesson = {
  day: 28,
  slug: "objeto-date-fechas-y-horas",
  title: "Objeto Date: obtener y formatear fechas y horas",
  section: "Objetos nativos y utilidades",
  estimatedMinutes: 90,
  icon: "🧰",
  objectives: [
    "Crear fechas con `new Date()`, con componentes numéricos y con un timestamp, y distinguirlo de llamar a `Date()` sin `new`",
    "Leer las partes de una fecha con `getFullYear`, `getMonth`, `getDate`, `getDay`, `getHours` y sus equivalentes UTC",
    "Explicar qué guarda un `Date` y cómo influye la zona horaria",
    "Formatear fechas con `toISOString`, `toLocaleDateString` e `Intl.DateTimeFormat`",
    "Modificar fechas, sumar días, compararlas y calcular diferencias y edades sin errores",
    "Reconocer las trampas más comunes: meses desde 0, texto con formatos no estándar y fechas inválidas",
  ],
  blocks: [
    // ───────────────────────── Apertura ─────────────────────────
    {
      type: "paragraph",
      text:
        "Trabajar con fechas y horas es una necesidad en casi cualquier aplicación: mostrar cuándo se publicó algo, calcular una edad, guardar el momento en que ocurrió una operación, validar que una fecha tenga sentido. JavaScript ofrece para ello el objeto `Date`. Funciona igual en el navegador y en Node.js. Tiene algunas rarezas famosas, como los meses que empiezan en cero, y conviene conocerlas desde el principio para no tropezar con ellas.",
    },
    {
      type: "keyFacts",
      items: [
        { value: "new Date()", label: "Crea un objeto con el instante actual" },
        { value: "Milisegundos", label: "Un Date guarda los milisegundos desde el 1 de enero de 1970 (UTC)" },
        { value: "Mes desde 0", label: "Enero es 0 y diciembre es 11; el día del mes sí empieza en 1" },
        { value: "get / getUTC", label: "Leen la hora local o la del meridiano de Greenwich" },
        { value: "toISOString()", label: "Texto estándar, ideal para guardar y enviar fechas" },
        { value: "Intl", label: "Da formato a fechas según el idioma y la región" },
      ],
    },
    {
      type: "callout",
      variant: "success",
      text:
        "Contenido verificado en noviembre de 2026 con MDN Web Docs (`Date`, `getYear`, `getTimezoneOffset`, `Date.parse`, `Temporal` e `Intl.RelativeTimeFormat`), la documentación de Moment.js y la entrada sobre la hora en México de Wikipedia. Los resultados de los ejemplos se comprobaron ejecutándolos en cuatro zonas horarias distintas, y no cambian. Al final hay una tabla con datos que suelen aparecer desactualizados y la lista de fuentes.",
    },

    // ───────────────────────── Crear ─────────────────────────
    { type: "heading", level: 2, text: "Crear una fecha" },
    {
      type: "paragraph",
      text:
        "`Date` es una función constructora, y como tal se usa con `new`: `new Date()` devuelve un objeto que representa el instante en que se ejecutó. Si la llamas sin `new`, `Date()` no devuelve un objeto, sino un texto con la fecha y hora actuales. Es una confusión frecuente, y se evita recordando que siempre se usa `new`. Hay otro detalle importante: internamente, un `Date` no guarda un texto ni varios campos, sino un único número entero. Según MDN, son los milisegundos transcurridos desde la medianoche del 1 de enero de 1970 en UTC, un instante que se llama la época (epoch). Ese número se conoce como timestamp.",
    },
    {
      type: "paragraph",
      text:
        "Una precisión sobre una explicación muy repetida: el timestamp de JavaScript está en milisegundos, no en segundos. Otros sistemas, como muchas bases de datos y lenguajes de servidor, sí usan segundos, así que conviene tenerlo presente al intercambiar datos. `Date.now()` devuelve ese número para el instante actual sin crear un objeto, y es la forma más cómoda de obtener una marca de tiempo.",
    },
    {
      type: "playground",
      title: "Experimento 1 · Date, new Date y Date.now",
      description: "Los valores concretos cambian en cada ejecución, así que solo se imprimen los tipos y comprobaciones que siempre dan el mismo resultado.",
      code: L(
        "// Date() sin new devuelve un TEXTO; con new devuelve un objeto Date",
        "const texto = Date();",
        "const ahora = new Date();",
        "console.log(typeof texto, typeof ahora, ahora instanceof Date);",
        "",
        "// Date.now() devuelve un NÚMERO: milisegundos desde el 1 de enero de 1970 (UTC)",
        "console.log(typeof Date.now(), Number.isInteger(Date.now()));",
        "console.log(Math.abs(ahora.getTime() - Date.now()) < 1000);",
        "",
        "// El valor real de la fecha es ese número",
        "console.log(new Date(0).toISOString());",
      ),
      expected: L(
        "string object true",
        "number true",
        "true",
        "1970-01-01T00:00:00.000Z",
      ),
    },

    // ───────────────────────── Leer ─────────────────────────
    { type: "heading", level: 2, text: "Leer las partes de una fecha" },
    {
      type: "paragraph",
      text:
        "Para obtener cada parte hay un método `get`. `getFullYear()` devuelve el año completo, `getMonth()` el mes, `getDate()` el día del mes, `getDay()` el día de la semana, y `getHours()`, `getMinutes()`, `getSeconds()` y `getMilliseconds()` la hora. La hora va de 0 a 23, sin AM ni PM. Hay dos detalles que sorprenden a todo el mundo. Los meses y los días de la semana empiezan en 0, como las posiciones de un arreglo: enero es 0, marzo es 2, el domingo es 0 y el jueves es 4. Eso es lo que hace que una fecha de marzo devuelva `2` en `getMonth()`. En cambio, `getDate()` sí empieza en 1. La forma habitual de mostrar el nombre del mes o del día es un arreglo con los nombres, usando el número como índice.",
    },
    {
      type: "image",
      src: "/img/dia-28/numeracion-desde-cero.svg",
      alt: "getDay devuelve el día de la semana de 0 a 6: domingo es 0, lunes 1, martes 2, miércoles 3, jueves 4, viernes 5 y sábado 6. getMonth devuelve el mes de 0 a 11: enero es 0, febrero 1, marzo 2, y así hasta diciembre, que es 11. Debajo, dos notas: getDate sí empieza en 1, y un jueves 12 de marzo da getDay 4, getDate 12 y getMonth 2; y getFullYear devuelve el año completo, mientras que getYear está en desuso y devuelve el año menos 1900, así que 2020 daba 120.",
      caption: "Los meses y los días de la semana empiezan en 0.",
    },
    {
      type: "paragraph",
      text:
        "Existe un método `getYear()`, pero está en desuso, y MDN pide no usarlo: devuelve el año menos 1900, de modo que 2020 daba 120, un resabio del llamado problema del año 2000. Usa siempre `getFullYear()`. Otra propiedad útil es que las componentes que se salen de rango se «desbordan» hacia la siguiente, como verás enseguida. De ahí sale un truco muy usado: el día 0 de un mes es el último día del mes anterior, así que `new Date(año, mes + 1, 0).getDate()` te dice cuántos días tiene un mes.",
    },
    {
      type: "playground",
      title: "Experimento 2 · Crear con componentes y leer sus partes",
      description: "Crear una fecha con componentes y leerlos con `get...` da siempre lo mismo, sin importar tu zona horaria. El 2020 fue bisiesto y el 2021 no, por eso febrero tiene 29 y 28 días.",
      code: L(
        "const dias = [\"domingo\", \"lunes\", \"martes\", \"miércoles\", \"jueves\", \"viernes\", \"sábado\"];",
        "const meses = [\"enero\", \"febrero\", \"marzo\", \"abril\", \"mayo\", \"junio\", \"julio\", \"agosto\", \"septiembre\", \"octubre\", \"noviembre\", \"diciembre\"];",
        "",
        "// año, mes (empieza en 0), día, hora, minuto, segundo, milisegundo",
        "const fecha = new Date(2020, 2, 12, 19, 14, 28, 715);",
        "",
        "console.log(fecha.getFullYear());",
        "console.log(fecha.getMonth(), meses[fecha.getMonth()]);",
        "console.log(fecha.getDate());",
        "console.log(fecha.getDay(), dias[fecha.getDay()]);",
        "console.log(fecha.getHours(), fecha.getMinutes(), fecha.getSeconds(), fecha.getMilliseconds());",
        "",
        "// Una componente fuera de rango \"se desborda\" hacia la siguiente",
        "const desbordada = new Date(2020, 12, 1);",
        "console.log(desbordada.getFullYear(), desbordada.getMonth());",
        "",
        "// El día 0 es el último día del mes anterior: truco para saber cuántos días tiene un mes",
        "console.log(new Date(2020, 2, 0).getDate());",
        "console.log(new Date(2021, 2, 0).getDate());",
      ),
      expected: L(
        "2020",
        "2 marzo",
        "12",
        "4 jueves",
        "19 14 28 715",
        "2021 0",
        "29",
        "28",
      ),
    },

    // ───────────────────────── UTC ─────────────────────────
    { type: "heading", level: 2, text: "Hora local y hora UTC" },
    {
      type: "paragraph",
      text:
        "Aquí aparece el concepto más importante del objeto `Date`: un `Date` representa un único instante, y no guarda ninguna zona horaria. La zona la determina el equipo donde se ejecuta el código. Todos los métodos `get...` leen ese instante en la hora local; sus gemelos `getUTC...` lo leen en UTC, la hora del meridiano de Greenwich. Con el mismo instante, un usuario en la Ciudad de México y otro en Tokio obtienen valores distintos de `getHours()`, pero el mismo `getTime()`.",
    },
    {
      type: "image",
      src: "/img/dia-28/un-instante-varias-horas.svg",
      alt: "Un objeto Date guarda un solo número, 1584061200000, los milisegundos desde el 1 de enero de 1970 en UTC. Ese instante se lee como el 13 de marzo de 2020 a la 01:00 en UTC, con getUTCHours igual a 1. En la Ciudad de México, en UTC menos 6, se lee como el 12 de marzo de 2020 a las 19:00, con getHours igual a 19. En Tokio, en UTC más 9, se lee como el 13 de marzo de 2020 a las 10:00, con getHours igual a 10. El Date no guarda la zona horaria: la decide el equipo donde se ejecuta el código.",
      caption: "Un mismo instante se lee distinto según la zona horaria.",
    },
    {
      type: "paragraph",
      text:
        "Esto tiene una consecuencia práctica: el JavaScript que se ejecuta en el navegador de un usuario usa la hora de ese usuario, aunque tu servidor esté en otro país. Si quieres una referencia común para todos, usa los métodos UTC, o guarda y transmite las fechas en formato ISO. `getTimezoneOffset()` devuelve la diferencia, en minutos, entre UTC y la hora local de quien ejecuta el código: en la Ciudad de México, en invierno, es `360` porque está a seis horas de UTC. Ojo con su nombre: MDN aclara que no es la zona de la fecha concreta, sino la del equipo. Y como el resultado depende de tu zona, nunca lo uses para comparar entre equipos.",
    },
    {
      type: "playground",
      title: "Experimento 3 · Timestamp, UTC e ISO",
      description: "Con `Date.UTC` y los métodos `getUTC...` el resultado es el mismo en cualquier zona horaria. `toISOString` escribe el instante en un formato estándar que termina en `Z`, que significa UTC.",
      code: L(
        "// Date.UTC crea el instante en UTC, sin depender de la zona horaria de quien ejecuta",
        "const instante = new Date(Date.UTC(2020, 2, 13, 1, 0, 0));",
        "",
        "console.log(instante.getTime());",
        "console.log(instante.toISOString());",
        "console.log(JSON.stringify({ creado: instante }));",
        "",
        "// Los métodos getUTC... leen siempre la hora del meridiano de Greenwich",
        "console.log(instante.getUTCFullYear(), instante.getUTCMonth(), instante.getUTCDate());",
        "console.log(instante.getUTCHours(), instante.getUTCMinutes());",
        "",
        "// Un timestamp numérico se puede convertir de nuevo en fecha",
        "console.log(new Date(1584061200000).toISOString());",
        "console.log(new Date(instante.getTime()).getTime() === instante.getTime());",
        "",
        "// getTimezoneOffset da la diferencia en minutos entre UTC y la hora local de quien ejecuta",
        "console.log(Number.isInteger(instante.getTimezoneOffset()));",
      ),
      expected: L(
        "1584061200000",
        "2020-03-13T01:00:00.000Z",
        "{\"creado\":\"2020-03-13T01:00:00.000Z\"}",
        "2020 2 13",
        "1 0",
        "2020-03-13T01:00:00.000Z",
        "true",
        "true",
      ),
    },

    // ───────────────────────── Formatear ─────────────────────────
    { type: "heading", level: 2, text: "Formatear una fecha" },
    {
      type: "paragraph",
      text:
        "`toString()`, `toDateString()` y `toTimeString()` devuelven la fecha como texto en inglés, con la zona horaria. Sirven para depurar, pero no para mostrar al usuario, porque su formato no es adecuado para un público hispanohablante y no está pensado para analizarse. Para mostrar fechas hay herramientas mejores. `toLocaleDateString()`, `toLocaleTimeString()` y `toLocaleString()` escriben la fecha, la hora o ambas con las costumbres de un idioma y una región: `\"es-MX\"` o `\"es-ES\"`, por ejemplo. Aceptan un segundo parámetro de opciones, como `dateStyle: \"full\"`, o `weekday`, `day`, `month`, `year`, con los que decides qué partes mostrar y cómo. Debajo usan el objeto `Intl.DateTimeFormat`, que también puedes usar directamente para reutilizar un formato.",
    },
    {
      type: "paragraph",
      text:
        "Un detalle importante de los formatos locales: los textos exactos salen de los datos de idioma que incluye cada navegador o cada versión de Node.js, y pueden variar un poco entre ellos. Por ejemplo, la hora en `\"es-MX\"` puede salir en formato de 24 horas o con «p. m.», según el entorno. Por eso se fija con opciones como `hourCycle: \"h23\"` cuando importa, y nunca se compara ni se analiza el texto que devuelven. Para guardar o enviar una fecha, en cambio, se usa `toISOString()`, que da un texto estándar en UTC, como `2020-03-12T19:14:28.000Z`, que cualquier sistema puede interpretar sin ambigüedades. Es también lo que produce `JSON.stringify` cuando una fecha va dentro de un objeto. La regla práctica: ISO para guardar y transmitir, y formato local para mostrar.",
    },
    {
      type: "image",
      src: "/img/dia-28/formatos-de-fecha.svg",
      alt: "Un mismo instante, el 12 de marzo de 2020 a las 19:14:28 UTC, escrito de siete maneras. toISOString da 2020-03-12T19:14:28.000Z, para guardar. JSON.stringify de un objeto con la fecha da el mismo texto ISO, para enviar a una API. toLocaleDateString con es-MX da 12/3/2020. toLocaleTimeString con es-MX da 19:14:28. Con es-ES y dateStyle full da jueves, 12 de marzo de 2020. Con en-GB y dateStyle long da 12 March 2020. Con de-DE y dateStyle medium da 12.03.2020. Las cinco formas locales sirven para mostrar la fecha al usuario.",
      caption: "ISO para guardar y enviar; formato local para mostrar.",
    },
    {
      type: "playground",
      title: "Experimento 4 · La misma fecha, escrita de varias formas",
      description: "Se usa `timeZone: \"UTC\"` para que el resultado no dependa de tu zona. En una aplicación real normalmente se omite, para mostrar la hora local del usuario.",
      code: L(
        "const fecha = new Date(Date.UTC(2020, 2, 12, 19, 14, 28));",
        "",
        "// Formato estándar, siempre en UTC",
        "console.log(fecha.toISOString());",
        "",
        "// Formato según el idioma y la región. timeZone: \"UTC\" evita que el resultado dependa de tu zona,",
        "// y hourCycle: \"h23\" fija el reloj de 24 horas (sin a. m. ni p. m.)",
        "console.log(fecha.toLocaleDateString(\"es-MX\", { timeZone: \"UTC\" }));",
        "console.log(fecha.toLocaleTimeString(\"es-MX\", { timeZone: \"UTC\", hourCycle: \"h23\" }));",
        "console.log(fecha.toLocaleString(\"es-MX\", { timeZone: \"UTC\", hourCycle: \"h23\" }));",
        "",
        "// Con opciones: dateStyle y timeStyle",
        "console.log(fecha.toLocaleDateString(\"es-ES\", { dateStyle: \"full\", timeZone: \"UTC\" }));",
        "console.log(fecha.toLocaleDateString(\"en-GB\", { dateStyle: \"long\", timeZone: \"UTC\" }));",
        "console.log(fecha.toLocaleDateString(\"de-DE\", { dateStyle: \"medium\", timeZone: \"UTC\" }));",
        "",
        "// Una opción por componente",
        "const formato = new Intl.DateTimeFormat(\"es-ES\", {",
        "  weekday: \"long\",",
        "  day: \"numeric\",",
        "  month: \"long\",",
        "  year: \"numeric\",",
        "  timeZone: \"UTC\",",
        "});",
        "console.log(formato.format(fecha));",
      ),
      expected: L(
        "2020-03-12T19:14:28.000Z",
        "12/3/2020",
        "19:14:28",
        "12/3/2020, 19:14:28",
        "jueves, 12 de marzo de 2020",
        "12 March 2020",
        "12.03.2020",
        "jueves, 12 de marzo de 2020",
      ),
    },
    {
      type: "paragraph",
      text:
        "Con `toLocaleTimeString()` y un temporizador que se ejecute cada segundo, algo que verás cuando lleguemos a `setInterval`, puedes construir un reloj digital que se actualiza en vivo. De momento, basta con saber obtener el texto de la hora actual.",
    },

    // ───────────────────────── Modificar ─────────────────────────
    { type: "heading", level: 2, text: "Modificar fechas" },
    {
      type: "paragraph",
      text:
        "Cada método `get` tiene su `set`: `setFullYear`, `setMonth`, `setDate`, `setHours` y los demás. Cambian la fecha original, no devuelven una copia. Como un `Date` es un objeto, asignarlo a otra variable no lo copia: ambas apuntan al mismo. Para copiar una fecha, se pasa a `new Date(fecha)`. También es lo que permite sumar días de forma segura: `fecha.setDate(fecha.getDate() + 5)`. Si el resultado se sale del rango, JavaScript lo corrige solo y pasa al mes o al año siguiente, que es lo que se llama desbordamiento. Es una ventaja al sumar días, y una trampa si el día no existe en el mes: `31 de enero` con `setMonth(1)` da un `31 de febrero`, que no existe, y se convierte en `2 de marzo`.",
    },
    {
      type: "image",
      src: "/img/dia-28/desbordamiento.svg",
      alt: "Cuatro ejemplos de desbordamiento. new Date con 2020, 12 y 1 da el 1 de enero de 2021, porque el mes 12 pasa al año siguiente. new Date con 2020, 1 y 30 da el 1 de marzo de 2020, porque febrero de 2020 tiene 29 días. new Date con 2020, 2 y 0 da el 29 de febrero de 2020, porque el día 0 es el último del mes anterior. fecha.setDate de getDate más 5, partiendo del 27 de febrero de 2020, da el 3 de marzo de 2020, porque sumar días recorre los meses.",
      caption: "Lo que se sale de rango pasa a la siguiente componente.",
    },
    {
      type: "playground",
      title: "Experimento 5 · Setters, desbordamiento y copias",
      description: "`sumarDias` copia la fecha antes de modificarla, así que la original no cambia. `original` y `mismo` son el mismo objeto, y `copia` es otro.",
      code: L(
        "// Los métodos set modifican la fecha original",
        "const a = new Date(2020, 1, 27);",
        "a.setDate(a.getDate() + 5);",
        "console.log(a.getMonth(), a.getDate());",
        "",
        "// Si el día no existe en el mes, se desborda al siguiente",
        "const b = new Date(2020, 0, 31);",
        "b.setMonth(1);",
        "console.log(b.getMonth(), b.getDate());",
        "",
        "// Una fecha es un objeto: asignar no copia",
        "const original = new Date(2020, 5, 10);",
        "const mismo = original;",
        "const copia = new Date(original);",
        "mismo.setFullYear(2030);",
        "console.log(original.getFullYear(), copia.getFullYear());",
        "console.log(original === mismo, original === copia);",
        "",
        "// Una función que no modifica la fecha recibida",
        "function sumarDias(fecha, dias) {",
        "  const resultado = new Date(fecha);",
        "  resultado.setDate(resultado.getDate() + dias);",
        "  return resultado;",
        "}",
        "const hoy = new Date(2020, 11, 30);",
        "const luego = sumarDias(hoy, 3);",
        "console.log(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());",
        "console.log(luego.getFullYear(), luego.getMonth(), luego.getDate());",
      ),
      expected: L(
        "2 3",
        "2 2",
        "2030 2020",
        "true false",
        "2020 11 30",
        "2021 0 2",
      ),
    },
    { type: "heading", level: 3, text: "Comparar y restar fechas" },
    {
      type: "paragraph",
      text:
        "Como una fecha es, por dentro, un número, puedes restar dos fechas y obtener la diferencia en milisegundos, que luego conviertes a días, horas o lo que necesites. También puedes comparar con `<` y `>`. Lo que no funciona es `==` ni `===`: comparan referencias, no instantes, y dos fechas distintas con el mismo valor dan `false`. Para saber si dos fechas son el mismo instante, compara sus `getTime()`. Una advertencia sobre los días: si las fechas incluyen una hora local, un cambio de horario de verano puede hacer que un «día» dure 23 o 25 horas. Para restar días enteros sin sorpresas, trabaja en UTC, como en el ejemplo.",
    },
    {
      type: "playground",
      title: "Experimento 6 · Diferencia y comparación",
      description: "La resta da milisegundos. Entre el 12 de marzo y el 25 de diciembre de 2020 hay 288 días.",
      code: L(
        "const inicio = new Date(Date.UTC(2020, 2, 12));",
        "const fin = new Date(Date.UTC(2020, 11, 25));",
        "const mismoInstante = new Date(Date.UTC(2020, 2, 12));",
        "",
        "// Restar dos fechas da la diferencia en milisegundos",
        "const ms = fin - inicio;",
        "console.log(ms);",
        "console.log(Math.round(ms / (1000 * 60 * 60 * 24)), \"días\");",
        "",
        "// Se pueden comparar con < y >",
        "console.log(inicio < fin, inicio > fin);",
        "",
        "// Pero == y === comparan referencias, no instantes",
        "console.log(inicio == mismoInstante, inicio === mismoInstante);",
        "console.log(inicio.getTime() === mismoInstante.getTime());",
      ),
      expected: L(
        "24883200000",
        "288 días",
        "true false",
        "false false",
        "true",
      ),
    },

    // ───────────────────────── Edad ─────────────────────────
    { type: "heading", level: 2, text: "Calcular una edad" },
    {
      type: "paragraph",
      text:
        "Un ejemplo clásico: calcular cuántos años tiene alguien. Se suele proponer restar los timestamps y dividir entre los milisegundos de un año, pero eso falla, porque los años no duran 365 días exactos: los bisiestos tienen uno más. A lo largo de 36 años se acumulan nueve días de diferencia, y una persona a tres días de cumplir años aparece con un año de más. La forma correcta es restar los años y descontar uno si el cumpleaños de este año todavía no ha llegado, comparando el mes y el día.",
    },
    {
      type: "playground",
      title: "Experimento 7 · Edad correcta frente a edad aproximada",
      description: "`calcularEdad` compara mes y día. La división entre 365 días da 36 años a una persona de 35.",
      code: L(
        "function calcularEdad(nacimiento, hoy) {",
        "  let edad = hoy.getFullYear() - nacimiento.getFullYear();",
        "  const aunNoCumple =",
        "    hoy.getMonth() < nacimiento.getMonth() ||",
        "    (hoy.getMonth() === nacimiento.getMonth() && hoy.getDate() < nacimiento.getDate());",
        "  if (aunNoCumple) {",
        "    edad--;",
        "  }",
        "  return edad;",
        "}",
        "",
        "const nacimiento = new Date(1984, 4, 23);",
        "console.log(calcularEdad(nacimiento, new Date(2020, 2, 12)));",
        "console.log(calcularEdad(nacimiento, new Date(2020, 4, 22)));",
        "console.log(calcularEdad(nacimiento, new Date(2020, 4, 23)));",
        "",
        "// Dividir los milisegundos entre 365 días parece más simple, pero falla:",
        "// no cuenta los años bisiestos",
        "const casiCumple = Date.UTC(2020, 4, 20) - Date.UTC(1984, 4, 23);",
        "const aniosMal = Math.floor(casiCumple / (365 * 24 * 60 * 60 * 1000));",
        "console.log(aniosMal, \"frente a\", calcularEdad(nacimiento, new Date(2020, 4, 20)));",
      ),
      expected: L(
        "35",
        "35",
        "36",
        "36 frente a 35",
      ),
    },

    // ───────────────────────── Texto e inválidas ─────────────────────────
    { type: "heading", level: 2, text: "Fechas a partir de texto, y fechas inválidas" },
    {
      type: "paragraph",
      text:
        "`new Date(texto)` también interpreta cadenas de texto, pero con reglas que conviene conocer. El único formato garantizado es el ISO: `2020-03-12` o `2020-03-12T10:30:00`. Con una diferencia sutil, que MDN documenta: si solo se escribe la fecha, se interpreta como UTC, y si se añade la hora sin zona, como hora local. Cualquier otro formato, como `12/03/2020` o `March 12, 2020`, es dependiente de la implementación y puede no funcionar igual en todos los navegadores. MDN llega a decir que la falta de fiabilidad de `Date.parse()` es una de las razones de que se haya propuesto el objeto `Temporal`. La conclusión: para recibir fechas, usa ISO, o los componentes numéricos.",
    },
    {
      type: "paragraph",
      text:
        "Otra sorpresa: una fecha mal escrita no lanza ningún error. Produce un objeto `Date` inválido, que se imprime como `Invalid Date` y cuyo valor es `NaN`. Si recibes fechas de fuera, de un formulario o de una API, valida antes de usarlas, comprobando que `getTime()` no sea `NaN`. Y una última rareza de los números: un año de dos cifras, como `new Date(99, 0, 1)`, se interpreta como 1999.",
    },
    {
      type: "playground",
      title: "Experimento 8 · Texto, fechas inválidas y años de dos cifras",
      description: "`typeof` de una fecha inválida sigue siendo `object`: la forma de detectarla es mirar si `getTime()` es `NaN`.",
      code: L(
        "// Solo fecha, formato ISO: se interpreta como UTC",
        "console.log(new Date(\"2020-03-12\").toISOString());",
        "console.log(new Date(\"2020-03-12T00:00:00Z\").getTime() === new Date(\"2020-03-12\").getTime());",
        "",
        "// Fecha y hora sin zona: se interpreta como hora local",
        "console.log(new Date(\"2020-03-12T10:30:00\").getHours());",
        "",
        "// Una fecha inválida no lanza error: se convierte en Invalid Date y su valor es NaN",
        "const invalida = new Date(\"no es una fecha\");",
        "console.log(String(invalida), Number.isNaN(invalida.getTime()), typeof invalida);",
        "",
        "// Comprobar antes de usar una fecha que viene de fuera",
        "function esFechaValida(valor) {",
        "  const fecha = new Date(valor);",
        "  return !Number.isNaN(fecha.getTime());",
        "}",
        "console.log(esFechaValida(\"2020-03-12\"), esFechaValida(\"2020-13-45\"), esFechaValida(undefined));",
        "",
        "// Dos dígitos de año se interpretan como 19xx",
        "console.log(new Date(99, 0, 1).getFullYear());",
        "console.log(new Date(2020, 1, 30).getMonth());",
      ),
      expected: L(
        "2020-03-12T00:00:00.000Z",
        "true",
        "10",
        "Invalid Date true object",
        "true false false",
        "1999",
        "2",
      ),
    },

    // ───────────────────────── Relativo ─────────────────────────
    { type: "heading", level: 2, text: "Tiempo relativo: «hace 3 días»" },
    {
      type: "paragraph",
      text:
        "Las redes sociales muestran cuánto tiempo pasó desde una publicación: «hace 6 horas», «hace 3 días». Durante años esto se resolvía con librerías como Moment.js. Hoy el propio lenguaje lo incluye en `Intl.RelativeTimeFormat`, que escribe el texto en el idioma que indiques. MDN indica que está disponible en los navegadores desde septiembre de 2020. Con la opción `numeric: \"auto\"` escribe «ayer» y «mañana» en vez de «hace 1 día» y «dentro de 1 día». Solo hay que calcular la diferencia y elegir la unidad adecuada.",
    },
    {
      type: "playground",
      title: "Experimento 9 · Tiempo relativo con Intl.RelativeTimeFormat",
      description: "`haceCuanto` elige la unidad según la diferencia, y recibe `ahora` como parámetro para que el resultado sea siempre el mismo.",
      code: L(
        "// Intl.RelativeTimeFormat escribe \"hace 3 días\" o \"dentro de 2 meses\" en cualquier idioma",
        "const relativo = new Intl.RelativeTimeFormat(\"es\", { numeric: \"auto\" });",
        "console.log(relativo.format(-3, \"day\"));",
        "console.log(relativo.format(-1, \"day\"));",
        "console.log(relativo.format(1, \"day\"));",
        "console.log(relativo.format(-6, \"hour\"));",
        "console.log(relativo.format(2, \"month\"));",
        "",
        "// Una función que elige la unidad según la diferencia",
        "function haceCuanto(fecha, ahora) {",
        "  const segundos = Math.round((fecha - ahora) / 1000);",
        "  const unidades = [",
        "    [\"day\", 86400],",
        "    [\"hour\", 3600],",
        "    [\"minute\", 60],",
        "  ];",
        "  for (const [unidad, tamano] of unidades) {",
        "    if (Math.abs(segundos) >= tamano) {",
        "      return relativo.format(Math.round(segundos / tamano), unidad);",
        "    }",
        "  }",
        "  return relativo.format(segundos, \"second\");",
        "}",
        "",
        "const ahora = new Date(Date.UTC(2020, 2, 12, 12, 0, 0));",
        "console.log(haceCuanto(new Date(Date.UTC(2020, 2, 12, 6, 0, 0)), ahora));",
        "console.log(haceCuanto(new Date(Date.UTC(2020, 2, 9, 12, 0, 0)), ahora));",
        "console.log(haceCuanto(new Date(Date.UTC(2020, 2, 12, 11, 59, 0)), ahora));",
        "console.log(haceCuanto(new Date(Date.UTC(2020, 2, 12, 12, 0, 45)), ahora));",
      ),
      expected: L(
        "hace 3 días",
        "ayer",
        "mañana",
        "hace 6 horas",
        "dentro de 2 meses",
        "hace 6 horas",
        "hace 3 días",
        "hace 1 minuto",
        "dentro de 45 segundos",
      ),
    },

    // ───────────────────────── Estado ─────────────────────────
    { type: "heading", level: 2, text: "Date hoy: qué usar y qué viene" },
    {
      type: "paragraph",
      text:
        "`Date` es suficiente para muchas tareas, pero tiene limitaciones conocidas: la numeración desde cero, la mutabilidad, la poca fiabilidad al interpretar texto y la falta de soporte real para zonas horarias distintas de la local y UTC. Por eso se diseñó `Temporal`, un objeto nuevo pensado como reemplazo completo de `Date`, con zonas horarias y calendarios incorporados. MDN ya considera `Date` una característica heredada, pero aclara que `Temporal` todavía tiene disponibilidad limitada y no funciona en algunos de los navegadores más usados, así que, antes de depender de él, revisa la tabla de compatibilidad. Mientras tanto, para operaciones complejas se usan librerías. La más conocida durante años fue Moment.js, que hoy se describe a sí misma como un proyecto heredado en modo de mantenimiento, y existen alternativas más modernas, como Luxon, date-fns o Day.js. Para la mayoría de los casos de este curso, `Date` e `Intl` bastan.",
    },
    {
      type: "table",
      caption: "Qué usar según lo que necesites",
      headers: ["Qué necesitas", "Cómo se hace"],
      rows: [
        ["La fecha y hora actuales", "`new Date()`"],
        ["Una marca de tiempo numérica del instante actual", "`Date.now()`, en milisegundos"],
        ["Una fecha concreta", "`new Date(año, mes, día)` con el mes desde 0, o un texto ISO"],
        ["Leer el año, mes, día y hora locales", "`getFullYear()`, `getMonth()`, `getDate()`, `getHours()`"],
        ["El día de la semana", "`getDay()`, de 0 (domingo) a 6 (sábado)"],
        ["Leer en UTC, sin depender de la zona", "`getUTCHours()` y los demás `getUTC...`"],
        ["Guardar o enviar una fecha", "`toISOString()`"],
        ["Mostrar una fecha a un usuario", "`toLocaleDateString(\"es-ES\", opciones)` o `Intl.DateTimeFormat`"],
        ["Sumar días", "`copia.setDate(copia.getDate() + n)`, sobre una copia"],
        ["Restar dos fechas", "`fecha2 - fecha1`, en milisegundos"],
        ["Saber si dos fechas son el mismo instante", "`a.getTime() === b.getTime()`"],
        ["Comprobar que una fecha es válida", "`!Number.isNaN(fecha.getTime())`"],
        ["Escribir «hace 3 días»", "`Intl.RelativeTimeFormat`"],
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
          "El timestamp de JavaScript son los segundos desde el 1 de enero de 1970.",
          "Son milisegundos. `Date.now()` y `getTime()` devuelven milisegundos desde la época, que es la medianoche del 1 de enero de 1970 en UTC.",
        ],
        [
          "`getYear()` sirve para obtener el año.",
          "Está en desuso: devuelve el año menos 1900, y 2020 daba 120. Se usa `getFullYear()`.",
        ],
        [
          "`Date()` sin `new` devuelve un objeto fecha.",
          "Devuelve un texto con la fecha y la hora actuales. Con `new` se obtiene el objeto.",
        ],
        [
          "Moment.js es la librería recomendada para trabajar con fechas.",
          "Su propia documentación la describe hoy como un proyecto heredado en modo de mantenimiento. MDN considera `Date` una característica heredada y presenta `Temporal` como su reemplazo, aunque todavía tiene disponibilidad limitada.",
        ],
        [
          "`new Date(\"12/03/2020\")` funciona igual en todos los navegadores.",
          "Solo el formato ISO está garantizado. Los demás dependen de la implementación y pueden dar resultados distintos.",
        ],
        [
          "`new Date(\"2020-03-12\")` se interpreta en la hora local.",
          "Una fecha ISO sin hora se interpreta como UTC. Con hora pero sin zona, como hora local.",
        ],
        [
          "La edad se calcula dividiendo la diferencia de milisegundos entre 365 días.",
          "Falla por los años bisiestos. Hay que comparar año, mes y día.",
        ],
        [
          "`==` compara dos fechas.",
          "Compara referencias, no instantes. Se comparan los `getTime()`, o se usan `<` y `>`.",
        ],
        [
          "`getTimezoneOffset()` devuelve la zona horaria de la fecha.",
          "Devuelve, en minutos, la diferencia entre UTC y la hora local del equipo donde se ejecuta, y no es la zona de la fecha concreta.",
        ],
        [
          "México cambia de horario en abril y octubre.",
          "Desde octubre de 2022, México eliminó el horario de verano a nivel nacional, salvo en Baja California y algunos municipios cercanos a la frontera con Estados Unidos.",
        ],
      ],
    },

    // ───────────────────────── FAQ ─────────────────────────
    {
      type: "accordion",
      title: "Preguntas frecuentes de esta lección",
      items: [
        {
          title: "¿Por qué los meses empiezan en 0?",
          text:
            "Por herencia del diseño original del objeto, que imitaba a una clase de Java. El día del mes sí empieza en 1. Es una de las rarezas que motivaron el nuevo objeto `Temporal`.",
        },
        {
          title: "¿Cuál es el rango de fechas que admite un Date?",
          text:
            "Según MDN, desde el 20 de abril de 271822 a. C. hasta el 13 de septiembre de 275760 d. C. Fuera de ese rango, el valor es `NaN` y la fecha es inválida.",
        },
        {
          title: "¿Cómo obtengo la fecha de hoy sin la hora?",
          text:
            "Con `toLocaleDateString(\"es-ES\")`, para mostrarla, o con `toISOString().slice(0, 10)`, para obtener `2020-03-12` en UTC. Si necesitas una medianoche local, crea `new Date(año, mes, día)` con los componentes.",
        },
        {
          title: "¿Por qué mi fecha sale un día antes?",
          text:
            "Casi siempre porque se creó con `new Date(\"2020-03-12\")`, que es medianoche en UTC, y se leyó con métodos locales en una zona que está detrás de UTC, como América. Crea la fecha con componentes numéricos, o lee con los métodos UTC.",
        },
        {
          title: "¿Cuándo debo usar una librería?",
          text:
            "Cuando necesites zonas horarias que no sean la local ni UTC, calendarios, duraciones o análisis de muchos formatos de texto. Para lo demás, `Date` e `Intl` son suficientes.",
        },
      ],
    },

    // ───────────────────────── Cierre ─────────────────────────
    { type: "heading", level: 2, text: "Cierre" },
    {
      type: "paragraph",
      text:
        "Un `Date` es un número, los milisegundos desde 1970 en UTC, con muchos métodos para leerlo y modificarlo. Recuerda que los meses empiezan en 0, que `get` lee la hora local y `getUTC` la de Greenwich, que `toISOString` sirve para guardar y `toLocaleDateString` para mostrar, y que las fechas se desbordan, se copian con `new Date(fecha)` y se comparan con `getTime()`. Para escribir «hace 3 días» tienes `Intl.RelativeTimeFormat`, y para necesidades avanzadas, `Temporal` y las librerías. En la próxima lección vemos otro objeto nativo de uso diario: `Math`.",
    },
    {
      type: "checklist",
      title: "Antes de pasar al Día 29, verifica que puedes explicar…",
      items: [
        "Qué guarda un `Date` por dentro y en qué unidad.",
        "La diferencia entre `Date()` y `new Date()`.",
        "Por qué `getMonth()` devuelve 2 para marzo y qué devuelve `getDay()` un jueves.",
        "Por qué se usa `getFullYear()` y no `getYear()`.",
        "Qué diferencia hay entre `getHours()` y `getUTCHours()`.",
        "Qué hace `toISOString()` y cuándo conviene usarlo.",
        "Cómo se muestra una fecha con el formato de un idioma.",
        "Qué es el desbordamiento y para qué sirve el día 0 de un mes.",
        "Por qué `fecha1 === fecha2` es falso para dos fechas iguales.",
        "Cómo se calcula una edad sin errores.",
        "Cómo se detecta una fecha inválida.",
        "Por qué no conviene analizar textos con formatos distintos al ISO.",
      ],
    },
    { type: "heading", level: 3, text: "Fuentes consultadas (noviembre de 2026)" },
    {
      type: "list",
      items: [
        "[MDN: Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)",
        "[MDN: Date.parse()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse)",
        "[MDN: Date.prototype.getYear()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getYear)",
        "[MDN: Date.prototype.getTimezoneOffset()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTimezoneOffset)",
        "[MDN: Date.prototype.toLocaleDateString()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString)",
        "[MDN: Intl.RelativeTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat)",
        "[MDN: Temporal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal)",
        "[Moment.js: documentación y estado del proyecto](https://momentjs.com/docs/)",
        "[Wikipedia: Time in Mexico](https://en.wikipedia.org/wiki/Time_in_Mexico)",
      ],
    },
  ],
  selfCheck: [
    {
      question: "¿Qué guarda internamente un objeto `Date`?",
      options: [
        "Un texto con la fecha y la hora",
        "Los milisegundos transcurridos desde el 1 de enero de 1970 en UTC",
        "Los segundos desde 1970 en la hora local",
        "Seis campos: año, mes, día, hora, minuto y segundo",
      ],
      correctIndex: 1,
      explanation:
        "Es un único número, el timestamp en milisegundos. Todo lo demás se calcula a partir de él.",
    },
    {
      question: "¿Qué devuelve `Date()` llamada sin `new`?",
      options: [
        "Un objeto Date con la fecha actual",
        "Un texto con la fecha y la hora actuales",
        "Un número",
        "`undefined`",
      ],
      correctIndex: 1,
      explanation:
        "Sin `new` se obtiene un texto. Con `new Date()` se obtiene el objeto.",
    },
    {
      question: "Una fecha del 12 de marzo, un jueves. ¿Qué devuelven `getMonth()` y `getDay()`?",
      options: ["3 y 4", "2 y 4", "2 y 5", "3 y 5"],
      correctIndex: 1,
      explanation:
        "Los meses empiezan en 0, así que marzo es 2. Los días de la semana van de domingo, 0, a sábado, 6, así que el jueves es 4.",
    },
    {
      question: "¿Qué método se recomienda para obtener el año de una fecha?",
      options: ["`getYear()`", "`getFullYear()`", "`getYears()`", "`getAnio()`"],
      correctIndex: 1,
      explanation:
        "`getYear()` está en desuso y devuelve el año menos 1900.",
    },
    {
      question: "¿Qué diferencia hay entre `getHours()` y `getUTCHours()`?",
      options: [
        "Ninguna",
        "El primero lee la hora local del equipo, y el segundo, la hora del meridiano de Greenwich",
        "El primero devuelve minutos",
        "El segundo solo funciona en servidores",
      ],
      correctIndex: 1,
      explanation:
        "El Date guarda un instante. Cada método lo interpreta en la hora local o en UTC.",
    },
    {
      question: "¿Qué formato conviene usar para guardar o enviar una fecha entre sistemas?",
      options: [
        "El que devuelve `toString()`",
        "El de `toISOString()`",
        "El que devuelve `toLocaleDateString()` en el idioma del usuario",
        "Una cadena escrita a mano",
      ],
      correctIndex: 1,
      explanation:
        "El formato ISO es estándar, no ambiguo y está en UTC. Los formatos locales son para mostrar.",
    },
    {
      question: "¿Qué fecha resulta de `new Date(2020, 1, 30)`?",
      options: [
        "Un error",
        "El 1 de marzo de 2020, porque febrero de 2020 tiene 29 días y el exceso pasa al mes siguiente",
        "El 30 de febrero",
        "Una fecha inválida",
      ],
      correctIndex: 1,
      explanation:
        "Las componentes que se salen de rango se desbordan hacia la siguiente. No se lanza ningún error.",
    },
    {
      question: "Tienes `a = new Date(2020, 0, 1)` y `b = new Date(2020, 0, 1)`. ¿Cuál de estas expresiones es verdadera?",
      options: ["`a == b`", "`a === b`", "`a.getTime() === b.getTime()`", "Ninguna"],
      correctIndex: 2,
      explanation:
        "`==` y `===` comparan referencias, y son dos objetos distintos. `getTime()` compara los instantes.",
    },
    {
      question: "¿Por qué no es correcto calcular una edad dividiendo la diferencia de milisegundos entre 365 días?",
      options: [
        "Porque `Date` no permite restar",
        "Porque no tiene en cuenta los años bisiestos, y a lo largo de varios años se acumulan días",
        "Porque los milisegundos son demasiado pequeños",
        "Sí es correcto",
      ],
      correctIndex: 1,
      explanation:
        "Los días extra acumulados hacen que una persona que aún no ha cumplido años aparezca con uno de más. Hay que comparar año, mes y día.",
    },
    {
      question: "¿Cómo se comprueba si una fecha creada a partir de un texto es inválida?",
      options: [
        "Con `typeof fecha === \"invalid\"`",
        "Comprobando si `fecha.getTime()` es `NaN`",
        "Con un `try` y `catch`, porque siempre lanza un error",
        "No se puede comprobar",
      ],
      correctIndex: 1,
      explanation:
        "Una fecha inválida no lanza error: es un objeto Date cuyo valor es `NaN`.",
    },
  ],
};
