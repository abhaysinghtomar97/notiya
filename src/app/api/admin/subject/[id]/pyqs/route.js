import { NextResponse } from "next/server";
import ConnectDb from "@/dbConfig/dbConfig";
import Notes from "@/models/Notes";

// ---------------------------------
// GET PYQs
// ---------------------------------

export async function GET(request, { params }) {
  try {
    const { id } = await params;

    await ConnectDb();

    const notes = await Notes.findOne({
      subjectId: id,
    }).select("pyqs");

    if (!notes) {
      return NextResponse.json({
        success: true,
        pyqs: [],
      });
    }

    return NextResponse.json({
      success: true,
      pyqs: notes.pyqs,
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
// UPDATE PYQs
// ---------------------------------

export async function PUT(request, { params }) {
  try {
    const { id } = await params;

    await ConnectDb();

    const { pyqs } = await request.json();

    if (!Array.isArray(pyqs)) {
      return NextResponse.json(
        {
          success: false,
          message: "PYQs must be an array.",
        },
        { status: 400 }
      );
    }

    // Remove duplicates by Drive ID
    const uniquePyqs = [];
    const seen = new Set();

    for (const pyq of pyqs) {
      const driveId = pyq.driveId?.trim();

      if (!driveId || seen.has(driveId)) continue;

      seen.add(driveId);

      uniquePyqs.push({
        title: pyq.title?.trim(),
        driveId,
      });
    }

    // If Notes document doesn't exist, create it
    let notes = await Notes.findOne({
      subjectId: id,
    });

    if (!notes) {
      notes = await Notes.create({
        subjectId: id,
        units: [],
        pyqs: uniquePyqs,
      });
    } else {
      notes.pyqs = uniquePyqs;
      await notes.save();
    }

    return NextResponse.json({
      success: true,
      message: "PYQs updated successfully.",
      pyqs: notes.pyqs,
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