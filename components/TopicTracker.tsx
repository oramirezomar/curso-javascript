"use client";

// Demostración real de localStorage: el usuario marca temas, recarga la página
// y el avance sigue ahí. Muestra además el texto exacto que queda guardado.

import { useEffect, useState } from "react";

const PREFIX = "curso-javascript-demo:";

export default function TopicTracker({
  title,
  description,
  storageKey,
  items,
}: {
  title?: string;
  description?: string;
  storageKey: string;
  items: string[];
}) {
  const key = PREFIX + storageKey;
  const [checked, setChecked] = useState<number[]>([]);
  const [raw, setRaw] = useState<string | null>(null);
  const [unavailable, setUnavailable] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(key);
      setRaw(stored);
      if (stored) {
        const parsed: unknown = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setChecked(
            parsed.filter(
              (n): n is number => Number.isInteger(n) && n >= 0 && n < items.length,
            ),
          );
        }
      }
    } catch {
      // Almacenamiento bloqueado, modo privado o dato corrupto.
      setUnavailable(true);
    }
    setHydrated(true);
  }, [key, items.length]);

  function persist(next: number[]) {
    setChecked(next);
    try {
      const text = JSON.stringify(next);
      window.localStorage.setItem(key, text);
      setRaw(text);
    } catch {
      setUnavailable(true);
    }
  }

  function toggle(index: number) {
    persist(
      checked.includes(index)
        ? checked.filter((i) => i !== index)
        : [...checked, index].sort((a, b) => a - b),
    );
  }

  function clear() {
    setChecked([]);
    try {
      window.localStorage.removeItem(key);
      setRaw(null);
    } catch {
      setUnavailable(true);
    }
  }

  const percent = items.length ? Math.round((checked.length / items.length) * 100) : 0;

  return (
    <section
      aria-label={title ?? "Marcador de temas"}
      className="overflow-hidden rounded-xl border border-brand-300 bg-white dark:border-brand-700 dark:bg-slate-900"
    >
      <header className="border-b border-brand-200 bg-brand-50 px-4 py-2 dark:border-brand-800 dark:bg-brand-900/20">
        <p className="text-sm font-semibold text-brand-800 dark:text-brand-200">
          ☑ {title ?? "Marca tu progreso"}
        </p>
        {description && (
          <p className="text-xs text-brand-700 dark:text-brand-300">{description}</p>
        )}
      </header>

      <div className="px-4 py-3">
        <div className="mb-3 flex items-center gap-3">
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
            <div
              className="h-full rounded-full bg-brand-500 transition-all"
              style={{ width: `${hydrated ? percent : 0}%` }}
            />
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {hydrated ? `${checked.length} / ${items.length}` : "…"}
          </span>
        </div>

        <ul className="grid gap-1 sm:grid-cols-2">
          {items.map((label, i) => {
            const id = `${storageKey}-${i}`;
            return (
              <li key={id}>
                <label
                  htmlFor={id}
                  className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  <input
                    id={id}
                    type="checkbox"
                    checked={checked.includes(i)}
                    onChange={() => toggle(i)}
                    disabled={!hydrated}
                    className="h-4 w-4 accent-[#b45f06]"
                  />
                  <span className={checked.includes(i) ? "line-through opacity-70" : ""}>{label}</span>
                </label>
              </li>
            );
          })}
        </ul>

        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="rounded-md bg-brand-500 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-brand-600"
          >
            Recargar la página
          </button>
          <button
            type="button"
            onClick={clear}
            className="rounded-md border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:border-brand-400 dark:border-slate-600 dark:text-slate-300"
          >
            Borrar lo guardado
          </button>
        </div>

        {unavailable && (
          <p className="mt-3 rounded-md bg-amber-100 p-2 text-xs text-amber-900 dark:bg-amber-900/30 dark:text-amber-100">
            Tu navegador no permite usar localStorage en este momento (modo privado, bloqueado o
            lleno). El avance no se conservará al recargar.
          </p>
        )}
      </div>

      <div className="border-t border-slate-700 bg-black/90 px-4 py-3 font-mono text-xs">
        <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
          Lo que hay guardado en localStorage de este sitio
        </p>
        <p className="break-all text-slate-300">
          <span className="text-sky-300">clave</span>: {key}
        </p>
        <p className="break-all text-slate-300">
          <span className="text-sky-300">valor</span>:{" "}
          {hydrated ? (raw === null ? "null (todavía no hay nada guardado)" : raw) : "…"}
        </p>
      </div>
    </section>
  );
}
