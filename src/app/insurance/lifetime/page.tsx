import type { Metadata } from "next";
import { AdUnit } from "@/components/ads/AdUnit";
import { JsonLdBreadcrumb } from "@/components/seo/json-ld";
import { SITE_NAME, SITE_BASE_URL } from "@/lib/constants";
import Link from "next/link"

export const metadata: Metadata = {
  title: "Lifetime & Chronic Condition Pet Insurance Guide — PetVitals",
  description: "Learn about lifetime pet insurance and coverage for chronic conditions like diabetes, arthritis, and hip dysplasia. Compare annual vs lifetime limits and find the best long-term protection.",
  alternates: { canonical: `${SITE_BASE_URL}/insurance/lifetime` },
  openGraph: {
    title: "Lifetime & Chronic Condition Pet Insurance Guide",
    description: "Learn about lifetime pet insurance and coverage for chronic conditions like diabetes, arthritis, and hip dysplasia. Compare annual vs lifetime limits and find the best long-term protection.",
    url: `${SITE_BASE_URL}/insurance/lifetime`,
    siteName: SITE_NAME,
    type: "website",
    images: [{ url: `${SITE_BASE_URL}/og-image.png`, width: 1200, height: 630, alt: "PetVitals Lifetime & Chronic Condition Pet Insurance Guide" }],
  },
};

const breadcrumbs = [
  { name: "Home", url: SITE_BASE_URL },
  { name: "Pet Insurance", url: `${SITE_BASE_URL}/insurance` },
  { name: "Lifetime / Chronic", url: `${SITE_BASE_URL}/insurance/lifetime` },
];

export default function LifetimePage() {
  return (
    <>
      <JsonLdBreadcrumb items={breadcrumbs} />
      <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center gap-2">
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Home</Link>
          <span className="text-muted-foreground">/</span>
          <Link href="/insurance" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Insurance</Link>
          <span className="text-muted-foreground">/</span>
          <span className="text-sm text-foreground/70">Lifetime / Chronic</span>
        </div>
      </header>
      <main className="flex-1 max-w-3xl mx-auto px-4 py-12 w-full">
        <div className="mb-6">
          <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Pet Insurance Guide</span>
          <h1 className="text-3xl font-bold mt-2 mb-3">Lifetime & Chronic Condition Coverage</h1>
          <p className="text-muted-foreground">Designed for long-term conditions that require ongoing treatment year after year. Understand annual vs lifetime limits and how to protect your pet for the long haul.</p>
        </div>

        <div className="prose prose-sm max-w-none space-y-8 text-foreground/80">
          <section>
            <h2 className="text-xl font-semibold text-foreground">Understanding Lifetime Coverage</h2>
            <p>Lifetime pet insurance (also called "lifetime cover" or "yearly renewable" coverage) is the most comprehensive type of pet insurance. Unlike standard accident & illness plans that may cap payouts per condition, lifetime policies reset the coverage limit each year when you renew. This means if your pet develops a chronic condition, you're covered year after year — not just in the year of diagnosis.</p>
            <p>This is distinct from "annual" or "time-limited" policies that cap how much they'll pay per condition, either per year or over the pet's lifetime. With those policies, once you hit the cap, that condition is excluded forever.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">Chronic Conditions Covered</h2>
            <p>Chronic conditions are ongoing health issues that require continuous or recurring treatment. Lifetime policies cover these year after year:</p>
            <ul className="space-y-1">
              <li><strong>Diabetes</strong> — insulin, glucose monitoring, dietary management, and related complications</li>
              <li><strong>Arthritis and joint disease</strong> — pain management, physical therapy, joint supplements, surgery</li>
              <li><strong>Hip and elbow dysplasia</strong> — medication, surgery (FHO, TPO, total hip replacement), ongoing physical therapy</li>
              <li><strong>Heart disease</strong> — cardiac medications, echocardiograms, specialist consultations</li>
              <li><strong>Kidney disease</strong> — special diets, fluid therapy, ongoing blood work and monitoring</li>
              <li><strong>Thyroid disorders</strong> — lifelong medication and monitoring</li>
              <li><strong>Allergies and skin conditions</strong> — ongoing medications, special diets, allergy testing and immunotherapy</li>
              <li><strong>Epilepsy and seizure disorders</strong> — anticonvulsant medications, blood monitoring, emergency care</li>
              <li><strong>Cancer in remission</strong> — ongoing monitoring, follow-up tests, and recurrence treatment</li>
              <li><strong>Eye conditions</strong> — glaucoma, cataracts, dry eye requiring ongoing treatment</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">Annual vs Lifetime: Policy Types Compared</h2>
            <div className="not-prose my-4 space-y-3">
              <div className="p-4 rounded-lg border bg-card">
                <h3 className="font-semibold text-sm">Annual / Time-Limited Policies</h3>
                <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                  <li>Coverage cap per condition per year (e.g., $5,000/year for diabetes)</li>
                  <li>Once the cap is reached, you pay everything for that condition that year</li>
                  <li>Some policies also have lifetime caps per condition</li>
                  <li>Lower premiums than lifetime policies</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg border bg-card border-primary/20">
                <h3 className="font-semibold text-sm">Lifetime Policies</h3>
                <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                  <li>Annual coverage limit resets each year at renewal</li>
                  <li>A chronic condition is covered year after year, without per-condition caps</li>
                  <li>Higher premiums but much better long-term protection</li>
                  <li>Must renew each year to maintain continuous coverage</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">Typical Costs</h2>
            <p>Lifetime policies are more expensive than standard accident & illness plans because of the higher long-term risk to the insurer:</p>
            <div className="grid sm:grid-cols-2 gap-4 not-prose my-4">
              <div className="p-4 rounded-lg border bg-card text-center">
                <p className="text-xs text-muted-foreground mb-1">Dogs</p>
                <p className="text-2xl font-bold">$50 – $100+</p>
                <p className="text-xs text-muted-foreground">per month</p>
              </div>
              <div className="p-4 rounded-lg border bg-card text-center">
                <p className="text-xs text-muted-foreground mb-1">Cats</p>
                <p className="text-2xl font-bold">$25 – $55+</p>
                <p className="text-xs text-muted-foreground">per month</p>
              </div>
            </div>
            <p>Annual coverage limits for lifetime policies typically range from $5,000 to $15,000 per year, resetting annually. The premium is higher upfront but can save tens of thousands over a pet's lifetime if a serious chronic condition develops.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">Who It's Best For</h2>
            <ul className="space-y-1">
              <li><strong>Breeds predisposed to chronic conditions</strong> — large breeds prone to hip dysplasia, flat-faced breeds with respiratory issues, breeds with high cancer rates</li>
              <li><strong>Pet parents who can afford higher premiums</strong> — the monthly cost is higher, but it prevents catastrophic long-term expenses</li>
              <li><strong>Pets diagnosed early</strong> — getting lifetime coverage before a chronic condition develops is critical. Once diagnosed without coverage, it's pre-existing</li>
              <li><strong>Long-term planners</strong> — if you intend to provide the best care throughout your pet's entire life, lifetime coverage is the gold standard</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">Important Considerations</h2>
            <ul className="space-y-2">
              <li><strong>Continuous renewal is essential</strong> — if you let a lifetime policy lapse, any conditions that developed during the coverage period become pre-existing on a new policy</li>
              <li><strong>Premiums increase with age</strong> — lifetime policy premiums typically rise each year as your pet ages, reflecting the higher risk</li>
              <li><strong>Not all insurers offer true lifetime policies</strong> — some market "lifetime" policies that are actually annual policies with marketing spin. Read the fine print on per-condition caps</li>
              <li><strong>Prescription food coverage</strong> — check whether the policy covers therapeutic diets prescribed for chronic conditions (many don't)</li>
            </ul>
          </section>

          <div className="p-5 rounded-xl border bg-muted/50 not-prose">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Key Advice:</strong> If your budget allows, always choose a policy with no per-condition caps and annual limits that reset. This is the single most important feature difference between policies. A $5,000 annual limit that resets is far more valuable than a $20,000 lifetime limit that doesn't.
            </p>
          </div>
        </div>
        <AdUnit className="max-w-3xl mx-auto px-4" />
      </main>
      <footer className="border-t py-6 text-center text-xs text-muted-foreground">
        <div className="max-w-3xl mx-auto px-4">&copy; 2026 PetVitals. All rights reserved.</div>
      </footer>
    </div>
    </>
  );
}

