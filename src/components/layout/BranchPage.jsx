import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { getBranchSubjects } from "@/lib/fetchData";
import NotFound from "./not-found";

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
    return <NotFound />;
  }

  const HeadYear = year.replace(/-/g, " ");

  return (
    <div className="mx-auto max-w-7xl px-5 py-6">
      <Breadcrumb
        items={[
          { label: "Universities", href: "/study-material" },
          { label: university.toUpperCase(), href: `/study-material/${university}` },
          { label: course.toUpperCase(), href: `/study-material/${university}/${course}` },
          { label: HeadYear.toUpperCase(), href: `/study-material/${university}/${course}/${year}` },
          { label: branch.toUpperCase(), href: "#" },
        ]}
      />

      {/* Hero Section */}
      <section className="mb-16 mt-8 text-center">
        <h1 className="text-4xl font-black leading-tight tracking-tight md:text-6xl">
          {university.toUpperCase()}{" "}
          <span className="text-amber-600">
            {course.toUpperCase() === "BTECH" ? "B.Tech" : course.toUpperCase()}
          </span>
          <br />
          <span className="text-amber-600">{branch.toUpperCase()}</span>{" "}
          <span className="text-foreground">{HeadYear}</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          Download free Notes, PYQs, Syllabus, and Important Questions for{" "}
          <strong className="text-foreground">
            {university.toUpperCase()} {branch.toUpperCase()}
          </strong>{" "}
          students.
        </p>
      </section>

      {/* Subjects Grid */}
      <section>
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Subjects</h2>
          <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            {subjects.length} Subjects Available
          </span>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {subjects.map((sub) => (
            <Link
              key={sub._id}
              href={`${branch}/${sub.slug}`}
              className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[24px] border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              {/* Subtle Left Accent Border */}
              <div className="absolute bottom-0 left-0 top-0 w-1 bg-amber-500 transition-opacity duration-300 group-hover:opacity-100 sm:opacity-80" />

              <div className="flex flex-col gap-4">
                {/* Icon */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-amber-100 bg-amber-50/50 shadow-sm transition-colors duration-300 group-hover:bg-amber-100/50">
                  <BookOpen className="h-5 w-5 text-amber-600" />
                </div>

                {/* Title & Code */}
                <div className="flex flex-col">
                  <h3 className="line-clamp-2 text-lg font-bold leading-tight text-foreground transition-colors group-hover:text-amber-600">
                    {sub.subjectName}
                  </h3>
                  <span className="mt-1 font-mono text-xs font-medium text-muted-foreground">
                    {sub.subjectCode}
                  </span>
                </div>
              </div>

              {/* Bottom Row */}
              <div className="mt-6 flex items-end justify-between gap-4">
                <p className="text-[13px] font-medium text-muted-foreground">
                  Notes • PYQs • Syllabus • Books
                </p>

                {/* Arrow */}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-500 text-white shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:bg-amber-600 group-hover:shadow-amber-500/25">
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}