"use client";
import axios from "axios";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const initialSubjectState = {
  university: "",
  course: "",
  year: "",
  semester: "",
  branches: "", // Changed from 'branch: "all"' to 'branches: ""'
  subjectCode: "",
  subjectName: "",
  description: "",
  importantTopics: "",
  keywords: "",
  isPublished: true,
};

export default function SubjectForm() {
  const [subject, setSubject] = useState(initialSubjectState);
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setSubject((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const { keywords, branches, ...restSubject } = subject;

      const payload = {
        ...restSubject,
        semester: restSubject.semester ? Number(restSubject.semester) : "",
        
        // Convert comma-separated string to an array and uppercase it
        branches: branches
          .split(",")
          .map((b) => b.trim().toUpperCase())
          .filter(Boolean),

        importantTopics: restSubject.importantTopics
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),

        seo: {
          keywords: keywords
            .split(",")
            .map((k) => k.trim())
            .filter(Boolean),
        },
      };

      await axios.post("/api/admin/subject", payload);
      
      // Success feedback and form reset
      toast.success("Subject added successfully!");
      setSubject(initialSubjectState);

    } catch (error) {
      // Better error targeting for Axios
      const errorMessage = error.response?.data?.message || error.message || "Something went wrong";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6">
      <Toaster />
      <h1 className="text-3xl font-bold">Add Subject</h1>

      <input
        name="university"
        placeholder="University"
        value={subject.university}
        onChange={handleChange}
        required
        className="border p-3 rounded w-full"
      />

      <input
        name="course"
        placeholder="Course"
        value={subject.course}
        onChange={handleChange}
        required
        className="border p-3 rounded w-full"
      />

      <input
        name="year"
        placeholder="Year"
        value={subject.year}
        onChange={handleChange}
        required
        className="border p-3 rounded w-full"
      />

      <input
        name="semester"
        type="number"
        placeholder="Semester"
        value={subject.semester}
        onChange={handleChange}
        required
        className="border p-3 rounded w-full"
      />

      <input
        name="branches"
        placeholder="Branches (e.g., CSE, CS-AI, ECE or ALL)"
        value={subject.branches}
        onChange={handleChange}
        required
        className="border p-3 rounded w-full"
      />

      <input
        name="subjectCode"
        placeholder="Subject Code"
        value={subject.subjectCode}
        onChange={handleChange}
        required
        className="border p-3 rounded w-full"
      />

      <input
        name="subjectName"
        placeholder="Subject Name"
        value={subject.subjectName}
        onChange={handleChange}
        required
        className="border p-3 rounded w-full"
      />

      <textarea
        name="description"
        placeholder="Description"
        value={subject.description}
        onChange={handleChange}
        rows={5}
        className="border p-3 rounded w-full"
      />

      <textarea
        name="importantTopics"
        placeholder="Important Topics (comma separated)"
        value={subject.importantTopics}
        onChange={handleChange}
        rows={4}
        className="border p-3 rounded w-full"
      />

      <textarea
        name="keywords"
        placeholder="SEO Keywords (comma separated)"
        value={subject.keywords}
        onChange={handleChange}
        rows={4}
        className="border p-3 rounded w-full"
      />

      <label className="flex items-center gap-3">
        <input
          type="checkbox"
          name="isPublished"
          checked={subject.isPublished}
          onChange={handleChange}
        />
        Published
      </label>

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-800 active:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        {loading ? "Saving..." : "Save Subject"}
      </button>
    </form>
  );
}