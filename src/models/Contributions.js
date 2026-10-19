
import mongoose from "mongoose";
import { z } from "zod";

export const MAX_PDF_SIZE = 50 * 1024 * 1024; // 50 MB

// Zod schema: validates incoming API data
export const contributionSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(254),
  university: z.string().trim().min(2).max(100),
  branch: z.string().trim().min(2).max(100),
  semester: z.string().trim().min(2).max(30),
  subject: z.string().trim().min(2).max(160),

  type: z.enum([
    "Handwritten notes",
    "Typed notes",
    "Previous year question paper",
    "Solved assignment",
    "Other",
  ]),

  permission: z.literal(true),

  originalFilename: z
    .string()
    .trim()
    .min(1)
    .max(180)
    .refine(
      (value) => !/[\\/]/.test(value),
      "Filename must not contain path separators"
    ),

  fileSize: z.number().int().positive().max(MAX_PDF_SIZE),
  contentType: z.literal("application/pdf"),
});

// Mongoose schema: defines how data is stored in MongoDB
const contributionMongoSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    university: { type: String, required: true, trim: true },
    branch: { type: String, required: true, trim: true },
    semester: { type: String, required: true, trim: true },
    subject: { type: String, required: true, trim: true },

    type: {
      type: String,
      required: true,
      enum: [
        "Handwritten notes",
        "Typed notes",
        "Previous year question paper",
        "Solved assignment",
        "Other",
      ],
    },

    permission: { type: Boolean, required: true, default: false },
    originalFilename: { type: String, required: true },
    fileSize: { type: Number, required: true },
    contentType: {
      type: String,
      required: true,
      enum: ["application/pdf"],
    },

    objectKey: { type: String, required: true, unique: true },
    status: {
      type: String,
      enum: ["uploading", "pending_review", "approved", "rejected"],
      default: "uploading",
      index: true,
    },
    reviewerNote: { type: String, default: "" },
    reviewedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

export const Contribution =
  mongoose.models.Contribution ||
  mongoose.model("Contribution", contributionMongoSchema);

// Optional: use this alias if your existing code expects lowercase `contribution`.
export const contribution = Contribution;

// Zod schema for validating admin decisions
export const decisionSchema = z.object({
  decision: z.enum(["approve", "reject"]),
  reviewerNote: z.string().trim().max(1000).optional().default(""),
});

// Optional Mongoose model for decisions, if you genuinely need a separate collection.
// Most applications do not need this model; decisionSchema alone is sufficient.
