
import Link from 'next/link';
import {
  Code2,
  Terminal,
  Briefcase,
  LineChart,
  ArrowRight
} from 'lucide-react';
import Breadcrumb from '@/components/ui/Breadcrumb';
import LatestUpdates from './latestUpdates';

// Map database string identifiers to Lucide icons
const iconMap = {
  'code': Code2,
  'terminal': Terminal,
  'briefcase': Briefcase,
  'chart': LineChart,
};

export default async function UniversityCoursesPage({ params }) {
  let courses = [
    {
      code: "BTech",
      full_name: "Bachelor of Technology",
      description: "A 4-year undergraduate engineering program with specializations such as CSE, IT, ECE, EE, Mechanical, Civil, and more.",
      icon_type: "code"
    },
    {
      code: "BCA",
      full_name: "Bachelor of Computer Applications",
      description: "A 3-year undergraduate program focused on computer applications, programming, software development, databases, and IT.",
      icon_type: "terminal"
    },
    {
      code: "BBA",
      full_name: "Bachelor of Business Administration",
      description: "A 3-year undergraduate program covering business management, marketing, finance, human resources, and entrepreneurship.",
      icon_type: "briefcase"
    }
  ];

  const { university } = await params;
  if (university == 'PSIT-AUTONOMUS' || university == "psit-autonomus" || university == "aktu") {
    courses = [
      {
        code: "BTech",
        full_name: "BTech",
        description: "A 4-year undergraduate engineering program with specializations such as CSE, IT, ECE, EE, Mechanical, Civil, and more.",
        icon_type: "code"
      }
    ]

  }
  else {
    courses = [
      {
        code: "BCA",
        full_name: "BCA",
        description: "A 3-year undergraduate program focused on computer applications, programming, software development, databases, and IT.",
        icon_type: "terminal"
      },
      {
        code: "BBA",
        full_name: "BBA",
        description: "A 3-year undergraduate program covering business management, marketing, finance, human resources, and entrepreneurship.",
        icon_type: "briefcase"
      }
    ];

  }
  const formattedUniName = university.toUpperCase();


 return (
  <main className="max-w-7xl mx-auto px-5 py-8 mb-20">

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
      ]}
    />

    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">

      {/* ================= LEFT CONTENT ================= */}
      <div className="lg:col-span-8 xl:col-span-9">

        <div className="mb-10">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Programs at{" "}
            <span className="font-serif text-blue-700 dark:text-main italic tracking-widest uppercase border-b-2 border-amber-500 pb-1">
              {formattedUniName}
            </span>
          </h1>

          <p className="text-muted-foreground text-base md:text-lg max-w-3xl">
            Select a course directory to access branch-wise{" "}
            <span className="dark:text-amber-950 text-amber-700">Notes</span>,{" "}
            <span className="dark:text-amber-600 text-amber-950">PYQs</span>,{" "}
            <span className="text-blue-500">Important Topics</span>, and{" "}
            <span className="text-emerald-600">Syllabus</span>.
          </p>
        </div>

        {courses.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            No courses found.
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">

            {courses.map((course, idx) => {
              const Icon = iconMap[course.icon_type] || Terminal;

              return (
                <Link
                  href={`${university}/${course.code.toLowerCase()}`}
                  key={idx}
                  className="group"
                >
                  {/* Folder Tab */}
                  <div
                    className="
                    w-28 h-8
                    rounded-t-xl
                    flex items-center justify-center
                    text-xs font-bold uppercase tracking-widest
                    bg-slate-100 dark:bg-main
                    border border-b-0
                  "
                  >
                    {course.code}
                  </div>

                  {/* Folder Body */}
                  <div
                    className="
                    relative
                    p-6
                    -mt-px
                    h-[220px]
                    flex flex-col
                    rounded-2xl rounded-tl-none
                    border
                    bg-slate-50 dark:bg-zinc-900/40
                    transition-all duration-300
                    hover:border-blue-500
                    hover:shadow-xl
                    hover:-translate-y-1
                  "
                  >
                    <div className="flex justify-between">

                      <div className="p-3 rounded-xl bg-background border">
                        <Icon size={24} />
                      </div>

                      <ArrowRight
                        className="
                        opacity-0
                        -translate-x-3
                        group-hover:opacity-100
                        group-hover:translate-x-0
                        transition-all
                        text-blue-600
                      "
                      />
                    </div>

                    <div className="mt-auto">

                      <h3 className="text-xl font-semibold mb-2">
                        {course.full_name}
                      </h3>

                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {course.description}
                      </p>

                    </div>

                  </div>
                </Link>
              );
            })}

          </div>
        )}
      </div>

      {/* ================= RIGHT SIDEBAR ================= */}

      <aside className="lg:col-span-4 xl:col-span-3">

        <div className="sticky top-24">

          <div className="rounded-3xl border bg-background overflow-hidden">

            <div className="px-5 py-4 border-b bg-muted/30">

              <h2 className="font-bold text-lg">
                Latest Updates
              </h2>

              <p className="text-sm text-muted-foreground mt-1">
                Recent circulars & notices
              </p>

            </div>

            <div className="max-h-[650px] overflow-y-auto">

              <LatestUpdates university={university} />

            </div>
          </div>

        </div>

      </aside>

    </div>

  </main>
);
}