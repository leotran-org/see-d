import React, { useMemo, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { StatusBadge } from "@/components/StatusBadge";
import { formatDate, sanitize } from "@/utils/content";
import { type FormState } from "./types";
import { type SeedPostMeta } from "@/hooks/use-get-post";

type EditPostFormProps = {
  slug: string;
  post: SeedPostMeta;
  form: FormState;
  saving: boolean;
  dirty: boolean;
  savedAt: string | null;
  saveError: string | null;
  onSave: () => void;
  set: <K extends keyof FormState>(key: K, value: FormState[K]) => void;
};

export default function EditPostForm(props: EditPostFormProps) {
  const { slug, post, form, saving, dirty, savedAt, saveError, onSave, set } = props;
  const navigate = useNavigate();
  const contentRef = useRef<HTMLTextAreaElement | null>(null);

  const sanitizedPreview = useMemo(() => sanitize(form?.content || ""), [form?.content]);
  const savedLabel = savedAt
    ? `Saved ${formatDate(savedAt)} ${new Date(savedAt).toLocaleTimeString()}`
    : null;

  return (
    <div
      className="mx-auto max-w-6xl px-4 py-8 fade-in-up"
      style={{ viewTransitionName: `edit-post-${(post as any).id}` }}
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold hero-text-gradient">Edit post</h1>
          <p className="mt-1 text-sm text-[hsl(var(--muted-foreground))]">
            Created <time dateTime={(post as any).created_at}>{formatDate((post as any).created_at)}</time> · Updated{" "}
            <time dateTime={(post as any).updated_at}>{formatDate((post as any).updated_at)}</time>
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge status={form.status} />
          {savedLabel && (
            <span className="text-xs text-[hsl(var(--muted-foreground))]">{savedLabel}</span>
          )}
          {saveError && (
            <span className="text-xs text-red-600 bg-red-50 border border-red-200 px-2 py-1 rounded">{saveError}</span>
          )}
          <button
            onClick={onSave}
            disabled={saving || !dirty}
            className="inline-flex items-center gap-2 rounded-lg px-4 py-2 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] disabled:opacity-60 hover:opacity-90 transition"
          >
            {saving ? "Saving…" : dirty ? "Save changes" : "Saved"}
          </button>
          <Link
            to={`/post/${slug}`}
            className="inline-flex items-center gap-2 rounded-lg px-4 py-2 bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] hover:translate-y-[-1px] transition-[transform]"
          >
            View post ↗
          </Link>
        </div>
      </div>

      {/* Meta fields */}
      <section className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium">Title</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => set("title", e.target.value)}
            className="mt-1 w-full rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-3 py-2 outline-none focus:ring-2 focus:ring-[hsl(var(--primary))]"
            placeholder="Amazing post title"
          />
        </div>
        <div className="md:col-span-1">
          <label className="block text-sm font-medium">Status</label>
          <select
            value={form.status}
            onChange={(e) => set("status", e.target.value as SeedPostMeta["status"])}
            className="mt-1 w-full rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-3 py-2 outline-none focus:ring-2 focus:ring-[hsl(var(--primary))]"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </div>
        <div className="md:col-span-3">
          <label className="block text-sm font-medium">Excerpt</label>
          <input
            type="text"
            value={form.excerpt}
            onChange={(e) => set("excerpt", e.target.value)}
            className="mt-1 w-full rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-3 py-2 outline-none focus:ring-2 focus:ring-[hsl(var(--primary))]"
            placeholder="Short summary for listings and previews"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium">Cover image URL</label>
          <input
            type="url"
            value={form.cover_image_url}
            onChange={(e) => set("cover_image_url", e.target.value)}
            className="mt-1 w-full rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-3 py-2 outline-none focus:ring-2 focus:ring-[hsl(var(--primary))]"
            placeholder="https://…"
          />
          {form.cover_image_url ? (
            <div className="mt-3 rounded-2xl overflow-hidden shadow-[var(--shadow-hero)] card-hover">
              <img
                src={form.cover_image_url}
                alt="Cover"
                className="w-full aspect-[3/2] object-cover"
                loading="lazy"
              />
            </div>
          ) : null}
        </div>
        <div className="md:col-span-1">
          <label className="block text-sm font-medium">SEO title</label>
          <input
            type="text"
            value={form.seo_title}
            onChange={(e) => set("seo_title", e.target.value)}
            className="mt-1 w-full rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-3 py-2 outline-none focus:ring-2 focus:ring-[hsl(var(--primary))]"
            placeholder="Defaults to title"
          />
          <label className="block text-sm font-medium mt-4">SEO description</label>
          <textarea
            value={form.seo_description}
            onChange={(e) => set("seo_description", e.target.value)}
            className="mt-1 h-28 w-full resize-y rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-3 py-2 outline-none focus:ring-2 focus:ring-[hsl(var(--primary))]"
            placeholder="One or two enticing sentences"
          />
          <label className="block text-sm font-medium mt-4">Keywords (comma-separated)</label>
          <input
            type="text"
            value={form.keywordsText}
            onChange={(e) => set("keywordsText", e.target.value)}
            className="mt-1 w-full rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-3 py-2 outline-none focus:ring-2 focus:ring-[hsl(var(--primary))]"
            placeholder="e.g. ui, react, content"
          />
        </div>
      </section>

      {/* Editor */}
      <section className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Content</h2>
          <div className="text-xs text-[hsl(var(--muted-foreground))]">HTML supported · preview on the right</div>
        </div>

        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <textarea
              ref={contentRef}
              value={form.content}
              onChange={(e) => set("content", e.target.value)}
              className="h-[28rem] w-full resize-y rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-3 py-2 font-mono text-sm outline-none focus:ring-2 focus:ring-[hsl(var(--primary))]"
              placeholder="<p>Your HTML content here</p>\n<h2>Headings, <strong>bold</strong>, <code>code</code>…</h2>"
            />
            <p className="mt-2 text-xs text-[hsl(var(--muted-foreground))]">
              Scripts/iframes and inline event handlers are stripped for safety.
            </p>
          </div>

          <div>
            <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--background))]">
              <div className="px-3 py-2 text-xs border-b border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))]">
                Live preview
              </div>
              <div
                className="prose prose-lg max-w-none p-4 prose-headings:text-[hsl(var(--foreground))] text-xl prose-p:text-lg prose-p:text-[hsl(var(--foreground))] prose-a:text-[hsl(var(--primary))] prose-strong:text-[hsl(var(--foreground))] prose-code:bg-[hsl(var(--muted))] prose-code:px-1 prose-code:py-0.5 prose-code:rounded"
                dangerouslySetInnerHTML={{ __html: sanitizedPreview }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer actions */}
      <div className="mt-10 flex flex-wrap items-center gap-3">
        <button
          onClick={onSave}
          disabled={saving || !dirty}
          className="inline-flex items-center gap-2 rounded-lg px-4 py-2 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] disabled:opacity-60 hover:opacity-90 transition"
        >
          {saving ? "Saving…" : dirty ? "Save changes" : "Saved"}
        </button>
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 rounded-lg px-4 py-2 bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] hover:translate-y-[-1px] transition-[transform]"
        >
          ← Back
        </button>
        <Link
          to={`/post/${slug}`}
          className="inline-flex items-center gap-2 rounded-lg px-4 py-2 border border-[hsl(var(--border))] text-[hsl(var(--foreground))] hover:bg-[hsl(var(--card))] transition"
        >
          View public page
        </Link>
      </div>
    </div>
  );
}

