import { NextResponse } from "next/server";
import ConnectDB from "@/dbConfig/dbConfig";
import Update from "@/models/Update";
import { isAdminAuthenticated, isSameOriginRequest } from "@/lib/adminAuth";
import { slugify, isValidSlug } from "@/lib/slug";
import { UPDATES_CATEGORIES } from "@/lib/site";

export const runtime = "nodejs";

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
  const sources = Array.isArray(body.sources) ? body.sources.slice(0, 20).map((s) => ({
    label: String(s.label || "Source").trim().slice(0, 120),
    url: String(s.url || "").trim().slice(0, 2048),
  })) : [];
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

export async function GET() {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  await ConnectDB();
  const articles = await Update.find({}).sort({ updatedAt: -1 }).limit(200).lean();
  return NextResponse.json({ articles });
}

export async function POST(request) {
  if (!(await isSameOriginRequest())) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  let body;
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Invalid JSON." }, { status: 400 }); }
  const checked = validate(body);
  if (checked.error) return NextResponse.json({ error: checked.error }, { status: 400 });
  await ConnectDB();
  const exists = await Update.exists({ slug: checked.value.slug });
  if (exists) return NextResponse.json({ error: "That slug already exists. Choose a unique slug." }, { status: 409 });
  const now = new Date();
  const article = await Update.create({
    ...checked.value,
    publishedAt: checked.value.status === "published" ? now : null,
    updatedAt: now,
  });
  return NextResponse.json({ ok: true, article: { _id: String(article._id), slug: article.slug, status: article.status } }, { status: 201 });
}
