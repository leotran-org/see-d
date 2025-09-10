export type SeedPostMeta = {
  id: number;
  author_id: number;
  title: string;
  slug: string;
  status: string;
  cover_image_url: string;
  excerpt: string;
  created_at: string;
  updated_at: string;
};

export const mockPostMeta: SeedPostMeta[] = [
  {
    id: 1,
    author_id: 101,
    title: "Mock Post Title",
    slug: "mock-post-title",
    status: "published",
    cover_image_url: "https://via.placeholder.com/600x400.png?text=Mock+Image",
    excerpt: "This is a mock excerpt for testing fallback data.",
    created_at: "2025-01-01T12:00:00Z",
    updated_at: "2025-01-02T12:00:00Z",
  },
  {
    id: 2,
    author_id: 102,
    title: "Another Mock Post",
    slug: "another-mock-post",
    status: "draft",
    cover_image_url: "https://via.placeholder.com/600x400.png?text=Another+Mock",
    excerpt: "This is another mock excerpt.",
    created_at: "2025-01-05T12:00:00Z",
    updated_at: "2025-01-06T12:00:00Z",
  },
  {
    id: 3,
    author_id: 103,
    title: "Learning React Hooks",
    slug: "learning-react-hooks",
    status: "published",
    cover_image_url: "https://via.placeholder.com/600x400.png?text=React+Hooks",
    excerpt: "An introduction to building custom React hooks with examples.",
    created_at: "2025-02-01T10:00:00Z",
    updated_at: "2025-02-02T14:00:00Z",
  },
  {
    id: 4,
    author_id: 104,
    title: "TypeScript Best Practices",
    slug: "typescript-best-practices",
    status: "published",
    cover_image_url: "https://via.placeholder.com/600x400.png?text=TypeScript",
    excerpt: "Tips and tricks to write clean, maintainable TypeScript code.",
    created_at: "2025-02-05T09:30:00Z",
    updated_at: "2025-02-06T11:15:00Z",
  },
  {
    id: 5,
    author_id: 105,
    title: "Mocking API Requests",
    slug: "mocking-api-requests",
    status: "archived",
    cover_image_url: "https://via.placeholder.com/600x400.png?text=Mocking+API",
    excerpt: "How to mock API requests in frontend development.",
    created_at: "2025-02-10T08:45:00Z",
    updated_at: "2025-02-12T13:00:00Z",
  },
];

