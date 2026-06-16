import NotesClient from "./NotesClient";

const branchMap = {
  "CS-AI": "Computer Science & Artificial Intelligence",
  "CSE": "Computer Science Engineering",
  "IT": "Information Technology",
  "ECE": "Electronics & Communication Engineering",
  "EE": "Electrical Engineering",
  "ME": "Mechanical Engineering",
  "CE": "Civil Engineering",
};
const yearMap = {
  "AKTU-1st-year": "AKTU 1st Year",
  "AKTU-2nd-year": "AKTU 2nd Year",
  "AKTU-3rd-year": "AKTU 3rd Year",
  "AKTU-4th-year": "AKTU 4th Year",
};


export async function generateMetadata({ params }) {
  const { year, branch } = await params;

  const branchName = branchMap[branch] || branch;
const yearName = yearMap[year] || year;



  return {
    title: `${branchName} Notes (${yearName}) | Notiya`,
    description: `Download free ${branchName} handwritten notes, lecture notes, unit-wise notes, and study material for ${yearName}.`,
    keywords: [
      `${branchName} Notes`,
      `${branchName} Study Material`,
      `${branchName} PDF Notes`,
      `${yearName} Notes`,
      "Engineering Notes",
      "B.Tech Notes",
      "AKTU Notes",
      "Notiya",
    ],
    alternates: {
      canonical: `https://notiya.in/btech-study-material/${year}/${branch}/notes`,
    },
    openGraph: {
      title: `${branchName} Notes (${yearName}) `,
      description: `Free ${branchName} notes and study material for ${yearName}.`,
      url: `https://notiya.in/btech-study-material/${year}/${branch}/notes`,
      siteName: "Notiya",
      type: "website",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: `${branchName} Notes`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${branchName} Notes | Notiya`,
      description: `Download free ${branchName} Notes PDF.`,
      images: ["/og-image.png"],
    },
  };
}

export default async function page({ params }) {
  const { year, branch } = await params;

  const branchName = branchMap[branch] || branch;
  const yearName = yearMap[year] || year;

    const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${branchName} Notes (${yearName})`,
    description: `Free ${branchName} notes for ${yearName}.`,
    url: `https://notiya.in/btech-study-material/${year}/${branch}/notes`,
    isPartOf: {
      "@type": "WebSite",
      name: "Notiya",
      url: "https://notiya.in",
    },
    publisher: {
      "@type": "Organization",
      name: "Notiya",
      url: "https://notiya.in",
      logo: {
        "@type": "ImageObject",
        url: "https://notiya.in/logo.svg",
      },
    },
    about: {
      "@type": "Course",
      name: branchName,
    },
    inLanguage: "en",
  };

  return   <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      <NotesClient />
    </>
}