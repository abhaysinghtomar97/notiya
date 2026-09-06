import ConnectDb from "@/dbConfig/dbConfig";
import Subject from "@/models/Subject";

const BASE_URL ="https://www.notiya.in/";

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

  try {
    /*
     * ==========================================
     * 1. STATIC PAGES
     * ==========================================
     */

    addUrl("/", 1.0);

    addUrl("/study-material", 0.95);

    /*
     * ==========================================
     * 2. SYLLABUS PAGES
     * ==========================================
     */

    // AKTU
    addUrl(
      "/AKTU-Syllabus/1st-Year-AKTU-Syllabus",
      0.9
    );

    // PSIT
    addUrl("/PSIT-Syllabus/btech", 0.9);

    addUrl(
      "/PSIT-Syllabus/btech/1st-Year-PSIT-Syllabus",
      0.85
    );

    // CSJMU
    addUrl("/CSJMU-Syllabus", 0.9);

    addUrl("/CSJMU-Syllabus/BCA", 0.85);

    addUrl("/CSJMU-Syllabus/BBA", 0.85);

    /*
     * ==========================================
     * 3. CONNECT DATABASE
     * ==========================================
     */

    await ConnectDb();

    /*
     * ==========================================
     * 4. FETCH PUBLISHED SUBJECTS
     * ==========================================
     */

    const subjects = await Subject.find(
      {
        isPublished: true,
      },
      {
        university: 1,
        course: 1,
        year: 1,
        branches: 1, // NEW FIELD
        slug: 1,
      }
    ).lean();

    console.log(
      `Sitemap: Found ${subjects.length} published subjects`
    );

    /*
     * ==========================================
     * 5. GENERATE DYNAMIC URLS
     * ==========================================
     */

    for (const subject of subjects) {
      const university = formatUrlSegment(
        subject.university
      );

      const course = formatUrlSegment(
        subject.course
      );

      const year =
        yearMap[String(subject.year)] || "";

      /*
       * branches is now an ARRAY
       *
       * Example:
       * ["CSE", "CS-AI", "CS-DS", "CS-AIML", "IT"]
       */

      const branches = Array.isArray(subject.branches)
        ? subject.branches
        : [];

      const slug = formatUrlSegment(
        subject.slug
      );

      /*
       * Required fields
       */

      if (!university || !course || !year) {
        console.warn(
          "Sitemap: Invalid subject skipped:",
          {
            university: subject.university,
            course: subject.course,
            year: subject.year,
            branches: subject.branches,
            slug: subject.slug,
          }
        );

        continue;
      }

      /*
       * ==========================================
       * UNIVERSITY PAGE
       * ==========================================
       */

      addUrl(
        `/study-material/${university}`,
        0.9
      );

      /*
       * ==========================================
       * COURSE PAGE
       * ==========================================
       */

      addUrl(
        `/study-material/${university}/${course}`,
        0.85
      );

      /*
       * ==========================================
       * YEAR PAGE
       * ==========================================
       */

      const yearPath =
        `/study-material/${university}/${course}/${year}`;

      addUrl(
        yearPath,
        0.8
      );

      /*
       * ==========================================
       * BRANCH PAGES
       * ==========================================
       */

      /*
       * If branches is:
       *
       * ["CSE", "CS-AI", "CS-DS", "CS-AIML", "IT"]
       *
       * generate 5 branch URLs.
       *
       * If branches is:
       *
       * ["ECE"]
       *
       * generate 1 branch URL.
       *
       * If branches is:
       *
       * ["ALL"]
       *
       * don't generate /all.
       */

      const validBranches = branches
        .filter(Boolean)
        .map((branch) => String(branch).trim())
        .filter(
          (branch) =>
            branch &&
            branch.toUpperCase() !== "ALL"
        );

      for (const branchName of validBranches) {
        const branch = formatUrlSegment(
          branchName
        );

        if (!branch) continue;

        const branchPath =
          `${yearPath}/${branch}`;

        /*
         * Branch page
         */

        addUrl(
          branchPath,
          0.75
        );

        /*
         * ==========================================
         * SUBJECT PAGE
         * ==========================================
         *
         * IMPORTANT:
         *
         * The subject page is generated UNDER
         * EACH branch.
         */

        if (slug) {
          addUrl(
            `${branchPath}/${slug}`,
            0.7
          );
        }
      }

      /*
       * ==========================================
       * SUBJECT WITHOUT BRANCH
       * ==========================================
       *
       * For ["ALL"], the subject belongs directly
       * to the year level.
       *
       * Example:
       *
       * branches: ["ALL"]
       *
       * URL:
       *
       * /study-material/aktu/btech/1st-year/
       * data-structures
       */

      const hasOnlyAll =
        branches.length > 0 &&
        branches.every(
          (branch) =>
            String(branch)
              .trim()
              .toUpperCase() === "ALL"
        );

      if (hasOnlyAll && slug) {
        addUrl(
          `${yearPath}/${slug}`,
          0.7
        );
      }
    }

    /*
     * ==========================================
     * 6. LOG RESULT
     * ==========================================
     */

    console.log(
      `Sitemap: Generated ${urls.length} URLs`
    );

    return urls;

  } catch (error) {
    /*
     * ==========================================
     * 7. FALLBACK
     * ==========================================
     */

    console.error(
      "Failed to generate sitemap:",
      error
    );

    return [
      {
        url: `${BASE_URL}/`,
        lastModified,
        changeFrequency: "weekly",
        priority: 1.0,
      },
      {
        url: `${BASE_URL}/study-material`,
        lastModified,
        changeFrequency: "weekly",
        priority: 0.95,
      },
      {
        url:
          `${BASE_URL}/AKTU-Syllabus/1st-Year-AKTU-Syllabus`,
        lastModified,
        changeFrequency: "weekly",
        priority: 0.9,
      },
      {
        url:
          `${BASE_URL}/PSIT-Syllabus/btech`,
        lastModified,
        changeFrequency: "weekly",
        priority: 0.9,
      },
      {
        url:
          `${BASE_URL}/CSJMU-Syllabus`,
        lastModified,
        changeFrequency: "weekly",
        priority: 0.9,
      },
    ];
  }
}