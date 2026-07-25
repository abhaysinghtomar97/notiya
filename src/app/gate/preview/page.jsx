// src/app/gate/preview/page.jsx
import Link from "next/link";

export const metadata = {
    title: "GATE Paper Preview | Notiya",
    description: "Preview GATE previous year question papers and answer keys.",
};

export default async function PdfPreviewPage({ searchParams }) {
    const resolvedSearchParams = await searchParams;
    const pdfUrl = resolvedSearchParams.url;

    if (!pdfUrl) {
        return (
            <main className="flex min-h-[70vh] items-center justify-center px-4">
                <div
                    className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm
                               dark:border-gray-800 dark:bg-gray-900"
                >
                    {/* Icon */}
                    <div
                        className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl
                                   bg-amber-50 text-amber-600
                                   dark:bg-amber-950/40 dark:text-amber-400"
                    >
                        <svg
                            className="h-7 w-7"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 9v2m0 4h.01M5.07 19h13.86a2 2 0 001.74-3L13.74 4a2 2 0 00-3.48 0L3.33 16a2 2 0 001.74 3z"
                            />
                        </svg>
                    </div>

                    <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                        PDF Not Available
                    </h1>

                    <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
                        We couldn't find a PDF to preview. Please return to the
                        GATE papers page and select a paper.
                    </p>

                    <Link
                        href="/gate"
                        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-amber-600
                                   px-5 py-2.5 text-sm font-semibold text-white shadow-sm
                                   transition-all hover:bg-amber-700 hover:shadow-md
                                   dark:hover:bg-amber-500"
                    >
                        ← Back to Papers
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main
            className="mx-auto flex h-[calc(100vh-64px)] max-w-[1600px] flex-col
                       px-3 py-4 sm:px-6 lg:px-8"
        >
            {/* ================= HEADER / TOOLBAR ================= */}
            <div
                className="mb-4 flex flex-col gap-4 rounded-2xl border border-gray-200
                           bg-white px-4 py-3 shadow-sm
                           sm:flex-row sm:items-center sm:justify-between
                           dark:border-gray-800 dark:bg-gray-900"
            >
                {/* Left Side */}
                <div className="flex min-w-0 items-center gap-3">
                    {/* Back Button */}
                    <Link
                        href="/gate"
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl
                                   border border-gray-200 bg-gray-50 text-gray-600
                                   transition-all hover:border-amber-300 hover:bg-amber-50
                                   hover:text-amber-700
                                   dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300
                                   dark:hover:border-amber-800 dark:hover:bg-amber-950/30
                                   dark:hover:text-amber-400"
                        aria-label="Back to GATE Papers"
                    >
                        <svg
                            className="h-5 w-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>
                    </Link>

                    {/* Document Icon */}
                    <div
                        className="hidden h-10 w-10 shrink-0 items-center justify-center
                                   rounded-xl bg-amber-100 text-amber-700
                                   sm:flex
                                   dark:bg-amber-950/50 dark:text-amber-400"
                    >
                        <svg
                            className="h-5 w-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M7 21h10a2 2 0 002-2V9l-6-6H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                            />
                        </svg>
                    </div>

                    {/* Title */}
                    <div className="min-w-0">
                        <div className="flex items-center gap-2">
                            <h1 className="truncate text-sm font-bold text-gray-900 sm:text-base dark:text-white">
                                GATE Paper Preview
                            </h1>

                            <span
                                className="hidden rounded-full border border-amber-200 bg-amber-50
                                           px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide
                                           text-amber-700
                                           sm:inline-flex
                                           dark:border-amber-900 dark:bg-amber-950/40
                                           dark:text-amber-400"
                            >
                                PDF
                            </span>
                        </div>

                        <p className="mt-0.5 truncate text-xs text-gray-500 dark:text-gray-400">
                            Previewing document on Notiya
                        </p>
                    </div>
                </div>

                {/* Right Side */}
                <div className="flex items-center gap-2">
                    <Link
                        href="/gate"
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl
                                   border border-gray-200 bg-white px-4 py-2.5
                                   text-sm font-semibold text-gray-700 transition-all
                                   hover:border-amber-300 hover:bg-amber-50 hover:text-amber-700
                                   sm:flex-none
                                   dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300
                                   dark:hover:border-amber-800 dark:hover:bg-amber-950/30
                                   dark:hover:text-amber-400"
                    >
                        <svg
                            className="h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>

                        <span>All Papers</span>
                    </Link>

                    {/* Open PDF */}
                    <a
                        href={pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex flex-1 items-center justify-center gap-2
                                   rounded-xl bg-amber-600 px-4 py-2.5
                                   text-sm font-semibold text-white shadow-sm
                                   transition-all hover:bg-amber-700 hover:shadow-md
                                   sm:flex-none
                                   dark:bg-amber-600 dark:hover:bg-amber-500"
                    >
                        <span>Open PDF</span>

                        <svg
                            className="h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M14 3h7m0 0v7m0-7L10 14M5 7v12a2 2 0 002 2h12a2 2 0 002-2v-5"
                            />
                        </svg>
                    </a>
                </div>
            </div>

            {/* ================= PDF VIEWER ================= */}
            <div
                className="relative min-h-0 flex-1 overflow-hidden rounded-2xl
                           border border-gray-200 bg-gray-100 shadow-sm
                           dark:border-gray-800 dark:bg-gray-950"
            >
                {/* Viewer Top Accent */}
                <div
                    className="absolute left-0 right-0 top-0 z-10 h-1
                               bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500"
                />

                <iframe
                    src={`/api/pdf?url=${encodeURIComponent(pdfUrl)}`}
                    className="h-full w-full bg-white"
                    title="GATE PDF Preview"
                />
            </div>
        </main>
    );
}