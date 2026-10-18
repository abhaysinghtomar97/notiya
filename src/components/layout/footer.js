import Link from 'next/link';
import Image from 'next/image';
import { MessageCircle, ArrowUpRight, Bug, Smartphone } from 'lucide-react';

const WHATSAPP_URL = 'https://whatsapp.com/channel/0029VbDcifPLdQelA2tKNl3e';
const BUG_REPORT_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSeDO3TLHkGRXh1OzO6fSLOlaTWAlGnU1-Mp4me_mUxs1g7qAA/viewform?usp=preview';

// Edit links here, not in the JSX
const COLUMNS = [
  {
    title: 'Study material',
    links: [
      { label: 'Notes', href: '/study-material' },
      { label: 'Previous year papers', href: '/study-material' },
      { label: 'GATE papers', href: '/gate' },
      { label: 'Premium resources', href: '/premium-resources' },
    ],
  },
  {
    title: 'Syllabus',
    links: [
      { label: 'AKTU', href: '/AKTU-Syllabus' },
      { label: 'PSIT (Autonomous)', href: '/PSIT-Syllabus' },
      { label: 'CSJMU', href: '/CSJMU-Syllabus' },
      { label: 'GL Bajaj', href: '/GL-Bajaj-Syllabus' },
    ],
  },
  {
    title: 'Notiya',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Notices & updates', href: '/updates' },
      { label: 'Download app', href: '/download' },
    ],
  },
];

const LEGAL = [
  { label: 'Privacy policy', href: '/privacy-policy' },
  { label: 'Disclaimer', href: '/disclaimer' },
];

const linkCls =
  'text-sm text-foreground/60 transition-colors hover:text-amber-700 dark:hover:text-amber-400 ' +
  'focus-visible:outline-none focus-visible:underline';

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-border/60 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* ---------- WhatsApp banner ---------- */}
        <div className="-mt-8 mb-14 rounded-2xl border border-emerald-200 bg-gradient-to-r from-emerald-50 via-background to-emerald-50 p-5 shadow-sm sm:p-6 dark:border-emerald-900/60 dark:from-emerald-950/40 dark:via-background dark:to-emerald-950/40">
          <div className="flex flex-col items-start justify-between gap-5 md:flex-row md:items-center">
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#25D366] shadow-md">
                <MessageCircle className="h-6 w-6 text-white" aria-hidden />
              </span>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Get updates on WhatsApp</h3>
                <p className="mt-1 max-w-xl text-sm text-foreground/70">
                  New notes, PYQs, syllabus PDFs and exam notices, posted free as soon as they&apos;re out.
                </p>
              </div>
            </div>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white shadow-md transition-colors hover:bg-[#1EBE5D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Follow channel
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </a>
          </div>
        </div>

        {/* ---------- Main grid ---------- */}
        <div className="grid gap-10 pb-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center" aria-label="Notiya home">
              <Image src="/logo.svg" alt="" width={36} height={36} />
              <span className="font-serif text-2xl font-bold tracking-tight text-amber-700">NOTIYA</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-foreground/60">
              Free notes, previous year papers and syllabus for AKTU, PSIT and CSJMU students.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <Link
                href="/download"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium transition-colors hover:border-amber-400 hover:text-amber-700 dark:hover:text-amber-400"
              >
                <Smartphone className="h-4 w-4" aria-hidden /> Get the app
              </Link>
              <a
                href={BUG_REPORT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium transition-colors hover:border-amber-400 hover:text-amber-700 dark:hover:text-amber-400"
              >
                <Bug className="h-4 w-4" aria-hidden /> Report a bug
              </a>
            </div>
          </div>

          {/* Link columns */}
          {COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h4 className="mb-4 text-sm font-semibold text-foreground">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className={linkCls}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* ---------- Bottom bar ---------- */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-border/60 py-6 text-sm text-foreground/60 sm:flex-row">
          <p>© {new Date().getFullYear()} Notiya. All rights reserved.</p>
          <ul className="flex gap-5">
            {LEGAL.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={linkCls}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}