import Link from "next/link";
import { getBranchSubjects } from "@/lib/fetchData";
import { qureyyearMap } from "@/components/YearMap";


export default async function SubjectsList({
  university,
  course,
  year,
}) {


  const subjects = await getBranchSubjects(
    university,
    course,
    year
  );
  console.log(subjects)

  if (!subjects || subjects.length === 0) {
    return (
      <div className="w-full max-w-4xl mx-auto p-4 mt-6">
        <p className="text-gray-500 italic">
          No subjects found for this selection.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4 mt-6">
      <h2 className="mb-6 text-2xl font-bold text-gray-800">
        Available Subjects
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {subjects.map((sub) => (
          <Link
            key={sub._id}
            href={`${year}/${sub.slug}`}
            className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow duration-200 hover:shadow-md"
          >
            <p className="font-medium text-gray-700">
              {sub.subjectName}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}