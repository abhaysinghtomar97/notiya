"use client"
import { useState } from "react";
import axios from "axios";

export default function AktuResult() {
  const [rollNo, setRollNo] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchResult = async () => {
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
        {
          rollNo,
        }
      );

      setResult(data);
    } catch (err) {
      setError(
        err.response?.data?.message || "Unable to fetch result."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <div className=" rounded-xl shadow border p-5">
        <h2 className="text-2xl font-bold mb-4">
          AKTU Result Checker
        </h2>
        <p>Without DOB </p>

        <div className="flex gap-3">
          <input
            type="text"
            value={rollNo}
            onChange={(e) => setRollNo(e.target.value)}
            placeholder="Enter Roll Number"
            className="flex-1 border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={fetchResult}
            disabled={loading}
            className="bg-blue-600 text-white px-6 rounded-lg hover:bg-blue-700"
          >
            {loading ? "Fetching..." : "Get Result"}
          </button>
        </div>

        {error && (
          <p className="text-red-600 mt-3">{error}</p>
        )}
      </div>

      {result && (
        <>
          {/* Student Info */}
          <div className=" rounded-xl border shadow p-6">
            <h3 className="text-xl font-semibold mb-4">
              Student Details
            </h3>

            <div className="grid md:grid-cols-2 gap-3">
              <Info label="Name" value={result.studentInfo.name} />
              <Info label="Roll No" value={result.studentInfo.rollNo} />
              <Info
                label="Enrollment"
                value={result.studentInfo.enrollmentNo}
              />
              <Info
                label="Father Name"
                value={result.studentInfo.fatherName}
              />
              <Info
                label="Course"
                value={result.studentInfo.course}
              />
              <Info
                label="Branch"
                value={result.studentInfo.branch}
              />
              <Info
                label="Institute"
                value={result.studentInfo.institute}
              />
            </div>
          </div>

          {/* Semester Results */}
          {result.semesters.map((sem) => (
            <div
              key={sem.semester}
              className=" rounded-xl border shadow p-6"
            >
              <div className="flex justify-between flex-wrap gap-3 mb-5">
                <div>
                  <h3 className="text-xl font-bold">
                    Semester {sem.semester}
                  </h3>
                  <p className="text-gray-500">
                    {sem.session}
                  </p>
                </div>

                <div className="text-right">
                  <p>
                    <b>SGPA:</b> {sem.sgpa}
                  </p>
                  <p>
                    <b>Status:</b> {sem.resultStatus}
                  </p>
                  <p>
                    <b>Marks:</b> {sem.totalMarksObt}
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border p-2">Code</th>
                      <th className="border p-2">Subject</th>
                      <th className="border p-2">Type</th>
                      <th className="border p-2">Internal</th>
                      <th className="border p-2">External</th>
                      <th className="border p-2">Grade</th>
                    </tr>
                  </thead>

                  <tbody>
                    {sem.subjects.map((sub) => (
                      <tr key={sub.code}>
                        <td className="border p-2">{sub.code}</td>
                        <td className="border p-2">{sub.name}</td>
                        <td className="border p-2">{sub.type}</td>
                        <td className="border p-2">{sub.internal}</td>
                        <td className="border p-2">{sub.external}</td>
                        <td className="border p-2">{sub.grade}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </>
      )}
      <p className="text-gray-400">This is NOT Official Result Portal. For Official Result, Please visit <a href="https://aktu.ac.in/" className="text-blue-300 underline">AKTU Official Website</a> </p>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-semibold">{value}</p>
    </div>
  );
}