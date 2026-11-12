import Link from "next/link";
import { lessons, sections, totalLessons } from "@/content/lessons";

export default function CourseIndexPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl dark:text-slate-50">Índice del curso</h1>
      <p className="mt-2 text-slate-600 dark:text-slate-400">
        {totalLessons} {totalLessons === 1 ? "día publicado" : "días publicados"}. Puedes saltar de
        día si quieres: no hay bloqueo secuencial.
      </p>

      <div className="mt-8 flex flex-col gap-8">
        {sections.map((section) => {
          const sectionLessons = lessons.filter(
            (l) => l.day >= section.dayRange[0] && l.day <= section.dayRange[1],
          );
          return (
            <div key={section.title}>
              <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold text-brand-600 dark:text-brand-300">
                <span aria-hidden>{section.icon}</span>
                {section.title}
              </h2>
              <div className="flex flex-col gap-2">
                {sectionLessons.map((lesson) => (
                  <Link
                    key={lesson.slug}
                    href={`/curso/${lesson.slug}`}
                    className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 p-4 transition hover:border-brand-400 hover:bg-brand-50 dark:border-slate-800 dark:hover:bg-brand-900/10"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                        {lesson.day}
                      </span>
                      <span className="font-medium text-slate-900 dark:text-slate-100">
                        {lesson.title}
                      </span>
                    </div>
                    <span className="flex-shrink-0 text-xs text-slate-500 dark:text-slate-400">
                      {lesson.estimatedMinutes} min
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
