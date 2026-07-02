import PdfPreview from "@/components/pdfPreview";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title:
    "AKTU B.Tech 4th Year Syllabus PDF Download (2026) | Branch Wise Syllabus",
  description:
    "Download AKTU B.Tech 4th (Final) Year Syllabus PDF for all branches including CSE, IT, ECE, EE, Mechanical, Civil, Biotechnology, and more. Latest AKTU syllabus PDFs.",
};

export default function Page() {
  const branchSyllabus = [
   
    {
      name: "Computer Science and Engineering / CS",
      officialLink: "https://fms.aktu.ac.in/Resources/aktu/pdf/syllabus/Syllabus2324/BTech.%204th%20Year_Computer%20Science%20and%20Engineering-%20Internet%20of%20Things_2023-24_v2.pdf",
      driveId: "1ZoP2Xn4xd94d9g_HWEWPtMZDzBYmQVnh",
      driveLink: "https://drive.google.com/uc?id=1ZoP2Xn4xd94d9g_HWEWPtMZDzBYmQVnh&export=download"
    },
    {
      name: "Electronics / ECE / Electronics and Telecommunication",
      officialLink: "https://aktu.ac.in/pdf/syllabus/syllabus2122/B.Tech%20EC%20Final%20Year_R.pdf",
      driveId: "1GOX0AzHC6NDqOFzSd_g1WupeFa8p3j6v",
      driveLink: "https://drive.google.com/uc?id=1GOX0AzHC6NDqOFzSd_g1WupeFa8p3j6v&export=download"
    },
    {
      name: "Biotechnology (2025-26)",
      officialLink: "https://fms.aktu.ac.in/Resources/aktu/pdf/syllabus/Syllabus2526/B.Tech.%20Final%20Year_Biotechnology%20Syllabus_2025-26.pdf",
      driveId: "1cqzBDh8ZWMC0v8pirWIcpesOISPwNBVh",
      driveLink: "https://drive.google.com/uc?id=1cqzBDh8ZWMC0v8pirWIcpesOISPwNBVh&export=download"
    },
    {
      name: "Chemical Engineering (2025-26)",
      officialLink: "https://fms.aktu.ac.in/Resources/aktu/pdf/syllabus/Syllabus2526/Syllabus_Chemical%20VII%20and%20VIII%2025-26.pdf",
      driveId: "1cqzBDh8ZWMC0v8pirWIcpesOISPwNBVh",
      driveLink: "https://drive.google.com/uc?id=1cqzBDh8ZWMC0v8pirWIcpesOISPwNBVh&export=download"
    },
    {
      name: "Plastic Engineering",
      officialLink: "https://fms.aktu.ac.in/Resources/aktu/pdf/syllabus/Syllabus2526/B.Tech.%20Final%20Year%20Plastic%20Engineering%20Syllabus_2025-26.pdf",
      driveId: "1n6kuEO1wH_cdVb7CYBYqL_gefcZJTxTM",
      driveLink: "https://drive.google.com/uc?id=1n6kuEO1wH_cdVb7CYBYqL_gefcZJTxTM&export=download"
    },
    {
      name: "Computer Engineering & Information Technology",
      officialLink: "https://fms.aktu.ac.in/Resources/aktu/pdf/syllabus/Syllabus2526/B.Tech.%20CE&IT,CSIT%20and%20IT%20Syllabus%20%204th%20Year%202025-26.pdf",
      driveId: "1LWVmF-CsKSyoNNGk5xOaPObD7t9Lz0ra",
      driveLink: "https://drive.google.com/uc?id=1LWVmF-CsKSyoNNGk5xOaPObD7t9Lz0ra&export=download"
    },
    {
      name: "Textile Technology (2025-26)",
      officialLink: "https://fms.aktu.ac.in/Resources/aktu/pdf/syllabus/Syllabus2526/B.Tech._Textile%20Technology%20(BTT)_Final%20Year%20Syllabus_2025-26.pdf",
      driveId: "1HQyisOkuk2y4t1fxNN_vl4rWSYjGf6oK",
      driveLink: "https://drive.google.com/uc?id=1HQyisOkuk2y4t1fxNN_vl4rWSYjGf6oK&export=download"
    },
    {
      name: "Electrical & Electrical and Electronics Engineering (2025-26)",
      officialLink: "https://fms.aktu.ac.in/Resources/aktu/pdf/syllabus/Syllabus2526/B.Tech_EE_EN_Final_Year_Syllabus_2025-26.docx.pdf",
      driveId: "1GOX0AzHC6NDqOFzSd_g1WupeFa8p3j6v",
      driveLink: "https://drive.google.com/uc?id=1GOX0AzHC6NDqOFzSd_g1WupeFa8p3j6v&export=download"
    },
    {
      name: "Mechanical Engineering",
      officialLink: "https://fms.aktu.ac.in/Resources/aktu/pdf/syllabus/Syllabus2526/B.Tech.%20Final%20Year%20Mechanical%20Engineering%20Syllabus_2025-26.pdf",
      driveId: "1mQNx2cXyAFyCTMVQToR1kOY1zf5n8lHf",
      driveLink: "https://drive.google.com/uc?id=1mQNx2cXyAFyCTMVQToR1kOY1zf5n8lHf&export=download"
    },
    {
      name: "Mechanical Engineering (Manufacturing Technology)",
      officialLink: "https://aktu.ac.in/pdf/syllabus/syllabus2122/Manufacturing%20Technology%204th%20Year.pdf",
      driveId: "1mQNx2cXyAFyCTMVQToR1kOY1zf5n8lHf",
      driveLink: "https://drive.google.com/uc?id=1mQNx2cXyAFyCTMVQToR1kOY1zf5n8lHf&export=download"
    },
    {
      name: "Mechanical Engineering (Automobile Engineering)",
      officialLink: "https://aktu.ac.in/pdf/syllabus/syllabus2122/Automobile%20Engineering%204th%20Year.pdf",
      driveId: "1mQNx2cXyAFyCTMVQToR1kOY1zf5n8lHf",
      driveLink: "https://drive.google.com/uc?id=1mQNx2cXyAFyCTMVQToR1kOY1zf5n8lHf&export=download"
    },
    {
      name: "Agriculture Engineering",
      officialLink: "https://fms.aktu.ac.in/Resources/aktu/pdf/syllabus/Syllabus2526/B.Tech.%20Final%20Year%20Agriculture%20Engineering%20Syllabus%202025-26.pdf",
      driveId: "1rZlqpZyu19FWIvUrNI8MPIFIayTrtDEv",
      driveLink: "https://drive.google.com/uc?id=1rZlqpZyu19FWIvUrNI8MPIFIayTrtDEv&export=download"
    },
    {
      name: "Computer Science (Hindi) (2025-26)",
      officialLink: "https://fms.aktu.ac.in/Resources/aktu/pdf/syllabus/Syllabus2526/B.Tech.%20CS_Hindi%20Syllabus%20%204th%20Year%202025-26.pdf",
      driveId: "1H88-3-4HqHurqFpdGo1uqLhVGSmvm6ME",
      driveLink: "https://drive.google.com/uc?id=1H88-3-4HqHurqFpdGo1uqLhVGSmvm6ME&export=download"
    },
    {
      name: "Computer Science and Design",
      officialLink: "https://fms.aktu.ac.in/Resources/aktu/pdf/syllabus/Syllabus2526/B.Tech.%20CS%20and%20Design%20Syllabus%20%204th%20Year%202025-26.pdf",
      driveId: "1Ka1cQp9vXpsAjXMsx5K7SylT0qvG22Lx",
      driveLink: "https://drive.google.com/uc?id=1Ka1cQp9vXpsAjXMsx5K7SylT0qvG22Lx&export=download"
    },
    {
      name: "Electrical and Computer Engineering (2025-26)",
      officialLink: "https://fms.aktu.ac.in/Resources/aktu/pdf/syllabus/Syllabus2526/B.Tech_ELCE_Final_Year_Syllabus_2025-26.pdf",
      driveId: "1GOX0AzHC6NDqOFzSd_g1WupeFa8p3j6v",
      driveLink: "https://drive.google.com/uc?id=1GOX0AzHC6NDqOFzSd_g1WupeFa8p3j6v&export=download"
    },
    {
      name: "Carpet & Textile Technology (2025-26)",
      officialLink: "https://fms.aktu.ac.in/Resources/aktu/pdf/syllabus/Syllabus2526/B.Tech._Carpet%20&%20Textile%20Technology_Final%20Year%20Syllabus_2025-26.pdf",
      driveId: "1hFyeyddyAQKn0R_jvnVw0cOAMasNsT8C",
      driveLink: "https://drive.google.com/uc?id=1hFyeyddyAQKn0R_jvnVw0cOAMasNsT8C&export=download"
    },
    {
      name: "Handloom & Textile Technology",
      officialLink: "https://fms.aktu.ac.in/Resources/aktu/pdf/syllabus/Syllabus2526/B.Tech._Handloom%20&%20Textile%20Technology_Final%20Year%20Syllabus_2025-26.pdf",
      driveId: "1YxSvlg4p86d1ajZ1ShWA0ZoEo9WzTUOf",
      driveLink: "https://drive.google.com/uc?id=1YxSvlg4p86d1ajZ1ShWA0ZoEo9WzTUOf&export=download"
    },
    {
      name: "Computer Science Engineering (IoT)",
      officialLink: "https://fms.aktu.ac.in/Resources/aktu/pdf/syllabus/Syllabus2526/B.%20Tech.%20Computer%20Science%20Engineering%20(IoT)%20Syllabus%20-%204th%20Year%202025-26.pdf",
      driveId: "1H88-3-4HqHurqFpdGo1uqLhVGSmvm6ME",
      driveLink: "https://drive.google.com/uc?id=1H88-3-4HqHurqFpdGo1uqLhVGSmvm6ME&export=download"
    },
    {
      name: "Computer Science Engineering (Cyber Security) (2025-26)",
      officialLink: "https://fms.aktu.ac.in/Resources/aktu/pdf/syllabus/Syllabus2526/B.%20Tech.%20Computer%20Science%20Engineering%20(Cyber%20Security)%20Syllabus%20-%204th%20Year%202025-26.pdf",
      driveId: "1H88-3-4HqHurqFpdGo1uqLhVGSmvm6ME",
      driveLink: "https://drive.google.com/uc?id=1H88-3-4HqHurqFpdGo1uqLhVGSmvm6ME&export=download"
    },
    {
      name: "Production / Industrial Production Engineering",
      officialLink: "https://fms.aktu.ac.in/Resources/aktu/pdf/syllabus/Syllabus2526/B.Tech.%20Final%20Year%20Production%20Engineering_Industrial%20Production%20Engineering%20Syllabus_2025-26.pdf",
      driveId: "1H-2jjqHT_HgyBq9b76ePRNWlo4a_-mHc",
      driveLink: "https://drive.google.com/uc?id=1H-2jjqHT_HgyBq9b76ePRNWlo4a_-mHc&export=download"
    },
    {
      name: "CSE \u2013 Data Science (2025-26)",
      officialLink: "https://fms.aktu.ac.in/Resources/aktu/pdf/syllabus/Syllabus2526/B.Tech.%20CSE_DS%20Syllabus%204th%20Year%202025-26.pdf",
      driveId: "1-oPMEW2lo1ZWY57wXMDTiPMHXj03SN5n",
      driveLink: "https://drive.google.com/uc?id=1-oPMEW2lo1ZWY57wXMDTiPMHXj03SN5n&export=download"
    },
    {
      name: "Electronics and Computer Engineering (2025-26)",
      officialLink: "https://fms.aktu.ac.in/Resources/aktu/pdf/syllabus/Syllabus2526/B.%20Tech.%20Electronics%20and%20Computer%20Engineering%20Syllabus%20-%204th%20Year%202025-26.pdf",
      driveId: "1znznqkur7pgHXcTUCE7uJrwq-suiIZPJ",
      driveLink: "https://drive.google.com/uc?id=1znznqkur7pgHXcTUCE7uJrwq-suiIZPJ&export=download"
    },
    {
      name: "Computer Science and Business Systems",
      officialLink: "https://fms.aktu.ac.in/Resources/aktu/pdf/syllabus/Syllabus2526/B.%20Tech.%20Computer%20Science%20and%20Business%20Systems%20Syllabus%20-%204th%20Year%202025-26.pdf",
      driveId: "1LWVmF-CsKSyoNNGk5xOaPObD7t9Lz0ra",
      driveLink: "https://drive.google.com/uc?id=1LWVmF-CsKSyoNNGk5xOaPObD7t9Lz0ra&export=download"
    },
    {
      name: "CSE \u2013 Artificial Intelligence (2025-26)",
      officialLink: "https://fms.aktu.ac.in/Resources/aktu/pdf/syllabus/Syllabus2526/B.Tech.%20CSE_AI%20Syllabus%204th%20Year%202025-26.pdf",
      driveId: "1VVoahMpJnmo5KJ-ZbXnXtkL73rhIy14L",
      driveLink: "https://drive.google.com/uc?id=1VVoahMpJnmo5KJ-ZbXnXtkL73rhIy14L&export=download"
    },
    {
      name: "Aeronautical Engineering",
      officialLink: "https://fms.aktu.ac.in/Resources/aktu/pdf/syllabus/Syllabus2526/B.Tech.%20Final%20Year%20Aeronautical%20Engineering%20Syllabus_2025-26.pdf",
      driveId: "1mQNx2cXyAFyCTMVQToR1kOY1zf5n8lHf",
      driveLink: "https://drive.google.com/uc?id=1mQNx2cXyAFyCTMVQToR1kOY1zf5n8lHf&export=download"
    }
  ];

  const commonSubjects = [
    {
      name: "Open Elective \u2013 III and Open Elective \u2013 IV",
      officialLink: "https://fms.aktu.ac.in/Resources/aktu/pdf/syllabus/Syllabus2324/B.Tech.%20Open%20Elective%20III%20&%20IV%20List%204th%20Year%20VIII%20Semester%202021-22.pdf",
      driveId: "1wDO1qXZnTTeP_talihS1OLMFkGXW6UP3",
      driveLink: "https://drive.google.com/uc?id=1wDO1qXZnTTeP_talihS1OLMFkGXW6UP3&export=download"
    },
    {
      name: "HSMC Courses and Open Electives \u2013 II",
      officialLink: "https://aktu.ac.in/pdf/syllabus/syllabus2223/B.Tech%20Common%20HSMC_and_Open_Elective_II_Course%20for%20B.Tech%204th%20Year.pdf",
      driveId: "1ILYwoKANoSC-_Pow11Y0_nyQNxfXOUNy",
      driveLink: "https://drive.google.com/uc?id=1ILYwoKANoSC-_Pow11Y0_nyQNxfXOUNy&export=download"
    },
    {
      name: "VIII Semester: OPEN ELECTIVE-III and IV",
      officialLink: "https://drive.google.com/file/d/1d1SC4oEZTlHCpo1a4yviXlujwT4q85k3/view?usp=sharing",
      driveId: "1d1SC4oEZTlHCpo1a4yviXlujwT4q85k3",
      driveLink: "https://drive.google.com/uc?id=1T-sP3hSa3Jr9sz3FPJCezz9RrEl-ChfH&export=download"
    },
    {
      name: "VII Semester: OPEN ELECTIVE-II",
      officialLink: "https://fms.aktu.ac.in/Resources/aktu/pdf/syllabus/Syllabus2526/B.Tech.%20Final%20Year%20VIIth%20Semester_Open%20Elective-II%20Syllabus.pdf",
      driveId: "1T-sP3hSa3Jr9sz3FPJCezz9RrEl-ChfH",
      driveLink: "https://drive.google.com/uc?id=1T-sP3hSa3Jr9sz3FPJCezz9RrEl-ChfH&export=download"
    }
  ];

  const overview = [
    {
      title: "Computer Science & Engineering",
      subjects: [
        "Cloud Computing",
        "Blockchain Architecture",
        "Machine Learning Techniques",
        "Major Project (Phase I & II)",
        "Open Electives",
      ],
    },
    {
      title: "Electronics & Communication",
      subjects: [
        "Satellite Communication",
        "Wireless Networks",
        "Optical Communication",
        "Major Project (Phase I & II)",
        "Open Electives",
      ],
    },
    {
      title: "Mechanical Engineering",
      subjects: [
        "Operations Research",
        "Power Plant Engineering",
        "Quality Control",
        "Major Project (Phase I & II)",
        "Open Electives",
      ],
    },
    {
      title: "Civil Engineering",
      subjects: [
        "Construction Management",
        "Earthquake Engineering",
        "Urban Planning",
        "Major Project (Phase I & II)",
        "Open Electives",
      ],
    },
  ];

  const studyTips = [
    "Dedicate maximum effort to your Major Project; it defines your portfolio.",
    "Select Open Electives strategically based on your target career.",
    "Revise core concepts vigorously for upcoming campus placements.",
    "Document your project well to publish research papers.",
    "Prepare for higher studies (GATE/GRE) alongside your semester exams.",
    "Network with alumni and professors for industry referrals.",
  ];

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 md:px-6">

      {/* HERO */}
      <section className="relative overflow-hidden flex justify-center items-center rounded-3xl mb-10">
                   <Image  
                     src='/4th-year-syllabus.png'  
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
                4th Year Syllabus PDFs
              </a>
              <a href="#common-subjects" className="block hover:text-blue-500">
                Common Electives
              </a>
              <a href="#importance" className="block hover:text-blue-500">
                Why is Final Year Important?
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
              <div className="p-5 space-y-4 max-h-[800px] overflow-y-auto">
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
                        Official AKTU 4th Year Syllabus PDF
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
              4th Year Common Subjects & Open Electives
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


                  {/* SYLLABUS OVERVIEW SECTION */}
          <section id="overview-details" className="scroll-mt-28">
            <h2 className="text-3xl font-bold mb-6">
              4th Year Syllabus Overview – CSE / IT & Allied Branches
            </h2>
            
            <p className="leading-8 text-zinc-600 dark:text-zinc-400 mb-8">
              The final year of the AKTU B.Tech curriculum focuses on specializing via Departmental Electives, broadening perspectives through Interdisciplinary Open Electives, and applying engineering core principles inside structural Major Projects.
            </p>

            <div className="space-y-10">
              
              {/* 7TH SEMESTER */}
              <div>
                <h3 className="text-2xl font-bold text-zinc-800 dark:text-zinc-200 mb-4 flex items-center gap-2">
                  <span>📖</span> VII Semester (7th Semester) Syllabus
                </h3>
                
                <div className="overflow-x-auto mb-6">
                  <table className="w-full bg-amber-600/10 border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
                    <thead className="bg-gray-100 dark:bg-gray-800">
                      <tr>
                        <th className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-left w-16">S.No.</th>
                        <th className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-left">Subject Name</th>
                        <th className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-left w-32">Subject Code</th>
                        <th className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-left w-32">Type</th>
                        <th className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-center w-24">Credits</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                        <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-center">1</td>
                        <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 font-medium">Humanities & Social Sciences Management Course – I</td>
                        <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 font-mono text-sm">KHU701</td>
                        <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">Theory</td>
                        <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-center">3</td>
                      </tr>
                      <tr className="hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                        <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-center">2</td>
                        <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 font-medium">Departmental Elective – IV (Options below)</td>
                        <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 font-mono text-sm">KCS07X</td>
                        <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">Theory</td>
                        <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-center">3</td>
                      </tr>
                      <tr className="hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                        <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-center">3</td>
                        <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 font-medium">Departmental Elective – V (Options below)</td>
                        <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 font-mono text-sm">KCS07X</td>
                        <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">Theory</td>
                        <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-center">3</td>
                      </tr>
                      <tr className="hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                        <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-center">4</td>
                        <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 font-medium">Mini Project / Industrial Training / Internship (4–6 weeks)</td>
                        <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 font-mono text-sm">—</td>
                        <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">Practical / Project</td>
                        <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-center">2</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* ELECTIVE TABLES GRID */}
                <div className="grid lg:grid-cols-2 gap-6 mt-6">
                  
                  {/* ELECTIVE IV */}
                  <div className="rounded-2xl border border-amber-900 dark:border-amber-200 p-5 bg-amber-600/5">
                    <h4 className="font-bold text-lg mb-4 text-blue-600 dark:text-blue-400">⚡ Departmental Elective-IV Options</h4>
                    <div className="overflow-x-auto text-sm">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b border-zinc-300 dark:border-zinc-700 text-zinc-500 text-left">
                            <th className="pb-2">Subject Name</th>
                            <th className="pb-2 w-28">Code</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                          {[
                            { name: "Artificial Intelligence", code: "KCS071" },
                            { name: "Natural Language Processing", code: "KCS072" },
                            { name: "High Performance Computing", code: "KCS073" },
                            { name: "Cryptography and Network Security", code: "KCS074" },
                            { name: "Design & Development of Applications", code: "KCS075" },
                            { name: "Software Testing", code: "KCS076" },
                            { name: "Distributed Systems", code: "KCS077" },
                          ].map((sub) => (
                            <tr key={sub.code} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                              <td className="py-2.5 pr-2 font-medium">{sub.name}</td>
                              <td className="py-2.5 font-mono text-xs">{sub.code}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* ELECTIVE V */}
                  <div className="rounded-2xl border border-amber-900 dark:border-amber-200 p-5 bg-amber-600/5">
                    <h4 className="font-bold text-lg mb-4 text-blue-600 dark:text-blue-400">⚡ Departmental Elective-V Options</h4>
                    <div className="overflow-x-auto text-sm">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b border-zinc-300 dark:border-zinc-700 text-zinc-500 text-left">
                            <th className="pb-2">Subject Name</th>
                            <th className="pb-2 w-28">Code</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                          {[
                            { name: "Deep Learning", code: "KCS078" },
                            { name: "Service Oriented Architecture", code: "KCS079" },
                            { name: "Quantum Computing", code: "KCS710" },
                            { name: "Mobile Computing", code: "KCS711" },
                            { name: "Internet of Things (IoT)", code: "KCS712" },
                            { name: "Cloud Computing", code: "KCS713" },
                            { name: "Blockchain Architecture Design", code: "KCS714" },
                          ].map((sub) => (
                            <tr key={sub.code} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                              <td className="py-2.5 pr-2 font-medium">{sub.name}</td>
                              <td className="py-2.5 font-mono text-xs">{sub.code}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                </div>
              </div>

              {/* 8TH SEMESTER */}
              <div>
                <h3 className="text-2xl font-bold text-zinc-800 dark:text-zinc-200 mb-4 flex items-center gap-2">
                  <span>📗</span> VIII Semester (8th Semester) Syllabus
                </h3>
                
                <div className="overflow-x-auto">
                  <table className="w-full bg-amber-600/10 border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
                    <thead className="bg-gray-100 dark:bg-gray-800">
                      <tr>
                        <th className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-left w-16">S.No.</th>
                        <th className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-left">Subject Name</th>
                        <th className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-left w-32">Subject Code</th>
                        <th className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-left w-32">Type</th>
                        <th className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-center w-24">Credits</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                        <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-center">1</td>
                        <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 font-medium">Humanities & Social Sciences Management Course – II</td>
                        <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 font-mono text-sm">KHU801</td>
                        <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">Theory</td>
                        <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-center">3</td>
                      </tr>
                      <tr className="hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                        <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-center">2</td>
                        <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 font-medium">Open Elective – III (Interdisciplinary Courses)</td>
                        <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 font-mono text-sm">KOE08X</td>
                        <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">Theory</td>
                        <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-center">3</td>
                      </tr>
                      <tr className="hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                        <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-center">3</td>
                        <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 font-medium">Open Elective – IV (Interdisciplinary Courses)</td>
                        <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 font-mono text-sm">KOE08X</td>
                        <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">Theory</td>
                        <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-center">3</td>
                      </tr>
                      <tr className="hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                        <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-center">4</td>
                        <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 font-medium">Major Project / Dissertation / Industry Project</td>
                        <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 font-mono text-sm">—</td>
                        <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">Practical / Project</td>
                        <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-center">12</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          </section>


          {/* IMPORTANCE */}
          <section id="importance" className="scroll-mt-28">
            <h2 className="text-3xl font-bold mb-5">
              Why is the Final Year Syllabus Important?
            </h2>
            <p className="leading-8 text-zinc-600 dark:text-zinc-400">
              The 4th year is the culmination of your engineering degree. Unlike previous years heavily focused on theory, the 7th and 8th semesters are highly practical and specialized. The syllabus consists mostly of elective subjects, allowing you to tailor your final learning experience toward your specific career interests.
            </p>
            <p className="leading-8 text-zinc-600 dark:text-zinc-400 mt-4">
              Furthermore, the defining element of this year is the <strong>Major Project</strong>. This project serves as a showcase of your engineering capabilities to future employers and admissions committees, making the final year syllabus less about passing exams and more about practical application and career readiness.
            </p>
          </section>

          {/* OVERVIEW */}
          <section id="overview" className="scroll-mt-28">
            <h2 className="text-3xl font-bold mb-6">
              Overview of 4th Year Subjects by Branch
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
              How to Excel in Your Final Year
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
              You are almost at the finish line! Use this syllabus to map out your electives and align them with your Major Project. This is your chance to specialize, innovate, and prepare a solid portfolio as you transition from a student to a professional engineer. 
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
                  How many credits are assigned to the Major Project?
                </summary>
                <p className="mt-3 text-zinc-600 dark:text-zinc-400">
                  The Major Project (split across Phase I in the 7th semester and Phase II in the 8th semester) holds the highest credit weightage in the final year curriculum.
                </p>
              </details>

              <details className="rounded-2xl border border-amber-900 dark:border-amber-200 p-5">
                <summary className="cursor-pointer font-semibold">
                  Can I choose electives outside my core branch?
                </summary>
                <p className="mt-3 text-zinc-600 dark:text-zinc-400">
                  Yes, "Open Electives" allow you to select interdisciplinary subjects from a university-approved pool, helping you diversify your skill set.
                </p>
              </details>

              <details className="rounded-2xl border border-amber-900 dark:border-amber-200 p-5">
                <summary className="cursor-pointer font-semibold">
                  Is there any core theory exam in the 8th semester?
                </summary>
                <p className="mt-3 text-zinc-600 dark:text-zinc-400">
                  The 8th semester is mostly dedicated to your final project, internships, and a few elective subjects depending on your branch structure.
                </p>
              </details>
            </div>
          </section>

          <section className="rounded-3xl border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/20 p-6">
            <h2 className="text-2xl font-bold">
              Looking for Previous Years?
            </h2>
            <p className="mt-3 text-zinc-600 dark:text-zinc-400">
              Need to clear a back paper or review old concepts? Access the syllabi for previous years below.
            </p>
            <div className="mt-5 flex flex-wrap gap-4">
              <Link
                href="/AKTU-Syllabus/1st-Year-AKTU-Syllabus"
                className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
              >
                1st Year Syllabus
              </Link>
              <Link
                href="/AKTU-Syllabus/2nd-Year-AKTU-Syllabus"
                className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
              >
                2nd Year Syllabus
              </Link>
              <Link
                href="/AKTU-Syllabus/3rd-Year-AKTU-Syllabus"
                className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
              >
                3rd Year Syllabus
              </Link>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}