"use client";

import { useState } from "react";
import CopyButton from "./CopyButton";

export interface RenderedTab {
  label: string;
  html: string;
  raw: string;
  note?: string;
}

export default function CodeTabsClient({ title, tabs }: { title?: string; tabs: RenderedTab[] }) {
  const [active, setActive] = useState(0);
  const current = tabs[active];

  return (
    <div className="my-2 overflow-hidden rounded-lg border border-slate-700 bg-[#0d1117]">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-700 px-3 py-1.5">
        <div role="tablist" aria-label={title ?? "Ejemplos de código"} className="flex flex-wrap gap-1">
          {tabs.map((tab, i) => (
            <button
              key={tab.label}
              role="tab"
              type="button"
              aria-selected={i === active}
              onClick={() => setActive(i)}
              className={`rounded-md px-3 py-1 text-xs font-medium transition ${
                i === active
                  ? "bg-brand-500 text-white"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <CopyButton text={current.raw} />
      </div>
      <div
        role="tabpanel"
        className="overflow-x-auto p-4 text-sm leading-relaxed [&_pre]:!bg-transparent"
        // HTML generado por Shiki en el servidor a partir de contenido propio.
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: current.html }}
      />
      {current.note && (
        <p className="border-t border-slate-700 px-4 py-2 text-xs text-slate-400">{current.note}</p>
      )}
    </div>
  );
}
