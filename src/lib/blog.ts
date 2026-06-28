import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { slugify } from "@/lib/utils";

const contentDir = path.join(process.cwd(), "src", "content", "blog");

export interface BlogSource {
  name: string;
  url: string;
  type: "guideline" | "research" | "database" | "article";
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;
  category: string;
  subcategory?: string;
  tags: string[];
  featuredImage?: string;
  excerpt: string;
  readingTime: string;
  sources: BlogSource[];
  readNext?: string[];
  author?: string;
  seo?: {
    title?: string;
    description?: string;
    ogImage?: string;
  };
}

export interface BlogPost extends BlogPostMeta {
  content: string;
}

let _postsCache: BlogPost[] | null = null;
let _postsCacheTime = 0;
const POSTS_CACHE_TTL = 60_000;

export function getAllPosts(): BlogPost[] {
  const now = Date.now();
  if (_postsCache && now - _postsCacheTime < POSTS_CACHE_TTL) {
    return _postsCache;
  }
  if (!fs.existsSync(contentDir)) return [];

  const files = fs.readdirSync(contentDir).filter((f) => f.endsWith(".mdx"));

  const posts = files.map((filename) => {
    const filePath = path.join(contentDir, filename);
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);

    return {
      slug: data.slug || filename.replace(/\.mdx$/, ""),
      title: data.title,
      date: data.date,
      category: data.category,
      subcategory: data.subcategory,
      tags: data.tags || [],
      featuredImage: data.featuredImage,
      excerpt: data.excerpt,
      readingTime: data.readingTime || readingTime(content).text,
      sources: data.sources || [],
      readNext: data.readNext || [],
      seo: data.seo,
      content,
    };
  });

  _postsCache = posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  _postsCacheTime = Date.now();
  return _postsCache;
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

export function getRelatedPosts(
  currentSlug: string,
  limit = 3
): BlogPostMeta[] {
  const posts = getAllPosts();
  const current = posts.find((p) => p.slug === currentSlug);
  if (!current) return [];

  return posts
    .filter((p) => p.slug !== currentSlug)
    .sort((a, b) => {
      const aRelevance =
        (a.category === current.category ? 2 : 0) +
        a.tags.filter((t) => current.tags.includes(t)).length;
      const bRelevance =
        (b.category === current.category ? 2 : 0) +
        b.tags.filter((t) => current.tags.includes(t)).length;
      return bRelevance - aRelevance;
    })
    .slice(0, limit)
    .map(({ content, ...meta }) => meta);
}


export function getPostMetasBySlugs(slugs: string[]): BlogPostMeta[] {
  const posts = getAllPosts();
  const found: BlogPostMeta[] = [];
  for (const slug of slugs) {
    const post = posts.find((p) => p.slug === slug);
    if (post) {
      const { content, ...meta } = post;
      found.push(meta);
    }
  }
  return found;
}

export function getPostsByCategory(categorySlugParam: string): BlogPost[] {
  return getAllPosts().filter(
    (p) => slugify(p.category) === categorySlugParam.toLowerCase()
  );
}

export function getAllCategories(): { name: string; slug: string; count: number; subcategories: string[] }[] {
  const posts = getAllPosts();
  const catMap = new Map<string, { count: number; subcategories: Set<string> }>();

  posts.forEach((p) => {
    const entry = catMap.get(p.category) || { count: 0, subcategories: new Set<string>() };
    entry.count++;
    if (p.subcategory) entry.subcategories.add(p.subcategory);
    catMap.set(p.category, entry);
  });

  return Array.from(catMap.entries()).map(([name, data]) => ({
    name,
    slug: slugify(name),
    count: data.count,
    subcategories: Array.from(data.subcategories),
  }));
}

export function searchPosts(query: string): BlogPost[] {
  const q = query.toLowerCase();
  return getAllPosts().filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.excerpt.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q))
  );
}
