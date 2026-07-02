import PdfPreview from "@/components/pdfPreview";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title:
    "AKTU B.Tech 1st Year Syllabus PDF Download (2026) | Common to All Branches",
  description:
    "Download AKTU B.Tech First Year Syllabus PDF. Common syllabus for CSE, IT, CSIT, AIML, ECE, EE, ME and other engineering branches under AKTU.",
};

export default function Page() {
  const sem1Subjects = [
    "Engineering Mathematics-I",
    "Engineering Physics",
    "Engineering Chemistry",
    "Programming for Problem Solving",
    "Fundamentals of Electrical Engineering",
    "Fundamentals of Electronics Engineering",
    "Environment & Ecology",
    "Soft Skills",
  ];

  const sem2Subjects = [
    "Engineering Mathematics-II",
    "Engineering Physics",
    "Engineering Chemistry",
    "Programming for Problem Solving",
    "Fundamentals of Electronics Engineering",
    "Fundamentals of Electrical Engineering",
    "Workshop Practice",
    "Engineering Graphics & Design",
  ];

  const branches = [
    "CSE",
    "CSIT",
    "IT",
    "AIML",
    "CSE-AIML",
    "CSE-DS",
    "ECE",
    "EE",
    "ME",
  ];

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 md:px-6">

      {/* HERO */}
      <section className="relative overflow-hidden flex justify-center items-center rounded-3xl mb-10">
 
        <Image  
        src='/1st-year-syllabus.png'  
        alt="B.Tech 1st Year"
        width={1200}
        height={600}
        priority
        draggable={false}
       
        loading="eager" 
        className="border rounded-2xl" />
        

      </section>
      
      {/* PDF SECTION */}

      <section className="mb-12">

        <div className="rounded-3xl border border-black dark:border-zinc-800 overflow-hidden">

          <div className="bg-main dark:bg-amber-900  px-5 py-4 font-semibold">
            Available Downloads
          </div>

          <div className="p-5">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 rounded-2xl border bg-amber-600/10  border-amber-900 dark:border-amber-200 p-5">

              <div >
                <h2 className="font-semibold hover:text-blue-700 text-lg">
                   <a href="https://aktu.ac.in/pdf/syllabus/syllabus2223/Syllabus_BTech_First_Yr_Common_other_than_AG_&_BT_effective_from_2022_23_R.pdf" target="_blank">B.Tech First Year (Common To All Branches)</a>
                </h2>

                <p className="text-zinc-500 dark:text-zinc-400 text-sm">
                  Official AKTU First Year Syllabus PDF
                </p>
              </div>
           <div className="flex gap-2">
            
              <PdfPreview  driveId={'1SLl12i3HhZgsPTDPJ7tBYwuzCJXBYxno'}/>

              <a
                href="https://drive.google.com/file/d/1SLl12i3HhZgsPTDPJ7tBYwuzCJXBYxno/view?usp=drive_link"
                target="_blank"
                className="text-center rounded-xl bg-blue-600  text-white  border border-zinc-300 dark:border-zinc-700 px-4 py-2 hover:bg-blue-800 dark:hover:bg-zinc-900"
              >
                Download
              </a>
           </div>

            </div>

          </div>

        </div>

      </section>

      {/* MAIN CONTENT */}

      <div className="grid lg:grid-cols-[280px_1fr] gap-10">

        {/* TOC */}
         <aside className="hidden lg:block ">

          <div className="sticky top-24 rounded-3xl border bg-amber-900/10  border-amber-900 dark:border-amber-200 p-5">

            <h2 className="font-bold text-lg mb-5">
              Table of Contents
            </h2>

            <nav className="space-y-3 text-sm underline text-blue-600">

              <a href="#why" className="block hover:text-blue-500">
                Why the 1st Year Syllabus Matters
              </a>

              <a href="#sem1" className="block hover:text-blue-500">
                Semester 1 Subjects
              </a>

              <a href="#sem2" className="block hover:text-blue-500">
                 Semester 2 Subjects
              </a>

              <a href="#branches" className="block hover:text-blue-500">
                 Branches Covered
              </a>

              <a href="#prepare" className="block hover:text-blue-500">
                 Preparation Tips
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

          <section id="why" className="scroll-mt-28">

            <h2 className="text-3xl font-bold mb-5">
              Why the 1st Year Syllabus Matters
            </h2>

            <p className="leading-8 text-zinc-600 dark:text-zinc-400">
              The first year of B.Tech is like the root of a tree.
              It builds the foundation of mathematics, science,
              programming, engineering concepts, and communication skills.
              Most subjects are common across all branches, ensuring
              students develop a strong technical base before moving
              into specialized subjects.
            </p>

          </section>

         <section id="sem1" className="scroll-mt-28">
  <h2 className="text-3xl font-bold mb-6">
    Semester 1 Subjects
  </h2>

  <div className="overflow-x-auto">
    <table className="w-full bg-amber-600/10 border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
      <thead className="bg-gray-100 dark:bg-gray-800">
        <tr>
          <th className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-left w-20">
            S.No.
          </th>
          <th className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-left">
            Subject Name
          </th>
        </tr>
      </thead>

      <tbody>
        {sem1Subjects.map((subject, index) => (
          <tr
            key={subject}
            className="hover:bg-gray-50 dark:hover:bg-gray-900"
          >
            <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">
              {index + 1}
            </td>
            <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">
              {subject}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</section>

<section id="sem2" className="scroll-mt-28 ">
  <h2 className="text-3xl font-bold mb-6">
    Semester 2 Subjects
  </h2>

  <div className="overflow-x-auto ">
    <table className="w-full bg-amber-600/10 border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
      <thead className="bg-gray-100 dark:bg-gray-800">
        <tr>
          <th className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-left w-20">
            S.No.
          </th>
          <th className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-left">
            Subject Name
          </th>
        </tr>
      </thead>

      <tbody>
        {sem2Subjects.map((subject, index) => (
          <tr
            key={subject}
            className="hover:bg-gray-50 dark:hover:bg-gray-900"
          >
            <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">
              {index + 1}
            </td>
            <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">
              {subject}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</section>

          <section id="branches" className="scroll-mt-28">

            <h2 className="text-3xl font-bold mb-6">
              Branches Covered Under This Syllabus
            </h2>

            <div className="flex flex-wrap gap-3">

              {branches.map((branch) => (
                <span
                  key={branch}
                  className="rounded-full border  border-amber-900 dark:border-amber-200 px-4 py-2"
                >
                  {branch}
                </span>
              ))}

            </div>

          </section>

          <section id="prepare" className="scroll-mt-28">

            <h2 className="text-3xl font-bold mb-6">
             How to Prepare for the 1st Year Syllabus
            </h2>

            <div className="space-y-4">

              {[
                "Read the syllabus carefully.",
                "Create a semester-wise study plan.",
                "Focus on Mathematics and Programming fundamentals.",
                "Practice laboratory work regularly.",
                "Solve previous year papers.",
                "Develop communication and soft skills.",
              ].map((tip) => (
                <div
                  key={tip}
                  className="rounded-2xl border  border-amber-900 dark:border-amber-200 p-4"
                >
                  {tip}
                </div>
              ))}

            </div>

          </section>

          <section id="final" className="scroll-mt-28">

            <h2 className="text-3xl font-bold mb-5">
              Final Thoughts
            </h2>

            <p className="leading-8 text-zinc-600 dark:text-zinc-400">
              The AKTU B.Tech First Year Syllabus provides a balanced
              combination of theory and practical subjects. Whether
              you want to pursue software development, core engineering,
              research, or entrepreneurship, the first year creates the
              foundation for future success.
            </p>

          </section>

          <section id="faq" className="scroll-mt-28">

            <h2 className="text-3xl font-bold mb-6">
              Frequently Asked Questions
            </h2>

            <div className="space-y-4">

              <details className="rounded-2xl border  border-amber-900 dark:border-amber-200 p-5">
                <summary className="cursor-pointer font-semibold">
                  Do all branches have the same first-year syllabus?
                </summary>
                <p className="mt-3 text-zinc-600 dark:text-zinc-400">
                  Yes. Most subjects are common across all branches.
                </p>
              </details>

              <details className="rounded-2xl border  border-amber-900 dark:border-amber-200 p-5">
                <summary className="cursor-pointer font-semibold">
                  Which programming languages are taught?
                </summary>
                <p className="mt-3 text-zinc-600 dark:text-zinc-400">
                  Primarily C and Python.
                </p>
              </details>

              <details className="rounded-2xl border  border-amber-900 dark:border-amber-200 p-5">
                <summary className="cursor-pointer font-semibold">
                  Is first-year Mathematics difficult?
                </summary>
                <p className="mt-3 text-zinc-600 dark:text-zinc-400">
                  Regular practice makes it manageable and easier.
                </p>
              </details>

            </div>

          </section>

          <section className="rounded-3xl border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/20 p-6">

            <h2 className="text-2xl font-bold">
              Continue Exploring
            </h2>

            <p className="mt-3 text-zinc-600 dark:text-zinc-400">
              After completing your first year, check the updated
              AKTU 2nd Year syllabus for branch-specific subjects.
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

    </main>
  );
}

