import PdfPreview from "@/components/pdfPreview";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title:
    "AKTU B.Tech 2nd Year Syllabus Updated PDF Download (2026) | Branch Wise Syllabus",
  description:
    "Download AKTU B.Tech 2nd Year Syllabus PDF for CSE, IT, ECE, EE, Mechanical, Civil, Biotechnology and other branches. Latest AKTU branch-wise syllabus PDFs.",
};

export default function Page() {
 const branchSyllabus = [
  {
    name: "Computer Science Engineering (CSE) & Allied Branches",
    officialLink: "https://fms.aktu.ac.in/Resources/aktu/pdf/syllabus/Syllabus2324/B.Tech_2nd_Yr_CSE_v3.pdf",
    driveId: "1wgpY25Lzy82NuVW1zDUrI3yMrIvL8p0u",
    driveLink: "https://drive.google.com/uc?id=1wgpY25Lzy82NuVW1zDUrI3yMrIvL8p0u&export=download",
  },
  {
    name: "Computer Science Engineering (CSE) - Hindi",
    officialLink: "https://fms.aktu.ac.in/Resources/aktu/pdf/syllabus/Syllabus2324/B.Tech_2nd_Yr_CSE_Hindi_v3.pdf",
    driveId: "12ySMC1jpH-h3IfLLeFPHiclg_m1hVN13",
    driveLink: "https://drive.google.com/uc?id=12ySMC1jpH-h3IfLLeFPHiclg_m1hVN13&export=download",
  },
  {
    name: "Electronics & Communication Engineering (ECE)",
    officialLink: "https://fms.aktu.ac.in/Resources/aktu/pdf/syllabus/Syllabus2324/B.Tech_2nd_Yr_EC.pdf",
    driveId: "1tUiB3vLXDAanhVb17W930hA3gx8YeD6g",
    driveLink: "https://drive.google.com/uc?id=1tUiB3vLXDAanhVb17W930hA3gx8YeD6g&export=download",
  },
  {
    name: "Mechanical Engineering (ME)",
    officialLink: "https://fms.aktu.ac.in/Resources/aktu/pdf/syllabus/Syllabus2324/B.Tech_2nd_Yr_ME.pdf",
    driveId: "1A9VJ-boqPQozsb_u-UZDV9wqStRISqb_",
    driveLink: "https://drive.google.com/uc?id=1A9VJ-boqPQozsb_u-UZDV9wqStRISqb_&export=download",
  },
  {
    name: "Electronics & Computer Engineering (ECZ)",
    officialLink: "https://fms.aktu.ac.in/Resources/aktu/pdf/syllabus/Syllabus2324/B.Tech_2nd_Yr_ECZ.pdf",
    driveId: "1yzuhnGbk4W3piWy0tMsjPjus_UPMnJIJ",
    driveLink: "https://drive.google.com/uc?id=1yzuhnGbk4W3piWy0tMsjPjus_UPMnJIJ&export=download",
  },
  {
    name: "Textile Technology",
    officialLink: "https://fms.aktu.ac.in/Resources/aktu/pdf/syllabus/Syllabus2324/B.Tech_2nd_Yr_TT.pdf",
    driveId: "17CItVN_FJIylYFGD-5gkdWmYriRA44Wg",
    driveLink: "https://drive.google.com/uc?id=17CItVN_FJIylYFGD-5gkdWmYriRA44Wg&export=download",
  },
  {
    name: "Carpet & Textile Technology",
    officialLink: "https://fms.aktu.ac.in/Resources/aktu/pdf/syllabus/Syllabus2324/B.Tech_2nd_Yr_CTT.pdf",
    driveId: "1SPcJDzvX_bdNJnpRBuwdAI9YjGWhnScN",
    driveLink: "https://drive.google.com/uc?id=1SPcJDzvX_bdNJnpRBuwdAI9YjGWhnScN&export=download",
  },
  {
    name: "Handloom & Textile Technology",
    officialLink: "https://fms.aktu.ac.in/Resources/aktu/pdf/syllabus/Syllabus2324/B.Tech_2nd_Yr_HTT.pdf",
    driveId: "1O8U3rjwk2RGefYL1bUKA9CKoo-It_rr1",
    driveLink: "https://drive.google.com/uc?id=1O8U3rjwk2RGefYL1bUKA9CKoo-It_rr1&export=download",
  },
  {
    name: "Electrical & Electronics Engineering (EEE)",
    officialLink: "https://fms.aktu.ac.in/Resources/aktu/pdf/syllabus/Syllabus2324/B.Tech_2nd_Yr_EE_V2.pdf",
    driveId: "1NL5yS8fI79QYYygklOGTdZT9Ral4JG_M",
    driveLink: "https://drive.google.com/uc?id=1NL5yS8fI79QYYygklOGTdZT9Ral4JG_M&export=download",
  },
  {
    name: "Biotechnology",
    officialLink: "https://fms.aktu.ac.in/Resources/aktu/pdf/syllabus/Syllabus2324/B.Tech_2nd_Yr_BT_v2.pdf",
    driveId: "1P3sQYo-YzJ1gd3-oGqGHf4vc67E3tl_m",
    driveLink: "https://drive.google.com/uc?id=1P3sQYo-YzJ1gd3-oGqGHf4vc67E3tl_m&export=download",
  },
];

  const commonSubjects = [
  {
    name: "Python Programming & Cyber Security",
    officialLink: "https://fms.aktu.ac.in/Resources/aktu/pdf/syllabus/Syllabus2324/B.Tech_Common_Course_BCC.pdf",
    driveId: "18ylO1EU5fUBKNowG5aum1vwPoxpfm46s",
    driveLink: "https://drive.google.com/uc?id=18ylO1EU5fUBKNowG5aum1vwPoxpfm46s&export=download",
  },
  {
    name: "Technical Communication",
    officialLink: "https://fms.aktu.ac.in/Resources/aktu/pdf/syllabus/Syllabus2324/Technical%20Communication_2023-2024.pdf",
    driveId: "1baWAmGXgioMEi0_FrwtIze-t66Pm6Tkd",
    driveLink: "https://drive.google.com/uc?id=1baWAmGXgioMEi0_FrwtIze-t66Pm6Tkd&export=download",
  },
  {
    name: "Mathematics III / IV / V",
    officialLink: "https://fms.aktu.ac.in/Resources/aktu/pdf/syllabus/Syllabus2324/Mathematics-III_Mathematics_IV_Mathematics_V.pdf",
    driveId: "1ZqX-dAgSn9W6cOU-E6GS4KHxPZ0SxKsm",
    driveLink: "https://drive.google.com/uc?id=1ZqX-dAgSn9W6cOU-E6GS4KHxPZ0SxKsm&export=download",
  },
  {
    name: "Open Elective",
    officialLink: "https://fms.aktu.ac.in/Resources/aktu/pdf/syllabus/Syllabus2324/Open_Elective_BTech_2nd_Yr_2023_24_v2.pdf",
    driveId: "195bRLLiCW5w3IBHY_43Vvo61W_WzYagG",
    driveLink: "https://drive.google.com/uc?id=195bRLLiCW5w3IBHY_43Vvo61W_WzYagG&export=download",
  },
  {
    name: "Universal Human Values & Professional Ethics (UHVPE)",
    officialLink: "https://fms.aktu.ac.in/Resources/aktu/pdf/syllabus/Syllabus2324/AKTU_UHVPE.pdf",
    driveId: "1sdUr46XYWyjDoG7yXZmk7EfLwxErEVSv",
    driveLink: "https://drive.google.com/uc?id=1sdUr46XYWyjDoG7yXZmk7EfLwxErEVSv&export=download",
  },
  {
    name: "Sports & Yoga II",
    officialLink: "https://fms.aktu.ac.in/Resources/aktu/pdf/syllabus/Syllabus2324/BVA_451_Sports_Yoga_II_Syllabus.pdf",
    driveId: "1c3qYNnaMt7cBBikfg-DliQY-LTX9hPv5",
    driveLink: "https://drive.google.com/uc?id=1c3qYNnaMt7cBBikfg-DliQY-LTX9hPv5&export=download",
  },
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
    "Understand Subject Weightage.",
    "Prioritize Core Subjects.",
    "Use Standard Books.",
    "Plan Semester-wise Goals.",
    "Practice Previous Year Questions.",
    "Don't Skip Labs & Projects.",
  ];

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 md:px-6">

      {/* HERO */}
      <section className="relative overflow-hidden flex justify-center items-center rounded-3xl mb-10">
        <Image  
          src='/2nd-year-syllabus.png'  
          alt="B.Tech 2nd Year Syllabus"
          width={1200}
          height={600}
          priority
          draggable={false}
          loading="eager" 
          className="border rounded-2xl" 
        />
      </section>

      {/* MAIN CONTENT */}
      <div className="grid lg:grid-cols-[280px_1fr] gap-10">

        {/* TOC */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-3xl border bg-amber-900/10 border-amber-900 dark:border-amber-200 p-5">
            <h2 className="font-bold text-lg mb-5">
              Table of Contents
            </h2>
            <nav className="space-y-3 text-sm underline text-blue-600">
              <a href="#download" className="block hover:text-blue-500">
               Download Pdf
              </a>
              <a href="#common-subjects" className="block hover:text-blue-500">
                Download Common Subjects pdf
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
        <div className="space-y-14 min-w-0">

          {/* PDF SECTION */}
          <section id="download" className="scroll-mt-28 mb-12">
            <div className="rounded-3xl border border-black dark:border-zinc-800 overflow-hidden">
              <div className="bg-main dark:bg-amber-900 px-5 py-4 font-semibold">
                Available Downloads (Branch Wise)
              </div>
              <div className="p-5 space-y-4">
                {branchSyllabus.map((branch) => (
                  <div key={branch.name} className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 rounded-2xl border bg-amber-600/10 border-amber-900 dark:border-amber-200 p-5">
                    <div>
                      <h2 className="font-semibold text-lg">
                         <a 
                           href={branch.officialLink} 
                           target="_blank" 
                           rel="noopener noreferrer" 
                           className="hover:text-blue-700 transition-colors"
                         >
                           {branch.name}
                         </a>
                      </h2>
                      <p className="text-zinc-500 dark:text-zinc-400 text-sm">
                        Official AKTU 2nd Year Syllabus PDF
                      </p>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <PdfPreview driveId={branch.driveId} />
                      <a
                        href={branch.driveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-center rounded-xl bg-blue-600 text-white border border-zinc-300 dark:border-zinc-700 px-4 py-2 hover:bg-blue-800 dark:hover:bg-zinc-900 transition-colors"
                      >
                        Download
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* COMMON SUBJECTS */}
          <section id="common-subjects" className="scroll-mt-28">
            <h2 className="text-3xl font-bold mb-6">
              2nd Year Common Subjects
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
                    <th className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-center min-w-[200px]">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {commonSubjects.map((subject, index) => (
                    <tr
                      key={subject.name}
                      className="hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                    >
                      <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-center">
                        {index + 1}
                      </td>
                      <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">
                        <a 
                          href={subject.officialLink} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="font-medium hover:text-blue-700 transition-colors"
                        >
                          {subject.name}
                        </a>
                      </td>
                      <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">
                        <div className="flex justify-center gap-2">
                          <PdfPreview driveId={subject.driveId} />
                          <a
                            href={subject.driveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-center rounded-xl bg-blue-600 text-white border border-zinc-300 dark:border-zinc-700 px-4 py-2 hover:bg-blue-800 dark:hover:bg-zinc-900 transition-colors text-sm"
                          >
                            Download
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
            <h2 className="text-3xl font-bold mb-6">
              Overview of AKTU 2nd Year Syllabus by Branch
            </h2>
            <div className="grid lg:grid-cols-2 gap-6">
              {overview.map((branch) => (
                <div
                  key={branch.title}
                  className="rounded-3xl border border-amber-900 dark:border-amber-200 p-6"
                >
                  <h3 className="font-bold text-xl mb-5">
                    {branch.title}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {branch.subjects.map((subject) => (
                      <span
                        key={subject}
                        className="rounded-full border border-amber-900 dark:border-amber-200 px-4 py-2"
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
            <div className="space-y-4">
              {studyTips.map((tip) => (
                <div
                  key={tip}
                  className="rounded-2xl border border-amber-900 dark:border-amber-200 p-4"
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
                  though some common subjects are shared across departments.
                </p>
              </details>

              <details className="rounded-2xl border border-amber-900 dark:border-amber-200 p-5">
                <summary className="cursor-pointer font-semibold">
                  Which subjects are common in 2nd year?
                </summary>
                <p className="mt-3 text-zinc-600 dark:text-zinc-400">
                  Technical Communication, Mathematics (III/IV/V), Human Values,
                  Professional Ethics, and Open Electives.
                </p>
              </details>

              <details className="rounded-2xl border border-amber-900 dark:border-amber-200 p-5">
                <summary className="cursor-pointer font-semibold">
                  Why are core subjects important?
                </summary>
                <p className="mt-3 text-zinc-600 dark:text-zinc-400">
                  Core subjects form the foundation for placements,
                  higher studies (like M.Tech), and competitive examinations (like GATE).
                </p>
              </details>
            </div>
          </section>

          <section className="rounded-3xl border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/20 p-6">
            <h2 className="text-2xl font-bold">
              Continue Exploring
            </h2>
            <p className="mt-3 text-zinc-600 dark:text-zinc-400">
              After completing your 2nd year, check the updated
              AKTU 3rd Year syllabus for advanced specialized subjects.
            </p>
            <Link
              href="/AKTU-Syllabus/3rd-Year-AKTU-Syllabus"
              className="inline-block mt-5 text-blue-600 dark:text-blue-400 font-medium"
            >
              → View AKTU 3rd Year Syllabus
            </Link>
          </section>

        </div>
      </div>
    </main>
  );
}