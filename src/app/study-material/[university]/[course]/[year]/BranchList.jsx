
import Link from "next/link";
import Breadcrumb from "@/components/ui/Breadcrumb";
import {
  Laptop,
  Monitor,
  RadioTower,
  Bot,
  BrainCircuit,
  Database,
  ArrowRight,
  BookOpen,
  FileText,
  GraduationCap,
} from "lucide-react";

import {
  AktuSeoContent1stYear,
  AktuSeoContent2ndYear,
  AktuSeoContent3rdYear,
  AktuSeoContent4thYear,
} from "@/components/AKTUSEOContent";

import {
  PsitSeoContent1stYear,
  PsitSeoContent2ndYear,
} from "@/components/PSITSEOContent";

const branches = [
  {
    title: "CSE",
    fullName: "Computer Science & Engineering",
    link: "CSE",
    icon: Laptop,
    color: "blue",
    description: "Programming, algorithms and computer science fundamentals.",
    subjects: "Programming • DSA • Core CS",
  },
  {
    title: "IT",
    fullName: "Information Technology",
    link: "IT",
    icon: Monitor,
    color: "violet",
    description: "Software systems, databases and information technology.",
    subjects: "Software • Databases • Networks",
  },
  {
    title: "ECE",
    fullName: "Electronics & Communication",
    link: "ECE",
    icon: RadioTower,
    color: "emerald",
    description: "Electronics, communication systems and signal processing.",
    subjects: "Circuits • Signals • Communication",
  },
  {
    title: "CS-AI",
    fullName: "Computer Science & Artificial Intelligence",
    link: "CS-AI",
    icon: Bot,
    color: "orange",
    description: "Computing fundamentals with artificial intelligence.",
    subjects: "AI • Algorithms • Programming",
  },
  {
    title: "CS-AIML",
    fullName: "Computer Science & AI-ML",
    link: "CS-AIML",
    icon: BrainCircuit,
    color: "pink",
    description: "Machine learning, intelligent systems and computing.",
    subjects: "ML • AI • Data",
  },
  {
    title: "CS-DS",
    fullName: "Computer Science & Data Science",
    link: "CS-DS",
    icon: Database,
    color: "cyan",
    description: "Data analysis, databases and computational methods.",
    subjects: "Data • Statistics • Databases",
  },
];

const branchStyles = {
  blue: {
    icon: "bg-blue-100 text-blue-700 dark:bg-blue-400/15 dark:text-blue-300",
    gradient: "from-blue-500/[0.12] via-blue-500/[0.04] to-transparent",
    border: "hover:border-blue-400/70",
    title: "group-hover:text-blue-700 dark:group-hover:text-blue-300",
    arrow: "bg-blue-600 group-hover:bg-blue-700",
    accent: "bg-blue-500",
    label: "text-blue-700 dark:text-blue-300",
  },
  violet: {
    icon: "bg-violet-100 text-violet-700 dark:bg-violet-400/15 dark:text-violet-300",
    gradient: "from-violet-500/[0.12] via-violet-500/[0.04] to-transparent",
    border: "hover:border-violet-400/70",
    title: "group-hover:text-violet-700 dark:group-hover:text-violet-300",
    arrow: "bg-violet-600 group-hover:bg-violet-700",
    accent: "bg-violet-500",
    label: "text-violet-700 dark:text-violet-300",
  },
  emerald: {
    icon: "bg-emerald-100 text-emerald-700 dark:bg-emerald-400/15 dark:text-emerald-300",
    gradient: "from-emerald-500/[0.12] via-emerald-500/[0.04] to-transparent",
    border: "hover:border-emerald-400/70",
    title: "group-hover:text-emerald-700 dark:group-hover:text-emerald-300",
    arrow: "bg-emerald-600 group-hover:bg-emerald-700",
    accent: "bg-emerald-500",
    label: "text-emerald-700 dark:text-emerald-300",
  },
  orange: {
    icon: "bg-orange-100 text-orange-700 dark:bg-orange-400/15 dark:text-orange-300",
    gradient: "from-orange-500/[0.12] via-orange-500/[0.04] to-transparent",
    border: "hover:border-orange-400/70",
    title: "group-hover:text-orange-700 dark:group-hover:text-orange-300",
    arrow: "bg-orange-600 group-hover:bg-orange-700",
    accent: "bg-orange-500",
    label: "text-orange-700 dark:text-orange-300",
  },
  pink: {
    icon: "bg-pink-100 text-pink-700 dark:bg-pink-400/15 dark:text-pink-300",
    gradient: "from-pink-500/[0.12] via-pink-500/[0.04] to-transparent",
    border: "hover:border-pink-400/70",
    title: "group-hover:text-pink-700 dark:group-hover:text-pink-300",
    arrow: "bg-pink-600 group-hover:bg-pink-700",
    accent: "bg-pink-500",
    label: "text-pink-700 dark:text-pink-300",
  },
  cyan: {
    icon: "bg-cyan-100 text-cyan-700 dark:bg-cyan-400/15 dark:text-cyan-300",
    gradient: "from-cyan-500/[0.12] via-cyan-500/[0.04] to-transparent",
    border: "hover:border-cyan-400/70",
    title: "group-hover:text-cyan-700 dark:group-hover:text-cyan-300",
    arrow: "bg-cyan-600 group-hover:bg-cyan-700",
    accent: "bg-cyan-500",
    label: "text-cyan-700 dark:text-cyan-300",
  },
};

export default async function BranchPage({ year, university, course }) {
  const normalizedUniversity = String(university).toLowerCase();
  const normalizedCourse = String(course).toLowerCase();
  const normalizedYear = String(year).toLowerCase();
  const Headyear = String(year).replace(/-/g, " ");

  const basePath =
    `/study-material/${encodeURIComponent(university)}/${encodeURIComponent(course)}/${encodeURIComponent(year)}`;

  return (
    <main className="mx-auto max-w-7xl px-5 py-6 md:px-8">
      <Breadcrumb
        items={[
          { label: "Universities", href: "/study-material" },
          {
            label: String(university).toUpperCase(),
            href: `/study-material/${encodeURIComponent(university)}`,
          },
          {
            label: String(course).toUpperCase(),
            href: `/study-material/${encodeURIComponent(university)}/${encodeURIComponent(course)}`,
          },
          { label: Headyear.toUpperCase(), href: "#" },
        ]}
      />

      {/* Hero */}
      <header className="mx-auto mb-10 mt-8 max-w-4xl text-center md:mb-12">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-50 px-3 py-1.5 text-xs font-semibold tracking-wide text-amber-800 dark:bg-amber-400/10 dark:text-amber-300">
          <BookOpen size={14} />
          FREE STUDY MATERIAL
        </div>

        <h1 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl">
          <span>{String(university).toUpperCase()}</span>{" "}
          <span className="text-amber-600 dark:text-amber-400">
            {String(course).toUpperCase()}
          </span>
          <br />
          <span className="text-amber-600 dark:text-amber-400">
            {Headyear}
          </span>{" "}
          <span>Study Materials</span>
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
          Access free notes, previous year question papers, syllabus,
          books and important questions. Choose your branch to explore
          available study resources.
        </p>
      </header>

      {/* Branch heading */}
      <section aria-labelledby="branch-heading">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2
              id="branch-heading"
              className="text-2xl font-bold tracking-tight"
            >
              Choose Your Branch
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Find resources tailored to your engineering stream.
            </p>
          </div>

          <span className="rounded-full border border-border bg-background px-3 py-1.5 text-sm font-medium text-muted-foreground">
            {branches.length} branches
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {branches.map((branch) => {
            const Icon = branch.icon;
            const style = branchStyles[branch.color];

            return (
              <Link
                key={branch.link}
                href={`${basePath}/${branch.link}`}
                className="group rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2"
              >
                <article
                  className={`relative flex h-full min-h-64 flex-col overflow-hidden rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-6 ${style.border}`}
                >
                  {/* Branch-specific background */}
                  <div
                    aria-hidden="true"
                    className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${style.gradient}`}
                  />

                  {/* Decorative corner */}
                  <div
                    aria-hidden="true"
                    className={`absolute right-0 top-0 h-1 w-20 rounded-bl-full ${style.accent}`}
                  />

                  <div className="relative flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-2xl ${style.icon}`}
                      >
                        <Icon size={23} strokeWidth={1.8} />
                      </div>

                      <span
                        className={`rounded-full bg-background/80 px-2.5 py-1 text-[11px] font-semibold tracking-wide ${style.label}`}
                      >
                        B.TECH
                      </span>
                    </div>

                    <div className="mt-5">
                      <h3
                        className={`text-xl font-bold tracking-tight transition-colors ${style.title}`}
                      >
                        {branch.title}
                      </h3>

                      <p className="mt-1 text-sm font-medium text-foreground/80">
                        {branch.fullName}
                      </p>

                      <p className="mt-3 text-sm leading-6 text-muted-foreground">
                        {branch.description}
                      </p>
                    </div>

                    <div className="mt-auto flex items-end justify-between gap-3 pt-6">
                      <div>
                        <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                          <FileText size={14} />
                          Notes · PYQs · Syllabus
                        </div>
                        <p className="mt-2 text-xs text-muted-foreground">
                          {branch.subjects}
                        </p>
                      </div>

                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white shadow-sm transition-all duration-300 group-hover:scale-105 ${style.arrow}`}
                      >
                        <ArrowRight
                          size={18}
                          className="transition-transform duration-300 group-hover:translate-x-0.5"
                        />
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Existing SEO content */}
      {normalizedUniversity === "aktu" && normalizedCourse === "btech" && (
        <>
          {normalizedYear === "1st-year" && <AktuSeoContent1stYear />}
          {normalizedYear === "2nd-year" && <AktuSeoContent2ndYear />}
          {normalizedYear === "3rd-year" && <AktuSeoContent3rdYear />}
          {normalizedYear === "4th-year" && <AktuSeoContent4thYear />}
        </>
      )}

      {normalizedUniversity === "psit" && normalizedCourse === "btech" && (
        <>
          {normalizedYear === "1st-year" && <PsitSeoContent1stYear />}
          {normalizedYear === "2nd-year" && <PsitSeoContent2ndYear />}
        </>
      )}
    </main>
  );
}
