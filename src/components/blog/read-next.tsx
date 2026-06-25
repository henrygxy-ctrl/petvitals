import { getPostMetasBySlugs } from "@/lib/blog";
import { ArticleCard } from "@/components/blog/article-card";
import { BookOpen } from "lucide-react";

export function ReadNext({ slugs }: { slugs: string[] }) {
  if (!slugs || slugs.length === 0) return null;
  const posts = getPostMetasBySlugs(slugs);
  if (posts.length === 0) return null;

  return (
    <section className="mt-12 pt-8 border-t">
      <div className="flex items-center gap-2 mb-4">
        <BookOpen className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
        <h2 className="text-lg font-semibold">Read Next</h2>
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        Hand-picked articles to continue your reading.
      </p>
      <div className="grid sm:grid-cols-2 gap-4">
        {posts.map((post) => (
          <ArticleCard key={post.slug} post={post} variant="horizontal" />
        ))}
      </div>
    </section>
  );
}
