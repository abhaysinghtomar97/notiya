
import Link from "next/link";
import {
  ArrowRight,
  BellRing,
  CalendarDays,
  ChevronRight,
  Newspaper,
} from "lucide-react";

function formatDate(date) {
  if (!date) return null;

  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return null;

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(parsed);
}

export default function RecentUpdatesSidebar({
  posts = [],
  title = "Latest Updates",
  description = "News, guides and announcements from Notiya.",
  limit = 5,
  viewAllHref = "/updates",
  postBasePath = "/updates",
  showViewAll = true,
  compact = false,
  className = "",
}) {
  const visiblePosts = posts
    .filter(
      (post) =>
        post &&
        typeof post.slug === "string" &&
        post.slug.trim() &&
        typeof post.title === "string" &&
        post.title.trim()
    )
    .slice(0, Math.max(0, limit));

  return (
    <aside
      aria-labelledby="recent-updates-heading"
      className={`h-fit overflow-hidden rounded-2xl border border-border bg-card shadow-sm ${className}`}
    >
      {/* Header */}
      <div className="relative overflow-hidden border-b border-border bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-transparent p-5">
        <div
          aria-hidden="true"
          className="absolute -right-8 -top-10 h-32 w-32 rounded-full bg-amber-400/10 blur-2xl"
        />

        <div className="relative flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-amber-500/20 bg-background text-amber-700 shadow-sm dark:text-amber-300">
            <Newspaper size={21} />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2
                id="recent-updates-heading"
                className="text-lg font-bold tracking-tight"
              >
                {title}
              </h2>

              {visiblePosts.length > 0 && (
                <span className="rounded-full bg-amber-500/15 px-2 py-0.5 text-[11px] font-semibold text-amber-800 dark:text-amber-300">
                  {visiblePosts.length} new
                </span>
              )}
            </div>

            <p className="mt-1 text-sm leading-5 text-muted-foreground">
              {description}
            </p>
          </div>
        </div>
      </div>

      {/* Posts */}
      {visiblePosts.length > 0 ? (
        <div className={compact ? "p-3" : "p-4"}>
          <div className="space-y-2">
            {visiblePosts.map((post, index) => {
              const date = formatDate(post.publishedAt);
              const href = `${postBasePath.replace(/\/$/, "")}/${encodeURIComponent(post.slug)}`;

              return (
                <article
                  key={String(post._id ?? post.slug)}
                  className="group relative rounded-xl border border-transparent p-3 transition-all duration-200 hover:border-amber-500/20 hover:bg-amber-500/[0.04]"
                >
                  <Link
                    href={href}
                    className="block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-colors group-hover:bg-amber-500/10 group-hover:text-amber-700 dark:group-hover:text-amber-300">
                        {index === 0 ? (
                          <BellRing size={17} />
                        ) : (
                          <Newspaper size={17} />
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        {post.category && (
                          <span className="mb-1.5 inline-block max-w-full truncate rounded-md bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                            {post.category}
                          </span>
                        )}

                        <h3 className="text-sm font-semibold leading-5 text-foreground transition-colors group-hover:text-amber-700 dark:group-hover:text-amber-300">
                          {post.title}
                        </h3>

                        {!compact &&
                          typeof post.excerpt === "string" &&
                          post.excerpt.trim() && (
                            <p className="mt-1.5 line-clamp-2 text-xs leading-5 text-muted-foreground">
                              {post.excerpt.trim()}
                            </p>
                          )}

                        {date && (
                          <p className="mt-2 flex items-center gap-1.5 text-[11px] text-muted-foreground">
                            <CalendarDays size={12} />
                            <time dateTime={post.publishedAt}>
                              {date}
                            </time>
                          </p>
                        )}
                      </div>

                      <ChevronRight
                        size={16}
                        className="mt-1 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-amber-600"
                        aria-hidden="true"
                      />
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="px-5 py-8 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
            <Newspaper size={22} />
          </div>

          <h3 className="mt-3 text-sm font-semibold">
            No updates yet
          </h3>

          <p className="mx-auto mt-1 max-w-xs text-xs leading-5 text-muted-foreground">
            New announcements and study guides will appear here when published.
          </p>
        </div>
      )}

      {/* Footer */}
      {showViewAll && (
        <div className="border-t border-border p-4">
          <Link
            href={viewAllHref}
            className="flex items-center justify-between gap-3 rounded-xl bg-muted/60 px-4 py-3 text-sm font-semibold transition-colors hover:bg-amber-500/10 hover:text-amber-800 dark:hover:text-amber-300"
          >
            <span>View all updates</span>
            <ArrowRight
              size={17}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      )}
    </aside>
  );
}
