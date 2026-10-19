"use client";

import { useCallback, useEffect, useState } from "react";

export default function AdminContributionsPage() {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("pending_review");
  const [busyId, setBusyId] = useState("");
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setError("");

    try {
      const res = await fetch(
        `/api/admin/contributions?status=${encodeURIComponent(status)}`,
        { cache: "no-store" }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Could not load contributions.");
      }

      setItems(data.contributions || []);
    } catch (err) {
      setError(err.message || "Failed to load contributions.");
    }
  }, [status]);

  useEffect(() => {
    load();
  }, [load]);

  async function decide(id, decision) {
    const reviewerNote =
      window.prompt(
        decision === "reject"
          ? "Reason for rejection (optional):"
          : "Review note (optional):"
      ) || "";

    if (
      decision === "reject" &&
      !window.confirm("Are you sure you want to reject this contribution?")
    ) {
      return;
    }

    setBusyId(id);
    setError("");

    try {
      const res = await fetch(
        `/api/admin/contributions/${encodeURIComponent(id)}/decision`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ decision, reviewerNote }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Decision failed.");
      }

      await load();
    } catch (err) {
      setError(err.message || "Decision failed.");
    } finally {
      setBusyId("");
    }
  }

  // Helper for semantic badge colors
  const getStatusStyles = (currentStatus) => {
    switch (currentStatus) {
      case "approved":
        return "bg-green-50 text-green-700 ring-green-600/20";
      case "rejected":
        return "bg-red-50 text-red-700 ring-red-600/20";
      case "pending_review":
        return "bg-yellow-50 text-yellow-800 ring-yellow-600/20";
      default:
        return "bg-gray-50 text-gray-700 ring-gray-600/20";
    }
  };

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Dashboard Header */}
      <header className="flex flex-col items-start justify-between gap-4 border-b border-gray-200 pb-6 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-amber-700">
            Admin Dashboard
          </p>
          <h1 className="mt-1 text-2xl font-bold text-gray-900 sm:text-3xl">
            Contribution Review
          </h1>
        </div>

        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
          <div className="relative">
            <select
              aria-label="Filter contributions by status"
              className="w-full appearance-none rounded-xl border border-gray-200 bg-white py-2.5 pl-4 pr-10 text-sm font-medium text-gray-700 shadow-sm outline-none transition focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 sm:w-48"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              {["pending_review", "approved", "rejected", "uploading"].map(
                (value) => (
                  <option key={value} value={value}>
                    {value.replace("_", " ")}
                  </option>
                )
              )}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          <button
            onClick={load}
            className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-200"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh
          </button>
        </div>
      </header>

      {error && (
        <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4">
          <div className="flex">
            <svg className="mt-0.5 h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
            </svg>
            <p className="ml-3 text-sm font-medium text-red-800">{error}</p>
          </div>
        </div>
      )}

      <section className="mt-8 space-y-6">
        {items.map((item) => (
          <article
            key={item.id}
            className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md"
          >
            {/* Card Header */}
            <div className="flex flex-col gap-4 border-b border-gray-100 bg-gray-50/50 p-6 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">{item.subject}</h2>
                <div className="mt-1.5 flex flex-wrap items-center gap-2 text-sm text-gray-500">
                  <span className="font-medium text-gray-700">{item.type}</span>
                  <span>•</span>
                  <span>{item.university}</span>
                  <span>•</span>
                  <span>{item.branch}</span>
                  <span>•</span>
                  <span>{item.semester}</span>
                </div>
              </div>
              <span
                className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold capitalize ring-1 ring-inset ${getStatusStyles(
                  item.status
                )}`}
              >
                {item.status.replace("_", " ")}
              </span>
            </div>

            {/* Card Body (Metadata Grid) */}
            <div className="grid gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Contributor
                </p>
                <p className="mt-1.5 text-sm font-medium text-gray-900">{item.name}</p>
                <p className="text-sm text-gray-500">{item.email}</p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                  File Information
                </p>
                <div className="mt-1.5 flex items-center gap-2 text-sm font-medium text-gray-900">
                  <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="truncate">{item.originalFilename}</span>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">
                  {(item.fileSize / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Submission Date
                </p>
                <p className="mt-1.5 text-sm font-medium text-gray-900">
                  {new Date(item.createdAt).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(item.createdAt).toLocaleTimeString(undefined, {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>

            {item.reviewerNote && (
              <div className="border-t border-gray-100 bg-amber-50/30 px-6 py-4">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold text-amber-800">Reviewer note:</span>{" "}
                  {item.reviewerNote}
                </p>
              </div>
            )}

            {/* Card Footer (Actions) */}
            <div className="flex flex-col-reverse gap-4 border-t border-gray-100 bg-gray-50/50 p-6 sm:flex-row sm:items-center sm:justify-between">
              {item.previewUrl ? (
                <a
                  href={item.previewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-amber-600 transition hover:text-amber-700"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Preview Document
                </a>
              ) : (
                <span /> // Empty placeholder to keep flex spacing correct
              )}

              {status === "pending_review" && (
                <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                  <button
                    disabled={busyId === item.id}
                    onClick={() => decide(item.id, "reject")}
                    className="flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-red-600 shadow-sm ring-1 ring-inset ring-gray-300 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Reject
                  </button>
                  <button
                    disabled={busyId === item.id}
                    onClick={() => decide(item.id, "approve")}
                    className="flex items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-600/20 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {busyId === item.id ? (
                      <svg className="h-4 w-4 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                    ) : (
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                    {busyId === item.id ? "Processing..." : "Approve & Publish"}
                  </button>
                </div>
              )}
            </div>
          </article>
        ))}

        {items.length === 0 && !error && (
          <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 py-16 text-center">
            <div className="rounded-full bg-white p-4 shadow-sm ring-1 ring-gray-200">
              <svg className="h-8 w-8 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-900">No contributions found</h3>
            <p className="mt-1 text-sm text-gray-500">
              There are currently no items in the <span className="font-medium">"{status.replace("_", " ")}"</span> status.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}