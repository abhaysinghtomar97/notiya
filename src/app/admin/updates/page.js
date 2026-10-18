import { redirect } from "next/navigation";
import Link from "next/link";
import ConnectDB from "@/dbConfig/dbConfig";
import Update from "@/models/Update";


export const dynamic = "force-dynamic";

export default async function AdminUpdatesPage() {
  
  await ConnectDB();
  const docs = await Update.find({}).sort({ updatedAt: -1 }).limit(200).select("title slug status category updatedAt").lean();
  return (
    <main className="admin-page">
     
      <section className="admin-content">
        <div className="admin-heading"><div><span className="eyebrow">PUBLISHING WORKSPACE</span><h1>Updates dashboard</h1><p>Draft, review and publish useful student resources.</p></div><Link className="button button-primary" href="/admin/updates/new">＋ New article</Link></div>
        <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Article</th><th>Category</th><th>Status</th><th>Last updated</th><th></th></tr></thead><tbody>
          {docs.map((doc) => <tr key={String(doc._id)}><td><strong>{doc.title}</strong><small>/{doc.slug}</small></td><td>{doc.category}</td><td><span className={`status-pill status-${doc.status}`}>{doc.status}</span></td><td>{doc.updatedAt ? new Date(doc.updatedAt).toLocaleDateString("en-IN") : "—"}</td><td><Link className="text-link" href={`/admin/updates/${doc._id}/edit`}>Edit →</Link></td></tr>)}
        </tbody></table>{!docs.length && <div className="empty-state"><h2>No articles yet</h2><p>Create a draft to get started.</p></div>}</div>
      </section>
    </main>
  );
}
