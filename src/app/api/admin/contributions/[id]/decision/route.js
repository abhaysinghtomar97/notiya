
import { NextResponse } from "next/server";
import ConnectDB from "@/dbConfig/dbConfig";
import mongoose from "mongoose";
import {
  contribution,
  decisionSchema,
} from "@/models/Contributions";


export const runtime = "nodejs";

export async function POST(req, ctx) {
  // Verify admin authentication
  // if (!(await requireAdmin())) {
  //   return NextResponse.json(
  //     { error: "Unauthorized" },
  //     { status: 401 }
  //   );
  // }

  try {
    const { id } = await ctx.params;

    if (!mongoose.isValidObjectId(id)) {
      return NextResponse.json(
        { error: "Invalid ID" },
        { status: 400 }
      );
    }

    const body = await req.json();
    const parsed = decisionSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Invalid decision",
          details: parsed.error.flatten(),
        },
        { status: 400 }
      );
    }

    await ConnectDB();

    const item = await contribution.findOne({
      _id: id,
      status: "pending_review",
    });

    if (!item) {
      return NextResponse.json(
        { error: "Pending contribution not found" },
        { status: 404 }
      );
    }

    item.status =
      parsed.data.decision === "approve"
        ? "approved"
        : "rejected";

    item.reviewerNote = parsed.data.reviewerNote || "";
    item.reviewedAt = new Date();

    await item.save();

    return NextResponse.json({
      success: true,
      status: item.status,
    });
  } catch (error) {
    console.error("Contribution decision failed:", error);

    return NextResponse.json(
      { error: "Unable to update contribution" },
      { status: 500 }
    );
  }
}
