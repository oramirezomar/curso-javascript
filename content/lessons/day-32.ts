import type { Lesson } from "@/lib/types";

// Une líneas de código sin tener que escapar backticks ni `${}` dentro de template literals.
const L = (...lines: string[]) => lines.join("\n");

// Contenido validado contra fuentes actuales en noviembre de 2026 (ver sección "Fuentes").
export const day32: Lesson = {
  day: 32,
  slug: "expresiones-regulares",
  title: "Expresiones regulares: RegExp, test y exec",
  section: "Herramientas del lenguaje",
  estimatedMinutes: 90,
  icon: "🛠️",
  objectives: [
    "Explicar qué es una expresión regular y crearla como literal o con `new RegExp`",
    "Usar las banderas más comunes, `g` e `i`, y saber que existen otras",
    "Comprobar coincidencias con `test` y obtener detalles con `exec`, `match`, `matchAll`, `replace` y `split`",
    "Entender `lastIndex` y evitar la trampa de `test` con la bandera `g`",
    "Leer y escribir patrones básicos: clases, anclas, cuantificadores y grupos",
    "Reconocer las limitaciones: acentos, validación de correos y rendimiento",
  ],
  blocks: [
    // ───────────────────────── Apertura ─────────────────────────
    {
      type: "paragraph",
      text:
        "Una expresión regular es un patrón de búsqueda: una secuencia de caracteres que describe qué forma debe tener un texto. Se usa para comprobar si un texto cumple un formato, como un correo, un código postal o una fecha; para encontrar fragmentos dentro de un texto; y para reemplazar partes de él. No son exclusivas de JavaScript: casi todos los lenguajes de programación las incluyen, con pequeñas diferencias de sintaxis. Aprenderlas es una inversión que se amortiza en cualquier lenguaje y en muchas herramientas, como editores de código y la terminal. En esta lección verás cómo se usan en JavaScript, y los símbolos básicos para empezar a construir las tuyas.",
    },
    {
      type: "keyFacts",
      items: [
        { value: "/patrón/banderas", label: "La forma literal de escribir una expresión regular" },
        { value: "new RegExp(...)", label: "La forma con constructor, útil cuando el patrón es una variable" },
        { value: "test / exec", label: "Comprueba si hay coincidencia, o devuelve sus detalles" },
        { value: "g e i", label: "Todas las coincidencias, e ignorar mayúsculas y minúsculas" },
        { value: "lastIndex", label: "Con la bandera g, la expresión recuerda dónde se quedó" },
        { value: "Sin memorizar", label: "Basta con conocer lo esencial y consultar una referencia" },
      ],
    },
    {
      type: "callout",
      variant: "success",
      text:
        "Contenido verificado en noviembre de 2026 con MDN Web Docs (guía de expresiones regulares, `RegExp`, `exec`, `lastIndex`, `matchAll`, cuantificadores y `RegExp.escape`), OWASP y la documentación de HTML para el campo de correo. Los resultados de los ejemplos se comprobaron ejecutándolos. Al final hay una tabla con datos que suelen aparecer desactualizados y la lista de fuentes.",
    },

    // ───────────────────────── Crear ─────────────────────────
    { type: "heading", level: 2, text: "Crear una expresión regular" },
    {
      type: "paragraph",
      text:
        "Hay dos formas. La literal escribe el patrón entre dos barras, `/lorem/`, y después de la segunda barra van las banderas, como `/lorem/gi`. La del constructor es `new RegExp(\"lorem\", \"gi\")`, con el patrón y las banderas como textos. El resultado es el mismo. La forma literal es la más usada. El constructor sirve cuando el patrón se construye a partir de una variable. Con el constructor hay que tener cuidado con las barras invertidas: dentro de un texto, `\\d` hay que escribirlo como `\"\\\\d\"`, porque la barra invertida también escapa en los textos.",
    },
    {
      type: "image",
      src: "/img/dia-32/anatomia-de-una-regex.svg",
      alt: "La expresión regular /lorem/gi tiene tres partes: las barras que la delimitan, el patrón lorem, que es lo que se busca, y las banderas gi, que modifican cómo se busca. Equivale a new RegExp(\"lorem\", \"gi\"). Banderas: g busca todas las coincidencias, i ignora mayúsculas y minúsculas, m hace que el circunflejo y el dólar actúen en cada línea, s hace que el punto incluya los saltos de línea, u activa el modo Unicode, d da los índices de los grupos, y busca solo en la posición actual y v es una versión ampliada de u.",
      caption: "Patrón entre barras, y banderas al final.",
    },
    {
      type: "paragraph",
      text:
        "Las banderas modifican cómo se busca. Las dos más usadas son `g` (global), que busca todas las coincidencias en vez de detenerse en la primera, e `i`, que ignora la diferencia entre mayúsculas y minúsculas. Hay más: `m` hace que `^` y `$` actúen en cada línea, `s` hace que el punto incluya los saltos de línea, `u` activa el modo Unicode, `d` da los índices de los grupos, `y` busca solo en la posición actual, y `v` es una versión ampliada de `u`.",
    },
    {
      type: "playground",
      title: "Experimento 1 · Literal, constructor y banderas",
      description: "Las dos formas de crear la expresión dan el mismo resultado. Sin la bandera `i`, la búsqueda distingue mayúsculas. Con el constructor, el patrón se puede construir con una variable.",
      code: L(
        "const texto = \"Lorem ipsum dolor sit amet. Un lorem aquí y otro LOREM allá.\";",
        "",
        "// Dos formas de crear la misma expresión regular",
        "const literal = /lorem/;",
        "const constructor = new RegExp(\"lorem\");",
        "console.log(literal.source, constructor.source);",
        "console.log(literal.test(texto), constructor.test(texto));",
        "",
        "// Las banderas (flags) cambian el comportamiento",
        "const ignorarMayusculas = /lorem/i;",
        "const global = /lorem/gi;",
        "console.log(ignorarMayusculas.flags, global.flags);",
        "console.log(ignorarMayusculas.ignoreCase, ignorarMayusculas.global, global.global);",
        "",
        "// Sin la bandera i, la búsqueda distingue mayúsculas de minúsculas",
        "console.log(/LOREM ipsum/.test(texto), /LOREM ipsum/i.test(texto));",
        "",
        "// Con el constructor se puede construir el patrón con una variable",
        "const palabra = \"dolor\";",
        "console.log(new RegExp(palabra).test(texto), new RegExp(palabra + \"es\").test(texto));",
      ),
      expected: L(
        "lorem lorem",
        "true true",
        "i gi",
        "true false true",
        "false true",
        "true false",
      ),
    },

    // ───────────────────────── test y exec ─────────────────────────
    { type: "heading", level: 2, text: "test y exec" },
    {
      type: "paragraph",
      text:
        "Dos métodos del objeto expresión regular cubren la mayoría de usos. `regex.test(texto)` devuelve `true` o `false` según haya o no coincidencia, y es el que usarás para validar. `regex.exec(texto)` devuelve la información de la primera coincidencia, en un arreglo, o `null` si no hay ninguna. El arreglo tiene el texto encontrado en la posición 0, y propiedades extra: `index`, la posición donde empieza, e `input`, el texto donde se buscó. Los grupos, trozos del patrón entre paréntesis, se capturan en las posiciones siguientes del arreglo: `resultado[1]`, `resultado[2]`... Y se pueden nombrar con `(?<nombre>...)`, y leerse en `resultado.groups.nombre`.",
    },
    {
      type: "playground",
      title: "Experimento 2 · exec: texto, posición y grupos",
      description: "`exec` devuelve `null` cuando no hay coincidencia. Los grupos capturan el año, el mes y el día, por posición o por nombre.",
      code: L(
        "const texto = \"Hoy es 2020-03-12 y mañana será 2020-03-13.\";",
        "",
        "// exec devuelve un arreglo con la primera coincidencia, o null si no hay ninguna",
        "const resultado = /\\d{4}-\\d{2}-\\d{2}/.exec(texto);",
        "console.log(resultado[0]);",
        "console.log(resultado.index);",
        "console.log(resultado.input === texto);",
        "console.log(/\\d{4}-\\d{2}-\\d{2}/.exec(\"sin fechas\"));",
        "",
        "// Los grupos entre paréntesis capturan partes de la coincidencia",
        "const conGrupos = /(\\d{4})-(\\d{2})-(\\d{2})/.exec(texto);",
        "console.log(conGrupos[1], conGrupos[2], conGrupos[3]);",
        "",
        "// Y se pueden nombrar",
        "const nombrados = /(?<anio>\\d{4})-(?<mes>\\d{2})-(?<dia>\\d{2})/.exec(texto);",
        "console.log(nombrados.groups.anio, nombrados.groups.mes, nombrados.groups.dia);",
      ),
      expected: L(
        "2020-03-12",
        "7",
        "true",
        "null",
        "2020 03 12",
        "2020 03 12",
      ),
    },

    // ───────────────────────── lastIndex ─────────────────────────
    { type: "heading", level: 2, text: "La bandera g y lastIndex" },
    {
      type: "paragraph",
      text:
        "Aquí está la parte que más confunde. Con la bandera `g`, la expresión recuerda dónde terminó la última coincidencia, en su propiedad `lastIndex`, y la siguiente búsqueda empieza desde ahí. Por eso, cada llamada a `exec` devuelve la coincidencia siguiente, y cuando ya no hay más devuelve `null` y `lastIndex` vuelve a 0. No devuelve «la última coincidencia», como a veces se explica. Esto permite recorrer todas con un bucle `while`. La contrapartida es una trampa: `test` también avanza `lastIndex`, así que, con la bandera `g`, llamarlo varias veces seguidas con el mismo texto alterna entre `true` y `false`. MDN documenta que `lastIndex` solo se usa con las banderas `g` o `y`. Para solo validar, escribe la expresión sin `g`.",
    },
    {
      type: "image",
      src: "/img/dia-32/test-y-lastindex.svg",
      alt: "Con una expresión regular con la bandera g, el método test recuerda en lastIndex dónde se quedó. Con letra igual a /a/g y el texto \"a\": la primera llamada encuentra la letra en la posición 0, deja lastIndex en 1 y devuelve true; la segunda llamada empieza en la posición 1, no encuentra nada, vuelve a poner lastIndex en 0 y devuelve false; la tercera llamada vuelve a empezar y devuelve true. Para evitarlo, escribe la expresión sin g si solo quieres comprobar. Con exec y g, cada llamada devuelve la coincidencia siguiente, hasta que devuelve null.",
      caption: "Con la bandera g, test alterna entre true y false.",
    },
    {
      type: "playground",
      title: "Experimento 3 · Recorrer coincidencias y la trampa de test",
      description: "El bucle `while` con `exec` recorre todas las coincidencias, y `lastIndex` avanza. Luego se ve la alternancia de `test` con `g`, frente al mismo `test` sin `g`. Al final, `matchAll` hace lo mismo sin trampas.",
      code: L(
        "const texto = \"uno1, dos22, tres333\";",
        "",
        "// Con la bandera g, la expresión recuerda dónde se quedó (lastIndex),",
        "// y cada exec devuelve la SIGUIENTE coincidencia",
        "const numeros = /\\d+/g;",
        "let coincidencia;",
        "while ((coincidencia = numeros.exec(texto)) !== null) {",
        "  console.log(\"Encontré\", coincidencia[0], \"en la posición\", coincidencia.index, \"→ lastIndex:\", numeros.lastIndex);",
        "}",
        "console.log(\"Al terminar, lastIndex vuelve a\", numeros.lastIndex);",
        "",
        "// La trampa: test con g también avanza lastIndex y alterna los resultados",
        "const letra = /a/g;",
        "console.log(letra.test(\"a\"), letra.test(\"a\"), letra.test(\"a\"));",
        "",
        "// Sin la bandera g, test siempre da lo mismo",
        "const sinG = /a/;",
        "console.log(sinG.test(\"a\"), sinG.test(\"a\"), sinG.test(\"a\"));",
        "",
        "// matchAll recorre todas las coincidencias sin esa trampa",
        "for (const m of texto.matchAll(/\\d+/g)) {",
        "  console.log(m[0], m.index);",
        "}",
      ),
      expected: L(
        "Encontré 1 en la posición 3 → lastIndex: 4",
        "Encontré 22 en la posición 9 → lastIndex: 11",
        "Encontré 333 en la posición 17 → lastIndex: 20",
        "Al terminar, lastIndex vuelve a 0",
        "true false true",
        "true true true",
        "1 3",
        "22 9",
        "333 17",
      ),
    },

    // ───────────────────────── Métodos de string ─────────────────────────
    { type: "heading", level: 2, text: "Los métodos de texto que aceptan expresiones regulares" },
    {
      type: "paragraph",
      text:
        "Muchas veces es más cómodo llamar a un método del texto que a uno de la expresión. `texto.match(regex)` devuelve, sin la bandera `g`, lo mismo que `exec`, y con `g`, un arreglo con todas las coincidencias, o `null` si no hay ninguna. `texto.matchAll(regex)` recorre todas las coincidencias con detalle, y exige la bandera `g`. `texto.search(regex)` devuelve la posición de la primera coincidencia, o `-1`. `texto.replace(regex, reemplazo)` sustituye la primera coincidencia, o todas si la expresión lleva `g`; en el reemplazo, `$1`, `$2`... insertan los grupos capturados, y se puede pasar una función que calcule el reemplazo. Y `texto.split(regex)` divide el texto usando la expresión como separador.",
    },
    {
      type: "table",
      caption: "Qué devuelve cada método",
      headers: ["Método", "Qué devuelve"],
      rows: [
        ["`regex.test(texto)`", "`true` o `false`"],
        ["`regex.exec(texto)`", "La coincidencia con sus detalles, o `null`; con `g`, la siguiente en cada llamada"],
        ["`texto.match(regex)`", "Sin `g`, como `exec`. Con `g`, un arreglo con todos los textos coincidentes, o `null`"],
        ["`texto.matchAll(regex)`", "Un iterador con todas las coincidencias y sus detalles (requiere `g`)"],
        ["`texto.search(regex)`", "La posición de la primera coincidencia, o `-1`"],
        ["`texto.replace(regex, nuevo)`", "Un texto nuevo con la primera coincidencia sustituida, o todas con `g`"],
        ["`texto.split(regex)`", "Un arreglo con los trozos separados por la expresión"],
      ],
    },
    {
      type: "playground",
      title: "Experimento 4 · match, search, replace y split",
      description: "`replace` con `$1`, `$2` y `$3` reordena una fecha. Con una función se calcula el reemplazo. `split` admite varios separadores a la vez.",
      code: L(
        "const texto = \"El 12/03/2020 pagué 15 € y el 13/03/2020 pagué 20 €\";",
        "",
        "// match: sin g devuelve la primera coincidencia con detalles; con g, todas, como arreglo de textos",
        "console.log(texto.match(/\\d+/)[0]);",
        "console.log(texto.match(/\\d+/g).join(\" \"));",
        "console.log(\"sin números\".match(/\\d+/g)); // sin g y sin coincidencias, null",
        "",
        "// search: la posición de la primera coincidencia, o -1",
        "console.log(texto.search(/\\d{4}/), \"abc\".search(/\\d/));",
        "",
        "// replace: sustituye la primera coincidencia; con g, todas",
        "console.log(texto.replace(/\\d+/, \"#\"));",
        "console.log(texto.replace(/\\d+/g, \"#\"));",
        "",
        "// $1, $2... reutilizan lo capturado: de dd/mm/aaaa a aaaa-mm-dd",
        "console.log(\"12/03/2020\".replace(/(\\d{2})\\/(\\d{2})\\/(\\d{4})/, \"$3-$2-$1\"));",
        "",
        "// replace con una función, para calcular el reemplazo",
        "console.log(\"5 y 7\".replace(/\\d+/g, (n) => Number(n) * 2));",
        "",
        "// split con una expresión regular: varios separadores a la vez",
        "console.log(\"uno, dos;tres   cuatro\".split(/[,;\\s]+/).join(\"|\"));",
      ),
      expected: L(
        "12",
        "12 03 2020 15 13 03 2020 20",
        "null",
        "9 -1",
        "El #/03/2020 pagué 15 € y el 13/03/2020 pagué 20 €",
        "El #/#/# pagué # € y el #/#/# pagué # €",
        "2020-03-12",
        "10 y 14",
        "uno|dos|tres|cuatro",
      ),
    },

    // ───────────────────────── Símbolos ─────────────────────────
    { type: "heading", level: 2, text: "Los símbolos básicos" },
    {
      type: "paragraph",
      text:
        "Dentro de un patrón, la mayoría de las letras se representan a sí mismas, y unos cuantos símbolos tienen un significado especial. `\\d` es un dígito y `\\D`, lo que no es dígito. `\\s` es un espacio en blanco y `\\S`, lo que no lo es. `\\w` es una letra ASCII, un dígito o un guion bajo, y `\\W`, lo contrario. El punto `.` es cualquier carácter salvo un salto de línea. Entre corchetes, `[abc]` es uno de esos caracteres, `[^abc]` cualquiera menos esos, y `[a-z]` un rango. `^` y `$` anclan el patrón al principio y al final del texto, y `\\b` marca el límite de una palabra. Para buscar un símbolo especial tal cual, se escapa con una barra invertida: `\\.` es un punto de verdad. Y hay un truco para validar: poner `^` y `$` alrededor, como en `/^\\d{5}$/`, obliga a que el texto entero cumpla el patrón, y no solo un trozo.",
    },
    {
      type: "image",
      src: "/img/dia-32/simbolos-basicos.svg",
      alt: "Cuatro grupos de símbolos. Clases de caracteres: d un dígito, D lo que no es un dígito, s un espacio, S lo que no es un espacio, w una letra ASCII, un dígito o guion bajo, el punto cualquier carácter salvo el salto de línea, corchetes con abc uno de esos caracteres, corchetes con circunflejo cualquiera menos esos, corchetes con un rango. Anclas y alternativas: circunflejo inicio del texto, dólar fin del texto, b límite de palabra, barra vertical a o b, backslash punto un punto de verdad, y doble backslash una barra invertida. Cuantificadores: asterisco cero o más veces, más una o más, interrogación cero o una, llaves con 3 exactamente 3 veces, llaves con 2 y coma 2 o más, llaves con 2 y 4 entre 2 y 4, y más con interrogación la versión perezosa. Grupos y comprobaciones: paréntesis grupo que captura, grupo con nombre, grupo que no captura, va seguido de, no va seguido de, va precedido de, y p L cualquier letra con la bandera u.",
      caption: "Los símbolos que más vas a usar.",
    },
    {
      type: "playground",
      title: "Experimento 5 · Validar formatos sencillos",
      description: "Cada caso prueba varios valores contra su expresión. Observa el uso de `^` y `$` para exigir que todo el texto cumpla el patrón, y los grupos con `|` para elegir entre tres o seis dígitos hexadecimales.",
      code: L(
        "// Cada caso: descripción, expresión regular y valores a probar",
        "const casos = [",
        "  [\"Código postal (5 dígitos)\", /^\\d{5}$/, [\"28001\", \"2800\", \"280011\", \"28a01\"]],",
        "  [\"Color hexadecimal\", /^#([0-9a-f]{3}|[0-9a-f]{6})$/i, [\"#fff\", \"#FF8800\", \"#ff88\", \"fff\"]],",
        "  [\"Fecha aaaa-mm-dd (solo formato)\", /^\\d{4}-\\d{2}-\\d{2}$/, [\"2020-03-12\", \"2020-3-12\", \"12-03-2020\"]],",
        "  [\"Solo letras y guiones bajos\", /^[A-Za-z_]+$/, [\"mi_variable\", \"mi variable\", \"dato1\"]],",
        "  [\"Contiene una mayúscula y un dígito\", /^(?=.*[A-Z])(?=.*\\d).+$/, [\"Clave1\", \"clave1\", \"CLAVE\"]],",
        "];",
        "",
        "for (const [descripcion, regex, valores] of casos) {",
        "  console.log(descripcion);",
        "  for (const valor of valores) {",
        "    console.log(\"  \", valor.padEnd(10), regex.test(valor));",
        "  }",
        "}",
      ),
      expected: L(
        "Código postal (5 dígitos)",
        "   28001      true",
        "   2800       false",
        "   280011     false",
        "   28a01      false",
        "Color hexadecimal",
        "   #fff       true",
        "   #FF8800    true",
        "   #ff88      false",
        "   fff        false",
        "Fecha aaaa-mm-dd (solo formato)",
        "   2020-03-12 true",
        "   2020-3-12  false",
        "   12-03-2020 false",
        "Solo letras y guiones bajos",
        "   mi_variable true",
        "   mi variable false",
        "   dato1      false",
        "Contiene una mayúscula y un dígito",
        "   Clave1     true",
        "   clave1     false",
        "   CLAVE      false",
      ),
    },
    {
      type: "paragraph",
      text:
        "No hace falta memorizar todos los símbolos: se consultan en una referencia, como la hoja de referencia de MDN o la entrada de Wikipedia sobre expresiones regulares. Para formatos muy comunes, hay muchos ejemplos publicados. Lo importante es entender cómo se leen, para poder adaptarlos y para detectar los que no funcionan, y conocer las trampas.",
    },

    // ───────────────────────── Cuantificadores ─────────────────────────
    { type: "heading", level: 2, text: "Cuantificadores: la trampa de las llaves" },
    {
      type: "paragraph",
      text:
        "Los cuantificadores indican cuántas veces se repite algo: `*` cero o más, `+` una o más, `?` cero o una, y `{n}`, `{n,}` y `{n,m}` para cantidades exactas, mínimas o en un rango. Un detalle fundamental, que MDN recoge con claridad: un cuantificador afecta solo al elemento que tiene justo antes, es decir, un carácter, una clase, un grupo. Por eso `/lorem{3}/` no repite la palabra «lorem» tres veces, sino la letra `m`: reconoce «loremmm». Para repetir la palabra completa hay que agruparla entre paréntesis, `/(lorem){3}/`. Es un error muy frecuente, y conviene fijarse en él desde el principio.",
    },
    {
      type: "image",
      src: "/img/dia-32/cuantificador-afecta-a-uno.svg",
      alt: "En la expresión /lorem{3}/, el cuantificador llave tres afecta solo a la última letra, la m, así que reconoce el texto loremmm, con tres emes, y no loremloremlorem. Para repetir la palabra completa hay que agruparla con paréntesis: /(lorem){3}/ reconoce loremloremlorem y no loremmm. Lo mismo ocurre con asterisco, más e interrogación: afectan al elemento que tienen justo a la izquierda.",
      caption: "El cuantificador repite lo que tiene justo antes.",
    },
    {
      type: "paragraph",
      text:
        "Otro detalle: por defecto los cuantificadores son codiciosos y toman todo lo que pueden. Si añades un `?` después, como en `.+?`, se vuelven perezosos y toman lo mínimo. Es lo que permite extraer cada etiqueta por separado en lugar de una sola coincidencia gigante.",
    },
    {
      type: "playground",
      title: "Experimento 6 · Cuantificadores y codicia",
      description: "Compara `/lorem{3}/` y `/(lorem){3}/`. Más abajo, el cuantificador codicioso `.+` recorre desde la primera etiqueta hasta la última, y `.+?` se detiene en cada una.",
      code: L(
        "// Un cuantificador afecta SOLO al elemento que tiene justo antes",
        "console.log(/lorem{3}/i.test(\"loremmm\"), /lorem{3}/i.test(\"loremloremlorem\"));",
        "",
        "// Para repetir una palabra completa, hay que agruparla con paréntesis",
        "console.log(/(lorem){3}/i.test(\"loremloremlorem\"), /(lorem){3}/i.test(\"loremmm\"));",
        "",
        "// Rango de repeticiones",
        "console.log(/^a{2,4}$/.test(\"a\"), /^a{2,4}$/.test(\"aaa\"), /^a{2,4}$/.test(\"aaaaa\"));",
        "",
        "// * (cero o más), + (una o más) y ? (cero o una)",
        "console.log(\"colorcolour\".match(/colou?r/g).join(\" \"));",
        "console.log(\"ab abbb a\".match(/ab+/g).join(\" \"), \"|\", \"ab abbb a\".match(/ab*/g).join(\" \"));",
        "",
        "// Codiciosos (por defecto) o perezosos (con ?)",
        "const html = \"<b>uno</b> y <b>dos</b>\";",
        "console.log(html.match(/<b>.+<\\/b>/)[0]);",
        "console.log(html.match(/<b>.+?<\\/b>/)[0]);",
        "console.log(html.match(/<b>.+?<\\/b>/g).join(\" y \"));",
      ),
      expected: L(
        "true false",
        "true false",
        "false true false",
        "color colour",
        "ab abbb | ab abbb a",
        "<b>uno</b> y <b>dos</b>",
        "<b>uno</b>",
        "<b>uno</b> y <b>dos</b>",
      ),
    },

    // ───────────────────────── Acentos ─────────────────────────
    { type: "heading", level: 2, text: "Acentos y letras de cualquier idioma" },
    {
      type: "paragraph",
      text:
        "Una sorpresa para quienes escriben en español: `\\w` y `\\b` solo conocen las letras ASCII, así que las tildes y la ñ quedan fuera. `\"canción\".match(/\\w+/g)` da `canci` y `n`. La solución moderna es la bandera `u` junto con `\\p{L}`, que representa cualquier letra de cualquier idioma. La bandera `i`, en cambio, sí ignora la diferencia entre mayúsculas y minúsculas en letras con tilde. Y para un límite de palabra que entienda las tildes se usan comprobaciones hacia delante y hacia atrás: `(?<!\\p{L})` y `(?!\\p{L})`.",
    },
    {
      type: "playground",
      title: "Experimento 7 · \\w frente a \\p{L}",
      description: "`\\w` parte «Canción» en dos pedazos. `\\p{L}` con la bandera `u` reconoce las cinco palabras completas. La última línea muestra que `\\b` también falla con las tildes.",
      code: L(
        "const texto = \"Canción: ¡qué día! Año nuevo\";",
        "",
        "// \\w solo reconoce letras ASCII, dígitos y guion bajo: las tildes y la ñ quedan fuera",
        "console.log(texto.match(/\\w+/g).join(\" | \"));",
        "console.log(\"canción\".split(/\\W+/).join(\" | \"));",
        "",
        "// Con la bandera u se puede usar \\p{L}: cualquier letra de cualquier idioma",
        "console.log(texto.match(/\\p{L}+/gu).join(\" | \"));",
        "console.log(texto.match(/\\p{L}+/gu).length, \"palabras\");",
        "",
        "// La bandera i también ignora mayúsculas en letras con tilde",
        "console.log(/ñ/i.test(\"AÑO\"), /á/i.test(\"Á\"));",
        "",
        "// \\b (límite de palabra) tampoco entiende las tildes",
        "console.log(String(\"canción\".match(/\\bn\\b/)));",
        "// Con lookarounds y \\p{L} se construye un límite que sí entiende las letras con tilde",
        "console.log(String(\"canción\".match(/(?<!\\p{L})n(?!\\p{L})/u)));",
      ),
      expected: L(
        "Canci | n | qu | d | a | A | o | nuevo",
        "canci | n",
        "Canción | qué | día | Año | nuevo",
        "5 palabras",
        "true true",
        "n",
        "null",
      ),
    },

    // ───────────────────────── Correo y escape ─────────────────────────
    { type: "heading", level: 2, text: "Validar un correo y construir expresiones con datos del usuario" },
    {
      type: "paragraph",
      text:
        "Validar un correo electrónico es el ejemplo favorito de las expresiones regulares, y el que más problemas da. Una expresión sencilla, como «algo, arroba, algo, punto, algo», comprueba que el formato es razonable, pero no puede decirte si la dirección existe, y deja pasar casos raros, como dos puntos seguidos. La expresión que cubre toda la especificación es enorme. En una página web, lo más práctico es combinar un campo `<input type=\"email\">`, que el navegador valida, con una comprobación en el servidor, y enviar un mensaje de confirmación. MDN explica el algoritmo que usa el navegador, y publica la expresión regular equivalente.",
    },
    {
      type: "paragraph",
      text:
        "Una segunda precaución: si el patrón se construye con texto que escribe un usuario, hay que escaparlo, porque los símbolos como `.` o `*` tendrían significado especial. Por ejemplo, buscar «3.5» sin escapar encontraría también «3x5». MDN indica que, desde 2025, existe `RegExp.escape()` en los navegadores más recientes. Mientras no esté disponible en todos los entornos, se puede usar una función que sustituya los caracteres especiales, como la del ejemplo.",
    },
    {
      type: "playground",
      title: "Experimento 8 · Un correo sencillo y un patrón escapado",
      description: "La validación sencilla acepta `ana@correo..com`, que sería inválido: es el límite de las expresiones simples. `escapar` convierte `3.5` en `3\\.5`, y así `3x5` ya no coincide.",
      code: L(
        "// Una validación de correo sencilla: algo, @, algo, punto, algo.",
        "const correoSimple = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;",
        "const correos = [\"ana@correo.com\", \"ana@correo\", \"ana correo@x.com\", \"@correo.com\", \"a@b.c\", \"ana@correo..com\"];",
        "for (const correo of correos) {",
        "  console.log(correo.padEnd(18), correoSimple.test(correo));",
        "}",
        "",
        "// Si el texto del patrón viene de un usuario, hay que escapar los caracteres especiales",
        "function escapar(texto) {",
        "  return texto.replace(/[.*+?^${}()|[\\]\\\\]/g, \"\\\\$&\");",
        "}",
        "const buscado = \"3.5\";",
        "const sinEscapar = new RegExp(buscado);",
        "const escapado = new RegExp(escapar(buscado));",
        "console.log(escapar(buscado));",
        "console.log(sinEscapar.test(\"3x5\"), escapado.test(\"3x5\"), escapado.test(\"el 3.5\"));",
      ),
      expected: L(
        "ana@correo.com     true",
        "ana@correo         false",
        "ana correo@x.com   false",
        "@correo.com        false",
        "a@b.c              true",
        "ana@correo..com    true",
        "3\\.5",
        "true false true",
      ),
    },
    {
      type: "playground",
      title: "Experimento 9 · Pequeñas recetas con replace y match",
      description: "Ocultar dígitos menos los cuatro últimos, limpiar espacios, convertir a formato título, contar palabras, separar un nombre en camelCase y extraer hashtags.",
      code: L(
        "// Ocultar todos los dígitos menos los cuatro últimos",
        "const tarjeta = \"1234567812343456\";",
        "console.log(tarjeta.replace(/\\d(?=\\d{4})/g, \"*\"));",
        "",
        "// Quitar espacios sobrantes",
        "console.log(\"  hola    mundo  \".trim().replace(/\\s+/g, \" \"));",
        "",
        "// Pasar a formato título, usando una función",
        "console.log(\"hOLA mUNDO cruel\".toLowerCase().replace(/(^|\\s)\\p{L}/gu, (letra) => letra.toUpperCase()));",
        "",
        "// Contar cuántas veces aparece algo",
        "const frase = \"la casa de la abuela de la niña\";",
        "console.log((frase.match(/\\bla\\b/g) || []).length);",
        "",
        "// Pasar de camelCase a palabras separadas",
        "console.log(\"miVariableMuyLarga\".replace(/([a-z])([A-Z])/g, \"$1 $2\").toLowerCase());",
        "",
        "// Extraer todas las etiquetas de hashtags",
        "console.log(\"Hoy #aprendo #JavaScript con #regex\".match(/#\\w+/g).join(\" \"));",
      ),
      expected: L(
        "************3456",
        "hola mundo",
        "Hola Mundo Cruel",
        "3",
        "mi variable muy larga",
        "#aprendo #JavaScript #regex",
      ),
    },

    // ───────────────────────── Rendimiento ─────────────────────────
    { type: "heading", level: 2, text: "Un aviso sobre el rendimiento" },
    {
      type: "paragraph",
      text:
        "Algunas expresiones regulares pueden volverse extremadamente lentas con ciertos textos. La causa es el retroceso (backtracking): ante patrones ambiguos, como cuantificadores anidados, el motor prueba un número enorme de combinaciones. OWASP lo describe como un ataque de denegación de servicio, ReDoS: un atacante envía un texto que hace que la expresión tarde un tiempo exponencial y bloquee el programa. Se evita simplificando los patrones, evitando cuantificadores anidados sobre elementos que se solapan, limitando la longitud del texto que se valida, y no aplicando expresiones complejas a datos que no controlas. Y por la misma razón, las expresiones regulares no son la herramienta para analizar HTML o JSON: para eso existen un analizador de HTML y `JSON.parse`.",
    },
    {
      type: "table",
      caption: "Qué usar según lo que necesites",
      headers: ["Qué necesitas", "Herramienta"],
      rows: [
        ["Saber si un texto cumple un formato", "`/^patrón$/.test(texto)`, sin la bandera `g`"],
        ["Los detalles de la primera coincidencia", "`regex.exec(texto)` o `texto.match(regex)`"],
        ["Todas las coincidencias de un texto", "`texto.match(/patrón/g)` o `texto.matchAll(/patrón/g)`"],
        ["Cambiar partes de un texto", "`texto.replace(/patrón/g, nuevo)`"],
        ["Reordenar lo capturado", "Grupos y `$1`, `$2`, o una función de reemplazo"],
        ["Dividir un texto con varios separadores", "`texto.split(/[,;\\s]+/)`"],
        ["Letras con tilde y de otros idiomas", "`/\\p{L}+/gu`"],
        ["Un patrón construido con una variable", "`new RegExp(escapar(variable))`"],
        ["Validar un correo en una página", "`<input type=\"email\">`, y comprobación en el servidor"],
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
          "Con la bandera `g`, `exec` devuelve la última coincidencia.",
          "Devuelve la siguiente en cada llamada, a partir de `lastIndex`, y `null` cuando ya no hay más. Para recorrerlas todas se usa un bucle, o `matchAll`.",
        ],
        [
          "`test` siempre da el mismo resultado con el mismo texto.",
          "No con la bandera `g` ni con `y`: avanza `lastIndex` y alterna entre `true` y `false`.",
        ],
        [
          "`/lorem{3}/` repite la palabra tres veces.",
          "El cuantificador solo afecta al elemento anterior: repite la letra `m`. Para la palabra completa, `/(lorem){3}/`.",
        ],
        [
          "`\\w` reconoce las letras del idioma.",
          "Solo reconoce letras ASCII, dígitos y guion bajo. Para letras con tilde y de otros idiomas se usa `\\p{L}` con la bandera `u`.",
        ],
        [
          "`\\b` detecta el límite de una palabra con tildes.",
          "Como `\\w`, solo entiende ASCII. Con tildes hay que usar comprobaciones con `\\p{L}`.",
        ],
        [
          "`texto.match(regex)` siempre devuelve todas las coincidencias.",
          "Solo con la bandera `g`. Sin ella, devuelve la primera coincidencia con detalles.",
        ],
        [
          "Hay una expresión regular perfecta para validar correos.",
          "Una expresión sencilla comprueba el formato, no la existencia. La especificación completa es enorme. En un formulario se usa `<input type=\"email\">`, y se confirma enviando un mensaje.",
        ],
        [
          "`new RegExp(\"\\d+\")` equivale a `/\\d+/`.",
          "En un texto, la barra invertida hay que duplicarla: `new RegExp(\"\\\\d+\")`.",
        ],
        [
          "Para buscar lo que escribe el usuario basta concatenarlo.",
          "Hay que escapar los símbolos especiales. MDN indica que `RegExp.escape()` está disponible en los navegadores más recientes desde mayo de 2025.",
        ],
        [
          "Las expresiones regulares siempre son rápidas.",
          "Algunas pueden tardar un tiempo exponencial con ciertos textos, lo que OWASP llama ReDoS.",
        ],
      ],
    },

    // ───────────────────────── FAQ ─────────────────────────
    {
      type: "accordion",
      title: "Preguntas frecuentes de esta lección",
      items: [
        {
          title: "¿Tengo que aprenderme todos los símbolos de memoria?",
          text:
            "No. Basta con conocer los esenciales, `\\d`, `\\s`, `\\w`, los corchetes, los cuantificadores, `^`, `$` y los paréntesis, y consultar una referencia para el resto. Lo importante es entender cómo se lee un patrón.",
        },
        {
          title: "¿Qué hacen los paréntesis?",
          text:
            "Agrupan una parte del patrón, de modo que se pueda repetir con un cuantificador, y capturan lo que coincidió en ese trozo, para poder leerlo después o reutilizarlo con `$1` en `replace`. Si solo quieres agrupar, sin capturar, se escribe `(?:...)`.",
        },
        {
          title: "¿Qué son las comprobaciones hacia delante y hacia atrás?",
          text:
            "Son condiciones que no consumen texto: `(?=x)` exige que a continuación venga `x`, `(?!x)` que no venga, `(?<=x)` que antes haya `x`, y `(?<!x)` que no lo haya. En el experimento 9, `\\d(?=\\d{4})` elige los dígitos que van seguidos de cuatro dígitos más.",
        },
        {
          title: "¿Puedo reutilizar una expresión regular en varias búsquedas?",
          text:
            "Sí. Si lleva la bandera `g` o `y`, ten presente `lastIndex`: se comparte entre llamadas. Reinicia `lastIndex = 0` o crea una nueva cuando necesites empezar de cero.",
        },
        {
          title: "¿Cuándo no usar una expresión regular?",
          text:
            "Cuando existe una herramienta específica: `JSON.parse` para JSON, un analizador de HTML para HTML, y las funciones de texto simples, como `includes`, `startsWith` o `split(\",\")`, cuando no hace falta un patrón.",
        },
      ],
    },

    // ───────────────────────── Cierre ─────────────────────────
    { type: "heading", level: 2, text: "Cierre" },
    {
      type: "paragraph",
      text:
        "Una expresión regular es un patrón entre barras, con banderas al final, que se usa con `test` para validar, con `exec`, `match` y `matchAll` para extraer, y con `replace` y `split` para transformar. Recuerda la trampa de `lastIndex` con la bandera `g`, que el cuantificador afecta solo a lo que tiene antes, que `\\w` no conoce las tildes y que ninguna expresión de correo es perfecta. En la próxima lección vemos una forma de escribir funciones que se ejecutan en el mismo momento en que se definen: las funciones autoejecutables, o IIFE.",
    },
    {
      type: "checklist",
      title: "Antes de pasar al Día 33, verifica que puedes explicar…",
      items: [
        "Qué es una expresión regular y para qué sirve.",
        "Las dos formas de crearla y cuándo conviene el constructor.",
        "Qué hacen las banderas `g` e `i`, y que existen otras.",
        "En qué se diferencian `test` y `exec`.",
        "Qué es `lastIndex` y por qué `test` con `g` alterna resultados.",
        "Qué devuelve `match` con y sin la bandera `g`.",
        "Cómo se reordena un texto con `replace` y `$1`.",
        "Qué significan `\\d`, `\\s`, `\\w`, `.`, `[ ]`, `^` y `$`.",
        "Por qué `/lorem{3}/` no repite la palabra.",
        "Por qué `\\w` falla con las tildes y cómo se arregla.",
        "Por qué no existe una expresión perfecta para validar correos.",
        "Por qué hay que escapar el texto del usuario y qué es ReDoS.",
      ],
    },
    { type: "heading", level: 3, text: "Fuentes consultadas (noviembre de 2026)" },
    {
      type: "list",
      items: [
        "[MDN: Guía de expresiones regulares](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions)",
        "[MDN: Hoja de referencia de expresiones regulares](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions/Cheatsheet)",
        "[MDN: Cuantificadores](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions/Quantifiers)",
        "[MDN: RegExp](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp)",
        "[MDN: RegExp.prototype.exec()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec)",
        "[MDN: RegExp.prototype.test()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test)",
        "[MDN: RegExp lastIndex](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/lastIndex)",
        "[MDN: RegExp.escape()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/escape)",
        "[MDN: String.prototype.matchAll()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/matchAll)",
        "[MDN: String.prototype.replace()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace)",
        "[MDN: input de tipo email](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/email)",
        "[OWASP: Denegación de servicio con expresiones regulares (ReDoS)](https://owasp.org/www-community/attacks/Regular_expression_Denial_of_Service_-_ReDoS)",
        "[Wikipedia: Expresión regular](https://es.wikipedia.org/wiki/Expresi%C3%B3n_regular)",
      ],
    },
  ],
  selfCheck: [
    {
      question: "¿Cuál de estas es una expresión regular escrita como literal?",
      options: ["`\"lorem\"`", "`/lorem/i`", "`RegExp(lorem)`", "`<lorem>`"],
      correctIndex: 1,
      explanation:
        "El patrón va entre dos barras, y las banderas, después de la segunda. Equivale a `new RegExp(\"lorem\", \"i\")`.",
    },
    {
      question: "¿Qué hace la bandera `i`?",
      options: [
        "Busca todas las coincidencias",
        "Ignora la diferencia entre mayúsculas y minúsculas",
        "Hace que el punto incluya los saltos de línea",
        "Activa el modo Unicode",
      ],
      correctIndex: 1,
      explanation:
        "`g` busca todas, `s` incluye los saltos de línea con el punto y `u` activa el modo Unicode.",
    },
    {
      question: "¿Qué devuelve `/\\d+/.exec(\"sin números\")`?",
      options: ["`false`", "`null`", "`[]`", "`undefined`"],
      correctIndex: 1,
      explanation:
        "`exec` devuelve `null` cuando no hay coincidencia. Es `test` el que devuelve un booleano.",
    },
    {
      question: "Con `const letra = /a/g;`, ¿qué devuelven tres llamadas seguidas a `letra.test(\"a\")`?",
      options: [
        "`true`, `true`, `true`",
        "`true`, `false`, `true`",
        "`false`, `false`, `false`",
        "`true`, `false`, `false`",
      ],
      correctIndex: 1,
      explanation:
        "Con `g`, `lastIndex` avanza tras cada coincidencia. La segunda llamada empieza al final del texto y falla, y reinicia `lastIndex`.",
    },
    {
      question: "¿A qué afecta el cuantificador en `/lorem{3}/`?",
      options: [
        "A la palabra `lorem` completa",
        "Solo a la letra `m`",
        "A las tres últimas letras",
        "A todo el texto",
      ],
      correctIndex: 1,
      explanation:
        "Un cuantificador afecta solo al elemento anterior. Para repetir la palabra completa hay que agruparla: `/(lorem){3}/`.",
    },
    {
      question: "¿Qué da `\"canción\".match(/\\w+/g)`?",
      options: [
        "`[\"canción\"]`",
        "`[\"canci\", \"n\"]`, porque `\\w` no reconoce las tildes",
        "`null`",
        "`[\"c\", \"a\", \"n\"]`",
      ],
      correctIndex: 1,
      explanation:
        "`\\w` solo reconoce letras ASCII. Para letras de cualquier idioma se usa `\\p{L}` con la bandera `u`.",
    },
    {
      question: "¿Qué hace `\"12/03/2020\".replace(/(\\d{2})\\/(\\d{2})\\/(\\d{4})/, \"$3-$2-$1\")`?",
      options: [
        "Nada, porque `$3` no existe",
        "Devuelve `2020-03-12`, reordenando los grupos capturados",
        "Devuelve `12/03/2020`",
        "Lanza un error",
      ],
      correctIndex: 1,
      explanation:
        "`$1`, `$2` y `$3` insertan lo capturado por cada grupo: día, mes y año. El resultado los coloca en orden inverso.",
    },
    {
      question: "¿Para qué sirven `^` y `$` en `/^\\d{5}$/`?",
      options: [
        "Para repetir cinco veces",
        "Para exigir que todo el texto cumpla el patrón, desde el principio hasta el final",
        "Para ignorar los dígitos",
        "No sirven para nada",
      ],
      correctIndex: 1,
      explanation:
        "Sin anclas, bastaría con que un trozo del texto tuviera cinco dígitos. Con ellas, el texto entero debe ser exactamente cinco dígitos.",
    },
    {
      question: "Quieres buscar el texto que escribe un usuario dentro de otro texto con `new RegExp(entrada)`. ¿Qué debes hacer antes?",
      options: [
        "Nada: siempre funciona",
        "Escapar los caracteres especiales, porque el usuario podría escribir símbolos con significado en un patrón",
        "Convertirlo a mayúsculas",
        "Añadir la bandera `g`",
      ],
      correctIndex: 1,
      explanation:
        "Sin escapar, un punto o un asterisco cambiarían el patrón. Se puede usar una función de escape, o `RegExp.escape()` donde esté disponible.",
    },
    {
      question: "¿Qué es ReDoS?",
      options: [
        "Un método nuevo de `RegExp`",
        "Un ataque que usa un texto que hace que una expresión regular tarde un tiempo enorme, y bloquee el programa",
        "Una bandera para ir más rápido",
        "Un error de sintaxis",
      ],
      correctIndex: 1,
      explanation:
        "Algunas expresiones, con cuantificadores anidados, retroceden de forma exponencial con ciertos textos. Se evita simplificando los patrones y limitando el tamaño de la entrada.",
    },
  ],
};
