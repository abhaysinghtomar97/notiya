import { NextResponse } from "next/server";
import ConnectDb from "@/dbConfig/dbConfig";
import Notes from "@/models/Notes";

export async function POST(req) {

  await ConnectDb();

  const { subjectId, unit, title } = await req.json();

  let notes = await Notes.findOne({ subjectId });

  if (!notes) {

    notes = new Notes({

      subjectId,

      units: [],

      pyqs: []

    });

  }


  const existingUnit = notes.units.find(
  (u) => Number(u.unit) === Number(unit)
);

if (existingUnit) {
  return NextResponse.json(
    {
      success: false,
      message: `Unit ${unit} already exists.`,
    },
    { status: 409 }
  );
}

  notes.units.push({

    unit,

    title,

    resources: []

  });
  notes.units.sort((a,b)=>a.unit-b.unit);

  await notes.save();

  return NextResponse.json({
    success:true
  });

}