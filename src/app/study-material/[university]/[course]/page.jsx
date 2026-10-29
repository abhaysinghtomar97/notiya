
import Link from "next/link";
import { ArrowRight, BookOpen, FileText, GraduationCap } from "lucide-react";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/ui/Breadcrumb";

const courseYear = {
  btech: [
    { title: "1st Year", resources: 105, link: "1st-year", description: "Build your engineering fundamentals." },
    { title: "2nd Year", resources: 76, link: "2nd-year", description: "Explore core engineering subjects." },
    { title: "3rd Year", resources: 90, link: "3rd-year", description: "Strengthen your subject knowledge." },
    { title: "4th Year", resources: 56, link: "4th-year", description: "Prepare for final-year exams." },
  ],
  bca: [
    { title: "1st Year", link: "1st-year", description: "Start with the fundamentals." },
    { title: "2nd Year", link: "2nd-year", description: "Explore core computer applications." },
    { title: "3rd Year", link: "3rd-year", description: "Revise advanced topics and exams." },
  ],
  bba: [
    { title: "1st Year", link: "1st-year", description: "Learn business fundamentals." },
    { title: "2nd Year", link: "2nd-year", description: "Explore management subjects." },
    { title: "3rd Year", link: "3rd-year", description: "Prepare for advanced business topics." },
  ],
};

function getCourseData(course) {
  const normalizedCourse = String(course).toLowerCase();
  return courseYear[normalizedCourse] ?? null;
}

function getCourseName(course) {
  const names = {
    btech: "B.Tech",
    bca: "BCA",
    bba: "BBA",
  };

  return names[String(course).toLowerCase()] ?? String(course).toUpperCase();
}

export async function generateMetadata({ params }) {
  const { university, course } = await params;
  const courseData = getCourseData(course);

  if (!courseData) {
    return { title: "Course Not Found | Notiya", robots: { index: false, follow: true } };
  }

  const universityName = String(university).toUpperCase();
  const courseName = getCourseName(course);
  const url = `https://notiya.in/study-material/${encodeURIComponent(university)}/${encodeURIComponent(course).toLowerCase()}`;

  const title = `${courseName} Study Material | Notes, PYQs & Syllabus - Notiya`;
  const description = `Explore free ${courseName} study materials for ${universityName}, including notes, previous year question papers, syllabus and exam preparation resources.`;

  return {
    title,
    description,
    alternates: { canonical: url },
    keywords: [
      `${courseName} Study Material`,
      `${universityName} Notes`,
      `${courseName} Notes`,
      `${courseName} PYQs`,
      `${courseName} Syllabus`,
    ],
    openGraph: {
      title,
      description,
      url,
      siteName: "Notiya",
      images: [{
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${courseName} Study Material`,
      }],
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.png"],
    },
    robots: { index: true, follow: true },
  };
}

export default async function StudyMaterialPage({ params }) {
  const { university, course } = await params;
  const years = getCourseData(course);

  if (!years) notFound();

  const universityName = String(university).toUpperCase();
  const courseName = getCourseName(course);
  const canonicalUrl =
    `https://notiya.in/study-material/${encodeURIComponent(university)}/${encodeURIComponent(course).toLowerCase()}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${universityName} ${courseName} Study Material`,
    description: `Browse ${courseName} study materials for ${universityName}, organized by year.`,
    url: canonicalUrl,
    isPartOf: {
      "@type": "WebSite",
      name: "Notiya",
      url: "https://notiya.in",
    },
    publisher: {
      "@type": "Organization",
      name: "Notiya",
      url: "https://notiya.in",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <main className="mx-auto mb-20 w-full max-w-7xl px-5 py-6 md:px-8">
        <Breadcrumb
          items={[
            { label: "Universities", href: "/study-material" },
            {
              label: universityName,
              href: `/study-material/${encodeURIComponent(university)}`,
            },
            {
              label: courseName,
              href: `/study-material/${encodeURIComponent(university)}/${encodeURIComponent(course).toLowerCase()}`,
            },
          ]}
        />

        <header className="mb-8 mt-8 md:mb-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-300">
            {universityName} · {courseName}
          </p>

          <h1 className="mb-3 text-3xl font-bold tracking-tight md:text-5xl">
            Choose Your Year
          </h1>

          <p className="max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
            Find year-wise notes, previous year question papers (PYQs),
            syllabus and important topics for your exam preparation.
          </p>
        </header>

        <section aria-label={`${courseName} study material by year`}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {years.map((year, index) => {
              const href =
                `/study-material/${encodeURIComponent(university)}/${encodeURIComponent(course).toLowerCase()}/${year.link}`;

              return (
                <Link
                  href={href}
                  key={year.link}
                  className="group rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:ring-offset-2"
                >
                  <article className="flex h-full min-h-52 flex-col rounded-2xl border border-border/80 bg-background p-5 transition-all duration-200 hover:-translate-y-1 hover:border-amber-500/70 hover:shadow-lg">
                    <div className="mb-5 flex items-center justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10 text-amber-700 dark:text-amber-300">
                        {index === 0 ? (
                          <BookOpen size={22} />
                        ) : index === 1 ? (
                          <FileText size={22} />
                        ) : (
                          <GraduationCap size={22} />
                        )}
                      </div>

                      <ArrowRight
                        size={20}
                        className="text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-amber-600"
                        aria-hidden="true"
                      />
                    </div>

                    <h2 className="text-xl font-semibold tracking-tight group-hover:text-amber-700 dark:group-hover:text-amber-300">
                      {year.title}
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {year.description}
                    </p>

                    <div className="mt-auto pt-5">
                      <p className="text-sm font-medium text-muted-foreground">
                        {typeof year.resources === "number"
                          ? `${year.resources} resources`
                          : "Explore available resources"}
                      </p>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="mt-10 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5 md:p-6">
          <h2 className="text-lg font-semibold">What can you find on Notiya?</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Notes", "Study subject-wise material."],
              ["Previous year papers", "Practice with past exam papers."],
              ["Syllabus", "Review units and topics."],
              ["Important topics", "Focus your revision."],
            ].map(([title, description]) => (
              <div key={title}>
                <p className="font-medium">{title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
