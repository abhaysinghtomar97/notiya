import mongoose from "mongoose";

const SubjectSchema = new mongoose.Schema(
  {
    university: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    course: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    year: {
      type: String,
      required: true,
      trim: true,
    },

    semester: {
      type: Number,
      required: true,
    },

    // Only for B.Tech. Keep null for BCA/BBA etc.
     branches: [{
    type: String,
    required: true,
    uppercase: true // Enforces consistency (e.g., "CSE", "CS-AI")
}],

    subjectCode: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
    },

    subjectName: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    // aktu/btech/2nd-year/operating-system
    path: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    syllabus: [
      {
        unit: Number,
        title: {
          type: String,
          required: true
        },
        topics: [String],
      },
    ],

    importantTopics: [String],

    books: [
      {
        title: {
          type: String,
          required: true,
          trim: true
        },

        author: {
          type: String,
          required: true,
          trim: true
        }
      },
    ],

    videos: [
      {
        title: String,
        youtubeId: String,
        unit: {
          type: String,
          required: true
        }
      },
    ],

    faqs: [
      {
        question: String,
        answer: String,
      },
    ],

    seo: {
      metaTitle: String,
      metaDescription: String,
      keywords: [String],
    },

    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Route lookup
SubjectSchema.index(
  {
    university: 1,
    course: 1,
    year: 1,
    branches: 1,
    slug: 1,
  },
  { unique: true }
);

// Search by code
SubjectSchema.index({ subjectCode: 1 });

export default mongoose.models.Subject ||
  mongoose.model("Subject", SubjectSchema);