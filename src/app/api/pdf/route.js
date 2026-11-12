// app/api/pdf/route.js
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const driveId = searchParams.get("driveId");
  const url = searchParams.get("url");

  // Convert driveId into a direct download stream URL
  const targetUrl = driveId
    ? `https://drive.google.com/uc?export=download&id=${driveId}`
    : url;

  if (!targetUrl) {
    return NextResponse.json({ error: "Missing PDF source" }, { status: 400 });
  }

  try {
    const response = await fetch(targetUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch PDF: ${response.status}`);
    }

    return new NextResponse(response.body, {
      headers: {
        "Content-Type": "application/pdf",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}