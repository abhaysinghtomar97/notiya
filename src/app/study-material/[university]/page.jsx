import Link from 'next/link';
import {
  Code2,
  Terminal,
  Briefcase,
  LineChart,
  ArrowRight,
  GraduationCap,
  Building,
  MapPin,
  CalendarDays
} from 'lucide-react';
import Breadcrumb from '@/components/ui/Breadcrumb';
import LatestUpdates from './latestUpdates';

import Image from 'next/image';
// Map database string identifiers to Lucide icons
const iconMap = {
  'code': Code2,
  'terminal': Terminal,
  'briefcase': Briefcase,
  'chart': LineChart,
};

export default async function UniversityProfilePage({ params }) {
  const { university } = await params;
  const normalizedUni = university.toLowerCase();
  
  const logoMap = {
    'aktu': '/aktu_logo.svg',
    'csjmu': '/csjmu_logo.svg',
    'psit': '/psit_logo.svg',
  };
  // 1. Fetch/Define Courses
  let courses = [];
  if (normalizedUni === 'psit' || normalizedUni === "aktu") {
    courses = [
      {
        code: "BTech",
        full_name: "Bachelor of Technology",
        description: "A 4-year undergraduate engineering program with specializations such as CSE, IT, ECE, EE, Mechanical, Civil, and more.",
        icon_type: "code",

      }
    ];
  } else {
    courses = [
      {
        code: "BCA",
        full_name: "Bachelor of Computer Applications",
        description: "A 3-year undergraduate program focused on computer applications, programming, software development, databases, and IT.",
        icon_type: "terminal"
      },
      {
        code: "BBA",
        full_name: "Bachelor of Business Administration",
        description: "A 3-year undergraduate program covering business management, marketing, finance, human resources, and entrepreneurship.",
        icon_type: "briefcase"
      }
    ];
  }

  // 2. Define University Meta (Can be moved to a DB later)
  const formattedUniName = university.toUpperCase();
  

  return (
    <main className="max-w-7xl mx-auto px-5 py-8 mb-20">
      
      {/* --- BREADCRUMB --- */}
      <Breadcrumb
        items={[
          {
            label: "Universities",
            href: "/study-material",
          },
          {
            label: formattedUniName,
            href: `/study-material/${university}`,
          },
        ]}
      />

      {/* --- PROFILE HEADER --- */}
      {/* --- OPTIMIZED PROFILE HEADER --- */}
      <div className="relative mt-6 mb-12 rounded-[2rem] bg-gradient-to-br from-blue-50/80 to-indigo-50/40 dark:from-zinc-900 dark:to-zinc-900/50 border border-blue-100 dark:border-zinc-800 p-8 md:p-10 lg:p-12 overflow-hidden shadow-sm">
        
        {/* Decorative background glow */}
        <div className="absolute top-0 right-0 -mt-16 -mr-16 w-72 h-72 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          
          <div className="flex-1">
            {/* Badges / Meta Info */}
            <div className="flex flex-wrap items-center gap-3 mb-5 text-sm font-semibold">
              <span className="inline-flex items-center gap-1.5 bg-blue-600 text-white dark:bg-blue-600 px-3.5 py-1.5 rounded-full shadow-sm">
                <Building size={14} /> 
                University Profile
              </span>
              <span className="inline-flex items-center gap-1.5 text-muted-foreground bg-white/60 dark:bg-zinc-800/60 px-3.5 py-1.5 rounded-full border dark:border-zinc-700 backdrop-blur-md">
                <MapPin size={14} className="text-rose-500" /> 
                Uttar Pradesh, India
              </span>
              
              {/* Conditional Status Badge (Example) */}
              { (
                <span className="inline-flex items-center gap-1.5 text-emerald-700 bg-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400 px-3.5 py-1.5 rounded-full border border-emerald-200 dark:border-emerald-500/20">
                  State University
                </span>
              )}
            </div>
            
            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                {formattedUniName}
              </span>
            </h1>
            
            {/* Description */}
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl leading-relaxed">
              Your centralized hub for <strong className="text-foreground font-medium">{formattedUniName}</strong> academics. Access branch-wise notes, previous year question papers, official circulars, and track the academic calendar.
            </p>
          </div>

          {/* Logo Placeholder (Visible on md and larger screens) */}
          <div className="hidden md:flex flex-col items-center justify-center w-32 h-32 lg:w-40 lg:h-40 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-md shrink-0 transition-transform hover:scale-105">
            
            <Image src={logoMap[normalizedUni]} width={160} height={160} alt={`${formattedUniName} Logo`} />
          </div>

        </div>
      </div>

      {/* --- MAIN GRID LAYOUT --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* ================= LEFT CONTENT (Main Information) ================= */}
        <div className="lg:col-span-8 space-y-12">

          {/* DYNAMIC ALERT BANNER (E.g., Academic Calendar) */}
          
            <aside className="relative overflow-hidden bg-amber-50 dark:bg-amber-500/10 border-l-4 border-amber-500 p-5 rounded-r-2xl shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all hover:shadow-md w-full">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl pointer-events-none"></div>
              
              <div className="flex items-start gap-4 relative z-10 flex-1 min-w-0">
                <div className="shrink-0 mt-1 bg-amber-200/50 dark:bg-amber-500/20 p-2.5 rounded-full text-amber-600 dark:text-amber-400">
                  <CalendarDays size={24} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2.5 mb-1">
                    <h3 className="font-bold text-lg text-amber-900 dark:text-amber-100 whitespace-nowrap">
                      Academic Calendar Updated
                    </h3>
                    <span className="bg-red-500 text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded-full animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.5)] shrink-0">
                      New
                    </span>
                  </div>
                  <p className="text-sm text-zinc-700 dark:text-zinc-300 break-words">
                    The official academic calendar for Session 2026-27 has been released. Plan your semester now.
                  </p>
                </div>
              </div>

              <Link 
                href={`/Academic-Calendar/${university}`} 
                className="relative z-10 shrink-0 w-full sm:w-auto text-center bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600 text-white font-medium py-2.5 px-6 rounded-xl transition-colors shadow-sm"
              >
                View Calendar
              </Link>
            </aside>
        

          {/* PROGRAMS OFFERED SECTION */}
          <section>
            <div className="flex items-center gap-2 mb-6">
              <GraduationCap className="text-blue-600 dark:text-blue-400" size={28} />
              <h2 className="text-2xl font-bold tracking-tight">Programs Offered</h2>
            </div>
            
            {courses.length === 0 ? (
              <div className="text-center py-16 text-muted-foreground border rounded-2xl border-dashed">
                No courses found for this university.
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-6">
                {courses.map((course, idx) => {
                  const Icon = iconMap[course.icon_type] || Terminal;
                  return (
                    <Link
                      href={`${university}/${course.code.toLowerCase()}`}
                      key={idx}
                      className="group"
                    >
                      {/* Folder Tab */}
                      <div className="w-28 h-8 rounded-t-xl flex items-center justify-center text-xs font-bold uppercase tracking-widest bg-slate-100 dark:bg-main border border-b-0">
                        {course.code}
                      </div>

                      {/* Folder Body */}
                      <div className="relative p-6 -mt-px h-[220px] flex flex-col rounded-2xl rounded-tl-none border bg-slate-50 dark:bg-zinc-900/40 transition-all duration-300 hover:border-blue-500 hover:shadow-xl hover:-translate-y-1">
                        <div className="flex justify-between">
                          <div className="p-3 rounded-xl bg-background border">
                            <Icon size={24} />
                          </div>
                          <ArrowRight className="opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-blue-600" />
                        </div>

                        <div className="mt-auto">
                          <h3 className="text-xl font-semibold mb-2 line-clamp-1">
                            {course.full_name}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-3">
                            {course.description}
                          </p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </section>

          {/* FUTURE SECTIONS CAN GO HERE */}
          {/* <section>
              <h2>Placement Statistics</h2>
              <p>Coming Soon...</p>
          </section> */}

        </div>

        {/* ================= RIGHT SIDEBAR (Dynamic Feed) ================= */}
        <aside className="lg:col-span-4">
          <div className="sticky top-0 ">
            
            {/* Latest Updates Component */}
            <div className="rounded-3xl border bg-background overflow-hidden shadow-sm">
              <div className="px-5 py-5 border-b bg-muted/30">
                <h2 className="font-bold text-lg flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                  Latest Updates
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Recent circulars, notices & news from {formattedUniName}
                </p>
              </div>

              <div className="max-h-[600px] overflow-y-auto">
                <LatestUpdates university={university} />
              </div>
            </div>

            {/* Quick Links Card (Placeholder for future) */}
            {/* <div className="mt-6 rounded-2xl border bg-slate-50 dark:bg-zinc-900/40 p-5">
              <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">Quick Links</h3>
              <ul className="space-y-3 text-sm font-medium">
                <li><Link href={`/syllabus/${university}`} className="hover:text-blue-600 transition-colors">Download Syllabus PDF</Link></li>
                <li><Link href={`/pyq/${university}`} className="hover:text-blue-600 transition-colors">Previous Year Questions</Link></li>
                <li><Link href={`/results/${university}`} className="hover:text-blue-600 transition-colors">Check Semester Results</Link></li>
              </ul>
            </div> */}

          </div>
        </aside>

      </div>
    </main>
  );
}