"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
import { useRouter } from "next/navigation";

const CATEGORIES = ["Jobs & Internships", "University", "Skills & Certifications", "Scholarships", "Career Guides"];
const EMPTY = {
  title: "", slug: "", excerpt: "", content: "## Overview\n\nWrite an original, helpful article here.\n\n## Key details\n\n- Explain the details in your own words.\n- Link to official sources.\n\n## What students should do next\n\nAdd practical next steps.\n",
  coverImage: "", category: CATEGORIES[0], tags: "", author: "Notiya Editorial Team", status: "draft",
  seoTitle: "", seoDescription: "", sources: [{ label: "Official source", url: "" }],
};

export default function ArticleEditor({ mode, initialArticle }) {
  const router = useRouter();
  const [tab, setTab] = useState("write");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [form, setForm] = useState(() => {
    if (!initialArticle) return EMPTY;
    return { ...EMPTY, ...initialArticle, tags: (initialArticle.tags || []).join(", "), sources: initialArticle.sources?.length ? initialArticle.sources : [{ label: "", url: "" }] };
  });
  const previewText = useMemo(() => form.content, [form.content]);
  function set(key, value) { setForm((old) => ({ ...old, [key]: value })); }
  function updateSource(index, key, value) {
    setForm((old) => ({ ...old, sources: old.sources.map((s, i) => i === index ? { ...s, [key]: value } : s) }));
  }

  async function save(status = form.status) {
    setBusy(true); setMessage("");
    try {
      const payload = {
        ...form,
        status,
        tags: form.tags.split(",").map((s) => s.trim()).filter(Boolean),
        sources: form.sources.filter((s) => s.url.trim()),
      };
      const endpoint = mode === "new" ? "/api/admin/updates" : `/api/admin/updates/${initialArticle._id}`;
      const res = await fetch(endpoint, {
        method: mode === "new" ? "POST" : "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Unable to save article.");
      setMessage(status === "published" ? "Article published successfully." : "Draft saved.");
      if (mode === "new") router.replace(`/admin/updates/${data.article._id}/edit`);
      router.refresh();
    } catch (err) { setMessage(err.message); }
    finally { setBusy(false); }
  }

  return <main className="admin-page">
    <div className="admin-topbar"><Link href="/admin/updates" className="brand-wordmark">← Updates dashboard</Link><Link href="/updates" target="_blank" className="text-link">View public Updates ↗</Link></div>
    <section className="editor-page">
      <div className="admin-heading"><div><span className="eyebrow">EDITOR</span><h1>{mode === "new" ? "Create an article" : "Edit article"}</h1><p>Research carefully. Preview before publishing.</p></div><span className={`status-pill status-${form.status}`}>{form.status}</span></div>
      <div className="editor-actions"><button type="button" className="button button-secondary" onClick={() => save("draft")} disabled={busy}>{busy ? "Saving…" : "Save draft"}</button><button type="button" className="button button-primary" onClick={() => save("published")} disabled={busy}>{busy ? "Saving…" : "Publish article"}</button></div>
      {message && <p className="editor-message" role="status">{message}</p>}
      <div className="editor-grid">
        <section className="editor-main">
          <label>Article title<input value={form.title} onChange={(e) => set("title", e.target.value)} maxLength={180} required placeholder="A clear, specific headline" /></label>
          <label>URL slug<input value={form.slug} onChange={(e) => set("slug", e.target.value)} maxLength={100} placeholder="leave blank to generate from title" /><small>Changing a published slug changes its URL. Add a redirect if you change an existing URL.</small></label>
          <label>Short excerpt<textarea value={form.excerpt} onChange={(e) => set("excerpt", e.target.value)} rows={3} maxLength={320} required placeholder="Summarize the article's value in 1–2 sentences." /></label>
          <div className="editor-tabs"><button type="button" className={tab === "write" ? "active" : ""} onClick={() => setTab("write")}>Write Markdown</button><button type="button" className={tab === "preview" ? "active" : ""} onClick={() => setTab("preview")}>Preview</button></div>
          {tab === "write" ? <textarea className="markdown-editor" aria-label="Markdown article content" value={form.content} onChange={(e) => set("content", e.target.value)} rows={24} required /> : <div className="markdown-preview"><ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSanitize]}>{previewText}</ReactMarkdown></div>}
          <p className="editor-help">Markdown supported: headings, lists, tables, links, quotes and code. HTML is not enabled.</p>
        </section>
        <aside className="editor-side">
          <div className="editor-panel"><h2>Publishing</h2><label>Category<select value={form.category} onChange={(e) => set("category", e.target.value)}>{CATEGORIES.map((c) => <option key={c}>{c}</option>)}</select></label><label>Author<input value={form.author} onChange={(e) => set("author", e.target.value)} maxLength={100} required /></label><label>Tags, comma-separated<input value={form.tags} onChange={(e) => set("tags", e.target.value)} placeholder="ECE, internships, careers" /></label></div>
          <div className="editor-panel"><h2>Cover image</h2><label>Image URL<input type="url" value={form.coverImage} onChange={(e) => set("coverImage", e.target.value)} placeholder="https://…" /></label><small>Use an image you have rights to use. Provide descriptive alt text in the article when needed.</small></div>
          <div className="editor-panel"><h2>SEO</h2><label>SEO title<input value={form.seoTitle} onChange={(e) => set("seoTitle", e.target.value)} maxLength={180} placeholder="Defaults to article title" /></label><label>Meta description<textarea value={form.seoDescription} onChange={(e) => set("seoDescription", e.target.value)} rows={3} maxLength={320} placeholder="Defaults to excerpt" /></label></div>
          <div className="editor-panel"><h2>Sources</h2><p className="editor-help">Add sources readers can verify. Use full HTTPS URLs.</p>{form.sources.map((source, i) => <div className="source-fields" key={i}><label>Source label<input value={source.label} onChange={(e) => updateSource(i, "label", e.target.value)} placeholder="Official careers page" /></label><label>Source URL<input type="url" value={source.url} onChange={(e) => updateSource(i, "url", e.target.value)} placeholder="https://…" /></label><button type="button" className="remove-source" onClick={() => set("sources", form.sources.filter((_, j) => j !== i))}>Remove source</button></div>)}<button type="button" className="button button-secondary button-full" onClick={() => set("sources", [...form.sources, { label: "", url: "" }])}>＋ Add source</button></div>
        </aside>
      </div>
    </section>
  </main>;
}
