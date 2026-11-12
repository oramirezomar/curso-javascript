import { codeToHtml } from "shiki";
import type { CodeLang } from "./types";

const langMap: Record<CodeLang, string> = {
  js: "javascript",
  ts: "typescript",
  text: "text",
  bash: "bash",
  json: "json",
  html: "html",
  css: "css",
  java: "java",
};

/** Resalta `code` con Shiki (tema github-dark) y devuelve HTML. Solo servidor. */
export async function highlight(
  code: string,
  lang: CodeLang,
  highlightLines?: number[],
): Promise<string> {
  return codeToHtml(code, {
    lang: langMap[lang] ?? "text",
    theme: "github-dark",
    transformers: highlightLines?.length
      ? [
          {
            line(node, line) {
              if (highlightLines.includes(line)) {
                this.addClassToHast(node, "highlighted-line");
              }
            },
          },
        ]
      : [],
  });
}
