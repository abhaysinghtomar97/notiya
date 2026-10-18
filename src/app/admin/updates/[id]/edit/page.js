import { notFound, redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import ConnectDB from "@/dbConfig/dbConfig";
import Update from "@/models/Update";
import ArticleEditor from "@/components/admin/ArticleEditor";

export const dynamic = "force-dynamic";
export const metadata = { title: "Edit article | Notiya Admin", robots: { index: false, follow: false } };

export default async function EditUpdatePage({ params }) {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");
  const { id } = await params;
  await ConnectDB();
  const doc = await Update.findById(id).lean(); 
  if (!doc) notFound();
  const article = { ...doc, _id: String(doc._id), publishedAt: doc.publishedAt?.toISOString?.() || null, updatedAt: doc.updatedAt?.toISOString?.() || null };
  return <ArticleEditor mode="edit" initialArticle={article} />;
}
 