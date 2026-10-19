
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import ConnectDB from "@/dbConfig/dbConfig";
import { contribution } from "@/models/Contributions";
import { headObject, readPdfHeader } from "@/lib/cloudflare/r2";
// import { sendAdminSubmissionEmail } from "@/lib/email";

export const runtime = "nodejs";

export async function POST(req, ctx) {
  try {
    const { id } = await ctx.params;

    if (!mongoose.isValidObjectId(id)) {
      return NextResponse.json(
        { error: "Invalid submission ID" },
        { status: 400 }
      );
    }

    await ConnectDB();

    const item = await contribution.findById(id);

    if (!item) {
      return NextResponse.json(
        { error: "Submission not found" },
        { status: 404 }
      );
    }

    if (item.status !== "uploading") {
      return NextResponse.json(
        { error: "Submission is not awaiting upload" },
        { status: 409 }
      );
    }

    if (!item.objectKey) {
      return NextResponse.json(
        { error: "Upload object key is missing" },
        { status: 400 }
      );
    }

    const head = await headObject(item.objectKey);
    const actualSize = head.ContentLength;
    const maxSize =
      Number(process.env.MAX_PDF_SIZE_MB || 50) * 1024 * 1024;

    if (
      typeof actualSize !== "number" ||
      actualSize < 8 ||
      actualSize > item.fileSize ||
      actualSize > maxSize
    ) {
      return NextResponse.json(
        { error: "Uploaded file size is invalid" },
        { status: 400 }
      );
    }

    if (
      head.ContentType &&
      head.ContentType.toLowerCase().split(";")[0].trim() !==
        "application/pdf"
    ) {
      return NextResponse.json(
        { error: "Uploaded content type is invalid" },
        { status: 400 }
      );
    }

    const signature = await readPdfHeader(item.objectKey);

    if (
      !signature ||
      signature.subarray(0, 5).toString("ascii") !== "%PDF-"
    ) {
      return NextResponse.json(
        { error: "The uploaded file is not a valid PDF" },
        { status: 400 }
      );
    }

    item.fileSize = actualSize;
    item.status = "pending_review";
    await item.save();

    // Email failure should not undo a successfully verified upload.
    // try {
    //   await sendAdminSubmissionEmail({
        // id: String(item._id),
    //     name: item.name,
    //     subject: item.subject,
    //     university: item.university,
    //     branch: item.branch,
    //     semester: item.semester,
    //     type: item.type,
    //   });
    // } catch (emailError) {
    //   console.error("Admin submission email failed:", emailError);
    // }

    return NextResponse.json({
      success: true,
      status: "pending_review",
    });
  } catch (error) {
    console.error("Contribution completion failed:", error);

    return NextResponse.json(
      { error: "Unable to verify uploaded PDF" },
      { status: 500 }
    );
  }
}
