import type { Lesson } from "@/lib/types";

// Une líneas de código sin tener que escapar backticks ni `${}` dentro de template literals.
const L = (...lines: string[]) => lines.join("\n");

// Contenido validado contra fuentes actuales en noviembre de 2026 (ver sección "Fuentes").
export const day30: Lesson = {
  day: 30,
  slug: "operadores-de-cortocircuito",
  title: "Operador de cortocircuito: || y &&",
  section: "Herramientas del lenguaje",
  estimatedMinutes: 75,
  icon: "🛠️",
  objectives: [
    "Explicar qué devuelven `||` y `&&`: uno de sus operandos, no un booleano",
    "Predecir cuándo el lado derecho no se evalúa",
    "Distinguir los valores falsos (falsy) de los verdaderos (truthy)",
    "Usar `||` para elegir el primer valor disponible y entender su trampa con `0`, `\"\"` y `false`",
    "Elegir entre `||`, `??`, los parámetros por defecto y el encadenamiento opcional `?.`",
    "Usar las asignaciones lógicas `||=`, `&&=` y `??=` y evitar la trampa de `&&` con números en las interfaces",
  ],
  blocks: [
    // ───────────────────────── Apertura ─────────────────────────
    {
      type: "paragraph",
      text:
        "Los operadores lógicos `||` (o) y `&&` (y) no solo sirven para combinar condiciones dentro de un `if`. En JavaScript tienen una segunda vida: devuelven uno de sus operandos, y no siempre evalúan los dos. A eso se le llama evaluación en cortocircuito, y verás expresiones así en casi cualquier código real: `nombre || \"anónimo\"`, `usuario && usuario.perfil`. Para entenderlas bien necesitas tener claro qué valores cuentan como verdaderos y cuáles como falsos, lo que ya viste en la lección de booleanos. Hoy veremos cómo funcionan, para qué se usan y, sobre todo, qué herramientas más modernas las han reemplazado en muchos casos.",
    },
    {
      type: "keyFacts",
      items: [
        { value: "a || b", label: "Devuelve a si es verdadero; si no, devuelve b" },
        { value: "a && b", label: "Devuelve a si es falso; si no, devuelve b" },
        { value: "Lazy", label: "Si el lado izquierdo decide, el derecho no se evalúa" },
        { value: "8 falsos", label: "false, 0, -0, 0n, \"\", null, undefined y NaN" },
        { value: "a ?? b", label: "Solo sustituye null y undefined; respeta 0 y \"\"" },
        { value: "||= &&= ??=", label: "Asignaciones lógicas que también hacen cortocircuito" },
      ],
    },
    {
      type: "callout",
      variant: "success",
      text:
        "Contenido verificado en noviembre de 2026 con MDN Web Docs (`||`, `&&`, `??`, asignaciones lógicas, encadenamiento opcional y parámetros por defecto), la documentación de React y la regla `no-unused-expressions` de ESLint. Los resultados de los ejemplos se comprobaron ejecutándolos. Al final hay una tabla con datos que suelen aparecer desactualizados y la lista de fuentes.",
    },

    // ───────────────────────── Qué es ─────────────────────────
    { type: "heading", level: 2, text: "Qué devuelven || y &&" },
    {
      type: "paragraph",
      text:
        "Con `a || b`, JavaScript mira primero `a`. Si `a` es verdadero (truthy), devuelve `a` y ni siquiera mira `b`. Si `a` es falso (falsy), devuelve `b`, sea cual sea. Dicho de otra forma, `||` devuelve el primer operando verdadero que encuentre, o el último si todos son falsos. Con `a && b` ocurre lo contrario: si `a` es falso, devuelve `a` y no mira `b`; si `a` es verdadero, devuelve `b`. MDN lo describe así: `&&` devuelve el primer operando falso que encuentre, o el último si todos son verdaderos. Fíjate en un detalle importante: ninguno de los dos devuelve necesariamente `true` o `false`. Devuelven un operando tal cual, de cualquier tipo. Si necesitas un booleano, conviértelo con `Boolean(...)` o con `!!`.",
    },
    {
      type: "image",
      src: "/img/dia-30/or-y-and.svg",
      alt: "El operador a || b devuelve a si a es verdadero y, en ese caso, no evalúa b. Si a es falso, devuelve b. Ejemplos: \"Ana\" || \"anónimo\" devuelve \"Ana\", y \"\" || \"anónimo\" devuelve \"anónimo\". El operador a && b hace lo contrario: devuelve a si a es falso y no evalúa b; si a es verdadero, devuelve b. Ejemplos: 0 && \"listo\" devuelve 0, y \"Ana\" && \"listo\" devuelve \"listo\". Si el lado izquierdo decide el resultado, el derecho no se evalúa.",
      caption: "|| busca el primer valor verdadero; && busca el primer valor falso.",
    },

    // ───────────────────────── Falsos y verdaderos ─────────────────────────
    { type: "heading", level: 2, text: "Valores falsos y verdaderos" },
    {
      type: "paragraph",
      text:
        "Todo depende de qué valores se consideran falsos. Son ocho: `false`, `0`, `-0`, `0n` (el cero de los BigInt), la cadena vacía `\"\"`, `null`, `undefined` y `NaN`. Todo lo demás es verdadero. Incluidos valores que parecen vacíos o negativos: la cadena `\"0\"`, la cadena `\"false\"`, el arreglo vacío `[]`, el objeto vacío `{}` y los números negativos como `-2`. Es una de las fuentes de errores más habituales: un arreglo vacío es verdadero, así que `lista || \"sin datos\"` nunca llega a escribir «sin datos» para un arreglo vacío.",
    },
    {
      type: "image",
      src: "/img/dia-30/valores-falsos.svg",
      alt: "Hay ocho valores falsos: false, 0, menos 0, 0n, la cadena vacía, null, undefined y NaN. Todo lo demás es verdadero, incluidos la cadena \"0\", la cadena \"false\", el arreglo vacío, el objeto vacío, los números negativos como menos 2, cualquier cadena con texto, las funciones e Infinity.",
      caption: "Solo hay ocho valores falsos.",
    },
    {
      type: "playground",
      title: "Experimento 1 · a || b con distintos valores a la izquierda",
      description: "La tabla recorre valores verdaderos y falsos. Cuando el izquierdo es verdadero, sale él mismo; si es falso, sale el derecho. `ver` muestra los textos entre comillas para distinguir la cadena vacía.",
      code: L(
        "// a || b devuelve a si es verdadero (truthy) y, si no, devuelve b.",
        "// Fíjate: devuelve uno de los operandos, no necesariamente true o false.",
        "const valores = [",
        "  [\"cadena\", \"texto\"],",
        "  [\"número 19\", 19],",
        "  [\"número -2\", -2],",
        "  [\"arreglo vacío\", []],",
        "  [\"objeto vacío\", {}],",
        "  [\"false\", false],",
        "  [\"null\", null],",
        "  [\"undefined\", undefined],",
        "  [\"cadena vacía\", \"\"],",
        "  [\"cero\", 0],",
        "  [\"NaN\", NaN],",
        "];",
        "",
        "// ver() muestra los textos entre comillas para distinguir \"\" de nada",
        "const ver = (v) => (typeof v === \"string\" ? '\"' + v + '\"' : v);",
        "",
        "for (const [nombre, valor] of valores) {",
        "  console.log(nombre.padEnd(14), \"||\", ver(valor || \"← derecha\"));",
        "}",
      ),
      expected: L(
        "cadena         || \"texto\"",
        "número 19      || 19",
        "número -2      || -2",
        "arreglo vacío  || []",
        "objeto vacío   || {}",
        "false          || \"← derecha\"",
        "null           || \"← derecha\"",
        "undefined      || \"← derecha\"",
        "cadena vacía   || \"← derecha\"",
        "cero           || \"← derecha\"",
        "NaN            || \"← derecha\"",
      ),
    },
    {
      type: "playground",
      title: "Experimento 2 · a && b con los mismos valores",
      description: "Es el resultado contrario: ahora sale el derecho cuando el izquierdo es verdadero, y el izquierdo cuando es falso.",
      code: L(
        "// a && b devuelve a si es falso (falsy) y, si no, devuelve b.",
        "// Es el comportamiento contrario a ||.",
        "const valores = [",
        "  [\"cadena\", \"texto\"],",
        "  [\"número 19\", 19],",
        "  [\"número -2\", -2],",
        "  [\"arreglo vacío\", []],",
        "  [\"objeto vacío\", {}],",
        "  [\"false\", false],",
        "  [\"null\", null],",
        "  [\"undefined\", undefined],",
        "  [\"cadena vacía\", \"\"],",
        "  [\"cero\", 0],",
        "  [\"NaN\", NaN],",
        "];",
        "",
        "// ver() muestra los textos entre comillas para distinguir \"\" de nada",
        "const ver = (v) => (typeof v === \"string\" ? '\"' + v + '\"' : v);",
        "",
        "for (const [nombre, valor] of valores) {",
        "  console.log(nombre.padEnd(14), \"&&\", ver(valor && \"← derecha\"));",
        "}",
      ),
      expected: L(
        "cadena         && \"← derecha\"",
        "número 19      && \"← derecha\"",
        "número -2      && \"← derecha\"",
        "arreglo vacío  && \"← derecha\"",
        "objeto vacío   && \"← derecha\"",
        "false          && false",
        "null           && null",
        "undefined      && undefined",
        "cadena vacía   && \"\"",
        "cero           && 0",
        "NaN            && NaN",
      ),
    },

    // ───────────────────────── Lazy ─────────────────────────
    { type: "heading", level: 2, text: "El lado derecho no siempre se evalúa" },
    {
      type: "paragraph",
      text:
        "Por qué se llama «cortocircuito»: en cuanto el lado izquierdo decide el resultado, el derecho se descarta sin ejecutarse. MDN lo explica con claridad: no se evalúa, por lo que no ocurren sus efectos secundarios; si es una llamada a una función, esa llamada nunca se produce. Es importante porque permite escribir expresiones que de otra forma darían error, como `usuario && usuario.perfil`, que evita leer `perfil` de algo que no existe, y también porque una función a la derecha puede no ejecutarse cuando uno no lo espera. Con varios operadores en cadena, `||` se detiene en el primer verdadero y `&&`, en el primer falso.",
    },
    {
      type: "playground",
      title: "Experimento 3 · Qué se evalúa y qué se salta",
      description: "Cada función escribe un mensaje al ejecutarse. Fíjate en qué casos aparece el mensaje del lado derecho, y cómo se comportan las cadenas de varios operadores.",
      code: L(
        "// El cortocircuito también significa que el lado derecho NO SE EVALÚA",
        "// cuando el izquierdo ya decide el resultado.",
        "function izquierda(valor) {",
        "  console.log(\"  se evalúa el lado izquierdo\");",
        "  return valor;",
        "}",
        "function derecha(valor) {",
        "  console.log(\"  se evalúa el lado derecho\");",
        "  return valor;",
        "}",
        "",
        "console.log(\"true || ...\");",
        "console.log(izquierda(true) || derecha(\"derecha\"));",
        "",
        "console.log(\"false || ...\");",
        "console.log(izquierda(false) || derecha(\"derecha\"));",
        "",
        "console.log(\"false && ...\");",
        "console.log(izquierda(false) && derecha(\"derecha\"));",
        "",
        "console.log(\"true && ...\");",
        "console.log(izquierda(true) && derecha(\"derecha\"));",
        "",
        "// Encadenados: || se detiene en el primer verdadero y && en el primer falso",
        "console.log(0 || \"\" || null || \"primer verdadero\" || \"otro\");",
        "console.log(1 && \"dos\" && 0 && \"nunca llega aquí\");",
        "console.log(0 || \"\" || null);",
        "console.log(1 && \"dos\" && \"último\");",
      ),
      expected: L(
        "true || ...",
        "  se evalúa el lado izquierdo",
        "true",
        "false || ...",
        "  se evalúa el lado izquierdo",
        "  se evalúa el lado derecho",
        "derecha",
        "false && ...",
        "  se evalúa el lado izquierdo",
        "false",
        "true && ...",
        "  se evalúa el lado izquierdo",
        "  se evalúa el lado derecho",
        "derecha",
        "primer verdadero",
        "0",
        "null",
        "último",
      ),
    },

    // ───────────────────────── Usos ─────────────────────────
    { type: "heading", level: 2, text: "Usos habituales" },
    {
      type: "paragraph",
      text:
        "El uso clásico de `||` es elegir el primer valor disponible de una lista de candidatos: `usuario.alias || usuario.nombre || \"anónimo\"`. El de `&&` es el acceso seguro: `u && u.perfil && u.perfil.ciudad` va comprobando cada paso y se detiene en el primer eslabón que falta. Hoy, para esto último, existe una herramienta específica, el encadenamiento opcional `?.`, que MDN indica disponible en todos los navegadores desde julio de 2020. Hay una diferencia sutil: cuando falta algo, `&&` devuelve el valor falso que lo detuvo (`null`, por ejemplo), mientras que `?.` siempre devuelve `undefined`.",
    },
    {
      type: "playground",
      title: "Experimento 4 · El primer valor disponible y el acceso seguro",
      description: "Con `u3` igual a `null`, `&&` devuelve `null`, y `?.` devuelve `undefined`.",
      code: L(
        "// Primer valor disponible, con ||",
        "function nombreParaMostrar(usuario) {",
        "  return usuario.alias || usuario.nombre || \"anónimo\";",
        "}",
        "console.log(nombreParaMostrar({ alias: \"neo\", nombre: \"Thomas\" }));",
        "console.log(nombreParaMostrar({ nombre: \"Ana\" }));",
        "console.log(nombreParaMostrar({}));",
        "",
        "// Acceso seguro con &&: se detiene en cuanto algo falta",
        "const u1 = { perfil: { ciudad: \"Lima\" } };",
        "const u2 = {};",
        "const u3 = null;",
        "const ciudad = (u) => u && u.perfil && u.perfil.ciudad;",
        "console.log(ciudad(u1), ciudad(u2), ciudad(u3));",
        "",
        "// Hoy se prefiere el encadenamiento opcional ?. , que devuelve undefined",
        "console.log(u1?.perfil?.ciudad, u2?.perfil?.ciudad, u3?.perfil?.ciudad);",
      ),
      expected: L(
        "neo",
        "Ana",
        "anónimo",
        "Lima undefined null",
        "Lima undefined undefined",
      ),
    },

    // ───────────────────────── Valores por defecto ─────────────────────────
    { type: "heading", level: 2, text: "Valores por defecto: la trampa del cero" },
    {
      type: "paragraph",
      text:
        "Antes de ES2015, la manera de dar un valor por defecto a un parámetro era `descuento = descuento || 10`. Es un cortocircuito: si no llega nada, se usa 10. Funciona, pero tiene una trampa: `||` sustituye cualquier valor falso, y `0`, la cadena vacía y `false` pueden ser valores válidos. Si alguien pide un descuento de `0`, el código lo pisa y aplica `10`. Desde ES2015 hay una forma específica, los parámetros por defecto, `function f(descuento = 10)`, que MDN describe como un valor que se aplica cuando no se pasa nada o se pasa `undefined`, y no con `null` ni con otros valores falsos. Y desde ES2020, el operador `??`, que sustituye solo `null` y `undefined`.",
    },
    {
      type: "image",
      src: "/img/dia-30/evolucion-de-los-valores-por-defecto.svg",
      alt: "Cuatro etapas de los valores por defecto. Antes de ES2015: nombre = nombre || \"desconocido\", que sustituye cualquier valor falso, también 0, la cadena vacía y false. ES2015: function saludar(nombre = \"desconocido\"), que solo actúa si el argumento falta o es undefined. ES2020: nombre ?? \"desconocido\", que sustituye solo null y undefined, y usuario?.perfil, que reemplaza a usuario && usuario.perfil. ES2021: nombre ??= \"desconocido\", a ||= b y a &&= b, que asignan solo si hace falta.",
      caption: "De || a las herramientas modernas.",
    },
    {
      type: "playground",
      title: "Experimento 5 · Tres formas de dar un valor por defecto",
      description: "`precioFinalViejo(100, 0)` aplica un 10 % que nadie pidió. El parámetro por defecto respeta el `0`, pero con `null` no actúa: `null` se convierte en `0` al dividir. `??` resuelve las dos cosas.",
      code: L(
        "// Patrón antiguo: valor por defecto con ||",
        "function precioFinalViejo(precio, descuento) {",
        "  descuento = descuento || 10;",
        "  return precio * (1 - descuento / 100);",
        "}",
        "console.log(precioFinalViejo(100, 20));",
        "console.log(precioFinalViejo(100));",
        "console.log(precioFinalViejo(100, 0)); // 0 % pedido, pero se aplicó 10 %",
        "",
        "// Parámetro por defecto (ES2015): solo actúa con undefined",
        "function precioFinalParametro(precio, descuento = 10) {",
        "  return precio * (1 - descuento / 100);",
        "}",
        "console.log(precioFinalParametro(100, 0));",
        "console.log(precioFinalParametro(100, undefined));",
        "console.log(precioFinalParametro(100, null));",
        "",
        "// Operador ?? (ES2020): actúa con null y undefined, pero respeta el 0",
        "function precioFinalNullish(precio, descuento) {",
        "  descuento = descuento ?? 10;",
        "  return precio * (1 - descuento / 100);",
        "}",
        "console.log(precioFinalNullish(100, 0));",
        "console.log(precioFinalNullish(100, null));",
        "console.log(precioFinalNullish(100));",
      ),
      expected: L(
        "80",
        "90",
        "90",
        "100",
        "90",
        "100",
        "100",
        "90",
        "90",
      ),
    },
    {
      type: "image",
      src: "/img/dia-30/or-frente-a-nullish.svg",
      alt: "Resultado de valor || \"defecto\" y de valor ?? \"defecto\" para siete valores. Con 0, || da \"defecto\" y ?? da 0. Con la cadena vacía, || da \"defecto\" y ?? da la cadena vacía. Con false, || da \"defecto\" y ?? da false. Con NaN, || da \"defecto\" y ?? da NaN. Con null y con undefined, ambos dan \"defecto\". Con \"hola\", ambos dan \"hola\". El operador || sustituye cualquier valor falso, y ?? solo sustituye null y undefined.",
      caption: "|| sustituye lo falso; ?? solo lo que falta.",
    },
    {
      type: "paragraph",
      text:
        "Una regla de sintaxis a tener en cuenta: `??` no se puede mezclar con `||` ni con `&&` sin paréntesis, porque da un `SyntaxError`. Hay que escribir `(a || b) ?? c`, indicando con claridad el orden.",
    },
    {
      type: "playground",
      title: "Experimento 6 · || frente a ??",
      description: "Las filas de `0`, `\"\"`, `false` y `NaN` son las que cambian. `null` y `undefined` dan el valor por defecto con los dos operadores.",
      code: L(
        "const valores = [0, \"\", false, NaN, null, undefined, \"hola\"];",
        "const ver = (v) => (typeof v === \"string\" ? '\"' + v + '\"' : String(v));",
        "",
        "for (const valor of valores) {",
        "  console.log(ver(valor).padEnd(10), \"||:\", ver(valor || \"defecto\").padEnd(10), \"??:\", ver(valor ?? \"defecto\"));",
        "}",
        "",
        "// ?? no se puede mezclar con || ni && sin paréntesis",
        "try {",
        "  new Function(\"return null || undefined ?? 'x';\");",
        "} catch (e) {",
        "  console.log(\"mezclar sin paréntesis →\", e.name);",
        "}",
        "console.log((null || undefined) ?? \"con paréntesis\");",
      ),
      expected: L(
        "0          ||: \"defecto\"  ??: 0",
        "\"\"         ||: \"defecto\"  ??: \"\"",
        "false      ||: \"defecto\"  ??: false",
        "NaN        ||: \"defecto\"  ??: NaN",
        "null       ||: \"defecto\"  ??: \"defecto\"",
        "undefined  ||: \"defecto\"  ??: \"defecto\"",
        "\"hola\"     ||: \"hola\"     ??: \"hola\"",
        "mezclar sin paréntesis → SyntaxError",
        "con paréntesis",
      ),
    },

    // ───────────────────────── Asignación lógica ─────────────────────────
    { type: "heading", level: 2, text: "Asignaciones lógicas: ||=, &&= y ??=" },
    {
      type: "paragraph",
      text:
        "ES2021 añadió tres operadores que combinan el cortocircuito con la asignación. `x ||= y` asigna `y` a `x` solo si `x` es falso. `x ??= y` asigna solo si `x` es `null` o `undefined`. `x &&= y` asigna solo si `x` es verdadero, por ejemplo para transformar un valor que existe. MDN indica que `||=` está disponible en los navegadores desde septiembre de 2020. La parte importante es el cortocircuito: si no hace falta asignar, no se asigna. `x ||= y` equivale a `x || (x = y)`, y no a `x = x || y`. La diferencia se nota con setters: si el valor no hace falta, el setter ni se ejecuta.",
    },
    {
      type: "playground",
      title: "Experimento 7 · Asignación lógica sobre una configuración",
      description: "Cada línea de configuración usa el operador adecuado. Al final, el setter de `caja` solo se ejecuta cuando el valor realmente se asigna.",
      code: L(
        "const config = { tema: \"\", idioma: null, volumen: 0, sesion: \"abc\" };",
        "",
        "config.tema ||= \"claro\";          // \"\" es falso: se asigna",
        "config.idioma ??= \"es\";           // null: se asigna",
        "config.volumen ??= 50;            // 0 no es null ni undefined: se conserva",
        "config.sesion &&= config.sesion.toUpperCase();   // \"abc\" es verdadero: se transforma",
        "config.fuente ??= \"sans\";         // no existía: se crea",
        "",
        "console.log(JSON.stringify(config));",
        "",
        "// La asignación lógica hace cortocircuito: si no hace falta, no asigna",
        "const caja = {",
        "  _valor: 5,",
        "  get valor() {",
        "    return this._valor;",
        "  },",
        "  set valor(nuevo) {",
        "    console.log(\"se ejecuta el setter con\", nuevo);",
        "    this._valor = nuevo;",
        "  },",
        "};",
        "",
        "caja.valor ||= 99;   // 5 es verdadero: el setter NO se ejecuta",
        "console.log(caja.valor);",
        "caja.valor = 0;",
        "caja.valor ||= 7;    // 0 es falso: el setter se ejecuta",
        "console.log(caja.valor);",
      ),
      expected: L(
        "{\"tema\":\"claro\",\"idioma\":\"es\",\"volumen\":0,\"sesion\":\"ABC\",\"fuente\":\"sans\"}",
        "5",
        "se ejecuta el setter con 0",
        "se ejecuta el setter con 7",
        "7",
      ),
    },

    // ───────────────────────── Condiciones y texto ─────────────────────────
    { type: "heading", level: 2, text: "Condiciones, texto y la trampa de los números" },
    {
      type: "paragraph",
      text:
        "`&&` también se usa para escribir condiciones compactas: mostrar un texto o ejecutar una acción solo si algo se cumple. Hay que tener cuidado con lo que devuelve cuando la condición falla. Si el lado izquierdo es un booleano, el resultado es `false`, y al concatenarlo con un texto se escribe literalmente «false». Si el izquierdo es un número, como `0`, el resultado es el propio `0`. Es el error que la documentación de React describe en las interfaces: `cantidad && <p>Hay mensajes</p>` no escribe nada si `cantidad` es `false`, pero escribe un `0` en pantalla si vale `0`. La solución es convertir el lado izquierdo en un booleano real: `cantidad > 0 && ...`, o usar el operador ternario.",
    },
    {
      type: "paragraph",
      text:
        "Para ejecutar acciones, `esAdmin && borrar()` funciona, pero se lee peor que un `if`, y herramientas como ESLint, con la regla `no-unused-expressions` en su configuración por defecto, lo señalan, porque una expresión sin efecto aparente suele ser un error. Reserva el cortocircuito para elegir valores, y usa `if` para decidir qué hacer.",
    },
    {
      type: "playground",
      title: "Experimento 8 · && con texto, con números y con acciones",
      description: "Observa los tres resultados del `0` y del `false`: el primero con `&&` directo, el segundo con una comparación y el tercero con el ternario. También se ve cómo convertir cualquier valor en booleano.",
      code: L(
        "const hayStock = true;",
        "const sinStock = false;",
        "",
        "// Construir texto con &&: cuidado con el valor que sobra cuando la condición es falsa",
        "console.log(\"Producto\" + (hayStock && \" disponible\"));",
        "console.log(\"Producto\" + (sinStock && \" disponible\"));",
        "console.log(\"Producto\" + (sinStock ? \" disponible\" : \"\"));",
        "",
        "// Si el lado izquierdo es un número, && puede devolver el propio número",
        "const cantidad = 0;",
        "console.log(cantidad && \"hay artículos\");",
        "console.log(cantidad > 0 && \"hay artículos\");",
        "console.log(cantidad > 0 ? \"hay artículos\" : \"carrito vacío\");",
        "",
        "// Ejecutar una acción solo si se cumple una condición: es válido, pero un if se lee mejor",
        "const esAdmin = true;",
        "esAdmin && console.log(\"acción de administrador ejecutada\");",
        "if (esAdmin) {",
        "  console.log(\"lo mismo, con if\");",
        "}",
        "",
        "// Convertir cualquier valor a true o false",
        "console.log(Boolean(\"hola\"), !!0, !!\"0\", !![]);",
      ),
      expected: L(
        "Producto disponible",
        "Productofalse",
        "Producto",
        "0",
        "false",
        "carrito vacío",
        "acción de administrador ejecutada",
        "lo mismo, con if",
        "true false true true",
      ),
    },
    {
      type: "table",
      caption: "Qué usar según lo que necesites",
      headers: ["Qué necesitas", "Herramienta"],
      rows: [
        ["Elegir el primer valor verdadero de varias opciones", "`a || b || c`"],
        ["Un valor por defecto cuando falta algo, respetando 0, \"\" y false", "`a ?? b`"],
        ["Un valor por defecto en un parámetro de función", "`function f(a = valor) { }`, solo con `undefined`"],
        ["Acceder a una propiedad que quizá no existe", "`a?.b?.c`"],
        ["Asignar un valor solo si falta", "`a ??= valor`"],
        ["Asignar un valor solo si el actual es falso", "`a ||= valor`"],
        ["Transformar un valor solo si existe y es verdadero", "`a &&= funcion(a)`"],
        ["Convertir cualquier valor en booleano", "`Boolean(a)` o `!!a`"],
        ["Escribir un texto solo si se cumple una condición", "`condicion ? \"texto\" : \"\"`"],
        ["Ejecutar una acción solo si se cumple una condición", "Un `if`"],
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
          "`||` y `&&` devuelven `true` o `false`.",
          "Devuelven uno de sus operandos, de cualquier tipo. `||` el primer verdadero, o el último; `&&`, el primer falso, o el último.",
        ],
        [
          "`a || b` evalúa siempre las dos partes.",
          "Si `a` es verdadero, `b` no se evalúa y sus efectos secundarios no ocurren. Con `&&` pasa lo mismo cuando `a` es falso.",
        ],
        [
          "Un valor por defecto se da con `nombre = nombre || \"desconocido\"`.",
          "Ese era el patrón antes de ES2015. Hoy se usan los parámetros por defecto, que actúan solo con `undefined`, o `??`, que actúa con `null` y `undefined`.",
        ],
        [
          "`||` y `??` son intercambiables para dar valores por defecto.",
          "`||` sustituye cualquier valor falso, también `0`, `\"\"`, `false` y `NaN`. `??` solo sustituye `null` y `undefined`.",
        ],
        [
          "Los parámetros por defecto también se aplican con `null`.",
          "Solo se aplican cuando el argumento falta o es `undefined`. Con `null`, `\"\"` y otros valores falsos, el valor se respeta.",
        ],
        [
          "El arreglo vacío, el objeto vacío y el texto `\"0\"` son falsos.",
          "Son verdaderos. Los únicos falsos son `false`, `0`, `-0`, `0n`, `\"\"`, `null`, `undefined` y `NaN`.",
        ],
        [
          "Para acceder a propiedades anidadas se usa `a && a.b && a.b.c`.",
          "Hoy se usa el encadenamiento opcional `a?.b?.c`, disponible en los navegadores desde julio de 2020. Devuelve `undefined` cuando falta algo.",
        ],
        [
          "`??` se puede mezclar con `||` y `&&` como cualquier operador.",
          "No sin paréntesis: `null || undefined ?? \"x\"` lanza un `SyntaxError`.",
        ],
        [
          "`x ||= y` equivale a `x = x || y`.",
          "Equivale a `x || (x = y)`: si no hace falta asignar, no se asigna, y un setter no se ejecuta.",
        ],
        [
          "`cantidad && <Componente />` es seguro en React.",
          "Si `cantidad` es `0`, React escribe el `0` en pantalla. Hay que convertir el lado izquierdo en booleano, por ejemplo con `cantidad > 0 &&`.",
        ],
      ],
    },

    // ───────────────────────── FAQ ─────────────────────────
    {
      type: "accordion",
      title: "Preguntas frecuentes de esta lección",
      items: [
        {
          title: "¿Cuál es la diferencia entre || y ??",
          text:
            "`||` pasa al lado derecho con cualquier valor falso: `0`, `\"\"`, `false`, `NaN`, `null` y `undefined`. `??` solo lo hace con `null` y `undefined`. Si `0` o la cadena vacía son valores válidos en tu caso, usa `??`.",
        },
        {
          title: "¿Se puede encadenar más de dos operandos?",
          text:
            "Sí. `a || b || c` devuelve el primer verdadero, o `c` si todos son falsos. `a && b && c` devuelve el primer falso, o `c` si todos son verdaderos. Se evalúan de izquierda a derecha, y se detienen en cuanto el resultado queda decidido.",
        },
        {
          title: "¿Qué pasa si mezclo || y && sin paréntesis?",
          text:
            "`&&` tiene mayor precedencia que `||`, así que `a || b && c` se evalúa como `a || (b && c)`. Aun así, conviene poner paréntesis para que se lea con claridad.",
        },
        {
          title: "¿Para qué sirve !!valor?",
          text:
            "Convierte cualquier valor en `true` o `false`: el primer `!` lo niega, y el segundo vuelve a negarlo. Es equivalente a `Boolean(valor)`.",
        },
        {
          title: "¿Debo dejar de usar || para valores por defecto?",
          text:
            "No hace falta dejarlo del todo. Si quieres que cualquier valor falso se sustituya, `||` es correcto, por ejemplo para una cadena vacía de un formulario. Lo importante es elegir conscientemente entre `||` y `??`, y recordar que un parámetro por defecto solo cubre `undefined`.",
        },
      ],
    },

    // ───────────────────────── Cierre ─────────────────────────
    { type: "heading", level: 2, text: "Cierre" },
    {
      type: "paragraph",
      text:
        "Los operadores `||` y `&&` devuelven uno de sus operandos y no evalúan el derecho si el izquierdo ya decide el resultado. `||` encuentra el primer valor verdadero, y `&&`, el primer falso. Para valores por defecto, la herramienta moderna es `??`, o un parámetro por defecto, y para acceder a propiedades que quizá no existen, `?.`. Las asignaciones `||=`, `&&=` y `??=` combinan todo eso con la asignación. Tener claros los ocho valores falsos te ahorra muchos errores. En la próxima lección vemos tres funciones del navegador para interactuar con el usuario: `alert`, `confirm` y `prompt`.",
    },
    {
      type: "checklist",
      title: "Antes de pasar al Día 31, verifica que puedes explicar…",
      items: [
        "Qué devuelve `a || b` y qué devuelve `a && b`.",
        "Por qué se llaman operadores de cortocircuito.",
        "Cuáles son los ocho valores falsos, y por qué `[]` y `\"0\"` son verdaderos.",
        "Cómo se evalúa `a || b || c` y `a && b && c`.",
        "Cómo se escribía un valor por defecto antes de ES2015 y qué trampa tenía.",
        "Qué diferencia hay entre un parámetro por defecto, `||` y `??`.",
        "Por qué `??` no se puede mezclar con `||` sin paréntesis.",
        "Para qué sirve `?.` y en qué se diferencia de `&&`.",
        "Qué hacen `||=`, `&&=` y `??=`, y por qué no equivalen a `x = x || y`.",
        "Por qué `cantidad && <p />` puede mostrar un `0` en una interfaz.",
        "Cuándo conviene usar un `if` en lugar de un cortocircuito.",
      ],
    },
    { type: "heading", level: 3, text: "Fuentes consultadas (noviembre de 2026)" },
    {
      type: "list",
      items: [
        "[MDN: Operador OR lógico (||)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_OR)",
        "[MDN: Operador AND lógico (&&)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_AND)",
        "[MDN: Operador de coalescencia nula (??)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing)",
        "[MDN: Asignación OR lógica (||=)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_OR_assignment)",
        "[MDN: Asignación AND lógica (&&=)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_AND_assignment)",
        "[MDN: Asignación de coalescencia nula (??=)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_nullish_assignment)",
        "[MDN: Encadenamiento opcional (?.)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining)",
        "[MDN: Parámetros por defecto](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters)",
        "[MDN: Valores falsos (falsy)](https://developer.mozilla.org/en-US/docs/Glossary/Falsy)",
        "[MDN: Valores verdaderos (truthy)](https://developer.mozilla.org/en-US/docs/Glossary/Truthy)",
        "[MDN: Precedencia de operadores](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_precedence)",
        "[React: Renderizado condicional](https://react.dev/learn/conditional-rendering)",
        "[ESLint: no-unused-expressions](https://eslint.org/docs/latest/rules/no-unused-expressions)",
      ],
    },
  ],
  selfCheck: [
    {
      question: "¿Qué devuelve `\"\" || \"anónimo\"`?",
      options: ["`\"\"`", "`\"anónimo\"`", "`true`", "`false`"],
      correctIndex: 1,
      explanation:
        "La cadena vacía es falsa, así que `||` devuelve el operando derecho.",
    },
    {
      question: "¿Qué devuelve `0 && \"listo\"`?",
      options: ["`\"listo\"`", "`0`", "`false`", "`undefined`"],
      correctIndex: 1,
      explanation:
        "`0` es falso, así que `&&` devuelve ese operando y no evalúa el derecho. Devuelve el propio `0`, no `false`.",
    },
    {
      question: "En `miFuncion() || otraFuncion()`, ¿cuándo se ejecuta `otraFuncion`?",
      options: [
        "Siempre",
        "Solo si `miFuncion()` devuelve un valor falso",
        "Solo si `miFuncion()` devuelve un valor verdadero",
        "Nunca",
      ],
      correctIndex: 1,
      explanation:
        "Si el lado izquierdo es verdadero, el resultado ya está decidido y el derecho no se evalúa.",
    },
    {
      question: "¿Cuál de estos valores es VERDADERO (truthy)?",
      options: ["`0n`", "`[]`", "`NaN`", "`\"\"`"],
      correctIndex: 1,
      explanation:
        "El arreglo vacío es verdadero. `0n`, `NaN` y la cadena vacía son falsos.",
    },
    {
      question: "Un usuario pide un descuento de `0`. Con `descuento = descuento || 10`, ¿qué descuento se aplica?",
      options: ["0", "10", "`undefined`", "`NaN`"],
      correctIndex: 1,
      explanation:
        "`0` es falso, y `||` lo sustituye por 10. Con `descuento ?? 10` se respetaría el 0.",
    },
    {
      question: "¿En qué casos actúa el valor por defecto de `function f(a = 5)`?",
      options: [
        "Con cualquier valor falso",
        "Cuando no se pasa el argumento o se pasa `undefined`",
        "Con `null` y `undefined`",
        "Siempre",
      ],
      correctIndex: 1,
      explanation:
        "El parámetro por defecto no actúa con `null`, `0` ni `\"\"`. Para sustituir también `null`, se usa `??`.",
    },
    {
      question: "¿Qué ocurre con `null || undefined ?? \"x\"`?",
      options: [
        "Devuelve `\"x\"`",
        "Lanza un `SyntaxError`, porque no se puede mezclar `??` con `||` sin paréntesis",
        "Devuelve `undefined`",
        "Devuelve `null`",
      ],
      correctIndex: 1,
      explanation:
        "Hay que escribir `(null || undefined) ?? \"x\"`, con paréntesis que indiquen el orden.",
    },
    {
      question: "¿Qué hace `config.volumen ??= 50` cuando `config.volumen` vale `0`?",
      options: [
        "Lo cambia a 50",
        "Lo deja en 0, porque `0` no es `null` ni `undefined`",
        "Lanza un error",
        "Lo cambia a `null`",
      ],
      correctIndex: 1,
      explanation:
        "`??=` asigna solo cuando el valor actual es `null` o `undefined`. Con `||=` se habría cambiado a 50.",
    },
    {
      question: "¿Qué diferencia hay entre `u && u.perfil` y `u?.perfil` cuando `u` vale `null`?",
      options: [
        "Ninguna",
        "`&&` devuelve `null`, y `?.` devuelve `undefined`",
        "`&&` lanza un error",
        "`?.` devuelve `null`",
      ],
      correctIndex: 1,
      explanation:
        "`&&` devuelve el valor falso que lo detuvo. El encadenamiento opcional devuelve siempre `undefined`.",
    },
    {
      question: "¿Cuántos valores falsos (falsy) tiene JavaScript?",
      options: [
        "Tres: `false`, `0` y `null`",
        "Ocho: `false`, `0`, `-0`, `0n`, `\"\"`, `null`, `undefined` y `NaN`",
        "Cualquier valor vacío, incluidos `[]` y `{}`",
        "Solo `false`",
      ],
      correctIndex: 1,
      explanation:
        "Son ocho, y todo lo demás es verdadero. Los arreglos y objetos vacíos, y las cadenas `\"0\"` y `\"false\"`, son verdaderos.",
    },
    {
      question: "En una interfaz de React, ¿qué muestra `{cantidad && <p>Hay artículos</p>}` si `cantidad` vale `0`?",
      options: [
        "Nada",
        "El número `0`",
        "El texto `false`",
        "Un error",
      ],
      correctIndex: 1,
      explanation:
        "`0 && ...` devuelve `0`, y React lo escribe. La solución es usar una comparación, como `cantidad > 0 && ...`.",
    },
  ],
};
