import Link from "next/link";
import { getPublishedUpdates } from "@/lib/updates";

export default async function LatestUpdatesTicker() {
  let updates = [];

  try {
    updates = await getPublishedUpdates({ limit: 10 });
  } catch (error) {
    console.error("Failed to load latest updates:", error);
  }

  if (!updates?.length) return null;

  return (
    <section
      aria-label="Latest updates"
      className="flex w-full  items-center gap-2 overflow-hidden border-b border-amber-100 bg-white px-3 py-2 sm:gap-4 sm:px-5"
    >
      <div className="flex shrink-0 items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide text-amber-700 sm:text-xs">
        <span className="h-2 w-2 animate-pulse rounded-full bg-amber-500" />
        Latest
      </div>

      <div className="flex min-w-0 flex-1 gap-3 overflow-x-auto [scrollbar-none] [&::-webkit-scrollbar]:hidden">
        {updates.map((update) => (
          <Link
            key={update._id?.toString() || update.slug}
            href={`/updates/${update.slug}`}
            className="flex shrink-0 items-center gap-2 whitespace-nowrap text-xs text-slate-700 transition-colors hover:text-amber-700 sm:text-sm"
          >
            <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[9px] font-bold text-amber-800">
              NEW
            </span>
            <span>{update.title}</span>
            <span className="text-amber-500">•</span>
          </Link>
        ))}
      </div>

      <Link
        href="/updates"
        className="flex shrink-0 items-center gap-1 text-[10px] font-semibold text-amber-700 hover:text-amber-900 sm:text-xs"
      >
        All <span aria-hidden="true">→</span>
      </Link>
    </section>
  );
}