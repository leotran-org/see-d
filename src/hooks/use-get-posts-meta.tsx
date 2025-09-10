import { useEffect, useState } from "react";
import { mockPostMeta, SeedPostMeta } from "../mocks/posts-meta";

export function useSeedPostMeta() {
  const [data, setData] = useState<SeedPostMeta[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/cms-api/items/seed_post_meta");
        if (!res.ok) {
          throw new Error(`Error: ${res.statusText}`);
        }
        const json = await res.json();
        setData(json.data || []);
      } catch (err: any) {
        console.error("API failed, falling back to mock data:", err);
        setError(err.message);
        setData(mockPostMeta);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { data, loading, error };
}

