
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

export default function ManualLoginForm({ redirectUrl = '/' }) {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleManualLogin = async (e) => {
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
        throw new Error(data.error || 'Login failed');
      }

      // Preserve the existing client-side auth event convention.
      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
        window.dispatchEvent(new Event('auth-change'));
      }

      toast.success('Login successful!');

      if (
        data.user?.role === 'ADMIN' ||
        data.user?.role === 'SUPERADMIN'
      ) {
        router.push('/admin');
      } else {
        router.push(redirectUrl);
      }
    } catch (err) {
      setError(err.message || 'Something went wrong');
      toast.error(err.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full mt-6">
      <div className="relative flex items-center mb-5">
        <div className="grow border-t border-gray-300 dark:border-zinc-700" />
        <span className="px-3 text-xs text-foreground/50">
          DEVELOPMENT ONLY
        </span>
        <div className="grow border-t border-gray-300 dark:border-zinc-700" />
      </div>

      <form onSubmit={handleManualLogin} className="space-y-4">
        <div>
          <label
            htmlFor="manual-email"
            className="block text-sm font-medium mb-1.5"
          >
            Email
          </label>

          <input
            id="manual-email"
            type="email"
            autoComplete="username"
            placeholder="admin@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-xl border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <div>
          <label
            htmlFor="manual-password"
            className="block text-sm font-medium mb-1.5"
          >
            Password
          </label>

          <input
            id="manual-password"
            type="password"
            autoComplete="current-password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full rounded-xl border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        {error && (
          <div
            role="alert"
            className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-400"
          >
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-xl bg-amber-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? 'Signing in...' : 'Sign in with Email'}
        </button>
      </form>
    </div>
  );
}
