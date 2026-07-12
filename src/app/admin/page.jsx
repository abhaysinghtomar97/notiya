'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

const AdminDashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

 
  useEffect(() => {
    // If input is empty, clear results and errors
    if (!searchQuery.trim()) {
      setSubjects([]);
      setError('');
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setIsLoading(true);
        setError('');

        const res = await axios.get('/api/subject', {
          params: {
            input: searchQuery.trim(),
          },
        });

        setSubjects(res.data.subject || []);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch subjects. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }, 500); // Debounce: Wait 500ms after user stops typing

    // Cleanup previous timer
    return () => clearTimeout(timer);
  }, [searchQuery]);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-zinc-950">
      
     

      {/* MAIN CONTENT AREA */}
      <div className="max-w-6xl mx-auto p-6 md:p-8 mt-4">
        
        {/* Actions Bar (Search & Create) */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5 mb-8 bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-gray-200 dark:border-zinc-800 shadow-sm">
          
          <div className="relative w-full md:max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search subjects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-950 text-foreground focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent transition-all"
            />
          </div>

          <Link
            href="/admin/subject"
            className="w-full md:w-auto inline-flex justify-center items-center gap-2 px-6 py-3 rounded-xl bg-amber-600 text-white font-medium hover:bg-amber-700 transition-colors shadow-sm active:scale-[0.98]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Create Subject
          </Link>
        </div>

        {/* Results Area */}
        <div className="w-full">
          {error && (
            <div className="p-4 mb-6 bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400 rounded-xl border border-red-200 dark:border-red-900/50">
              {error}
            </div>
          )}

          {isLoading && (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
              <span className="ml-3 text-zinc-500 font-medium">Searching subjects...</span>
            </div>
          )}

          {/* Subject Grid */}
          {!isLoading && subjects.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {subjects.map((sub) => (
                <Link
                  key={sub._id}
                  href={`/admin/subject/${sub._id}`}
                  className="group block p-5 border border-gray-200 dark:border-zinc-800 rounded-2xl bg-white dark:bg-zinc-900 hover:border-amber-500 dark:hover:border-amber-600 hover:shadow-md transition-all active:scale-[0.99]"
                >
                  <div className="flex items-start justify-between">
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-amber-600 transition-colors line-clamp-2">
                      {sub.subjectName}
                    </h3>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-zinc-400 group-hover:text-amber-600 transform group-hover:translate-x-1 transition-all" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!isLoading && searchQuery.trim() && subjects.length === 0 && (
            <div className="text-center py-16 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl border-dashed">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-zinc-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-lg font-medium text-foreground">No subjects found</h3>
              <p className="text-zinc-500 mt-1">We couldn't find anything matching "{searchQuery}"</p>
            </div>
          )}

          {!isLoading && !searchQuery.trim() && (
            <div className="text-center py-16">
              <p className="text-zinc-500">Type in the search bar above to find a subject to manage.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default AdminDashboard;