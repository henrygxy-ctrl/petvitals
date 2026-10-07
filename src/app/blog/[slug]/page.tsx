import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getPostBySlug, getRelatedPosts } from "@/lib/blog";
import { BLOG_FAQS } from "@/lib/blog-faq";
import { getNewsletterConfig } from "@/lib/newsletter";
import { slugify } from "@/lib/utils";
import { SITE_NAME, SITE_BASE_URL } from "@/lib/constants";
import { SourceCitation } from "@/components/blog/source-citation";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { ArticleLinkTracking } from "@/components/blog/article-link-tracking";
import { NewsletterSignup } from "@/components/newsletter/newsletter-signup";
import { ReadNext } from "@/components/blog/read-next";
import { RelatedArticles } from "@/components/blog/related-articles";
import { ArticleJsonLd } from "@/components/blog/article-json-ld";
import { InArticleAd } from "@/components/ads/AdUnit";
import { ProductRecommendationCard } from "@/components/affiliate/product-rec-card";
import { getProductRecommendations } from "@/lib/affiliate";
import { JsonLdBreadcrumb, JsonLdFAQ } from "@/components/seo/json-ld";
import { DownloadResourceCard } from "@/components/downloads/resource-card";
import type { ContextualHubLink } from "@/components/hubs/contextual-hub-links";
import {
  CleaningSafetyInfographic,
  PuppyTimelineInfographic,
  VetCostInfographic,
} from "@/components/infographics/topic-infographics";
import { ArticleTools } from "@/components/blog/article-tools";
import { ArticleActionStrip } from "@/components/blog/article-action-strip";
import { EditorialTrustPanel } from "@/components/blog/editorial-trust-panel";
import { NavHeader } from "@/components/landing/nav-header";
import { ArrowRight, Calendar, Clock, Tag, User } from "lucide-react";

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

  const title = post.seo?.title || post.title;
  const description = post.seo?.description || post.excerpt;
  const image = post.seo?.ogImage || post.featuredImage || `${SITE_BASE_URL}/og-image.png`;
  const url = `${SITE_BASE_URL}/blog/${post.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updated || post.date,
      authors: [post.author || "PetVitals Editorial Team"],
      images: [{ url: image }],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(slug, 2);
  const productRecs = getProductRecommendations(post.slug);
  const faqQuestions = BLOG_FAQS[post.slug] || [];
  const toolMode = getVetBillToolMode(post.slug);
  const downloadVariant = getDownloadVariant(post.slug);
  const showCleaningChecker = CLEANING_TOOL_SLUGS.has(post.slug);
  const showPuppyPlanner = post.slug === "puppy-vaccination-schedule";
  const editorialDate = post.updated || post.date;
  const editorialDateLabel = post.updated ? "Updated" : "Published";
  const contextualHubLinks = getContextualHubLinks(post.slug, post.tags);

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
      {faqQuestions.length > 0 && <JsonLdFAQ questions={faqQuestions} />}
      <JsonLdBreadcrumb items={breadcrumbs} />
      <div className="min-h-screen flex flex-col">
        <NavHeader />
        <div className="border-b bg-muted/20">
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
        </div>

        <main className="flex-1 py-6 sm:py-12">
          <article className="max-w-3xl mx-auto px-4 sm:px-6">
            <div className="mb-4 sm:mb-8">
              <Link
                href={`/blog/category/${slugify(post.category)}`}
                className="text-xs font-medium text-emerald-600 dark:text-emerald-400 uppercase tracking-wide hover:underline"
              >
                {post.category}
              </Link>
              <h1 className="text-2xl sm:text-3xl font-bold mt-2 mb-3 sm:mb-4">
                {post.title}
              </h1>
              <p className="mb-3 sm:mb-4 text-base leading-relaxed text-muted-foreground">
                {post.excerpt}
              </p>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm text-muted-foreground">
                <span className="hidden sm:flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <Link href="/about#editorial-team" className="flex items-center gap-1.5 hover:underline">
                  <User className="h-4 w-4" />
                  {post.author || "PetVitals Editorial Team"}
                </Link>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  {post.readingTime}
                </span>
                <div className="hidden sm:flex items-center gap-1.5 flex-wrap">
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

            <EditorialTrustPanel
              sourceCount={post.sources.length}
              editorialDate={editorialDate}
              dateLabel={editorialDateLabel}
            />

            <TableOfContents />

            <ArticleActionStrip slug={post.slug} />

            {showPuppyPlanner && <PuppyTimelineInfographic />}
            {toolMode && <VetCostInfographic />}

            {showPuppyPlanner && <ArticleTools kind="vaccines" />}
            {toolMode && <ArticleTools kind={toolMode} />}

            <div className="prose-custom">
              <ArticleLinkTracking />
              <Content />
            </div>

            {showCleaningChecker && <CleaningSafetyInfographic />}
            {showCleaningChecker && <ArticleTools kind="cleaning" />}

                        <InArticleAd />

            {/* Affiliate product recommendations */}
            {productRecs.length > 0 && (
              <ProductRecommendationCard products={productRecs} />
            )}

            {post.sources.length > 0 && (
              <SourceCitation sources={post.sources} />
            )}

            <section aria-label="Next steps" className="mt-8 border-t pt-8">
              <h2 className="text-lg font-semibold">Continue with PetVitals</h2>
              <p className="mt-1 text-sm text-muted-foreground">Save a checklist, explore a related guide, or use a planning tool.</p>
              {downloadVariant && <DownloadResourceCard variant={downloadVariant} />}
              {contextualHubLinks.filter((link) => !(downloadVariant === "cleaning" && link.href === "/pet-safe-cleaning")).slice(0, 1).map((link) => (
                <Link key={link.href} href={link.href} className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-primary hover:underline">
                  {link.title} <ArrowRight className="h-4 w-4" />
                </Link>
              ))}
              {post.readNext && post.readNext.length > 0 ? (
                <ReadNext slugs={post.readNext.slice(0, 2)} />
              ) : related.length > 0 ? (
                <RelatedArticles articles={related} />
              ) : null}
            </section>
          </article>
        </main>

        {!downloadVariant && getNewsletterConfig() && <section className="py-12 border-t">
          <div className="max-w-3xl mx-auto px-4">
            <NewsletterSignup
              source="blog_article_footer"
              interest={post.category}
              fallback={false}
            />
          </div>
        </section>}

        <footer className="border-t py-6 text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} {SITE_NAME}. Always consult your veterinarian.
        </footer>
      </div>
    </>
  );
}

const CLEANING_TOOL_SLUGS = new Set([
  "best-pet-safe-cleaning-products",
  "cat-friendly-cleaning-products",
  "pet-safe-floor-cleaners-dogs-cats",
  "disinfectants-safe-for-cats",
  "can-cats-walk-on-floors-after-mopping",
  "is-vinegar-floor-cleaner-safe-for-pets",
  "are-essential-oil-cleaners-safe-for-cats",
]);

const PUPPY_HUB_SLUGS = new Set([
  "puppy-vaccination-schedule",
  "puppy-first-vet-visit-cost",
  "bringing-home-new-puppy-checklist",
]);

const VET_COST_HUB_SLUGS = new Set([
  "puppy-first-vet-visit-cost",
  "how-much-is-a-dog-teeth-cleaning",
  "dog-dental-cleaning-cost",
  "pet-insurance-worth-it",
  "pet-emergency-kit-checklist",
]);

const DOG_TOXICITY_HUB_SLUGS = new Set([
  "dog-chocolate-toxicity",
  "can-dogs-eat-grapes",
  "can-dogs-eat-onions",
  "can-dogs-eat-avocado",
  "common-household-poisons-pets",
  "sago-palm-toxicity-pets",
]);

const CAT_TOXICITY_HUB_SLUGS = new Set([
  "lily-toxicity-cats",
  "household-plants-toxic-to-cats",
  "can-cats-eat-tuna",
  "can-cats-eat-cantaloupe",
  "common-household-poisons-pets",
  "sago-palm-toxicity-pets",
]);

function getContextualHubLinks(slug: string, tags: string[]): ContextualHubLink[] {
  const links: ContextualHubLink[] = [];
  const tagText = tags.join(" ").toLowerCase();

  const add = (link: ContextualHubLink) => {
    if (!links.some((existing) => existing.href === link.href)) {
      links.push(link);
    }
  };

  if (
    CLEANING_TOOL_SLUGS.has(slug) ||
    tagText.includes("cleaning") ||
    tagText.includes("cleaners") ||
    tagText.includes("disinfectants")
  ) {
    add({
      title: "Pet-Safe Cleaning Hub",
      href: "/pet-safe-cleaning",
      label: "Cleaning hub",
      description: "Cleaner ingredient checker, floor residue guidance, and cat-safe disinfectant advice.",
    });
  }

  if (PUPPY_HUB_SLUGS.has(slug) || tagText.includes("puppy")) {
    add({
      title: "Puppy Care Hub",
      href: "/puppy-care",
      label: "Puppy hub",
      description: "Vaccines, first-year costs, supplies, safety, and new puppy planning tools.",
    });
  }

  if (
    VET_COST_HUB_SLUGS.has(slug) ||
    slug.includes("cost") ||
    tagText.includes("insurance") ||
    tagText.includes("emergency")
  ) {
    add({
      title: "Vet Cost Hub",
      href: "/vet-costs",
      label: "Cost hub",
      description: "Emergency, dental, puppy, and insurance cost planning resources in one place.",
    });
  }

  if (
    DOG_TOXICITY_HUB_SLUGS.has(slug) ||
    slug.includes("poison") ||
    slug.includes("toxicity") ||
    tagText.includes("toxicity") ||
    tagText.includes("poison")
  ) {
    add({
      title: "Dog Toxicity Guide",
      href: "/toxicity/dogs",
      label: "Dog safety",
      description: "Common dog food, plant, medication, and household poisoning searches.",
    });
  }

  if (
    CAT_TOXICITY_HUB_SLUGS.has(slug) ||
    slug.includes("poison") ||
    slug.includes("toxicity") ||
    tagText.includes("cats") ||
    tagText.includes("cat safety")
  ) {
    add({
      title: "Cat Toxicity Guide",
      href: "/toxicity/cats",
      label: "Cat safety",
      description: "Cat-specific plant, cleaner, food, and medication toxicity resources.",
    });
  }

  return links.slice(0, 4);
}

function getVetBillToolMode(slug: string) {
  if (slug === "how-much-is-a-dog-teeth-cleaning" || slug === "dog-dental-cleaning-cost") {
    return "dental" as const;
  }
  if (slug === "puppy-first-vet-visit-cost") {
    return "puppy" as const;
  }
  return null;
}

function getDownloadVariant(slug: string) {
  if (CLEANING_TOOL_SLUGS.has(slug)) {
    return "cleaning" as const;
  }

  if (slug.includes("insurance")) return "insurance" as const;
  if (slug === "pet-emergency-kit-checklist") return "emergency" as const;

  if (
    slug.includes("poison") ||
    slug.includes("toxicity") ||
    slug === "dog-chocolate-toxicity" ||
    slug === "can-dogs-eat-grapes" ||
    slug === "can-dogs-eat-onions" ||
    slug === "common-household-poisons-pets"
  ) {
    return "poison" as const;
  }

  if (
    slug === "puppy-vaccination-schedule" ||
    slug === "puppy-first-vet-visit-cost" ||
    slug === "bringing-home-new-puppy-checklist"
  ) {
    return "puppy" as const;
  }

  return null;
}
