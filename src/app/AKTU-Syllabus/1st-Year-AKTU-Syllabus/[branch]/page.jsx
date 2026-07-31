// app/AKTU-Syllabus/1st-Year-AKTU-Syllabus/[branch]/page.jsx

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

// Import your central data and components
import { syllabusData } from "@/data/syllabus1stYearData";
import DownloadCard from "@/components/DownloadCard";
import SubjectTable from "@/components/SubjectTable";
import WhatsappChannel from "@/components/WhatsappChannel";

// 1. Tell Next.js to pre-build all these routes for maximum speed and SEO
export function generateStaticParams() {
  return Object.keys(syllabusData).map((branchKey) => ({
    branch: branchKey,
  }));
}

// 2. Generate dynamic metadata for SEO based on the stream
export async function generateMetadata({ params }) {
    const par = await params
  const streamInfo = syllabusData[par.branch];
  
  if (!streamInfo) return { title: "Not Found" };

  return {
    title: `${streamInfo.title} Syllabus PDF Download (2026-27) | AKTU`,
    description: `Download the newly updated AKTU ${streamInfo.title} Syllabus PDF (2026-27). Check the latest NEP 2020 curriculum.`,
    keywords: `AKTU ${params.branch} syllabus, B.Tech 1st year ${params.branch}, AKTU 2026 syllabus PDF, NEP 2020 curriculum`,
  };
}

// 3. The Main Page Component
export default async function BranchSyllabusPage({ params }) {
  const { branch } = await params;
  
  // Fetch the specific stream data based on the URL (e.g., 'cse', 'mechanical')
  const streamInfo = syllabusData[branch];

  // If the URL is invalid (e.g., /1st-year-aktu-syllabus/fake-branch), trigger a 404
  if (!streamInfo) {
    notFound();
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 md:px-6">
      
      {/* BREADCRUMBS */}
      <nav className="text-sm mb-6 text-zinc-500">
        <Link href="/AKTU-Syllabus/1st-Year-AKTU-Syllabus" className="hover:text-blue-600 transition-colors">
          1st Year Syllabus
        </Link>
        <span className="mx-2">/</span>
        <span className="text-zinc-900 dark:text-zinc-100 font-medium">
          {streamInfo.title.replace("B.Tech First Year (", "").replace(")", "")}
        </span>
      </nav>

      {/* PAGE TITLE */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          {streamInfo.title} <br className="hidden md:block"/> (2026-27)
        </h1>
        <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
          Official AICTE & NEP 2020 aligned curriculum breakdown.
        </p>
      </div>

      {/* HERO IMAGE */}
      <section className="relative overflow-hidden flex justify-center items-center rounded-3xl mb-10">
        <Image
          src="/1st-year-syllabus.png"
          alt={`${streamInfo.title} 2026-27 PDF Download`}
          width={1200}
          height={600}
          priority
          draggable={false}
          className="border rounded-2xl shadow-sm"
        />
      </section>

      {/* REUSABLE DOWNLOAD CARD */}
      <DownloadCard streamData={streamInfo} />

      {/* MAIN CONTENT GRID */}
      <div className="grid lg:grid-cols-[280px_1fr] gap-10">
        
        {/* SIDEBAR TOC */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-3xl border bg-amber-900/10 border-amber-900 dark:border-amber-200 p-5">
            <h2 className="font-bold text-lg mb-5">Table of Contents</h2>
            <nav className="space-y-3 text-sm underline text-blue-600">
              <a href="#sem1" className="block hover:text-blue-500 transition-colors">Semester 1 Subjects</a>
              <a href="#sem2" className="block hover:text-blue-500 transition-colors">Semester 2 Subjects</a>
              <a href="#prepare" className="block hover:text-blue-500 transition-colors">Preparation Tips</a>
            </nav>
          </div>
        </aside>

        {/* DYNAMIC CONTENT */}
        <div className="space-y-14">
          
          <div id="sem1">
            {/* REUSABLE TABLE FOR SEM 1 */}
            <SubjectTable 
              title="Semester 1 Subjects" 
              subjects={streamInfo.sem1Subjects} 
            />
          </div>

          <div id="sem2">
            {/* REUSABLE TABLE FOR SEM 2 */}
            <SubjectTable 
              title="Semester 2 Subjects" 
              subjects={streamInfo.sem2Subjects} 
            />
          </div>

          {/* STATIC PREPARATION TIPS */}
          <section id="prepare" className="scroll-mt-28">
            <h2 className="text-3xl font-bold mb-6">How to Prepare</h2>
            <div className="space-y-4">
              {[
                "Read the syllabus carefully and identify the subjects marked as 'Unique'.",
                "Create a semester-wise study plan focusing heavily on foundational mathematics.",
                "Practice laboratory work regularly, as practicals hold significant weightage.",
                "Solve previous year papers (PYQs) before your mid-sem and end-sem exams.",
              ].map((tip, index) => (
                <div key={index} className="flex gap-4 items-start rounded-2xl border border-amber-900 dark:border-amber-200 bg-amber-50/50 dark:bg-amber-950/20 p-5">
                  <span className="flex items-center justify-center bg-amber-200 text-amber-900 dark:bg-amber-900 dark:text-amber-200 font-bold rounded-full h-8 w-8 shrink-0">
                    {index + 1}
                  </span>
                  <p className="text-zinc-700 dark:text-zinc-300 mt-1">{tip}</p>
                </div>
              ))}
            </div>
          </section>

          {/* NAVIGATION CHIP */}
          <section className="rounded-3xl border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/20 p-6 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div>
              <h2 className="text-2xl font-bold text-blue-900 dark:text-blue-100">Continue Exploring</h2>
              <p className="mt-2 text-blue-700 dark:text-blue-300">
                After completing your first year, check the updated 2nd Year syllabus.
              </p>
            </div>
            <Link
              href="/AKTU-Syllabus/2nd-Year-AKTU-Syllabus"
              className="inline-block whitespace-nowrap bg-blue-600 text-white font-medium rounded-xl px-6 py-3 hover:bg-blue-700 transition-colors shadow-sm"
            >
              2nd Year Syllabus →
            </Link>
          </section>
        </div>
      </div>

      <div className="mt-16">
        <WhatsappChannel />
      </div>
    </main>
  );
}