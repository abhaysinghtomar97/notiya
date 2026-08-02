"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock3, IndianRupee, BookOpen } from "lucide-react";

export default function CareerCard({ career }) {
  return (
    <div className="group rounded-3xl overflow-hidden bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 shadow-sm hover:shadow-2xl dark:shadow-none dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)] transition-all duration-500 hover:-translate-y-2 relative">

      <div className="relative h-56">

        <Image
          src={career.image}
          fill
          alt={career.title}
          className="object-cover group-hover:scale-105 transition duration-700"
        />

        <div
          className={`absolute inset-0 bg-gradient-to-t ${career.gradient} opacity-30 dark:opacity-40`}
        />

        {/* Level Tag - Top Left */}
        <div className="absolute top-4 left-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-bold text-slate-900 dark:text-white shadow-sm">
          {career.level}
        </div>

        {/* Coming Soon Tag - Top Right */}
        <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-500 to-orange-500 dark:from-amber-600 dark:to-orange-600 rounded-full px-3 py-1 text-xs font-bold text-white shadow-md animate-pulse">
          Coming Soon
        </div>

      </div>

      <div className="p-6">

        <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
          {career.title}
        </h3>

        <p className="mt-3 text-gray-600 dark:text-gray-400 line-clamp-2">
          {career.description}
        </p>

        <div className="grid grid-cols-3 gap-3 my-6">

          <div className="rounded-xl bg-slate-100 dark:bg-slate-800/60 p-3 text-center text-slate-700 dark:text-slate-300">
            <IndianRupee className="mx-auto w-5 h-5" />
            <p className="text-xs mt-2">
              {career.salary}
            </p>
          </div>

          <div className="rounded-xl bg-slate-100 dark:bg-slate-800/60 p-3 text-center text-slate-700 dark:text-slate-300">
            <Clock3 className="mx-auto w-5 h-5" />
            <p className="text-xs mt-2">
              {career.duration}
            </p>
          </div>

          <div className="rounded-xl bg-slate-100 dark:bg-slate-800/60 p-3 text-center text-slate-700 dark:text-slate-300">
            <BookOpen className="mx-auto w-5 h-5" />
            <p className="text-xs mt-2">
              Roadmap
            </p>
          </div>

        </div>

        <div className="flex flex-wrap gap-2 mb-6">

          {career.tech.map((tech) => (
            <span
              key={tech}
              className="text-xs rounded-full bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 px-3 py-1 font-medium border border-transparent dark:border-blue-500/20"
            >
              {tech}
            </span>
          ))}

        </div>

        <Link
          href={`/premium-resources/${career.slug}`}
          className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 text-white py-3 font-semibold hover:gap-4 transition-all shadow-md hover:shadow-blue-500/25"
        >
          Start Learning
          <ArrowRight size={18} />
        </Link>

      </div>
    </div>
  );
}