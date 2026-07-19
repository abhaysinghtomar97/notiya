import { NextResponse } from "next/server";
import ConnectDb from "@/dbConfig/dbConfig";
import Subject from "@/models/Subject";
import mongoose from "mongoose";
import { pathYear } from "@/components/YearMap";

export const dynamic = "force-dynamic"; // Prevents Next.js from caching this route

export async function GET(request) {
  try {
    // 1. Establish database connection using internal architecture
    await ConnectDb();
    
    // 2. Fetch all subjects
    const subjects = await Subject.find({});
    let mutations = 0;
    const updateLogs = [];

    // 3. Process records systematically
    for (const subject of subjects) {
      let correctedPath = "";
      const uni = subject.university.toLowerCase().trim();
      const crs = subject.course.toLowerCase().trim();
      var yr = subject.year.toLowerCase().trim();
      const slg = subject.slug.toLowerCase().trim();

      yr = pathYear[yr] // Normalize year using mapping
      if (subject.branches && subject.branches.length > 0) {
        // Multi-branch fallback using primary position array assignment
        const primaryBranch = subject.branches[0].toLowerCase().trim();
        correctedPath = `${uni}/${crs}/${yr}/${primaryBranch}/${slg}`;
      } else {
        // Standard structural mapping (BCA, BBA, etc.)
        correctedPath = `${uni}/${crs}/${yr}/${slg}`;
      }

      // Update only if values have drifted
      if (subject.path !== correctedPath) {
        const oldPath = subject.path;
        subject.path = correctedPath;
        await subject.save();
        
        mutations++;
        updateLogs.push({
          subjectName: subject.subjectName,
          oldPath: oldPath,
          newPath: correctedPath
        });
      }
    }

    // 4. Return clear diagnostics directly to browser viewport
    return NextResponse.json({
      success: true,
      message: "Database sanitization run executed successfully.",
      totalRecordsProcessed: subjects.length,
      totalMutationsApplied: mutations,
      updates: updateLogs
    }, { status: 200 });

  } catch (error) {
    console.error("Migration Route Error:", error);
    return NextResponse.json({
      success: false,
      message: "Internal operational failure during database migration.",
      error: error.message
    }, { status: 500 });
  }
}