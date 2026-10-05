import { NextResponse } from "next/server";
import Subject from "@/models/Subject";
import Notes from "@/models/Notes"; // Ensure models are registered
import ConnectDb from "@/dbConfig/dbConfig";

export async function GET(req) {
  try {
    await ConnectDb();

    // ---------------------------------------
    // 1. Get pagination parameters
    // ---------------------------------------
    const { searchParams } = new URL(req.url);

    const page = Math.max(
      parseInt(searchParams.get("page") || "1", 10),
      1
    );

    const limit = Math.min(
      Math.max(
        parseInt(searchParams.get("limit") || "10", 10),
        1
      ),
      100
    );

    const skip = (page - 1) * limit;

    // ---------------------------------------
    // 2. Aggregation Pipeline
    // ---------------------------------------
    const pipeline = [
      // Join Subjects with Notes
      {
        $lookup: {
          from: "notes",
          localField: "_id",
          foreignField: "subjectId",
          as: "notesData",
        },
      },

      // Convert notesData array into object
      {
        $unwind: {
          path: "$notesData",
          preserveNullAndEmptyArrays: true,
        },
      },

      // Calculate resource availability
      {
        $addFields: {
          hasPyqs: {
            $gt: [
              {
                $size: {
                  $ifNull: ["$notesData.pyqs", []],
                },
              },
              0,
            ],
          },

          unitsUploaded: {
            $size: {
              $ifNull: ["$notesData.units", []],
            },
          },

          hasNotes: {
            $gt: [
              {
                $size: {
                  $ifNull: ["$notesData.units", []],
                },
              },
              0,
            ],
          },
        },
      },

      // Calculate overall status
      {
        $addFields: {
          status: {
            $switch: {
              branches: [
                {
                  case: {
                    $and: [
                      "$hasPyqs",
                      "$hasNotes",
                    ],
                  },
                  then: "Complete",
                },

                {
                  case: {
                    $or: [
                      "$hasPyqs",
                      "$hasNotes",
                    ],
                  },
                  then: "Partial",
                },
              ],

              default: "Missing",
            },
          },
        },
      },

      // ---------------------------------------
      // 3. Pagination + Stats
      // ---------------------------------------
      {
        $facet: {
          // ==============================
          // PAGINATED SUBJECTS
          // ==============================
          subjects: [
            {
              $sort: {
                _id: 1,
              },
            },

            {
              $skip: skip,
            },

            {
              $limit: limit,
            },
          ],

          // ==============================
          // GLOBAL STATISTICS
          // ==============================
          stats: [
            {
              $group: {
                _id: null,

                totalSubjects: {
                  $sum: 1,
                },

                complete: {
                  $sum: {
                    $cond: [
                      { $eq: ["$status", "Complete"] },
                      1,
                      0,
                    ],
                  },
                },

                partial: {
                  $sum: {
                    $cond: [
                      { $eq: ["$status", "Partial"] },
                      1,
                      0,
                    ],
                  },
                },

                missing: {
                  $sum: {
                    $cond: [
                      { $eq: ["$status", "Missing"] },
                      1,
                      0,
                    ],
                  },
                },

                withNotes: {
                  $sum: {
                    $cond: [
                      "$hasNotes",
                      1,
                      0,
                    ],
                  },
                },

                withPyqs: {
                  $sum: {
                    $cond: [
                      "$hasPyqs",
                      1,
                      0,
                    ],
                  },
                },

                universities: {
                  $addToSet: "$university",
                },

                courses: {
                  $addToSet: "$course",
                },
              },
            },

            // Convert arrays into counts
            {
              $project: {
                _id: 0,

                totalSubjects: 1,
                complete: 1,
                partial: 1,
                missing: 1,
                withNotes: 1,
                withPyqs: 1,

                universities: {
                  $size: "$universities",
                },

                courses: {
                  $size: "$courses",
                },
              },
            },
          ],
        },
      },
    ];

    // ---------------------------------------
    // 4. Execute aggregation
    // ---------------------------------------
    const [result] = await Subject.aggregate(pipeline);

    const subjects = result.subjects || [];

    const stats = result.stats?.[0] || {
      totalSubjects: 0,
      complete: 0,
      partial: 0,
      missing: 0,
      withNotes: 0,
      withPyqs: 0,
      universities: 0,
      courses: 0,
    };

    // ---------------------------------------
    // 5. Pagination metadata
    // ---------------------------------------
    const totalSubjects = stats.totalSubjects;

    const totalPages = Math.ceil(
      totalSubjects / limit
    );

    // ---------------------------------------
    // 6. Response
    // ---------------------------------------
    return NextResponse.json({
      subjects,

      stats,

      pagination: {
        page,
        limit,
        totalSubjects,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    });
  } catch (error) {
    console.error(
      "Dashboard Aggregation Error:",
      error
    );

    return NextResponse.json(
      {
        error: "Failed to fetch dashboard data",
      },
      {
        status: 500,
      }
    );
  }
}