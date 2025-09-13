import React from "react";
import { type SeedPostMeta } from "@/hooks/use-get-post";

const styles: Record<string, string> = {
  published:
    "bg-[hsl(var(--primary-light))] text-[hsl(var(--primary))] border border-[hsl(var(--border))]",
  draft:
    "bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] border border-[hsl(var(--border))]",
  archived:
    "bg-[hsl(var(--secondary-light))] text-[hsl(var(--secondary))] border border-[hsl(var(--border))]",
};

export function StatusBadge({ status }: { status: SeedPostMeta["status"] }) {
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status] || styles.draft}`}>
      {status}
    </span>
  );
}

