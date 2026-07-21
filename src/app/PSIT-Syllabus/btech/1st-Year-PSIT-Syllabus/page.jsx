import PdfPreview from "@/components/pdfPreview";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "PSIT (Autonomous) B.Tech 1st Year Syllabus PDF (2026) | All Branches",
  description: "Download PSIT (Autonomous) B.Tech First Year Syllabus PDF. Recognized under UGC Act, 1956. Covering core subjects and syllabus details for CSE, IT, CS-AI, CS-AIML, CS-DS, and EC branches.",
};

export default function page() {
  // Added a placeholder driveId to demonstrate the PdfPreview connection
  const psitSubjects = [
    { id: "bs204", code: "BS204", name: "Semiconductor Physics and Devices", driveId: "https://drive.google.com/file/d/1oZpWB8hivOrdLZ19tt3aoE0dZazx9Xs0/preview" },
    { id: "cs201", code: "CS201", name: "Discrete Mathematics", driveId: "https://drive.google.com/file/d/1I39uxB_BgTjlfkdBGiNumNim77oh05cz/preview" },
    { id: "cs202", code: "CS202", name: "Data Structures", driveId: "https://drive.google.com/file/d/1H_pKEf5g_a7U1s3hESrW3enbvI4K5fk7/preview" },
    { id: "math1", code: "BS101", name: "Differential Equations and Linear Algebra", driveId: "https://drive.google.com/file/d/1lf6aZpEZ8xBAjtQisGL_ThGx-tEvPN03/preview" },
    { id: "math2", code: "BAS103", name: "Matrices and Calculus", driveId: "https://drive.google.com/file/d/1tyRggUBlFvY8SAfOLBcYpnjN9cui7nQJ/preview" },
    { id: "env", code: "BS102", name: "Environmental Science and Waste Management", driveId: "https://drive.google.com/file/d/1Ptmk3AhTLsScbf6RtthMr_kBWy9iwF0O/preview" },
  ];

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 md:px-6">
      
    {/* HERO */}
      <section className="relative overflow-hidden flex flex-col justify-center items-center rounded-3xl mb-10 text-center">
         <Image  
                src='/PSIT-1st-year-syllabus.png'  
                alt="B.Tech 1st Year"
                width={1200}
                height={600}
                priority
                draggable={false}
                loading="eager" 
                className="border rounded-2xl" />

        <p className="mt-4 font-semibold text-lg">PSIT (Autonomous) B.Tech 1st Year Syllabus PDF (2026) | All Branches</p>
        <p className="text-zinc-500 mb-6 max-w-2xl mt-2">
          Recognized under Section 2(f) of the UGC Act, 1956 and approved by AICTE. 
          Access the official curriculum for the B.Tech First Year Autonomous program.
        </p>
      </section>

      {/* --- QUICK NAVIGATION TO NOTES --- */}
      <section className="flex justify-center w-full mb-12">
        <Link
          href="/study-material/psit/btech/1st-year" /* Replace with your actual notes route, e.g., '/notes' or an ID link */
          className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 text-base font-bold text-white transition-all duration-300 ease-in-out rounded-full bg-gradient-to-r from-amber-500 to-amber-600 dark:from-amber-600 dark:to-amber-700 hover:from-amber-600 hover:to-amber-700 dark:hover:from-amber-500 dark:hover:to-amber-600 shadow-[0_0_15px_rgba(245,158,11,0.4)] hover:shadow-[0_0_30px_rgba(245,158,11,0.7)] hover:-translate-y-1 overflow-hidden"
        >
          {/* Subtle shine effect on hover */}
          <span className="absolute inset-0 w-full h-full -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shimmer_1.5s_infinite] transition-transform duration-700 group-hover:translate-x-full"></span>
          
          <span className="relative flex items-center gap-2">
            <span>📚 Jump Directly to Study Notes</span>
            {/* Bouncing Arrow Icon to attract attention */}
            <svg 
              className="w-5 h-5 animate-bounce group-hover:animate-none group-hover:translate-y-1 transition-transform" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </span>
        </Link>
      </section>
      
      {/* PDF SECTION - Fixed Layout */}
      <section className="mb-12">
        <div className="rounded-3xl border border-black dark:border-zinc-800 overflow-hidden shadow-sm">
          <div className="bg-amber-600/10 px-5 py-4 font-semibold border-b border-amber-900/10 dark:border-amber-100/10">
            Available Downloads
          </div>
          
          <div className="p-5 space-y-4">
            {psitSubjects.map((subject) => (
              <div 
                key={subject.id} 
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border bg-amber-600/5 hover:bg-amber-600/10 border-amber-900/20 dark:border-amber-200/20 p-5 transition-colors"
              >
                <div>
                  <h2 className="font-semibold text-lg text-foreground">
                    {subject.name}
                  </h2>
                  <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">
                    Code: <span className="font-mono font-medium">{subject.code}</span> • Official Syllabus PDF
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <PdfPreview pdfUrl={subject.driveId} />
                  
                  <a
                    href={subject.driveId}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-center rounded-xl bg-blue-600 text-white border border-transparent px-4 py-2 text-sm font-medium hover:bg-blue-700 transition-colors"
                  >
                    Download
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* CONTENT GRID */}
      <div className="grid lg:grid-cols-[280px_1fr] gap-10">

        {/* TOC */}
        <aside className="hidden lg:block ">
          <div className="sticky top-24 rounded-3xl border bg-amber-900/5 border-amber-900/20 dark:border-amber-200/20 p-5">
            <h2 className="font-bold text-lg mb-5">Table of Contents</h2>
            <nav className="space-y-3 text-sm underline text-blue-600">
              <a href="#objectives" className="block hover:text-blue-500 transition-colors">Course Objectives</a>
              <a href="#subjects" className="block hover:text-blue-500 transition-colors">Subject List</a>
              <a href="#why-it-matters" className="block hover:text-blue-500 transition-colors">Why This Autonomous Syllabus Matters</a>
            </nav>
          </div>
        </aside>

        {/* CONTENT */}
        <div className="space-y-14">
          
          <section id="objectives" className="scroll-mt-28">
            <h2 className="text-3xl font-bold mb-5">Course Objectives</h2>
            <p className="leading-8 text-zinc-600 dark:text-zinc-400">
              The objective is to provide B.Tech students with fundamental knowledge of environmental science and waste management, 
              focusing on pollutants, sustainable technologies, waste classification, treatment strategies, and analytical techniques, 
              enabling them to address engineering problems with an environmentally responsible approach[cite: 1].
            </p>
          </section>

          {/* Simple Rectangular Table for Subjects */}
          <section id="subjects" className="scroll-mt-28">
            <h2 className="text-3xl font-bold mb-6">Subject List</h2>
            
            <div className="overflow-x-auto rounded-xl border border-gray-300 dark:border-gray-700 bg-card shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-100 dark:bg-gray-800/50">
                  <tr>
                    <th className="border-b border-gray-300 dark:border-gray-700 px-5 py-4 font-semibold text-sm w-16">
                      S.No.
                    </th>
                    <th className="border-b border-gray-300 dark:border-gray-700 px-5 py-4 font-semibold text-sm w-32">
                      Code
                    </th>
                    <th className="border-b border-gray-300 dark:border-gray-700 px-5 py-4 font-semibold text-sm">
                      Subject Name
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                  {psitSubjects.map((subject, index) => (
                    <tr 
                      key={subject.id} 
                      className="hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors"
                    >
                      <td className="px-5 py-4 text-sm text-muted-foreground">
                        {index + 1}
                      </td>
                      <td className="px-5 py-4 text-sm font-mono font-medium text-amber-600">
                        {subject.code}
                      </td>
                      <td className="px-5 py-4 text-sm font-medium text-foreground">
                        {subject.name}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

                {/* WHY IT MATTERS SECTION */}
<section id="why-it-matters" className="scroll-mt-28">
  <h2 className="text-3xl font-bold mb-5">Why This Autonomous Syllabus Matters</h2>
  
  <div className="rounded-[24px] border border-amber-900/20 bg-gradient-to-br from-amber-50 to-orange-50 p-6 shadow-sm dark:border-amber-200/10 dark:from-amber-900/10 dark:to-orange-950/20 md:p-8">
    <p className="leading-relaxed text-foreground md:text-lg">
      With PSIT's recent transition to an <strong className="text-amber-600">autonomous status</strong>, the curriculum has been significantly upgraded from the traditional university structure. This modified syllabus is specifically designed to bridge the gap between academia and modern industry demands.
    </p>
    
    <ul className="mt-6 space-y-4 text-muted-foreground">
      <li className="flex items-start gap-3">
        <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-200/50 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300 text-xs font-bold">1</span>
        <p><strong>Industry-Aligned Content:</strong> Outdated topics have been replaced with modern engineering practices, ensuring you learn what tech companies actually use today.</p>
      </li>
      <li className="flex items-start gap-3">
        <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-200/50 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300 text-xs font-bold">2</span>
        <p><strong>Practical Focus:</strong> There is a heavier emphasis on project-based learning, practical labs, and real-world applications rather than pure theoretical rote learning.</p>
      </li>
      <li className="flex items-start gap-3">
        <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-200/50 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300 text-xs font-bold">3</span>
        <p><strong>Enhanced Placement Readiness:</strong> Core subjects and electives are now directly tailored to improve technical interview outcomes and core competencies for placements.</p>
      </li>
    </ul>
  </div>
</section>
        </div>
      </div>
    </main>
  );
}