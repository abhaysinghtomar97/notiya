import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import ArticleEditor from "@/components/admin/ArticleEditor";

export const metadata = { title: "New article | Notiya Admin", robots: { index: false, follow: false } };

export default async function NewUpdatePage() {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");
  return <ArticleEditor mode="new" />;
}
