"use client";

import { useEffect, useRef } from "react";

type AdFormat = "auto" | "horizontal" | "vertical" | "rectangle";

interface AdUnitProps {
  className?: string;
  /** Override slot ID (defaults to NEXT_PUBLIC_ADSENSE_SLOT) */
  slotId?: string;
  /** Ad format hint */
  format?: AdFormat;
  /** Label shown above the ad for UX (e.g., "Advertisement") */
  showLabel?: boolean;
}

const PUBLISHER_ID = "ca-pub-7248211571487483";

const formatStyles: Record<AdFormat, React.CSSProperties> = {
  auto: { display: "block", minWidth: "300px", maxWidth: "100%" },
  horizontal: { display: "block", width: "100%", height: "90px" },
  vertical: { display: "block", width: "300px", height: "600px" },
  rectangle: { display: "block", width: "100%", height: "250px" },
};

export function AdUnit({ className = "", slotId, format = "auto", showLabel = false }: AdUnitProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  const slot = slotId || process.env.NEXT_PUBLIC_ADSENSE_SLOT;

  useEffect(() => {
    if (!adRef.current || initialized.current || !slot) return;
    initialized.current = true;

    try {
      const adsbygoogle = (window as any).adsbygoogle || [];
      adsbygoogle.push({});
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, [slot]);

  if (!slot) return null;

  return (
    <div className={`flex flex-col items-center ${className}`}>
      {showLabel && (
        <span className="text-[10px] text-muted-foreground/50 uppercase tracking-wider mb-1">
          Advertisement
        </span>
      )}
      <div ref={adRef}>
        <ins
          className="adsbygoogle"
          style={formatStyles[format]}
          data-ad-client={PUBLISHER_ID}
          data-ad-slot={slot}
          data-ad-format={format === "auto" ? "auto" : "rectangle"}
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
}

/** In-article ad placement for blog posts */
export function InArticleAd() {
  return (
    <AdUnit
      className="my-10 py-6 border-y"
      format="rectangle"
      showLabel
      slotId={process.env.NEXT_PUBLIC_ADSENSE_ARTICLE_SLOT}
    />
  );
}

/** Between-cards ad placement for feed/list pages */
export function FeedAd() {
  return (
    <AdUnit
      className="py-4"
      format="rectangle"
      showLabel
      slotId={process.env.NEXT_PUBLIC_ADSENSE_FEED_SLOT}
    />
  );
}