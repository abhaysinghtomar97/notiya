import {ChevronDown} from "lucide-react";

export function AktuSeoContent1stYear() {
  return (
    <div className="mt-24 border-t border-border pt-16 pb-8 text-muted-foreground">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-6 text-3xl font-bold text-foreground">
          AKTU B.Tech First Year Stream-Wise Branch Classification
        </h2>
        <p className="mb-8 leading-relaxed">
          Before downloading the syllabus, check which AKTU stream your branch belongs to. The university’s stream-wise classification groups the branches as follows.
        </p>

        {/* Stream Lists */}
        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <h3 className="mb-3 text-lg font-bold text-foreground">1. Civil Engineering Stream (CE)</h3>
            <ul className="mb-4 list-inside list-disc space-y-1 ml-2">
              <li>Civil Engineering</li>
              <li>Environmental Engineering</li>
            </ul>

            <h3 className="mb-3 mt-6 text-lg font-bold text-foreground">2. Mechanical Engineering Stream (ME)</h3>
            <ul className="mb-4 list-inside list-disc space-y-1 ml-2">
              <li>Mechanical Engineering</li>
              <li>Automobile Engineering</li>
              <li>Aeronautical Engineering</li>
              <li>Industrial Production Engineering</li>
              <li>Manufacturing Technology</li>
              <li>Mining Engineering</li>
            </ul>

            <h3 className="mb-3 mt-6 text-lg font-bold text-foreground">3. Electrical Engineering Stream (EE)</h3>
            <ul className="mb-4 list-inside list-disc space-y-1 ml-2">
              <li>Electrical Engineering</li>
              <li>Electrical & Electronics Engineering</li>
              <li>Electrical & Computer Engineering</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-lg font-bold text-foreground">4. Computer Science & Eng. (CSE)</h3>
            <ul className="mb-4 list-inside list-disc space-y-1 ml-2">
              <li>Computer Science and Engineering</li>
              <li>Information Technology</li>
              <li>Computer Science and Design</li>
              <li>Artificial Intelligence (AI) and Data Science</li>
              <li>CSE (Artificial Intelligence & Machine Learning)</li>
              <li>Cyber Security & Internet of Things</li>
            </ul>

            <h3 className="mb-3 mt-6 text-lg font-bold text-foreground">5. Electronics Engineering (ECE)</h3>
            <ul className="mb-4 list-inside list-disc space-y-1 ml-2">
              <li>Electronics Engineering</li>
              <li>Electronics and Communication Engineering</li>
              <li>Electronics (VLSI Design and Technology)</li>
              <li>Electronics and Instrumentation Engineering</li>
            </ul>
          </div>
        </div>

        {/* Informational Text */}
        <div className="mt-12 space-y-6">
          <h2 className="text-2xl font-bold text-foreground">Which AKTU First Year Syllabus Should You Download?</h2>
          <p className="leading-relaxed">
            The branch name mentioned on your admission or university records may not always be identical to the stream name used in the syllabus table. For example, a student enrolled in Computer Science and Engineering (Artificial Intelligence) falls under the Computer Science & Engineering Stream, while a student of Automobile Engineering falls under the Mechanical Engineering Stream.
          </p>
          
          <h2 className="mt-8 text-2xl font-bold text-foreground">About the AKTU B.Tech First Year Syllabus 2026-27</h2>
          <p className="leading-relaxed">
            The AKTU B.Tech First Year Syllabus serves as a roadmap for understanding the academic curriculum during the first year of B.Tech. Instead of studying topics randomly, students can use the syllabus to identify what is actually included in their course and plan their preparation accordingly.
          </p>
        </div>

        {/* FAQs using Native HTML (No JavaScript required!) */}
        <div className="mt-16">
          <h2 className="mb-6 text-3xl font-bold text-foreground">Frequently Asked Questions</h2>
          <div className="space-y-4">
            
            <details className="group rounded-xl border border-border bg-card p-6 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between font-bold text-foreground">
                <span>Is the AKTU B.Tech First Year syllabus the same for every branch?</span>
                <span className="transition duration-300 group-open:-rotate-180">
                  <ChevronDown size={20} />
                </span>
              </summary>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                AKTU groups many related branches under common engineering streams. For example, several Computer Science specialisations fall under the Computer Science & Engineering stream, while branches such as Automobile Engineering fall under the Mechanical Engineering stream.
              </p>
            </details>

            <details className="group rounded-xl border border-border bg-card p-6 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between font-bold text-foreground">
                <span>Which stream includes CSE AI, AI & ML and Data Science branches?</span>
                <span className="transition duration-300 group-open:-rotate-180">
                  <ChevronDown size={20} />
                </span>
              </summary>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                The university classification places Computer Science and Engineering specialisations such as Artificial Intelligence, Artificial Intelligence & Machine Learning, Data Science, Cyber Security and Internet of Things within the Computer Science & Engineering Stream (CSE).
              </p>
            </details>

            <details className="group rounded-xl border border-border bg-card p-6 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between font-bold text-foreground">
                <span>Which stream does Automobile Engineering come under?</span>
                <span className="transition duration-300 group-open:-rotate-180">
                  <ChevronDown size={20} />
                </span>
              </summary>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Automobile Engineering is listed under the Mechanical Engineering Stream (ME) along with Mechanical Engineering, Aeronautical Engineering, Industrial Production Engineering, Manufacturing Technology and Mining Engineering.
              </p>
            </details>

          </div>
        </div>

      </div>
    </div>
  );
}

// ---------------------------------------------------------
// 2ND YEAR SEO CONTENT
// ---------------------------------------------------------
export function AktuSeoContent2ndYear() {
  return (
    <div className="mt-24 border-t border-border pt-16 pb-8 text-muted-foreground">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-6 text-3xl font-bold text-foreground">
          AKTU B.Tech 2nd Year: Transitioning to Core Engineering
        </h2>
        <p className="mb-6 leading-relaxed">
          The second year of the AKTU B.Tech program (3rd and 4th semesters) marks the official transition from foundational sciences to your chosen engineering specialization. Unlike the first year, where students across different branches study a common curriculum, the 2nd year syllabus dives deep into core departmental subjects.
        </p>

        <div className="mt-8 space-y-6">
          <h3 className="text-2xl font-bold text-foreground">Crucial Phase for Lateral Entry Students</h3>
          <p className="leading-relaxed">
            This year is particularly important because it welcomes <strong>Lateral Entry (B.Sc. and Diploma) students</strong> directly into the 3rd semester. To ensure a smooth transition, utilizing highly organized notes, syllabus breakdowns, and previous year questions (PYQs) is essential to catch up and excel in core subjects like Data Structures (for CSE/IT), Network Analysis (for EE/ECE), and Thermodynamics (for ME).
          </p>
        </div>

        {/* FAQs */}
        <div className="mt-16">
          <h2 className="mb-6 text-3xl font-bold text-foreground">Frequently Asked Questions (2nd Year)</h2>
          <div className="space-y-4">
            
            <details className="group rounded-xl border border-border bg-card p-6 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between font-bold text-foreground">
                <span>Are there any common subjects left in the 2nd year?</span>
                <span className="transition duration-300 group-open:-rotate-180">
                  <ChevronDown size={20} />
                </span>
              </summary>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                While most subjects are strictly branch-specific, AKTU often includes universal subjects like Technical Communication, Cyber Security, or Universal Human Values (UHV) that all 2nd-year students must complete.
              </p>
            </details>

            <details className="group rounded-xl border border-border bg-card p-6 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between font-bold text-foreground">
                <span>How important are 2nd-year subjects for GATE preparation?</span>
                <span className="transition duration-300 group-open:-rotate-180">
                  <ChevronDown size={20} />
                </span>
              </summary>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Extremely important. The 3rd and 4th semesters introduce fundamental building block subjects (like OS and DBMS for CS, or Strength of Materials for Civil/Mechanical). A large percentage of GATE and placement interview questions are derived directly from the 2nd-year AKTU syllabus.
              </p>
            </details>

          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------
// 3RD YEAR SEO CONTENT
// ---------------------------------------------------------
export function AktuSeoContent3rdYear() {
  return (
    <div className="mt-24 border-t border-border pt-16 pb-8 text-muted-foreground">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-6 text-3xl font-bold text-foreground">
          AKTU B.Tech 3rd Year: Advanced Concepts & Departmental Electives
        </h2>
        <p className="mb-6 leading-relaxed">
          The third year (5th and 6th semesters) is widely considered the most critical phase of the AKTU B.Tech journey. This is the year where the curriculum shifts from theoretical foundations to advanced, industry-oriented concepts. It is also the year students must start seriously preparing for campus placements, internships, and competitive exams.
        </p>

        <div className="mt-8 space-y-6">
          <h3 className="text-2xl font-bold text-foreground">Understanding Departmental Electives</h3>
          <p className="leading-relaxed">
            Starting in the 3rd year, AKTU introduces <strong>Departmental Electives</strong>. Instead of a fixed curriculum, you get to choose specialized subjects based on your career goals. For example, a CSE student might choose between Machine Learning, Cloud Computing, or Data Analytics. Downloading the exact syllabus and PYQs for your chosen elective is crucial, as study materials for elective subjects are often harder to find.
          </p>
        </div>

        {/* FAQs */}
        <div className="mt-16">
          <h2 className="mb-6 text-3xl font-bold text-foreground">Frequently Asked Questions (3rd Year)</h2>
          <div className="space-y-4">
            
            <details className="group rounded-xl border border-border bg-card p-6 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between font-bold text-foreground">
                <span>What is the Mini Project in the AKTU 3rd Year curriculum?</span>
                <span className="transition duration-300 group-open:-rotate-180">
                  <ChevronDown size={20} />
                </span>
              </summary>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Usually introduced in the 6th semester, the mini-project requires students to build a working prototype or software application. It serves as practice for the massive Major Project in the 4th year and is a vital addition to your resume before campus placements begin.
              </p>
            </details>

            <details className="group rounded-xl border border-border bg-card p-6 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between font-bold text-foreground">
                <span>How should I utilize PYQs in my 3rd year?</span>
                <span className="transition duration-300 group-open:-rotate-180">
                  <ChevronDown size={20} />
                </span>
              </summary>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Because 3rd-year subjects are highly advanced, studying purely from textbooks can be overwhelming. Using Previous Year Questions (PYQs) helps you identify the most frequently tested concepts and mathematical models, allowing you to study efficiently while managing your placement prep.
              </p>
            </details>

          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------
// 4TH YEAR SEO CONTENT
// ---------------------------------------------------------
export function AktuSeoContent4thYear() {
  return (
    <div className="mt-24 border-t border-border pt-16 pb-8 text-muted-foreground">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-6 text-3xl font-bold text-foreground">
          AKTU B.Tech 4th Year: Major Projects & Open Electives
        </h2>
        <p className="mb-6 leading-relaxed">
          The final year of AKTU B.Tech (7th and 8th semesters) is designed to bridge the gap between academic learning and industry readiness. The course load is generally lighter in terms of traditional theoretical subjects, allowing students to dedicate the majority of their time to their <strong>Major Project</strong>, industrial internships, and securing job offers.
        </p>

        <div className="mt-8 space-y-6">
          <h3 className="text-2xl font-bold text-foreground">Open Electives: Broadening Your Horizons</h3>
          <p className="leading-relaxed">
            In the 4th year, students are required to select <strong>Open Electives</strong>. Unlike Departmental Electives (which are strictly related to your branch), Open Electives are interdisciplinary. A Mechanical student can study a software-related subject, or a CSE student can study Entrepreneurship or Quality Management. Reviewing the syllabus carefully before choosing an Open Elective is highly recommended to ensure it aligns with your future goals.
          </p>
        </div>

        {/* FAQs */}
        <div className="mt-16">
          <h2 className="mb-6 text-3xl font-bold text-foreground">Frequently Asked Questions (4th Year)</h2>
          <div className="space-y-4">
            
            <details className="group rounded-xl border border-border bg-card p-6 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between font-bold text-foreground">
                <span>What is the structure of the 8th semester in AKTU?</span>
                <span className="transition duration-300 group-open:-rotate-180">
                  <ChevronDown size={20} />
                </span>
              </summary>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                The 8th semester is intentionally kept very light. It typically contains only one or two theoretical elective subjects, with the massive majority of credits assigned to the final presentation and evaluation of your Major Project.
              </p>
            </details>

            <details className="group rounded-xl border border-border bg-card p-6 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between font-bold text-foreground">
                <span>Why are Quantum Series/Notes still needed in the final year?</span>
                <span className="transition duration-300 group-open:-rotate-180">
                  <ChevronDown size={20} />
                </span>
              </summary>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Because final-year students are heavily focused on job interviews, off-campus drives, and GATE prep, they have very little time to study for university exams. Concise notes and PYQs become absolute lifesavers to ensure you clear your final subjects without any backlogs right before graduation.
              </p>
            </details>

          </div>
        </div>
      </div>
    </div>
  );
}