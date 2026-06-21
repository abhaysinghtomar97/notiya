"use client";

import axios from "axios";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function AddResource({
    subjectId,
    unitId
}) {

    const [title, setTitle] = useState("");

    const [driveId, setDriveId] = useState("");

    const [type, setType] = useState("notes");

    async function submit() {

        try {

            await axios.post(
                "/api/admin/unit/resource",
                {
                    subjectId,
                    unitId,
                    title,
                    driveId,
                    type
                }
            );

            toast.success("Uploaded");

            location.reload();

        } catch (e) {

            toast.error(
                e.response?.data?.message || "Error"
            );

        }

    }

    return (

        <div className="border rounded-xl p-6">
            <Toaster />

            <h2 className="font-bold text-xl mb-5">

                Add Resource

            </h2>

            <input
                className="border p-3 rounded w-full mb-4"
                placeholder="Title"
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
            />

            <select
                className="border p-3 rounded w-full mb-4"
                value={type}
                onChange={(e)=>setType(e.target.value)}
            >

                <option value="notes">Notes</option>

                <option value="assignment">Assignment</option>

                <option value="lab">Lab File</option>

                <option value="ppt">PPT</option>

                <option value="book">Book</option>

                <option value="other">Other</option>

            </select>

            <input
                className="border p-3 rounded w-full mb-5"
                placeholder="Google Drive File  URL or ID"
                value={driveId}
                onChange={(e)=>setDriveId(e.target.value)}
            />

            <button
                onClick={submit}
                className="bg-blue-600 hover:bg-blue-900 active:bg-green-600 cursor-pointer text-white px-6 py-3 rounded-lg"
            >
                Save
            </button>

        </div>

    );

}