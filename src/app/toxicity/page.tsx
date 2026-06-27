import type { Metadata } from "next";
import { SITE_NAME, SITE_BASE_URL } from "@/lib/constants";
import { ToxicitySearchWrapper } from "@/components/toxicity/toxicity-search-wrapper";
import { JsonLdFAQ, JsonLdBreadcrumb } from "@/components/seo/json-ld";
import { ArrowLeft, BookOpen, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: `Is This Food Safe for My Dog & Cat? Free Toxicity Checker | ${SITE_NAME}`,
  description:
    "Instantly check if foods, plants, and household items are safe for your dog or cat. Search grapes, chocolate, avocado, onions, lilies, and 500+ more items. Vet-reviewed data.",
  alternates: { canonical: `${SITE_BASE_URL}/toxicity` },
  openGraph: {
    title: `Is It Safe for My Pet? Free Toxicity Checker | ${SITE_NAME}`,
    description:
      "Search 500+ foods, plants, and household items. Instant safety check for dogs and cats. Free, no sign-up.",
    url: `${SITE_BASE_URL}/toxicity`,
    siteName: SITE_NAME,
    type: "website",
  },
};

const faqQuestions = [
  {
    question: "Is grapes safe for dogs?",
    answer:
      "No. Grapes and raisins are highly toxic to dogs and can cause acute kidney failure even in small amounts. If your dog eats grapes, contact your veterinarian or pet poison helpline immediately. Symptoms include vomiting, diarrhea, lethargy, and decreased urination.",
  },
  {
    question: "Can dogs eat chocolate?",
    answer:
      "No. Chocolate contains theobromine and caffeine, both toxic to dogs. Dark chocolate and baking chocolate are most dangerous. Toxicity depends on the type of chocolate, amount eaten, and your dog's weight. Contact your veterinarian immediately if your dog eats chocolate.",
  },
  {
    question: "Is avocado safe for dogs?",
    answer:
      "Avocado flesh contains persin, which can cause vomiting and diarrhea. The pit poses a serious choking and intestinal blockage risk. While dogs are more resistant to persin than birds, avocado is not recommended as a treat. Guacamole is especially dangerous due to added onion and garlic.",
  },
  {
    question: "Can dogs eat onions?",
    answer:
      "No. Onions, garlic, leeks, and chives contain N-propyl disulfide, which damages red blood cells and causes hemolytic anemia in dogs. All forms are toxic ? raw, cooked, dehydrated, and powdered. Even small repeated exposures accumulate over time.",
  },
  {
    question: "What common houseplants are toxic to cats?",
    answer:
      "True lilies (Lilium and Hemerocallis species) are the most dangerous ? even small amounts of pollen can cause fatal kidney failure in cats. Other toxic houseplants include pothos, philodendron, dieffenbachia, snake plant, sago palm, aloe vera, English ivy, peace lily, and jade plant. See our full plant toxicity guide for details.",
  },
  {
    question: "Is this toxicity checker free?",
    answer:
      "Yes ? completely free, no sign-up required. Our database covers over 500 foods, plants, medications, and household items with detailed safety information, symptoms, emergency steps, and clinical source references.",
  },
];

const breadcrumbs = [
  { name: "Home", url: SITE_BASE_URL },
  { name: "Toxicity Checker", url: `${SITE_BASE_URL}/toxicity` },
];

export default function ToxicityPage() {
  return (
    <>
      <JsonLdFAQ questions={faqQuestions} />
      <JsonLdBreadcrumb items={breadcrumbs} />
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
                Can my pet eat this?
              </h1>
              <p className="mt-3 text-muted-foreground text-base sm:text-lg max-w-xl mx-auto">
                Search 500+ foods, plants, and household items to find out 
                what&rsquo;s safe for your dog or cat ? instantly.
              </p>
            </div>

            <ToxicitySearchWrapper />

            {/* Popular Searches */}
            <div className="mt-8">
              <h2 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
                Popular Searches
              </h2>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "grapes", href: "/blog/can-dogs-eat-grapes" },
                  { label: "chocolate", href: "/blog/dog-chocolate-toxicity" },
                  { label: "avocado", href: "/blog/can-dogs-eat-avocado" },
                  { label: "onions", href: "/blog/can-dogs-eat-onions" },
                  { label: "garlic", href: "/blog/can-dogs-eat-onions" },
                  { label: "lilies", href: "/blog/lily-toxicity-cats" },
                  { label: "xylitol", href: "/blog/category/nutrition-and-safety" },
                  { label: "macadamia nuts", href: "/blog/category/nutrition-and-safety" },
                  { label: "coffee", href: "/blog/category/nutrition-and-safety" },
                  { label: "alcohol", href: "/blog/category/nutrition-and-safety" },
                ].map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="px-3 py-1.5 rounded-full bg-muted hover:bg-muted/80 text-sm transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Cross-promotion: Blog */}
            <div className="mt-12 p-6 rounded-xl border bg-card">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center shrink-0">
                  <BookOpen className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-semibold">Want to learn more about pet safety?</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Read our evidence-based guides on foods, plants, and household 
                    dangers for dogs and cats. Every article cites clinical sources.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Link
                      href="/blog/can-dogs-eat-grapes"
                      className="inline-flex items-center gap-1 text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:underline"
                    >
                      Can dogs eat grapes?
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                    <Link
                      href="/blog/dog-chocolate-toxicity"
                      className="inline-flex items-center gap-1 text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:underline"
                    >
                      Chocolate toxicity
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                    <Link
                      href="/blog/category/nutrition-and-safety"
                      className="inline-flex items-center gap-1 text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:underline"
                    >
                      All safety articles
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <section className="mt-16">
              <h2 className="text-xl font-bold mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqQuestions.map((faq, i) => (
                  <details
                    key={i}
                    className="rounded-lg border bg-card group"
                  >
                    <summary className="px-5 py-4 cursor-pointer text-sm font-medium list-none flex items-center justify-between">
                      {faq.question}
                      <span className="text-muted-foreground group-open:rotate-180 transition-transform">?</span>
                    </summary>
                    <div className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </div>
                  </details>
                ))}
              </div>
            </section>
            {/* Cross-tool link */}
            <div className="mt-12 p-6 rounded-xl border bg-card">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
                </div>
                <div>
                  <h3 className="font-semibold">Know what&apos;s safe? Now figure out how much to feed.</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Use our free Feeding Calculator to find your pet&apos;s exact daily calorie needs based on weight, age, and activity level.
                  </p>
                  <Link href="/feeding-calculator" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline mt-2">
                    Try the Feeding Calculator &rarr;
                  </Link>
                </div>
              </div>
            </div>

{/* Disclaimer */}
            <div className="mt-12 p-4 rounded-lg bg-muted/50 text-xs text-muted-foreground leading-relaxed">
              <strong>Disclaimer:</strong> This information is for educational purposes only and is not a substitute 
              for professional veterinary advice. If you suspect your pet has ingested something toxic, 
              contact your veterinarian or the ASPCA Animal Poison Control Center (888-426-4435) immediately.
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
