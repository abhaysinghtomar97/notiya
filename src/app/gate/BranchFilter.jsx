// src/app/gate/BranchFilter.jsx
'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export default function BranchFilter({ branches }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentBranch = searchParams.get('branch') || '';

    const handleBranchChange = (e) => {
        const selectedBranch = e.target.value;
        // Reset to page 1 whenever the branch changes
        if (selectedBranch) {
            router.push(`/gate?page=1&branch=${selectedBranch}`);
        } else {
            router.push(`/gate?page=1`);
        }
    };

    return (
        <div className="mb-8 flex flex-col items-center">
            {/* Filter Card */}
            <div className="w-full max-w-md rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 via-white to-orange-50 p-5 shadow-sm">

                {/* Heading */}
                <div className="mb-4 text-center">
                    <div className="mb-1 flex items-center justify-center gap-2">
                        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-100 text-lg">
                            🎓
                        </span>

                        <h3 className="text-lg font-bold text-gray-900">
                            Select Your Branch
                        </h3>
                    </div>

                    <p className="text-sm text-gray-500">
                        Choose your branch to find relevant papers
                    </p>
                </div>

                {/* Select */}
                <div className="relative">
                    <select
                        id="branch"
                        value={currentBranch}
                        onChange={handleBranchChange}
                        className="
                    w-full appearance-none
                    rounded-xl border-2 border-amber-200
                    bg-white px-4 py-3 pr-10
                    font-medium text-gray-700
                    shadow-sm
                    outline-none
                    transition-all duration-200
                    hover:border-amber-300
                    focus:border-amber-500
                    focus:ring-4 focus:ring-amber-100
                    cursor-pointer
                "
                    >
                        <option value="">Choose your Course</option>

                        {branches.map((branch) => (
                            <option key={branch.code} value={branch.code}>
                                {branch.code} - {branch.name}
                            </option>
                        ))}
                    </select>

                    {/* Custom Arrow */}
                    <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                        <svg
                            className="h-5 w-5 text-amber-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    </div>
                </div>

                {/* Selected Branch */}
                {currentBranch && (
                    <div className="mt-4 flex items-center justify-center">
                        <div className="flex items-center gap-2 rounded-full border border-amber-200 bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-800">
                            <span className="h-2 w-2 rounded-full bg-amber-500"></span>
                            {currentBranch}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}