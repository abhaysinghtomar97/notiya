// models/LatestUpdate.js

import mongoose from "mongoose";

const LatestUpdateSchema = new mongoose.Schema(
  {
    university: {
      type: String,
      required: true,
      lowercase: true,
      index: true, // aktu, psit, csjmu
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    date: {
      type: Date,
      required: true,
      index: true,
    },

    link: {
      type: String,
      required: true,
      unique: true, // prevents duplicate notices
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.LatestUpdate ||
  mongoose.model("LatestUpdate", LatestUpdateSchema);