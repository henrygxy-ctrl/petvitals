import type { Metadata } from "next";
import { SITE_NAME, SITE_BASE_URL } from "@/lib/constants";
import { ToxicitySearchWrapper } from "@/components/toxicity/toxicity-search-wrapper";
import { JsonLdFAQ, JsonLdBreadcrumb, JsonLdItemList } from "@/components/seo/json-ld";
import { AlertTriangle, ArrowLeft, BookOpen, ArrowRight, Cat, Dog, Stethoscope } from "lucide-react";
import Link from "next/link";
import { getToxicityCategoryEntries } from "@/lib/toxicity-category-metadata";

export const metadata: Metadata = {
  title: `Dog & Cat Toxicity Checker: Foods, Plants & Symptoms | ${SITE_NAME}`,
  description:
    "Search 500+ dog and cat toxicity records for poisonous foods, plants, cleaners, symptoms, and what to do after exposure.",
  alternates: { canonical: `${SITE_BASE_URL}/toxicity` },
  openGraph: {
    title: `Dog & Cat Toxicity Checker | ${SITE_NAME}`,
    description:
      "Search 500+ dog and cat toxicity records for poisonous foods, plants, cleaners, symptoms, and emergency next steps.",
    url: `${SITE_BASE_URL}/toxicity`,
    siteName: SITE_NAME,
    type: "website",
    images: [{ url: `${SITE_BASE_URL}/og-image.png`, width: 1200, height: 630, alt: "PetVitals Toxicity Checker" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Dog & Cat Toxicity Checker | ${SITE_NAME}`,
    description:
      "Search 500+ dog and cat toxicity records for poisonous foods, plants, cleaners, symptoms, and emergency next steps.",
    images: [`${SITE_BASE_URL}/og-image.png`],
  },
};

const faqQuestions = [
  {
    question: "Are grapes safe for dogs?",
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
      "No. Onions, garlic, leeks, and chives contain N-propyl disulfide, which damages red blood cells and causes hemolytic anemia in dogs. All forms are toxic: raw, cooked, dehydrated, and powdered. Even small repeated exposures accumulate over time.",
  },
  {
    question: "What common houseplants are toxic to cats?",
    answer:
      "True lilies (Lilium and Hemerocallis species) are the most dangerous. Even small amounts of pollen can cause fatal kidney failure in cats. Other toxic houseplants include pothos, philodendron, dieffenbachia, snake plant, sago palm, aloe vera, English ivy, peace lily, and jade plant. See our full plant toxicity guide for details.",
  },
  {
    question: "Is this toxicity checker free?",
    answer:
      "Yes - completely free, no sign-up required. Our database covers over 500 foods, plants, medications, and household items with detailed safety information, symptoms, emergency steps, and clinical source references.",
  },
  {
    question: "Can I search pet poisoning symptoms?",
    answer:
      "Yes. You can search by symptom keywords such as vomiting, diarrhea, seizures, drooling, tremors, or kidney failure. Symptom results are not a diagnosis, but they help you find possible toxic exposures and decide when to call a veterinarian.",
  },
  {
    question: "When is pet poisoning an emergency?",
    answer:
      "Treat known exposure to grapes, xylitol, chocolate, lilies, sago palm, human medications, alcohol, antifreeze, or strong cleaners as urgent. Seizures, collapse, trouble breathing, repeated vomiting, pale gums, tremors, or possible kidney or liver injury also deserve immediate veterinary guidance.",
  },
];

const breadcrumbs = [
  { name: "Home", url: SITE_BASE_URL },
  { name: "Toxicity Checker", url: `${SITE_BASE_URL}/toxicity` },
];

const emergencyChecks = [
  {
    title: "Dog ate chocolate",
    href: "/toxicity/chocolate",
    label: "Food emergency",
    description: "Check theobromine and caffeine risk, symptoms, and next steps.",
  },
  {
    title: "Dog ate grapes or raisins",
    href: "/toxicity/grapes",
    label: "Kidney risk",
    description: "Grapes and raisins can cause acute kidney failure in dogs.",
  },
  {
    title: "Pet ate xylitol",
    href: "/toxicity/xylitol",
    label: "Fast action",
    description: "Sugar-free gum, candy, and baked goods can become an emergency.",
  },
  {
    title: "Cat touched lilies",
    href: "/toxicity/lilies",
    label: "Cat emergency",
    description: "True lilies can cause severe kidney injury in cats.",
  },
  {
    title: "Pet chewed sago palm",
    href: "/toxicity/sago-palm",
    label: "Plant emergency",
    description: "Seeds and nuts are especially dangerous for dogs and cats.",
  },
  {
    title: "Pet got ibuprofen",
    href: "/toxicity/ibuprofen",
    label: "Medication",
    description: "Human pain relievers can cause severe poisoning in pets.",
  },
];

const symptomShortcuts = [
  { label: "vomiting", query: "vomiting" },
  { label: "diarrhea", query: "diarrhea" },
  { label: "seizures", query: "seizures" },
  { label: "drooling", query: "drooling" },
  { label: "tremors", query: "tremors" },
  { label: "kidney failure", query: "kidney failure" },
  { label: "difficulty breathing", query: "difficulty breathing" },
  { label: "pale gums", query: "pale gums" },
];

const petHubs = [
  {
    title: "Dog Toxicity Guide",
    href: "/toxicity/dogs",
    description: "Common foods, plants, cleaners, medications, and emergency dog poison searches.",
    icon: Dog,
  },
  {
    title: "Cat Toxicity Guide",
    href: "/toxicity/cats",
    description: "Cat-specific risks from lilies, cleaners, human medications, floors, and grooming exposure.",
    icon: Cat,
  },
];

export default function ToxicityPage() {
  const categoryEntries = getToxicityCategoryEntries();

  return (
    <>
      <JsonLdFAQ questions={faqQuestions} />
      <JsonLdBreadcrumb items={breadcrumbs} />
      <JsonLdItemList
        items={[
          ...categoryEntries.map((category) => ({
            name: `${category.label} Toxicity Guide`,
            url: `${SITE_BASE_URL}/toxicity/category/${category.id}`,
            description: category.description,
          })),
          ...emergencyChecks.map((item) => ({
            name: item.title,
            url: `${SITE_BASE_URL}${item.href}`,
            description: item.description,
          })),
          ...petHubs.map((item) => ({
            name: item.title,
            url: `${SITE_BASE_URL}${item.href}`,
            description: item.description,
          })),
        ]}
      />
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
                Dog and Cat Toxicity Checker
              </h1>
              <p className="mt-3 text-muted-foreground text-base sm:text-lg max-w-xl mx-auto">
                Search 500+ foods, plants, cleaners, medications, and household items to see whether they are poisonous to dogs or cats, what symptoms to watch for, and what to do next.
              </p>
            </div>

            <ToxicitySearchWrapper />

            {/* Emergency Entry Points */}
            <section className="mt-10">
              <div className="flex items-start gap-3">
                <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-400">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Urgent Poison Checks</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Start with these high-risk dog and cat toxicity pages if your pet may have eaten or touched something dangerous.
                  </p>
                </div>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {emergencyChecks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-xl border bg-card p-4 hover:border-primary/40 transition-colors group"
                  >
                    <span className="text-xs font-semibold uppercase tracking-wide text-red-600 dark:text-red-400">
                      {item.label}
                    </span>
                    <h3 className="mt-1 text-sm font-semibold group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </Link>
                ))}
              </div>
            </section>

            {/* Symptom Search Shortcuts */}
            <section className="mt-10 rounded-xl border bg-card p-5">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400">
                  <Stethoscope className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold">Search by Poisoning Symptom</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Not sure what your pet got into? Search the toxicity checker by common symptom keywords.
                  </p>
                  <Link
                    href="/toxicity/symptoms"
                    className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                  >
                    Open the poisoning symptoms guide
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {symptomShortcuts.map((item) => (
                  <Link
                    key={item.query}
                    href={`/toxicity?q=${encodeURIComponent(item.query)}`}
                    className="rounded-full bg-muted px-3 py-1.5 text-sm hover:bg-muted/80 transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </section>

            {/* Pet-specific Hubs */}
            <section className="mt-10">
              <h2 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
                Pet-Specific Toxicity Hubs
              </h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {petHubs.map((hub) => {
                  const Icon = hub.icon;

                  return (
                    <Link
                      key={hub.href}
                      href={hub.href}
                      className="flex items-start gap-3 rounded-xl border bg-card p-4 hover:border-primary/40 transition-colors group"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold group-hover:text-primary transition-colors">
                          {hub.title}
                        </h3>
                        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                          {hub.description}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>

            {/* Browse by Category */}
            <div className="mt-8">
              <h2 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
                Browse by Category
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {categoryEntries.map((category) => (
                  <Link
                    key={category.id}
                    href={`/toxicity/category/${category.id}`}
                    className="rounded-xl border bg-card p-4 hover:border-primary/40 transition-colors group"
                  >
                    <h3 className="text-sm font-semibold group-hover:text-primary transition-colors">
                      {category.label}
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {category.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>

            {/* Popular Searches */}
            <div className="mt-8">
              <h2 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
                Popular Searches
              </h2>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "grapes", href: "/toxicity/grapes" },
                  { label: "chocolate", href: "/toxicity/chocolate" },
                  { label: "dry ice", href: "/toxicity/dry-ice" },
                  { label: "nail polish remover", href: "/toxicity/nail-polish-remover" },
                  { label: "tiger nuts", href: "/toxicity/tiger-nut" },
                  { label: "pili nuts", href: "/toxicity/pili-nut" },
                  { label: "trail mix", href: "/toxicity/trail-mix" },
                  { label: "avocado", href: "/toxicity/avocado" },
                  { label: "onions", href: "/toxicity/onions" },
                  { label: "garlic", href: "/toxicity/garlic" },
                  { label: "lilies", href: "/toxicity/lilies" },
                  { label: "wisteria", href: "/toxicity/wisteria" },
                  { label: "sago palm", href: "/toxicity/sago-palm" },
                  { label: "incense", href: "/toxicity/incense" },
                  { label: "superglue", href: "/toxicity/superglue" },
                  { label: "protein shake", href: "/toxicity/protein-shake" },
                  { label: "cantaloupe", href: "/toxicity/cantaloupe" },
                  { label: "cleaning wipes", href: "/toxicity/cleaning-wipe" },
                  { label: "xylitol", href: "/toxicity/xylitol" },
                  { label: "macadamia nuts", href: "/toxicity/macadamia-nuts" },
                  { label: "coffee", href: "/toxicity/coffee" },
                  { label: "alcohol", href: "/toxicity/alcohol" },
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

            {/* Emergency Cost Link */}
            <section className="mt-12 rounded-xl border bg-card p-6">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Stethoscope className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="font-semibold">Poisoning can turn into an emergency vet visit.</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    After checking the toxin, estimate possible exam, treatment, hospitalization, and insurance costs before an urgent visit surprises you.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Link
                      href="/insurance/emergency-vet-cost"
                      className="inline-flex items-center gap-1 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
                    >
                      Emergency vet cost
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                    <Link
                      href="/insurance/accident-only"
                      className="inline-flex items-center gap-1 rounded-lg border px-3 py-2 text-sm font-medium hover:bg-muted"
                    >
                      Accident-only coverage
                    </Link>
                  </div>
                </div>
              </div>
            </section>

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
                      <span className="text-muted-foreground group-open:rotate-180 transition-transform">&darr;</span>
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
