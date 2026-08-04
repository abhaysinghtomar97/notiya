import ConnectDb from "@/dbConfig/dbConfig";
import LatestUpdate from "@/models/LatestUpdates";
import Link from "next/link";

export default async function LatestUpdates({ university }) {
  let updates = [];

  try {
    await ConnectDb();

    // Fetch the 10 most recent updates based on the university code
    updates = await LatestUpdate.find({ 
      university: university.toUpperCase() 
    })
      .sort({ date: -1 })
      .limit(10)
      .lean();
      console.log(`✅ Fetched ${updates.length} updates for ${university}`);

  } catch (error) {
    console.error(`❌ Error fetching updates for ${university}:`, error.message);
    
    // Graceful error state (prevents the whole page from crashing)
    return (
      <div className="p-5 text-sm text-red-500 bg-red-50/50">
        Unable to load the latest circulars at this time. Please try again later.
      </div>
    );
  }

  // Graceful empty state
  if (updates.length === 0) {
    return (
      <div className="p-5 text-sm text-muted-foreground text-center">
        No recent updates found for {university}.
      </div>
    );
  }

  return (
    <div className="divide-y border-t border-b">
      {updates.map((update) => (
        <Link
          key={update._id.toString()}
          href={update.url || update.link || "#"} // Fallback handles both schema styles
          target="_blank"
          rel="noopener noreferrer"
          className="block px-5 py-4 hover:bg-muted/40 transition group"
        >
          <p className="font-medium line-clamp-2 group-hover:text-primary transition-colors">
            {update.title}
          </p>

          <p className="text-xs text-muted-foreground mt-2">
            {update.date
              ? new Date(update.date).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })
              : "Recent Notice"}
          </p>
        </Link>
      ))}
    </div>
  );
}