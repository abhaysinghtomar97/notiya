import { NextResponse } from "next/server";

import slugify from "slugify";

import ConnectDb from "@/dbConfig/dbConfig";
import Subject from "@/models/Subject";


export async function PUT(request, { params }) {
  const { id } = await params;

  await ConnectDb();

  const body = await request.json();

  body.slug = slugify(body.subjectName, {
    lower: true,
    strict: true,
  });

  body.path =
    body.course === "btech"
      ? `${body.university}/${body.course}/${body.year}/${body.branch}/${body.slug}`
      : `${body.university}/${body.course}/${body.year}/${body.slug}`;

  const updated = await Subject.findByIdAndUpdate(id, body, {
  returnDocument: "after",
  runValidators: true,
});

  return NextResponse.json({
    success: true,
    subject: updated,
  });
}  