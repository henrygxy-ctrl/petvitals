"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { ANALYTICS_CONSENT_EVENT, googleTag, hasAnalyticsConsent, isProductionAnalyticsHost, trackAnalyticsEvent } from "@/lib/analytics";

export function GoogleAnalytics({ measurementId }: { measurementId: string }) {
  const [enabled, setEnabled] = useState(false);
  const initialized = useRef(false);

  useEffect(() => {
    function syncConsent() {
      const allowed = isProductionAnalyticsHost() && hasAnalyticsConsent();
      setEnabled(allowed);
      if (!allowed || initialized.current) return;
      initialized.current = true;
      googleTag("consent", "update", {
        analytics_storage: "granted",
        ad_storage: "granted",
        ad_user_data: "granted",
        ad_personalization: "granted",
      });
      googleTag("js", new Date());
      googleTag("config", measurementId);
    }

    function onAffiliateClick(event: MouseEvent) {
      if (!(event.target instanceof Element)) return;
      const link = event.target.closest<HTMLAnchorElement>('a[rel~="sponsored"]');
      if (!link) return;
      const url = new URL(link.href);
      trackAnalyticsEvent("affiliate_click", {
        event_category: "affiliate",
        affiliate_domain: url.hostname,
        link_text: (link.textContent || "").trim().slice(0, 80),
      });
    }

    syncConsent();
    window.addEventListener(ANALYTICS_CONSENT_EVENT, syncConsent);
    document.addEventListener("click", onAffiliateClick, true);
    return () => {
      window.removeEventListener(ANALYTICS_CONSENT_EVENT, syncConsent);
      document.removeEventListener("click", onAffiliateClick, true);
    };
  }, [measurementId]);

  // Preview visits should not inflate production acquisition reports.
  if (!enabled) return null;
  return <Script id="google-analytics" strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} />;
}
