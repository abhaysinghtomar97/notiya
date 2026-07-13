import { qureyyearMap } from "@/components/YearMap";
import ConnectDb from "@/dbConfig/dbConfig";
import Notes from "@/models/Notes";
import Subject from "@/models/Subject";
import mongoose from 'mongoose';

export async function getBranchSubjects(university, course, year, branch = null) {
  await ConnectDb();
  year = qureyyearMap[year];

  // Base query for university, course, and year
  const query = { university, course, year };

  // Dynamic branch matching (matches the specific branch OR subjects marked as "ALL")
  if (branch) {
    const upperBranch = branch.toUpperCase();
    
    // This tells MongoDB: "Find documents where the 'branches' array 
    // contains EITHER the specific branch (e.g., 'CSE') OR 'ALL'"
    query.branches = { $in: [upperBranch, "ALL"] };
  }

  const subjects = await Subject.find(query).lean();
  return subjects;
}

export async function getSubjectData(university, course, year, branch, slug) {
  await ConnectDb();
  year = qureyyearMap[year];

  const query = { university, course, year, slug };

  // Use the same $or logic here so standard branches can access universal subjects
  if (branch) {
   const upperBranch = branch.toUpperCase();
    
    // This tells MongoDB: "Find documents where the 'branches' array 
    // contains EITHER the specific branch (e.g., 'CSE') OR 'ALL'"
    query.branches = { $in: [upperBranch, "ALL"] };
  }

  const subject = await Subject.findOne(query).lean();

  if (!subject) return null;

  const notes = await Notes.findOne({
    subjectId: new mongoose.Types.ObjectId(subject._id),
  }).lean();

  return {
    subject: JSON.parse(JSON.stringify(subject)),
    notes: notes ? JSON.parse(JSON.stringify(notes)) : null,
  };
}