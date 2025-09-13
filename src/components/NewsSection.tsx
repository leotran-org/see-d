import { useSeedPostMeta } from "../hooks/use-get-posts-meta";
import { SeedPostMeta } from "../mocks/posts-meta";

function formatDate(iso: string) {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

function SkeletonCard() {
  return (
    <div className="card-hover rounded-2xl border bg-[hsl(var(--card))] p-4 shadow-sm">
      <div className="h-40 w-full rounded-xl bg-[hsl(var(--muted))] animate-pulse" />
      <div className="mt-4 h-6 w-3/4 rounded bg-[hsl(var(--muted))] animate-pulse" />
      <div className="mt-2 h-4 w-full rounded bg-[hsl(var(--muted))] animate-pulse" />
      <div className="mt-2 h-4 w-5/6 rounded bg-[hsl(var(--muted))] animate-pulse" />
      <div className="mt-4 h-9 w-40 rounded-lg bg-[hsl(var(--muted))] animate-pulse" />
    </div>
  );
}

function NewsCard({ item }: { item: SeedPostMeta }) {
  const href = `/post/${item.slug}`;
  const date = formatDate(item.created_at);

  return (
    <article className="card-hover group rounded-2xl border bg-[hsl(var(--card))] p-4 shadow-sm transition will-change-transform">
      {item.cover_image_url ? (
        <a href={href} className="block overflow-hidden rounded-xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.cover_image_url}
            alt={item.title}
            className="h-40 w-full rounded-xl object-cover transition group-hover:scale-[1.02]"
            loading="lazy"
          />
        </a>
      ) : (
        <div className="h-40 w-full rounded-xl bg-[hsl(var(--muted))]" />)
      }

      <div className="mt-4 space-y-2">
        {date && (
          <time className="text-xs uppercase tracking-wide text-[hsl(var(--muted-foreground))]" dateTime={item.created_at}>
            {date}
          </time>
        )}
        <h3 className="text-lg font-semibold leading-snug">
          <a href={href} className="hero-text-gradient focus:outline-none">
            {item.title}
          </a>
        </h3>
        {item.excerpt && (
          <p className="line-clamp-3 text-sm text-[hsl(var(--muted-foreground))]">{item.excerpt}</p>
        )}

        <div className="pt-2">
          <a
            href={href}
            className="inline-flex items-center gap-1 text-sm font-medium text-[hsl(var(--primary)))] transition hover:gap-1.5"
          >
            Đọc tiếp
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-4 w-4"
            >
              <path d="M13.5 4.5L21 12l-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </div>
      </div>
    </article>
  );
}

export default function NewsSection() {
  const { data, loading, error } = useSeedPostMeta();

  return (
    <section className="relative mx-auto max-w-7xl px-4 py-12 md:py-16">
      <div className="mb-8 flex flex-col items-start justify-between gap-4 md:mb-10 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-medium tracking-wide text-[hsl(var(--primary))]">Tin tức</p>
          <h2 className="mt-1 text-2xl font-bold md:text-3xl">
            <span className="hero-text-gradient">Cập nhật mới nhất</span>
          </h2>
          {error && (
            <p className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">
              Không thể tải dữ liệu trực tiếp, đang hiển thị dữ liệu dự phòng.
            </p>
          )}
        </div>

        <a
          href="/news"
          className="glow-effect inline-flex items-center gap-2 rounded-2xl bg-[hsl(var(--primary))] px-5 py-3 text-[hsl(var(--primary-foreground))] shadow-sm transition hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] focus:ring-offset-2"
        >
          Truy cập Trang tin tức
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5"
          >
            <path d="M13.5 4.5L21 12l-7.5 7.5M21 12H3" />
          </svg>
        </a>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data?.slice(0, 6).map((item) => (
            <NewsCard key={item.id} item={item as SeedPostMeta} />
          ))}
        </div>
      )}

      {/* CTA for mobile */}
      <div className="mt-10 flex justify-center md:hidden">
        <a
          href="/news"
          className="inline-flex items-center gap-2 rounded-2xl border px-5 py-3 text-sm font-medium text-[hsl(var(--foreground))] transition hover:bg-[hsl(var(--accent))]"
        >
          Truy cập Trang tin tức
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-4 w-4"
          >
            <path d="M13.5 4.5L21 12l-7.5 7.5M21 12H3" />
          </svg>
        </a>
      </div>
    </section>
  );
}

