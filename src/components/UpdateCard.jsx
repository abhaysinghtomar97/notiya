import Link from "next/link";
import ShareButtons from "./ShareButtons";

export default function UpdateCard({ article }) {
  const date = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
    : "";
  return (
    <article className="update-card">
      {article.coverImage ? (
        <Link href={`/updates/${article.slug}`} className="update-card-image-link" aria-label={`Read ${article.title}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="update-card-image" src={article.coverImage} alt="" loading="lazy" />
        </Link>
      ) : (
        <div className="update-card-placeholder" aria-hidden="true">N</div>
      )}
      <div className="update-card-body">
        <span className="category-pill">{article.category}</span>
        <h2><Link href={`/updates/${article.slug}`}>{article.title}</Link></h2>
        <p>{article.excerpt}</p>
        <div className="update-card-meta">
          <span>{article.author || "Notiya Editorial Team"}</span>
          {date && <><span aria-hidden="true">·</span><time dateTime={article.publishedAt}>{date}</time></>}
        </div>
        <Link className="text-link" href={`/updates/${article.slug}`}>Read article <span aria-hidden="true">→</span></Link>
      <ShareButtons url={`https://notiya.com/updates/${article.slug}`} title={article.title} className="update-card-share" />
      </div>
    </article>
  );
}
