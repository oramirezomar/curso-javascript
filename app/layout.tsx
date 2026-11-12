import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Curso de JavaScript moderno: desde las bases",
  description:
    "Curso de autoestudio de JavaScript desde cero, con las características modernas de ECMAScript 2015+ desde el primer día. Lecciones interactivas con imágenes, código ejecutable y autoevaluación.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
