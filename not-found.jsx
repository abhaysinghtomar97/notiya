"use client";

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 py-16 text-center">
      
      {/* 1. The Standard 404 Message */}
      <h1 className="text-7xl font-extrabold text-blue-600 tracking-tight">404</h1>
      <h2 className="mt-4 text-2xl font-bold text-gray-900 sm:text-3xl">
        Study Material Not Found
      </h2>
      <p className="mt-4 text-gray-500 max-w-md mx-auto">
        The link might be broken, or we haven't uploaded this material yet. 
      </p>

      {/* 2. The Navigation Buttons */}
      <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center w-full max-w-md">
        <Link 
          href="/" 
          className="flex-1 inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white transition-colors bg-gray-900 rounded-lg hover:bg-gray-800"
        >
          Back to Home
        </Link>
        <Link 
          href="/study-material" 
          className="flex-1 inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-gray-700 transition-colors bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Browse Subjects
        </Link>
      </div>

      {/* 3. The "Follow for Updates" Card */}
      <div className="mt-12 w-full max-w-md p-6 bg-blue-50 border border-blue-100 rounded-2xl shadow-sm text-left">
        <h3 className="text-lg font-semibold text-blue-900">
          Didn't find what you need?
        </h3>
        <p className="mt-2 text-sm text-blue-700 mb-4">
          Follow us to get notified the moment new notes, syllabus updates, or study materials are added.
        </p>
        
        <form 
          className="flex flex-col sm:flex-row gap-2" 
          onSubmit={(e) => {
            e.preventDefault();
            // TODO: Add your API call here to save the email
            alert("Thanks for subscribing!"); 
          }}
        >
          <input 
            type="email" 
            placeholder="Enter your email" 
            required
            className="flex-1 px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button 
            type="submit"
            className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors focus:ring-4 focus:ring-blue-300 shrink-0"
          >
            Notify Me
          </button>
        </form>
      </div>

    </div>
  );
}