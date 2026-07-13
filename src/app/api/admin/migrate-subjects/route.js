import { NextResponse } from "next/server";
import ConnectDb from "@/dbConfig/dbConfig";
import Subject from "@/models/Subject";

export async function GET() {
  try {
    await ConnectDb();

    // Access the raw MongoDB collection directly (Bypasses Mongoose completely)
    const collection = Subject.collection;

    // Find all raw documents that still have the old 'branch' field
    const oldSubjects = await collection.find({ branch: { $exists: true } }).toArray();

    if (oldSubjects.length === 0) {
      return NextResponse.json({ message: "No subjects found needing migration." });
    }

    let updatedCount = 0;

    for (let subject of oldSubjects) {
      // 1. Determine the correct array value
      let newBranchesArray = ["ALL"]; // Default to ALL for nulls/BCA
      
      if (subject.branch && typeof subject.branch === 'string') {
        newBranchesArray = [subject.branch.trim().toUpperCase()];
      }

      // 2. FORCE the update directly in the database using $set and $unset
      await collection.updateOne(
        { _id: subject._id },
        {
          $set: { branches: newBranchesArray }, // Creates the new array
          $unset: { branch: "" }                // Destroys the old string field forever
        }
      );

      updatedCount++;
    }

    return NextResponse.json({ 
      message: "HARD MIGRATION SUCCESSFUL! Check Atlas now.",
      subjectsUpdated: updatedCount 
    });

  } catch (error) {
    console.error("Migration error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}