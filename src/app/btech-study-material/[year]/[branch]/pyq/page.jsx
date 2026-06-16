import PyqClient from "./PyqClient";

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
    title: `${branchName} Previous Year Question Papers | Notiya`,
    description: `Download ${branchName} previous year question papers for ${yearName}.`,
  };
}

export default async function page({ params }) {
  const { year, branch } = await params;

  const branchName = branchMap[branch] || branch;
  const yearName = yearMap[year] || year;


  const jsonLd = {

  "@context": "https://schema.org",
  "@type": "CollectionPage",
   "@id": `https://notiya.in/btech-study-material/${year}/${branch}/pyq`,

  name: `${branchName} Previous Year Question Papers (${yearName})`,
  description: `Download previous year question papers and solved papers for ${branchName}.`,
  url: `https://notiya.in/btech-study-material/${year}/${branch}/pyq`,
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
  name: `${branchName} (${yearName})`,
},
 mainEntity: {
    "@type": "ItemList",
    name: `${branchName} Previous Year Question Papers`,
  },
  inLanguage: "en",
};


  const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://notiya.in",
      
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "B.Tech Study Material",
      item: "https://notiya.in/btech-study-material",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: yearName,
      item: `https://notiya.in/btech-study-material/${year}`,
    },
    {
      "@type": "ListItem",
      position: 4,
      name: branchName,
      item: `https://notiya.in/btech-study-material/${year}/${branch}`,
    },
    {
      "@type": "ListItem",
      position: 5,
      name: "PYQs",
      item: `https://notiya.in/btech-study-material/${year}/${branch}/pyq`,
      
    },
  ],
};



  return <>
  <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(jsonLd),
  }}

/>


  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
  />

<PyqClient />
  
  </>;
}