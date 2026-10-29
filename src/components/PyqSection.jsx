
import { Download, Eye, FileText, CalendarDays } from "lucide-react";
import PdfPreview from "./pdfPreview";

export default function PyqSection({ pyqs = [] }) {
  const validPyqs = pyqs.filter(
    (pyq) =>
      pyq &&
      typeof pyq.title === "string" &&
      pyq.title.trim() &&
      typeof pyq.driveId === "string" &&
      pyq.driveId.trim()
  );

  if (validPyqs.length === 0) {
    return (
      <section className="w-full">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-400/10 dark:text-amber-400">
            <FileText size={20} />
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Previous Year Question Papers
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              No question papers are available for this subject yet.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="pyqs" className="w-full scroll-mt-24">
      {/* Section heading */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-400/10 dark:text-amber-400">
            <FileText size={20} />
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Previous Year Question Papers
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Practise with available papers to understand question patterns
              and prepare for exams.
            </p>
          </div>
        </div>

        <span className="w-fit rounded-full border bg-muted/50 px-3 py-1.5 text-sm font-medium">
          {validPyqs.length}{" "}
          {validPyqs.length === 1 ? "paper" : "papers"}
        </span>
      </div>

      {/* Question paper list */}
      <div className="grid gap-4">
        {validPyqs.map((pyq, index) => {
          const uploadedDate = pyq.uploadedAt
            ? new Date(pyq.uploadedAt)
            : null;

          const hasValidDate =
            uploadedDate && !Number.isNaN(uploadedDate.getTime());

          return (
            <article
              key={pyq._id || `${pyq.driveId}-${index}`}
              className="group rounded-2xl border border-border bg-card p-4 transition-colors duration-200 hover:border-amber-400/70 sm:p-5"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                {/* Paper details */}
                <div className="flex min-w-0 items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border bg-amber-50 text-amber-700 dark:bg-amber-400/10 dark:text-amber-400">
                    <FileText size={21} />
                  </div>

                  <div className="min-w-0">
                    <h3 className="break-words text-base font-semibold leading-6 sm:text-lg">
                      {pyq.title.trim()}
                    </h3>

                    {hasValidDate && (
                      <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground sm:text-sm">
                        <CalendarDays size={14} />
                        <span>
                          Added{" "}
                          {uploadedDate.toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </p>
                    )}

                    <p className="mt-1 text-xs text-muted-foreground">
                      PDF resource · Use the preview before downloading
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-2 sm:flex sm:shrink-0 sm:items-center">
                  <div className="min-w-0 [&>button]:!flex [&>button]:!h-10 [&>button]:!w-full [&>button]:!items-center [&>button]:!justify-center sm:[&>button]:!w-auto">
                    <PdfPreview driveId={pyq.driveId} />
                  </div>

                  <a
                    href={`https://drive.google.com/uc?export=download&id=${encodeURIComponent(
                      pyq.driveId
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Download ${pyq.title}`}
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:px-4"
                  >
                    <Download size={16} />
                    Download
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Helpful study guidance */}
      <div className="mt-5 rounded-xl border border-dashed bg-muted/30 p-4">
        <p className="text-sm leading-6 text-muted-foreground">
          <strong className="text-foreground">Preparation tip:</strong>{" "}
          Attempt a paper without looking at the solutions first. Review your
          mistakes afterwards and use the relevant unit notes to revise weak
          topics. Past papers are useful for practice, but they do not
          guarantee which questions will appear in future exams.
        </p>
      </div>
    </section>
  );
}
