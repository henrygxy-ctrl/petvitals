export const revalidate = 3600;

import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPostsByCategory, getAllCategories } from "@/lib/blog";
import { SITE_NAME, SITE_BASE_URL } from "@/lib/constants";
import { JsonLdBreadcrumb, JsonLdItemList } from "@/components/seo/json-ld";
import { ArticleCard } from "@/components/blog/article-card";

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const categories = getAllCategories();
  const cat = categories.find((c) => c.slug === category);
  const title = cat
    ? `${cat.name} | Pet Health Articles | ${SITE_NAME}`
    : `Category | ${SITE_NAME}`;
  const description = cat
    ? `Browse our ${cat.name.toLowerCase()} articles. Evidence-based pet health guides for dog and cat owners.`
    : "Browse pet health articles by category.";
  const url = `${SITE_BASE_URL}/blog/category/${category}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
      images: [{ url: `${SITE_BASE_URL}/og-image.png`, width: 1200, height: 630, alt: `${SITE_NAME} Blog` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE_BASE_URL}/og-image.png`],
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const posts = getPostsByCategory(category);

  if (posts.length === 0) notFound();

  const categories = getAllCategories();
  const cat = categories.find((c) => c.slug === category);
  const displayName = cat?.name || category;

  const breadcrumbs = [
    { name: "Home", url: SITE_BASE_URL },
    { name: "Blog", url: `${SITE_BASE_URL}/blog` },
    { name: displayName, url: `${SITE_BASE_URL}/blog/category/${category}` },
  ];
  const postItems = posts.map((post) => ({
    name: post.title,
    url: `${SITE_BASE_URL}/blog/${post.slug}`,
    description: post.excerpt,
  }));

  return (
    <>
      <JsonLdBreadcrumb items={breadcrumbs} />
      <JsonLdItemList items={postItems} />
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
          <span className="font-semibold text-sm">{displayName}</span>
        </div>
      </header>

      <main className="flex-1 py-8 sm:py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">{displayName}</h1>
          <p className="text-muted-foreground mb-8">
            {posts.length} article{posts.length !== 1 ? "s" : ""}
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <ArticleCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </main>

      <footer className="border-t py-6 text-center text-xs text-muted-foreground">
        &copy; {new Date().getFullYear()} {SITE_NAME}. Always consult your veterinarian.
      </footer>
    </div>
    </>
  );
}
