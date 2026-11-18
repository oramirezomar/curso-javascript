import type { Lesson } from "@/lib/types";

// Une líneas de código sin tener que escapar backticks ni `${}` dentro de template literals.
const L = (...lines: string[]) => lines.join("\n");

// Contenido validado contra fuentes actuales en noviembre de 2026 (ver sección "Fuentes").
export const day19: Lesson = {
  day: 19,
  slug: "destructuring-desestructurar-arreglos-objetos",
  title: "Destructuring: desestructurar arreglos y objetos",
  section: "Sintaxis moderna (ES2015)",
  estimatedMinutes: 75,
  icon: "✨",
  objectives: [
    "Explicar qué es la desestructuración y por qué se empareja por posición en arreglos y por nombre en objetos",
    "Desestructurar arreglos: omitir posiciones, usar valores por defecto, recoger el resto e intercambiar valores",
    "Desestructurar objetos: renombrar con alias, usar valores por defecto y entender qué pasa si el nombre no existe",
    "Desestructurar valores anidados, parámetros de función y elementos de un ciclo",
    "Reconocer los errores típicos: `null`, `undefined`, valores no iterables y la asignación sin declarar",
  ],
  blocks: [
    // ───────────────────────── Apertura ─────────────────────────
    {
      type: "paragraph",
      text:
        "Con el estándar ECMAScript 2015 (ES6), JavaScript incorporó varias formas más cómodas de escribir código. La primera que vemos es la desestructuración (en inglés, «destructuring», y de ahí el nombre «asignación por desestructuración»). Es una manera de asignar valores a variables a partir de un arreglo o de un objeto, sacando varias piezas de una sola vez. La verás constantemente en código real y en librerías como React, donde un componente recibe sus propiedades (props) como un objeto y es habitual desestructurarlo en los parámetros de la función.",
    },
    {
      type: "keyFacts",
      items: [
        { value: "[a, b]", label: "En un arreglo, cada variable toma el valor de su posición" },
        { value: "{ a, b }", label: "En un objeto, cada variable busca la propiedad con su mismo nombre" },
        { value: "{ a: x }", label: "Alias: guarda la propiedad a en una variable llamada x" },
        { value: "a = 1", label: "Valor por defecto: se usa solo si el valor es undefined" },
        { value: "null / undefined", label: "Desestructurarlos lanza un TypeError" },
        { value: "({ a } = obj)", label: "Para asignar sin declarar, hacen falta paréntesis" },
      ],
    },
    {
      type: "callout",
      variant: "success",
      text:
        "Contenido verificado en noviembre de 2026 con MDN Web Docs (asignación por desestructuración, valores por defecto y protocolos de iteración), con la documentación de React y con la de ESLint. Los resultados de los ejemplos se comprobaron ejecutándolos. Al final hay una tabla con datos que suelen aparecer desactualizados y la lista de fuentes.",
    },

    // ───────────────────────── Arreglos ─────────────────────────
    { type: "heading", level: 2, text: "Desestructurar un arreglo" },
    {
      type: "paragraph",
      text:
        "Empezamos por los arreglos porque son lo más fácil de entender. Imagina un arreglo de tres números y la necesidad de guardar cada valor en una variable distinta. Sin desestructuración, tienes que leer cada posición por su índice, una línea por variable. Con desestructuración, escribes entre corchetes, al lado izquierdo del signo igual, los nombres de las variables que quieres crear, y JavaScript asigna a cada una el valor de la posición correspondiente.",
    },
    {
      type: "code",
      lang: "js",
      title: "Forma básica con arreglos",
      code: L(
        "const numeros = [1, 2, 3];",
        "",
        "// Sin desestructuración",
        "const a = numeros[0];",
        "const b = numeros[1];",
        "const c = numeros[2];",
        "",
        "// Con desestructuración: una sola línea",
        "const [uno, dos, tres] = numeros;",
      ),
    },
    {
      type: "playground",
      title: "Experimento 1 · La misma asignación, sin y con desestructuración",
      description: "Los dos caminos dan el mismo resultado. El segundo escribe menos y se lee mejor.",
      code: L(
        "const numeros = [1, 2, 3];",
        "",
        "// Sin desestructuración",
        "const a = numeros[0];",
        "const b = numeros[1];",
        "const c = numeros[2];",
        "console.log(a, b, c);",
        "",
        "// Con desestructuración",
        "const [uno, dos, tres] = numeros;",
        "console.log(uno, dos, tres);",
      ),
      expected: L("1 2 3", "1 2 3"),
    },
    {
      type: "image",
      src: "/img/dia-19/destructuring-arreglos.svg",
      alt: "Tres ejemplos de desestructuración de arreglos. Primero, const [uno, dos, tres] = numeros asigna las posiciones 0, 1 y 2 a las variables uno, dos y tres. Segundo, const [primero, , tercero] deja una coma vacía para omitir la posición 1. Tercero, con valores por defecto, p vale 5 porque la posición 0 es undefined, y q vale 0 porque 0 no es undefined.",
      caption: "En un arreglo, cada variable toma el valor de su posición.",
    },
    {
      type: "paragraph",
      text:
        "Como en un arreglo lo que cuenta es la posición, el orden importa: la primera variable recibe la posición 0, la segunda la posición 1, y así sucesivamente. Puedes omitir una posición dejando una coma vacía. Si el arreglo tiene menos elementos que variables, las que sobran valen `undefined`. Y puedes dar un valor por defecto a una variable (`p = 5`), que se usará únicamente cuando el valor que llega sea `undefined`: ni `0`, ni `null`, ni un texto vacío lo activan.",
    },
    {
      type: "playground",
      title: "Experimento 2 · Omitir posiciones, faltantes y valores por defecto",
      description: "El `0` y el `null` no activan el valor por defecto, porque solo lo activa `undefined`.",
      code: L(
        "// Omitir la posición del medio",
        "const [primero, , tercero] = [10, 20, 30];",
        "console.log(primero, tercero);",
        "",
        "// Menos elementos que variables",
        "const [x, y, z] = [1, 2];",
        "console.log(x, y, z);",
        "",
        "// Valores por defecto",
        "const [p = 5, q = 7, r = 9] = [undefined, 0, null];",
        "console.log(p, q, r);",
      ),
      expected: L("10 30", "1 2 undefined", "5 0 null"),
    },
    {
      type: "paragraph",
      text:
        "Dos usos prácticos. Con tres puntos (`...resto`) puedes recoger el resto de los elementos en un arreglo nuevo; esos tres puntos los estudiaremos a fondo en la lección sobre rest y spread. Y puedes intercambiar el valor de dos variables sin una variable auxiliar. Fíjate en que en este segundo caso no se declara nada, porque las variables ya existen.",
    },
    {
      type: "playground",
      title: "Experimento 3 · Recoger el resto e intercambiar dos variables",
      description: "`resto` es un arreglo nuevo con lo que sobra. El intercambio usa la desestructuración para asignar, no para declarar.",
      code: L(
        "const [cabeza, ...resto] = [1, 2, 3, 4];",
        'console.log(cabeza, resto.join(","), Array.isArray(resto));',
        "",
        "let m = 1;",
        "let n = 2;",
        "[m, n] = [n, m];",
        "console.log(m, n);",
      ),
      expected: L("1 2,3,4 true", "2 1"),
    },

    // ───────────────────────── Objetos ─────────────────────────
    { type: "heading", level: 2, text: "Desestructurar un objeto" },
    {
      type: "paragraph",
      text:
        "Con los objetos se usan llaves en lugar de corchetes. Aquí no importa la posición, sino el nombre: dentro de las llaves escribes los nombres de las propiedades que quieres sacar, y JavaScript crea una variable con ese mismo nombre y le asigna el valor de la propiedad. Es el patrón que se usa, por ejemplo, para sacar `nombre`, `apellido` y `edad` de un objeto `persona`, y trabajar con ellos como variables independientes (para armar una plantilla de HTML o hacer cálculos).",
    },
    {
      type: "code",
      lang: "js",
      title: "Forma básica con objetos",
      code: L(
        'const persona = { nombre: "Ana", apellido: "Pérez", edad: 35 };',
        "",
        "// Crea tres variables: nombre, apellido y edad",
        "const { nombre, apellido, edad } = persona;",
      ),
    },
    {
      type: "image",
      src: "/img/dia-19/destructuring-objetos.svg",
      alt: "El objeto persona con las propiedades nombre, apellido y edad. El patrón const { edad, nombre, apellido: ap, pais = \"desconocido\" } = persona busca cada propiedad por su nombre, en cualquier orden: edad vale 35, nombre vale Ana, ap es un alias de apellido y vale Pérez, y pais no existe en el objeto, así que usa su valor por defecto, desconocido.",
      caption: "En un objeto, cada variable busca la propiedad con su nombre.",
    },
    {
      type: "paragraph",
      text:
        "Aquí viene el punto que más confunde. Para que la desestructuración funcione, el nombre de la variable debe coincidir con el nombre de la propiedad. Si escribes `edat` y la propiedad se llama `edad`, JavaScript no encuentra nada con ese nombre y la variable vale `undefined`, sin ningún error. Por eso mismo, el orden en que escribas las variables da igual: cada una busca su propiedad por nombre.",
    },
    {
      type: "playground",
      title: "Experimento 4 · Desestructurar un objeto, en otro orden y con un nombre mal escrito",
      description: "El orden no importa. Con `edat` no hay error, pero el valor es `undefined`.",
      code: L(
        'const persona = { nombre: "Ana", apellido: "Pérez", edad: 35 };',
        "",
        "const { nombre, apellido, edad } = persona;",
        "console.log(nombre, apellido, edad);",
        "",
        "// En otro orden: el resultado es el mismo",
        "function invertido() {",
        "  const { edad, nombre, apellido } = persona;",
        '  return edad + " " + apellido + " " + nombre;',
        "}",
        "console.log(invertido());",
        "",
        "// Un nombre que no existe en el objeto",
        "const { edat } = persona;",
        "console.log(edat);",
      ),
      expected: L("Ana Pérez 35", "35 Pérez Ana", "undefined"),
    },
    { type: "heading", level: 3, text: "Alias y valores por defecto" },
    {
      type: "paragraph",
      text:
        "Dos herramientas que el nombre fijo no te quita. Con un alias (`propiedad: variable`) lees una propiedad pero guardas su valor en una variable con otro nombre: sirve cuando ya existe una variable con ese nombre o cuando el nombre de la propiedad no te gusta. Y con un valor por defecto (`propiedad = valor`) cubres el caso en que la propiedad no exista. Se pueden combinar. Igual que en los arreglos, el valor por defecto solo se usa si el valor es `undefined`.",
    },
    {
      type: "playground",
      title: "Experimento 5 · Renombrar con alias y valores por defecto",
      description: "`pais` no existe en el objeto y toma su valor por defecto. Con `null` y con `0`, el valor por defecto no se usa.",
      code: L(
        'const persona = { nombre: "Ana", apellido: "Pérez", edad: 35 };',
        "",
        'const { nombre: primerNombre, apellido: ap, pais = "desconocido" } = persona;',
        "console.log(primerNombre, ap, pais);",
        "",
        "// El valor por defecto solo cubre undefined",
        "const { a = 1, b = 2, c = 3 } = { a: null, b: undefined, c: 0 };",
        "console.log(a, b, c);",
      ),
      expected: L("Ana Pérez desconocido", "null 2 0"),
    },
    {
      type: "image",
      src: "/img/dia-19/arreglo-vs-objeto.svg",
      alt: "Tabla comparativa. Con arreglos, la desestructuración se empareja por posición, el orden importa, la variable puede llamarse como quieras, se omite una posición con una coma vacía, el valor por defecto se escribe a = 1 y el resto se recoge con puntos suspensivos. Con objetos, se empareja por nombre de propiedad, el orden no importa, se renombra con propiedad, dos puntos y alias, se omite no nombrando la propiedad, el valor por defecto se escribe a = 1 y el resto se recoge con puntos suspensivos.",
      caption: "Arreglo: por posición. Objeto: por nombre.",
    },

    // ───────────────────────── Anidada ─────────────────────────
    { type: "heading", level: 2, text: "Valores anidados" },
    {
      type: "paragraph",
      text:
        "Si el valor que quieres está dentro de otro objeto o arreglo, el patrón repite la forma de los datos: pones el nombre de la propiedad, dos puntos y, a continuación, otro patrón. Es fácil perderse, así que conviene escribirlo en varias líneas. Observa una cosa: `datos`, `direccion` y `roles` solo sirven para indicar el camino y no se crean como variables; solo existen `correo`, `ciudad` y `primerRol`. Si necesitas también el objeto intermedio, desestructúralo en una instrucción aparte.",
    },
    {
      type: "image",
      src: "/img/dia-19/destructuring-anidado.svg",
      alt: "A la izquierda, el patrón const { datos: { correo, direccion: { ciudad } }, roles: [primerRol] } = usuario, escrito en varias líneas. A la derecha, el objeto usuario con id, datos (que contiene correo y direccion con ciudad) y roles. Los colores unen cada variable con su valor: correo vale ana@example.com, ciudad vale Lima y primerRol vale admin. Las propiedades datos, direccion y roles solo sirven para llegar al valor y no se crean como variables.",
      caption: "El patrón sigue la forma de los datos.",
    },
    {
      type: "playground",
      title: "Experimento 6 · Desestructuración anidada",
      description: "Tres variables salen de dos niveles de objetos y de un arreglo. Las propiedades del camino no se crean.",
      code: L(
        "const usuario = {",
        "  id: 1,",
        "  datos: {",
        '    correo: "ana@example.com",',
        '    direccion: { ciudad: "Lima" },',
        "  },",
        '  roles: ["admin", "editor"],',
        "};",
        "",
        "const {",
        "  datos: {",
        "    correo,",
        "    direccion: { ciudad },",
        "  },",
        "  roles: [primerRol],",
        "} = usuario;",
        "",
        "console.log(correo, ciudad, primerRol);",
        "console.log(typeof datos, typeof direccion, typeof roles);",
      ),
      expected: L("ana@example.com Lima admin", "undefined undefined undefined"),
    },

    // ───────────────────────── Funciones ─────────────────────────
    { type: "heading", level: 2, text: "En parámetros y en valores devueltos" },
    {
      type: "paragraph",
      text:
        "El lugar más habitual para ver desestructuración es el parámetro de una función. En lugar de recibir un objeto y leer sus propiedades una por una dentro del cuerpo, se desestructura directamente en la lista de parámetros, e incluso se pueden dar valores por defecto. Es lo que hace React con las props de un componente. También funciona al revés: una función puede devolver un arreglo con varios valores (JavaScript solo permite devolver uno) y quien la llama los separa en variables con desestructuración.",
    },
    {
      type: "playground",
      title: "Experimento 7 · Desestructuración en parámetros y al recibir un resultado",
      description: "`saludo` toma su valor por defecto si no se envía. La división devuelve cociente y resto en un arreglo.",
      code: L(
        'function saludar({ nombre, saludo = "Hola" }) {',
        '  return saludo + ", " + nombre;',
        "}",
        'console.log(saludar({ nombre: "Ana" }));',
        'console.log(saludar({ nombre: "Luis", saludo: "Buenas" }));',
        "",
        "function suma([a, b]) {",
        "  return a + b;",
        "}",
        "console.log(suma([3, 4]));",
        "",
        "function dividir(a, b) {",
        "  return [Math.floor(a / b), a % b];",
        "}",
        "const [cociente, resto] = dividir(17, 5);",
        'console.log("cociente:", cociente, "resto:", resto);',
      ),
      expected: L("Hola, Ana", "Buenas, Luis", "7", "cociente: 3 resto: 2"),
    },
    {
      type: "paragraph",
      text:
        "Y se une muy bien con lo que ya sabes de los ciclos. En la lección de ciclos, para recorrer un objeto usamos `Object.entries` y accedíamos a cada par por su posición. Con desestructuración, el par se separa en el mismo encabezado del `for...of`: `for (const [clave, valor] of Object.entries(objeto))`. Lo mismo ocurre con un `Map`, o con un método de arreglos cuyos elementos son objetos.",
    },
    {
      type: "playground",
      title: "Experimento 8 · Desestructurar dentro de un for...of y en un callback",
      description: "La clave y el valor se separan en el encabezado del ciclo. En el último caso, el parámetro de la función desestructura cada objeto.",
      code: L(
        'const persona = { nombre: "Ana", apellido: "Pérez", edad: 35 };',
        "",
        "for (const [clave, valor] of Object.entries(persona)) {",
        "  console.log(clave, valor);",
        "}",
        "",
        'const mapa = new Map([["a", 1], ["b", 2]]);',
        "for (const [k, v] of mapa) {",
        '  console.log(k + "=" + v);',
        "}",
        "",
        'const lista = [{ id: 1, etiqueta: "x" }, { id: 2, etiqueta: "y" }];',
        'console.log(lista.map(function ({ id }) { return id; }).join(","));',
      ),
      expected: L("nombre Ana", "apellido Pérez", "edad 35", "a=1", "b=2", "1,2"),
    },

    // ───────────────────────── const, referencia ─────────────────────────
    { type: "heading", level: 2, text: "const, let y las referencias" },
    {
      type: "paragraph",
      text:
        "La desestructuración declara variables como cualquier otra asignación, con `const`, `let` o `var`, y las reglas son las de siempre: una variable `const` no se puede reasignar. Pero desestructurar no clona los datos: copia la referencia. Si una propiedad contiene un arreglo o un objeto, la nueva variable apunta al mismo arreglo u objeto, así que modificar uno modifica el otro.",
    },
    {
      type: "playground",
      title: "Experimento 9 · Desestructurar copia la referencia, no el contenido",
      description: "`items` y `origen.items` son el mismo arreglo. Y la variable `k`, declarada con `const`, no se puede reasignar.",
      code: L(
        "const origen = { items: [1, 2] };",
        "const { items } = origen;",
        "items.push(3);",
        'console.log(origen.items.join(","), items === origen.items);',
        "",
        "const { k } = { k: 1 };",
        "try {",
        "  k = 5;",
        "} catch (error) {",
        "  console.log(error.name);",
        "}",
      ),
      expected: L("1,2,3 true", "TypeError"),
    },

    // ───────────────────────── Errores ─────────────────────────
    { type: "heading", level: 2, text: "Errores y casos límite" },
    {
      type: "paragraph",
      text:
        "Hay tres situaciones que producen errores. Primera: desestructurar `null` o `undefined` lanza un `TypeError`, porque no tienen propiedades. Segunda: en un patrón de arreglo, el valor debe ser iterable (un arreglo, un texto, un `Map`, un `Set`…): un objeto literal o un número lanzan un `TypeError`. Tercera: si asignas sin declarar, el patrón de objeto necesita paréntesis. Sin ellos, JavaScript interpreta las llaves como un bloque de código y da un `SyntaxError`.",
    },
    {
      type: "playground",
      title: "Experimento 10 · Los errores más comunes y la asignación con paréntesis",
      description: "Los `TypeError` se capturan con `try...catch`, de la lección anterior. Sin paréntesis, `new Function` falla con `SyntaxError`.",
      code: L(
        "const casos = [",
        '  ["null", function () { const { x } = null; }],',
        '  ["undefined", function () { const { x } = undefined; }],',
        '  ["objeto en un arreglo", function () { const [x] = { a: 1 }; }],',
        '  ["número en un arreglo", function () { const [x] = 5; }],',
        "];",
        "",
        "casos.forEach(function (caso) {",
        "  try {",
        "    caso[1]();",
        '    console.log(caso[0] + " → sin error");',
        "  } catch (error) {",
        '    console.log(caso[0] + " → " + error.name);',
        "  }",
        "});",
        "",
        "// Asignar a variables ya declaradas: con paréntesis",
        "let nombre2;",
        "let edad2;",
        '({ nombre: nombre2, edad: edad2 } = { nombre: "Ana", edad: 35 });',
        "console.log(nombre2, edad2);",
        "",
        "// Sin paréntesis, las llaves se leen como un bloque",
        "try {",
        '  new Function("let n; { n } = { n: 1 };");',
        "} catch (error) {",
        '  console.log("sin paréntesis →", error.name);',
        "}",
      ),
      expected: L(
        "null → TypeError",
        "undefined → TypeError",
        "objeto en un arreglo → TypeError",
        "número en un arreglo → TypeError",
        "Ana 35",
        "sin paréntesis → SyntaxError",
      ),
    },
    {
      type: "paragraph",
      text:
        "Un último repaso de lo que puedes desestructurar. En un patrón de arreglo, cualquier iterable, incluido un texto, que se separa por puntos de código. En un patrón de objeto, cualquier valor que no sea `null` ni `undefined`: los textos y los números tienen propiedades (como `length`), así que también funcionan. Y el nombre de la propiedad puede calcularse con corchetes. Con `...otros` en un objeto recoges las propiedades restantes en un objeto nuevo.",
    },
    {
      type: "playground",
      title: "Experimento 11 · Textos, claves calculadas y propiedades restantes",
      description: "Un texto se puede desestructurar como un arreglo, y `length` es una propiedad como cualquier otra.",
      code: L(
        'const [h, i] = "hi";',
        "console.log(h, i);",
        "",
        'const { length } = "hola";',
        "console.log(length);",
        "",
        'const clave = "edad";',
        'const { [clave]: valorDinamico } = { nombre: "Ana", edad: 35 };',
        "console.log(valorDinamico);",
        "",
        'const { nombre, ...otros } = { nombre: "Ana", apellido: "Pérez", edad: 35 };',
        'console.log(nombre, Object.keys(otros).join(","));',
      ),
      expected: L("h i", "4", "35", "Ana apellido,edad"),
    },
    {
      type: "callout",
      variant: "info",
      text:
        "En la lección del manejo de errores viste `catch (error)`. Esa variable también admite desestructuración: `catch ({ name, message })` crea directamente `name` y `message`. Es válido, aunque más raro de ver. Y si un patrón queda vacío (`const {} = obj`), no hace nada: la regla `no-empty-pattern` de ESLint lo marca.",
    },

    // ───────────────────────── Cuándo usar ─────────────────────────
    { type: "heading", level: 2, text: "¿Cuándo conviene desestructurar?" },
    {
      type: "table",
      caption: "Qué forma usar según el problema",
      headers: ["Situación", "Qué usar"],
      rows: [
        ["Sacar varias propiedades de un objeto a variables", "`const { a, b } = objeto`"],
        ["Sacar los primeros elementos de un arreglo", "`const [a, b] = arreglo`"],
        ["Dar nombre propio a una propiedad", "Alias: `const { propiedad: nombre } = objeto`"],
        ["Cubrir una propiedad que puede no existir", "Valor por defecto: `const { a = 0 } = objeto`"],
        ["Recibir un objeto de opciones en una función", "Desestructurar en el parámetro"],
        ["Devolver varios valores de una función", "Devolver un arreglo y desestructurarlo al recibirlo"],
        ["Recorrer pares clave y valor", "`for (const [clave, valor] of Object.entries(objeto))`"],
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
          "La desestructuración es cosa de frameworks y librerías.",
          "Es sintaxis del lenguaje desde ES2015. Los frameworks la usan mucho, pero funciona sin ninguno.",
        ],
        [
          "La variable debe llamarse igual que la propiedad.",
          "Es lo que ocurre por defecto, pero puedes renombrarla con un alias (`propiedad: variable`).",
        ],
        [
          "En un objeto, el orden de las variables importa.",
          "No importa: cada variable busca su propiedad por nombre. En un arreglo sí importa, porque se empareja por posición.",
        ],
        [
          "El valor por defecto se usa cuando falta el dato.",
          "Solo se usa cuando el valor es `undefined`. `null`, `0` y el texto vacío no lo activan.",
        ],
        [
          "Desestructurar copia el objeto.",
          "Copia las referencias: los arreglos y objetos anidados siguen siendo los mismos.",
        ],
        [
          "Si una propiedad no existe, se produce un error.",
          "No hay error: la variable vale `undefined`. El error ocurre al desestructurar `null` o `undefined`.",
        ],
        [
          "`{ a } = objeto` funciona para asignar a variables ya declaradas.",
          "Al inicio de una instrucción hay que escribirlo entre paréntesis: `({ a } = objeto);`.",
        ],
        [
          "Solo se puede desestructurar un arreglo o un objeto.",
          "En un patrón de arreglo vale cualquier iterable (textos, `Map`, `Set`). En uno de objeto, cualquier valor que no sea `null` ni `undefined`.",
        ],
        [
          "La desestructuración se escribe «destructor» o «de estructura».",
          "El término es «desestructuración» (en inglés, «destructuring»).",
        ],
      ],
    },

    // ───────────────────────── FAQ ─────────────────────────
    {
      type: "accordion",
      title: "Preguntas frecuentes de esta lección",
      items: [
        {
          title: "¿Funciona con let y var, o solo con const?",
          text:
            "Funciona con las tres (y también sin declaración, con paréntesis). Se usa `const` salvo que necesites reasignar la variable, la misma regla de siempre.",
        },
        {
          title: "¿Cuántos niveles de anidación son razonables?",
          text:
            "Dos suelen ser legibles. Más allá, es mejor desestructurar en varias instrucciones para que el código se lea con claridad.",
        },
        {
          title: "¿Qué diferencia hay con los tres puntos?",
          text:
            "Aquí `...resto` aparece a la izquierda de la asignación y recoge lo que sobra. A la derecha, los tres puntos expanden un arreglo u objeto. Ambos usos (rest y spread) se ven en una lección posterior.",
        },
        {
          title: "¿Por qué React usa tanto la desestructuración?",
          text:
            "Un componente recibe sus props como un objeto. Desestructurarlo en los parámetros muestra de un vistazo qué datos usa el componente, y permite poner valores por defecto.",
        },
        {
          title: "¿Puedo desestructurar el resultado de una función directamente?",
          text:
            "Sí: `const { a, b } = obtenerDatos();` o `const [x, y] = obtenerPar();`. La función se ejecuta una sola vez y después se separan los valores.",
        },
        {
          title: "¿Y si el objeto puede ser null?",
          text:
            "Da `TypeError`. Dale un valor por defecto al objeto entero (`const { a } = objeto ?? {}`) o comprueba antes de desestructurar. El operador `??` lo viste en la lección de `null` y `undefined`.",
        },
      ],
    },

    // ───────────────────────── Cierre ─────────────────────────
    { type: "heading", level: 2, text: "Cierre" },
    {
      type: "paragraph",
      text:
        "La desestructuración te permite sacar valores de arreglos y objetos de forma clara: en un arreglo, cada variable toma el valor de su posición; en un objeto, cada variable busca la propiedad con su nombre. Con alias, valores por defecto, anidación y su uso en parámetros, ciclos y valores devueltos, resuelves muchas situaciones con menos código. Recuerda los errores típicos: desestructurar `null` o `undefined`, un valor no iterable en un patrón de arreglo, y la asignación sin declarar sin paréntesis. En la próxima lección vemos otra mejora de ES2015: la sintaxis abreviada de los objetos literales.",
    },
    {
      type: "checklist",
      title: "Antes de pasar al Día 20, verifica que puedes explicar…",
      items: [
        "Qué es la desestructuración y en qué año llegó al lenguaje.",
        "Por qué en un arreglo importa el orden y en un objeto no.",
        "Qué vale la variable cuando el nombre no existe en el objeto, y cuándo se usa un valor por defecto.",
        "Cómo se usa un alias y para qué sirve.",
        "Cómo se desestructura un valor anidado y qué variables se crean (y cuáles no).",
        "Cómo se escribe la desestructuración en el parámetro de una función.",
        "Qué errores producen `const { x } = null` y `const [x] = { a: 1 }`.",
        "Por qué la asignación sin declarar necesita paréntesis.",
        "Por qué desestructurar no clona los datos.",
      ],
    },
    { type: "heading", level: 3, text: "Fuentes consultadas (noviembre de 2026)" },
    {
      type: "list",
      items: [
        "[MDN: Asignación por desestructuración](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring)",
        "[MDN: Gramática y tipos (guía)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types)",
        "[MDN: Parámetros rest](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters)",
        "[MDN: Sintaxis spread](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)",
        "[MDN: Parámetros por defecto](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters)",
        "[MDN: Protocolos de iteración](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols)",
        "[MDN: Object.entries()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries)",
        "[MDN: Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)",
        "[MDN: const](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const)",
        "[MDN: let](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let)",
        "[MDN: for...of](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of)",
        "[MDN: try...catch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch)",
        "[React: Pasar props a un componente](https://react.dev/learn/passing-props-to-a-component)",
        "[ESLint: prefer-destructuring](https://eslint.org/docs/latest/rules/prefer-destructuring)",
        "[ESLint: no-empty-pattern](https://eslint.org/docs/latest/rules/no-empty-pattern)",
        "[ESLint: prefer-const](https://eslint.org/docs/latest/rules/prefer-const)",
        "[ESLint: no-unused-vars](https://eslint.org/docs/latest/rules/no-unused-vars)",
      ],
    },
  ],
  selfCheck: [
    {
      question: "¿Qué valor tiene `b` después de `const [a, b] = [10, 20];`?",
      options: ["10", "20", "undefined", "Un error"],
      correctIndex: 1,
      explanation:
        "En un arreglo, cada variable toma el valor de su posición: `a` la posición 0 y `b` la posición 1.",
    },
    {
      question: "¿Qué vale `z` después de `const [x, , z] = [1, 2, 3];`?",
      options: ["2", "3", "undefined", "1"],
      correctIndex: 1,
      explanation:
        "La coma vacía omite la posición 1 (el 2), así que `z` recibe la posición 2, que vale 3.",
    },
    {
      question: "¿Qué vale `b` después de `const [a, b] = [1];`?",
      options: ["null", "0", "undefined", "Lanza un error"],
      correctIndex: 2,
      explanation:
        "Si el arreglo tiene menos elementos que variables, las que sobran valen `undefined`. No hay error.",
    },
    {
      question: "En la desestructuración de objetos, ¿por qué criterio se empareja cada variable?",
      options: [
        "Por su posición",
        "Por el nombre de la propiedad",
        "Por el tipo del valor",
        "Por orden alfabético",
      ],
      correctIndex: 1,
      explanation:
        "Cada variable busca la propiedad con su mismo nombre, así que el orden no importa.",
    },
    {
      question: "Con `const persona = { edad: 35 };`, ¿qué vale `edat` en `const { edat } = persona;`?",
      options: ["35", "null", "undefined", "Lanza un error"],
      correctIndex: 2,
      explanation:
        "La propiedad `edat` no existe, así que la variable vale `undefined`. No se produce ningún error.",
    },
    {
      question: "¿Qué hace `const { nombre: n } = persona;`?",
      options: [
        "Crea una variable `nombre` y otra `n`",
        "Crea una variable `n` con el valor de la propiedad `nombre`",
        "Crea una variable `nombre` con el valor de `n`",
        "Lanza un error",
      ],
      correctIndex: 1,
      explanation:
        "Es un alias: lee la propiedad `nombre` pero guarda el valor en una variable llamada `n`. `nombre` no se crea.",
    },
    {
      question: "¿Qué vale `a` en `const { a = 1 } = { a: null };`?",
      options: ["1", "null", "undefined", "0"],
      correctIndex: 1,
      explanation:
        "El valor por defecto solo se usa cuando el valor es `undefined`. `null` es un valor y se conserva.",
    },
    {
      question: "¿Qué ocurre con `const { x } = null;`?",
      options: [
        "`x` vale `null`",
        "`x` vale `undefined`",
        "Lanza un `TypeError`",
        "Lanza un `SyntaxError`",
      ],
      correctIndex: 2,
      explanation:
        "`null` y `undefined` no tienen propiedades, así que desestructurarlos lanza un `TypeError`.",
    },
    {
      question: "¿Por qué hay que escribir `({ a } = objeto);` con paréntesis al asignar sin declarar?",
      options: [
        "Porque es más rápido",
        "Porque sin ellos, las llaves al inicio de la instrucción se leen como un bloque de código",
        "Porque `a` es una palabra reservada",
        "Porque lo exige `const`",
      ],
      correctIndex: 1,
      explanation:
        "Al inicio de una instrucción, `{` se interpreta como un bloque. Los paréntesis lo convierten en una expresión.",
    },
    {
      question: "Si haces `const { items } = origen;` y luego `items.push(3);`, ¿qué pasa con `origen.items`?",
      options: [
        "Queda igual, porque `items` es una copia",
        "También cambia, porque ambos apuntan al mismo arreglo",
        "Lanza un error",
        "Se vuelve `undefined`",
      ],
      correctIndex: 1,
      explanation:
        "La desestructuración copia la referencia, no el contenido: las dos variables apuntan al mismo arreglo.",
    },
  ],
};
