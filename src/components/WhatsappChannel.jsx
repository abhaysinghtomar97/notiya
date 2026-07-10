"use client";

import Image from "next/image";
import { MessageCircle, ArrowRight, Bell, BookOpen } from "lucide-react";

export default function WhatsappChannel() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-green-200 bg-gradient-to-br from-green-50 via-white to-emerald-50 p-6 md:p-8 shadow-lg">
      {/* Background Blur */}
      <div className="absolute -top-20 -right-20 h-52 w-52 rounded-full bg-green-200/40 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 h-52 w-52 rounded-full bg-amber-200/30 blur-3xl" />

      <div className="relative z-10 flex flex-col items-center gap-8 md:flex-row">
        {/* QR */}
        <div className="flex justify-center">
          <div className="rounded-2xl bg-white p-3 shadow-xl border">
            <Image
              src="/whatsapp-channel-qr.png" // Put your QR here
              alt="Notiya WhatsApp Channel QR"
              width={220}
              height={220}
              className="rounded-xl"
              priority
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 text-center md:text-left">
          <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
            <MessageCircle size={16} />
            WhatsApp Channel
          </span>

          <h2 className="mt-4 text-3xl font-bold text-gray-900">
            Join the{" "}
            <span className="text-green-600">Notiya WhatsApp Channel</span>
          </h2>

          <p className="mt-4 text-gray-600 leading-7">
            Never miss important study resources. Get the latest
            <strong> Notes</strong>, <strong>PYQs</strong>,
            <strong> Syllabus PDFs</strong>, exam updates, and useful study
            materials directly on WhatsApp.
          </p>

          {/* Benefits */}
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="flex items-center gap-3 rounded-xl border bg-white p-3">
              <BookOpen className="text-amber-500" size={20} />
              <span className="font-medium">
                Daily Notes & PYQs
              </span>
            </div>

            <div className="flex items-center gap-3 rounded-xl border bg-white p-3">
              <Bell className="text-green-500" size={20} />
              <span className="font-medium">
                Instant Exam Updates
              </span>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="https://whatsapp.com/channel/0029VbDcifPLdQelA2tKNl3e"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-7 py-4 font-semibold text-white shadow-lg transition-all hover:scale-105 hover:bg-[#1ebe5d]"
            >
              <MessageCircle size={20} />
              Follow WhatsApp Channel
              <ArrowRight size={18} />
            </a>

            <span className="flex items-center justify-center text-sm text-gray-500">
              🚀 Join thousands of students already learning with Notiya
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}