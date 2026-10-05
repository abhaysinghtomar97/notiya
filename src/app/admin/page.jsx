"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";

const AdminDashboard = () => {
  // --------------------------------------------------
  // State
  // --------------------------------------------------

  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const [data, setData] = useState({
    subjects: [],
    stats: null,
  });

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalSubjects: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPreviousPage: false,
  });

  const [currentPage, setCurrentPage] = useState(1);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // --------------------------------------------------
  // Fetch Dashboard Data
  // --------------------------------------------------

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        setError("");

        const res = await axios.get(
          `/api/dashboard?page=${currentPage}&limit=10`
        );

     

        setData({
          subjects: res.data.subjects || [],
          stats: res.data.stats || null,
        });

        setPagination(
          res.data.pagination || {
            page: 1,
            limit: 10,
            totalSubjects: 0,
            totalPages: 0,
            hasNextPage: false,
            hasPreviousPage: false,
          }
        );
      } catch (err) {
        console.error("Dashboard fetch error:", err);

        setError(
          "Failed to load dashboard data. Please try again."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [currentPage]);

  // --------------------------------------------------
  // Client-side filtering
  // NOTE:
  // This filters only the subjects currently loaded.
  // For global search/filter, move these params to API.
  // --------------------------------------------------

  const filteredSubjects = data.subjects.filter((sub) => {
    const query = searchQuery.toLowerCase().trim();

    const matchesSearch =
      !query ||
      (sub.subjectName || "")
        .toLowerCase()
        .includes(query) ||
      (sub.subjectCode || "")
        .toLowerCase()
        .includes(query);

    const matchesStatus =
      filterStatus === "All" ||
      sub.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  // --------------------------------------------------
  // Reset page when filters change
  // --------------------------------------------------

  useEffect(() => {
    setCurrentPage(1);
  }, [filterStatus]);

  // --------------------------------------------------
  // Export CSV
  // --------------------------------------------------

  const handleExport = () => {
    if (
      !filteredSubjects ||
      filteredSubjects.length === 0
    ) {
      toast.error(
        "No data available to export based on current filters."
      );
      return;
    }

    const headers = [
      "Subject Name",
      "Subject Code",
      "Course",
      "Year",
      "Semester",
      "Branches",
      "Is Published",
      "Units Uploaded",
      "PYQs Uploaded",
      "Status",
    ];

    const csvRows = filteredSubjects.map((sub) => {
      return [
        `"${sub.subjectName || ""}"`,
        `"${sub.subjectCode || ""}"`,
        `"${sub.course || ""}"`,
        `"${sub.year || ""}"`,
        `"${sub.semester || ""}"`,
        `"${(sub.branches || []).join(", ")}"`,
        sub.isPublished ? "Yes" : "No",
        sub.unitsUploaded || 0,
        sub.hasPyqs ? "Yes" : "No",
        `"${sub.status || "Missing"}"`,
      ].join(",");
    });

    const csvContent = [
      headers.join(","),
      ...csvRows,
    ].join("\n");

    const blob = new Blob(
      [csvContent],
      {
        type: "text/csv;charset=utf-8;",
      }
    );

    const url = URL.createObjectURL(blob);

    const dateStr = new Date()
      .toISOString()
      .split("T")[0];

    const link = document.createElement("a");

    link.href = url;

    link.setAttribute(
      "download",
      `Notiya_Report_${dateStr}.csv`
    );

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);

    toast.success("Downloading...");
  };

  // --------------------------------------------------
  // Status Badge
  // --------------------------------------------------

  const getStatusBadge = (status) => {
    switch (status) {
      case "Complete":
        return (
          <span className="px-2 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-md text-xs font-semibold tracking-wide">
            ✅ Complete
          </span>
        );

      case "Partial":
        return (
          <span className="px-2 py-1 bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 rounded-md text-xs font-semibold tracking-wide">
            🟨 Partial
          </span>
        );

      default:
        return (
          <span className="px-2 py-1 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 rounded-md text-xs font-semibold tracking-wide">
            ❌ Missing
          </span>
        );
    }
  };

  // --------------------------------------------------
  // Pagination
  // --------------------------------------------------

  const getPageNumbers = () => {
    const totalPages = pagination.totalPages;

    if (totalPages <= 7) {
      return Array.from(
        { length: totalPages },
        (_, i) => i + 1
      );
    }

    const pages = [];

    pages.push(1);

    if (currentPage > 4) {
      pages.push("...");
    }

    const start = Math.max(
      2,
      currentPage - 1
    );

    const end = Math.min(
      totalPages - 1,
      currentPage + 1
    );

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 3) {
      pages.push("...");
    }

    pages.push(totalPages);

    return pages;
  };

  // --------------------------------------------------
  // Render
  // --------------------------------------------------

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-zinc-950">

      <div className="max-w-7xl mx-auto p-6 md:p-8 mt-4">

        <Toaster />

        {/* -------------------------------------------
            Header
        -------------------------------------------- */}

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">

          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Content Coverage
            </h1>

            <p className="text-zinc-500 text-sm mt-1">
              Monitor syllabus, notes, and PYQ uploads across all subjects.
            </p>
          </div>

          <div className="flex gap-3">

            <button
              onClick={handleExport}
              className="px-4 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 text-foreground font-medium hover:border-amber-500 transition-colors shadow-sm"
            >
              Export Excel
            </button>

            <Link
              href="/admin/subject"
              className="px-4 py-2 rounded-xl bg-amber-600 text-white font-medium hover:bg-amber-700 transition-colors shadow-sm active:scale-[0.98]"
            >
              + Create Subject
            </Link>

          </div>
        </div>

        {/* -------------------------------------------
            Error
        -------------------------------------------- */}

        {error && (
          <div className="p-4 mb-6 bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400 rounded-xl border border-red-200 dark:border-red-900/50">
            {error}
          </div>
        )}

        {/* -------------------------------------------
            Stats
        -------------------------------------------- */}

        {!isLoading && data.stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">

            {[
              {
                label: "Total Subjects",
                value: data.stats.totalSubjects,
              },

              {
                label: "Completed Subjects",
                value: data.stats.complete,
                color: "text-green-600",
              },

              {
                label: "Missing Notes",
                value:
                  data.stats.totalSubjects -
                  data.stats.withNotes,
                color: "text-red-500",
              },

              {
                label: "Total Universities",
                value: data.stats.universities,
              },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-gray-200 dark:border-zinc-800 shadow-sm flex flex-col justify-center"
              >
                <span className="text-sm text-zinc-500 font-medium">
                  {stat.label}
                </span>

                <span
                  className={`text-3xl font-bold mt-1 ${stat.color ||
                    "text-foreground"
                    }`}
                >
                  {stat.value}
                </span>
              </div>
            ))}

          </div>
        )}

        {/* -------------------------------------------
            Search + Filter
        -------------------------------------------- */}

        <div className="flex flex-col md:flex-row gap-4 mb-6 bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-gray-200 dark:border-zinc-800 shadow-sm">

          <div className="relative flex-1">

            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">

              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>

            </div>

            <input
              type="text"
              placeholder="Search by subject name or code..."
              value={searchQuery}
              onChange={(e) =>
                setSearchQuery(e.target.value)
              }
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-950 text-foreground focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent transition-all"
            />

          </div>

          <select
            value={filterStatus}
            onChange={(e) =>
              setFilterStatus(e.target.value)
            }
            className="w-full md:w-48 px-4 py-2.5 rounded-xl border border-gray-300 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-950 text-foreground focus:outline-none focus:ring-2 focus:ring-amber-600 transition-all"
          >

            <option value="All">
              All Statuses
            </option>

            <option value="Complete">
              ✅ Complete
            </option>

            <option value="Partial">
              🟨 Partial
            </option>

            <option value="Missing">
              ❌ Missing
            </option>

          </select>

        </div>

        {/* -------------------------------------------
            Loading
        -------------------------------------------- */}

        {isLoading ? (

          <div className="flex items-center justify-center py-16">

            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>

            <span className="ml-3 text-zinc-500 font-medium">
              Analyzing content coverage...
            </span>

          </div>

        ) : (

          <>
            {/* ---------------------------------------
                Coverage Table
            ---------------------------------------- */}

            <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl shadow-sm overflow-hidden">

              <div className="overflow-x-auto">

                <table className="w-full text-left text-sm whitespace-nowrap">

                  <thead className="bg-gray-50 dark:bg-zinc-950/50 border-b border-gray-200 dark:border-zinc-800 text-zinc-500">

                    <tr>

                      <th className="px-6 py-4 font-medium">
                        Subject
                      </th>

                      <th className="px-6 py-4 font-medium">
                        Is_Published
                      </th>

                      <th className="px-6 py-4 font-medium">
                        Course/Year
                      </th>

                      <th className="px-6 py-4 font-medium">
                        Units Uploaded
                      </th>

                      <th className="px-6 py-4 font-medium">
                        PYQs
                      </th>

                      <th className="px-6 py-4 font-medium">
                        Status
                      </th>

                      <th className="px-6 py-4 font-medium text-right">
                        Actions
                      </th>

                    </tr>

                  </thead>

                  <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">

                    {filteredSubjects.length > 0 ? (

                      filteredSubjects.map((sub) => (

                        <tr
                          key={sub._id}
                          className="hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors"
                        >

                          {/* Subject */}

                          <td className="px-6 py-4">

                            <div className="font-semibold text-foreground">
                              {sub.subjectName}
                            </div>

                            <div className="text-xs text-zinc-500 mt-0.5">
                              {sub.subjectCode}
                            </div>

                          </td>

                          {/* Published */}

                          <td className="px-6 py-4">

                            <div className="text-foreground capitalize">
                              {sub.isPublished
                                ? "✅ Yes"
                                : "❌ No"}
                            </div>

                          </td>

                          {/* Course */}

                          <td className="px-6 py-4">

                            <div className="text-foreground capitalize">
                              {sub.course}
                            </div>

                            <div className="text-xs text-zinc-500 mt-0.5">
                              Year: {sub.year}, sem:{" "}
                              {sub.semester}
                            </div>

                          </td>

                          {/* Units */}

                          <td className="px-6 py-4">

                            <span
                              className={`font-medium ${sub.unitsUploaded > 0
                                  ? "text-amber-600"
                                  : "text-red-500"
                                }`}
                            >
                              {sub.unitsUploaded || 0} / 5
                            </span>

                          </td>

                          {/* PYQs */}

                          <td className="px-6 py-4">
                            {sub.hasPyqs
                              ? "✅ Yes"
                              : "❌ No"}
                          </td>

                          {/* Status */}

                          <td className="px-6 py-4">
                            {getStatusBadge(
                              sub.status
                            )}
                          </td>

                          {/* Actions */}

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

                        <td
                          colSpan="7"
                          className="px-6 py-12 text-center text-zinc-500"
                        >
                          No subjects match your current filters.
                        </td>

                      </tr>

                    )}

                  </tbody>

                </table>

              </div>

              {/* ---------------------------------------
                  Pagination
              ---------------------------------------- */}

              {pagination.totalPages > 1 && (

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 border-t border-gray-200 dark:border-zinc-800">

                  {/* Results info */}

                  <div className="text-sm text-zinc-500">

                    Showing{" "}

                    <span className="font-medium text-foreground">
                      {pagination.totalSubjects === 0
                        ? 0
                        : (currentPage - 1) *
                        pagination.limit +
                        1}
                    </span>

                    {" - "}

                    <span className="font-medium text-foreground">
                      {Math.min(
                        currentPage *
                        pagination.limit,
                        pagination.totalSubjects
                      )}
                    </span>

                    {" of "}

                    <span className="font-medium text-foreground">
                      {pagination.totalSubjects}
                    </span>

                    {" subjects"}

                  </div>

                  {/* Pagination controls */}

                  <div className="flex items-center gap-2">

                    {/* Previous */}

                    <button
                      onClick={() =>
                        setCurrentPage(
                          (prev) =>
                            Math.max(prev - 1, 1)
                        )
                      }
                      disabled={
                        !pagination.hasPreviousPage
                      }
                      className="px-3 py-2 rounded-lg border border-gray-200 dark:border-zinc-700 text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-zinc-800 transition"
                    >
                      ← Previous
                    </button>

                    {/* Page Numbers */}

                    <div className="flex items-center gap-1">

                      {getPageNumbers().map(
                        (page, index) => {

                          if (page === "...") {
                            return (
                              <span
                                key={`dots-${index}`}
                                className="px-2 text-zinc-400"
                              >
                                ...
                              </span>
                            );
                          }

                          return (
                            <button
                              key={page}
                              onClick={() =>
                                setCurrentPage(
                                  page
                                )
                              }
                              className={`min-w-9 h-9 px-3 rounded-lg text-sm font-medium transition ${currentPage ===
                                  page
                                  ? "bg-amber-600 text-white"
                                  : "border border-gray-200 dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-800"
                                }`}
                            >
                              {page}
                            </button>
                          );
                        }
                      )}

                    </div>

                    {/* Next */}

                    <button
                      onClick={() =>
                        setCurrentPage(
                          (prev) =>
                            Math.min(
                              prev + 1,
                              pagination.totalPages
                            )
                        )
                      }
                      disabled={
                        !pagination.hasNextPage
                      }
                      className="px-3 py-2 rounded-lg border border-gray-200 dark:border-zinc-700 text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-zinc-800 transition"
                    >
                      Next →
                    </button>

                  </div>

                </div>

              )}

            </div>
          </>

        )}

      </div>

    </main>
  );
};

export default AdminDashboard;