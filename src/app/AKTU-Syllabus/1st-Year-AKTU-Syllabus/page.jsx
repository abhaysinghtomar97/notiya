import PdfPreview from "@/components/pdfPreview";
import WhatsappChannel from "@/components/WhatsappChannel";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "AKTU B.Tech 1st Year Syllabus PDF Download (2026-27) | All Streams",
  description: "Download the newly updated AKTU B.Tech First Year Syllabus PDF (2026-27). Check the latest NEP 2020 curriculum for CSE, ME, EE, ECE, and CE branches.",
  keywords: "AKTU syllabus 2026, AKTU B.Tech 1st year syllabus, AKTU new syllabus PDF, CSE syllabus AKTU, AICTE model curriculum AKTU",
};

export default function Page() {
  // Using objects to manage type (Theory/Lab), unique status, and page numbers
  const sem1Subjects = [
    { course: "Quantum Physics and Applications / Applied Chemistry", type: "Theory", isUnique: false, page: "5-10" },
    { course: "Calculus and Linear Algebra", type: "Theory", isUnique: true, page: "11-13" },
    { course: "Fundamentals of Electrical Engg / Electronics Engg", type: "Theory", isUnique: false, page: "16-21" },
    { course: "Programming Languages", type: "Theory", isUnique: true, page: "22-25" },
    { course: "Indian Knowledge System / Professional Communication", type: "Theory", isUnique: false, page: "26-31" },
    { course: "Intro to AI & Prompt Engg / Mechanical Engg", type: "Theory", isUnique: false, page: "32-38" },
    { course: "Applied Physics Lab / Applied Chemistry Lab", type: "Lab", isUnique: false, page: "39-44" },
    { course: "Electrical Engg Lab / Electronics Engg Lab", type: "Lab", isUnique: false, page: "45-51" },
    { course: "CAD Lab / Innovation & Design Thinking Lab", type: "Lab", isUnique: false, page: "52-57" },
    { course: "Language Lab / Environment & Sustainability", type: "Lab", isUnique: false, page: "58-62" },
    { course: "General Proficiency", type: "Lab", isUnique: false, page: "63" },
  ];

  const sem2Subjects = [
    { course: "Quantum Physics and Applications / Applied Chemistry", type: "Theory", isUnique: false, page: "5-10" },
    { course: "Numerical Methods", type: "Theory", isUnique: true, page: "14-15" },
    { course: "Fundamentals of Electrical Engg / Electronics Engg", type: "Theory", isUnique: false, page: "16-21" },
    { course: "Essentials of Data Structure", type: "Theory", isUnique: true, page: "N/A" },
    { course: "Indian Knowledge System / Professional Communication", type: "Theory", isUnique: false, page: "26-31" },
    { course: "Intro to AI & Prompt Engg / Mechanical Engg", type: "Theory", isUnique: false, page: "32-38" },
    { course: "Applied Physics Lab / Applied Chemistry Lab", type: "Lab", isUnique: false, page: "39-44" },
    { course: "Electrical Engg Lab / Electronics Engg Lab", type: "Lab", isUnique: false, page: "45-51" },
    { course: "CAD Lab / Innovation & Design Thinking Lab", type: "Lab", isUnique: false, page: "52-57" },
    { course: "Language Lab / Environment & Sustainability", type: "Lab", isUnique: false, page: "58-62" },
    { course: "General Proficiency", type: "Lab", isUnique: false, page: "63" },
  ];

  // Flexible array for managing all streams
  const syllabusDownloads = [
    {
      stream: "B.Tech First Year (CSE Stream)",
      status: "Available",
      link: "https://drive.google.com/file/d/1P8A4vYEOMgBlOdETyJ1934pzUOcz2Yge/view?usp=drive_link",
      driveId: "1P8A4vYEOMgBlOdETyJ1934pzUOcz2Yge",
    },
    {
      stream: "B.Tech First Year (Mechanical Stream)",
      status: "Coming Soon",
      link: "#",
      driveId: null,
    },
    {
      stream: "B.Tech First Year (Civil Stream)",
      status: "Coming Soon",
      link: "#",
      driveId: null,
    },
    {
      stream: "B.Tech First Year (Electrical Stream)",
      status: "Coming Soon",
      link: "#",
      driveId: null,
    },
    {
      stream: "B.Tech First Year (Electronics Stream)",
      status: "Coming Soon",
      link: "#",
      driveId: null,
    },
  ];

  const branches = [
    "CSE",
    "IT",
    "CSIT",
    "AIML",
    "Data Science",
    "Cyber Security",
    "Mechanical",
    "Civil",
    "Electrical",
    "Electronics",
  ];

  // JSON-LD Schema for FAQs to get Google Rich Snippets
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Do all branches have the same first-year syllabus?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Different streams (CSE, ME, CE, EE) have slight variations in their branch-specific subjects, but core subjects like Math, Physics, and Chemistry are largely shared."
        }
      },
      {
        "@type": "Question",
        "name": "Which programming languages are taught?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The CSE Stream covers C and Python programming fundamentals in the first year."
        }
      },
      {
        "@type": "Question",
        "name": "Is first-year Mathematics difficult?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Regular practice makes it manageable and easier. The new syllabus focuses heavily on Calculus and Linear Algebra."
        }
      }
    ]
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 md:px-6">
      
      {/* PAGE TITLE (Crucial for SEO) */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          AKTU B.Tech 1st Year Syllabus (2026-27)
        </h1>
        <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
          Download the latest AICTE & NEP 2020 aligned curriculum for all branches.
        </p>
      </div>

      {/* HERO */}
      <section className="relative overflow-hidden flex justify-center items-center rounded-3xl mb-10">
        <Image
          src="/1st-year-syllabus.png"
          alt="AKTU B.Tech 1st Year Syllabus 2026-27 PDF Download"
          width={1200}
          height={600}
          priority
          draggable={false}
          loading="eager"
          className="border rounded-2xl"
        />
      </section>

      {/* PDF SECTION */}
      <section className="mb-12">
        <div className="rounded-3xl border border-black dark:border-zinc-800 overflow-hidden">
          <div className="bg-main dark:bg-amber-900 px-5 py-4 font-semibold">
            Syllabus Downloads by Stream
          </div>

          <div className="p-5 space-y-4">
            {syllabusDownloads.map((item, index) => (
              <div
                key={index}
                className={`flex flex-col md:flex-row md:items-center md:justify-between gap-4 rounded-2xl border p-5 ${
                  item.status === "Available"
                    ? "bg-amber-600/10 border-amber-900 dark:border-amber-200"
                    : "bg-gray-50 border-gray-200 dark:bg-zinc-900/50 dark:border-zinc-800 opacity-60 grayscale"
                }`}
              >
                <div>
                  <h2 className={`text-lg ${item.status === "Available" ? "font-semibold hover:text-blue-700" : "font-medium text-gray-500"}`}>
                    {item.status === "Available" ? (
                      <a href={item.link} target="_blank" rel="noopener noreferrer">
                        {item.stream}
                      </a>
                    ) : (
                      <span>{item.stream}</span>
                    )}
                  </h2>
                  <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">
                    {item.status === "Available" ? "Official AKTU Syllabus PDF (2026-27)" : "Pending official release"}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {item.status === "Available" ? (
                    <>
                      {item.driveId && <PdfPreview driveId={item.driveId} />}
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-center rounded-xl bg-blue-600 text-white border border-zinc-300 dark:border-zinc-700 px-4 py-2 hover:bg-blue-800 dark:hover:bg-zinc-900 transition-colors"
                      >
                        Download
                      </a>
                    </>
                  ) : (
                    <span className="px-4 py-2 bg-gray-200 dark:bg-zinc-800 text-gray-500 rounded-xl text-sm font-medium">
                      Coming Soon
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <div className="grid lg:grid-cols-[280px_1fr] gap-10">
        {/* TOC */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-3xl border bg-amber-900/10 border-amber-900 dark:border-amber-200 p-5">
            <h2 className="font-bold text-lg mb-5">Table of Contents</h2>
            <nav className="space-y-3 text-sm underline text-blue-600">
              <a href="#why" className="block hover:text-blue-500">Why the 1st Year Syllabus Matters</a>
              <a href="#sem1" className="block hover:text-blue-500">Semester 1 Subjects</a>
              <a href="#sem2" className="block hover:text-blue-500">Semester 2 Subjects</a>
              <a href="#branches" className="block hover:text-blue-500">Branches Covered</a>
              <a href="#prepare" className="block hover:text-blue-500">Preparation Tips</a>
              <a href="#final" className="block hover:text-blue-500">Final Thoughts</a>
              <a href="#faq" className="block hover:text-blue-500">FAQs</a>
            </nav>
          </div>
        </aside>

        {/* CONTENT */}
        <div className="space-y-14">
          <section id="why" className="scroll-mt-28">
            <h2 className="text-3xl font-bold mb-5">Why the 1st Year Syllabus Matters</h2>
            <p className="leading-8 text-zinc-600 dark:text-zinc-400">
              The first year of B.Tech is like the root of a tree. It builds the foundation of mathematics, science, programming, engineering concepts, and communication skills. The newly updated 2026-27 curriculum aligns with NEP 2020 and introduces modern concepts like AI & Prompt Engineering early on. Most subjects are common across all branches, ensuring students develop a strong technical base before moving into specialized subjects.
            </p>
          </section>

          <section id="sem1" className="scroll-mt-28">
            <h2 className="text-3xl font-bold mb-6">Semester 1 Subjects (CSE Stream)</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden whitespace-nowrap md:whitespace-normal">
                <thead className="bg-gray-100 dark:bg-gray-800">
                  <tr>
                    <th className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-left w-16">S.No.</th>
                    <th className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-left">Course Name</th>
                    <th className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-left w-24">Type</th>
                    <th className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-left w-24">Page No.</th>
                  </tr>
                </thead>
                <tbody>
                  {sem1Subjects.map((subject, index) => (
                    <tr
                      key={index}
                      className={`
                        ${subject.type === "Lab" 
                          ? "bg-emerald-50 dark:bg-emerald-900/10 hover:bg-emerald-100 dark:hover:bg-emerald-900/30" 
                          : "bg-blue-50 dark:bg-blue-900/10 hover:bg-blue-100 dark:hover:bg-blue-900/30"}
                      `}
                    >
                      <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">
                        {index + 1}
                      </td>
                      <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 font-medium">
                        {subject.course}
                        {subject.isUnique && (
                          <span className="inline-block ml-2 text-xs font-semibold bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200 px-2 py-0.5 rounded-full">
                            Unique to Sem 1
                          </span>
                        )}
                      </td>
                      <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">
                        {subject.type}
                      </td>
                      <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-zinc-600 dark:text-zinc-400">
                        {subject.page}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section id="sem2" className="scroll-mt-28">
            <h2 className="text-3xl font-bold mb-6">Semester 2 Subjects (CSE Stream)</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden whitespace-nowrap md:whitespace-normal">
                <thead className="bg-gray-100 dark:bg-gray-800">
                  <tr>
                    <th className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-left w-16">S.No.</th>
                    <th className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-left">Course Name</th>
                    <th className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-left w-24">Type</th>
                    <th className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-left w-24">Page No.</th>
                  </tr>
                </thead>
                <tbody>
                  {sem2Subjects.map((subject, index) => (
                    <tr
                      key={index}
                      className={`
                        ${subject.type === "Lab" 
                          ? "bg-emerald-50 dark:bg-emerald-900/10 hover:bg-emerald-100 dark:hover:bg-emerald-900/30" 
                          : "bg-blue-50 dark:bg-blue-900/10 hover:bg-blue-100 dark:hover:bg-blue-900/30"}
                      `}
                    >
                      <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">
                        {index + 1}
                      </td>
                      <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 font-medium">
                        {subject.course}
                        {subject.isUnique && (
                          <span className="inline-block ml-2 text-xs font-semibold bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-200 px-2 py-0.5 rounded-full">
                            Unique to Sem 2
                          </span>
                        )}
                      </td>
                      <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">
                        {subject.type}
                      </td>
                      <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-zinc-600 dark:text-zinc-400">
                        {subject.page}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section id="branches" className="scroll-mt-28">
            <h2 className="text-3xl font-bold mb-6">Branches Covered Under This Syllabus</h2>
            <div className="flex flex-wrap gap-3">
              {branches.map((branch) => (
                <span
                  key={branch}
                  className="rounded-full border border-amber-900 dark:border-amber-200 px-4 py-2"
                >
                  {branch}
                </span>
              ))}
            </div>
          </section>

          <section id="prepare" className="scroll-mt-28">
            <h2 className="text-3xl font-bold mb-6">How to Prepare for the 1st Year Syllabus</h2>
            <div className="space-y-4">
              {[
                "Read the syllabus carefully.",
                "Create a semester-wise study plan.",
                "Focus on Mathematics and Programming fundamentals.",
                "Practice laboratory work regularly.",
                "Solve previous year papers.",
                "Develop communication and soft skills.",
              ].map((tip) => (
                <div key={tip} className="rounded-2xl border border-amber-900 dark:border-amber-200 p-4">
                  {tip}
                </div>
              ))}
            </div>
          </section>

          <section id="final" className="scroll-mt-28">
            <h2 className="text-3xl font-bold mb-5">Final Thoughts</h2>
            <p className="leading-8 text-zinc-600 dark:text-zinc-400">
              The AKTU B.Tech First Year Syllabus provides a balanced combination of theory and practical subjects. Whether you want to pursue software development, core engineering, research, or entrepreneurship, the first year creates the foundation for future success.
            </p>
          </section>

          <section id="faq" className="scroll-mt-28">
            <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <details className="rounded-2xl border border-amber-900 dark:border-amber-200 p-5">
                <summary className="cursor-pointer font-semibold">Do all branches have the same first-year syllabus?</summary>
                <p className="mt-3 text-zinc-600 dark:text-zinc-400">
                  Different streams (CSE, ME, CE, EE) have slight variations in their branch-specific subjects, but core subjects like Math, Physics, and Chemistry are largely shared.
                </p>
              </details>
              <details className="rounded-2xl border border-amber-900 dark:border-amber-200 p-5">
                <summary className="cursor-pointer font-semibold">Which programming languages are taught?</summary>
                <p className="mt-3 text-zinc-600 dark:text-zinc-400">
                  The CSE Stream covers C and Python programming fundamentals in the first year.
                </p>
              </details>
              <details className="rounded-2xl border border-amber-900 dark:border-amber-200 p-5">
                <summary className="cursor-pointer font-semibold">Is first-year Mathematics difficult?</summary>
                <p className="mt-3 text-zinc-600 dark:text-zinc-400">
                  Regular practice makes it manageable and easier. The new syllabus focuses heavily on Calculus and Linear Algebra.
                </p>
              </details>
            </div>
          </section>

          <section className="rounded-3xl border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/20 p-6">
            <h2 className="text-2xl font-bold">Continue Exploring</h2>
            <p className="mt-3 text-zinc-600 dark:text-zinc-400">
              After completing your first year, check the updated AKTU 2nd Year syllabus for branch-specific subjects.
            </p>
            <Link
              href="/AKTU-Syllabus/2nd-Year-AKTU-Syllabus"
              className="inline-block mt-5 text-blue-600 dark:text-blue-400 font-medium"
            >
              → View AKTU 2nd Year Syllabus
            </Link>
          </section>
        </div>
      </div>

      <div className="mt-16">
        <WhatsappChannel />
      </div>

      {/* INJECT FAQ SCHEMA FOR GOOGLE RICH SNIPPETS */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </main>
  );
}