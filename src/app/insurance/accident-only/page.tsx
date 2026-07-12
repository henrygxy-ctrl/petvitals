import type { Metadata } from "next";
import { AdUnit } from "@/components/ads/AdUnit";
import { JsonLdBreadcrumb, JsonLdFAQ } from "@/components/seo/json-ld";
import { SITE_NAME, SITE_BASE_URL } from "@/lib/constants";
import { InsuranceComparison } from "@/components/affiliate/insurance-comparison";
import { INSURANCE_PARTNERS } from "@/lib/affiliate";
import { ArrowRight } from "lucide-react";
import Link from "next/link"

export const metadata: Metadata = {
  title: "Accident-Only Pet Insurance: Cost, Coverage & What It Covers | PetVitals",
  description: "Learn what accident-only pet insurance covers, what it usually costs for dogs and cats, who it is best for, and what exclusions to check before choosing a plan.",
  alternates: { canonical: `${SITE_BASE_URL}/insurance/accident-only` },
  openGraph: {
    title: "Accident-Only Pet Insurance: Cost, Coverage & What It Covers | PetVitals",
    description: "Learn what accident-only pet insurance covers, what it usually costs for dogs and cats, who it is best for, and what exclusions to check before choosing a plan.",
    url: `${SITE_BASE_URL}/insurance/accident-only`,
    siteName: SITE_NAME,
    type: "website",
    images: [{ url: `${SITE_BASE_URL}/og-image.png`, width: 1200, height: 630, alt: "PetVitals Accident-Only Pet Insurance Guide" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Accident-Only Pet Insurance: Cost, Coverage & What It Covers | PetVitals",
    description: "Learn what accident-only pet insurance covers, what it usually costs for dogs and cats, who it is best for, and what exclusions to check before choosing a plan.",
    images: [`${SITE_BASE_URL}/og-image.png`],
  },
};

const breadcrumbs = [
  { name: "Home", url: SITE_BASE_URL },
  { name: "Pet Insurance", url: `${SITE_BASE_URL}/insurance` },
  { name: "Accident-Only", url: `${SITE_BASE_URL}/insurance/accident-only` },
];

const faq = [
  {
    question: "Does accident-only pet insurance cover poisoning?",
    answer:
      "Many accident-only pet insurance policies may cover eligible accidental toxin ingestion, such as chocolate, xylitol, medication, or poisonous plants. Coverage depends on the policy, waiting period, exclusions, and whether the ingestion happened after coverage started.",
  },
  {
    question: "Does accident-only pet insurance cover broken bones?",
    answer:
      "Broken bones from an eligible accident are commonly covered by accident-only plans. Check the deductible, reimbursement rate, annual limit, orthopedic waiting periods, and any breed or bilateral-condition rules before choosing a policy.",
  },
  {
    question: "Does accident-only pet insurance cover emergency surgery?",
    answer:
      "It may cover emergency surgery when the surgery is needed for an eligible accident, such as foreign object removal, traumatic wound repair, or fracture repair. Surgery for illnesses, pre-existing conditions, or excluded conditions usually is not covered by accident-only plans.",
  },
];

export default function AccidentOnlyPage() {
  return (
    <>
      <JsonLdFAQ questions={faq} />
      <JsonLdBreadcrumb items={breadcrumbs} />
      <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center gap-2">
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Home</Link>
          <span className="text-muted-foreground">/</span>
          <Link href="/insurance" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Insurance</Link>
          <span className="text-muted-foreground">/</span>
          <span className="text-sm text-foreground/70">Accident-Only</span>
        </div>
      </header>
      <main className="flex-1 max-w-3xl mx-auto px-4 py-12 w-full">
	        <div className="mb-6">
	          <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Pet Insurance Guide</span>
	          <h1 className="text-3xl font-bold mt-2 mb-3">Accident-Only Pet Insurance: Cost and Coverage</h1>
	          <p className="text-muted-foreground">The most affordable entry point into pet insurance. It covers emergency treatment when your pet gets hurt in an accident, but it does not cover illnesses.</p>
	          <div className="mt-5 flex flex-wrap gap-3">
	            <a
	              href="#providers"
	              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
	            >
	              Compare accident-only prices
	              <ArrowRight className="h-4 w-4" />
	            </a>
	            <Link
	              href="/insurance/pet-insurance-cost"
	              className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium hover:bg-muted transition-colors"
	            >
	              See monthly pet insurance cost
	            </Link>
	          </div>
	          <p className="mt-3 text-xs text-muted-foreground">
	            Good fit if you mainly want a lower-cost backup for poisoning, broken bones, bite wounds, or emergency surgery after an accident.
	          </p>
	        </div>

        <div className="prose prose-sm max-w-none space-y-8 text-foreground/80">
          <section>
            <h2 className="text-xl font-semibold text-foreground">Quick Answer</h2>
            <p>Accident-only pet insurance usually covers injuries such as broken bones, bite wounds, swallowed objects, toxin ingestion, and car accidents. It is cheaper than accident-and-illness coverage, but it does not cover sickness, cancer, allergies, infections, or routine care.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">What It Covers</h2>
            <p>Accident-only plans cover injuries resulting from unforeseen events. This includes:</p>
            <ul className="space-y-1">
              <li><strong>Broken bones and fractures</strong>: from falls, being hit by a car, or rough play</li>
              <li><strong>Cuts and lacerations</strong>: wounds requiring stitches or surgical repair</li>
              <li><strong>Toxin ingestion</strong>: if your pet eats something poisonous like chocolate, xylitol, or certain plants</li>
              <li><strong>Car accidents</strong>: emergency care after being struck by a vehicle</li>
              <li><strong>Bite wounds and abscesses</strong>: from fights with other animals</li>
              <li><strong>Foreign object ingestion</strong>: surgery to remove swallowed toys, socks, or bones</li>
              <li><strong>Eye injuries</strong>: corneal scratches, punctures, or foreign bodies</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">What It Doesn't Cover</h2>
            <ul className="space-y-1">
              <li>Illnesses of any kind (cancer, infections, diabetes, allergies)</li>
              <li>Routine and preventive care (vaccinations, annual checkups)</li>
              <li>Pre-existing conditions: anything diagnosed before the policy started</li>
              <li>Hereditary or congenital conditions (hip dysplasia, heart defects)</li>
              <li>Dental disease (though tooth fractures from accidents are often covered)</li>
              <li>Behavioral therapy or training</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">Typical Costs</h2>
            <p>Accident-only plans are the most affordable option. Monthly premiums typically range from:</p>
            <div className="grid sm:grid-cols-2 gap-4 not-prose my-4">
              <div className="p-4 rounded-lg border bg-card text-center">
                <p className="text-xs text-muted-foreground mb-1">Dogs</p>
                <p className="text-2xl font-bold">$10-$25</p>
                <p className="text-xs text-muted-foreground">per month</p>
              </div>
              <div className="p-4 rounded-lg border bg-card text-center">
                <p className="text-xs text-muted-foreground mb-1">Cats</p>
                <p className="text-2xl font-bold">$6-$15</p>
                <p className="text-xs text-muted-foreground">per month</p>
              </div>
            </div>
            <p>Deductibles usually range from $100-$500 annually, and reimbursement rates are typically 70-90% of covered costs. Most plans have annual coverage limits between $2,500 and $10,000.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">Who It's Best For</h2>
            <ul className="space-y-1">
              <li><strong>Young, healthy pets</strong>: lower risk of illness means accident coverage may be sufficient</li>
              <li><strong>Budget-conscious pet parents</strong>: protection against large unexpected emergency bills without the higher premiums of comprehensive plans</li>
              <li><strong>Indoor cats</strong>: lower accident risk but still vulnerable to falls, toxins, and household hazards</li>
              <li><strong>As a starting point</strong>: many pet parents begin with accident-only and upgrade later</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">Key Things to Watch For</h2>
            <ul className="space-y-2">
              <li><strong>Waiting periods</strong>: most plans have a 1-14 day waiting period before coverage begins. Accidents that happen during this time won't be covered.</li>
              <li><strong>Annual vs per-incident limits</strong>: check whether the coverage cap applies per year or per accident. Per-incident limits can leave you exposed if multiple accidents happen in one year.</li>
              <li><strong>Bilateral condition exclusions</strong>: if your pet injures one knee and later injures the other, some policies exclude the second injury as bilateral.</li>
              <li><strong>Reimbursement model</strong>: most plans reimburse you after you pay the vet. Make sure you can float the upfront cost.</li>
              <li><strong>Breed-specific exclusions</strong>: some breeds may have higher premiums or specific accident exclusions.</li>
            </ul>
          </section>

	          <div className="p-5 rounded-xl border bg-muted/50 not-prose">
	            <p className="text-sm text-muted-foreground">
	              <strong className="text-foreground">Tip:</strong> Compare at least 3 providers before choosing. Premiums for the same coverage level can vary by 50% or more between companies. Many offer free online quotes in under 5 minutes.
	            </p>
	          </div>

	          <section>
	            <h2 className="text-xl font-semibold text-foreground">Accident-Only Coverage FAQ</h2>
	            <div className="space-y-3 not-prose">
	              {faq.map((item) => (
	                <details key={item.question} className="rounded-lg border bg-card">
	                  <summary className="px-5 py-4 cursor-pointer text-sm font-medium list-none">
	                    {item.question}
	                  </summary>
	                  <div className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed">
	                    {item.answer}
	                  </div>
	                </details>
	              ))}
	            </div>
	          </section>
	        </div>
	        <div id="providers" className="max-w-3xl mx-auto px-4 mt-8 scroll-mt-20">
	          <InsuranceComparison partners={INSURANCE_PARTNERS} />
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

