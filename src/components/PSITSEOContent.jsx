import React from 'react';
import { ChevronDown } from 'lucide-react';

// ---------------------------------------------------------
// PSIT 1ST YEAR SEO CONTENT
// ---------------------------------------------------------
export function PsitSeoContent1stYear() {
  return (
    <div className="mt-24 border-t border-border pt-16 pb-8 text-muted-foreground">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-6 text-3xl font-bold text-foreground">
          PSIT B.Tech 1st Year: Foundation and Common Curriculum
        </h2>
        <p className="mb-8 leading-relaxed">
          The first year of the B.Tech program at Pranveer Singh Institute of Technology (PSIT) lays the foundational groundwork for all engineering disciplines. During the 1st and 2nd semesters, students across all branches—whether Computer Science, Electronics, or Mechanical—study a shared curriculum designed to build strong analytical and scientific fundamentals.
        </p>

        {/* Informational Text */}
        <div className="mt-8 space-y-6">
          <h3 className="text-2xl font-bold text-foreground">Why 1st Year Notes and PYQs Matter</h3>
          <p className="leading-relaxed">
            Because the first-year syllabus is common, the competition and grading scale are campus-wide. Mastering foundational subjects like Engineering Mathematics, Physics, Chemistry, and Basic Electrical Engineering is critical. Utilizing organized notes and Previous Year Questions (PYQs) helps you understand the university's exam pattern, ensuring you secure a high SGPA right from the start, which is heavily weighed during final-year campus placements.
          </p>
        </div>

        {/* FAQs */}
        <div className="mt-16">
          <h2 className="mb-6 text-3xl font-bold text-foreground">Frequently Asked Questions (1st Year)</h2>
          <div className="space-y-4">
            
            <details className="group rounded-xl border border-border bg-card p-6 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between font-bold text-foreground">
                <span>Is the 1st year syllabus the same for all PSIT B.Tech branches?</span>
                <span className="transition duration-300 group-open:-rotate-180">
                  <ChevronDown size={20} />
                </span>
              </summary>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Yes, the first-year curriculum is generally common across all B.Tech branches. Students are typically divided into groups (e.g., Physics group and Chemistry group) and swap subjects in the second semester, ensuring everyone covers the exact same foundational syllabus by the end of the first year.
              </p>
            </details>

            <details className="group rounded-xl border border-border bg-card p-6 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between font-bold text-foreground">
                <span>When should I start studying from PYQs?</span>
                <span className="transition duration-300 group-open:-rotate-180">
                  <ChevronDown size={20} />
                </span>
              </summary>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                You should integrate Previous Year Questions (PYQs) into your study routine at least a month before your mid-semester and end-semester exams. They are the most reliable way to identify recurring topics and numerical patterns.
              </p>
            </details>

          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------
// PSIT 2ND YEAR SEO CONTENT
// ---------------------------------------------------------
export function PsitSeoContent2ndYear() {
  return (
    <div className="mt-24 border-t border-border pt-16 pb-8 text-muted-foreground">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-6 text-3xl font-bold text-foreground">
          PSIT B.Tech 2nd Year: Transitioning to Core Engineering
        </h2>
        <p className="mb-6 leading-relaxed">
          The second year (3rd and 4th semesters) of B.Tech at Pranveer Singh Institute of Technology (PSIT), Kanpur, marks the official transition into your specific branch's core engineering subjects[cite: 1]. This phase shifts away from the common first-year sciences and introduces rigorous, department-specific theoretical and practical coursework.
        </p>

        {/* Stream Lists */}
        <div className="grid gap-8 sm:grid-cols-2 mt-8">
          <div>
            <h3 className="mb-3 text-lg font-bold text-foreground">Computer Science & IT Streams</h3>
            <p className="mb-3 text-sm leading-relaxed">
              For branches including CSE, CS-AI, CS-AIML, CS-DS, and IT, the 2nd-year curriculum focuses heavily on software architecture and algorithms[cite: 1]. Core subjects include:
            </p>
            <ul className="mb-4 list-inside list-disc space-y-1 ml-2">
              <li>Theory of Automata and Formal Languages[cite: 1]</li>
              <li>Computer Organization and Architecture[cite: 1]</li>
              <li>Operating Systems & Object-Oriented Programming with Java[cite: 1]</li>
              <li>Design and Analysis of Algorithm[cite: 1]</li>
              <li>Database Management System[cite: 1]</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-lg font-bold text-foreground">Electronics & Comm. (ECE)</h3>
            <p className="mb-3 text-sm leading-relaxed">
              ECE students dive into foundational hardware, signals, and circuitry design[cite: 1]. The core curriculum includes:
            </p>
            <ul className="mb-4 list-inside list-disc space-y-1 ml-2">
              <li>Analog Circuits (I & II)[cite: 1]</li>
              <li>Signals and Systems[cite: 1]</li>
              <li>Network Analysis and Synthesis[cite: 1]</li>
              <li>Analog Communication[cite: 1]</li>
              <li>Digital System Design using HDL (Verilog/VHDL)[cite: 1]</li>
            </ul>
          </div>
        </div>

        {/* Informational Text */}
        <div className="mt-8 space-y-6">
          <h3 className="text-2xl font-bold text-foreground">Value-Added and Applied Mathematics</h3>
          <p className="leading-relaxed">
            Alongside core subjects, PSIT emphasizes industry-ready skills and ethics by incorporating value-added courses across all branches, such as Cyber Security, Python Programming, Technical Communication, and Universal Human Values[cite: 1]. Additionally, the mathematics curriculum is tailored to your stream: Computer, Electronics, Electrical, and Mechanical branches study Mathematics-IV, whereas Civil and Environmental Engineering study Mathematics-III, and Biotechnology/Agriculture branches take Mathematics-V[cite: 1].
          </p>
        </div>

        {/* FAQs */}
        <div className="mt-16">
          <h2 className="mb-6 text-3xl font-bold text-foreground">Frequently Asked Questions (2nd Year)</h2>
          <div className="space-y-4">
            
            <details className="group rounded-xl border border-border bg-card p-6 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between font-bold text-foreground">
                <span>Are there practical labs for the core subjects in the 2nd year?</span>
                <span className="transition duration-300 group-open:-rotate-180">
                  <ChevronDown size={20} />
                </span>
              </summary>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Yes, practical application is a major component of the 2nd-year evaluation scheme. For instance, CSE/IT students complete labs in Web Designing, Java Programming, Operating Systems, and DBMS, while ECE students have dedicated labs for Analog Circuits, Signals and Systems, and Digital System Design using HDL[cite: 1].
              </p>
            </details>

            <details className="group rounded-xl border border-border bg-card p-6 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between font-bold text-foreground">
                <span>Which programming languages are introduced in the 2nd year at PSIT?</span>
                <span className="transition duration-300 group-open:-rotate-180">
                  <ChevronDown size={20} />
                </span>
              </summary>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                During the 2nd year, students are formally introduced to Object-Oriented Programming using Java[cite: 1]. Additionally, Python Programming is offered as a value-added course to build versatile problem-solving and scripting skills[cite: 1].
              </p>
            </details>

          </div>
        </div>
      </div>
    </div>
  );
}