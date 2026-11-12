import { highlight } from "@/lib/highlight";
import type { CodeLang } from "@/lib/types";
import TimelineClient from "./TimelineClient";

interface TimelineProps {
  title?: string;
  items: {
    year: string;
    title: string;
    text: string;
    code?: { lang: CodeLang; code: string };
  }[];
}

export default async function Timeline({ title, items }: TimelineProps) {
  const rendered = await Promise.all(
    items.map(async (it) => ({
      year: it.year,
      title: it.title,
      text: it.text,
      codeHtml: it.code ? await highlight(it.code.code, it.code.lang) : undefined,
    })),
  );
  return <TimelineClient title={title} items={rendered} />;
}
