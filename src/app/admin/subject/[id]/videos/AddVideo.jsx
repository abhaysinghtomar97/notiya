"use client";

import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export default function AddVideo({ subjectId, videos }) {
    const router = useRouter();

    const [videoList, setVideoList] = useState(videos || []);

    const [title, setTitle] = useState("");
    const [youtubeId, setYoutubeId] = useState("");
    const [unit, setUnit] = useState("");

    const [editingIndex, setEditingIndex] = useState(null);

    const [loading, setLoading] = useState(false);

    // --------------------------
    // Reset Form
    // --------------------------

    function resetForm() {
        setTitle("");
        setYoutubeId("");
        setUnit("");
        setEditingIndex(null);
    }

    // --------------------------
    // Add / Update Video
    // --------------------------

    function handleAddVideo() {
        if (!title.trim()) {
            return toast.error("Video title is required.");
        }

        if (!youtubeId.trim()) {
            return toast.error("YouTube ID is required.");
        }

        if (!unit) {
            return toast.error("Please select a unit.");
        }

        // Prevent duplicate YouTube videos
        const alreadyExists = videoList.some(
            (video, index) =>
                video.youtubeId.trim().toLowerCase() ===
                youtubeId.trim().toLowerCase() &&
                index !== editingIndex
        );

        if (alreadyExists) {
            return toast.error("This video already exists.");
        }


        const extractedId = extractYoutubeId(youtubeId);
        setYoutubeId(extractedId)
        const newVideo = {
            title: title.trim(),
            youtubeId: extractedId,
            unit: Number(unit),
        };

        if (editingIndex !== null) {
            const updatedVideos = [...videoList];
            updatedVideos[editingIndex] = newVideo;

            setVideoList(updatedVideos);

            toast.success("Video updated.");
        } else {
            setVideoList((prev) => [...prev, newVideo]);

            toast.success("Video added.");
        }

        resetForm();
    }

    // --------------------------
    // Edit Video
    // --------------------------

    function handleEdit(index) {
        const video = videoList[index];

        setTitle(video.title);
        setYoutubeId(video.youtubeId);
        setUnit(video.unit);

        setEditingIndex(index);
    }

    // --------------------------
    // Delete Video
    // --------------------------

    function handleDelete(index) {
        const updated = [...videoList];

        updated.splice(index, 1);

        setVideoList(updated);

        if (editingIndex === index) {
            resetForm();
        }

        toast.success("Video removed.");
    }

    // --------------------------
    // Save Videos
    // --------------------------

    async function handleSave() {
        try {
            setLoading(true);

            const res = await axios.put(
                `/api/admin/subject/${subjectId}/videos`,
                {
                    videos: videoList,
                }
            );

            if (res.data.success) {
                toast.success("Videos saved successfully.");

                router.refresh();
            }
        } catch (error) {
            console.error(error);

            toast.error(
                error?.response?.data?.message ||
                "Failed to save videos."
            );
        } finally {
            setLoading(false);
        }
    }

    function extractYoutubeId(value) {
        if (!value) return "";

        if (value.includes("youtu.be/")) {
            return value.split("youtu.be/")[1].split("?")[0];
        }

        if (value.includes("watch?v=")) {
            return value.split("watch?v=")[1].split("&")[0];
        }

        return value.trim();
    }

    return (
        <div className="space-y-8">
            <Toaster />

            {/* Form */}

            <div className="border rounded-xl p-6 bg-main space-y-4">

                <h2 className="text-xl font-semibold">
                    {editingIndex !== null ? "Edit Video" : "Add New Video"}
                </h2>

                <Input
                    placeholder="Video Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <Input
                    placeholder="YouTube Video ID"
                    value={youtubeId}
                    onChange={(e) => setYoutubeId(e.target.value)}
                />

                <Input
                    type="number"
                    min={1}
                    placeholder="Unit Number"
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                />

                {/* Live Preview */}

                {youtubeId && (
                    <div className="rounded-xl overflow-hidden border">

                        <iframe
                            width="100%"
                            height="300"
                            src={`https://www.youtube.com/embed/${extractYoutubeId(youtubeId)}`}
                            title="YouTube Preview"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />

                    </div>
                )}

                <div className="flex gap-3">

                    <Button
                        onClick={handleAddVideo}
                    >
                        {editingIndex !== null ? "Update Video" : "Add Video"}
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

            {/* Video List */}

            <div className="space-y-4">

                <h2 className="text-xl font-semibold">
                    Subject Videos
                </h2>

                {videoList.length === 0 ? (

                    <div className="border rounded-xl p-6 text-center text-gray-500">
                        No videos added yet.
                    </div>

                ) : (

                    videoList
                        .sort((a, b) => a.unit - b.unit)
                        .map((video, index) => (

                            <div
                                key={index}
                                className="border rounded-xl p-5 bg-main flex justify-between items-center"
                            >

                                <div>
                                    

                                    
<Image
    src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
    alt={video.title}
    width={320}
    height={180}
    className="rounded-lg object-cover"
/>

                                    <h3 className="font-semibold text-lg">
                                        {video.title}
                                    </h3>

                                    <p className="text-sm text-gray-500">
                                        Unit {video.unit}
                                    </p>

                                    <p className="text-xs text-gray-400 mt-1">
                                        {video.youtubeId}
                                    </p>

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
                    {loading ? "Saving..." : "Save Changes"}
                </Button>

            </div>

        </div>
    );
}