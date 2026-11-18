import type { Lesson } from "@/lib/types";

// Une líneas de código sin tener que escapar backticks ni `${}` dentro de template literals.
const L = (...lines: string[]) => lines.join("\n");

// Contenido validado contra fuentes actuales en noviembre de 2026 (ver sección "Fuentes").
export const day18: Lesson = {
  day: 18,
  slug: "break-y-continue-controlar-los-ciclos",
  title: "break y continue: controlar los ciclos",
  section: "Control de flujo",
  estimatedMinutes: 60,
  icon: "🚦",
  objectives: [
    "Explicar qué hace `break` (salir) y qué hace `continue` (saltar la vuelta actual), y recordar el `break` del `switch`",
    "Detener un ciclo con `break` en cuanto se encuentra lo que se buscaba",
    "Filtrar vueltas con `continue` (pares, múltiplos) y saber adónde salta en `for`, `while` y `do...while`",
    "Entender que `break` afecta solo a la estructura más cercana, y usar etiquetas con criterio en ciclos anidados",
    "Saber por qué no se pueden usar dentro de `forEach` y qué alternativas existen",
  ],
  blocks: [
    // ───────────────────────── Apertura ─────────────────────────
    {
      type: "paragraph",
      text:
        "Ya conoces las estructuras de control: condicionales para decidir, ciclos para repetir y `try...catch` para manejar errores. Hay dos palabras reservadas más que permiten controlar el interior de un ciclo: `break` y `continue`. Con ellas puedes salir de un ciclo en cuanto cumples tu objetivo, o saltarte ciertas vueltas siguiendo un patrón, por ejemplo, procesar solo los números pares de una lista. Ya viste `break` en la lección del `switch`, donde sirve para no seguir ejecutando los casos siguientes.",
    },
    {
      type: "keyFacts",
      items: [
        { value: "break", label: "Sale de la estructura más cercana: un ciclo o un switch" },
        { value: "continue", label: "Salta el resto de la vuelta actual y pasa a la siguiente" },
        { value: "for + continue", label: "Ejecuta la actualización (i++) antes de la siguiente vuelta" },
        { value: "while + continue", label: "Vuelve directo a la condición" },
        { value: "Etiqueta", label: "Permite apuntar break o continue a un ciclo exterior" },
        { value: "forEach", label: "No admite break ni continue" },
      ],
    },
    {
      type: "callout",
      variant: "success",
      text:
        "Contenido verificado en noviembre de 2026 con MDN Web Docs (`break`, `continue`, las sentencias etiquetadas y `Array.prototype.forEach`) y con la documentación de ESLint. Los resultados de los ejemplos se comprobaron ejecutándolos. Al final hay una tabla con datos que suelen aparecer desactualizados y la lista de fuentes.",
    },

    // ───────────────────────── break ─────────────────────────
    { type: "heading", level: 2, text: "break: salir de la estructura" },
    {
      type: "paragraph",
      text:
        "Para practicar creamos un arreglo de diez números: del 1 al 9 y, al final, el 0. Lo recorremos con un `for`, porque `break` y `continue` están pensados para estructuras de control como `for`, `while`, `do...while` y `switch`. La variable `i` es la posición, no el valor: para leer el elemento hay que escribir `numeros[i]`. Es un error común imprimir `i` y creer que se está viendo el contenido del arreglo.",
    },
    {
      type: "paragraph",
      text:
        "Ahora la condición: cuando `i` valga 5, queremos salir del ciclo. Eso es exactamente lo que hace `break`: abandona la estructura en la que está escrito, igual que hacía en el `switch`. El ciclo no vuelve a evaluar su condición ni ejecuta más vueltas, y el programa continúa con la primera instrucción que viene después del ciclo.",
    },
    {
      type: "playground",
      title: "Experimento 1 · break dentro de un for",
      description: "Con `i` en 5, el ciclo termina. El 6 (posición 5) y todo lo que sigue nunca se imprime.",
      code: L(
        "const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];",
        "const vistos = [];",
        "",
        "for (let i = 0; i < numeros.length; i++) {",
        "  if (i === 5) {",
        "    break;",
        "  }",
        "  vistos.push(numeros[i]);",
        "}",
        "",
        'console.log(vistos.join(" "));',
      ),
      expected: "1 2 3 4 5",
    },

    // ───────────────────────── continue ─────────────────────────
    { type: "heading", level: 2, text: "continue: saltar solo esta vuelta" },
    {
      type: "paragraph",
      text:
        "`continue` se parece, pero hace algo muy distinto: no abandona el ciclo, solo se salta lo que queda de la vuelta actual y pasa a la siguiente. Es decir, `break` rompe el ciclo entero y `continue` rompe una sola iteración. Con el mismo arreglo y la misma condición, el resultado cambia: el 6 se omite, pero el ciclo sigue y se imprimen el 7, el 8, el 9 y el 0.",
    },
    {
      type: "playground",
      title: "Experimento 2 · continue dentro de un for",
      description: "Es el mismo código del experimento anterior cambiando `break` por `continue`. Compara las dos salidas.",
      code: L(
        "const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];",
        "const vistos = [];",
        "",
        "for (let i = 0; i < numeros.length; i++) {",
        "  if (i === 5) {",
        "    continue;",
        "  }",
        "  vistos.push(numeros[i]);",
        "}",
        "",
        'console.log(vistos.join(" "));',
      ),
      expected: "1 2 3 4 5 7 8 9 0",
    },
    {
      type: "image",
      src: "/img/dia-18/break-vs-continue.svg",
      alt: "Un arreglo con los valores 1, 2, 3, 4, 5, 6, 7, 8, 9 y 0 recorrido dos veces. Con break cuando i vale 5, los valores 1 a 5 se imprimen, la vuelta del 6 corta el ciclo y 7, 8, 9 y 0 no se ejecutan. Con continue cuando i vale 5, los valores 1 a 5 se imprimen, el 6 se salta y el ciclo sigue con 7, 8, 9 y 0.",
      caption: "break termina el ciclo; continue omite solo una vuelta.",
    },
    { type: "heading", level: 3, text: "Adónde salta continue" },
    {
      type: "paragraph",
      text:
        "Después de un `continue`, el ciclo no vuelve a empezar desde cero. A dónde va depende del tipo de ciclo. En un `for`, pasa a la expresión de actualización (el `i++`) y luego evalúa la condición. En un `while` o un `do...while`, salta directamente a la condición. En un `for...of` o un `for...in`, pasa al siguiente elemento. `break`, en cambio, siempre sale del ciclo.",
    },
    {
      type: "image",
      src: "/img/dia-18/flujo-break-continue.svg",
      alt: "Flujo de un ciclo for: inicialización, condición, cuerpo y actualización, que vuelve a la condición; si la condición es falsa, el ciclo termina. Dentro del cuerpo, un if con continue salta el resto del cuerpo y pasa a la actualización, y un if con break sale directamente a fin del ciclo.",
      caption: "break sale del ciclo; continue pasa a la actualización (en un for).",
    },
    {
      type: "callout",
      variant: "info",
      text:
        "Ni `break` ni `continue` tienen sentido fuera de una estructura que los reciba: usar `break` fuera de un ciclo o un `switch`, o `continue` fuera de un ciclo, es un error de sintaxis. Tampoco atraviesan funciones: si dentro de un ciclo defines una función y escribes ahí un `break`, no puede salir del ciclo de afuera.",
    },

    // ───────────────────────── Casos de uso ─────────────────────────
    { type: "heading", level: 2, text: "Para qué se usan: filtrar y buscar" },
    {
      type: "paragraph",
      text:
        "Los dos usos más habituales son estos. Con `continue`, filtrar: omitir las vueltas que no interesan según un patrón. Para detectar los pares, el operador de resto `%` (que viste en la lección de operadores) es la herramienta: un número es par si el resto de dividirlo entre 2 es 0. El mismo truco funciona para cualquier patrón, como los múltiplos de 3, de 4 o de 5. Sin embargo, para un patrón regular, a veces es más sencillo cambiar el paso del propio `for` (`n += 4`), sin necesidad de `continue`.",
    },
    {
      type: "playground",
      title: "Experimento 3 · Filtrar con continue y con el paso del for",
      description: "Pares del 1 al 10, múltiplos de 3 hasta 20, y múltiplos de 4 con otro paso, sin `continue`.",
      code: L(
        "const pares = [];",
        "for (let n = 1; n <= 10; n++) {",
        "  if (n % 2 !== 0) {",
        "    continue;   // los impares se saltan",
        "  }",
        "  pares.push(n);",
        "}",
        'console.log(pares.join(" "));',
        "",
        "const multiplos = [];",
        "for (let n = 1; n <= 20; n++) {",
        "  if (n % 3 !== 0) {",
        "    continue;",
        "  }",
        "  multiplos.push(n);",
        "}",
        'console.log(multiplos.join(" "));',
        "",
        "// Otra forma, sin continue: avanzar de 4 en 4",
        "const deCuatro = [];",
        "for (let n = 4; n <= 20; n += 4) {",
        "  deCuatro.push(n);",
        "}",
        'console.log(deCuatro.join(" "));',
      ),
      expected: L("2 4 6 8 10", "3 6 9 12 15 18", "4 8 12 16 20"),
    },
    {
      type: "paragraph",
      text:
        "Con `break`, buscar: detener el ciclo apenas encuentras lo que querías, sin recorrer el resto. Si tienes cien elementos y el que buscas es el tercero, seguir recorriendo es trabajo inútil. También sirve para acumular hasta un límite, como sumar números mientras el total no pase de un valor.",
    },
    {
      type: "playground",
      title: "Experimento 4 · Buscar el primer elemento y acumular hasta un límite",
      description: "El primer nombre con más de 4 letras es «Marta», y solo se revisan tres. La suma se detiene antes de pasar de 20.",
      code: L(
        'const nombres = ["Ana", "Luis", "Marta", "Pedro"];',
        "let encontrado = null;",
        "let revisados = 0;",
        "",
        "for (const nombre of nombres) {",
        "  revisados++;",
        "  if (nombre.length > 4) {",
        "    encontrado = nombre;",
        "    break;",
        "  }",
        "}",
        "console.log(encontrado, revisados);",
        "",
        "let suma = 0;",
        "let sumandos = 0;",
        "for (let n = 1; n <= 100; n++) {",
        "  if (suma + n > 20) {",
        "    break;",
        "  }",
        "  suma += n;",
        "  sumandos++;",
        "}",
        'console.log("suma:", suma, "sumandos:", sumandos);',
      ),
      expected: L("Marta 3", "suma: 15 sumandos: 5"),
    },
    {
      type: "callout",
      variant: "info",
      text:
        "Dentro de una función, también puedes salir de un ciclo con `return`: sale del ciclo y de la función a la vez. `break` solo sale del ciclo, y la función sigue con lo que viene después.",
    },

    // ───────────────────────── while + continue ─────────────────────────
    { type: "heading", level: 2, text: "Cuidado: continue en un while" },
    {
      type: "paragraph",
      text:
        "En un `for`, el `continue` pasa por la actualización, así que el contador avanza. En un `while`, el incremento lo escribes tú dentro del cuerpo, y un `continue` salta todo lo que queda de la vuelta, incluido ese incremento si está después. Si la variable no avanza, la condición nunca cambia y el ciclo no termina. La solución es incrementar antes del `continue`, o estructurar el ciclo de otra forma.",
    },
    {
      type: "playground",
      title: "Experimento 5 · continue y el incremento olvidado en un while",
      description: "En la primera versión, `n` se queda en 3 para siempre, y solo la guarda de 20 vueltas detiene el ciclo. En la segunda, el incremento va antes.",
      code: L(
        "// Versión con error: el n++ queda después del continue",
        "let n = 0;",
        "let vueltas = 0;",
        "const vistos = [];",
        "while (n < 6 && vueltas < 20) {   // la guarda evita el bucle infinito",
        "  vueltas++;",
        "  if (n === 3) {",
        "    continue;                     // salta el n++ y n se queda en 3",
        "  }",
        "  vistos.push(n);",
        "  n++;",
        "}",
        'console.log(vistos.join(" "), "| vueltas:", vueltas);',
        "",
        "// Versión correcta: se incrementa antes del continue",
        "let m = 0;",
        "const bien = [];",
        "while (m < 6) {",
        "  m++;",
        "  if (m === 3) {",
        "    continue;",
        "  }",
        "  bien.push(m);",
        "}",
        'console.log(bien.join(" "));',
      ),
      expected: L("0 1 2 | vueltas: 20", "1 2 4 5 6"),
    },

    // ───────────────────────── switch y anidados ─────────────────────────
    { type: "heading", level: 2, text: "Ciclos anidados y switch dentro de un ciclo" },
    {
      type: "paragraph",
      text:
        "`break` actúa sobre la estructura más cercana que lo contiene, no sobre «el padre» de forma general. Dos consecuencias importantes. La primera: si escribes un `break` dentro de un `switch` que está dentro de un ciclo, el `break` cierra solo el `switch`; el ciclo sigue con la vuelta siguiente. La segunda: en dos ciclos anidados, un `break` en el interior solo termina el ciclo interior. Un `continue` dentro de un `switch`, en cambio, sí afecta al ciclo que lo rodea, porque el `switch` no es un ciclo.",
    },
    {
      type: "playground",
      title: "Experimento 6 · break y continue dentro de un switch dentro de un for",
      description: "En el primer ciclo, `break` solo sale del `switch` y la vuelta 2 sigue hasta el final. En el segundo, `continue` salta toda la vuelta 2.",
      code: L(
        "const conBreak = [];",
        "for (let i = 1; i <= 3; i++) {",
        "  switch (i) {",
        "    case 2:",
        "      break;                    // sale del switch, no del for",
        "    default:",
        '      conBreak.push("i=" + i);',
        "  }",
        '  conBreak.push("fin vuelta " + i);',
        "}",
        'console.log(conBreak.join(" | "));',
        "",
        "const conContinue = [];",
        "for (let i = 1; i <= 3; i++) {",
        "  switch (i) {",
        "    case 2:",
        "      continue;                 // salta toda la vuelta del for",
        "    default:",
        '      conContinue.push("i=" + i);',
        "  }",
        '  conContinue.push("fin " + i);',
        "}",
        'console.log(conContinue.join(" | "));',
      ),
      expected: L(
        "i=1 | fin vuelta 1 | fin vuelta 2 | i=3 | fin vuelta 3",
        "i=1 | fin 1 | i=3 | fin 3",
      ),
    },
    { type: "heading", level: 3, text: "Salir de varios ciclos a la vez: las etiquetas" },
    {
      type: "paragraph",
      text:
        "Cuando necesitas salir de dos ciclos anidados a la vez, JavaScript permite ponerle un nombre (una etiqueta) a un ciclo, escribiendo el nombre y dos puntos delante de él. Después, `break nombre;` sale de ese ciclo, aunque estés dentro de otro, y `continue nombre;` pasa a la siguiente vuelta de ese ciclo. Se usan poco: muchas guías de estilo las limitan, y la regla `no-labels` de ESLint las marca, porque suelen indicar que el código se puede reorganizar (por ejemplo, moviendo los ciclos a una función y usando `return`). Pero existen y conviene reconocerlas.",
    },
    {
      type: "image",
      src: "/img/dia-18/etiquetas-break.svg",
      alt: "Dos tablas de multiplicar de 5 por 5 recorridas con dos ciclos anidados, buscando el primer producto igual a 12. Sin etiqueta, el break solo sale del ciclo interno y se hacen 22 pasos, porque la búsqueda continúa y vuelve a encontrar 12 en la fila 4. Con break externo se hacen 14 pasos y la búsqueda se detiene en la primera coincidencia, 3 por 4.",
      caption: "Sin etiqueta: 22 pasos. Con break externo: 14 pasos.",
    },
    {
      type: "playground",
      title: "Experimento 7 · Etiquetas con break y con continue",
      description: "Contamos los pasos con y sin etiqueta al buscar un producto igual a 12. Luego, `continue fila` salta al siguiente valor de `a`.",
      code: L(
        "// Con etiqueta: sale de los dos ciclos",
        "let par = null;",
        "let pasosCon = 0;",
        "externo: for (let a = 1; a <= 5; a++) {",
        "  for (let b = 1; b <= 5; b++) {",
        "    pasosCon++;",
        "    if (a * b === 12) {",
        '      par = a + "x" + b;',
        "      break externo;",
        "    }",
        "  }",
        "}",
        "",
        "// Sin etiqueta: el break solo sale del ciclo interior",
        "let pasosSin = 0;",
        "for (let a = 1; a <= 5; a++) {",
        "  for (let b = 1; b <= 5; b++) {",
        "    pasosSin++;",
        "    if (a * b === 12) {",
        "      break;",
        "    }",
        "  }",
        "}",
        'console.log(par, "con etiqueta:", pasosCon, "sin etiqueta:", pasosSin);',
        "",
        "// continue con etiqueta: pasa a la siguiente vuelta del ciclo exterior",
        "const celdas = [];",
        "fila: for (let a = 1; a <= 3; a++) {",
        "  for (let b = 1; b <= 3; b++) {",
        "    if (b === 2) {",
        "      continue fila;",
        "    }",
        '    celdas.push(a + "" + b);',
        "  }",
        "}",
        'console.log(celdas.join(" "));',
      ),
      expected: L("3x4 con etiqueta: 14 sin etiqueta: 22", "11 21 31"),
    },

    // ───────────────────────── forEach ─────────────────────────
    { type: "heading", level: 2, text: "Por qué no funcionan en forEach" },
    {
      type: "paragraph",
      text:
        "Habrás pensado: ¿por qué no recorrer el arreglo con `forEach`, que ya conoces? Porque `break` y `continue` pertenecen a las estructuras de control, no a los métodos de los arreglos. El código que le pasas a `forEach` es una función, y `break` o `continue` no pueden cruzar el límite de una función: son un error de sintaxis. Según MDN, no hay forma de detener un `forEach` salvo lanzando un error. Si necesitas parar antes, la herramienta correcta es otra.",
    },
    {
      type: "playground",
      title: "Experimento 8 · break y continue donde no se pueden usar",
      description: "`new Function` compila un texto como código. Como el error de sintaxis aparece al ejecutar, el `try...catch` de la lección anterior sí lo captura.",
      code: L(
        "const intentos = [",
        '  ["break dentro de forEach", "[1, 2, 3].forEach(function (n) { if (n === 2) { break; } });"],',
        '  ["break fuera de un ciclo", "break;"],',
        '  ["continue fuera de un ciclo", "if (true) { continue; }"],',
        "];",
        "",
        "intentos.forEach(function (intento) {",
        "  try {",
        "    new Function(intento[1]);",
        '    console.log(intento[0] + " → sin error");',
        "  } catch (error) {",
        '    console.log(intento[0] + " → " + error.name);',
        "  }",
        "});",
      ),
      expected: L(
        "break dentro de forEach → SyntaxError",
        "break fuera de un ciclo → SyntaxError",
        "continue fuera de un ciclo → SyntaxError",
      ),
    },
    {
      type: "paragraph",
      text:
        "Las alternativas: un `for` o un `for...of`, donde sí puedes usar `break` y `continue`; o un método de arreglo que se detiene solo. `some` se detiene en cuanto la función devuelve `true`; `every`, en cuanto devuelve `false`; `find` y `findIndex`, al encontrar el primer elemento que cumple. Y en un `forEach`, un `return` dentro de la función termina esa llamada, lo que equivale a un `continue`, pero nunca a un `break`.",
    },
    {
      type: "image",
      src: "/img/dia-18/parar-antes.svg",
      alt: "Tabla. En for, while, do...while, for...of y for...in, break y continue funcionan. En forEach no están permitidos y dan un SyntaxError; no hay forma de parar salvo lanzar un error, y un return actúa como continue. some se detiene cuando la función devuelve true, every cuando devuelve false, y find y findIndex al encontrar el primer elemento que cumple.",
      caption: "Qué usar para parar antes o saltar una vuelta.",
    },
    {
      type: "playground",
      title: "Experimento 9 · forEach con return, some, every, find y findIndex",
      description: "Observa qué elementos se revisan: `some` y `every` no recorren todo el arreglo.",
      code: L(
        "const vistos = [];",
        "[1, 2, 3, 4].forEach(function (n) {",
        "  if (n === 2) {",
        "    return;        // equivale a continue",
        "  }",
        "  vistos.push(n);",
        "});",
        'console.log(vistos.join(" "));',
        "",
        "const hayPar = [1, 3, 6, 7].some(function (n) {",
        '  console.log("reviso", n);',
        "  return n % 2 === 0;",
        "});",
        'console.log("¿hay un par?", hayPar);',
        "",
        "const todosPares = [2, 4, 5, 6].every(function (n) {",
        '  console.log("compruebo", n);',
        "  return n % 2 === 0;",
        "});",
        'console.log("¿todos pares?", todosPares);',
        "",
        "console.log([1, 3, 6, 7].find(function (n) { return n % 2 === 0; }));",
        "console.log([1, 3, 6, 7].findIndex(function (n) { return n > 100; }));",
      ),
      expected: L(
        "1 3 4",
        "reviso 1",
        "reviso 3",
        "reviso 6",
        "¿hay un par? true",
        "compruebo 2",
        "compruebo 4",
        "compruebo 5",
        "¿todos pares? false",
        "6",
        "-1",
      ),
    },

    // ───────────────────────── Con finally ─────────────────────────
    { type: "heading", level: 2, text: "break, continue y finally" },
    {
      type: "paragraph",
      text:
        "Un detalle que une esta lección con la anterior: si un `break` o un `continue` ocurre dentro de un `try` que tiene `finally`, el bloque `finally` se ejecuta antes de que el ciclo salga o salte. Es un buen lugar para la limpieza que debe hacerse en cada vuelta.",
    },
    {
      type: "playground",
      title: "Experimento 10 · break dentro de un try con finally",
      description: "En la vuelta 2 hay un `break`, pero el `finally` se ejecuta igual antes de salir.",
      code: L(
        "for (let i = 1; i <= 3; i++) {",
        "  try {",
        "    if (i === 2) {",
        "      break;",
        "    }",
        '    console.log("trabajo", i);',
        "  } finally {",
        '    console.log("limpieza", i);',
        "  }",
        "}",
      ),
      expected: L("trabajo 1", "limpieza 1", "limpieza 2"),
    },
    {
      type: "callout",
      variant: "info",
      text:
        "Para practicar: imprime solo los impares de una lista; imprime los múltiplos de 4 y de 5 con `continue` y con un paso en el `for`; busca en un arreglo el primer número mayor que 50 y detén el ciclo. Algunas guías de estilo evitan `continue` (la regla `no-continue` de ESLint lo marca), porque a veces un `if` bien escrito se lee mejor. No es un error usarlo; elige lo que deje el código más claro.",
    },

    // ───────────────────────── Cuándo usar ─────────────────────────
    { type: "heading", level: 2, text: "¿Qué usar en cada caso?" },
    {
      type: "table",
      caption: "Qué instrucción usar según el problema",
      headers: ["Situación", "Instrucción recomendada"],
      rows: [
        ["Dejar de repetir en cuanto encuentras lo que buscabas", "`break`"],
        ["Omitir las vueltas que no cumplen un patrón", "`continue`, o cambiar el paso del `for`"],
        ["Salir de dos ciclos anidados a la vez", "`break` con etiqueta, o mover los ciclos a una función y usar `return`"],
        ["Salir del ciclo y de la función a la vez", "`return`"],
        ["Parar antes al recorrer un arreglo con un método", "`some`, `every`, `find` o `findIndex` (nunca `forEach`)"],
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
          "`break` sale «del padre» y rompe esa estructura.",
          "Sale solo de la estructura más cercana que lo contiene: un ciclo o un `switch`. Dentro de un `switch` en un ciclo, no rompe el ciclo.",
        ],
        [
          "`continue` solo se salta la vuelta, sin más.",
          "En un `for` ejecuta la actualización y luego la condición; en `while` y `do...while` va a la condición. Si el incremento queda después del `continue`, puede producir un bucle infinito.",
        ],
        [
          "`break` y `continue` no funcionan en los métodos de los arreglos.",
          "Es cierto, y el motivo es que son errores de sintaxis dentro de una función. Para parar antes se usan `for...of`, `some`, `every`, `find` o `findIndex`.",
        ],
        [
          "`break` y `continue` son solo para ciclos.",
          "`break` también sirve en un `switch` y en bloques con etiqueta. `continue` solo funciona dentro de un ciclo.",
        ],
        [
          "Un `break` puede salir de varios ciclos anidados.",
          "Solo sale del más cercano, salvo que uses una etiqueta (`break nombre;`).",
        ],
        [
          "Las etiquetas están obsoletas o prohibidas.",
          "Son sintaxis válida del lenguaje. Se usan poco y algunas guías de estilo las limitan (`no-labels`).",
        ],
        [
          "Dentro de un `forEach`, `return` detiene todo el recorrido.",
          "Solo termina esa llamada de la función, como un `continue`. Los demás elementos se siguen procesando.",
        ],
      ],
    },

    // ───────────────────────── FAQ ─────────────────────────
    {
      type: "accordion",
      title: "Preguntas frecuentes de esta lección",
      items: [
        {
          title: "¿Qué diferencia hay entre break y return?",
          text:
            "`break` sale de un ciclo o de un `switch`, y la función sigue ejecutándose. `return` sale de la función completa, con lo que también sale de cualquier ciclo que esté dentro.",
        },
        {
          title: "¿Puedo usar break dentro de un if que no está en un ciclo?",
          text:
            "No: es un error de sintaxis. `break` necesita un ciclo, un `switch` o una etiqueta que lo reciba. Un `if` no es una estructura de salida.",
        },
        {
          title: "¿Cuándo uso continue y cuándo un if con la condición contraria?",
          text:
            "Los dos son válidos. `continue` evita anidar el resto del cuerpo dentro de un `if`, algo útil cuando hay varias condiciones de descarte al principio. Si el cuerpo es corto, un `if` es igual de claro.",
        },
        {
          title: "¿Cómo imprimo solo los números impares?",
          text:
            "Con un `continue` cuando `n % 2 === 0`, o con un `if (n % 2 !== 0)`, o empezando en 1 y avanzando de 2 en 2 con `n += 2`.",
        },
        {
          title: "¿Y en un for...of?",
          text:
            "Funcionan igual: `break` sale del ciclo y `continue` pasa al siguiente elemento. Por eso `for...of` es la forma habitual de recorrer un arreglo cuando necesitas parar antes.",
        },
        {
          title: "¿Qué pasa si el break está en un try con finally?",
          text:
            "El `finally` se ejecuta antes de salir del ciclo. Lo mismo ocurre con `continue`.",
        },
      ],
    },

    // ───────────────────────── Cierre ─────────────────────────
    { type: "heading", level: 2, text: "Cierre" },
    {
      type: "paragraph",
      text:
        "Con `break` y `continue` completas las herramientas básicas de control de flujo: decidir, repetir, manejar errores y controlar el interior de los ciclos. Recuerda que `break` sale de la estructura más cercana, que `continue` salta solo la vuelta actual (y en un `while` exige cuidar el incremento), y que ninguno de los dos funciona dentro de un `forEach`. En la próxima lección vemos la desestructuración (destructuring) de arreglos y objetos.",
    },
    {
      type: "checklist",
      title: "Antes de pasar al Día 19, verifica que puedes explicar…",
      items: [
        "Qué diferencia hay entre `break` y `continue` dentro de un ciclo.",
        "Qué imprime un `for` sobre `[1, 2, 3, 4, 5, 6, 7, 8, 9, 0]` si, con `i === 5`, usas `break` y si usas `continue`.",
        "Adónde salta un `continue` en un `for` y en un `while`, y por qué un `continue` mal ubicado puede dejar un `while` sin terminar.",
        "Cómo filtrar los pares o los múltiplos de 3 con `continue` y con el operador `%`.",
        "Por qué un `break` dentro de un `switch` en un ciclo no detiene el ciclo.",
        "Cómo salir de dos ciclos anidados con una etiqueta, y por qué se usa poco.",
        "Por qué `break` y `continue` no se pueden usar dentro de un `forEach`, y qué alternativas hay.",
      ],
    },
    { type: "heading", level: 3, text: "Fuentes consultadas (noviembre de 2026)" },
    {
      type: "list",
      items: [
        "[MDN: break](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/break)",
        "[MDN: continue](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/continue)",
        "[MDN: Sentencias etiquetadas](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/label)",
        "[MDN: switch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch)",
        "[MDN: for](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for)",
        "[MDN: while](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/while)",
        "[MDN: for...of](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of)",
        "[MDN: Bucles e iteración (guía)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration)",
        "[MDN: Array.prototype.forEach()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)",
        "[MDN: Array.prototype.some()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some)",
        "[MDN: Array.prototype.every()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every)",
        "[MDN: Array.prototype.find()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)",
        "[MDN: Array.prototype.findIndex()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex)",
        "[MDN: Operador de resto (%)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Remainder)",
        "[MDN: try...catch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch)",
        "[ESLint: no-continue](https://eslint.org/docs/latest/rules/no-continue)",
        "[ESLint: no-labels](https://eslint.org/docs/latest/rules/no-labels)",
        "[ESLint: no-unused-labels](https://eslint.org/docs/latest/rules/no-unused-labels)",
        "[ESLint: no-unreachable](https://eslint.org/docs/latest/rules/no-unreachable)",
      ],
    },
  ],
  selfCheck: [
    {
      question: "¿Qué hace `break` dentro de un `for`?",
      options: [
        "Salta solo la vuelta actual",
        "Sale del ciclo y el programa sigue después de él",
        "Reinicia el ciclo",
        "Termina la función",
      ],
      correctIndex: 1,
      explanation:
        "`break` abandona la estructura en la que está. El ciclo no ejecuta más vueltas.",
    },
    {
      question: "¿Qué hace `continue` dentro de un ciclo?",
      options: [
        "Sale del ciclo",
        "Se salta lo que queda de la vuelta actual y pasa a la siguiente",
        "Detiene el programa",
        "Repite la vuelta actual",
      ],
      correctIndex: 1,
      explanation:
        "`continue` omite solo la iteración actual. El ciclo sigue hasta que su condición deje de cumplirse.",
    },
    {
      question: "¿Qué imprime `for (let n = 1; n <= 6; n++) { if (n % 2 === 0) { continue; } console.log(n); }`?",
      options: ["2 4 6", "1 3 5", "1 2 3 4 5 6", "1"],
      correctIndex: 1,
      explanation:
        "Los pares (resto 0 al dividir entre 2) se saltan con `continue`, así que solo se imprimen 1, 3 y 5.",
    },
    {
      question: "En un `for`, ¿qué se ejecuta justo después de un `continue`?",
      options: [
        "La inicialización",
        "La expresión de actualización (por ejemplo, `i++`)",
        "El `finally`",
        "Nada: el ciclo termina",
      ],
      correctIndex: 1,
      explanation:
        "En un `for`, `continue` pasa a la actualización y luego a la condición. En un `while`, va directo a la condición.",
    },
    {
      question: "¿Por qué un `continue` puede dejar sin terminar un `while`?",
      options: [
        "Porque `continue` reinicia la variable",
        "Porque si el incremento está después del `continue`, nunca se ejecuta y la condición no cambia",
        "Porque `while` no admite `continue`",
        "Porque `continue` cierra el programa",
      ],
      correctIndex: 1,
      explanation:
        "El incremento de un `while` lo escribes tú. Si el `continue` lo salta, la variable no avanza.",
    },
    {
      question: "Un `break` dentro de un `switch` que está dentro de un `for`, ¿qué detiene?",
      options: [
        "El `for` completo",
        "Solo el `switch`; el `for` sigue",
        "El programa",
        "Nada",
      ],
      correctIndex: 1,
      explanation:
        "`break` afecta a la estructura más cercana. Para salir también del `for` hace falta una etiqueta o un `return`.",
    },
    {
      question: "¿Cómo se sale de dos ciclos anidados a la vez?",
      options: [
        "Con dos `break` seguidos",
        "Con un `break` y una etiqueta puesta al ciclo exterior (`break externo;`)",
        "Con `continue`",
        "No se puede",
      ],
      correctIndex: 1,
      explanation:
        "Con una etiqueta en el ciclo exterior, `break etiqueta;` sale de los dos. Otra opción es mover los ciclos a una función y usar `return`.",
    },
    {
      question: "¿Qué ocurre al escribir `break` dentro de la función que recibe `forEach`?",
      options: [
        "Detiene el `forEach`",
        "Es un `SyntaxError`",
        "Salta una vuelta",
        "Se ignora",
      ],
      correctIndex: 1,
      explanation:
        "`break` y `continue` no cruzan funciones. Para parar antes, usa `for...of`, `some`, `every` o `find`.",
    },
    {
      question: "¿Qué método de arreglo deja de recorrer cuando la función devuelve `true`?",
      options: ["forEach", "some", "map", "every"],
      correctIndex: 1,
      explanation:
        "`some` se detiene en el primer elemento para el que la función devuelve `true`. `every` se detiene cuando devuelve `false`.",
    },
    {
      question: "Dentro de un `try` con `finally` en un ciclo, ¿se ejecuta el `finally` cuando hay un `break`?",
      options: [
        "No, el `break` lo cancela",
        "Sí, se ejecuta antes de salir del ciclo",
        "Solo si hay un `catch`",
        "Solo con `continue`",
      ],
      correctIndex: 1,
      explanation:
        "El `finally` se ejecuta siempre que se sale del `try`, también con `break`, `continue` o `return`.",
    },
  ],
};
