
import { BookOpenCheck, ListChecks } from "lucide-react";

export default function ImportantTopicsSection({ topics = [] }) {
  const validTopics = topics
    .filter((topic) => typeof topic === "string" && topic.trim())
    .map((topic) => topic.trim());

  if (validTopics.length === 0) {
    return null;
  }

  return (
    <section className="w-full">
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-700 dark:text-amber-400">
            <BookOpenCheck className="h-5 w-5" />
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Important Topics
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Topics to review alongside your syllabus, notes,
              and previous-year question papers.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-4 sm:p-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm font-medium">
            <ListChecks className="h-4 w-4 text-amber-600" />
            Revision checklist
          </div>

          <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
            {validTopics.length}{" "}
            {validTopics.length === 1 ? "topic" : "topics"}
          </span>
        </div>

        <ul className="grid gap-3 sm:grid-cols-2">
          {validTopics.map((topic, index) => (
            <li
              key={`${topic}-${index}`}
              className="flex min-w-0 items-start gap-3 rounded-xl border border-border/70 p-3 transition-colors hover:border-amber-500/50 hover:bg-amber-500/5"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-xs font-semibold text-amber-700 dark:text-amber-400">
                {String(index + 1).padStart(2, "0")}
              </span>

              <span className="pt-1 text-sm font-medium leading-6 text-foreground">
                {topic}
              </span>
            </li>
          ))}
        </ul>

        <p className="mt-5 border-t border-border pt-4 text-sm leading-6 text-muted-foreground">
          Study each topic using the relevant unit notes. Where
          available, practise related questions and revisit any
          concepts you find difficult. This checklist is a revision
          aid, not a prediction of exam questions.
        </p>
      </div>
    </section>
  );
}
