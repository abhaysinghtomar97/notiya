import Link from "next/link";
import UpdateCard from "@/components/UpdateCard";
import { getPublishedUpdates, serializeUpdate } from "@/lib/updates";
import { UPDATES_CATEGORIES, absoluteUrl } from "@/lib/site";

export const revalidate = 300;

export const metadata = {
  title: "Updates: Jobs, Internships, University News & Skills",
  description: "Explore useful student updates from Notiya: verified opportunities, university information, scholarships, skills and career guides.",
  alternates: { canonical: absoluteUrl("/updates") },
  openGraph: {
    title: "Notiya Updates",
    description: "Student opportunities, university updates and practical career guidance.",
    url: absoluteUrl("/updates"),
    type: "website",
  },
};

export default async function UpdatesPage() {
  let articles = [];
  let failed = false;
  try {
    articles = (await getPublishedUpdates({ limit: 30 })).map(serializeUpdate);
  } catch (error) {
    console.error("Unable to load Updates:", error.message);
    failed = true;
  }

  return (
    <main className="updates-page">
      <section className="updates-hero">
        <div className="updates-hero-inner">
          <span className="eyebrow">NOTIYA • LEARN. PREPARE. GROW.</span>
          <h1>Updates that move your future forward.</h1>
          <p>Useful opportunities, university updates, and practical guides for students building their next step.</p>
          <div className="hero-actions">
            <a href="#latest-updates" className="button button-primary">Explore latest updates</a>
            <Link href="/study-material" className="button button-secondary">Explore study material</Link>
          </div>
        </div>
      </section>

      <section className="updates-container category-row" aria-label="Update categories">
        {UPDATES_CATEGORIES.map((category) => (
          <Link key={category} className="category-link" href={`/updates/category/${encodeURIComponent(category.toLowerCase().replaceAll(" ", "-").replaceAll("&", "and"))}`}>
            {category}<span aria-hidden="true"> ↗</span>
          </Link>
        ))}
      </section>

      <section className="updates-container updates-content" id="latest-updates">
        <div className="section-heading">
          <div>
            <span className="eyebrow">THE LATEST</span>
            <h2>Latest updates</h2>
            <p>Research-backed information and actionable next steps.</p>
          </div>
        </div>
        {failed ? (
          <div className="empty-state"><h3>Updates are temporarily unavailable</h3><p>Please try again shortly.</p></div>
        ) : articles.length ? (
          <div className="updates-grid">{articles.map((article) => <UpdateCard key={article._id} article={article} />)}</div>
        ) : (
          <div className="empty-state">
            <h3>New updates are on the way</h3>
            <p>We’re preparing useful guides and opportunities for students. Check back soon.</p>
          </div>
        )}
      </section>
      <section className="updates-container editorial-note">
        <h2>Information you can act on</h2>
        <p>We aim to explain what an opportunity means, who may be eligible, what to prepare, and where to verify the details. Always check the official source before applying.</p>
      </section>
    </main>
  );
}
