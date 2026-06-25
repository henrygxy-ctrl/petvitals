import type { MetadataRoute } from "next";
import { SITE_BASE_URL } from "@/lib/constants";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      disallow: ["/api/", "/dashboard", "/sign-in", "/sign-up", "/pets/"],
    },
    sitemap: `${SITE_BASE_URL}/sitemap.xml`,
  };
}
