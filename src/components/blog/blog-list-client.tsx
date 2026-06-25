"use client";

import React, { useState, useMemo } from "react";
import { Search, X, Filter } from "lucide-react";
import { slugify } from "@/lib/utils";
import { FeedAd } from "@/components/ads/AdUnit";
import { ArticleCard } from "@/components/blog/article-card";
import type { BlogPost, BlogPostMeta } from "@/lib/blog";

interface BlogListClientProps {
  posts: BlogPost[];
  categories: { name: string; slug: string; count: number; subcategories: string[] }[];
}

export function BlogListClient({ posts, categories }: BlogListClientProps) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = posts;

    if (activeCategory) {
      result = result.filter(
        (p) => slugify(p.category) === activeCategory
      );
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    return result;
  }, [posts, search, activeCategory]);

  const postMetas: BlogPostMeta[] = filtered.map(({ content, ...meta }) => meta);

  return (
    <div>
      {/* Search + Filter bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-8 py-2 rounded-md border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 rounded hover:bg-muted"
            >
              <X className="h-3.5 w-3.5 text-muted-foreground" />
            </button>
          )}
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-md border text-sm transition-colors ${
            activeCategory
              ? "border-emerald-500 text-emerald-600 dark:text-emerald-400"
              : "hover:bg-muted"
          }`}
        >
          <Filter className="h-4 w-4" />
          {activeCategory
            ? categories.find((c) => c.slug === activeCategory)?.name || activeCategory
            : "All Categories"}
        </button>
      </div>

      {/* Category chips */}
      {showFilters && (
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => {
              setActiveCategory("");
              setShowFilters(false);
            }}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              !activeCategory
                ? "bg-primary text-primary-foreground"
                : "bg-muted hover:bg-muted/80"
            }`}
          >
            All ({posts.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => {
                setActiveCategory(cat.slug);
                setShowFilters(false);
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                activeCategory === cat.slug
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted hover:bg-muted/80"
              }`}
            >
              {cat.name} ({cat.count})
            </button>
          ))}
        </div>
      )}

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-muted-foreground">No articles found.</p>
          {(search || activeCategory) && (
            <button
              onClick={() => {
                setSearch("");
                setActiveCategory("");
              }}
              className="text-sm text-emerald-600 dark:text-emerald-400 hover:underline mt-2"
            >
              Clear filters
            </button>
          )}
        </div>
      )}

      {/* Grid with interspersed ads */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {postMetas.map((post, i) => (
          <React.Fragment key={post.slug}>
            {i > 0 && i % 3 === 0 && (
              <div className="sm:col-span-2 lg:col-span-3">
                <FeedAd />
              </div>
            )}
            <ArticleCard post={post} />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}