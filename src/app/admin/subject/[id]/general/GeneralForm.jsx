"use client";

import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function GeneralForm({ subject }) {
  const [form, setForm] = useState({
    ...subject,
    subjectName: subject.subjectName ?? "",
    subjectCode: subject.subjectCode ?? "",
    description: subject.description ?? "",
    semester: subject.semester ?? "",
    branch: subject.branch ?? "",
    isPublished: subject.isPublished ?? true,
    seo: {
      keywords: subject.seo?.keywords ?? [],
    },
  });

  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);

      await axios.put(
        `/api/admin/subject/${subject._id}`,
        form
      );

      toast.success("Subject Updated");
    } catch (err) {
      console.error(err);
      toast.error("Update Failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div>
        <label>Subject Name</label>

        <input
          className="border p-3 rounded w-full"
          name="subjectName"
          value={form.subjectName ?? ""}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Subject Code</label>

        <input
          className="border p-3 rounded w-full"
          name="subjectCode"
          value={form.subjectCode ?? ""}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Description</label>

        <textarea
          rows={5}
          className="border p-3 rounded w-full"
          name="description"
          value={form.description ?? ""}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-2 gap-5">
        <div>
          <label>Semester</label>

          <input
            type="number"
            className="border p-3 rounded w-full"
            name="semester"
            value={form.semester ?? ""}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Branch</label>

          <input
            className="border p-3 rounded w-full"
            name="branch"
            value={form.branch ?? ""}
            onChange={handleChange}
          />
        </div>
      </div>

      <div>
        <label>SEO Keywords</label>

        <textarea
          rows={4}
          className="border p-3 rounded w-full"
          value={(form.seo?.keywords ?? []).join(", ")}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              seo: {
                ...prev.seo,
                keywords: e.target.value
                  .split(",")
                  .map((item) => item.trim())
                  .filter(Boolean),
              },
            }))
          }
        />
      </div>

      <label className="flex gap-3 items-center">
        <input
          type="checkbox"
          name="isPublished"
          checked={form.isPublished ?? false}
          onChange={handleChange}
        />

        Published
      </label>

      <button
        disabled={loading}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg disabled:opacity-50"
      >
        {loading ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
}