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

export const sections: CourseSection[] = [
  { title: "Introducción y contexto", dayRange: [1, 2], icon: "🧭" },
  { title: "Fundamentos del lenguaje", dayRange: [3, 3], icon: "🧱" },
];

export const lessons: Lesson[] = [day01, day02, day03];

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
