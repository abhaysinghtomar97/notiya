"use client";

import axios from "axios";
import { useState } from "react";
import toast, {Toaster} from "react-hot-toast";

export default function AddUnit({ subjectId }) {

  const [unit, setUnit] = useState(1);

  const [title, setTitle] = useState("");

  async function submit() {

    try {

      await axios.post("/api/admin/unit", {

        subjectId,

        unit,

        title

      });

      toast.success(`Unit ${unit} ${title} Added`);

      location.reload();

    }

    catch(error) {

      toast.error(error.message);
      

    }

  }

  return (

    <div className="border rounded-xl p-6">
        <Toaster />
      <h2 className="font-bold text-xl mb-5">

        Add New Unit

      </h2>

      <input
        type="number"
        value={unit}
        onChange={(e)=>setUnit(e.target.value)}
        className="border p-3 rounded w-full mb-4"
        placeholder="Unit Number"
      />

      <input
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
        className="border p-3 rounded w-full mb-5"
        placeholder="Title"
      />

      <button
        onClick={submit}
        className="bg-blue-600 text-white px-6 py-2 rounded"
      >
        Add Unit
      </button>

    </div>

  );

}