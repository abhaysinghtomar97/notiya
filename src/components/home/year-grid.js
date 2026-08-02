"use client";

import { 
  ArrowRight, 
  BookOpen, 
  Code2, 
  Target, 
  GraduationCap,
  Lock
} from 'lucide-react';
import Link from 'next/link';

export default function YearGrid() {
  // Mapping generic year levels to specific icons and colors
  const yearStyles = {
    1: {
      icon: BookOpen,
      color: 'text-blue-500 dark:text-blue-400',
      bg: 'bg-blue-100 dark:bg-blue-500/10',
      hoverGlow: 'group-hover:bg-blue-50 dark:group-hover:bg-blue-900/10'
    },
    2: {
      icon: Code2,
      color: 'text-emerald-500 dark:text-emerald-400',
      bg: 'bg-emerald-100 dark:bg-emerald-500/10',
      hoverGlow: 'group-hover:bg-emerald-50 dark:group-hover:bg-emerald-900/10'
    },
    3: {
      icon: Target,
      color: 'text-amber-500 dark:text-amber-400',
      bg: 'bg-amber-100 dark:bg-amber-500/10',
      hoverGlow: 'group-hover:bg-amber-50 dark:group-hover:bg-amber-900/10'
    },
    4: {
      icon: GraduationCap,
      color: 'text-purple-500 dark:text-purple-400',
      bg: 'bg-purple-100 dark:bg-purple-500/10',
      hoverGlow: 'group-hover:bg-purple-50 dark:group-hover:bg-purple-900/10'
    }
  };

  const categories = [
    {
      title: "AKTU B.Tech",
      themeText: "text-amber-600 dark:text-amber-500",
      themeBg: "bg-amber-100 dark:bg-amber-500/10",
      years: [
        { level: 1, title: '1st Year', resources: 105, link: '/aktu/btech/1st-year', isActive: true },
        { level: 2, title: '2nd Year', resources: 76, link: '/aktu/btech/2nd-year', isActive: true },
        { level: 3, title: '3rd Year', resources: 90, link: '/aktu/btech/3rd-year', isActive: true },
        { level: 4, title: '4th Year', resources: 56, link: '/aktu/btech/4th-year', isActive: true },
      ]
    },
    {
      title: "PSIT B.Tech",
      themeText: "text-blue-600 dark:text-blue-500",
      themeBg: "bg-blue-100 dark:bg-blue-500/10",
      description: "Autonomous batch resources",
      years: [
        { level: 1, title: '1st Year', resources: 45, link: '/psit/btech/1st-year', isActive: true },
        { level: 2, title: '2nd Year', resources: 32, link: '/psit/btech/2nd-year', isActive: true },
        { level: 3, title: '3rd Year', resources: 0, link: '#', isActive: false, note: "Coming Next Year" },
        { level: 4, title: '4th Year', resources: 0, link: '#', isActive: false, note: "Coming Later" },
      ]
    },
    {
      title: "CSJMU BCA",
      themeText: "text-emerald-600 dark:text-emerald-500",
      themeBg: "bg-emerald-100 dark:bg-emerald-500/10",
      years: [
        { level: 1, title: '1st Year', resources: 60, link: '/csjmu/bca/1st-year', isActive: true },
        { level: 2, title: '2nd Year', resources: 48, link: '/csjmu/bca/2nd-year', isActive: true },
        { level: 3, title: '3rd Year', resources: 42, link: '/csjmu/bca/3rd-year', isActive: true },
      ]
    },
    {
      title: "CSJMU BBA",
      themeText: "text-purple-600 dark:text-purple-500",
      themeBg: "bg-purple-100 dark:bg-purple-500/10",
      years: [
        { level: 1, title: '1st Year', resources: 35, link: '/csjmu/bba/1st-year', isActive: true },
        { level: 2, title: '2nd Year', resources: 40, link: '/csjmu/bba/2nd-year', isActive: true },
        { level: 3, title: '3rd Year', resources: 38, link: '/csjmu/bba/3rd-year', isActive: true },
      ]
    }
  ];

  return (
    <section className="py-12 space-y-16">
      
      {/* Global Header */}
      <div className="flex flex-col items-center text-center">
        <h2 className="text-3xl md:text-5xl font-black text-foreground">
          Find Your <span className="text-amber-500">Course Material</span>
        </h2>
        <p className="mt-4 text-foreground/60 max-w-2xl text-lg">
          Select your university, course, and academic year to access curated notes, previous year questions, and complete syllabus at Notiya.
        </p>
      </div>

      {/* Render Each Category */}
      {categories.map((category, catIdx) => (
        <div key={catIdx} className="max-w-7xl mx-auto px-4 md:px-6">
          
          {/* Category Header */}
          <div className="mb-6 flex items-baseline gap-4">
            <h3 className={`text-2xl md:text-3xl font-bold ${category.themeText}`}>
              {category.title}
            </h3>
            {category.description && (
              <span className="hidden sm:inline-block text-sm text-foreground/50 font-medium">
                {category.description}
              </span>
            )}
            <div className="h-px flex-1 bg-border dark:bg-slate-800 ml-4"></div>
          </div>

          {/* Grid for this category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {category.years.map((year, idx) => {
              const style = yearStyles[year.level];
              const Icon = year.isActive ? style.icon : Lock;
              
              const CardContent = (
                <div className={`
                  group relative p-6 border rounded-3xl flex flex-col h-full overflow-hidden transition-all duration-300 ease-out
                  ${year.isActive 
                    ? `bg-background border-border dark:border-slate-800 hover:border-primary/30 hover:shadow-xl dark:hover:shadow-none hover:-translate-y-1 ${style.hoverGlow}` 
                    : 'bg-slate-50 dark:bg-slate-900/50 border-dashed border-slate-200 dark:border-slate-800 opacity-60 grayscale-[50%]'}
                `}>
                  
                  {/* Top Section: Icon & Badge */}
                  <div className="flex justify-between items-start mb-8 relative z-10">
                    <div className={`p-3 rounded-2xl transition-colors duration-300 ${year.isActive ? style.bg : 'bg-slate-200 dark:bg-slate-800'}`}>
                      <Icon className={`w-6 h-6 ${year.isActive ? style.color : 'text-slate-500'}`} />
                    </div>
                    
                    <span className={`text-[11px] font-bold px-3 py-1.5 rounded-full border shadow-sm
                      ${year.isActive 
                        ? 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700' 
                        : 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800/50'}
                    `}>
                      {year.isActive ? `${year.resources} Resources` : year.note}
                    </span>
                  </div>

                  {/* Bottom Section: Title & Arrow */}
                  <div className="mt-auto flex items-center justify-between relative z-10">
                    <h4 className={`text-xl font-extrabold transition-colors ${year.isActive ? 'text-foreground group-hover:text-primary' : 'text-slate-500 dark:text-slate-400'}`}>
                      {year.title}
                    </h4>
                    
                    {/* Arrow Button Effect (Only active cards) */}
                    {year.isActive && (
                      <div className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800/50 flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
                        <ArrowRight className="h-5 w-5 text-foreground/40 group-hover:text-white dark:group-hover:text-slate-900 transition-colors" />
                      </div>
                    )}
                  </div>

                  {/* Decorative Background Gradient */}
                  {year.isActive && (
                    <div className={`absolute -bottom-10 -right-10 w-32 h-32 rounded-full blur-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none bg-current ${category.themeText}`} />
                  )}
                  
                </div>
              );

              // If inactive, render just a div. If active, wrap in Next Link
              return year.isActive ? (
                <Link href={`/study-material${year.link}`} key={idx} className="block h-full">
                  {CardContent}
                </Link>
              ) : (
                <div key={idx} className="cursor-not-allowed h-full">
                  {CardContent}
                </div>
              );
            })}
          </div>
          
        </div>
      ))}
    </section>
  );
}