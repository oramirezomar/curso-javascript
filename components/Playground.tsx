"use client";

// Editor ejecutable. El código del usuario corre dentro de un <iframe> con
// sandbox="allow-scripts" (sin allow-same-origin): no puede leer el DOM, las
// cookies ni el localStorage de la página. La consola se reenvía con postMessage.

import { useEffect, useMemo, useRef, useState } from "react";

type Kind = "log" | "info" | "warn" | "error";
interface OutputLine {
  kind: Kind;
  text: string;
}

const COLLECT_MS = 3000; // ventana para capturar logs asíncronos (setTimeout, promesas)

function buildSrcDoc(code: string, runId: string): string {
  // Se serializa como JSON y se escapa "<" para que el código no cierre el <script>.
  const payload = JSON.stringify(code).replace(/</g, "\\u003c");
  const id = JSON.stringify(runId);
  return `<!doctype html><html><body><script>
(function () {
  var runId = ${id};
  function fmt(v) {
    if (typeof v === "string") return v;
    if (v === undefined) return "undefined";
    if (typeof v === "function" || typeof v === "symbol") return String(v);
    try {
      return typeof v === "object" && v !== null ? JSON.stringify(v, null, 2) : String(v);
    } catch (e) { return String(v); }
  }
  function send(kind, args) {
    parent.postMessage({ runId: runId, kind: kind, text: Array.prototype.map.call(args, fmt).join(" ") }, "*");
  }
  console.log = function () { send("log", arguments); };
  console.info = function () { send("info", arguments); };
  console.warn = function () { send("warn", arguments); };
  console.error = function () { send("error", arguments); };
  window.addEventListener("error", function (e) { send("error", [e.message]); });
  window.addEventListener("unhandledrejection", function (e) { send("error", ["Promesa rechazada: " + fmt(e.reason)]); });
  try {
    new Function(${payload})();
  } catch (e) {
    send("error", [e && e.name ? e.name + ": " + e.message : String(e)]);
  }
})();
<\/script></body></html>`;
}

const kindStyle: Record<Kind, string> = {
  log: "text-slate-100",
  info: "text-sky-300",
  warn: "text-amber-300",
  error: "text-red-400",
};

export default function Playground({
  title,
  description,
  code: initialCode,
  expected,
}: {
  title?: string;
  description?: string;
  code: string;
  expected?: string;
}) {
  const [code, setCode] = useState(initialCode);
  const [lines, setLines] = useState<OutputLine[]>([]);
  const [run, setRun] = useState<{ id: string; code: string } | null>(null);
  const [hasRun, setHasRun] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const counter = useRef(0);

  useEffect(() => {
    if (!run) return;
    const onMessage = (e: MessageEvent) => {
      if (e.source !== iframeRef.current?.contentWindow) return;
      const data = e.data as { runId?: string; kind?: Kind; text?: string } | null;
      if (!data || data.runId !== run.id || !data.kind) return;
      setLines((prev) => [...prev, { kind: data.kind as Kind, text: String(data.text ?? "") }]);
    };
    window.addEventListener("message", onMessage);
    const timer = window.setTimeout(() => setRun(null), COLLECT_MS);
    return () => {
      window.removeEventListener("message", onMessage);
      window.clearTimeout(timer);
    };
  }, [run]);

  const srcDoc = useMemo(() => (run ? buildSrcDoc(run.code, run.id) : undefined), [run]);

  function execute() {
    counter.current += 1;
    setLines([]);
    setHasRun(true);
    setRun({ id: `run-${counter.current}-${Date.now()}`, code });
  }

  function reset() {
    setCode(initialCode);
    setLines([]);
    setHasRun(false);
    setRun(null);
  }

  const rows = Math.min(24, Math.max(4, code.split("\n").length + 1));

  return (
    <section
      aria-label={title ?? "Editor interactivo"}
      className="overflow-hidden rounded-xl border border-brand-300 bg-white shadow-sm dark:border-brand-700 dark:bg-slate-900"
    >
      <header className="flex flex-wrap items-center justify-between gap-2 border-b border-brand-200 bg-brand-50 px-4 py-2 dark:border-brand-800 dark:bg-brand-900/20">
        <div>
          <p className="text-sm font-semibold text-brand-800 dark:text-brand-200">
            ▶ {title ?? "Pruébalo tú mismo"}
          </p>
          {description && (
            <p className="text-xs text-brand-700 dark:text-brand-300">{description}</p>
          )}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={reset}
            className="rounded-md border border-brand-300 px-3 py-1 text-xs font-medium text-brand-700 transition hover:bg-brand-100 dark:border-brand-700 dark:text-brand-200 dark:hover:bg-brand-900/40"
          >
            Restablecer
          </button>
          <button
            type="button"
            onClick={execute}
            className="rounded-md bg-brand-500 px-3 py-1 text-xs font-semibold text-white transition hover:bg-brand-600"
          >
            Ejecutar
          </button>
        </div>
      </header>

      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        onKeyDown={(e) => {
          if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
            e.preventDefault();
            execute();
          }
        }}
        rows={rows}
        spellCheck={false}
        autoCapitalize="off"
        autoCorrect="off"
        aria-label="Código JavaScript editable"
        className="block w-full resize-y bg-[#0d1117] p-4 font-mono text-sm leading-relaxed text-slate-100 outline-none focus:ring-2 focus:ring-inset focus:ring-brand-400"
      />

      <div className="border-t border-slate-700 bg-black/90 px-4 py-3" aria-live="polite">
        <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
          Consola · Ctrl/⌘ + Enter para ejecutar
        </p>
        {!hasRun ? (
          <p className="font-mono text-sm text-slate-500">Pulsa «Ejecutar» para ver la salida.</p>
        ) : lines.length === 0 ? (
          <p className="font-mono text-sm text-slate-500">(sin salida)</p>
        ) : (
          <pre className="whitespace-pre-wrap break-words font-mono text-sm">
            {lines.map((l, i) => (
              <span key={i} className={`block ${kindStyle[l.kind]}`}>
                {l.kind === "error" ? "✖ " : "› "}
                {l.text}
              </span>
            ))}
          </pre>
        )}
      </div>

      {expected && (
        <details className="border-t border-slate-200 px-4 py-2 text-sm dark:border-slate-700">
          <summary className="cursor-pointer font-medium text-slate-700 dark:text-slate-300">
            Ver salida esperada
          </summary>
          <pre className="mt-2 whitespace-pre-wrap rounded-md bg-slate-100 p-3 font-mono text-xs text-slate-800 dark:bg-slate-800 dark:text-slate-200">
            {expected}
          </pre>
        </details>
      )}

      {run && (
        <iframe
          ref={iframeRef}
          key={run.id}
          title="Entorno de ejecución aislado"
          sandbox="allow-scripts"
          srcDoc={srcDoc}
          className="hidden"
        />
      )}
    </section>
  );
}
