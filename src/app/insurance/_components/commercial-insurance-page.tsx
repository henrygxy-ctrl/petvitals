import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Shield } from "lucide-react";
import { AdUnit } from "@/components/ads/AdUnit";
import { InsuranceComparison } from "@/components/affiliate/insurance-comparison";
import { JsonLdBreadcrumb, JsonLdFAQ } from "@/components/seo/json-ld";
import { INSURANCE_PARTNERS } from "@/lib/affiliate";
import { SITE_BASE_URL, SITE_NAME } from "@/lib/constants";

export interface CommercialStat {
  label: string;
  value: string;
  note: string;
}

export interface CommercialSection {
  title: string;
  content: ReactNode;
}

export interface CommercialRelatedGuide {
  title: string;
  href: string;
  description: string;
}

export interface CommercialSource {
  label: string;
  href: string;
}

export interface CommercialInsurancePageProps {
  slug: string;
  label: string;
  title: string;
  intro: string;
  stats: CommercialStat[];
  sections: CommercialSection[];
  faq: { question: string; answer: string }[];
  relatedGuides: CommercialRelatedGuide[];
  sources: CommercialSource[];
}

export function CommercialInsurancePage({
  slug,
  label,
  title,
  intro,
  stats,
  sections,
  faq,
  relatedGuides,
  sources,
}: CommercialInsurancePageProps) {
  const canonical = `${SITE_BASE_URL}/insurance/${slug}`;
  const breadcrumbs = [
    { name: "Home", url: SITE_BASE_URL },
    { name: "Pet Insurance", url: `${SITE_BASE_URL}/insurance` },
    { name: label, url: canonical },
  ];

  return (
    <>
      <JsonLdFAQ questions={faq} />
      <JsonLdBreadcrumb items={breadcrumbs} />
      <div className="min-h-screen flex flex-col">
        <header className="border-b">
          <div className="max-w-4xl mx-auto px-4 h-14 flex items-center gap-2">
            <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Home
            </Link>
            <span className="text-muted-foreground">/</span>
            <Link href="/insurance" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Insurance
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-sm text-foreground/70">{label}</span>
          </div>
        </header>

        <main className="flex-1 max-w-4xl mx-auto px-4 py-12 w-full">
          <section className="mb-8">
            <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Pet Insurance Guide
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold mt-2 mb-4">{title}</h1>
            <p className="text-muted-foreground max-w-2xl">{intro}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href="#providers"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
              >
                Compare provider prices
                <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                href="/insurance/pet-insurance-cost"
                className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium hover:bg-muted transition-colors"
              >
                See monthly costs
              </Link>
            </div>
          </section>

          <section className="grid sm:grid-cols-3 gap-4 mb-10">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-xl border bg-card p-5">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{stat.label}</p>
                <p className="mt-2 text-2xl font-bold">{stat.value}</p>
                <p className="mt-1 text-xs text-muted-foreground">{stat.note}</p>
              </div>
            ))}
          </section>

          <div className="prose prose-sm max-w-none space-y-8 text-foreground/80">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="text-xl font-semibold text-foreground">{section.title}</h2>
                {section.content}
              </section>
            ))}
          </div>

          <section id="providers" className="mt-10 scroll-mt-20">
            <InsuranceComparison partners={INSURANCE_PARTNERS} />
          </section>

          <section className="mt-10">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-bold">Related Insurance Guides</h2>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              {relatedGuides.map((guide) => (
                <Link
                  key={guide.href}
                  href={guide.href}
                  className="rounded-xl border bg-card p-5 hover:border-primary/40 transition-colors"
                >
                  <h3 className="text-sm font-semibold">{guide.title}</h3>
                  <p className="mt-2 text-xs text-muted-foreground">{guide.description}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary">
                    Read guide
                    <ArrowRight className="h-3 w-3" />
                  </span>
                </Link>
              ))}
            </div>
          </section>

          <section className="mt-10 rounded-xl border bg-muted/50 p-5">
            <h2 className="font-semibold mb-3">Before You Choose a Policy</h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                Compare the deductible, reimbursement rate, annual limit, and waiting periods together.
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                Read exclusions for pre-existing, hereditary, dental, orthopedic, and breed-specific conditions.
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                Get at least three quotes using the same deductible and reimbursement settings.
              </li>
            </ul>
          </section>

          <section className="mt-8 rounded-xl border bg-card p-5">
            <h2 className="font-semibold mb-3">Sources</h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {sources.map((source) => (
                <li key={source.href}>
                  <a href={source.href} target="_blank" rel="noopener noreferrer" className="hover:text-foreground underline underline-offset-2">
                    {source.label}
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-muted-foreground">
              This guide is educational and is not financial, insurance, or veterinary advice. Policy terms and prices vary by provider, pet, and location.
            </p>
          </section>

          <AdUnit className="mt-8" />
        </main>

        <footer className="border-t py-6 text-center text-xs text-muted-foreground">
          <div className="max-w-4xl mx-auto px-4">
            &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </div>
        </footer>
      </div>
    </>
  );
}
