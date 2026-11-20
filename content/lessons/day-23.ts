import type { Lesson } from "@/lib/types";

// Une líneas de código sin tener que escapar backticks ni `${}` dentro de template literals.
const L = (...lines: string[]) => lines.join("\n");

// Contenido validado contra fuentes actuales en noviembre de 2026 (ver sección "Fuentes").
export const day23: Lesson = {
  day: 23,
  slug: "prototipos-la-base-de-la-poo",
  title: "Prototipos: la base de la POO en JavaScript",
  section: "Programación orientada a objetos",
  estimatedMinutes: 90,
  icon: "🧬",
  objectives: [
    "Explicar los conceptos básicos de la programación orientada a objetos: modelo (clase), instancia, atributos y métodos",
    "Escribir una función constructora y crear instancias con `new`",
    "Explicar qué es un prototipo y cómo la cadena de prototipos resuelve la búsqueda de propiedades",
    "Mover los métodos al prototipo para compartirlos entre instancias y evitar copias repetidas",
    "Reconocer que `class` es una forma más cómoda de escribir constructores y prototipos",
  ],
  blocks: [
    // ───────────────────────── Apertura ─────────────────────────
    {
      type: "paragraph",
      text:
        "Llegó uno de los temas más importantes del lenguaje: los prototipos. JavaScript es un lenguaje multiparadigma: permite programar de forma funcional, orientada a objetos y de otras maneras. La programación orientada a objetos (POO) es probablemente el paradigma más extendido, pero en JavaScript funciona de forma distinta a la de lenguajes como Java: se basa en prototipos. Desde ECMAScript 2015 existe la palabra `class`, que verás en la próxima lección, pero es una forma más cómoda de escribir lo que el lenguaje ya hacía con constructores y prototipos. Por eso conviene entender primero la base.",
    },
    {
      type: "keyFacts",
      items: [
        { value: "Prototipo", label: "El objeto del que otro objeto hereda propiedades y métodos" },
        { value: "new", label: "Crea una instancia a partir de una función constructora" },
        { value: "Animal.prototype", label: "Donde se ponen los métodos que comparten todas las instancias" },
        { value: "Cadena", label: "Si no está en el objeto, se busca en su prototipo, y así hacia arriba" },
        { value: "this", label: "Dentro del constructor es la instancia que se está creando" },
        { value: "class", label: "Sintaxis más cómoda sobre constructores y prototipos" },
      ],
    },
    {
      type: "callout",
      variant: "success",
      text:
        "Contenido verificado en noviembre de 2026 con MDN Web Docs (herencia y cadena de prototipos, `Object.getPrototypeOf`, `Object.hasOwn`, `new` y clases) y con la documentación de ESLint. Los resultados de los ejemplos se comprobaron ejecutándolos. Al final hay una tabla con datos que suelen aparecer desactualizados y la lista de fuentes.",
    },

    // ───────────────────────── Conceptos ─────────────────────────
    { type: "heading", level: 2, text: "Los conceptos básicos de la POO" },
    {
      type: "paragraph",
      text:
        "Tres ideas bastan para empezar. Una clase es un modelo, un molde a partir del cual se crean objetos del mismo tipo. Un objeto creado a partir de ese modelo es una instancia: una copia concreta, con sus propios valores. Y los objetos tienen dos clases de miembros: los atributos, que son sus características (en la práctica, variables dentro de un objeto), y los métodos, que son sus acciones (funciones dentro de un objeto). Los nombres de los métodos suelen ser verbos: `getElementById`, `log`, `error`, `sonar`.",
    },
    {
      type: "image",
      src: "/img/dia-23/clase-objeto-instancia.svg",
      alt: "A la izquierda, el modelo Animal, con los atributos nombre y genero y los métodos sonar y saludar. A la derecha, dos instancias creadas con new a partir de ese modelo: snoopy, con nombre Snoopy y genero macho, y lola, con nombre Lola Bunny y genero hembra. Abajo, cuatro definiciones: clase o modelo, instancia, atributos y métodos.",
      caption: "Un modelo, varias instancias.",
    },
    {
      type: "paragraph",
      text:
        "Estos conceptos son los mismos en cualquier lenguaje orientado a objetos. Lo que cambia entre lenguajes es la sintaxis, y en JavaScript, además, lo que ocurre por debajo: no hay clases «de verdad» como en Java, hay objetos que apuntan a otros objetos, que son sus prototipos.",
    },

    // ───────────────────────── Literales ─────────────────────────
    { type: "heading", level: 2, text: "Un objeto literal ya tiene un prototipo" },
    {
      type: "paragraph",
      text:
        "Imagina un objeto `animal` con un atributo `nombre` y un método `sonar`, escrito como objeto literal con la sintaxis que viste en las lecciones anteriores. Si lo imprimes en la consola del navegador y lo expandes, verás una propiedad interna llamada `[[Prototype]]` (algunas herramientas la muestran como `__proto__`). Todo objeto tiene un prototipo, y el de un objeto literal es `Object.prototype`, el objeto más básico del lenguaje. Por eso un objeto literal tiene métodos que tú no escribiste, como `toString`: los hereda de su prototipo.",
    },
    {
      type: "playground",
      title: "Experimento 1 · El prototipo de un objeto literal",
      description: "`toString` no es una propiedad propia de `animal`: se hereda de `Object.prototype`.",
      code: L(
        "const animal = {",
        '  nombre: "Snoopy",',
        "  sonar() {",
        '    console.log("hago sonidos porque estoy vivo");',
        "  },",
        "};",
        "",
        "animal.sonar();",
        "console.log(Object.getPrototypeOf(animal) === Object.prototype);",
        'console.log(typeof animal.toString, Object.hasOwn(animal, "toString"));',
      ),
      expected: L("hago sonidos porque estoy vivo", "true", "function false"),
    },
    {
      type: "paragraph",
      text:
        "Un objeto literal sirve para un solo objeto. Si necesitas otro animal, tendrías que copiar y pegar la estructura y cambiar los valores. Eso no escala. Para crear muchos objetos con la misma forma se necesita un modelo, y en JavaScript ese modelo es, desde siempre, una función constructora.",
    },

    // ───────────────────────── Constructora ─────────────────────────
    { type: "heading", level: 2, text: "La función constructora y new" },
    {
      type: "paragraph",
      text:
        "Una función constructora es una función normal que se usa para construir objetos. Por convención, su nombre empieza con mayúscula (`Animal`), a diferencia de los objetos y variables, que usan minúscula inicial. Recibe como parámetros los valores de los atributos y dentro usa `this`, que es la instancia que se está creando, para asignarlos. Para crear una instancia se llama con la palabra `new`.",
    },
    {
      type: "image",
      src: "/img/dia-23/new-paso-a-paso.svg",
      alt: "Cuatro pasos al ejecutar new Animal con Snoopy y macho. Primero se crea un objeto vacío. Segundo, se enlaza su prototipo con Animal.prototype. Tercero, se ejecuta la función con this apuntando al objeto nuevo, y se asignan nombre y genero. Cuarto, se devuelve ese objeto. Sin new, this no apunta a un objeto nuevo: en modo estricto da un TypeError y sin modo estricto asigna las propiedades al objeto global.",
      caption: "Lo que hace new, paso a paso.",
    },
    {
      type: "playground",
      title: "Experimento 2 · Una función constructora con atributos y métodos",
      description: "Cada instancia tiene sus atributos. `instanceof` comprueba de qué constructor viene, y `constructor` guarda una referencia a él.",
      code: L(
        "function Animal(nombre, genero) {",
        "  this.nombre = nombre;",
        "  this.genero = genero;",
        "  this.sonar = function () {",
        '    console.log("hago sonidos porque estoy vivo");',
        "  };",
        "  this.saludar = function () {",
        '    console.log("hola, me llamo " + this.nombre);',
        "  };",
        "}",
        "",
        'const snoopy = new Animal("Snoopy", "macho");',
        'const lola = new Animal("Lola Bunny", "hembra");',
        "snoopy.sonar();",
        "snoopy.saludar();",
        "lola.saludar();",
        "",
        "console.log(snoopy instanceof Animal, snoopy.constructor === Animal, typeof snoopy);",
        'console.log(Object.keys(snoopy).join(","));',
      ),
      expected: L(
        "hago sonidos porque estoy vivo",
        "hola, me llamo Snoopy",
        "hola, me llamo Lola Bunny",
        "true true object",
        "nombre,genero,sonar,saludar",
      ),
    },
    { type: "heading", level: 3, text: "Reglas del constructor" },
    {
      type: "paragraph",
      text:
        "Dentro de una función constructora, los atributos y los métodos «cuelgan» de `this`. Y la sintaxis abreviada de los objetos literales no sirve ahí: `this.sonar() { ... }` es un error de sintaxis; hay que escribir `this.sonar = function () { ... }`. Tampoco se puede usar una función flecha como constructor, porque llamarla con `new` lanza un `TypeError` (lo viste en la lección de funciones flecha). Y no hay que olvidar `new`: sin él, la función no crea ningún objeto, y `this` no es una instancia nueva. En modo estricto, eso da un `TypeError`; sin modo estricto, las propiedades se asignan al objeto global sin avisar, un error difícil de encontrar.",
    },
    {
      type: "playground",
      title: "Experimento 3 · Tres errores típicos con los constructores",
      description: "Los tres fallan. La directiva `\"use strict\"` activa el modo estricto, donde olvidar `new` produce un error claro.",
      code: L(
        "// 1. La sintaxis abreviada de método no vale dentro del constructor",
        "try {",
        '  new Function("function F() { this.m() { return 1; } }");',
        "} catch (e) {",
        '  console.log("this.m() { } →", e.name);',
        "}",
        "",
        "// 2. Una flecha no puede ser el constructor",
        "const Flecha = () => {};",
        "try {",
        "  new Flecha();",
        "} catch (e) {",
        '  console.log("new con flecha →", e.name);',
        "}",
        "",
        "// 3. Olvidar new (en modo estricto)",
        "try {",
        `  new Function('"use strict"; function A(n) { this.n = n; } A("x");')();`,
        "} catch (e) {",
        '  console.log("sin new →", e.name);',
        "}",
      ),
      expected: L(
        "this.m() { } → SyntaxError",
        "new con flecha → TypeError",
        "sin new → TypeError",
      ),
    },

    // ───────────────────────── Duplicación ─────────────────────────
    { type: "heading", level: 2, text: "El problema: cada instancia duplica los métodos" },
    {
      type: "paragraph",
      text:
        "Con los métodos escritos dentro del constructor, cada vez que haces `new`, JavaScript vuelve a crear las funciones: cada instancia tiene su propia copia de `sonar` y de `saludar`. Con dos animales no se nota. Con cien, hay cien copias de cada función en memoria, todas idénticas. Imagina un videojuego donde se crean personajes constantemente, o una aplicación con miles de usuarios conectados: ese desperdicio se acumula.",
    },
    {
      type: "playground",
      title: "Experimento 4 · Cada instancia tiene su propia copia del método",
      description: "Con 100 instancias hay 100 funciones `sonar` distintas. Un `Set` solo guarda valores únicos, así que su tamaño cuenta cuántas funciones diferentes hay.",
      code: L(
        "function Animal(nombre) {",
        "  this.nombre = nombre;",
        '  this.sonar = function () { return "hago sonidos"; };',
        "}",
        "",
        'const snoopy = new Animal("Snoopy");',
        'const lola = new Animal("Lola");',
        "console.log(snoopy.sonar === lola.sonar);",
        "",
        "const muchos = [];",
        "for (let i = 0; i < 100; i++) {",
        '  muchos.push(new Animal("a" + i));',
        "}",
        "console.log(new Set(muchos.map((a) => a.sonar)).size);",
      ),
      expected: L("false", "100"),
    },
    {
      type: "callout",
      variant: "info",
      text:
        "Una precisión sobre las flechas. A veces se dice que dentro de un constructor no se pueden usar funciones flecha para los métodos. Sí se puede: una flecha escrita dentro del constructor toma el `this` del constructor, es decir, la instancia, y funciona. Pero sigue creando una función nueva por instancia, así que no resuelve el problema de la duplicación.",
    },
    {
      type: "playground",
      title: "Experimento 5 · Una flecha dentro del constructor",
      description: "Funciona, porque la flecha toma el `this` del constructor. Pero cada instancia sigue teniendo su propia función.",
      code: L(
        "function Persona(nombre) {",
        "  this.nombre = nombre;",
        '  this.saludar = () => "hola, " + this.nombre;',
        "}",
        "",
        'const a = new Persona("Ana");',
        'const b = new Persona("Luis");',
        "console.log(a.saludar(), b.saludar());",
        "console.log(a.saludar === b.saludar);",
      ),
      expected: L("hola, Ana hola, Luis", "false"),
    },

    // ───────────────────────── Prototipo ─────────────────────────
    { type: "heading", level: 2, text: "La solución: los métodos van en el prototipo" },
    {
      type: "paragraph",
      text:
        "Toda función normal tiene una propiedad `prototype`, un objeto que se convierte en el prototipo de las instancias creadas con `new`. La solución es dejar en el constructor solo los atributos (que son distintos en cada instancia) y asignar los métodos a ese objeto: `Animal.prototype.sonar = function () { ... }`. Así existe una sola copia de cada método, y todas las instancias la comparten a través de su prototipo. Es lo que hace el lenguaje por debajo cuando escribes una clase.",
    },
    {
      type: "image",
      src: "/img/dia-23/metodos-instancia-vs-prototipo.svg",
      alt: "A la izquierda, con los métodos dentro del constructor, cada instancia tiene sus propias copias de sonar y saludar: dos instancias tienen cuatro funciones. A la derecha, con los métodos en Animal.prototype, hay una sola copia de cada función y las dos instancias la comparten a través de su prototipo: dos funciones en total.",
      caption: "Con los métodos en el prototipo, las instancias comparten una sola copia.",
    },
    {
      type: "playground",
      title: "Experimento 6 · Métodos en el prototipo",
      description: "Todo sigue funcionando igual, pero ahora los métodos no son propiedades propias de las instancias, y `Object.hasOwn` lo demuestra.",
      code: L(
        "function Animal(nombre, genero) {",
        "  this.nombre = nombre;",
        "  this.genero = genero;",
        "}",
        "",
        "Animal.prototype.sonar = function () {",
        '  console.log("hago sonidos porque estoy vivo");',
        "};",
        "Animal.prototype.saludar = function () {",
        '  console.log("hola, me llamo " + this.nombre);',
        "};",
        "",
        'const snoopy = new Animal("Snoopy", "macho");',
        'const lola = new Animal("Lola Bunny", "hembra");',
        "snoopy.sonar();",
        "snoopy.saludar();",
        "lola.saludar();",
        "",
        "console.log(snoopy.sonar === lola.sonar);",
        'console.log(Object.keys(snoopy).join(","));',
        'console.log(Object.hasOwn(snoopy, "nombre"), Object.hasOwn(snoopy, "sonar"), "sonar" in snoopy);',
        "",
        "const muchos = [];",
        "for (let i = 0; i < 100; i++) {",
        '  muchos.push(new Animal("a" + i, "macho"));',
        "}",
        "console.log(new Set(muchos.map((a) => a.sonar)).size);",
      ),
      expected: L(
        "hago sonidos porque estoy vivo",
        "hola, me llamo Snoopy",
        "hola, me llamo Lola Bunny",
        "true",
        "nombre,genero",
        "true false true",
        "1",
      ),
    },

    // ───────────────────────── Cadena ─────────────────────────
    { type: "heading", level: 2, text: "La cadena de prototipos" },
    {
      type: "paragraph",
      text:
        "Cuando pides una propiedad de un objeto, JavaScript la busca primero en el propio objeto. Si no está, la busca en su prototipo; si tampoco, en el prototipo de ese, y así hasta llegar a `null`. Esa es la cadena de prototipos. Para `snoopy`, la cadena es: `snoopy`, `Animal.prototype`, `Object.prototype` y `null`. Por eso `snoopy.sonar()` funciona aunque `sonar` no esté en `snoopy`, y por eso `snoopy.toString()` también funciona. Si la propiedad no aparece en ningún eslabón, el resultado es `undefined`.",
    },
    {
      type: "image",
      src: "/img/dia-23/cadena-de-prototipos.svg",
      alt: "El objeto snoopy tiene como prototipo a Animal.prototype, que a su vez tiene como prototipo a Object.prototype, cuyo prototipo es null. snoopy.nombre se encuentra en snoopy, snoopy.sonar en Animal.prototype, snoopy.toString en Object.prototype, y snoopy.volar no se encuentra en ningún eslabón y devuelve undefined.",
      caption: "Si no está en el objeto, JavaScript sube por la cadena.",
    },
    {
      type: "paragraph",
      text:
        "Dos nombres que se confunden. `prototype` es una propiedad de las funciones constructoras: el objeto que se usará como prototipo de sus instancias. El prototipo real de un objeto, en cambio, se llama internamente `[[Prototype]]` y se lee con `Object.getPrototypeOf(objeto)`. Para una instancia creada con `new Animal()`, ambos apuntan al mismo objeto. La propiedad `__proto__` también lo expone, pero MDN la marca como obsoleta: usa `Object.getPrototypeOf`. Y el objeto `Animal.prototype` trae una propiedad `constructor` que apunta de vuelta a `Animal`.",
    },
    {
      type: "playground",
      title: "Experimento 7 · Recorrer la cadena de prototipos",
      description: "El prototipo de `Object.prototype` es `null`: ahí termina la cadena.",
      code: L(
        "function Animal(nombre) { this.nombre = nombre; }",
        "Animal.prototype.sonar = function () {",
        '  return "hago sonidos porque estoy vivo";',
        "};",
        'const snoopy = new Animal("Snoopy");',
        "",
        "console.log(Object.getPrototypeOf(snoopy) === Animal.prototype);",
        "console.log(Object.getPrototypeOf(Animal.prototype) === Object.prototype);",
        "console.log(Object.getPrototypeOf(Object.prototype));",
        "console.log(Animal.prototype.constructor === Animal);",
        "console.log(typeof snoopy.toString, snoopy.volar);",
        "console.log(snoopy.__proto__ === Animal.prototype);",
      ),
      expected: L("true", "true", "null", "true", "function undefined", "true"),
    },

    // ───────────────────────── Dinámico ─────────────────────────
    { type: "heading", level: 2, text: "El prototipo es dinámico" },
    {
      type: "paragraph",
      text:
        "Un prototipo no es una copia que se hace al crear la instancia: es un objeto al que las instancias apuntan. Por eso, si añades un método a `Animal.prototype` después de crear las instancias, todas lo ven al instante. Y si una instancia define su propia propiedad con el mismo nombre, esa «oculta» a la del prototipo, pero solo para ella; al borrarla, vuelve a verse la del prototipo.",
    },
    {
      type: "playground",
      title: "Experimento 8 · Cambiar el prototipo y ocultar un método",
      description: "El método `despedirse` se añade cuando las instancias ya existen y aun así lo tienen.",
      code: L(
        "function Animal(nombre) { this.nombre = nombre; }",
        "Animal.prototype.sonar = function () {",
        '  return "hago sonidos porque estoy vivo";',
        "};",
        'const snoopy = new Animal("Snoopy");',
        'const lola = new Animal("Lola Bunny");',
        "",
        "// Se añade al prototipo después de crear las instancias",
        "Animal.prototype.despedirse = function () {",
        '  return "adiós, soy " + this.nombre;',
        "};",
        "console.log(snoopy.despedirse(), lola.despedirse());",
        "",
        "// Una propiedad propia oculta a la del prototipo",
        'snoopy.sonar = function () { return "mi propio sonido"; };',
        "console.log(snoopy.sonar(), lola.sonar());",
        "delete snoopy.sonar;",
        "console.log(snoopy.sonar());",
      ),
      expected: L(
        "adiós, soy Snoopy adiós, soy Lola Bunny",
        "mi propio sonido hago sonidos porque estoy vivo",
        "hago sonidos porque estoy vivo",
      ),
    },

    // ───────────────────────── Cuidados ─────────────────────────
    { type: "heading", level: 2, text: "Dos cuidados" },
    {
      type: "paragraph",
      text:
        "Primero, `for...in` (de la lección de ciclos) recorre también las propiedades enumerables heredadas, y los métodos que asignas al prototipo con `Animal.prototype.sonar = ...` son enumerables. Para ver solo las propias, usa `Object.keys`. Segundo, los datos que cambian, como un arreglo o un objeto, no deben ir en el prototipo, porque se comparten entre todas las instancias: si una los modifica, todas lo ven. Los atributos van en el constructor, y en el prototipo solo los métodos.",
    },
    {
      type: "playground",
      title: "Experimento 9 · for...in con herencia, y un arreglo compartido por error",
      description: "`Corral` pone el arreglo en el prototipo: las dos instancias comparten el mismo. `Corral2` lo crea en el constructor: cada una tiene el suyo.",
      code: L(
        "function Animal(nombre, genero) {",
        "  this.nombre = nombre;",
        "  this.genero = genero;",
        "}",
        'Animal.prototype.sonar = function () { return "hago sonidos"; };',
        'Animal.prototype.saludar = function () { return "hola"; };',
        'const snoopy = new Animal("Snoopy", "macho");',
        "",
        "const claves = [];",
        "for (const k in snoopy) {",
        "  claves.push(k);",
        "}",
        'console.log(claves.join(","));',
        'console.log(Object.keys(snoopy).join(","));',
        "",
        "// Mal: un dato mutable en el prototipo se comparte",
        "function Corral() {}",
        "Corral.prototype.animales = [];",
        "const c1 = new Corral();",
        "const c2 = new Corral();",
        'c1.animales.push("vaca");',
        "console.log(c2.animales.length, c1.animales === c2.animales);",
        "",
        "// Bien: cada instancia crea el suyo en el constructor",
        "function Corral2() { this.animales = []; }",
        "const d1 = new Corral2();",
        "const d2 = new Corral2();",
        'd1.animales.push("vaca");',
        "console.log(d2.animales.length);",
      ),
      expected: L("nombre,genero,sonar,saludar", "nombre,genero", "1 true", "0"),
    },

    // ───────────────────────── Clases ─────────────────────────
    { type: "heading", level: 2, text: "Y las clases: lo mismo, con mejor sintaxis" },
    {
      type: "paragraph",
      text:
        "En la próxima lección verás `class`. Una clase hace por debajo lo que acabas de hacer a mano: `constructor` es la función constructora, y los métodos que escribes en el cuerpo se crean en `Animal.prototype`. Según MDN, las clases son azúcar sintáctica sobre las funciones constructoras. Hay diferencias de detalle: los métodos de una clase no son enumerables (no aparecen en `for...in` ni en `Object.keys`), y llamar a una clase sin `new` da un `TypeError` en lugar de fallar en silencio.",
    },
    {
      type: "playground",
      title: "Experimento 10 · Una clase es una función con métodos en su prototipo",
      description: "Mira las dos diferencias: los métodos no son enumerables, y llamar a la clase sin `new` falla siempre.",
      code: L(
        "class Animal {",
        "  constructor(nombre, genero) {",
        "    this.nombre = nombre;",
        "    this.genero = genero;",
        "  }",
        "  sonar() {",
        '    return "hago sonidos porque estoy vivo";',
        "  }",
        "}",
        "",
        'const snoopy = new Animal("Snoopy", "macho");',
        "console.log(typeof Animal);",
        'console.log(Object.getOwnPropertyNames(Animal.prototype).join(","));',
        'console.log(Object.hasOwn(snoopy, "sonar"), snoopy.sonar === Animal.prototype.sonar);',
        "console.log(JSON.stringify(Object.keys(Animal.prototype)));",
        "try {",
        '  Animal("x", "y");',
        "} catch (e) {",
        '  console.log("class sin new →", e.name);',
        "}",
      ),
      expected: L(
        "function",
        "constructor,sonar",
        "false true",
        "[]",
        "class sin new → TypeError",
      ),
    },
    {
      type: "paragraph",
      text:
        "Una última herramienta: `Object.create(prototipo)` crea un objeto nuevo cuyo prototipo es el que le indiques, sin necesidad de una función constructora. Es la forma más directa de ver que un prototipo es, simplemente, otro objeto.",
    },
    {
      type: "playground",
      title: "Experimento 11 · Elegir el prototipo con Object.create",
      description: "`hijo` no tiene `saludar` propio: lo toma del objeto `base`, y `this` es `hijo`.",
      code: L(
        "const base = {",
        '  saludar() { return "hola " + this.nombre; },',
        "};",
        "const hijo = Object.create(base);",
        'hijo.nombre = "Ana";',
        "",
        "console.log(hijo.saludar());",
        "console.log(Object.getPrototypeOf(hijo) === base);",
        'console.log(Object.hasOwn(hijo, "saludar"));',
      ),
      expected: L("hola Ana", "true", "false"),
    },

    // ───────────────────────── Cuándo usar ─────────────────────────
    { type: "heading", level: 2, text: "¿Dónde va cada cosa?" },
    {
      type: "table",
      caption: "Qué va en el constructor y qué va en el prototipo",
      headers: ["Qué", "Dónde"],
      rows: [
        ["Atributos que son distintos en cada instancia", "En el constructor, con `this.atributo = valor`"],
        ["Métodos que comparten todas las instancias", "En el prototipo: `Constructor.prototype.metodo = function () { }`"],
        ["Datos que cambian (arreglos, objetos)", "En el constructor, nunca en el prototipo"],
        ["Un solo objeto con una forma concreta", "Un objeto literal"],
        ["Un objeto con el prototipo que elijas", "`Object.create(prototipo)`"],
        ["Leer el prototipo de un objeto", "`Object.getPrototypeOf(objeto)`"],
        ["Saber si una propiedad es propia", "`Object.hasOwn(objeto, \"propiedad\")`"],
        ["La misma estructura con sintaxis más cómoda", "`class` (próxima lección)"],
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
          "JavaScript no tiene clases.",
          "Desde ES2015 existe `class`. Es sintaxis cómoda sobre constructores y prototipos: por debajo, una clase sigue siendo una función con métodos en su prototipo.",
        ],
        [
          "Un objeto hereda «una copia» del prototipo.",
          "No hay copia: el objeto apunta a su prototipo. Si el prototipo cambia, las instancias existentes ven el cambio.",
        ],
        [
          "`__proto__` es la forma de acceder al prototipo.",
          "Está obsoleto. Se usa `Object.getPrototypeOf(objeto)` para leerlo y `Object.setPrototypeOf` o `Object.create` para fijarlo.",
        ],
        [
          "Todos los objetos tienen una propiedad `prototype`.",
          "Solo la tienen las funciones constructoras normales. Una instancia tiene un `[[Prototype]]` interno. Las funciones flecha y los métodos abreviados no tienen `prototype`.",
        ],
        [
          "Dentro de un constructor no se pueden usar funciones flecha.",
          "Sí se puede: la flecha toma el `this` del constructor. Lo que no se puede es usar una flecha como constructor, ni evita la duplicación de funciones.",
        ],
        [
          "Los métodos de un constructor se escriben como en un objeto literal.",
          "`this.sonar() { }` es un error de sintaxis. Se escribe `this.sonar = function () { }`, o se asigna al prototipo.",
        ],
        [
          "Si olvidas `new`, la función da un error.",
          "Solo en modo estricto. Sin modo estricto, las propiedades se asignan al objeto global sin avisar.",
        ],
        [
          "Los métodos del prototipo se comportan igual que los de una clase.",
          "Los asignados con `Prototipo.metodo = function` son enumerables (aparecen en `for...in`); los de una clase no.",
        ],
        [
          "Un objeto literal no tiene prototipo.",
          "Tiene `Object.prototype`. Solo `Object.create(null)` crea un objeto sin prototipo.",
        ],
      ],
    },

    // ───────────────────────── FAQ ─────────────────────────
    {
      type: "accordion",
      title: "Preguntas frecuentes de esta lección",
      items: [
        {
          title: "¿Por qué el nombre del constructor empieza con mayúscula?",
          text:
            "Es una convención (CamelCase con la primera letra en mayúscula) que indica que es una función para usar con `new`. La regla `new-cap` de ESLint la comprueba. Los objetos y las variables normales usan minúscula inicial.",
        },
        {
          title: "¿Puedo cambiar el prototipo de las funciones nativas, como Array?",
          text:
            "Se puede, pero no se debe: es una mala práctica que puede romper otro código, salvo para añadir una función estándar nueva a un entorno que todavía no la tiene. ESLint la señala con la regla `no-extend-native`.",
        },
        {
          title: "¿Qué pasa si reasigno Animal.prototype entero?",
          text:
            "Las instancias creadas antes siguen apuntando al prototipo antiguo, y se pierde la propiedad `constructor`. Es mejor añadir los métodos uno por uno.",
        },
        {
          title: "¿Cómo sé si una propiedad es propia o heredada?",
          text:
            "Con `Object.hasOwn(objeto, \"propiedad\")` (la regla `prefer-object-has-own` de ESLint lo recomienda). El operador `in`, en cambio, también cuenta las heredadas.",
        },
        {
          title: "¿Todavía tengo que escribir prototipos a mano?",
          text:
            "Casi nunca: se usan clases. Pero entender los prototipos explica cómo funcionan las clases, la herencia y muchos errores comunes, y verás código antiguo escrito así.",
        },
        {
          title: "¿Y la herencia entre prototipos?",
          text:
            "Es el tema de la próxima lección con la cadena de prototipos: un perro que hereda de un animal.",
        },
      ],
    },

    // ───────────────────────── Cierre ─────────────────────────
    { type: "heading", level: 2, text: "Cierre" },
    {
      type: "paragraph",
      text:
        "Un prototipo es un objeto del que otros heredan propiedades y métodos. La función constructora crea instancias con `new`; los atributos van en el constructor, y los métodos compartidos, en el prototipo, para que no se dupliquen. Si una propiedad no está en el objeto, JavaScript la busca por la cadena de prototipos hasta `null`. Las clases son la sintaxis cómoda para todo esto. En la próxima lección vemos la herencia prototípica: cómo un prototipo (un perro) hereda de otro (un animal).",
    },
    {
      type: "checklist",
      title: "Antes de pasar al Día 24, verifica que puedes explicar…",
      items: [
        "Qué son una clase (modelo), una instancia, un atributo y un método.",
        "Qué prototipo tiene un objeto literal y qué métodos hereda de él.",
        "Cómo se escribe una función constructora y qué hace `new`, paso a paso.",
        "Por qué `this.m() { }` y una flecha no sirven como constructor.",
        "Por qué los métodos escritos dentro del constructor se duplican en cada instancia.",
        "Cómo se asignan los métodos al prototipo y qué se gana.",
        "Cómo JavaScript busca una propiedad en la cadena de prototipos y cuándo termina.",
        "Qué diferencia hay entre `prototype` y `[[Prototype]]`.",
        "Por qué los datos que cambian no deben ir en el prototipo.",
      ],
    },
    { type: "heading", level: 3, text: "Fuentes consultadas (noviembre de 2026)" },
    {
      type: "list",
      items: [
        "[MDN: Herencia y la cadena de prototipos](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Inheritance_and_the_prototype_chain)",
        "[MDN: Clases (referencia)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)",
        "[MDN: Usar clases (guía)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_classes)",
        "[MDN: new](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new)",
        "[MDN: instanceof](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof)",
        "[MDN: this](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)",
        "[MDN: Object.getPrototypeOf()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf)",
        "[MDN: Object.hasOwn()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwn)",
        "[MDN: Object.create()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create)",
        "[MDN: Object.prototype.__proto__](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/proto)",
        "[MDN: Object.prototype.constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/constructor)",
        "[MDN: Modo estricto](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode)",
        "[MDN: for...in](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in)",
        "[MDN: Funciones flecha](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)",
        "[ESLint: new-cap](https://eslint.org/docs/latest/rules/new-cap)",
        "[ESLint: no-extend-native](https://eslint.org/docs/latest/rules/no-extend-native)",
        "[ESLint: no-proto](https://eslint.org/docs/latest/rules/no-proto)",
        "[ESLint: prefer-object-has-own](https://eslint.org/docs/latest/rules/prefer-object-has-own)",
        "[ESLint: no-prototype-builtins](https://eslint.org/docs/latest/rules/no-prototype-builtins)",
      ],
    },
  ],
  selfCheck: [
    {
      question: "En la POO, ¿qué es una instancia?",
      options: [
        "El modelo del que se crean los objetos",
        "Un objeto creado a partir de un modelo, con sus propios valores",
        "Una función dentro de un objeto",
        "Una variable global",
      ],
      correctIndex: 1,
      explanation:
        "La clase o modelo es el molde; la instancia es el objeto concreto que se crea a partir de él.",
    },
    {
      question: "¿Cuál es el prototipo de un objeto literal como `{ a: 1 }`?",
      options: ["`null`", "`Object.prototype`", "`Array.prototype`", "No tiene prototipo"],
      correctIndex: 1,
      explanation:
        "Los objetos literales heredan de `Object.prototype`, de donde sacan métodos como `toString`.",
    },
    {
      question: "¿Qué hace `new Animal(\"Snoopy\", \"macho\")`?",
      options: [
        "Ejecuta `Animal` sin más, como una función normal",
        "Crea un objeto, enlaza su prototipo a `Animal.prototype`, ejecuta la función con `this` apuntando a él y lo devuelve",
        "Copia el código de `Animal` en una variable",
        "Lanza un error si `Animal` tiene atributos",
      ],
      correctIndex: 1,
      explanation:
        "Esos son los cuatro pasos de `new`. Sin él, `this` no es una instancia nueva.",
    },
    {
      question: "¿Por qué es un problema escribir `this.sonar = function () { ... }` dentro del constructor?",
      options: [
        "No funciona",
        "Cada instancia crea su propia copia de la función, y se desperdicia memoria",
        "Impide usar `new`",
        "Hace que `this` valga `undefined`",
      ],
      correctIndex: 1,
      explanation:
        "Funciona, pero con 100 instancias hay 100 funciones iguales. En el prototipo hay una sola.",
    },
    {
      question: "¿Cómo se comparte un método entre todas las instancias de `Animal`?",
      options: [
        "`Animal.sonar = function () { }`",
        "`Animal.prototype.sonar = function () { }`",
        "`this.sonar = function () { }` en cada instancia",
        "`Object.sonar = function () { }`",
      ],
      correctIndex: 1,
      explanation:
        "Los métodos que se asignan a `Animal.prototype` los ven todas las instancias a través de su prototipo.",
    },
    {
      question: "Si `snoopy` no tiene la propiedad `volar` y tampoco la tiene ningún prototipo de su cadena, ¿qué devuelve `snoopy.volar`?",
      options: ["`null`", "`undefined`", "Lanza un error", "Una cadena vacía"],
      correctIndex: 1,
      explanation:
        "JavaScript recorre la cadena de prototipos hasta `null` y, si no la encuentra, devuelve `undefined`.",
    },
    {
      question: "¿Qué función se recomienda hoy para leer el prototipo de un objeto?",
      options: [
        "`objeto.__proto__`",
        "`Object.getPrototypeOf(objeto)`",
        "`objeto.prototype`",
        "`Object.prototypeOf(objeto)`",
      ],
      correctIndex: 1,
      explanation:
        "`__proto__` está obsoleto. `Object.getPrototypeOf` es la forma estándar.",
    },
    {
      question: "Si añades un método a `Animal.prototype` después de crear una instancia, ¿qué ocurre?",
      options: [
        "La instancia ya creada no lo ve",
        "La instancia ya creada también lo ve, porque apunta al prototipo",
        "Lanza un error",
        "Hay que volver a crear la instancia",
      ],
      correctIndex: 1,
      explanation:
        "El prototipo no se copia: las instancias apuntan a él, así que ven los cambios al instante.",
    },
    {
      question: "¿Por qué no se debe guardar un arreglo en el prototipo, como `Corral.prototype.animales = []`?",
      options: [
        "Porque los arreglos no pueden ir ahí",
        "Porque todas las instancias comparten el mismo arreglo",
        "Porque da un `SyntaxError`",
        "Porque se borra al crear una instancia",
      ],
      correctIndex: 1,
      explanation:
        "Si una instancia lo modifica, todas lo ven. Los datos que cambian van en el constructor.",
    },
    {
      question: "¿Qué relación tiene `class` con los prototipos?",
      options: [
        "Reemplaza a los prototipos y ya no se usan",
        "Es una sintaxis más cómoda: por debajo, sus métodos se crean en el prototipo de la función constructora",
        "Solo existe en Java",
        "Impide usar `new`",
      ],
      correctIndex: 1,
      explanation:
        "Según MDN, las clases son azúcar sintáctica sobre las funciones constructoras y los prototipos.",
    },
  ],
};
