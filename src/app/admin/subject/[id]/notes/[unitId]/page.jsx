import ConnectDb from "@/dbConfig/dbConfig";
import Notes from "@/models/Notes";
import AddResources from "./AddResources";
import { notFound } from "next/navigation";

export default async function Page({ params }) {

    const { id, unitId } = await params;

    await ConnectDb();

    const notes = await Notes.findOne({
        subjectId: id
    }).lean();

    if (!notes) notFound();

    const unit = notes.units.find(
        (u) => u._id.toString() === unitId
    );

    if (!unit) notFound();

    return (
        <div className="max-w-5xl mx-auto p-8">

            <h1 className="text-3xl font-bold">
                Unit {unit.unit}
            </h1>

            <p className="mb-8 text-gray-500">
                {unit.title}
            </p>

            <AddResources
                subjectId={id}
                unitId={unitId}
            />

            <div className="mt-10 space-y-4 ">

                {unit.resources.map((resource) => (

                    <div
                        key={resource._id}
                        className="bg-main border rounded-xl p-5 flex justify-between"
                    >

                        <div>

                            <h2 className="font-semibold">
                                {resource.title}
                            </h2>

                            <p className="text-sm text-gray-500">
                                {resource.type}
                            </p>

                        </div>

                        <a
                            href={`https://drive.google.com/file/d/${resource.driveId}/view`}
                            target="_blank"
                            className="text-blue-600"
                        >
                            View
                        </a>

                    </div>

                ))}

            </div>

        </div>
    );
}