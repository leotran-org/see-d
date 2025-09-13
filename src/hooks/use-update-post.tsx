
export const DIRECTUS_URL =
  (import.meta as any)?.env?.VITE_DIRECTUS_URL ?? "/cms-api"; // fallback to same-origin proxy if you have one

function getAccessToken(): string {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("Missing Directus access_token in localStorage");
  return token;
}

async function directusFetch<T = any>(path: string, init: RequestInit = {}): Promise<T> {
  const token = getAccessToken();
  const res = await fetch(`${DIRECTUS_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(init.headers || {}),
    },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Directus error ${res.status}`);
  }
  return res.json() as Promise<T>;
}

/**
 * Upsert meta + detail into Directus using your schema:
 * seed_post_meta(id, title, slug, status, cover_image_url, excerpt, created_at, updated_at)
 * seed_post_detail(id, content, seo_title, seo_description, seo_keywords, post_id)
 */
export async function upsertSeedPost(opts: {
  slug: string;
  form: {
    title: string;
    excerpt: string;
    status: string;
    cover_image_url: string;
    content: string;
    seo_title: string;
    seo_description: string;
    keywordsText: string; // comma separated
  };
  // Prefer passing these if you already have them from your loader:
  metaId?: string | number | null;
  detailId?: string | number | null;
  postId?: string | number | null; // same as metaId
}) {
  const { slug, form } = opts;
  const now = new Date().toISOString();

  // Normalize keywords to array
  const seo_keywords = form.keywordsText
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  // If we don't have IDs, try to look them up by slug (optional convenience).
  let metaId = opts.metaId ?? null;
  let detailId = opts.detailId ?? null;
  let postId = opts.postId ?? null;

  if (!metaId || !postId) {
    const found = await directusFetch<{ data: Array<{ id: number | string }> }>(
      `/items/seed_post_meta?filter[slug][_eq]=${encodeURIComponent(slug)}&limit=1&fields=id`
    );
    if (found?.data?.[0]?.id != null) {
      metaId = found.data[0].id;
      postId = metaId;
    }
  }

  // Upsert meta
  if (metaId) {
    await directusFetch(`/items/seed_post_meta/${metaId}`, {
      method: "PATCH",
      body: JSON.stringify({
        title: form.title,
        slug,
        status: form.status,
        cover_image_url: form.cover_image_url,
        excerpt: form.excerpt,
        updated_at: now,
      }),
    });
    postId = metaId;
  } else {
    const created = await directusFetch<{ data: { id: number | string } }>(`/items/seed_post_meta`, {
      method: "POST",
      body: JSON.stringify({
        title: form.title,
        slug,
        status: form.status,
        cover_image_url: form.cover_image_url,
        excerpt: form.excerpt,
        updated_at: now,
      }),
    });
    metaId = created.data.id;
    postId = created.data.id;
  }

  // Upsert detail
  const detailPayload = {
    content: form.content,
    seo_title: form.seo_title || form.title,
    seo_description: form.seo_description,
    seo_keywords,
    post_id: postId,
  };

  if (detailId) {
    await directusFetch(`/items/seed_post_detail/${detailId}`, {
      method: "PATCH",
      body: JSON.stringify(detailPayload),
    });
  } else {
    // If we still don't know detailId, try to find one for this post_id
    if (!opts.detailId) {
      const existingDetail = await directusFetch<{ data: Array<{ id: number | string }> }>(
        `/items/seed_post_detail?filter[post_id][_eq]=${encodeURIComponent(String(postId))}&limit=1&fields=id`
      );
      detailId = existingDetail?.data?.[0]?.id ?? null;
    }
    if (detailId) {
      await directusFetch(`/items/seed_post_detail/${detailId}`, {
        method: "PATCH",
        body: JSON.stringify(detailPayload),
      });
    } else {
      await directusFetch(`/items/seed_post_detail`, {
        method: "POST",
        body: JSON.stringify(detailPayload),
      });
    }
  }

  return { updatedAt: now, postId, metaId, detailId };
}

