import Link from "next/link";

export const metadata = {
  title:
    "AKTU B.Tech 4th Year Syllabus PDF Download (2026-27) | 7th & 8th Semester",
  description:
    "Download AKTU B.Tech 4th Year (7th & 8th Semester) Syllabus PDF. Covering core subjects, open electives, and major project details for CSE, IT, and other branches.",
};

export default function Page() {
  const branches = [
    "Computer Science & Engineering (CSE)",
    "Information Technology (IT)",
    "Electronics & Communication (ECE)",
    "Electrical Engineering (EE)",
    "Mechanical Engineering (ME)",
    "Civil Engineering (CE)",
    "Artificial Intelligence (AI & ML)",
    "Data Science",
  ];

  const seventhSemSubjects = [
    { no: "1", name: "Humanities & Social Sciences Management Course – I", code: "KHU701", type: "Theory", credits: "3" },
    { no: "2", name: "Departmental Elective – IV", code: "KCS07X", type: "Theory", credits: "3" },
    { no: "3", name: "Departmental Elective – V", code: "KCS07X", type: "Theory", credits: "3" },
    { no: "4", name: "Mini Project / Internship (4–6 weeks)", code: "—", type: "Practical/Project", credits: "2" },
  ];

  const electiveFour = [
    { name: "Artificial Intelligence", code: "KCS071" },
    { name: "Natural Language Processing", code: "KCS072" },
    { name: "High Performance Computing", code: "KCS073" },
    { name: "Cryptography and Network Security", code: "KCS074" },
    { name: "Design & Development of Applications", code: "KCS075" },
    { name: "Software Testing", code: "KCS076" },
    { name: "Distributed Systems", code: "KCS077" },
  ];

  const electiveFive = [
    { name: "Deep Learning", code: "KCS078" },
    { name: "Service Oriented Architecture", code: "KCS079" },
    { name: "Quantum Computing", code: "KCS710" },
    { name: "Mobile Computing", code: "KCS711" },
    { name: "Internet of Things (IoT)", code: "KCS712" },
    { name: "Cloud Computing", code: "KCS713" },
    { name: "Blockchain Architecture Design", code: "KCS714" },
  ];

  const eighthSemSubjects = [
    { no: "1", name: "Humanities & Social Sciences Management Course – II", code: "KHU801", type: "Theory", credits: "3" },
    { no: "2", name: "Open Elective – III", code: "KOE08X", type: "Theory", credits: "3" },
    { no: "3", name: "Open Elective – IV", code: "KOE08X", type: "Theory", credits: "3" },
    { no: "4", name: "Major Project", code: "KCS851", type: "Project", credits: "9" },
  ];

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 md:px-6">

      {/* HERO */}
      <section className="relative overflow-hidden rounded-3xl border border-zinc-200 dark:border-zinc-800 mb-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-violet-500/10 to-cyan-500/10" />
        
        <div className="relative p-8 md:p-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-300 dark:border-zinc-700 px-4 py-2 text-sm font-medium">
            🎓 AKTU Final Year
          </div>

          <h1 className="mt-6 text-4xl md:text-6xl font-black leading-tight">
            AKTU B.Tech
            <span className="block text-blue-600 dark:text-blue-400">
              4th Year Syllabus
            </span>
          </h1>

          <p className="mt-5 max-w-3xl text-zinc-600 dark:text-zinc-400 text-lg">
            Welcome to the final stretch! Download the 7th and 8th semester syllabus PDFs. 
            Get ready to tackle your major projects, core electives, and secure those campus placements.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#downloads"
              className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 font-medium transition"
            >
              Get Syllabus PDFs
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
              <a href="#importance" className="block hover:text-blue-500">Why the 4th Year Matters</a>
              <a href="#downloads" className="block hover:text-blue-500">Branch-Wise Downloads</a>
              <a href="#quick-look" className="block hover:text-blue-500">Semester Quick Look</a>
              <a href="#data-tables" className="block hover:text-blue-500">Detailed Subject Data</a>
              <a href="#final-tips" className="block hover:text-blue-500">Final Tips & Resources</a>
            </nav>
          </div>
        </aside>

        {/* CONTENT */}
        <div className="space-y-14">

        

          {/* DOWNLOADS SECTION */}
          <section id="downloads" className="scroll-mt-28">
            <h2 className="text-3xl font-bold mb-6">Download Final Year Syllabus PDFs</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {branches.map((branch) => (
                <div
                  key={branch}
                  className="rounded-2xl border border-amber-900 dark:border-amber-200 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-md transition"
                >
                  <span className="font-medium text-sm md:text-base  transition">
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
            <h2 className="text-3xl font-bold mb-5">Why is the 4th Year Syllabus So Important?</h2>
            <p className="leading-8 text-zinc-600 dark:text-zinc-400 mb-4">
              Your final year isn't just about passing exams—it's the bridge between academia and the professional world. Your core courses, specialized electives, and major projects are directly tied to how you'll perform in competitive exams and job placements. 
            </p>
            <p className="leading-8 text-zinc-600 dark:text-zinc-400 mb-4">
              With heavily weighted project-based assessments and an influx of new, industry-relevant technologies in the updated curriculum, you need complete clarity on:
            </p>
            <ul className="space-y-3 list-disc pl-5 text-zinc-600 dark:text-zinc-400 leading-7 text-lg mb-6">
              <li><strong className="text-zinc-900 dark:text-zinc-100">Semester breakdown:</strong> Exactly which courses you are taking and when.</li>
              <li><strong className="text-zinc-900 dark:text-zinc-100">Study materials:</strong> The recommended textbooks and reference guides.</li>
              <li><strong className="text-zinc-900 dark:text-zinc-100">Exam strategy:</strong> Identifying high-weightage units for efficient preparation.</li>
              <li><strong className="text-zinc-900 dark:text-zinc-100">Scoring breakdown:</strong> Understanding how internal and external marks are divided for theory and projects.</li>
            </ul>
          </section>

          {/* QUICK LOOK OVERVIEW */}
          <section id="quick-look" className="scroll-mt-28">
            <h2 className="text-3xl font-bold mb-6">4th Year Overview (CSE/IT & Similar Branches)</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 p-6">
                <h3 className="font-bold text-xl mb-4 text-blue-600 dark:text-blue-400">📖 7th Semester Focus</h3>
                <ul className="space-y-3 text-zinc-600 dark:text-zinc-400">
                  <li>→ Artificial Intelligence</li>
                  <li>→ Distributed Systems</li>
                  <li>→ Compiler Design</li>
                  <li>→ Professional Electives (e.g., ML, Cybersecurity)</li>
                  <li>→ Minor Project (Phase-I)</li>
                  <li>→ Industrial Training / Internship Assessment</li>
                </ul>
              </div>

              <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 p-6">
                <h3 className="font-bold text-xl mb-4 text-blue-600 dark:text-blue-400">📖 8th Semester Focus</h3>
                <ul className="space-y-3 text-zinc-600 dark:text-zinc-400">
                  <li>→ Big Data Analytics</li>
                  <li>→ Cloud Computing</li>
                  <li>→ Open Electives (Interdisciplinary)</li>
                  <li>→ Major Project / Dissertation (High Credit Weightage)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* DETAILED TABLES */}
          <section id="data-tables" className="scroll-mt-28">
            <h2 className="text-3xl font-bold mb-8">Detailed Subject Data & Credits</h2>

            {/* 7th Sem Table */}
            <h3 className="text-2xl font-bold mb-4"> 7th Semester (VII) Structure</h3>
            <div className="overflow-x-auto rounded-2xl border border-amber-900 dark:border-amber-200 mb-8">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="bg-amber-100 dark:bg-amber-900/40 border-b border-amber-900 dark:border-amber-200">
                    <th className="p-4 font-semibold text-zinc-900 dark:text-zinc-100">S.No.</th>
                    <th className="p-4 font-semibold text-zinc-900 dark:text-zinc-100">Subject Name</th>
                    <th className="p-4 font-semibold text-zinc-900 dark:text-zinc-100">Code</th>
                    <th className="p-4 font-semibold text-zinc-900 dark:text-zinc-100">Type</th>
                    <th className="p-4 font-semibold text-zinc-900 dark:text-zinc-100">Credits</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-amber-900/20 dark:divide-amber-200/20">
                  {seventhSemSubjects.map((row) => (
                    <tr key={row.no} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                      <td className="p-4 text-zinc-600 dark:text-zinc-400">{row.no}</td>
                      <td className="p-4 text-zinc-900 dark:text-zinc-200 font-medium">{row.name}</td>
                      <td className="p-4 text-zinc-600 dark:text-zinc-400">{row.code}</td>
                      <td className="p-4 text-zinc-600 dark:text-zinc-400">{row.type}</td>
                      <td className="p-4 text-zinc-600 dark:text-zinc-400 font-semibold">{row.credits}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Electives Grids */}
            <div className="grid lg:grid-cols-2 gap-6 mb-10">
              <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-5">
                <h4 className="font-bold text-lg mb-3">Elective IV Options (KCS07X)</h4>
                <div className="space-y-2">
                  {electiveFour.map(sub => (
                    <div key={sub.code} className="flex justify-between text-sm p-2 bg-zinc-50 dark:bg-zinc-900 rounded-lg">
                      <span className="text-zinc-700 dark:text-zinc-300">{sub.name}</span>
                      <span className="font-mono text-zinc-500">{sub.code}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-5">
                <h4 className="font-bold text-lg mb-3">Elective V Options (KCS07X/KCS71X)</h4>
                <div className="space-y-2">
                  {electiveFive.map(sub => (
                    <div key={sub.code} className="flex justify-between text-sm p-2 bg-zinc-50 dark:bg-zinc-900 rounded-lg">
                      <span className="text-zinc-700 dark:text-zinc-300">{sub.name}</span>
                      <span className="font-mono text-zinc-500">{sub.code}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 8th Sem Table */}
            <h3 className="text-2xl font-bold mb-4">8th Semester (VIII) Structure</h3>
            <div className="overflow-x-auto rounded-2xl border border-amber-900 dark:border-amber-200 mb-6">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="bg-amber-100 dark:bg-amber-900/40 border-b border-amber-900 dark:border-amber-200">
                    <th className="p-4 font-semibold text-zinc-900 dark:text-zinc-100">S.No.</th>
                    <th className="p-4 font-semibold text-zinc-900 dark:text-zinc-100">Subject Name</th>
                    <th className="p-4 font-semibold text-zinc-900 dark:text-zinc-100">Code</th>
                    <th className="p-4 font-semibold text-zinc-900 dark:text-zinc-100">Type</th>
                    <th className="p-4 font-semibold text-zinc-900 dark:text-zinc-100">Credits</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-amber-900/20 dark:divide-amber-200/20">
                  {eighthSemSubjects.map((row) => (
                    <tr key={row.no} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                      <td className="p-4 text-zinc-600 dark:text-zinc-400">{row.no}</td>
                      <td className="p-4 text-zinc-900 dark:text-zinc-200 font-medium">{row.name}</td>
                      <td className="p-4 text-zinc-600 dark:text-zinc-400">{row.code}</td>
                      <td className="p-4 text-zinc-600 dark:text-zinc-400">{row.type}</td>
                      <td className="p-4 text-zinc-600 dark:text-zinc-400 font-semibold">{row.credits}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="rounded-xl bg-zinc-100 dark:bg-zinc-900 p-4 border border-zinc-200 dark:border-zinc-800 text-sm text-zinc-600 dark:text-zinc-400">
              <strong className="text-zinc-900 dark:text-zinc-100">💡 Note:</strong> Elective subject options may vary depending on what your specific college offers. Additionally, MOOCs (Massive Open Online Courses) are mandatory if you are opting for an Honours degree.
            </div>

          </section>

          {/* FINAL TIPS & CTA */}
          <section id="final-tips" className="scroll-mt-28">
            <div className="rounded-3xl border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/20 p-8">
              <h2 className="text-2xl font-bold mb-4">Final Tip for the Finish Line</h2>
              <p className="text-zinc-700 dark:text-zinc-300 mb-6 leading-relaxed">
                Stay intensely organized this year. Keep your syllabus printed on your study wall, saved on your phone, or bookmarked here. Track your progress unit by unit so you walk into exams—and placement interviews—with complete confidence.
              </p>

              <h3 className="font-bold text-lg mb-3">Why stick with us?</h3>
              <ul className="space-y-2 text-zinc-700 dark:text-zinc-300 mb-8 list-disc pl-5">
                <li>Accredited academic data sourced officially from AKTU.</li>
                <li>A clean, fast, and completely distraction-free download experience.</li>
                <li>Comprehensive study materials and notes for every single semester.</li>
              </ul>
              
              <a
                href="#downloads"
                className="inline-block rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 transition shadow-sm hover:shadow-md"
              >
                Download Your Syllabus Now
              </a>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}