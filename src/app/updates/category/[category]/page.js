import { notFound } from "next/navigation";
import Link from "next/link";
import UpdateCard from "@/components/UpdateCard";
import { getPublishedUpdates, serializeUpdate } from "@/lib/updates";
import { UPDATES_CATEGORIES, absoluteUrl } from "@/lib/site";

function categorySlug(value) {
  return value.toLowerCase().replaceAll(" ", "-").replaceAll("&", "and");
}

export async function generateMetadata({ params }) {
  const { category } = await params;
  const found = UPDATES_CATEGORIES.find((c) => categorySlug(c) === category);
  if (!found) return { title: "Category not found | Notiya", robots: { index: false, follow: true } };
  return {
    title: `${found} | Notiya Updates`,
    description: `Explore Notiya ${found.toLowerCase()} with useful context and links to reliable sources.`,
    alternates: { canonical: absoluteUrl(`/updates/category/${category}`) },
  };
}

export default async function CategoryPage({ params }) {
  const { category } = await params;
  const found = UPDATES_CATEGORIES.find((c) => categorySlug(c) === category);
  if (!found) notFound();
  const articles = (await getPublishedUpdates({ category: found, limit: 50 }).catch(() => [])).map(serializeUpdate);
  return (
    <main className="updates-container category-page">
      <nav className="breadcrumbs"><Link href="/updates">Updates</Link><span>/</span><span>{found}</span></nav>
      <div className="section-heading"><div><span className="eyebrow">BROWSE BY TOPIC</span><h1>{found}</h1><p>Helpful information, carefully organized for students.</p></div></div>
      {articles.length ? <div className="updates-grid">{articles.map((a) => <UpdateCard key={a._id} article={a} />)}</div> : <div className="empty-state"><h2>No published articles yet</h2><p>We’ll add useful resources here as they’re ready.</p></div>}
    </main>
  );
}
