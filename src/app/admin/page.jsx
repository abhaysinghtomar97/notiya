'use client';

import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';

const AdminDashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [data, setData] = useState({ subjects: [], stats: null });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch all aggregated dashboard data on mount
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get('/api/dashboard');
        setData(res.data);
      } catch (err) {
        console.error(err);
        setError('Failed to load dashboard data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  // Handle client-side filtering and searching
  const filteredSubjects = useMemo(() => {
    return data.subjects.filter((sub) => {
      const matchesSearch =
        sub.subjectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sub.subjectCode.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = filterStatus === 'All' || sub.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, filterStatus, data.subjects]);

  // Export to Excel function (Placeholder - implement using xlsx library)
  const handleExport = () => {
    // 1. Ensure there is data to export
    if (!filteredSubjects || filteredSubjects.length === 0) {
      // toast.error("error")
      toast.error("No data available to export based on current filters.")
      return;
    }

    // 2. Define headers matching your dashboard columns
    const headers = [
      "Subject Name",
      "Subject Code",
      "Course",
      "Year",
      "Branches",
      "Syllabus Uploaded",
      "Units Uploaded (out of 5)",
      "PYQs Uploaded",
      "Status"
    ];

    // 3. Map the filtered data into CSV rows
    const csvRows = filteredSubjects.map((sub) => {
      // Wrap strings in quotes to prevent commas in names from breaking the CSV layout
      return [
        `"${sub.subjectName || ''}"`,
        `"${sub.subjectCode || ''}"`,
        `"${sub.course || ''}"`,
        `"${sub.year || ''}"`,
        `"${(sub.branches || []).join(', ')}"`,
        sub.hasSyllabus ? "Yes" : "No",
        sub.unitsUploaded || 0,
        sub.hasPyqs ? "Yes" : "No",
        `"${sub.status || 'Missing'}"`
      ].join(',');
    });

    // 4. Combine headers and rows with line breaks
    const csvContent = [headers.join(','), ...csvRows].join('\n');

    // 5. Create a Blob and trigger the browser download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    // Get today's date for the filename
    const dateStr = new Date().toISOString().split('T')[0]; 

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Notiya_Report_${dateStr}.csv`);
    
    // Append, click, and clean up
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success("Downloading...")
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Complete':
        return <span className="px-2 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-md text-xs font-semibold tracking-wide">✅ Complete</span>;
      case 'Partial':
        return <span className="px-2 py-1 bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 rounded-md text-xs font-semibold tracking-wide">🟨 Partial</span>;
      default:
        return <span className="px-2 py-1 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 rounded-md text-xs font-semibold tracking-wide">❌ Missing</span>;
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto p-6 md:p-8 mt-4">
        <Toaster />
        {/* Header & Actions */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Content Coverage</h1>
            <p className="text-zinc-500 text-sm mt-1">Monitor syllabus, notes, and PYQ uploads across all subjects.</p>
          </div>
          <div className="flex gap-3">
            <button onClick={handleExport} className="px-4 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 text-foreground font-medium hover:border-amber-500 transition-colors shadow-sm">
              Export Excel
            </button>
            <Link href="/admin/subject" className="px-4 py-2 rounded-xl bg-amber-600 text-white font-medium hover:bg-amber-700 transition-colors shadow-sm active:scale-[0.98]">
              + Create Subject
            </Link>
          </div>
        </div>

        {error && (
          <div className="p-4 mb-6 bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400 rounded-xl border border-red-200 dark:border-red-900/50">
            {error}
          </div>
        )}

        {/* Stats Grid */}
        {!isLoading && data.stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Total Subjects', value: data.stats.totalSubjects },
              { label: 'Completed Subjects', value: data.stats.complete, color: 'text-green-600' },
              { label: 'Missing Notes', value: data.stats.totalSubjects - data.stats.withNotes, color: 'text-red-500' },
              { label: 'Total Universities', value: data.stats.universities },
            ].map((stat, i) => (
              <div key={i} className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-gray-200 dark:border-zinc-800 shadow-sm flex flex-col justify-center">
                <span className="text-sm text-zinc-500 font-medium">{stat.label}</span>
                <span className={`text-3xl font-bold mt-1 ${stat.color || 'text-foreground'}`}>{stat.value}</span>
              </div>
            ))}
          </div>
        )}

        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-6 bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-gray-200 dark:border-zinc-800 shadow-sm">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search by subject name or code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-950 text-foreground focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent transition-all"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full md:w-48 px-4 py-2.5 rounded-xl border border-gray-300 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-950 text-foreground focus:outline-none focus:ring-2 focus:ring-amber-600 transition-all"
          >
            <option value="All">All Statuses</option>
            <option value="Complete">✅ Complete</option>
            <option value="Partial">🟨 Partial</option>
            <option value="Missing">❌ Missing</option>
          </select>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
            <span className="ml-3 text-zinc-500 font-medium">Analyzing content coverage...</span>
          </div>
        ) : (
          /* Coverage Table */
          <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-gray-50 dark:bg-zinc-950/50 border-b border-gray-200 dark:border-zinc-800 text-zinc-500">
                  <tr>
                    <th className="px-6 py-4 font-medium">Subject</th>
                    <th className="px-6 py-4 font-medium">Course/Year</th>
                    <th className="px-6 py-4 font-medium">Syllabus</th>
                    <th className="px-6 py-4 font-medium">Units Uploaded</th>
                    <th className="px-6 py-4 font-medium">PYQs</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                    <th className="px-6 py-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
                  {filteredSubjects.length > 0 ? (
                    filteredSubjects.map((sub) => (
                      <tr key={sub._id} className="hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-semibold text-foreground">{sub.subjectName}</div>
                          <div className="text-xs text-zinc-500 mt-0.5">{sub.subjectCode}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-foreground capitalize">{sub.course}</div>
                          <div className="text-xs text-zinc-500 mt-0.5">Year {sub.year}</div>
                        </td>
                        <td className="px-6 py-4">{sub.hasSyllabus ? '✅ Yes' : '❌ No'}</td>
                        <td className="px-6 py-4">
                          <span className={`font-medium ${sub.unitsUploaded > 0 ? 'text-amber-600' : 'text-red-500'}`}>
                            {sub.unitsUploaded} / 5
                          </span>
                        </td>
                        <td className="px-6 py-4">{sub.hasPyqs ? '✅ Yes' : '❌ No'}</td>
                        <td className="px-6 py-4">{getStatusBadge(sub.status)}</td>
                        <td className="px-6 py-4 text-right">
                          <Link
                            href={`/admin/subject/${sub._id}`}
                            className="text-amber-600 hover:text-amber-700 font-medium text-sm transition-colors"
                          >
                            Manage →
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="px-6 py-12 text-center text-zinc-500">
                        No subjects match your current filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default AdminDashboard;