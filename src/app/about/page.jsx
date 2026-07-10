export const metadata = {
  title: "About Us | Notiya",
  description:
    "Learn about Notiya, our mission, and how we're helping students access notes, PYQs, syllabus PDFs, and other study materials in one place.",
};

import {
  BookOpen,
  GraduationCap,
  Target,
  Rocket,
  Users,
  ShieldCheck,
} from "lucide-react";

export default function AboutPage() {
  return (
    <main className="bg-gradient-to-b from-amber-50 via-white to-white">
      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="rounded-3xl border border-amber-200 bg-white p-8 shadow-lg md:p-12">
          <span className="rounded-full bg-amber-100 px-4 py-1 text-sm font-semibold text-amber-700">
            About Notiya
          </span>

          <h1 className="mt-4 text-4xl font-bold text-gray-900">
            Helping Students Learn Smarter
          </h1>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            <strong>Notiya</strong> is an educational platform designed to make
            studying simpler and more organized. Our goal is to provide students
            with easy access to notes, previous year question papers (PYQs),
            syllabus PDFs, important academic updates, and other useful study
            resources—all in one place.
          </p>

          {/* Mission */}
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border p-6">
              <Target className="h-10 w-10 text-amber-500" />
              <h2 className="mt-4 text-2xl font-bold">Our Mission</h2>
              <p className="mt-3 text-gray-600 leading-7">
                To save students time by organizing educational resources in one
                platform so they can focus more on learning and less on
                searching.
              </p>
            </div>

            <div className="rounded-2xl border p-6">
              <Rocket className="h-10 w-10 text-blue-600" />
              <h2 className="mt-4 text-2xl font-bold">Our Vision</h2>
              <p className="mt-3 text-gray-600 leading-7">
                To become one of India's most trusted student resource platforms
                by providing reliable, organized, and easily accessible academic
                content.
              </p>
            </div>
          </div>

          {/* What We Offer */}
          <div className="mt-14">
            <h2 className="text-3xl font-bold text-gray-900">
              What You'll Find on Notiya
            </h2>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <div className="flex gap-4 rounded-2xl border p-5">
                <BookOpen className="mt-1 text-amber-500" />
                <div>
                  <h3 className="font-semibold">Study Notes</h3>
                  <p className="text-gray-600 text-sm">
                    Well-organized notes to support your semester preparation.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 rounded-2xl border p-5">
                <GraduationCap className="mt-1 text-blue-500" />
                <div>
                  <h3 className="font-semibold">
                    Previous Year Question Papers
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Practice with PYQs to understand exam patterns and improve
                    preparation.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 rounded-2xl border p-5">
                <ShieldCheck className="mt-1 text-green-500" />
                <div>
                  <h3 className="font-semibold">Latest Syllabus</h3>
                  <p className="text-gray-600 text-sm">
                    Access updated syllabus PDFs for supported universities and
                    courses.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 rounded-2xl border p-5">
                <Users className="mt-1 text-purple-500" />
                <div>
                  <h3 className="font-semibold">Student Community</h3>
                  <p className="text-gray-600 text-sm">
                    Stay connected through our WhatsApp Channel for notes, exam
                    alerts, and important updates.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Universities */}
          <div className="mt-14 rounded-2xl bg-amber-50 p-8">
            <h2 className="text-2xl font-bold">
              Universities & Colleges
            </h2>

            <p className="mt-4 leading-7 text-gray-700">
              Notiya is continuously expanding its collection of study
              materials. We aim to support students from multiple universities
              and colleges by providing structured academic resources in one
              place.
            </p>
          </div>

          {/* Closing */}
          <div className="mt-14 text-center">
            <h2 className="text-3xl font-bold">
              Thank You for Choosing Notiya ❤️
            </h2>

            <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-gray-600">
              Every resource we organize is intended to make learning easier for
              students. Your feedback, suggestions, and support help us continue
              improving Notiya for everyone.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}