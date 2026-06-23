
import Subject from "@/models/Subject";
import Notes from "@/models/Notes";
import ConnectDb from "@/dbConfig/dbConfig";

const BASE_URL = "https://notiya.in";

export default async function sitemap() {
  await ConnectDb();

  const lastModified = new Date();

  const urls = [];
  const added = new Set();

  const addUrl = (path) => {
    const url = `${BASE_URL}${path}`;

    if (!added.has(url)) {
      added.add(url);

      urls.push({
        url,
        lastModified,
      });
    }
  };

  // Home
  addUrl("");

  // Study Material Home
  addUrl("/study-material");

  // Fetch once
  const [subjects, notes] = await Promise.all([
    Subject.find({ isPublished: true }).lean(),
    Notes.find().lean(),
  ]);

  // subjectId -> Notes
  const notesMap = new Map();

  notes.forEach((note) => {
    notesMap.set(note.subjectId.toString(), note);
  });

  for (const subject of subjects) {
    const university = subject.university?.trim().toLowerCase();
    const course = subject.course?.trim().toLowerCase();
    const branch = subject.branch?.trim().toLowerCase();
    const slug = subject.slug?.trim();

    if (!university || !course || !subject.year) continue;

    // Convert year number to slug
    const yearMap = {
      "1": "1st-year",
      "2": "2nd-year",
      "3": "3rd-year",
      "4": "4th-year",
    };

    const year = yearMap[String(subject.year)];

    if (!year) continue;

    //--------------------------------
    // University
    //--------------------------------

    addUrl(`/study-material/${university}`);

    //--------------------------------
    // Course
    //--------------------------------

    addUrl(`/study-material/${university}/${course}`);

    //--------------------------------
    // Year
    //--------------------------------

    addUrl(`/study-material/${university}/${course}/${year}`);

    //--------------------------------
    // Branch
    //--------------------------------

    let branchPath = `/study-material/${university}/${course}/${year}`;

    if (branch && branch !== "all") {
      branchPath += `/${branch}`;

      addUrl(branchPath);
    }

    //--------------------------------
    // Subject
    //--------------------------------

    if (!slug) continue;

    const subjectPath =
      branch === "all"
        ? `${BASE_URL}/study-material/${university}/${course}/${year}/${slug}`
        : `${BASE_URL}${branchPath}/${slug}`;

    if (!added.has(subjectPath)) {
      urls.push({
        url: subjectPath,
        lastModified,
      });

      added.add(subjectPath);
    }

    //--------------------------------
    // Subject Schema Pages
    //--------------------------------

    if (subject.syllabus?.length) {
      addUrl(
        subjectPath.replace(BASE_URL, "") + "/syllabus"
      );
    }

    if (subject.books?.length) {
      addUrl(
        subjectPath.replace(BASE_URL, "") + "/books"
      );
    }

    if (subject.videos?.length) {
      addUrl(
        subjectPath.replace(BASE_URL, "") + "/videos"
      );
    }

    //--------------------------------
    // Notes Schema Pages
    //--------------------------------

    const note = notesMap.get(subject._id.toString());

    if (!note) continue;

    if (note.units?.length) {
      addUrl(
        subjectPath.replace(BASE_URL, "") + "/notes"
      );
    }

    if (note.pyqs?.length) {
      addUrl(
        subjectPath.replace(BASE_URL, "") + "/pyq"
      );
    }
  }

  return urls;
}