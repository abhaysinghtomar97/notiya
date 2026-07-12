import PdfPreview from "@/components/pdfPreview";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "PSIT (Autonomous) B.Tech 2nd Year Syllabus PDF (2026) | All Branches",
  description: "Download PSIT (Autonomous) B.Tech 2nd Year Syllabus PDF. Recognized under UGC Act, 1956. Covering core subjects and syllabus details for CSE, IT, CS-AI, CS-AIML, CS-DS, and EC branches.",
};

export default function page() {
  // Modified to list branches for download instead of individual subjects
  const psitBranches = [
    { 
      id: "ece-branch", 
      name: "ECE - B.Tech 2nd Year", 
      description: "Electronics and Communication Engineering (Sem III & IV)",
      driveId: "https://drive.google.com/file/d/12UiEvl9Uf814hjrnvXGWJgsQrnIpmno-/preview" 
    },
    { 
      id: "cse-branch", 
      name: "[ CSE, IT, CS-AI, CS-AIML, CS-DS ] - B.Tech 2nd Year", 
      description: "Computer Science and Engineering (Sem III & IV)",
      driveId: "https://drive.google.com/file/d/1vQDlHQ2lbKkqSp9xmKzxSZBxFD9UGywz/preview" 
    },
  ];

  // Subject Data Extracted from Images
  const eceSem3 = [
    { code: "OE305 / BS303", name: "Sensor & Instrumentation / Math IV", type: "T" },
    { code: "VA301 / BS301", name: "Universal Human Value and Professional Ethics / Technical Communication", type: "T" },
    { code: "EC301", name: "Analog Circuits-I", type: "T" },
    { code: "EC302", name: "Signals and Systems", type: "T" },
    { code: "EC303", name: "Network Analysis and Synthesis", type: "T" },
    { code: "EC351", name: "Analog Circuits-I Lab", type: "P" },
    { code: "EC352", name: "Signal and System Lab", type: "P" },
    { code: "EC353", name: "Network Analysis and Synthesis Lab", type: "P" },
    { code: "VA302 / VA303", name: "Cyber Security / Python Programming", type: "T" },
    { code: "VE351", name: "Internship Assessment / Mini Project", type: "P" },
  ];

  const eceSem4 = [
    { code: "BS-403 / OE-405", name: "Math IV / Sensors & Instrumentation", type: "T" },
    { code: "BS401 / VA401", name: "Technical Communication / Universal Human Value and Professional Ethics", type: "T" },
    { code: "EC401", name: "Analog Circuits-II", type: "T" },
    { code: "EC402", name: "Analog Communication", type: "T" },
    { code: "EC403", name: "Digital System Design using HDL (Verilog/VHDL)", type: "T" },
    { code: "EC451", name: "Analog Circuits-II Lab", type: "P" },
    { code: "EC452", name: "Analog Communication Lab", type: "P" },
    { code: "EC453", name: "Digital System Design using HDL Lab", type: "P" },
    { code: "VA402 / VA403", name: "Cyber Security / Python Programming", type: "T" },
    { code: "VE451 / VE452", name: "Sports and Yoga-II / NSS-II", type: "P" },
  ];

  const cseSem3 = [
    { code: "OE3XX / BS303", name: "Science Based Open Elective / Statistics & Linear Programming Problems", type: "T" },
    { code: "VA301 / BS301", name: "Universal Human Value and professional Ethics / Technical Communication", type: "T" },
    { code: "CS301", name: "Theory of Automata and Formal Languages", type: "T" },
    { code: "CS302 / CS303", name: "Computer Organization and Architecture / Operating System", type: "T" },
    { code: "CS304", name: "Object Oriented Programming with Java", type: "T" },
    { code: "CS351", name: "Web Designing Lab", type: "P" },
    { code: "CS352 / CS353", name: "Computer Organization and Architecture Lab / Operating System Lab", type: "P" },
    { code: "CS354", name: "Object Oriented Programming with Java Lab", type: "P" },
    { code: "VA302 / VA303", name: "Cyber Security / Python Programming", type: "T" },
    { code: "VE351", name: "Internship Assessment / Mini Project*", type: "P" },
  ];

  const cseSem4 = [
    { code: "BS-403 / OE-4XX", name: "Statistics & Linear Programming Problems / Science Based Open Elective", type: "T" },
    { code: "BS401 / VA401", name: "Technical Communication / Universal Human Value and professional Ethics", type: "T" },
    { code: "CS401", name: "Design and Analysis of Algorithm", type: "T" },
    { code: "CS402 / CS403", name: "Computer Organization and Architecture / Operating System", type: "T" },
    { code: "CS404", name: "Database Management System", type: "T" },
    { code: "CS451", name: "Design and Analysis of Algorithm Lab", type: "P" },
    { code: "CS452 / CS453", name: "Computer Organization and Architecture Lab / Operating System Lab", type: "P" },
    { code: "CS 454", name: "Database Management System Lab", type: "P" },
    { code: "VA402 / VA403", name: "Cyber Security / Python Programming", type: "T" },
    { code: "VE451 / VE452", name: "Sports and Yoga-II / NSS-II", type: "P" },
  ];

  // Helper component for tables to keep code clean
  const SubjectTable = ({ subjects, title }) => (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-4 text-amber-700 dark:text-amber-500">{title}</h3>
      <div className="overflow-x-auto rounded-xl border border-gray-300 dark:border-gray-700 bg-card shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100 dark:bg-gray-800/50">
            <tr>
              <th className="border-b border-gray-300 dark:border-gray-700 px-5 py-4 font-semibold text-sm w-16">S.No.</th>
              <th className="border-b border-gray-300 dark:border-gray-700 px-5 py-4 font-semibold text-sm w-40">Code</th>
              <th className="border-b border-gray-300 dark:border-gray-700 px-5 py-4 font-semibold text-sm">Subject Name</th>
              <th className="border-b border-gray-300 dark:border-gray-700 px-5 py-4 font-semibold text-sm w-20 text-center">Type</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
            {subjects.map((subject, index) => (
              <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
                <td className="px-5 py-4 text-sm text-muted-foreground">{index + 1}</td>
                <td className="px-5 py-4 text-sm font-mono font-medium text-amber-600">{subject.code}</td>
                <td className="px-5 py-4 text-sm font-medium text-foreground">{subject.name}</td>
                <td className="px-5 py-4 text-sm text-center text-muted-foreground">{subject.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 md:px-6">
      
      {/* HERO */}
      <section className="relative overflow-hidden flex flex-col justify-center items-center rounded-3xl mb-10 text-center">
         <Image  
                src='/2nd-year-syllabus.png'  
                alt="B.Tech 2nd Year"
                width={1200}
                height={600}
                priority
                draggable={false}
                loading="eager" 
                className="border rounded-2xl" />

        <p className="mt-4 font-medium text-lg">PSIT (Autonomous) B.Tech 2nd Year Syllabus PDF (2026) | All Branches</p>
        <p className="text-zinc-500 mb-6 max-w-2xl mt-2">
          Recognized under Section 2(f) of the UGC Act, 1956 and approved by AICTE. 
          Access the official curriculum for the B.Tech Second Year Autonomous program.
        </p>
      </section>
      
      {/* PDF SECTION - Branches */}
      <section className="mb-12">
        <div className="rounded-3xl border border-black dark:border-zinc-800 overflow-hidden shadow-sm">
          <div className="bg-amber-600/10 px-5 py-4 font-semibold border-b border-amber-900/10 dark:border-amber-100/10">
            Available Downloads by Branch
          </div>
          
          <div className="p-5 space-y-4">
            {psitBranches.map((branch) => (
              <div 
                key={branch.id} 
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border bg-amber-600/5 hover:bg-amber-600/10 border-amber-900/20 dark:border-amber-200/20 p-5 transition-colors"
              >
                <div>
                  <h2 className="font-semibold text-lg text-foreground">
                    {branch.name}
                  </h2>
                  <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">
                    {branch.description}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <PdfPreview pdfUrl={branch.driveId} />
                  
                  <a
                    href={branch.driveId}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-center rounded-xl bg-blue-600 text-white border border-transparent px-4 py-2 text-sm font-medium hover:bg-blue-700 transition-colors"
                  >
                    Download PDF
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTENT GRID */}
      <div className="grid lg:grid-cols-[280px_1fr] gap-10">

        {/* TOC */}
        <aside className="hidden lg:block ">
          <div className="sticky top-24 rounded-3xl border bg-amber-900/5 border-amber-900/20 dark:border-amber-200/20 p-5">
            <h2 className="font-bold text-lg mb-5">Table of Contents</h2>
            <nav className="space-y-3 text-sm underline text-blue-600">
              <a href="#objectives" className="block hover:text-blue-500 transition-colors">Course Objectives</a>
              <a href="#ece-syllabus" className="block hover:text-blue-500 transition-colors">ECE Syllabus (Sem III & IV)</a>
              <a href="#cse-syllabus" className="block hover:text-blue-500 transition-colors">CSE & Allied Syllabus (Sem III & IV)</a>
              <a href="#why-it-matters" className="block hover:text-blue-500 transition-colors">Why This Syllabus Matters</a>
            </nav>
          </div>
        </aside>

        {/* CONTENT */}
        <div className="space-y-14">
          
          <section id="objectives" className="scroll-mt-28">
            <h2 className="text-3xl font-bold mb-5">Course Objectives</h2>
            <p className="leading-8 text-zinc-600 dark:text-zinc-400">
              The objective is to provide B.Tech 2nd-year students with core engineering knowledge, 
              focusing on hardware architectures, advanced computing algorithms, networking, databases, 
              and specialized circuit analysis, establishing a foundation for real-world technical challenges.
            </p>
          </section>

          {/* ECE Subjects Section */}
          <section id="ece-syllabus" className="scroll-mt-28">
            <h2 className="text-3xl font-bold mb-6 border-b pb-2">B.Tech (ECE) 2nd Year Syllabus</h2>
            <SubjectTable subjects={eceSem3} title="Semester - III" />
            <SubjectTable subjects={eceSem4} title="Semester - IV" />
          </section>

          {/* CSE Subjects Section */}
          <section id="cse-syllabus" className="scroll-mt-28">
            <h2 className="text-3xl font-bold mb-6 border-b pb-2">B.Tech (CSE/IT/AI/ML/DS) 2nd Year Syllabus</h2>
            <SubjectTable subjects={cseSem3} title="Semester - III" />
            <SubjectTable subjects={cseSem4} title="Semester - IV" />
          </section>

          {/* WHY IT MATTERS SECTION */}
          <section id="why-it-matters" className="scroll-mt-28">
            <h2 className="text-3xl font-bold mb-5">Why This Autonomous Syllabus Matters</h2>
            
            <div className="rounded-[24px] border border-amber-900/20 bg-gradient-to-br from-amber-50 to-orange-50 p-6 shadow-sm dark:border-amber-200/10 dark:from-amber-900/10 dark:to-orange-950/20 md:p-8">
              <p className="leading-relaxed text-foreground md:text-lg">
                With PSIT's transition to an <strong className="text-amber-600">autonomous status</strong>, the curriculum has been significantly upgraded from the traditional university structure. This modified syllabus bridges the gap between academia and modern industry demands.
              </p>
              
              <ul className="mt-6 space-y-4 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-200/50 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300 text-xs font-bold">1</span>
                  <p><strong>Industry-Aligned Content:</strong> Outdated topics have been replaced with modern engineering practices.</p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-200/50 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300 text-xs font-bold">2</span>
                  <p><strong>Practical Focus:</strong> Heavy emphasis on project-based learning, practical labs, and real-world applications.</p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-200/50 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300 text-xs font-bold">3</span>
                  <p><strong>Enhanced Placement Readiness:</strong> Core subjects tailored to improve technical interview outcomes.</p>
                </li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}