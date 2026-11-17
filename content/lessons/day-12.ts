import type { Lesson } from "@/lib/types";

// Une líneas de código sin tener que escapar backticks ni `${}` dentro de template literals.
const L = (...lines: string[]) => lines.join("\n");

// Contenido validado contra fuentes actuales en noviembre de 2026 (ver sección "Fuentes").
export const day12: Lesson = {
  day: 12,
  slug: "arreglos-arrays-basicos",
  title: "Arreglos (arrays): crear, acceder, modificar y recorrer",
  section: "Funciones y tipos compuestos",
  estimatedMinutes: 65,
  icon: "📚",
  objectives: [
    "Crear arreglos con literales, `Array.of()`, `fill()` y entender por qué `new Array()` casi no se usa",
    "Acceder a los elementos por su índice (que empieza en 0), incluidos los arreglos anidados, y usar `length` y `at()`",
    "Agregar y quitar elementos con `push()`, `pop()`, `unshift()` y `shift()`, y saber qué devuelve cada uno",
    "Recorrer un arreglo con `forEach()` usando el elemento y su índice",
    "Entender que un arreglo se guarda por referencia y qué consecuencias tiene al asignar y copiar",
  ],
  blocks: [
    // ───────────────────────── Apertura ─────────────────────────
    {
      type: "paragraph",
      text:
        "En la lección anterior vimos las funciones. Hoy vemos el segundo tipo de dato compuesto: los arreglos (en inglés, arrays). Un arreglo es una colección ordenada de elementos, cada uno con una posición. Es la estructura que usarás para guardar una lista de productos, de usuarios, de mensajes, de colores: cualquier conjunto de valores del mismo tema.",
    },
    {
      type: "keyFacts",
      items: [
        { value: "[ ]", label: "Literal de arreglo: la forma habitual de crearlo" },
        { value: "Índice 0", label: "El primer elemento está en la posición 0" },
        { value: "length", label: "Cantidad de elementos; el último índice es length - 1" },
        { value: "push / pop", label: "Agregan y quitan al final" },
        { value: "forEach()", label: "Ejecuta una función por cada elemento" },
        { value: "Referencia", label: "Asignar un arreglo no lo copia" },
      ],
    },
    {
      type: "callout",
      variant: "success",
      text:
        "Contenido verificado en noviembre de 2026 con MDN Web Docs (el objeto `Array` y los métodos `of`, `fill`, `push`, `pop`, `forEach`, `at`, `from` e `isArray`) y con la documentación de ESLint. Los resultados de los ejemplos se comprobaron ejecutándolos. Al final hay una tabla con datos que suelen aparecer desactualizados y la lista de fuentes.",
    },

    // ───────────────────────── Qué es un arreglo ─────────────────────────
    { type: "heading", level: 2, text: "Qué es un arreglo y cómo crearlo" },
    {
      type: "paragraph",
      text:
        "La forma más simple de crear un arreglo es un par de corchetes: `[]` es un arreglo vacío, y JavaScript lo reconoce como tal. En la consola del navegador verás que su propiedad `length` (longitud) vale 0, y una referencia al prototipo, un concepto que explicaremos cuando lleguemos a la programación orientada a objetos. Un arreglo es un objeto, pero un objeto especial: `typeof []` devuelve `\"object\"`, por eso, para saber si algo es un arreglo, se usa `Array.isArray()`.",
    },
    {
      type: "playground",
      title: "Experimento 1 · El arreglo vacío y su tipo",
      description: "`typeof` no distingue un arreglo de un objeto; `Array.isArray()` sí.",
      code: L(
        "const vacio = [];",
        "console.log(vacio.length);",
        "console.log(typeof vacio, Array.isArray(vacio));",
        "console.log(Array.isArray({}), Array.isArray(\"hola\"));",
      ),
      expected: L("0", "object true", "false false"),
    },
    {
      type: "paragraph",
      text:
        "Puedes declararlo con `const` o con `let`. Algunos programadores prefieren `let` para los arreglos, otros `const`, y es en parte una cuestión de estilo. Muchos equipos prefieren `const`, porque `const` impide reasignar la variable, pero no impide cambiar el contenido del arreglo: puedes agregar y quitar elementos sin problema, como vimos con los objetos en la lección de constantes. Mientras la variable siga apuntando al mismo arreglo, no hay error.",
    },
    {
      type: "paragraph",
      text:
        "Un arreglo puede crearse ya con elementos, separados por comas. Los elementos pueden ser de tipos distintos: un número, un booleano, un texto, otro arreglo e incluso objetos (que veremos en la próxima lección). Si lo muestras en la consola, el navegador desglosa cada elemento con su posición.",
    },
    {
      type: "playground",
      title: "Experimento 2 · Elementos de distintos tipos",
      description: "Para ver el contenido en una línea se usa JSON.stringify().",
      code: L(
        'const b = [1, true, "hola", ["a", "b", "c"]];',
        "",
        "console.log(b.length);",
        "console.log(JSON.stringify(b));",
        "console.log(b[0], b[2]);",
        "",
        "// Una posición que no existe devuelve undefined",
        "console.log(b[10], b[-1]);",
      ),
      expected: L("4", '[1,true,"hola",["a","b","c"]]', "1 hola", "undefined undefined"),
    },
    {
      type: "callout",
      variant: "info",
      text:
        "`length` devuelve el número de elementos, igual que en las cadenas de texto devolvía el número de caracteres. Pero cuidado con el vocabulario: el número de elementos y la posición del último no coinciden. Con cuatro elementos, `length` es 4 y el último índice es 3.",
    },

    // ───────────────────────── Índices ─────────────────────────
    { type: "heading", level: 2, text: "Acceder por posición: los índices empiezan en 0" },
    {
      type: "paragraph",
      text:
        "Cada elemento ocupa una posición, llamada índice, y la primera es siempre la 0. El primer elemento está en `[0]`, el segundo en `[1]`, el tercero en `[2]` y así sucesivamente. Si el arreglo tiene siete elementos, los índices van de 0 a 6: al número de elementos siempre hay que restarle 1 para obtener el último índice. Una analogía útil: acceder a un arreglo es como dar una coordenada en un tablero de ajedrez o en el juego de los submarinos; hay que indicar la posición exacta.",
    },
    {
      type: "image",
      src: "/img/dia-12/indices-arreglo.svg",
      alt: "Un arreglo de cuatro colores: rojo, verde, azul y negro, con los índices 0 a 3 encima y los índices negativos -4 a -1 debajo para el método at. La longitud es 4 y el último índice es longitud menos uno.",
      caption: "Los índices van de 0 a length - 1. Con at(), también de -1 hacia atrás.",
    },
    {
      type: "paragraph",
      text:
        "Para acceder al último elemento, el patrón clásico es `arreglo[arreglo.length - 1]`. Desde ECMAScript 2022 existe `at()`, que acepta índices negativos y cuenta desde el final: `at(-1)` es el último y `at(-2)` el penúltimo. Los corchetes no entienden los negativos: `arreglo[-1]` devuelve `undefined`.",
    },
    { type: "heading", level: 3, text: "Arreglos dentro de arreglos" },
    {
      type: "paragraph",
      text:
        "Si un elemento es a su vez un arreglo, hay que dar dos coordenadas: primero la del arreglo padre y luego la de la posición dentro del interno. Para llegar a la letra `\"c\"` del ejemplo, el arreglo interno está en la posición 3 del padre y la `\"c\"` es el tercer elemento de ese arreglo, es decir, la posición 2: `b[3][2]`. Si hubiera un tercer nivel, se añade otra coordenada, igual que antes.",
    },
    {
      type: "image",
      src: "/img/dia-12/arreglo-anidado.svg",
      alt: "El arreglo b contiene 1, true, hola y un arreglo con a, b y c. b[3] selecciona el arreglo interno y b[3][2] selecciona la letra c.",
      caption: "b[3][2] es la letra «c»: dos coordenadas para dos niveles.",
    },
    {
      type: "playground",
      title: "Experimento 3 · Acceso anidado y desde el final",
      description: "Cada nivel de anidamiento añade un par de corchetes.",
      code: L(
        'const b = [1, true, "hola", ["a", "b", "c", [1, 2, 3]]];',
        "",
        "console.log(b[3][2]);",
        "console.log(b[3][3][0]);",
        "console.log(b[b.length - 1].length);",
        "console.log(b.at(-1)[0]);",
        "console.log(b.at(-2));",
      ),
      expected: L("c", "1", "4", "a", "hola"),
    },

    // ───────────────────────── Crear con métodos ─────────────────────────
    { type: "heading", level: 2, text: "Otras formas de crear arreglos: Array.of() y fill()" },
    {
      type: "paragraph",
      text:
        "El método `Array.of()` crea un arreglo con los valores que le pases como argumentos. Llegó con ECMAScript 2015 y tiene una ventaja sobre el constructor: es coherente con cualquier cantidad de argumentos, incluido uno solo. `Array.of(7)` crea el arreglo `[7]`, mientras que `Array(7)` crea un arreglo de siete posiciones vacías.",
    },
    {
      type: "paragraph",
      text:
        "Otro método muy útil es `fill()`, que llena todas las posiciones con el mismo valor. Imagina que en una tienda en línea tienes mil productos y, mientras cargas sus datos reales, quieres inicializar un descuento en 0 para todos. Para ello creas un arreglo de la longitud que necesitas con `Array(1000)` y lo llenas con `.fill(0)`. Con 100 posiciones y el valor `false`, la consola muestra un arreglo de 100 elementos, todos `false`.",
    },
    {
      type: "playground",
      title: "Experimento 4 · Array.of() y fill()",
      description: "Observa la diferencia entre `Array.of(7)` y `Array(7)`.",
      code: L(
        'const c = Array.of("x", "y", 7, 9, 8, 7);',
        "console.log(c.length, JSON.stringify(c));",
        "",
        "console.log(Array.of(7).length, Array(7).length);",
        "",
        "const dias = Array(5).fill(false);",
        "console.log(JSON.stringify(dias));",
        "console.log(Array(100).fill(0).length);",
      ),
      expected: L(
        '6 ["x","y",7,9,8,7]',
        "1 7",
        "[false,false,false,false,false]",
        "100",
      ),
    },
    { type: "heading", level: 3, text: "El constructor new Array(): por qué se usa poco" },
    {
      type: "paragraph",
      text:
        "También se puede crear un arreglo con el constructor y el operador `new`, igual que vimos con los números y los booleanos (`new Array()` crea una instancia). Funciona, pero se usa cada vez menos: no es que esté mal, pero el literal `[]` es más corto y claro. Además tiene una ambigüedad: con un solo argumento numérico crea posiciones vacías en lugar de un elemento. Por eso ESLint incluye la regla `no-array-constructor`.",
    },
    {
      type: "playground",
      title: "Experimento 5 · La ambigüedad de new Array()",
      description: "Con un argumento numérico, new Array(3) no crea el arreglo [3].",
      code: L(
        "console.log(JSON.stringify(new Array(1, 2, 3)));",
        'console.log(JSON.stringify(new Array("3")));',
        "console.log(new Array(3).length, JSON.stringify(Array.of(3)));",
        "",
        "// Un arreglo con huecos, no con valores",
        "console.log(0 in new Array(3));",
      ),
      expected: L("[1,2,3]", '["3"]', "3 [3]", "false"),
    },
    {
      type: "callout",
      variant: "warning",
      text:
        "Una trampa con `fill()` y los tipos compuestos: `Array(3).fill([])` no crea tres arreglos vacíos, sino tres posiciones que apuntan al mismo arreglo. Para valores distintos usa `Array.from({ length: 3 }, () => [])`. Esto se entiende al ver cómo se guardan los arreglos, más abajo.",
    },
    {
      type: "playground",
      title: "Experimento 6 · fill() con un arreglo repite la referencia",
      description: "Cambiar una fila cambia todas, porque son el mismo arreglo.",
      code: L(
        "const filas = Array(3).fill([]);",
        'filas[0].push("x");',
        "console.log(JSON.stringify(filas));",
        "console.log(filas[0] === filas[1]);",
        "",
        "const filasOk = Array.from({ length: 3 }, () => []);",
        'filasOk[0].push("x");',
        "console.log(JSON.stringify(filasOk));",
      ),
      expected: L('[["x"],["x"],["x"]]', "true", '[["x"],[],[]]'),
    },

    // ───────────────────────── push, pop, shift, unshift ─────────────────────────
    { type: "heading", level: 2, text: "Agregar y quitar elementos" },
    {
      type: "paragraph",
      text:
        "Los arreglos tienen propiedades, como `length`, y métodos, que son funciones asociadas al arreglo. Imagina un arreglo con los tres colores del sistema RGB: rojo, verde y azul. Para agregar un elemento al final se usa `push()`; para quitar el último, `pop()`. Ambos modifican el arreglo original, y ambos devuelven un valor útil: `push()` devuelve la nueva longitud y `pop()` devuelve el elemento que quitó.",
    },
    {
      type: "playground",
      title: "Experimento 7 · push() y pop()",
      description: "Observa lo que devuelve cada método además de modificar el arreglo.",
      code: L(
        'const colores = ["rojo", "verde", "azul"];',
        "",
        'console.log(colores.push("negro"));',
        "console.log(JSON.stringify(colores));",
        "",
        "console.log(colores.pop());",
        "console.log(JSON.stringify(colores), colores.length);",
      ),
      expected: L(
        "4",
        '["rojo","verde","azul","negro"]',
        "negro",
        '["rojo","verde","azul"] 3',
      ),
    },
    {
      type: "paragraph",
      text:
        "Sus equivalentes para el principio del arreglo son `unshift()`, que agrega al inicio, y `shift()`, que quita el primero. Los cuatro forman una familia: `push` y `pop` trabajan por el final, `unshift` y `shift` por el principio. Ten en cuenta que los del principio son más costosos en arreglos muy grandes, porque obligan a mover todos los demás elementos.",
    },
    {
      type: "image",
      src: "/img/dia-12/extremos-arreglo.svg",
      alt: "Un arreglo con rojo, verde y azul. A la izquierda, unshift agrega al principio y shift quita el primero. A la derecha, push agrega al final y pop quita el último. push y unshift devuelven la nueva longitud; pop y shift devuelven el elemento quitado.",
      caption: "push y pop trabajan en el final; unshift y shift, en el principio.",
    },
    {
      type: "playground",
      title: "Experimento 8 · unshift() y shift()",
      description: "Lo mismo, pero por el principio del arreglo.",
      code: L(
        'const colores = ["rojo", "verde", "azul"];',
        "",
        'console.log(colores.unshift("blanco"));',
        "console.log(colores.join(\", \"));",
        "",
        "console.log(colores.shift());",
        'console.log(colores.join(", "));',
      ),
      expected: L("4", "blanco, rojo, verde, azul", "blanco", "rojo, verde, azul"),
    },
    {
      type: "table",
      caption: "Resumen de los métodos para agregar y quitar",
      headers: ["Método", "Qué hace", "Devuelve"],
      rows: [
        ["`push(valor)`", "Agrega al final", "La nueva longitud"],
        ["`pop()`", "Quita el último", "El elemento quitado"],
        ["`unshift(valor)`", "Agrega al principio", "La nueva longitud"],
        ["`shift()`", "Quita el primero", "El elemento quitado"],
        ["`forEach(función)`", "Ejecuta la función por cada elemento", "`undefined`"],
      ],
    },

    // ───────────────────────── forEach ─────────────────────────
    { type: "heading", level: 2, text: "Recorrer un arreglo con forEach()" },
    {
      type: "paragraph",
      text:
        "Los arreglos tienen decenas de métodos, y en una sola clase no caben todos. Para conocerlos, lo mejor es acudir a la documentación de MDN (Mozilla Developer Network), buscar el objeto `Array` y revisar sus propiedades y métodos, que traen ejemplos. Aquí vemos uno muy importante: `forEach()`, que ejecuta una función por cada elemento del arreglo.",
    },
    {
      type: "paragraph",
      text:
        "`forEach()` recibe una función como argumento. A esa función que se pasa a otra para que la ejecute se le llama callback (la entenderás mejor cuando veamos la programación asíncrona). Se invoca una vez por cada elemento y recibe tres argumentos: el elemento actual, su índice y el arreglo completo. Casi siempre se usan los dos primeros. Como todavía no vemos las funciones flecha, escribimos la función como una función anónima, tal como aprendimos en la lección anterior.",
    },
    {
      type: "paragraph",
      text:
        "Un caso práctico: imagina que quieres generar una lista HTML con un elemento por cada color. Dentro de la función usas una plantilla de texto para formar cada `<li>`, y con el índice puedes darle a cada uno un identificador único (`color-0`, `color-1`…). (Recuerda lo que vimos sobre XSS: si los valores vinieran de un usuario, habría que escaparlos antes de insertarlos como HTML.)",
    },
    {
      type: "playground",
      title: "Experimento 9 · forEach() con elemento e índice",
      description: "`forEach()` no devuelve nada: su trabajo es ejecutar la función por cada elemento.",
      code: L(
        'const colores = ["rojo", "verde", "azul"];',
        "",
        "colores.forEach(function (color) {",
        "  console.log(`<li>${color}</li>`);",
        "});",
        "",
        "colores.forEach(function (color, index) {",
        '  console.log(`<li id="color-${index}">${color}</li>`);',
        "});",
        "",
        "const resultado = colores.forEach(function () {});",
        "console.log(resultado);",
      ),
      expected: L(
        "<li>rojo</li>",
        "<li>verde</li>",
        "<li>azul</li>",
        '<li id="color-0">rojo</li>',
        '<li id="color-1">verde</li>',
        '<li id="color-2">azul</li>',
        "undefined",
      ),
    },
    {
      type: "callout",
      variant: "info",
      text:
        "En el material antiguo se presenta `forEach()` junto a `map()`, `filter()` y `reduce()` como métodos «funcionales» llegados con ES6. En realidad los cuatro existen desde ECMAScript 5 (2009). Con ES2015 llegaron `Array.of()`, `Array.from()`, `fill()` y `find()`. `map`, `filter` y `reduce` los veremos más adelante, en la parte de paradigmas de programación.",
    },
    {
      type: "callout",
      variant: "warning",
      text:
        "Dos límites de `forEach()`: no hay forma de interrumpirlo con `break` (si lo necesitas, usa un bucle `for` o `for...of`, o métodos como `some()` o `find()`), y no espera a las promesas, así que no es adecuado con funciones asíncronas.",
    },

    // ───────────────────────── Referencia ─────────────────────────
    { type: "heading", level: 2, text: "Los arreglos se guardan por referencia" },
    {
      type: "paragraph",
      text:
        "La idea de «coordenadas» sirve para entender el acceso, pero hay otra consecuencia de que los arreglos sean un tipo compuesto: una variable no guarda el arreglo, sino una referencia a él. Por eso, asignar un arreglo a otra variable no lo copia: ambas variables apuntan al mismo arreglo. Un cambio hecho desde una se ve desde la otra, y dos arreglos distintos con el mismo contenido no son iguales con `===`, porque son referencias distintas.",
    },
    {
      type: "image",
      src: "/img/dia-12/referencia-arreglo.svg",
      alt: "A la izquierda, las variables original y mismo apuntan al mismo arreglo, que después de push muestra 1, 2, 3, 4. A la derecha, Array(3).fill con un arreglo vacío hace que los tres huecos apunten al mismo arreglo, y Array.from con una función crea tres arreglos distintos.",
      caption: "Asignar no copia: las dos variables comparten el arreglo.",
    },
    {
      type: "playground",
      title: "Experimento 10 · Asignar, copiar y const",
      description: "Para copiar un arreglo se usa la sintaxis de propagación `[...arreglo]`.",
      code: L(
        "const original = [1, 2, 3];",
        "const mismo = original;",
        "mismo.push(4);",
        "console.log(original.length);",
        "console.log(original === mismo, [] === []);",
        "",
        "const copia = [...original];",
        "copia.push(5);",
        "console.log(original.length, copia.length);",
        "",
        "// const protege la variable, no el contenido",
        "try {",
        "  original = [];",
        "} catch (e) {",
        "  console.log(e.name);",
        "}",
      ),
      expected: L("4", "true false", "4 5", "TypeError"),
    },
    {
      type: "paragraph",
      text:
        "Una última particularidad: `length` se puede modificar. Reducirlo recorta el arreglo, y asignar un elemento más allá del final deja posiciones vacías («huecos»), que `forEach()` se salta. Es mejor evitarlo: usa `push()`.",
    },
    {
      type: "playground",
      title: "Experimento 11 · length y los huecos",
      description: "Asignar fuera del final deja huecos que JSON muestra como null.",
      code: L(
        "const q = [1, 2, 3];",
        "q.length = 1;",
        "console.log(JSON.stringify(q));",
        "",
        'q[3] = "x";',
        "console.log(q.length, JSON.stringify(q));",
        "console.log(1 in q);",
      ),
      expected: L("[1]", '4 [1,null,null,"x"]', "false"),
    },

    // ───────────────────────── Datos que cambian ─────────────────────────
    { type: "heading", level: 2, text: "Datos que suelen aparecer desactualizados" },
    {
      type: "table",
      caption: "Material antiguo frente a información verificada",
      headers: ["Suele decirse", "Información verificada"],
      rows: [
        [
          "Un arreglo declarado con `const` es una constante.",
          "`const` impide reasignar la variable, pero el contenido sigue siendo modificable: se puede agregar, quitar y cambiar elementos.",
        ],
        [
          "`new Array()` está mal y nadie lo usa.",
          "Es válido, pero el literal `[]` es más claro y el constructor es ambiguo con un solo argumento numérico. ESLint lo señala con `no-array-constructor`. `Array(n)` sigue siendo una forma legítima de reservar longitud.",
        ],
        [
          "`Array(100).fill(valor)` crea 100 valores independientes.",
          "Con un número, un texto o un booleano sí. Con un objeto o arreglo, las 100 posiciones comparten la misma referencia. Usa `Array.from({ length: 100 }, () => ...)`.",
        ],
        [
          "`forEach`, `map`, `filter` y `reduce` llegaron con ES6.",
          "Los cuatro son de ECMAScript 5 (2009). ES2015 añadió `Array.of()`, `Array.from()`, `fill()` y `find()`, entre otros.",
        ],
        [
          "Los arreglos tienen «más de 20 métodos».",
          "Tienen muchos más. Desde ECMAScript 2022 existe `at()`, y ECMAScript 2023 sumó métodos que no mutan el arreglo, como `toSorted()` y `toReversed()`.",
        ],
        [
          "Para el último elemento hay que usar `arreglo[arreglo.length - 1]`.",
          "Sigue siendo válido, pero `arreglo.at(-1)` es más legible y está soportado por los navegadores actuales.",
        ],
        [
          "`typeof` sirve para detectar un arreglo.",
          "`typeof []` es `\"object\"`. Para detectarlo, usa `Array.isArray()`.",
        ],
        [
          "`forEach()` sirve para cualquier recorrido.",
          "No se puede interrumpir con `break` y no espera promesas. Para esos casos hay `for...of` y otros métodos.",
        ],
      ],
    },

    // ───────────────────────── FAQ ─────────────────────────
    {
      type: "accordion",
      title: "Preguntas frecuentes de esta lección",
      items: [
        {
          title: "¿Cómo muestro el contenido de un arreglo?",
          text:
            "En la consola, `console.log(arreglo)` lo muestra desglosado, y `console.table(arreglo)` lo muestra como tabla. Para convertirlo en texto, `join(\", \")` une los elementos con un separador y `JSON.stringify(arreglo)` da una representación en una línea.",
        },
        {
          title: "¿Qué diferencia hay entre `push()`/`pop()` y `unshift()`/`shift()`?",
          text:
            "Los primeros trabajan por el final del arreglo y los segundos por el principio. Los del final son más eficientes porque no obligan a mover los demás elementos.",
        },
        {
          title: "¿Cómo copio un arreglo?",
          text:
            "Con la sintaxis de propagación `[...arreglo]` o con `arreglo.slice()`. Ambas hacen una copia superficial: si el arreglo contiene objetos o arreglos, esos siguen siendo compartidos.",
        },
        {
          title: "¿Puedo guardar objetos y funciones en un arreglo?",
          text:
            "Sí. Un arreglo puede contener cualquier valor: números, textos, otros arreglos, objetos y funciones. De hecho, es muy habitual tener arreglos de objetos, que veremos en la próxima lección.",
        },
        {
          title: "¿Cuándo uso `forEach()` y cuándo un bucle `for`?",
          text:
            "`forEach()` es cómodo cuando vas a hacer algo con cada elemento. Si necesitas interrumpir el recorrido, o trabajar con funciones asíncronas, usa un bucle `for` o `for...of`.",
        },
        {
          title: "¿Qué pasa si accedo a una posición que no existe?",
          text:
            "Obtienes `undefined`, sin error. Por eso `arreglo[10]` en un arreglo de cuatro elementos no falla, pero conviene comprobar `length` si no estás seguro.",
        },
      ],
    },

    // ───────────────────────── Cierre ─────────────────────────
    { type: "heading", level: 2, text: "Cierre" },
    {
      type: "paragraph",
      text:
        "Ya sabes crear arreglos, acceder a sus elementos (incluso en varios niveles), agregar y quitar con `push`, `pop`, `unshift` y `shift`, y recorrerlos con `forEach()`. Los arreglos tienen muchos más métodos; los retomaremos cuando lleguemos a los paradigmas de programación, y entonces `map`, `filter` y `reduce` cobrarán sentido. En la próxima lección vemos el tercer tipo compuesto: los objetos, con sus propiedades, métodos, claves y valores.",
    },
    {
      type: "checklist",
      title: "Antes de pasar al Día 13, verifica que puedes explicar…",
      items: [
        "Por qué `typeof []` es `\"object\"` y cómo se comprueba correctamente que algo es un arreglo.",
        "Por qué el primer elemento está en el índice 0 y cuál es el último índice de un arreglo de siete elementos.",
        "Cómo se accede a `\"c\"` en `[1, true, \"hola\", [\"a\", \"b\", \"c\"]]` y qué hace `at(-1)`.",
        "Qué diferencia hay entre `Array.of(7)` y `Array(7)`, y por qué `new Array()` se usa poco.",
        "Qué devuelven `push()`, `pop()`, `unshift()` y `shift()`.",
        "Qué recibe la función de `forEach()` y qué devuelve `forEach()`.",
        "Por qué asignar un arreglo a otra variable no lo copia y cómo se copia de verdad.",
      ],
    },
    { type: "heading", level: 3, text: "Fuentes consultadas (noviembre de 2026)" },
    {
      type: "list",
      items: [
        "[MDN: Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)",
        "[MDN: Colecciones indexadas (guía)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections)",
        "[MDN: Constructor Array()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Array)",
        "[MDN: Array.of()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/of)",
        "[MDN: Array.from()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from)",
        "[MDN: Array.prototype.fill()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fill)",
        "[MDN: Array.prototype.push()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push)",
        "[MDN: Array.prototype.pop()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/pop)",
        "[MDN: Array.prototype.unshift()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift)",
        "[MDN: Array.prototype.shift()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/shift)",
        "[MDN: Array.prototype.forEach()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)",
        "[MDN: Array.prototype.at()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/at)",
        "[MDN: Array.isArray()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray)",
        "[MDN: Array: length](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/length)",
        "[MDN: Sintaxis de propagación](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)",
        "[ESLint: no-array-constructor](https://eslint.org/docs/latest/rules/no-array-constructor)",
      ],
    },
  ],
  selfCheck: [
    {
      question: "¿Qué devuelve `typeof []`?",
      options: ["\"array\"", "\"object\"", "\"list\"", "\"undefined\""],
      correctIndex: 1,
      explanation:
        "Un arreglo es un objeto especial. Para comprobar que algo es un arreglo se usa `Array.isArray()`.",
    },
    {
      question: "En el arreglo `[\"a\", \"b\", \"c\"]`, ¿qué devuelve `arreglo[1]`?",
      options: ["\"a\"", "\"b\"", "\"c\"", "undefined"],
      correctIndex: 1,
      explanation: "Los índices empiezan en 0: `[0]` es `\"a\"`, `[1]` es `\"b\"` y `[2]` es `\"c\"`.",
    },
    {
      question: "Un arreglo tiene 7 elementos. ¿Cuál es el índice del último?",
      options: ["7", "6", "8", "0"],
      correctIndex: 1,
      explanation: "El último índice es `length - 1`, es decir, 6.",
    },
    {
      question: "¿Cómo se accede a la letra `\"c\"` en `b = [1, \"x\", [\"a\", \"b\", \"c\"]]`?",
      options: ["b[3][2]", "b[2][2]", "b[2, 2]", "b.c"],
      correctIndex: 1,
      explanation:
        "El arreglo interno está en la posición 2 del padre, y la `\"c\"` en la posición 2 del interno: `b[2][2]`.",
    },
    {
      question: "¿Qué devuelve `[10, 20, 30].at(-1)`?",
      options: ["10", "20", "30", "undefined"],
      correctIndex: 2,
      explanation: "`at()` acepta índices negativos y cuenta desde el final: `-1` es el último elemento.",
    },
    {
      question: "¿Qué devuelve `Array.of(7)`?",
      options: [
        "Un arreglo con siete posiciones vacías",
        "El arreglo [7]",
        "El número 7",
        "Un error",
      ],
      correctIndex: 1,
      explanation:
        "`Array.of(7)` crea `[7]`. En cambio `Array(7)` crea un arreglo de siete posiciones vacías.",
    },
    {
      question: "¿Qué devuelve `push()`?",
      options: [
        "El elemento agregado",
        "El nuevo arreglo",
        "La nueva longitud del arreglo",
        "undefined",
      ],
      correctIndex: 2,
      explanation: "`push()` modifica el arreglo y devuelve su nueva longitud. `pop()` devuelve el elemento quitado.",
    },
    {
      question: "¿Qué devuelve `forEach()`?",
      options: ["Un arreglo nuevo", "El mismo arreglo", "undefined", "El último elemento"],
      correctIndex: 2,
      explanation: "`forEach()` ejecuta la función por cada elemento y siempre devuelve `undefined`.",
    },
    {
      question: "¿Qué ocurre con `const a = [1]; const b = a; b.push(2);`?",
      options: [
        "a sigue siendo [1]",
        "a pasa a ser [1, 2], porque a y b apuntan al mismo arreglo",
        "Se lanza un error porque a es constante",
        "b es una copia independiente",
      ],
      correctIndex: 1,
      explanation:
        "Asignar un arreglo copia la referencia, no el contenido. Para copiar de verdad se usa `[...a]`.",
    },
    {
      question: "¿Qué crea `Array(3).fill([])`?",
      options: [
        "Tres arreglos vacíos independientes",
        "Tres posiciones que apuntan al mismo arreglo vacío",
        "Un arreglo con un solo elemento",
        "Un error",
      ],
      correctIndex: 1,
      explanation:
        "`fill()` repite el mismo valor, y un arreglo es una referencia. Para tres arreglos distintos: `Array.from({ length: 3 }, () => [])`.",
    },
  ],
};
