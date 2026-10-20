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


// Fetch recent posts for the sidebar, excluding the current article
export async function getRecentUpdates(limit = 3, excludeSlug = null) {
  await ConnectDB();
  const query = { status: "published" };
  
  if (excludeSlug) {
    query.slug = { $ne: excludeSlug }; // Exclude current post
  }
  
  return Update.find(query)
    .sort({ publishedAt: -1, _id: -1 }) // Sort by newest first
    .limit(limit)
    .select("title slug publishedAt") // Select only needed fields for sidebar
    .lean();
}

// Fetch the immediate previous (older) and next (newer) posts for footer navigation
export async function getAdjacentUpdates(currentPublishedAt) {
  await ConnectDB();
  
  if (!currentPublishedAt) {
    return { prev: null, next: null };
  }

  // Previous post is older (less than current publishedAt)
  const prevPromise = Update.findOne({ 
    status: "published", 
    publishedAt: { $lt: currentPublishedAt } 
  })
  .sort({ publishedAt: -1 }) // Get the most recent older post
  .select("title slug")
  .lean();

  // Next post is newer (greater than current publishedAt)
  const nextPromise = Update.findOne({ 
    status: "published", 
    publishedAt: { $gt: currentPublishedAt } 
  })
  .sort({ publishedAt: 1 }) // Get the oldest newer post
  .select("title slug")
  .lean();

  // Execute both queries concurrently
  const [prev, next] = await Promise.all([prevPromise, nextPromise]);

  return { prev, next };
}