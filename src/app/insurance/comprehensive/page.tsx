import type { Metadata } from "next";
import { AdUnit } from "@/components/ads/AdUnit";
import { JsonLdBreadcrumb } from "@/components/seo/json-ld";
import { SITE_NAME, SITE_BASE_URL } from "@/lib/constants";
import Link from "next/link"

export const metadata: Metadata = {
  title: "Comprehensive & Wellness Pet Insurance Guide — PetVitals",
  description: "Full-coverage pet insurance with wellness add-ons. Covers accidents, illnesses, routine checkups, vaccinations, dental cleaning, and more. Learn about costs and coverage.",
  alternates: { canonical: `${SITE_BASE_URL}/insurance/comprehensive` },
  openGraph: {
    title: "Comprehensive & Wellness Pet Insurance Guide",
    description: "Full-coverage pet insurance with wellness add-ons. Covers accidents, illnesses, routine checkups, vaccinations, dental cleaning, and more. Learn about costs and coverage.",
    url: `${SITE_BASE_URL}/insurance/comprehensive`,
    siteName: SITE_NAME,
    type: "website",
    images: [{ url: `${SITE_BASE_URL}/og-image.png`, width: 1200, height: 630, alt: "PetVitals Comprehensive & Wellness Pet Insurance Guide" }],
  },
};

const breadcrumbs = [
  { name: "Home", url: SITE_BASE_URL },
  { name: "Pet Insurance", url: `${SITE_BASE_URL}/insurance` },
  { name: "Comprehensive / Wellness", url: `${SITE_BASE_URL}/insurance/comprehensive` },
];

export default function ComprehensivePage() {
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
          <span className="text-sm text-foreground/70">Comprehensive / Wellness</span>
        </div>
      </header>
      <main className="flex-1 max-w-3xl mx-auto px-4 py-12 w-full">
        <div className="mb-6">
          <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Pet Insurance Guide</span>
          <h1 className="text-3xl font-bold mt-2 mb-3">Comprehensive & Wellness Plans</h1>
          <p className="text-muted-foreground">The fullest protection available. Combines accident and illness coverage with routine and preventive care — ideal for puppies, kittens, and pet parents who want complete peace of mind.</p>
        </div>

        <div className="prose prose-sm max-w-none space-y-8 text-foreground/80">
          <section>
            <h2 className="text-xl font-semibold text-foreground">What It Covers</h2>
            <p>Comprehensive plans include everything in accident & illness plans, plus routine and preventive care through a wellness add-on (usually called a "wellness rider" or "preventive care plan"):</p>
            
            <h3 className="text-base font-semibold text-foreground mt-4">Medical Coverage (same as Accident & Illness)</h3>
            <ul className="space-y-1">
              <li>All accidents and emergency care</li>
              <li>Cancer, infections, diseases, and chronic conditions</li>
              <li>Surgery, hospitalization, and specialist referrals</li>
              <li>Diagnostic tests and prescription medications</li>
            </ul>

            <h3 className="text-base font-semibold text-foreground mt-4">Wellness/Preventive Add-On</h3>
            <ul className="space-y-1">
              <li><strong>Annual wellness exams</strong> — yearly physical checkups and consultations</li>
              <li><strong>Vaccinations</strong> — rabies, distemper, parvovirus, bordetella, and other core vaccines</li>
              <li><strong>Dental cleaning</strong> — professional teeth cleaning, sometimes including extractions</li>
              <li><strong>Spay/neuter surgery</strong> — sometimes covered partially or fully</li>
              <li><strong>Flea, tick, and heartworm prevention</strong> — monthly preventatives and testing</li>
              <li><strong>Blood work and fecal tests</strong> — routine lab work during checkups</li>
              <li><strong>Microchipping</strong> — implantation and registration</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">Wellness vs Non-Wellness: Key Difference</h2>
            <p>Wellness coverage works differently from medical coverage. Instead of deductibles and reimbursement rates, wellness benefits typically use a <strong>schedule of benefits</strong> — a fixed dollar amount per service per year. For example, a plan might cover up to $50 for vaccines, $150 for dental cleaning, and $75 for flea prevention annually.</p>
            <p>Unused wellness benefits generally do <strong>not</strong> roll over to the next year. If you don't use your $150 dental benefit, you lose it.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">Typical Costs</h2>
            <div className="grid sm:grid-cols-2 gap-4 not-prose my-4">
              <div className="p-4 rounded-lg border bg-card text-center">
                <p className="text-xs text-muted-foreground mb-1">Dogs (medical + wellness)</p>
                <p className="text-2xl font-bold">$50 – $120</p>
                <p className="text-xs text-muted-foreground">per month</p>
              </div>
              <div className="p-4 rounded-lg border bg-card text-center">
                <p className="text-xs text-muted-foreground mb-1">Cats (medical + wellness)</p>
                <p className="text-2xl font-bold">$25 – $60</p>
                <p className="text-xs text-muted-foreground">per month</p>
              </div>
            </div>
            <p>Wellness riders typically add $10–$25 per month on top of the base accident & illness premium. Some providers bundle wellness into their top-tier plans, while others offer it as a separate add-on.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">Who It's Best For</h2>
            <ul className="space-y-1">
              <li><strong>Puppies and kittens in their first year</strong> — this is the most vet-intensive year with multiple vaccine rounds, spay/neuter, and frequent checkups</li>
              <li><strong>Pet parents who want predictable costs</strong> — wellness plans turn irregular vet bills into predictable monthly payments</li>
              <li><strong>Budget-conscious planners</strong> — if you'd struggle with a $500 emergency vet bill, the medical coverage provides a safety net</li>
              <li><strong>Senior pets</strong> — older pets benefit from more frequent checkups and dental care, though premiums will be higher</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">Is the Wellness Rider Worth It?</h2>
            <p>Do the math on expected annual costs before adding a wellness rider. If your pet's expected annual preventive care costs (exam + vaccines + dental + prevention) are roughly equal to the annual cost of the rider, it's worth it for the budgeting convenience. If the rider costs significantly more than you'd spend out of pocket, it may not be a good deal.</p>
            <p>For most puppy/kitten owners in the first year, wellness riders <strong>are</strong> typically worth it due to the high volume of required care. For healthy adult pets, the value is less clear.</p>
          </section>

          <div className="p-5 rounded-xl border bg-muted/50 not-prose">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Tip:</strong> Some pet parents skip the wellness rider and instead set aside the equivalent amount in a dedicated pet savings account each month. This gives you flexibility to use the money however your pet needs it, with no annual caps or benefit schedules.
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

