"use client";
import {
  Search,
  FileText,
  BookOpen,
  PlayCircle,
  Bell,
  Clock,
  CheckCircle2,
} from "lucide-react";

export default function ComparisonSection() {
  const oldWay = [
    {
      icon: Search,
      text: "Notes from different websites",
    },
    {
      icon: FileText,
      text: "PYQs from another portal",
    },
    {
      icon: BookOpen,
      text: "Syllabus somewhere else",
    },
    {
      icon: PlayCircle,
      text: "YouTube lectures separately",
    },
    {
      icon: Bell,
      text: "Updates on WhatsApp/Telegram",
    },
    {
      icon: Clock,
      text: "Waste time searching resources",
    },
  ];

  const newWay = [
    "Subject-wise Notes",
    "Previous Year Papers",
    "Latest Syllabus",
    "Curated YouTube Lectures",
    "Latest University Updates",
    "Everything in one place",
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-slate-50 dark:from-background dark:to-background transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Heading */}
        <div className="text-center mb-16">
          <span className="bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 px-4 py-2 rounded-full text-sm font-semibold">
            WHY NOTIYA?
          </span>

          <h2 className="mt-6 text-4xl md:text-6xl font-black leading-tight text-slate-900 dark:text-white">
            Stop
            <span className="text-blue-600 dark:text-blue-400"> Searching.</span>
            <br />
            Start
            <span className="text-amber-500 dark:text-amber-400"> Learning.</span>
          </h2>

          <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Students waste hours finding study resources. Notiya brings
            everything together so you can focus on learning.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-center">
          
          {/* Left Card - The Old Way */}
          <div className="rounded-3xl border border-red-200 dark:border-red-900/30 bg-white dark:bg-slate-900/50 p-8 shadow-xl dark:shadow-2xl dark:shadow-red-900/5 hover:shadow-2xl transition">
            <div className="inline-block bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-400 px-5 py-2 rounded-full font-bold mb-6">
              ❌ Scattered Learning
            </div>

            <p className="text-gray-500 dark:text-gray-400 mb-8">
              Study resources are everywhere.
            </p>

            <div className="space-y-5">
              {oldWay.map((item, index) => {
                const Icon = item.icon;

                return (
                  <div
                    key={index}
                    className="flex items-center gap-4 text-gray-700 dark:text-gray-300"
                  >
                    <div className="w-11 h-11 rounded-full bg-red-100 dark:bg-red-500/10 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-red-500 dark:text-red-400" />
                    </div>

                    <span className="text-lg">{item.text}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Card - The Notiya Way */}
          <div className="rounded-3xl border border-amber-300 dark:border-amber-700/30 bg-gradient-to-br from-amber-50 to-white dark:from-amber-500/5 dark:to-slate-900/50 p-8 shadow-xl dark:shadow-2xl dark:shadow-amber-900/5 hover:shadow-2xl transition">
            <div className="inline-block bg-emerald-500 dark:bg-emerald-600 text-white px-5 py-2 rounded-full font-bold mb-6">
              ✅ NOTIYA
            </div>

            <p className="text-gray-500 dark:text-gray-400 mb-8">
              Everything organized in one place.
            </p>

            <div className="space-y-5">
              {newWay.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4"
                >
                  <CheckCircle2 className="text-green-500 dark:text-green-400 w-7 h-7 shrink-0" />

                  <span className="text-lg font-medium text-gray-700 dark:text-gray-200">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-2xl bg-blue-600 dark:bg-blue-600/80 p-5 text-white border border-blue-500 dark:border-blue-500/50">
              <p className="font-semibold text-lg">
                ⚡ Save 30-60 minutes every day.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}