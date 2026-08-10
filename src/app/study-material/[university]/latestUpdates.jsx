import ConnectDb from "@/dbConfig/dbConfig";
import LatestUpdate from "@/models/LatestUpdates";
import Link from "next/link";
import axios from "axios";

export default async function LatestUpdates({ university }) {
  let updates = [];

  try {
    await ConnectDb();
    const aktu = await axios.get('https://notesgallery.com/wp-json/aktu/v1/notices')
    //extract data from aktu only recent 20 records according to date 
    updates = aktu.data.slice(0, 20);

  } catch (error) {
    console.error(`❌ Error fetching updates for ${university}:`, error.message);
  
    return (
      <div className="p-5 text-sm text-red-500 bg-red-50/50">
        Unable to load the latest circulars at this time. Please try again later.
      </div>
    );
  }

  

  

 if(university == "aktu") {
    if (updates.length === 0) {
    return (
      <div className="p-5 text-sm text-muted-foreground text-center">
        No recent updates found for {university}.
      </div>
    );
  }
     return (
    <div className="divide-y border-t border-b">
      {updates.map((update,idx) => (
        <Link
          key={idx}
          href={update.url } 
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
}