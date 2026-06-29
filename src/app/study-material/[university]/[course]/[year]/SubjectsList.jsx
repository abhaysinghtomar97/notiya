
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
    <div className="max-w-7xl mx-auto px-5 py-6">

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

        <span className="inline-flex rounded-full bg-blue-100 px-4 py-1 text-sm font-semibold text-blue-700">
          Free Resources
        </span>

       

        <p className="mt-4 text-xl">
          <span className="font-semibold uppercase text-primary">
            {university}
          </span>

          <span className="mx-2 text-muted-foreground">
            •
          </span>

          <span className="capitalize">
            {course.toUpperCase()}
          </span>

          <span className="mx-2 text-muted-foreground">
            •
          </span>

          <span className="capitalize">
            {year.replace(/-/g, " ")}
          </span>
        </p>

        <p className="mt-5 max-w-2xl text-muted-foreground">
          Select a subject to access Notes, PYQs,
          Syllabus, Books, Unit-wise PDFs and
          Important Questions.
        </p>

      </section>

      {/* Empty */}
      {subjects.length === 0 ? (
        <div className="rounded-3xl border border-dashed p-16 text-center">
          <BookOpen className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />

          <h2 className="text-2xl font-bold">
            No Subjects Found
          </h2>

          <p className="mt-3 text-muted-foreground">
            We are currently adding study materials for this semester.
          </p>
        </div>
      ) : (

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {subjects.map((sub) => (

            <Link
              key={sub._id}
              href={`${year}/${sub.slug}`}
              className="group "
            >

              <div
                className="
                
                  relative
                  overflow-hidden
                  rounded-3xl
                  border
                  hover:bg-main
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
                    right-5
                    top-5
                    h-16
                    w-16
                    text-primary/5
                  "
                />

                {/* Icon */}
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

                <h2 className="mt-5 text-xl font-bold leading-snug">
                  {sub.subjectName}
                </h2>

                <p className="mt-2 text-sm text-muted-foreground">
                  Notes • PYQs • Syllabus • Books
                </p>

                <div className="mt-8 flex items-center justify-between">

                  <span className="font-medium text-primary">
                    Explore Subject
                  </span>

                  <div
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-full
                      bg-primary
                      text-white
                      transition-transform
                      duration-300
                      group-hover:translate-x-1
                    "
                  >
                    <ArrowRight className="h-5 w-5" />
                  </div>

                </div>

              </div>

            </Link>

          ))}

        </div>

      )}
    </div>
  );
}
