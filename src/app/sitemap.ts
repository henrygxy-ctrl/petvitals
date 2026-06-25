import type { MetadataRoute } from "next";
import { SITE_BASE_URL } from "@/lib/constants";
import { getAllPosts, getAllCategories } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_BASE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE_BASE_URL}/toxicity`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_BASE_URL}/feeding-calculator`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.85 },
    { url: `${SITE_BASE_URL}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_BASE_URL}/insurance`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.75 },
    { url: `${SITE_BASE_URL}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_BASE_URL}/privacy`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
    { url: `${SITE_BASE_URL}/terms`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
    { url: `${SITE_BASE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.6 },
  ];

  const insurancePages: MetadataRoute.Sitemap = [
    "accident-only",
    "accident-illness",
    "comprehensive",
    "lifetime",
  ].map((slug) => ({
    url: `${SITE_BASE_URL}/insurance/${slug}`,
    lastModified: new Date(),
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
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...insurancePages, ...blogPages, ...categoryPages];
}