import PdfPreview from "@/components/pdfPreview";
import Image from "next/image";
import Link from "next/link";
import { glBajajSyllabusData } from "@/data/syllabusData";

export const metadata = {
  title: "GL Bajaj B.Tech 1st Year Syllabus PDF | All Branches",
  description: "Download GL Bajaj Institute of Technology and Management B.Tech First Year Syllabus PDF. Covering core subjects and curriculum details.",
};

export default async function GLBSyllabusPage({ searchParams }) {
  // Await searchParams for Next.js 15+ compatibility
  const params = await searchParams;
  const selectedYear = params?.year || "2026";
  
  // Safely fallback to 2026 if a selected year doesn't exist in the data yet
  const currentData = glBajajSyllabusData[selectedYear] || glBajajSyllabusData["2026"];

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 md:px-6">
      
      

      {/* --- HERO SECTION --- */}
      <section className="relative overflow-hidden flex flex-col justify-center items-center rounded-3xl mb-10 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
         <Image  
                src='/GLB-1st-year-syllabus.png'
                alt="GL Bajaj B.Tech 1st Year"
                width={1000}
                height={300}
                priority
                draggable={false}
                loading="eager" 
                className="border rounded-2xl shadow-sm" 
         />

        <h1 className="mt-6 font-bold text-2xl md:text-3xl text-foreground">
          {currentData.title}
        </h1>
        <p className="text-zinc-500 mb-6 max-w-2xl mt-3 text-sm md:text-base">
          Approved by AICTE and affiliated to AKTU. Access the official curriculum and course structure for the GL Bajaj B.Tech First Year program.
        </p>
      </section>

      {/* --- QUICK NAVIGATION TO NOTES --- */}
      <section className="flex justify-between w-full mb-12">
        <Link
          href="/study-material/GL-Bajaj/btech/1st-year"
          className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 text-base font-bold text-white transition-all duration-300 ease-in-out rounded-full bg-gradient-to-r from-amber-500 to-amber-600 dark:from-amber-600 dark:to-amber-700 hover:from-amber-600 hover:to-amber-700 dark:hover:from-amber-500 dark:hover:to-amber-600 shadow-[0_0_15px_rgba(245,158,11,0.4)] hover:shadow-[0_0_30px_rgba(245,158,11,0.7)] hover:-translate-y-1 overflow-hidden"
        >
          <span className="absolute inset-0 w-full h-full -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shimmer_1.5s_infinite] transition-transform duration-700 group-hover:translate-x-full"></span>
          
          <span className="relative flex items-center gap-2">
            <span>📚 Click to get GL Bajaj Notes </span>
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

        {/* --- ACADEMIC YEAR TOGGLE --- */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex rounded-full border border-amber-900/20 dark:border-amber-200/20 bg-amber-600/5 p-1 shadow-sm">
          <Link 
            href="?year=2026"
            scroll={false}
            className={`px-6 py-2.5 text-sm font-semibold rounded-full transition-all duration-300 ${
              selectedYear === "2026" 
                ? "bg-amber-600 text-white shadow-md" 
                : "text-zinc-600 hover:text-amber-600 dark:text-zinc-400 dark:hover:text-amber-500 hover:bg-amber-600/10"
            }`}
          >
            2026-27 (New)
          </Link>
          
        </div>
      </div>
      </section>
      
      {/* --- PDF SECTION --- */}
      <section className="mb-12">
        <div className="rounded-3xl border border-black dark:border-zinc-800 overflow-hidden shadow-sm bg-card">
          <div className="bg-amber-600/10 px-5 py-4 font-semibold border-b border-amber-900/10 dark:border-amber-100/10 flex justify-between items-center">
            <span>Available Downloads</span>
            <span className="text-xs font-medium px-2.5 py-1 bg-amber-600 text-white rounded-full">
              {selectedYear} Session
            </span>
          </div>
          
          <div className="p-5 space-y-4">
            {currentData.subjects?.map((subject) => (
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
                  {subject.driveId !== "#" ? (
                    <>
                      <PdfPreview pdfUrl={subject.driveId} />
                      <a
                        href={subject.driveId}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-center rounded-xl bg-blue-600 text-white border border-transparent px-4 py-2 text-sm font-medium hover:bg-blue-700 transition-colors"
                      >
                        Download
                      </a>
                    </>
                  ) : (
                    <span className="text-sm text-amber-600 font-medium px-4 py-2 bg-amber-100 dark:bg-amber-900/30 rounded-xl">
                      PDF Coming Soon
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CONTENT GRID --- */}
      <div className="grid lg:grid-cols-[280px_1fr] gap-10">

        {/* TOC Sidebar */}
        <aside className="hidden lg:block ">
          <div className="sticky top-24 rounded-3xl border bg-amber-900/5 border-amber-900/20 dark:border-amber-200/20 p-5 shadow-sm">
            <h2 className="font-bold text-lg mb-5">Table of Contents</h2>
            <nav className="space-y-3 text-sm font-medium text-blue-600 dark:text-blue-400">
              <a href="#objectives" className="block hover:text-blue-500 transition-colors">Course Objectives</a>
              <a href="#subjects" className="block hover:text-blue-500 transition-colors">Subject List ({selectedYear})</a>
              <a href="#why-it-matters" className="block hover:text-blue-500 transition-colors">Curriculum Highlights</a>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <div className="space-y-14">
          
          <section id="objectives" className="scroll-mt-28">
            <h2 className="text-2xl md:text-3xl font-bold mb-5 flex items-center gap-2">
              Course Objectives
              <span className="text-sm font-normal px-2.5 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-full text-zinc-500">
                {selectedYear}
              </span>
            </h2>
            <p className="leading-8 text-zinc-600 dark:text-zinc-400">
              {currentData.objective}
            </p>
          </section>

          {/* Subjects Table */}
          <section id="subjects" className="scroll-mt-28">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Subject List</h2>
            
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
                  {currentData.subjects?.map((subject, index) => (
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

          {/* CURRICULUM HIGHLIGHTS SECTION */}
          <section id="why-it-matters" className="scroll-mt-28">
            <h2 className="text-2xl md:text-3xl font-bold mb-5">Curriculum Highlights</h2>
            
            <div className="rounded-[24px] border border-amber-900/20 bg-gradient-to-br from-amber-50 to-orange-50 p-6 shadow-sm dark:border-amber-200/10 dark:from-amber-900/10 dark:to-orange-950/20 md:p-8">
              <p className="leading-relaxed text-foreground md:text-lg">
                The GL Bajaj first-year engineering curriculum is designed to lay a strong foundation in core engineering principles, applied sciences, and problem-solving techniques essential for modern technological careers.
              </p>
              
              <ul className="mt-6 space-y-4 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-200/50 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300 text-xs font-bold">1</span>
                  <p><strong>Strong Core Fundamentals:</strong> Ensures a deep understanding of mathematics, physics, and basic electrical/mechanical engineering required for specialized branches later.</p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-200/50 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300 text-xs font-bold">2</span>
                  <p><strong>Programming Focus:</strong> Early introduction to problem-solving and programming prepares students for software development and IT placements from day one.</p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-200/50 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300 text-xs font-bold">3</span>
                  <p><strong>Innovation & Entrepreneurship:</strong> Integration of modern subjects like IoT systems and fundamentals of entrepreneurship to foster a startup mindset.</p>
                </li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}