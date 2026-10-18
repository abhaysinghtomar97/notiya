
import ConnectDb from "@/dbConfig/dbConfig";
import Subject from "@/models/Subject";
import Update from "@/models/Update";

const BASE_URL = "https://www.notiya.in";

const yearMap = {
  "1": "1st-year",
  "2": "2nd-year",
  "3": "3rd-year",
  "4": "4th-year",
};

const formatUrlSegment = (str) => {
  if (!str) return "";

  return encodeURIComponent(
    String(str)
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")
  );
};

export default async function sitemap() {
  const urls = [];
  const added = new Set();

  const addUrl = (
    path,
    priority = 0.7,
    changeFrequency = "weekly",
    lastModified = new Date()
  ) => {
    const url = `${BASE_URL}${path}`;

    if (added.has(url)) return;

    added.add(url);

    urls.push({
      url,
      lastModified,
      changeFrequency,
      priority,
    });
  };

  // Existing static routes + Notiya Updates
  const addStaticRoutes = () => {
    addUrl("/", 1.0);
    addUrl("/study-material", 0.95);

    addUrl(
      "/AKTU-Syllabus/1st-Year-AKTU-Syllabus",
      0.9
    );

    addUrl("/PSIT-Syllabus/btech", 0.9);

    addUrl(
      "/PSIT-Syllabus/btech/1st-Year-PSIT-Syllabus",
      0.85
    );

    addUrl("/CSJMU-Syllabus", 0.9);
    addUrl("/CSJMU-Syllabus/BCA", 0.85);
    addUrl("/CSJMU-Syllabus/BBA", 0.85);

    // New Updates routes
    addUrl("/updates", 0.8, "daily");
  };

  addStaticRoutes();

  try {
    await ConnectDb();

    // Existing published subject pages
    const subjects = await Subject.find(
      { isPublished: true },
      {
        university: 1,
        course: 1,
        year: 1,
        branches: 1,
        slug: 1,
      }
    ).lean();

    for (const subject of subjects) {
      const university = formatUrlSegment(
        subject.university
      );

      const course = formatUrlSegment(
        subject.course
      );

      const year =
        yearMap[String(subject.year)] || "";

      const branches = Array.isArray(subject.branches)
        ? subject.branches
        : [];

      const slug = formatUrlSegment(subject.slug);

      if (!university || !course || !year) {
        continue;
      }

      addUrl(
        `/study-material/${university}`,
        0.9
      );

      addUrl(
        `/study-material/${university}/${course}`,
        0.85
      );

      const yearPath =
        `/study-material/${university}/${course}/${year}`;

      addUrl(yearPath, 0.8);

      const normalizedCourse = String(
        subject.course || ""
      )
        .trim()
        .toLowerCase();

      if (
        normalizedCourse === "bca" ||
        normalizedCourse === "bba"
      ) {
        if (slug) {
          addUrl(
            `${yearPath}/${slug}`,
            0.7
          );
        }

        continue;
      }

      const hasAllBranch = branches.some(
        (branch) =>
          String(branch || "")
            .trim()
            .toUpperCase() === "ALL"
      );

      if (hasAllBranch) {
        continue;
      }

      for (const branchName of branches) {
        const branch = formatUrlSegment(branchName);

        if (!branch) continue;

        const branchPath = `${yearPath}/${branch}`;

        addUrl(branchPath, 0.75);

        if (slug) {
          addUrl(
            `${branchPath}/${slug}`,
            0.7
          );
        }
      }
    }

    // New: Published Notiya Updates articles
    const articles = await Update.find({
      status: "published",
    })
      .select("slug updatedAt publishedAt")
      .sort({ publishedAt: -1 })
      .lean();

    for (const article of articles) {
      if (!article.slug) continue;

      const slug = formatUrlSegment(article.slug);

      if (!slug) continue;

      addUrl(
        `/updates/${slug}`,
        0.7,
        "monthly",
        article.updatedAt ||
          article.publishedAt ||
          new Date()
      );
    }

    console.log(
      `Sitemap: Generated ${urls.length} URLs`
    );

    return urls;
  } catch (error) {
    console.error(
      "Sitemap generation failed:",
      error
    );

   
    return urls;
  }
}
