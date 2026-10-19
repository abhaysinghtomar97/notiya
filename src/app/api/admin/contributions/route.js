
import { NextResponse } from "next/server";
import ConnectDB from "@/dbConfig/dbConfig";
import { Contribution } from "@/models/Contributions";
import { createDownloadUrl } from "@/lib/cloudflare/r2";

export const runtime = "nodejs";

export async function GET(req) {


  const status =
    req.nextUrl.searchParams.get("status") || "pending_review";

  const allowedStatuses = [
    "uploading",
    "pending_review",
    "approved",
    "rejected",
  ];

  if (!allowedStatuses.includes(status)) {
    return NextResponse.json(
      { error: "Invalid status" },
      { status: 400 }
    );
  }

  try {
    await ConnectDB();

    const items = await Contribution.find({ status })
      .sort({ createdAt: -1 })
      .limit(100)
      .lean();

    const results = await Promise.all(
      items.map(async (item) => {
        let previewUrl = null;

        // Don't create preview URLs for incomplete uploads
        if (
          item.status !== "uploading" &&
          item.objectKey
        ) {
          previewUrl = await createDownloadUrl(item.objectKey);
        }

        return {
          id: String(item._id),
          name: item.name,
          email: item.email,
          university: item.university,
          branch: item.branch,
          semester: item.semester,
          subject: item.subject,
          type: item.type,
          originalFilename: item.originalFilename,
          fileSize: item.fileSize,
          status: item.status,
          reviewerNote: item.reviewerNote || "",
          createdAt: item.createdAt,
          previewUrl,
        };
      })
    );

    return NextResponse.json({ contributions: results });
  } catch (error) {
    console.error("Admin contribution listing failed:", error);

    return NextResponse.json(
      { error: "Unable to load contributions" },
      { status: 500 }
    );
  }
}
