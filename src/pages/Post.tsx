import React, { useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSeedPost, type SeedPostMeta } from "@/hooks/use-get-post";
import { useDirectusSession } from "@/hooks/use-validate-admin";



// -----------------------------------------------
// Utilities
// -----------------------------------------------
function formatDate(iso?: string): string {
    if (!iso) return "";
    try {
        const d = new Date(iso);
        return new Intl.DateTimeFormat(undefined, {
            year: "numeric",
            month: "long",
            day: "2-digit",
        }).format(d);
    } catch {
        return iso || "";
    }
}

/**
 * Very light sanitizer to strip scripts/iframes and event handler attributes.
 * For production apps, prefer DOMPurify or a battle-tested sanitizer.
 */
function sanitize(html: string): string {
    // Remove <script> and <iframe> blocks
    let out = html.replace(/<\/(?:script|iframe)>/gi, "").replace(/<(script|iframe)(.|\n|\r)*?>/gi, "");
    // Strip on* attributes (onclick, onerror, etc.)
    out = out.replace(/ on[a-z]+\s*=\s*"[^"]*"/gi, "");
    out = out.replace(/ on[a-z]+\s*=\s*'[^']*'/gi, "");
    out = out.replace(/ on[a-z]+\s*=\s*[^\s>]+/gi, "");
    // Disallow javascript: URLs
    out = out.replace(/href\s*=\s*"javascript:[^"]*"/gi, 'href="#"');
    out = out.replace(/href\s*=\s*'javascript:[^']*'/gi, "href='#'");
    return out;
}

function StatusBadge({ status }: { status: SeedPostMeta["status"] }) {
    const styles: Record<string, string> = {
        published:
            "bg-[hsl(var(--primary-light))] text-[hsl(var(--primary))] border border-[hsl(var(--border))]",
        draft:
            "bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] border border-[hsl(var(--border))]",
        archived:
            "bg-[hsl(var(--secondary-light))] text-[hsl(var(--secondary))] border border-[hsl(var(--border))]",
    };
    return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status] || styles.draft}`}>
        {status}
        </span>
    );
}

// -----------------------------------------------
// Component
// -----------------------------------------------
export default function Post(props: { slug?: string }) {
    const params = useParams<{ slug: string }>();
    const slug = props.slug ?? params.slug ?? "";
    const navigate = useNavigate();

    const { user, isAuthenticated, validating } = useDirectusSession("/cms-api");

    // Helper to decide if the user is an admin
    const isAdmin = useMemo(() => {
        const role = (user as any)?.role;
        if (!role) return false;
        return true;
    }, [user]);

    // Log once we know the auth state
    useEffect(() => {
        if (validating) return; // wait until validation finishes
        if (!isAuthenticated || !user) return;
        console.log(isAdmin ? "hello admin" : "hello user");
    }, [validating, isAuthenticated, user, isAdmin]);



    const { isLoading, error, meta: post, detail, seoKeywords } = useSeedPost(slug);

    const sanitized = useMemo(() => sanitize(detail?.content || ""), [detail?.content]);

    // Basic SEO: set document title & meta description if present
    useEffect(() => {
        if (post || detail) {
            const title = detail?.seo_title || post?.title || document.title;
            if (title) document.title = title;
            if (detail?.seo_description) {
                let meta = document.querySelector('meta[name="description"]');
                if (!meta) {
                    meta = document.createElement("meta");
                    meta.setAttribute("name", "description");
                    document.head.appendChild(meta);
                }
                meta.setAttribute("content", detail.seo_description);
            }
            // Optionally set keywords (not used by most modern engines, but useful for demos)
            if (seoKeywords.length) {
                let metaK = document.querySelector('meta[name="keywords"]');
                if (!metaK) {
                    metaK = document.createElement("meta");
                    metaK.setAttribute("name", "keywords");
                    document.head.appendChild(metaK);
                }
                metaK.setAttribute("content", seoKeywords.join(", "));
            }
        }
    }, [post, detail, seoKeywords]);

    if (!slug) {
        return (
            <div className="mx-auto max-w-3xl px-4 py-16 text-center">
            <h1 className="text-3xl font-semibold hero-text-gradient">No slug provided</h1>
            <p className="mt-3 text-[hsl(var(--muted-foreground))]">Please navigate here via a valid post link.</p>
            <a
            href="/"
            className="inline-block mt-6 rounded-lg px-4 py-2 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:opacity-90 transition"
            >
            Go home
            </a>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="mx-auto max-w-3xl px-4 py-10 animate-pulse">
            <div className="h-64 w-full rounded-2xl bg-[hsl(var(--muted))]" />
            <div className="mt-6 h-8 w-2/3 rounded bg-[hsl(var(--muted))]" />
            <div className="mt-3 h-5 w-full rounded bg-[hsl(var(--muted))]" />
            <div className="mt-3 h-5 w-5/6 rounded bg-[hsl(var(--muted))]" />
            <div className="mt-8 h-96 w-full rounded bg-[hsl(var(--muted))]" />
            </div>
        );
    }

    if (error || !post || !detail) {
        return (
            <div className="mx-auto max-w-3xl px-4 py-16 text-center">
            <h1 className="text-3xl font-semibold hero-text-gradient">Post not found</h1>
            <p className="mt-3 text-[hsl(var(--muted-foreground))]">
            {error
                ? error
                : (
                    <>
                    We couldn't find a post for slug{" "}
                    <code className="px-1 rounded bg-[hsl(var(--muted))]">{slug}</code>.
                        </>
                )}
                </p>
                <a
                href="/"
                className="inline-block mt-6 rounded-lg px-4 py-2 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:opacity-90 transition"
                >
                Go home
                </a>
                </div>
        );
    }

    return (
        <article
        className="mx-auto max-w-3xl px-4 py-10 fade-in-up"
        style={{ viewTransitionName: `post-${post.id}` }}
        >
        {isAdmin && (
            <div className="my-4 text-right">
            <button
            onClick={() => navigate(`/edit-post/${slug}`)}
            className="inline-flex items-center gap-2 rounded-lg px-4 py-2 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:translate-y-[-1px] transition-[transform]"
            >
            Edit Post
            </button>
            </div>
        )}

        {/* Cover */}
        {post.cover_image_url ? (
            <div className="rounded-2xl overflow-hidden shadow-[var(--shadow-hero)] card-hover">
            <img
            src={post.cover_image_url}
            alt={post.title}
            className="w-full aspect-[3/2] object-cover"
            loading="lazy"
            />
            </div>
        ) : null}
        {/* Title */}
        <header className="mt-6">
        <p className="mt-3 text-lg text-[hsl(var(--muted-foreground))]">{post.excerpt}</p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
        <StatusBadge status={post.status} />
        <span className="text-sm text-[hsl(var(--muted-foreground))]">
        Published: <time dateTime={post.created_at}>{formatDate(post.created_at)}</time>
        </span>
        <span className="text-sm text-[hsl(var(--muted-foreground))]">
        Updated: <time dateTime={post.updated_at}>{formatDate(post.updated_at)}</time>
        </span>
        </div>
        </header>

        {/* Content */}
        <section
        className="prose prose-lg mt-8 max-w-none prose-headings:text-[hsl(var(--foreground))]
        text-xl
        prose-p:text-lg
        prose-p:text-[hsl(var(--foreground))] prose-a:text-[hsl(var(--primary))] prose-strong:text-[hsl(var(--foreground))] prose-code:bg-[hsl(var(--muted))] prose-code:px-1 prose-code:py-0.5 prose-code:rounded"
        dangerouslySetInnerHTML={{ __html: sanitized }}
        />

        {/* SEO/Keywords chips (dev-facing) */}
        {seoKeywords.length > 0 && (
            <footer className="mt-10 flex flex-wrap gap-2">
            {seoKeywords.map((k) => (
                <span
                key={k}
                className="text-xs px-2 py-1 rounded-full bg-[hsl(var(--card))] border border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))]"
                >
                {k}
                </span>
            ))}
            </footer>
        )}

        {/* Back link */}
        <div className="mt-10">
        <a
        href="javascript:history.back()"
        className="inline-flex items-center gap-2 rounded-lg px-4 py-2 bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] hover:translate-y-[-1px] transition-[transform]"
        >
        ← Back
        </a>
        </div>
        </article>
    );
}

