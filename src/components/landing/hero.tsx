"use client";

import dynamic from "next/dynamic";
import { useTranslation } from "@/i18n/context";

const ToxicitySearch = dynamic(
  () => import("@/components/toxicity/toxicity-search").then((mod) => ({ default: mod.ToxicitySearch })),
  {
    ssr: false,
    loading: () => (
      <div className="w-full max-w-2xl mx-auto py-6 text-center">
        <div className="h-12 bg-muted animate-pulse rounded-xl"></div>
      </div>
    ),
  }
);

export function Hero() {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-background pointer-events-none" />
      
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 pt-20 sm:pt-28 pb-16 sm:pb-20">
        <div className="text-center mb-8 sm:mb-10">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
            {t("hero.title")}
          </h1>
          <p className="mt-4 sm:mt-5 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t("hero.subtitle")}
          </p>
        </div>

        <div className="flex justify-center gap-6 mb-8 text-xs text-muted-foreground">
          <span>{String.fromCodePoint(0x1f43e)} Vet-approved data</span>
          <span>{String.fromCodePoint(0x1f52c)} Science-based</span>
          <span>{String.fromCodePoint(0x1f1fa,0x1f1f8)} US pet database</span>
        </div>

        <div className="bg-card border rounded-xl p-4 sm:p-6 shadow-sm">
          <div className="text-center mb-4">
            <span className="text-sm font-medium text-muted-foreground">
              {String.fromCodePoint(0x1f50d)} {t("hero.cta")}
            </span>
          </div>
          <ToxicitySearch variant="hero" />
        </div>
      </div>
    </section>
  );
}
