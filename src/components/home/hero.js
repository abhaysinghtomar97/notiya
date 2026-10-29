
"use client";

import {
  Search,
  FileText,
  CircleHelp,
  BookOpen,
  Star,
  GraduationCap,
  Users,
  Eye,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Typewriter } from "react-simple-typewriter";
import CountUp from "@/components/ui/CountUp";

export default function Hero() {
  const trending = [
    {
      name: "DBMS",
      url: "/study-material/aktu/btech/3rd-year/CSE/database-management-system",
    },
    {
      name: "Computer Networks",
      url: "/study-material/aktu/btech/3rd-year/CSE/computer-networks",
    },
    {
      name: "AI",
      url: "/study-material/aktu/btech/3rd-year/CS-AI/artificial-intelligence",
    },
    {
      name: "Data Structures",
      url: "/study-material/psit/btech/1st-year/CSE/data-structures",
    },
  ];

  const handleOpenSearch = () => {
    window.dispatchEvent(new Event("open-search"));
  };

  const analytics = [
    {
      label: "Students visited",
      end: 3200,
      description: "Students discovering Notiya",
      icon: Users,
      iconStyle:
        "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400",
    },
    {
      label: "Resource views",
      end: 9500,
      description: "Notes and resources explored",
      icon: Eye,
      iconStyle:
        "bg-orange-100 text-orange-700 dark:bg-orange-500/15 dark:text-orange-400",
    },
  ];

  return (
    <section className="relative w-full overflow-hidden bg-[#fffdfa] px-4 pb-14 pt-16 transition-colors duration-300 dark:bg-background sm:px-6 sm:pt-20 lg:px-8 lg:pb-16">
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -left-[10%] -top-[20%] h-[60%] w-[60%] rounded-full bg-gradient-to-br from-orange-200/40 to-amber-100/40 opacity-80 blur-3xl dark:from-orange-900/20 dark:to-amber-900/20" />

        <div className="absolute -right-[15%] top-[20%] h-[80%] w-[70%] rotate-12 rounded-[100%] bg-gradient-to-tl from-orange-200/50 via-amber-100/30 to-transparent opacity-70 blur-3xl dark:from-orange-900/30 dark:via-amber-900/20" />

        <svg
          className="absolute left-[45%] top-[15%] h-6 w-6 text-amber-300 opacity-60 dark:text-amber-600/50"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
        </svg>

        <svg
          className="absolute right-[30%] top-[40%] h-4 w-4 text-amber-300 opacity-40 dark:text-amber-600/40"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
        </svg>

        <svg
          className="absolute bottom-[35%] left-[10%] h-5 w-5 text-amber-200 opacity-50 dark:text-amber-700/50"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
        </svg>
      </div>

      {/* Main hero */}
      <div className="relative z-10 mx-auto grid min-h-[60vh] max-w-7xl items-center gap-12 lg:grid-cols-2">
        {/* Left: Heading, search and analytics */}
        <div className="space-y-5 text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-200/80 bg-amber-50/80 px-3.5 py-1.5 text-sm font-medium text-amber-800 dark:border-amber-800/60 dark:bg-amber-500/10 dark:text-amber-300">
            <GraduationCap size={17} />
            <span>Your study companion</span>
            <ArrowUpRight size={15} />
          </div>

          <h1 className="text-4xl font-bold leading-[1.12] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl">
            Study smarter.
            <br />
            <span>
              Find{" "}
              <span className="text-amber-500 dark:text-amber-400">
                <Typewriter
                  words={[
                    "AKTU",
                    "PSIT",
                    "CSJMU",
                    "B.Tech",
                    "BCA",
                    "BBA",
                    "IITs",
                  ]}
                  loop={0}
                  cursor
                  cursorStyle=""
                  typeSpeed={100}
                  deleteSpeed={60}
                  delaySpeed={1500}
                />
              </span>
              <br />
              resources instantly.
            </span>
          </h1>

          <p className="max-w-xl text-base leading-7 text-foreground/70 sm:text-lg">
            Find unit-wise notes, previous year question papers, syllabus and
            important questions—all organized to make your exam preparation
            easier.
          </p>

          {/* Search bar */}
          <div className="max-w-xl pt-1">
            <button
              type="button"
              onClick={handleOpenSearch}
              aria-label="Open search for notes, previous year papers and subjects"
              className="group relative flex h-14 w-full items-center rounded-full border border-border/70 bg-background pl-12 pr-4 text-left text-sm text-muted-foreground shadow-sm transition-all hover:border-amber-500/60 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 sm:h-16 sm:pl-14 sm:text-base"
            >
              <Search className="absolute left-5 h-5 w-5 text-foreground/40 transition-colors group-hover:text-amber-500" />

              <span className="flex-1 truncate">
                Search notes, PYQs, subjects...
              </span>

              <kbd className="ml-3 hidden shrink-0 items-center rounded-full bg-amber-100 px-3 py-1.5 font-mono text-xs font-semibold text-amber-800 dark:bg-amber-500/15 dark:text-amber-300 sm:inline-flex">
                Ctrl K
              </kbd>
            </button>

            {/* Trending subjects */}
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <span className="mr-1 text-sm font-semibold text-foreground/70">
                Trending:
              </span>

              {trending.map((subject) => (
                <Link
                  key={subject.name}
                  href={subject.url}
                  className="rounded-full border border-border/70 bg-background/90 px-3.5 py-1.5 text-sm text-foreground/75 shadow-sm transition-colors hover:border-amber-500 hover:text-amber-700 dark:hover:text-amber-400"
                >
                  {subject.name}
                </Link>
              ))}
            </div>
          </div>


        </div>



        {/* Right: Analytics above illustration + floating cards */}
        <div className="relative hidden min-w-0 flex-col items-center justify-start gap-2 lg:flex">

          {/* 1. Analytics at the top */}
          <div className="relative z-30 w-full max-w-[440px]">
            <div className="mb-3 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400">
                  <TrendingUp size={17} />
                </div>

                <div>
                  <h2 className="text-sm font-bold text-foreground">
                    Notiya in numbers
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    Our community at a glance
                  </p>
                </div>
              </div>

              <span className="shrink-0 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-amber-800 dark:border-amber-800 dark:bg-amber-500/10 dark:text-amber-300">
                Last 30 days
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {analytics.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.label}
                    className="group relative overflow-hidden rounded-2xl border border-amber-200/70 bg-white/90 p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-border dark:bg-card/90"
                  >
                    <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-amber-400/10 blur-2xl" />

                    <div className="relative flex items-center gap-2">
                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${item.iconStyle}`}
                      >
                        <Icon size={19} />
                      </div>

                      <span className="text-xs font-medium text-muted-foreground sm:text-sm">
                        {item.label}
                      </span>
                    </div>

                    <p className="relative mt-3 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
                      <CountUp
                        end={item.end}
                        duration={2200}
                        suffix="+"
                      />
                    </p>

                    <p className="relative mt-1 text-[11px] leading-4 text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 2. Illustration and floating cards below analytics */}
          <div className="relative mt-2 w-full max-w-[540px]">

            {/* Illustration */}
            <div className="relative z-10 mx-auto aspect-square w-full max-w-[460px]">
              <Image
                src="/books-illustrations.png"
                alt="Books representing study resources on Notiya"
                fill
                priority
                sizes="(max-width: 1024px) 80vw, 460px"
                className="object-contain"
                draggable={false}
              />
            </div>

            {/* Floating card: Notes */}
            <div className="animate-bounce-slow absolute left-0 top-[12%] z-20 flex items-center gap-3 rounded-2xl border border-border/60 bg-background/95 p-3 shadow-lg backdrop-blur-sm xl:left-1">
              <div className="rounded-xl bg-amber-100 p-2 dark:bg-amber-500/20">
                <FileText className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">Notes</p>
                <p className="text-xs text-muted-foreground">
                  Unit-wise material
                </p>
              </div>
            </div>

            {/* Floating card: PYQs */}
            <div
              className="animate-bounce-slow absolute right-0 top-[18%] z-20 flex items-center gap-3 rounded-2xl border border-border/60 bg-background/95 p-3 shadow-lg backdrop-blur-sm xl:right-1"
              style={{ animationDelay: "1s" }}
            >
              <div className="rounded-xl bg-amber-100 p-2 dark:bg-amber-500/20">
                <CircleHelp className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">PYQs</p>
                <p className="text-xs text-muted-foreground">
                  Previous papers
                </p>
              </div>
            </div>

            {/* Floating card: Syllabus */}
            <div
              className="animate-bounce-slow absolute bottom-[16%] left-0 z-20 flex items-center gap-3 rounded-2xl border border-border/60 bg-background/95 p-3 shadow-lg backdrop-blur-sm xl:left-1"
              style={{ animationDelay: "2s" }}
            >
              <div className="rounded-xl bg-amber-100 p-2 dark:bg-amber-500/20">
                <BookOpen className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">Syllabus</p>
                <p className="text-xs text-muted-foreground">
                  Semester-wise
                </p>
              </div>
            </div>

            {/* Floating card: Important questions */}
            <div
              className="animate-bounce-slow absolute bottom-[12%] right-0 z-20 flex items-center gap-3 rounded-2xl border border-border/60 bg-background/95 p-3 shadow-lg backdrop-blur-sm xl:right-1"
              style={{ animationDelay: "0.5s" }}
            >
              <div className="rounded-xl bg-amber-100 p-2 dark:bg-amber-500/20">
                <Star className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">Important</p>
                <p className="text-xs text-muted-foreground">
                  Exam preparation
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
