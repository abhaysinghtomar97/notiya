import { qureyyearMap } from "@/components/YearMap";
import ConnectDb from "@/dbConfig/dbConfig";
import Notes from "@/models/Notes";
import Subject from "@/models/Subject";

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

export async function getSubjectNotes(
  university,
  course,
  year,
  branch,
  slug
) {
  year = qureyyearMap[year]
  await ConnectDb();

  const query = {
    university,
    course,
    year,
    slug,
  };
  if (course === "btech" && year === "1") {
    branch = "all";
  }
  if (branch) {
    query.branch = branch;
  }


  const subject = await Subject.findOne(query).lean();


  const notes = await Notes.findOne({
    subjectId: subject._id,
  }).lean();

  return notes;

}