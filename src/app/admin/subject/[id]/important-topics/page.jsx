import ConnectDb from "@/dbConfig/dbConfig";
import Subject from "@/models/Subject";
import { notFound } from "next/navigation";
import AddImportantTopics from "./AddImportantTopics";

export default async function Page({ params }) {
  const { id } = await params;

  await ConnectDb();

  const subject = await Subject.findById(id).lean();

  if (!subject) {
    notFound();
  }

  return (
    <div className="max-w-5xl mx-auto p-8">

      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Important Topics
        </h1>

        <p className="text-gray-500 mt-2">
          Add and manage important topics for this subject.
        </p>
      </div>

      <AddImportantTopics
        subjectId={id}
        importantTopics={JSON.parse(
          JSON.stringify(subject.importantTopics || [])
        )}
      />

    </div>
  );
}