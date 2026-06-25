import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAllPosts } from "@/lib/blog";
import { ArticleCard } from "@/components/blog/article-card";
import type { BlogPostMeta } from "@/lib/blog";

export function LatestBlog() {
  const posts = getAllPosts().slice(0, 3);
  const metas: BlogPostMeta[] = posts.map(({ content, ...meta }) => meta);

  if (metas.length === 0) return null;

  return (
    <section className="py-16 sm:py-20 border-t">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold">Latest from the Blog</h2>
            <p className="mt-2 text-muted-foreground">
              Evidence-based guides for pet owners
            </p>
          </div>
          <Link
            href="/blog"
            className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:underline"
          >
            View all
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          {metas.map((post) => (
            <ArticleCard key={post.slug} post={post} />
          ))}
        </div>

        <div className="mt-6 text-center sm:hidden">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:underline"
          >
            View all articles
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
