import { NextResponse } from "next/server";

import slugify from "slugify";

import ConnectDb from "@/dbConfig/dbConfig";
import Subject from "@/models/Subject";

export async function POST(request) {
  try {
    await ConnectDb();

    const body = await request.json();
    
    const {
      university,
      course,
      year,
      semester,
      branch,
      subjectCode,
      subjectName,
      description,
      importantTopics,
      seo,
      syllabus,
      books,
      videos,
      faqs,
      isPublished,
    } = body;

    // Validation
    if (
      !university ||
      !course ||
      !year ||
      !subjectCode ||
      !subjectName
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Required fields are missing.",
        },
        { status: 400 }
      );
    }

    // Generate slug
    const slug = slugify(subjectName, {
      lower: true,
      strict: true,
      trim: true,
    });

    // Generate path
    let path = "";

    if (course === "btech") {
      path = `${university}/${course}/${year}/${branch}/${slug}`;
    } else {
      path = `${university}/${course}/${year}/${slug}`;
    }

    // Prevent duplicate subjects
    const existingSubject = await Subject.findOne({
      university,
      course,
      year,
      branch,
      slug,
    });

    if (existingSubject) {
      return NextResponse.json(
        {
          success: false,
          message: "Subject already exists.",
        },
        { status: 409 }
      );
    }

    const subject = await Subject.create({
      university,
      course,
      year,
      semester,

      branch:
        course === "btech"
          ? branch
          : null,

      subjectCode,
      subjectName,

      slug,
      path,

      description,

      importantTopics:
        importantTopics || [],

      seo: seo || {
        keywords: [],
      },

      syllabus: syllabus || [],
      books: books || [],
      videos: videos || [],
      faqs: faqs || [],

      isPublished:
        isPublished ?? true,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Subject created successfully.",
        subject,
      },
      { status: 201 }
    );
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

export async function PUT(request, { params }) {
  const { id } = await params;

  await ConnectDb();

  const body = await request.json();

  body.slug = slugify(body.subjectName, {
    lower: true,
    strict: true,
  });

  body.path =
    body.course === "btech"
      ? `${body.university}/${body.course}/${body.year}/${body.branch}/${body.slug}`
      : `${body.university}/${body.course}/${body.year}/${body.slug}`;

  const updated = await Subject.findByIdAndUpdate(
    id,
    body,
    {
      new: true,
      runValidators: true,
    }
  );

  return NextResponse.json({
    success: true,
    subject: updated,
  });
}