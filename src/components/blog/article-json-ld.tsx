import { SITE_NAME, SITE_BASE_URL } from "@/lib/constants";
import type { BlogPost } from "@/lib/blog";

function toAbsoluteUrl(url: string) {
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  return `${SITE_BASE_URL}${url.startsWith("/") ? "" : "/"}${url}`;
}

export function ArticleJsonLd({ post }: { post: BlogPost }) {
  const image = post.seo?.ogImage || post.featuredImage;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_BASE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_BASE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_BASE_URL}/blog/${post.slug}`,
    },
    ...(image && { image: toAbsoluteUrl(image) }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
