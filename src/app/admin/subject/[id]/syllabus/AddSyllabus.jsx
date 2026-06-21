"use client";

import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AddSyllabus({ subjectId, syllabus }) {
    const router = useRouter();
    
    // State
    const [syllabusList, setSyllabusList] = useState(syllabus || []);
    const [topicInputs, setTopicInputs] = useState({});
    const [editingTopic, setEditingTopic] = useState(null); // { unitId, topicIndex }
    const [editingTopicValue, setEditingTopicValue] = useState("");
    
    // Form State
    const [unit, setUnit] = useState("");
    const [title, setTitle] = useState("");
    const [editingUnitId, setEditingUnitId] = useState(null); // Tracks unit by ID, not index
    const [loading, setLoading] = useState(false);

    // ----------------------------
    // Reset Form
    // ----------------------------
    function resetForm() {
        setUnit("");
        setTitle("");
        setEditingUnitId(null);
    }

    // ----------------------------
    // Add / Update Unit
    // ----------------------------
    function handleAddUnit() {
        const unitNum = Number(unit);

        if (!unit) return toast.error("Unit number is required.");
        if (!title.trim()) return toast.error("Unit title is required.");

        // Prevent duplicate unit numbers
        const exists = syllabusList.some(
            (item) => item.unit === unitNum && item.unit !== editingUnitId
        );

        if (exists) return toast.error("This unit already exists.");

        if (editingUnitId !== null) {
            setSyllabusList((prev) =>
                prev.map((item) =>
                    item.unit === editingUnitId
                        ? { ...item, unit: unitNum, title: title.trim() }
                        : item
                )
            );
            toast.success("Unit updated.");
        } else {
            setSyllabusList((prev) => [
                ...prev,
                { unit: unitNum, title: title.trim(), topics: [] },
            ]);
            toast.success("Unit added.");
        }

        resetForm();
    }

    // ----------------------------
    // Edit Unit
    // ----------------------------
    function handleEdit(unitId) {
        const current = syllabusList.find((item) => item.unit === unitId);
        if (current) {
            setUnit(current.unit);
            setTitle(current.title);
            setEditingUnitId(unitId);
        }
    }

    // ----------------------------
    // Delete Unit
    // ----------------------------
    function handleDelete(unitId) {
        setSyllabusList((prev) => prev.filter((item) => item.unit !== unitId));
        if (editingUnitId === unitId) resetForm();
        toast.success("Unit deleted.");
    }

    // ----------------------------
    // Add Topic
    // ----------------------------
    function handleAddTopic(unitId) {
        const topic = topicInputs[unitId];

        if (!topic?.trim()) return toast.error("Topic cannot be empty.");

        let isDuplicate = false;

        setSyllabusList((prev) =>
            prev.map((item) => {
                if (item.unit === unitId) {
                    const alreadyExists = item.topics.some(
                        (t) => t.trim().toLowerCase() === topic.trim().toLowerCase()
                    );
                    if (alreadyExists) {
                        isDuplicate = true;
                        return item;
                    }
                    return { ...item, topics: [...item.topics, topic.trim()] };
                }
                return item;
            })
        );

        if (isDuplicate) {
            toast.error("Topic already exists.");
        } else {
            // Clear input field for this specific unit
            setTopicInputs((prev) => ({ ...prev, [unitId]: "" }));
            toast.success("Topic added.");
        }
    }

    // ----------------------------
    // Save Edited Topic
    // ----------------------------
    function handleSaveTopic() {
        if (!editingTopicValue.trim()) {
            return toast.error("Topic cannot be empty.");
        }

        const { unitId, topicIndex } = editingTopic;
        let isDuplicate = false;

        setSyllabusList((prev) =>
            prev.map((item) => {
                if (item.unit === unitId) {
                    const duplicate = item.topics.some(
                        (t, index) =>
                            t.trim().toLowerCase() === editingTopicValue.trim().toLowerCase() &&
                            index !== topicIndex
                    );

                    if (duplicate) {
                        isDuplicate = true;
                        return item;
                    }

                    const newTopics = [...item.topics];
                    newTopics[topicIndex] = editingTopicValue.trim();
                    return { ...item, topics: newTopics };
                }
                return item;
            })
        );

        if (isDuplicate) {
            return toast.error("Topic already exists.");
        }

        setEditingTopic(null);
        setEditingTopicValue("");
        toast.success("Topic updated.");
    }

    // ----------------------------
    // Delete Topic
    // ----------------------------
    function handleDeleteTopic(unitId, topicIndex) {
        setSyllabusList((prev) =>
            prev.map((item) => {
                if (item.unit === unitId) {
                    return {
                        ...item,
                        topics: item.topics.filter((_, i) => i !== topicIndex),
                    };
                }
                return item;
            })
        );
        toast.success("Topic deleted.");
    }

    // ----------------------------
    // Save Syllabus to DB
    // ----------------------------
    async function handleSave() {
        try {
            setLoading(true);
            const res = await axios.put(`/api/admin/subject/${subjectId}/syllabus`, {
                syllabus: syllabusList,
            });

            if (res.data.success) {
                toast.success("Syllabus updated successfully.");
                router.refresh();
            }
        } catch (error) {
            console.error(error);
            toast.error(error?.response?.data?.message || "Failed to update syllabus.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="space-y-8">
            <Toaster />

            {/* Add/Edit Unit Form */}
            <div className="border rounded-xl p-6 bg-main space-y-4">
                <h2 className="text-xl font-semibold">
                    {editingUnitId !== null ? "Edit Unit" : "Add Unit"}
                </h2>

                <Input
                    type="number"
                    placeholder="Unit Number"
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                />

                <Input
                    placeholder="Unit Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <div className="flex gap-3">
                    <Button onClick={handleAddUnit}>
                        {editingUnitId !== null ? "Update Unit" : "Add Unit"}
                    </Button>

                    {editingUnitId !== null && (
                        <Button variant="outline" onClick={resetForm}>
                            Cancel
                        </Button>
                    )}
                </div>
            </div>

            {/* Render Units */}
            {[...syllabusList]
                .sort((a, b) => a.unit - b.unit)
                .map((item) => {
                    const unitId = item.unit; // Ensure reliable identifier logic mapping

                    return (
                        <div key={unitId} className="border rounded-xl p-6 bg-main space-y-5">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h2 className="text-xl font-bold">Unit {item.unit}</h2>
                                    <p className="text-gray-500">{item.title}</p>
                                </div>

                                <div className="flex gap-2">
                                    <Button variant="outline" onClick={() => handleEdit(unitId)}>
                                        Edit
                                    </Button>
                                    <Button variant="destructive" onClick={() => handleDelete(unitId)}>
                                        Delete
                                    </Button>
                                </div>
                            </div>

                            {/* Topics Map */}
                            <div className="space-y-3">
                                {item.topics.map((topic, topicIndex) => {
                                    const isEditing =
                                        editingTopic?.unitId === unitId &&
                                        editingTopic?.topicIndex === topicIndex;

                                    return (
                                        <div
                                            key={topicIndex}
                                            className="flex justify-between items-center border rounded-lg px-4 py-3"
                                        >
                                            {isEditing ? (
                                                <Input
                                                    value={editingTopicValue}
                                                    onChange={(e) => setEditingTopicValue(e.target.value)}
                                                />
                                            ) : (
                                                <span>{topic}</span>
                                            )}

                                            <div className="flex gap-2">
                                                {isEditing ? (
                                                    <>
                                                        <Button size="sm" onClick={handleSaveTopic}>
                                                            Save
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            onClick={() => setEditingTopic(null)}
                                                        >
                                                            Cancel
                                                        </Button>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            onClick={() => {
                                                                setEditingTopic({ unitId, topicIndex });
                                                                setEditingTopicValue(topic);
                                                            }}
                                                        >
                                                            Edit
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            variant="destructive"
                                                            onClick={() => handleDeleteTopic(unitId, topicIndex)}
                                                        >
                                                            Delete
                                                        </Button>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Add Topic Field */}
                            <div className="flex gap-3">
                                <Input
                                    placeholder="New Topic"
                                    value={topicInputs[unitId] || ""}
                                    onChange={(e) =>
                                        setTopicInputs({
                                            ...topicInputs,
                                            [unitId]: e.target.value,
                                        })
                                    }
                                />
                                <Button onClick={() => handleAddTopic(unitId)}>
                                    Add Topic
                                </Button>
                            </div>
                        </div>
                    );
                })}

            {/* Save Syllabus Submit */}
            <div className="flex justify-end">
                <Button disabled={loading} onClick={handleSave}>
                    {loading ? "Saving..." : "Save Changes"}
                </Button>
            </div>
        </div>
    );
}