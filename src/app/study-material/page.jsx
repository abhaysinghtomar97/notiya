import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Image from "next/image";
import Script from "next/script";
export const metadata = {
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
      logo: "aktu_logo.svg",
      cover: "aktu_building.jpg"
    },
    {

      title: "PSIT",
      resources: 76,
      link: "psit",
      logo: "psit_logo.svg",
      cover: "psit_building.jpg"
    },
    {

      title: "CSJMU",
      resources: 188,
      link: "csjmu",
      logo: "csjmu_logo.svg",
      cover: "csjmu_building.jpg"
    }
  ];

 return (
    <>
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      <main className="max-w-6xl p-5 mb-20">
        <Breadcrumb
          items={[
            {
              label: "Universities",
              href: "/study-material",
            },
          ]}
        />

        {/* Heading */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-3">
            Choose Your University
          </h1>

          <p className="text-muted-foreground text-base md:text-lg max-w-2xl">
            Select your University to access branch-wise <span className="dark:text-amber-950 text-amber-700">Notes</span>, <span className="dark:text-amber-600 text-amber-950">Pyq&apos;s</span>, <span className="text-blue-400">Important Topics</span>, <span className="text-emerald-600">Syllabus</span> and more.
          </p>
        </div>

        {/* University Grid Section */}
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {universities.map((university) => (
              <Link
                href={`/study-material/${university.link}`}
                key={university.title}
                className="group"
              >
                <div className="overflow-hidden rounded-3xl border bg-card shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-primary">
                  {/* Hero Image */}
                  <div
                    style={{
                      backgroundImage: `url(${university.cover})`,
                    }}
                    className="relative h-72 bg-cover bg-center"
                  >
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

                    {/* Logo */}
                    <div className="absolute inset-0 h-auto w-auto flex items-center justify-center">
                      <Image
                        src={university.logo}
                        alt={university.title}
                        width={120}
                        height={120}
                        className="object-contain transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>

                    {/* University Name */}
                    <div className="absolute bottom-8 left-0 right-0 text-center text-white">
                      <h2 className="text-3xl font-bold">{university.title}</h2>
                      <p className="text-white/80 mt-2 text-lg">
                        {university.fullName}
                      </p>
                    </div>
                  </div>

                  {/* Bottom */}
                  <div className="flex items-center justify-between p-6">
                    <div>
                      <p className="text-3xl font-bold text-primary">
                        {university.resources}+
                      </p>
                      <p className="text-muted-foreground">Resources</p>
                    </div>

                    <div className="h-14 w-14 rounded-full bg-primary flex items-center justify-center text-white transition-transform duration-300 group-hover:translate-x-1">
                      <ArrowRight className="w-6 h-6" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* --- NEW SEO TEXT & FAQ SECTION --- */}
        <section className="mt-24 pt-12 border-t">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* About / SEO Text block */}
            <div>
              <h2 className="text-2xl font-bold tracking-tight mb-4">
                Comprehensive Engineering Study Material
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Notiya is your ultimate academic companion, specifically designed for engineering students. Whether you are preparing for <strong>AKTU semester exams</strong>, studying at <strong>PSIT</strong>, or enrolled at <strong>CSJMU</strong>, we provide meticulously organized resources to help you succeed.
                </p>
                <p>
                  Stop wasting time searching for reliable content. We offer branch-wise <strong>B.Tech notes, Previous Year Question Papers (PYQs), updated syllabi, and lab manuals</strong> all in one place. Our mission is to make premium study resources accessible and easy to navigate so you can focus on scoring high.
                </p>
              </div>
            </div>

            {/* FAQ Block */}
            <div>
              <h2 className="text-2xl font-bold tracking-tight mb-6">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg">Are the engineering notes and PYQs free?</h3>
                  <p className="text-muted-foreground mt-1">Yes, all semester-wise study materials, including previous year question papers and important topics, are completely free to access and download.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Which branches are covered?</h3>
                  <p className="text-muted-foreground mt-1">We cover all major B.Tech branches including Computer Science (CSE), Information Technology (IT), Electronics and Communication (ECE), Mechanical, and Civil Engineering.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Is the syllabus updated?</h3>
                  <p className="text-muted-foreground mt-1">Absolutely. We regularly update our resources to align with the latest curriculum changes announced by AKTU, CSJMU, and PSIT.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* --- END NEW SECTION --- */}

      </main>
    </>
  );
}