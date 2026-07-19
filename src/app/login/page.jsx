// src/app/admin/login/page.jsx
'use client'; // Required for client-side interactivity like useState and fetch

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Toaster, toast } from 'react-hot-toast';
export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      // Success! Redirect to the admin dashboard
      toast.success('Login successful!');
      router.push('/admin'); // Create this page next!

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-zinc-950 p-4">
      <Toaster />
      <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-[24px] shadow-xl border border-gray-200 dark:border-zinc-800 p-8 sm:p-10">
        
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-amber-600/10 dark:bg-amber-900/20 text-amber-600 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-foreground">Admin Portal</h1>
        </div>
        
        {/* Error Message Display */}
        {error && (
          <div className="mb-6 p-3 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 text-sm rounded-xl border border-red-200 dark:border-red-900/50 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-950 text-foreground focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent transition-all"
              placeholder="email@notiya.in"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-950 text-foreground focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent transition-all"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-xl transition-all shadow-sm hover:shadow-md active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
      </div>
    </main>
  );
}