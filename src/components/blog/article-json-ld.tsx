import { SITE_NAME, SITE_BASE_URL } from "@/lib/constants";
import type { BlogPost } from "@/lib/blog";

export function ArticleJsonLd({ post }: { post: BlogPost }) {
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
    ...(post.seo?.ogImage && {
      image: post.seo.ogImage,
    }),
    ...(post.featuredImage &&
      !post.seo?.ogImage && {
        image: post.featuredImage,
      }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
