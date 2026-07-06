import ConnectDb from "@/dbConfig/dbConfig";
import Subject from "@/models/Subject";
import { notFound } from "next/navigation";
import GeneralForm from "./GeneralForm";


export default async function Page({ params }) {
  const { id } = await params;

  await ConnectDb();

  const subject = await Subject.findById(id).lean();

  if (!subject) {
    notFound();
  }

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">
        Edit General Information
      </h1>

      <GeneralForm subject={JSON.parse(JSON.stringify(subject))} />
    </div>
  );
}