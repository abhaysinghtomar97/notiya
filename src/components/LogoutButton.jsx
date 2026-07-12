// src/components/LogoutButton.jsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LogoutButton({ className }) {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);

    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to log out');
      }

      // Force a hard navigation to the login page to clear any client-side cache
      router.push('/login');
      router.refresh(); 

    } catch (error) {
      console.error(error.message);
      setIsLoggingOut(false);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isLoggingOut}
      className={`inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 dark:text-red-400 dark:bg-red-900/10 dark:hover:bg-red-900/20 rounded-xl transition-colors active:scale-95 disabled:opacity-50 disabled:pointer-events-none ${className}`}
    >
      {isLoggingOut ? (
        <span>Logging out...</span>
      ) : (
        <>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
          Sign Out
        </>
      )}
    </button>
  );
}