import { redirect } from "next/navigation";

import ArticleEditor from "@/components/admin/ArticleEditor";

export const metadata = { title: "New article | Notiya Admin", robots: { index: false, follow: false } };

export default async function NewUpdatePage() {
  
  return <ArticleEditor mode="new" />;
}
