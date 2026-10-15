import Link from "next/link";
import CareerCard from "./CareerCard";
import { careerPaths } from "@/data/careerPaths";

export default function CareerSection() {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-20 transition-colors duration-300 dark:bg-background md:py-24">
      {/* Subtle background decoration */}
      <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-blue-500/[0.06] blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-72 w-72 rounded-full bg-amber-500/[0.06] blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="mx-auto mb-12 max-w-3xl text-center md:mb-14">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-bold tracking-widest text-blue-700 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-400">
            <span className="h-2 w-2 rounded-full bg-blue-500" />
            CAREER PATHS
          </span>

          <h2 className="mt-6 text-3xl font-extrabold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-4xl md:text-5xl">
            Become More Than
            <span className="mt-1 block bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-400 sm:inline sm:pl-3">
              A Graduate.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base">
            Turn what you learn into what you can build. Explore career
            roadmaps, practical projects, learning resources, and interview
            preparation—all in one place.
          </p>
        </div>

        {/* Career cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-6">
          {careerPaths.map((career) => (
            <CareerCard key={career.id} career={career} />
          ))}
        </div>

        {/* Explore all resources */}
        <div className="mt-12 flex flex-col items-center justify-between gap-5 rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm dark:border-white/10 dark:bg-card/60 sm:flex-row sm:px-8">
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Ready to learn by doing?
            </h3>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Explore interactive labs, coding practice, and study resources.
            </p>
          </div>

          <Link
            href="/premium-resources"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 px-5 py-3 text-sm font-bold text-white shadow-md shadow-amber-500/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-amber-600 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 sm:w-auto"
          >
            Explore All Resources
            <span className="transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}