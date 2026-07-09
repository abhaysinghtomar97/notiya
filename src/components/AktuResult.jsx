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
    const handleContextMenu = (e) => {
      e.preventDefault();
    };

    const handleKeyDown = (e) => {
      // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
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

  const fetchResult = async (e) => {
    if (e) e.preventDefault(); // Prevents page reload on Form Submit

    if (!rollNo.trim()) {
      setError("Please enter Roll Number");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setResult(null);

      const { data } = await axios.post(
        "https://akturesultdesk.vercel.app/api/fetch-result",
        { rollNo }
      );

      setResult(data);
      setOpenSemesters({ 0: true });
    } catch (err) {
      setError(
        err.response?.data?.message || "Unable to fetch result."
      );
    } finally {
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
    <div className="min-h-screen bg-[#0d1424] text-white p-6 selection:bg-blue-500 selection:text-white">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Input Section - Wrapped in Form for Enter Key support */}
        <form onSubmit={fetchResult} className="rounded-xl bg-[#161f33] border border-slate-800 p-6 shadow-xl">
          <h2 className="text-2xl font-bold mb-1">AKTU Result Checker</h2>
          <p className="text-gray-400 text-sm mb-4">Without DOB</p>

          <div className="flex gap-3">
            <input
              type="text"
              value={rollNo}
              onChange={(e) => setRollNo(e.target.value)}
              placeholder="Enter Roll Number"
              className="flex-1 bg-[#0d1424] border border-slate-700 rounded-lg px-4 py-3 text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white font-medium px-6 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {loading ? "Fetching..." : "Get Result"}
            </button>
          </div>

          {error && <p className="text-red-400 font-medium mt-3 text-sm">{error}</p>}
        </form>

        {result && (
          <>
            {/* Student Info Grid matches UI style */}
            <div className="rounded-xl bg-[#161f33] border border-slate-800 shadow-xl p-6">
              <h3 className="text-xl font-bold mb-6 tracking-wide">Student Details</h3>
              <div className="grid md:grid-cols-2 gap-y-5 gap-x-8">
                <Info label="Name" value={result.studentInfo.name} />
                <Info label="Roll No" value={result.studentInfo.rollNo} />
                <Info label="Enrollment" value={result.studentInfo.enrollmentNo} />
                <Info label="Father Name" value={result.studentInfo.fatherName} />
                <Info label="Course" value={result.studentInfo.course} />
                <Info label="Branch" value={result.studentInfo.branch} />
                <div className="md:col-span-2">
                  <Info label="Institute" value={result.studentInfo.institute} />
                </div>
              </div>
            </div>

            {/* Semester Accordions */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold px-1 tracking-wide">Semester Wise Results</h3>
              
              {result.semesters.map((sem, idx) => {
                const isOpen = !!openSemesters[idx];
                const isPass = sem.resultStatus === "PASS";
                
                return (
                  <div key={idx} className="rounded-xl border border-slate-800 shadow-xl overflow-hidden bg-[#161f33]">
                    {/* Header bar matching the clean white block visuals from your UI */}
                    <div
                      onClick={() => toggleSemester(idx)}
                      className="flex justify-between items-center p-5 bg-white text-slate-800 cursor-pointer hover:bg-gray-50 transition-colors select-none"
                    >
                      <div>
                        <p className="text-sm text-gray-400 font-medium">{sem.session}</p>
                        <h4 className="text-base font-bold text-slate-700">Semester {sem.semester}</h4>
                      </div>

                      <div className="flex items-center gap-6">
                        <div className="text-right text-sm hidden sm:flex gap-4">
                          <span><b className="text-slate-500">SGPA:</b> {sem.sgpa}</span>
                          <span><b className="text-slate-500">Marks:</b> {sem.totalMarksObt}</span>
                          <span className={`font-bold ${isPass ? "text-green-600" : "text-red-600"}`}>
                            {isPass ? "PASS" : `CP (${sem.copCount || 0})`}
                          </span>
                        </div>
                        
                        <div className="sm:hidden font-bold text-sm">
                          <span className={isPass ? "text-green-600" : "text-red-600"}>
                            {isPass ? "PASS" : "CP"}
                          </span>
                        </div>

                        <svg
                          className={`w-5 h-5 text-gray-400 transform transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>

                    {/* Expandable Table Content with dark styles */}
                    {isOpen && (
                      <div className="p-5 border-t border-slate-800 bg-[#11192a]">
                        <div className="sm:hidden grid grid-cols-2 gap-3 border-b border-slate-800 pb-4 mb-4 text-xs">
                          <div><span className="text-gray-400">SGPA:</span> {sem.sgpa}</div>
                          <div><span className="text-gray-400">Total Marks:</span> {sem.totalMarksObt}</div>
                        </div>

                        <div className="overflow-x-auto rounded-lg border border-slate-800">
                          <table className="w-full text-left text-sm">
                            <thead className="bg-[#161f33] text-gray-300">
                              <tr>
                                <th className="border-b border-slate-800 p-3">Code</th>
                                <th className="border-b border-slate-800 p-3">Subject</th>
                                <th className="border-b border-slate-800 p-3">Type</th>
                                <th className="border-b border-slate-800 p-3 text-center">Internal</th>
                                <th className="border-b border-slate-800 p-3 text-center">External</th>
                                <th className="border-b border-slate-800 p-3 text-center">Grade</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800 text-gray-300">
                              {sem.subjects.map((sub) => {
                                const isFailed = sub.grade === "F" || sub.grade === "E#";
                                return (
                                  <tr key={sub.code} className={isFailed ? "bg-red-950/30" : "hover:bg-[#161f33]/40"}>
                                    <td className="p-3 font-mono text-xs text-blue-400">{sub.code}</td>
                                    <td className="p-3 text-white font-medium">{sub.name}</td>
                                    <td className="p-3 text-xs text-gray-400">{sub.type}</td>
                                    <td className="p-3 text-center">{sub.internal}</td>
                                    <td className="p-3 text-center">{sub.external}</td>
                                    <td className={`p-3 text-center font-bold ${isFailed ? "text-red-400" : "text-green-400"}`}>
                                      {sub.grade}
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}

        <p className="text-xs text-gray-500 text-center mt-12">
          This is NOT Official Result Portal. For Official Result, Please visit{" "}
          <a href="https://aktu.ac.in/" className="text-blue-400 hover:underline">
            AKTU Official Website
          </a>
        </p>
      </div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <p className="text-xs text-gray-400 font-medium mb-1 uppercase tracking-wider">{label}</p>
      <p className="font-semibold text-gray-100 text-base">{value || "N/A"}</p>
    </div>
  );
}