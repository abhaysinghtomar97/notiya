import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-black dark:border-border mt-auto ">
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
          {/* <Link href="/contribute" className="hover:text-foreground transition-colors">Contribute</Link>
          <Link href="/#" className="hover:text-foreground transition-colors">Privacy Policy</Link>
          <Link href="/#" className="hover:text-foreground transition-colors">Disclaimer</Link>
          <Link href="/#" className="hover:text-foreground transition-colors">Contact</Link> */}
        </nav>
      </div>
    </footer>
  );
}