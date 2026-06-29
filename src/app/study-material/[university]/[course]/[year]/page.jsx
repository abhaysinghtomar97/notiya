
import Link from "next/link";
import Breadcrumb from "../../../../../components/ui/Breadcrumb";
import BranchList from "./BranchList";
import SubjectsList from "./SubjectsList";


async function Page({ params }) {
  const { university, course, year } = await params;

  const isBTech = course === "btech";
  const isGeneralCourse = ["bca", "bba"].includes(course);

  return (
    <div>
      
      {isBTech && (
        <>
          
          
         <BranchList year={year} university={university} course={course}/>
        </>
      )}

      {isGeneralCourse && (
        <>
          
          <SubjectsList university={university} course={course} year={year} />
        </>
      )}
    </div>
  );
}

export default Page;