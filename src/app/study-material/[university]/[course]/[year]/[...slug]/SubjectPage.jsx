
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  BookOpen,
  FileText,
  PlayCircle,
  Star,
  BookMarked,
  HelpCircle,
  GraduationCap,
  Download,
  ArrowRight,
  Library,
  ClipboardCheck,
} from "lucide-react";

import { getSubjectData } from "@/lib/fetchData";

import VideosSection from "@/components/VideosSection";
import PyqSection from "@/components/PyqSection";
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

  if (!data?.subject) {
    notFound();
  }

  const { subject, notes } = data;

  const subjectName = subject.subjectName || "Subject";
  const description =
    typeof subject.description === "string"
      ? subject.description.trim()
      : "";

  const units = notes?.units ?? [];
  const pyqs = notes?.pyqs ?? [];
  const videos = subject.videos ?? [];
  const topics = subject.importantTopics ?? [];
  const books = subject.books ?? [];
  const faqs = subject.faqs ?? [];

  const hasNotes = units.some(
    (unit) => (unit.resources?.length ?? 0) > 0
  );

  const notesCount = units.reduce(
    (total, unit) => total + (unit.resources?.length ?? 0),
    0
  );

  const videoCount = videos.length;
  const pyqCount = pyqs.length;
  const topicCount = topics.length;
  const bookCount = books.length;

  const totalResources =
    notesCount + videoCount + pyqCount + bookCount;

  const basePath =
    `/study-material/${university}/${course}/${year}`;

  const branchPath = branch
    ? `${basePath}/${branch}`
    : basePath;

  const yearLabel = year.replace(/-/g, " ");
  const courseLabel = course.replace(/-/g, " ");

  const syllabusYearMap = {
    "1st-year": "1st-Year-AKTU-Syllabus",
    "2nd-year": "2nd-Year-AKTU-Syllabus",
    "3rd-year": "3rd-Year-AKTU-Syllabus",
    "4th-year": "4th-Year-AKTU-Syllabus",
  };

  const syllabusHref =
    university === "aktu" &&
    course === "btech" &&
    branch &&
    syllabusYearMap[year]
      ? `/AKTU-Syllabus/${syllabusYearMap[year]}`
      : null;

  const navItems = [
    {
      label: "Notes",
      href: "#notes",
      icon: BookOpen,
      show: hasNotes,
    },
    {
      label: "Previous Papers",
      href: "#pyqs",
      icon: FileText,
      show: pyqCount > 0,
    },
    {
      label: "Important Topics",
      href: "#important-topics",
      icon: Star,
      show: topicCount > 0,
    },
    {
      label: "Video Lectures",
      href: "#videos",
      icon: PlayCircle,
      show: videoCount > 0,
    },
    {
      label: "Books",
      href: "#books",
      icon: BookMarked,
      show: bookCount > 0,
    },
    {
      label: "FAQs",
      href: "#faq",
      icon: HelpCircle,
      show: faqs.length > 0,
    },
  ].filter((item) => item.show);

  const stats = [
    {
      label: "Study resources",
      value: notesCount,
      icon: BookOpen,
      show: notesCount > 0,
    },
    {
      label: "Previous papers",
      value: pyqCount,
      icon: FileText,
      show: pyqCount > 0,
    },
    {
      label: "Video lectures",
      value: videoCount,
      icon: PlayCircle,
      show: videoCount > 0,
    },
    {
      label: "Important topics",
      value: topicCount,
      icon: Star,
      show: topicCount > 0,
    },
  ].filter((item) => item.show);

  return (
    <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

    

      {/* Subject introduction */}
      <header className="mb-12">
        <div className="rounded-3xl border border-amber-900/15 bg-gradient-to-br from-amber-500/10 via-background to-background p-6 sm:p-10">

          <div className="mb-5 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-600/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-700 dark:text-amber-400">
              <GraduationCap className="h-4 w-4" />
              Free Study Resources
            </span>

            {subject.subjectCode && (
              <span className="rounded-full border border-border px-3 py-1 text-xs font-medium">
                Code: {subject.subjectCode}
              </span>
            )}
          </div>

          <h1 className="max-w-4xl text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {subjectName} Notes, PYQs &amp; Study Material
          </h1>

          <p className="mt-4 text-sm font-medium text-muted-foreground sm:text-base">
            {university.toUpperCase()}
            {" · "}
            <span className="capitalize">{courseLabel}</span>
            {" · "}
            <span className="capitalize">{yearLabel}</span>
            {branch && ` · ${branch.toUpperCase()}`}
          </p>

          {description && (
            <div className="mt-6 max-w-4xl">
              <h2 className="mb-2 text-lg font-semibold">
                About {subjectName}
              </h2>

              <p className="text-base leading-7 text-muted-foreground">
                {description}
              </p>
            </div>
          )}

          <div className="mt-7 flex flex-wrap gap-3">
            {hasNotes && (
              <a
                href="#notes"
                className="inline-flex items-center gap-2 rounded-xl bg-amber-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-amber-700"
              >
                <BookOpen className="h-4 w-4" />
                Explore Notes
                <ArrowRight className="h-4 w-4" />
              </a>
            )}

            {pyqCount > 0 && (
              <a
                href="#pyqs"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-5 py-3 text-sm font-semibold transition hover:border-amber-600"
              >
                <FileText className="h-4 w-4" />
                Previous Papers
              </a>
            )}

            {syllabusHref && (
              <Link
                href={syllabusHref}
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-5 py-3 text-sm font-semibold transition hover:border-amber-600"
              >
                <ClipboardCheck className="h-4 w-4" />
                View Syllabus
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Resource overview */}
      {stats.length > 0 && (
        <section
          aria-label="Available study resources"
          className="mb-12"
        >
          <div className="mb-5">
            <h2 className="text-2xl font-bold tracking-tight">
              Available Study Resources
            </h2>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Explore the learning materials currently available
              for {subjectName}.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {stats.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className="rounded-2xl border border-border bg-card p-4 sm:p-5"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600">
                    <Icon className="h-5 w-5" />
                  </div>

                  <p className="text-2xl font-bold tabular-nums">
                    {item.value}
                  </p>

                  <p className="mt-1 text-sm text-muted-foreground">
                    {item.label}
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Jump links */}
      {navItems.length > 0 && (
        <nav
          aria-label="On this page"
          className="mb-14 rounded-2xl border border-border bg-card p-5 sm:p-6"
        >
          <h2 className="mb-4 text-lg font-bold">
            Explore this subject
          </h2>

          <div className="flex flex-wrap gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <a
                  key={item.label}
                  href={item.href}
                  className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2.5 text-sm font-medium transition hover:border-amber-600 hover:bg-amber-500/5 hover:text-amber-700 dark:hover:text-amber-400"
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </a>
              );
            })}
          </div>
        </nav>
      )}

      {/* Notes */}
      {hasNotes && (
        <section
          id="notes"
          aria-labelledby="notes-heading"
          className="mb-16 scroll-mt-24"
        >
          <div className="mb-5">
            <h2
              id="notes-heading"
              className="text-2xl font-bold tracking-tight sm:text-3xl"
            >
              {subjectName} Notes
            </h2>

            <p className="mt-2 max-w-3xl leading-7 text-muted-foreground">
              Browse the available study materials by unit.
              Open the relevant resource to preview or download
              it for revision.
            </p>
          </div>

          <NotesSection units={units} />
        </section>
      )}

      {/* Videos */}
      {videoCount > 0 && (
        <section
          id="videos"
          aria-labelledby="videos-heading"
          className="mb-16 scroll-mt-24"
        >
          <div className="mb-5">
            <h2
              id="videos-heading"
              className="text-2xl font-bold tracking-tight sm:text-3xl"
            >
              {subjectName} Video Lectures
            </h2>

            <p className="mt-2 max-w-3xl leading-7 text-muted-foreground">
              Use the available lectures to reinforce concepts
              and review topics alongside your written notes.
            </p>
          </div>

          <VideosSection videos={videos} />
        </section>
      )}

      {/* Previous-year papers */}
      {pyqCount > 0 && (
        <section
          id="pyqs"
          aria-labelledby="pyqs-heading"
          className="mb-16 scroll-mt-24"
        >
          <div className="mb-5">
            <h2
              id="pyqs-heading"
              className="text-2xl font-bold tracking-tight sm:text-3xl"
            >
              {subjectName} Previous-Year Questions
            </h2>

            <p className="mt-2 max-w-3xl leading-7 text-muted-foreground">
              Practise with the available previous-year papers.
              Attempt questions independently first, then use
              your notes to review concepts you find difficult.
            </p>
          </div>

          <PyqSection pyqs={pyqs} />
        </section>
      )}

      {/* Important topics */}
      {topicCount > 0 && (
        <section
          id="important-topics"
          aria-labelledby="topics-heading"
          className="mb-16 scroll-mt-24"
        >
          <div className="mb-5">
            <h2
              id="topics-heading"
              className="text-2xl font-bold tracking-tight sm:text-3xl"
            >
              Important Topics in {subjectName}
            </h2>

            <p className="mt-2 max-w-3xl leading-7 text-muted-foreground">
              Use this list as a revision checklist. Review the
              relevant unit notes and practise applicable
              questions for each topic.
            </p>
          </div>

          <ImportantTopicsSection topics={topics} />
        </section>
      )}

      {/* Recommended books */}
      {bookCount > 0 && (
        <section
          id="books"
          aria-labelledby="books-heading"
          className="mb-16 scroll-mt-24"
        >
          <div className="mb-5">
            <h2
              id="books-heading"
              className="text-2xl font-bold tracking-tight sm:text-3xl"
            >
              Recommended Books for {subjectName}
            </h2>

            <p className="mt-2 max-w-3xl leading-7 text-muted-foreground">
              Refer to these books for additional explanations
              and practice alongside your course materials.
            </p>
          </div>

          <BooksSection books={books} />
        </section>
      )}

      {/* FAQs */}
      {faqs.length > 0 && (
        <section
          id="faq"
          aria-labelledby="faq-heading"
          className="mb-16 scroll-mt-24"
        >
          <div className="mb-5">
            <h2
              id="faq-heading"
              className="text-2xl font-bold tracking-tight sm:text-3xl"
            >
              Frequently Asked Questions about {subjectName}
            </h2>
          </div>

          <FaqSection faqs={faqs} />
        </section>
      )}

      {/* Empty-state handling */}
      {totalResources === 0 &&
        topicCount === 0 &&
        faqs.length === 0 && (
          <section className="mb-12 rounded-2xl border border-border p-6">
            <div className="flex items-start gap-3">
              <Library className="mt-1 h-6 w-6 shrink-0 text-amber-600" />

              <div>
                <h2 className="text-lg font-semibold">
                  Resources are being organized
                </h2>

                <p className="mt-2 leading-7 text-muted-foreground">
                  There are currently no study resources listed
                  for this subject. Please explore the other
                  subjects in your course.

                  {/* adding mail to request notes  */}
                  <span className="block mt-2 text-sm font-bold text-muted-foreground">
                    You can also request notes for this subject by sending an email to{" "}
                    <a
                      href="mailto:support.notiya@gmail.com"
                      className="text-amber-700 hover:underline dark:text-amber-400"
                    >
                      support.notiya@gmail.com
                    </a>
                  </span>
                </p>

                <Link
                  href={branchPath}
                  className="mt-4 inline-flex items-center gap-2 font-semibold text-amber-700 hover:underline dark:text-amber-400"
                >
                  Browse related subjects
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </section>
        )}

      {/* Study guidance */}
      {(hasNotes || pyqCount > 0 || videoCount > 0) && (
        <section
          aria-labelledby="study-guide-heading"
          className="mb-12 rounded-2xl border border-amber-900/15 bg-amber-500/5 p-6 sm:p-8"
        >
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-700 dark:text-amber-400">
              <ClipboardCheck className="h-5 w-5" />
            </div>

            <div>
              <h2
                id="study-guide-heading"
                className="text-xl font-bold sm:text-2xl"
              >
                How to use these study resources
              </h2>

              <ol className="mt-4 list-decimal space-y-2 pl-5 leading-7 text-muted-foreground">
                {hasNotes && (
                  <li>
                    Start with the notes for the unit you are
                    studying and identify the concepts you need
                    to understand.
                  </li>
                )}

                {videoCount > 0 && (
                  <li>
                    Use the available video lectures when you
                    need another explanation of a topic.
                  </li>
                )}

                {pyqCount > 0 && (
                  <li>
                    Practise the available previous-year papers
                    and revisit topics where you make mistakes.
                  </li>
                )}

                {topicCount > 0 && (
                  <li>
                    Use the important-topic list as a revision
                    checklist, not as a guarantee of exam questions.
                  </li>
                )}
              </ol>
            </div>
          </div>
        </section>
      )}

      {/* Continue exploring */}
      <section className="rounded-2xl border border-border p-6 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-bold sm:text-2xl">
              Continue your studies
            </h2>

            <p className="mt-2 max-w-2xl leading-7 text-muted-foreground">
              Return to your branch page to explore other subjects
              and their available learning resources.
            </p>
          </div>

          <Link
            href={branchPath}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-border px-5 py-3 text-sm font-semibold transition hover:border-amber-600 hover:text-amber-700 dark:hover:text-amber-400"
          >
            Browse subjects
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

    </main>
  );
}
