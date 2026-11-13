# Curso de JavaScript moderno

Curso de autoestudio (Next.js 15 + Tailwind + Shiki). Fuente del contenido: `../documentacion_javascript/Dia N.txt`.

## Ejecutar

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # compila y valida el catálogo
```

## Agregar un día nuevo

1. Crear `content/lessons/day-XX.ts` exportando `dayXX: Lesson`.
2. Importarlo en `content/lessons/index.ts` y añadirlo al arreglo `lessons`.
3. Si abre un tema nuevo, agregar su entrada a `sections` (los `dayRange` deben ser contiguos).
4. Ilustraciones en `public/img/dia-XX/*.svg` y referenciarlas con el bloque `image`.

`assertCatalog()` hace fallar el build si hay slugs/días duplicados, huecos o secciones inconsistentes.

## Bloques de contenido (`lib/types.ts`)

| Bloque | Uso |
| --- | --- |
| `paragraph`, `heading`, `list`, `quote`, `callout`, `checklist`, `table` | Texto estructurado (admite `` `código` `` en línea) |
| `code`, `comparison` | Código resaltado con botón Copiar |
| `tabs` | Varios ejemplos de código en pestañas (antes / ahora, lenguajes) |
| `image` | Ilustración con `alt` obligatorio y pie de figura |
| `keyFacts` | Tarjetas de cifras clave |
| `timeline` | Línea de tiempo navegable (cada hito puede llevar código) |
| `playground` | Editor ejecutable: corre en un `<iframe sandbox="allow-scripts">` aislado. `mode`: `function` (por defecto), `script` (script clásico, `var` pasa a `window`) o `module` (ámbito de módulo) |
| `accordion` | Preguntas frecuentes desplegables |
| `topicTracker` | Lista de temas marcables que se guarda en `localStorage` y muestra el valor guardado |

Cada lección termina con autoevaluación (`selfCheck`) y el progreso se guarda en `localStorage`.

## Reglas editoriales

- Curso general **sin autor**: no se menciona al docente ni al canal de la fuente (`documentacion_javascript/Dia N.txt`), ni se usa su voz en primera persona.
- Las transcripciones son material de partida y pueden estar desactualizadas. Antes de redactar cada día se **valida con fuentes actuales** (fechas, versiones, estadísticas, estado de productos) y se corrige lo necesario.
- Cada lección incluye la tabla «Datos que suelen aparecer desactualizados» (si aplica) y la lista «Fuentes consultadas» con enlaces y el mes de validación. `[texto](https://url)` funciona en párrafos, listas y tablas.
