'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Terminal, BookOpen, Sparkles } from 'lucide-react';

export const resources = [
  {
    title: 'Machine Learning',
    description: 'Explore machine learning concepts, supervised models, and practical examples.',
    href: '/skills/ml-course.html',
    icon: '🤖',
    category: 'AI & ML',
  },
  {
    title: 'NumPy',
    description: 'Practice multi-dimensional arrays, numerical operations, and matrix calculations.',
    href: '/skills/numpy-course.html',
    icon: '🔢',
    category: 'Python',
  },
  {
    title: 'Pandas',
    description: 'Learn DataFrames, data cleaning, manipulation, and real-world data analysis.',
    href: '/skills/pandas-course.html',
    icon: '🐼',
    category: 'Data Analysis',
  },
  {
    title: 'SQL Lab',
    description: 'Practice live SQL queries, relational joins, aggregations, and database fundamentals.',
    href: '/skills/sql-lab.html',
    icon: '🗄️',
    category: 'Database',
  },
];

export const skills = [
  
  {
    title: 'JavaScript',
    coverImg: '/skills/javascript.svg',
    href: '/premium-resources/javascript',
    description:
      'Learn JavaScript fundamentals, ES6+, asynchronous programming, DOM manipulation, and practical concepts.',
    category: 'Programming',
    status: 'published',
    gradient: 'from-yellow-100 via-amber-50 to-white',
    logoColor: '#F7DF1E',
  },
  {
    title: 'React.js',
    coverImg: '/skills/react.svg',
    href: '/premium-resources/react',
    description:
      'Build interactive user interfaces using components, hooks, state management, and modern React patterns.',
    category: 'Frontend',
    status: 'published',
    gradient: 'from-cyan-100 via-sky-50 to-white',
    logoColor: '#61DAFB',
  },
  {
    title: 'Backend Development',
    coverImg: '/skills/nodejs.svg',
    href: '/premium-resources/backend',
    description:
      'Understand server-side development, Node.js, Express.js, REST APIs, authentication, and deployment.',
    category: 'Backend',
    status: 'published',
    gradient: 'from-green-100 via-emerald-50 to-white',
    logoColor: '#339933',
  },
  {
    title: 'MySQL',
    coverImg: '/skills/mysql.svg',
    href: '/premium-resources/mysql',
    description:
      'Learn relational databases, SQL queries, joins, constraints, indexing, and database management.',
    category: 'Database',
    status: 'published',
    gradient: 'from-sky-100 via-blue-50 to-white',
    logoColor: '#4479A1',
  },
  {
    title: 'MongoDB',
    coverImg: '/skills/mongodb.svg',
    href: '/premium-resources/mongodb',
    description:
      'Explore NoSQL databases, collections, documents, CRUD operations, aggregation, and database design.',
    category: 'Database',
    status: 'published',
    gradient: 'from-green-100 via-lime-50 to-white',
    logoColor: '#47A248',
  },
  {
    title: 'C++ Programming',
    coverImg: '/skills/cpp.svg',
    href: '/premium-resources/cpp',
    description:
      'Build strong programming fundamentals with C++, covering syntax, functions, pointers, OOP, and STL.',
    category: 'Programming',
    status: 'published',
    gradient: 'from-blue-100 via-indigo-50 to-white',
    logoColor: '#00599C',
  },
  {
    title: 'Python',
    coverImg: '/skills/python.svg',
    href: '/premium-resources/python',
    description:
      'Learn Python programming, data structures, functions, object-oriented programming, and practical applications.',
    category: 'Programming',
    status: 'published',
    gradient: 'from-yellow-100 via-blue-50 to-white',
    logoColor: '#3776AB',
  },
  {
    title: 'Next.js',
    coverImg: '/skills/nextjs.svg',
    href: '/premium-resources/nextjs',
    description:
      'Develop production-ready web applications using App Router, server components, routing, and rendering.',
    category: 'Frontend',
    status: 'published',
    gradient: 'from-gray-200 via-slate-100 to-white',
    logoColor: '#000000',
  },
  {
    title: 'TypeScript',
    coverImg: '/skills/typescript.svg',
    href: '/premium-resources/typescript',
    description:
      'Write safer and more maintainable JavaScript applications with types, interfaces, generics, and advanced concepts.',
    category: 'Programming',
    status: 'published',
    gradient: 'from-blue-100 via-sky-50 to-white',
    logoColor: '#3178C6',
  },
  {
    title: 'Operating Systems',
    coverImg: '/skills/os.svg',
    href: '/premium-resources/operating-systems',
    description:
      'Understand processes, threads, CPU scheduling, memory management, synchronization, and deadlocks.',
    category: 'Core CS',
    status: 'published',
    gradient: 'from-purple-100 via-violet-50 to-white',
    logoColor: '#7E57C2',
  },
  {
    title: 'Computer Networks',
    coverImg: '/skills/computer-networks.svg',
    href: '/premium-resources/computer-networks',
    description:
      'Explore networking fundamentals, OSI and TCP/IP models, protocols, routing, and network security.',
    category: 'Core CS',
    status: 'published',
    gradient: 'from-orange-100 via-amber-50 to-white',
    logoColor: '#EA580C',
  },{
    title: 'DSA ',
    coverImg: '/skills/cpp.svg',
    href: '/premium/dsa-with-cpp',
    description:
      'Master data structures, algorithms, problem-solving patterns, and coding interview questions using C++.',
    category: 'Programming',
    status: 'coming-soon',
    gradient: 'from-blue-100 via-indigo-50 to-white',
    logoColor: '#00599C',
  }
];

const PremiumResourcesPage = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  
  useEffect(() => {
    const checkAuth = () => {
      const user = localStorage.getItem('user');
      setIsAuthenticated(!!user);
    };

    checkAuth();
    window.addEventListener('auth-change', checkAuth);
    return () => window.removeEventListener('auth-change', checkAuth);
  }, []);

  const handleGoogleLogin = () => {
    router.push(`/login?redirect=${pathname}`);
  };

  // Trigger auth modal only when an unauthenticated user clicks "Open Lab"
  // Keeps the directory 100% visible for Googlebot & AdSense crawlers
  const handleLabClick = (e, href) => {
    if (!isAuthenticated) {
      e.preventDefault();
      setShowAuthModal(true);
    } else {
      window.open(href, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <>
      {/* --- On-Demand Auth Modal Overlay --- */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-md transition-all duration-300">
          <div className="relative w-full max-w-md animate-in fade-in zoom-in-95 duration-300 overflow-hidden rounded-[2rem] border border-slate-200/50 bg-white/95 p-8 text-center shadow-2xl shadow-slate-900/20 backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/95 dark:shadow-black/50">
            <div className="pointer-events-none absolute -right-12 -top-12 -z-10 h-32 w-32 rounded-full bg-amber-400/20 blur-2xl" />

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-amber-500/20 bg-gradient-to-br from-amber-50 to-orange-50 shadow-sm dark:from-amber-500/10 dark:to-orange-500/5">
              <svg
                className="h-8 w-8 text-amber-600 dark:text-amber-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                />
              </svg>
            </div>

            <h3 className="mt-6 text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Sign In to Launch Lab
            </h3>

            <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              Please sign in with your free Notiya Google account to unlock full-screen interactive coding labs and save your progress.
            </p>

            <div className="mt-8 flex flex-col gap-3">
              <button
                onClick={handleGoogleLogin}
                className="inline-flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-4 text-sm font-bold text-slate-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 hover:shadow-md active:scale-[0.98] dark:border-slate-700 dark:bg-slate-800 dark:text-white"
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
                onClick={() => setShowAuthModal(false)}
                className="inline-flex w-full items-center justify-center rounded-xl px-4 py-3 text-sm font-bold text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800"
              >
                Continue Browsing
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- Main Page Content --- */}
      <main className="relative isolate overflow-hidden rounded-[2.5rem] border border-slate-200/60 bg-gradient-to-br from-slate-50 to-slate-100/50 px-5 py-14 shadow-2xl shadow-slate-200/40 dark:border-white/[0.08] dark:from-slate-900 dark:to-slate-950 dark:shadow-none sm:px-8 lg:px-12 lg:py-20">
        {/* Background Ambient Glows */}
        <div className="pointer-events-none absolute -right-32 -top-32 -z-10 h-[30rem] w-[30rem] rounded-full bg-amber-400/10 blur-[100px] dark:bg-amber-500/10" />
        <div className="pointer-events-none absolute -bottom-32 -left-32 -z-10 h-[30rem] w-[30rem] rounded-full bg-blue-500/10 blur-[100px] dark:bg-blue-600/10" />

        {/* 1. Primary Hero Heading (H1 for SEO) */}
        <header className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
            <Sparkles className="h-3.5 w-3.5" />
            Notiya Skill Hub & Labs
          </div>

          <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            Learn by{' '}
            <span className="bg-gradient-to-r from-amber-400 via-amber-500 to-orange-600 bg-clip-text text-transparent drop-shadow-sm">
              doing.
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-400 sm:text-lg">
            Explore structured technical tracks, practice in interactive coding sandboxes, and master core computer science and development concepts at your own pace.
          </p>
        </header>

        {/* 2. Technical Skills Curriculum Section */}
        <section aria-labelledby="skills-heading" className="mt-14">
          <div className="mb-8 flex flex-col justify-between gap-2 border-b border-slate-200/80 pb-4 dark:border-white/10 sm:flex-row sm:items-end">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                <BookOpen className="h-4 w-4" />
                Structured Learning Paths
              </div>
              <h2 id="skills-heading" className="mt-1 text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
                Core Technical Skills & Roadmaps
              </h2>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Step-by-step tutorials, real-world patterns & interview prep
            </p>
          </div>

          <div className="grid grid-cols-2 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map((skill) => {
              const CardContent = (
                <article
                  className={`
                    group relative h-full overflow-hidden rounded-2xl
                    border border-gray-200/70 dark:border-white/10
                    bg-gradient-to-br ${skill.gradient}
                    dark:from-[#18181b] dark:via-[#141416] dark:to-[#101012]
                    p-6 transition-all duration-300
                    hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5
                    dark:hover:shadow-black/30 dark:hover:border-white/20
                  `}
                >
                  {/* Brand Glow */}
                  <div
                    className="absolute -right-12 -top-12 h-40 w-40 rounded-full opacity-20 blur-3xl transition-opacity duration-300 group-hover:opacity-40 dark:opacity-25"
                    style={{ backgroundColor: skill.logoColor }}
                  />

                  <div className="relative z-10 flex h-full flex-col gap-5">
                    <div className="flex items-start justify-between">
                      <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-white/60 bg-white/80 p-2.5 shadow-sm dark:border-white/10 dark:bg-white/10 dark:backdrop-blur-md">
                        <Image
                          src={skill.coverImg}
                          alt={`${skill.title} course icon`}
                          width={40}
                          height={40}
                          className="h-full w-full object-contain"
                        />
                      </div>

                      {skill.status === 'coming-soon' ? (
                        <span className="rounded-full border border-gray-300/50 bg-white/70 px-3 py-1 text-xs font-semibold text-gray-600 dark:border-white/10 dark:bg-white/10 dark:text-gray-300">
                          Coming Soon
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200/60 bg-emerald-50/80 px-3 py-1 text-xs font-semibold text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400">
                         </span>
                      )}
                    </div>

                    <div className="flex-1 space-y-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        {skill.category}
                      </span>
                      <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {skill.title}
                      </h3>
                      <p className="line-clamp-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                        {skill.description}
                      </p>
                    </div>
                  </div>
                </article>
              );

              return skill.status === 'coming-soon' ? (
                <div key={skill.href} className="h-full cursor-not-allowed opacity-80">
                  {CardContent}
                </div>
              ) : (
                <Link key={skill.href} href={skill.href} className="block h-full">
                  {CardContent}
                </Link>
              );
            })}
          </div>
        </section>

        {/* 3. Dedicated Title & Section for Interactive Practice Labs */}
        <section aria-labelledby="labs-heading" className="mt-20">
          <div className="mb-8 flex flex-col justify-between gap-2 border-b border-slate-200/80 pb-4 dark:border-white/10 sm:flex-row sm:items-end">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                <Terminal className="h-4 w-4" />
                Browser-Based Sandboxes
              </div>
              <h2 id="labs-heading" className="mt-1 text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
                Interactive Practice Labs
              </h2>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Run real code, execute SQL queries, and train models directly in your browser
            </p>
          </div>

          <div className="mx-auto grid max-w-[90rem] grid-cols-1 items-stretch gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {resources.map((resource) => (
              <article
                key={resource.href}
                className="group relative flex min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white/70 shadow-lg shadow-slate-200/40 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-amber-400/60 hover:shadow-xl hover:shadow-amber-500/10 dark:border-white/10 dark:bg-slate-900/60 dark:shadow-none dark:hover:border-amber-500/40"
              >
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

                  <p className="mt-4 line-clamp-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {resource.description}
                  </p>
                </div>

                {/* Lab Preview Container */}
                <div className="px-4">
                  <div className="relative overflow-hidden rounded-xl border border-slate-200/80 bg-slate-100 shadow-inner dark:border-white/10 dark:bg-slate-950">
                    <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-slate-900/10 to-transparent dark:from-black/30" />
                    <iframe
                      src={resource.href}
                      title={`${resource.title} interactive learning lab`}
                      loading="lazy"
                      className="block aspect-video w-full border-0 bg-white sm:h-44"
                      referrerPolicy="strict-origin-when-cross-origin"
                    />
                  </div>
                </div>

                {/* Card Footer */}
                <div className="mt-auto flex items-center justify-between gap-3 p-4 pt-5 sm:px-6 sm:pb-6">
                  <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                    </span>
                    Live Sandbox
                  </div>

                  <a
                    href={resource.href}
                    onClick={(e) => handleLabClick(e, resource.href)}
                    className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-amber-500/20 transition-all duration-200 hover:from-amber-400 hover:to-orange-400 hover:shadow-lg hover:shadow-amber-500/30 active:scale-[0.98] sm:text-sm"
                  >
                    Open Lab
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* 4. SEO & AdSense Rich Text Section */}
        <section
          aria-labelledby="about-hub-heading"
          className="mt-20 rounded-2xl border border-slate-200/70 bg-white/50 p-6 sm:p-8 dark:border-white/10 dark:bg-slate-900/40"
        >
          <h2 id="about-hub-heading" className="text-xl font-bold text-slate-900 dark:text-white">
            Why Practice with Notiya Interactive Labs & Skill Tracks?
          </h2>
          <div className="mt-4 grid gap-6 text-sm leading-relaxed text-slate-600 dark:text-slate-400 md:grid-cols-2">
            <p>
              Traditional university syllabi and static textbooks often focus heavily on theoretical definitions without showing how concepts work in production. Our <strong>structured skill roadmaps</strong> bridge the gap between academic computer science subjects—such as <em>Operating Systems, Computer Networks, and DBMS</em>—and modern industry stacks like <em>React.js, Next.js, Node.js, and TypeScript</em>.
            </p>
            <p>
              Each module is paired with <strong>browser-based interactive labs</strong> for Python, NumPy, Pandas, Machine Learning, and SQL. You can write queries, manipulate DataFrames, and test algorithms directly in your browser without complex local setup, making exam revision and technical interview preparation faster and more practical.
            </p>
          </div>
        </section>
      </main>
    </>
  );
};

export default PremiumResourcesPage;