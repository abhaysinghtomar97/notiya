import Subject from "@/models/Subject";
import Notes from "@/models/Notes";

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

  if (!subject) return null;

  const notes = await Notes.findOne({
    subjectId: subject._id,
  }).lean();

  return {
    subject,
    notes,
  };
}