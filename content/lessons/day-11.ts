import type { Lesson } from "@/lib/types";

// Une líneas de código sin tener que escapar backticks ni `${}` dentro de template literals.
const L = (...lines: string[]) => lines.join("\n");

// Contenido validado contra fuentes actuales en noviembre de 2026 (ver sección "Fuentes").
export const day11: Lesson = {
  day: 11,
  slug: "funciones-declaradas-expresadas",
  title: "Funciones: parámetros, return y declaradas frente a expresadas",
  section: "Funciones y tipos compuestos",
  estimatedMinutes: 75,
  icon: "⚙️",
  objectives: [
    "Explicar qué es una función, cómo se declara y cómo se invoca (los paréntesis son los que la ejecutan)",
    "Usar parámetros, argumentos y valores por defecto, y distinguir un parámetro de un argumento",
    "Devolver valores con `return`, y diferenciar lo que una función devuelve de lo que imprime",
    "Entender que las funciones son valores (de primera clase): se asignan, se pasan y se devuelven",
    "Diferenciar una función declarada de una expresada, y explicar el hoisting y sus errores",
  ],
  blocks: [
    // ───────────────────────── Apertura ─────────────────────────
    {
      type: "paragraph",
      text:
        "En la lección anterior cerramos los tipos primitivos. Ahora empezamos con los tipos compuestos, también llamados complejos o de referencia, que son los objetos en sentido amplio. Empezamos por las funciones porque los objetos y los arreglos las necesitan: ambos pueden guardar funciones como valores. Esta es una lección larga y es la base de casi todo lo que viene después.",
    },
    {
      type: "keyFacts",
      items: [
        { value: "function", label: "Palabra reservada que declara una función" },
        { value: "()", label: "Los paréntesis son los que ejecutan la función" },
        { value: "return", label: "Devuelve un valor y termina la función" },
        { value: "= valor", label: "Valor por defecto de un parámetro (ES2015)" },
        { value: "Hoisting", label: "Las declaradas se pueden llamar antes de su línea" },
        { value: "1.ª clase", label: "Las funciones son valores que se asignan y se pasan" },
      ],
    },
    {
      type: "callout",
      variant: "success",
      text:
        "Contenido verificado en noviembre de 2026 con MDN Web Docs (guía de funciones, declaración y expresión de función, `return`, parámetros por defecto y glosario de hoisting) y con la documentación de ESLint. Los resultados de los ejemplos se comprobaron ejecutándolos. Al final hay una tabla con datos que suelen aparecer desactualizados y la lista de fuentes.",
    },

    // ───────────────────────── Qué es una función ─────────────────────────
    { type: "heading", level: 2, text: "Qué es una función" },
    {
      type: "paragraph",
      text:
        "Una función es un bloque de código autocontenido: tiene su propio ámbito, independiente del ámbito global (como vimos al hablar de las variables y su alcance). Se define una sola vez y se puede ejecutar en cualquier momento, tantas veces como haga falta. Además puede recibir datos de entrada, llamados parámetros, y puede devolver un resultado, o no devolver nada.",
    },
    {
      type: "paragraph",
      text:
        "En JavaScript las funciones son además objetos: un tipo de dato muy especial. En el argot técnico se dice que son «ciudadanos de primera clase» (first-class), lo que significa que se tratan como cualquier otro valor: puedes asignarlas a una variable, pasarlas como argumento a otra función y devolverlas como resultado de una función. Esto las hace muy poderosas, y de ahí viene gran parte de lo que se hace con el lenguaje.",
    },
    {
      type: "image",
      src: "/img/dia-11/anatomia-funcion.svg",
      alt: "Una declaración de función con sus partes: la palabra reservada function, el nombre saludar, los parámetros nombre y edad, un valor por defecto, el cuerpo entre llaves y un return. Debajo, la invocación saludar entre paréntesis con los argumentos Ana y 30, que se reemplaza por el valor devuelto.",
      caption: "Las partes de una función y cómo se invoca.",
    },

    // ───────────────────────── Declarar e invocar ─────────────────────────
    { type: "heading", level: 2, text: "Declarar e invocar una función" },
    {
      type: "paragraph",
      text:
        "Hay dos maneras principales de crear una función: como función declarada y como función expresada. Empecemos por la declarada. Se usa la palabra reservada `function`, seguida del nombre, de los paréntesis (que siempre van) y de las llaves, dentro de las cuales está el cuerpo. El nombre conviene que describa una acción, porque eso es lo que hace una función: `saludar`, `calcularTotal`, `validarCorreo`.",
    },
    {
      type: "paragraph",
      text:
        "Declarar una función no la ejecuta. Piensa en un equipo de fútbol: la función declarada es un jugador en la banca. El partido ya empezó, pero ese jugador no juega hasta que lo mandan a la cancha. Mandar a ejecutar una función se llama invocarla o llamarla, y se hace escribiendo su nombre seguido de paréntesis. Los paréntesis son los que indican que la función se va a ejecutar: sin ellos no pasa nada, porque solo estás nombrando la función, no ejecutándola.",
    },
    {
      type: "playground",
      title: "Experimento 1 · Declarar, nombrar e invocar",
      description: "El nombre solo no ejecuta nada; los paréntesis sí. Y puede invocarse las veces que quieras.",
      code: L(
        "function accion() {",
        "  console.log(1);",
        "  console.log(2);",
        "  console.log(3);",
        "}",
        "",
        "// Sin paréntesis solo nombras la función: no se ejecuta",
        'console.log("Sin paréntesis:", typeof accion);',
        "accion;",
        "",
        "// Con paréntesis se ejecuta, y puedes repetirlo",
        "accion();",
        "accion();",
      ),
      expected: L("Sin paréntesis: function", "1", "2", "3", "1", "2", "3"),
    },
    {
      type: "callout",
      variant: "info",
      text:
        "Este curso va paso a paso. Por eso, al principio, ejecutamos el código en el orden en que lo escribimos y comentamos las invocaciones que ya no necesitamos para no saturar la consola. Más adelante veremos técnicas para ordenar el código cuando los ejercicios sean más grandes.",
    },

    // ───────────────────────── return ─────────────────────────
    { type: "heading", level: 2, text: "Devolver valores con return" },
    {
      type: "paragraph",
      text:
        "Una función que devuelve un valor usa la palabra reservada `return`. Puede devolver cualquier tipo de dato, primitivo o compuesto: una cadena de texto, un número, un booleano, un objeto, un arreglo e incluso otra función. Hay una confusión muy común que conviene despejar: lo que una función imprime con `console.log` no es lo mismo que lo que devuelve.",
    },
    {
      type: "paragraph",
      text:
        "Si dentro de una función solo hay `console.log`, al ejecutarla verás los mensajes en la consola, pero la función devuelve `undefined`. Para comprobar que realmente devuelve algo hay que usar ese valor: pasarlo a un `console.log` o guardarlo en una variable. Y si metes una invocación dentro de un `console.log`, conviene recordar que estás mostrando lo que devuelve, no lo que imprime por dentro.",
    },
    {
      type: "playground",
      title: "Experimento 2 · Devolver frente a imprimir",
      description: "`mensaje()` devuelve un texto; `soloImprime()` imprime pero devuelve undefined.",
      code: L(
        "function mensaje() {",
        '  return "valor devuelto";',
        "}",
        "",
        "mensaje(); // se ejecuta, pero no se muestra nada",
        "console.log(mensaje());",
        "",
        "// Guardar el valor devuelto en una variable",
        "const valorDeFuncion = mensaje();",
        "console.log(valorDeFuncion);",
        "",
        "function soloImprime() {",
        '  console.log("dentro de la función");',
        "}",
        "const r = soloImprime();",
        "console.log(r);",
      ),
      expected: L(
        "valor devuelto",
        "valor devuelto",
        "dentro de la función",
        "undefined",
      ),
    },
    {
      type: "paragraph",
      text:
        "Algo muy importante: cuando el intérprete encuentra `return` dentro del cuerpo de una función, devuelve ese valor y termina la función en ese mismo momento. Las líneas que estén después del primer `return` se ignoran. Es como volver de golpe al lugar desde donde se llamó a la función (la línea donde está la invocación) y seguir desde ahí.",
    },
    {
      type: "image",
      src: "/img/dia-11/flujo-return.svg",
      alt: "Una función f imprime 1 y ejecuta return 19. Las líneas siguientes no se ejecutan. La llamada const r igual f paréntesis recibe el valor 19 y el programa continúa en esa línea.",
      caption: "return devuelve el valor y termina la función.",
    },
    {
      type: "playground",
      title: "Experimento 3 · return detiene la ejecución",
      description: "La segunda línea con console.log y el segundo return nunca se ejecutan.",
      code: L(
        "function conReturn() {",
        '  console.log("1");',
        "  return 19;",
        '  console.log("2");   // nunca se ejecuta',
        '  return "texto";     // tampoco',
        "}",
        "",
        "console.log(conReturn());",
      ),
      expected: L("1", "19"),
    },
    {
      type: "callout",
      variant: "warning",
      text:
        "Una trampa clásica: si escribes `return` y el valor en líneas separadas, JavaScript inserta un punto y coma automáticamente justo después del `return` y la función devuelve `undefined`. Mantén el valor en la misma línea que `return`, o abre un paréntesis en esa línea.",
    },
    {
      type: "playground",
      title: "Experimento 4 · return y el salto de línea",
      description: "La primera función devuelve undefined porque el valor quedó en la línea siguiente.",
      code: L(
        "function mal() {",
        "  return",
        "    42;",
        "}",
        "",
        "function bien() {",
        "  return (",
        "    42",
        "  );",
        "}",
        "",
        "console.log(mal(), bien());",
      ),
      expected: "undefined 42",
    },

    // ───────────────────────── Parámetros ─────────────────────────
    { type: "heading", level: 2, text: "Parámetros y argumentos" },
    {
      type: "paragraph",
      text:
        "Una función también puede recibir valores. Se declaran entre los paréntesis, separados por comas. Esos nombres, que parecen variables, son los parámetros: dentro de la función se usan para trabajar. Por ejemplo, una función `saludar` que recibe un `nombre` y una `edad` y forma un texto con una plantilla de texto. Los valores concretos que se pasan al invocarla se llaman argumentos. En el lenguaje cotidiano se mezclan los dos términos, pero la diferencia es útil: el parámetro está en la declaración y el argumento está en la invocación.",
    },
    {
      type: "playground",
      title: "Experimento 5 · Parámetros y argumentos",
      description: "Qué pasa cuando faltan argumentos o sobran.",
      code: L(
        "function saludar(nombre, edad) {",
        "  return `Hola, mi nombre es ${nombre} y tengo ${edad} años`;",
        "}",
        "",
        'console.log(saludar("Nadie", 7));',
        "",
        "// Si no pasas argumentos, los parámetros valen undefined",
        "console.log(saludar());",
        "",
        "// Los argumentos de más se ignoran",
        'console.log(saludar("Ana", 30, "sobra"));',
        "",
        "// length indica cuántos parámetros declara la función",
        "console.log(saludar.length);",
      ),
      expected: L(
        "Hola, mi nombre es Nadie y tengo 7 años",
        "Hola, mi nombre es undefined y tengo undefined años",
        "Hola, mi nombre es Ana y tengo 30 años",
        "2",
      ),
    },
    { type: "heading", level: 3, text: "Valores por defecto" },
    {
      type: "paragraph",
      text:
        "Para que el segundo resultado no muestre `undefined`, se puede asignar un valor por defecto a los parámetros, simplemente igualándolos dentro de la declaración: `nombre = \"desconocido\"`. Esta característica llegó con ECMAScript 2015; antes había que comprobarlo a mano dentro de la función. Ojo: el valor por defecto solo se usa cuando el argumento falta o vale `undefined`. Si pasas `null`, se conserva el `null`, como vimos en la lección anterior.",
    },
    {
      type: "playground",
      title: "Experimento 6 · Parámetros con valor por defecto",
      description: "Solo `undefined` activa el valor por defecto; `null` no.",
      code: L(
        'function saludar(nombre = "desconocido", edad = 0) {',
        "  return `Hola, mi nombre es ${nombre} y tengo ${edad} años`;",
        "}",
        "",
        "console.log(saludar());",
        'console.log(saludar("Nadie"));',
        "console.log(saludar(undefined, 5));",
        "console.log(saludar(null, null));",
      ),
      expected: L(
        "Hola, mi nombre es desconocido y tengo 0 años",
        "Hola, mi nombre es Nadie y tengo 0 años",
        "Hola, mi nombre es desconocido y tengo 5 años",
        "Hola, mi nombre es null y tengo null años",
      ),
    },

    // ───────────────────────── Primera clase ─────────────────────────
    { type: "heading", level: 2, text: "Las funciones son valores" },
    {
      type: "paragraph",
      text:
        "Que las funciones sean de primera clase se ve en tres usos muy habituales. Se pueden asignar a una variable (sin paréntesis, porque si los pones estás ejecutándola y asignando su resultado). Se pueden pasar como argumento a otra función, algo que se hace constantemente para decirle a una función qué hacer (a esa función que se pasa se la llama callback). Y se pueden devolver desde otra función. Más adelante verás estos patrones con arreglos, eventos y datos que llegan de un servidor.",
    },
    {
      type: "playground",
      title: "Experimento 7 · Asignar, pasar y devolver funciones",
      description: "Las tres cosas se hacen sin paréntesis hasta el momento de ejecutar.",
      code: L(
        "function doble(n) {",
        "  return n * 2;",
        "}",
        "",
        "// 1. Asignarla a otra variable (sin paréntesis)",
        "const copia = doble;",
        "console.log(copia(5));",
        "",
        "// 2. Pasarla como argumento",
        "function aplicar(fn, valor) {",
        "  return fn(valor);",
        "}",
        "console.log(aplicar(doble, 7));",
        "",
        "// 3. Devolverla desde otra función",
        "function crearSaludo(saludo) {",
        "  return function (nombre) {",
        "    return `${saludo}, ${nombre}`;",
        "  };",
        "}",
        'console.log(crearSaludo("Hola")("Ana"));',
        "",
        "// Y son objetos",
        "console.log(typeof doble, doble instanceof Object);",
      ),
      expected: L("10", "14", "Hola, Ana", "function true"),
    },
    {
      type: "callout",
      variant: "info",
      text:
        "Las funciones flecha (arrow functions), que llegaron con ECMAScript 2015, son otra forma de escribir funciones. Todavía no las vemos: para entenderlas del todo hace falta conocer antes la palabra reservada `this`. Por ahora trabajamos con las dos formas clásicas, la declarada y la expresada, que además siguen siendo muy usadas.",
    },

    // ───────────────────────── Declarada vs expresada ─────────────────────────
    { type: "heading", level: 2, text: "Función declarada frente a función expresada" },
    {
      type: "paragraph",
      text:
        "La función declarada, que ya conoces, empieza con la palabra `function` y lleva un nombre. La función expresada consiste en crear una función y asignársela como valor a una variable. Como el nombre lo da la variable, a la función en sí se le puede omitir el suyo, y entonces es una función anónima: una función que no tiene nombre propio. Se suele guardar en una constante (`const`), porque normalmente no quieres que esa variable cambie de valor.",
    },
    {
      type: "code",
      lang: "js",
      title: "Las dos formas de crear la misma función",
      code: L(
        "// Función declarada",
        "function saludarDeclarada() {",
        '  return "Hola desde una función declarada";',
        "}",
        "",
        "// Función expresada (anónima) asignada a una constante",
        "const saludarExpresada = function () {",
        '  return "Hola desde una función expresada";',
        "};",
        "",
        "// Ambas se invocan igual",
        "saludarDeclarada();",
        "saludarExpresada();",
      ),
    },
    {
      type: "paragraph",
      text:
        "La diferencia real aparece al invocar la función antes de la línea donde se define. Una función declarada se puede invocar antes de su declaración sin ningún error. Una función expresada, no. La causa es el hoisting (elevación): antes de ejecutar el código, JavaScript registra las declaraciones de cada ámbito. Las funciones declaradas se elevan junto con su cuerpo completo, así que ya están listas desde el principio, sin importar en qué línea las escribiste.",
    },
    {
      type: "image",
      src: "/img/dia-11/hoisting-funciones.svg",
      alt: "Tabla con tres formas de definir una función. La declarada con function se eleva con su cuerpo y se puede llamar antes de su línea. La expresada con const existe sin inicializar y llamarla antes lanza ReferenceError. La expresada con var vale undefined hasta su línea y llamarla antes lanza TypeError.",
      caption: "Qué pasa al llamar a la función antes de la línea donde se define.",
    },
    {
      type: "playground",
      title: "Experimento 8 · Llamar antes de definir",
      description: "La declarada funciona antes de su línea; la expresada con const lanza ReferenceError.",
      code: L(
        "// Declarada: se puede invocar antes de su línea",
        "console.log(declarada());",
        "function declarada() {",
        '  return "funciona antes de su declaración";',
        "}",
        "",
        "// Expresada con const: no se puede usar antes",
        "try {",
        "  expresada();",
        "} catch (e) {",
        '  console.log(e.name + ": " + e.message);',
        "}",
        "",
        "const expresada = function () {",
        '  return "ok";',
        "};",
        "console.log(expresada());",
      ),
      expected: L(
        "funciona antes de su declaración",
        "ReferenceError: Cannot access 'expresada' before initialization",
        "ok",
      ),
    },
    {
      type: "paragraph",
      text:
        "Con `const` (y con `let`) el error es un `ReferenceError`: la constante existe pero está en la zona muerta temporal hasta que se ejecuta su línea, el mismo concepto que vimos con las variables. Si la función expresada se guarda con `var`, el error cambia: la variable existe y vale `undefined`, así que al intentar ejecutarla el error es un `TypeError` («no es una función»).",
    },
    {
      type: "playground",
      title: "Experimento 9 · var, nombres y funciones nombradas",
      description: "Una expresada puede tener un nombre propio, visible solo dentro de ella.",
      code: L(
        "// Con var, la variable existe pero vale undefined",
        "try {",
        "  conVar();",
        "} catch (e) {",
        '  console.log(e.name + ": " + e.message);',
        "}",
        'var conVar = function () { return 1; };',
        "",
        "// El nombre de la variable se usa como nombre de la función",
        'const saludo = function () { return "hola"; };',
        "",
        "// Una expresada también puede tener nombre propio, local a ella",
        "const nombrada = function interna() {",
        "  return typeof interna;",
        "};",
        "console.log(saludo.name, nombrada.name, nombrada());",
        "console.log(typeof interna);",
      ),
      expected: L(
        "TypeError: conVar is not a function",
        "saludo interna function",
        "undefined",
      ),
    },
    {
      type: "table",
      caption: "Función declarada frente a función expresada",
      headers: ["Aspecto", "Declarada", "Expresada"],
      rows: [
        ["Forma", "`function nombre() { }`", "`const nombre = function () { };`"],
        ["Nombre", "Siempre lleva nombre", "Puede ser anónima; toma el nombre de la variable"],
        ["Hoisting", "Se eleva con su cuerpo", "Se eleva solo la variable, no el valor"],
        ["Llamarla antes de su línea", "Funciona", "`ReferenceError` con `const`/`let`; `TypeError` con `var`"],
        ["Se puede reasignar", "Sí (se desaconseja)", "No si se guarda con `const`"],
      ],
    },
    { type: "heading", level: 3, text: "¿Cuál usar? Buenas prácticas" },
    {
      type: "paragraph",
      text:
        "Ambas opciones son válidas. Si prefieres las declaradas, el hoisting no te afecta mientras ordenes el código: primero declara las funciones y después ejecuta las invocaciones. Algunos equipos prefieren las expresadas con `const`, porque obligan a definir cada función antes de usarla y evitan depender del hoisting; en los últimos años ese estilo se ha extendido con las librerías y frameworks como Angular, React y Vue. Es una convención de estilo, no una regla del lenguaje: lo que importa es que tu equipo elija una y la mantenga. Las herramientas de lint pueden vigilarlo: ESLint tiene las reglas `func-style` (declaradas o expresadas) y `no-use-before-define` (usar algo antes de definirlo).",
    },
    {
      type: "paragraph",
      text:
        "Una nota sobre la afirmación «JavaScript es un lenguaje interpretado, sin compilación». Es una simplificación: los motores actuales analizan el código antes de ejecutarlo y combinan interpretación con compilación JIT. Esa fase previa es precisamente la que permite el hoisting.",
    },

    // ───────────────────────── Datos que cambian ─────────────────────────
    { type: "heading", level: 2, text: "Datos que suelen aparecer desactualizados" },
    {
      type: "table",
      caption: "Material antiguo frente a información verificada",
      headers: ["Suele decirse", "Información verificada"],
      rows: [
        [
          "Solo hay dos formas de crear funciones.",
          "Las dos clásicas son la declarada y la expresada, pero desde ECMAScript 2015 existen también las funciones flecha y los métodos de objeto.",
        ],
        [
          "Los parámetros y los valores que se pasan son lo mismo.",
          "Los parámetros están en la declaración; los argumentos son los valores que se pasan en la invocación.",
        ],
        [
          "Los valores por defecto se activan cuando no pasas nada o pasas un valor vacío.",
          "Solo se activan con un argumento ausente o `undefined`. Con `null`, `0` o `\"\"` se conserva el valor pasado.",
        ],
        [
          "Una función expresada guardada con `var` también lanza `ReferenceError` antes de definirse.",
          "Con `var` el error es un `TypeError` (`conVar is not a function`). Con `const` y `let` es un `ReferenceError`.",
        ],
        [
          "Las expresadas evitan «errores de compilación» por código mal ordenado.",
          "No son errores de compilación: se producen al ejecutar. Las expresadas obligan a ordenar el código, pero no cambian cuándo se detecta el fallo.",
        ],
        [
          "JavaScript es un lenguaje interpretado y no se compila.",
          "Los motores actuales combinan interpretación y compilación JIT. «Interpretado» es una simplificación.",
        ],
        [
          "Una función que imprime con `console.log` devuelve ese texto.",
          "Imprimir no es devolver. Sin `return`, una función devuelve `undefined`.",
        ],
      ],
    },

    // ───────────────────────── FAQ ─────────────────────────
    {
      type: "accordion",
      title: "Preguntas frecuentes de esta lección",
      items: [
        {
          title: "¿Puede una función devolver varios valores?",
          text:
            "Un `return` devuelve un solo valor, pero ese valor puede ser un arreglo o un objeto que contenga varios. Lo veremos con arreglos y objetos en las próximas lecciones.",
        },
        {
          title: "¿Por qué mi función muestra `undefined` en la consola?",
          text:
            "Casi siempre porque no tiene `return`, porque el valor quedó en otra línea después del `return`, o porque estás mostrando el resultado de una función que solo imprime.",
        },
        {
          title: "¿Puedo declarar una función dentro de otra?",
          text:
            "Sí. Son funciones anidadas. La función interna solo existe dentro de la externa y puede usar sus variables; es la base de los cierres (closures), que veremos más adelante.",
        },
        {
          title: "¿Cuántos parámetros puede tener una función?",
          text:
            "Técnicamente muchos, pero conviene que sean pocos. Si necesitas más de tres o cuatro, suele ser mejor pasar un objeto con los datos.",
        },
        {
          title: "¿Se puede llamar a una función con paréntesis vacíos aunque tenga parámetros?",
          text:
            "Sí. Los parámetros que no reciben argumento valen `undefined` (o su valor por defecto). La propiedad `length` de la función indica cuántos parámetros declara, sin contar los que tienen valor por defecto.",
        },
        {
          title: "¿Qué es una función anónima?",
          text:
            "Una función sin nombre propio, normalmente una expresada. Es muy habitual pasarla como argumento a otra función (un callback). El nombre que muestra `.name` se toma de la variable donde se guarda.",
        },
      ],
    },

    // ───────────────────────── Cierre ─────────────────────────
    { type: "heading", level: 2, text: "Cierre" },
    {
      type: "paragraph",
      text:
        "En esta lección viste qué es una función, cómo declararla e invocarla, cómo recibe parámetros (con valores por defecto) y devuelve valores con `return`, y la diferencia entre declarar y expresar una función, con el hoisting como protagonista. Faltan temas más avanzados: las funciones anidadas, las flechas, los cierres y los patrones de escritura, que iremos viendo más adelante. En los siguientes videos vienen los arreglos y los objetos, que también pueden guardar funciones como valores; por eso era importante asentar antes sus fundamentos.",
    },
    {
      type: "checklist",
      title: "Antes de pasar al Día 12, verifica que puedes explicar…",
      items: [
        "Por qué declarar una función no la ejecuta y qué hacen los paréntesis al invocarla.",
        "Qué diferencia hay entre un parámetro y un argumento, y qué valen los parámetros si no se pasan argumentos.",
        "Cómo se escribe un valor por defecto y con qué valores del argumento se activa.",
        "Qué diferencia hay entre lo que una función devuelve y lo que imprime, y qué devuelve una función sin `return`.",
        "Por qué las líneas después de un `return` no se ejecutan y qué pasa si el valor queda en la línea siguiente.",
        "Qué significa que las funciones sean de primera clase, con un ejemplo de asignar, pasar y devolver.",
        "Cuándo se puede invocar una función antes de su línea y qué errores aparecen con `const` y con `var`.",
      ],
    },
    { type: "heading", level: 3, text: "Fuentes consultadas (noviembre de 2026)" },
    {
      type: "list",
      items: [
        "[MDN: Funciones (guía)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions)",
        "[MDN: Declaración function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)",
        "[MDN: Expresión function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/function)",
        "[MDN: return](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/return)",
        "[MDN: Parámetros por defecto](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters)",
        "[MDN: Hoisting](https://developer.mozilla.org/en-US/docs/Glossary/Hoisting)",
        "[MDN: Función de primera clase](https://developer.mozilla.org/en-US/docs/Glossary/First-class_Function)",
        "[MDN: Parámetro](https://developer.mozilla.org/en-US/docs/Glossary/Parameter)",
        "[MDN: Argumento](https://developer.mozilla.org/en-US/docs/Glossary/Argument)",
        "[MDN: Función callback](https://developer.mozilla.org/en-US/docs/Glossary/Callback_function)",
        "[MDN: Function.prototype.name](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/name)",
        "[MDN: Function.prototype.length](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length)",
        "[MDN: Funciones flecha](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)",
        "[ESLint: func-style](https://eslint.org/docs/latest/rules/func-style)",
        "[ESLint: no-use-before-define](https://eslint.org/docs/latest/rules/no-use-before-define)",
      ],
    },
  ],
  selfCheck: [
    {
      question: "¿Qué hace que una función se ejecute?",
      options: [
        "Declararla con la palabra function",
        "Invocarla escribiendo su nombre seguido de paréntesis",
        "Escribir solo su nombre",
        "Asignarla a una variable",
      ],
      correctIndex: 1,
      explanation:
        "Declararla solo la define. Los paréntesis son los que la ejecutan; sin ellos solo estás nombrando la función.",
    },
    {
      question: "¿Cuál es la diferencia entre un parámetro y un argumento?",
      options: [
        "Son exactamente lo mismo",
        "El parámetro está en la declaración y el argumento es el valor que se pasa al invocar",
        "El parámetro es el valor y el argumento es el nombre",
        "Los argumentos solo existen en funciones expresadas",
      ],
      correctIndex: 1,
      explanation:
        "En `function f(a)`, `a` es el parámetro. En `f(5)`, `5` es el argumento.",
    },
    {
      question: "¿Qué devuelve una función que no tiene `return`?",
      options: ["null", "0", "undefined", "Un error"],
      correctIndex: 2,
      explanation: "Sin `return`, la función devuelve `undefined`, aunque imprima cosas con `console.log`.",
    },
    {
      question: "¿Qué ocurre con las líneas que hay después de un `return` en una función?",
      options: [
        "Se ejecutan igualmente",
        "Se ignoran, porque return termina la función",
        "Lanzan un error",
        "Se ejecutan antes del return",
      ],
      correctIndex: 1,
      explanation: "Al encontrar `return`, la función devuelve el valor y termina en ese momento.",
    },
    {
      question: "¿Qué devuelve una función cuyo cuerpo es `return` en una línea y `42;` en la siguiente?",
      options: ["42", "undefined", "null", "Un SyntaxError"],
      correctIndex: 1,
      explanation:
        "JavaScript inserta un punto y coma después de `return`, así que devuelve `undefined`. El valor debe ir en la misma línea.",
    },
    {
      question: "¿Cuándo se usa el valor por defecto de un parámetro?",
      options: [
        "Cuando el argumento falta o es undefined",
        "Cuando el argumento es null",
        "Cuando el argumento es 0",
        "Siempre",
      ],
      correctIndex: 0,
      explanation:
        "Solo `undefined` (o no pasar el argumento) activa el valor por defecto. Con `null` se conserva `null`.",
    },
    {
      question: "¿Qué significa que las funciones son «ciudadanos de primera clase»?",
      options: [
        "Que se ejecutan antes que el resto del código",
        "Que se pueden asignar a variables, pasar como argumentos y devolver desde otras funciones",
        "Que solo pueden declararse una vez",
        "Que no pueden recibir parámetros",
      ],
      correctIndex: 1,
      explanation: "Se tratan como cualquier otro valor del lenguaje.",
    },
    {
      question: "¿Qué ocurre al invocar una función declarada antes de la línea donde se declara?",
      options: [
        "Lanza ReferenceError",
        "Lanza TypeError",
        "Funciona, gracias al hoisting",
        "Devuelve undefined",
      ],
      correctIndex: 2,
      explanation: "Las funciones declaradas se elevan junto con su cuerpo, así que están disponibles desde el principio.",
    },
    {
      question: "¿Qué error lanza invocar antes de su línea una función expresada guardada con `const`?",
      options: [
        "ReferenceError: Cannot access 'nombre' before initialization",
        "TypeError: nombre is not a function",
        "SyntaxError",
        "Ninguno, funciona",
      ],
      correctIndex: 0,
      explanation:
        "Con `const` y `let` la variable está en la zona muerta temporal. Con `var` el error sería un `TypeError`.",
    },
    {
      question: "¿Qué es una función anónima?",
      options: [
        "Una función que no se puede invocar",
        "Una función sin nombre propio, normalmente asignada a una variable o pasada como argumento",
        "Una función sin parámetros",
        "Una función que no tiene return",
      ],
      correctIndex: 1,
      explanation:
        "Es una función sin nombre propio. El nombre que muestra `.name` se toma de la variable donde se guarda.",
    },
  ],
};
