import Link from "next/link";

export const metadata = {
  title:
    "AKTU B.Tech 3rd Year Syllabus PDF Download (2026-27) | All Branches",
  description:
    "Download AKTU B.Tech 3rd Year Syllabus PDF for all branches including CSE, IT, ECE, EE, Mechanical, Civil, and newly added specialized courses.",
};

export default function Page() {
  const specializedBranches = [
    "Electronics and Communication (Advanced Communication Technology)",
    "Electronics Engineering (VLSI Design and Technology)",
    "Mining Engineering",
  ];

  const allBranches = [
    "Computer Science / Computer Science and Engineering",
    "Information Technology / Computer Science and IT",
    "Computer Science and Engineering (Artificial Intelligence)",
    "Computer Science and Engineering (AI & ML)",
    "Computer Science and Engineering (Data Science)",
    "Computer Science and Engineering (Cyber Security)",
    "Computer Science and Engineering (IoT)",
    "Artificial Intelligence & Data Science",
    "Artificial Intelligence & Machine Learning",
    "Computer Science (Hindi)",
    "Computer Science and Design",
    "Civil / Environmental Engineering",
    "Mechanical Engineering",
    "Mechanical and Industrial Engineering",
    "Automobile Engineering",
    "Electrical Engineering",
    "Electrical and Electronics Engineering",
    "Electronics / Communication / Telecommunication Engineering",
    "Electrical and Computer Engineering",
    "Electronics and Computer Engineering",
    "Aeronautical Engineering",
    "Agriculture Engineering",
    "Biotechnology",
    "Chemical Engineering",
    "Instrumentation / Control / Applied Electronics",
    "Food Technology",
    "Manufacturing Technology",
    "Production / Industrial Production Engineering",
    "Plastic Engineering",
    "Textile Technology",
    "Carpet & Textile Technology",
    "Handloom & Textile Technology",
    "Open Elective-1 of 6th Sem",
    "Common Non-Credit Courses",
  ];

  const examPattern = [
    {
      title: "Theory & Practical Balance",
      desc: "Balanced knowledge testing both theoretical concepts and lab applications.",
    },
    {
      title: "Semester Based Exams",
      desc: "Continuous improvement through regular, structured assessment cycles.",
    },
    {
      title: "Projects & Assignments",
      desc: "Direct measurement of practical knowledge and industry readiness.",
    },
  ];

  const studyMaterial = [
    {
      title: "Textbooks & Reference Books",
      desc: "Complete information and deep dives based on the core subject requirements.",
    },
    {
      title: "Online Notes & Video Lectures",
      desc: "Updated content aligned with the demand of current technological trends.",
    },
    {
      title: "Practice Papers & Models",
      desc: "Crucial for understanding and practicing the actual AKTU exam pattern.",
    },
    {
      title: "Group Discussions",
      desc: "Helps clear doubts and share peer-to-peer information and techniques.",
    },
  ];

  const tips = [
    "Time Management: Schedule regular study time in your daily routine.",
    "Divide the Syllabus: Read the entire syllabus in smaller, manageable chunks.",
    "Make Notes: Keep noting down important points to make final revision easier.",
    "Consistent Practice: Solve previous practice papers and take tests regularly.",
    "Collaborative Learning: Group study helps in learning new techniques faster.",
  ];

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 md:px-6">

      {/* HERO */}
      <section className="relative overflow-hidden rounded-3xl border border-zinc-200 dark:border-zinc-800 mb-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-violet-500/10 to-cyan-500/10" />
        
        <div className="relative p-8 md:p-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-300 dark:border-zinc-700 px-4 py-2 text-sm font-medium">
            🎓 AKTU 3rd Year
          </div>

          <h1 className="mt-6 text-4xl md:text-6xl font-black leading-tight">
            AKTU B.Tech
            <span className="block text-blue-600 dark:text-blue-400">
              3rd Year Syllabus (2026-27)
            </span>
          </h1>

          <p className="mt-5 max-w-3xl text-zinc-600 dark:text-zinc-400 text-lg">
            The 3rd year marks a deep dive into core expertise and project work. 
            Download the latest syllabus PDFs for all major and specialized engineering branches.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#downloads"
              className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 font-medium transition"
            >
              Browse Syllabus PDFs
            </a>
          </div>
        </div>
      </section>

      {/* MAIN GRID */}
      <div className="grid lg:grid-cols-[280px_1fr] gap-10">

        {/* TOC SIDEBAR */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-3xl border border-amber-900 dark:border-amber-200 p-5">
            <h2 className="font-bold text-lg mb-5">Table of Contents</h2>
            <nav className="space-y-3 text-sm">
              <a href="#downloads" className="block hover:text-blue-500">Syllabus Downloads</a>
              <a href="#importance" className="block hover:text-blue-500">Importance of 3rd Year</a>
              <a href="#pattern" className="block hover:text-blue-500">Exam Pattern & Evaluation</a>
              <a href="#material" className="block hover:text-blue-500">Study Material Strategy</a>
              <a href="#tips" className="block hover:text-blue-500">Success Tips</a>
              <a href="#conclusion" className="block hover:text-blue-500">Conclusion</a>
            </nav>
          </div>
        </aside>

        {/* CONTENT */}
        <div className="space-y-14">

          {/* DOWNLOADS SECTION */}
          <section id="downloads" className="scroll-mt-28">
            <h2 className="text-3xl font-bold mb-6">Branch-Wise Syllabus PDFs</h2>

            {/* Specialized Branches */}
            <h3 className="text-xl font-bold mb-4 text-zinc-800 dark:text-zinc-200">Specialized & Advanced Branches</h3>
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {specializedBranches.map((branch) => (
                <div
                  key={branch}
                  className="rounded-2xl border border-amber-900 dark:border-amber-200 p-5 flex flex-col justify-between gap-4 hover:shadow-md transition"
                >
                  <h4 className="font-semibold text-lg hover:text-blue-700 transition leading-tight">
                    {branch}
                  </h4>
                  <a
                    href="#"
                    className="text-center rounded-xl bg-blue-600 text-white border border-zinc-300 dark:border-zinc-700 px-4 py-2 hover:bg-blue-800 dark:hover:bg-zinc-900 mt-2"
                  >
                    📥 Download
                  </a>
                </div>
              ))}
            </div>

            {/* All Core Branches */}
            <h3 className="text-xl font-bold mb-4 text-zinc-800 dark:text-zinc-200">All Core & Allied Branches</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {allBranches.map((branch) => (
                <div
                  key={branch}
                  className="rounded-2xl border border-amber-900 dark:border-amber-200 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-md transition"
                >
                  <span className="font-medium text-sm md:text-base hover:text-blue-700 transition">
                    {branch}
                  </span>
                  <a
                    href="#"
                    className="text-center rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800 px-3 py-1.5 text-sm hover:bg-blue-600 hover:text-white transition shrink-0"
                  >
                    Download
                  </a>
                </div>
              ))}
            </div>
          </section>

          {/* IMPORTANCE */}
          <section id="importance" className="scroll-mt-28">
            <h2 className="text-3xl font-bold mb-5">Importance of the 3rd Year Syllabus</h2>
            <p className="leading-8 text-zinc-600 dark:text-zinc-400 mb-4">
              The curriculum of AKTU not only strengthens your technical knowledge but also gives you practical experience. In the 3rd year, students get an opportunity to study their subjects in depth. The 2026-27 curriculum focuses on:
            </p>
            <ul className="space-y-3 list-disc pl-5 text-zinc-600 dark:text-zinc-400 leading-7 text-lg mb-6">
              <li><strong className="text-zinc-900 dark:text-zinc-100">Education Areas of Expertise:</strong> Deep understanding and analysis across various core subjects.</li>
              <li><strong className="text-zinc-900 dark:text-zinc-100">Project Work:</strong> Practical and experiential training that bridges the gap between theory and industry.</li>
              <li><strong className="text-zinc-900 dark:text-zinc-100">Latest Technologies:</strong> Updated curriculum adapted to modern industry standards.</li>
            </ul>
          </section>

          {/* EXAM PATTERN */}
          <section id="pattern" className="scroll-mt-28">
            <h2 className="text-3xl font-bold mb-6">Exam Pattern & Evaluation</h2>
            <p className="leading-8 text-zinc-600 dark:text-zinc-400 mb-6">
              It is crucial to pay attention to the syllabus as well as the exam pattern. AKTU's assessment structure in the 3rd Year requires regular study to succeed:
            </p>
            <div className="grid lg:grid-cols-3 gap-4">
              {examPattern.map((item) => (
                <div key={item.title} className="rounded-3xl border border-amber-900 dark:border-amber-200 p-6 hover:shadow-lg transition">
                  <h3 className="font-bold text-lg mb-3">{item.title}</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* STUDY MATERIAL */}
          <section id="material" className="scroll-mt-28">
            <h2 className="text-3xl font-bold mb-6">Study Material & Strategy</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {studyMaterial.map((item) => (
                <div key={item.title} className="rounded-2xl border border-amber-900 dark:border-amber-200 p-5 hover:shadow-md transition">
                  <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* TIPS */}
          <section id="tips" className="scroll-mt-28">
            <h2 className="text-3xl font-bold mb-6">Tips to be Successful</h2>
            <div className="space-y-4">
              {tips.map((tip, idx) => {
                const [boldPart, ...rest] = tip.split(':');
                return (
                  <div key={idx} className="rounded-2xl border border-amber-900 dark:border-amber-200 p-5">
                    <p className="text-zinc-700 dark:text-zinc-300">
                      <strong className="text-zinc-900 dark:text-zinc-100 mr-2">{boldPart}:</strong>
                      {rest.join(':')}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* CONCLUSION */}
          <section id="conclusion" className="scroll-mt-28">
            <h2 className="text-3xl font-bold mb-5">Conclusion</h2>
            <p className="leading-8 text-zinc-600 dark:text-zinc-400">
              The AKTU 3rd Year Syllabus (2026-27) brings new directions and challenges in your educational journey. By preparing in the right direction, practicing regularly, and following consistent strategies, you can achieve great success this year. Keep moving forward and make your technical dreams a reality!
            </p>
          </section>

          {/* CTA */}
          <section className="rounded-3xl border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/20 p-8">
            <h2 className="text-2xl font-bold">Ready to start preparing?</h2>
            <p className="mt-3 text-zinc-600 dark:text-zinc-400">
              Make sure you have downloaded the correct syllabus for your specific branch and start dividing your units today.
            </p>
            <a
              href="#downloads"
              className="inline-block mt-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-3 transition"
            >
              Back to Downloads
            </a>
          </section>

        </div>
      </div>
    </main>
  );
}