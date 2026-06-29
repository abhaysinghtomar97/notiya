import { qureyyearMap } from "@/components/YearMap";
import ConnectDb from "@/dbConfig/dbConfig";
import Notes from "@/models/Notes";
import Subject from "@/models/Subject";
import mongoose from 'mongoose'

export async function getBranchSubjects(
  university,
  course,
  year,
  branch = null
) {
  await ConnectDb();
  year = qureyyearMap[year];
  if (course === "btech" && year === "1") {
    branch = "all";
  }

  const query = {
    university,
    course,
    year
  };


  // Only B.Tech has branch
  if (branch) {
    query.branch = branch;
  }

  const subjects = await Subject.find(query).lean();

  return subjects;
}


export async function getSubjectData(
  university,
  course,
  year,
  branch,
  slug
) {
  await ConnectDb();

  year = qureyyearMap[year];

  if (course === "btech" && year === "1") {
    branch = "all";
  }

  const query = {
    university,
    course,
    year,
    slug,
  };

  if (branch) {
    query.branch = branch;
  }

  const subject = await Subject.findOne(query).lean();

  if (!subject) {
    return null;
  }

 const notes = await Notes.findOne({
  subjectId: new mongoose.Types.ObjectId(subject._id),
}).lean();

  return {
    subject: JSON.parse(JSON.stringify(subject)),
    notes: notes
      ? JSON.parse(JSON.stringify(notes))
      : null,
  };
}