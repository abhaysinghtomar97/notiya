import ConnectDb from "@/dbConfig/dbConfig";
import LatestUpdate from "@/models/LatestUpdates";
import Link from "next/link";

export default async function LatestUpdates({ university }) {
  try {
    await ConnectDb();

  var updates = await LatestUpdate.find({
    university,
  })
    .sort({ date: -1 })
    .limit(10)
    .lean();

    
  } catch (error) {
    console.log(error)
  }
  return (
    <div className="divide-y">
      {updates.map((update) => (
        <Link
          key={update._id.toString()}
          href={update.link}
          target="_blank"
          className="block px-5 py-4 hover:bg-muted/40 transition"
        >
          <p className="font-medium line-clamp-2">
            {update.title}
          </p>

          <p className="text-xs text-muted-foreground mt-2">
            {new Date(update.date).toLocaleDateString("en-IN")}
          </p>
        </Link>
      ))}
    </div>
  );
}