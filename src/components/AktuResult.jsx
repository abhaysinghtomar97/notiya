"use client"
import { useState, useEffect } from "react";
import axios from "axios";

export default function AktuResult() {
  const [rollNo, setRollNo] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [openSemesters, setOpenSemesters] = useState({});

  // Code to restrict Right Click and Common DevTools Inspect Shortcuts
  useEffect(() => {
    const handleContextMenu = (e) => e.preventDefault();
    const handleKeyDown = (e) => {
      if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J" || e.key === "i" || e.key === "j")) ||
        (e.ctrlKey && (e.key === "U" || e.key === "u"))
      ) {
        e.preventDefault();
        console.warn("DevTools access is restricted on this page.");
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const parseAktuHTML = (html) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  // Helper: get text using element ID
  const text = (id) =>
    doc.getElementById(id)?.textContent?.trim() || "";

  // =========================
  // 1. STUDENT INFORMATION
  // =========================
  const studentInfo = {
    institute: text("lblInstitute"),
    course: text("lblCourse"),
    branch: text("lblBranch"),
    rollNo: text("lblRollNo"),
    enrollmentNo: text("lblEnrollmentNo"),
    name: text("lblFullName"),
    hindiName: text("lblHindiname"),
    fatherName: text("lblFatherName"),
    gender: text("lblGender"),
  };

  // =========================
  // 2. FIND SEMESTER TABLES
  // =========================
  const semesterTables = doc.querySelectorAll(
    'table[id*="grdViewSubjectMarksheet"]'
  );

  const semesters = [];

  semesterTables.forEach((table) => {
   
    const tableId = table.id;

    const match = tableId.match(/^(ctl\d+_ctl\d+)_/);

    if (!match) return;

    const prefix = match[1];

    // =========================
    // Semester basic information
    // =========================
    const semester = text(`${prefix}_lblSemesterId`);
    const evenOdd = text(`${prefix}_lblEvenOdd`);
    const sgpa = text(`${prefix}_lblSGPA`);
    const declarationDate = text(`${prefix}_lblDateOfDeclaration`);

    const totalMarksObt =
      text(`${prefix}_lblTotalMarksObt`) ||
      text(`${prefix}_lblTotalMarks`);

    // ctl05 -> session information
    const sessionPrefix = prefix.split("_")[0];

    const sessionElement = doc.getElementById(
      `${sessionPrefix}_lblSession`
    );

    let session = "";

    if (sessionElement) {
      session = sessionElement.textContent
        .replace("Session :", "")
        .trim();
    }

    // =========================
    // Result status
    // =========================
    const resultStatus =
      text(`${prefix}_lblResult`) ||
      text(`${sessionPrefix}_lblResult`);

    // =========================
    // 3. SUBJECTS
    // =========================
    const subjects = [];

    const rows = table.querySelectorAll("tr");

    rows.forEach((row, index) => {
      // Skip heading
      if (index === 0) return;

      const cells = row.querySelectorAll("td");

      if (cells.length < 7) return;

      subjects.push({
        code: cells[0]?.textContent?.trim() || "",
        name: cells[1]?.textContent?.trim() || "",
        type: cells[2]?.textContent?.trim() || "",
        internal: cells[3]?.textContent?.trim() || "--",
        external: cells[4]?.textContent?.trim() || "--",
        backPaper: cells[5]?.textContent?.trim() || "--",
        grade: cells[6]?.textContent?.trim() || "--",
      });
    });

    semesters.push({
      semester,
      evenOdd,
      session,
      sgpa,
      totalMarksObt,
      resultStatus,
      declarationDate,
      subjects,
    });
  });

  // Sort semester 4->3->2...
  semesters.sort(
    (a, b) => Number(b.semester) - Number(a.semester)
  );

  return {
    studentInfo,
    semesters,
  };
};


// ======================================
// FETCH RESULT
// ======================================

const fetchResult = async (e) => {
  if (e) e.preventDefault();

  if (!rollNo.trim()) {
    setError("Please enter Roll Number");
    return;
  }

  try {
    setLoading(true);
    setError("");
    setResult(null);

    const { data } = await axios.post(
     process.env.NEXT_PUBLIC_AKTU_RESULT,
      { rollNo }
    );

  
    const html =
      typeof data === "string"
        ? data
        : data.result;

    if (!html) {
      throw new Error("HTML result not found in API response");
    }

    // Parse AKTU HTML
    const parsedResult = parseAktuHTML(html);

    console.log("Parsed result:", parsedResult);

    if (!parsedResult.studentInfo.rollNo) {
      throw new Error("Student information not found");
    }

    setResult(parsedResult);

    // Open first semester by default
    setOpenSemesters({ 0: true });

  }catch (err) {
  console.error("FULL ERROR:", err);
  console.log("HTTP STATUS:", err.response?.status);
  console.log("API RESPONSE:", err.response?.data);

  if (err.response?.status === 500) {
  setError("Result service is temporarily unavailable. Please try again.");

  } else {
    setError(
      err.response?.data?.message ||
      err.message ||
      "Unable to fetch result."
    );
  }
}finally {
    setLoading(false);
  }
};
  const toggleSemester = (index) => {
    setOpenSemesters((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 sm:p-6  duration-300 selection:bg-amber-500 selection:text-black">
      <div className="max-w-5xl mx-auto space-y-6">
        
      
        {/* Input Form Section */}
        <form 
          onSubmit={fetchResult} 
          className="rounded-xl p-6 border shadow-xl transition-all bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800/80"
        >
          <h2 className="text-2xl font-black mb-1 tracking-tight text-slate-900 dark:text-white">
            AKTU Result Checker
          </h2>
          <p className="text-slate-400 text-sm mb-5">Without DOB </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={rollNo}
              onChange={(e) => setRollNo(e.target.value)}
              placeholder="Enter University Roll Number"
              className="flex-1 border rounded-lg px-4 py-3 font-mono text-sm outline-none focus:ring-2 focus:ring-amber-500 transition-all bg-slate-50 dark:bg-slate-950 border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white"
            />

            <button
              type="submit"
              disabled={loading}
              className="bg-amber-600 text-slate-950 font-bold px-6 py-3 rounded-lg hover:bg-amber-500  disabled:opacity-50 active:scale-[0.99] tracking-wide"
            >
              {loading ? "Fetching Ledger..." : "Get Result"}
            </button>
          </div>

        {error && (
  <p className="text-red-500 font-medium mt-3 text-sm font-mono">
    ⚠️ {error }
  </p>
)}
        </form>

        {result && (
          <>
            {/* Student Info Details */}
            <div className="rounded-xl border shadow-xl p-6 transition-all bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800/80">
              <div className="flex justify-between items-start border-b pb-4 mb-6 border-dashed border-slate-200 dark:border-slate-700/50">
                <div>
                  <h3 className="text-xl font-bold tracking-tight">Student Particulars</h3>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">Enrolment: {result.studentInfo.enrollmentNo}</p>
                </div>
                <div className="text-right hidden sm:block">
                  <p className="text-lg font-bold text-amber-500">{result.studentInfo.hindiName || ""}</p>
                  <p className="text-xs text-slate-400 font-mono">Gender: {result.studentInfo.gender}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-y-5 gap-x-8 text-sm">
                <Info label="Full Name" value={result.studentInfo.name} />
                <Info label="Roll Number" value={result.studentInfo.rollNo} highlight />
                <Info label="Father / Guardian" value={result.studentInfo.fatherName} />
                <Info label="Academic Course" value={result.studentInfo.course} />
                <Info label="Engineering Branch" value={result.studentInfo.branch} />
                <div className="md:col-span-2">
                  <Info label="Affiliated Institute" value={result.studentInfo.institute} />
                </div>
              </div>
            </div>

            {/* Semester Accordion Engine */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold px-1 tracking-wide flex items-center gap-2">
                <span>Semester Transcripts</span>
                <span className="text-xs font-mono font-normal text-slate-400">({result.semesters.length} items logged)</span>
              </h3>
              
              {result.semesters.map((sem, idx) => {
                const isOpen = !!openSemesters[idx];
                const statusStr = sem.resultStatus || "";
                const isPass = statusStr.toUpperCase().includes("PASS");
                
                return (
                  <div 
                    key={idx} 
                    className="rounded-xl border shadow-xl overflow-hidden transition-all bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800/80"
                  >
                    {/* Header Strip - Amber Accent Theme Linkages */}
                    <div
                      onClick={() => toggleSemester(idx)}
                      className="flex justify-between items-center p-5 cursor-pointer select-none transition-colors bg-amber-50/60 dark:bg-slate-900/50 hover:bg-amber-100/40 dark:hover:bg-slate-800/40"
                    >
                      <div>
                        <p className="text-xs font-mono text-amber-500 font-bold tracking-wider uppercase">
                          {sem.session} ({sem.evenOdd})
                        </p>
                        <h4 className="text-base font-bold text-slate-800 dark:text-white">
                          Semester {sem.semester} 
                        </h4>
                      </div>

                      <div className="flex items-center gap-6">
                        <div className="text-right text-xs font-mono hidden sm:flex gap-5">
                          <span><b className="text-slate-400">SGPA:</b> {sem.sgpa}</span>
                          <span><b className="text-slate-400">MARKS:</b> {sem.totalMarksObt}</span>
                          <span className={`font-bold ${isPass ? "text-emerald-500" : "text-rose-500"}`}>
                            {statusStr}
                          </span>
                        </div>
                        
                        <div className="sm:hidden font-mono font-bold text-xs">
                          <span className={isPass ? "text-emerald-500" : "text-rose-500"}>
                            {statusStr}
                          </span>
                        </div>

                        <svg
                          className={`w-4 h-4 text-amber-500 transform transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>

                    {/* Expandable Tab Content */}
                    {isOpen && (
                      <div className="p-5 border-t transition-all text-sm border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/60">
                        {/* Summary Block on Mobile */}
                        <div className="sm:hidden grid grid-cols-3 gap-2 border-b border-dashed pb-4 mb-4 border-slate-200 dark:border-slate-700/50 text-xs text-center font-mono">
                          <div><span className="text-slate-400 block mb-0.5">SGPA</span><b>{sem.sgpa}</b></div>
                          <div><span className="text-slate-400 block mb-0.5">Marks</span><b>{sem.totalMarksObt}</b></div>
                          <div><span className="text-slate-400 block mb-0.5">Decl Date</span><b className="text-slate-400 text-[10px]">{sem.declarationDate}</b></div>
                        </div>

                        {/* Subject Details Table Matrix */}
                        <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800/80">
                          <table className="w-full text-left border-collapse">
                            <thead>
                              <tr className="bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300">
                                <th className="p-3 text-xs font-mono uppercase tracking-wider">Code</th>
                                <th className="p-3 text-xs font-mono uppercase tracking-wider">Subject Title</th>
                                <th className="p-3 text-xs font-mono uppercase tracking-wider text-center">Type</th>
                                <th className="p-3 text-xs font-mono uppercase tracking-wider text-center">Int</th>
                                <th className="p-3 text-xs font-mono uppercase tracking-wider text-center">Ext</th>
                                <th className="p-3 text-xs font-mono uppercase tracking-wider text-center">Back</th>
                                <th className="p-3 text-xs font-mono uppercase tracking-wider text-center">Grade</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 dark:divide-slate-800/60 text-xs">
                              {sem.subjects && sem.subjects.map((sub, sIdx) => {
                                const isFailed = sub.grade === "F" || sub.grade === "E#";
                                return (
                                  <tr 
                                    key={sIdx} 
                                    className={
                                      isFailed 
                                        ? "bg-red-400 " 
                                        : "hover:bg-slate-100/40 dark:hover:bg-slate-900/40 text-slate-800 dark:text-slate-300"
                                    }
                                  >
                                    <td className="p-3 font-mono text-amber-500 font-semibold">{sub.code}</td>
                                    <td className="p-3 font-medium text-slate-800 dark:text-slate-200">{sub.name}</td>
                                    <td className="p-3 text-center text-slate-400 font-mono text-[11px]">{sub.type}</td>
                                    <td className="p-3 text-center font-mono">{sub.internal || "--"}</td>
                                    <td className="p-3 text-center font-mono">{sub.external || "--"}</td>
                                    <td className={`p-3 text-center font-mono ${sub.backPaper !== "--" ? "text-amber-900 font-bold" : "text-slate-500"}`}>
                                      {sub.backPaper}
                                    </td>
                                    <td className={`p-3 text-center font-black text-sm ${isFailed ? "text-rose-500" : "text-emerald-500"}`}>
                                      {sub.grade || "--"}
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                        <div className="mt-3 text-right">
                          <span className="text-[11px] font-mono text-slate-400">Declaration Date: {sem.declarationDate}</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* Disclaimer Strip */}
        <p className="text-[11px] text-slate-500 text-center mt-12 leading-relaxed max-w-xl mx-auto">
          This service provides a cached representation of evaluation records and is not an official university declaration. 
          Verify all components against certified grade cards on the primary 
          <a href="https://oneview.aktu.ac.in/webpages/aktu/oneview.aspx" className="text-amber-500 font-medium hover:underline ml-1">
            AKTU OneView Portal
          </a>.
        </p>
      </div>
    </div>
  );
}

// Inner helper component using regular Tailwind variants
function Info({ label, value, highlight = false }) {
  return (
    <div className="p-3 rounded-lg border transition-all bg-slate-50 dark:bg-slate-950/40 border-slate-100 dark:border-slate-800/40">
      <p className="text-[10px] text-slate-400 font-mono uppercase tracking-widest mb-1">{label}</p>
      <p className={`font-bold text-sm tracking-wide ${
        highlight ? "text-amber-500 font-mono text-base" : "text-slate-800 dark:text-slate-200"
      }`}>
        {value || "Not Set"}
      </p>
    </div>
  );
}