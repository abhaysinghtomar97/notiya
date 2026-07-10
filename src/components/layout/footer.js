import { MessageCircle, ArrowUpRight } from "lucide-react";
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-black dark:border-border mt-auto ">
      <div className=" rounded-2xl border border-green-200 bg-gradient-to-r from-green-50 via-white to-green-50 p-5 shadow-sm">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg">
              <MessageCircle className="h-7 w-7 text-white" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900">
                Join Our WhatsApp Channel
              </h3>
              <p className="text-sm text-gray-600">
                Get daily Notes, PYQs, Syllabus PDFs, Exam Updates & Important
                Notifications for free.
              </p>
            </div>
          </div>

          <a
            href="https://whatsapp.com/channel/0029VbDcifPLdQelA2tKNl3e"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[#1EBE5D]"
          >
            <MessageCircle className="h-5 w-5" />
            Follow Channel
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-foreground/60 text-sm">
          © {new Date().getFullYear()} NOTIYA. All rights reserved.
        </div>
        <nav className="flex flex-wrap justify-center gap-6 text-sm text-foreground/60">
          <Link href="/study-material" className="hover:text-foreground transition-colors">Notes</Link>
          <Link href="/study-material" className="hover:text-foreground transition-colors">PYQs</Link>
          <Link href="/AKTU-Syllabus" className="hover:text-foreground transition-colors">AKTU Syllabus</Link>
          <Link href="/CSJMU-Syllabus" className="hover:text-foreground transition-colors">CSJMU Syllabus</Link>
          <Link href="/PSIT-Syllabus" className="hover:text-foreground transition-colors">PSIT(Autonomous) Syllabus</Link>
          {/* <Link href="/study-material" className="hover:text-foreground transition-colors">Important Questions</Link> */}
          {/* <Link href="/contribute" className="hover:text-foreground transition-colors">Contribute</Link> */}
          <Link
            href="/privacy-policy"
            className="transition-colors hover:text-foreground"
          >
            Privacy Policy
          </Link>

          <Link
            href="/disclaimer"
            className="transition-colors hover:text-foreground"
          >
            Disclaimer
          </Link>

          <Link
            href="/contact"
            className="transition-colors hover:text-foreground"
          >
            Contact
          </Link>
          <Link
            href="/about"
            className="transition-colors hover:text-foreground"
          >
            About
          </Link>

        </nav>

      </div>
      
    </footer>
  );
}