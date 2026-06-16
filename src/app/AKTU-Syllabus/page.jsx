import Link from "next/link";

export default function Page() {
  const years = [
    {
      title: "1st Year",
      href: "/AKTU-Syllabus/1st-Year-AKTU-Syllabus",
      icon: "📖",
      desc: "Common Syllabus for all branches",
    },
    {
      title: "2nd Year",
      href: "/AKTU-Syllabus/2nd-Year-AKTU-Syllabus",
      icon: "📚",
      desc: "Core branch subjects",
    },
    {
      title: "3rd Year",
      href: "/AKTU-Syllabus/3rd-Year-AKTU-Syllabus",
      icon: "🎯",
      desc: "Advanced technical subjects",
    },
    {
      title: "4th Year",
      href: "/AKTU-Syllabus/4th-Year-AKTU-Syllabus",
      icon: "🚀",
      desc: "Final year & electives",
    },
  ];

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="px-5 py-16">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-sm font-medium">
            AKTU Resources
          </div>

          <h1 className="mt-6 text-4xl md:text-6xl font-bold tracking-tight">
            AKTU Syllabus
          </h1>

          <p className="mt-5 text-lg text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto">
            Access the latest AKTU Syllabus year-wise and branch-wise.
            Find updated curriculum, subject lists, and semester-wise
            resources in one place.
          </p>
        </div>
      </section>

      {/* Cards */}
      <section className="px-5 pb-20">
        <div className="max-w-6xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {years.map((year) => (
            <Link
              key={year.title}
              href={year.href}
              className="
                group
                rounded-3xl
                border
                border-zinc-200
                dark:border-zinc-800
                bg-white
                dark:bg-zinc-900
                p-6
                shadow-sm
                hover:shadow-xl
                hover:-translate-y-2
                transition-all
                duration-300
              "
            >
              <div className="text-5xl">
                {year.icon}
              </div>

              <h2 className="mt-5 text-2xl font-bold">
                {year.title}
              </h2>

              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                {year.desc}
              </p>

              <div className="mt-6 flex items-center justify-between">
                <span className="font-medium text-blue-600 dark:text-blue-400">
                  View Syllabus
                </span>

                <span className="group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Info Section */}
      <section className="px-5 pb-20">
        <div
          className="
            max-w-6xl
            mx-auto
            rounded-3xl
            border
            border-zinc-200
            dark:border-zinc-800
            bg-zinc-50
            dark:bg-zinc-900
            p-8
          "
        >
          <h2 className="text-3xl font-bold mb-4">
            Why Use This Syllabus?
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold mb-2">
                📌 Exam Preparation
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Know exactly what topics are included for your semester exams.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">
                📚 Subject Planning
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Plan studies semester-wise using the official curriculum.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">
                🚀 Placement Readiness
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Identify important technical subjects for internships and placements.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}