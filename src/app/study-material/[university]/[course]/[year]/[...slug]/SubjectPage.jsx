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
    <div className="max-w-7xl mx-auto px-4 py-8">

      {/* Breadcrumb */}

      <div className="mb-5 flex flex-wrap items-center text-sm text-muted-foreground">

        <Link href="/">Home</Link>

        <span className="mx-2">›</span>

        <Link href="/study-material">Study Material</Link>

        <span className="mx-2">›</span>

        <span>{university}</span>

        <span className="mx-2">›</span>

        <span>{course}</span>

        <span className="mx-2">›</span>

        <span>{year}</span>

        {branch && (
          <>
            <span className="mx-2">›</span>
            <span>{branch}</span>
          </>
        )}

        <span className="mx-2">›</span>

        <span className="font-medium">
          {subject.subjectName}
        </span>

      </div>

      {/* Subject Header */}

      <div className="mb-10">

        <h1 className="text-4xl font-bold">
          {subject.subjectName}
        </h1>

        <p className="text-muted-foreground mt-2">
          {subject.subjectCode}
        </p>

        {subject.description && (
          <p className="mt-5 leading-7">
            {subject.description}
          </p>
        )}

      </div>

      {/* Quick Stats */}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">

        <div className="border rounded-xl p-5 text-center">
          <p className="text-3xl font-bold">
            {notes?.units?.length || 0}
          </p>

          <p className="text-sm text-muted-foreground">
            Units
          </p>
        </div>

        <div className="border rounded-xl p-5 text-center">
          <p className="text-3xl font-bold">
            {subject.videos?.length || 0}
          </p>

          <p className="text-sm text-muted-foreground">
            Videos
          </p>
        </div>

        <div className="border rounded-xl p-5 text-center">
          <p className="text-3xl font-bold">
            {notes?.pyqs?.length || 0}
          </p>

          <p className="text-sm text-muted-foreground">
            PYQs
          </p>
        </div>

        <div className="border rounded-xl p-5 text-center">
          <p className="text-3xl font-bold">
            {subject.books?.length || 0}
          </p>

          <p className="text-sm text-muted-foreground">
            Books
          </p>
        </div>

      </div>

      {/* Sections */}

      {notes?.units?.length > 0 && (
        <NotesSection units={notes.units} />
      )}

      {subject.videos?.length > 0 && (
        <VideosSection videos={subject.videos} />
      )}

      {notes?.pyqs?.length > 0 && (
        <PyqSection pyqs={notes.pyqs} />
      )}

      {subject.syllabus?.length > 0 && (
        <SyllabusSection syllabus={subject.syllabus} />
      )}

      {subject.importantTopics?.length > 0 && (
        <ImportantTopicsSection
          topics={subject.importantTopics}
        />
      )}

      {subject.books?.length > 0 && (
        <BooksSection books={subject.books} />
      )}

      {subject.faqs?.length > 0 && (
        <FaqSection faqs={subject.faqs} />
      )}

    </div>
  );
}