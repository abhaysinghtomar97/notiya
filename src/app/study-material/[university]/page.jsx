
import Link from "next/link";
import Image from "next/image";
import {
  Code2,
  Terminal,
  Briefcase,
  LineChart,
  ArrowRight,
  GraduationCap,
  Building2,
  CalendarDays,
  BookOpen,
  Sparkles,
  FileText,
  ChevronRight,
} from "lucide-react";

import Breadcrumb from "@/components/ui/Breadcrumb";
import LatestUpdates from "./latestUpdates";
import AKTUEngineeringResources from "@/components/AKTUEngineeringResources";
import PSITEngineeringResources from "@/components/PSITEngineeringResources";
import CSJMUResources from "@/components/CSJMUResources";

const iconMap = {
  code: Code2,
  terminal: Terminal,
  briefcase: Briefcase,
  chart: LineChart,
};

const universityConfig = {
  aktu: {
    name: "Dr. A.P.J. Abdul Kalam Technical University",
    shortName: "AKTU",
    logo: "/aktu_logo.svg",
    description:
      "Find B.Tech notes, previous year papers, syllabus and academic updates.",
    accent: "amber",
  },
  psit: {
    name: "Pranveer Singh Institute of Technology",
    shortName: "PSIT",
    logo: "/psit_logo.svg",
    description:
      "Explore engineering study material, notes and academic resources.",
    accent: "blue",
  },
  csjmu: {
    name: "Chhatrapati Shahu Ji Maharaj University",
    shortName: "CSJMU",
    logo: "/csjmu_logo.svg",
    description:
      "Explore course material, notes and resources for your programme.",
    accent: "violet",
  }
};

const courseData = {
  csjmu: [
    {
      code: "BCA",
      full_name: "Bachelor of Computer Applications",
      description:
        "Study programming, software development, databases and computer applications.",
      icon_type: "terminal",
    },
    {
      code: "BBA",
      full_name: "Bachelor of Business Administration",
      description:
        "Explore business management, marketing, finance and entrepreneurship.",
      icon_type: "briefcase",
    },
  ],
  default: [
    {
      code: "BTech",
      full_name: "Bachelor of Technology",
      description:
        "Explore engineering study material, including notes, syllabus and previous year papers.",
      icon_type: "code",
    },
  ],
};

function CourseCard({ course, university }) {
  const Icon = iconMap[course.icon_type] || Terminal;

  return (
    <Link
      href={`/study-material/${university}/${course.code.toLowerCase()}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-5 transition duration-300 hover:-translate-y-1 hover:border-amber-500/60 hover:shadow-lg hover:shadow-amber-500/5 sm:p-6"
    >
      <div className="mb-5 flex items-start justify-between gap-3">
        <div className="rounded-xl bg-amber-50 p-3 text-amber-700 transition-colors group-hover:bg-amber-600 group-hover:text-white dark:bg-amber-500/10 dark:text-amber-400">
          <Icon size={23} />
        </div>

        <span className="rounded-full border border-border bg-muted px-3 py-1 text-xs font-semibold tracking-wide text-muted-foreground">
          {course.code}
        </span>
      </div>

      <h3 className="text-lg font-bold leading-snug text-foreground transition-colors group-hover:text-amber-600 sm:text-xl">
        {course.full_name}
      </h3>

      <p className="mt-2 flex-1 text-sm leading-6 text-muted-foreground">
        {course.description}
      </p>

      <div className="mt-6 flex items-center justify-between border-t border-border pt-4 text-sm font-semibold text-amber-700 dark:text-amber-400">
        <span>Explore resources</span>
        <ArrowRight
          size={17}
          className="transition-transform group-hover:translate-x-1"
        />
      </div>
    </Link>
  );
}

function UpdatesSidebar({ university, formattedUniName }) {
  return (
    <aside className="min-w-0 lg:col-span-4">
      <div className="space-y-4 lg:sticky lg:top-6">
        <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <div className="border-b border-border bg-muted/40 p-5">
            <div className="flex items-start gap-3">
              <div className="relative mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
                <BellIcon />
                <span className="absolute right-1 top-1 size-2 rounded-full bg-emerald-500 ring-2 ring-background" />
              </div>

              <div className="min-w-0">
                <h2 className="text-lg font-bold">
                  Latest Updates
                </h2>
                <p className="mt-1 text-sm leading-5 text-muted-foreground">
                  Circulars and announcements for {formattedUniName}
                </p>
              </div>
            </div>
          </div>

          <div className="max-h-[560px] overflow-y-auto p-3">
            <LatestUpdates university={university} />
          </div>

          <div className="border-t border-border px-5 py-3">
            <p className="text-xs leading-5 text-muted-foreground">
              Check the update details and dates before acting on an announcement.
            </p>
          </div>
        </section>

        <Link
          href={`/Academic-Calendar/${university}`}
          className="group flex items-center gap-3 rounded-2xl border border-border bg-card p-4 transition hover:border-amber-500/50 hover:bg-amber-50/50 dark:hover:bg-amber-500/5"
        >
          <div className="rounded-xl bg-amber-100 p-3 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400">
            <CalendarDays size={21} />
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="font-semibold">Academic Calendar</h3>
            <p className="mt-0.5 text-sm text-muted-foreground">
              View important academic dates
            </p>
          </div>

          <ChevronRight
            size={18}
            className="shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1"
          />
        </Link>
      </div>
    </aside>
  );
}

function BellIcon() {
  return <Sparkles size={20} />;
}

export default async function UniversityProfilePage({ params }) {
  const { university } = await params;
  const normalizedUni = university.toLowerCase();
  const config = universityConfig[normalizedUni];

  if (!config) {
    return (
      <main className="mx-auto max-w-7xl px-5 py-16">
        <div className="rounded-2xl border border-dashed border-border p-10 text-center">
          <Building2
            size={36}
            className="mx-auto mb-3 text-muted-foreground"
          />
          <h1 className="text-2xl font-bold">University not found</h1>
          <p className="mt-2 text-muted-foreground">
            Please select a university from the study material page.
          </p>
          <Link
            href="/study-material"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-amber-600 px-5 py-3 font-semibold text-white transition hover:bg-amber-700"
          >
            Browse universities <ArrowRight size={17} />
          </Link>
        </div>
      </main>
    );
  }

  const formattedUniName = config.shortName;
  const courses = courseData[normalizedUni] || courseData.default;
  const showSidebar = normalizedUni === "aktu";

  return (
    <main className="mx-auto mb-20 max-w-7xl px-4 py-5 sm:px-6 sm:py-8 lg:px-8">
      <Breadcrumb
        items={[
          { label: "Study Material", href: "/study-material" },
          {
            label: formattedUniName,
            href: `/study-material/${normalizedUni}`,
          },
        ]}
      />

      {/* Hero */}
      <section className="relative mt-5 overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-amber-50 via-background to-orange-50 p-5 dark:from-amber-950/20 dark:via-background dark:to-orange-950/10 sm:p-8 lg:p-10">
        <div className="pointer-events-none absolute -right-16 -top-20 size-64 rounded-full bg-amber-400/10 blur-3xl" />

        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-start gap-4 sm:items-center sm:gap-5">
            <div className="flex size-[68px] shrink-0 items-center justify-center rounded-2xl border border-border bg-white p-3 shadow-sm sm:size-24 sm:p-4">
              <Image
                src={config.logo}
                alt={`${formattedUniName} logo`}
                width={80}
                height={80}
                className="h-full w-full object-contain"
                priority
              />
            </div>

            <div className="min-w-0">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-100/70 px-3 py-1 text-xs font-semibold text-amber-800 dark:border-amber-800 dark:bg-amber-500/10 dark:text-amber-300">
                <GraduationCap size={14} />
                Academic resources
              </span>

              <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                {formattedUniName}
                <span className="mt-1 block text-lg font-medium tracking-normal text-muted-foreground sm:text-xl">
                  Study Material & Resources
                </span>
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
                {config.description}
              </p>
            </div>
          </div>

          <Link
            href={`/Academic-Calendar/${university}`}
            className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-amber-600 px-5 py-3 font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-amber-700 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2"
          >
            <CalendarDays size={18} />
            Academic Calendar
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      </section>

      {/* Main content */}
      <div
        className={`mt-9 grid grid-cols-1 items-start gap-8 lg:gap-10 ${
          showSidebar
            ? "lg:grid-cols-[minmax(0,1fr)_340px]"
            : "lg:grid-cols-1"
        }`}
      >
        <section className="min-w-0">
          <div className="mb-5 flex items-end justify-between gap-4 border-b border-border pb-4">
            <div>
              <div className="flex items-center gap-2 text-sm font-semibold text-amber-700 dark:text-amber-400">
                <BookOpen size={17} />
                Explore by programme
              </div>
              <h2 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
                Available Courses
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Choose your programme to find relevant study resources.
              </p>
            </div>

            <span className="shrink-0 rounded-full border border-border bg-muted px-3 py-1.5 text-xs font-semibold text-muted-foreground">
              {courses.length} {courses.length === 1 ? "course" : "courses"}
            </span>
          </div>

          {courses.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-muted/20 px-5 py-14 text-center">
              <BookOpen
                size={38}
                className="mx-auto mb-3 text-muted-foreground/50"
              />
              <h3 className="text-lg font-semibold">
                No programmes available yet
              </h3>
              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                We are updating the available resources for {formattedUniName}.
                Please check back later.
              </p>
            </div>
          ) : (
            <div
              className={`grid grid-cols-1 gap-4 sm:grid-cols-2 ${
                showSidebar ? "" : "lg:grid-cols-3"
              }`}
            >
              {courses.map((course) => (
                <CourseCard
                  key={course.code}
                  course={course}
                  university={normalizedUni}
                />
              ))}
            </div>
          )}
        </section>

        {showSidebar && (
          <UpdatesSidebar
            university={university}
            formattedUniName={formattedUniName}
          />
        )}
      </div>

      {/* University-specific resources */}
      {normalizedUni === "aktu" && (
        <section className="mt-12 border-t border-border pt-8">
          <AKTUEngineeringResources university={university} />
        </section>
      )}

      {normalizedUni === "psit" && (
        <section className="mt-12 border-t border-border pt-8">
          <PSITEngineeringResources university={university} />
        </section>
      )}

      {normalizedUni === "csjmu" && (
        <section className="mt-12 border-t border-border pt-8">
          <CSJMUResources university={university} />
        </section>
      )}
    </main>
  );
}
