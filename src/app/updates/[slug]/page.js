import { notFound } from "next/navigation";
import Link from "next/link";
import MarkdownContent from "@/components/MarkdownContent";
import { getPublishedUpdateBySlug, serializeUpdate } from "@/lib/updates";
import { absoluteUrl, SITE_NAME } from "@/lib/site";

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
    twitter: { card: article.coverImage ? "summary_large_image" : "summary", title, description, images: article.coverImage ? [article.coverImage] : [] },
  };
}

export default async function UpdateArticlePage({ params }) {
  const { slug } = await params;
  const raw = await getPublishedUpdateBySlug(slug).catch(() => null);
  if (!raw) notFound();
  const article = serializeUpdate(raw);
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
    <main className="article-page">
      <div className="article-shell">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link><span>/</span><Link href="/updates">Updates</Link><span>/</span><span aria-current="page">{article.title}</span>
        </nav>
        <article>
          <header className="article-header">
            <Link className="category-pill" href={`/updates/category/${encodeURIComponent(article.category.toLowerCase().replaceAll(" ", "-").replaceAll("&", "and"))}`}>{article.category}</Link>
            <h1>{article.title}</h1>
            <p className="article-excerpt">{article.excerpt}</p>
            <div className="article-byline">
              <span>By {article.author || "Notiya Editorial Team"}</span>
              {date && <span>Published <time dateTime={date.toISOString()}>{date.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</time></span>}
              {updated && date && updated > date && <span>Updated <time dateTime={updated.toISOString()}>{updated.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</time></span>}
            </div>
          </header>
          {article.coverImage && (
            // eslint-disable-next-line @next/next/no-img-element
            <img className="article-cover" src={article.coverImage} alt={article.title} />
          )}
          <div className="article-layout">
            <div className="article-body"><MarkdownContent content={article.content} /></div>
            <aside className="article-sidebar">
              <div className="sidebar-card">
                <strong>Before you act</strong>
                <p>Confirm dates, eligibility, fees and requirements with the official source linked in this article.</p>
              </div>
              {article.sources?.length > 0 && <div className="sidebar-card"><strong>Sources</strong><ul>{article.sources.map((s, i) => <li key={`${s.url}-${i}`}><a href={s.url} target="_blank" rel="noopener noreferrer">{s.label || "Official source"} ↗</a></li>)}</ul></div>}
            </aside>
          </div>
        </article>
        <footer className="article-footer"><Link href="/updates">← Back to all updates</Link></footer>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    </main>
  );
}
