// Modelo de contenido tipado. Cada lección es un array de "blocks",
// no un string de markdown, para tener control total del render.
//
// Basado en el Curso AWS y extendido con bloques interactivos:
// image, timeline, tabs, playground, accordion, table y keyFacts.

export type CodeLang =
  | "js"
  | "ts"
  | "text"
  | "bash"
  | "json"
  | "html"
  | "css"
  | "java";

export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "quote"; text: string; author?: string }
  | { type: "list"; ordered?: boolean; items: string[] }
  | {
      type: "code";
      lang: CodeLang;
      title?: string;
      code: string;
      highlightLines?: number[];
    }
  | { type: "callout"; variant: "info" | "warning" | "success"; text: string }
  | {
      type: "comparison";
      before: { title: string; code: string };
      after: { title: string; code: string };
      lang?: CodeLang;
    }
  | { type: "checklist"; title?: string; items: string[] }
  // Imagen ilustrativa (SVG/PNG bajo /public). `alt` es obligatorio.
  | { type: "image"; src: string; alt: string; caption?: string }
  // Cifras clave destacadas (tarjetas).
  | { type: "keyFacts"; items: { value: string; label: string }[] }
  // Línea de tiempo interactiva: el usuario navega hito por hito.
  | {
      type: "timeline";
      title?: string;
      items: {
        year: string;
        title: string;
        text: string;
        code?: { lang: CodeLang; code: string };
      }[];
    }
  // Pestañas de código (p. ej. antes / ahora, o varios lenguajes).
  | {
      type: "tabs";
      title?: string;
      tabs: { label: string; lang: CodeLang; code: string; note?: string }[];
    }
  // Editor ejecutable: el usuario modifica y corre JavaScript en el navegador.
  | {
      type: "playground";
      title?: string;
      description?: string;
      code: string;
      expected?: string;
    }
  // Preguntas/respuestas desplegables.
  | { type: "accordion"; title?: string; items: { title: string; text: string }[] }
  | { type: "table"; caption?: string; headers: string[]; rows: string[][] }
  // Lista de temas marcables cuyo estado se guarda en localStorage (demo real).
  | {
      type: "topicTracker";
      title?: string;
      description?: string;
      storageKey: string;
      items: string[];
    };

export interface Lesson {
  day: number;
  slug: string;
  title: string;
  section: string;
  estimatedMinutes: number;
  objectives: string[];
  blocks: ContentBlock[];
  icon?: string; // emoji de la lección
  selfCheck?: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
}

export interface CourseSection {
  title: string;
  dayRange: [number, number];
  icon?: string; // emoji de la capa temática
}
