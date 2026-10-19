"use client";

import { useRef, useState } from "react";

const TYPES = [
  "Handwritten notes",
  "Typed notes",
  "Previous year question paper",
  "Solved assignment",
  "Other",
];

const MAX_PDF_SIZE = 50 * 1024 * 1024; // 50 MB

const INITIAL_FORM = {
  name: "",
  email: "",
  university: "AKTU",
  branch: "Other",
  semester: "4th Semester",
  subject: "",
  type: "Previous year question paper",
  permission: true,
};

export default function ContributePage() {
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [form, setForm] = useState(INITIAL_FORM);
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  function update(key, value) {
    setForm((old) => ({ ...old, [key]: value }));
  }

  async function submit(e) {
    e.preventDefault();
    setMessage("");

    if (!file) {
      setMessage("Please select a PDF.");
      return;
    }

    if (
      file.type !== "application/pdf" ||
      !file.name.toLowerCase().endsWith(".pdf")
    ) {
      setMessage("Only PDF files are accepted.");
      return;
    }

    if (file.size < 8 || file.size > MAX_PDF_SIZE) {
      setMessage("PDF must be between 8 bytes and 50 MB.");
      return;
    }

    if (!form.permission) {
      setMessage(
        "Please confirm you have permission to share this material."
      );
      return;
    }

    setBusy(true);

    try {
      // Step 1: Initialize the contribution and get a presigned upload URL.
      const init = await fetch("/api/contributions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          originalFilename: file.name,
          fileSize: file.size,
          contentType: "application/pdf",
        }),
      });

      const initData = await init.json();

      if (!init.ok) {
        throw new Error(
          initData.error || "Could not start the upload."
        );
      }

      // Step 2: Upload the PDF directly to private R2 storage.
      const uploaded = await fetch(initData.uploadUrl, {
        method: "PUT",
        headers: initData.uploadHeaders,
        body: file,
      });

      if (!uploaded.ok) {
        throw new Error(
          "PDF upload failed. Please try submitting again."
        );
      }

      // Step 3: Ask the server to verify the uploaded PDF.
      const complete = await fetch(
        `/api/contributions/${encodeURIComponent(initData.contributionId)}/complete`,
        { method: "POST" }
      );

      const completeData = await complete.json();

      if (!complete.ok) {
        throw new Error(
          completeData.error ||
            "Could not verify the uploaded PDF."
        );
      }

      setMessage(
        "Thank you! Your PDF was uploaded successfully and is pending review by the Notiya team."
      );

      setForm(INITIAL_FORM);
      setFile(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setBusy(false);
    }
  }

  const field =
    "w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-100";

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <div className="mb-7">
        <p className="text-sm font-semibold uppercase tracking-wide text-amber-700">
          Notiya community
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          Contribute study material
        </h1>

        <p className="mt-2 text-gray-600">
          Share useful notes and previous year papers with students.
          Every upload is reviewed before publication.
        </p>
      </div>

      <form
        onSubmit={submit}
        className="space-y-5 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-medium">
            Your name
            <input
              required
              minLength={2}
              maxLength={100}
              className={`${field} mt-1`}
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
            />
          </label>

          <label className="block text-sm font-medium">
            Email address
            <input
              required
              type="email"
              maxLength={254}
              className={`${field} mt-1`}
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
            />
          </label>

          <label className="block text-sm font-medium">
            University
            <select
              className={`${field} mt-1`}
              value={form.university}
              onChange={(e) => update("university", e.target.value)}
            >
              {[
                "AKTU",
                "PSIT Autonomous",
                "CSJMU",
                "GL Bajaj",
                "Other",
              ].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </label>

          <label className="block text-sm font-medium">
            Branch
            <select
              className={`${field} mt-1`}
              value={form.branch}
              onChange={(e) => update("branch", e.target.value)}
            >
              {["CSE", "IT", "ECE", "EE", "ME", "CE", "Other"].map(
                (value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                )
              )}
            </select>
          </label>

          <label className="block text-sm font-medium">
            Semester
            <select
              className={`${field} mt-1`}
              value={form.semester}
              onChange={(e) => update("semester", e.target.value)}
            >
              {Array.from({ length: 8 }, (_, i) => {
                const suffix =
                  ["st", "nd", "rd"][i] || "th";
                return `${i + 1}${suffix} Semester`;
              }).map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </label>

          <label className="block text-sm font-medium">
            Contribution type
            <select
              className={`${field} mt-1`}
              value={form.type}
              onChange={(e) => update("type", e.target.value)}
            >
              {TYPES.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label className="block text-sm font-medium">
          Subject
          <input
            required
            minLength={2}
            maxLength={160}
            className={`${field} mt-1`}
            placeholder="e.g. Signals and Systems"
            value={form.subject}
            onChange={(e) => update("subject", e.target.value)}
          />
        </label>

        <label className="block text-sm font-medium">
          PDF file
          <input
            ref={fileInputRef}
            required
            type="file"
            accept="application/pdf,.pdf"
            className={`${field} mt-1 file:mr-3 file:rounded-md file:border-0 file:bg-amber-50 file:px-3 file:py-1 file:font-medium file:text-amber-800`}
            onChange={(e) =>
              setFile(e.target.files?.[0] || null)
            }
          />

          <span className="mt-1 block text-xs text-gray-500">
            PDF only. Maximum 50 MB. Files remain private until
            approved.
          </span>
        </label>

        <label className="flex items-start gap-3 text-sm text-gray-700">
          <input
            type="checkbox"
            required
            checked={form.permission}
            onChange={(e) =>
              update("permission", e.target.checked)
            }
            className="mt-1 accent-amber-600"
          />

          <span>
            I created this material or have permission to share it.
            I understand Notiya will review it before publication.
          </span>
        </label>

        <button
          type="submit"
          disabled={busy}
          className="w-full rounded-xl bg-amber-600 px-5 py-3 font-semibold text-white transition hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {busy ? "Uploading securely…" : "Submit contribution"}
        </button>

        {message && (
          <p
            role="status"
            aria-live="polite"
            className="rounded-lg bg-gray-50 p-3 text-sm text-gray-700"
          >
            {message}
          </p>
        )}
      </form>
    </main>
  );
}
