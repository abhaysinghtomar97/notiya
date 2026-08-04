import Link from "next/link";
import { CalendarDays, FileText, Download, ExternalLink } from "lucide-react";
import Breadcrumb from "@/components/ui/Breadcrumb";

export default function CSJMUAcademicCalendarPage() {
  // Hardcoded data for CSJMU. Add new objects here when new calendars are released.
  const calendars = [
    {
      title: "Odd Semester Academic Calendar 2026-27",
      pdf_link: "https://csjmu.ac.in/wp-content/uploads/docs/2026/05/ODD-semester-Academic-Calendar-2026-27.pdf",
    }
  ];

  return (
    <main className="max-w-7xl mx-auto px-5 py-8 mb-20">
      
      <Breadcrumb
        items={[
          {
            label: "Universities",
            href: "/study-material",
          },
          {
            label: "CSJMU",
            href: "/study-material/csjmu",
          },
          {
            label: "Academic Calendar",
            href: "/academic-calendar/csjmu",
          },
        ]}
      />

      {/* --- PAGE HEADER --- */}
      <div className="relative mt-8 mb-12 rounded-[2rem] bg-gradient-to-br from-indigo-50/80 to-purple-50/40 dark:from-zinc-900 dark:to-zinc-900/50 border border-indigo-100 dark:border-zinc-800 p-8 md:p-10 lg:p-12 overflow-hidden shadow-sm">
        
        {/* Decorative background glow */}
        <div className="absolute top-0 right-0 -mt-16 -mr-16 w-72 h-72 bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-5 text-sm font-semibold">
              <span className="inline-flex items-center gap-1.5 bg-indigo-600 text-white dark:bg-indigo-600 px-3.5 py-1.5 rounded-full shadow-sm">
                <CalendarDays size={14} /> 
                Academic Session
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-4">
              Academic <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-500 dark:from-indigo-400 dark:to-purple-400">Calendars</span>
            </h1>
            
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl leading-relaxed">
              Download the official academic schedules, holiday lists, and exam timelines for Chhatrapati Shahu Ji Maharaj University (CSJMU).
            </p>
          </div>
        </div>
      </div>

      {/* --- CONTENT SECTION --- */}
      <section className="scroll-mt-24">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-2 h-8 rounded-full bg-indigo-500"></div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            Latest Releases
          </h2>
        </div>

        {/* Calendar Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {calendars.map((calendar, index) => (
            <a
              key={index}
              href={calendar.pdf_link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col justify-between p-6 rounded-2xl border bg-card hover:border-indigo-400 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="p-3 rounded-xl bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400">
                  <FileText size={24} />
                </div>
                <ExternalLink className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              
              <div>
                <h3 className="font-semibold text-lg leading-tight mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {calendar.title}
                </h3>
                <div className="flex items-center gap-2 mt-4 text-sm font-medium text-indigo-600 dark:text-indigo-400">
                  <Download size={16} />
                  View PDF
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

    </main>
  );
}