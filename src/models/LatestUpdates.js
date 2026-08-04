import mongoose from "mongoose";

const LatestUpdateSchema = new mongoose.Schema(
  {
    university: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    dateStr: {
      type: String, // Added to match the raw date string from the scraper
    },
    url: { // Changed from 'link' to match the scraper's schema
      type: String,
      required: true,
      unique: true, 
    },
    isNewNotice: {
      type: Boolean,
      default: true,
    },
    scrapedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    collection: "notices", // CRITICAL: Forces Next.js to read from the scraper's table
  }
);

// Compound index optimized exactly for your frontend query: 
// LatestUpdate.find({ university }).sort({ date: -1 })
LatestUpdateSchema.index({ university: 1, date: -1 });

export default mongoose.models.LatestUpdate ||
  mongoose.model("LatestUpdate", LatestUpdateSchema);