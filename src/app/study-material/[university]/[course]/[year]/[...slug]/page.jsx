
import { notFound } from "next/navigation";
import SubjectPage from "../../../../../../components/layout/SubjectPage";
import { getPageType } from "./lib/getPageType";
import axios from "axios";
import BranchPage from "../../../../../../components/layout/BranchPage";

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
    return <div><BranchPage university={university} year={year} course={course} branch={slug[0]} /></div>
  }

  return <SubjectPage params={params} />;
}