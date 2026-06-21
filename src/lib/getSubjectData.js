import Subject from "../models/Subject.js";
import Notes from "../models/Notes.js";
import ConnectDb from "@/dbConfig/dbConfig.js";
import { qureyyearMap } from "@/components/YearMap.js";

export async function getSubjectData(university, course, year, branch, slug) {
  try {
    await ConnectDb();

    // 1. Map the year BEFORE building the query object. 
    // The `|| year` acts as a safety fallback if the map doesn't contain the key.
    const mappedYear = qureyyearMap[year] || year;

    // 2. Construct the base query using the mapped year
    let query = { 
      university, 
      course, 
      year: mappedYear, 
      slug 
    };
    
    // 3. Flexible Branch Logic using MongoDB $or
    if (branch) {
      // If a branch exists in the URL (e.g., "cse"), find that branch 
      // OR find subjects labeled as "all" / "common" / null (in case 1st-year subjects are shared)
      query.$or = [
        { branch: branch },
        { branch: "all" },
        { branch: "common" },
        { branch: null }
      ];
    } else {
      // If NO branch is passed (e.g., 1st-year B.Tech or BCA), 
      // strictly look for subjects where branch is null, "all", or "common"
      query.$or = [
        { branch: null },
        { branch: "all" },
        { branch: "common" }
      ];
    }

    // 4. Fetch the embedded Subject document
    const subjectDoc = await Subject.findOne(query).lean();

    if (!subjectDoc) {
      console.log("No subject found for query:", JSON.stringify(query, null, 2)); // Helpful for debugging
      return null;
    }
    
    // Optional: Keep this to verify the document shape during development, then remove in prod
    // console.log(subjectDoc); 

    // 5. Fetch the linked Notes document (contains units/resources and pyqs)
    const notesDoc = await Notes.findOne({ subjectId: subjectDoc._id }).lean();

    // 6. Flatten the nested notes structure for easier frontend mapping
    let extractedNotes = [];
    let extractedPyqs = [];

    if (notesDoc) {
      // Extract resources from inside the units array
      if (notesDoc.units && Array.isArray(notesDoc.units)) {
        notesDoc.units.forEach((unitObj) => {
          if (unitObj.resources && Array.isArray(unitObj.resources)) {
            unitObj.resources.forEach((resource) => {
              extractedNotes.push({
                id: resource._id.toString(),
                unit: unitObj.unit,
                title: resource.title,
                type: resource.type,
                driveId: resource.driveId,
                uploadedAt: resource.uploadedAt,
              });
            });
          }
        });
      }

      // Extract PYQs
      if (notesDoc.pyqs && Array.isArray(notesDoc.pyqs)) {
        extractedPyqs = notesDoc.pyqs.map((pyq) => ({
          id: pyq._id.toString(),
          title: pyq.title,
          driveId: pyq.driveId,
          uploadedAt: pyq.uploadedAt,
        }));
      }
    }

    // 7. Return the unified data structure
    return {
      general: {
        id: subjectDoc._id.toString(),
        name: subjectDoc.subjectName,
        code: subjectDoc.subjectCode,
        description: subjectDoc.description,
      },
      syllabus: subjectDoc.syllabus || [],
      importantTopics: subjectDoc.importantTopics || [],
      // Map videos to expose the youtubeId directly
      videos: subjectDoc.videos?.map((v) => ({
        id: v._id.toString(),
        title: v.title,
        youtubeId: v.youtubeId,
        unit: v.unit,
      })) || [],
      books: subjectDoc.books || [],
      faqs: subjectDoc.faqs || [],
      notes: extractedNotes,
      pyqs: extractedPyqs,
    };
  } catch (error) {
    console.error("Database Query Failed in getSubjectData:", error);
    throw new Error("Failed to fetch subject data");
  }
}