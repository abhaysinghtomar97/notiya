
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

//   async function logout() {
//     try {
//       await fetch("/api/admin/logout", { method: "POST" });
//     } finally {
//       window.location.href = "/admin/login";
//     }
//   }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
         
          <h1 className="mt-1 text-3xl font-bold">
            Contribution Review
          </h1>
        </div>

        
      </header>

      <section className="mt-6 flex flex-wrap gap-3">
        <select
          aria-label="Filter contributions by status"
          className="rounded-lg border px-3 py-2"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          {[
            "pending_review",
            "approved",
            "rejected",
            "uploading",
          ].map((value) => (
            <option key={value} value={value}>
              {value.replace("_", " ")}
            </option>
          ))}
        </select>

        <button
          onClick={load}
          className="rounded-lg border px-4 py-2 text-sm hover:bg-gray-50"
        >
          Refresh
        </button>
      </section>

      {error && (
        <p
          role="alert"
          className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700"
        >
          {error}
        </p>
      )}

      <section className="mt-5 space-y-4">
        {items.map((item) => (
          <article
            key={item.id}
            className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold">{item.subject}</h2>
                <p className="mt-1 text-sm text-gray-600">
                  {item.type} · {item.university} · {item.branch} ·{" "}
                  {item.semester}
                </p>
              </div>

              <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800">
                {item.status}
              </span>
            </div>

            <div className="mt-3 grid gap-1 text-sm text-gray-700 sm:grid-cols-2">
              <p>
                <b>Contributor:</b> {item.name} ({item.email})
              </p>

              <p>
                <b>File:</b> {item.originalFilename} ·{" "}
                {(item.fileSize / (1024 * 1024)).toFixed(2)} MB
              </p>

              <p>
                <b>Submitted:</b>{" "}
                {new Date(item.createdAt).toLocaleString()}
              </p>
            </div>

            {item.reviewerNote && (
              <p className="mt-2 text-sm text-gray-600">
                <b>Reviewer note:</b> {item.reviewerNote}
              </p>
            )}

            {item.previewUrl && (
              <a
                href={item.previewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block text-sm font-semibold text-amber-700 underline"
              >
                Preview PDF
              </a>
            )}

            {status === "pending_review" && (
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  disabled={busyId === item.id}
                  onClick={() => decide(item.id, "approve")}
                  className="rounded-lg bg-green-700 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
                >
                  {busyId === item.id
                    ? "Processing..."
                    : "Approve & Publish"}
                </button>

                <button
                  disabled={busyId === item.id}
                  onClick={() => decide(item.id, "reject")}
                  className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
                >
                  Reject
                </button>
              </div>
            )}
          </article>
        ))}

        {items.length === 0 && !error && (
          <p className="rounded-xl border border-dashed p-8 text-center text-gray-500">
            No contributions in this status.
          </p>
        )}
      </section>
    </main>
  );
}
