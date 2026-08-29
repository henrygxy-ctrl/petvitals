import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AlertTriangle, ArrowLeft, ArrowRight, CheckCircle2, Info, ShieldAlert } from "lucide-react";
import { SITE_BASE_URL, SITE_NAME } from "@/lib/constants";
import { toxicityDatabase, type ToxicityLevel } from "@/data/toxicity";
import {
  getToxicityCategoryEntries,
  isToxicityCategory,
  TOXICITY_CATEGORY_META,
  type ToxicityCategory,
} from "@/lib/toxicity-category-metadata";
import { JsonLdBreadcrumb, JsonLdFAQ, JsonLdItemList, JsonLdWebPage } from "@/components/seo/json-ld";

interface Props {
  params: Promise<{ category: string }>;
}

const riskRank: Record<ToxicityLevel, number> = {
  danger: 0,
  toxic: 1,
  caution: 2,
  safe: 3,
};

const riskConfig: Record<ToxicityLevel, { label: string; className: string; icon: typeof Info }> = {
  danger: {
    label: "Danger",
    className: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    icon: ShieldAlert,
  },
  toxic: {
    label: "Toxic",
    className: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
    icon: AlertTriangle,
  },
  caution: {
    label: "Caution",
    className: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    icon: Info,
  },
  safe: {
    label: "Safe",
    className: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    icon: CheckCircle2,
  },
};

const CATEGORY_PAGE_LAST_MODIFIED = "2026-08-29";

type CategoryRelatedLink = {
  title: string;
  href: string;
  description: string;
};

const categorySpecificFaq: Partial<Record<ToxicityCategory, { question: string; answer: string }[]>> = {
  plants: [
    {
      question: "Which plants are most dangerous for dogs and cats?",
      answer:
        "Sago palm, lilies, oleander, azalea, and wisteria are common plant risks to check first. Seeds, bulbs, pods, and pollen can be especially concerning depending on the plant.",
    },
    {
      question: "Are houseplants more dangerous for cats?",
      answer:
        "Cats may chew leaves, brush pollen onto their coat, or groom plant residue from fur and paws. Lily exposure is especially urgent for cats, even when the amount seems small.",
    },
  ],
  household: [
    {
      question: "Which household cleaners are not pet-safe?",
      answer:
        "Concentrated bleach, ammonia, phenol disinfectants, essential oils, drain cleaners, detergent pods, and disinfecting wipes can all create pet exposure risks when swallowed, inhaled, or left wet on surfaces.",
    },
    {
      question: "Can pets walk on floors after cleaning?",
      answer:
        "Keep dogs and cats away while floors are wet. Let surfaces dry fully, ventilate the room, and rinse pet-contact surfaces when the product label or veterinary guidance calls for it.",
    },
  ],
  "human-food": [
    {
      question: "What human foods are emergency toxins for dogs and cats?",
      answer:
        "Chocolate, xylitol, grapes and raisins, onions, garlic, alcohol, caffeine, and large fatty meals are common human-food risks. Call a veterinarian or poison-control hotline if the amount is unknown.",
    },
  ],
  "nuts-seeds": [
    {
      question: "Are nuts and seeds safe treats for pets?",
      answer:
        "Some seeds can be safe in small amounts, but high-fat nuts, salted mixes, shells, moldy nuts, and macadamia nuts can be risky. Check the specific item before feeding it.",
    },
  ],
  medications: [
    {
      question: "What should I do if my pet ate human medication?",
      answer:
        "Treat human medication exposure as urgent. Keep the bottle or packaging, estimate the amount and time, and call your veterinarian or a pet poison-control hotline before symptoms progress.",
    },
  ],
};

const categoryRelatedLinks: Partial<Record<ToxicityCategory, CategoryRelatedLink[]>> = {
  plants: [
    {
      title: "Wisteria Toxicity",
      href: "/toxicity/wisteria",
      description: "Check whether wisteria is poisonous to dogs or cats and what symptoms to watch for.",
    },
    {
      title: "Sago Palm Toxicity",
      href: "/toxicity/sago-palm",
      description: "Review one of the highest-risk plant exposures for pets.",
    },
    {
      title: "Toxic Houseplants for Cats",
      href: "/blog/household-plants-toxic-to-cats",
      description: "Compare indoor plant risks and cat-specific precautions.",
    },
  ],
  household: [
    {
      title: "Pet-Safe Cleaning Hub",
      href: "/pet-safe-cleaning",
      description: "Compare safer cleaning routines, floor residue risks, and disinfectant cautions.",
    },
    {
      title: "Cat-Friendly Cleaning Products",
      href: "/blog/cat-friendly-cleaning-products",
      description: "Focus on cat-safe cleaner and disinfectant questions.",
    },
    {
      title: "Poisoning Symptoms",
      href: "/toxicity/symptoms",
      description: "Check vomiting, drooling, tremors, coughing, weakness, and other warning signs.",
    },
  ],
  "human-food": [
    {
      title: "Chocolate Toxicity",
      href: "/toxicity/chocolate",
      description: "Check the common emergency food toxin for dogs and cats.",
    },
    {
      title: "Dog Chocolate Guide",
      href: "/blog/dog-chocolate-toxicity",
      description: "Compare risk by chocolate type, amount, and dog size.",
    },
    {
      title: "Emergency Vet Cost",
      href: "/insurance/emergency-vet-cost",
      description: "Plan for exam, decontamination, bloodwork, and monitoring costs after ingestion.",
    },
  ],
};

export async function generateStaticParams() {
  return getToxicityCategoryEntries().map((category) => ({ category: category.id }));
}

function buildCategoryFaq(
  category: ToxicityCategory,
  label: string,
  items: { name: string; riskLevel: ToxicityLevel }[],
  riskyCount: number
) {
  const lowerLabel = label.toLowerCase();
  const topRiskItems = items
    .filter((item) => item.riskLevel === "danger" || item.riskLevel === "toxic")
    .slice(0, 5)
    .map((item) => item.name);

  const genericFaq = [
    {
      question: `Which ${lowerLabel} are most dangerous for dogs and cats?`,
      answer:
        topRiskItems.length > 0
          ? `Start with ${topRiskItems.join(", ")}. This category currently includes ${riskyCount} toxic or dangerous entries, so open the item page for symptoms and next steps.`
          : `This category currently has no high-risk entries marked as toxic or dangerous, but portion size, preparation, and individual sensitivity still matter.`,
    },
    {
      question: `What symptoms can ${lowerLabel} poisoning cause?`,
      answer:
        "Watch for vomiting, diarrhea, drooling, coughing, tremors, weakness, collapse, seizures, pale gums, trouble breathing, or unusual behavior after exposure.",
    },
    {
      question: "When should I call a veterinarian or poison-control hotline?",
      answer:
        "Call right away if the item is marked toxic or danger, the amount is unknown, your pet is small, symptoms appear, or the exposure involves medication, concentrated chemicals, or a known emergency toxin.",
    },
  ];

  return [...genericFaq, ...(categorySpecificFaq[category] || [])];
}

function buildCategoryRelatedLinks(category: ToxicityCategory): CategoryRelatedLink[] {
  return [
    ...(categoryRelatedLinks[category] || []),
    {
      title: "Dog Toxicity Guide",
      href: "/toxicity/dogs",
      description: "Browse dog-specific food, plant, cleaner, and medication safety checks.",
    },
    {
      title: "Cat Toxicity Guide",
      href: "/toxicity/cats",
      description: "Browse cat-specific poisoning risks and safety notes.",
    },
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  if (!isToxicityCategory(category)) return { title: "Not Found" };

  const meta = TOXICITY_CATEGORY_META[category];
  const url = `${SITE_BASE_URL}/toxicity/category/${category}`;
  const title = `${meta.label} Toxicity Guide for Dogs & Cats`;
  const description = `${meta.description} Browse PetVitals safety notes, symptoms, emergency steps, and full toxicity details.`;
  const image = `${SITE_BASE_URL}/og-image.png`;

  return {
    title: `${title} | ${SITE_NAME}`,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
      images: [{ url: image, width: 1200, height: 630, alt: `${SITE_NAME} Toxicity Guide` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function ToxicityCategoryPage({ params }: Props) {
  const { category } = await params;
  if (!isToxicityCategory(category)) notFound();

  const meta = TOXICITY_CATEGORY_META[category];
  const seen = new Set<string>();
  const items = toxicityDatabase
    .filter((item) => item.category === category)
    .filter((item) => {
      if (seen.has(item.id)) return false;
      seen.add(item.id);
      return true;
    })
    .sort((a, b) => riskRank[a.riskLevel] - riskRank[b.riskLevel] || a.name.localeCompare(b.name));

  const riskyCount = items.filter((item) => item.riskLevel === "danger" || item.riskLevel === "toxic").length;
  const faqQuestions = buildCategoryFaq(category, meta.label, items, riskyCount);
  const relatedLinks = buildCategoryRelatedLinks(category);

  const breadcrumbs = [
    { name: "Home", url: SITE_BASE_URL },
    { name: "Toxicity Checker", url: `${SITE_BASE_URL}/toxicity` },
    { name: meta.label, url: `${SITE_BASE_URL}/toxicity/category/${category}` },
  ];

  return (
    <>
      <JsonLdFAQ questions={faqQuestions} />
      <JsonLdBreadcrumb items={breadcrumbs} />
      <JsonLdWebPage
        name={`${meta.label} Toxicity Guide for Dogs and Cats`}
        url={`${SITE_BASE_URL}/toxicity/category/${category}`}
        description={`${meta.description} Browse symptoms, emergency steps, and pet-specific safety checks.`}
        dateModified={CATEGORY_PAGE_LAST_MODIFIED}
        keywords={[meta.label, "pet toxicity", "dog poisoning", "cat poisoning", "pet poison symptoms"]}
      />
      <JsonLdItemList
        items={items.map((item) => ({
          name: item.name,
          url: `${SITE_BASE_URL}/toxicity/${item.id}`,
          description: item.description,
        }))}
      />
      <div className="min-h-screen flex flex-col">
        <header className="border-b">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-2">
            <Link href="/toxicity" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4" />
              Toxicity Checker
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="font-semibold text-sm">{meta.label}</span>
          </div>
        </header>

        <main className="flex-1 py-8 sm:py-12">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="mb-8">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                Pet Toxicity Directory
              </p>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                {meta.label} Toxicity Guide for Dogs and Cats
              </h1>
              <p className="mt-3 text-muted-foreground max-w-2xl">
                {meta.description} Browse {items.length} items with safety status,
                symptoms to watch for, and emergency guidance.
              </p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs text-muted-foreground">
                <span className="rounded-full bg-muted px-3 py-1">{items.length} total items</span>
                <span className="rounded-full bg-muted px-3 py-1">{riskyCount} toxic or dangerous</span>
              </div>
            </div>

            <section className="mb-8 rounded-xl border bg-card p-5">
              <h2 className="text-lg font-bold">How to Use This {meta.label} Safety List</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Step 1</p>
                  <h3 className="mt-1 text-sm font-semibold">Start with risk level</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Danger and toxic entries need the fastest attention, especially when the amount is unknown.
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Step 2</p>
                  <h3 className="mt-1 text-sm font-semibold">Open the item page</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Each detail page gives dog and cat answers, symptoms, action steps, sources, and related checks.
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Step 3</p>
                  <h3 className="mt-1 text-sm font-semibold">Escalate symptoms</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    If vomiting, tremors, weakness, breathing trouble, or collapse appears, contact a veterinary professional.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="rounded-xl border bg-card p-5">
                <h2 className="text-lg font-bold">Common {meta.label} Toxicity Questions</h2>
                <div className="mt-4 space-y-3">
                  {faqQuestions.map((faq) => (
                    <details key={faq.question} className="rounded-lg border bg-background">
                      <summary className="cursor-pointer px-4 py-3 text-sm font-medium list-none">
                        {faq.question}
                      </summary>
                      <p className="px-4 pb-3 text-sm leading-relaxed text-muted-foreground">
                        {faq.answer}
                      </p>
                    </details>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border bg-card p-5">
                <h2 className="text-lg font-bold">Related Safety Guides</h2>
                <div className="mt-4 space-y-3">
                  {relatedLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block rounded-lg border bg-background p-4 hover:border-primary/40 transition-colors"
                    >
                      <span className="font-semibold text-sm">{link.title}</span>
                      <p className="mt-1 text-sm text-muted-foreground">{link.description}</p>
                      <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-primary">
                        Open guide
                        <ArrowRight className="h-3 w-3" />
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </section>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {items.map((item) => {
                const config = riskConfig[item.riskLevel];
                const Icon = config.icon;

                return (
                  <Link
                    key={item.id}
                    href={`/toxicity/${item.id}`}
                    className="rounded-xl border bg-card p-5 hover:border-primary/40 transition-colors group"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h2 className="font-semibold group-hover:text-primary transition-colors">
                        {item.name}
                      </h2>
                      <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ${config.className}`}>
                        <Icon className="h-3 w-3" />
                        {config.label}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
                      {item.description}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-primary">
                      View details
                      <ArrowRight className="h-3 w-3" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </main>

        <footer className="border-t py-6 text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} {SITE_NAME}. Always consult your veterinarian.
        </footer>
      </div>
    </>
  );
}
