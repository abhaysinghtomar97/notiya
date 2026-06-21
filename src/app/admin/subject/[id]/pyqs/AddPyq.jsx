"use client";

import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AddPyq({ subjectId, pyqs }) {
    const router = useRouter();

    const [pyqList, setPyqList] = useState(pyqs || []);

    const [title, setTitle] = useState("");
    const [driveId, setDriveId] = useState("");

    const [editingIndex, setEditingIndex] = useState(null);

    const [loading, setLoading] = useState(false);

    // --------------------------
    // Reset Form
    // --------------------------

    function resetForm() {
        setTitle("");
        setDriveId("");
        setEditingIndex(null);
    }

    // --------------------------
    // Extract Drive ID
    // --------------------------

    function extractDriveId(value) {
        if (!value) return "";

        value = value.trim();

        // Already a Drive ID
        if (!value.includes("drive.google.com")) {
            return value;
        }

        // https://drive.google.com/file/d/FILE_ID/view
        const match = value.match(/\/d\/([a-zA-Z0-9_-]+)/);

        if (match) {
            return match[1];
        }

        return value;
    }

    // --------------------------
    // Add / Update PYQ
    // --------------------------

    function handleAddPyq() {
        if (!title.trim()) {
            return toast.error("Title is required.");
        }

        if (!driveId.trim()) {
            return toast.error("Drive Link / ID is required.");
        }

        const extractedId = extractDriveId(driveId);

        // Duplicate check
        const alreadyExists = pyqList.some(
            (pyq, index) =>
                pyq.driveId.toLowerCase() ===
                    extractedId.toLowerCase() &&
                index !== editingIndex
        );

        if (alreadyExists) {
            return toast.error("This PYQ already exists.");
        }

        const newPyq = {
            title: title.trim(),
            driveId: extractedId,
        };

        if (editingIndex !== null) {
            const updated = [...pyqList];

            updated[editingIndex] = newPyq;

            setPyqList(updated);

            toast.success("PYQ updated.");
        } else {
            setPyqList((prev) => [...prev, newPyq]);

            toast.success("PYQ added.");
        }

        resetForm();
    }

    // --------------------------
    // Edit
    // --------------------------

    function handleEdit(index) {
        const pyq = pyqList[index];

        setTitle(pyq.title);
        setDriveId(pyq.driveId);

        setEditingIndex(index);
    }

    // --------------------------
    // Delete
    // --------------------------

    function handleDelete(index) {
        const updated = [...pyqList];

        updated.splice(index, 1);

        setPyqList(updated);

        if (editingIndex === index) {
            resetForm();
        }

        toast.success("PYQ removed.");
    }

    // --------------------------
    // Save
    // --------------------------

    async function handleSave() {
        try {
            setLoading(true);

            const res = await axios.put(
                `/api/admin/subject/${subjectId}/pyqs`,
                {
                    pyqs: pyqList,
                }
            );

            if (res.data.success) {
                toast.success("PYQs updated successfully.");

                router.refresh();
            }
        } catch (error) {
            console.error(error);

            toast.error(
                error?.response?.data?.message ||
                    "Failed to update PYQs."
            );
        } finally {
            setLoading(false);
        }
    }
      return (
    <div className="space-y-8">
<Toaster />
      {/* Form */}

      <div className="border rounded-xl p-6 bg-main space-y-4">

        <h2 className="text-xl font-semibold">
          {editingIndex !== null ? "Edit PYQ" : "Add New PYQ"}
        </h2>

        <Input
          placeholder="PYQ Title (Example: AKTU 2024 Even Semester)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <Input
          placeholder="Paste Google Drive Link or Drive ID"
          value={driveId}
          onChange={(e) => setDriveId(e.target.value)}
        />

        {/* Preview */}

        {driveId && (
          <div className="rounded-xl overflow-hidden border">

            <iframe
              src={`https://drive.google.com/file/d/${extractDriveId(
                driveId
              )}/preview`}
              width="100%"
              height="450"
              allow="autoplay"
            />

          </div>
        )}

        <div className="flex gap-3">

          <Button
            onClick={handleAddPyq}
          >
            {editingIndex !== null ? "Update PYQ" : "Add PYQ"}
          </Button>

          {editingIndex !== null && (
            <Button
              variant="outline"
              onClick={resetForm}
            >
              Cancel
            </Button>
          )}

        </div>

      </div>

      {/* PYQ List */}

      <div className="space-y-4">

        <h2 className="text-xl font-semibold">
          Previous Year Questions
        </h2>

        {pyqList.length === 0 ? (

          <div className="border rounded-xl p-6 text-center text-gray-500">
            No PYQs added yet.
          </div>

        ) : (

          pyqList.map((pyq, index) => (

            <div
              key={index}
              className="border rounded-xl p-5 bg-main flex justify-between items-center"
            >

              <div>

                <h3 className="font-semibold text-lg">
                  {pyq.title}
                </h3>

                <p className="text-xs text-gray-500 mt-1 break-all">
                  {pyq.driveId}
                </p>

              </div>

              <div className="flex gap-2">

                <Button
                  variant="secondary"
                  asChild
                >
                  <a
                    href={`https://drive.google.com/file/d/${pyq.driveId}/preview`}
                    target="_blank"
                  >
                    Preview
                  </a>
                </Button>

                <Button
                  variant="outline"
                  onClick={() => handleEdit(index)}
                >
                  Edit
                </Button>

                <Button
                  variant="destructive"
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </Button>

              </div>

            </div>

          ))

        )}

      </div>

      {/* Save */}

      <div className="flex justify-end">

        <Button
          disabled={loading}
          onClick={handleSave}
        >
          {loading ? "Saving..." : "Save Changes"}
        </Button>

      </div>

    </div>
  );
}