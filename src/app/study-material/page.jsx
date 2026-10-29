
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen, Clock3, GraduationCap, Newspaper } from "lucide-react";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { getPublishedUpdates } from "@/lib/updates";

export const metadata = {
  title: "University Study Material | Notes, PYQs & Syllabus - Notiya",
  description:
    "Explore university-wise study materials on Notiya, including notes, previous year question papers, syllabus and other academic resources for supported courses.",
  keywords: [
    "University Study Material",
    "AKTU Study Material",
    "CSJMU Study Material",
    "PSIT Study Material",
    "B.Tech Notes",
    "Previous Year Question Papers",
    "Engineering Syllabus",
    "Notiya",
  ],
  alternates: {
    canonical: "https://notiya.in/study-material",
  },
  openGraph: {
    title: "University Study Material - Notiya",
    description:
      "Explore university-wise notes, PYQs, syllabus and academic resources on Notiya.",
    url: "https://notiya.in/study-material",
    siteName: "Notiya",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Notiya University Study Material",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "University Study Material - Notiya",
    description:
      "Explore university-wise study resources on Notiya.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const universities = [
  {
    title: "AKTU",
    fullName: "Dr. A.P.J. Abdul Kalam Technical University",
    resources: 500,
    link: "aktu",
    logo: "/aktu_logo.svg",
    cover: "/aktu_building.jpg",
    theme: "from-blue-950/90 via-blue-900/35 to-transparent",
    accent: "text-blue-700 dark:text-blue-300",
    badge: "bg-blue-500/15 text-blue-700 dark:text-blue-300",
  },
  {
    title: "PSIT",
    fullName: "Pranveer Singh Institute of Technology",
    resources: 97,
    link: "psit",
    logo: "/psit_logo.svg",
    cover: "/psit_building.jpg",
    theme: "from-emerald-950/90 via-emerald-900/35 to-transparent",
    accent: "text-emerald-700 dark:text-emerald-300",
    badge: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
  },
  {
    title: "CSJMU",
    fullName: "Chhatrapati Shahu Ji Maharaj University",
    resources: 40,
    link: "csjmu",
    logo: "/csjmu_logo.svg",
    cover: "/csjmu_building.jpg",
    theme: "from-violet-950/90 via-violet-900/35 to-transparent",
    accent: "text-violet-700 dark:text-violet-300",
    badge: "bg-violet-500/15 text-violet-700 dark:text-violet-300",
  },
];

function formatDate(date) {
  if (!date) return null;

  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return null;

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(parsed);
}

function getPostExcerpt(post) {
  if (typeof post.excerpt === "string" && post.excerpt.trim()) {
    return post.excerpt.trim();
  }

  return null;
}

function RecentPosts({ posts }) {
  return (
    <aside
      aria-labelledby="recent-posts-heading"
      className="h-fit rounded-2xl border border-border bg-card p-5 sm:p-6 lg:sticky lg:top-6"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-700 dark:text-amber-300">
            <Newspaper size={20} />
          </div>

          <h2
            id="recent-posts-heading"
            className="text-xl font-bold tracking-tight"
          >
            Recent Posts
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Latest updates and articles from Notiya.
          </p>
        </div>

        <span className="rounded-full bg-amber-500/10 px-2.5 py-1 text-xs font-semibold text-amber-700 dark:text-amber-300">
          Latest
        </span>
      </div>

      {posts.length > 0 ? (
        <div className="mt-5 divide-y divide-border">
          {posts.map((post) => {
            const date = formatDate(post.publishedAt);
            const excerpt = getPostExcerpt(post);

            return (
              <article
                key={String(post._id)}
                className="py-4 first:pt-0 last:pb-0"
              >
                {post.category && (
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-300">
                    {post.category}
                  </p>
                )}

                <Link
                  href={`/updates/${encodeURIComponent(post.slug)}`}
                  className="group inline-flex items-start gap-2"
                >
                  <h3 className="text-sm font-semibold leading-6 transition-colors group-hover:text-amber-700 dark:group-hover:text-amber-300">
                    {post.title}
                  </h3>

                  <ArrowRight
                    size={15}
                    className="mt-1 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5"
                  />
                </Link>

                {excerpt && (
                  <p className="mt-1.5 line-clamp-2 text-sm leading-6 text-muted-foreground">
                    {excerpt}
                  </p>
                )}

                {date && (
                  <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock3 size={12} />
                    <time dateTime={post.publishedAt}>
                      {date}
                    </time>
                  </p>
                )}
              </article>
            );
          })}
        </div>
      ) : (
        <div className="mt-5 rounded-xl bg-muted/50 px-4 py-6 text-center">
          <Newspaper
            size={24}
            className="mx-auto text-muted-foreground"
          />
          <p className="mt-3 text-sm font-medium">
            No recent posts yet
          </p>
          <p className="mt-1 text-xs leading-5 text-muted-foreground">
            Check back for new study guides and updates.
          </p>
        </div>
      )}

      <Link
        href="/updates"
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-border px-4 py-3 text-sm font-semibold transition-colors hover:bg-muted"
      >
        View all posts
        <ArrowRight size={16} />
      </Link>
    </aside>
  );
}

export default async function StudyMaterialPage() {
  // Fetch only published posts, newest first.
  const updates = await getPublishedUpdates({ limit: 5 });
  const posts = (updates ?? []).filter(
    (post) =>
      typeof post.slug === "string" &&
      post.slug.trim() &&
      typeof post.title === "string" &&
      post.title.trim()
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "University Study Material - Notiya",
    description:
      "Explore university-wise study materials, notes, previous year question papers and syllabus on Notiya.",
    url: "https://notiya.in/study-material",
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
            {
              label: "Universities",
              href: "/study-material",
            },
          ]}
        />

        {/* Introduction */}
        <header className="mb-9 mt-8 md:mb-12">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/5 px-3 py-1.5 text-xs font-semibold text-amber-800 dark:text-amber-300">
            <GraduationCap size={15} />
            YOUR STUDY SPACE
          </div>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Choose Your University
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
            Find academic resources organized by university, course,
            year and branch. Select your university to get started with
            your exam preparation.
          </p>
        </header>

        {/* University cards + recent posts */}
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_320px] xl:grid-cols-[minmax(0,1fr)_350px]">
          <section aria-labelledby="universities-heading">
            <div className="mb-5 flex items-center justify-between gap-3">
              <div>
                <h2
                  id="universities-heading"
                  className="text-xl font-bold tracking-tight"
                >
                  Browse Universities
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Choose an institution to explore its resources.
                </p>
              </div>

              <span className="shrink-0 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground">
                {universities.length} available
              </span>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {universities.map((university) => (
                <Link
                  href={`/study-material/${university.link}`}
                  key={university.link}
                  className="group rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2"
                >
                  <article className="h-full overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-amber-500/50 hover:shadow-lg">
                    {/* University cover */}
                    <div className="relative h-48 overflow-hidden sm:h-44">
                      <Image
                        src={university.cover}
                        alt={`${university.title} campus`}
                        fill
                        sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />

                      <div
                        className={`absolute inset-0 bg-gradient-to-t ${university.theme}`}
                      />

                      <div className="absolute left-4 top-4 rounded-lg bg-white/95 p-2 shadow-sm">
                        <Image
                          src={university.logo}
                          alt={`${university.title} logo`}
                          width={56}
                          height={56}
                          className="h-10 w-10 object-contain"
                        />
                      </div>

                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <h3 className="text-2xl font-bold tracking-tight">
                          {university.title}
                        </h3>
                        <p className="mt-1 line-clamp-2 text-sm leading-5 text-white/90">
                          {university.fullName}
                        </p>
                      </div>
                    </div>

                    {/* Card details */}
                    <div className="p-4 sm:p-5">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <span
                            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${university.badge}`}
                          >
                            Study resources
                          </span>
                          <p className="mt-3 text-sm text-muted-foreground">
                            Explore notes, PYQs and syllabus
                          </p>
                        </div>

                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-500 text-white transition-all duration-300 group-hover:translate-x-0.5 group-hover:bg-amber-600">
                          <ArrowRight size={18} />
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </section>

          <RecentPosts posts={posts} />
        </div>

        {/* About Notiya */}
        <section
          aria-labelledby="about-notiya-heading"
          className="mt-14 rounded-2xl border border-border bg-card p-6 sm:p-8 md:mt-20"
        >
          <div className="grid gap-8 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] md:items-start">
            <div>
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10 text-amber-700 dark:text-amber-300">
                <BookOpen size={22} />
              </div>

              <h2
                id="about-notiya-heading"
                className="text-2xl font-bold tracking-tight"
              >
                About Notiya
              </h2>

              <div className="mt-4 space-y-4 text-sm leading-7 text-muted-foreground sm:text-base">
                <p>
                  <strong className="text-foreground">Notiya</strong> is
                  a student-focused study-material platform designed to
                  make academic resources easier to discover and access.
                  Instead of searching across multiple pages, students
                  can browse materials through a structured university,
                  course, year and branch hierarchy.
                </p>

                <p>
                  Depending on the selected course and subject, resources
                  may include study notes, previous year question papers
                  (PYQs), syllabus information, important topics,
                  reference books and other exam-preparation materials.
                </p>

                <p>
                  Our aim is to help students spend less time searching
                  for study resources and more time understanding
                  concepts, revising important topics and preparing
                  for examinations.
                </p>
              </div>

              <Link
                href="/about"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-amber-700 transition-colors hover:text-amber-800 dark:text-amber-300 dark:hover:text-amber-200"
              >
                Learn more about Notiya
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-1">
              {[
                {
                  title: "Organized resources",
                  description:
                    "Browse by university, course, year and branch.",
                  icon: GraduationCap,
                },
                {
                  title: "Exam preparation",
                  description:
                    "Find relevant notes, PYQs and revision material where available.",
                  icon: BookOpen,
                },
                {
                  title: "Study updates",
                  description:
                    "Read published announcements, guides and academic updates.",
                  icon: Newspaper,
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="flex gap-3 rounded-xl border border-border/70 bg-background p-4"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-amber-700 dark:text-amber-300">
                      <Icon size={18} />
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm leading-6 text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section
          aria-labelledby="faq-heading"
          className="mt-12 border-t border-border pt-10"
        >
          <h2
            id="faq-heading"
            className="text-2xl font-bold tracking-tight"
          >
            Frequently Asked Questions
          </h2>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <article>
              <h3 className="font-semibold">
                What is Notiya?
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Notiya is a study-material platform that organizes
                academic resources by university, course, year and
                subject to help students find relevant material.
              </p>
            </article>

            <article>
              <h3 className="font-semibold">
                Which universities are listed?
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                This page currently lists AKTU, PSIT and CSJMU.
                Select an institution to see the courses and resources
                available for it.
              </p>
            </article>

            <article>
              <h3 className="font-semibold">
                What resources can I find?
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Depending on the subject, resources may include notes,
                previous year papers, syllabus information, important
                topics and reference material.
              </p>
            </article>

            <article>
              <h3 className="font-semibold">
                How do I find a particular subject?
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Select your university, choose your course and year,
                and then browse the available branches and subjects.
              </p>
            </article>
          </div>
        </section>
      </main>
    </>
  );
}
