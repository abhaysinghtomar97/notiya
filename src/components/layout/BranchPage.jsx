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
    <div className="max-w-7xl mx-auto">

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
            label: HeadYear.toUpperCase(),
            href: `/study-material/${university}/${course}/${year}`,
          },
          {
            label: branch.toUpperCase(),
            href: "#",
          },
        ]}
      />

     

      <section className=" mb-14 text-center">

      

        <h1 className="mt-6 text-5xl md:text-7xl font-black leading-tight">

          {university.toUpperCase()}{" "}

          <span className="text-amber-600">
            {course.toUpperCase()}
          </span>

          <br />

          <span className="text-amber-600">
            {branch.toUpperCase()}
          </span>{" "}

          {HeadYear}

          <br />

         

        </h1>

        <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground">

          Download free Notes, Previous Year Question Papers,
          Syllabus, Unit-wise PDFs, Practical Files and
          Important Questions for{" "}

          <strong>
            {university.toUpperCase()} {branch.toUpperCase()}
          </strong>{" "}

          students.

        </p>

      </section>

      {/* Subjects */}

      <section>

        <div className="mb-8 flex items-center justify-between">

          <div>

            <h2 className="text-3xl font-bold">
              Subjects
            </h2>

            <p className="mt-2 text-muted-foreground">
              Select a subject to explore study resources.
            </p>

          </div>

          <span className="rounded-full border px-4 py-2 text-sm font-medium">
            {subjects.length} Subjects
          </span>

        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {subjects.map((sub) => (

            <Link
              key={sub._id}
              href={`${branch}/${sub.slug}`}
              className="group"
            >

              <div
                className="
                  relative
                  overflow-hidden
                  rounded-3xl
                  border
                  bg-gradient-to-br
                  from-white
                  to-slate-50
                  p-6
                  shadow-sm
                  transition-all
                  duration-300
                  hover:-translate-y-2
                  hover:border-primary
                  hover:shadow-xl
                "
              >

                {/* Watermark */}

                <BookOpen
                  className="
                    absolute
                    right-4
                    top-4
                    h-16
                    w-16
                    text-primary/5
                  "
                />

                <div
                  className="
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-2xl
                    bg-primary/10
                    text-primary
                  "
                >
                  <BookOpen className="h-7 w-7" />
                </div>

                <h3 className="mt-5 line-clamp-2 text-xl font-bold leading-snug">
                  {sub.subjectName}
                </h3>

                <p className="mt-3 text-sm text-muted-foreground">
                  Notes • PYQs • Syllabus • Books
                </p>

                <div className="mt-8 flex items-center justify-between">

                  <span className="font-medium text-primary">
                    Explore Subject
                  </span>

                  <ArrowRight
                    className="
                      h-5
                      w-5
                      transition-transform
                      duration-300
                      group-hover:translate-x-1
                    "
                  />

                </div>

              </div>

            </Link>

          ))}

        </div>

      </section>

    </div>
  );
}