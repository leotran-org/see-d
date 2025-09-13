export type SeedPostDetail = {
id: number;
post_id: number;
content: string; // HTML string; sanitized before rendering
seo_title?: string;
seo_description?: string;
seo_keywords?: string[] | string; // can be comma-separated string or an array
};


export const mockPostDetail: SeedPostDetail[] = [
  {
    id: 1,
    post_id: 1,
    content: `
      <article>
        <h1>Mock Post Title</h1>
        <p>This post demonstrates a fully-populated detail record to pair with your mock metadata. It includes semantic HTML and a code sample block.</p>
        <figure>
          <img src="https://via.placeholder.com/600x400.png?text=Mock+Image" alt="Mock image placeholder">
          <figcaption>A placeholder cover image.</figcaption>
        </figure>
        <h2>Why mock data?</h2>
        <ul>
          <li>Reliable UI during API downtime</li>
          <li>Deterministic tests</li>
          <li>Faster prototyping</li>
        </ul>
        <h2>Example</h2>
        <pre><code class="language-ts">type Post = { id: number; title: string };</code></pre>
        <p><em>Note:</em> Ensure HTML is sanitized before rendering.</p>
      </article>
    `,
    seo_title: "Mock Post Title — Fallback Content Example",
    seo_description: "A complete mock post detail used for testing UI and SEO fields.",
    seo_keywords: ["mock data", "testing", "placeholder", "seed content"],
  },
  {
    id: 2,
    post_id: 2,
    content: `
      <article>
        <h1>Another Mock Post</h1>
        <p>This draft post exists to validate conditional rendering for non-published content. It should still provide a realistic structure for previews.</p>
        <h2>Draft Behavior</h2>
        <p>Apps often dim or badge draft posts and hide them from public feeds.</p>
        <blockquote>“Draft today, ship tomorrow.”</blockquote>
        <pre><code class="language-html">&lt;p&gt;Preview me, but don't index me.&lt;/p&gt;</code></pre>
      </article>
    `,
    seo_title: "Another Mock Post (Draft)",
    seo_description: "Draft content used to test preview states and unpublished flows.",
    seo_keywords: "draft, preview, unpublished, content states",
  },
  {
    id: 3,
    post_id: 3,
    content: `
      <article>
        <h1>Learning React Hooks</h1>
        <p>React Hooks let you use state and other React features without writing a class. This mock article focuses on custom hooks.</p>
        <h2>Custom Hook Example</h2>
        <pre><code class="language-ts">
import { useEffect, useState } from "react";

export function useNow(interval = 1000) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), interval);
    return () => clearInterval(id);
  }, [interval]);
  return now;
}
        </code></pre>
        <p>Use this to practice rendering dynamic timestamps in your UI.</p>
      </article>
    `,
    seo_title: "Learning React Hooks: Building Custom Hooks",
    seo_description: "An approachable intro to creating and using custom React hooks.",
    seo_keywords: ["react", "hooks", "custom hooks", "frontend"],
  },
  {
    id: 4,
    post_id: 4,
    content: `
      <article>
        <h1>TypeScript Best Practices</h1>
        <p>TypeScript scales JavaScript with types, improving correctness and developer experience. This mock covers a few conventions.</p>
        <h2>Tips</h2>
        <ol>
          <li>Prefer <code>unknown</code> over <code>any</code> for safer typing.</li>
          <li>Use <code>as const</code> to preserve literal types.</li>
          <li>Model domain concepts with discriminated unions.</li>
        </ol>
        <pre><code class="language-ts">
type Result =
  | { ok: true; data: string }
  | { ok: false; error: string };

function handle(r: Result) {
  if (r.ok) return r.data;
  throw new Error(r.error);
}
        </code></pre>
      </article>
    `,
    seo_title: "TypeScript Best Practices for Maintainable Code",
    seo_description: "Practical tips to write clean, scalable TypeScript in modern codebases.",
    seo_keywords: "typescript, best practices, maintainability, DX",
  },
  {
    id: 5,
    post_id: 5,
    content: `
      <article>
        <h1>Mocking API Requests</h1>
        <p>Mocking network requests lets you build resilient UIs and test edge cases without flaky external dependencies.</p>
        <h2>Approaches</h2>
        <ul>
          <li>HTTP interception (e.g., <code>MSW</code>)</li>
          <li>Dependency injection of fetch/adapters</li>
          <li>Fixture-driven contract tests</li>
        </ul>
        <pre><code class="language-ts">
// Example MSW handler (mock)
import { http, HttpResponse } from "msw";
export const handlers = [
  http.get("/api/posts/:id", () =>
    HttpResponse.json({ id: 1, title: "Mocked" })
  ),
];
        </code></pre>
        <p class="note">This post is archived in the mock dataset; useful to test visibility filters.</p>
      </article>
    `,
    seo_title: "Mocking API Requests for Frontend Development",
    seo_description: "Strategies for mocking HTTP requests to improve reliability and speed.",
    // Intentionally omit seo_keywords to test optional handling
  },
];

