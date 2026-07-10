import Link from "next/link";
import { 
  BookOpen, 
  GraduationCap, 
  Rocket, 
  Target, 
  ArrowRight,
  Sparkles,
  Lock
} from "lucide-react";

export const metadata = {
  title: "PSIT (Autonomous) B.Tech Syllabus PDF Download (2026-27) | ALL Semesters",
  description: "Download PSIT (Autonomous) B.Tech Syllabus PDF at one place. Updated curriculum for the new autonomous structure.",
};

export default function page() {
  const years = [
    { 
      title: "1st Year", 
      href: "/PSIT-Syllabus/btech/1st-Year-PSIT-Syllabus", 
      icon: BookOpen, 
      desc: "Latest autonomous syllabus", 
      available: true 
    },
    { 
      title: "2nd Year", 
      href: "#", 
      icon: GraduationCap, 
      desc: "Curriculum currently under update", 
      available: false 
    },
    { 
      title: "3rd Year", 
      href: "#", 
      icon: Target, 
      desc: "Coming soon for autonomy", 
      available: false 
    },
    { 
      title: "4th Year", 
      href: "#", 
      icon: Rocket, 
      desc: "Coming soon for autonomy", 
      available: false 
    },
  ];

  return (
    <main className="mx-auto max-w-7xl px-5 py-12">
      {/* Hero Section */}
      <section className="mb-20 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-amber-100/50 px-4 py-1.5 text-sm font-semibold text-amber-700 ring-1 ring-inset ring-amber-500/20">
          <Sparkles className="h-3.5 w-3.5" />
          PSIT Autonomous Update
        </div>
        <h1 className="mt-6 text-4xl font-bold tracking-tight text-foreground md:text-6xl">
          <span className="text-amber-600">PSIT</span> Syllabus
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          Access the latest PSIT Autonomous Syllabus. 
          Resources are currently available for the 1st Year; other years will be updated as the new curriculum is finalized.
        </p>
      </section>

      {/* Cards Grid */}
      <section className="mb-20">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {years.map((year) => (
            <div
              key={year.title}
              className={`group relative flex h-full flex-col overflow-hidden rounded-[24px] border border-border p-6 shadow-sm transition-all duration-300 ${
                year.available 
                  ? "bg-card hover:-translate-y-1 hover:shadow-md" 
                  : "bg-muted/30 opacity-75"
              }`}
            >
              {/* Conditional Accent Border */}
              {year.available && (
                <div className="absolute bottom-0 left-0 top-0 w-1 bg-amber-500" />
              )}
              
              {/* Icon Container */}
              <div className={`mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border ${
                year.available 
                  ? "border-amber-100 bg-amber-50/50 text-amber-600" 
                  : "border-border bg-background text-muted-foreground"
              }`}>
                {year.available ? <year.icon className="h-6 w-6" /> : <Lock className="h-5 w-5" />}
              </div>

              <h2 className={`text-xl font-bold ${year.available ? "text-foreground" : "text-muted-foreground"}`}>
                {year.title}
              </h2>
              
              <p className="mt-2 text-sm text-muted-foreground flex-grow">
                {year.desc}
              </p>

              {year.available ? (
                <Link href={year.href} className="mt-6 flex items-center gap-2 text-sm font-medium text-blue-600">
                  View Syllabus
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              ) : (
                <div className="mt-6 text-sm font-medium text-muted-foreground cursor-not-allowed">
                  Coming Soon
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Info Section */}
      <section>
        <div className="rounded-[32px] border border-border bg-card p-8 md:p-12 shadow-sm">
          <h2 className="text-2xl font-bold mb-8 text-center">Why Use This Syllabus?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Exam Preparation", desc: "Know exactly what topics are included for your autonomous semester exams." },
              { title: "Subject Planning", desc: "Plan studies semester-wise using the new official curriculum." },
              { title: "Placement Readiness", desc: "Identify important technical subjects for internships and placements." },
            ].map((item) => (
              <div key={item.title} className="text-center md:text-left">
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}