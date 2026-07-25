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
        <div className="mb-6 flex items-center gap-4">
            <label htmlFor="branch" className="font-semibold text-gray-700">Filter by Branch:</label>
            <select 
                id="branch"
                value={currentBranch}
                onChange={handleBranchChange}
                className="border border-gray-300 p-2 rounded bg-white shadow-sm outline-none"
            >
                <option value="">All Branches</option>
                {branches.map((b) => (
                    <option key={b} value={b}>{b}</option>
                ))}
            </select>
        </div>
    );
}