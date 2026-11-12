import { highlight } from "@/lib/highlight";
import type { CodeLang } from "@/lib/types";
import CodeTabsClient from "./CodeTabsClient";

interface CodeTabsProps {
  title?: string;
  tabs: { label: string; lang: CodeLang; code: string; note?: string }[];
}

export default async function CodeTabs({ title, tabs }: CodeTabsProps) {
  const rendered = await Promise.all(
    tabs.map(async (t) => ({
      label: t.label,
      html: await highlight(t.code, t.lang),
      raw: t.code,
      note: t.note,
    })),
  );

  return (
    <figure className="my-2">
      {title && (
        <figcaption className="mb-2 text-sm font-semibold text-slate-800 dark:text-slate-200">
          {title}
        </figcaption>
      )}
      <CodeTabsClient title={title} tabs={rendered} />
    </figure>
  );
}
