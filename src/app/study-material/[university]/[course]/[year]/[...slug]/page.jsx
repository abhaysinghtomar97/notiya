
import { notFound } from "next/navigation";
import SubjectPage from "./SubjectPage";
import { getPageType } from "./lib/getPageType";
import BranchPage from "../../../../../../components/layout/BranchPage";
import Breadcrumb from "@/components/ui/Breadcrumb";

import { getSubjectData } from "@/lib/fetchData";


const SITE_URL = "https://www.notiya.in";

function cleanText(value) {
  return typeof value === "string"
    ? value.replace(/\s+/g, " ").trim()
    : "";
}

function absoluteUrl(path) {
  return `${SITE_URL}/${path.replace(/^\/+|\/+$/g, "")}`;
}

export async function generateMetadata({ params }) {
  const { university, course, year, slug } = await params;

  const page = getPageType(course, slug);

  if (!page) {
    return {
      title: "Page Not Found | Notiya",
      robots: {
        index: false,
        follow: true,
      },
    };
  }

  // Branch and other non-subject pages
  // Keep their metadata logic separate from subject metadata.
  if (page.type !== "subject") {
    return {
      title: `${course.toUpperCase()} Study Material | Notiya`,
      description:
        `Explore study materials and academic resources for ${course.toUpperCase()} students on Notiya.`,
    };
  }

  // Resolve subject route parameters
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
    return {
      title: "Subject Not Found | Notiya",
      robots: {
        index: false,
        follow: true,
      },
    };
  }

  const subject = data.subject;
  const subjectName = cleanText(subject.subjectName);

  const description = cleanText(subject.description);

  const courseLabel = course
    .replace(/-/g, " ")
    .toUpperCase();

  const yearLabel = year.replace(/-/g, " ");

  const title =
    cleanText(subject.seo?.metaTitle) ||
    `${subjectName} Notes, PYQs & Videos | Notiya`;

  const metaDescription =
    cleanText(subject.seo?.metaDescription) ||
    (description
      ? `${description} Explore available notes, previous-year questions and video lectures on Notiya.`
      : `Explore available study notes, previous-year questions and video lectures for ${subjectName}, ${courseLabel}, ${yearLabel} on Notiya.`);

  const canonicalPath = branch
    ? `/study-material/${university}/${course}/${year}/${branch}/${subject.slug || subjectSlug}`
    : `/study-material/${university}/${course}/${year}/${subject.slug || subjectSlug}`;

  return {
    title,
    description: metaDescription.slice(0, 160),

    alternates: {
      canonical: absoluteUrl(canonicalPath),
    },

    robots: {
      index: subject.isPublished === true,
      follow: true,
      googleBot: {
        index: subject.isPublished === true,
        follow: true,
      },
    },

    openGraph: {
      type: "website",
      siteName: "Notiya",
      title,
      description: metaDescription.slice(0, 200),
      url: absoluteUrl(canonicalPath),
    },

    twitter: {
      card: "summary",
      title,
      description: metaDescription.slice(0, 200),
    },
  };
}


export default async function Page({ params }) {
  const { university, year, course, slug } = await params;


  const page = getPageType(course, slug);

  if (!page) {
    notFound();
  }

  if (page.type === "branch") {
    return <div className="p-5">

      


      <BranchPage university={university} year={year} course={course} branch={slug[0]} /></div>
  }

  return <div className="p-5">
    <Breadcrumb
      items={[
        {
          label: "Universities",
          href: "/study-material",
        },
        {
          label: university.toUpperCase(),
          href: `/study-material/${university}`,
        },
        {
          label: course.toUpperCase(),
          href: `/study-material/${university}/${course}`,
        },
        {
          label: year.toUpperCase(),
          href: `/study-material/${university}/${course}/${year}`,
        }
      ]}
    />

    <SubjectPage params={params} />
  
  </div>;
}