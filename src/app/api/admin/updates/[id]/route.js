import mongoose from "mongoose";
import { NextResponse } from "next/server";
import ConnectDB from "@/dbConfig/dbConfig";
import Update from "@/models/Update";

import { slugify, isValidSlug } from "@/lib/slug";
import { UPDATES_CATEGORIES } from "@/lib/site";

function validHttpUrl(value) {
  try { const u = new URL(value); return u.protocol === "https:" || u.protocol === "http:"; } catch { return false; }
}
function validate(body) {
  const title = String(body.title || "").trim();
  const excerpt = String(body.excerpt || "").trim();
  const content = String(body.content || "").trim();
  const category = String(body.category || "");
  const slug = slugify(body.slug || title);
  if (title.length < 10 || title.length > 180) return { error: "Title must be between 10 and 180 characters." };
  if (excerpt.length < 40 || excerpt.length > 320) return { error: "Excerpt must be between 40 and 320 characters." };
  if (content.length < 100 || content.length > 150000) return { error: "Article content must be between 100 and 150,000 characters." };
  if (!UPDATES_CATEGORIES.includes(category)) return { error: "Choose a valid category." };
  if (!isValidSlug(slug)) return { error: "Slug can contain lowercase letters, numbers and hyphens." };
  if (!["draft", "published"].includes(body.status)) return { error: "Invalid publication status." };
  const sources = Array.isArray(body.sources) ? body.sources.slice(0, 20).map((s) => ({ label: String(s.label || "Source").trim().slice(0, 120), url: String(s.url || "").trim().slice(0, 2048) })) : [];
  if (sources.some((s) => !validHttpUrl(s.url))) return { error: "Each source must use a valid HTTP or HTTPS URL." };
  const coverImage = String(body.coverImage || "").trim();
  if (coverImage && !validHttpUrl(coverImage)) return { error: "Cover image must use a valid HTTP or HTTPS URL." };
  return { value: {
    title, excerpt, content, category, slug, status: body.status, coverImage,
    tags: Array.isArray(body.tags) ? body.tags.map((t) => String(t).trim().slice(0, 40)).filter(Boolean).slice(0, 20) : [],
    author: String(body.author || "Notiya Editorial Team").trim().slice(0, 100),
    seoTitle: String(body.seoTitle || "").trim().slice(0, 180),
    seoDescription: String(body.seoDescription || "").trim().slice(0, 320),
    sources,
  }};
}

export async function PATCH(request, { params }) {
  
  const { id } = await params;
  if (!mongoose.isValidObjectId(id)) return NextResponse.json({ error: "Invalid article ID." }, { status: 400 });
  let body;
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Invalid JSON." }, { status: 400 }); }
  const checked = validate(body);
  if (checked.error) return NextResponse.json({ error: checked.error }, { status: 400 });
  await ConnectDB();
  const article = await Update.findById(id);
  if (!article) return NextResponse.json({ error: "Article not found." }, { status: 404 });
  const slugExists = await Update.exists({ slug: checked.value.slug, _id: { $ne: article._id } });
  if (slugExists) return NextResponse.json({ error: "That slug already exists." }, { status: 409 });

  const wasPublished = article.status === "published";
  Object.assign(article, checked.value);
  if (checked.value.status === "published" && !article.publishedAt) article.publishedAt = new Date();
  if (checked.value.status === "draft") article.publishedAt = null;
  // Preserve original publication time on edits; updatedAt is the real edit time.
  if (wasPublished && checked.value.status === "published") article.publishedAt = article.publishedAt;
  article.updatedAt = new Date();
  await article.save();
  return NextResponse.json({ ok: true, article: { _id: String(article._id), slug: article.slug, status: article.status } });
}

export async function DELETE(request, { params }) {
  const { id } = await params;
  if (!mongoose.isValidObjectId(id)) return NextResponse.json({ error: "Invalid article ID." }, { status: 400 });
  await ConnectDB();
  await Update.findByIdAndDelete(id); 
  return NextResponse.json({ ok: true });
}
