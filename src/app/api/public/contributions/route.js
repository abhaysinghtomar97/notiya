import { NextResponse } from "next/server";
import ConnectDB from "@/dbConfig/dbConfig"
import {Contribution} from "@/models/Contributions";
import { createDownloadUrl } from "@/lib/cloudflare/r2";

export const runtime = "nodejs";

export async function GET() {
  try {
    await ConnectDB();
    const items = await Contribution.find({ status: "approved" })
      .select("name university branch semester subject type originalFilename fileSize reviewedAt createdAt objectKey")
      .sort({ reviewedAt: -1 }).limit(100).lean();
    const contributions = await Promise.all(items.map(async item => ({
      id: String(item._id), contributor: item.name, university: item.university, branch: item.branch,
      semester: item.semester, subject: item.subject, type: item.type,
      filename: item.originalFilename, fileSize: item.fileSize,
      reviewedAt: item.reviewedAt, downloadUrl: await createDownloadUrl(item.objectKey),
    })));
    return NextResponse.json({ contributions }, {
      headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" },
    });
  } catch (error) {
    console.error("Public contribution listing failed", error);
    return NextResponse.json({ error: "Unable to load contributions" }, { status: 500 });
  }
}
