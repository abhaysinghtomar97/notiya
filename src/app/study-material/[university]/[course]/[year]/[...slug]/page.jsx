
import { notFound } from "next/navigation";
import SubjectPage from "./SubjectPage";
import { getPageType } from "./lib/getPageType";
import BranchPage from "../../../../../../components/layout/BranchPage";
import Breadcrumb from "@/components/ui/Breadcrumb";

export async function generateMetadata({ params }) {
  const { university, course, year, slug } = await params;

  return {
    title: slug.join(" | "),
    description: `${course} ${year} study material for ${university}`,
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