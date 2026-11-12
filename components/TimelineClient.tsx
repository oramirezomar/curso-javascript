"use client";

import { useState } from "react";

export interface RenderedTimelineItem {
  year: string;
  title: string;
  text: string;
  codeHtml?: string;
}

export default function TimelineClient({
  title,
  items,
}: {
  title?: string;
  items: RenderedTimelineItem[];
}) {
  const [active, setActive] = useState(0);
  const item = items[active];

  return (
    <section
      aria-label={title ?? "Línea de tiempo"}
      className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900"
    >
      {title && (
        <h3 className="mb-3 text-base font-semibold text-slate-900 dark:text-slate-50">{title}</h3>
      )}

      <div className="relative">
        <div className="absolute left-0 right-0 top-[19px] h-0.5 bg-slate-200 dark:bg-slate-700" aria-hidden />
        <ol className="relative flex gap-2 overflow-x-auto pb-3">
          {items.map((it, i) => (
            <li key={`${it.year}-${i}`} className="flex-shrink-0">
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-current={i === active ? "step" : undefined}
                className="group flex flex-col items-center gap-1 px-1"
              >
                <span
                  className={`h-3 w-3 rounded-full border-2 transition ${
                    i === active
                      ? "scale-125 border-brand-500 bg-brand-500"
                      : i < active
                        ? "border-brand-400 bg-brand-300"
                        : "border-slate-300 bg-white group-hover:border-brand-400 dark:border-slate-600 dark:bg-slate-900"
                  }`}
                  style={{ marginTop: 13 }}
                />
                <span
                  className={`whitespace-nowrap text-xs font-semibold ${
                    i === active
                      ? "text-brand-600 dark:text-brand-300"
                      : "text-slate-500 dark:text-slate-400"
                  }`}
                >
                  {it.year}
                </span>
              </button>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-2 rounded-lg bg-slate-50 p-4 dark:bg-slate-800/60" aria-live="polite">
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-600 dark:text-brand-300">
          {item.year}
        </p>
        <h4 className="mt-1 text-lg font-semibold text-slate-900 dark:text-slate-50">{item.title}</h4>
        <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-300">{item.text}</p>
        {item.codeHtml && (
          <div
            className="mt-3 overflow-x-auto rounded-md border border-slate-700 bg-[#0d1117] p-3 text-sm [&_pre]:!bg-transparent"
            // HTML generado por Shiki en el servidor a partir de contenido propio.
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: item.codeHtml }}
          />
        )}
      </div>

      <div className="mt-3 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setActive((a) => Math.max(0, a - 1))}
          disabled={active === 0}
          className="rounded-md border border-slate-300 px-3 py-1.5 text-sm text-slate-700 transition enabled:hover:border-brand-400 disabled:opacity-40 dark:border-slate-600 dark:text-slate-300"
        >
          ← Anterior
        </button>
        <span className="text-xs text-slate-500 dark:text-slate-400">
          {active + 1} / {items.length}
        </span>
        <button
          type="button"
          onClick={() => setActive((a) => Math.min(items.length - 1, a + 1))}
          disabled={active === items.length - 1}
          className="rounded-md bg-brand-500 px-3 py-1.5 text-sm font-medium text-white transition enabled:hover:bg-brand-600 disabled:opacity-40"
        >
          Siguiente →
        </button>
      </div>
    </section>
  );
}
