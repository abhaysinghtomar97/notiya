import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import ConnectDB from "@/dbConfig/dbConfig";
import { createUploadUrl } from "@/lib/cloudflare/r2";

import {
  Contribution,
  MAX_PDF_SIZE,
  contributionSchema,
} from "@/models/Contributions";



export const runtime = "nodejs";

export async function POST(req) {
  try {
    const body = await req.json();

    const parsed = contributionSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Invalid submission",
          details: parsed.error.flatten(),
        },
        { status: 400 }
      );
    }
    console.log("Parsed contribution data:", parsed.data);

    if (parsed.data.fileSize > MAX_PDF_SIZE) {
      return NextResponse.json(
        { error: "PDF exceeds the maximum allowed size" },
        { status: 413 }
      );
    }
    console.log("Parsed contribution data:", parsed.data);

    await ConnectDB();

    const id = randomUUID();
    const objectKey = `contributions/${new Date().getUTCFullYear()}/${id}.pdf`;

    const contribution = await Contribution.create({
      ...parsed.data,
      objectKey,
      status: "uploading",
    });

    const uploadUrl = await createUploadUrl(
      objectKey,
      "application/pdf"
    );
    
    console.log("Contribution initialized successfully:", contribution);
    return NextResponse.json(
      {
        contributionId: String(contribution._id),
        uploadUrl,
        uploadHeaders: {
          "Content-Type": "application/pdf",
        },
        expiresInSeconds: 300,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contribution initialization failed:", error);

    return NextResponse.json(
      { error: "Unable to start contribution upload" },
      { status: 500 }
    );
  }
}
