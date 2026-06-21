import Link from "next/link";
import { ArrowRight } from "lucide-react";


export async function generateMetadata({ params }) {

  const { university, course } = await params;

  const universityName = decodeURIComponent(university)
    .toUpperCase();
  const courseName = decodeURIComponent(course)
    .toUpperCase();

  const title = `${courseName} Study Material | Notes, PYQs, Syllabus & Books - Notiya`;
  const description = `Download free ${courseName} study material for ${universityName} including semester-wise notes, previous year question papers (PYQs), syllabus, books, lab manuals, and other resources.`;

  const keywords = [
    `${courseName} Study Material`,
    `${universityName} Notes`,
    `${courseName} Notes`,
    `${courseName} PYQs`,
    `${courseName} Syllabus`,
    `${courseName} Books`,
    `${universityName} Study Material`,
    "Notiya",
  ];

  const url = `https://notiya.in/study-material/${university}/${course}`;

  return {
    title,
    description,
    keywords,

    alternates: {
      canonical: url,
    },

    openGraph: {
      title,
      description,
      url,
      siteName: "Notiya",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: `${courseName} Study Material`,
        },
      ],
      locale: "en_IN",
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.png"],
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "B.Tech, BCA, BBA Study Material",
  description:
    "Free B.Tech, BCA, BBA study material including notes, previous year question papers, syllabus, books and lab manuals.",
  url: "https://notiya.in/study-material",
  publisher: {
    "@type": "Organization",
    name: "Notiya",
    url: "https://notiya.in",
  },
};




export default async function StudyMaterialPage({ params }) {

  const {university, course } = await params;
 
  const courseYear = {
    btech: [
      {
        title: "1st Year",
        resources: 105,
        link: "1st-year",
      },
      {
        title: "2nd Year",
        resources: 76,
        link: "2nd-year",
      },
      {
        title: "3rd Year",
        resources: 90,
        link: "3rd-year",
      },
      {
        title: "4th Year",
        resources: 56,
        link: "4th-year",
      },
    ],

    bca: [
      { title: "1st Year", link: "1st-year" },
      { title: "2nd Year", link: "2nd-year" },
      { title: "3rd Year", link: "3rd-year" },
    ],

    bba: [
      { title: "1st Year", link: "1st-year" },
      { title: "2nd Year", link: "2nd-year" },
      { title: "3rd Year", link: "3rd-year" },
    ],
  };
  return (

    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      <main className="max-w-6xl mx-auto px-4 py-10 md:py-14 mb-20 ">

          <div className="mb-3 text-sm text-muted-foreground flex items-center">
          <Link href={'/'} className="hover:text-primary transition-colors">Home</Link>
          <span className="mx-2">›</span> 
          <Link href={'/universities'} className="hover:text-primary transition-colors">Universities</Link>
          <span className="mx-2">›</span> 
          <span className="text-foreground font-medium">{university}</span>
          <span className="mx-2">›</span> 
          <span className="text-foreground font-medium">{course}</span>
        </div>
        {/* Heading */}
        <div className="mb-12">


          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-3">
            Choose Your Year
          </h1>

          <p className="text-muted-foreground text-base md:text-lg max-w-2xl">
            Select your year to access branch-wise <span className='dark:text-amber-200'>Notes</span>, <span className='dark:text-yellow-600'>Pyq's</span>, <span className='dark:text-blue-400'>Important Topics</span>, <span className='dark:text-emerald-200'>Syllabus</span> and more.
          </p>
        </div>

        {/* Years Grid */}
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {courseYear[course].map((year) => (
              <Link
                href={`${course}/${year.link}`}
                key={year.title}
                className="group"
              >
                <div
                  className="
                  h-full
                  rounded-2xl
                  border
                  bg-background
                  p-6
                  transition-all
                  duration-300
                  hover:bg-main 
                  hover:border-primary
                  hover:shadow-lg
                  hover:-translate-y-1
                  hover:scale-[1.02]
                "
                >


                  {/* Title */}
                  <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {year.title}
                  </h2>

                  {/* Resource Count */}
                  <p className="text-sm text-muted-foreground">
                    {year.resources} Resources
                  </p>

                  {/* Arrow */}
                  <div className="mt-6 flex items-center">
                    <ArrowRight
                      className="
                      h-5
                      w-5
                      text-primary
                      opacity-0
                      -translate-x-2
                      transition-all
                      duration-300
                      group-hover:opacity-100
                      group-hover:translate-x-0
                    "
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

    </>

  );
}