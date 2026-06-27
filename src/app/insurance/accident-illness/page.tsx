import type { Metadata } from "next";
import { AdUnit } from "@/components/ads/AdUnit";
import { JsonLdBreadcrumb } from "@/components/seo/json-ld";
import { SITE_NAME, SITE_BASE_URL } from "@/lib/constants";
import Link from "next/link"

export const metadata: Metadata = {
  title: "Accident & Illness Pet Insurance Guide — PetVitals",
  description: "The most popular pet insurance type. Covers accidents plus illnesses including cancer, infections, and chronic diseases. Learn about costs, coverage, and how to choose.",
  alternates: { canonical: `${SITE_BASE_URL}/insurance/accident-illness` },
  openGraph: {
    title: "Accident & Illness Pet Insurance Guide",
    description: "The most popular pet insurance type. Covers accidents plus illnesses including cancer, infections, and chronic diseases. Learn about costs, coverage, and how to choose.",
    url: `${SITE_BASE_URL}/insurance/accident-illness`,
    siteName: SITE_NAME,
    type: "website",
    images: [{ url: `${SITE_BASE_URL}/og-image.png`, width: 1200, height: 630, alt: "PetVitals Accident & Illness Pet Insurance Guide" }],
  },
};

const breadcrumbs = [
  { name: "Home", url: SITE_BASE_URL },
  { name: "Pet Insurance", url: `${SITE_BASE_URL}/insurance` },
  { name: "Accident & Illness", url: `${SITE_BASE_URL}/insurance/accident-illness` },
];

export default function AccidentIllnessPage() {
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
          <span className="text-sm text-foreground/70">Accident & Illness</span>
        </div>
      </header>
      <main className="flex-1 max-w-3xl mx-auto px-4 py-12 w-full">
        <div className="mb-6">
          <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Pet Insurance Guide</span>
          <h1 className="text-3xl font-bold mt-2 mb-3">Accident & Illness Insurance</h1>
          <p className="text-muted-foreground">The most popular choice for pet parents. Covers both unexpected injuries and a wide range of illnesses — the best balance of protection and affordability.</p>
        </div>

        <div className="prose prose-sm max-w-none space-y-8 text-foreground/80">
          <section>
            <h2 className="text-xl font-semibold text-foreground">What It Covers</h2>
            <p>Accident & illness plans cover everything in accident-only plans plus a broad range of medical conditions:</p>
            <ul className="space-y-1">
              <li><strong>All accident coverage</strong> — broken bones, cuts, toxin ingestion, car accidents, bite wounds, foreign object removal</li>
              <li><strong>Cancer treatment</strong> — chemotherapy, radiation, surgical tumor removal, and related diagnostics</li>
              <li><strong>Infections and diseases</strong> — ear infections, UTIs, respiratory infections, pancreatitis, kidney disease</li>
              <li><strong>Diagnostic tests</strong> — blood work, X-rays, ultrasounds, MRIs, biopsies</li>
              <li><strong>Prescription medications</strong> — ongoing meds for chronic conditions, antibiotics, pain management</li>
              <li><strong>Surgery and hospitalization</strong> — both emergency and planned procedures, including overnight stays</li>
              <li><strong>Hereditary and congenital conditions</strong> — hip dysplasia, elbow dysplasia, heart defects (check individual policies)</li>
              <li><strong>Chronic conditions</strong> — diabetes, arthritis, thyroid disorders, allergies</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">What It Doesn't Cover</h2>
            <ul className="space-y-1">
              <li>Pre-existing conditions — anything diagnosed or showing symptoms before the policy started</li>
              <li>Routine wellness care — annual checkups, vaccinations, flea/tick prevention (unless you add a wellness rider)</li>
              <li>Elective procedures — tail docking, ear cropping, declawing</li>
              <li>Grooming and boarding</li>
              <li>Breeding and pregnancy-related costs</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">Typical Costs</h2>
            <div className="grid sm:grid-cols-2 gap-4 not-prose my-4">
              <div className="p-4 rounded-lg border bg-card text-center">
                <p className="text-xs text-muted-foreground mb-1">Dogs</p>
                <p className="text-2xl font-bold">$30 – $70</p>
                <p className="text-xs text-muted-foreground">per month</p>
              </div>
              <div className="p-4 rounded-lg border bg-card text-center">
                <p className="text-xs text-muted-foreground mb-1">Cats</p>
                <p className="text-2xl font-bold">$15 – $40</p>
                <p className="text-xs text-muted-foreground">per month</p>
              </div>
            </div>
            <p>Deductibles typically range from $100–$1,000 annually. Reimbursement rates are commonly 70%, 80%, or 90%. Annual coverage limits range from $5,000 to unlimited, with most plans offering $10,000–$20,000.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">Who It's Best For</h2>
            <ul className="space-y-1">
              <li><strong>Most pet parents</strong> — this is the most commonly purchased plan type for good reason</li>
              <li><strong>Puppies and kittens</strong> — young pets are accident-prone and early enrollment avoids pre-existing condition exclusions</li>
              <li><strong>Breed-prone conditions</strong> — breeds predisposed to hip dysplasia, cancer, or heart issues benefit from illness coverage</li>
              <li><strong>Peace of mind seekers</strong> — knowing both accidents and illnesses are covered reduces financial stress during emergencies</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">Waiting Periods</h2>
            <p>Most accident & illness plans have two separate waiting periods:</p>
            <ul className="space-y-1">
              <li><strong>Accidents:</strong> 1–5 days after policy start</li>
              <li><strong>Illnesses:</strong> 14–30 days after policy start</li>
              <li><strong>Orthopedic conditions:</strong> 6–12 months for some breeds (especially large dogs)</li>
            </ul>
          </section>

          <div className="p-5 rounded-xl border bg-muted/50 not-prose">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Tip:</strong> Enroll your pet while they're young and healthy. Once a condition is diagnosed, it becomes pre-existing and won't be covered — even if you switch providers later. Early enrollment locks in the broadest coverage.
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

