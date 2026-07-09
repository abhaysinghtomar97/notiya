import Link from "next/link";
import { notFound } from "next/navigation";
import { getSubjectData } from "@/lib/fetchData";

// Components
import VideosSection from "@/components/VideosSection";
import PyqSection from "@/components/PyqSection";
import SyllabusSection from "@/components/SyllabusSection";
import BooksSection from "@/components/BooksSection";
import ImportantTopicsSection from "@/components/ImportantTopicsSection";
import FaqSection from "@/components/FaqSection";
import NotesSection from "@/components/NotesSection";
import Breadcrumb from "@/components/ui/Breadcrumb";

// Icons
import { 
  BookOpen, Star, FileText, PlayCircle, HelpCircle, BookMarked 
} from "lucide-react";

export default async function SubjectPage({ params }) {
  const { university, course, year, slug } = await params;

  let branch = null;
  let subjectSlug = "";

  if (course === "btech") {
    if (slug.length === 2) {
      branch = slug[0];
      subjectSlug = slug[1];
    } else {
      subjectSlug = slug[0];
    }
  } else {
    subjectSlug = slug[0];
  }

  const data = await getSubjectData(university, course, year, branch, subjectSlug);

  if (!data) {
    notFound();
  }

  const { subject, notes } = data;

  // Define navigation items for cleaner mapping
  const navItems = [
    { label: "Notes", href: "#notes", icon: BookOpen, show: notes?.units?.length > 0 },
    { label: "PYQs", href: "#pyqs", icon: FileText, show: notes?.pyqs?.length > 0 },
    { label: "Important", href: "#important-topics", icon: Star, show: subject?.importantTopics?.length > 0 },
    { label: "Videos", href: "#videos", icon: PlayCircle, show: subject?.videos?.length > 0 },
    { label: "Books", href: "#books", icon: BookMarked, show: subject?.books?.length > 0 },
    { label: "FAQ", href: "#faq", icon: HelpCircle, show: subject?.faqs?.length > 0 },
  ].filter(item => item.show);

  return (
    <div className="mx-auto max-w-7xl px-5 py-6">
      
      {/* Breadcrumb would go here if you use it in this page */}
      
      {/* Hero Section */}
      <section className="mx-auto mb-16 mt-8 max-w-3xl text-center">
        <div className="inline-flex items-center rounded-full bg-amber-100/50 px-3 py-1 text-xs font-semibold tracking-wide text-amber-700 ring-1 ring-inset ring-amber-500/20">
          Free Study Material
        </div>

        <h1 className="mt-6   text-amber-600 text-4xl font-bold leading-tight tracking-tight md:text-6xl">
          {subject.subjectName}
        </h1>

        <div className="mt-4 flex flex-wrap justify-center gap-2 text-sm text-muted-foreground">
          <span className="font-medium text-foreground">{university.toUpperCase()}</span>
          <span>•</span>
          <span className="capitalize">{course.replace(/-/g, " ")}</span>
          <span>•</span>
          <span className="capitalize">{year.replace(/-/g, " ")}</span>
          {branch && (
            <>
              <span>•</span>
              <span className="font-semibold text-amber-600">{branch.toUpperCase()}</span>
            </>
          )}
        </div>

        <p className="mt-8 text-lg leading-relaxed text-muted-foreground">
          Comprehensive collection of study resources including handwritten notes, 
          previous year question papers, syllabus, and curated books for 
          <strong className="text-foreground font-semibold"> {subject.subjectName}</strong>.
        </p>

        {/* Navigation Bar */}
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium transition-all hover:border-amber-500 hover:text-amber-600 hover:shadow-sm"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </a>
          ))}
        </div>
      </section>

      {/* Content Sections */}
      <div className="space-y-16">
        {notes?.units?.length > 0 && (
          <section id="notes" className="scroll-mt-24">
            <NotesSection units={notes.units} />
          </section>
        )}

        {subject.videos?.length > 0 && (
          <section id="videos" className="scroll-mt-24">
            <VideosSection videos={subject.videos} />
          </section>
        )}

        {notes?.pyqs?.length > 0 && (
          <section id="pyqs" className="scroll-mt-24">
            <PyqSection pyqs={notes.pyqs} />
          </section>
        )}

        {subject?.importantTopics?.length > 0 && (
          <section id="important-topics" className="scroll-mt-24">
            <ImportantTopicsSection topics={subject.importantTopics} />
          </section>
        )}

        {subject.syllabus?.length > 0 && (
          <section id="syllabus" className="scroll-mt-24">
            <SyllabusSection syllabus={subject.syllabus} />
          </section>
        )}

        {subject.books?.length > 0 && (
          <section id="books" className="scroll-mt-24">
            <BooksSection books={subject.books} />
          </section>
        )}

        {subject.faqs?.length > 0 && (
          <section id="faq" className="scroll-mt-24">
            <FaqSection faqs={subject.faqs} />
          </section>
        )}
      </div>
    </div>
  );
}