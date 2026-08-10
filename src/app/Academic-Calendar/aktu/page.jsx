import React from 'react';
import Image from 'next/image';
import PdfPreview from '@/components/pdfPreview';

export default function AcademicCalendarPage() {
  return (
    <main className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* HEADER SECTION */}
      <section className="flex flex-col items-center text-center mb-8">
        {/* Placeholder for University Logo */}
        <div className="w-20 h-20 bg-amber-500 rounded-full mb-4 flex items-center justify-center">
          <Image
      src="/aktu_logo.svg"
      width={500}
      height={500}
      alt="Picture of the author"
    />
    </div>
        
        <h1 className="text-xl sm:text-2xl font-bold uppercase tracking-wide text-foreground">
          Dr. A.P.J. Abdul Kalam Technical University, Uttar Pradesh
        </h1>
        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 mt-1">
          Jankipuram Vistar, Sector-11, Sitapur Road, Lucknow, 226031.
        </p>

        <h2 className="text-lg sm:text-xl font-bold underline mt-6 mb-2">
          ACADEMIC CALENDAR (For SESSION 2026-27)
        </h2>
        <p className="text-xs sm:text-sm font-medium uppercase text-zinc-500 max-w-4xl">
          FOR B.TECH. /B.PHARM. /B.ARCH./B.H.M.C.T./BFAD/BVOC/MBA/MBATM/MBA(I)/MCA/MCA(I)/BFA/M.TECH/M.PHARM/M.ARCH. & OTHER COURSES
        </p>

       <div className='bg-amber-600 py-2 px-4  rounded-xl'>
         <a href="http://fms.aktu.ac.in/Resources/Attachments/Circular/2102235lrgzyso.pdf" target="_blank" rel="noopener noreferrer" className="text-white hover:underline">
           Download Academic Calendar
         </a>
       </div>
        <div className="flex flex-col sm:flex-row justify-between w-full mt-6 text-sm font-bold">
          <span>Ref. No.: AKTU/RO/2026/12402</span>
          <span>Date: 3-7-2026</span>
        </div>
      </section>

      {/* TABLE SECTION - Strict Layout Match */}
      {/* SUMMARY TABLE SECTION */}
      <p>
        Dr. A.P.J. Abdul Kalam Technical University (AKTU), Lucknow has officially released the Academic Calendar for the 2026-27 academic session. The calendar outlines the complete schedule for the upcoming academic year, including class commencement, admission deadlines, enrollment, examination forms, theory and practical examinations, sessional marks submission, internships, university festivals, vacations, and semester result declaration.
      </p>
      <section className="bg-white dark:bg-zinc-900/50 rounded-xl border border-black/20 dark:border-zinc-700 shadow-sm overflow-hidden mb-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm sm:text-base text-zinc-800 dark:text-zinc-200">
            <tbody className="divide-y divide-black/10 dark:divide-zinc-700">
              <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                <td className="p-4 border-r border-black/10 dark:border-zinc-700 font-medium w-1/3 min-w-[200px]">Release Date</td>
                <td className="p-4">3 July 2026</td>
              </tr>
              <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                <td className="p-4 border-r border-black/10 dark:border-zinc-700 font-medium">Applicable Courses</td>
                <td className="p-4 leading-relaxed">B.Tech, B.Pharm, B.Arch, BHMCT, BFAD, BVOC, MBA, MCA, M.Tech, M.Pharm & Other UG/PG Courses</td>
              </tr>
              <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                <td className="p-4 border-r border-black/10 dark:border-zinc-700 font-medium">Classes Begin (III, V, VII & IX Semester)</td>
                <td className="p-4">14 July 2026</td>
              </tr>
              <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                <td className="p-4 border-r border-black/10 dark:border-zinc-700 font-medium">Classes Begin (II, IV, VI, VIII & X Semester)</td>
                <td className="p-4">1 January 2027</td>
              </tr>
              <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                <td className="p-4 border-r border-black/10 dark:border-zinc-700 font-medium">Odd Semester Theory Exams</td>
                <td className="p-4">24 November – 27 December 2026</td>
              </tr>
              <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                <td className="p-4 border-r border-black/10 dark:border-zinc-700 font-medium">Even Semester Theory Exams</td>
                <td className="p-4">20 April – 20 May 2027</td>
              </tr>
              <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                <td className="p-4 border-r border-black/10 dark:border-zinc-700 font-medium">Odd Semester Result</td>
                <td className="p-4">15 January 2027</td>
              </tr>
              <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                <td className="p-4 border-r border-black/10 dark:border-zinc-700 font-medium">Even Semester Result</td>
                <td className="p-4">30 June 2027</td>
              </tr>
              <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                <td className="p-4 border-r border-black/10 dark:border-zinc-700 font-medium">Issued By</td>
                <td className="p-4">Registrar, AKTU</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* DESCRIPTION PARAGRAPH */}
      <section className="text-left w-full mb-12">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
          AKTU Academic Calendar 2026-27
        </h3>
        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed text-sm sm:text-base">
          Every academic year, AKTU publishes an official academic calendar to ensure that all affiliated colleges follow a uniform schedule for teaching, examinations, practicals, and other academic activities.
        </p>
      </section>
      {/* FOOTER NOTE */}
      <div className="mt-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
        <p>*The dates are subject to modification as per updates from AICTE/PCI.</p>
      </div>
    </main>
  );
}