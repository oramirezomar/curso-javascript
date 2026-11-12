import type { ReactNode } from "react";

// Tokens soportados:
//   `código en línea`
//   [texto del enlace](https://url)   (solo http/https)
const TOKEN = /(`[^`]+`|\[[^\]]+\]\(https?:\/\/[^)\s]+\))/g;
const LINK = /^\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)$/;

/**
 * Renderiza texto plano con soporte mínimo de `código` y [enlaces](https://...).
 * No interpreta HTML: el resto del texto se escapa por React.
 */
export default function RichText({ text }: { text: string }): ReactNode {
  const parts = text.split(TOKEN);
  return (
    <>
      {parts.map((part, i) => {
        if (part.length > 2 && part.startsWith("`") && part.endsWith("`")) {
          return (
            <code
              key={i}
              className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[0.9em] text-brand-700 dark:bg-slate-800 dark:text-brand-300"
            >
              {part.slice(1, -1)}
            </code>
          );
        }
        const link = LINK.exec(part);
        if (link) {
          return (
            <a
              key={i}
              href={link[2]}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-brand-600 underline underline-offset-2 hover:text-brand-700 dark:text-brand-300"
            >
              {link[1]}
            </a>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}
