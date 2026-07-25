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

    return (
        <main className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">GATE Question Papers</h1>

            {/* Dropdown Client Component */}
            <BranchFilter branches={branches} />

            {/* Data Table */}
            <div className="overflow-x-auto bg-white border border-gray-200 rounded shadow-sm">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="p-4 font-semibold text-gray-700">Title</th>
                            <th className="p-4 font-semibold text-gray-700 whitespace-nowrap">Year</th>
                            <th className="p-4 font-semibold text-gray-700 whitespace-nowrap">Paper Preview</th>
                            <th className="p-4 font-semibold text-gray-700 whitespace-nowrap">Answer Key</th>
                        </tr>
                    </thead>
                    <tbody>
                        {papers.length > 0 ? (
                            papers.map((paper) => (
                                <tr key={paper._id} className="border-b border-gray-100 hover:bg-gray-50">
                                    <td className="p-4 text-gray-800">{paper.title}</td>
                                    <td className="p-4 text-gray-600">{paper.Year}</td>
                                    <td className="p-4">
                                        {paper['Question Paper Link'] && paper['Question Paper Link'] !== 'N/A' ? (
                                            <Link
                                                href={`/gate/preview?url=${encodeURIComponent(paper['Question Paper Link'])}`}
                                                className="text-blue-600 hover:text-blue-800 hover:underline"
                                            >
                                                View Paper
                                            </Link>
                                        ) : (
                                            <span className="text-gray-400">-</span>
                                        )}
                                    </td>
                                    <td className="p-4">
                                        {paper['Answer Key Link'] && paper['Answer Key Link'] !== 'N/A' ? (
                                            <Link
                                                href={`/gate/preview?url=${encodeURIComponent(paper['Answer Key Link'])}`}
                                                className="text-green-600 hover:text-green-800 hover:underline"
                                            >
                                                View Key
                                            </Link>
                                        ) : (
                                            <span className="text-gray-400">-</span>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="p-8 text-center text-gray-500">
                                    No papers found for this branch.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-6 p-4 bg-gray-50 border border-gray-200 rounded shadow-sm">
                {page > 1 ? (
                    <Link
                        href={`/gate?page=${page - 1}${branch ? `&branch=${branch}` : ''}`}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Previous Page
                    </Link>
                ) : (
                    <div />
                )}

                <span className="text-gray-700 font-medium">
                    Page {page} of {totalPages}
                </span>

                {page < totalPages ? (
                    <Link
                        href={`/gate?page=${page + 1}${branch ? `&branch=${branch}` : ''}`}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Next Page
                    </Link>
                ) : (
                    <div />
                )}
            </div>
        </main>
    );
}