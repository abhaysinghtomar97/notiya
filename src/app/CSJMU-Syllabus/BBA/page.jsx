import PdfPreview from "@/components/pdfPreview";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
    title:
        "CSJMU BBA Syllabus PDF Download (1st to 3rd Year) | Complete Course Structure",
    description:
        "Download the complete CSJM University (Kanpur) BBA Syllabus PDF. Explore semester-wise subjects, course codes, electives, and credit distributions (Total 130 Credits) for all 3 years.",
};

export default function Page() {
    const sem1 = [
        { code: "F010101TN", name: "Principles of Management", credits: 4, type: "Core Course - I" },
        { code: "F010102TN", name: "Basic Accounting", credits: 4, type: "Core Course - II" },
        { code: "F010103TN", name: "Business Economics", credits: 4, type: "Core Course - III" },
        { code: "F010104TN", name: "Business Statistics", credits: 3, type: "Minor" },
        { code: "VOC166", name: "Computer Applications", credits: 3, type: "Skill Enhancement course (SEC)" },
        { code: "Z011101", name: "First Aid and Basic Health", credits: 2, type: "Co-curricular Course" },
    ];

    const sem2 = [
        { code: "F010201TN", name: "Organizational Behaviour", credits: 4, type: "Core Course - I" },
        { code: "F010202TN", name: "Business law", credits: 4, type: "Core Course - II" },
        { code: "F010203TN", name: "Management & Cost Accounting", credits: 4, type: "Core Course - III" },
        { code: "F010204TN", name: "Business Mathematics", credits: 3, type: "Minor Course" },
        { code: "VOC168", name: "Business Communication", credits: 3, type: "Skill Enhancement course (SEC)" },
        { code: "Z021201", name: "Human Values and Environment Studies", credits: 2, type: "Co-curricular Course" },
    ];

    const sem3 = [
        { code: "F010301TN", name: "Business Finance", credits: 4, type: "Core Course - I" },
        { code: "F010302TN", name: "Human Resource Management", credits: 4, type: "Core Course - II" },
        { code: "F010303TN", name: "Marketing", credits: 4, type: "Core Course - III" },
        { code: "F010304TN", name: "Business Environment, Business Ethics & Governance", credits: 3, type: "Minor Course" },
        { code: "VOC169", name: "Office Management and Secretarial Practices", credits: 3, type: "Skill Enhancement course (SEC)" },
        { code: "Z031301", name: "Physical Education and Yoga", credits: 2, type: "Co-curricular Course" },
    ];

    const sem4 = [
        { code: "F010401TN", name: "Supply Chain Management", credits: 4, type: "Core Course - I" },
        { code: "F010402TN", name: "Production Management", credits: 4, type: "Core Course - II" },
        { code: "F010403TN", name: "International Trade", credits: 4, type: "Core Course - III" },
        { code: "F010404TN", name: "Research Methodology", credits: 3, type: "Minor Course" },
        { code: "F010405RN", name: "Internship Report (3-4 Weeks)", credits: 3, type: "Project" },
        { code: "Z041402", name: "Indian Language", credits: 2, type: "Co-curricular Course" },
    ];

    const sem5 = [
        { code: "F010501TN", name: "Project Management & Entreprenurship", credits: 5, type: "Core Course - I" },
        { code: "F010502TN", name: "Business Policy & Strategic Management", credits: 5, type: "Core Course - II" },
        { code: "F010503TN", name: "Elective Paper - 1 (Refer Block 1)", credits: 5, type: "Elective Paper - 1" },
        { code: "F010504TN", name: "Elective Paper - 2 (Refer Block 1)", credits: 5, type: "Elective Paper - 2" },
        { code: "F010505RN", name: "Research Project on topics in the concerned elective", credits: 5, type: "Research Project" },
    ];

    const block1 = [
        { area: "Marketing", course: "Advertising Management" },
        { area: "Finance", course: "Income Tax and Goods & Services Tax (GST)" },
        { area: "Human Resource Management", course: "Human Resource Development" },
    ];

    const sem6 = [
        { code: "F010601TN", name: "AI in Business", credits: 5, type: "Core Course - I" },
        { code: "F010602TN", name: "Cross Cultural Management & Global Buisness Ethics", credits: 5, type: "Core Course - II" },
        { code: "F010603TN", name: "Elective Paper - 3 (Refer Block 2)", credits: 5, type: "Elective Paper - 3" },
        { code: "F010604TN", name: "Elective Paper - 4 (Refer Block 2)", credits: 5, type: "Elective Paper - 4" },
        { code: "F010605RN", name: "Research Project on topics in the concerned elective", credits: 5, type: "Research Project" },
    ];

    const block2 = [
        { area: "Marketing", course: "Consumer Behaviour" },
        { area: "Finance", course: "Investment Analysis and Portfolio Management" },
        { area: "Human Resource Management", course: "Industrial Relations and Labour Legislation" },
    ];

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 md:px-6 w-full overflow-hidden">

        {/* HERO */}
        <section className="relative w-full flex justify-center items-center rounded-3xl mb-10 overflow-hidden">
            <Image
                src='/BBA-syllabus.png'
                alt="B.Tech 2nd Year Syllabus"
                width={1200}
                height={500}
                priority
                draggable={false}
                loading="eager"
                className="border rounded-2xl w-full h-auto object-cover"
            />
        </section>

        {/* MAIN CONTENT GRID */}
        <div className="grid lg:grid-cols-[280px_1fr] gap-10 w-full">

            {/* TOC SIDEBAR */}
            <aside className="hidden lg:block w-full">
                <div className="sticky top-24 rounded-3xl border bg-amber-900/10 border-amber-900 dark:border-amber-200 p-5">
                    <h2 className="font-bold text-lg mb-5">
                        Table of Contents
                    </h2>
                    <nav className="space-y-3 text-sm underline text-blue-600">
                        <a href="#download" className="block hover:text-blue-500 truncate">Complete Syllabus PDF</a>
                        <a href="#sem1" className="block hover:text-blue-500 truncate">Semester 1 Subjects</a>
                        <a href="#sem2" className="block hover:text-blue-500 truncate">Semester 2 Subjects</a>
                        <a href="#sem3" className="block hover:text-blue-500 truncate">Semester 3 Subjects</a>
                        <a href="#sem4" className="block hover:text-blue-500 truncate">Semester 4 Subjects</a>
                        <a href="#sem5" className="block hover:text-blue-500 truncate">Semester 5 Subjects</a>
                        <a href="#sem6" className="block hover:text-blue-500 truncate">Semester 6 Subjects</a>
                    </nav>
                </div>
            </aside>

            {/* CONTENT */}
            <div className="space-y-12 w-full max-w-full min-w-0">

                {/* SINGLE MASTER PDF SECTION */}
                <section id="download" className="scroll-mt-28 w-full">
                    <h2 className="text-2xl md:text-3xl font-bold mb-6">
                        Download Complete Syllabus
                    </h2>
                    <div className="rounded-2xl border border-amber-900 dark:border-amber-200 p-6 bg-amber-600/10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 w-full">
                        <div className="w-full">
                            <h3 className="font-bold text-xl text-zinc-900 dark:text-zinc-100 mb-2">
                                BBA 1st to 3rd Year (All Semesters)
                            </h3>
                            <p className="text-zinc-600 dark:text-zinc-400 text-sm md:text-base">
                                Official Chhatrapati Shahu Ji Maharaj (CSJM) University, Kanpur Master Syllabus PDF containing general course structure, evaluation schemes, and detailed topics.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full lg:w-auto">
                            <div className="w-full sm:w-auto">
                                <PdfPreview driveId="13QPF1Yxtme5G_n46elhsgxVppx42oTaO" />
                            </div>
                            <a
                                href="https://drive.google.com/file/d/13QPF1Yxtme5G_n46elhsgxVppx42oTaO/view?usp=drive_link"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full sm:w-auto text-center rounded-xl bg-blue-600 px-6 py-3 text-white font-medium hover:bg-blue-700 transition-colors shadow-sm block whitespace-nowrap"
                            >
                                Download PDF
                            </a>
                        </div>
                    </div>
                </section>

                {/* SEMESTER TABLES */}
                <section className="space-y-10 w-full">
                    <h2 className="text-2xl md:text-3xl font-bold border-b pb-3 border-zinc-200 dark:border-zinc-800">
                        Semester-wise Course Structure
                    </h2>

                    {/* SEMESTER 1 */}
                    <div id="sem1" className="scroll-mt-28 w-full">
                        <h3 className="text-xl font-bold mb-4 text-blue-600 dark:text-blue-400">
                            1st Year | Semester I
                        </h3>
                        <div className="overflow-x-auto w-full max-w-full pb-2">
                            <table className="w-full min-w-[600px] border-collapse border border-zinc-300 dark:border-zinc-700 text-sm">
                                <thead>
                                    <tr className="bg-zinc-100 dark:bg-zinc-800/50">
                                        <th className="border border-zinc-300 dark:border-zinc-700 p-3 text-left w-16">S. No.</th>
                                        <th className="border border-zinc-300 dark:border-zinc-700 p-3 text-left w-32">Course Code</th>
                                        <th className="border border-zinc-300 dark:border-zinc-700 p-3 text-left">Course Name</th>
                                        <th className="border border-zinc-300 dark:border-zinc-700 p-3 text-left">Type</th>
                                        <th className="border border-zinc-300 dark:border-zinc-700 p-3 text-center w-20">Credits</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sem1.map((item, index) => (
                                        <tr key={item.code} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50">
                                            <td className="border border-zinc-300 dark:border-zinc-700 p-3 text-center">{index + 1}</td>
                                            <td className="border border-zinc-300 dark:border-zinc-700 p-3 font-mono">{item.code}</td>
                                            <td className="border border-zinc-300 dark:border-zinc-700 p-3">{item.name}</td>
                                            <td className="border border-zinc-300 dark:border-zinc-700 p-3">{item.type}</td>
                                            <td className="border border-zinc-300 dark:border-zinc-700 p-3 text-center font-semibold">{item.credits}</td>
                                        </tr>
                                    ))}
                                    <tr className="bg-zinc-50 dark:bg-zinc-800/20 font-bold">
                                        <td colSpan="4" className="border border-zinc-300 dark:border-zinc-700 p-3 text-right">Total Credits:</td>
                                        <td className="border border-zinc-300 dark:border-zinc-700 p-3 text-center">20</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* SEMESTER 2 */}
                    <div id="sem2" className="scroll-mt-28 w-full">
                        <h3 className="text-xl font-bold mb-4 text-blue-600 dark:text-blue-400">
                            1st Year | Semester II
                        </h3>
                        <div className="overflow-x-auto w-full max-w-full pb-2">
                            <table className="w-full min-w-[600px] border-collapse border border-zinc-300 dark:border-zinc-700 text-sm">
                                <thead>
                                    <tr className="bg-zinc-100 dark:bg-zinc-800/50">
                                        <th className="border border-zinc-300 dark:border-zinc-700 p-3 text-left w-16">S. No.</th>
                                        <th className="border border-zinc-300 dark:border-zinc-700 p-3 text-left w-32">Course Code</th>
                                        <th className="border border-zinc-300 dark:border-zinc-700 p-3 text-left">Course Name</th>
                                        <th className="border border-zinc-300 dark:border-zinc-700 p-3 text-left">Type</th>
                                        <th className="border border-zinc-300 dark:border-zinc-700 p-3 text-center w-20">Credits</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sem2.map((item, index) => (
                                        <tr key={item.code} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50">
                                            <td className="border border-zinc-300 dark:border-zinc-700 p-3 text-center">{index + 1}</td>
                                            <td className="border border-zinc-300 dark:border-zinc-700 p-3 font-mono">{item.code}</td>
                                            <td className="border border-zinc-300 dark:border-zinc-700 p-3">{item.name}</td>
                                            <td className="border border-zinc-300 dark:border-zinc-700 p-3">{item.type}</td>
                                            <td className="border border-zinc-300 dark:border-zinc-700 p-3 text-center font-semibold">{item.credits}</td>
                                        </tr>
                                    ))}
                                    <tr className="bg-zinc-50 dark:bg-zinc-800/20 font-bold">
                                        <td colSpan="4" className="border border-zinc-300 dark:border-zinc-700 p-3 text-right">Total Credits:</td>
                                        <td className="border border-zinc-300 dark:border-zinc-700 p-3 text-center">20</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* SEMESTER 3 */}
                    <div id="sem3" className="scroll-mt-28 w-full">
                        <h3 className="text-xl font-bold mb-4 text-blue-600 dark:text-blue-400">
                            2nd Year | Semester III
                        </h3>
                        <div className="overflow-x-auto w-full max-w-full pb-2">
                            <table className="w-full min-w-[600px] border-collapse border border-zinc-300 dark:border-zinc-700 text-sm">
                                <thead>
                                    <tr className="bg-zinc-100 dark:bg-zinc-800/50">
                                        <th className="border border-zinc-300 dark:border-zinc-700 p-3 text-left w-16">S. No.</th>
                                        <th className="border border-zinc-300 dark:border-zinc-700 p-3 text-left w-32">Course Code</th>
                                        <th className="border border-zinc-300 dark:border-zinc-700 p-3 text-left">Course Name</th>
                                        <th className="border border-zinc-300 dark:border-zinc-700 p-3 text-left">Type</th>
                                        <th className="border border-zinc-300 dark:border-zinc-700 p-3 text-center w-20">Credits</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sem3.map((item, index) => (
                                        <tr key={item.code} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50">
                                            <td className="border border-zinc-300 dark:border-zinc-700 p-3 text-center">{index + 1}</td>
                                            <td className="border border-zinc-300 dark:border-zinc-700 p-3 font-mono">{item.code}</td>
                                            <td className="border border-zinc-300 dark:border-zinc-700 p-3">{item.name}</td>
                                            <td className="border border-zinc-300 dark:border-zinc-700 p-3">{item.type}</td>
                                            <td className="border border-zinc-300 dark:border-zinc-700 p-3 text-center font-semibold">{item.credits}</td>
                                        </tr>
                                    ))}
                                    <tr className="bg-zinc-50 dark:bg-zinc-800/20 font-bold">
                                        <td colSpan="4" className="border border-zinc-300 dark:border-zinc-700 p-3 text-right">Total Credits:</td>
                                        <td className="border border-zinc-300 dark:border-zinc-700 p-3 text-center">20</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* SEMESTER 4 */}
                    <div id="sem4" className="scroll-mt-28 w-full">
                        <h3 className="text-xl font-bold mb-4 text-blue-600 dark:text-blue-400">
                            2nd Year | Semester IV
                        </h3>
                        <div className="overflow-x-auto w-full max-w-full pb-2">
                            <table className="w-full min-w-[600px] border-collapse border border-zinc-300 dark:border-zinc-700 text-sm">
                                <thead>
                                    <tr className="bg-zinc-100 dark:bg-zinc-800/50">
                                        <th className="border border-zinc-300 dark:border-zinc-700 p-3 text-left w-16">S. No.</th>
                                        <th className="border border-zinc-300 dark:border-zinc-700 p-3 text-left w-32">Course Code</th>
                                        <th className="border border-zinc-300 dark:border-zinc-700 p-3 text-left">Course Name</th>
                                        <th className="border border-zinc-300 dark:border-zinc-700 p-3 text-left">Type</th>
                                        <th className="border border-zinc-300 dark:border-zinc-700 p-3 text-center w-20">Credits</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sem4.map((item, index) => (
                                        <tr key={item.code} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50">
                                            <td className="border border-zinc-300 dark:border-zinc-700 p-3 text-center">{index + 1}</td>
                                            <td className="border border-zinc-300 dark:border-zinc-700 p-3 font-mono">{item.code}</td>
                                            <td className="border border-zinc-300 dark:border-zinc-700 p-3">{item.name}</td>
                                            <td className="border border-zinc-300 dark:border-zinc-700 p-3">{item.type}</td>
                                            <td className="border border-zinc-300 dark:border-zinc-700 p-3 text-center font-semibold">{item.credits}</td>
                                        </tr>
                                    ))}
                                    <tr className="bg-zinc-50 dark:bg-zinc-800/20 font-bold">
                                        <td colSpan="4" className="border border-zinc-300 dark:border-zinc-700 p-3 text-right">Total Credits:</td>
                                        <td className="border border-zinc-300 dark:border-zinc-700 p-3 text-center">20</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* SEMESTER 5 */}
                    <div id="sem5" className="scroll-mt-28 w-full">
                        <h3 className="text-xl font-bold mb-4 text-blue-600 dark:text-blue-400">
                            3rd Year | Semester V
                        </h3>
                        <div className="overflow-x-auto w-full max-w-full mb-6 pb-2">
                            <table className="w-full min-w-[600px] border-collapse border border-zinc-300 dark:border-zinc-700 text-sm">
                                <thead>
                                    <tr className="bg-zinc-100 dark:bg-zinc-800/50">
                                        <th className="border border-zinc-300 dark:border-zinc-700 p-3 text-left w-16">S. No.</th>
                                        <th className="border border-zinc-300 dark:border-zinc-700 p-3 text-left w-32">Course Code</th>
                                        <th className="border border-zinc-300 dark:border-zinc-700 p-3 text-left">Course Name</th>
                                        <th className="border border-zinc-300 dark:border-zinc-700 p-3 text-left">Type</th>
                                        <th className="border border-zinc-300 dark:border-zinc-700 p-3 text-center w-20">Credits</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sem5.map((item, index) => (
                                        <tr key={index} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50">
                                            <td className="border border-zinc-300 dark:border-zinc-700 p-3 text-center">{index + 1}</td>
                                            <td className="border border-zinc-300 dark:border-zinc-700 p-3 font-mono">{item.code}</td>
                                            <td className="border border-zinc-300 dark:border-zinc-700 p-3 font-medium">{item.name}</td>
                                            <td className="border border-zinc-300 dark:border-zinc-700 p-3">{item.type}</td>
                                            <td className="border border-zinc-300 dark:border-zinc-700 p-3 text-center font-semibold">{item.credits}</td>
                                        </tr>
                                    ))}
                                    <tr className="bg-zinc-50 dark:bg-zinc-800/20 font-bold">
                                        <td colSpan="4" className="border border-zinc-300 dark:border-zinc-700 p-3 text-right">Total Credits:</td>
                                        <td className="border border-zinc-300 dark:border-zinc-700 p-3 text-center">25</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* Semester 5 Electives List */}
                        <div className="bg-amber-600/5 border border-amber-900/30 rounded-xl p-5 w-full">
                            <h4 className="font-bold text-sm text-amber-900 dark:text-amber-200 mb-3 uppercase tracking-wide">
                                Block 1 | Elective Options (Select Any Two)
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm w-full">
                                {block1.map((elective) => (
                                    <div key={elective.course} className="flex flex-col gap-1 p-3 border border-zinc-200 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 break-words w-full">
                                        <span className="font-mono text-zinc-500 text-xs font-semibold">{elective.area}</span>
                                        <span className="text-zinc-800 dark:text-zinc-200">{elective.course}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* SEMESTER 6 */}
                    <div id="sem6" className="scroll-mt-28 w-full">
                        <h3 className="text-xl font-bold mb-4 text-blue-600 dark:text-blue-400">
                            3rd Year | Semester VI
                        </h3>
                        <div className="overflow-x-auto w-full max-w-full mb-6 pb-2">
                            <table className="w-full min-w-[600px] border-collapse border border-zinc-300 dark:border-zinc-700 text-sm">
                                <thead>
                                    <tr className="bg-zinc-100 dark:bg-zinc-800/50">
                                        <th className="border border-zinc-300 dark:border-zinc-700 p-3 text-left w-16">S. No.</th>
                                        <th className="border border-zinc-300 dark:border-zinc-700 p-3 text-left w-32">Course Code</th>
                                        <th className="border border-zinc-300 dark:border-zinc-700 p-3 text-left">Course Name</th>
                                        <th className="border border-zinc-300 dark:border-zinc-700 p-3 text-left">Type</th>
                                        <th className="border border-zinc-300 dark:border-zinc-700 p-3 text-center w-20">Credits</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sem6.map((item, index) => (
                                        <tr key={index} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50">
                                            <td className="border border-zinc-300 dark:border-zinc-700 p-3 text-center">{index + 1}</td>
                                            <td className="border border-zinc-300 dark:border-zinc-700 p-3 font-mono">{item.code}</td>
                                            <td className="border border-zinc-300 dark:border-zinc-700 p-3 font-medium">{item.name}</td>
                                            <td className="border border-zinc-300 dark:border-zinc-700 p-3">{item.type}</td>
                                            <td className="border border-zinc-300 dark:border-zinc-700 p-3 text-center font-semibold">{item.credits}</td>
                                        </tr>
                                    ))}
                                    <tr className="bg-zinc-50 dark:bg-zinc-800/20 font-bold">
                                        <td colSpan="4" className="border border-zinc-300 dark:border-zinc-700 p-3 text-right">Total Credits:</td>
                                        <td className="border border-zinc-300 dark:border-zinc-700 p-3 text-center">25</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* Semester 6 Electives List */}
                        <div className="bg-amber-600/5 border border-amber-900/30 rounded-xl p-5 w-full">
                            <h4 className="font-bold text-sm text-amber-900 dark:text-amber-200 mb-3 uppercase tracking-wide">
                                Block 2 | Elective Options (Select Any Two)
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm w-full">
                                {block2.map((elective) => (
                                    <div key={elective.course} className="flex flex-col gap-1 p-3 border border-zinc-200 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 break-words w-full">
                                        <span className="font-mono text-zinc-500 text-xs font-semibold">{elective.area}</span>
                                        <span className="text-zinc-800 dark:text-zinc-200">{elective.course}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </section>
            </div>
        </div>
    </main>
);}