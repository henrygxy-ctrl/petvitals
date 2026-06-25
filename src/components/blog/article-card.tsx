"use client";

import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock } from "lucide-react";
import { slugify } from "@/lib/utils";
import type { BlogPostMeta } from "@/lib/blog";

interface ArticleCardProps {
  post: BlogPostMeta;
  variant?: "default" | "compact" | "horizontal";
}

export function ArticleCard({ post, variant = "default" }: ArticleCardProps) {
  const catLink = `/blog/category/${slugify(post.category)}`;

  if (variant === "compact") {
    return (
      <Link
        href={`/blog/${post.slug}`}
        className="block p-3 rounded-lg border hover:border-primary/30 transition-colors group"
      >
        <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 uppercase tracking-wide">
          {post.category}
        </span>
        <h3 className="font-medium text-sm mt-1 group-hover:text-primary transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="text-xs text-muted-foreground mt-1 flex items-center gap-2">
          <Clock className="h-3 w-3" />
          {post.readingTime}
        </p>
      </Link>
    );
  }

  if (variant === "horizontal") {
    return (
      <Link
        href={`/blog/${post.slug}`}
        className="flex gap-4 p-4 rounded-lg border hover:border-primary/30 transition-colors group"
      >
        <div className="flex-1 min-w-0">
          <Link href={catLink} className="text-xs font-medium text-emerald-600 dark:text-emerald-400 uppercase tracking-wide hover:underline">
            {post.category}
          </Link>
          <h3 className="font-semibold mt-1 group-hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </h3>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
            {post.excerpt}
          </p>
          <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {new Date(post.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {post.readingTime}
            </span>
          </div>
        </div>
      </Link>
    );
  }

  // default card
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="block rounded-lg border bg-card hover:border-primary/30 transition-colors overflow-hidden group"
    >
      {post.featuredImage && (
        <div className="aspect-[16/9] bg-muted overflow-hidden">
          <Image src={post.featuredImage} alt={post.title} width={640} height={360} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        </div>
      )}
      <div className="p-5">
        <Link href={catLink} className="text-xs font-medium text-emerald-600 dark:text-emerald-400 uppercase tracking-wide hover:underline">
          {post.category}
        </Link>
        <h3 className="font-semibold mt-1.5 group-hover:text-primary transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="text-sm text-muted-foreground mt-1.5 line-clamp-2">
          {post.excerpt}
        </p>
        <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {new Date(post.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {post.readingTime}
          </span>
        </div>
      </div>
    </Link>
  );
}
