"use client";

import { useEffect } from "react";
import { trackAnalyticsEvent } from "@/lib/analytics";

export function ArticleLinkTracking() {
  useEffect(() => {
    const body = document.querySelector("article");
    if (!body) return;

    function onClick(event: Event) {
      if (!(event.target instanceof Element)) return;
      const link = event.target.closest("a[href]");
      if (!link || !body?.contains(link)) return;
      const url = new URL(link.getAttribute("href") || "", window.location.href);
      if (!["http:", "https:"].includes(url.protocol)) return;
      if (url.pathname.endsWith(".pdf") || link.hasAttribute("data-retention-event") || link.getAttribute("rel")?.includes("sponsored")) return;

      if (url.origin === window.location.origin) {
        if (url.pathname === window.location.pathname) return;
        trackAnalyticsEvent("article_internal_link_click", {
          destination_path: url.pathname,
          link_context: link.closest(".prose-custom") ? "article_body" : "article_next_steps",
        });
      } else {
        trackAnalyticsEvent("article_source_click", { source_domain: url.hostname });
      }
    }

    body.addEventListener("click", onClick);
    return () => body.removeEventListener("click", onClick);
  }, []);

  return null;
}
