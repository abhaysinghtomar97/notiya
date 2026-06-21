import ConnectDb from "@/dbConfig/dbConfig";
import Subject from "@/models/Subject";
import { notFound } from "next/navigation";
import AddSyllabus from "./AddSyllabus";

export default async function Page({ params }) {
  const { id } = await params;

  await ConnectDb();

  const subject = await Subject.findById(id).lean();

  if (!subject) notFound();

  return (
    <div className="max-w-6xl mx-auto p-8">

      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Subject Syllabus
        </h1>

        <p className="text-gray-500 mt-2">
          Manage units and topics for this subject.
        </p>
      </div>

      <AddSyllabus
        subjectId={id}
        syllabus={JSON.parse(JSON.stringify(subject.syllabus))}
      />

    </div>
  );
}