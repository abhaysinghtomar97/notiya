import PdfPreview from "@/components/pdfPreview";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title:
    "AKTU B.Tech 3rd Year Syllabus PDF Download (2026) | Branch Wise Syllabus",
  description:
    "Download AKTU B.Tech 3rd Year Syllabus PDF for CSE, IT, ECE, EE, Mechanical, Civil, Biotechnology and other allied branches. Latest AKTU branch-wise syllabus PDFs.",
};

export default function Page() {
  const branchSyllabus = [
    {
      name: "B.Tech. CS, CE and CSE",
      officialLink: "https://fms.aktu.ac.in/Resources/aktu/pdf/syllabus/Syllabus2425/B.Tech.%20CS_CE%20and%20CSE%20Syllabus%20%203rd%20Year%202024-25.pdf",
      driveId: "1IMdCTfU8BMoWfRyjaX5-qqKyrL8XRTYY",
      driveLink: "https://drive.google.com/uc?id=1IMdCTfU8BMoWfRyjaX5-qqKyrL8XRTYY&export=download"
    },
    {
      name: "B.Tech. CSE (Artificial Intelligence)",
      officialLink: "https://fms.aktu.ac.in/Resources/aktu/pdf/syllabus/Syllabus2425/B.Tech.%20CSE%20(Artificial%20Intelligence)%20Syllabus%203rd%20year%202024-25.pdf",
      driveId: "10Zq68LRbcQZezdcv9t7GfYqYXpMgb5W4",
      driveLink: "https://drive.google.com/uc?id=10Zq68LRbcQZezdcv9t7GfYqYXpMgb5W4&export=download"
    },
    {
      name: "B.Tech. CSE (Data Science)",
      officialLink: "https://fms.aktu.ac.in/Resources/aktu/pdf/syllabus/Syllabus2425/B.Tech.%20Artificial%20Intelligence%20%26%20Data%20Science%20Syllabus%203rd%20year%202024-25.pdf",
      driveId: "1gIgYbvfrCuYhkOv943GuWtNxG5qt6mjQ",
      driveLink: "https://drive.google.com/uc?id=1gIgYbvfrCuYhkOv943GuWtNxG5qt6mjQ&export=download"
    },
    {
      name: "B.Tech. CSE (Machine Learning)",
      officialLink: "https://fms.aktu.ac.in/Resources/aktu/pdf/syllabus/Syllabus2425/B.Tech.%20CSE%20(Arttificial%20Intelligence%20%26%20Machine%20Learning%20)%20Syllabus%203rd%20year%202024-25.pdf",
      driveId: "1IQZpnwkb1_yWhkwjDgOuEujgOpk7ynjh",
      driveLink: "https://drive.google.com/uc?id=1IQZpnwkb1_yWhkwjDgOuEujgOpk7ynjh&export=download"
    },
    {
      name: "B.Tech. CSE (Cyber Security)",
      officialLink: "https://fms.aktu.ac.in/Resources/aktu/pdf/syllabus/Syllabus2425/B.Tech.%20CSE(Cyber%20Security)%20Syllabus%203rd%20year%202024-25.pdf",
      driveId: "1yMx6oCsjU_pLfQFId3yhhENUakUu2gNk",
      driveLink: "https://drive.google.com/uc?id=1yMx6oCsjU_pLfQFId3yhhENUakUu2gNk&export=download"
    },
    {
      name: "B.Tech. CSE (IoT)",
      officialLink: "https://fms.aktu.ac.in/Resources/aktu/pdf/syllabus/Syllabus2425/B.TECH.%20CSE(IoT)%20Syllabus%20%203rd%20year%202024-25.pdf",
      driveId: "1LGPTIcGVTTvR0czxNeSSRGB6Yt7f6Rn8",
      driveLink: "https://drive.google.com/uc?id=1LGPTIcGVTTvR0czxNeSSRGB6Yt7f6Rn8&export=download"
    },
    {
      name: "B.Tech. CS (Hindi)",
      officialLink: "https://fms.aktu.ac.in/Resources/aktu/pdf/syllabus/Syllabus2425/B.Tech.%20CS_Hindi%20Syllabus%20%203rd%20Year.pdf",
      driveId: "1zIFJCOf-FNzF2ByBdQhTQjBUMhV7jwqp",
      driveLink: "https://drive.google.com/uc?id=1zIFJCOf-FNzF2ByBdQhTQjBUMhV7jwqp&export=download"
    },
    {
      name: "B.Tech. CE & IT, CSIT, IT",
      officialLink: "https://fms.aktu.ac.in/Resources/aktu/pdf/syllabus/Syllabus2425/B.TECH%20CE%26IT%20,%20CSIT,%20IT%203rd%20YR%202024-25.pdf",
      driveId: "1Zfq9cTWsrUJ1o3-0tXpH9PdxlsaicKGB",
      driveLink: "https://drive.google.com/uc?id=1Zfq9cTWsrUJ1o3-0tXpH9PdxlsaicKGB&export=download"
    },
    {
      name: "B.Tech ECE",
      officialLink: "https://fms.aktu.ac.in/Resources/aktu/pdf/syllabus/Syllabus2425/B.Tech%20ECE%203rd%20Year%20Syllabus_2024-25.pdf",
      driveId: "1SWADmFxGgC7WtWLkdczAAQ8GUAMIVvXk",
      driveLink: "https://drive.google.com/uc?id=1SWADmFxGgC7WtWLkdczAAQ8GUAMIVvXk&export=download"
    },
    {
      name: "B.Tech. Civil Engineering",
      officialLink: "https://fms.aktu.ac.in/Resources/aktu/pdf/syllabus/Syllabus2425/B.Tech.%203rd%20Year%20Civil%20Engineering.pdf",
      driveId: "1AFsSXp1sAvr0mDrKcWAwrXTi1snd3L42",
      driveLink: "https://drive.google.com/uc?id=1AFsSXp1sAvr0mDrKcWAwrXTi1snd3L42&export=download"
    },
    {
      name: "B.Tech Mechanical & Industrial Engineering",
      officialLink: "https://fms.aktu.ac.in/Resources/aktu/pdf/syllabus/Syllabus2425/B%20Tech_3rd_year_Mech_&_Industrial%20Engg_Evaluation_Scheme_2024-25.pdf",
      driveId: "1wwGfBITTruhAnZJQACDrTSpGtM_7OHB7",
      driveLink: "https://drive.google.com/uc?id=1wwGfBITTruhAnZJQACDrTSpGtM_7OHB7&export=download"
    },
    {
      name: "B.Tech. Electrical Engineering",
      officialLink: "https://fms.aktu.ac.in/Resources/aktu/pdf/syllabus/Syllabus2425/1%20B.Tech.%203rd%20Year%20Electrical%20Engineering%202024-25.pdf",
      driveId: "1sO0XSmv4IkdY2c0CHXURs_Ny06lCNUD9",
      driveLink: "https://drive.google.com/uc?id=1sO0XSmv4IkdY2c0CHXURs_Ny06lCNUD9&export=download"
    },
    {
      name: "B.Tech. Electrical & Electronics Engineering",
      officialLink: "https://fms.aktu.ac.in/Resources/aktu/pdf/syllabus/Syllabus2425/1%20B.Tech.%203rd%20Year%20Electrical%20%26%20Electronics%20Engineering%202024-25.pdf",
      driveId: "1O5uneyCZFCNK4Pn8KPEbT9KiKaSlsK1m",
      driveLink: "https://drive.google.com/uc?id=1O5uneyCZFCNK4Pn8KPEbT9KiKaSlsK1m&export=download"
    },
    {
      name: "B.Tech. Electronics and Computer Engineering",
      officialLink: "https://fms.aktu.ac.in/Resources/aktu/pdf/syllabus/Syllabus2425/B.Tech.%20%20Electronics%20and%20Computer%20Engineering%20Syllabus%203rd%20year%202024-25.pdf",
      driveId: "1mewdgL2Gf2IPf4-m7Yyehkc9SlvM__Ze",
      driveLink: "https://drive.google.com/uc?id=1mewdgL2Gf2IPf4-m7Yyehkc9SlvM__Ze&export=download"
    },
    {
      name: "B.Tech. VLSI",
      officialLink: "https://fms.aktu.ac.in/Resources/aktu/pdf/syllabus/Syllabus2526/B.Tech_VLSI_3rd%20Year%20Syllabus_2025-26.pdf",
      driveId: "1vIYXItowKQGBsm6ynjypuXQgS5rFe-FW",
      driveLink: "https://drive.google.com/uc?id=1vIYXItowKQGBsm6ynjypuXQgS5rFe-FW&export=download"
    },
    {
      name: "B.Tech. Biotechnology",
      officialLink: "https://fms.aktu.ac.in/Resources/aktu/pdf/syllabus/Syllabus2425/1%20B.Tech.%203rd%20Year%20Biotechnology%202024-25.pdf",
      driveId: "1uxpIlsD82wg_c5UCmLok-z2LdlZrcu3-",
      driveLink: "https://drive.google.com/uc?id=1uxpIlsD82wg_c5UCmLok-z2LdlZrcu3-&export=download"
    },
    {
      name: "B.Tech. Food Technology",
      officialLink: "https://fms.aktu.ac.in/Resources/aktu/pdf/syllabus/Syllabus2425/BTech_Syallbus_Food%20Technology_V%20and%20VI%20FINAL_AKTU.pdf",
      driveId: "1CH-EkZ0mknP79OrD9WJxvgd7Vfow9TvY",
      driveLink: "https://drive.google.com/uc?id=1CH-EkZ0mknP79OrD9WJxvgd7Vfow9TvY&export=download"
    },
    {
      name: "B.Tech. Chemical Engineering",
      officialLink: "https://fms.aktu.ac.in/Resources/aktu/pdf/syllabus/Syllabus2425/Btech_Syll_Chemical_V%20and%20VI%20FINAL%20AKTU%202024-25.pdf",
      driveId: "1JD-RfbB8IzXQAj27fzPAJZ_lSJnfpCy5",
      driveLink: "https://drive.google.com/uc?id=1JD-RfbB8IzXQAj27fzPAJZ_lSJnfpCy5&export=download"
    },
    {
      name: "B.Tech. Automobile Engineering",
      officialLink: "https://fms.aktu.ac.in/Resources/aktu/pdf/syllabus/Syllabus2425/B.Tech.%20Third%20Year%20Automobile%20Engineering%20Syllabus_2024-25.pdf",
      driveId: "1xNfpHAMpfoj7_cxtXJkqGoQTFFQmOBan",
      driveLink: "https://drive.google.com/uc?id=1xNfpHAMpfoj7_cxtXJkqGoQTFFQmOBan&export=download"
    },
    {
      name: "B.Tech. Agricultural Engineering",
      officialLink: "https://fms.aktu.ac.in/Resources/aktu/pdf/syllabus/Syllabus2425/BTECH%20Third%20Year%20Agricultural%20Engineering%20%5BEffective%20from%202024-25%5D.pdf",
      driveId: "15xNe8xufL-PmgFz0amWW4TgoJDJnVgAX",
      driveLink: "https://drive.google.com/uc?id=15xNe8xufL-PmgFz0amWW4TgoJDJnVgAX&export=download"
    },
    {
      name: "Textile Technology",
      officialLink: "https://fms.aktu.ac.in/Resources/aktu/pdf/syllabus/Syllabus2425/Textile%20Technology_3rd_year%202024-25.pdf",
      driveId: "13i_g_GwfVs_N_43oPJeW3FndVDX7BEgH",
      driveLink: "https://drive.google.com/uc?id=13i_g_GwfVs_N_43oPJeW3FndVDX7BEgH&export=download"
    },
    {
      name: "Carpet & Textile Technology",
      officialLink: "https://fms.aktu.ac.in/Resources/aktu/pdf/syllabus/Syllabus2425/Carpet%20%26%20Textile%20Technology_3rd_year%202024-25.pdf",
      driveId: "11TwKOBzl0SPzQOisKvDkP9Ny7axTQcZf",
      driveLink: "https://drive.google.com/uc?id=11TwKOBzl0SPzQOisKvDkP9Ny7axTQcZf&export=download"
    },
    {
      name: "Handloom & Textile Technology",
      officialLink: "https://fms.aktu.ac.in/Resources/aktu/pdf/syllabus/Syllabus2425/HANDLOOM%20%26%20TEXTILE%20TECHNOLOGY_3rd_year%202024-25.pdf",
      driveId: "1aKWfaoG-xmx8tCNKameAWgUwFTZG9RCJ",
      driveLink: "https://drive.google.com/uc?id=1aKWfaoG-xmx8tCNKameAWgUwFTZG9RCJ&export=download"
    }
  ];

  const commonSubjects = [
    {
      name: "Common Non-Credit Courses (V & VI Semester)",
      officialLink: "https://fms.aktu.ac.in/Resources/aktu/pdf/syllabus/Syllabus2425/B.Tech.%20Open%20Elective%201%20_3rd%20Year%20VI%20Semester%202024-25%20(1).pdf",
      driveId: "17eRgU4Sn9uvBgNkzvsqta0CjNoH24WVA",
      driveLink: "https://drive.google.com/uc?id=17eRgU4Sn9uvBgNkzvsqta0CjNoH24WVA&export=download"
    },
    {
      name: "B.Tech. Open Elective 1 (VI Semester)",
      officialLink: "https://fms.aktu.ac.in/Resources/aktu/pdf/syllabus/Syllabus2425/Common%20Non-Credit%20%20Courses%20V%20&%20VI%20semester%202024-25.pdf",
      driveId: "19pJbXSm6ZV9kolQfQEQ0DdxDSbjr6TDH",
      driveLink: "https://drive.google.com/uc?id=19pJbXSm6ZV9kolQfQEQ0DdxDSbjr6TDH&export=download"
    }
  ];

  const overview = [
    {
      title: "Computer Science & Engineering",
      subjects: [
        "Design and Analysis of Algorithms",
        "Database Management Systems",
        "Web Technology",
        "Compiler Design",
        "Machine Learning",
        "Computer Networks",
      ],
    },
    {
      title: "Electronics & Communication Engineering",
      subjects: [
        "Integrated Circuits",
        "Control Systems",
        "Microprocessors & Microcontrollers",
        "Antennas and Wave Propagation",
        "Digital Signal Processing",
        "VLSI Design",
      ],
    },
    {
      title: "Mechanical Engineering",
      subjects: [
        "Heat and Mass Transfer",
        "Kinematics of Machines",
        "Dynamics of Machines",
        "Machine Design",
        "Refrigeration and Air Conditioning",
      ],
    },
    {
      title: "Civil Engineering",
      subjects: [
        "Design of Concrete Structures",
        "Transportation Engineering",
        "Environmental Engineering",
        "Structural Analysis II",
        "Foundation Engineering",
      ],
    },
  ];

  const studyTips = [
    "Focus heavily on Core Specialization subjects.",
    "Start preparing for GATE/Placements alongside academics.",
    "Pay special attention to Mini Projects and Lab records.",
    "Choose Open Electives strategically based on your career goal.",
    "Master the implementation, not just the theory.",
    "Maintain a solid CGPA for campus placements.",
  ];

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 md:px-6">

      {/* HERO */}
       <section className="relative overflow-hidden flex justify-center items-center rounded-3xl mb-10">
             <Image  
               src='/3rd-year-syllabus.png'  
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
                3rd Year Syllabus PDFs
              </a>
              <a href="#common-subjects" className="block hover:text-blue-500">
                Common Subjects & Electives
              </a>
              <a href="#importance" className="block hover:text-blue-500">
                Why is 3rd Year Important?
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
                           {branch.name} Syllabus
                         </a>
                      </h2>
                      <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">
                        Official AKTU 3rd Year Syllabus PDF
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
              3rd Year Common Subjects & Electives
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full bg-amber-600/10 border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
                <thead className="bg-gray-100 dark:bg-gray-800">
                  <tr>
                    <th className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-left w-20">
                      S.No.
                    </th>
                    <th className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-left">
                      Subject / Document Name
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
              Why is the AKTU 3rd Year Syllabus Important?
            </h2>
            <p className="leading-8 text-zinc-600 dark:text-zinc-400">
              The third year of your B.Tech program is arguably the most crucial phase of your academic journey. This is where you dive deep into advanced core subjects, departmental electives, and significant project work. Your performance in the 5th and 6th semesters heavily influences your technical profile for upcoming campus placements.
            </p>
            <p className="leading-8 text-zinc-600 dark:text-zinc-400 mt-4">
              Additionally, if you plan to attempt the GATE exam or seek higher studies, the majority of the competitive syllabus is covered during the 3rd year. Mastering this syllabus lays the groundwork for a successful engineering career.
            </p>
          </section>

          {/* OVERVIEW */}
          <section id="overview" className="scroll-mt-28">
            <h2 className="text-3xl font-bold mb-6">
              Overview of AKTU 3rd Year Syllabus by Branch
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
              The 3rd year syllabus bridges the gap between theoretical knowledge and practical application. Whether you are aiming for top-tier IT companies, core engineering firms, or prestigious higher education institutions, thoroughly understanding and implementing these subjects is the key to unlocking your future success.
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
                  What are Open Electives in the 3rd year?
                </summary>
                <p className="mt-3 text-zinc-600 dark:text-zinc-400">
                  Open Electives are interdisciplinary subjects chosen by students from a pool of courses offered by departments other than their own. They help broaden your perspective beyond your core branch.
                </p>
              </details>

              <details className="rounded-2xl border border-amber-900 dark:border-amber-200 p-5">
                <summary className="cursor-pointer font-semibold">
                  Does the 3rd year syllabus include project work?
                </summary>
                <p className="mt-3 text-zinc-600 dark:text-zinc-400">
                  Yes, the 6th semester typically introduces a "Mini Project" or seminar which acts as a foundational step for your final year Major Project.
                </p>
              </details>

              <details className="rounded-2xl border border-amber-900 dark:border-amber-200 p-5">
                <summary className="cursor-pointer font-semibold">
                  How much weightage does the 3rd year hold for placements?
                </summary>
                <p className="mt-3 text-zinc-600 dark:text-zinc-400">
                  It holds massive weightage. Most technical interview questions (DBMS, OOPS, Networking, Design Algorithms, Control Systems) are sourced directly from 2nd and 3rd-year subjects.
                </p>
              </details>
            </div>
          </section>

          <section className="rounded-3xl border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/20 p-6">
            <h2 className="text-2xl font-bold">
              Continue Exploring
            </h2>
            <p className="mt-3 text-zinc-600 dark:text-zinc-400">
              Almost at the finish line! After reviewing your 3rd-year subjects, check out the AKTU 4th Year Syllabus to prepare for your final projects and electives.
            </p>
            <Link
              href="/AKTU-Syllabus/4th-Year-AKTU-Syllabus"
              className="inline-block mt-5 text-blue-600 dark:text-blue-400 font-medium"
            >
              → View AKTU 4th Year Syllabus
            </Link>
          </section>

        </div>
      </div>
    </main>
  );
}