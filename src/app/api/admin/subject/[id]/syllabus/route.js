import { NextResponse } from "next/server";
import ConnectDb from "@/dbConfig/dbConfig";
import Subject from "@/models/Subject";

// ---------------------------------
// GET Syllabus
// ---------------------------------

export async function GET(request, { params }) {
  try {
    const { id } = await params;

    await ConnectDb();

    const subject = await Subject.findById(id).select("syllabus");

    if (!subject) {
      return NextResponse.json(
        {
          success: false,
          message: "Subject not found.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      syllabus: subject.syllabus,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}

// ---------------------------------
// UPDATE Syllabus
// ---------------------------------

export async function PUT(request, { params }) {
  try {
    const { id } = await params;

    await ConnectDb();

    const { syllabus } = await request.json();

    if (!Array.isArray(syllabus)) {
      return NextResponse.json(
        {
          success: false,
          message: "Syllabus must be an array.",
        },
        { status: 400 }
      );
    }

    // Clean & validate data
    const cleanedSyllabus = [];
    const usedUnits = new Set();

    for (const item of syllabus) {

      const unit = Number(item.unit);

      if (usedUnits.has(unit)) {
        continue;
      }

      usedUnits.add(unit);

      const topics = [
        ...new Set(
          (item.topics || [])
            .map(topic => topic.trim())
            .filter(Boolean)
        ),
      ];

      cleanedSyllabus.push({
        unit,
        title: item.title?.trim() || "",
        topics,
      });
    }

    const subject = await Subject.findByIdAndUpdate(
      id,
      {
        $set: {
          syllabus: cleanedSyllabus,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    ).select("syllabus");

    if (!subject) {
      return NextResponse.json(
        {
          success: false,
          message: "Subject not found.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Syllabus updated successfully.",
      syllabus: subject.syllabus,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}