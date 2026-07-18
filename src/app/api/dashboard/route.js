import { NextResponse } from "next/server";
import Subject from "@/models/Subject";
import Notes from "@/models/Notes"; // Ensure models are registered
import ConnectDb from "@/dbConfig/dbConfig";

export async function GET(req) {
  try {
    await ConnectDb();

    // Use MongoDB Aggregation to join Subjects with Notes and calculate statuses
    const pipeline = [
      {
        $lookup: {
          from: "notes", // Mongoose pluralizes model names by default 
          localField: "_id",
          foreignField: "subjectId",
          as: "notesData",
        },
      },
      {
        $unwind: {
          path: "$notesData",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $addFields: {
          hasSyllabus: { $gt: [{ $size: { $ifNull: ["$syllabus", []] } }, 0] },
          hasPyqs: { $gt: [{ $size: { $ifNull: ["$notesData.pyqs", []] } }, 0] },
          unitsUploaded: { $size: { $ifNull: ["$notesData.units", []] } },
          hasNotes: { $gt: [{ $size: { $ifNull: ["$notesData.units", []] } }, 0] },
        },
      },
      {
        $addFields: {
          status: {
            $switch: {
              branches: [
                {
                  case: { $and: ["$hasSyllabus", "$hasPyqs", "$hasNotes"] },
                  then: "Complete",
                },
                {
                  case: { $or: ["$hasSyllabus", "$hasPyqs", "$hasNotes"] },
                  then: "Partial",
                },
              ],
              default: "Missing",
            },
          },
        },
      },
    ];

    const subjects = await Subject.aggregate(pipeline);

    // Calculate Summary Stats dynamically
    const stats = {
      totalSubjects: subjects.length,
      complete: subjects.filter((s) => s.status === "Complete").length,
      partial: subjects.filter((s) => s.status === "Partial").length,
      missing: subjects.filter((s) => s.status === "Missing").length,
      withNotes: subjects.filter((s) => s.hasNotes).length,
      withPyqs: subjects.filter((s) => s.hasPyqs).length,
      universities: [...new Set(subjects.map((s) => s.university))].length,
      courses: [...new Set(subjects.map((s) => s.course))].length,
    };

    return NextResponse.json({ subjects, stats });
  } catch (error) {
    console.error("Dashboard Aggregation Error:", error);
    return NextResponse.json({ error: "Failed to fetch dashboard data" }, { status: 500 });
  }
}