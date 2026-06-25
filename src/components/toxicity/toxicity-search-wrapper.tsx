"use client";

import dynamic from "next/dynamic";
import { AdUnit } from "@/components/ads/AdUnit";

const ToxicitySearch = dynamic(
  () => import("@/components/toxicity/toxicity-search").then((mod) => ({ default: mod.ToxicitySearch })),
  {
    ssr: false,
    loading: () => (
      <div className="w-full max-w-2xl mx-auto py-12 text-center">
        <div className="animate-pulse text-muted-foreground">Loading search...</div>
      </div>
    ),
  }
);

export function ToxicitySearchWrapper() {
  return (
    <>
      <ToxicitySearch variant="full" />
      <AdUnit />
    </>
  );
}
