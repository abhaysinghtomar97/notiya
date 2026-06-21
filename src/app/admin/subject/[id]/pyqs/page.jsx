import ConnectDb from "@/dbConfig/dbConfig";
import Notes from "@/models/Notes";
import { notFound } from "next/navigation";
import AddPyq from "./AddPyq";

export default async function Page({ params }) {
  const { id } = await params;

  await ConnectDb();

  let notes = await Notes.findOne({
    subjectId: id,
  }).lean();

  // Create an empty Notes document if it doesn't exist
  if (!notes) {
    notes = await Notes.create({
      subjectId: id,
      units: [],
      pyqs: [],
    });

    notes = notes.toObject();
  }

  return (
    <div className="max-w-5xl mx-auto p-8">

      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Previous Year Questions
        </h1>

        <p className="text-gray-500 mt-2">
          Add and manage Previous Year Question papers for this subject.
        </p>
      </div>

      <AddPyq
        subjectId={id}
        pyqs={JSON.parse(JSON.stringify(notes.pyqs))}
      />

    </div>
  );
}