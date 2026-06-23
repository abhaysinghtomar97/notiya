import ConnectDb from "@/dbConfig/dbConfig";
import Subject from "@/models/Subject";

const BASE_URL = "https://notiya.in";

const yearMap = {
  "1": "1st-year",
  "2": "2nd-year",
  "3": "3rd-year",
  "4": "4th-year",
};

export default async function sitemap() {
  await ConnectDb();

  const lastModified = new Date();

  const urls = [];
  const added = new Set();

  const addUrl = (path, priority = 0.7) => {
    const url = `${BASE_URL}${path}`;

    if (added.has(url)) return;

    added.add(url);

    urls.push({
      url,
      lastModified,
      changeFrequency: "weekly",
      priority,
    });
  };

  // Static Pages
  addUrl("", 1);
  addUrl("/study-material", 0.95);

  // Fetch only published subjects
  const subjects = await Subject.find(
    { isPublished: true },
    {
      university: 1,
      course: 1,
      year: 1,
      branch: 1,
      slug: 1,
    }
  ).lean();

  for (const subject of subjects) {
    const university = subject.university?.trim().toLowerCase();
    const course = subject.course?.trim().toLowerCase();
    const year = yearMap[String(subject.year)];
    const branch = subject.branch?.trim().toLowerCase();
    const slug = subject.slug?.trim().toLowerCase();

    if (!university || !course || !year) continue;

    // University
    addUrl(`/study-material/${university}`, 0.9);

    // Course
    addUrl(`/study-material/${university}/${course}`, 0.85);

    // Year
    addUrl(`/study-material/${university}/${course}/${year}`, 0.8);

    let parentPath = `/study-material/${university}/${course}/${year}`;

    // Branch (Skip if "all" or empty)
    if (branch && branch !== "all") {
      parentPath += `/${branch}`;
      addUrl(parentPath, 0.75);
    }

    // Subject
    if (slug) {
      addUrl(`${parentPath}/${slug}`, 0.7);
    }
  }

  return urls;
}