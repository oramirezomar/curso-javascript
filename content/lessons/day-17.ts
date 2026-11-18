import type { Lesson } from "@/lib/types";

// Une líneas de código sin tener que escapar backticks ni `${}` dentro de template literals.
const L = (...lines: string[]) => lines.join("\n");

// Contenido validado contra fuentes actuales en noviembre de 2026 (ver sección "Fuentes").
export const day17: Lesson = {
  day: 17,
  slug: "manejo-de-errores-try-catch-finally",
  title: "Manejo de errores: try, catch y finally",
  section: "Control de flujo",
  estimatedMinutes: 80,
  icon: "🧯",
  objectives: [
    "Explicar qué es un error (o excepción) en JavaScript y qué ocurre cuando nadie lo maneja",
    "Escribir `try`, `catch` y `finally`, y explicar cuándo se ejecuta cada bloque",
    "Reconocer los tipos de error del lenguaje y leer `name` y `message` de un error",
    "Lanzar errores propios con `throw` para validar datos, y relanzar un error que no sabes manejar",
    "Saber qué errores no captura un `try...catch` y para qué sirve realmente `finally`",
  ],
  blocks: [
    // ───────────────────────── Apertura ─────────────────────────
    {
      type: "paragraph",
      text:
        "Con las condicionales y los ciclos ya puedes escribir programas que deciden y repiten. Pero los programas reales también fallan: un formulario llega con texto donde se esperaba un número, un texto JSON viene mal formado, una variable se escribe con una letra de más. JavaScript ofrece una estructura para detectar y manejar esos fallos: `try...catch...finally`. Se parece a un `if...else`, pero en lugar de preguntar por una condición, intenta ejecutar un bloque y, si algo sale mal, ejecuta otro.",
    },
    {
      type: "keyFacts",
      items: [
        { value: "try", label: "El código que se intenta ejecutar" },
        { value: "catch", label: "Se ejecuta solo si el try lanza un error, y recibe ese error" },
        { value: "finally", label: "Se ejecuta siempre, haya error o no" },
        { value: "throw", label: "Lanza un error propio" },
        { value: "Error", label: "Objeto con las propiedades name y message" },
        { value: "Asíncrono", label: "El try no captura errores que ocurren después de que termina" },
      ],
    },
    {
      type: "callout",
      variant: "success",
      text:
        "Contenido verificado en noviembre de 2026 con MDN Web Docs (`try...catch`, `throw`, el objeto `Error` y cada tipo de error) y con la documentación de ESLint. Los resultados de los ejemplos se comprobaron ejecutándolos. Al final hay una tabla con datos que suelen aparecer desactualizados y la lista de fuentes.",
    },

    // ───────────────────────── Qué es un error ─────────────────────────
    { type: "heading", level: 2, text: "Qué es un error en JavaScript" },
    {
      type: "paragraph",
      text:
        "Cuando algo falla mientras el programa se ejecuta, JavaScript crea un objeto de error y lo lanza (en inglés, «throw»). A un error lanzado también se le llama excepción. Si nadie lo maneja, el código que venía a continuación en ese mismo flujo ya no se ejecuta, y la consola del navegador muestra el conocido mensaje en rojo con el tipo de error y una descripción.",
    },
    {
      type: "paragraph",
      text:
        "Manejar un error significa decidir qué hacer cuando ocurre: avisar al usuario con un mensaje claro, usar un valor por defecto, registrar lo sucedido o intentar otra vía. Eso es lo que permite `try...catch`. No sirve para ocultar los mensajes rojos, sino para sustituirlos por una respuesta pensada por ti.",
    },
    {
      type: "callout",
      variant: "warning",
      text:
        "Un `catch` vacío traga el error y el programa sigue como si nada hubiera pasado, lo que dificulta encontrar fallos más adelante. Como mínimo, registra el error con `console.error`. La regla `no-empty` de ESLint avisa de los bloques vacíos.",
    },

    // ───────────────────────── Estructura ─────────────────────────
    { type: "heading", level: 2, text: "La estructura try, catch y finally" },
    {
      type: "paragraph",
      text:
        "La estructura tiene tres bloques. En `try` escribes el código que quieres evaluar. En `catch` escribes qué hacer si ese código lanza un error: recibe el error en una variable (por convención `error` o `e`) que solo existe dentro del `catch`. En `finally` escribes lo que debe ejecutarse siempre al final, ocurra o no un error. Los tres bloques llevan llaves obligatoriamente, aunque tengan una sola instrucción.",
    },
    {
      type: "code",
      lang: "js",
      title: "Forma básica de try...catch...finally",
      code: L(
        "try {",
        "  // código que se quiere evaluar",
        "} catch (error) {",
        "  // se ejecuta solo si el try lanzó un error; error es el error capturado",
        "} finally {",
        "  // se ejecuta siempre, haya error o no",
        "}",
      ),
    },
    {
      type: "paragraph",
      text:
        "El `catch` y el `finally` son opcionales por separado, pero el `try` necesita al menos uno de los dos. Existen, por tanto, tres formas: `try...catch`, `try...finally` y `try...catch...finally`. Y desde ECMAScript 2019, si no vas a usar el error dentro del `catch`, puedes omitir la variable y los paréntesis: `catch { ... }`.",
    },
    {
      type: "image",
      src: "/img/dia-17/flujo-try-catch-finally.svg",
      alt: "Diagrama con tres cajas: try, catch y finally. Camino 1: si no se lanzó ningún error, el catch se salta y se pasa del try directamente al finally. Camino 2: si se lanzó un error, el resto del try se abandona, se ejecuta el catch y después el finally. En ambos casos el finally se ejecuta y el programa continúa.",
      caption: "El catch solo se ejecuta si hay un error; el finally se ejecuta siempre.",
    },
    {
      type: "playground",
      title: "Experimento 1 · try, catch y finally cuando no hay error",
      description: "El `catch` nunca se ejecuta, porque el `try` no lanza nada. El `finally` sí.",
      code: L(
        "try {",
        '  console.log("dentro del try");',
        "} catch (error) {",
        '  console.log("dentro del catch");',
        "} finally {",
        '  console.log("dentro del finally");',
        "}",
      ),
      expected: L("dentro del try", "dentro del finally"),
    },
    { type: "heading", level: 3, text: "Qué pasa cuando sí hay un error" },
    {
      type: "paragraph",
      text:
        "Ahora provocamos un error a propósito: entre dos mensajes del `try` usamos una variable que no declaramos. En el momento en que una instrucción del `try` lanza el error, la ejecución del `try` se detiene ahí. Las instrucciones que seguían no se ejecutan, y el control salta directamente al `catch`, como si fuera un `return` automático hacia ese bloque. Después se ejecuta el `finally`, y el programa continúa con normalidad, sin el mensaje rojo.",
    },
    {
      type: "image",
      src: "/img/dia-17/salto-al-catch.svg",
      alt: "Un bloque try con tres líneas de código. La primera, que imprime antes, se ejecuta con normalidad. La segunda usa la variable noExiste y lanza un ReferenceError. La tercera, que imprimiría después, se salta y nunca se ejecuta. El control pasa al catch, que imprime el nombre del error, y el finally se ejecuta siempre. La salida es antes, ReferenceError, fin.",
      caption: "Tras el error, el resto del try se salta y el control pasa al catch.",
    },
    {
      type: "playground",
      title: "Experimento 2 · Un error dentro del try",
      description: "Falta el segundo mensaje del `try`: se detuvo en el error. El texto exacto de `message` cambia de un navegador a otro, por eso solo comprobamos que no esté vacío.",
      code: L(
        "try {",
        '  console.log("primer mensaje del try");',
        "  console.log(noExiste);          // variable no declarada: lanza un error",
        '  console.log("segundo mensaje del try");',
        "} catch (error) {",
        '  console.log("catch:", error.name);',
        '  console.log("mensaje con texto:", error.message.length > 0);',
        "} finally {",
        '  console.log("finally se ejecuta siempre");',
        "}",
        "",
        'console.log("el programa sigue");',
      ),
      expected: L(
        "primer mensaje del try",
        "catch: ReferenceError",
        "mensaje con texto: true",
        "finally se ejecuta siempre",
        "el programa sigue",
      ),
    },
    {
      type: "callout",
      variant: "info",
      text:
        "Ese error es un `ReferenceError`, no un error de sintaxis, como a veces se explica. Se produce al ejecutar el código, cuando el programa intenta usar una variable que no existe. Un error de sintaxis real (por ejemplo, una llave sin cerrar) impide que el script siquiera empiece a ejecutarse, por lo que un `try...catch` escrito en ese mismo script no puede capturarlo. Solo se captura cuando la sintaxis se analiza en tiempo de ejecución, como en `JSON.parse`, `eval` o `new Function`.",
    },

    // ───────────────────────── El objeto de error ─────────────────────────
    { type: "heading", level: 2, text: "El objeto de error y sus tipos" },
    {
      type: "paragraph",
      text:
        "Lo que recibe el `catch` es el valor que se lanzó, y normalmente es un objeto de error. Los dos datos que más usarás son `name`, el tipo de error («ReferenceError», «TypeError»…), y `message`, la descripción. Si imprimes el objeto completo con `console.log(error)` o con `console.error(error)`, verás ambos, y en los navegadores también un rastro de dónde ocurrió (la propiedad `stack`, que no forma parte del estándar pero está disponible). Un error creado con un segundo argumento puede traer además `cause`, la causa original.",
    },
    {
      type: "paragraph",
      text:
        "El lenguaje define un conjunto de tipos de error, todos derivados de `Error`. Saber cuál es te dice por dónde empezar a buscar. El tipo `Error` es el genérico, el que se usa para los errores de la lógica de tu propio programa.",
    },
    {
      type: "image",
      src: "/img/dia-17/tipos-de-error.svg",
      alt: "Ocho tarjetas con los tipos de error. Error es el genérico y la base de todos los demás. ReferenceError ocurre al usar una variable que no existe. TypeError ocurre cuando el valor no es del tipo que la operación necesita, por ejemplo null.propiedad. RangeError ocurre cuando un número está fuera de su rango válido, por ejemplo toFixed con 101. SyntaxError ocurre con un texto de sintaxis inválida, por ejemplo JSON.parse con una llave sola. URIError ocurre con un argumento inválido en una función de URI. EvalError existe por compatibilidad y los motores actuales ya no lo lanzan. AggregateError agrupa varios errores en uno.",
      caption: "Todos los tipos comparten name y message.",
    },
    {
      type: "playground",
      title: "Experimento 3 · Provocar distintos tipos de error",
      description: "Cada función falla de una manera distinta. El `catch` solo imprime el tipo.",
      code: L(
        "const casos = [",
        '  ["variable que no existe", function () { return noExiste; }],',
        '  ["null.propiedad", function () { return null.propiedad; }],',
        '  ["toFixed(101)", function () { return (1).toFixed(101); }],',
        '  ["JSON roto", function () { return JSON.parse("{"); }],',
        '  ["URI inválida", function () { return decodeURIComponent("%"); }],',
        "];",
        "",
        "casos.forEach(function (caso) {",
        "  try {",
        "    caso[1]();",
        "  } catch (error) {",
        '    console.log(caso[0] + " → " + error.name);',
        "  }",
        "});",
      ),
      expected: L(
        "variable que no existe → ReferenceError",
        "null.propiedad → TypeError",
        "toFixed(101) → RangeError",
        "JSON roto → SyntaxError",
        "URI inválida → URIError",
      ),
    },

    // ───────────────────────── throw ─────────────────────────
    { type: "heading", level: 2, text: "Lanzar errores propios con throw" },
    {
      type: "paragraph",
      text:
        "Hay fallos que JavaScript no considera errores, pero que sí lo son para tu programa. Imagina que recibes datos de un formulario y necesitas que sean numéricos, pero llega texto. Para ese caso existe la palabra reservada `throw` (lanzar). Con `throw new Error(\"mensaje\")` creas un error y lo lanzas tú: la ejecución se interrumpe en ese punto y salta al `catch` más cercano, igual que con un error del lenguaje. El mensaje es el que le llegará al usuario o al desarrollador que use tu código, por lo que conviene que diga con claridad en qué se equivocó.",
    },
    {
      type: "paragraph",
      text:
        "Esto es lo que hacen muchas APIs cuando les envías datos incorrectos: devuelven un mensaje que explica por qué no pudieron ejecutar el proceso. Si tu propio código genera esos mensajes, además, es más fácil depurar de dónde viene el problema.",
    },
    {
      type: "playground",
      title: "Experimento 4 · Validar un dato y lanzar un error propio",
      description: "La función exige un número de verdad. Con `\"y\"`, `NaN` o incluso el texto `\"5\"`, lanza el error y el `catch` lo muestra.",
      code: L(
        "function cuadrado(numero) {",
        '  if (typeof numero !== "number" || Number.isNaN(numero)) {',
        '    throw new Error("El valor introducido no es un número");',
        "  }",
        "  return numero * numero;",
        "}",
        "",
        '[10, "y", NaN, "5"].forEach(function (valor) {',
        "  try {",
        '    console.log(valor, "→", cuadrado(valor));',
        "  } catch (error) {",
        '    console.log(valor, "→ Se produjo el siguiente error:", error.message);',
        "  }",
        "});",
      ),
      expected: L(
        "10 → 100",
        "y → Se produjo el siguiente error: El valor introducido no es un número",
        "NaN → Se produjo el siguiente error: El valor introducido no es un número",
        "5 → Se produjo el siguiente error: El valor introducido no es un número",
      ),
    },
    {
      type: "paragraph",
      text:
        "Una explicación sobre la validación. La función global `isNaN` responde `true` cuando el valor, después de convertirlo a número, da `NaN`. No responde si «es un número». Por eso `isNaN(\"y\")` es `true`, pero `isNaN(\"5\")`, `isNaN(\"\")` y `isNaN(null)` son `false`, porque se convierten en 5, 0 y 0. `Number.isNaN`, en cambio, no convierte: solo es `true` con el valor `NaN` mismo, así que `Number.isNaN(\"y\")` es `false`. Combinar `typeof numero !== \"number\"` con `Number.isNaN(numero)`, como en el experimento anterior, garantiza que sea un número real.",
    },
    {
      type: "playground",
      title: "Experimento 5 · isNaN convierte el valor; Number.isNaN no",
      description: "Mira cómo cambian las respuestas con el texto `\"5\"`, el texto vacío y `null`.",
      code: L(
        '// isNaN("y"), isNaN("5"), isNaN(""), isNaN(null), isNaN(undefined), isNaN(true)',
        'console.log(isNaN("y"), isNaN("5"), isNaN(""), isNaN(null), isNaN(undefined), isNaN(true));',
        "",
        '// Number.isNaN("y"), Number.isNaN(NaN), Number.isNaN("5")',
        'console.log(Number.isNaN("y"), Number.isNaN(NaN), Number.isNaN("5"));',
      ),
      expected: L("true false false false true false", "false true false"),
    },
    { type: "heading", level: 3, text: "Qué se puede lanzar" },
    {
      type: "paragraph",
      text:
        "`throw` acepta cualquier valor: un texto, un número, un objeto. Pero lo recomendable es lanzar siempre un objeto `Error` (o uno de sus tipos), porque trae `name`, `message` y el rastro de dónde se originó. Con un texto suelto, el `catch` recibe un texto, que no tiene `name` ni `message`. ESLint tiene la regla `no-throw-literal` para exigirlo.",
    },
    {
      type: "playground",
      title: "Experimento 6 · Lanzar un texto, un objeto Error y un número",
      description: "El `catch` recibe exactamente lo que se lanzó. Solo el `Error` tiene `name` y `message`.",
      code: L(
        'try { throw "solo texto"; } catch (e) { console.log(typeof e, e.name); }',
        'try { throw new Error("objeto"); } catch (e) { console.log(typeof e, e.name, e.message); }',
        "try { throw 42; } catch (e) { console.log(typeof e, e); }",
      ),
      expected: L("string undefined", "object Error objeto", "number 42"),
    },
    { type: "heading", level: 3, text: "Manejar solo lo que sabes manejar" },
    {
      type: "paragraph",
      text:
        "Un `catch` captura cualquier error, pero no siempre sabrás qué hacer con él. Una práctica sana es revisar el tipo (con `error.name`), manejar el que conoces y volver a lanzar el resto con `throw error`, para que lo atienda un `try` exterior o, al menos, aparezca en la consola. También puedes envolver un error en otro más descriptivo conservando el original en la propiedad `cause`, con `new Error(\"mensaje\", { cause: error })`.",
    },
    {
      type: "playground",
      title: "Experimento 7 · Relanzar un error y conservar su causa",
      description: "`leer` solo corrige los `RangeError`; el `ReferenceError` lo vuelve a lanzar. Después, un error nuevo conserva el original en `cause`.",
      code: L(
        "function leer(f) {",
        "  try {",
        "    return f();",
        "  } catch (error) {",
        '    if (error.name === "RangeError") {',
        '      return "rango corregido";',
        "    }",
        "    throw error;   // no sé manejarlo: lo relanzo",
        "  }",
        "}",
        "",
        "console.log(leer(function () { return (1).toFixed(101); }));",
        "",
        "try {",
        "  leer(function () { return noExiste; });",
        "} catch (error) {",
        '  console.log("relanzado:", error.name);',
        "}",
        "",
        "// Envolver un error en otro más claro, conservando la causa",
        "try {",
        "  try {",
        '    JSON.parse("{");',
        "  } catch (error) {",
        '    throw new Error("No se pudo leer la configuración", { cause: error });',
        "  }",
        "} catch (error) {",
        '  console.log(error.message, "|", error.cause.name);',
        "}",
      ),
      expected: L(
        "rango corregido",
        "relanzado: ReferenceError",
        "No se pudo leer la configuración | SyntaxError",
      ),
    },

    // ───────────────────────── finally ─────────────────────────
    { type: "heading", level: 2, text: "finally: el código que debe ejecutarse siempre" },
    {
      type: "paragraph",
      text:
        "El bloque `finally` se ejecuta siempre al final, ocurra o no un error, y también si el `try` o el `catch` terminan con un `return`. Es el lugar para la limpieza que debe suceder pase lo que pase. A veces se dice que casi nunca se usa, o que solo sirve para abrir y cerrar archivos o conexiones a bases de datos (algo típico del lado del servidor). En realidad, sirve en cualquier lugar donde haya algo que deshacer: en el navegador, por ejemplo, ocultar un indicador de «cargando» o volver a activar un botón después de una operación, tanto si salió bien como si falló.",
    },
    {
      type: "paragraph",
      text:
        "Si el `try` o el `catch` ejecutan un `return` o lanzan un error, el `finally` se ejecuta antes de que ese efecto se complete. Cuidado con poner un `return` o un `throw` dentro del propio `finally`: reemplaza al anterior, casi nunca es lo que se quiere, y ESLint lo marca con la regla `no-unsafe-finally`.",
    },
    {
      type: "playground",
      title: "Experimento 8 · finally con return, sin catch y en orden",
      description: "El `finally` corre antes de devolver el valor. Si pone su propio `return`, este gana, y por eso se evita.",
      code: L(
        "function prueba() {",
        "  try {",
        '    return "desde try";',
        "  } finally {",
        '    console.log("finally corre antes de devolver");',
        "  }",
        "}",
        "console.log(prueba());",
        "",
        "// Un return dentro del finally pisa al anterior (evítalo)",
        "function pisa() {",
        "  try { return 1; } finally { return 2; }",
        "}",
        "console.log(pisa());",
        "",
        "function orden() {",
        "  const pasos = [];",
        '  try { pasos.push("try"); throw new Error("e"); }',
        '  catch (e) { pasos.push("catch"); }',
        '  finally { pasos.push("finally"); }',
        '  pasos.push("después");',
        '  return pasos.join(" > ");',
        "}",
        "console.log(orden());",
        "",
        "// try...finally sin catch: el error sigue su camino después del finally",
        "try {",
        '  try { throw new Error("x"); }',
        '  finally { console.log("finally sin catch"); }',
        "} catch (e) {",
        '  console.log("llegó afuera:", e.message);',
        "}",
      ),
      expected: L(
        "finally corre antes de devolver",
        "desde try",
        "2",
        "try > catch > finally > después",
        "finally sin catch",
        "llegó afuera: x",
      ),
    },
    {
      type: "playground",
      title: "Experimento 9 · finally para dejar el estado limpio",
      description: "Tanto si `procesar` termina bien como si falla, la variable `cargando` vuelve a `false`.",
      code: L(
        "let cargando = false;",
        "",
        "function procesar(entrada) {",
        "  cargando = true;",
        "  try {",
        '    if (entrada === "") {',
        '      throw new Error("entrada vacía");',
        "    }",
        '    return "procesado: " + entrada;',
        "  } catch (error) {",
        '    return "falló: " + error.message;',
        "  } finally {",
        "    cargando = false;   // se limpia en ambos casos",
        "  }",
        "}",
        "",
        'console.log(procesar("datos"), "| cargando:", cargando);',
        'console.log(procesar(""), "| cargando:", cargando);',
      ),
      expected: L(
        "procesado: datos | cargando: false",
        "falló: entrada vacía | cargando: false",
      ),
    },

    // ───────────────────────── Caso real ─────────────────────────
    { type: "heading", level: 2, text: "Un caso real: leer un JSON que puede venir roto" },
    {
      type: "paragraph",
      text:
        "El lugar más común donde necesitarás `try...catch` es al convertir un texto en datos con `JSON.parse`, que lanza un `SyntaxError` si el texto no es un JSON válido. No controlas lo que escribe el usuario ni lo que responde un servidor, por lo que protegerlo es razonable. Como no necesitamos el error en sí, usamos `catch` sin variable.",
    },
    {
      type: "playground",
      title: "Experimento 10 · Una función que lee JSON sin romper el programa",
      description: "Devuelve los datos si el texto es válido, y `null` si no lo es.",
      code: L(
        "function leerJSON(texto) {",
        "  try {",
        "    return JSON.parse(texto);",
        "  } catch {",
        "    return null;",
        "  }",
        "}",
        "",
        `console.log(leerJSON('{"a":1}').a, leerJSON("{a:1}"));`,
        'console.log(leerJSON("[1,2]").length, leerJSON(""));',
      ),
      expected: L("1 null", "2 null"),
    },

    // ───────────────────────── Lo que no captura ─────────────────────────
    { type: "heading", level: 2, text: "Lo que un try...catch no captura" },
    {
      type: "paragraph",
      text:
        "Un `try...catch` solo protege el código que se ejecuta mientras el bloque `try` está activo. Si dentro del `try` programas algo para más tarde (por ejemplo, con `setTimeout`), esa función se ejecutará cuando el `try` ya haya terminado, y un error que lance en ese momento no lo capturará el `catch`. La solución es colocar el `try...catch` dentro de la función programada. Con promesas y `async`/`await`, que veremos más adelante, el manejo de errores tiene su propia forma. Y, como vimos, un error de sintaxis del propio script tampoco se puede capturar dentro de ese mismo script.",
    },
    {
      type: "image",
      src: "/img/dia-17/try-catch-asincrono.svg",
      alt: "Dos líneas de tiempo. A la izquierda, código síncrono: el error ocurre mientras el try está activo y lo captura el catch. A la derecha, un temporizador con setTimeout: el try termina antes de que la función programada se ejecute, y cuando esa función falla, fuera del try, nadie captura el error. La solución es poner el try y el catch dentro de la función programada.",
      caption: "El try solo protege el código que se ejecuta mientras está activo.",
    },
    {
      type: "callout",
      variant: "info",
      text:
        "No tienes que envolver todo el programa en un `try...catch`. Úsalo en el código que puede fallar por causas que no controlas (datos del usuario, respuestas de un servidor, texto que se convierte en JSON). Un error de programación, como una variable mal escrita, no se arregla escondiéndolo: se corrige. ESLint detecta muchas variables no declaradas antes de ejecutar, con la regla `no-undef`.",
    },

    // ───────────────────────── Cuándo usar ─────────────────────────
    { type: "heading", level: 2, text: "¿Cuándo usar cada pieza?" },
    {
      type: "table",
      caption: "Qué pieza usar según el problema",
      headers: ["Situación", "Pieza recomendada"],
      rows: [
        ["Código que puede fallar por datos externos (JSON, usuario, servidor)", "`try...catch`"],
        ["Una regla de tu programa no se cumple (dato inválido)", "`throw new Error(\"mensaje claro\")`"],
        ["No sabes manejar un error en este punto", "`throw error` para relanzarlo"],
        ["Hay que limpiar algo pase lo que pase (indicador de carga, recurso)", "`finally`"],
        ["Un error de programación, como una variable mal escrita", "Corregir el código, no capturarlo"],
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
          "Usar una variable no declarada produce un error de sintaxis.",
          "Produce un `ReferenceError`, que ocurre al ejecutar. Un `SyntaxError` real impide que el script se ejecute y no se captura en el mismo script.",
        ],
        [
          "El `try...catch` hace desaparecer los mensajes rojos.",
          "Reemplaza el comportamiento por defecto por el tuyo. Un `catch` vacío esconde los fallos; conviene al menos registrar el error.",
        ],
        [
          "`finally` casi nunca se usa, o solo sirve con archivos y bases de datos.",
          "Sirve para cualquier limpieza obligatoria, también en el navegador (ocultar un indicador de carga, reactivar un botón).",
        ],
        [
          "`isNaN` devuelve `true` si el valor es un número.",
          "Devuelve `true` si el valor, convertido a número, es `NaN`. `Number.isNaN` no convierte el valor.",
        ],
        [
          "El `catch` siempre necesita la variable del error.",
          "Desde ES2019 se puede omitir: `catch { ... }`.",
        ],
        [
          "El `try` siempre necesita un `catch`.",
          "Necesita un `catch`, un `finally` o ambos.",
        ],
        [
          "Solo se puede lanzar un `Error`.",
          "`throw` acepta cualquier valor, pero se recomienda siempre un objeto `Error`.",
        ],
        [
          "El `try...catch` captura cualquier error del programa.",
          "Solo los que ocurren mientras el `try` se ejecuta. No captura los de una función que se ejecuta más tarde, ni los errores de sintaxis del propio script.",
        ],
        [
          "`EvalError` se lanza cuando falla `eval`.",
          "Existe por compatibilidad, pero JavaScript ya no lo lanza.",
        ],
      ],
    },

    // ───────────────────────── FAQ ─────────────────────────
    {
      type: "accordion",
      title: "Preguntas frecuentes de esta lección",
      items: [
        {
          title: "¿Debo envolver todo mi código en un try...catch?",
          text:
            "No. Envuelve solo el código que puede fallar por causas razonables y que sepas cómo manejar. Un `try...catch` gigante esconde los errores de programación y dificulta depurar.",
        },
        {
          title: "¿Qué hago dentro de un catch?",
          text:
            "Depende del caso: mostrar un mensaje claro al usuario, usar un valor por defecto, registrar el error con `console.error` o relanzarlo con `throw error` si no sabes resolverlo en ese punto.",
        },
        {
          title: "¿Se pueden anidar los try...catch?",
          text:
            "Sí. Si un `try` interior no tiene `catch`, un error lo atiende el `catch` del `try` exterior. También puedes relanzar un error desde un `catch` para que lo maneje uno exterior.",
        },
        {
          title: "¿Los valores de un formulario llegan como números?",
          text:
            "No: llegan como texto. Conviértelos primero con `Number(...)` (lección de números) y valida el resultado con `Number.isNaN` antes de usarlo.",
        },
        {
          title: "¿Cómo creo mis propios tipos de error?",
          text:
            "Con clases que extienden `Error`, un tema que veremos cuando lleguemos a las clases. Por ahora, `new Error(\"mensaje\")` cubre la mayoría de los casos.",
        },
        {
          title: "¿Y los errores en operaciones asíncronas, como una petición a un servidor?",
          text:
            "Se manejan con las herramientas de las promesas y de `async`/`await`, que veremos más adelante. La idea es la misma: capturar el error y decidir qué hacer.",
        },
      ],
    },

    // ───────────────────────── Cierre ─────────────────────────
    { type: "heading", level: 2, text: "Cierre" },
    {
      type: "paragraph",
      text:
        "Ahora puedes escribir código que no se derrumba cuando algo falla: `try` para intentar, `catch` para manejar el error, `finally` para lo que debe ocurrir siempre y `throw` para lanzar tus propios errores con un mensaje claro. Lo importante es capturar solo lo que sabes manejar, no esconder los errores y recordar que el `try` solo protege el código que se ejecuta mientras está activo. En la próxima lección vemos `break` y `continue`, las instrucciones que te permiten salir de un ciclo o saltar una iteración.",
    },
    {
      type: "checklist",
      title: "Antes de pasar al Día 18, verifica que puedes explicar…",
      items: [
        "Qué es un error lanzado (una excepción) y qué ocurre si nadie lo maneja.",
        "Cuándo se ejecuta cada uno de los bloques `try`, `catch` y `finally`.",
        "Qué pasa con las instrucciones del `try` que quedan después de la que falló.",
        "Qué tipo de error produce una variable no declarada y por qué no es un error de sintaxis.",
        "Qué contiene la variable del `catch` y qué propiedades tiene un `Error`.",
        "Cómo lanzar un error propio con `throw new Error(...)` y por qué se prefiere un `Error` a un texto.",
        "Cuándo conviene relanzar un error con `throw error`.",
        "Por qué un `try...catch` no captura el error de una función programada con `setTimeout`.",
      ],
    },
    { type: "heading", level: 3, text: "Fuentes consultadas (noviembre de 2026)" },
    {
      type: "list",
      items: [
        "[MDN: try...catch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch)",
        "[MDN: throw](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/throw)",
        "[MDN: Control de flujo y manejo de errores (guía)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling)",
        "[MDN: Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)",
        "[MDN: Error.prototype.cause](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/cause)",
        "[MDN: ReferenceError](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ReferenceError)",
        "[MDN: TypeError](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError)",
        "[MDN: RangeError](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RangeError)",
        "[MDN: SyntaxError](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SyntaxError)",
        "[MDN: URIError](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/URIError)",
        "[MDN: EvalError](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/EvalError)",
        "[MDN: AggregateError](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AggregateError)",
        "[MDN: isNaN()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/isNaN)",
        "[MDN: Number.isNaN()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN)",
        "[MDN: JSON.parse()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse)",
        "[ESLint: no-empty](https://eslint.org/docs/latest/rules/no-empty)",
        "[ESLint: no-unsafe-finally](https://eslint.org/docs/latest/rules/no-unsafe-finally)",
        "[ESLint: no-throw-literal](https://eslint.org/docs/latest/rules/no-throw-literal)",
        "[ESLint: no-undef](https://eslint.org/docs/latest/rules/no-undef)",
      ],
    },
  ],
  selfCheck: [
    {
      question: "¿Qué bloque de un `try...catch...finally` se ejecuta siempre?",
      options: ["try", "catch", "finally", "Ninguno: depende del error"],
      correctIndex: 2,
      explanation:
        "`finally` se ejecuta haya error o no, incluso si el `try` o el `catch` terminan con un `return`.",
    },
    {
      question: "Si la segunda línea del `try` lanza un error, ¿qué ocurre con la tercera?",
      options: [
        "Se ejecuta de todos modos",
        "No se ejecuta: el control salta al `catch`",
        "Se ejecuta después del `finally`",
        "Se ejecuta dos veces",
      ],
      correctIndex: 1,
      explanation:
        "En cuanto una instrucción del `try` lanza un error, el resto del bloque se abandona y la ejecución continúa en el `catch`.",
    },
    {
      question: "¿Qué recibe la variable del `catch`, como `error` en `catch (error)`?",
      options: [
        "Siempre un texto",
        "El valor que se lanzó, normalmente un objeto `Error` con `name` y `message`",
        "Siempre `undefined`",
        "El código que falló",
      ],
      correctIndex: 1,
      explanation:
        "Es el valor lanzado con `throw` o por el motor de JavaScript. Normalmente es un objeto `Error` con `name` y `message`.",
    },
    {
      question: "¿Qué tipo de error produce usar una variable que no se ha declarado?",
      options: ["SyntaxError", "TypeError", "ReferenceError", "RangeError"],
      correctIndex: 2,
      explanation:
        "Es un `ReferenceError`, que ocurre al ejecutar. No es un error de sintaxis.",
    },
    {
      question: "¿Con qué debe acompañarse un bloque `try`?",
      options: [
        "Siempre con `catch` y `finally`",
        "Con un `catch`, con un `finally` o con ambos",
        "Solo con `catch`",
        "No necesita nada más",
      ],
      correctIndex: 1,
      explanation:
        "El `try` necesita al menos un `catch` o un `finally`, y puede llevar los dos.",
    },
    {
      question: "¿Qué hace `throw new Error(\"mensaje\")`?",
      options: [
        "Escribe «mensaje» en la consola",
        "Lanza un error: interrumpe la ejecución y salta al `catch` más cercano",
        "Ignora el error",
        "Reinicia el programa",
      ],
      correctIndex: 1,
      explanation:
        "`throw` interrumpe el flujo y lo transfiere al `catch` más cercano, igual que un error del lenguaje.",
    },
    {
      question: "¿Qué devuelve `isNaN(\"5\")`?",
      options: [
        "true, porque es un texto",
        "false, porque el texto \"5\" se convierte en el número 5",
        "Lanza un error",
        "undefined",
      ],
      correctIndex: 1,
      explanation:
        "`isNaN` convierte el valor a número antes de comprobarlo. `Number.isNaN` no convierte.",
    },
    {
      question: "¿Captura este `try...catch` el error que lanza `falla`? `try { setTimeout(falla, 0); } catch (e) { ... }`",
      options: [
        "Sí, siempre",
        "No: `falla` se ejecuta más tarde, cuando el `try` ya terminó",
        "Sí, pero solo si `falla` tiene un `return`",
        "Solo en navegadores antiguos",
      ],
      correctIndex: 1,
      explanation:
        "El `try` solo protege el código que se ejecuta mientras está activo. El `try...catch` debe ir dentro de `falla`.",
    },
    {
      question: "¿Qué devuelve `function f() { try { return 1; } finally { return 2; } }` al llamarla?",
      options: ["1", "2", "undefined", "Lanza un error"],
      correctIndex: 1,
      explanation:
        "Un `return` dentro del `finally` reemplaza al anterior. Por eso se evita (regla `no-unsafe-finally`).",
    },
    {
      question: "¿Para qué es adecuado usar `finally`?",
      options: [
        "Para manejar el error",
        "Para limpiar algo que debe ocurrir pase lo que pase, como ocultar un indicador de carga",
        "Para lanzar errores propios",
        "Solo para cerrar archivos en el navegador",
      ],
      correctIndex: 1,
      explanation:
        "`finally` es para la limpieza obligatoria, en cualquier entorno, no solo con archivos o bases de datos.",
    },
  ],
};
