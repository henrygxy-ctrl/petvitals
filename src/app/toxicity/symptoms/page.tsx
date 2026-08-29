import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle, ArrowLeft, ArrowRight, Cat, Dog, FileText, Stethoscope } from "lucide-react";
import { AdUnit } from "@/components/ads/AdUnit";
import { InsuranceCtaBanner } from "@/components/affiliate/insurance-cta";
import { DownloadResourceCard } from "@/components/downloads/resource-card";
import { JsonLdBreadcrumb, JsonLdFAQ, JsonLdItemList, JsonLdWebPage } from "@/components/seo/json-ld";
import { SITE_BASE_URL, SITE_NAME } from "@/lib/constants";

const canonicalPath = "/toxicity/symptoms";
const dateModified = "2026-08-29";

export const metadata: Metadata = {
  title: `Pet Poisoning Symptoms in Dogs and Cats | ${SITE_NAME}`,
  description:
    "Dog and cat poisoning symptoms guide: vomiting, diarrhea, drooling, tremors, seizures, breathing trouble, kidney signs, emergency steps, and toxin lookup links.",
  alternates: { canonical: `${SITE_BASE_URL}${canonicalPath}` },
  openGraph: {
    title: "Pet Poisoning Symptoms in Dogs and Cats",
    description:
      "Recognize common dog and cat poisoning symptoms, know when it is urgent, and jump to toxin lookup pages.",
    url: `${SITE_BASE_URL}${canonicalPath}`,
    siteName: SITE_NAME,
    type: "website",
    images: [{ url: `${SITE_BASE_URL}/og-image.png`, width: 1200, height: 630, alt: "Pet poisoning symptoms guide" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pet Poisoning Symptoms in Dogs and Cats",
    description:
      "Recognize common dog and cat poisoning symptoms and know when to call a veterinarian.",
    images: [`${SITE_BASE_URL}/og-image.png`],
  },
};

const sourceLinks = [
  { name: "ASPCA Animal Poison Control", url: "https://www.aspca.org/pet-care/aspca-poison-control" },
  { name: "Pet Poison Helpline", url: "https://www.petpoisonhelpline.com/" },
  { name: "Cornell Feline Health Center: Poisons", url: "https://www.vet.cornell.edu/departments-centers-and-institutes/cornell-feline-health-center/health-information/feline-health-topics/poisons" },
  { name: "MSD Veterinary Manual: General Treatment of Poisoning", url: "https://www.msdvetmanual.com/special-pet-topics/poisoning/general-treatment-of-poisoning" },
  { name: "Merck Veterinary Manual: Over-the-Counter Drug Poisoning", url: "https://www.merckvetmanual.com/special-pet-topics/poisoning/poisoning-from-human-over-the-counter-drugs" },
];

const urgentSymptoms = [
  "Seizures, tremors, collapse, or inability to stand",
  "Trouble breathing, repeated coughing, or blue/pale gums",
  "Repeated vomiting, bloody vomit, black stool, or severe diarrhea",
  "Extreme drooling, oral burns, pawing at the mouth, or trouble swallowing",
  "Sudden weakness, confusion, incoordination, or unusually slow breathing",
  "Known exposure to grapes, xylitol, chocolate, lilies, sago palm, medication, antifreeze, or strong cleaners",
];

const symptomGroups = [
  {
    title: "Vomiting or Diarrhea",
    query: "vomiting diarrhea",
    description:
      "GI signs can follow foods, plants, cleaners, medication, spoiled food, or swallowed objects. The pattern alone does not identify the toxin.",
    links: [
      { title: "Grapes and raisins", href: "/toxicity/grapes" },
      { title: "Chocolate", href: "/toxicity/chocolate" },
      { title: "Onions", href: "/toxicity/onions" },
      { title: "Cleaning wipes", href: "/toxicity/cleaning-wipe" },
    ],
  },
  {
    title: "Drooling or Oral Pain",
    query: "drooling oral irritation",
    description:
      "Drooling, pawing at the mouth, or trouble swallowing often points to oral irritation, caustic exposure, or plant material.",
    links: [
      { title: "Household cleaners", href: "/toxicity/bleach" },
      { title: "Pothos", href: "/toxicity/pothos" },
      { title: "Peace lily", href: "/toxicity/peace-lily" },
      { title: "Essential oils", href: "/toxicity/essential-oils" },
    ],
  },
  {
    title: "Tremors or Seizures",
    query: "tremors seizures",
    description:
      "Neurologic signs are urgent. Chocolate, xylitol, medications, caffeine, some plants, and some pesticides can be involved.",
    links: [
      { title: "Xylitol", href: "/toxicity/xylitol" },
      { title: "Coffee and caffeine", href: "/toxicity/coffee" },
      { title: "Ibuprofen", href: "/toxicity/ibuprofen" },
      { title: "Sago palm", href: "/toxicity/sago-palm" },
    ],
  },
  {
    title: "Kidney or Liver Warning Signs",
    query: "kidney failure liver failure",
    description:
      "Some toxins can damage organs before the signs look dramatic. Do not wait for severe symptoms after known high-risk exposure.",
    links: [
      { title: "Grapes", href: "/toxicity/grapes" },
      { title: "Lilies", href: "/toxicity/lilies" },
      { title: "Sago palm", href: "/toxicity/sago-palm" },
      { title: "Acetaminophen", href: "/toxicity/acetaminophen" },
    ],
  },
];

const faqQuestions = [
  {
    question: "What are common symptoms of poisoning in dogs and cats?",
    answer:
      "Common signs can include vomiting, diarrhea, drooling, weakness, lethargy, tremors, seizures, trouble breathing, incoordination, collapse, appetite loss, abnormal gum color, or changes in urination. Signs vary by toxin and species.",
  },
  {
    question: "Should I wait for symptoms before calling a vet?",
    answer:
      "No for known high-risk exposures. Grapes, xylitol, lilies, sago palm, human medication, antifreeze, alcohol, and strong cleaners can be urgent even before severe symptoms appear.",
  },
  {
    question: "Can poisoning symptoms appear hours or days later?",
    answer:
      "Yes. Some toxins cause immediate vomiting or drooling, while others affect the kidneys, liver, blood, heart, or nervous system later. Delayed signs are one reason early professional guidance matters.",
  },
  {
    question: "Should I make my dog or cat vomit after poisoning?",
    answer:
      "Do not induce vomiting unless a veterinarian or pet poison professional tells you to. Vomiting can be dangerous with caustic chemicals, breathing problems, seizures, sedation, or some swallowed objects.",
  },
  {
    question: "What should I tell the veterinarian or poison hotline?",
    answer:
      "Share your pet's species, weight, age, symptoms, product or plant name, amount eaten or touched, exposure time, and any label or photo. Bring packaging or a photo if you go to a clinic.",
  },
];

const breadcrumbs = [
  { name: "Home", url: SITE_BASE_URL },
  { name: "Toxicity Checker", url: `${SITE_BASE_URL}/toxicity` },
  { name: "Poisoning Symptoms", url: `${SITE_BASE_URL}${canonicalPath}` },
];

export default function PetPoisoningSymptomsPage() {
  return (
    <>
      <JsonLdBreadcrumb items={breadcrumbs} />
      <JsonLdFAQ questions={faqQuestions} />
      <JsonLdWebPage
        name="Pet Poisoning Symptoms in Dogs and Cats"
        url={`${SITE_BASE_URL}${canonicalPath}`}
        description="Guide to dog and cat poisoning symptoms, urgent warning signs, symptom-based toxicity lookup paths, and emergency next steps."
        dateModified={dateModified}
        keywords={[
          "pet poisoning symptoms",
          "dog poisoning symptoms",
          "cat poisoning symptoms",
          "dog ate something toxic",
          "cat poisoning signs",
        ]}
        about={{
          name: "Pet Poisoning Symptoms",
          description: "Common warning signs and first steps after possible dog or cat toxin exposure.",
          alternateName: ["dog poisoning symptoms", "cat poisoning symptoms", "pet toxicosis signs"],
        }}
        citations={sourceLinks}
      />
      <JsonLdItemList
        items={symptomGroups.flatMap((group) =>
          group.links.map((link) => ({
            name: `${group.title}: ${link.title}`,
            url: `${SITE_BASE_URL}${link.href}`,
            description: group.description,
          }))
        )}
      />

      <div className="min-h-screen flex flex-col">
        <header className="border-b">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-2">
            <Link href="/toxicity" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4" />
              Toxicity Checker
            </Link>
            <div className="ml-2 font-bold tracking-tight">{SITE_NAME}</div>
          </div>
        </header>

        <main className="flex-1 py-10 sm:py-14">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <section className="mb-8">
              <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Poisoning Symptoms
              </span>
              <h1 className="mt-2 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
                Pet Poisoning Symptoms in Dogs and Cats
              </h1>
              <p className="mt-4 max-w-2xl text-muted-foreground">
                Vomiting, diarrhea, drooling, tremors, seizures, weakness, breathing trouble, or sudden behavior changes can happen after toxin exposure. Use this page to recognize urgent warning signs and jump into the toxicity checker by symptom.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/toxicity"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
                >
                  Search the toxicity checker
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/insurance/emergency-vet-cost"
                  className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium hover:bg-muted"
                >
                  Estimate emergency vet cost
                </Link>
              </div>
            </section>

            <section className="mb-8 rounded-xl border border-red-200 bg-red-50/60 p-5 dark:border-red-900/70 dark:bg-red-950/20">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold">Call for urgent guidance if you see these signs</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    This page is educational and cannot diagnose poisoning. With severe symptoms or known high-risk exposure, contact a veterinarian or pet poison hotline promptly.
                  </p>
                </div>
              </div>
              <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                {urgentSymptoms.map((item) => (
                  <li key={item} className="rounded-lg bg-background/70 p-3">
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <div className="mb-4 flex items-start gap-3">
                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Stethoscope className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Look Up Possible Toxins by Symptom</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Symptom matching is a starting point. Always combine it with what your pet may have eaten, touched, or inhaled.
                  </p>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {symptomGroups.map((group) => (
                  <div key={group.title} className="rounded-xl border bg-card p-5">
                    <h3 className="font-semibold">{group.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{group.description}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Link
                        href={`/toxicity?q=${encodeURIComponent(group.query)}`}
                        className="inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1.5 text-xs font-medium hover:bg-muted/80"
                      >
                        Search "{group.query}"
                      </Link>
                      {group.links.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs font-medium hover:bg-muted"
                        >
                          {link.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-10 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border bg-card p-5">
                <div className="flex items-center gap-2">
                  <Dog className="h-5 w-5 text-primary" />
                  <h2 className="font-semibold">Dog poisoning symptoms</h2>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Dogs are more likely to raid food, trash, backpacks, gum, or medication. Food toxins such as chocolate, grapes, xylitol, onions, alcohol, and caffeine are common dog emergencies.
                </p>
                <Link href="/toxicity/dogs" className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
                  Open dog toxicity guide
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
              <div className="rounded-xl border bg-card p-5">
                <div className="flex items-center gap-2">
                  <Cat className="h-5 w-5 text-primary" />
                  <h2 className="font-semibold">Cat poisoning symptoms</h2>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Cats can be exposed by chewing plants, licking paws after floor cleaners, inhaling strong fragrance, or grooming residue from fur. Lilies, acetaminophen, permethrin dog products, and cleaners deserve extra caution.
                </p>
                <Link href="/toxicity/cats" className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
                  Open cat toxicity guide
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </section>

            <section className="mt-10 rounded-xl border bg-card p-5">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h2 className="font-semibold">What to do before you call</h2>
                  <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
                    <li>Move your pet away from the suspected toxin and prevent more licking or eating.</li>
                    <li>Save the product label, plant photo, medication bottle, or package if available.</li>
                    <li>Estimate the amount and time of exposure as best you can.</li>
                    <li>Do not give home antidotes or induce vomiting unless a professional tells you to.</li>
                    <li>Call your veterinarian, an emergency clinic, ASPCA Animal Poison Control, or Pet Poison Helpline.</li>
                  </ol>
                </div>
              </div>
            </section>

            <InsuranceCtaBanner />
            <DownloadResourceCard variant="poison" />
            <AdUnit />

            <section className="mt-10">
              <h2 className="text-xl font-bold">Frequently Asked Questions</h2>
              <div className="mt-4 space-y-3">
                {faqQuestions.map((faq) => (
                  <details key={faq.question} className="rounded-lg border bg-card">
                    <summary className="cursor-pointer px-5 py-4 text-sm font-medium">
                      {faq.question}
                    </summary>
                    <div className="px-5 pb-4 text-sm leading-relaxed text-muted-foreground">
                      {faq.answer}
                    </div>
                  </details>
                ))}
              </div>
            </section>

            <section className="mt-10 rounded-lg bg-muted/50 p-4 text-xs leading-relaxed text-muted-foreground">
              <h2 className="mb-2 text-sm font-semibold text-foreground">Sources</h2>
              <div className="flex flex-wrap gap-x-3 gap-y-1">
                {sourceLinks.map((source) => (
                  <a key={source.url} href={source.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    {source.name}
                  </a>
                ))}
              </div>
              <p className="mt-3">
                Educational information only. If you suspect poisoning, contact a veterinarian or pet poison control service.
              </p>
            </section>
          </div>
        </main>

        <footer className="border-t py-6 text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} {SITE_NAME}. Always consult your veterinarian.
        </footer>
      </div>
    </>
  );
}
