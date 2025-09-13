// Utilities: date formatting and very-light HTML sanitization

export function formatDate(iso?: string): string {
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
export function sanitize(html: string): string {
  let out = html
    .replace(/<\/(?:script|iframe)>/gi, "")
    .replace(/<(script|iframe)(.|\n|\r)*?>/gi, "");
  out = out.replace(/ on[a-z]+\s*=\s*"[^"]*"/gi, "");
  out = out.replace(/ on[a-z]+\s*=\s*'[^']*'/gi, "");
  out = out.replace(/ on[a-z]+\s*=\s*[^\s>]+/gi, "");
  out = out.replace(/href\s*=\s*"javascript:[^"]*"/gi, 'href="#"');
  out = out.replace(/href\s*=\s*'javascript:[^']*'/gi, "href='#'");
  return out;
}

