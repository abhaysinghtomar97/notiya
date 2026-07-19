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
      branches, // Array from your frontend (e.g. ["CSE", "ECE"]) or empty array [] for BCA/BBA
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
    if (!university || !course || !year || !subjectCode || !subjectName) {
      return NextResponse.json(
        { success: false, message: "Required fields are missing." },
        { status: 400 }
      );
    }

    // Generate slug cleanly
    const slug = slugify(subjectName, { lower: true, strict: true, trim: true });

    // --- HYBRID PATH GENERATION LOGIC ---
    let path = "";
    const cleanCourse = course.toLowerCase().trim();
    const cleanUni = university.toLowerCase().trim();
    const cleanYear = year.toLowerCase().trim();

    if (branches && branches.length > 0) {
      // B.Tech multi-branch tracking: Save primary branch into path for uniqueness constraint
      const primaryBranch = branches[0].toLowerCase().trim();
      path = `${cleanUni}/${cleanCourse}/${cleanYear}/${primaryBranch}/${slug}`;
    } else {
      // BCA/BBA non-branch tracking
      path = `${cleanUni}/${cleanCourse}/${cleanYear}/${slug}`;
    }
    // -------------------------------------

    // Prevent duplicate subjects safely using the new path logic
    const existingSubject = await Subject.findOne({ path });

    if (existingSubject) {
      return NextResponse.json(
        {
          success: false,
          message: "Subject path variant already exists in the system.",
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
      branches: branches || [], 
      subjectCode,
      subjectName,
      slug,
      path, // Stored safely for dependency systems
      description,
      importantTopics: importantTopics || [],
      seo: seo || { keywords: [] },
      syllabus: syllabus || [],
      books: books || [],
      videos: videos || [],
      faqs: faqs || [],
      isPublished: isPublished ?? true,
    });

    return NextResponse.json(
      { success: true, message: "Subject created successfully.", subject },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating subject:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}