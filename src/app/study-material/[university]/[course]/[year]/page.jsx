
import Link from "next/link";
import Breadcrumb from "../../../../../components/Breadcrumb";
import BranchList from "./BranchList";
import SubjectsList from "./SubjectsList";


async function Page({ params }) {
  const { university, course, year } = await params;

  const isBTech = course === "btech";
  const isGeneralCourse = ["bca", "bba"].includes(course);

  return (
    <div>
       <div className="mb-3 text-sm text-muted-foreground flex items-center">
                <Link href={'/'} className="hover:text-primary transition-colors">Home</Link>
                <span className="mx-2">›</span> 
                <Link href={'/universities'} className="hover:text-primary transition-colors">Universities</Link>
                <span className="mx-2">›</span> 
                <span className="text-foreground font-medium">{university}</span>
                <span className="mx-2">›</span> 
                <span className="text-foreground font-medium">{course}</span>
                <span className="mx-2">›</span> 
                <span className="text-foreground font-medium">{year}</span>
              </div>
      {isBTech && (
        <>
          
          <h1>Select Branch</h1>
         <BranchList year={year}/>
        </>
      )}

      {isGeneralCourse && (
        <>
          {/* Subjects Page */}
          <h1>{course.toUpperCase()} Subjects</h1>
          <SubjectsList university={university} course={course} year={year} />
        </>
      )}
    </div>
  );
}

export default Page;