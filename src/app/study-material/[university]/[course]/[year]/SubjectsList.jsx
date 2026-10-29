
import Link from "next/link";
import {
  BookOpen,
  ArrowRight,
  FileText,
  ClipboardList,
  LibraryBig,
  GraduationCap,
} from "lucide-react";

import Breadcrumb from "@/components/ui/Breadcrumb";
import { getBranchSubjects } from "@/lib/fetchData";

const resourceTypes = [
  {
    label: "Notes",
    icon: FileText,
    styles:
      "bg-blue-50 text-blue-700 ring-blue-700/10 dark:bg-blue-400/10 dark:text-blue-300 dark:ring-blue-300/20",
  },
  {
    label: "PYQs",
    icon: ClipboardList,
    styles:
      "bg-violet-50 text-violet-700 ring-violet-700/10 dark:bg-violet-400/10 dark:text-violet-300 dark:ring-violet-300/20",
  },
  {
    label: "Syllabus",
    icon: GraduationCap,
    styles:
      "bg-emerald-50 text-emerald-700 ring-emerald-700/10 dark:bg-emerald-400/10 dark:text-emerald-300 dark:ring-emerald-300/20",
  },
  {
    label: "Books",
    icon: LibraryBig,
    styles:
      "bg-orange-50 text-orange-700 ring-orange-700/10 dark:bg-orange-400/10 dark:text-orange-300 dark:ring-orange-300/20",
  },
];

export default async function SubjectsList({
  university,
  course,
  year,
}) {
  const subjects = await getBranchSubjects(university, course, year);

  const universityName = String(university).toUpperCase();
  const courseName = String(course).toUpperCase();
  const yearName = String(year).replace(/-/g, " ");

  const basePath =
    `/study-material/${encodeURIComponent(university)}/${encodeURIComponent(course)}/${encodeURIComponent(year)}`;

  return (
    <main className="mx-auto min-h-[60vh] max-w-7xl px-5 py-6 md:px-8">
      <Breadcrumb
        items={[
          {
            label: "Universities",
            href: "/study-material",
          },
          {
            label: universityName,
            href: `/study-material/${encodeURIComponent(university)}`,
          },
          {
            label: courseName,
            href: `/study-material/${encodeURIComponent(university)}/${encodeURIComponent(course)}`,
          },
          {
            label: yearName.toUpperCase(),
            href: "#",
          },
        ]}
      />

      {/* Page introduction */}
      <header className="mb-9 mt-8 md:mb-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-800 dark:bg-amber-400/10 dark:text-amber-300">
          <BookOpen size={14} />
          STUDY MATERIAL
        </div>

        <h1 className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
          Explore Your Subjects
        </h1>

        <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
          Browse subject-wise notes, previous year question papers,
          syllabus and other study resources for your exams.
        </p>

        <p className="mt-4 text-sm font-medium text-foreground/80">
          {universityName}
          <span className="mx-2 text-muted-foreground">/</span>
          {courseName}
          <span className="mx-2 text-muted-foreground">/</span>
          <span className="capitalize">{yearName}</span>
        </p>
      </header>

      {/* Subject list heading */}
      <section aria-labelledby="subjects-heading">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2
              id="subjects-heading"
              className="text-xl font-bold tracking-tight md:text-2xl"
            >
              Available Subjects
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Select a subject to explore its resources.
            </p>
          </div>

          <span className="rounded-full border border-border bg-card px-3 py-1.5 text-sm font-medium text-muted-foreground">
            {subjects.length}{" "}
            {subjects.length === 1 ? "subject" : "subjects"}
          </span>
        </div>

        {/* Empty state */}
        {subjects.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card/50 px-6 py-16 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-700 dark:text-amber-300">
              <BookOpen size={27} />
            </div>

            <h3 className="mt-5 text-xl font-semibold">
              No Subjects Available Yet
            </h3>

            <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
              Study materials for this section are still being added.
              Please check back later or explore another year.
            </p>

            <Link
              href={`/study-material/${encodeURIComponent(university)}/${encodeURIComponent(course)}`}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-amber-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-amber-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2"
            >
              Explore other years
              <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {subjects.map((sub) => {
              const subjectName =
                typeof sub.subjectName === "string" && sub.subjectName.trim()
                  ? sub.subjectName.trim()
                  : "Untitled Subject";

              const subjectCode =
                typeof sub.subjectCode === "string" &&
                sub.subjectCode.trim()
                  ? sub.subjectCode.trim()
                  : null;

              const slug =
                typeof sub.slug === "string" ? sub.slug.trim() : "";

              // Avoid generating a broken link for records without a slug.
              if (!slug) {
                return (
                  <article
                    key={String(sub._id)}
                    className="rounded-2xl border border-border bg-card p-5 opacity-80"
                  >
                    <div className="flex items-center gap-3">
                      <BookOpen
                        size={22}
                        className="text-muted-foreground"
                      />
                      <h3 className="font-semibold">{subjectName}</h3>
                    </div>

                    <p className="mt-3 text-sm text-muted-foreground">
                      This subject's resource link is being updated.
                    </p>
                  </article>
                );
              }

              return (
                <Link
                  key={String(sub._id)}
                  href={`${basePath}/${encodeURIComponent(slug)}`}
                  className="group rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2"
                >
                  <article className="relative flex h-full min-h-64 flex-col overflow-hidden rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-amber-500/50 hover:shadow-lg sm:p-6">
                    {/* Decorative top accent */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-amber-400 via-orange-500 to-amber-300 opacity-70 transition-opacity group-hover:opacity-100"
                    />

                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-amber-500/15 bg-amber-500/10 text-amber-700 transition-colors group-hover:bg-amber-500/15 dark:text-amber-300">
                        <BookOpen size={22} strokeWidth={1.8} />
                      </div>

                      <div className="min-w-0 flex-1 pt-0.5">
                        <h3 className="line-clamp-2 text-lg font-bold leading-snug text-foreground transition-colors group-hover:text-amber-700 dark:group-hover:text-amber-300">
                          {subjectName}
                        </h3>

                        {subjectCode && (
                          <p className="mt-1.5 font-mono text-xs text-muted-foreground">
                            {subjectCode}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="mt-6">
                      <p className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Resource categories
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {resourceTypes.map((resource) => {
                          const Icon = resource.icon;

                          return (
                            <span
                              key={resource.label}
                              className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium ring-1 ring-inset ${resource.styles}`}
                            >
                              <Icon size={13} />
                              {resource.label}
                            </span>
                          );
                        })}
                      </div>
                    </div>

                    <div className="mt-auto flex items-center justify-between gap-3 border-t border-border/70 pt-5 mt-6">
                      <span className="text-sm font-medium text-muted-foreground transition-colors group-hover:text-foreground">
                        Explore subject
                      </span>

                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-500 text-white transition-all duration-300 group-hover:translate-x-0.5 group-hover:bg-amber-600">
                        <ArrowRight
                          size={17}
                          aria-hidden="true"
                        />
                      </span>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
