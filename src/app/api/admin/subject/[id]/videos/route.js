import { NextResponse } from "next/server";
import ConnectDb from "@/dbConfig/dbConfig";
import Subject from "@/models/Subject";

// --------------------
// GET Videos
// --------------------

export async function GET(request, { params }) {
  try {
    const { id } = await params;

    await ConnectDb();

    const subject = await Subject.findById(id).select("videos");

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
      videos: subject.videos,
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

// --------------------
// Update Videos
// --------------------

export async function PUT(request, { params }) {
  try {
    const { id } = await params;

    const { videos } = await request.json();

    await ConnectDb();

    if (!Array.isArray(videos)) {
      return NextResponse.json(
        {
          success: false,
          message: "Videos must be an array.",
        },
        { status: 400 }
      );
    }

    // Remove duplicate videos
    const uniqueVideos = [];
    const seen = new Set();

    for (const video of videos) {
      const key = `${video.unit}-${video.title}`
        .trim()
        .toLowerCase();

      if (seen.has(key)) continue;

      seen.add(key);

      uniqueVideos.push({
        title: video.title?.trim(),
        youtubeId: video.youtubeId?.trim(),
        unit: Number(video.unit),
      });
    }

    const subject = await Subject.findByIdAndUpdate(
      id,
      {
        $set: {
          videos: uniqueVideos,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    ).select("videos");

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
      message: "Videos updated successfully.",
      videos: subject.videos,
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