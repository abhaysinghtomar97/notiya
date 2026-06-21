import mongoose from "mongoose";

const NotesSchema = new mongoose.Schema(
  {
    subjectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
      unique: true,
    },

    units: [
      {
        unit: {
          type: Number,
          required: true,
        },

        title: String,

        resources: [
          {
            title: {
              type: String,
              required: true,
            },

            driveId: {
              type: String,
              required: true,
            },
            type: {
              type: String,
              enum: ["notes", "assignment", "lab", "ppt", "book", "other"],
              default: "notes"
            },

            uploadedAt: {
              type: Date,
              default: Date.now
            }
          },
        ],
      },
    ],

    pyqs: [
      {
        title: String,
        driveId: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

NotesSchema.index({ subjectId: 1 });

export default mongoose.models.Notes ||
  mongoose.model("Notes", NotesSchema);