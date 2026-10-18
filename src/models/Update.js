import mongoose from "mongoose";

const SourceSchema = new mongoose.Schema(
  {
    label: { type: String, trim: true, maxlength: 120 },
    url: { type: String, trim: true, maxlength: 2048 },
  },
  { _id: false }
);

const UpdateSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 180 },
    slug: { type: String, required: true, unique: true, index: true, lowercase: true, trim: true },
    excerpt: { type: String, required: true, trim: true, maxlength: 320 },
    content: { type: String, required: true, maxlength: 150000 },
    coverImage: { type: String, trim: true, maxlength: 2048, default: "" },
    category: {
      type: String,
      required: true,
      enum: ["Jobs & Internships", "University", "Skills & Certifications", "Scholarships", "Career Guides"],
    },
    tags: [{ type: String, trim: true, maxlength: 40 }],
    author: { type: String, required: true, trim: true, maxlength: 100, default: "Notiya Editorial Team" },
    status: { type: String, enum: ["draft", "published"], default: "draft", index: true },
    sources: { type: [SourceSchema], default: [] },
    seoTitle: { type: String, trim: true, maxlength: 180, default: "" },
    seoDescription: { type: String, trim: true, maxlength: 320, default: "" },
    publishedAt: { type: Date, default: null, index: true },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

UpdateSchema.index({ status: 1, publishedAt: -1 });
export default mongoose.models.Update || mongoose.model("Update", UpdateSchema);
