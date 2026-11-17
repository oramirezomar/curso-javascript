import type { Lesson } from "@/lib/types";

// Une líneas de código sin tener que escapar backticks ni `${}` dentro de template literals.
const L = (...lines: string[]) => lines.join("\n");

// Contenido validado contra fuentes actuales en noviembre de 2026 (ver sección "Fuentes").
export const day15: Lesson = {
  day: 15,
  slug: "condicionales-if-else-ternario-switch",
  title: "Condicionales: if, else if, ternario y switch",
  section: "Control de flujo",
  estimatedMinutes: 85,
  icon: "🔀",
  objectives: [
    "Explicar qué es una estructura de control y distinguir las secuenciales, las condicionales y las repetitivas",
    "Escribir decisiones con `if`, `else` y cadenas de `else if`, cuidando los valores límite de cada condición",
    "Usar el operador ternario para elegir un valor, y saber cuándo es mejor un `if`",
    "Usar `switch`, con `break`, `default` y la comparación estricta, y reconocer el paso al siguiente caso (fallthrough)",
    "Elegir entre `if`, ternario, `switch` y una tabla de búsqueda según el problema",
  ],
  blocks: [
    // ───────────────────────── Apertura ─────────────────────────
    {
      type: "paragraph",
      text:
        "Hasta ahora, cada línea de código que escribiste se ejecutó después de la anterior. Los programas reales necesitan decidir: mostrar un mensaje u otro, permitir o negar un acceso, elegir un precio. Para eso existen las estructuras de control, y en esta lección vemos las condicionales: `if`, `else if`, el operador ternario y `switch`. Todo lo que aprendiste sobre operadores relacionales y lógicos cobra sentido aquí.",
    },
    {
      type: "keyFacts",
      items: [
        { value: "if / else", label: "Ejecuta un bloque u otro según una condición" },
        { value: "else if", label: "Encadena más de dos caminos; se detiene en el primero que se cumple" },
        { value: "cond ? a : b", label: "Operador ternario: elige un valor, en una expresión" },
        { value: "switch", label: "Compara una expresión con varios casos usando ===" },
        { value: "break", label: "Sale del switch; sin él, la ejecución cae al caso siguiente" },
        { value: "Límites", label: "Con >= y <= el valor límite entra; con > y < queda fuera" },
      ],
    },
    {
      type: "callout",
      variant: "success",
      text:
        "Contenido verificado en noviembre de 2026 con MDN Web Docs (guía de control de flujo, `if...else`, `switch` y el operador condicional) y con la documentación de ESLint. Los resultados de los ejemplos se comprobaron ejecutándolos. Al final hay una tabla con datos que suelen aparecer desactualizados y la lista de fuentes.",
    },

    // ───────────────────────── Estructuras de control ─────────────────────────
    { type: "heading", level: 2, text: "Qué es una estructura de control" },
    {
      type: "paragraph",
      text:
        "Una estructura de control es un mecanismo que, como su nombre indica, permite controlar el flujo de un programa. Hay tres familias. Las estructuras secuenciales son las que hemos escrito hasta ahora: una instrucción detrás de otra, de arriba abajo. Las estructuras condicionales ejecutan unas acciones u otras según el resultado de evaluar una condición (como las comparaciones con `===` o `>=` que viste en la lección anterior, que dan `true` o `false`). Las estructuras repetitivas, o bucles, repiten un bloque, y las vemos en la próxima lección.",
    },
    {
      type: "image",
      src: "/img/dia-15/estructuras-de-control.svg",
      alt: "Tres tarjetas: una estructura secuencial con tres instrucciones una detrás de otra, una estructura condicional con una pregunta que lleva a dos caminos posibles, y una estructura repetitiva con un bloque que vuelve a ejecutarse mientras se cumpla algo.",
      caption: "Secuencial, condicional (esta lección) y repetitiva (la próxima).",
    },

    // ───────────────────────── if else ─────────────────────────
    { type: "heading", level: 2, text: "if y else" },
    {
      type: "paragraph",
      text:
        "La estructura más básica es `if` (si) con su `else` (si no). Se escribe la palabra `if`, entre paréntesis una condición, y entre llaves el bloque que se ejecuta cuando la condición es verdadera. Si agregas `else` con su propio bloque, ese se ejecutará cuando la condición sea falsa. El `else` es opcional: un `if` puede ir solo.",
    },
    {
      type: "code",
      lang: "js",
      title: "Forma básica de if / else",
      code: L(
        "if (condicion) {",
        "  // se ejecuta si la condición es verdadera",
        "} else {",
        "  // se ejecuta si la condición es falsa",
        "}",
      ),
    },
    {
      type: "paragraph",
      text:
        "Veamos un caso real: decidir si alguien es mayor de edad. La mayoría de edad varía según el país; en México es a los 18 años. Para que el ejemplo se pueda probar con varios valores, lo escribimos dentro de una función que recibe la edad. Como en la lección anterior, usamos comparaciones estrictas y evitamos los dobles iguales.",
    },
    {
      type: "playground",
      title: "Experimento 1 · if / else con la mayoría de edad",
      description: "La misma función con tres edades distintas, incluida la del límite.",
      code: L(
        "function clasificar(edad) {",
        "  if (edad >= 18) {",
        '    return "eres mayor de edad";',
        "  } else {",
        '    return "eres menor de edad";',
        "  }",
        "}",
        "",
        "console.log(clasificar(17));",
        "console.log(clasificar(18));",
        "console.log(clasificar(35));",
      ),
      expected: L("eres menor de edad", "eres mayor de edad", "eres mayor de edad"),
    },
    { type: "heading", level: 3, text: "Cuidado con los valores límite" },
    {
      type: "paragraph",
      text:
        "Hay más de una forma de escribir esa condición: `edad > 17`, `edad >= 18`, `edad < 18` o `edad <= 17`, y todas bien usadas dan el mismo resultado. Pero cuidado con mezclar el número con el operador. Los operadores sin igual (`>` y `<`) dejan fuera el valor con el que comparas; los que llevan igual (`>=` y `<=`) lo incluyen. Si escribes `edad >= 17` con la idea de «mayor que 17», un joven de 17 años aparece como mayor de edad: un error de lógica muy típico.",
    },
    {
      type: "image",
      src: "/img/dia-15/limites-comparacion.svg",
      alt: "Tabla con cinco condiciones evaluadas para las edades 17 y 18. edad mayor que 17 da falso y verdadero. edad mayor o igual a 17 da verdadero y verdadero, y es incorrecta. edad mayor o igual a 18 da falso y verdadero. edad menor que 18 da verdadero y falso. edad menor o igual a 17 da verdadero y falso.",
      caption: "El «=» incluye el valor límite: pruébalo siempre en el borde.",
    },
    {
      type: "playground",
      title: "Experimento 2 · Qué incluye cada operador en el límite",
      description: "Mira la segunda columna (`edad >= 17`): da `true` para 17, que es el error que hay que evitar.",
      code: L(
        "// edad, > 17, >= 17, >= 18, < 18, <= 17",
        "[17, 18].forEach(function (edad) {",
        "  console.log(edad, edad > 17, edad >= 17, edad >= 18, edad < 18, edad <= 17);",
        "});",
      ),
      expected: L("17 false true false true true", "18 true true true false false"),
    },
    {
      type: "paragraph",
      text:
        "¿Cuál usar? Ninguna es «buena» o «mala» práctica. Lo único que debes preguntarte es si el valor límite debe incluirse o no. Algunas personas leen mejor `>=` y `<=` con el número que aparece en la regla (aquí, el 18), otras el contrario. Elige la que haga tu código más claro, y prueba siempre los valores del borde: 17 y 18, en este caso.",
    },

    // ───────────────────────── else if ─────────────────────────
    { type: "heading", level: 2, text: "Más de dos caminos: else if" },
    {
      type: "paragraph",
      text:
        "Con `if` y `else` solo hay dos caminos. Cuando necesitas más, se encadenan condiciones con `else if`. Con frecuencia se las llama «ifs anidados», pero conviene precisar la palabra: un `if` anidado es un `if` escrito dentro de otro, mientras que una cadena de `else if` pone las condiciones una tras otra. Se evalúan en orden y, en cuanto una se cumple, se ejecuta su bloque y las demás se saltan.",
    },
    {
      type: "paragraph",
      text:
        "Un ejemplo: elegir el saludo según la hora, usando formato de 24 horas (así se expresan las horas en la programación). Tomamos un reparto razonable, aunque cada país y región lo hace distinto: de 0 a 5 «Déjame dormir», de 6 a 11 «Buenos días», de 12 a 18 «Buenas tardes» y de 19 a 23 «Buenas noches». Son cuatro opciones, y cada una es un rango, es decir, una condición doble: la hora debe ser mayor o igual que un límite y menor o igual que otro. Eso se resuelve con el operador lógico `&&`, pero con una cadena ni siquiera hace falta, como vemos enseguida.",
    },
    {
      type: "image",
      src: "/img/dia-15/cadena-else-if.svg",
      alt: "Las horas de 0 a 23 divididas en cuatro rangos: 0 a 5, 6 a 11, 12 a 18 y 19 a 23. Debajo, la cadena if hora menor o igual a 5, else if hora menor o igual a 11, else if hora menor o igual a 18 y else final, cada una con su saludo. Una condición solo se evalúa si las anteriores fallaron.",
      caption: "Cada condición solo se evalúa si las anteriores fallaron.",
    },
    {
      type: "playground",
      title: "Experimento 3 · Cadena de else if con rangos",
      description: "Dos versiones, con y sin límite inferior, y una comprobación de que dan lo mismo para las 24 horas.",
      code: L(
        "function saludo(hora) {",
        "  if (hora <= 5) {",
        '    return "Déjame dormir";',
        "  } else if (hora <= 11) {",
        '    return "Buenos días";',
        "  } else if (hora <= 18) {",
        '    return "Buenas tardes";',
        "  } else {",
        '    return "Buenas noches";',
        "  }",
        "}",
        "",
        "// Misma lógica, con rangos explícitos y &&",
        "function saludoConRangos(hora) {",
        "  if (hora >= 0 && hora <= 5) {",
        '    return "Déjame dormir";',
        "  } else if (hora >= 6 && hora <= 11) {",
        '    return "Buenos días";',
        "  } else if (hora >= 12 && hora <= 18) {",
        '    return "Buenas tardes";',
        "  } else {",
        '    return "Buenas noches";',
        "  }",
        "}",
        "",
        "[0, 5, 6, 11, 12, 18, 19, 23].forEach(function (h) {",
        "  console.log(h, saludo(h));",
        "});",
        "",
        "const horas = Array.from({ length: 24 }, function (_, i) {",
        "  return i;",
        "});",
        "console.log(horas.every(function (h) {",
        "  return saludo(h) === saludoConRangos(h);",
        "}));",
      ),
      expected: L(
        "0 Déjame dormir",
        "5 Déjame dormir",
        "6 Buenos días",
        "11 Buenos días",
        "12 Buenas tardes",
        "18 Buenas tardes",
        "19 Buenas noches",
        "23 Buenas noches",
        "true",
      ),
    },
    {
      type: "callout",
      variant: "info",
      text:
        "En una página real, la hora se obtiene del objeto `Date`: `new Date().getHours()` devuelve un número de 0 a 23. Ese objeto lo veremos más adelante; mientras tanto, pasamos la hora como argumento para poder probar cualquier valor.",
    },
    {
      type: "paragraph",
      text:
        "También puedes escribir la misma lógica con los operadores sin igual. Cambian los números de los límites (por ejemplo, «mayor que 5 y menor que 12» en lugar de «de 6 a 11»), pero el resultado debe ser idéntico. Es la prueba de que lo importante es entender qué incluye cada operador.",
    },
    {
      type: "paragraph",
      text:
        "Una diferencia importante: varios `if` separados no son lo mismo que una cadena. Cada `if` suelto se evalúa por su cuenta, por lo que pueden ejecutarse varios; en una cadena con `else if`, solo se ejecuta el primero que se cumple.",
    },
    {
      type: "playground",
      title: "Experimento 4 · Varios if frente a una cadena else if",
      description: "Con 15, las dos condiciones se cumplen, pero solo la cadena se detiene en la primera.",
      code: L(
        "const n = 15;",
        "",
        "// if separados: se evalúan los dos",
        'if (n > 10) { console.log("mayor que 10"); }',
        'if (n > 5) { console.log("mayor que 5"); }',
        'console.log("---");',
        "",
        "// cadena: se detiene en el primero que se cumple",
        'if (n > 10) { console.log("mayor que 10"); }',
        'else if (n > 5) { console.log("mayor que 5"); }',
      ),
      expected: L("mayor que 10", "mayor que 5", "---", "mayor que 10"),
    },
    { type: "heading", level: 3, text: "Qué cuenta como condición" },
    {
      type: "paragraph",
      text:
        "La condición de un `if` no tiene por qué ser una comparación. JavaScript convierte cualquier valor a booleano, así que se aplican las reglas de truthy y falsy de la lección de booleanos: un texto vacío, un `0`, `null`, `undefined` o `NaN` equivalen a falso, y casi todo lo demás a verdadero. Es muy cómodo (`if (nombre)`), pero ten cuidado con los valores que son válidos aunque sean falsy, como un `0`.",
    },
    {
      type: "paragraph",
      text:
        "Y un error clásico: escribir `=` (asignación) en lugar de `===` (comparación). `if (x = 5)` asigna 5 a `x` y, como 5 es truthy, el bloque siempre se ejecuta. Es válido, no da error, y por eso es peligroso; ESLint lo detecta con la regla `no-cond-assign`.",
    },
    {
      type: "playground",
      title: "Experimento 5 · Condiciones truthy y el error de asignar en un if",
      description: "Un `0` es falsy aunque sea un dato válido; y `=` dentro del `if` asigna en lugar de comparar.",
      code: L(
        'const nombre = "";',
        "if (nombre) {",
        '  console.log("hay nombre");',
        "} else {",
        '  console.log("nombre vacío");',
        "}",
        "",
        "const cantidad = 0;",
        "if (cantidad) {",
        '  console.log("hay cantidad");',
        "} else {",
        '  console.log("sin cantidad (pero 0 es un dato válido)");',
        "}",
        "if (cantidad !== undefined) {",
        '  console.log("cantidad definida");',
        "}",
        "",
        "// Error clásico: = en lugar de ===",
        "let x = 0;",
        "if (x = 5) {",
        '  console.log("entra siempre; x vale", x);',
        "}",
      ),
      expected: L(
        "nombre vacío",
        "sin cantidad (pero 0 es un dato válido)",
        "cantidad definida",
        "entra siempre; x vale 5",
      ),
    },
    {
      type: "callout",
      variant: "warning",
      text:
        "Las llaves son opcionales cuando el bloque tiene una sola instrucción, pero es mejor usarlas siempre: evitan errores al añadir una segunda línea más adelante. ESLint tiene la regla `curly` para exigirlo.",
    },

    // ───────────────────────── Ternario ─────────────────────────
    { type: "heading", level: 2, text: "El operador ternario" },
    {
      type: "paragraph",
      text:
        "Existe una forma abreviada de un `if / else` con dos caminos: el operador ternario (se llama así porque tiene tres partes). Se escribe una condición, un signo de interrogación y la expresión para cuando es verdadera, dos puntos y la expresión para cuando es falsa. Es una expresión, es decir, produce un valor, y por eso se suele guardar en una variable o usar dentro de otra expresión (por ejemplo, dentro de una plantilla de texto).",
    },
    {
      type: "image",
      src: "/img/dia-15/operador-ternario.svg",
      alt: "El operador ternario con tres partes: la condición edad mayor o igual a 18, un signo de interrogación, el valor mayor de edad si es verdadera, dos puntos y el valor menor de edad si es falsa. Debajo, el if else equivalente que asigna a una variable.",
      caption: "condición ? valor si es verdadera : valor si es falsa.",
    },
    {
      type: "paragraph",
      text:
        "Los paréntesis alrededor de la condición son opcionales (se ponen por claridad). Si la línea se vuelve larga, la convención es escribir la condición en una línea y cada rama en la siguiente, empezando por `?` y por `:`. El punto y coma va solo al final, porque para JavaScript todo es una única instrucción.",
    },
    {
      type: "playground",
      title: "Experimento 6 · Operador ternario",
      description: "Una sola expresión que elige un valor, escrita en una línea y repartida en varias.",
      code: L(
        "const edad = 17;",
        "",
        'const mensaje = (edad >= 18) ? "eres mayor de edad" : "eres menor de edad";',
        "console.log(mensaje);",
        "",
        "// Repartido en varias líneas, es más legible",
        "const mensaje2 = edad >= 18",
        '  ? "eres mayor de edad"',
        '  : "eres menor de edad";',
        "console.log(mensaje2 === mensaje);",
        "",
        "// Y dentro de una plantilla de texto",
        'console.log(`Tienes ${edad} años: ${edad >= 18 ? "acceso permitido" : "acceso denegado"}`);',
      ),
      expected: L(
        "eres menor de edad",
        "true",
        "Tienes 17 años: acceso denegado",
      ),
    },
    {
      type: "paragraph",
      text:
        "Una precisión importante: en el ternario cada rama es una expresión, no una secuencia de instrucciones. Si necesitas ejecutar varias instrucciones en una de las ramas, lo adecuado es un `if`. (Se puede invocar una función dentro de cada rama, pero a menudo es una señal de que un `if` sería más claro.) Y puedes encadenar ternarios, aunque resultan difíciles de leer; con dos o tres caminos conviene volver a `else if`.",
    },
    {
      type: "playground",
      title: "Experimento 7 · Ternarios encadenados",
      description: "Funciona, pero cuanto más largo, más difícil de leer.",
      code: L(
        "function signo(n) {",
        '  return n > 0 ? "positivo" : n < 0 ? "negativo" : "cero";',
        "}",
        "",
        "console.log(signo(5), signo(-2), signo(0));",
      ),
      expected: "positivo negativo cero",
    },
    {
      type: "callout",
      variant: "info",
      text:
        "El ternario existe en muchos lenguajes (PHP, Python con otra sintaxis, entre otros) y se ve constantemente en bibliotecas como React, donde se usa para decidir qué mostrar según el estado de la aplicación. Reglas de ESLint como `no-nested-ternary` desaconsejan encadenarlos.",
    },

    // ───────────────────────── switch ─────────────────────────
    { type: "heading", level: 2, text: "La estructura switch" },
    {
      type: "paragraph",
      text:
        "Cuando una misma variable puede tomar muchos valores concretos y cada uno requiere una acción, `switch` es más ordenado que una larga cadena de `else if`. Un ejemplo clásico: el día de la semana. El objeto `Date` de JavaScript lo entrega como un número, con el domingo como 0 y el sábado como 6 (`new Date().getDay()`). Con un `switch` convertimos ese número en un nombre.",
    },
    {
      type: "paragraph",
      text:
        "El `switch` evalúa una expresión y busca el primer `case` (caso) cuyo valor coincida. Después de los dos puntos de ese caso se escriben las instrucciones, y `break` hace salir del `switch`. Si ningún caso coincide, se ejecuta `default`, el caso por defecto, pensado para los valores no contemplados. Una precisión que suele omitirse: la comparación es estricta (`===`), de modo que el texto `\"2\"` no coincide con `case 2`.",
    },
    {
      type: "image",
      src: "/img/dia-15/switch-flujo.svg",
      alt: "A la izquierda, un switch con break: con dia igual a 2 coincide con case 2, ejecuta martes y sale. A la derecha, un switch sin break en los casos 1 y 2: con n igual a 1 coincide con case 1, y la ejecución cae a los casos 2 y 3 hasta encontrar un break. Debajo, la comparación es estricta y se pueden agrupar casos omitiendo el break.",
      caption: "break sale del switch; sin él, la ejecución sigue cayendo al caso siguiente.",
    },
    {
      type: "playground",
      title: "Experimento 8 · switch con break y default",
      description: "El 20 no coincide con ningún caso y cae en `default`.",
      code: L(
        "function decirDia(dia) {",
        "  let nombre;",
        "  switch (dia) {",
        '    case 0: nombre = "domingo"; break;',
        '    case 1: nombre = "lunes"; break;',
        '    case 2: nombre = "martes"; break;',
        '    case 3: nombre = "miércoles"; break;',
        '    case 4: nombre = "jueves"; break;',
        '    case 5: nombre = "viernes"; break;',
        '    case 6: nombre = "sábado"; break;',
        '    default: nombre = "el día no existe";',
        "  }",
        "  return nombre;",
        "}",
        "",
        "[2, 6, 0, 20].forEach(function (d) {",
        '  console.log(d + ": " + decirDia(d));',
        "});",
      ),
      expected: L("2: martes", "6: sábado", "0: domingo", "20: el día no existe"),
    },
    { type: "heading", level: 3, text: "El paso al siguiente caso (fallthrough)" },
    {
      type: "paragraph",
      text:
        "El `break` es esencial. Una explicación habitual dice que «los dos puntos del `case` son la llave de apertura y el `break` la de cierre», pero no es exacto: un `case` no es un bloque. Lo que ocurre es que, al encontrar el caso que coincide, JavaScript ejecuta sus instrucciones y continúa con las de los casos siguientes, sin comprobar sus valores, hasta encontrar un `break` o llegar al final. Eso se llama fallthrough. Casi siempre es un descuido, pero a veces es útil a propósito, para agrupar casos que hacen lo mismo.",
    },
    {
      type: "playground",
      title: "Experimento 9 · Fallthrough y casos agrupados",
      description: "Sin break, la ejecución cae a los casos siguientes; omitirlo a propósito agrupa casos.",
      code: L(
        "function sinBreak(n) {",
        "  const salida = [];",
        "  switch (n) {",
        '    case 1: salida.push("uno");',
        '    case 2: salida.push("dos");',
        '    case 3: salida.push("tres"); break;',
        '    default: salida.push("otro");',
        "  }",
        '  return salida.join(",");',
        "}",
        "console.log(sinBreak(1), sinBreak(2), sinBreak(3), sinBreak(9));",
        "",
        "// Agrupar casos a propósito",
        "function tipoDia(d) {",
        "  switch (d) {",
        "    case 0:",
        "    case 6:",
        '      return "fin de semana";',
        "    default:",
        '      return "entre semana";',
        "  }",
        "}",
        "console.log(tipoDia(0), tipoDia(3), tipoDia(6));",
      ),
      expected: L(
        "uno,dos,tres dos,tres tres otro",
        "fin de semana entre semana fin de semana",
      ),
    },
    {
      type: "playground",
      title: "Experimento 10 · switch compara con === y el patrón switch (true)",
      description: "El número 2 y el texto \"2\" son casos distintos.",
      code: L(
        "function probar(valor) {",
        "  switch (valor) {",
        '    case 2: return "número 2";',
        '    case "2": return "texto 2";',
        '    default: return "ninguno";',
        "  }",
        "}",
        "console.log(probar(2));",
        'console.log(probar("2"));',
        "console.log(probar(true));",
        "",
        "// Un patrón conocido para rangos: switch (true)",
        "function nota(puntos) {",
        "  switch (true) {",
        '    case puntos >= 90: return "A";',
        '    case puntos >= 80: return "B";',
        '    default: return "C";',
        "  }",
        "}",
        "console.log(nota(95), nota(85), nota(10));",
      ),
      expected: L("número 2", "texto 2", "ninguno", "A B C"),
    },
    {
      type: "callout",
      variant: "info",
      text:
        "Otros detalles del `switch`: `default` no tiene que ir al final (por convención se pone ahí; si va en medio, necesita su propio `break`), solo puede haber uno, y si declaras variables con `let` o `const` dentro de un `case` conviene encerrarlo entre llaves para que la variable no se comparta entre casos. ESLint ayuda con `no-fallthrough` y `default-case`.",
    },
    {
      type: "paragraph",
      text:
        "Por último, para valores exactos hay otra alternativa que a menudo es más limpia que un `switch` largo: una tabla de búsqueda, es decir, un arreglo o un objeto que asocia cada valor con su resultado, junto con `??` para el caso por defecto.",
    },
    {
      type: "playground",
      title: "Experimento 11 · Una tabla de búsqueda en lugar de switch",
      description: "El arreglo se indexa por el número del día; el objeto, por la clave.",
      code: L(
        'const dias = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];',
        'console.log(dias[2], dias[6], dias[20] ?? "el día no existe");',
        "",
        "const precios = { pequeño: 10, mediano: 15, grande: 20 };",
        'console.log(precios["mediano"], precios["xl"] ?? "no disponible");',
      ),
      expected: L("martes sábado el día no existe", "15 no disponible"),
    },

    // ───────────────────────── Cuál usar ─────────────────────────
    { type: "heading", level: 2, text: "¿Qué estructura elegir?" },
    {
      type: "table",
      caption: "Qué estructura usar según el problema",
      headers: ["Situación", "Estructura recomendada"],
      rows: [
        ["Dos caminos que ejecutan instrucciones", "`if` / `else`"],
        ["Elegir entre dos valores", "Operador ternario"],
        ["Tres o más caminos, o rangos de valores", "Cadena de `else if`"],
        ["Una variable con muchos valores exactos y una acción por cada uno", "`switch`, o una tabla de búsqueda"],
        ["Combinar varias condiciones en una", "Operadores lógicos `&&`, `||` y `!`"],
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
          "Una cadena de `else if` son «ifs anidados».",
          "Un `if` anidado es un `if` dentro de otro. Una cadena de `else if` pone las condiciones una tras otra y se detiene en la primera que se cumple.",
        ],
        [
          "El operador ternario solo ejecuta una línea de código.",
          "Cada rama es una expresión que produce un valor. Para varias instrucciones se usa un `if`.",
        ],
        [
          "La condición del ternario debe ir entre paréntesis.",
          "Los paréntesis son opcionales; se usan por claridad.",
        ],
        [
          "El `break` es la llave de cierre de un `case`.",
          "Un `case` no es un bloque. `break` sale del `switch`.",
        ],
        [
          "Sin `break`, el `switch` «lee todos los casos».",
          "Ejecuta las instrucciones del caso coincidente y de los siguientes, sin volver a comparar, hasta un `break` o el final (fallthrough).",
        ],
        [
          "`switch` compara valores.",
          "Compara con igualdad estricta (`===`): `case 2` no coincide con `\"2\"`.",
        ],
        [
          "`default` siempre va al final.",
          "Es la convención, pero puede ir en cualquier posición; si no es el último, necesita su `break`.",
        ],
        [
          "Un `if` evalúa solo `true` o `false`.",
          "Convierte cualquier valor a booleano (truthy y falsy), por eso `if (nombre)` o `if (0)` son válidos.",
        ],
        [
          "Las llaves de un `if` son obligatorias.",
          "Son opcionales con una sola instrucción, pero se recomienda usarlas siempre (regla `curly` de ESLint).",
        ],
      ],
    },

    // ───────────────────────── FAQ ─────────────────────────
    {
      type: "accordion",
      title: "Preguntas frecuentes de esta lección",
      items: [
        {
          title: "¿Cuándo uso `switch` y cuándo `else if`?",
          text:
            "`switch` es práctico cuando comparas una misma expresión con varios valores exactos. `else if` es más flexible: cada condición puede ser distinta y admite rangos y operadores lógicos.",
        },
        {
          title: "¿Se puede usar `switch` con textos?",
          text:
            "Sí, pero con igualdad estricta: `case \"rojo\"` coincide solo con el texto exacto `\"rojo\"`, con las mismas mayúsculas y minúsculas.",
        },
        {
          title: "¿Cómo evito tener demasiados `if` anidados?",
          text:
            "Con retornos tempranos: en una función, se comprueba primero el caso que no sirve y se hace `return`, así el resto del código queda sin anidar. La regla `no-else-return` de ESLint va en esa línea.",
        },
        {
          title: "¿Qué pasa si dos `case` tienen el mismo valor?",
          text:
            "Se ejecuta el primero que coincida; el segundo nunca se alcanza. Es un error que conviene evitar.",
        },
        {
          title: "¿Puedo usar `&&` y `||` en lugar de un `if`?",
          text:
            "En expresiones cortas sí (`usuario && saludar(usuario)`), gracias al cortocircuito. Pero para decisiones con varias instrucciones, un `if` es más claro.",
        },
        {
          title: "¿Cómo obtengo la hora o el día real?",
          text:
            "Con el objeto `Date`: `new Date().getHours()` da la hora (0 a 23) y `getDay()` el día de la semana (0 es domingo y 6 es sábado). Lo veremos con detalle más adelante.",
        },
      ],
    },

    // ───────────────────────── Cierre ─────────────────────────
    { type: "heading", level: 2, text: "Cierre" },
    {
      type: "paragraph",
      text:
        "Ya puedes hacer que un programa tome decisiones: `if` y `else` para dos caminos, `else if` para varios, el ternario para elegir un valor y `switch` para muchos valores exactos. Lo esencial es cuidar los valores límite, recordar que `switch` usa `===` y que sin `break` la ejecución sigue cayendo. En la próxima lección vemos las estructuras repetitivas: los bucles.",
    },
    {
      type: "checklist",
      title: "Antes de pasar al Día 16, verifica que puedes explicar…",
      items: [
        "Qué diferencia hay entre una estructura secuencial, una condicional y una repetitiva.",
        "Qué da `clasificar(17)` y `clasificar(18)` con la condición `edad >= 18`, y qué pasaría con `edad >= 17`.",
        "En qué se diferencia una cadena de `else if` de varios `if` sueltos.",
        "Por qué `if (x = 5)` siempre entra y qué hay que escribir en su lugar.",
        "Cómo se escribe un operador ternario y por qué es una expresión.",
        "Para qué sirven `break` y `default` en un `switch` y qué es el fallthrough.",
        "Qué comparación usa `switch` y por qué `case 2` no coincide con `\"2\"`.",
      ],
    },
    { type: "heading", level: 3, text: "Fuentes consultadas (noviembre de 2026)" },
    {
      type: "list",
      items: [
        "[MDN: Control de flujo y manejo de errores (guía)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling)",
        "[MDN: if...else](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else)",
        "[MDN: switch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch)",
        "[MDN: break](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/break)",
        "[MDN: Operador condicional (ternario)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_operator)",
        "[MDN: Sentencia de bloque](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/block)",
        "[MDN: Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)",
        "[MDN: Date.prototype.getHours()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getHours)",
        "[MDN: Date.prototype.getDay()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getDay)",
        "[ESLint: curly](https://eslint.org/docs/latest/rules/curly)",
        "[ESLint: no-cond-assign](https://eslint.org/docs/latest/rules/no-cond-assign)",
        "[ESLint: no-nested-ternary](https://eslint.org/docs/latest/rules/no-nested-ternary)",
        "[ESLint: no-fallthrough](https://eslint.org/docs/latest/rules/no-fallthrough)",
        "[ESLint: default-case](https://eslint.org/docs/latest/rules/default-case)",
        "[ESLint: no-else-return](https://eslint.org/docs/latest/rules/no-else-return)",
      ],
    },
  ],
  selfCheck: [
    {
      question: "¿Qué tipo de estructura de control es la que ejecuta una acción u otra según una condición?",
      options: ["Secuencial", "Condicional", "Repetitiva", "Declarativa"],
      correctIndex: 1,
      explanation:
        "Las condicionales eligen un camino según el resultado de una condición. Las repetitivas son los bucles.",
    },
    {
      question: "Con `edad = 17`, ¿qué devuelve `edad >= 18`?",
      options: ["true", "false", "undefined", "Un error"],
      correctIndex: 1,
      explanation: "17 no es mayor ni igual a 18, así que la condición da `false`.",
    },
    {
      question: "Si quieres que 18 años cuente como mayor de edad, ¿qué condición es incorrecta?",
      options: ["edad > 17", "edad >= 18", "edad >= 17", "edad < 18 (para el caso contrario)"],
      correctIndex: 2,
      explanation: "`edad >= 17` incluye al 17, por lo que un joven de 17 años aparecería como mayor de edad.",
    },
    {
      question: "¿Qué hace una cadena `if ... else if ... else`?",
      options: [
        "Ejecuta todos los bloques cuya condición se cumple",
        "Ejecuta solo el primer bloque cuya condición se cumple",
        "Ejecuta siempre el último bloque",
        "Ejecuta los bloques en orden inverso",
      ],
      correctIndex: 1,
      explanation:
        "En cuanto una condición se cumple, se ejecuta su bloque y las demás se saltan. Con `if` sueltos podrían cumplirse varias.",
    },
    {
      question: "¿Qué ocurre con `let x = 0; if (x = 5) { ... }`?",
      options: [
        "El bloque no se ejecuta porque x vale 0",
        "El bloque siempre se ejecuta: `x = 5` asigna 5 y 5 es truthy",
        "Lanza un SyntaxError",
        "Compara x con 5",
      ],
      correctIndex: 1,
      explanation:
        "Un solo `=` es una asignación. Para comparar hay que usar `===`.",
    },
    {
      question: "¿Qué devuelve `10 > 5 ? \"sí\" : \"no\"`?",
      options: ["true", "\"sí\"", "\"no\"", "undefined"],
      correctIndex: 1,
      explanation:
        "La condición es verdadera, así que el ternario devuelve la expresión de la primera rama: `\"sí\"`.",
    },
    {
      question: "¿Qué es cierto sobre el operador ternario?",
      options: [
        "Solo puede ejecutar instrucciones, no devolver valores",
        "Es una expresión que produce un valor",
        "Requiere siempre paréntesis alrededor de la condición",
        "Es exclusivo de JavaScript",
      ],
      correctIndex: 1,
      explanation:
        "El ternario es una expresión: su resultado se puede guardar o usar. Los paréntesis son opcionales, y existe en muchos lenguajes.",
    },
    {
      question: "En un `switch`, ¿qué ocurre si omites el `break` de un caso que coincide?",
      options: [
        "Se produce un error",
        "La ejecución continúa con las instrucciones de los casos siguientes",
        "El switch se reinicia",
        "Solo se ejecuta el default",
      ],
      correctIndex: 1,
      explanation:
        "Es el fallthrough: se ejecutan las instrucciones de los casos siguientes, sin volver a comparar, hasta un `break` o el final.",
    },
    {
      question: "¿Con qué comparación decide `switch` qué caso ejecutar?",
      options: ["==", "===", "Object.is solamente", "Con >="],
      correctIndex: 1,
      explanation: "`switch` usa igualdad estricta: `case 2` no coincide con el texto `\"2\"`.",
    },
    {
      question: "¿Para qué sirve `default` en un `switch`?",
      options: [
        "Para el caso que se ejecuta siempre primero",
        "Para el caso que se ejecuta cuando ningún `case` coincide",
        "Para declarar variables",
        "Para salir del switch",
      ],
      correctIndex: 1,
      explanation: "Es el camino por defecto para los valores que ningún `case` contempla.",
    },
  ],
};
