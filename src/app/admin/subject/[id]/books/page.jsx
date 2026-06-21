
import ConnectDb from "@/dbConfig/dbConfig";
import Subject from "@/models/Subject";
import { notFound } from "next/navigation";
import AddBook from "./AddBook";

export default async function Page({ params }) {
  const { id } = await params;

  await ConnectDb();

  const subject = await Subject.findById(id).lean();

  if (!subject) notFound();

  return (
    <div className="max-w-5xl mx-auto p-8">

      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Recommended Books
        </h1>

        <p className="text-gray-500 mt-2">
          Add or manage books recommended for this subject.
        </p>
      </div>

      <AddBook
        subjectId={id}
        books={JSON.parse(JSON.stringify(subject.books))}
      />

    </div>
  );
}

