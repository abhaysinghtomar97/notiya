
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  FileText,
  ClipboardList,
  GraduationCap,
  LibraryBig,
} from "lucide-react";
import { notFound } from "next/navigation";

import Breadcrumb from "@/components/ui/Breadcrumb";
import { getBranchSubjects } from "@/lib/fetchData";
import BranchSeoContent from "@/components/BranchSEOContent";

const branchThemes = {
  CSE: {
    icon: "text-blue-700 bg-blue-100 dark:text-blue-300 dark:bg-blue-400/15",
    accent: "from-blue-500 to-indigo-500",
    border: "hover:border-blue-400/60",
    glow: "from-blue-500/[0.10] via-indigo-500/[0.04] to-transparent",
    label: "text-blue-700 dark:text-blue-300",
    title: "group-hover:text-blue-700 dark:group-hover:text-blue-300",
    arrow: "bg-blue-600 group-hover:bg-blue-700",
  },
  IT: {
    icon: "text-violet-700 bg-violet-100 dark:text-violet-300 dark:bg-violet-400/15",
    accent: "from-violet-500 to-purple-500",
    border: "hover:border-violet-400/60",
    glow: "from-violet-500/[0.10] via-purple-500/[0.04] to-transparent",
    label: "text-violet-700 dark:text-violet-300",
    title: "group-hover:text-violet-700 dark:group-hover:text-violet-300",
    arrow: "bg-violet-600 group-hover:bg-violet-700",
  },
  ECE: {
    icon: "text-emerald-700 bg-emerald-100 dark:text-emerald-300 dark:bg-emerald-400/15",
    accent: "from-emerald-500 to-teal-500",
    border: "hover:border-emerald-400/60",
    glow: "from-emerald-500/[0.10] via-teal-500/[0.04] to-transparent",
    label: "text-emerald-700 dark:text-emerald-300",
    title: "group-hover:text-emerald-700 dark:group-hover:text-emerald-300",
    arrow: "bg-emerald-600 group-hover:bg-emerald-700",
  },
  "CS-AI": {
    icon: "text-orange-700 bg-orange-100 dark:text-orange-300 dark:bg-orange-400/15",
    accent: "from-orange-500 to-amber-500",
    border: "hover:border-orange-400/60",
    glow: "from-orange-500/[0.10] via-amber-500/[0.04] to-transparent",
    label: "text-orange-700 dark:text-orange-300",
    title: "group-hover:text-orange-700 dark:group-hover:text-orange-300",
    arrow: "bg-orange-600 group-hover:bg-orange-700",
  },
  "CS-AIML": {
    icon: "text-pink-700 bg-pink-100 dark:text-pink-300 dark:bg-pink-400/15",
    accent: "from-pink-500 to-rose-500",
    border: "hover:border-pink-400/60",
    glow: "from-pink-500/[0.10] via-rose-500/[0.04] to-transparent",
    label: "text-pink-700 dark:text-pink-300",
    title: "group-hover:text-pink-700 dark:group-hover:text-pink-300",
    arrow: "bg-pink-600 group-hover:bg-pink-700",
  },
  "CS-DS": {
    icon: "text-cyan-700 bg-cyan-100 dark:text-cyan-300 dark:bg-cyan-400/15",
    accent: "from-cyan-500 to-sky-500",
    border: "hover:border-cyan-400/60",
    glow: "from-cyan-500/[0.10] via-sky-500/[0.04] to-transparent",
    label: "text-cyan-700 dark:text-cyan-300",
    title: "group-hover:text-cyan-700 dark:group-hover:text-cyan-300",
    arrow: "bg-cyan-600 group-hover:bg-cyan-700",
  },
};

const defaultTheme = {
  icon: "text-amber-700 bg-amber-100 dark:text-amber-300 dark:bg-amber-400/15",
  accent: "from-amber-500 to-orange-500",
  border: "hover:border-amber-400/60",
  glow: "from-amber-500/[0.10] via-orange-500/[0.04] to-transparent",
  label: "text-amber-700 dark:text-amber-300",
  title: "group-hover:text-amber-700 dark:group-hover:text-amber-300",
  arrow: "bg-amber-600 group-hover:bg-amber-700",
};

const resourceTypes = [
  {
    label: "Notes",
    icon: FileText,
    styles:
      "bg-blue-50 text-blue-700 dark:bg-blue-400/10 dark:text-blue-300",
  },
  {
    label: "PYQs",
    icon: ClipboardList,
    styles:
      "bg-violet-50 text-violet-700 dark:bg-violet-400/10 dark:text-violet-300",
  },
  {
    label: "Syllabus",
    icon: GraduationCap,
    styles:
      "bg-emerald-50 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300",
  },
  {
    label: "Books",
    icon: LibraryBig,
    styles:
      "bg-orange-50 text-orange-700 dark:bg-orange-400/10 dark:text-orange-300",
  },
];

export default async function BranchPage({
  university,
  course,
  year,
  branch,
}) {
  const subjects = await getBranchSubjects(
    university,
    course,
    year,
    branch
  );

  if (!subjects?.length) {
    notFound();
  }

  const universityName = String(university).toUpperCase();
  const courseKey = String(course).toLowerCase();
  const courseName = courseKey === "btech"
    ? "B.Tech"
    : String(course).toUpperCase();

  const yearName = String(year).replace(/-/g, " ");
  const branchCode = String(branch).toUpperCase();
  const theme = branchThemes[branchCode] ?? defaultTheme;

  const basePath =
    `/study-material/${encodeURIComponent(university)}` +
    `/${encodeURIComponent(course)}/${encodeURIComponent(year)}` +
    `/${encodeURIComponent(branch)}`;

  return (
    <main className="mx-auto max-w-7xl px-5 py-6 md:px-8">
      <Breadcrumb
        items={[
          { label: "Universities", href: "/study-material" },
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
            href: `/study-material/${encodeURIComponent(university)}/${encodeURIComponent(course)}/${encodeURIComponent(year)}`,
          },
          { label: branchCode, href: "#" },
        ]}
      />

      {/* Hero */}
      <header className="relative mb-10 mt-8 overflow-hidden rounded-3xl border border-border bg-card px-5 py-9 sm:px-8 md:mb-12 md:px-12 md:py-12">
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${theme.glow}`}
        />

        <div className="relative">
          <div
            className={`inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-3 py-1.5 text-xs font-semibold ${theme.label}`}
          >
            <BookOpen size={14} />
            FREE STUDY MATERIAL
          </div>

          <h1 className="mt-5 text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl">
            <span>{universityName}</span>{" "}
            <span className={theme.label}>{courseName}</span>
            <br />
            <span className={theme.label}>{branchCode}</span>{" "}
            <span>{yearName}</span>
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
            Explore subject-wise notes, previous year question papers,
            syllabus and exam preparation resources for{" "}
            <strong className="font-semibold text-foreground">
              {universityName} {courseName} {branchCode}
            </strong>
            .
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {resourceTypes.map((resource) => {
              const Icon = resource.icon;

              return (
                <span
                  key={resource.label}
                  className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium ${resource.styles}`}
                >
                  <Icon size={14} />
                  {resource.label}
                </span>
              );
            })}
          </div>
        </div>
      </header>

      {/* Subjects */}
      <section aria-labelledby="subjects-heading">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2
              id="subjects-heading"
              className="text-2xl font-bold tracking-tight"
            >
              Explore Subjects
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Choose a subject to access its study resources.
            </p>
          </div>

          <span className="rounded-full border border-border bg-card px-3 py-1.5 text-sm font-medium text-muted-foreground">
            {subjects.length}{" "}
            {subjects.length === 1 ? "subject" : "subjects"}
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {subjects.map((sub) => {
            const subjectName =
              typeof sub.subjectName === "string" && sub.subjectName.trim()
                ? sub.subjectName.trim()
                : "Untitled Subject";

            const subjectCode =
              typeof sub.subjectCode === "string" && sub.subjectCode.trim()
                ? sub.subjectCode.trim()
                : null;

            const slug =
              typeof sub.slug === "string" ? sub.slug.trim() : "";

            if (!slug) {
              return (
                <article
                  key={String(sub._id)}
                  className="rounded-2xl border border-border bg-card p-5 opacity-80"
                >
                  <h3 className="font-semibold">{subjectName}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    This subject link is being updated.
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
                <article
                  className={`relative flex h-full min-h-64 flex-col overflow-hidden rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-6 ${theme.border}`}
                >
                  {/* Branch-specific accent */}
                  <div
                    aria-hidden="true"
                    className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${theme.accent}`}
                  />

                  <div
                    aria-hidden="true"
                    className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${theme.glow} opacity-70`}
                  />

                  <div className="relative flex flex-1 flex-col">
                    <div className="flex items-start gap-4">
                      <div
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${theme.icon}`}
                      >
                        <BookOpen size={22} strokeWidth={1.8} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <h3
                          className={`line-clamp-2 text-lg font-bold leading-snug transition-colors ${theme.title}`}
                        >
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
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Resource categories
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {resourceTypes.map((resource) => {
                          const Icon = resource.icon;

                          return (
                            <span
                              key={resource.label}
                              className={`inline-flex items-center gap-1.5 rounded-md px-2 py-1.5 text-[11px] font-medium ${resource.styles}`}
                            >
                              <Icon size={12} />
                              {resource.label}
                            </span>
                          );
                        })}
                      </div>
                    </div>

                    <div className="mt-auto flex items-center justify-between gap-3 border-t border-border/70 pt-4 mt-6">
                      <span className="text-sm font-medium text-muted-foreground transition-colors group-hover:text-foreground">
                        View subject
                      </span>

                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white transition-all duration-300 group-hover:translate-x-0.5 ${theme.arrow}`}
                      >
                        <ArrowRight size={17} />
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Existing branch SEO content */}
      <BranchSeoContent branchCode={branch} />
    </main>
  );
}
