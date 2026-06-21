"use client";

import { useState } from "react";
import axios from "axios";
import toast,{Toaster} from "react-hot-toast";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AddImportantTopics({
    subjectId,
    importantTopics,
}) {

    const router = useRouter();

    const [topicList, setTopicList] = useState(
        importantTopics || []
    );

    const [topic, setTopic] = useState("");

    const [editingIndex, setEditingIndex] =
        useState(null);

    const [loading, setLoading] = useState(false);

    // ------------------------
    // Reset
    // ------------------------

    function resetForm() {
        setTopic("");
        setEditingIndex(null);
    }

    // ------------------------
    // Add / Update Topic
    // ------------------------

    function handleAddTopic() {

        if (!topic.trim()) {
            return toast.error(
                "Topic cannot be empty."
            );
        }

        const exists = topicList.some(
            (item, index) =>
                item.trim().toLowerCase() ===
                    topic.trim().toLowerCase() &&
                index !== editingIndex
        );

        if (exists) {
            return toast.error(
                "Topic already exists."
            );
        }

        if (editingIndex !== null) {

            const updated = [...topicList];

            updated[editingIndex] = topic.trim();

            setTopicList(updated);

            toast.success("Topic updated.");

        } else {

            setTopicList(prev => [
                ...prev,
                topic.trim(),
            ]);

            toast.success("Topic added.");

        }

        resetForm();

    }

    // ------------------------
    // Edit
    // ------------------------

    function handleEdit(index) {

        setTopic(topicList[index]);

        setEditingIndex(index);

    }

    // ------------------------
    // Delete
    // ------------------------

    function handleDelete(index) {

        const updated = [...topicList];

        updated.splice(index, 1);

        setTopicList(updated);

        if (editingIndex === index) {
            resetForm();
        }

        toast.success("Topic deleted.");

    }

    // ------------------------
    // Save
    // ------------------------

    async function handleSave() {

        try {

            setLoading(true);

            const res = await axios.put(
                `/api/admin/subject/${subjectId}/important-topics`,
                {
                    importantTopics: topicList,
                }
            );

            if (res.data.success) {

                toast.success(
                    "Important topics updated successfully."
                );

                router.refresh();

            }

        } catch (error) {

            console.error(error);

            toast.error(
                error?.response?.data?.message ||
                "Failed to update topics."
            );

        } finally {

            setLoading(false);

        }

    }
        return (
        <div className="space-y-8">
            <Toaster />
            {/* Add Topic */}

            <div className="border rounded-xl p-6 bg-main space-y-4">

                <h2 className="text-xl font-semibold">
                    {editingIndex !== null
                        ? "Edit Important Topic"
                        : "Add Important Topic"}
                </h2>

                <Input
                    placeholder="Enter important topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                />

                <div className="flex gap-3">

                    <Button
                        onClick={handleAddTopic}
                    >
                        {editingIndex !== null
                            ? "Update Topic"
                            : "Add Topic"}
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

            {/* Topic List */}

            <div className="space-y-4">

                <h2 className="text-xl font-semibold">
                    Important Topics
                </h2>

                {topicList.length === 0 ? (

                    <div className="border rounded-xl p-6 text-center text-gray-500">
                        No important topics added yet.
                    </div>

                ) : (

                    topicList.map((item, index) => (

                        <div
                            key={index}
                            className="border rounded-xl p-5 bg-main flex justify-between items-center"
                        >

                            <div>

                                <h3 className="font-medium">
                                    {item}
                                </h3>

                            </div>

                            <div className="flex gap-2">

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
                    {loading
                        ? "Saving..."
                        : "Save Changes"}
                </Button>

            </div>

        </div>
    );
}