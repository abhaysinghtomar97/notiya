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

// Upload directly to R2 while reporting actual browser upload progress.
function uploadFileWithProgress(uploadUrl, file, headers, onProgress) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open("PUT", uploadUrl);

    Object.entries(headers || {}).forEach(([key, value]) => {
      xhr.setRequestHeader(key, value);
    });

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentage = Math.round((event.loaded / event.total) * 100);
        onProgress(percentage);
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve();
      } else {
        reject(
          new Error(
            `PDF upload failed (HTTP ${xhr.status}). Please try again.`
          )
        );
      }
    };

    xhr.onerror = () => {
      reject(
        new Error(
          "A network error interrupted the upload. Check your connection and try again."
        )
      );
    };

    xhr.onabort = () => {
      reject(new Error("The upload was cancelled."));
    };

    xhr.send(file);
  });
}

function formatFileSize(bytes) {
  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(0)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export default function ContributePage() {
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("info");
  const [form, setForm] = useState(INITIAL_FORM);
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileWidgetKey, setTurnstileWidgetKey] = useState(0);

  const [uploadStage, setUploadStage] = useState("idle");
  // idle | preparing | uploading | verifying | success | error
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadMessage, setUploadMessage] = useState("");

  function update(key, value) {
    setForm((old) => ({ ...old, [key]: value }));
  }

  function chooseFile(nextFile) {
    if (busy) return;

    setFile(nextFile);

    if (nextFile) {
      setMessage("");
      setMessageType("info");
      setUploadStage("idle");
      setUploadProgress(0);
      setUploadMessage("");
    }
  }

  async function submit(e) {
    e.preventDefault();

    if (busy) return;

    setMessage("");
    setMessageType("info");

    if (!file) {
      setMessage("Please select a PDF.");
      setMessageType("error");
      return;
    }

    if (
      file.type !== "application/pdf" ||
      !file.name.toLowerCase().endsWith(".pdf")
    ) {
      setMessage("Only PDF files are accepted.");
      setMessageType("error");
      return;
    }

    if (file.size < 8 || file.size > MAX_PDF_SIZE) {
      setMessage("PDF must be between 8 bytes and 50 MB.");
      setMessageType("error");
      return;
    }

    if (!form.permission) {
      setMessage(
        "Please confirm you have permission to share this material."
      );
      setMessageType("error");
      return;
    }

    if (!turnstileToken) {
      setMessage("Please complete the Cloudflare verification.");
      setMessageType("error");
      return;
    }

    setBusy(true);
    setUploadProgress(0);
    setUploadStage("preparing");
    setUploadMessage("Preparing your secure upload...");
    let submissionSucceeded = false;

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
          turnstileToken,
        }),
      });

      const initData = await init.json().catch(() => ({}));

      if (!init.ok) {
        throw new Error(
          initData.error || "Could not start the upload. Please try again."
        );
      }

      if (!initData.uploadUrl || !initData.contributionId) {
        throw new Error("The server returned an incomplete upload response.");
      }

      // Step 2: Upload the PDF directly to private R2 storage.
      setUploadStage("uploading");
      setUploadMessage("Connecting to secure storage...");

      await uploadFileWithProgress(
        initData.uploadUrl,
        file,
        initData.uploadHeaders || { "Content-Type": "application/pdf" },
        (percentage) => {
          setUploadProgress(percentage);

          if (percentage < 20) {
            setUploadMessage("Starting your upload securely...");
          } else if (percentage < 60) {
            setUploadMessage("Your PDF is uploading. Thanks for waiting!");
          } else if (percentage < 90) {
            setUploadMessage("Making good progress. Keep this page open...");
          } else if (percentage < 100) {
            setUploadMessage("Almost there. Finishing the upload...");
          } else {
            setUploadMessage("Upload sent. Preparing the final security check...");
          }
        }
      );

      // Step 3: Verify the uploaded PDF on the server.
      setUploadStage("verifying");
      setUploadMessage(
        "Your PDF has been uploaded. We're checking it before submission..."
      );

      const complete = await fetch(
        `/api/contributions/${encodeURIComponent(
          initData.contributionId
        )}/complete`,
        { method: "POST" }
      );

      const completeData = await complete.json().catch(() => ({}));

      if (!complete.ok) {
        throw new Error(
          completeData.error || "Could not verify the uploaded PDF."
        );
      }

      submissionSucceeded = true;
      setUploadStage("success");
      setUploadProgress(100);
      setUploadMessage(
        "Your contribution is submitted successfully and is pending review."
      );
      setMessageType("success");
      setMessage(
        "Thank you for helping other students learn. The Notiya team will review your material before publication."
      );

      setForm(INITIAL_FORM);
      setFile(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      setUploadStage("error");
      setUploadMessage(
        "The upload could not be completed. Your connection may have been interrupted."
      );
      setMessageType("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setBusy(false);

      // Turnstile tokens are single-use. Request a fresh challenge after an
      // attempt so the next submission does not reuse an expired/used token.
      setTurnstileToken("");
      setTurnstileWidgetKey((key) => key + 1);

      if (submissionSucceeded) {
        // Keep the success state visible until the user starts another upload.
      }
    }
  }

  const inputBaseClasses =
    "block w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 outline-none transition-all focus:border-amber-500 focus:bg-white focus:ring-4 focus:ring-amber-500/10 disabled:cursor-not-allowed disabled:opacity-60";

  const isActiveUpload = [
    "preparing",
    "uploading",
    "verifying",
  ].includes(uploadStage);

  const messageClasses =
    messageType === "success"
      ? "border border-green-200 bg-green-50 text-green-800"
      : messageType === "error"
        ? "border border-red-200 bg-red-50 text-red-800"
        : "border border-amber-200 bg-amber-50 text-amber-800";

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
          Share useful notes and previous year papers with students. Every
          upload is reviewed before publication to maintain quality.
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
              disabled={busy}
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
              disabled={busy}
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
              disabled={busy}
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
              disabled={busy}
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
              disabled={busy}
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
              disabled={busy}
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
            disabled={busy}
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

          <div
            className={`relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed py-8 text-center transition-colors ${
              busy
                ? "cursor-not-allowed border-gray-200 bg-gray-100"
                : "cursor-pointer border-gray-300 bg-gray-50 hover:border-amber-400 hover:bg-amber-50/50"
            }`}
          >
            <input
              ref={fileInputRef}
              required={!file}
              type="file"
              accept="application/pdf,.pdf"
              disabled={busy}
              className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0 disabled:cursor-not-allowed"
              onChange={(e) => chooseFile(e.target.files?.[0] || null)}
            />

            <svg
              className="mb-3 h-8 w-8 text-gray-400"
              fill="none"
              strokeWidth="1.5"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12l-3-3m0 0l-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
              />
            </svg>

            {file ? (
              <span className="max-w-full break-all px-4 text-sm font-semibold text-amber-700">
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

            {file && (
              <span className="mt-1 text-xs text-gray-500">
                {formatFileSize(file.size)}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-start gap-3 rounded-xl border border-gray-200 bg-gray-50 p-4">
          <div className="flex h-5 items-center">
            <input
              type="checkbox"
              required
              disabled={busy}
              checked={form.permission}
              onChange={(e) => update("permission", e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-amber-600 focus:ring-amber-600 disabled:opacity-60"
            />
          </div>
          <div className="text-sm">
            <label className="font-medium text-gray-900">
              Content Permission Guarantee{" "}
              <span className="text-red-500">*</span>
            </label>
            <p className="text-gray-600">
              I created this material or have permission to share it. I
              understand Notiya will review it before publication.
            </p>
          </div>
        </div>

        {message && (
          <div
            role="status"
            aria-live="polite"
            className={`flex items-start gap-2 rounded-xl p-4 text-sm font-medium ${messageClasses}`}
          >
            <span aria-hidden="true">
              {messageType === "success"
                ? "✓"
                : messageType === "error"
                  ? "!"
                  : "ⓘ"}
            </span>
            <span>{message}</span>
          </div>
        )}

        {/* Upload progress panel */}
        {uploadStage !== "idle" && (
          <section
            className="rounded-2xl border border-amber-100 bg-white p-5 shadow-sm sm:p-6"
            aria-live="polite"
            aria-label="Contribution upload status"
          >
            <div className="flex items-start gap-3">
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-xl ${
                  uploadStage === "success"
                    ? "bg-green-50 text-green-600"
                    : uploadStage === "error"
                      ? "bg-red-50 text-red-600"
                      : "bg-amber-50 text-amber-700"
                }`}
              >
                {uploadStage === "success"
                  ? "✓"
                  : uploadStage === "error"
                    ? "!"
                    : "📄"}
              </div>

              <div className="min-w-0 flex-1">
                <h2 className="font-semibold text-gray-900">
                  {uploadStage === "preparing" && "Preparing your upload"}
                  {uploadStage === "uploading" && "Uploading your PDF"}
                  {uploadStage === "verifying" && "Checking your PDF"}
                  {uploadStage === "success" && "Contribution submitted"}
                  {uploadStage === "error" && "Upload needs attention"}
                </h2>
                <p className="mt-1 break-words text-sm leading-relaxed text-gray-600">
                  {uploadMessage}
                </p>
              </div>

              {uploadStage === "uploading" && (
                <span className="shrink-0 text-sm font-bold tabular-nums text-amber-700">
                  {uploadProgress}%
                </span>
              )}
            </div>

            {isActiveUpload && (
              <div className="mt-5">
                <div
                  className="h-2.5 overflow-hidden rounded-full bg-gray-100"
                  role="progressbar"
                  aria-label="PDF upload progress"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={
                    uploadStage === "uploading" ? uploadProgress : undefined
                  }
                >
                  <div
                    className={`h-full rounded-full bg-amber-600 transition-[width] duration-300 ${
                      uploadStage === "verifying" ? "animate-pulse" : ""
                    }`}
                    style={{
                      width:
                        uploadStage === "uploading"
                          ? `${uploadProgress}%`
                          : "100%",
                    }}
                  />
                </div>

                <div className="mt-4 space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100 text-xs font-bold text-green-700">
                      ✓
                    </span>
                    <span className="text-gray-700">
                      Verification completed
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-sm">
                    <span
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                        uploadStage === "uploading"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {uploadStage === "uploading" ? "↑" : "✓"}
                    </span>
                    <span
                      className={
                        uploadStage === "uploading"
                          ? "font-medium text-gray-900"
                          : "text-gray-700"
                      }
                    >
                      Secure PDF upload
                      {uploadStage === "uploading"
                        ? ` — ${uploadProgress}%`
                        : uploadStage === "verifying"
                          ? " — sent"
                          : ""}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-sm">
                    <span
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                        uploadStage === "verifying"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      {uploadStage === "verifying" ? "…" : "3"}
                    </span>
                    <span
                      className={
                        uploadStage === "verifying"
                          ? "font-medium text-gray-900"
                          : "text-gray-500"
                      }
                    >
                      Final file security check
                    </span>
                  </div>
                </div>

                <p className="mt-4 rounded-xl bg-amber-50 p-3 text-xs leading-relaxed text-amber-900">
                  {uploadStage === "preparing"
                    ? "We're preparing a secure upload link. This usually takes only a moment."
                    : uploadStage === "uploading"
                      ? "Larger PDFs or slower connections can take a few minutes. Please keep this page open; the percentage reflects actual upload progress."
                      : "The file has been sent. Please wait while we verify it before marking your contribution as submitted."}
                </p>
              </div>
            )}

            {uploadStage === "success" && (
              <div className="mt-4 rounded-xl border border-green-100 bg-green-50 p-3 text-sm leading-relaxed text-green-800">
                Thank you for contributing to Notiya. Your material is pending
                review and won't be published until it has been reviewed.
              </div>
            )}

            {uploadStage === "error" && (
              <div className="mt-4 rounded-xl border border-red-100 bg-red-50 p-3 text-sm leading-relaxed text-red-800">
                Check your connection and try again. If the upload reached
                storage but final verification failed, contact the Notiya team
                before repeatedly submitting the same file.
              </div>
            )}
          </section>
        )}

        <div className="flex flex-col items-center gap-3 pt-2">
          <Turnstile
            key={turnstileWidgetKey}
            siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
            onSuccess={(token) => setTurnstileToken(token)}
            onExpire={() => setTurnstileToken("")}
            onError={() => setTurnstileToken("")}
          />
          {!turnstileToken && !busy && (
            <p className="text-center text-xs text-gray-500">
              Complete Cloudflare verification before submitting.
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={busy || !turnstileToken || uploadStage === "success"}
          className="group relative flex w-full items-center justify-center gap-2 rounded-xl bg-amber-600 px-5 py-3.5 text-base font-semibold text-white shadow-sm transition-all hover:bg-amber-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 disabled:cursor-not-allowed disabled:bg-amber-600/60 disabled:shadow-none"
        >
          {busy ? (
            <>
              <svg
                className="h-5 w-5 animate-spin text-white"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              {uploadStage === "preparing" && "Preparing secure upload..."}
              {uploadStage === "uploading" &&
                `Uploading PDF — ${uploadProgress}%`}
              {uploadStage === "verifying" && "Verifying your PDF..."}
            </>
          ) : uploadStage === "success" ? (
            "Contribution submitted ✓"
          ) : uploadStage === "error" ? (
            "Try again"
          ) : (
            "Submit contribution"
          )}
        </button>
      </form>
    </main>
  );
}
