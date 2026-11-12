import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./content/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Escala ámbar (identidad "JavaScript"). 500+ mantiene contraste con texto blanco.
        brand: {
          50: "#fff8eb",
          100: "#ffedc9",
          200: "#ffd98f",
          300: "#ffc352",
          400: "#e8a317",
          500: "#b45f06",
          600: "#964d05",
          700: "#783d06",
          800: "#5f3109",
          900: "#4d290b",
        },
      },
    },
  },
  darkMode: "media",
  plugins: [],
};

export default config;
