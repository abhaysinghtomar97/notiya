import Link from "next/link";
import { notFound } from "next/navigation";

import { getSubjectData } from "@/lib/fetchData";

import VideosSection from "@/components/VideosSection";
import PyqSection from "@/components/PyqSection";
import SyllabusSection from "@/components/SyllabusSection";
import BooksSection from "@/components/BooksSection";
import ImportantTopicsSection from "@/components/ImportantTopicsSection";
import FaqSection from "@/components/FaqSection";
import NotesSection from "@/components/NotesSection";
import Breadcrumb from "@/components/ui/Breadcrumb";
import {
  BookOpen,
  Star,
  Download,
  FileText,
  PlayCircle,
  HelpCircle,
  BookMarked,
  ChevronDown,
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
      // First year B.Tech
      subjectSlug = slug[0];
    }
  } else {
    subjectSlug = slug[0];
  }

  const data = await getSubjectData(
    university,
    course,
    year,
    branch,
    subjectSlug
  );

  if (!data) {
    notFound();
  }

  const { subject, notes } = data;
  
  return (
    <div className=" mx-auto px-4 py-8">



      {/* Subject Header */}

      {/* Hero */}
      {/* Decorative Blur */}
      <div className="relative overflow-hidden">
  <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
  <div className="absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-amber-400/10 blur-3xl" />

      <div className="relative z-10">

        <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
          📚 FREE STUDY MATERIAL
        </span>

        <h1 className="mt-6 text-4xl font-black leading-tight md:text-6xl">

          {subject.subjectName}

          <span className="block text-primary mt-2">

            {university.toUpperCase()}{" "}
            {course.toUpperCase() == "BTECH" ? "B.Tech" : course.toUpperCase()}{" "}

          </span>

        </h1>

        <p className="mt-5 text-lg text-muted-foreground">

          {branch && (
            <>
              {branch.toUpperCase()} •
            </>
          )}

          {" "}
          {year.replace(/-/g, " ")}

        </p>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">

          Download free handwritten notes, previous year
          question papers (PYQs), syllabus, books,
          important questions and video lectures for
          <strong> {subject.subjectName}</strong>.

        </p>

      </div>




      <div className="mt-10 flex flex-wrap gap-3">

        {notes?.units?.length > 0 && (
          <a
            href="#notes"
            className="rounded-full border px-5 py-2 hover:bg-primary hover:text-white transition"
          >
            <BookOpen className="mr-2 inline h-4 w-4" />
            Notes
          </a>
        )}

        {notes?.pyqs?.length > 0 && (
          <a
            href="#pyqs"
            className="rounded-full border px-5 py-2 hover:bg-primary hover:text-white transition"
          >
            <FileText className="mr-2 inline h-4 w-4" />
            PYQs
          </a>
        )}
        {subject?.importantTopics?.length > 0 && (
          <a
            href="#important-topics"
            className="rounded-full border px-5 py-2 hover:bg-primary hover:text-white transition"
          >
            <Star className="mr-2 inline h-4 w-4" />
            Important Topics
          </a>
        )}

        {subject.videos?.length > 0 && (
          <a
            href="#videos"
            className="rounded-full border px-5 py-2 hover:bg-primary hover:text-white transition"
          >
            <PlayCircle className="mr-2 inline h-4 w-4" />
            Videos
          </a>
        )}

        {subject.books?.length > 0 && (
          <a
            href="#books"
            className="rounded-full border px-5 py-2 hover:bg-primary hover:text-white transition"
          >
            <BookMarked className="mr-2 inline h-4 w-4" />
            Books
          </a>
        )}

        {subject.faqs?.length > 0 && (
          <a
            href="#faq"
            className="rounded-full border px-5 py-2 hover:bg-primary hover:text-white transition"
          >
            <HelpCircle className="mr-2 inline h-4 w-4" />
            FAQ
          </a>
        )}

      </div>



      {/* Sections */}

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