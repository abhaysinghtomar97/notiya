import { NextResponse } from "next/server";

import ConnectDb from "@/dbConfig/dbConfig";
import LatestUpdate from "@/models/LatestUpdates";
import { scrapeAktu } from "@/lib/scraper/aktu";

export async function GET() {
  try {
    await ConnectDb();

    // Scrape latest notices
    const notices = await scrapeAktu();

    // Latest notice already stored in MongoDB
    const latestNotice = await LatestUpdate.findOne({
      university: "aktu",
    })
      .sort({ date: -1 })
      .lean();

    const latestLink = latestNotice?.link;

    // First import
    if (!latestLink) {
      await LatestUpdate.insertMany(notices);

      return NextResponse.json({
        success: true,
        firstImport: true,
        inserted: notices.length,
      });
    }

    let checked = 0;
    const newNotices = [];

    for (const notice of notices) {
      checked++;

      // Stop once we reach the latest stored notice
      if (notice.link === latestLink) {
        console.log("Reached latest stored notice.");
        break;
      }

      newNotices.push(notice);
    }

    // Bulk insert only new notices
    if (newNotices.length > 0) {
      await LatestUpdate.insertMany(newNotices);
    }

    return NextResponse.json({
      success: true,
      totalScraped: notices.length,
      checked,
      inserted: newNotices.length,
      message:
        newNotices.length === 0
          ? "No new notices found."
          : `${newNotices.length} new notices added.`,
    });
  } catch (error) {
    console.error("Scraper Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}