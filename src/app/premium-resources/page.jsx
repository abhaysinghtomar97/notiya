'use client'

import React, { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'

const resources = [
  {
    title: 'Machine Learning',
    description: 'Explore machine learning concepts and practical examples.',
    href: '/skills/ml-course.html',
    icon: '🤖',
    category: 'AI & ML',
  },
  {
    title: 'NumPy',
    description: 'Practice arrays, numerical operations and calculations.',
    href: '/skills/numpy-course.html',
    icon: '🔢',
    category: 'Python',
  },
  {
    title: 'Pandas',
    description: 'Learn DataFrames, data cleaning and data analysis.',
    href: '/skills/pandas-course.html',
    icon: '🐼',
    category: 'Data Analysis',
  },
  {
    title: 'SQL Lab',
    description: 'Practice SQL queries and database fundamentals.',
    href: '/skills/sql-lab.html',
    icon: '🗄️',
    category: 'Database',
  }
]

const PremiumResources = () => {
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(true) 
  
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // 1. Check if user is already logged in
    const user = localStorage.getItem('user')
    
    if (user) {
      setIsAuthenticated(true)
      setShowAuthModal(false)
    } else {
      setIsAuthenticated(false)
      // Slight delay for a smoother entrance effect
      const timer = setTimeout(() => setShowAuthModal(true), 150)
      return () => clearTimeout(timer)
    }

    // Listen for login/logout events if they happen in another tab/component
    const handleAuthChange = () => {
      const isUserNowLoggedIn = !!localStorage.getItem('user')
      setIsAuthenticated(isUserNowLoggedIn)
      setShowAuthModal(!isUserNowLoggedIn)
    }
    
    window.addEventListener('auth-change', handleAuthChange)
    return () => window.removeEventListener('auth-change', handleAuthChange)
  }, [])

  const handleGoogleLogin = () => {
    // 2. Redirect to your actual login page, passing the current URL
    router.push(`/login?redirect=${pathname}`)
  }

  // If authenticated, we don't blur the background and we allow iframe interaction
  const isLocked = !isAuthenticated && showAuthModal

  return (
    <>
      {/* --- Premium Auth Modal Overlay --- */}
      {isLocked && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-md transition-all duration-300">
          <div className="relative w-full max-w-md animate-in fade-in zoom-in-95 duration-300 overflow-hidden rounded-[2rem] border border-slate-200/50 bg-white/90 p-8 text-center shadow-2xl shadow-slate-900/20 backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/90 dark:shadow-black/50">
            
            {/* Decorative Background Glow in Modal */}
            <div className="pointer-events-none absolute -right-12 -top-12 -z-10 h-32 w-32 rounded-full bg-amber-400/20 blur-2xl" />
            
            {/* Premium Lock Icon */}
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-amber-500/20 bg-gradient-to-br from-amber-50 to-orange-50 shadow-sm dark:from-amber-500/10 dark:to-orange-500/5">
              <svg 
                className="h-8 w-8 text-amber-600 dark:text-amber-400" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
            </div>

            <h3 className="mt-6 text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Login Required
            </h3>
            
            <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              You've discovered our premium learning labs. Please sign in with your Notiya Google account to unlock interactive, hands-on environments.
            </p>

            <div className="mt-8 flex flex-col gap-3">
              <button 
                onClick={handleGoogleLogin} 
                className="inline-flex w-full   items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-4 text-sm font-bold text-slate-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 active:scale-[0.98] dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:hover:border-slate-600 dark:hover:bg-slate-700"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Continue with Google
              </button>
              
              <button 
                onClick={() => window.history.back()}
                className="inline-flex w-full items-center justify-center rounded-xl px-4 py-3 text-sm font-bold text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-300"
              >
                Return to Home
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- Main Page Content (Disabled/Blurred out visually when modal is open) --- */}
      <section className={`relative isolate overflow-hidden rounded-[2.5rem] border border-slate-200/60 bg-gradient-to-br from-slate-50 to-slate-100/50 px-5 py-14 shadow-2xl shadow-slate-200/40 transition-all duration-500 dark:border-white/[0.08] dark:from-slate-900 dark:to-slate-950 dark:shadow-none sm:px-8 lg:px-12 lg:py-20 ${isLocked ? 'pointer-events-none blur-sm opacity-50 select-none' : ''}`}>
        
        {/* Premium Background Ambient Glows */}
        <div className="pointer-events-none absolute -right-32 -top-32 -z-10 h-[30rem] w-[30rem] rounded-full bg-amber-400/10 blur-[100px] dark:bg-amber-500/10" />
        <div className="pointer-events-none absolute -bottom-32 -left-32 -z-10 h-[30rem] w-[30rem] rounded-full bg-blue-500/10 blur-[100px] dark:bg-blue-600/10" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-full w-full -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.4)_0%,rgba(255,255,255,0)_80%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.02)_0%,rgba(0,0,0,0)_80%)]" />

        {/* Heading Section */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-amber-500/20 bg-amber-500/5 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-amber-700 backdrop-blur-md dark:border-amber-400/20 dark:text-amber-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500"></span>
            </span>
            Notiya Learning Labs
          </div>

          <h2 className="mt-7 text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            Learn by{' '}
            <span className="bg-gradient-to-r from-amber-400 via-amber-500 to-orange-600 bg-clip-text text-transparent drop-shadow-sm">
              doing.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-slate-600 dark:text-slate-400 sm:text-lg">
            Explore interactive labs, practise technical skills, and master concepts 
            through hands-on examples at your own pace.
          </p>
        </div>

        {/* Responsive Resource Cards Grid */}
        <div className="mx-auto mt-14 grid max-w-[90rem] grid-cols-1 items-stretch gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {resources.map((resource) => (
            <article
              key={resource.href}
              className="group relative flex min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white/60 shadow-lg shadow-slate-200/40 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-amber-400/60 hover:shadow-xl hover:shadow-amber-500/10 dark:border-white/10 dark:bg-slate-900/60 dark:shadow-none dark:hover:border-amber-500/40 dark:hover:shadow-amber-500/10"
            >
              {/* Card Header Content */}
              <div className="flex-1 p-5 sm:p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-amber-500/10 bg-gradient-to-br from-amber-50 to-orange-50 text-2xl shadow-sm dark:from-amber-500/10 dark:to-orange-500/5">
                    {resource.icon}
                  </div>

                  <div className="min-w-0 flex-1 pt-0.5">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
                      {resource.category}
                    </span>
                    <h3 className="mt-1 truncate text-lg font-bold leading-snug text-slate-900 dark:text-white">
                      {resource.title}
                    </h3>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-400 line-clamp-2">
                  {resource.description}
                </p>
              </div>

              {/* Premium Iframe Preview Container */}
              <div className="px-4">
                <div className="relative overflow-hidden rounded-xl border border-slate-200/80 bg-slate-100 shadow-inner dark:border-white/10 dark:bg-slate-950">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/5 to-transparent pointer-events-none z-10 dark:from-black/20" />
                  <iframe
                    src={resource.href}
                    title={`${resource.title} learning lab preview`}
                    loading="lazy"
                    className="block aspect-video w-full border-0 bg-white sm:h-48"
                    referrerPolicy="strict-origin-when-cross-origin"
                    tabIndex={isLocked ? -1 : 0}
                  />
                </div>
              </div>

              {/* Card Footer */}
              <div className="mt-auto flex items-center justify-between gap-3 p-4 pt-5 sm:px-6 sm:pb-6">
                <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">
                  <span className="relative flex h-1.5 w-1.5">
                     <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                     <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                  </span>
                  Live Lab
                </div>

                <a
                  href={resource.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={isLocked ? -1 : 0}
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-amber-500/20 transition-all duration-200 hover:from-amber-400 hover:to-orange-400 hover:shadow-lg hover:shadow-amber-500/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 active:scale-[0.98] sm:text-sm dark:focus-visible:ring-offset-slate-900"
                >
                  Open Lab
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}

export default PremiumResources