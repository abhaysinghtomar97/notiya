import Link from 'next/link';
import Image from 'next/image';
import {
  Code2,
  Terminal,
  Briefcase,
  LineChart,
  ArrowRight,
  GraduationCap,
  Building,
  CalendarDays,
  FileText,
  Download,
  Award,
  BookOpen
} from 'lucide-react';
import Breadcrumb from '@/components/ui/Breadcrumb';
import LatestUpdates from './latestUpdates';
import AKTUEngineeringResources from '@/components/AKTUEngineeringResources';
import PSITEngineeringResources from '@/components/PSITEngineeringResources';
import CSJMUResources from '@/components/CSJMUResources';

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
  const formattedUniName = university.toUpperCase();

  const logoMap = {
    'aktu': '/aktu_logo.svg',
    'csjmu': '/csjmu_logo.svg',
    'psit': '/psit_logo.svg',
  };

  const uniLogo = logoMap[normalizedUni];

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

  // Determine if we should show the right sidebar
  const showSidebar = normalizedUni === 'aktu';

  return (
    <main className="max-w-7xl mx-auto px-5 py-8 mb-20">
      
      {/* ================= HERO SECTION ================= */}
      <div className="relative bg-slate-50 dark:bg-zinc-900/40 border rounded-3xl p-6 md:p-10 mb-10 overflow-hidden shadow-sm">
        
        {/* Subtle Background Decoration */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-amber-500/10 blur-3xl rounded-full pointer-events-none"></div>

        <Breadcrumb
          items={[
            { label: "Universities", href: "/study-material" },
            { label: formattedUniName, href: `/study-material/${university}` },
          ]}
        />
        
        <div className="mt-8 flex flex-col md:flex-row md:items-center justify-between gap-6 z-10 relative">
          
          {/* Logo & Title */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-5">
            {uniLogo ? (
              <div className="shrink-0 rounded-2xl bg-white p-2 border shadow-sm">
                <Image 
                  src={uniLogo} 
                  alt={`${formattedUniName} Logo`} 
                  width={80} 
                  height={80} 
                  className="object-contain"
                />
              </div>
            ) : (
              <div className="shrink-0 rounded-2xl bg-amber-100 dark:bg-amber-900/30 p-4 border border-amber-200 dark:border-amber-800 text-amber-600 dark:text-amber-500 shadow-sm">
                <Building size={48} strokeWidth={1.5} />
              </div>
            )}
            
            <div>
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground">
                {formattedUniName} <span className="text-amber-600 font-light">University</span>
              </h1>
              <p className="mt-2 text-muted-foreground font-medium flex items-center gap-2">
                <GraduationCap size={18} />
                Explore syllabus, notes, and previous year papers
              </p>
            </div>
          </div>

          {/* Action Button */}
          <Link
            href={`/Academic-Calendar/${university}`}
            className="group flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600 text-white font-semibold py-3 px-6 rounded-xl transition-all shadow-sm hover:shadow hover:-translate-y-0.5 shrink-0"
          >
            <CalendarDays size={18} />
            <span>Academic Calendar</span>
            <ArrowRight size={16} className="opacity-70 group-hover:translate-x-1 group-hover:opacity-100 transition-all" />
          </Link>

        </div>
      </div>

      {/* ================= MAIN CONTENT GRID ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* === LEFT CONTENT (Courses) === */}
        <div className={`space-y-8 ${showSidebar ? 'lg:col-span-8' : 'lg:col-span-12'}`}>
          
          <div className="flex items-center gap-3 border-b pb-4">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
              <BookOpen size={24} />
            </div>
            <h2 className="text-2xl font-bold tracking-tight">Resources Available for -</h2>
          </div>

          {courses.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 px-4 text-center border rounded-3xl border-dashed bg-slate-50 dark:bg-zinc-900/20">
              <BookOpen className="text-muted-foreground/50 mb-4" size={48} />
              <h3 className="text-lg font-semibold mb-1">No Programs Found</h3>
              <p className="text-muted-foreground text-sm">We are currently updating our database for {formattedUniName}. Check back soon!</p>
            </div>
          ) : (
            <div className={`grid gap-5 ${showSidebar ? 'sm:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3'}`}>
              {courses.map((course, idx) => {
                const Icon = iconMap[course.icon_type] || Terminal;
                return (
                  <Link
                    href={`${university}/${course.code.toLowerCase()}`}
                    key={idx}
                    className="group flex flex-col h-full p-6 rounded-3xl border bg-background transition-all duration-300 hover:border-amber-500/50 hover:shadow-xl hover:shadow-amber-500/5 hover:-translate-y-1 relative overflow-hidden"
                  >
                    {/* Top row: Icon and Badge */}
                    <div className="flex justify-between items-start mb-5 z-10">
                      <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-500 transition-colors group-hover:bg-amber-500 group-hover:text-white">
                        <Icon size={24} />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-widest bg-slate-100 dark:bg-zinc-800 text-muted-foreground px-3 py-1.5 rounded-full">
                        {course.code}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="mt-auto z-10 flex-grow">
                      <h3 className="text-xl font-bold mb-2.5 text-foreground group-hover:text-amber-600 transition-colors">
                        {course.full_name}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-6">
                        {course.description}
                      </p>
                    </div>

                    {/* Bottom Action Link */}
                    <div className="flex items-center text-sm font-semibold text-amber-600 mt-auto z-10">
                      View Program Material
                      <ArrowRight size={16} className="ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* === RIGHT SIDEBAR (Dynamic Feed & Quick Links) === */}
        {showSidebar && (
          <aside className="lg:col-span-4">
            <div className="sticky top-6 flex flex-col gap-6">
              
              {/* Latest Updates Component */}
              <div className="rounded-3xl border bg-background overflow-hidden shadow-sm flex flex-col">
                <div className="px-6 py-5 border-b bg-slate-50 dark:bg-zinc-900/40">
                  <h2 className="font-bold text-lg flex items-center gap-2">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                    </span>
                    Latest Updates
                  </h2>
                  <p className="text-xs text-muted-foreground mt-1.5">
                    Official circulars & news from {formattedUniName}
                  </p>
                </div>

                <div className="max-h-[500px] overflow-y-auto custom-scrollbar">
                  <LatestUpdates university={university} />
                </div>
              </div>

              

            </div>
          </aside>
        )}
      </div>
      {normalizedUni === 'aktu' && (
        <div className="mt-12">
          <AKTUEngineeringResources university={university} />
        </div>
      )}

      {normalizedUni === 'psit' && (
        <div className="mt-12">
          <PSITEngineeringResources university={university} />
        </div>
      )}
      {normalizedUni === 'csjmu' && (
        <div className="mt-12">
  <CSJMUResources university={university} />
        </div>
      )}

    </main>
  );
}
    