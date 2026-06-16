import Link from "next/link";

export const metadata = {
  title:
    "AKTU B.Tech 2nd Year Syllabus PDF Download (2026) | Branch Wise Syllabus",
  description:
    "Download AKTU B.Tech 2nd Year Syllabus PDF for CSE, IT, ECE, EE, Mechanical, Civil, Biotechnology and other branches. Latest AKTU branch-wise syllabus PDFs.",
};

export default function Page() {
  const branchSyllabus = [
    "Computer Science & Engineering and Allied Branches",
    "Civil Engineering",
    "Computer Science Hindi",
    "Electronics Engineering / Electronics & Communication Engineering",
    "Mechanical Engineering / Automobile Engineering / Manufacturing Technology",
    "Electronics and Computer Engineering",
    "Textile Technology",
    "Carpet and Textile Technology",
    "Handloom and Textile Technology",
    "Electrical Engineering / Electrical & Electronics",
    "Biotechnology",
  ];

  const commonSubjects = [
    "Python Programming / Cyber Security",
    "Technical Communication",
    "Mathematics III",
    "Mathematics IV",
    "Mathematics V",
    "Open Electives",
    "Universal Human Values",
    "Professional Ethics",
    "Sports & Yoga II",
  ];

  const overview = [
    {
      title: "Computer Science & Engineering",
      subjects: [
        "Data Structures",
        "Discrete Structures",
        "Python Programming",
        "Computer Organization",
        "OOP using Java",
        "TAFL",
      ],
    },
    {
      title: "Electronics & Communication Engineering",
      subjects: [
        "Electronic Devices",
        "Network Analysis",
        "Signal Systems",
        "Analog Electronics",
        "Digital Electronics",
        "Communication Systems",
      ],
    },
    {
      title: "Mechanical Engineering",
      subjects: [
        "Thermodynamics",
        "Material Science",
        "Manufacturing Process",
        "Fluid Mechanics",
        "Strength of Materials",
      ],
    },
    {
      title: "Civil Engineering",
      subjects: [
        "Building Materials",
        "Surveying",
        "Structural Analysis",
        "Geotechnical Engineering",
        "Fluid Mechanics",
      ],
    },
  ];

  const studyTips = [
    "Understand Subject Weightage",
    "Prioritize Core Subjects",
    "Use Standard Books",
    "Plan Semester-wise Goals",
    "Practice Previous Year Questions",
    "Don't Skip Labs & Projects",
  ];

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 md:px-6">

      {/* HERO */}

      <section className="relative overflow-hidden rounded-3xl border border-zinc-200 dark:border-zinc-800 mb-10">

        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-violet-500/10 to-cyan-500/10" />

        <div className="relative p-8 md:p-12">

          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-300 dark:border-zinc-700 px-4 py-2 text-sm font-medium">
            📚 AKTU Resource
          </div>

          <h1 className="mt-6 text-4xl md:text-6xl font-black leading-tight">
            AKTU B.Tech
            <span className="block text-blue-600 dark:text-blue-400">
              2nd Year Syllabus
            </span>
          </h1>

          <p className="mt-5 max-w-3xl text-zinc-600 dark:text-zinc-400 text-lg">
            Download the latest AKTU 2nd Year Syllabus PDF for all
            engineering branches including CSE, IT, ECE, EE,
            Mechanical, Civil, Biotechnology and more.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">

            <a
              href="#download"
              className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 font-medium transition"
            >
              View Syllabus PDFs
            </a>

          </div>

        </div>

      </section>

      {/* MAIN GRID */}

      <div className="grid lg:grid-cols-[280px_1fr] gap-10">

        {/* TOC */}

        <aside className="hidden lg:block">

          <div className="sticky top-24 rounded-3xl border border-amber-900 dark:border-amber-200 p-5">

            <h2 className="font-bold text-lg mb-5">
              Table of Contents
            </h2>

            <nav className="space-y-3 text-sm">

              <a href="#download" className="block hover:text-blue-500">
                2nd Year Syllabus PDF
              </a>

              <a href="#common-subjects" className="block hover:text-blue-500">
                Common Subjects
              </a>

              <a href="#importance" className="block hover:text-blue-500">
                Why is 2nd Year Important?
              </a>

              <a href="#overview" className="block hover:text-blue-500">
                Branch Wise Overview
              </a>

              <a href="#study-tips" className="block hover:text-blue-500">
                Study Tips
              </a>

              <a href="#final" className="block hover:text-blue-500">
                Final Thoughts
              </a>

              <a href="#faq" className="block hover:text-blue-500">
                FAQs
              </a>

            </nav>

          </div>

        </aside>

        {/* CONTENT */}

        <div className="space-y-14">

          {/* DOWNLOADS */}

          <section id="download" className="scroll-mt-28">

            <h2 className="text-3xl font-bold mb-6">
               2nd Year Branch Wise Syllabus PDF
            </h2>

            <div className="space-y-4">

              {branchSyllabus.map((branch) => (
                <div
                  key={branch}
                  className="rounded-2xl border border-amber-900 dark:border-amber-200 p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4 hover:shadow-md transition"
                >
                  <div>

                    <h3 className="font-semibold text-lg hover:text-blue-700 transition">
                      {branch}
                    </h3>

                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                      Updated AKTU Syllabus PDF
                    </p>

                  </div>

                  <a
                    href="#"
                    className="text-center rounded-xl bg-blue-600 text-white border border-zinc-300 dark:border-zinc-700 px-4 py-2 hover:bg-blue-800 dark:hover:bg-zinc-900 shrink-0"
                  >
                    Download
                  </a>

                </div>
              ))}

            </div>

          </section>

          {/* COMMON SUBJECTS */}

          <section id="common-subjects" className="scroll-mt-28">

            <h2 className="text-3xl font-bold mb-6">
               2nd Year Common Subjects
            </h2>

            <div className="grid md:grid-cols-2 gap-4">

              {commonSubjects.map((subject) => (
                <div
                  key={subject}
                  className="rounded-2xl border border-amber-900 dark:border-amber-200 p-4 hover:shadow-md transition"
                >
                  {subject}
                </div>
              ))}

            </div>

          </section>

          {/* IMPORTANCE */}

          <section id="importance" className="scroll-mt-28">

            <h2 className="text-3xl font-bold mb-5">
              Why is the AKTU 2nd Year Syllabus Important?
            </h2>

            <p className="leading-8 text-zinc-600 dark:text-zinc-400">
              The second year in AKTU marks the transition from common
              engineering subjects to branch-specific learning. While
              the first year focuses on basics like Mathematics,
              Physics, Chemistry and Electrical Engineering, the second
              year introduces core subjects that define your engineering
              specialization.
            </p>

            <p className="leading-8 text-zinc-600 dark:text-zinc-400 mt-4">
              Whether you're preparing for university examinations,
              internships, placements or competitive exams like GATE,
              understanding the syllabus helps you build a structured
              study strategy.
            </p>

          </section>

          {/* OVERVIEW */}

          <section id="overview" className="scroll-mt-28">

            <h2 className="text-3xl font-bold mb-8">
              Overview of AKTU 2nd Year Syllabus by Branch
            </h2>

            <div className="grid lg:grid-cols-2 gap-6">

              {overview.map((branch) => (
                <div
                  key={branch.title}
                  className="rounded-3xl border border-amber-900 dark:border-amber-200 p-6 hover:shadow-lg transition"
                >

                  <h3 className="font-bold text-xl mb-5">
                    {branch.title}
                  </h3>

                  <div className="flex flex-wrap gap-2">

                    {branch.subjects.map((subject) => (
                      <span
                        key={subject}
                        className="rounded-full border border-amber-900 dark:border-amber-200 px-4 py-2 text-sm"
                      >
                        {subject}
                      </span>
                    ))}

                  </div>

                </div>
              ))}

            </div>

          </section>

          {/* STUDY TIPS */}

          <section id="study-tips" className="scroll-mt-28">

            <h2 className="text-3xl font-bold mb-6">
              How to Study Effectively Using the Syllabus
            </h2>

            <div className="grid md:grid-cols-2 gap-4">

              {studyTips.map((tip) => (
                <div
                  key={tip}
                  className="rounded-2xl border border-amber-900 dark:border-amber-200 p-4 hover:shadow-md transition"
                >
                  {tip}
                </div>
              ))}

            </div>

          </section>

          {/* FINAL */}

          <section id="final" className="scroll-mt-28">

            <h2 className="text-3xl font-bold mb-5">
              Final Thoughts
            </h2>

            <p className="leading-8 text-zinc-600 dark:text-zinc-400">
              The AKTU 2nd Year syllabus acts as the stepping stone
              toward becoming a skilled engineer. Understanding the
              syllabus early allows you to focus on important subjects,
              manage your time efficiently and strengthen concepts that
              will be useful throughout your degree and career.
            </p>

          </section>

          {/* FAQ */}

          <section id="faq" className="scroll-mt-28">

            <h2 className="text-3xl font-bold mb-6">
              Frequently Asked Questions
            </h2>

            <div className="space-y-4">

              <details className="rounded-2xl border border-amber-900 dark:border-amber-200 p-5">
                <summary className="cursor-pointer font-semibold">
                  Is the AKTU 2nd year syllabus same for all branches?
                </summary>

                <p className="mt-3 text-zinc-600 dark:text-zinc-400">
                  No. Core subjects vary according to your branch,
                  though some common subjects are shared.
                </p>

              </details>

              <details className="rounded-2xl border border-amber-900 dark:border-amber-200 p-5">
                <summary className="cursor-pointer font-semibold">
                  Which subjects are common in 2nd year?
                </summary>

                <p className="mt-3 text-zinc-600 dark:text-zinc-400">
                  Technical Communication, Mathematics, Human Values,
                  Professional Ethics and Open Electives.
                </p>

              </details>

              <details className="rounded-2xl border border-amber-900 dark:border-amber-200 p-5">
                <summary className="cursor-pointer font-semibold">
                  Why are core subjects important?
                </summary>

                <p className="mt-3 text-zinc-600 dark:text-zinc-400">
                  Core subjects form the foundation for placements,
                  higher studies and competitive examinations.
                </p>

              </details>

            </div>

          </section>

          {/* CTA */}

          <section className="rounded-3xl border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/20 p-8">

            <h2 className="text-2xl font-bold">
              Download AKTU 2nd Year Syllabus PDF
            </h2>

            <p className="mt-3 text-zinc-600 dark:text-zinc-400">
              Access branch-wise AKTU syllabus PDFs in one place and
              stay updated with the latest curriculum.
            </p>

            <a
              href="#download"
              className="inline-block mt-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-3 transition"
            >
              View All Syllabus PDFs
            </a>

          </section>

        </div>

      </div>

    </main>
  );
}