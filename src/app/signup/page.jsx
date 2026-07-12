// src/app/signup/page.jsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminSignup() {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    adminSecret: '' // NEW STATE FOR SECRET
  });
  
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          adminSecret: formData.adminSecret // SENDING THE SECRET TO BACKEND
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      alert('Admin account created successfully! Please log in.');
      router.push('/login'); 

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-zinc-950 p-4">
      <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-[24px] shadow-xl border border-gray-200 dark:border-zinc-800 p-8 sm:p-10 my-8">
        
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-foreground">Create Admin</h1>
          <p className="text-sm text-zinc-500 mt-2">Requires an authorized registration key</p>
        </div>
        
        {error && (
          <div className="mb-6 p-3 bg-red-100 text-red-700 text-sm rounded-xl border border-red-200 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2" htmlFor="name">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-950 text-foreground focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent transition-all"
              placeholder="John Doe"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-950 text-foreground focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent transition-all"
              placeholder="admin123@gmail.com"
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
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-950 text-foreground focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent transition-all"
              placeholder="••••••••"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-950 text-foreground focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent transition-all"
              placeholder="••••••••"
              required
            />
          </div>
          {/* Add the new Admin Secret Input */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2" htmlFor="adminSecret">
              Registration Key (Secret)
            </label>
            <input
              type="password"
              id="adminSecret"
              value={formData.adminSecret}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-amber-300 dark:border-amber-700/50 bg-amber-50 dark:bg-amber-900/10 text-foreground focus:outline-none focus:ring-2 focus:ring-amber-600 transition-all"
              placeholder="Enter the secret key"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 mt-2 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-xl transition-all shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>
      </div>
    </main>
  );
}