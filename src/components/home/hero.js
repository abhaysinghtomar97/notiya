'use client';

import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Typewriter } from "react-simple-typewriter";
export default function Hero() {
  const trending = ['DBMS', 'DSA', 'OOPS', 'COA'];

  // Dispatch the custom event to open the Navbar's command palette
  const handleOpenSearch = () => {
    window.dispatchEvent(new Event('open-search'));
  };
  

  return (
    <section className="py-24 text-center px-4">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
          Study smarter.<br />
          <span className="text-foreground/80  ">Find   <span className="text-amber-500 ">
            <Typewriter
              words={["AKTU", "PSIT", "CSJMU"]}
              loop={0}
              cursor
              cursorStyle="🖋️"
              typeSpeed={100}
              deleteSpeed={60}
              delaySpeed={1500}
            />
          </span> resources <br/> instantly.</span>
        </h1>
        <p className="text-lg text-foreground/60 max-w-2xl mx-auto leading-relaxed">
          Unit-wise notes, PYQs, syllabus and important questions organized semester-wise for AKTU students.
        </p>

        {/* Interactive Search Bar */}
        <div className="mt-10 max-w-2xl mx-auto">
          <div
            onClick={handleOpenSearch}
            className="relative group cursor-text"
          >
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-foreground/40 group-hover:text-primary transition-colors" />
            </div>
            <div className="w-full h-14 pl-12 pr-4 bg-background border border-border rounded-xl shadow-sm flex items-center text-foreground/60 text-lg group-hover:border-primary/50 transition-colors">
              Search notes, PYQs, subjects...
            </div>
            <div className="absolute inset-y-0 right-4 flex items-center">
              <kbd className="hidden sm:inline-flex h-6 items-center gap-1 rounded border bg-muted px-2 font-mono text-xs font-medium text-foreground/60">
                Ctrl K
              </kbd>
            </div>
          </div>

          {/* Trending Chips */}
          <div className="mt-6 flex flex-wrap justify-center items-center gap-3 text-sm">
            <span className="text-foreground/60 font-medium">Trending:</span>
            {trending.map((subject) => (
              <span
                key={subject}
                onClick={handleOpenSearch} // Also opens search if they click a trending pill
                className="px-3 py-1 bg-muted border border-border rounded-full hover:border-primary hover:text-primary transition-colors cursor-pointer text-foreground/80"
              >
                {subject}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}