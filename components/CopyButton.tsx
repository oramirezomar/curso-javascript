"use client";

import { useState } from "react";

export default function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Sin permiso de portapapeles: no se hace nada.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="rounded px-2 py-0.5 text-xs font-medium text-slate-400 transition hover:bg-slate-700 hover:text-white"
      aria-label="Copiar código"
    >
      {copied ? "✓ Copiado" : "Copiar"}
    </button>
  );
}
