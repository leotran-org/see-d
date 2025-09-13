import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export type SeedPostMeta = {
  id: number;
  title: string;
  slug: string;
  status: string;
  cover_image_url: string;
  excerpt: string;
  created_at: string;
  updated_at: string;
};

export type SeedPostDetail = {
  id: number;
  post_id: number;
  content: string; // HTML string; sanitize before rendering
  seo_title?: string;
  seo_description?: string;
  seo_keywords?: string[] | string; // can be comma-separated string or an array
};

type DirectusList<T> = { data: T[] };

type UseSeedPostOptions = {
  /** Override base URL if needed; defaults to VITE_DIRECTUS_URL or theleotran admin URL */
  baseUrl?: string;
  /** Optional static token for protected endpoints */
  token?: string;
  /** Disable auto-fetch */
  enabled?: boolean;
};

type UseSeedPostReturn = {
  isLoading: boolean;
  error: string | null;
  meta: SeedPostMeta | null;
  detail: SeedPostDetail | null;
  /** Always an array for convenience */
  seoKeywords: string[];
  refetch: () => void;
};

/**
 * useSeedPost
 * 1) GET /items/seed_post_meta?filter={"slug":{"_eq":slug}}
 * 2) GET /items/seed_post_detail?filter={"post_id":{"_eq": meta.id}}
 *    Fallback: if none, try filter by {"id":{"_eq": meta.id}}
 */
export function useSeedPost(
  slug: string | undefined,
  opts: UseSeedPostOptions = {}
): UseSeedPostReturn {
  const baseUrl =
    opts.baseUrl ||
    import.meta.env.VITE_DIRECTUS_URL ||
    "/cms-api";
  const token = opts.token || import.meta.env.VITE_DIRECTUS_TOKEN || undefined;
  const enabled = opts.enabled ?? true;

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [meta, setMeta] = useState<SeedPostMeta | null>(null);
  const [detail, setDetail] = useState<SeedPostDetail | null>(null);

  const abortRef = useRef<AbortController | null>(null);

  const headers = useMemo(() => {
    const h: Record<string, string> = { "Content-Type": "application/json" };
    if (token) h.Authorization = `Bearer ${token}`;
    return h;
  }, [token]);

  const buildUrl = useCallback(
    (collection: string, filter: object, fields?: string[], limit = 1) => {
      const params = new URLSearchParams();
      params.set("filter", JSON.stringify(filter));
      params.set("limit", String(limit));
      if (fields?.length) params.set("fields", fields.join(","));
      return `${baseUrl}/items/${collection}/?${params.toString()}`;
    },
    [baseUrl]
  );

  const normalizeKeywords = (kw: SeedPostDetail["seo_keywords"]): string[] => {
    if (!kw) return [];
    if (Array.isArray(kw)) return kw.map((s) => String(s).trim()).filter(Boolean);
    const raw = String(kw).trim();
    // Attempt JSON parse first if it looks like an array
    if (raw.startsWith("[") && raw.endsWith("]")) {
      try {
        const arr = JSON.parse(raw);
        if (Array.isArray(arr)) return arr.map((s) => String(s).trim()).filter(Boolean);
      } catch {
        /* fall back to comma-split */
      }
    }
    // Fallback: comma-separated string
    return raw
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  };

  const fetchOnce = useCallback(async () => {
    if (!slug || !enabled) return;

    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;
    setIsLoading(true);
    setError(null);
    setMeta(null);
    setDetail(null);

    try {
      // 1) Fetch meta by slug
      const metaUrl = buildUrl(
        "seed_post_meta",
        { slug: { _eq: slug } },
        [
          "id",
          "title",
          "slug",
          "status",
          "cover_image_url",
          "excerpt",
          "created_at",
          "updated_at",
        ],
        1
      );

      const metaRes = await fetch(metaUrl, { headers, signal: ac.signal });
      if (!metaRes.ok) throw new Error(`Meta request failed: ${metaRes.status}`);
      const metaJson = (await metaRes.json()) as DirectusList<SeedPostMeta>;
      const metaRow = metaJson.data?.[0];
      if (!metaRow) throw new Error(`No post found for slug "${slug}".`);

      setMeta(metaRow);

      // 2) Fetch detail by post_id == meta.id
      const detailByPostIdUrl = buildUrl(
        "seed_post_detail",
        { post_id: { _eq: metaRow.id } },
        ["id", "post_id", "content", "seo_title", "seo_description", "seo_keywords"],
        1
      );

      let detailRes = await fetch(detailByPostIdUrl, { headers, signal: ac.signal });
      if (!detailRes.ok) throw new Error(`Detail request failed: ${detailRes.status}`);
      let detailJson = (await detailRes.json()) as DirectusList<SeedPostDetail>;
      let detailRow = detailJson.data?.[0] ?? null;

      // Fallback: some datasets use detail.id === meta.id (instead of post_id)
      if (!detailRow) {
        const detailByIdUrl = buildUrl(
          "seed_post_detail",
          { id: { _eq: metaRow.id } },
          ["id", "post_id", "content", "seo_title", "seo_description", "seo_keywords"],
          1
        );
        detailRes = await fetch(detailByIdUrl, { headers, signal: ac.signal });
        if (!detailRes.ok) throw new Error(`Detail request failed: ${detailRes.status}`);
        detailJson = (await detailRes.json()) as DirectusList<SeedPostDetail>;
        detailRow = detailJson.data?.[0] ?? null;
      }

      if (!detailRow) {
        throw new Error(
          `No detail found for post_id or id "${metaRow.id}". Did you seed the detail record?`
        );
      }

      setDetail(detailRow);
    } catch (err: any) {
      if (err?.name !== "AbortError") {
        setError(err?.message || "Unknown error");
      }
    } finally {
      setIsLoading(false);
    }
  }, [slug, enabled, headers, buildUrl]);

  useEffect(() => {
    fetchOnce();
    return () => abortRef.current?.abort();
  }, [fetchOnce]);

  const refetch = useCallback(() => {
    fetchOnce();
  }, [fetchOnce]);

  const seoKeywords = useMemo(() => normalizeKeywords(detail?.seo_keywords), [detail]);

  return { isLoading, error, meta, detail, seoKeywords, refetch };
}

