import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const  metadata = {
  title: "ALL Universities  | Notes, PYQs, Syllabus & Books - Notiya",
  description:
    "Access AKTU, CSJMU, PSIT Preminum study material, previous university question papers (PYQs), syllabus, books, lab manuals, and engineering resources.",

  keywords: [
    "B.Tech Study Material",
    "AKTU",
    "CSJMU",
    "CSJMU Study Material",
    "PSIT Study Material",
    "AKTU Notes",
    "Engineering Notes",
    "PYQs",
    "Semester Notes",
    "Engineering Books",
    "AKTU Study Material",
    "Notiya",
  ],

  alternates: {
    canonical: "https://notiya.in/study-material",
  },

  openGraph: {
    title: "Study Material of ALL Universities - Notiya",
    description:
      "Download semester-wise engineering notes, PYQs, syllabus and books for free.",
    url: "https://notiya.in/study-material",
    siteName: "Notiya",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Notiya Study Material",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Study Material - Notiya",
    description:
      "Free engineering notes, syllabus, PYQs and books.",
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Study Material",
  description:
   "Access AKTU, CSJMU, PSIT Preminum study material, previous university question papers (PYQs), syllabus, books, lab manuals, and engineering resources.",

  url: "https://notiya.in/study-material",
  publisher: {
    "@type": "Organization",
    name: "Notiya",
    url: "https://notiya.in",
  },
};




export default function StudyMaterialPage() {
  const universities = [
    {
      
      title: "AKTU",
      resources: 500,
      link: "aktu",
    },
    {
     
      title: "PSIT",
      resources: 76,
      link: "psit",
    },
    {
      
      title: "CSJMU",
      resources: 188,
      link: "csjmu",
    }
  ];

  return (

     <>
       <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify(jsonLd),
    }}
  />

     <main className="max-w-6xl mx-auto px-4 py-10 md:py-14 mb-20 ">
      
      <div className="mb-3 text-sm text-muted-foreground">
        <Link href={'/'}>Home</Link><span className="mx-2">›</span> Study Material
      </div>

      {/* Heading */}
      <div className="mb-12">
        

        <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-3">
          Choose Your University
        </h1>

        <p className="text-muted-foreground text-base md:text-lg max-w-2xl">
          Select your University to access branch-wise <span className='dark:text-amber-950 text-amber-700'>Notes</span>, <span className='dark:text-amber-600 text-amber-950'>Pyq's</span>, <span className='text-blue-400'>Important Topics</span>, <span className='text-emerald-600'>Syllabus</span> and more.
        </p>
      </div>

      
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {universities.map((university) => (
            <Link
              href={`/study-material/${university.link}`}
              key={university.title}
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
                  {university.title}
                </h2>

                {/* Resource Count */}
                <p className="text-sm text-muted-foreground">
                  {university.resources} Resources
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