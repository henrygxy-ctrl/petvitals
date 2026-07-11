import type { MetadataRoute } from "next";
import { SITE_BASE_URL } from "@/lib/constants";
import { getAllPosts, getAllCategories } from "@/lib/blog";
import { toxicityDatabase } from "@/data/toxicity";
import { getToxicityCategoryEntries } from "@/lib/toxicity-category-metadata";

const CONTENT_LAST_MODIFIED = new Date("2026-07-11");

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_BASE_URL, lastModified: CONTENT_LAST_MODIFIED, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE_BASE_URL}/toxicity`, lastModified: CONTENT_LAST_MODIFIED, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_BASE_URL}/feeding-calculator`, lastModified: CONTENT_LAST_MODIFIED, changeFrequency: "weekly", priority: 0.85 },
    { url: `${SITE_BASE_URL}/weight-tracking`, lastModified: CONTENT_LAST_MODIFIED, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${SITE_BASE_URL}/blog`, lastModified: CONTENT_LAST_MODIFIED, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_BASE_URL}/insurance`, lastModified: CONTENT_LAST_MODIFIED, changeFrequency: "monthly" as const, priority: 0.75 },
    { url: `${SITE_BASE_URL}/contact`, lastModified: CONTENT_LAST_MODIFIED, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_BASE_URL}/privacy`, lastModified: CONTENT_LAST_MODIFIED, changeFrequency: "monthly", priority: 0.3 },
    { url: `${SITE_BASE_URL}/terms`, lastModified: CONTENT_LAST_MODIFIED, changeFrequency: "monthly", priority: 0.3 },
    { url: `${SITE_BASE_URL}/about`, lastModified: CONTENT_LAST_MODIFIED, changeFrequency: "monthly" as const, priority: 0.6 },
  ];

  const insurancePages: MetadataRoute.Sitemap = [
    "accident-only",
    "accident-illness",
    "comprehensive",
    "lifetime",
    "pet-insurance-cost",
    "emergency-vet-cost",
    "best-pet-insurance-for-dogs",
  ].map((slug) => ({
    url: `${SITE_BASE_URL}/insurance/${slug}`,
    lastModified: CONTENT_LAST_MODIFIED,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const posts = getAllPosts();
  const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const categories = getAllCategories();
  const categoryPages: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${SITE_BASE_URL}/blog/category/${cat.slug}`,
    lastModified: CONTENT_LAST_MODIFIED,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const toxicityCategoryPages: MetadataRoute.Sitemap = getToxicityCategoryEntries().map((cat) => ({
    url: `${SITE_BASE_URL}/toxicity/category/${cat.id}`,
    lastModified: CONTENT_LAST_MODIFIED,
    changeFrequency: "weekly" as const,
    priority: 0.72,
  }));

  const toxicityPages: MetadataRoute.Sitemap = toxicityDatabase.map((item) => ({
    url: `${SITE_BASE_URL}/toxicity/${item.id}`,
    lastModified: CONTENT_LAST_MODIFIED,
    changeFrequency: "monthly" as const,
    priority: 0.65,
  }));

  return [...staticPages, ...toxicityCategoryPages, ...toxicityPages, ...insurancePages, ...blogPages, ...categoryPages];
}
