import { SITE_NAME, SITE_BASE_URL, SITE_DESCRIPTION } from "@/lib/constants";

export function JsonLdOrganization() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: SITE_NAME,
    url: SITE_BASE_URL,
    description: SITE_DESCRIPTION,
    applicationCategory: "HealthApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    about: {
      "@type": "Thing",
      name: "Pet Health & Safety",
      description:
        "Tools and guides for pet owners including toxicity checking, feeding calculators, weight tracking, and insurance education.",
    },
    author: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_BASE_URL,
      contactPoint: {
        "@type": "ContactPoint",
        email: "henrygxy@gmail.com",
        contactType: "customer support",
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function JsonLdWebSiteSearch() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_BASE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_BASE_URL}/toxicity?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function JsonLdBreadcrumb({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function JsonLdFAQ({
  questions,
}: {
  questions: { question: string; answer: string }[];
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function JsonLdItemList({
  items,
}: {
  items: { name: string; url: string; description?: string }[];
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: item.url,
      name: item.name,
      ...(item.description ? { description: item.description } : {}),
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function JsonLdWebPage({
  name,
  url,
  description,
  dateModified,
  keywords,
  about,
  citations,
}: {
  name: string;
  url: string;
  description: string;
  dateModified?: string;
  keywords?: string[];
  about?: { name: string; description: string; alternateName?: string[] };
  citations?: { name: string; url: string }[];
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    url,
    description,
    inLanguage: "en-US",
    isAccessibleForFree: true,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_BASE_URL,
    },
    ...(dateModified && { dateModified }),
    ...(keywords && keywords.length > 0 && { keywords: keywords.join(", ") }),
    ...(about && {
      about: {
        "@type": "Thing",
        name: about.name,
        description: about.description,
        ...(about.alternateName && about.alternateName.length > 0
          ? { alternateName: about.alternateName }
          : {}),
      },
    }),
    ...(citations && citations.length > 0 && {
      citation: citations.map((citation) => ({
        "@type": "CreativeWork",
        name: citation.name,
        url: citation.url,
      })),
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
