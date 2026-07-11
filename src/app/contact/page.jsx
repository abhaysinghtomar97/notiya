export const metadata = {
  title: "Contact Us | Notiya",
  description:
    "Contact the Notiya team for support, copyright concerns, feedback, suggestions, or report broken links and study materials.",
};

import {
  Mail,
  MessageCircle,
  Bug,
  Lightbulb,
  ShieldAlert,
} from "lucide-react";

export default function ContactPage() {
  return (
    <main className="bg-gradient-to-b from-amber-50 via-white to-white">
      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="rounded-3xl border border-amber-200 bg-white p-8 shadow-lg md:p-12">
          <span className="rounded-full bg-amber-100 px-4 py-1 text-sm font-semibold text-amber-700">
            Contact
          </span>

          <h1 className="mt-4 text-4xl font-bold text-gray-900">
            Contact Us
          </h1>

          <p className="mt-4 text-lg text-gray-600">
            We'd love to hear from you! Whether you have feedback, found a
            broken PDF, discovered incorrect information, or have a copyright
            concern, we're here to help.
          </p>

          {/* Contact Cards */}
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border p-6">
              <Mail className="h-8 w-8 text-amber-500" />
              <h2 className="mt-4 text-xl font-semibold">
                Email Support
              </h2>

              <p className="mt-2 text-gray-600">
                Send us your questions, suggestions, or issues anytime.
              </p>

              <a
                href="mailto:support@notiya.in"
                className="mt-4 inline-block font-semibold text-amber-600 hover:underline"
              >
                support.notiya@gmail.com
              </a>
            </div>

            <div className="rounded-2xl border p-6">
              <MessageCircle className="h-8 w-8 text-green-600" />

              <h2 className="mt-4 text-xl font-semibold">
                WhatsApp Channel
              </h2>

              <p className="mt-2 text-gray-600">
                Follow our official WhatsApp Channel for daily Notes, PYQs,
                Syllabus PDFs, Exam Updates and important announcements.
              </p>

              <a
                href="https://whatsapp.com/channel/0029VbDcifPLdQelA2tKNl3e"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center rounded-full bg-[#25D366] px-5 py-2 font-semibold text-white transition hover:bg-[#1EBE5D]"
              >
                Join WhatsApp Channel
              </a>
            </div>
          </div>

          {/* Help Topics */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold">
              What can you contact us about?
            </h2>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <div className="flex gap-4 rounded-2xl border p-5">
                <Bug className="mt-1 text-red-500" />
                <div>
                  <h3 className="font-semibold">
                    Report Broken Links
                  </h3>
                  <p className="text-sm text-gray-600">
                    Found a PDF or download link that isn't working? Let us know.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 rounded-2xl border p-5">
                <Lightbulb className="mt-1 text-yellow-500" />
                <div>
                  <h3 className="font-semibold">
                    Suggestions & Feedback
                  </h3>
                  <p className="text-sm text-gray-600">
                    Help us improve Notiya by sharing your ideas.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 rounded-2xl border p-5">
                <ShieldAlert className="mt-1 text-blue-500" />
                <div>
                  <h3 className="font-semibold">
                    Copyright Concerns
                  </h3>
                  <p className="text-sm text-gray-600">
                    If you own any content available on Notiya and believe it
                    should be updated, credited, or removed, please contact us.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 rounded-2xl border p-5">
                <Mail className="mt-1 text-green-500" />
                <div>
                  <h3 className="font-semibold">
                    General Support
                  </h3>
                  <p className="text-sm text-gray-600">
                    Questions about study materials, notes, syllabus, or the
                    website.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-12 rounded-2xl bg-amber-50 p-6 text-center">
            <h2 className="text-xl font-bold">
              Response Time
            </h2>

            <p className="mt-2 text-gray-600">
              We usually respond within <strong>24–48 hours</strong> on
              working days.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}