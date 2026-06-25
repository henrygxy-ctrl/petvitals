import Link from "next/link";
import type { Metadata } from "next";
import { SITE_NAME, SITE_BASE_URL } from "@/lib/constants";
import { FeedingCalculatorForm } from "@/components/feeding/feeding-calculator-form";
import { JsonLdFAQ } from "@/components/seo/json-ld";
import { ArrowLeft, Search } from "lucide-react";

export const metadata: Metadata = {
  title: `Dog & Cat Feeding Calculator by Weight | Free Portion Guide | ${SITE_NAME}`,
  description:
    "Calculate exactly how much to feed your dog or cat based on weight, age, activity level, and body condition. Free, no sign-up required. Veterinary-standard RER & MER formulas.",
  alternates: { canonical: `${SITE_BASE_URL}/feeding-calculator` },
  openGraph: {
    title: `Free Dog Feeding Calculator by Weight | ${SITE_NAME}`,
    description:
      "Veterinary-standard daily calorie & portion calculator. Enter your pet's weight, age, and activity level for an instant feeding plan.",
    url: `${SITE_BASE_URL}/feeding-calculator`,
    siteName: SITE_NAME,
    type: "website",
    images: [{ url: `${SITE_BASE_URL}/og-image.png`, width: 1200, height: 630, alt: "PetVitals Feeding Calculator" }],
  },
};

const faqQuestions = [
  {
    question: "How do I calculate how much to feed my dog by weight?",
    answer:
      "Use the Resting Energy Requirement (RER) formula: 70 x (weight in kg)^0.75. Then multiply by a life-stage factor for Maintenance Energy Requirement (MER). For example, a neutered adult dog: MER = RER x 1.6. Our calculator above does this automatically — just enter your dog's weight.",
  },
  {
    question: "What is the RER formula for dogs?",
    answer:
      "RER (kcal/day) = 70 x (body weight in kg)^0.75. This is the allometric scaling equation used by veterinarians worldwide. It calculates the baseline calories your dog needs at rest. The MER (Maintenance Energy Requirement) adjusts this based on activity level, life stage, and health status.",
  },
  {
    question: "How many calories does my dog need per day?",
    answer:
      "It depends on weight, age, activity level, and whether your dog is neutered. A 10 kg (22 lb) neutered adult dog needs approximately 470 kcal/day. A 30 kg (66 lb) active intact dog needs around 1,250 kcal/day. Use the calculator above for your dog's specific numbers.",
  },
  {
    question: "Is this calculator free?",
    answer:
      "Yes — completely free, no sign-up required. Our formulas follow AAHA and WSAVA veterinary nutrition guidelines. You can calculate feeding portions for both dogs and cats instantly.",
  },
];

export default function FeedingCalculatorPage() {
  return (
    <>
      <JsonLdFAQ questions={faqQuestions} />
      <div className="min-h-screen flex flex-col">
        <header className="border-b">
          <div className="max-w-4xl mx-auto px-4 h-14 flex items-center gap-2">
            <Link href="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Link>
            <div className="ml-2 font-bold tracking-tight">PetVitals</div>
          </div>
        </header>

        <main className="flex-1 py-8 sm:py-12">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-8">
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Pet Feeding Calculator
              </h1>
              <p className="mt-3 text-muted-foreground text-base sm:text-lg max-w-xl mx-auto">
                Calculate your pet's daily calorie needs using veterinary-standard formulas. Free, instant, no sign-up required.
              </p>
            </div>

            <FeedingCalculatorForm />

            {/* Cross-tool link */}
            <div className="mt-12 p-6 rounded-xl border bg-card">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center shrink-0">
                  <Search className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-semibold">Not sure if a food is safe for your pet?</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Check 500+ foods, plants, and household items in our free Toxicity Checker. Instant results with symptoms and emergency steps.
                  </p>
                  <Link href="/toxicity" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline mt-2">
                    Open Toxicity Checker &rarr;
                  </Link>
                </div>
              </div>
            </div>

            {/* FAQ */}
            <section className="mt-16">
              <h2 className="text-xl font-bold mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqQuestions.map((faq, i) => (
                  <details key={i} className="rounded-lg border bg-card group">
                    <summary className="px-5 py-4 cursor-pointer text-sm font-medium list-none flex items-center justify-between">
                      {faq.question}
                      <span className="text-muted-foreground group-open:rotate-180 transition-transform">&darr;</span>
                    </summary>
                    <div className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </div>
                  </details>
                ))}
              </div>
            </section>

            {/* blog cross-link */}
            <div className="mt-8 text-center">
              <Link href="/blog/calculate-dog-calorie-needs" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Read our in-depth guide: How to Calculate Your Dog's Daily Calorie Needs &rarr;
              </Link>
            </div>
          </div>
        </main>

        <footer className="border-t py-6 text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} PetVitals. Always consult your veterinarian.
        </footer>
      </div>
    </>
  );
}