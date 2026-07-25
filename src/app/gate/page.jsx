// src/app/gate/page.jsx
import Link from 'next/link';
import { getGatePapers, getBranches } from '@/lib/paperService';
import BranchFilter from './BranchFilter';

export const metadata = {
    title: 'GATE Previous Year Question Papers & Answer Keys',
    description: 'Download GATE question papers and answer keys by branch and year.',
};

export default async function GatePapersPage({ searchParams }) {
    const resolvedSearchParams = await searchParams;
    const page = parseInt(resolvedSearchParams.page) || 1;
    const branch = resolvedSearchParams.branch || ''; // Get branch from URL
    const itemsPerPage = 20;

    // Fetch papers and available branches
    const { papers, totalCount } = await getGatePapers(page, itemsPerPage, branch);
    const branches = await getBranches();

    const totalPages = Math.ceil(totalCount / itemsPerPage) || 1;

    return  (
    <main className="container mx-auto px-4 py-8">

        {/* Page Header */}
        <div className="mb-8 text-center">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700
                            dark:border-amber-900/60 dark:bg-amber-950/40 dark:text-amber-400">
                <span className="h-2 w-2 rounded-full bg-amber-500"></span>
                GATE Resources
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl dark:text-white">
                GATE Previous Year Papers
            </h1>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-gray-500 md:text-base dark:text-gray-400">
                Practice with previous year GATE question papers and official
                answer keys to strengthen your preparation.
            </p>
        </div>


        {/* Branch Filter */}
        <BranchFilter branches={branches} />


        {/* Papers Section */}
        <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm
                            dark:border-gray-800 dark:bg-gray-900">

            {/* Table Top Bar */}
            <div className="flex flex-col gap-3 border-b border-gray-200 bg-gray-50/70 px-5 py-4
                            sm:flex-row sm:items-center sm:justify-between
                            dark:border-gray-800 dark:bg-gray-900">

                <div>
                    <h2 className="font-bold text-gray-900 dark:text-white">
                        {branch ? `${branch} Question Papers` : 'All Question Papers'}
                    </h2>

                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        {totalCount} paper{totalCount !== 1 ? 's' : ''} available
                    </p>
                </div>

                {branch && (
                    <span className="w-fit rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5
                                     text-xs font-semibold text-amber-700
                                     dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-400">
                        {branch}
                    </span>
                )}
            </div>


            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full min-w-[750px] text-left">

                    <thead>
                        <tr className="border-b border-gray-200 bg-gray-50
                                       dark:border-gray-800 dark:bg-gray-950/50">

                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                Question Paper
                            </th>

                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                Year
                            </th>

                            <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                Paper
                            </th>

                            <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                Answer Key
                            </th>
                        </tr>
                    </thead>


                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">

                        {papers.length > 0 ? (
                            papers.map((paper) => (
                                <tr
                                    key={paper._id}
                                    className="group transition-colors duration-200
                                               hover:bg-amber-50/50
                                               dark:hover:bg-amber-950/10"
                                >

                                    {/* Title */}
                                    <td className="px-6 py-5">
                                        <div className="flex items-start gap-3">

                                            {/* PDF Icon */}
                                            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center
                                                            rounded-lg bg-amber-100 text-amber-700
                                                            dark:bg-amber-950/50 dark:text-amber-400">
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
                                                        d="M7 21h10a2 2 0 002-2V9l-6-6H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                                                    />
                                                </svg>
                                            </div>

                                            <div>
                                                <p className="max-w-md font-medium leading-6 text-gray-800
                                                              dark:text-gray-200">
                                                    {paper.title}
                                                </p>
                                            </div>
                                        </div>
                                    </td>


                                    {/* Year */}
                                    <td className="px-6 py-5">
                                        <span className="inline-flex rounded-lg border border-gray-200
                                                         bg-gray-50 px-3 py-1.5 text-sm font-semibold
                                                         text-gray-700
                                                         dark:border-gray-700 dark:bg-gray-800
                                                         dark:text-gray-300">
                                            {paper.Year}
                                        </span>
                                    </td>


                                    {/* Question Paper */}
                                    <td className="px-6 py-5 text-center">
                                        {paper['Question Paper Link'] &&
                                        paper['Question Paper Link'] !== 'N/A' ? (

                                            <Link
                                                href={`/gate/preview?url=${encodeURIComponent(
                                                    paper['Question Paper Link']
                                                )}`}
                                                className="inline-flex items-center gap-2 rounded-lg
                                                           border border-amber-200 bg-amber-50
                                                           px-3.5 py-2 text-sm font-semibold
                                                           text-amber-700 transition-all
                                                           hover:border-amber-300 hover:bg-amber-100
                                                           dark:border-amber-900/70
                                                           dark:bg-amber-950/40
                                                           dark:text-amber-400
                                                           dark:hover:bg-amber-950/70"
                                            >
                                                View Paper

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
                                                        d="M9 5l7 7-7 7"
                                                    />
                                                </svg>
                                            </Link>

                                        ) : (
                                            <span className="text-sm text-gray-400 dark:text-gray-600">
                                                Not Available
                                            </span>
                                        )}
                                    </td>


                                    {/* Answer Key */}
                                    <td className="px-6 py-5 text-center">
                                        {paper['Answer Key Link'] &&
                                        paper['Answer Key Link'] !== 'N/A' ? (

                                            <Link
                                                href={`/gate/preview?url=${encodeURIComponent(
                                                    paper['Answer Key Link']
                                                )}`}
                                                className="inline-flex items-center gap-2 rounded-lg
                                                           border border-emerald-200 bg-emerald-50
                                                           px-3.5 py-2 text-sm font-semibold
                                                           text-emerald-700 transition-all
                                                           hover:border-emerald-300 hover:bg-emerald-100
                                                           dark:border-emerald-900/70
                                                           dark:bg-emerald-950/30
                                                           dark:text-emerald-400
                                                           dark:hover:bg-emerald-950/60"
                                            >
                                                Answer Key

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
                                                        d="M5 13l4 4L19 7"
                                                    />
                                                </svg>
                                            </Link>

                                        ) : (
                                            <span className="text-sm text-gray-400 dark:text-gray-600">
                                                Not Available
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (

                            /* Empty State */
                            <tr>
                                <td colSpan="4">
                                    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">

                                        <div className="mb-4 flex h-14 w-14 items-center justify-center
                                                        rounded-2xl bg-gray-100
                                                        dark:bg-gray-800">
                                            <span className="text-2xl">📄</span>
                                        </div>

                                        <h3 className="font-bold text-gray-900 dark:text-white">
                                            No papers found
                                        </h3>

                                        <p className="mt-1 max-w-sm text-sm text-gray-500 dark:text-gray-400">
                                            No GATE papers are currently available for this branch.
                                        </p>
                                    </div>
                                </td>
                            </tr>
                        )}

                    </tbody>
                </table>
            </div>
        </section>


        {/* Pagination */}
        {totalPages > 1 && (
            <div className="mt-6 flex flex-col items-center justify-between gap-4
                            rounded-2xl border border-gray-200 bg-white p-4
                            sm:flex-row
                            dark:border-gray-800 dark:bg-gray-900">

                {/* Previous */}
                <div className="w-full sm:w-auto">
                    {page > 1 ? (
                        <Link
                            href={`/gate?page=${page - 1}${
                                branch ? `&branch=${encodeURIComponent(branch)}` : ''
                            }`}
                            className="inline-flex w-full items-center justify-center gap-2
                                       rounded-xl border border-gray-200 bg-white
                                       px-4 py-2.5 text-sm font-semibold text-gray-700
                                       transition-all hover:border-amber-300 hover:bg-amber-50
                                       hover:text-amber-700
                                       sm:w-auto
                                       dark:border-gray-700 dark:bg-gray-800
                                       dark:text-gray-300 dark:hover:border-amber-800
                                       dark:hover:bg-amber-950/30 dark:hover:text-amber-400"
                        >
                            ← Previous
                        </Link>
                    ) : (
                        <div className="hidden w-[105px] sm:block" />
                    )}
                </div>


                {/* Page Info */}
                <div className="text-center">
                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                        Page <span className="text-amber-600 dark:text-amber-400">{page}</span>
                        {' '}of {totalPages}
                    </p>

                    <p className="mt-0.5 text-xs text-gray-400 dark:text-gray-500">
                        {totalCount} total papers
                    </p>
                </div>


                {/* Next */}
                <div className="w-full sm:w-auto">
                    {page < totalPages ? (
                        <Link
                            href={`/gate?page=${page + 1}${
                                branch ? `&branch=${encodeURIComponent(branch)}` : ''
                            }`}
                            className="inline-flex w-full items-center justify-center gap-2
                                       rounded-xl bg-amber-600 px-4 py-2.5
                                       text-sm font-semibold text-white
                                       shadow-sm transition-all
                                       hover:bg-amber-700 hover:shadow-md
                                       sm:w-auto
                                       dark:bg-amber-600 dark:hover:bg-amber-500"
                        >
                            Next →
                        </Link>
                    ) : (
                        <div className="hidden w-[105px] sm:block" />
                    )}
                </div>

            </div>
        )}

    </main>
);
}