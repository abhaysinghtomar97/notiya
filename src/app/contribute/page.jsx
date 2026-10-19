"use client";

import { useRef, useState } from "react";
import { Turnstile } from "@marsidev/react-turnstile";


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
  const [turnstileToken, setTurnstileToken] = useState("");

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

 const inputBaseClasses =
    "block w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 outline-none transition-all focus:border-amber-500 focus:bg-white focus:ring-4 focus:ring-amber-500/10";

  return (
    <main className="mx-auto max-w-2xl px-4 py-12 sm:py-16">
      <div className="mb-8 text-center sm:text-left">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-amber-700 ring-1 ring-inset ring-amber-600/20">
          Notiya Community
        </span>

        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Contribute study material
        </h1>

        <p className="mt-3 text-base leading-relaxed text-gray-600 sm:text-lg">
          Share useful notes and previous year papers with students. Every upload
          is reviewed before publication to maintain quality.
        </p>
      </div>

      <form
        onSubmit={submit}
        className="space-y-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-xl shadow-gray-200/40 sm:p-8"
      >
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">
              Your name <span className="text-red-500">*</span>
            </label>
            <input
              required
              minLength={2}
              maxLength={100}
              className={inputBaseClasses}
              placeholder="John Doe"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">
              Email address <span className="text-red-500">*</span>
            </label>
            <input
              required
              type="email"
              maxLength={254}
              className={inputBaseClasses}
              placeholder="john@example.com"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">
              University <span className="text-red-500">*</span>
            </label>
            <select
              className={inputBaseClasses}
              value={form.university}
              onChange={(e) => update("university", e.target.value)}
            >
              {["AKTU", "PSIT Autonomous", "CSJMU", "GL Bajaj", "Other"].map(
                (value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                )
              )}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">
              Branch <span className="text-red-500">*</span>
            </label>
            <select
              className={inputBaseClasses}
              value={form.branch}
              onChange={(e) => update("branch", e.target.value)}
            >
              {["CSE", "IT", "ECE", "EE", "ME", "CE", "Other"].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">
              Semester <span className="text-red-500">*</span>
            </label>
            <select
              className={inputBaseClasses}
              value={form.semester}
              onChange={(e) => update("semester", e.target.value)}
            >
              {Array.from({ length: 8 }, (_, i) => {
                const suffix = ["st", "nd", "rd"][i] || "th";
                return `${i + 1}${suffix} Semester`;
              }).map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">
              Contribution type <span className="text-red-500">*</span>
            </label>
            <select
              className={inputBaseClasses}
              value={form.type}
              onChange={(e) => update("type", e.target.value)}
            >
              {TYPES.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700">
            Subject <span className="text-red-500">*</span>
          </label>
          <input
            required
            minLength={2}
            maxLength={160}
            className={inputBaseClasses}
            placeholder="e.g. Signals and Systems"
            value={form.subject}
            onChange={(e) => update("subject", e.target.value)}
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700">
            Material File (PDF) <span className="text-red-500">*</span>
          </label>
          <div className="relative flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 py-8 text-center transition-colors hover:border-amber-400 hover:bg-amber-50/50">
            <input
              ref={fileInputRef}
              required
              type="file"
              accept="application/pdf,.pdf"
              className="absolute inset-0 z-50 h-full w-full cursor-pointer opacity-0"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
            <svg
              className="mb-3 h-8 w-8 text-gray-400"
              fill="none"
              strokeWidth="1.5"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12l-3-3m0 0l-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
              />
            </svg>
            {/* Note: Ensure 'file' variable is accessible here from your state */}
            {typeof file !== 'undefined' && file ? (
              <span className="text-sm font-semibold text-amber-600">
                {file.name}
              </span>
            ) : (
              <>
                <span className="text-sm font-medium text-gray-900">
                  Click to upload or drag and drop
                </span>
                <span className="mt-1 text-xs text-gray-500">
                  PDF format only. Maximum 50 MB.
                </span>
              </>
            )}
          </div>
        </div>

        <div className="flex items-start gap-3 rounded-xl border border-gray-200 bg-gray-50 p-4">
          <div className="flex h-5 items-center">
            <input
              type="checkbox"
              required
              checked={form.permission}
              onChange={(e) => update("permission", e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-amber-600 focus:ring-amber-600"
            />
          </div>
          <div className="text-sm">
            <label className="font-medium text-gray-900">
              Content Permission Guarantee <span className="text-red-500">*</span>
            </label>
            <p className="text-gray-600">
              I created this material or have permission to share it. I understand
              Notiya will review it before publication.
            </p>
          </div>
        </div>

        {message && (
          <div
            role="status"
            aria-live="polite"
            className="flex items-center gap-2 rounded-xl bg-amber-50 p-4 text-sm font-medium text-amber-800"
          >
            <svg className="h-5 w-5 text-amber-600" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
            </svg>
            {message}
          </div>
        )}

        <div className="flex justify-center pt-2">
          <Turnstile
            siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
            onSuccess={(token) => setTurnstileToken(token)}
            onExpire={() => setTurnstileToken("")}
            onError={() => setTurnstileToken("")}
          />
        </div>

        <button
          type="submit"
          disabled={busy || !turnstileToken}
          className="group relative flex w-full items-center justify-center gap-2 rounded-xl bg-amber-600 px-5 py-3.5 text-base font-semibold text-white shadow-sm transition-all hover:bg-amber-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 disabled:cursor-not-allowed disabled:bg-amber-600/60 disabled:shadow-none"
        >
          {busy ? (
            <>
              <svg className="h-5 w-5 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Uploading securely…
            </>
          ) : (
            "Submit contribution"
          )}
        </button>
      </form>
    </main>
  );
}
