import Link from "next/link";
import { Rss } from "lucide-react";
import type { Metadata } from "next";
import { getAllPosts, getAllCategories } from "@/lib/blog";
import { SITE_NAME, SITE_BASE_URL } from "@/lib/constants";
import { NewsletterSignup } from "@/components/newsletter/newsletter-signup";
import { AdUnit } from "@/components/ads/AdUnit";
import { BlogListClient } from "@/components/blog/blog-list-client";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: `Blog - Pet Health & Safety Guides | ${SITE_NAME}`,
  description:
    "Expert pet health articles on nutrition, toxicity, weight management, and safety. Evidence-based guides for dog and cat owners.",
  alternates: { canonical: `${SITE_BASE_URL}/blog` },
  openGraph: {
    title: `Pet Health Blog | ${SITE_NAME}`,
    description:
      "Evidence-based pet health guides for dog and cat owners. Nutrition, safety, weight management, and more.",
    url: `${SITE_BASE_URL}/blog`,
    siteName: SITE_NAME,
    type: "website",
    images: [{ url: `${SITE_BASE_URL}/og-image.png`, width: 1200, height: 630, alt: "PetVitals Blog" }],
  },
};

export default function BlogPage() {
  const posts = getAllPosts();
  const categories = getAllCategories();

  return (
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
          <span className="font-semibold text-sm">Blog</span>
        </div>
      </header>

      <main className="flex-1 py-8 sm:py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="mb-8"><div className="flex items-center justify-between mb-2"><h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Pet Health Blog</h1><Link href="/blog/rss.xml" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-orange-500 transition-colors shrink-0"><Rss className="h-3.5 w-3.5" />RSS</Link></div>
            
            <p className="mt-2 text-muted-foreground max-w-2xl">Evidence-based guides on pet nutrition, safety, weight management, and more.</p>
          </div>

          <BlogListClient posts={posts} categories={categories} />

          <AdUnit />
        </div>
      </main>

                <section className="py-12 border-t">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
              <NewsletterSignup />
            </div>
          </section>

        <footer className="border-t py-6 text-center text-xs text-muted-foreground">
        &copy; {new Date().getFullYear()} {SITE_NAME}. Always consult your veterinarian.
      </footer>
    </div>
  );
}
