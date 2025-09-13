import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import EditPostForm from "@/features/posts/EditPostForm";
import { type FormState } from "@/features/posts/types";
import { useSeedPost } from "@/hooks/use-get-post";
import { useDirectusSession } from "@/hooks/use-validate-admin";
import { formatDate } from "@/utils/content";
import { upsertSeedPost } from "@/hooks/use-update-post";

// Lightweight skeletons / states local to this page
function LoadingSkeleton() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 animate-pulse">
      <div className="h-8 w-1/3 rounded bg-[hsl(var(--muted))]" />
      <div className="mt-6 h-10 w-full rounded bg-[hsl(var(--muted))]" />
      <div className="mt-3 h-10 w-2/3 rounded bg-[hsl(var(--muted))]" />
      <div className="mt-6 grid md:grid-cols-2 gap-6">
        <div className="h-[28rem] rounded bg-[hsl(var(--muted))]" />
        <div className="h-[28rem] rounded bg-[hsl(var(--muted))]" />
      </div>
    </div>
  );
}

function ErrorState({ slug, error }: { slug: string; error?: string | null }) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 text-center">
      <h1 className="text-3xl font-semibold hero-text-gradient">Post not found</h1>
      <p className="mt-3 text-[hsl(var(--muted-foreground))]">
        {error ? (
          error
        ) : (
          <>
            We couldn't find a post for slug{" "}
            <code className="px-1 rounded bg-[hsl(var(--muted))]">{slug}</code>.
          </>
        )}
      </p>
      <Link
        to="/"
        className="inline-block mt-6 rounded-lg px-4 py-2 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:opacity-90 transition"
      >
        Go home
      </Link>
    </div>
  );
}

export default function EditPost() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug ?? "";
  const navigate = useNavigate();

  const { user, isAuthenticated, validating } = useDirectusSession("/cms-api");

  // Helper to decide if the user is an admin (adjust logic per your app)
  const isAdmin = useMemo(() => {
    const role = (user as any)?.role;
    if (!role) return false;
    return true;
  }, [user]);

  // Log + guard once we know the auth state
  useEffect(() => {
    if (validating) return; // wait until validation finishes
    if (!user) return;

    // helpful debug logs
    // eslint-disable-next-line no-console
    console.log("isAdmin:", isAdmin, "isAuthenticated:", isAuthenticated, "user:", user);

    if (!isAuthenticated || !user || !isAdmin) {
      navigate("/login", { replace: true, state: { from: location.pathname } });
    }
  }, [validating, isAuthenticated, user, isAdmin, navigate]);

  const { isLoading, error, meta: post, detail, seoKeywords } = useSeedPost(slug);

  const [form, setForm] = useState<FormState | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [dirty, setDirty] = useState(false);

  // Initialize form when data loads
  useEffect(() => {
    if (post && detail) {
      setForm({
        title: post.title || "",
        excerpt: post.excerpt || "",
        status: post.status || "draft",
        cover_image_url: post.cover_image_url || "",
        content: detail.content || "",
        seo_title: detail.seo_title || post.title || "",
        seo_description: detail.seo_description || "",
        keywordsText: (seoKeywords || []).join(", "),
      });
      setDirty(false);
    }
  }, [post, detail, seoKeywords]);

  // Warn on unsaved changes
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (dirty) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [dirty]);

  const handleSave = useCallback(async () => {
    if (!form) return;
    setSaving(true);
    setSaveError(null);

    try {
      const ids = {
        metaId: (post as any)?.id ?? null,
        detailId: (detail as any)?.id ?? null,
        postId: (post as any)?.id ?? null,
      };

      const result = await upsertSeedPost({
        slug,
        form,
        ...ids,
      });

      setSavedAt(result.updatedAt);
      setDirty(false);
    } catch (e: any) {
      setSaveError(e?.message || "Unknown error");
    } finally {
      setSaving(false);
    }
  }, [form, slug, post, detail]);

  // Keyboard shortcut: Cmd/Ctrl+S to save
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        void handleSave();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleSave]);

  // Helper to update form fields
  const set = useCallback(<K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => (prev ? { ...prev, [key]: value } : prev));
    setDirty(true);
  }, []);

  // ——— Renders ———
  if (!slug) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 className="text-3xl font-semibold hero-text-gradient">No slug provided</h1>
        <p className="mt-3 text-[hsl(var(--muted-foreground))]">Please navigate here via a valid post link.</p>
        <Link
          to="/"
          className="inline-block mt-6 rounded-lg px-4 py-2 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:opacity-90 transition"
        >
          Go home
        </Link>
      </div>
    );
  }

  if (isLoading || !form) return <LoadingSkeleton />;
  if (error || !post || !detail) return <ErrorState slug={slug} error={error} />;

  return (
    <EditPostForm
      slug={slug}
      post={post as any}
      form={form}
      saving={saving}
      dirty={dirty}
      savedAt={savedAt}
      saveError={saveError}
      onSave={handleSave}
      set={set}
    />
  );
}

