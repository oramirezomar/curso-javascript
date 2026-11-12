import { highlight } from "@/lib/highlight";
import type { CodeLang } from "@/lib/types";
import CopyButton from "./CopyButton";

interface CodeBlockProps {
  code: string;
  lang: CodeLang;
  title?: string;
  highlightLines?: number[];
}

export default async function CodeBlock({ code, lang, title, highlightLines }: CodeBlockProps) {
  const html = await highlight(code, lang, highlightLines);

  return (
    <div className="my-2 overflow-hidden rounded-lg border border-slate-700 bg-[#0d1117]">
      <div className="flex items-center justify-between border-b border-slate-700 px-4 py-1.5">
        <span className="text-xs font-medium text-slate-400">{title ?? lang.toUpperCase()}</span>
        <CopyButton text={code} />
      </div>
      <div
        className="overflow-x-auto p-4 text-sm leading-relaxed [&_pre]:!bg-transparent [&_.highlighted-line]:bg-brand-400/20 [&_.highlighted-line]:border-l-2 [&_.highlighted-line]:border-brand-300 [&_.highlighted-line]:-ml-4 [&_.highlighted-line]:pl-[14px]"
        // HTML generado por Shiki a partir de contenido propio del curso.
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
