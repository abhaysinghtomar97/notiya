import Link from "next/link";
import { CalendarDays, FileText, Download, ExternalLink, AlertCircle } from "lucide-react";
import Breadcrumb from "@/components/ui/Breadcrumb";

// Base URL for the PDFs since the API returns relative paths
const BASE_URL = "https://www.psit.ac.in/";

// Helper to format course keys into display names
const formatCourseName = (key) => {
  const map = {
    btech: "B.Tech",
    mba: "MBA",
    mca: "MCA",
    bpharma: "B.Pharm",
    dpharma: "D.Pharm",
  };
  return map[key.toLowerCase()] || key.toUpperCase();
};

async function getAcademicCalendars() {
  try {
    const res = await fetch("https://www.psit.ac.in/assets/_file_json/academic_calender.json", {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });
    
    if (!res.ok) {
      throw new Error("Failed to fetch calendar data");
    }
    
    return await res.json();
  } catch (error) {
    console.error("Error fetching calendars:", error);
    return null;
  }
}

export default async function AcademicCalendarPage() {
  const calendarData = await getAcademicCalendars();

  return (
    <main className="max-w-7xl mx-auto px-5 py-8 mb-20">
      
      <Breadcrumb
        items={[
          {
            label: "Universities",
            href: "/study-material",
          },
          {
            label: "PSIT",
            href: "/study-material/psit",
          },
          {
            label: "Academic Calendar",
            href: "/academic-calendar/psit",
          },
        ]}
      />

      {/* --- PAGE HEADER --- */}
      <div className="relative mt-8 mb-12 rounded-[2rem] bg-gradient-to-br from-amber-50/80 to-orange-50/40 dark:from-zinc-900 dark:to-zinc-900/50 border border-amber-100 dark:border-zinc-800 p-8 md:p-10 lg:p-12 overflow-hidden shadow-sm">
        
        {/* Decorative background glow */}
        <div className="absolute top-0 right-0 -mt-16 -mr-16 w-72 h-72 bg-amber-500/10 dark:bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-5 text-sm font-semibold">
              <span className="inline-flex items-center gap-1.5 bg-amber-600 text-white dark:bg-amber-600 px-3.5 py-1.5 rounded-full shadow-sm">
                <CalendarDays size={14} /> 
                Academic Session
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-4">
              Academic <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-orange-500 dark:from-amber-400 dark:to-orange-400">Calendars</span>
            </h1>
            
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl leading-relaxed">
              Download the official academic schedules, holiday lists, and exam timelines for all programs at PSIT.
            </p>
          </div>
        </div>
      </div>

      {/* --- LATEST ACADEMIC CALENDAR (HARDCODED) --- */}
      <section className="mb-12 scroll-mt-24">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-2 h-8 rounded-full bg-amber-500"></div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            Latest Updates
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <a
            href="https://drive.google.com/file/d/1Jz5XFy1LJ-sxAQxWq70YkgUaaXA7Jd3w/view?usp=drive_link"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex flex-col justify-between p-6 rounded-2xl border bg-card hover:border-amber-400 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="p-3 rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                <FileText size={24} />
              </div>
              <ExternalLink className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            
            <div>
              <h3 className="font-semibold text-lg leading-tight mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                Latest Academic Calendar
              </h3>
              <div className="flex items-center gap-2 mt-4 text-sm font-medium text-amber-600 dark:text-amber-400">
                <Download size={16} />
                View PDF
              </div>
            </div>
          </a>
        </div>
      </section>

      {/* --- CONTENT SECTION --- */}
      {!calendarData ? (
        <div className="flex flex-col items-center justify-center py-20 text-center border rounded-3xl bg-slate-50 dark:bg-zinc-900/30">
          <AlertCircle className="w-12 h-12 text-rose-500 mb-4" />
          <h2 className="text-xl font-bold mb-2">Unable to load calendars</h2>
          <p className="text-muted-foreground">Please check back later or refresh the page.</p>
        </div>
      ) : (
        <div className="space-y-12">
          {Object.entries(calendarData).map(([courseKey, calendars]) => {
            if (!calendars || calendars.length === 0) return null;

            return (
              <section key={courseKey} className="scroll-mt-24">
                {/* Course Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-2 h-8 rounded-full bg-amber-500"></div>
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                    {formatCourseName(courseKey)} Programs
                  </h2>
                </div>

                {/* Calendar Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {calendars.map((calendar, index) => {
                    // Prepend the base URL and encode URI to handle spaces in file names
                    const fullPdfUrl = `${BASE_URL}${encodeURI(calendar.pdf_link)}`;
                    
                    return (
                      <a
                        key={index}
                        href={fullPdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative flex flex-col justify-between p-6 rounded-2xl border bg-card hover:border-amber-400 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                      >
                        <div className="flex items-start justify-between gap-4 mb-4">
                          <div className="p-3 rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                            <FileText size={24} />
                          </div>
                          <ExternalLink className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        
                        <div>
                          <h3 className="font-semibold text-lg leading-tight mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                            {calendar.title}
                          </h3>
                          <div className="flex items-center gap-2 mt-4 text-sm font-medium text-amber-600 dark:text-amber-400">
                            <Download size={16} />
                            View PDF
                          </div>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      )}

    </main>
  );
}