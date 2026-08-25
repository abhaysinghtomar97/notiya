import React from 'react';
import { ChevronDown, Target, BookOpen, Rocket, Briefcase, Cpu, Code, Database, BrainCircuit } from 'lucide-react';

export default function BranchSeoContent({ branchCode }) {
  const code = branchCode?.toUpperCase();

  switch (code) {
    case 'CSE': return <CseContent />;
    case 'CS-AI': return <CsAiContent />;
    case 'CS-AIML': return <CsAimlContent />;
    case 'CS-DS': return <CsDsContent />;
    case 'ECE': return <EceContent />;
    default: return null;
  }
}

// ---------------------------------------------------------
// 1. CSE (Computer Science & Engineering)
// ---------------------------------------------------------
function CseContent() {
  return (
    <div className="mt-24 border-t border-border pt-16 pb-8 text-muted-foreground">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-6 text-3xl font-bold text-foreground">
          Computer Science & Engineering (CSE) / Information Technology (IT): The Ultimate Foundation
        </h2>
        <p className="mb-8 leading-relaxed">
          Computer Science and Engineering (CSE) / (IT) remains the most sought-after and versatile engineering branch globally. It provides a comprehensive understanding of computer architecture, software engineering, algorithms, and system design, serving as the backbone for the entire IT industry.
        </p>
        
        <div className="grid gap-8 md:grid-cols-2 mt-8">
          <div className="rounded-2xl bg-amber-50/50 p-6 border border-amber-100 dark:bg-amber-900/10 dark:border-amber-900/30">
            <div className="flex items-center gap-3 mb-4">
              <Target className="text-amber-600 w-6 h-6" />
              <h3 className="text-xl font-bold text-foreground">Why CSE is Best for You</h3>
            </div>
            <p className="leading-relaxed text-sm mb-4">
              If you are passionate about coding, system architecture, and algorithmic problem-solving, CSE is your domain. It does not box you into a specific niche early on; instead, it gives you the flexibility to pivot into any technology stack.
            </p>
            <ul className="list-disc list-inside text-sm space-y-2">
              <li><strong>Highest Placement Volume:</strong> Dominates campus recruitment.</li>
              <li><strong>Versatile Career Paths:</strong> Full-Stack Developer, Cloud Architect, DevOps Engineer.</li>
              <li><strong>Evergreen Demand:</strong> Core knowledge of OS, DBMS, and Networks never becomes obsolete.</li>
            </ul>
          </div>

          <div className="rounded-2xl bg-card p-6 border border-border shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="text-amber-600 w-6 h-6" />
              <h3 className="text-xl font-bold text-foreground">How Notiya Helps You</h3>
            </div>
            <p className="leading-relaxed text-sm mb-4">
              The CSE curriculum is notoriously heavy on both theory and logic. Attempting to read standard reference books right before exams is a recipe for disaster.
            </p>
            <ul className="list-disc list-inside text-sm space-y-2">
              <li><strong>Decoded Core Subjects:</strong> We simplify complex subjects like Automata (TAFL), Compiler Design, and Operating Systems.</li>
              <li><strong>Targeted PYQs:</strong> Notiya filters out the noise, giving you the exact algorithms and numericals the university repeatedly asks.</li>
              <li><strong>Time Management:</strong> Handwritten, unit-wise notes let you revise a 40-hour syllabus in a single night.</li>
            </ul>
          </div>
        </div>

        {/* FAQs */}
        <div className="mt-12">
          <h3 className="mb-6 text-2xl font-bold text-foreground">CSE Frequently Asked Questions</h3>
          <div className="space-y-4">
            <details className="group rounded-xl border border-border bg-card p-6 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between font-bold text-foreground">
                <span>Is competitive programming strictly necessary for CSE students?</span>
                <span className="transition duration-300 group-open:-rotate-180"><ChevronDown size={20} /></span>
              </summary>
              <p className="mt-4 leading-relaxed text-muted-foreground text-sm">
                While not strictly mandatory for passing university semester exams, competitive programming (on platforms like LeetCode or Codeforces) drastically improves your logic and is highly recommended for clearing the initial coding rounds during top-tier product-based campus placements.
              </p>
            </details>
            <details className="group rounded-xl border border-border bg-card p-6 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between font-bold text-foreground">
                <span>What are the most important subjects in CSE for GATE and placements?</span>
                <span className="transition duration-300 group-open:-rotate-180"><ChevronDown size={20} /></span>
              </summary>
              <p className="mt-4 leading-relaxed text-muted-foreground text-sm">
                The "Big Four" core subjects are Data Structures & Algorithms (DSA), Database Management Systems (DBMS), Operating Systems (OS), and Computer Networks (CN). Mastering these is non-negotiable for both GATE qualification and technical interviews.
              </p>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------
// 2. CS-AI (Artificial Intelligence)
// ---------------------------------------------------------
function CsAiContent() {
  return (
    <div className="mt-24 border-t border-border pt-16 pb-8 text-muted-foreground">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-6 text-3xl font-bold text-foreground">
          Computer Science (AI): Shaping the Future of Technology
        </h2>
        <p className="mb-8 leading-relaxed">
          Computer Science with a specialization in Artificial Intelligence (CS-AI) focuses on creating systems capable of human-like cognitive functions. This branch dives deep into heuristic search algorithms, knowledge representation, expert systems, and autonomous robotics.
        </p>
        
        <div className="grid gap-8 md:grid-cols-2 mt-8">
          <div className="rounded-2xl bg-amber-50/50 p-6 border border-amber-100 dark:bg-amber-900/10 dark:border-amber-900/30">
            <div className="flex items-center gap-3 mb-4">
              <BrainCircuit className="text-amber-600 w-6 h-6" />
              <h3 className="text-xl font-bold text-foreground">Why CS-AI is Best for You</h3>
            </div>
            <p className="leading-relaxed text-sm mb-4">
              If you are fascinated by autonomous systems and want to be at the forefront of the next technological revolution, CS-AI is the perfect fit. It goes beyond standard web development, focusing on cognitive computing.
            </p>
            <ul className="list-disc list-inside text-sm space-y-2">
              <li><strong>Niche Expertise:</strong> You graduate as a specialist in a rapidly growing field.</li>
              <li><strong>High-End Roles:</strong> AI Engineer, Research Scientist, NLP Engineer, Robotics Programmer.</li>
              <li><strong>Innovation Focused:</strong> Heavy emphasis on creating entirely new software behaviors rather than just maintaining old code.</li>
            </ul>
          </div>

          <div className="rounded-2xl bg-card p-6 border border-border shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="text-amber-600 w-6 h-6" />
              <h3 className="text-xl font-bold text-foreground">How Notiya Helps You</h3>
            </div>
            <p className="leading-relaxed text-sm mb-4">
              A major challenge for AI students is the lack of standardized, syllabus-aligned textbooks. The field moves faster than publishers can print.
            </p>
            <ul className="list-disc list-inside text-sm space-y-2">
              <li><strong>Curated Modern Notes:</strong> We provide updated notes on Soft Computing, Neural Networks, and AI principles that actually match your university syllabus.</li>
              <li><strong>Math Demystified:</strong> We break down the complex probabilistic and heuristic mathematics into easy-to-understand study materials.</li>
              <li><strong>Anticipated Questions:</strong> Our PYQ analysis helps you anticipate exact exam questions in these newer, specialized subjects.</li>
            </ul>
          </div>
        </div>

        {/* FAQs */}
        <div className="mt-12">
          <h3 className="mb-6 text-2xl font-bold text-foreground">CS-AI Frequently Asked Questions</h3>
          <div className="space-y-4">
            <details className="group rounded-xl border border-border bg-card p-6 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between font-bold text-foreground">
                <span>What is the difference between CS-AI and standard CSE?</span>
                <span className="transition duration-300 group-open:-rotate-180"><ChevronDown size={20} /></span>
              </summary>
              <p className="mt-4 leading-relaxed text-muted-foreground text-sm">
                While the first year (and most of the second year) is nearly identical to standard CSE to build your foundation, CS-AI diverges heavily in the 3rd and 4th years. It replaces traditional software electives with specialized, mandatory papers on Artificial Intelligence, Fuzzy Logic, and Advanced Search Algorithms.
              </p>
            </details>
            <details className="group rounded-xl border border-border bg-card p-6 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between font-bold text-foreground">
                <span>Does the AI specialization require a lot of mathematics?</span>
                <span className="transition duration-300 group-open:-rotate-180"><ChevronDown size={20} /></span>
              </summary>
              <p className="mt-4 leading-relaxed text-muted-foreground text-sm">
                Yes. To truly understand how AI algorithms work under the hood (rather than just using pre-built libraries), you will need a solid grasp of Probability, Statistics, Linear Algebra, and Calculus. 
              </p>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------
// 3. CS-AIML (AI & Machine Learning)
// ---------------------------------------------------------
function CsAimlContent() {
  return (
    <div className="mt-24 border-t border-border pt-16 pb-8 text-muted-foreground">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-6 text-3xl font-bold text-foreground">
          Computer Science (AI & ML): Data-Driven Intelligence
        </h2>
        <p className="mb-8 leading-relaxed">
          Computer Science in Artificial Intelligence and Machine Learning (CS-AIML) bridges the gap between theoretical AI and practical, data-driven model training. This specialization focuses heavily on predictive analytics, neural networks, deep learning architectures, and natural language processing.
        </p>
        
        <div className="grid gap-8 md:grid-cols-2 mt-8">
          <div className="rounded-2xl bg-amber-50/50 p-6 border border-amber-100 dark:bg-amber-900/10 dark:border-amber-900/30">
            <div className="flex items-center gap-3 mb-4">
              <Code className="text-amber-600 w-6 h-6" />
              <h3 className="text-xl font-bold text-foreground">Why CS-AIML is Best for You</h3>
            </div>
            <p className="leading-relaxed text-sm mb-4">
              CS-AIML is currently one of the most highly compensated specializations. If you enjoy teaching computers to learn from data rather than explicitly programming rules, this is your branch.
            </p>
            <ul className="list-disc list-inside text-sm space-y-2">
              <li><strong>High Market Demand:</strong> Companies urgently need engineers who can deploy ML models into production.</li>
              <li><strong>Lucrative Career Paths:</strong> ML Engineer, Deep Learning Engineer, Generative AI Developer.</li>
              <li><strong>Practical Application:</strong> You will work extensively with Python, TensorFlow, PyTorch, and real-world datasets.</li>
            </ul>
          </div>

          <div className="rounded-2xl bg-card p-6 border border-border shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="text-amber-600 w-6 h-6" />
              <h3 className="text-xl font-bold text-foreground">How Notiya Helps You</h3>
            </div>
            <p className="leading-relaxed text-sm mb-4">
              Machine Learning involves heavy theoretical mathematics and algorithmic complexity, which universities test rigorously.
            </p>
            <ul className="list-disc list-inside text-sm space-y-2">
              <li><strong>Simplified ML Notes:</strong> We provide specialized vaults breaking down complex algorithms (like SVMs, Random Forests, and CNNs) into digestible points.</li>
              <li><strong>Python & Scripting Resources:</strong> Access code-level explanations and notes tailored for the practical aspects of your syllabus.</li>
              <li><strong>Focused Revision:</strong> Skip the 800-page textbooks and use our targeted study materials to secure high grades right before exams.</li>
            </ul>
          </div>
        </div>

        {/* FAQs */}
        <div className="mt-12">
          <h3 className="mb-6 text-2xl font-bold text-foreground">CS-AIML Frequently Asked Questions</h3>
          <div className="space-y-4">
            <details className="group rounded-xl border border-border bg-card p-6 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between font-bold text-foreground">
                <span>What is the difference between CS-AI and CS-AIML?</span>
                <span className="transition duration-300 group-open:-rotate-180"><ChevronDown size={20} /></span>
              </summary>
              <p className="mt-4 leading-relaxed text-muted-foreground text-sm">
                AI is the broader concept of creating intelligent machines. ML is a specific subset of AI that focuses on giving machines access to data and letting them learn for themselves. The AIML branch is typically more hands-on with data analysis, statistical modeling, and training algorithms, whereas pure AI might focus more on robotics, logic, and expert systems.
              </p>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------
// 4. CS-DS (Data Science)
// ---------------------------------------------------------
function CsDsContent() {
  return (
    <div className="mt-24 border-t border-border pt-16 pb-8 text-muted-foreground">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-6 text-3xl font-bold text-foreground">
          Computer Science (Data Science): The Power of Analytics
        </h2>
        <p className="mb-8 leading-relaxed">
          Data is the new oil, and Computer Science (Data Science) teaches you how to refine it. This branch focuses on extracting actionable insights from massive, complex data sets using Big Data technologies, statistical analysis, data visualization, and business intelligence tools.
        </p>
        
        <div className="grid gap-8 md:grid-cols-2 mt-8">
          <div className="rounded-2xl bg-amber-50/50 p-6 border border-amber-100 dark:bg-amber-900/10 dark:border-amber-900/30">
            <div className="flex items-center gap-3 mb-4">
              <Database className="text-amber-600 w-6 h-6" />
              <h3 className="text-xl font-bold text-foreground">Why CS-DS is Best for You</h3>
            </div>
            <p className="leading-relaxed text-sm mb-4">
              If you have a highly analytical mindset, love statistics, and enjoy finding hidden patterns in chaos, Data Science is your calling. Every modern industry—from finance to healthcare—relies on data to make decisions.
            </p>
            <ul className="list-disc list-inside text-sm space-y-2">
              <li><strong>Industry Agnostic:</strong> Your skills are needed in tech, banking, e-commerce, and logistics.</li>
              <li><strong>Targeted Roles:</strong> Data Scientist, Big Data Engineer, Data Analyst, Business Intelligence (BI) Developer.</li>
              <li><strong>Modern Tech Stack:</strong> You will master tools like Hadoop, Apache Spark, Tableau, and R/Python.</li>
            </ul>
          </div>

          <div className="rounded-2xl bg-card p-6 border border-border shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="text-amber-600 w-6 h-6" />
              <h3 className="text-xl font-bold text-foreground">How Notiya Helps You</h3>
            </div>
            <p className="leading-relaxed text-sm mb-4">
              Subjects like Big Data Analytics, Statistical Inference, and Data Mining can be incredibly overwhelming due to the sheer volume of theory and complex mathematical formulas.
            </p>
            <ul className="list-disc list-inside text-sm space-y-2">
              <li><strong>Compressed Theory:</strong> Notiya condenses massive data science subjects into easily scannable, unit-wise notes.</li>
              <li><strong>Solved Numericals:</strong> We provide step-by-step solutions to previous year statistical problems.</li>
              <li><strong>Exam Focused:</strong> We filter out the unnecessary fluff, allowing you to focus strictly on what the university asks in semester exams.</li>
            </ul>
          </div>
        </div>

        {/* FAQs */}
        <div className="mt-12">
          <h3 className="mb-6 text-2xl font-bold text-foreground">CS-DS Frequently Asked Questions</h3>
          <div className="space-y-4">
            <details className="group rounded-xl border border-border bg-card p-6 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between font-bold text-foreground">
                <span>Is Data Science more about coding or mathematics?</span>
                <span className="transition duration-300 group-open:-rotate-180"><ChevronDown size={20} /></span>
              </summary>
              <p className="mt-4 leading-relaxed text-muted-foreground text-sm">
                It is a 50/50 split. While you need strong coding skills (primarily in Python or R and SQL) to clean, manipulate, and query data, you absolutely need a strong foundation in statistics and probability to interpret the data correctly and build accurate forecasting models.
              </p>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------
// 5. ECE (Electronics & Communication Engineering)
// ---------------------------------------------------------
function EceContent() {
  return (
    <div className="mt-24 border-t border-border pt-16 pb-8 text-muted-foreground">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-6 text-3xl font-bold text-foreground">
          Electronics & Communication (ECE): Bridging Hardware and Software
        </h2>
        <p className="mb-8 leading-relaxed">
          Electronics & Communication Engineering (ECE) is one of the most dynamic core engineering branches. It deals with the design, development, and testing of electronic equipment used in various systems, from microprocessors and VLSI chips to telecommunication networks and IoT devices.
        </p>
        
        <div className="grid gap-8 md:grid-cols-2 mt-8">
          <div className="rounded-2xl bg-amber-50/50 p-6 border border-amber-100 dark:bg-amber-900/10 dark:border-amber-900/30">
            <div className="flex items-center gap-3 mb-4">
              <Cpu className="text-amber-600 w-6 h-6" />
              <h3 className="text-xl font-bold text-foreground">Why ECE is Best for You</h3>
            </div>
            <p className="leading-relaxed text-sm mb-4">
              ECE gives you the best of both worlds. If you are intrigued by how microchips work, embedded systems, or 5G communications, this is your path. Furthermore, it offers unparalleled career flexibility.
            </p>
            <ul className="list-disc list-inside text-sm space-y-2">
              <li><strong>Dual Industry Access:</strong> ECE students are eligible for both core hardware companies (Intel, Qualcomm) and IT/software companies.</li>
              <li><strong>Future-Proof Tech:</strong> Leads the charge in IoT (Internet of Things), semiconductor manufacturing, and robotics.</li>
              <li><strong>Diverse Roles:</strong> VLSI Design Engineer, Network Engineer, Embedded Systems Developer.</li>
            </ul>
          </div>

          <div className="rounded-2xl bg-card p-6 border border-border shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="text-amber-600 w-6 h-6" />
              <h3 className="text-xl font-bold text-foreground">How Notiya Helps You</h3>
            </div>
            <p className="leading-relaxed text-sm mb-4">
              ECE is widely considered one of the toughest branches due to its heavy reliance on complex circuit diagrams, signal processing mathematics, and network theorems.
            </p>
            <ul className="list-disc list-inside text-sm space-y-2">
              <li><strong>Clear Diagrams & Derivations:</strong> We provide high-quality, legible notes where complex circuit diagrams and mathematical derivations are clearly laid out.</li>
              <li><strong>Transforms Made Easy:</strong> Simplified study material for tough concepts like Laplace, Fourier, and Z-transforms.</li>
              <li><strong>PYQ Analysis:</strong> Our resources highlight exactly which theorems and numericals are repeatedly asked, saving you hours of study time.</li>
            </ul>
          </div>
        </div>

        {/* FAQs */}
        <div className="mt-12">
          <h3 className="mb-6 text-2xl font-bold text-foreground">ECE Frequently Asked Questions</h3>
          <div className="space-y-4">
            <details className="group rounded-xl border border-border bg-card p-6 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between font-bold text-foreground">
                <span>Can ECE students sit for IT/Software campus placements?</span>
                <span className="transition duration-300 group-open:-rotate-180"><ChevronDown size={20} /></span>
              </summary>
              <p className="mt-4 leading-relaxed text-muted-foreground text-sm">
                Absolutely. The vast majority of mass-recruiting IT service companies (like TCS, Infosys, Wipro, Accenture) and many product-based companies allow ECE students to participate in software placement drives, provided they possess the required coding skills (DSA, DBMS, OS).
              </p>
            </details>
            <details className="group rounded-xl border border-border bg-card p-6 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between font-bold text-foreground">
                <span>Is ECE tougher than CSE?</span>
                <span className="transition duration-300 group-open:-rotate-180"><ChevronDown size={20} /></span>
              </summary>
              <p className="mt-4 leading-relaxed text-muted-foreground text-sm">
                Generally, yes. ECE is often considered more academically rigorous because it requires a strong grasp of both advanced mathematics (calculus, differential equations) and physics (electromagnetism, semiconductor physics), whereas CSE is more focused on abstract logic and discrete mathematics.
              </p>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
}