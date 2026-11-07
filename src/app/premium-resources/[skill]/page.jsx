'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  BookOpen,
  CheckCircle2,
  Circle,
  ChevronRight,
  Copy,
  Check,
  Lightbulb,
  AlertTriangle,
  Terminal,
  ArrowLeft,
  Award,
  HelpCircle,
  Table,
  Play,
  ListChecks,
} from 'lucide-react';
import { getSkillCurriculum } from './skillsdata';

export default function SkillDetailPage() {
  const params = useParams();
  const skillSlug = params?.skill || 'javascript';
  const course = getSkillCurriculum(skillSlug);

  const [completedIds, setCompletedIds] = useState([]);
  const [copiedId, setCopiedId] = useState(null);
  const [openSolutions, setOpenSolutions] = useState({});

  useEffect(() => {
    const saved = localStorage.getItem(`notiya_progress_${skillSlug}`);
    if (saved) {
      try {
        setCompletedIds(JSON.parse(saved));
      } catch (e) {
        setCompletedIds([]);
      }
    } else {
      setCompletedIds([]);
    }
  }, [skillSlug]);

  const toggleComplete = (moduleId) => {
    const updated = completedIds.includes(moduleId)
      ? completedIds.filter((id) => id !== moduleId)
      : [...completedIds, moduleId];
    setCompletedIds(updated);
    localStorage.setItem(`notiya_progress_${skillSlug}`, JSON.stringify(updated));
  };

  const handleCopyCode = (id, codeText) => {
    navigator.clipboard.writeText(codeText);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleSolution = (id) => {
    setOpenSolutions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const progressPercent = Math.round(
    (completedIds.length / course.modules.length) * 100
  );

  return (
    <div className="min-h-screen bg-slate-50/60 pb-24 pt-6 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* 1. SEO Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="mb-6 flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400"
        >
          <Link href="/" className="hover:text-amber-600 dark:hover:text-amber-400">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link
            href="/premium-resources"
            className="hover:text-amber-600 dark:hover:text-amber-400"
          >
            Skills & Labs
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="font-semibold text-slate-900 dark:text-white">
            {course.title}
          </span>
        </nav>

        {/* 2. Course Hero Header */}
        <header className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-900 sm:p-8">
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-amber-400/10 blur-3xl" />

          <div className="relative z-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
            <div className="max-w-3xl space-y-3">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                  🌱 {course.level}
                </span>
                <span className="rounded-full bg-amber-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                  {course.category}
                </span>
                <span className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-600 dark:border-white/10 dark:text-slate-300">
                  ⏱ {course.estimatedHours}
                </span>
              </div>

              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                {course.title}
              </h1>

              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400 sm:text-base">
                {course.overview}
              </p>
            </div>

            {/* Progress Tracker Card */}
            <div className="w-full shrink-0 rounded-2xl border border-slate-200/80 bg-slate-50/80 p-5 dark:border-white/10 dark:bg-slate-800/50 lg:w-72">
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <span>Your Progress</span>
                <span className="text-amber-600 dark:text-amber-400">
                  {progressPercent}% Done
                </span>
              </div>
              <div className="mt-2.5 h-2.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <p className="mt-2.5 text-xs text-slate-500 dark:text-slate-400">
                {completedIds.length} of {course.modules.length} lessons completed
              </p>
            </div>
          </div>
        </header>

        {/* 3. Two-Column Layout: Sticky TOC Sidebar + Step-by-Step Beginner Guide */}
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* LEFT SIDEBAR */}
          <aside className="lg:col-span-4">
            <div className="sticky top-24 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-slate-900">
              <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3 dark:border-white/10">
                <h2 className="flex items-center gap-2 text-base font-bold text-slate-900 dark:text-white">
                  <BookOpen className="h-4 w-4 text-amber-500" />
                  Step-by-Step Lessons
                </h2>
                <span className="text-xs font-medium text-slate-400">
                  {course.modules.length} Steps
                </span>
              </div>

              <div className="space-y-2">
                {course.cheatSheet && (
                  <a
                    href="#quick-cheatsheet"
                    className="flex items-center gap-3 rounded-xl bg-amber-50/70 p-3 text-xs font-bold text-amber-800 transition hover:bg-amber-100/70 dark:bg-amber-500/10 dark:text-amber-300"
                  >
                    <Table className="h-4 w-4 shrink-0 text-amber-500" />
                    Beginner Cheat Sheet
                  </a>
                )}

                {course.modules.map((mod) => {
                  const isDone = completedIds.includes(mod.id);
                  return (
                    <a
                      key={mod.id}
                      href={`#${mod.id}`}
                      className="flex w-full items-start gap-3 rounded-xl p-3 text-left text-slate-600 transition hover:bg-slate-100/80 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/60 dark:hover:text-white"
                    >
                      <span className="mt-0.5 shrink-0">
                        {isDone ? (
                          <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                        ) : (
                          <Circle className="h-5 w-5 text-slate-300 dark:text-slate-600" />
                        )}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold leading-snug">{mod.title}</p>
                        <span className="mt-1 block text-xs text-slate-400">
                          {mod.duration}
                        </span>
                      </div>
                    </a>
                  );
                })}
              </div>

              <div className="mt-6 border-t border-slate-100 pt-4 dark:border-white/10">
                <Link
                  href="/premium-resources"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-600 transition hover:bg-slate-50 dark:border-white/10 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Back to All Skills & Labs
                </Link>
              </div>
            </div>
          </aside>

          {/* RIGHT CONTENT */}
          <main className="space-y-10 lg:col-span-8">
            {/* A. Beginner Cheat Sheet */}
            {course.cheatSheet && (
              <section
                id="quick-cheatsheet"
                className="scroll-mt-24 overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-900 sm:p-8"
              >
                <div className="flex items-center gap-2.5">
                  <Table className="h-5 w-5 text-amber-500" />
                  <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
                    Quick Beginner Cheat Sheet
                  </h2>
                </div>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                  Keep these basic commands handy while reading the lessons below.
                </p>

                <div className="mt-5 overflow-x-auto rounded-2xl border border-slate-200/80 dark:border-white/10">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-100/80 text-xs font-bold uppercase text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                      <tr>
                        <th className="px-4 py-3.5">What You Want To Do</th>
                        <th className="px-4 py-3.5">Code Syntax</th>
                        <th className="px-4 py-3.5">Simple Rule</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200/60 dark:divide-white/10">
                      {course.cheatSheet.map((row, idx) => (
                        <tr
                          key={idx}
                          className="bg-white hover:bg-slate-50/80 dark:bg-slate-900 dark:hover:bg-slate-800/40"
                        >
                          <td className="px-4 py-3.5 font-bold text-slate-900 dark:text-white">
                            {row.concept}
                          </td>
                          <td className="px-4 py-3.5 font-mono text-xs text-amber-700 dark:text-amber-400">
                            {row.syntax}
                          </td>
                          <td className="px-4 py-3.5 text-slate-600 dark:text-slate-300">
                            {row.keyRule}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {/* B. Beginner Modules */}
            {course.modules.map((mod, index) => {
              const isCompleted = completedIds.includes(mod.id);
              const isSolutionOpen = !!openSolutions[mod.id];

              return (
                <article
                  key={mod.id}
                  id={mod.id}
                  className="scroll-mt-24 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-900 sm:p-8"
                >
                  {/* Module Header */}
                  <div className="flex flex-col justify-between gap-4 border-b border-slate-100 pb-6 dark:border-white/10 sm:flex-row sm:items-center">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                        Step {index + 1} of {course.modules.length} • {mod.duration}
                      </span>
                      <h2 className="mt-1 text-2xl font-extrabold text-slate-900 dark:text-white">
                        {mod.title}
                      </h2>
                    </div>

                    <button
                      onClick={() => toggleComplete(mod.id)}
                      className={`inline-flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition ${
                        isCompleted
                          ? 'border border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200'
                      }`}
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      {isCompleted ? 'Completed' : 'Mark as Done'}
                    </button>
                  </div>

                  {/* Plain-English Concept */}
                  <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-700 dark:text-slate-300">
                    {mod.concept.split('\n\n').map((para, i) => (
                      <p key={i} className="whitespace-pre-line">
                        {para}
                      </p>
                    ))}
                  </div>

                  {/* Real-World Example Box */}
                  <div className="mt-6 flex items-start gap-3.5 rounded-2xl border border-amber-500/20 bg-amber-50/60 p-4 dark:bg-amber-500/10">
                    <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400" />
                    <div className="text-sm leading-relaxed text-slate-700 dark:text-slate-200">
                      <strong className="font-bold text-slate-900 dark:text-white">
                        Where You Will Use This:{' '}
                      </strong>
                      {mod.whyItMatters}
                    </div>
                  </div>

                  {/* Beginner Friendly Code Terminal + Expected Output */}
                  <div className="mt-8 overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 text-slate-100 shadow-lg">
                    <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900 px-4 py-3">
                      <div className="flex items-center gap-2 font-mono text-xs text-slate-300">
                        <Terminal className="h-4 w-4 text-amber-400" />
                        <span>{mod.codeTitle}</span>
                      </div>
                      <button
                        onClick={() => handleCopyCode(mod.id, mod.code)}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-slate-800 px-3 py-1 text-xs font-medium text-slate-300 hover:bg-slate-700"
                      >
                        {copiedId === mod.id ? (
                          <>
                            <Check className="h-3.5 w-3.5 text-emerald-400" />
                            Copied
                          </>
                        ) : (
                          <>
                            <Copy className="h-3.5 w-3.5" />
                            Copy Code
                          </>
                        )}
                      </button>
                    </div>

                    {/* Code Snippet */}
                    <pre className="overflow-x-auto p-5 font-mono text-xs leading-relaxed sm:text-sm">
                      <code>{mod.code}</code>
                    </pre>

                    {/* Expected Terminal Output Box */}
                    {mod.output && (
                      <div className="border-t border-slate-800 bg-slate-900/90 p-4">
                        <div className="mb-1.5 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                          <Play className="h-3 w-3 fill-emerald-400" />
                          Expected Output:
                        </div>
                        <pre className="font-mono text-xs leading-relaxed text-emerald-300 sm:text-sm">
                          <code>{mod.output}</code>
                        </pre>
                      </div>
                    )}
                  </div>

                  {/* Line-by-Line Code Breakdown for Beginners */}
                  {mod.lineByLine && mod.lineByLine.length > 0 && (
                    <div className="mt-6 rounded-2xl border border-sky-500/20 bg-sky-50/50 p-5 dark:bg-sky-500/5">
                      <h3 className="flex items-center gap-2 text-sm font-bold text-sky-900 dark:text-sky-300">
                        <ListChecks className="h-4 w-4 text-sky-600 dark:text-sky-400" />
                        Line-by-Line Explanation (How the Code Works)
                      </h3>
                      <ul className="mt-3 space-y-2.5 text-sm text-slate-700 dark:text-slate-300">
                        {mod.lineByLine.map((line, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-sky-500/20 text-[10px] font-bold text-sky-700 dark:text-sky-300">
                              {idx + 1}
                            </span>
                            <span>{line}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Common Beginner Mistakes */}
                  <div className="mt-6 rounded-2xl border border-rose-500/20 bg-rose-50/40 p-5 dark:bg-rose-500/5">
                    <h3 className="flex items-center gap-2 text-sm font-bold text-rose-800 dark:text-rose-400">
                      <AlertTriangle className="h-4 w-4" />
                      Common Beginner Mistake to Watch Out For
                    </h3>
                    <ul className="mt-2.5 list-disc space-y-1.5 pl-5 text-sm text-slate-700 dark:text-slate-300">
                      {mod.pitfalls.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Quick Try-It-Yourself Challenge */}
                  <div className="mt-6 rounded-2xl border border-indigo-500/20 bg-indigo-50/40 p-5 dark:bg-indigo-500/10">
                    <div className="flex items-center justify-between">
                      <h3 className="flex items-center gap-2 text-sm font-bold text-indigo-900 dark:text-indigo-300">
                        <Award className="h-4 w-4" />
                        Your Turn (1-Minute Practice)
                      </h3>
                      <button
                        onClick={() => toggleSolution(mod.id)}
                        className="text-xs font-bold text-indigo-600 underline hover:text-indigo-500 dark:text-indigo-400"
                      >
                        {isSolutionOpen ? 'Hide Answer' : 'See Answer'}
                      </button>
                    </div>
                    <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
                      {mod.challenge}
                    </p>

                    {isSolutionOpen && (
                      <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-900 p-4 font-mono text-xs text-emerald-300">
                        <code>{mod.solution}</code>
                      </pre>
                    )}
                  </div>
                </article>
              );
            })}

            {/* C. Beginner FAQs */}
            {course.faqs && course.faqs.length > 0 && (
              <section className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-900 sm:p-8">
                <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-white">
                  <HelpCircle className="h-5 w-5 text-amber-500" />
                  Beginner Questions Answered
                </h2>
                <div className="mt-5 space-y-4">
                  {course.faqs.map((faq, idx) => (
                    <div
                      key={idx}
                      className="rounded-2xl border border-slate-100 bg-slate-50/60 p-5 dark:border-white/5 dark:bg-slate-800/40"
                    >
                      <h3 className="text-base font-bold text-slate-900 dark:text-white">
                        Q: {faq.q}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                        {faq.a}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}