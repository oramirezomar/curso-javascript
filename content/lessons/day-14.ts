import type { Lesson } from "@/lib/types";

// Une líneas de código sin tener que escapar backticks ni `${}` dentro de template literals.
const L = (...lines: string[]) => lines.join("\n");

// Contenido validado contra fuentes actuales en noviembre de 2026 (ver sección "Fuentes").
export const day14: Lesson = {
  day: 14,
  slug: "operadores-aritmeticos-relacionales-logicos",
  title: "Operadores: aritméticos, de asignación, relacionales y lógicos",
  section: "Operadores",
  estimatedMinutes: 80,
  icon: "➗",
  objectives: [
    "Usar los operadores aritméticos, incluidos `%` y `**`, y predecir el resultado según la precedencia",
    "Abreviar asignaciones con `+=`, `-=`, `*=`, `/=` y sus parientes, y distinguirlas de `++` y `--`",
    "Explicar qué significa «unario» y la diferencia entre `i++` y `++i`",
    "Comparar valores con `>`, `<`, `>=`, `<=`, `==`, `!=`, `===` y `!==`, y saber por qué se prefiere la igualdad estricta",
    "Combinar condiciones con `!`, `&&` y `||` y entender el cortocircuito",
  ],
  blocks: [
    // ───────────────────────── Apertura ─────────────────────────
    {
      type: "paragraph",
      text:
        "Ya conoces los tipos de datos. Ahora vemos los operadores, los símbolos que permiten trabajar con ellos: sumar, comparar, combinar condiciones. Casi todo el código que escribirás los usa. Aquí revisamos los aritméticos, los de asignación, los de incremento y decremento, los relacionales (de comparación) y los lógicos. En la próxima lección los combinaremos con condicionales y bucles para controlar el flujo de un programa.",
    },
    {
      type: "keyFacts",
      items: [
        { value: "+ - * / % **", label: "Operadores aritméticos" },
        { value: "+= -= *= /=", label: "Asignación compuesta: operar y guardar" },
        { value: "++ y --", label: "Suman o restan 1; son operadores unarios" },
        { value: "=== y !==", label: "Igualdad estricta: la que se recomienda" },
        { value: "! && ||", label: "Operadores lógicos: NO, Y, O" },
        { value: "Precedencia", label: "Orden en que se evalúan; los paréntesis lo cambian" },
      ],
    },
    {
      type: "callout",
      variant: "success",
      text:
        "Contenido verificado en noviembre de 2026 con MDN Web Docs (guía de expresiones y operadores, tabla de precedencia, y las páginas de cada operador) y con la documentación de ESLint. Los resultados de los ejemplos se comprobaron ejecutándolos. Al final hay una tabla con datos que suelen aparecer desactualizados y la lista de fuentes.",
    },

    // ───────────────────────── Qué es un operador ─────────────────────────
    { type: "heading", level: 2, text: "Qué es un operador" },
    {
      type: "paragraph",
      text:
        "Un operador es un símbolo que realiza una operación sobre uno o más valores, llamados operandos. Según cuántos operandos usan se clasifican en unarios (un operando, como `!activo` o `-x`), binarios (dos, como `a + b`) y ternario (tres, el operador condicional `? :`, que veremos con los condicionales). Y según lo que hacen, en las categorías que verás a continuación.",
    },
    {
      type: "table",
      caption: "Categorías de operadores de esta lección",
      headers: ["Categoría", "Operadores", "Ejemplo"],
      rows: [
        ["Aritméticos", "`+`  `-`  `*`  `/`  `%`  `**`", "`7 % 2` → `1`"],
        ["Asignación", "`=`  `+=`  `-=`  `*=`  `/=`  `%=`  `**=`", "`total += 5`"],
        ["Incremento y decremento", "`++`  `--`", "`contador++`"],
        ["Relacionales", "`>`  `<`  `>=`  `<=`", "`edad >= 18`"],
        ["Igualdad", "`==`  `!=`  `===`  `!==`", "`valor === 7`"],
        ["Lógicos", "`!`  `&&`  `||`", "`logueado && activo`"],
      ],
    },

    // ───────────────────────── Aritméticos ─────────────────────────
    { type: "heading", level: 2, text: "Operadores aritméticos y precedencia" },
    {
      type: "paragraph",
      text:
        "Los aritméticos son los de siempre: suma (`+`), resta (`-`), multiplicación (`*`), división (`/`), resto (`%`) y, desde ECMAScript 2016, la potencia (`**`). Para agrupar se usan paréntesis. Como en la aritmética básica, hay un orden: primero lo que está entre paréntesis, luego las potencias, después multiplicaciones y divisiones, y por último sumas y restas, de izquierda a derecha. A ese orden se le llama precedencia, y JavaScript lo respeta.",
    },
    {
      type: "playground",
      title: "Experimento 1 · Precedencia y paréntesis",
      description: "Predice cada resultado antes de ejecutar. Los paréntesis cambian el orden.",
      code: L(
        "console.log(10 - 10 * 3);",
        "console.log((10 - 10) * 3);",
        "console.log(5 + (5 - 10) * 3);",
        "console.log(2 + 3 * 4 ** 2);",
        "console.log((2 + 3) * 4 ** 2);",
        "",
        "// Misma precedencia: de izquierda a derecha",
        "console.log(10 - 5 - 2);",
        "",
        "// La potencia es la excepción: de derecha a izquierda",
        "console.log(2 ** 3 ** 2);",
      ),
      expected: L("-20", "0", "-10", "50", "80", "3", "512"),
    },
    {
      type: "image",
      src: "/img/dia-14/precedencia-operadores.svg",
      alt: "Escalera de precedencia de mayor a menor: paréntesis, postfijos, unarios, potencia, multiplicativos, suma y resta, relacionales, igualdad, AND, OR y fusión de nulos, y asignación. Ejemplo: 2 más 3 por 4 elevado a 2 da 50.",
      caption: "La tabla de precedencia, resumida. Ante la duda, usa paréntesis.",
    },
    {
      type: "callout",
      variant: "info",
      text:
        "Una restricción de la potencia: `-2 ** 2` es un error de sintaxis, porque no queda claro si el signo menos se aplica antes o después. Se escribe con paréntesis: `(-2) ** 2` da `4` y `-(2 ** 2)` da `-4`.",
    },
    { type: "heading", level: 3, text: "División, resto y los casos límite" },
    {
      type: "paragraph",
      text:
        "En la escuela se enseñan cuatro operaciones, pero hay una quinta muy útil. Si divides `5 / 2` obtienes `2.5`, el cociente. El operador `%` devuelve el resto de esa división: `5 % 2` es `1`. Sirve, por ejemplo, para saber si un número es par (`n % 2 === 0`) o para repetir un ciclo.",
    },
    {
      type: "paragraph",
      text:
        "Un matiz de vocabulario: el material suele llamar «módulo» a `%`, pero en JavaScript es un operador de resto (remainder), y no se comporta como el módulo matemático con números negativos: el resultado toma el signo del dividendo. MDN lo explica y propone `((n % d) + d) % d` si necesitas un módulo auténtico. Por otro lado, dividir entre cero no es un error: `1 / 0` da `Infinity`, y `0 / 0` da `NaN`.",
    },
    {
      type: "playground",
      title: "Experimento 2 · División, resto y casos límite",
      description: "El signo del resto sigue al del dividendo; dividir por cero no lanza error.",
      code: L(
        "console.log(5 / 2, 5 % 2);",
        "console.log(-5 % 2, 5 % -2);",
        "",
        "// Un módulo «de verdad» que nunca sale negativo",
        "console.log(((-5 % 2) + 2) % 2);",
        "",
        "console.log(7 % 2 === 0, 8 % 2 === 0);",
        "console.log(5.5 % 2);",
        "console.log(1 / 0, -1 / 0, 0 / 0, 10 % 0);",
      ),
      expected: L(
        "2.5 1",
        "-1 1",
        "1",
        "false true",
        "1.5",
        "Infinity -Infinity NaN NaN",
      ),
    },
    {
      type: "paragraph",
      text:
        "Una última advertencia: el operador `+` también concatena texto, y los demás operadores aritméticos convierten sus operandos a número. Lo vimos con los números y los booleanos: `\"5\" - 2` da 3, pero `\"5\" + 2` da `\"52\"`. Y recuerda que en la lección de números vimos por qué `0.1 + 0.2` no da exactamente `0.3`.",
    },
    {
      type: "playground",
      title: "Experimento 3 · Operadores aritméticos con otros tipos",
      description: "Solo `+` concatena; el resto convierte a número, y lo que no se puede convertir da NaN.",
      code: L(
        'console.log("5" - 2, "5" * "2", "5" + 2);',
        'console.log("a" * 2, true + 1, null + 1, undefined + 1);',
        'console.log(1 + 2 + "3", "1" + 2 + 3);',
        'console.log(+"5" + 2);',
      ),
      expected: L("3 10 52", "NaN 2 1 NaN", "33 123", "7"),
    },

    // ───────────────────────── Asignación ─────────────────────────
    { type: "heading", level: 2, text: "Operadores de asignación" },
    {
      type: "paragraph",
      text:
        "El signo `=` es el operador de asignación: lo que está a la derecha se guarda en lo que está a la izquierda, como en una expresión algebraica. No lo confundas con la comparación, que usa `==` o `===`. Una asignación puede combinarse con una operación aritmética. En lugar de escribir `y = y + 2`, se abrevia a `y += 2`: toma el valor que ya tenía `y`, le suma 2 y guarda el resultado. Lo mismo vale para `-=`, `*=`, `/=`, `%=` y `**=`.",
    },
    {
      type: "playground",
      title: "Experimento 4 · Asignación compuesta",
      description: "Cada línea modifica y acumula sobre el valor anterior de `y`.",
      code: L(
        "let y = 1;",
        "y += 2; console.log(y);",
        "y -= 1; console.log(y);",
        "y *= 3; console.log(y);",
        "y /= 4; console.log(y);",
        "y %= 1; console.log(y);",
        "y **= 2; console.log(y);",
        "",
        '// También con texto',
        'let texto = "a";',
        'texto += "b";',
        "console.log(texto);",
        "",
        "// Asignación lógica (ECMAScript 2021)",
        "let n = null; n ??= 5;",
        "let m = 0; m ||= 7;",
        "let k = 1; k &&= 9;",
        "console.log(n, m, k);",
      ),
      expected: L("3", "2", "6", "1.5", "0.5", "0.25", "ab", "5 7 9"),
    },
    {
      type: "callout",
      variant: "warning",
      text:
        "Estos operadores se llaman de asignación compuesta (operan y asignan). A veces se les llama «de incremento», pero no son lo mismo que `++` y `--`, que veremos ahora: aquellos suman o restan siempre una unidad, y `+=` suma lo que tú indiques. Y como el operador `=` se reserva para asignar, solo funciona con variables declaradas con `let` (con `const` daría error).",
    },

    // ───────────────────────── ++ y -- ─────────────────────────
    { type: "heading", level: 2, text: "Incremento y decremento: ++ y --" },
    {
      type: "paragraph",
      text:
        "Para el caso especial de sumar o restar exactamente 1 existen `++` y `--`. Son operadores unarios, y esa palabra merece una aclaración: «unario» no significa «de uno en uno», sino que actúan sobre un solo operando. De hecho, `!`, `typeof` y el signo menos (`-x`) también son unarios. `i++` equivale a `i += 1`.",
    },
    {
      type: "paragraph",
      text:
        "Se pueden escribir después del nombre (`i++`, forma postfija) o antes (`++i`, forma prefija). Ambas dejan a `i` con el mismo valor final. La diferencia está en el valor que entrega la propia expresión: `i++` devuelve el valor anterior y después incrementa, mientras que `++i` incrementa primero y devuelve el valor nuevo. Se nota cuando la expresión se usa dentro de otra, por ejemplo en un `console.log`.",
    },
    {
      type: "image",
      src: "/img/dia-14/prefijo-postfijo.svg",
      alt: "Con i valiendo 2, i++ devuelve 2 y luego i pasa a 3. ++i hace que i pase a 3 y devuelve 3. En ambos casos i queda en 3.",
      caption: "i++ entrega el valor anterior; ++i entrega el nuevo.",
    },
    {
      type: "playground",
      title: "Experimento 5 · Postfijo frente a prefijo",
      description: "Observa qué imprime cada expresión y cuánto vale `i` después.",
      code: L(
        "let i = 2;",
        "console.log(i++);   // devuelve 2, luego i vale 3",
        "console.log(i);",
        "console.log(++i);   // i vale 4 y devuelve 4",
        "console.log(i);",
        "",
        "// Con decremento, igual",
        "console.log(i--, i, --i, i);",
      ),
      expected: L("2", "3", "4", "4", "4 3 2 2"),
    },
    {
      type: "callout",
      variant: "info",
      text:
        "Recomendación práctica: usa `++` y `--` como instrucciones aparte (`i++;`), donde postfijo y prefijo dan lo mismo, y evita ponerlos dentro de expresiones más grandes, porque dificultan la lectura y se prestan a errores. Algunas guías de estilo prohíben directamente `++` y `--` (la regla `no-plusplus` de ESLint) y piden `i += 1`.",
    },
    { type: "heading", level: 3, text: "Los unarios + y -" },
    {
      type: "paragraph",
      text:
        "El signo `-` delante de un valor lo niega (`-x`), y el signo `+` delante de un valor lo convierte a número: `+\"5\"` es `5`. Esta segunda forma es una manera corta, aunque poco legible, de convertir. `Number()` expresa mejor la intención.",
    },
    {
      type: "playground",
      title: "Experimento 6 · Operadores unarios",
      description: "Un solo operando: convertir, negar, mirar el tipo.",
      code: L(
        'console.log(+"5", -"3", +true, +"", +"abc");',
        'console.log(typeof +"5", -(-4));',
        "console.log(typeof typeof 5, !true, !0);",
      ),
      expected: L("5 -3 1 0 NaN", "number 4", "string false true"),
    },

    // ───────────────────────── Relacionales ─────────────────────────
    { type: "heading", level: 2, text: "Operadores relacionales" },
    {
      type: "paragraph",
      text:
        "Los operadores relacionales permiten comparar valores, y siempre devuelven un booleano: mayor que (`>`), menor que (`<`), mayor o igual (`>=`) y menor o igual (`<=`). Una expresión que se evalúa a `true` o `false` es lo que en programación se llama una condición, y es la pieza que usarán los condicionales de la próxima lección. Fíjate en la diferencia entre las versiones con `=` y las que no lo llevan: `7 < 7` es `false`, pero `7 <= 7` es `true`, porque la segunda incluye al valor con el que se compara.",
    },
    {
      type: "paragraph",
      text:
        "El material suele ejemplificarlos solo con números. Con texto, la comparación es alfabética según el orden de los caracteres (por eso `\"10\" < \"9\"` es `true`), y las mayúsculas van antes que las minúsculas. Con tipos distintos, se convierten a número. Y una trampa: las comparaciones no se encadenan. `1 < 2 < 3` no pregunta si 2 está entre 1 y 3: primero evalúa `1 < 2`, que da `true`, y luego compara `true < 3`.",
    },
    {
      type: "playground",
      title: "Experimento 7 · Comparaciones de orden",
      description: "Con números, con texto y con tipos mezclados.",
      code: L(
        "console.log(8 > 9, 9 > 8);",
        "console.log(9 >= 8, 8 >= 9);",
        "console.log(7 < 7, 7 <= 7);",
        "",
        "// Con texto: orden de los caracteres",
        'console.log("a" < "b", "Z" < "a", "a" < "B");',
        'console.log("10" < "9", "10" < 9);',
        'console.log("2" > 1, NaN <= NaN);',
        "",
        "// Las comparaciones no se encadenan",
        "console.log(1 < 2 < 3, 3 > 2 > 1);",
      ),
      expected: L(
        "false true",
        "true false",
        "false true",
        "true true false",
        "true false",
        "true false",
        "true false",
      ),
    },

    // ───────────────────────── Igualdad ─────────────────────────
    { type: "heading", level: 2, text: "Igualdad: =, == y ===" },
    {
      type: "paragraph",
      text:
        "Con el signo igual hay tres casos que conviene no mezclar. Un igual (`=`) es asignación. Dos iguales (`==`) y tres iguales (`===`) comparan. La explicación típica es que `==` compara solo el valor y `===` compara también el tipo. Es una buena primera aproximación, pero incompleta: `==` no «ignora» el tipo, sino que convierte los operandos al mismo tipo siguiendo unas reglas de conversión y después los compara. El operador `===` no convierte nada: si los tipos son distintos, el resultado es `false`.",
    },
    {
      type: "paragraph",
      text:
        "Por eso `\"7\" == 7` es `true` (el texto se convierte a número) y `\"7\" === 7` es `false`. Se suele añadir que `0 == false` da `true` «porque ambos tienden a falso». La conclusión es correcta, pero el motivo no lo es: `false` se convierte en `0`, y se comparan dos números. Prueba: `null == false` es `false` aunque ambos sean falsy, y `[] == false` es `true` aunque `[]` sea truthy. Lo truthy y lo falsy de la lección de booleanos no interviene en `==`.",
    },
    {
      type: "image",
      src: "/img/dia-14/igualdad-estricta.svg",
      alt: "Tabla que compara el resultado de == y === con siete pares de valores. == convierte tipos y por eso 7 como texto y 7 como número son iguales, 0 y false son iguales, null y undefined son iguales, la cadena vacía y 0 son iguales, y un arreglo vacío y false son iguales. null y false no son iguales con ninguno. NaN no es igual a nada.",
      caption: "== aplica reglas de conversión; === no convierte.",
    },
    {
      type: "playground",
      title: "Experimento 8 · == frente a ===",
      description: "Los resultados de `==` salen de reglas de conversión, no de lo truthy o lo falsy.",
      code: L(
        'console.log("7" == 7, "7" === 7);',
        "console.log(0 == false, 0 === false);",
        "console.log(null == undefined, null === undefined);",
        'console.log(null == false, "" == 0, [] == false);',
        "console.log(NaN == NaN, NaN === NaN, Object.is(NaN, NaN));",
        "",
        "// != y !== son los negados",
        'console.log(7 != "7", 7 !== "7");',
      ),
      expected: L(
        "true false",
        "true false",
        "true false",
        "false true true",
        "false false true",
        "false true",
      ),
    },
    {
      type: "callout",
      variant: "info",
      text:
        "La recomendación general es usar siempre `===` y `!==`: no hay conversiones sorpresivas y aseguras que el dato sea del tipo esperado. Una excepción habitual y aceptada es `valor == null`, que es `true` tanto para `null` como para `undefined`. Y recuerda que `NaN` no es igual a nada, ni a sí mismo: se detecta con `Number.isNaN()`. ESLint tiene la regla `eqeqeq` para exigirlo.",
    },

    // ───────────────────────── Lógicos ─────────────────────────
    { type: "heading", level: 2, text: "Operadores lógicos" },
    {
      type: "paragraph",
      text:
        "Los operadores lógicos permiten combinar condiciones. Hay tres: negación (NOT), conjunción (AND) y disyunción (OR). En otros lenguajes se escriben con las palabras `not`, `and` y `or`; en JavaScript se escriben con símbolos: `!`, `&&` y `||`. La negación `!` invierte el valor: lo verdadero pasa a falso y viceversa. El OR `||` es verdadero cuando al menos una de las condiciones se cumple. El AND `&&` exige que todas se cumplan.",
    },
    {
      type: "image",
      src: "/img/dia-14/cortocircuito-logicos.svg",
      alt: "Tabla de verdad de AND: verdadero solo si ambos son verdaderos. Tabla de verdad de OR: verdadero si al menos uno es verdadero. NOT invierte el valor. Cuadro de cortocircuito: false AND f no llama a f, y true OR f tampoco.",
      caption: "Tablas de verdad de &&, || y !, y el cortocircuito.",
    },
    {
      type: "playground",
      title: "Experimento 9 · Combinar condiciones",
      description: "Cada línea combina comparaciones, igual que lo harán los condicionales.",
      code: L(
        '// NOT: invierte el valor (y convierte a booleano antes)',
        'console.log(!true, !false, !0, !"hola");',
        "",
        "// OR: basta con que una se cumpla",
        'console.log(9 == "9" || 9 === "9");',
        'console.log(9 === "9" || "a" === "b");',
        "",
        "// AND: deben cumplirse todas",
        'console.log(9 === 9 && 9 === "9");',
        'console.log("9" === "9" && 9 === 9);',
      ),
      expected: L("false true true false", "true", "false", "false", "true"),
    },
    { type: "heading", level: 3, text: "Cortocircuito: no siempre se evalúa todo" },
    {
      type: "paragraph",
      text:
        "`&&` y `||` evalúan de izquierda a derecha y se detienen en cuanto el resultado ya está decidido: si el lado izquierdo de `&&` es falso, el derecho ni se mira; si el izquierdo de `||` es verdadero, tampoco. Es el cortocircuito, y se usa a diario (por ejemplo, `usuario && usuario.nombre` no lee `nombre` si no hay usuario). Y, como vimos en la lección de booleanos, estos operadores en realidad devuelven uno de sus operandos, no necesariamente `true` o `false`. Por último, `&&` tiene mayor precedencia que `||`, así que conviene usar paréntesis para dejar clara la intención.",
    },
    {
      type: "playground",
      title: "Experimento 10 · Cortocircuito y precedencia lógica",
      description: "La función ruido() muestra cuándo se evalúa cada lado.",
      code: L(
        "function ruido(valor) {",
        '  console.log("evalúa", valor);',
        "  return valor;",
        "}",
        "",
        "console.log(ruido(false) && ruido(true));",
        "console.log(ruido(true) || ruido(false));",
        "console.log(ruido(true) && ruido(false));",
        "",
        "// && va antes que ||",
        "console.log(true || false && false, (true || false) && false);",
      ),
      expected: L(
        "evalúa false",
        "false",
        "evalúa true",
        "true",
        "evalúa true",
        "evalúa false",
        "false",
        "true false",
      ),
    },
    {
      type: "callout",
      variant: "warning",
      text:
        "No confundas `&&` y `||` con `&` y `|`, que existen y son operadores bit a bit, un tema avanzado que no necesitas ahora. Además, el operador de fusión de nulos `??` que ya viste no puede mezclarse con `||` o `&&` sin paréntesis: JavaScript lo rechaza como error de sintaxis.",
    },

    // ───────────────────────── Datos que cambian ─────────────────────────
    { type: "heading", level: 2, text: "Datos que suelen aparecer desactualizados" },
    {
      type: "table",
      caption: "Material antiguo frente a información verificada",
      headers: ["Suele decirse", "Información verificada"],
      rows: [
        [
          "`%` es el módulo.",
          "Es el operador de resto: toma el signo del dividendo (`-5 % 2` es `-1`). Para un módulo matemático se usa `((n % d) + d) % d`.",
        ],
        [
          "El orden es paréntesis, potencias y raíces, producto y división, suma y resta.",
          "Es una buena base. En JavaScript la potencia es `**` (de derecha a izquierda), `%` va con `*` y `/`, y no hay operador de raíz (se usa `Math.sqrt()`).",
        ],
        [
          "`==` compara solo el valor y `===` valor y tipo.",
          "`==` convierte los tipos con unas reglas propias y luego compara; `===` no convierte nada.",
        ],
        [
          "`0 == false` es `true` porque ambos «tienden a falso».",
          "Es `true` porque `false` se convierte a `0`. `null == false` es `false` y `[] == false` es `true`, así que lo falsy no es el motivo.",
        ],
        [
          "`+=` y `-=` son operadores de incremento y decremento.",
          "Son asignaciones compuestas. El incremento y el decremento son `++` y `--`, que suman o restan siempre 1.",
        ],
        [
          "«Unario» significa que va de uno en uno.",
          "Unario significa que tiene un solo operando. `!x`, `-x`, `typeof x` y `x++` son unarios.",
        ],
        [
          "`i++` e `++i` se diferencian en el momento de ejecución.",
          "La diferencia es el valor que entrega la expresión (el anterior o el nuevo). El efecto final sobre la variable es el mismo.",
        ],
        [
          "`&&` y `||` devuelven `true` o `false`.",
          "Devuelven uno de sus operandos y hacen cortocircuito. Con booleanos el resultado sí es `true` o `false`.",
        ],
        [
          "`1 < 2 < 3` comprueba que 2 está entre 1 y 3.",
          "No se encadena: se evalúa como `(1 < 2) < 3`. Para un rango se escribe `x > 1 && x < 3`.",
        ],
      ],
    },

    // ───────────────────────── FAQ ─────────────────────────
    {
      type: "accordion",
      title: "Preguntas frecuentes de esta lección",
      items: [
        {
          title: "¿Cuándo sirve usar `==`?",
          text:
            "Casi nunca. La excepción habitual es `valor == null`, que cubre `null` y `undefined` a la vez. Para todo lo demás, `===`.",
        },
        {
          title: "¿Cómo sé si un número es par o impar?",
          text:
            "Con el resto: `n % 2 === 0` es par. Para impar, `n % 2 !== 0` (ojo con los negativos: `-3 % 2` da `-1`, por eso se compara con `!== 0` y no con `=== 1`).",
        },
        {
          title: "¿Qué diferencia hay entre `x ** 2` y `Math.pow(x, 2)`?",
          text:
            "Hacen lo mismo. `**` es más corto y llegó con ECMAScript 2016. La raíz cuadrada no tiene operador: se usa `Math.sqrt(x)`, o `x ** 0.5`.",
        },
        {
          title: "¿Cómo obtengo la división entera?",
          text:
            "Con `Math.trunc(a / b)`. `Math` es un objeto con funciones matemáticas que veremos más adelante.",
        },
        {
          title: "¿Y el operador `? :` que se menciona?",
          text:
            "Es el operador ternario (o condicional): `condicion ? valorSiVerdadero : valorSiFalso`. Lo veremos en la próxima lección, junto con `if` y `switch`.",
        },
        {
          title: "¿Los operadores funcionan con `BigInt`?",
          text:
            "Sí, pero no se pueden mezclar `bigint` y `number` en una operación aritmética: lanza un `TypeError`, como vimos en la lección de números.",
        },
      ],
    },

    // ───────────────────────── Cierre ─────────────────────────
    { type: "heading", level: 2, text: "Cierre" },
    {
      type: "paragraph",
      text:
        "Con esto tienes los operadores importantes para empezar a escribir programas con algo de lógica: aritméticos, asignación, incremento y decremento, relacionales, igualdad y lógicos. Sabes cómo se evalúa el orden, por qué se prefiere `===` y qué es el cortocircuito. En la próxima lección empezamos a controlar el flujo de un programa: los condicionales (`if`, `else`, `switch`) y, después, los bucles.",
    },
    {
      type: "checklist",
      title: "Antes de pasar al Día 15, verifica que puedes explicar…",
      items: [
        "Qué da `10 - 10 * 3` frente a `(10 - 10) * 3`, y en qué orden se evalúa `2 ** 3 ** 2`.",
        "Qué hace `%`, por qué es resto y no módulo, y qué da `-5 % 2`.",
        "Qué hace `y += 2` y en qué se diferencia de `y++`.",
        "Qué significa que un operador sea unario y qué imprimen `i++` y `++i` con `i` valiendo 2.",
        "Por qué `\"10\" < \"9\"` es `true` y por qué `1 < 2 < 3` no comprueba un rango.",
        "Qué diferencia hay entre `==` y `===`, y por qué `0 == false` es `true` pero `null == false` no.",
        "Cuándo se cumple `a && b`, cuándo `a || b`, y qué es el cortocircuito.",
      ],
    },
    { type: "heading", level: 3, text: "Fuentes consultadas (noviembre de 2026)" },
    {
      type: "list",
      items: [
        "[MDN: Expresiones y operadores (guía)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_operators)",
        "[MDN: Operadores (referencia)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators)",
        "[MDN: Precedencia de operadores](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_precedence)",
        "[MDN: Resto (%)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Remainder)",
        "[MDN: Exponenciación (**)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Exponentiation)",
        "[MDN: Adición (+)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Addition)",
        "[MDN: Asignación (=)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Assignment)",
        "[MDN: Asignación de adición (+=)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Addition_assignment)",
        "[MDN: Incremento (++)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Increment)",
        "[MDN: Decremento (--)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Decrement)",
        "[MDN: Más unario (+)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Unary_plus)",
        "[MDN: Negación unaria (-)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Unary_negation)",
        "[MDN: Menor que (<)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Less_than)",
        "[MDN: Mayor que (>)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Greater_than)",
        "[MDN: Igualdad (==)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Equality)",
        "[MDN: Igualdad estricta (===)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Strict_equality)",
        "[MDN: Comparaciones de igualdad y semejanza](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Equality_comparisons_and_sameness)",
        "[MDN: AND lógico (&&)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_AND)",
        "[MDN: OR lógico (||)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_OR)",
        "[MDN: NOT lógico (!)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_NOT)",
        "[ESLint: eqeqeq](https://eslint.org/docs/latest/rules/eqeqeq)",
        "[ESLint: no-plusplus](https://eslint.org/docs/latest/rules/no-plusplus)",
        "[ESLint: no-mixed-operators](https://eslint.org/docs/latest/rules/no-mixed-operators)",
      ],
    },
  ],
  selfCheck: [
    {
      question: "¿Qué devuelve `10 - 10 * 3`?",
      options: ["0", "-20", "30", "-30"],
      correctIndex: 1,
      explanation:
        "La multiplicación va antes: 10 * 3 es 30, y 10 - 30 es -20. Con `(10 - 10) * 3` daría 0.",
    },
    {
      question: "¿Qué devuelve `2 ** 3 ** 2`?",
      options: ["64", "512", "36", "18"],
      correctIndex: 1,
      explanation:
        "La potencia se evalúa de derecha a izquierda: 3 ** 2 es 9 y 2 ** 9 es 512.",
    },
    {
      question: "¿Qué devuelve `-5 % 2` en JavaScript?",
      options: ["1", "-1", "0", "2"],
      correctIndex: 1,
      explanation:
        "`%` es un operador de resto: el resultado tiene el signo del dividendo, así que da -1.",
    },
    {
      question: "¿Qué hace `y += 3`?",
      options: [
        "Compara y con 3",
        "Suma 3 al valor actual de y y lo guarda en y",
        "Siempre suma 1 a y",
        "Crea una constante",
      ],
      correctIndex: 1,
      explanation: "Es la abreviatura de `y = y + 3` (asignación compuesta).",
    },
    {
      question: "Con `let i = 2`, ¿qué imprime `console.log(i++)` y cuánto vale `i` después?",
      options: [
        "Imprime 3 y vale 3",
        "Imprime 2 y vale 3",
        "Imprime 2 y vale 2",
        "Imprime 3 y vale 2",
      ],
      correctIndex: 1,
      explanation:
        "El postfijo devuelve el valor anterior (2) y luego incrementa. Con `++i` imprimiría 3.",
    },
    {
      question: "¿Qué significa que un operador sea «unario»?",
      options: [
        "Que suma de uno en uno",
        "Que actúa sobre un solo operando",
        "Que solo funciona con números",
        "Que devuelve un booleano",
      ],
      correctIndex: 1,
      explanation:
        "Unario significa un operando: `!x`, `-x`, `typeof x` o `x++`.",
    },
    {
      question: "¿Qué devuelve `\"10\" < \"9\"`?",
      options: ["false", "true", "Un error", "undefined"],
      correctIndex: 1,
      explanation:
        "Con dos textos se compara carácter a carácter: \"1\" va antes que \"9\", así que es `true`.",
    },
    {
      question: "¿Qué devuelve `1 < 2 < 3`... y `3 > 2 > 1`?",
      options: [
        "true y true",
        "true y false",
        "false y true",
        "false y false",
      ],
      correctIndex: 1,
      explanation:
        "Se evalúan como `(1 < 2) < 3` → `true < 3` → `true`, y `(3 > 2) > 1` → `true > 1` → `false`.",
    },
    {
      question: "¿Por qué `0 == false` es `true`?",
      options: [
        "Porque ambos son valores falsy",
        "Porque `false` se convierte a 0 y se comparan dos números",
        "Porque == compara solo los tipos",
        "Porque 0 es un booleano",
      ],
      correctIndex: 1,
      explanation:
        "`==` aplica reglas de conversión. No es por lo falsy: `null == false` es `false` y `[] == false` es `true`.",
    },
    {
      question: "¿Qué ocurre con `ruido(false) && ruido(true)`?",
      options: [
        "Se ejecutan ambas llamadas",
        "Solo se ejecuta la primera: el cortocircuito evita la segunda",
        "Solo se ejecuta la segunda",
        "Lanza un error",
      ],
      correctIndex: 1,
      explanation:
        "Si el lado izquierdo de `&&` es falso, el resultado ya está decidido y el derecho no se evalúa.",
    },
  ],
};
