// Catálogo de lecciones del Curso de JavaScript.
//
// Para añadir un día nuevo:
//   1. Crear content/lessons/day-XX.ts exportando `dayXX: Lesson`.
//   2. Importarlo aquí y agregarlo al arreglo `lessons`.
//   3. Si abre un tema nuevo, agregar su entrada en `sections` (dayRange contiguo).
// `assertCatalog()` rompe el build si el catálogo queda inconsistente.

import type { CourseSection, Lesson } from "@/lib/types";
import { day01 } from "./day-01";
import { day02 } from "./day-02";
import { day03 } from "./day-03";
import { day04 } from "./day-04";
import { day05 } from "./day-05";
import { day06 } from "./day-06";
import { day07 } from "./day-07";
import { day08 } from "./day-08";
import { day09 } from "./day-09";
import { day10 } from "./day-10";
import { day11 } from "./day-11";
import { day12 } from "./day-12";
import { day13 } from "./day-13";
import { day14 } from "./day-14";
import { day15 } from "./day-15";
import { day16 } from "./day-16";
import { day17 } from "./day-17";
import { day18 } from "./day-18";
import { day19 } from "./day-19";
import { day20 } from "./day-20";
import { day21 } from "./day-21";
import { day22 } from "./day-22";
import { day23 } from "./day-23";
import { day24 } from "./day-24";
import { day25 } from "./day-25";
import { day26 } from "./day-26";
import { day27 } from "./day-27";
import { day28 } from "./day-28";
import { day29 } from "./day-29";
import { day30 } from "./day-30";
import { day31 } from "./day-31";
import { day32 } from "./day-32";
import { day33 } from "./day-33";
import { day34 } from "./day-34";
import { day35 } from "./day-35";
import { day36 } from "./day-36";
import { day37 } from "./day-37";
import { day38 } from "./day-38";
import { day39 } from "./day-39";
import { day40 } from "./day-40";
import { day41 } from "./day-41";
import { day42 } from "./day-42";

export const sections: CourseSection[] = [
  { title: "Introducción y contexto", dayRange: [1, 2], icon: "🧭" },
  { title: "Fundamentos del lenguaje", dayRange: [3, 5], icon: "🧱" },
  { title: "Tipos de datos básicos", dayRange: [6, 10], icon: "🔤" },
  { title: "Funciones y tipos compuestos", dayRange: [11, 13], icon: "⚙️" },
  { title: "Operadores", dayRange: [14, 14], icon: "➗" },
  { title: "Control de flujo", dayRange: [15, 18], icon: "🔀" },
  { title: "Sintaxis moderna (ES2015)", dayRange: [19, 22], icon: "✨" },
  { title: "Programación orientada a objetos", dayRange: [23, 26], icon: "🧬" },
  { title: "Objetos nativos y utilidades", dayRange: [27, 29], icon: "🧰" },
  { title: "Herramientas del lenguaje", dayRange: [30, 34], icon: "🛠️" },
  { title: "Ejercicios de lógica", dayRange: [35, 42], icon: "🧩" },
];

export const lessons: Lesson[] = [day01, day02, day03, day04, day05, day06, day07, day08, day09, day10, day11, day12, day13, day14, day15, day16, day17, day18, day19, day20, day21, day22, day23, day24, day25, day26, day27, day28, day29, day30, day31, day32, day33, day34, day35, day36, day37, day38, day39, day40, day41, day42];

export function getLessonByDay(day: number): Lesson | undefined {
  return lessons.find((lesson) => lesson.day === day);
}

export function getLessonBySlug(slug: string): Lesson | undefined {
  return lessons.find((lesson) => lesson.slug === slug);
}

export function getNextLesson(day: number): Lesson | undefined {
  return getLessonByDay(day + 1);
}

export function getPreviousLesson(day: number): Lesson | undefined {
  return getLessonByDay(day - 1);
}

export const totalLessons = lessons.length;

export function assertCatalog(): void {
  const seenSlugs = new Set<string>();
  const seenDays = new Set<number>();

  for (const lesson of lessons) {
    if (seenSlugs.has(lesson.slug)) {
      throw new Error(`[Catálogo] slug duplicado: "${lesson.slug}" (day ${lesson.day}).`);
    }
    seenSlugs.add(lesson.slug);

    if (seenDays.has(lesson.day)) {
      throw new Error(`[Catálogo] day duplicado: ${lesson.day} (slug "${lesson.slug}").`);
    }
    seenDays.add(lesson.day);
  }

  for (let expected = 1; expected <= lessons.length; expected += 1) {
    if (!seenDays.has(expected)) {
      throw new Error(
        `[Catálogo] secuencia con huecos: falta el day ${expected}. Los days deben ser 1..${lessons.length}.`,
      );
    }
  }

  const ordered = [...sections].sort((a, b) => a.dayRange[0] - b.dayRange[0]);
  for (const s of ordered) {
    if (s.dayRange[0] > s.dayRange[1]) {
      throw new Error(`[Catálogo] dayRange inválido en "${s.title}": [${s.dayRange.join(", ")}].`);
    }
  }
  for (let i = 1; i < ordered.length; i += 1) {
    if (ordered[i - 1].dayRange[1] + 1 !== ordered[i].dayRange[0]) {
      throw new Error(
        `[Catálogo] dayRange no contiguos entre "${ordered[i - 1].title}" y "${ordered[i].title}".`,
      );
    }
  }

  for (const lesson of lessons) {
    const matches = sections.filter((s) => s.title === lesson.section);
    if (matches.length !== 1) {
      throw new Error(
        `[Catálogo] la lección "${lesson.slug}" declara section "${lesson.section}", que coincide con ${matches.length} entradas (se requiere 1).`,
      );
    }
    const [start, end] = matches[0].dayRange;
    if (lesson.day < start || lesson.day > end) {
      throw new Error(
        `[Catálogo] day ${lesson.day} ("${lesson.slug}") fuera del dayRange [${start}, ${end}] de "${lesson.section}".`,
      );
    }
  }
}

assertCatalog();
