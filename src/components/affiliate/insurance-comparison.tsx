"use client";

import { Shield, Star, ArrowRight } from "lucide-react";
import type { InsurancePartner } from "@/lib/affiliate";
import { trackAnalyticsEvent } from "@/lib/analytics";

interface InsuranceComparisonProps {
  partners: InsurancePartner[];
  className?: string;
}

export function InsuranceComparison({ partners, className = "" }: InsuranceComparisonProps) {
  if (partners.length === 0) return null;
  const hasAffiliateLinks = partners.some((partner) => partner.isAffiliate);

  return (
    <div className={`${className}`}>
      <div className="flex items-center gap-2 mb-4">
        <Shield className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-bold">Top Pet Insurance Providers</h2>
      </div>
      <p className="mb-4 text-xs text-muted-foreground">
        Provider features are summarized from public information. Some links may be tracked partner links and may earn PetVitals a commission at no extra cost to you; that does not change the comparison order.
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {partners.map((p) => (
          <a
            key={p.name}
            href={p.url}
            target="_blank"
            rel={p.isAffiliate ? "noopener sponsored" : "noopener"}
            onClick={() => {
              let destinationHost = "";
              try {
                destinationHost = new URL(p.url).hostname;
              } catch {
                destinationHost = p.name;
              }

              trackAnalyticsEvent("affiliate_insurance_click", {
                partner_name: p.name,
                affiliate: p.isAffiliate,
                destination_host: destinationHost,
                cta_location: "insurance_comparison_grid",
              })
            }}
            className="p-5 rounded-xl border bg-card hover:border-primary/40 hover:shadow-sm transition-all group"
          >
            <div className="mb-3 flex items-center justify-between gap-2">
              <h3 className="font-semibold text-sm">{p.name}</h3>
              <div className="flex shrink-0 items-center gap-1">
                <span className="sr-only">{p.rating} out of 5 stars</span>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3.5 w-3.5 ${
                      i < Math.floor(p.rating)
                        ? "fill-amber-400 text-amber-400"
                        : i < p.rating
                          ? "fill-amber-400/50 text-amber-400/50"
                          : "text-muted-foreground/30"
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="text-xs text-muted-foreground mb-3">{p.tagline}</p>
            <ul className="space-y-1 mb-3">
              {p.highlights.slice(0, 3).map((h) => (
                <li key={h} className="text-xs text-foreground/70 flex items-start gap-1.5">
                  <span className="text-emerald-500 mt-0.5 shrink-0">&#10003;</span>
                  {h}
                </li>
              ))}
            </ul>
            <p className="text-[10px] text-muted-foreground mb-3">
              <span className="font-medium text-foreground/60">Best for:</span> {p.bestFor}
            </p>
            <div className="flex items-center justify-between gap-2">
              <span className="text-[10px] text-muted-foreground">
                {p.isAffiliate ? "Tracked partner link" : "Official provider site"}
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-medium text-primary group-hover:gap-2 transition-all">
              {p.isAffiliate ? "Check price" : "View provider"}
              <ArrowRight className="h-3 w-3" />
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
