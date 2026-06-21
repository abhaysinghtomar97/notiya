import ConnectDb from "@/dbConfig/dbConfig";
import Notes from "@/models/Notes";
import Subject from "@/models/Subject";
import { notFound } from "next/navigation";
import Link from "next/link";
import AddUnit from "./AddUnit";

export default async function Page({ params }) {
  const { id } = await params;

  await ConnectDb();

  const subject = await Subject.findById(id).lean();

  if (!subject) notFound();

  let notes = await Notes.findOne({ subjectId: id }).lean();

  if (!notes) {
    notes = {
      units: [],
      pyqs: [],
    };
  }

  return (
    <div className="max-w-6xl mx-auto p-8">

      <h1 className="text-3xl font-bold">
        {subject.subjectName}
      </h1>

      <p className="text-gray-500 mb-8">
        Manage Notes
      </p>

      <AddUnit subjectId={id} />

      <div className="mt-10 space-y-6">

        {notes.units.length === 0 && (
          <p>No Units Added Yet</p>
        )}

        {notes.units.map((unit) => (

          <div
            key={unit._id}
            className="border rounded-xl p-5"
          >

            <div className="flex justify-between">

              <div>

                <h2 className="font-bold text-xl">
                  Unit {unit.unit}
                </h2>

                <p>{unit.title}</p>

              </div>

              <Link
                href={`/admin/subject/${id}/notes/${unit._id}`}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Manage
              </Link>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}