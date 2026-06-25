import { ArticleCard } from "@/components/blog/article-card";
import type { BlogPostMeta } from "@/lib/blog";

export function RelatedArticles({ articles }: { articles: BlogPostMeta[] }) {
  return (
    <section className="mt-12 pt-8 border-t">
      <h2 className="text-lg font-semibold mb-4">Related Articles</h2>
      <div className="grid sm:grid-cols-3 gap-4">
        {articles.map((post) => (
          <ArticleCard key={post.slug} post={post} variant="compact" />
        ))}
      </div>
    </section>
  );
}
