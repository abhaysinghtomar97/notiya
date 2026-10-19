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

async function verifyTurnstile(token) {
  if (
    typeof token !== "string" ||
    token.length === 0 ||
    token.length > 2048
  ) {
    return false;
  }

  const response = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        secret: process.env.TURNSTILE_SECRET_KEY,
        response: token,
      }),
      cache: "no-store",
    }
  );

  if (!response.ok) return false;

  const result = await response.json();
  return result.success === true;
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { turnstileToken } = body;

    if (!(await verifyTurnstile(turnstileToken))) {
      return Response.json(
        { error: "Verification failed. Please try again." },
        { status: 403 }
      );
    }
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
    

    if (parsed.data.fileSize > MAX_PDF_SIZE) {
      return NextResponse.json(
        { error: "PDF exceeds the maximum allowed size" },
        { status: 413 }
      );
    }

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
