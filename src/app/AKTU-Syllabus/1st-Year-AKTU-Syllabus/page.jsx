// app/AKTU-Syllabus/1st-Year-AKTU-Syllabus/page.jsx

import Image from "next/image";
import Link from "next/link";
import WhatsappChannel from "@/components/WhatsappChannel";
import { syllabusData } from "@/data/syllabus1stYearData";

export const metadata = {
  title: "AKTU B.Tech 1st Year Syllabus PDF Download (2026-27) | All Streams",
  description: "Download the newly updated AKTU B.Tech First Year Syllabus PDF (2026-27). Check the latest NEP 2020 curriculum for CSE, ME, EE, ECE, and CE branches.",
  keywords: "AKTU syllabus 2026, AKTU B.Tech 1st year syllabus, AKTU new syllabus PDF, CSE syllabus AKTU, AICTE model curriculum AKTU",
};

export default function FirstYearHubPage() {
  // Convert the syllabusData object into an array we can loop through
  const branches = Object.entries(syllabusData).map(([slug, data]) => ({
    slug,
    ...data,
  }));

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
        <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
          Select your engineering stream below to view the detailed semester-wise breakdown and download the official AICTE & NEP 2020 aligned PDF.
        </p>
      </div>

      {/* HERO */}
      <section className="relative overflow-hidden flex justify-center items-center rounded-3xl mb-12">
        <Image
          src="/1st-year-syllabus.png"
          alt="AKTU B.Tech 1st Year Syllabus 2026-27 PDF Download"
          width={1200}
          height={600}
          priority
          draggable={false}
          loading="eager"
          className="border rounded-2xl shadow-sm"
        />
      </section>

      {/* DIRECTORY GRID: Select Your Branch */}
      <section className="mb-16 scroll-mt-28" id="branches">
        <h2 className="text-3xl font-bold mb-8 text-center">Select Your Stream</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {branches.map((branch) => {
            const isAvailable = branch.status === "Available";
            
            return (
              <Link 
                href={isAvailable ? `/AKTU-Syllabus/1st-Year-AKTU-Syllabus/${branch.slug}` : "#"}
                key={branch.slug}
                className={`
                  relative flex flex-col p-6 rounded-3xl border transition-all duration-300
                  ${isAvailable 
                    ? "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-blue-500 hover:shadow-lg hover:-translate-y-1 group" 
                    : "bg-gray-50 border-gray-100 dark:bg-zinc-950 dark:border-zinc-900 cursor-not-allowed opacity-75 grayscale"}
                `}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className={`text-xl font-bold ${isAvailable ? "group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" : "text-zinc-500"}`}>
                    {branch.title.replace("B.Tech First Year (", "").replace(")", "")}
                  </h3>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                    isAvailable 
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" 
                      : "bg-zinc-200 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                  }`}>
                    {branch.status}
                  </span>
                </div>
                
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-auto">
                  {isAvailable ? "View subjects & download PDF →" : "Pending official university release"}
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* GENERAL FAQs */}
      <section className="max-w-4xl mx-auto mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <details className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 group">
            <summary className="cursor-pointer font-semibold text-lg list-none flex justify-between items-center">
              Do all branches have the same first-year syllabus?
              <span className="text-blue-500 group-open:rotate-45 transition-transform text-2xl">+</span>
            </summary>
            <p className="mt-4 text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Different streams (CSE, ME, CE, EE) have slight variations in their branch-specific subjects, but core subjects like Math, Physics, and Chemistry are largely shared.
            </p>
          </details>
          <details className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 group">
            <summary className="cursor-pointer font-semibold text-lg list-none flex justify-between items-center">
              Which programming languages are taught?
              <span className="text-blue-500 group-open:rotate-45 transition-transform text-2xl">+</span>
            </summary>
            <p className="mt-4 text-zinc-600 dark:text-zinc-400 leading-relaxed">
              The CSE Stream covers C and Python programming fundamentals in the first year.
            </p>
          </details>
          <details className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 group">
            <summary className="cursor-pointer font-semibold text-lg list-none flex justify-between items-center">
              Is first-year Mathematics difficult?
              <span className="text-blue-500 group-open:rotate-45 transition-transform text-2xl">+</span>
            </summary>
            <p className="mt-4 text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Regular practice makes it manageable and easier. The new syllabus focuses heavily on Calculus and Linear Algebra.
            </p>
          </details>
        </div>
      </section>

      <div className="mt-10">
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