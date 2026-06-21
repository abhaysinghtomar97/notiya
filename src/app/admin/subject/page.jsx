"use client";
import axios from "axios";
import { useState } from "react";
import toast ,{ Toaster } from "react-hot-toast";

export default function SubjectForm() {
  const [subject, setSubject] = useState({
    university: "",
    course: "",
    year: "",
    semester: "",
    branch: "all",

    subjectCode: "",
    subjectName: "",
    description: "",

    importantTopics: "",
    keywords: "",

    isPublished: true,
  }); 
  const [loading, setLoading] = useState(false)

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setSubject((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(e) {
    setLoading(true)
    e.preventDefault();
try {
    const payload = {
      ...subject,

      importantTopics: subject.importantTopics
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),

      seo: {
        keywords: subject.keywords
          .split(",")
          .map((k) => k.trim())
          .filter(Boolean),
      },
    };

    
     await axios.post('/api/admin/subject',payload)
    } catch (error) {
      toast.error(error.message)
      
    }finally{
      setLoading(false)
    }
   

    
  }
  
  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto space-y-6"
    >

        <Toaster />
      <h1 className="text-3xl font-bold">
        Add Subject
      </h1>

      <input
        name="university"
        placeholder="University"
        value={subject.university}
        onChange={handleChange}
        className="border p-3 rounded w-full"
      />

      <input
        name="course"
        placeholder="Course"
        value={subject.course}
        onChange={handleChange}
        className="border p-3 rounded w-full"
      />

      <input
        name="year"
        placeholder="Year"
        value={subject.year}
        onChange={handleChange}
        className="border p-3 rounded w-full"
      />

      <input
        name="semester"
        type="number"
        placeholder="Semester"
        value={subject.semester}
        onChange={handleChange}
        className="border p-3 rounded w-full"
      />

      <input
        name="branch"
        placeholder="Branch (CSE / ECE / all)"
        value={subject.branch}
        onChange={handleChange}
        className="border p-3 rounded w-full"
      />

      <input
        name="subjectCode"
        placeholder="Subject Code"
        value={subject.subjectCode}
        onChange={handleChange}
        className="border p-3 rounded w-full"
      />

      <input
        name="subjectName"
        placeholder="Subject Name"
        value={subject.subjectName}
        onChange={handleChange}
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
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-800 active:bg-green-600"
      >
        Save Subject
      </button>
    </form>
  );
}