import Link from "next/link";
import { BookOpen, ArrowRight } from "lucide-react";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { getBranchSubjects } from "@/lib/fetchData";

export default async function SubjectsList({
  university,
  course,
  year,
}) {
  const subjects = await getBranchSubjects(
    university,
    course,
    year
  );

  return (
    <div className="mx-auto max-w-7xl px-5 py-6">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          {
            label: "Universities",
            href: "/study-material",
          },
          {
            label: university.toUpperCase(),
            href: `/study-material/${university}`,
          },
          {
            label: course.toUpperCase(),
            href: `/study-material/${university}/${course}`,
          },
          {
            label: "Subjects",
            href: "#",
          },
        ]}
      />

      {/* Hero */}
      <section className="mt-8 mb-12">
        <span className="inline-flex rounded-full bg-amber-100/50 px-3 py-1 text-xs font-semibold tracking-wide text-amber-700 ring-1 ring-inset ring-amber-500/20">
          Free Resources
        </span>

        <p className="mt-4 text-xl">
          <span className="font-semibold uppercase text-foreground">
            {university}
          </span>
          <span className="mx-2 text-muted-foreground">•</span>
          <span className="capitalize">{course.toUpperCase()}</span>
          <span className="mx-2 text-muted-foreground">•</span>
          <span className="capitalize">{year.replace(/-/g, " ")}</span>
        </p>

        <p className="mt-3 max-w-2xl text-base text-muted-foreground">
          Select a subject to access Notes, PYQs, Syllabus, Books, Unit-wise PDFs, and Important Questions.
        </p>
      </section>

      {/* Empty State */}
      {subjects.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-[24px] border border-dashed border-border bg-card/50 p-16 text-center shadow-sm">
          <BookOpen className="mb-4 h-10 w-10 text-muted-foreground/50" />
          <h2 className="text-xl font-semibold text-foreground">
            No Subjects Found
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            We are currently adding study materials for this semester.
          </p>
        </div>
      ) : (
        /* Subjects Grid */
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {subjects.map((sub) => (
            <Link
              key={sub._id}
              href={`${year}/${sub.slug}`}
              className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[24px] border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              {/* Subtle Left Accent Border */}
              <div className="absolute bottom-0 left-0 top-0 w-1 bg-amber-500 transition-opacity duration-300 group-hover:opacity-100 sm:opacity-80" />

              <div className="flex flex-col gap-4">
                {/* Top Row: Icon & Titles */}
                <div className="flex items-start gap-4">
                  {/* Subject Icon Container */}
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-amber-100 bg-amber-50/50 shadow-sm transition-colors duration-300 group-hover:bg-amber-100/50">
                    <BookOpen className="h-5 w-5 text-amber-600" />
                  </div>

                  {/* Subject Name & Code */}
                  <div className="flex flex-col pt-0.5">
                    <h2 className="line-clamp-2 text-lg font-bold leading-tight text-foreground transition-colors group-hover:text-amber-600">
                      {sub.subjectName}
                    </h2>
                    <span className="mt-1 font-mono text-xs font-medium text-muted-foreground">
                      {sub.subjectCode}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Row: Chips & Arrow */}
              <div className="mt-6 flex items-end justify-between gap-4">
                {/* Resource Chips */}
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center rounded-md bg-blue-50/80 px-2 py-1 text-[11px] font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                    📄 Notes
                  </span>
                  <span className="inline-flex items-center rounded-md bg-violet-50/80 px-2 py-1 text-[11px] font-medium text-violet-700 ring-1 ring-inset ring-violet-700/10">
                    ❓ PYQs
                  </span>
                  <span className="inline-flex items-center rounded-md bg-emerald-50/80 px-2 py-1 text-[11px] font-medium text-emerald-700 ring-1 ring-inset ring-emerald-700/10">
                    📚 Syllabus
                  </span>
                  <span className="inline-flex items-center rounded-md bg-orange-50/80 px-2 py-1 text-[11px] font-medium text-orange-700 ring-1 ring-inset ring-orange-700/10">
                    📖 Books
                  </span>
                </div>

                {/* Circular Action Arrow */}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-500 text-white shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:bg-amber-600 group-hover:shadow-amber-500/25">
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}