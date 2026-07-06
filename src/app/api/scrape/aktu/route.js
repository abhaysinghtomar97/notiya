import { NextResponse } from "next/server";
import ConnectDb from "@/dbConfig/dbConfig";
import LatestUpdate from "@/models/LatestUpdates";
import { scrapeAktu } from "@/lib/scraper/aktu";

export async function GET() {
  try {
    await ConnectDb();

    const notices = await scrapeAktu();

    let inserted = 0;

    for (const notice of notices) {
      const result = await LatestUpdate.updateOne(
        { link: notice.link },
        {
          $setOnInsert: notice,
        },
        {
          upsert: true,
        }
      );

      if (result.upsertedCount > 0) {
        inserted++;
      }
    }

    return NextResponse.json({
      success: true,
      total: notices.length,
      inserted,
    });
  } catch (error) {
    console.error(error);

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