import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getPostBySlug, getRelatedPosts } from "@/lib/blog";
import { slugify } from "@/lib/utils";
import { SITE_NAME, SITE_BASE_URL } from "@/lib/constants";
import { SourceCitation } from "@/components/blog/source-citation";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { ReadNext } from "@/components/blog/read-next";
import { RelatedArticles } from "@/components/blog/related-articles";
import { ArticleJsonLd } from "@/components/blog/article-json-ld";
import { AdUnit, InArticleAd } from "@/components/ads/AdUnit";
import { JsonLdBreadcrumb } from "@/components/seo/json-ld";
import { Calendar, Clock, Tag, User } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export const revalidate = 3600;

export async function generateStaticParams() {
  const { getAllPosts } = await import("@/lib/blog");
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.seo?.title || post.title,
    description: post.seo?.description || post.excerpt,
    alternates: { canonical: `${SITE_BASE_URL}/blog/${post.slug}` },
    openGraph: {
      title: post.seo?.title || post.title,
      description: post.seo?.description || post.excerpt,
      url: `${SITE_BASE_URL}/blog/${post.slug}`,
      siteName: SITE_NAME,
      type: "article",
      publishedTime: post.date,
      authors: [SITE_NAME],
      images: post.seo?.ogImage
        ? [{ url: post.seo.ogImage }]
        : post.featuredImage
          ? [{ url: post.featuredImage }]
          : undefined,
      tags: post.tags,
    },
  };
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(slug);

  let Content: React.ComponentType;
  try {
    const mod = await import(
      `@/content/blog/${slug}.mdx`
    );
    Content = mod.default;
  } catch {
    notFound();
  }

  const breadcrumbs = [
    { name: "Home", url: SITE_BASE_URL },
    { name: "Blog", url: `${SITE_BASE_URL}/blog` },
    { name: post.title, url: `${SITE_BASE_URL}/blog/${post.slug}` },
  ];

  return (
    <>
      <ArticleJsonLd post={post} />
      <JsonLdBreadcrumb items={breadcrumbs} />
      <div className="min-h-screen flex flex-col">
        <header className="border-b">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-2">
            <Link
              href="/"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Home
            </Link>
            <span className="text-muted-foreground">/</span>
            <Link
              href="/blog"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Blog
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-sm text-foreground/70 truncate max-w-[200px] sm:max-w-xs">
              {post.title}
            </span>
          </div>
        </header>

        <main className="flex-1 py-8 sm:py-12">
          <article className="max-w-3xl mx-auto px-4 sm:px-6">
            <div className="mb-8">
              <Link
                href={`/blog/category/${slugify(post.category)}`}
                className="text-xs font-medium text-emerald-600 dark:text-emerald-400 uppercase tracking-wide hover:underline"
              >
                {post.category}
              </Link>
              <h1 className="text-2xl sm:text-3xl font-bold mt-2 mb-4">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <span className="flex items-center gap-1.5">
                  <User className="h-4 w-4" />
                  {post.author || "PetVitals Editorial Team"}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  {post.readingTime}
                </span>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <Tag className="h-4 w-4" />
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="bg-muted px-2 py-0.5 rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <TableOfContents />

            <div className="prose-custom">
              <Content />
            </div>

            <InArticleAd />

            {post.sources.length > 0 && (
              <SourceCitation sources={post.sources} />
            )}

            {post.readNext && post.readNext.length > 0 && (
              <ReadNext slugs={post.readNext} />
            )}

            {/* Cross-promotion to tools */}
            <div className="mt-8 grid sm:grid-cols-2 gap-4">
              <a
                href="/toxicity"
                className="p-4 rounded-lg border bg-card hover:border-primary/30 transition-colors text-sm"
              >
                <span className="font-semibold block mb-1">Check More Foods</span>
                <span className="text-muted-foreground text-xs">Search 500+ items in our free Toxicity Checker</span>
              </a>
              <a
                href="/feeding-calculator"
                className="p-4 rounded-lg border bg-card hover:border-primary/30 transition-colors text-sm"
              >
                <span className="font-semibold block mb-1">Feeding Calculator</span>
                <span className="text-muted-foreground text-xs">Calculate daily portions based on your pet&apos;s weight</span>
              </a>
            </div>

            {related.length > 0 && (
              <RelatedArticles articles={related} />
            )}
          </article>
        </main>

        <footer className="border-t py-6 text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} {SITE_NAME}. Always consult your veterinarian.
        </footer>
      </div>
    </>
  );
}
