import type { ContentBlock } from "@/lib/types";
import CodeBlock from "./CodeBlock";
import CodeTabs from "./CodeTabs";
import Timeline from "./Timeline";
import Playground from "./Playground";
import RichText from "./RichText";
import TopicTracker from "./TopicTracker";

function CalloutIcon({ variant }: { variant: "info" | "warning" | "success" }) {
  if (variant === "warning") return <span aria-hidden>⚠️</span>;
  if (variant === "success") return <span aria-hidden>✅</span>;
  return <span aria-hidden>💡</span>;
}

const calloutStyles: Record<string, string> = {
  info: "border-sky-400 bg-sky-50 text-sky-900 dark:bg-sky-900/20 dark:text-sky-100",
  warning: "border-amber-400 bg-amber-50 text-amber-900 dark:bg-amber-900/20 dark:text-amber-100",
  success: "border-emerald-400 bg-emerald-50 text-emerald-900 dark:bg-emerald-900/20 dark:text-emerald-100",
};

export default async function ContentRenderer({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="flex flex-col gap-4">
      {await Promise.all(
        blocks.map(async (block, idx) => {
          switch (block.type) {
            case "heading":
              return block.level === 2 ? (
                <h2 key={idx} className="mt-8 text-2xl font-semibold text-slate-900 dark:text-slate-50">
                  {block.text}
                </h2>
              ) : (
                <h3 key={idx} className="mt-4 text-xl font-semibold text-slate-900 dark:text-slate-50">
                  {block.text}
                </h3>
              );

            case "paragraph":
              return (
                <p key={idx} className="text-base leading-relaxed text-slate-700 dark:text-slate-300">
                  <RichText text={block.text} />
                </p>
              );

            case "quote":
              return (
                <blockquote
                  key={idx}
                  className="border-l-4 border-brand-400 bg-slate-50 py-3 pl-4 italic text-slate-700 dark:bg-slate-800/50 dark:text-slate-300"
                >
                  <p>&ldquo;{block.text}&rdquo;</p>
                  {block.author && (
                    <footer className="mt-1 text-sm font-medium not-italic text-slate-500 dark:text-slate-400">
                      — {block.author}
                    </footer>
                  )}
                </blockquote>
              );

            case "list":
              return block.ordered ? (
                <ol key={idx} className="list-decimal space-y-2 pl-6 text-slate-700 dark:text-slate-300">
                  {block.items.map((item, i) => (
                    <li key={i}>
                      <RichText text={item} />
                    </li>
                  ))}
                </ol>
              ) : (
                <ul key={idx} className="list-disc space-y-2 pl-6 text-slate-700 dark:text-slate-300">
                  {block.items.map((item, i) => (
                    <li key={i}>
                      <RichText text={item} />
                    </li>
                  ))}
                </ul>
              );

            case "code":
              return (
                <CodeBlock
                  key={idx}
                  code={block.code}
                  lang={block.lang}
                  title={block.title}
                  highlightLines={block.highlightLines}
                />
              );

            case "callout":
              return (
                <div
                  key={idx}
                  className={`flex items-start gap-3 rounded-lg border-l-4 p-4 text-sm ${calloutStyles[block.variant]}`}
                >
                  <CalloutIcon variant={block.variant} />
                  <p className="leading-relaxed">
                    <RichText text={block.text} />
                  </p>
                </div>
              );

            case "checklist":
              return (
                <div key={idx} className="rounded-lg border border-slate-200 p-4 dark:border-slate-700">
                  {block.title && (
                    <p className="mb-3 font-semibold text-slate-900 dark:text-slate-50">{block.title}</p>
                  )}
                  <ul className="space-y-2">
                    {block.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                        <span className="mt-0.5 text-brand-500" aria-hidden>
                          ☐
                        </span>
                        <span>
                          <RichText text={item} />
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              );

            case "comparison":
              return (
                <div key={idx} className="grid gap-4 sm:grid-cols-2">
                  <CodeBlock code={block.before.code} lang={block.lang ?? "js"} title={block.before.title} />
                  <CodeBlock code={block.after.code} lang={block.lang ?? "js"} title={block.after.title} />
                </div>
              );

            case "image":
              return (
                <figure key={idx} className="my-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={block.src}
                    alt={block.alt}
                    loading="lazy"
                    className="w-full rounded-xl border border-slate-200 bg-white dark:border-slate-700"
                  />
                  {block.caption && (
                    <figcaption className="mt-2 text-center text-sm text-slate-500 dark:text-slate-400">
                      {block.caption}
                    </figcaption>
                  )}
                </figure>
              );

            case "keyFacts":
              return (
                <div key={idx} className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {block.items.map((fact, i) => (
                    <div
                      key={i}
                      className="rounded-xl border border-brand-200 bg-brand-50 p-4 text-center dark:border-brand-800 dark:bg-brand-900/20"
                    >
                      <p className="text-2xl font-bold text-brand-600 dark:text-brand-300">{fact.value}</p>
                      <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">{fact.label}</p>
                    </div>
                  ))}
                </div>
              );

            case "timeline":
              return <Timeline key={idx} title={block.title} items={block.items} />;

            case "tabs":
              return <CodeTabs key={idx} title={block.title} tabs={block.tabs} />;

            case "playground":
              return (
                <Playground
                  key={idx}
                  title={block.title}
                  description={block.description}
                  code={block.code}
                  expected={block.expected}
                />
              );

            case "topicTracker":
              return (
                <TopicTracker
                  key={idx}
                  title={block.title}
                  description={block.description}
                  storageKey={block.storageKey}
                  items={block.items}
                />
              );

            case "accordion":
              return (
                <div key={idx} className="flex flex-col gap-2">
                  {block.title && (
                    <p className="font-semibold text-slate-900 dark:text-slate-50">{block.title}</p>
                  )}
                  {block.items.map((item, i) => (
                    <details
                      key={i}
                      className="group rounded-lg border border-slate-200 bg-white px-4 py-3 open:border-brand-300 dark:border-slate-700 dark:bg-slate-900"
                    >
                      <summary className="cursor-pointer list-none font-medium text-slate-800 dark:text-slate-100">
                        <span className="mr-2 inline-block text-brand-500 transition group-open:rotate-90" aria-hidden>
                          ▸
                        </span>
                        {item.title}
                      </summary>
                      <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                        <RichText text={item.text} />
                      </p>
                    </details>
                  ))}
                </div>
              );

            case "table":
              return (
                <div key={idx} className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700">
                  <table className="w-full text-left text-sm">
                    {block.caption && (
                      <caption className="bg-slate-50 px-4 py-2 text-left text-sm font-semibold text-slate-800 dark:bg-slate-800/60 dark:text-slate-100">
                        {block.caption}
                      </caption>
                    )}
                    <thead className="bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                      <tr>
                        {block.headers.map((h, i) => (
                          <th key={i} scope="col" className="px-4 py-2 font-semibold">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 text-slate-700 dark:divide-slate-700 dark:text-slate-300">
                      {block.rows.map((row, r) => (
                        <tr key={r}>
                          {row.map((cell, c) => (
                            <td key={c} className="px-4 py-2 align-top">
                              <RichText text={cell} />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );

            default:
              return null;
          }
        }),
      )}
    </div>
  );
}
