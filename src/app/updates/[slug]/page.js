import { notFound } from "next/navigation";
import Link from "next/link";
import MarkdownContent from "@/components/MarkdownContent";
import { 
  getPublishedUpdateBySlug, 
  serializeUpdate,
  getRecentUpdates,
  getAdjacentUpdates
} from "@/lib/updates";
import { absoluteUrl, SITE_NAME } from "@/lib/site";
import ShareButtons from "@/components/ShareButtons";

export const revalidate = 300;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const raw = await getPublishedUpdateBySlug(slug).catch(() => null);
  if (!raw) return { title: "Update not found | Notiya", robots: { index: false, follow: false } };
  
  const article = serializeUpdate(raw);
  const title = article.seoTitle || article.title;
  const description = article.seoDescription || article.excerpt;
  const url = absoluteUrl(`/updates/${article.slug}`);
  
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title,
      description,
      url,
      publishedTime: article.publishedAt || undefined,
      modifiedTime: article.updatedAt || undefined,
      authors: [article.author || "Notiya Editorial Team"],
      images: article.coverImage ? [{ url: article.coverImage, alt: article.title }] : [],
    },
    twitter: { 
      card: article.coverImage ? "summary_large_image" : "summary", 
      title, 
      description, 
      images: article.coverImage ? [article.coverImage] : [] 
    },
  };
}

export default async function UpdateArticlePage({ params }) {
  const { slug } = await params;
  
  // 1. Fetch current article
  const raw = await getPublishedUpdateBySlug(slug).catch(() => null);
  if (!raw) notFound();
  const article = serializeUpdate(raw);
  
  // 2. Concurrently fetch Sidebar data & Prev/Next navigation data
  const [recentUpdates, { prev, next }] = await Promise.all([
    getRecentUpdates(3, slug), // Fetch 3 recent posts, exclude current slug
    getAdjacentUpdates(article.publishedAt) // Fetch prev/next based on date
  ]);

  const canonical = absoluteUrl(`/updates/${article.slug}`);
  const date = article.publishedAt ? new Date(article.publishedAt) : null;
  const updated = article.updatedAt ? new Date(article.updatedAt) : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.seoDescription || article.excerpt,
    image: article.coverImage ? [article.coverImage] : undefined,
    datePublished: date?.toISOString(),
    dateModified: updated?.toISOString(),
    author: { "@type": "Organization", name: article.author || "Notiya Editorial Team", url: absoluteUrl("/about") },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: absoluteUrl("/"),
      logo: { "@type": "ImageObject", url: absoluteUrl("/logo.png") },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
    articleSection: article.category,
    keywords: article.tags?.join(", "),
  };

  return (
    <main className="article-page bg-slate-50/50 dark:bg-background pb-16">
      <div className="article-shell max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <nav className="breadcrumbs py-6 flex gap-2 text-sm text-foreground/60" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-amber-600 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/updates" className="hover:text-amber-600 transition-colors">Updates</Link>
          <span>/</span>
          <span aria-current="page" className="truncate text-foreground font-medium">{article.title}</span>
        </nav>

        {/* Article Header */}
        <article>
          <header className="article-header max-w-4xl mx-auto text-center mb-10">
            <Link 
              className="inline-block bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 hover:bg-amber-200 transition-colors" 
              href={`/updates/category/${encodeURIComponent(article.category.toLowerCase().replaceAll(" ", "-").replaceAll("&", "and"))}`}
            >
              {article.category}
            </Link>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight mb-4">
              {article.title}
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-6 max-w-2xl mx-auto">
              {article.excerpt}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-slate-500 font-medium">
              <span className="flex items-center gap-1.5">
                <span className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center text-white text-xs">N</span>
                By {article.author || "Notiya Editorial Team"}
              </span>
              {date && <span>• {date.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</span>}
              {updated && date && updated > date && <span className="italic">• Updated {updated.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</span>}
            </div>
            <ShareButtons title={article.title} url={canonical} />
          </header>

          {/* Cover Image */}
          {article.coverImage && (
            <div className="w-full max-w-5xl mx-auto mb-10 rounded-2xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-800">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="w-full h-auto object-cover aspect-[16/9]" src={article.coverImage} alt={article.title} />
            </div>
          )}

          {/* Main Layout Grid */}
          <div className="mt-8 flex flex-col lg:flex-row gap-10 items-start w-full">
            
            {/* LEFT SIDEBAR (Sticky & Attractive) */}
            <aside className="w-full lg:w-[320px] shrink-0 lg:sticky lg:top-24 flex flex-col gap-6 order-2 lg:order-1">
              
              {/* Recent Updates Card */}
              {recentUpdates && recentUpdates.length > 0 && (
                <div className="bg-gradient-to-br from-amber-50/80 to-white dark:from-amber-950/20 dark:to-background border border-amber-200/60 dark:border-amber-900/50 rounded-2xl p-6 shadow-sm backdrop-blur-sm">
                  <h3 className="text-base font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2 pb-3 border-b border-amber-100 dark:border-amber-900/50">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600">
                      <path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                    </svg>
                    Recent Updates
                  </h3>
                  <ul className="space-y-4">
                    {recentUpdates.map((update) => (
                      <li key={update._id} className="group">
                        <Link href={`/updates/${update.slug}`} className="block">
                          <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-amber-700 dark:group-hover:text-amber-500 transition-colors line-clamp-2">
                            {update.title}
                          </h4>
                          <p className="text-[11px] text-foreground/50 mt-1.5 font-medium">
                            {new Date(update.publishedAt).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}
                          </p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Official Sources Card */}
              {article.sources?.length > 0 && (
                <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                  <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400">
                      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                    </svg>
                    Official Sources
                  </h3>
                  <ul className="space-y-2.5">
                    {article.sources.map((s, i) => (
                      <li key={`${s.url}-${i}`}>
                        <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-sm text-slate-600 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors flex items-center justify-between group">
                          <span className="truncate pr-2">{s.label || "Official source"}</span>
                          <span className="opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Disclaimer Card */}
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                <strong className="block text-sm text-slate-800 dark:text-slate-200 mb-1">Before you act</strong>
                <p className="text-xs text-slate-500 leading-relaxed">Confirm dates, eligibility, fees and requirements with the official source linked in this article.</p>
              </div>
            </aside>

            {/* MAIN CONTENT (Right Side) */}
            <div className="flex-1 min-w-0 order-1 lg:order-2 bg-white dark:bg-slate-950 rounded-3xl sm:border border-slate-200 dark:border-slate-800 sm:shadow-sm p-5 sm:p-8 lg:p-12">
              <div className="prose dark:prose-invert prose-amber max-w-none prose-headings:font-bold prose-a:text-amber-600 hover:prose-a:text-amber-700">
                <MarkdownContent content={article.content} />
              </div>
              
              {/* Prev / Next Navigation Footer */}
              <div className="mt-16 flex flex-col sm:flex-row justify-between gap-4 border-t border-slate-200 dark:border-slate-800 pt-8">
                {/* Previous Post (Older) */}
                {prev ? (
                  <Link href={`/updates/${prev.slug}`} className="group flex flex-col w-full sm:w-1/2 text-left hover:bg-amber-50/50 dark:hover:bg-amber-950/20 p-4 rounded-xl transition-all border border-transparent hover:border-amber-200">
                    <span className="text-[10px] text-foreground/60 uppercase font-bold tracking-wider mb-1.5 flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:-translate-x-1"><path d="m15 18-6-6 6-6"/></svg> 
                      Previous Post
                    </span>
                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-200 group-hover:text-amber-700 line-clamp-2">{prev.title}</span>
                  </Link>
                ) : (
                  <div className="w-full sm:w-1/2"></div> /* Empty div to keep Next post on the right */
                )}
                
                {/* Next Post (Newer) */}
                {next ? (
                  <Link href={`/updates/${next.slug}`} className="group flex flex-col w-full sm:w-1/2 text-right hover:bg-amber-50/50 dark:hover:bg-amber-950/20 p-4 rounded-xl transition-all border border-transparent hover:border-amber-200">
                    <span className="text-[10px] text-foreground/60 uppercase font-bold tracking-wider mb-1.5 flex items-center justify-end gap-1">
                      Next Post
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1"><path d="m9 18 6-6-6-6"/></svg>
                    </span>
                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-200 group-hover:text-amber-700 line-clamp-2">{next.title}</span>
                  </Link>
                ) : (
                  <div className="w-full sm:w-1/2"></div>
                )}
              </div>
            </div>
          </div>
        </article>
          <ShareButtons title={article.title} url={canonical} />  
      </div>
      
      {/* JSON-LD Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    </main>
  );
}