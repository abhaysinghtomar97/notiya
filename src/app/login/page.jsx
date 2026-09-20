'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Toaster, toast } from 'react-hot-toast';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

export default function AdminLogin() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Unified Google Login Handler
  const handleGoogleSuccess = async (credentialResponse) => {
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/auth/google-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: credentialResponse.credential }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Authentication failed');

      // Save user data to localStorage
      localStorage.setItem('user', JSON.stringify(data.user));

      // Dispatch an event to tell the Navbar to update
      window.dispatchEvent(new Event('auth-change'));

      toast.success('Login successful!');
      
      // Dynamic routing based on role
      if (data.user.role === 'ADMIN' || data.user.role === 'SUPERADMIN') {
        router.push('/admin');
      } else {
        router.push('/');
      }

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
      {/* 1. Added relative positioning and overflow-hidden for background effects */}
      <main className="relative min-h-screen flex items-center justify-center bg-gray-50 dark:bg-zinc-950 p-4 overflow-hidden selection:bg-amber-500/30">
        <Toaster position="top-center" />
        
        {/* 2. Ambient Background Blobs for a modern, premium feel */}
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-amber-500/20 dark:bg-amber-600/10 blur-[120px] pointer-events-none mix-blend-multiply dark:mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-orange-500/20 dark:bg-orange-600/10 blur-[120px] pointer-events-none mix-blend-multiply dark:mix-blend-screen" />

        {/* 3. UX: Back to Home Button */}
        <button 
          onClick={() => router.push('/')}
          className="absolute top-6 left-6 flex items-center gap-2 text-sm font-medium text-foreground/60 hover:text-amber-600 transition-colors z-20 group"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 group-hover:-translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back to Home
        </button>

        {/* 4. Glassmorphism Card Effect */}
        <div className="z-10 w-full max-w-md bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl rounded-[24px] shadow-2xl border border-white/50 dark:border-zinc-800/50 p-8 sm:p-10 flex flex-col items-center transform transition-all animate-in fade-in zoom-in-95 duration-500">
          
          <div className="text-center mb-8 w-full">
            <div className="mx-auto w-16 h-16 bg-gradient-to-tr from-amber-500 to-orange-400 text-white rounded-2xl flex items-center justify-center mb-5 shadow-lg shadow-amber-500/30 transform -rotate-3 hover:rotate-0 transition-transform duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
              </svg>
            </div>
            <h1 className="text-2xl font-extrabold text-foreground tracking-tight">Welcome to Notiya</h1>
            <p className="text-sm text-foreground/60 mt-2">Sign in to access your study materials</p>
          </div>
          
          {error && (
            <div className="w-full mb-6 p-3 bg-red-100/80 text-red-700 dark:bg-red-900/30 dark:text-red-400 text-sm rounded-xl border border-red-200 dark:border-red-900/50 text-center animate-in slide-in-from-top-2">
              {error}
            </div>
          )}

          {/* 5. Fixed Height Container to prevent layout shift during loading */}
          <div className="w-full h-[60px] flex items-center justify-center">
            {isLoading ? (
               <div className="flex flex-col items-center justify-center space-y-3 animate-in fade-in duration-300">
                  <div className="w-6 h-6 border-3 border-amber-600 border-t-transparent rounded-full animate-spin"></div>
               </div>
            ) : (
              <div className="w-full flex justify-center animate-in fade-in duration-300">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => setError('Google Sign-In was unsuccessful. Please try again.')}
                  useOneTap
                  theme="outline"
                  shape="pill"
                  text="continue_with"
                  size="large"
                />
              </div>
            )}
          </div>

          {/* 6. UX: Trust & Privacy Text */}
          <p className="text-[11px] text-foreground/40 mt-8 text-center max-w-[250px]">
            By continuing, you agree to Notiya's <br/>
            <Link href="#" className="hover:text-amber-600 underline underline-offset-2 transition-colors">Terms of Service</Link> and <Link href="#" className="hover:text-amber-600 underline underline-offset-2 transition-colors">Privacy Policy</Link>.
          </p>

        </div>
      </main>
    </GoogleOAuthProvider>
  );
}