import { type SeedPostMeta } from "@/hooks/use-get-post";

export type FormState = {
  title: string;
  excerpt: string;
  status: SeedPostMeta["status"];
  cover_image_url: string;
  content: string; // HTML string
  seo_title: string;
  seo_description: string;
  keywordsText: string; // comma-separated for UI
};

