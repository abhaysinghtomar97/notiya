import { NextResponse } from "next/server";
import ConnectDb from "@/dbConfig/dbConfig";
import Subject from "@/models/Subject";

// ---------------------------------
// GET Important Topics
// ---------------------------------

export async function GET(request, { params }) {
  try {
    const { id } = await params;

    await ConnectDb();

    const subject = await Subject.findById(id).select("importantTopics");

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
      importantTopics: subject.importantTopics,
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
// UPDATE Important Topics
// ---------------------------------

export async function PUT(request, { params }) {
  try {
    const { id } = await params;

    await ConnectDb();

    const { importantTopics } = await request.json();

    if (!Array.isArray(importantTopics)) {
      return NextResponse.json(
        {
          success: false,
          message: "Important topics must be an array.",
        },
        { status: 400 }
      );
    }

    // Remove duplicates & empty values
    const cleanedTopics = [
      ...new Set(
        importantTopics
          .map((topic) => topic.trim())
          .filter(Boolean)
      ),
    ];

    const subject = await Subject.findByIdAndUpdate(
      id,
      {
        $set: {
          importantTopics: cleanedTopics,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    ).select("importantTopics");

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
      message: "Important topics updated successfully.",
      importantTopics: subject.importantTopics,
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