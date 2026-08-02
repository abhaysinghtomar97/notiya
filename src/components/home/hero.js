'use client';

import { Search, FileText, CircleHelp, BookOpen, Star, Rocket, Shield, Target, Heart } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Typewriter } from "react-simple-typewriter";

export default function Hero() {
  const trending = [
    {
      "name": "DBMS",
      "url": "https://www.notiya.in/study-material/aktu/btech/3rd-year/CSE/database-management-system"
    },
    {
      "name": "Computer Networks",
      "url": "https://www.notiya.in/study-material/aktu/btech/3rd-year/CSE/computer-networks"
    },
    {
      "name": "AI",
      "url": "https://www.notiya.in/study-material/aktu/btech/3rd-year/CS-AI/artificial-intelligence"
    },
    {
      "name": "Data Structures",
      "url": "https://www.notiya.in/study-material/psit/btech/1st-year/CSE/data-structures" 
    }
  ];

  const handleOpenSearch = () => {
    window.dispatchEvent(new Event('open-search'));
  };

  return (
    <section className="relative w-full pt-20 pb-12 px-4 lg:px-8 overflow-hidden bg-[#fffdfa] dark:bg-background transition-colors duration-300">
      
      {/* --- BACKGROUND EFFECTS --- */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Soft orange/amber wavy glows - Adjusted for dark mode */}
        <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-gradient-to-br from-orange-200/40 to-amber-100/40 dark:from-orange-900/20 dark:to-amber-900/20 blur-3xl opacity-80" />
        <div className="absolute top-[20%] -right-[15%] w-[70%] h-[80%] rounded-[100%] bg-gradient-to-tl from-orange-200/50 via-amber-100/30 dark:from-orange-900/30 dark:via-amber-900/20 to-transparent blur-3xl opacity-70 transform rotate-12" />
        
        {/* Decorative Stars */}
        <svg className="absolute top-[15%] left-[45%] text-amber-300 dark:text-amber-600/50 w-6 h-6 opacity-60" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
        </svg>
        <svg className="absolute top-[40%] right-[30%] text-amber-300 dark:text-amber-600/40 w-4 h-4 opacity-40" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
        </svg>
        <svg className="absolute bottom-[35%] left-[10%] text-amber-200 dark:text-amber-700/50 w-5 h-5 opacity-50" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
        </svg>
      </div>
      {/* --- END BACKGROUND EFFECTS --- */}

      
      {/* Main Hero Content (Two Column Layout) */}
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center min-h-[60vh] relative z-10">
        
        {/* Left Column - Text & Search */}
        <div className="space-y-4 text-left">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.1]">
            Study smarter.<br />
            <span className="text-foreground">Find <span className="text-amber-500 dark:text-amber-400">
              <Typewriter
                words={["AKTU", "PSIT", "CSJMU", "B.tech", "BCA", "BBA", "IIT's"]}
                loop={0}
                cursor
                cursorStyle=""
                typeSpeed={100}
                deleteSpeed={60}
                delaySpeed={1500}
              /><br/>
            </span> resources instantly.</span>
          </h1>
          
          <p className="text-lg text-foreground/70 max-w-lg leading-relaxed">
            Unit-wise notes, PYQs, syllabus and important questions organized semester-wise for AKTU students.
          </p>

          {/* Interactive Search Bar */}
          <div className="max-w-xl">
            <div
              onClick={handleOpenSearch}
              className="relative group cursor-text"
            >
              <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-foreground/40 group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors" />
              </div>
              <div className="w-full h-16 pl-14 pr-4 bg-background border border-border/60 rounded-full shadow-sm flex items-center text-foreground/50 text-lg hover:shadow-md hover:border-amber-500/50 transition-all">
                Search notes, PYQs, subjects...
              </div>
              <div className="absolute inset-y-0 right-3 flex items-center">
                <kbd className="hidden sm:inline-flex h-8 items-center gap-1 rounded-full border-none bg-amber-100 dark:bg-amber-500/20 px-3 font-mono text-sm font-semibold text-amber-700 dark:text-amber-400">
                  Ctrl K
                </kbd>
              </div>
            </div>

            {/* Trending Chips */}
            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm">
              <span className="text-foreground/70 font-medium mr-2">Trending:</span>
              {trending.map((subject, index) => (
                <Link
                  key={index}
                  href={subject.url}
                  className="px-4 py-1.5 bg-background border border-border/60 rounded-full hover:border-amber-500 dark:hover:border-amber-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors cursor-pointer text-foreground/70 shadow-sm"
                >
                  {subject.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Graphics & Floating Cards */}
        <div className="relative hidden lg:flex justify-center items-center h-full min-h-[500px]">
          {/* Central Image Placeholder (Books with Grad Cap) */}
          <div className="relative z-10 w-full max-w-[500px] aspect-square">
            <Image
              src="/books-illustrations.png"
              alt="Hero Books"
              fill
              priority
              sizes="(max-width: 768px) 80vw, 500px"
              className="object-contain"
              draggable={false}
            />
          </div>

          {/* Floating Card 1: Notes */}
          <div className="absolute top-10 left-0 bg-background/90 dark:bg-background/80 backdrop-blur-sm p-4 rounded-2xl shadow-xl dark:shadow-2xl flex items-center gap-4 border border-border/50 animate-bounce-slow">
            <div className="bg-amber-100 dark:bg-amber-500/20 p-2 rounded-lg">
              <FileText className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <p className="font-bold text-sm text-foreground">Notes</p>
              <p className="text-xs text-foreground/60">Unit-wise & easy<br/>to understand</p>
            </div>
          </div>

          {/* Floating Card 2: PYQs */}
          <div className="absolute top-16 right-0 bg-background/90 dark:bg-background/80 backdrop-blur-sm p-4 rounded-2xl shadow-xl dark:shadow-2xl flex items-center gap-4 border border-border/50 animate-bounce-slow" style={{ animationDelay: '1s' }}>
            <div className="bg-amber-100 dark:bg-amber-500/20 p-2 rounded-lg">
              <CircleHelp className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <p className="font-bold text-sm text-foreground">PYQs</p>
              <p className="text-xs text-foreground/60">Previous year<br/>questions</p>
            </div>
          </div>

          {/* Floating Card 3: Syllabus */}
          <div className="absolute bottom-20 left-4 bg-background/90 dark:bg-background/80 backdrop-blur-sm p-4 rounded-2xl shadow-xl dark:shadow-2xl flex items-center gap-4 border border-border/50 animate-bounce-slow" style={{ animationDelay: '2s' }}>
            <div className="bg-amber-100 dark:bg-amber-500/20 p-2 rounded-lg">
              <BookOpen className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <p className="font-bold text-sm text-foreground">Syllabus</p>
              <p className="text-xs text-foreground/60">Semester-wise<br/>syllabus</p>
            </div>
          </div>

          {/* Floating Card 4: Important */}
          <div className="absolute bottom-28 right-4 bg-background/90 dark:bg-background/80 backdrop-blur-sm p-4 rounded-2xl shadow-xl dark:shadow-2xl flex items-center gap-4 border border-border/50 animate-bounce-slow" style={{ animationDelay: '0.5s' }}>
            <div className="bg-amber-100 dark:bg-amber-500/20 p-2 rounded-lg">
              <Star className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <p className="font-bold text-sm text-foreground">Important</p>
              <p className="text-xs text-foreground/60">Important questions<br/>& updates</p>
            </div>
          </div>
        </div>
      </div>

      
    </section>
  );
}