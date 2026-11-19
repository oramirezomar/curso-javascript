import type { Lesson } from "@/lib/types";

// Une líneas de código sin tener que escapar backticks ni `${}` dentro de template literals.
const L = (...lines: string[]) => lines.join("\n");

// Contenido validado contra fuentes actuales en noviembre de 2026 (ver sección "Fuentes").
export const day21: Lesson = {
  day: 21,
  slug: "parametros-rest-operador-spread",
  title: "Parámetros rest y operador spread",
  section: "Sintaxis moderna (ES2015)",
  estimatedMinutes: 70,
  icon: "🔗",
  objectives: [
    "Explicar qué hace un parámetro rest y escribir funciones que reciben una cantidad variable de argumentos",
    "Usar spread para repartir los elementos de un arreglo en una llamada, y para unir y copiar arreglos",
    "Usar spread con objetos para copiar propiedades y reemplazar solo algunas, y saber que la copia es de un solo nivel",
    "Distinguir rest y spread según el lado en que aparecen los tres puntos",
    "Reconocer los errores típicos: rest que no está al final, spread de un valor no iterable y copias que comparten datos",
  ],
  blocks: [
    // ───────────────────────── Apertura ─────────────────────────
    {
      type: "paragraph",
      text:
        "Dos novedades más de ECMAScript 2015 usan el mismo símbolo: los tres puntos (`...`). Los parámetros rest sirven para que una función reciba una cantidad variable de argumentos. El spread (o propagación) hace lo contrario: reparte los elementos de un arreglo o las propiedades de un objeto. Aunque se escriben igual, hacen cosas opuestas, y la clave para distinguirlas es de qué lado aparecen. Son muy comunes en el código real y en las librerías de interfaces (como React), donde se usan constantemente para copiar y actualizar datos.",
    },
    {
      type: "keyFacts",
      items: [
        { value: "...c", label: "Rest: recoge los argumentos sobrantes en un arreglo" },
        { value: "f(...lista)", label: "Spread en una llamada: reparte los elementos como argumentos" },
        { value: "[...a, ...b]", label: "Spread en un arreglo: une arreglos en uno solo" },
        { value: "{ ...a, x: 1 }", label: "Spread en un objeto: copia propiedades; el último valor gana" },
        { value: "Un nivel", label: "La copia con spread es superficial" },
        { value: "Al final", label: "El parámetro rest va siempre último, y solo puede haber uno" },
      ],
    },
    {
      type: "callout",
      variant: "success",
      text:
        "Contenido verificado en noviembre de 2026 con MDN Web Docs (parámetros rest, sintaxis spread, `arguments` y desestructuración), con la documentación de React y con la de ESLint. Los resultados de los ejemplos se comprobaron ejecutándolos. Al final hay una tabla con datos que suelen aparecer desactualizados y la lista de fuentes.",
    },

    // ───────────────────────── Rest ─────────────────────────
    { type: "heading", level: 2, text: "Parámetros rest: una cantidad variable de argumentos" },
    {
      type: "paragraph",
      text:
        "Una función típica para sumar recibe dos valores: `a` y `b`. Pero ¿qué pasa si a veces necesitas sumar tres, cuatro o cinco? Con un parámetro rest, que se define poniendo tres puntos antes del nombre del último parámetro, la función recoge todos los argumentos que sobran en un arreglo. Esto se dice a veces de forma coloquial «parámetros infinitos», pero en realidad es una cantidad variable (hasta el límite del motor de JavaScript), y lo que recibes es un arreglo real con los valores.",
    },
    {
      type: "code",
      lang: "js",
      title: "Forma básica de un parámetro rest",
      code: L(
        "function sumar(a, b, ...c) {",
        "  // a y b son los dos primeros argumentos",
        "  // c es un arreglo con todos los demás",
        "}",
        "",
        "sumar(1, 2);           // c es []",
        "sumar(1, 2, 3, 4, 5); // c es [3, 4, 5]",
      ),
    },
    {
      type: "image",
      src: "/img/dia-21/rest-recoge.svg",
      alt: "La función sumar(a, b, ...c) se llama con cinco argumentos: 1, 2, 3, 4 y 5. Los parámetros a y b reciben el 1 y el 2. El parámetro rest c recoge los argumentos restantes, 3, 4 y 5, en un arreglo. Si se llama con solo dos argumentos, c es un arreglo vacío.",
      caption: "El parámetro rest recoge lo que sobra en un arreglo.",
    },
    {
      type: "paragraph",
      text:
        "Como `c` es un arreglo, puedes recorrerlo con los métodos que ya conoces, como `forEach`. En el siguiente experimento se parte de la suma de `a` y `b`, y se añade cada elemento de `c`. Los resultados crecen a medida que se pasan más argumentos. Las funciones flecha, que simplificarían esos `function`, las verás en la próxima lección.",
    },
    {
      type: "playground",
      title: "Experimento 1 · Una función que suma una cantidad variable de números",
      description: "Con dos argumentos, `c` queda vacío y no hay error. Cada argumento extra se suma al resultado.",
      code: L(
        "function sumar(a, b, ...c) {",
        "  let resultado = a + b;",
        "  c.forEach(function (n) {",
        "    resultado += n;",
        "  });",
        "  return resultado;",
        "}",
        "",
        "console.log(sumar(1, 2));",
        "console.log(sumar(1, 2, 3));",
        "console.log(sumar(1, 2, 3, 4));",
        "console.log(sumar(1, 2, 3, 4, 5));",
        "console.log(sumar(1, 2, 3, 4, 5, 6));",
        "console.log(sumar(1, 2, 3, 4, 5, 6, 7));",
      ),
      expected: L("3", "6", "10", "15", "21", "28"),
    },
    {
      type: "paragraph",
      text:
        "Antes de los parámetros rest, para recibir argumentos variables se usaba el objeto `arguments`, que existe dentro de las funciones normales. Pero `arguments` no es un arreglo real (no tiene `forEach`, `map` ni los demás métodos) y las funciones flecha no tienen el suyo propio. Hoy se prefiere rest, y ESLint tiene la regla `prefer-rest-params` para recomendarlo. Otro detalle: la propiedad `length` de una función no cuenta el parámetro rest.",
    },
    {
      type: "playground",
      title: "Experimento 2 · rest es un arreglo real, y arguments no lo es",
      description: "Cuando no hay argumentos sobrantes, `resto` es un arreglo vacío, no `undefined`.",
      code: L(
        "function mostrar(a, ...resto) {",
        '  return Array.isArray(resto) + " " + resto.length + " " + JSON.stringify(resto);',
        "}",
        "console.log(mostrar(1));",
        "console.log(mostrar(1, 2, 3));",
        "",
        "// arguments: la forma antigua; no es un arreglo real",
        "function antigua() {",
        '  return Array.isArray(arguments) + " " + arguments.length;',
        "}",
        "console.log(antigua(1, 2, 3));",
        "",
        "// length no cuenta el parámetro rest",
        "function g(a, b, ...c) {}",
        "console.log(g.length);",
      ),
      expected: L("true 0 []", "true 2 [2,3]", "false 3", "2"),
    },
    {
      type: "callout",
      variant: "warning",
      text:
        "Un parámetro rest tiene reglas: debe ser el último de la lista, solo puede haber uno por función, y no admite un valor por defecto. Si lo pones en otro lugar, el script no se ejecuta: es un error de sintaxis.",
    },

    // ───────────────────────── Spread ─────────────────────────
    { type: "heading", level: 2, text: "Spread: repartir los elementos" },
    {
      type: "paragraph",
      text:
        "Con spread, los tres puntos van delante de un arreglo (o de cualquier valor iterable) cuando lo usas, no cuando lo defines. Se puede escribir en tres lugares: en la lista de argumentos de una llamada, dentro de un arreglo literal y dentro de un objeto literal. En cada uno hace algo ligeramente distinto, pero siempre con la misma idea: sacar los elementos y ponerlos uno por uno donde se escriba.",
    },
    {
      type: "paragraph",
      text:
        "Una nota de vocabulario. En español se le llama mucho «operador de propagación» y en inglés, «spread operator», pero MDN lo documenta como sintaxis spread (spread syntax): los tres puntos no son un operador que produzca un valor por sí solo, y no pueden aparecer sueltos, sino siempre dentro de una llamada, un arreglo o un objeto.",
    },
    { type: "heading", level: 3, text: "En una llamada a una función" },
    {
      type: "paragraph",
      text:
        "Imagina una función que espera valores sueltos, como `Math.max`, y tú los tienes en un arreglo. Si pasas el arreglo tal cual, la función lo recibe como un solo valor y el resultado es `NaN`. Con spread, el arreglo se reparte y la función recibe cada elemento por separado. Antes se usaba `Math.max.apply(null, lista)`; spread es la forma moderna. Puedes combinar valores sueltos con spread, e incluso usarlo varias veces en la misma llamada.",
    },
    {
      type: "playground",
      title: "Experimento 3 · Spread en las llamadas a una función",
      description: "Sin spread, `Math.max` recibe un arreglo y devuelve `NaN`. Con spread recibe tres números.",
      code: L(
        "const lista = [1, 5, 3];",
        "console.log(Math.max(...lista));",
        "console.log(Math.max(lista));",
        "",
        "function sumar(a, b, ...c) {",
        "  let resultado = a + b;",
        "  c.forEach(function (n) {",
        "    resultado += n;",
        "  });",
        "  return resultado;",
        "}",
        "console.log(sumar(...[1, 2, 3, 4]));",
        "console.log(sumar(1, ...[2, 3], 4));",
      ),
      expected: L("5", "NaN", "10", "10"),
    },
    { type: "heading", level: 3, text: "En un arreglo literal" },
    {
      type: "paragraph",
      text:
        "Imagina dos arreglos de cinco números y la necesidad de crear un tercero con los diez. Si escribes `[arreglo1, arreglo2]`, obtienes un arreglo de dos elementos, y cada uno es a su vez un arreglo de cinco. Con spread, `[...arreglo1, ...arreglo2]` reparte los elementos de cada uno y obtienes un solo arreglo plano de diez. Es más claro que encadenar `push` o usar `concat`, y puedes poner elementos sueltos en cualquier posición.",
    },
    {
      type: "image",
      src: "/img/dia-21/spread-expande.svg",
      alt: "A la izquierda, [arreglo1, arreglo2] crea un arreglo de dos elementos, y cada elemento es a su vez un arreglo de cinco números. A la derecha, [...arreglo1, ...arreglo2] reparte los elementos de cada arreglo y crea un solo arreglo plano de diez números.",
      caption: "Los tres puntos reparten los elementos uno por uno.",
    },
    {
      type: "playground",
      title: "Experimento 4 · Unir arreglos con spread",
      description: "El arreglo anidado tiene 2 elementos y el plano, 10. El resultado coincide con el de `concat`.",
      code: L(
        "const arreglo1 = [1, 2, 3, 4, 5];",
        "const arreglo2 = [6, 7, 8, 9, 0];",
        "",
        "const anidado = [arreglo1, arreglo2];",
        "const plano = [...arreglo1, ...arreglo2];",
        "console.log(anidado.length, plano.length);",
        'console.log(plano.join(" "));',
        "console.log(JSON.stringify(plano) === JSON.stringify(arreglo1.concat(arreglo2)));",
        "",
        "// Con elementos sueltos en cualquier posición",
        'console.log([0, ...arreglo1, 99].join(","));',
      ),
      expected: L("2 10", "1 2 3 4 5 6 7 8 9 0", "true", "0,1,2,3,4,5,99"),
    },
    {
      type: "paragraph",
      text:
        "Con spread también copias un arreglo: `[...original]` crea uno nuevo, y agregar elementos a la copia no cambia el original. Pero la copia es superficial (de un solo nivel). Si el arreglo contiene otros arreglos u objetos, la copia comparte esos elementos con el original. Y spread funciona con cualquier iterable: un texto se reparte en caracteres, y un `Set` en sus valores, lo que da una forma muy habitual de quitar duplicados.",
    },
    {
      type: "playground",
      title: "Experimento 5 · Copiar un arreglo, y repartir un texto y un Set",
      description: "`push` en la copia no toca el original, pero un arreglo interno es compartido y sí cambia en los dos.",
      code: L(
        "const original = [1, [2, 3]];",
        "const copia = [...original];",
        "copia.push(4);",
        "console.log(JSON.stringify(original), JSON.stringify(copia));",
        "",
        "// El arreglo interno es el mismo en las dos copias",
        "copia[1].push(99);",
        "console.log(JSON.stringify(original), JSON.stringify(copia));",
        "",
        'console.log([..."hola"].join("|"));',
        'console.log([...new Set([1, 1, 2, 3, 3])].join(","));',
      ),
      expected: L(
        "[1,[2,3]] [1,[2,3],4]",
        "[1,[2,3,99]] [1,[2,3,99],4]",
        "h|o|l|a",
        "1,2,3",
      ),
    },

    // ───────────────────────── Spread en objetos ─────────────────────────
    { type: "heading", level: 3, text: "En un objeto literal" },
    {
      type: "paragraph",
      text:
        "Con los objetos, `{ ...otro }` copia las propiedades propias de `otro` en el objeto nuevo. Esta versión llegó más tarde, con ECMAScript 2018. Si escribes varias fuentes o propiedades con el mismo nombre, gana la última, por lo que el orden importa: `{ ...a, x: 1 }` reemplaza el `x` de `a`, mientras que `{ x: 1, ...a }` deja que `a` reemplace tu `x`. Es la forma habitual de crear un objeto igual a otro, cambiando solo una propiedad.",
    },
    {
      type: "playground",
      title: "Experimento 6 · Combinar objetos: el último valor gana",
      description: "Mismas piezas, distinto orden: el resultado cambia.",
      code: L(
        "const a = { x: 1, y: 2 };",
        "const b = { y: 20, z: 30 };",
        "console.log(JSON.stringify({ ...a, ...b }));",
        "console.log(JSON.stringify({ ...b, ...a }));",
        "",
        "console.log(JSON.stringify({ edad: 1, ...{ edad: 2 } }));",
        "console.log(JSON.stringify({ ...{ edad: 2 }, edad: 1 }));",
      ),
      expected: L(
        '{"x":1,"y":20,"z":30}',
        '{"y":2,"z":30,"x":1}',
        '{"edad":2}',
        '{"edad":1}',
      ),
    },
    {
      type: "image",
      src: "/img/dia-21/spread-objetos.svg",
      alt: "El objeto estado tiene nombre Ana, edad 35 y direccion, que apunta a un objeto con la ciudad Lima. const nuevo = { ...estado, edad: 36 } crea un objeto nuevo que copia nombre y direccion, y reemplaza edad por 36. El estado original no cambia, pero la propiedad direccion de los dos objetos apunta al mismo objeto, porque la copia es de un solo nivel.",
      caption: "Copiar un objeto cambiando solo una propiedad.",
    },
    {
      type: "paragraph",
      text:
        "Este patrón es el corazón de la «inmutabilidad» de la que se habla en las librerías de interfaces. Más que impedir que un objeto cambie, consiste en no modificarlo: cuando hay que actualizar un dato, se crea un objeto nuevo copiando el anterior con spread y reemplazando solo lo que cambió. Así conservas el estado previo y la librería puede detectar el cambio. La documentación de React lo explica para el estado de los componentes.",
    },
    {
      type: "playground",
      title: "Experimento 7 · Actualizar sin modificar el original",
      description: "La copia es de un solo nivel: `direccion` es el mismo objeto en los dos. Para cambiar un valor anidado, se copia cada nivel.",
      code: L(
        'const estado = { nombre: "Ana", edad: 35, direccion: { ciudad: "Lima" } };',
        "const nuevo = { ...estado, edad: 36 };",
        "console.log(estado.edad, nuevo.edad);",
        "console.log(nuevo.direccion === estado.direccion);",
        "",
        "// Para cambiar un valor anidado, se copia cada nivel",
        "const otro = {",
        "  ...estado,",
        '  direccion: { ...estado.direccion, ciudad: "Quito" },',
        "};",
        "console.log(estado.direccion.ciudad, otro.direccion.ciudad);",
      ),
      expected: L("35 36", "true", "Lima Quito"),
    },

    // ───────────────────────── Errores ─────────────────────────
    { type: "heading", level: 2, text: "Errores y casos límite" },
    {
      type: "paragraph",
      text:
        "En un arreglo literal o en una llamada, spread exige un iterable: un objeto literal o un número lanzan un `TypeError`. En un objeto literal, en cambio, spread admite cualquier valor: `null`, `undefined`, números y booleanos no aportan propiedades, un texto aporta sus caracteres como propiedades numeradas, y un arreglo aporta sus índices. Y para los errores de sintaxis, ya sabes que `try...catch` no los captura en el mismo script, por lo que los experimentos usan `new Function`.",
    },
    {
      type: "playground",
      title: "Experimento 8 · Reglas de sintaxis y errores del spread",
      description: "Las tres primeras líneas son errores de sintaxis; las dos siguientes, `TypeError`; las últimas muestran qué admite spread en un objeto.",
      code: L(
        "const sintaxis = [",
        '  ["rest no al final", "function f(...a, b) {}"],',
        '  ["dos parámetros rest", "function f(...a, ...b) {}"],',
        '  ["spread suelto", "const x = ...[1];"],',
        "];",
        "sintaxis.forEach(function (caso) {",
        "  try {",
        "    new Function(caso[1]);",
        '    console.log(caso[0] + " → sin error");',
        "  } catch (error) {",
        '    console.log(caso[0] + " → " + error.name);',
        "  }",
        "});",
        "",
        "const ejecucion = [",
        '  ["objeto en un arreglo", function () { return [...{ a: 1 }]; }],',
        '  ["número en una llamada", function () { return Math.max(...5); }],',
        "];",
        "ejecucion.forEach(function (caso) {",
        "  try {",
        "    caso[1]();",
        '    console.log(caso[0] + " → sin error");',
        "  } catch (error) {",
        '    console.log(caso[0] + " → " + error.name);',
        "  }",
        "});",
        "",
        "console.log(JSON.stringify({ ...null, ...undefined, ...5, ...true }));",
        'console.log(JSON.stringify({ ..."ab" }), JSON.stringify({ ...[7, 8] }));',
      ),
      expected: L(
        "rest no al final → SyntaxError",
        "dos parámetros rest → SyntaxError",
        "spread suelto → SyntaxError",
        "objeto en un arreglo → TypeError",
        "número en una llamada → TypeError",
        "{}",
        '{"0":"a","1":"b"} {"0":7,"1":8}',
      ),
    },

    // ───────────────────────── rest vs spread ─────────────────────────
    { type: "heading", level: 2, text: "Rest frente a spread" },
    {
      type: "paragraph",
      text:
        "Aquí está la regla práctica. Si los tres puntos recogen valores (en la lista de parámetros de una función, o a la izquierda de una desestructuración), son rest. Si los reparten (al llamar una función, o dentro de un arreglo o un objeto literal), son spread. Es el mismo símbolo, con significado opuesto, y se combinan: una función puede recoger argumentos con rest y luego pasárselos a otra con spread.",
    },
    {
      type: "image",
      src: "/img/dia-21/rest-vs-spread.svg",
      alt: "Tabla comparativa. Rest aparece en la definición, como último parámetro de una función o a la izquierda de una desestructuración, y reúne varios valores en un arreglo o un objeto. Spread aparece al usar valores, en una llamada, un arreglo literal o un objeto literal, y reparte los elementos de un iterable o las propiedades de un objeto. Si los tres puntos recogen valores, es rest; si los reparten, es spread.",
      caption: "Los mismos tres puntos, según de qué lado estén.",
    },
    {
      type: "playground",
      title: "Experimento 9 · Recoger con rest y repartir con spread",
      description: "`envolver` recoge los argumentos con rest y los reparte al llamar a otra función. Después, rest en una desestructuración, como en la lección anterior.",
      code: L(
        "function envolver(fn, ...args) {",
        "  return fn(...args);",
        "}",
        "console.log(envolver(Math.min, 4, 2, 8));",
        "",
        "const [cabeza, ...cola] = [1, 2, 3];",
        'console.log(cabeza, cola.join(","));',
        "",
        "const { x, ...otros } = { x: 1, y: 2, z: 3 };",
        "console.log(x, JSON.stringify(otros));",
      ),
      expected: L("2", "1 2,3", '1 {"y":2,"z":3}'),
    },

    // ───────────────────────── Cuándo usar ─────────────────────────
    { type: "heading", level: 2, text: "¿Qué usar en cada caso?" },
    {
      type: "table",
      caption: "Qué forma usar según el problema",
      headers: ["Situación", "Qué usar"],
      rows: [
        ["Una función debe aceptar una cantidad variable de argumentos", "Parámetro rest: `function f(...args)`"],
        ["Tienes un arreglo y la función espera valores sueltos", "Spread en la llamada: `f(...lista)`"],
        ["Unir dos arreglos en uno", "`[...a, ...b]`"],
        ["Copiar un arreglo", "`[...original]`"],
        ["Quitar duplicados de un arreglo", "`[...new Set(lista)]`"],
        ["Copiar un objeto cambiando algunas propiedades", "`{ ...objeto, propiedad: nuevoValor }`"],
        ["Una copia completamente independiente (con anidados)", "Copiar cada nivel, o `structuredClone`"],
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
          "Los parámetros rest son «parámetros infinitos».",
          "Recogen una cantidad variable de argumentos (hasta el límite del motor) en un arreglo real.",
        ],
        [
          "Spread es un «operador».",
          "MDN lo llama sintaxis spread (spread syntax): no es un operador que dé un valor por sí solo y no puede escribirse suelto.",
        ],
        [
          "Rest y spread son lo mismo.",
          "Usan los mismos tres puntos, pero rest recoge valores y spread los reparte.",
        ],
        [
          "Para argumentos variables se usa `arguments`.",
          "Es la forma antigua: no es un arreglo real y las funciones flecha no tienen el suyo propio. Hoy se usa rest (`prefer-rest-params` en ESLint).",
        ],
        [
          "Spread hace una copia profunda.",
          "Copia un solo nivel: los arreglos y objetos anidados se comparten entre la copia y el original.",
        ],
        [
          "Spread en objetos llegó con ES6.",
          "Con ES2015 llegaron rest y spread en arreglos y llamadas. En objetos, con ES2018.",
        ],
        [
          "Spread se puede usar con cualquier objeto.",
          "En arreglos y llamadas exige un iterable. En un objeto literal admite cualquier valor.",
        ],
        [
          "`Math.max(lista)` encuentra el mayor de un arreglo.",
          "Devuelve `NaN`. Hay que repartir el arreglo: `Math.max(...lista)`.",
        ],
        [
          "La inmutabilidad significa que el objeto no puede cambiar.",
          "Es una práctica: no modificar el objeto original y crear uno nuevo con los cambios (con spread, por ejemplo).",
        ],
      ],
    },

    // ───────────────────────── FAQ ─────────────────────────
    {
      type: "accordion",
      title: "Preguntas frecuentes de esta lección",
      items: [
        {
          title: "¿Se puede usar rest en funciones flecha?",
          text:
            "Sí, y son una razón más para preferir rest a `arguments`. Las funciones flecha las verás en la próxima lección.",
        },
        {
          title: "¿Cuál es la diferencia entre spread y Object.assign o concat?",
          text:
            "Hacen un trabajo parecido. `{ ...a, ...b }` crea un objeto nuevo, mientras que `Object.assign(a, b)` modifica `a`. Y `[...a, ...b]` equivale a `a.concat(b)`, con una sintaxis más flexible para añadir elementos sueltos.",
        },
        {
          title: "¿Hay un límite al repartir un arreglo muy grande en una llamada?",
          text:
            "Sí: los motores limitan el número de argumentos de una llamada, y un arreglo enorme repartido con spread puede superarlo. En arreglos literales no ocurre.",
        },
        {
          title: "¿Cómo hago una copia realmente independiente?",
          text:
            "Copiando cada nivel con spread, o con `structuredClone`, que hace una copia profunda de muchos tipos de datos.",
        },
        {
          title: "¿Por qué se usa tanto en React?",
          text:
            "El estado de un componente no se modifica directamente: se reemplaza por uno nuevo. Spread permite crear ese objeto nuevo copiando el anterior y cambiando solo una propiedad.",
        },
        {
          title: "¿Se puede usar spread con un objeto dentro de un arreglo?",
          text:
            "Se puede poner un objeto como elemento de un arreglo (`[objeto]`), pero repartir un objeto con `[...objeto]` lanza un `TypeError`, porque no es iterable. Lo que se reparte en un objeto es con `{ ...objeto }`.",
        },
      ],
    },

    // ───────────────────────── Cierre ─────────────────────────
    { type: "heading", level: 2, text: "Cierre" },
    {
      type: "paragraph",
      text:
        "Los tres puntos hacen dos trabajos opuestos. Con rest recoges argumentos sobrantes en un arreglo, siempre al final de los parámetros. Con spread repartes los elementos de un iterable en una llamada o en un arreglo, y las propiedades de un objeto en otro. Recuerda que la copia con spread es de un solo nivel, que en un objeto el último valor gana, y que en un arreglo o una llamada hace falta un iterable. En la próxima lección vemos las funciones flecha.",
    },
    {
      type: "checklist",
      title: "Antes de pasar al Día 22, verifica que puedes explicar…",
      items: [
        "Qué recibe `c` en `function sumar(a, b, ...c)` cuando se llama con dos, con cinco y con ningún argumento extra.",
        "Por qué un parámetro rest debe ser el último y solo puede haber uno.",
        "Por qué `Math.max(lista)` da `NaN` y qué escribir en su lugar.",
        "Qué diferencia hay entre `[a, b]` y `[...a, ...b]` cuando `a` y `b` son arreglos.",
        "Qué significa que la copia con spread sea superficial, y cómo se nota.",
        "Cómo se crea un objeto nuevo igual a otro cambiando solo una propiedad.",
        "Por qué `{ ...a, x: 1 }` y `{ x: 1, ...a }` pueden dar resultados distintos.",
        "Cómo distinguir rest de spread mirando de qué lado aparecen los tres puntos.",
      ],
    },
    { type: "heading", level: 3, text: "Fuentes consultadas (noviembre de 2026)" },
    {
      type: "list",
      items: [
        "[MDN: Parámetros rest](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters)",
        "[MDN: Sintaxis spread](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)",
        "[MDN: El objeto arguments](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments)",
        "[MDN: Asignación por desestructuración](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring)",
        "[MDN: Function.length](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length)",
        "[MDN: Math.max()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/max)",
        "[MDN: Array.prototype.concat()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat)",
        "[MDN: Object.assign()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)",
        "[MDN: Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)",
        "[MDN: Protocolos de iteración](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols)",
        "[MDN: Inicializador de objetos](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer)",
        "[MDN: structuredClone()](https://developer.mozilla.org/en-US/docs/Web/API/Window/structuredClone)",
        "[React: Actualizar objetos en el estado](https://react.dev/learn/updating-objects-in-state)",
        "[React: Actualizar arreglos en el estado](https://react.dev/learn/updating-arrays-in-state)",
        "[ESLint: prefer-rest-params](https://eslint.org/docs/latest/rules/prefer-rest-params)",
        "[ESLint: prefer-spread](https://eslint.org/docs/latest/rules/prefer-spread)",
        "[ESLint: prefer-object-spread](https://eslint.org/docs/latest/rules/prefer-object-spread)",
      ],
    },
  ],
  selfCheck: [
    {
      question: "En `function sumar(a, b, ...c)`, ¿qué vale `c` si llamas `sumar(1, 2, 3, 4, 5)`?",
      options: ["3", "[3, 4, 5]", "[1, 2, 3, 4, 5]", "undefined"],
      correctIndex: 1,
      explanation:
        "`a` y `b` toman el 1 y el 2, y el parámetro rest `c` recoge el resto en un arreglo: `[3, 4, 5]`.",
    },
    {
      question: "¿Qué vale `c` si llamas `sumar(1, 2)`?",
      options: ["undefined", "null", "[] (un arreglo vacío)", "Lanza un error"],
      correctIndex: 2,
      explanation:
        "Un parámetro rest es siempre un arreglo. Si no hay argumentos sobrantes, es un arreglo vacío.",
    },
    {
      question: "¿Dónde debe ir un parámetro rest?",
      options: [
        "Al principio de la lista",
        "En cualquier posición",
        "Al final de la lista, y solo uno",
        "Dentro del cuerpo de la función",
      ],
      correctIndex: 2,
      explanation:
        "Debe ser el último parámetro y solo puede haber uno. Si no, es un error de sintaxis.",
    },
    {
      question: "¿Qué devuelve `Math.max([1, 5, 3])`?",
      options: ["5", "NaN", "3", "[1, 5, 3]"],
      correctIndex: 1,
      explanation:
        "`Math.max` recibe un solo argumento que es un arreglo, y no puede convertirlo en un número: da `NaN`. Con spread (`Math.max(...lista)`) da 5.",
    },
    {
      question: "Con `a = [1, 2]` y `b = [3, 4]`, ¿cuántos elementos tiene `[...a, ...b]`?",
      options: ["2", "4", "Lo mismo que `[a, b]`", "Lanza un error"],
      correctIndex: 1,
      explanation:
        "Spread reparte los elementos, así que el resultado es `[1, 2, 3, 4]`. En cambio, `[a, b]` tendría dos elementos, cada uno un arreglo.",
    },
    {
      question: "Con `const copia = [...original];`, ¿qué tipo de copia se hace?",
      options: [
        "Profunda: todo es independiente",
        "Superficial: los arreglos y objetos internos se comparten",
        "Ninguna: es la misma referencia",
        "Solo copia los números",
      ],
      correctIndex: 1,
      explanation:
        "Spread copia un solo nivel. Los elementos que son arreglos u objetos siguen siendo los mismos en ambas copias.",
    },
    {
      question: "¿Qué vale `{ ...{ x: 1 }, x: 2 }`?",
      options: ["{ x: 1 }", "{ x: 2 }", "{ x: [1, 2] }", "Lanza un error"],
      correctIndex: 1,
      explanation:
        "Cuando una propiedad se repite, gana la última: aquí, `x: 2`.",
    },
    {
      question: "¿Qué ocurre con `[...{ a: 1 }]`?",
      options: [
        "Devuelve `[1]`",
        "Devuelve `[\"a\"]`",
        "Lanza un `TypeError`, porque un objeto literal no es iterable",
        "Devuelve un arreglo vacío",
      ],
      correctIndex: 2,
      explanation:
        "En un arreglo o una llamada, spread exige un iterable. Un objeto literal no lo es.",
    },
    {
      question: "¿Cómo distingues rest de spread?",
      options: [
        "Rest usa tres puntos y spread usa dos",
        "Si los tres puntos recogen valores es rest, y si los reparten es spread",
        "Rest solo funciona con objetos",
        "No se pueden distinguir",
      ],
      correctIndex: 1,
      explanation:
        "En una lista de parámetros o a la izquierda de una desestructuración recogen (rest). Al usar valores en una llamada, un arreglo o un objeto, reparten (spread).",
    },
    {
      question: "¿Con qué versión del estándar llegó spread en objetos literales (`{ ...otro }`)?",
      options: ["ES5", "ES2015", "ES2018", "ES2023"],
      correctIndex: 2,
      explanation:
        "Rest y spread en arreglos y llamadas llegaron con ES2015. En objetos literales, con ES2018.",
    },
  ],
};
