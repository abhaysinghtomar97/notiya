import ConnectDB from "@/dbConfig/dbConfig";
import Update from "@/models/Update";

export async function getPublishedUpdates({ limit = 24, category } = {}) {
  await ConnectDB();
  const query = { status: "published" };
  if (category) query.category = category;
  return Update.find(query)
    .sort({ publishedAt: -1, _id: -1 })
    .limit(limit)
    .select("title slug excerpt coverImage category tags author publishedAt updatedAt")
    .lean();
}

export async function getPublishedUpdateBySlug(slug) {
  await ConnectDB();
  return Update.findOne({ slug, status: "published" }).lean();
}

export function serializeUpdate(doc) {
  if (!doc) return null;
  return {
    ...doc,
    _id: String(doc._id),
    publishedAt: doc.publishedAt ? new Date(doc.publishedAt).toISOString() : null,
    updatedAt: doc.updatedAt ? new Date(doc.updatedAt).toISOString() : null,
    createdAt: doc.createdAt ? new Date(doc.createdAt).toISOString() : null,
  };
}
