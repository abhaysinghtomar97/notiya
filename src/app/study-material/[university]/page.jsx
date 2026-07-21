
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

      {/* <aside className="lg:col-span-4 xl:col-span-3">

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

      </aside> */}
     {/* IMPORT AT TOP OF FILE: import Link from 'next/link'; */}



    </div>

    {/* IMPORT AT TOP OF FILE: import Link from 'next/link'; */}

{(university === 'aktu') && (
  <aside className="relative overflow-hidden bg-amber-50 dark:bg-amber-500/10 border-l-4 border-amber-500 p-5 rounded-r-2xl shadow-sm my-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all hover:shadow-md w-full">
    
    {/* Background decorative accent */}
    <div className="absolute -right-4 -top-4 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl pointer-events-none"></div>

    {/* Text & Icon Container with flex-1 and min-w-0 to prevent collapsing on large screens */}
    <div className="flex items-start gap-4 relative z-10 flex-1 min-w-0">
      
      {/* Calendar Icon - explicit shrink-0 */}
      <div className="shrink-0 mt-1 bg-amber-200/50 dark:bg-amber-500/20 p-2.5 rounded-full text-amber-600 dark:text-amber-400">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
      
      {/* Text Block - flex-1 min-w-0 prevents text overflow/disappearance on wide screens */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2.5 mb-1">
          <h3 className="font-bold text-lg text-amber-900 dark:text-amber-100 whitespace-nowrap">
            University Notice Board
          </h3>
          <span className="bg-red-500 text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded-full animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.5)] shrink-0">
            New Update
          </span>
        </div>
        <p className="text-sm text-zinc-700 dark:text-zinc-300 break-words">
          The official AKTU Academic Calendar for Session 2026-27 has been released.
        </p>
      </div>
    </div>

    {/* Navigation Action */}
    <Link 
      href="/Academic-Calendar/aktu" 
      className="relative z-10 shrink-0 w-full sm:w-auto text-center bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600 text-white font-medium py-2.5 px-6 rounded-xl transition-colors shadow-sm"
    >
      View Calendar
    </Link>
  </aside>
)}

  </main>
);
}