// models/LatestUpdate.js

import mongoose from "mongoose";

const LatestUpdateSchema = new mongoose.Schema(
  {
    university: {
      type: String,
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
    },

    date: {
      type: Date,
      required: true,
      index: true,
    },

    link: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    scrapedAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.LatestUpdate ||
  mongoose.model("LatestUpdate", LatestUpdateSchema);