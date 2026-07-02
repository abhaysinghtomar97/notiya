import PdfPreview from "@/components/pdfPreview";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title:
    "CSJMU BCA Syllabus PDF Download (1st to 3rd Year) | Complete Course Structure",
  description:
    "Download the complete CSJM University (Kanpur) BCA Syllabus PDF. Explore semester-wise subjects, course codes, electives, and credit distributions (Total 130 Credits) for all 3 years.",
};

export default function Page() {
  const sem1 = [
    { code: "BCA1001T", name: "Computer Fundamentals and Problem-solving Techniques", l: 3, t: 1, p: 0, credits: 4 },
    { code: "BCA1002T", name: "C Programming", l: 3, t: 1, p: 0, credits: 4 },
    { code: "BCA1003T", name: "Principles of Management", l: 3, t: 0, p: 0, credits: 3 },
    { code: "BCA1004T", name: "Professional Communication", l: 2, t: 0, p: 0, credits: 2 },
    { code: "BCA1005T", name: "Basics of Mathematics", l: 3, t: 0, p: 0, credits: 3 },
    { code: "BCA1006P", name: "Practical Work of C Programming and Office Automation", l: 0, t: 1, p: 6, credits: 4 },
  ];

  const sem2 = [
    { code: "BCA2001T", name: "Object Oriented Programming using C++", l: 3, t: 1, p: 0, credits: 4 },
    { code: "BCA2002T", name: "Basics of Data Structures & Algorithms", l: 3, t: 1, p: 0, credits: 4 },
    { code: "BCA2003T", name: "Mathematics for Computer Application", l: 3, t: 0, p: 0, credits: 3 },
    { code: "BCA2004T", name: "Financial Accounting & Management", l: 2, t: 0, p: 0, credits: 2 },
    { code: "BCA2005T", name: "Computer Organization", l: 3, t: 0, p: 0, credits: 3 },
    { code: "BCA2006P", name: "Practical Work of Object-Oriented Programming using C++ and Data Structures", l: 0, t: 1, p: 6, credits: 4 },
  ];

  const sem3 = [
    { code: "BCA3001T", name: "Python Programming", l: 3, t: 1, p: 0, credits: 4 },
    { code: "BCA3002T", name: "Operating System", l: 3, t: 1, p: 0, credits: 4 },
    { code: "BCA3003T", name: "Introduction to Emerging Technologies", l: 3, t: 0, p: 0, credits: 3 },
    { code: "BCA3004T", name: "Internet & Web Technology", l: 2, t: 0, p: 0, credits: 2 },
    { code: "BCA3005T", name: "Software Engineering", l: 3, t: 0, p: 0, credits: 3 },
    { code: "BCA3006P", name: "Practical Work of Python Programming", l: 0, t: 1, p: 6, credits: 4 },
  ];

  const sem4 = [
    { code: "BCA4001T", name: "Introduction to Database Management System", l: 3, t: 0, p: 1, credits: 4 },
    { code: "BCA4002T", name: "Computer Networks", l: 3, t: 0, p: 1, credits: 4 },
    { code: "BCA4003T", name: "Basics of Computer Graphics & Introduction to Computer Vision", l: 3, t: 0, p: 0, credits: 3 },
    { code: "BCA4004T", name: "Numerical & Statistical Techniques", l: 2, t: 0, p: 0, credits: 2 },
    { code: "BCA4005T", name: "Soft Computing", l: 3, t: 0, p: 0, credits: 3 },
    { code: "BCA4006P", name: "Practical Work of Database Management System", l: 0, t: 0, p: 3, credits: 4 },
  ];

  const sem5 = [
    { code: "BCA5001T", name: "Java Programming and Dynamic Webpage Design", l: 3, t: 0, p: 1, credits: 4 },
    { code: "BCA5002T", name: "Optimization Techniques", l: 3, t: 1, p: 0, credits: 4 },
    { code: "—", name: "Elective-I", l: 3, t: 1, p: 0, credits: 4 },
    { code: "—", name: "Elective-II", l: 3, t: 1, p: 0, credits: 4 },
    { code: "BCA5007P", name: "Practical Work of Java Programming and Dynamic Webpage Design", l: 0, t: 1, p: 6, credits: 4 },
    { code: "BCA5008R", name: "Project (Progressive)", l: 0, t: 0, p: 10, credits: 5 },
  ];

  const sem5Electives = [
    { code: "BCA5003T", name: "Cloud Computing", l: 3, t: 1, p: 0, credits: 4 },
    { code: "BCA5004T", name: "Fundamentals of Artificial Intelligence", l: 3, t: 1, p: 0, credits: 4 },
    { code: "BCA5005T", name: "Cyber Security", l: 3, t: 1, p: 0, credits: 4 },
    { code: "BCA5006T", name: "Big Data Analytics", l: 3, t: 1, p: 0, credits: 4 },
    { code: "BCA5007T", name: "Knowledge Management", l: 3, t: 1, p: 0, credits: 4 },
    { code: "BCA5008T", name: "Software Project Management", l: 3, t: 1, p: 0, credits: 4 },
  ];

  const sem6 = [
    { code: "BCA6001T", name: "Introduction to Data Science", l: 3, t: 1, p: 0, credits: 4 },
    { code: "BCA6002T", name: "Machine Learning", l: 3, t: 0, p: 1, credits: 4 },
    { code: "—", name: "Elective-III", l: 3, t: 1, p: 0, credits: 4 },
    { code: "—", name: "Elective-IV", l: 3, t: 1, p: 0, credits: 4 },
    { code: "BCA6007P", name: "Practical Work of Machine Learning using Python", l: 0, t: 1, p: 6, credits: 4 },
    { code: "BCA6008R", name: "Project (Submissive)", l: 0, t: 0, p: 10, credits: 5 },
  ];

  const sem6Electives = [
    { code: "BCA6003T", name: "E-Commerce", l: 3, t: 1, p: 0, credits: 4 },
    { code: "BCA6004T", name: "Internet of Things", l: 3, t: 1, p: 0, credits: 4 },
    { code: "BCA6005T", name: "Introduction to Blockchain", l: 3, t: 1, p: 0, credits: 4 },
    { code: "BCA6006T", name: "Natural Language Processing", l: 3, t: 1, p: 0, credits: 4 },
    { code: "BCA6007T", name: "Computer Vision", l: 3, t: 1, p: 0, credits: 4 },
    { code: "BCA6008T", name: "Introduction to Quantum Computing", l: 3, t: 1, p: 0, credits: 4 },
  ];

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 md:px-6">

     {/* HERO */}
              <section className="relative overflow-hidden flex justify-center items-center rounded-3xl mb-10">
                           <Image  
                             src='/BCA-syllabus.png'  
                             alt="B.Tech 2nd Year Syllabus"
                             width={1200}
                             height={500}
                             priority
                             draggable={false}
                             loading="eager" 
                             className="border rounded-2xl" 
                           />
                         </section>

      {/* MAIN CONTENT GRID */}
      <div className="grid lg:grid-cols-[280px_1fr] gap-10">

        {/* TOC SIDEBAR */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-3xl border bg-amber-900/10 border-amber-900 dark:border-amber-200 p-5">
            <h2 className="font-bold text-lg mb-5">
              Table of Contents
            </h2>
            <nav className="space-y-3 text-sm underline text-blue-600">
              <a href="#download" className="block hover:text-blue-500">
                Complete Syllabus PDF
              </a>
              <a href="#sem1" className="block hover:text-blue-500">Semester 1 Subjects</a>
              <a href="#sem2" className="block hover:text-blue-500">Semester 2 Subjects</a>
              <a href="#sem3" className="block hover:text-blue-500">Semester 3 Subjects</a>
              <a href="#sem4" className="block hover:text-blue-500">Semester 4 Subjects</a>
              <a href="#sem5" className="block hover:text-blue-500">Semester 5 Subjects</a>
              <a href="#sem6" className="block hover:text-blue-500">Semester 6 Subjects</a>
            </nav>
          </div>
        </aside>

        {/* CONTENT */}
        <div className="space-y-12 min-w-0">

          {/* SINGLE MASTER PDF SECTION */}
          <section id="download" className="scroll-mt-28">
            <h2 className="text-3xl font-bold mb-6">
              Download Complete Syllabus
            </h2>
            <div className="rounded-2xl border border-amber-900 dark:border-amber-200 p-6 bg-amber-600/10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="font-bold text-xl text-zinc-900 dark:text-zinc-100 mb-2">
                  BCA 1st to 3rd Year (All Semesters)
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Official Chhatrapati Shahu Ji Maharaj (CSJM) University, Kanpur Master Syllabus PDF containing general course structure, evaluation schemes, and detailed topics.
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <PdfPreview driveId="13QPF1Yxtme5G_n46elhsgxVppx42oTaO" />
                <a
                  href="https://drive.google.com/file/d/13QPF1Yxtme5G_n46elhsgxVppx42oTaO/view?usp=drive_link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl bg-blue-600 px-6 py-3 text-white font-medium hover:bg-blue-700 transition-colors shadow-sm"
                >
                  Download PDF
                </a>
              </div>
            </div>
          </section>

          {/* SEMESTER TABLES */}
          <section className="space-y-10">
            <h2 className="text-3xl font-bold border-b pb-3 border-zinc-200 dark:border-zinc-800">
              Semester-wise Course Structure
            </h2>

            {/* SEMESTER 1 */}
            <div id="sem1" className="scroll-mt-28">
              <h3 className="text-xl font-bold mb-4 text-blue-600 dark:text-blue-400">
                1st Year | Semester I
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-zinc-300 dark:border-zinc-700 text-sm">
                  <thead>
                    <tr className="bg-zinc-100 dark:bg-zinc-800/50">
                      <th className="border border-zinc-300 dark:border-zinc-700 p-3 text-left w-16">S. No.</th>
                      <th className="border border-zinc-300 dark:border-zinc-700 p-3 text-left w-32">Course Code</th>
                      <th className="border border-zinc-300 dark:border-zinc-700 p-3 text-left">Course Name</th>
                      <th className="border border-zinc-300 dark:border-zinc-700 p-3 text-center w-12">L</th>
                      <th className="border border-zinc-300 dark:border-zinc-700 p-3 text-center w-12">T</th>
                      <th className="border border-zinc-300 dark:border-zinc-700 p-3 text-center w-12">P</th>
                      <th className="border border-zinc-300 dark:border-zinc-700 p-3 text-center w-20">Credits</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sem1.map((item, index) => (
                      <tr key={item.code} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50">
                        <td className="border border-zinc-300 dark:border-zinc-700 p-3 text-center">{index + 1}</td>
                        <td className="border border-zinc-300 dark:border-zinc-700 p-3 font-mono">{item.code}</td>
                        <td className="border border-zinc-300 dark:border-zinc-700 p-3">{item.name}</td>
                        <td className="border border-zinc-300 dark:border-zinc-700 p-3 text-center">{item.l}</td>
                        <td className="border border-zinc-300 dark:border-zinc-700 p-3 text-center">{item.t}</td>
                        <td className="border border-zinc-300 dark:border-zinc-700 p-3 text-center">{item.p}</td>
                        <td className="border border-zinc-300 dark:border-zinc-700 p-3 text-center font-semibold">{item.credits}</td>
                      </tr>
                    ))}
                    <tr className="bg-zinc-50 dark:bg-zinc-800/20 font-bold">
                      <td colSpan="6" className="border border-zinc-300 dark:border-zinc-700 p-3 text-right">Total Credits:</td>
                      <td className="border border-zinc-300 dark:border-zinc-700 p-3 text-center">20</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* SEMESTER 2 */}
            <div id="sem2" className="scroll-mt-28">
              <h3 className="text-xl font-bold mb-4 text-blue-600 dark:text-blue-400">
                1st Year | Semester II
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-zinc-300 dark:border-zinc-700 text-sm">
                  <thead>
                    <tr className="bg-zinc-100 dark:bg-zinc-800/50">
                      <th className="border border-zinc-300 dark:border-zinc-700 p-3 text-left w-16">S. No.</th>
                      <th className="border border-zinc-300 dark:border-zinc-700 p-3 text-left w-32">Course Code</th>
                      <th className="border border-zinc-300 dark:border-zinc-700 p-3 text-left">Course Name</th>
                      <th className="border border-zinc-300 dark:border-zinc-700 p-3 text-center w-12">L</th>
                      <th className="border border-zinc-300 dark:border-zinc-700 p-3 text-center w-12">T</th>
                      <th className="border border-zinc-300 dark:border-zinc-700 p-3 text-center w-12">P</th>
                      <th className="border border-zinc-300 dark:border-zinc-700 p-3 text-center w-20">Credits</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sem2.map((item, index) => (
                      <tr key={item.code} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50">
                        <td className="border border-zinc-300 dark:border-zinc-700 p-3 text-center">{index + 1}</td>
                        <td className="border border-zinc-300 dark:border-zinc-700 p-3 font-mono">{item.code}</td>
                        <td className="border border-zinc-300 dark:border-zinc-700 p-3">{item.name}</td>
                        <td className="border border-zinc-300 dark:border-zinc-700 p-3 text-center">{item.l}</td>
                        <td className="border border-zinc-300 dark:border-zinc-700 p-3 text-center">{item.t}</td>
                        <td className="border border-zinc-300 dark:border-zinc-700 p-3 text-center">{item.p}</td>
                        <td className="border border-zinc-300 dark:border-zinc-700 p-3 text-center font-semibold">{item.credits}</td>
                      </tr>
                    ))}
                    <tr className="bg-zinc-50 dark:bg-zinc-800/20 font-bold">
                      <td colSpan="6" className="border border-zinc-300 dark:border-zinc-700 p-3 text-right">Total Credits:</td>
                      <td className="border border-zinc-300 dark:border-zinc-700 p-3 text-center">20</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* SEMESTER 3 */}
            <div id="sem3" className="scroll-mt-28">
              <h3 className="text-xl font-bold mb-4 text-blue-600 dark:text-blue-400">
                2nd Year | Semester III
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-zinc-300 dark:border-zinc-700 text-sm">
                  <thead>
                    <tr className="bg-zinc-100 dark:bg-zinc-800/50">
                      <th className="border border-zinc-300 dark:border-zinc-700 p-3 text-left w-16">S. No.</th>
                      <th className="border border-zinc-300 dark:border-zinc-700 p-3 text-left w-32">Course Code</th>
                      <th className="border border-zinc-300 dark:border-zinc-700 p-3 text-left">Course Name</th>
                      <th className="border border-zinc-300 dark:border-zinc-700 p-3 text-center w-12">L</th>
                      <th className="border border-zinc-300 dark:border-zinc-700 p-3 text-center w-12">T</th>
                      <th className="border border-zinc-300 dark:border-zinc-700 p-3 text-center w-12">P</th>
                      <th className="border border-zinc-300 dark:border-zinc-700 p-3 text-center w-20">Credits</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sem3.map((item, index) => (
                      <tr key={item.code} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50">
                        <td className="border border-zinc-300 dark:border-zinc-700 p-3 text-center">{index + 1}</td>
                        <td className="border border-zinc-300 dark:border-zinc-700 p-3 font-mono">{item.code}</td>
                        <td className="border border-zinc-300 dark:border-zinc-700 p-3">{item.name}</td>
                        <td className="border border-zinc-300 dark:border-zinc-700 p-3 text-center">{item.l}</td>
                        <td className="border border-zinc-300 dark:border-zinc-700 p-3 text-center">{item.t}</td>
                        <td className="border border-zinc-300 dark:border-zinc-700 p-3 text-center">{item.p}</td>
                        <td className="border border-zinc-300 dark:border-zinc-700 p-3 text-center font-semibold">{item.credits}</td>
                      </tr>
                    ))}
                    <tr className="bg-zinc-50 dark:bg-zinc-800/20 font-bold">
                      <td colSpan="6" className="border border-zinc-300 dark:border-zinc-700 p-3 text-right">Total Credits:</td>
                      <td className="border border-zinc-300 dark:border-zinc-700 p-3 text-center">20</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* SEMESTER 4 */}
            <div id="sem4" className="scroll-mt-28">
              <h3 className="text-xl font-bold mb-4 text-blue-600 dark:text-blue-400">
                2nd Year | Semester IV
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-zinc-300 dark:border-zinc-700 text-sm">
                  <thead>
                    <tr className="bg-zinc-100 dark:bg-zinc-800/50">
                      <th className="border border-zinc-300 dark:border-zinc-700 p-3 text-left w-16">S. No.</th>
                      <th className="border border-zinc-300 dark:border-zinc-700 p-3 text-left w-32">Course Code</th>
                      <th className="border border-zinc-300 dark:border-zinc-700 p-3 text-left">Course Name</th>
                      <th className="border border-zinc-300 dark:border-zinc-700 p-3 text-center w-12">L</th>
                      <th className="border border-zinc-300 dark:border-zinc-700 p-3 text-center w-12">T</th>
                      <th className="border border-zinc-300 dark:border-zinc-700 p-3 text-center w-12">P</th>
                      <th className="border border-zinc-300 dark:border-zinc-700 p-3 text-center w-20">Credits</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sem4.map((item, index) => (
                      <tr key={item.code} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50">
                        <td className="border border-zinc-300 dark:border-zinc-700 p-3 text-center">{index + 1}</td>
                        <td className="border border-zinc-300 dark:border-zinc-700 p-3 font-mono">{item.code}</td>
                        <td className="border border-zinc-300 dark:border-zinc-700 p-3">{item.name}</td>
                        <td className="border border-zinc-300 dark:border-zinc-700 p-3 text-center">{item.l}</td>
                        <td className="border border-zinc-300 dark:border-zinc-700 p-3 text-center">{item.t}</td>
                        <td className="border border-zinc-300 dark:border-zinc-700 p-3 text-center">{item.p}</td>
                        <td className="border border-zinc-300 dark:border-zinc-700 p-3 text-center font-semibold">{item.credits}</td>
                      </tr>
                    ))}
                    <tr className="bg-zinc-50 dark:bg-zinc-800/20 font-bold">
                      <td colSpan="6" className="border border-zinc-300 dark:border-zinc-700 p-3 text-right">Total Credits:</td>
                      <td className="border border-zinc-300 dark:border-zinc-700 p-3 text-center">20</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* SEMESTER 5 */}
            <div id="sem5" className="scroll-mt-28">
              <h3 className="text-xl font-bold mb-4 text-blue-600 dark:text-blue-400">
                3rd Year | Semester V
              </h3>
              <div className="overflow-x-auto mb-6">
                <table className="w-full border-collapse border border-zinc-300 dark:border-zinc-700 text-sm">
                  <thead>
                    <tr className="bg-zinc-100 dark:bg-zinc-800/50">
                      <th className="border border-zinc-300 dark:border-zinc-700 p-3 text-left w-16">S. No.</th>
                      <th className="border border-zinc-300 dark:border-zinc-700 p-3 text-left w-32">Course Code</th>
                      <th className="border border-zinc-300 dark:border-zinc-700 p-3 text-left">Course Name</th>
                      <th className="border border-zinc-300 dark:border-zinc-700 p-3 text-center w-12">L</th>
                      <th className="border border-zinc-300 dark:border-zinc-700 p-3 text-center w-12">T</th>
                      <th className="border border-zinc-300 dark:border-zinc-700 p-3 text-center w-12">P</th>
                      <th className="border border-zinc-300 dark:border-zinc-700 p-3 text-center w-20">Credits</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sem5.map((item, index) => (
                      <tr key={index} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50">
                        <td className="border border-zinc-300 dark:border-zinc-700 p-3 text-center">{index + 1}</td>
                        <td className="border border-zinc-300 dark:border-zinc-700 p-3 font-mono">{item.code}</td>
                        <td className="border border-zinc-300 dark:border-zinc-700 p-3 font-medium">{item.name}</td>
                        <td className="border border-zinc-300 dark:border-zinc-700 p-3 text-center">{item.l}</td>
                        <td className="border border-zinc-300 dark:border-zinc-700 p-3 text-center">{item.t}</td>
                        <td className="border border-zinc-300 dark:border-zinc-700 p-3 text-center">{item.p}</td>
                        <td className="border border-zinc-300 dark:border-zinc-700 p-3 text-center font-semibold">{item.credits}</td>
                      </tr>
                    ))}
                    <tr className="bg-zinc-50 dark:bg-zinc-800/20 font-bold">
                      <td colSpan="6" className="border border-zinc-300 dark:border-zinc-700 p-3 text-right">Total Credits:</td>
                      <td className="border border-zinc-300 dark:border-zinc-700 p-3 text-center">25</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              {/* Semester 5 Electives List */}
              <div className="bg-amber-600/5 border border-amber-900/30 rounded-xl p-5">
                <h4 className="font-bold text-sm text-amber-900 dark:text-amber-200 mb-3 uppercase tracking-wide">
                  Semester V | Elective - I & II Options
                </h4>
                <div className="grid sm:grid-cols-2 gap-3 text-sm">
                  {sem5Electives.map((elective) => (
                    <div key={elective.code} className="flex gap-2">
                      <span className="font-mono text-zinc-500 min-w-[70px]">{elective.code}</span>
                      <span className="text-zinc-800 dark:text-zinc-200">{elective.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* SEMESTER 6 */}
            <div id="sem6" className="scroll-mt-28">
              <h3 className="text-xl font-bold mb-4 text-blue-600 dark:text-blue-400">
                3rd Year | Semester VI
              </h3>
              <div className="overflow-x-auto mb-6">
                <table className="w-full border-collapse border border-zinc-300 dark:border-zinc-700 text-sm">
                  <thead>
                    <tr className="bg-zinc-100 dark:bg-zinc-800/50">
                      <th className="border border-zinc-300 dark:border-zinc-700 p-3 text-left w-16">S. No.</th>
                      <th className="border border-zinc-300 dark:border-zinc-700 p-3 text-left w-32">Course Code</th>
                      <th className="border border-zinc-300 dark:border-zinc-700 p-3 text-left">Course Name</th>
                      <th className="border border-zinc-300 dark:border-zinc-700 p-3 text-center w-12">L</th>
                      <th className="border border-zinc-300 dark:border-zinc-700 p-3 text-center w-12">T</th>
                      <th className="border border-zinc-300 dark:border-zinc-700 p-3 text-center w-12">P</th>
                      <th className="border border-zinc-300 dark:border-zinc-700 p-3 text-center w-20">Credits</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sem6.map((item, index) => (
                      <tr key={index} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50">
                        <td className="border border-zinc-300 dark:border-zinc-700 p-3 text-center">{index + 1}</td>
                        <td className="border border-zinc-300 dark:border-zinc-700 p-3 font-mono">{item.code}</td>
                        <td className="border border-zinc-300 dark:border-zinc-700 p-3 font-medium">{item.name}</td>
                        <td className="border border-zinc-300 dark:border-zinc-700 p-3 text-center">{item.l}</td>
                        <td className="border border-zinc-300 dark:border-zinc-700 p-3 text-center">{item.t}</td>
                        <td className="border border-zinc-300 dark:border-zinc-700 p-3 text-center">{item.p}</td>
                        <td className="border border-zinc-300 dark:border-zinc-700 p-3 text-center font-semibold">{item.credits}</td>
                      </tr>
                    ))}
                    <tr className="bg-zinc-50 dark:bg-zinc-800/20 font-bold">
                      <td colSpan="6" className="border border-zinc-300 dark:border-zinc-700 p-3 text-right">Total Credits:</td>
                      <td className="border border-zinc-300 dark:border-zinc-700 p-3 text-center">25</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Semester 6 Electives List */}
              <div className="bg-amber-600/5 border border-amber-900/30 rounded-xl p-5">
                <h4 className="font-bold text-sm text-amber-900 dark:text-amber-200 mb-3 uppercase tracking-wide">
                  Semester VI | Elective - III & IV Options
                </h4>
                <div className="grid sm:grid-cols-2 gap-3 text-sm">
                  {sem6Electives.map((elective) => (
                    <div key={elective.code} className="flex gap-2">
                      <span className="font-mono text-zinc-500 min-w-[70px]">{elective.code}</span>
                      <span className="text-zinc-800 dark:text-zinc-200">{elective.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </section>
        </div>
      </div>
    </main>
  );
}