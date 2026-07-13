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
      branches, // Changed from branch to branches
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
    
    console.log("Received body:", body);

    // Validation
    if (
      !university ||
      !course ||
      !year ||
      !subjectCode ||
      !subjectName ||
      !branches // Ensure branches array is provided
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

    // Generate path (Universally removed the branch since subjects are now multi-branch)
    const path = `${university}/${course}/${year}/${slug}`;

    // Prevent duplicate subjects
    // Removed 'branch' from this check so it accurately finds if this subject already exists in this year
    const existingSubject = await Subject.findOne({
      university,
      course,
      year,
      slug, 
    });

    if (existingSubject) {
      return NextResponse.json(
        {
          success: false,
          message: "Subject already exists in this course and year.",
        },
        { status: 409 }
      );
    }

    // Create Subject
    const subject = await Subject.create({
      university,
      course,
      year,
      semester,
      branches, // Directly save the array we formatted on the frontend
      subjectCode,
      subjectName,
      slug,
      path,
      description,
      importantTopics: importantTopics || [],
      seo: seo || {
        keywords: [],
      },
      syllabus: syllabus || [],
      books: books || [],
      videos: videos || [],
      faqs: faqs || [],
      isPublished: isPublished ?? true,
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
    console.error("Error creating subject:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}