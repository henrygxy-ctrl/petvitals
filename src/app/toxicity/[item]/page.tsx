import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { toxicityDatabase, getToxicityById, type ToxicityItem } from "@/data/toxicity";
import { SITE_NAME, SITE_BASE_URL } from "@/lib/constants";
import { ArrowLeft, ExternalLink, Shield, AlertTriangle, Info, CheckCircle, Dog, Cat, BookOpen } from "lucide-react";
import { JsonLdBreadcrumb, JsonLdFAQ, JsonLdWebPage } from "@/components/seo/json-ld";
import { AdUnit } from "@/components/ads/AdUnit";
import { InsuranceCtaBanner } from "@/components/affiliate/insurance-cta";
import { DownloadResourceCard } from "@/components/downloads/resource-card";
import { ContextualHubLinks, type ContextualHubLink } from "@/components/hubs/contextual-hub-links";

const riskLabels: Record<string, string> = {
  safe: "Safe",
  caution: "Caution",
  toxic: "Toxic",
  danger: "Danger",
};

const riskIcons: Record<string, React.ReactNode> = {
  safe: <CheckCircle className="h-7 w-7 text-emerald-500" />,
  caution: <Info className="h-7 w-7 text-amber-500" />,
  toxic: <AlertTriangle className="h-7 w-7 text-orange-500" />,
  danger: <Shield className="h-7 w-7 text-red-500" />,
};

const riskStyles: Record<string, { bg: string; border: string; badge: string }> = {
  safe: {
    bg: "bg-emerald-50 dark:bg-emerald-950/20",
    border: "border-emerald-200 dark:border-emerald-800",
    badge: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  },
  caution: {
    bg: "bg-amber-50 dark:bg-amber-950/20",
    border: "border-amber-200 dark:border-amber-800",
    badge: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  },
  toxic: {
    bg: "bg-orange-50 dark:bg-orange-950/20",
    border: "border-orange-200 dark:border-orange-800",
    badge: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  },
  danger: {
    bg: "bg-red-50 dark:bg-red-950/20",
    border: "border-red-200 dark:border-red-800",
    badge: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  },
};

const TOXICITY_PAGE_LAST_MODIFIED = "2026-08-29";

const featuredSafetyLinks: Record<string, { id: string; reason: string }[]> = {
  wisteria: [
    { id: "sago-palm", reason: "Another high-risk garden plant" },
    { id: "lilies", reason: "Major toxic plant risk for cats" },
    { id: "azalea", reason: "Common poisonous ornamental shrub" },
    { id: "chocolate", reason: "Common emergency food toxin" },
  ],
  "sesame-seeds": [
    { id: "chocolate", reason: "High-risk food toxin" },
    { id: "grapes", reason: "Unsafe fruit comparison" },
    { id: "xylitol", reason: "Sweetener emergency risk" },
    { id: "wisteria", reason: "Common plant poisoning query" },
  ],
  "sago-palm": [
    { id: "wisteria", reason: "Another toxic garden plant" },
    { id: "lilies", reason: "Major toxic plant risk for cats" },
    { id: "oleander", reason: "Dangerous ornamental plant" },
    { id: "chocolate", reason: "Common emergency food toxin" },
  ],
  chocolate: [
    { id: "xylitol", reason: "Another urgent ingestion risk" },
    { id: "grapes", reason: "Common toxic food search" },
    { id: "onions", reason: "Kitchen toxin for dogs and cats" },
    { id: "sesame-seeds", reason: "Safe seed comparison" },
  ],
};

const targetedToxicityMeta: Record<string, { title: string; description: string }> = {
  wisteria: {
    title: "Is Wisteria Poisonous to Dogs or Cats?",
    description:
      "Wisteria is poisonous to dogs and cats, especially seeds and pods. Learn symptoms, what to do after exposure, and related toxic garden plants.",
  },
  "sago-palm": {
    title: "Is Sago Palm Toxic to Dogs or Cats?",
    description:
      "Sago palm is highly toxic to dogs and cats. Learn why seeds are dangerous, poisoning symptoms, emergency steps, and related toxic plants.",
  },
};

const targetedSearchAnswers: Record<
  string,
  {
    title: string;
    intro: string;
    answers: { question: string; answer: string }[];
    links: { href: string; title: string }[];
  }
> = {
  wisteria: {
    title: "Wisteria Poisoning Search Answers",
    intro:
      "These are the quick answers pet owners usually need after finding wisteria vines, seeds, or pods in the yard.",
    answers: [
      {
        question: "Is wisteria poisonous to dogs?",
        answer:
          "Yes. Wisteria should be treated as poisonous to dogs, especially if a dog chews the seeds or pods. Vomiting, diarrhea, abdominal pain, weakness, or depression should prompt veterinary guidance.",
      },
      {
        question: "Is wisteria toxic to cats?",
        answer:
          "Yes. Wisteria is toxic to cats. Cats may be exposed by chewing leaves, flowers, seeds, or pods, and they can also groom plant residue from paws or fur.",
      },
      {
        question: "What part of wisteria is most dangerous?",
        answer:
          "Seeds and pods are the main concern because they can contain higher toxin concentrations. Flowers, leaves, and vines should still be kept away from pets.",
      },
      {
        question: "What should I do if my pet ate wisteria?",
        answer:
          "Remove access to the plant, note which part was eaten, take a photo if possible, and call your veterinarian or pet poison control. Do not wait for severe symptoms if the amount is unknown.",
      },
    ],
    links: [
      { href: "/toxicity/sago-palm", title: "Sago palm toxicity" },
      { href: "/toxicity/azalea", title: "Azalea toxicity" },
      { href: "/blog/household-plants-toxic-to-cats", title: "Toxic houseplants for cats" },
    ],
  },
  "sago-palm": {
    title: "Sago Palm Poisoning Search Answers",
    intro:
      "Use these answers first if a dog or cat chewed a sago palm, cycad, seed, nut, or leaf.",
    answers: [
      {
        question: "Is sago palm toxic to dogs?",
        answer:
          "Yes. Sago palm is highly toxic to dogs. All parts are risky, but seeds and nuts are especially dangerous and can lead to severe liver injury.",
      },
      {
        question: "Is sago palm toxic to cats?",
        answer:
          "Yes. Sago palm is toxic to cats as well as dogs. Any chewing or ingestion should be treated as urgent, even before severe symptoms appear.",
      },
      {
        question: "How much sago palm is dangerous?",
        answer:
          "There is no safe snack amount. Because the seeds can be highly concentrated, even a small unknown exposure deserves immediate veterinary or poison-control guidance.",
      },
      {
        question: "What should I do if my pet chewed a sago palm?",
        answer:
          "Call a veterinarian or pet poison hotline immediately, bring the plant or a photo, and do not induce vomiting unless a professional tells you to do so.",
      },
    ],
    links: [
      { href: "/toxicity/wisteria", title: "Wisteria toxicity" },
      { href: "/toxicity/lilies", title: "Lily toxicity" },
      { href: "/blog/sago-palm-toxicity-pets", title: "Full sago palm guide" },
    ],
  },
};

function sourceNameFromUrl(url: string) {
  if (url.includes("aspca.org")) return "ASPCA Poison Control";
  if (url.includes("petpoisonhelpline.com")) return "Pet Poison Helpline";
  if (url.includes("vcahospitals.com")) return "VCA Animal Hospitals";
  if (url.includes("fda.gov")) return "FDA Animal & Veterinary";
  if (url.includes("akc.org")) return "American Kennel Club";
  if (url.includes("petmd.com")) return "PetMD";

  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

function buildToxicityPageTitle(item: ToxicityItem) {
  return targetedToxicityMeta[item.id]?.title || buildPetVerdictTitle(item);
}

function buildToxicityPageDescription(item: ToxicityItem) {
  return targetedToxicityMeta[item.id]?.description
    ? truncateMetaDescription(targetedToxicityMeta[item.id].description)
    : buildToxicityDescription(item);
}

export async function generateStaticParams() {
  return toxicityDatabase.map((item) => ({
    item: item.id,
  }));
}

function lookupItem(slug: string): ToxicityItem | undefined {
  const byId = getToxicityById(slug);
  if (byId) return byId;
  // Also check aliases
  return toxicityDatabase.find((item) =>
    item.aliases.some((a) => a.toLowerCase() === slug.toLowerCase())
  );
}

function isSafeForPet(item: ToxicityItem, pet: "dogs" | "cats") {
  const configuredSafe = pet === "dogs" ? item.safeForDog : item.safeForCat;

  if (
    configuredSafe &&
    item.safeForDog &&
    item.safeForCat &&
    (item.riskLevel === "toxic" || item.riskLevel === "danger")
  ) {
    return false;
  }

  return configuredSafe;
}

function unsafeTitleLabel(item: ToxicityItem) {
  return item.riskLevel === "danger" ? "Dangerous" : "Poisonous";
}

function buildPetVerdictTitle(item: ToxicityItem) {
  const dogSafe = isSafeForPet(item, "dogs");
  const catSafe = isSafeForPet(item, "cats");

  if (item.riskLevel === "caution") {
    if (dogSafe && catSafe) return `${item.name}: Safe in Moderation for Dogs & Cats?`;
    if (!dogSafe && !catSafe) return `${item.name}: Use Caution for Dogs & Cats?`;
    if (dogSafe) return `${item.name}: Safe for Dogs, Use Caution for Cats?`;
    return `${item.name}: Use Caution for Dogs, Safe for Cats?`;
  }

  const unsafe = unsafeTitleLabel(item);

  if (dogSafe && catSafe) return `${item.name}: Safe for Dogs & Cats?`;
  if (!dogSafe && !catSafe) return `${item.name}: ${unsafe} for Dogs & Cats?`;
  if (dogSafe) return `${item.name}: Safe for Dogs, ${unsafe} for Cats?`;
  return `${item.name}: ${unsafe} for Dogs, Safe for Cats?`;
}

function safetyAnswer(item: ToxicityItem, pet: "dogs" | "cats") {
  const isSafe = isSafeForPet(item, pet);
  const petLabel = pet === "dogs" ? "dogs" : "cats";

  if (isSafe) {
    return item.safeAmount
      ? `${item.name} is generally considered safe for ${petLabel} when offered appropriately. ${item.safeAmount}`
      : `${item.name} is generally considered safe for ${petLabel}, but portions and preparation still matter.`;
  }

  if (item.riskLevel === "caution") {
    return `Use caution with ${item.name} for ${petLabel}. ${item.description}`;
  }

  return `${item.name} is poisonous or toxic to ${petLabel}. ${item.description}`;
}

function petSafetyQuestion(item: ToxicityItem, pet: "dogs" | "cats") {
  const petLabel = pet === "dogs" ? "dogs" : "cats";
  const isSafe = isSafeForPet(item, pet);

  if (isSafe) return `Is ${item.name} safe for ${petLabel}?`;
  if (item.riskLevel === "caution") return `Can ${petLabel} have ${item.name}?`;
  if (pet === "dogs") return `Is ${item.name} poisonous to dogs?`;
  return `Is ${item.name} toxic to cats?`;
}

function truncateMetaDescription(description: string) {
  const normalized = description.replace(/\s+/g, " ").trim();
  if (normalized.length <= 155) return normalized;
  const cutoff = normalized.lastIndexOf(" ", 152);
  return `${normalized.slice(0, cutoff > 100 ? cutoff : 152).trimEnd()}...`;
}

function buildToxicityDescription(item: ToxicityItem) {
  const dogSafe = isSafeForPet(item, "dogs");
  const catSafe = isSafeForPet(item, "cats");

  if (item.riskLevel === "caution") {
    if (dogSafe && catSafe) {
      return truncateMetaDescription(
        `Can dogs and cats have ${item.name}? Use caution with portions, preparation, and individual sensitivity. ${item.description}`
      );
    }

    if (!dogSafe && !catSafe) {
      return truncateMetaDescription(
        `Can dogs or cats have ${item.name}? Use caution: ${item.description} Learn symptoms and what to do.`
      );
    }

    if (dogSafe) {
      return truncateMetaDescription(
        `Can dogs have ${item.name}, and is it risky for cats? ${item.description}`
      );
    }

    return truncateMetaDescription(
      `Can cats have ${item.name}, and is it risky for dogs? ${item.description}`
    );
  }

  if (dogSafe && catSafe) {
    return truncateMetaDescription(
      `Can dogs and cats have ${item.name}? ${item.description}`
    );
  }

  if (!dogSafe && !catSafe) {
    return truncateMetaDescription(
      `Is ${item.name} toxic to dogs or cats? ${item.description} Learn symptoms and what to do.`
    );
  }

  if (dogSafe) {
    return truncateMetaDescription(
      `Is ${item.name} safe for dogs but toxic to cats? ${item.description}`
    );
  }

  return truncateMetaDescription(
    `Is ${item.name} toxic to dogs but safe for cats? ${item.description}`
  );
}

function buildToxicityFaq(item: ToxicityItem) {
  const baseFaq = [
    {
      question: petSafetyQuestion(item, "dogs"),
      answer: safetyAnswer(item, "dogs"),
    },
    {
      question: petSafetyQuestion(item, "cats"),
      answer: safetyAnswer(item, "cats"),
    },
    {
      question: `What symptoms can ${item.name} cause in pets?`,
      answer: item.symptoms || `Pet reactions to ${item.name} can vary. Contact your veterinarian if your pet shows unusual symptoms after exposure.`,
    },
    {
      question: `What should I do if my pet ate ${item.name}?`,
      answer: item.action || "Contact your veterinarian for guidance, especially if your pet ate a large amount or has symptoms.",
    },
  ];

  const baseQuestions = new Set(baseFaq.map((entry) => entry.question.toLowerCase()));
  const targetedFaq =
    targetedSearchAnswers[item.id]?.answers
      .filter((entry) => !baseQuestions.has(entry.question.toLowerCase()))
      .map((entry) => ({
        question: entry.question,
        answer: entry.answer,
      })) || [];

  return [...baseFaq, ...targetedFaq];
}

function quickPetVerdict(item: ToxicityItem, pet: "dogs" | "cats") {
  const isSafe = isSafeForPet(item, pet);
  if (isSafe && item.riskLevel === "safe") return "Generally safe";
  if (item.riskLevel === "caution") return "Use caution";
  if (isSafe) return "Generally safe";
  if (item.riskLevel === "danger") return "Emergency risk";
  return "Unsafe";
}

function quickText(value: string | undefined, fallback: string) {
  const normalized = (value || "").replace(/\s+/g, " ").trim();
  if (!normalized) return fallback;
  if (normalized.length <= 120) return normalized;
  const cutoff = normalized.lastIndexOf(" ", 117);
  return `${normalized.slice(0, cutoff > 80 ? cutoff : 117).trimEnd()}...`;
}

function quickToxicityQuestion(item: ToxicityItem, pet: "dogs" | "cats") {
  if (item.riskLevel === "caution") return `Can ${pet} have ${item.name}?`;
  return `Is ${item.name} toxic to ${pet}?`;
}

function quickToxicityAnswer(item: ToxicityItem, pet: "dogs" | "cats") {
  const isSafe = isSafeForPet(item, pet);
  const petLabel = pet === "dogs" ? "dogs" : "cats";

  if (isSafe && item.riskLevel === "safe") {
    return item.safeAmount
      ? `No. ${item.name} is generally safe for ${petLabel} when prepared appropriately. Keep portions small: ${item.safeAmount}.`
      : `No. ${item.name} is generally safe for ${petLabel} when prepared appropriately and offered in reasonable amounts.`;
  }

  if (isSafe) {
    return `Usually no, but use caution. ${item.name} may still cause problems for ${petLabel} depending on amount, preparation, or sensitivity.`;
  }

  if (item.riskLevel === "danger") {
    return `Yes. Treat ${item.name} as an emergency risk for ${petLabel}. Call your veterinarian or a pet poison hotline right away after exposure.`;
  }

  if (item.riskLevel === "toxic") {
    return `Yes. ${item.name} is toxic to ${petLabel} and should be avoided. Contact a veterinarian if your pet ate it or has symptoms.`;
  }

  return `Avoid it unless your veterinarian says otherwise. ${item.name} may cause problems for ${petLabel}, especially after larger exposures.`;
}

function quickUrgencyAnswer(item: ToxicityItem) {
  if (item.riskLevel === "danger") {
    return `Urgent: ${item.name} can be a serious poisoning risk. Do not wait for symptoms if your pet had a meaningful exposure.`;
  }

  if (item.riskLevel === "toxic") {
    return `Call for guidance if your pet ate ${item.name}, especially if the amount is unknown, your pet is small, or symptoms appear.`;
  }

  if (item.riskLevel === "caution") {
    return `Monitor closely and call your veterinarian if your pet ate a large amount or develops vomiting, diarrhea, weakness, or unusual behavior.`;
  }

  return `Not usually urgent when prepared appropriately, but monitor your pet and avoid overfeeding or unsafe preparation.`;
}

function petSafetyBadgeLabel(item: ToxicityItem, pet: "Dogs" | "Cats", isSafe: boolean) {
  if (item.riskLevel === "caution") {
    return isSafe ? `Use Caution for ${pet}` : `Not Recommended for ${pet}`;
  }

  return isSafe ? `Safe for ${pet}` : `Unsafe for ${pet}`;
}

function petSafetyBadgeClass(item: ToxicityItem, isSafe: boolean) {
  if (item.riskLevel === "caution") {
    return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400";
  }

  return isSafe
    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
    : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
}

function petSafetyTone(item: ToxicityItem, isSafe: boolean): "safe" | "caution" | "danger" {
  if (item.riskLevel === "caution") return "caution";
  return isSafe ? "safe" : "danger";
}

function buildToxicityHubLinks(
  item: ToxicityItem,
  dogIsSafe: boolean,
  catIsSafe: boolean
): ContextualHubLink[] {
  const links: ContextualHubLink[] = [
    {
      title: "Dog Toxicity Guide",
      href: "/toxicity/dogs",
      label: dogIsSafe ? "Dog safety" : "Dog poisoning",
      description: `Compare ${item.name} with common dog food, plant, medication, and household toxicity risks.`,
    },
    {
      title: "Cat Toxicity Guide",
      href: "/toxicity/cats",
      label: catIsSafe ? "Cat safety" : "Cat poisoning",
      description: `See cat-specific guidance for ${item.name}, plants, cleaners, foods, and medication risks.`,
    },
  ];

  if (item.category === "household") {
    links.push({
      title: "Pet-Safe Cleaning Hub",
      href: "/pet-safe-cleaning",
      label: "Cleaner safety",
      description: "Check safer cleaning routines, floor residue risks, and cat-safe disinfectant guidance.",
    });
  }

  if (item.riskLevel === "toxic" || item.riskLevel === "danger") {
    links.push({
      title: "Vet Cost Hub",
      href: "/vet-costs",
      label: "Emergency planning",
      description: "Plan for emergency exams, toxin ingestion care, hospitalization, and insurance decisions.",
    });
  }

  return links;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ item: string }>;
}): Promise<Metadata> {
  const { item: slug } = await params;
  const item = lookupItem(slug);
  if (!item) return { title: "Not Found" };

  const title = buildToxicityPageTitle(item);
  const description = buildToxicityPageDescription(item);

  return {
    title: `${title} | ${SITE_NAME}`,
    description,
    alternates: { canonical: `${SITE_BASE_URL}/toxicity/${item.id}` },
    openGraph: {
      title,
      description,
      url: `${SITE_BASE_URL}/toxicity/${item.id}`,
      siteName: SITE_NAME,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function ToxicityItemPage({
  params,
}: {
  params: Promise<{ item: string }>;
}) {
  const { item: slug } = await params;
  const item = lookupItem(slug);

  if (!item) {
    notFound();
  }

  const style = riskStyles[item.riskLevel];
  const faqQuestions = buildToxicityFaq(item);
  const dogIsSafe = isSafeForPet(item, "dogs");
  const catIsSafe = isSafeForPet(item, "cats");
  const pageTitle = buildToxicityPageTitle(item);
  const pageDescription = buildToxicityPageDescription(item);
  const toxicityHubLinks = buildToxicityHubLinks(item, dogIsSafe, catIsSafe);
  const featuredRelatedItems = (featuredSafetyLinks[item.id] || [])
    .map((link) => {
      const linkedItem = getToxicityById(link.id);
      return linkedItem ? { item: linkedItem, reason: link.reason } : null;
    })
    .filter((link): link is { item: ToxicityItem; reason: string } => Boolean(link));
  const featuredRelatedIds = new Set(featuredRelatedItems.map((link) => link.item.id));
  const targetedAnswerBlock = targetedSearchAnswers[item.id];

  const relatedItems = toxicityDatabase
    .filter(
      (i) =>
        i.id !== item.id &&
        !featuredRelatedIds.has(i.id) &&
        (i.category === item.category || i.tags.some((t) => item.tags.includes(t)))
    )
    .slice(0, 6);

  return (
    <>
      <JsonLdFAQ questions={faqQuestions} />
      <JsonLdBreadcrumb
        items={[
          { name: "Home", url: SITE_BASE_URL },
          { name: "Toxicity Checker", url: `${SITE_BASE_URL}/toxicity` },
          { name: item.name, url: `${SITE_BASE_URL}/toxicity/${item.id}` },
        ]}
      />
      <JsonLdWebPage
        name={pageTitle}
        url={`${SITE_BASE_URL}/toxicity/${item.id}`}
        description={pageDescription}
        dateModified={TOXICITY_PAGE_LAST_MODIFIED}
        keywords={Array.from(new Set([...item.tags, ...item.aliases])).slice(0, 18)}
        about={{
          name: item.name,
          description: item.description,
          alternateName: item.aliases,
        }}
        citations={item.sources?.map((url) => ({
          name: sourceNameFromUrl(url),
          url,
        }))}
      />
      <div className="min-h-screen flex flex-col">
        <header className="border-b">
          <div className="max-w-4xl mx-auto px-4 h-14 flex items-center gap-2">
            <Link
              href="/toxicity"
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Search
            </Link>
            <span className="ml-2 font-bold tracking-tight">PetVitals</span>
          </div>
        </header>

        <main className="flex-1 py-8 sm:py-12">
          <div className="max-w-4xl mx-auto px-4">
            {/* Hero card */}
            <div
              className={`rounded-xl border-2 ${style.border} ${style.bg} p-6 sm:p-8`}
            >
              <div className="flex items-start gap-4">
                <div className="shrink-0 mt-1">{riskIcons[item.riskLevel]}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                      {item.name}
                    </h1>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${style.badge}`}
                    >
                      {riskLabels[item.riskLevel]}
                    </span>
                  </div>
                  <p className="text-muted-foreground mt-2 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Pet safety badges */}
                  <div className="flex gap-3 mt-3">
                    <div
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${petSafetyBadgeClass(item, dogIsSafe)}`}
                    >
                      <Dog className="h-3.5 w-3.5" />
                      {petSafetyBadgeLabel(item, "Dogs", dogIsSafe)}
                    </div>
                    <div
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${petSafetyBadgeClass(item, catIsSafe)}`}
                    >
                      <Cat className="h-3.5 w-3.5" />
                      {petSafetyBadgeLabel(item, "Cats", catIsSafe)}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <section className="mt-4 rounded-xl border bg-card p-5">
              <div className="flex items-start gap-3">
                <Info className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <h2 className="text-lg font-bold">
                    Quick Answer: Is {item.name} Toxic to Dogs or Cats?
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Use this short answer first, then read symptoms and what to do next.
                  </p>
                </div>
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <h3 className="text-sm font-semibold">{quickToxicityQuestion(item, "dogs")}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {quickToxicityAnswer(item, "dogs")}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold">{quickToxicityQuestion(item, "cats")}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {quickToxicityAnswer(item, "cats")}
                  </p>
                </div>
              </div>
              <div className="mt-4 grid gap-4 border-t pt-4 sm:grid-cols-2">
                <div>
                  <h3 className="text-sm font-semibold">Symptoms to watch for</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {quickText(item.symptoms, "No common symptoms are expected when this item is prepared and used appropriately.")}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold">What should I do now?</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {quickText(item.action, quickUrgencyAnswer(item))}
                  </p>
                </div>
              </div>
            </section>

            {targetedAnswerBlock && (
              <section className="mt-4 rounded-xl border bg-card p-5">
                <div className="flex items-start gap-3">
                  <BookOpen className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <h2 className="text-lg font-bold">{targetedAnswerBlock.title}</h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {targetedAnswerBlock.intro}
                    </p>
                  </div>
                </div>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  {targetedAnswerBlock.answers.map((entry) => (
                    <div key={entry.question}>
                      <h3 className="text-sm font-semibold">{entry.question}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {entry.answer}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex flex-wrap gap-2 border-t pt-4">
                  {targetedAnswerBlock.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="rounded-full border px-3 py-1 text-xs font-medium text-muted-foreground hover:border-primary/40 hover:text-primary"
                    >
                      {link.title}
                    </Link>
                  ))}
                </div>
              </section>
            )}

            <section className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <QuickSafetyFact
                label="Dogs"
                value={quickPetVerdict(item, "dogs")}
                tone={petSafetyTone(item, dogIsSafe)}
              />
              <QuickSafetyFact
                label="Cats"
                value={quickPetVerdict(item, "cats")}
                tone={petSafetyTone(item, catIsSafe)}
              />
              <QuickSafetyFact
                label="Risk level"
                value={riskLabels[item.riskLevel]}
                tone={item.riskLevel === "safe" ? "safe" : item.riskLevel === "caution" ? "caution" : "danger"}
              />
              <QuickSafetyFact
                label="Symptoms"
                value={quickText(item.symptoms, "No common symptoms expected when used appropriately.")}
                tone={item.symptoms ? "caution" : "safe"}
              />
              <QuickSafetyFact
                label="What to do now"
                value={quickText(item.action, "Use small portions and monitor for unusual signs.")}
                tone={item.riskLevel === "safe" ? "safe" : "danger"}
              />
            </section>

            <ContextualHubLinks
              title="Explore Related Safety Hubs"
              description="Use these hub pages for broader dog, cat, cleaner, and emergency planning guidance."
              links={toxicityHubLinks}
              className="mt-8"
            />

            {/* Ad placement */}
            <div className="mt-6">
              <AdUnit format="rectangle" />
            </div>

            {/* Details grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              {/* Symptoms */}
              {item.symptoms && (
                <div className="p-5 rounded-xl border bg-card">
                  <h2 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground mb-3">
                    Symptoms to Watch For
                  </h2>
                  <p className="text-sm leading-relaxed">{item.symptoms}</p>
                </div>
              )}

              {/* Action */}
              {item.action && (
                <div className="p-5 rounded-xl border bg-card">
                  <h2 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground mb-3">
                    What to Do
                  </h2>
                  <p className="text-sm leading-relaxed">{item.action}</p>
                </div>
              )}

              {/* Safe amount */}
              {item.safeAmount && (
                <div className="p-5 rounded-xl border bg-card">
                  <h2 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground mb-3">
                    Safe Amount
                  </h2>
                  <p className="text-sm leading-relaxed">{item.safeAmount}</p>
                </div>
              )}

              {/* Benefits */}
              {item.benefits && (
                <div className="p-5 rounded-xl border bg-card">
                  <h2 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground mb-3">
                    Benefits
                  </h2>
                  <p className="text-sm leading-relaxed">{item.benefits}</p>
                </div>
              )}
            </div>

            {/* Insurance CTA — relevant for toxic/danger items */}
            {(item.riskLevel === "toxic" || item.riskLevel === "danger") && (
              <>
                <InsuranceCtaBanner />
                <DownloadResourceCard variant="poison" />
              </>
            )}

            {featuredRelatedItems.length > 0 && (
              <section className="mt-8 rounded-xl border bg-card p-5">
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <h2 className="font-bold text-lg">Related Pet Safety Checks</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {featuredRelatedItems.map(({ item: featuredItem, reason }) => {
                    const rs = riskStyles[featuredItem.riskLevel];
                    return (
                      <Link
                        key={featuredItem.id}
                        href={`/toxicity/${featuredItem.id}`}
                        className={`block rounded-lg border p-4 ${rs.border} ${rs.bg} hover:opacity-90 transition-opacity`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">{featuredItem.name}</span>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium shrink-0 ${rs.badge}`}>
                            {riskLabels[featuredItem.riskLevel]}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{reason}</p>
                      </Link>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Tags */}
            <div className="mt-6 flex flex-wrap gap-1.5">
              <span className="text-xs text-muted-foreground mr-1 self-center">
                Tags:
              </span>
              {item.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/toxicity?q=${encodeURIComponent(tag)}`}
                  className="text-xs px-2 py-0.5 rounded-full bg-muted hover:bg-muted/80 text-muted-foreground transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>

            {/* Sources */}
            {item.sources && item.sources.length > 0 && (
              <div className="mt-6 p-5 rounded-xl border bg-card">
                <h2 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground mb-3">
                  Clinical References
                </h2>
                <ul className="space-y-1.5">
                  {item.sources.map((url, i) => (
                    <li key={i}>
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                      >
                        <ExternalLink className="h-3 w-3" />
                        {url.length > 70 ? url.slice(0, 70) + "..." : url}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <section className="mt-10">
              <h2 className="font-bold text-lg mb-4">Quick Answers</h2>
              <div className="space-y-3">
                {faqQuestions.map((faq) => (
                  <details key={faq.question} className="rounded-lg border bg-card">
                    <summary className="px-5 py-4 cursor-pointer text-sm font-medium list-none">
                      {faq.question}
                    </summary>
                    <div className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </div>
                  </details>
                ))}
              </div>
            </section>

            {/* Related items */}
            {relatedItems.length > 0 && (
              <div className="mt-10">
                <h2 className="font-bold text-lg mb-4">Related Items</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {relatedItems.map((rel) => {
                    const rs = riskStyles[rel.riskLevel];
                    return (
                      <Link
                        key={rel.id}
                        href={`/toxicity/${rel.id}`}
                        className={`block p-4 rounded-lg border ${rs.border} ${rs.bg} hover:opacity-90 transition-opacity`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm truncate">
                            {rel.name}
                          </span>
                          <span
                            className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium shrink-0 ${rs.badge}`}
                          >
                            {riskLabels[rel.riskLevel]}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                          {rel.description}
                        </p>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Back to search + disclaimer */}
            <div className="mt-10 text-center">
              <Link
                href="/toxicity"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
              >
                <ArrowLeft className="h-4 w-4" />
                Search all 500+ items
              </Link>
            </div>

            <div className="mt-6 p-4 rounded-lg bg-muted/50 text-xs text-muted-foreground leading-relaxed">
              <strong>Disclaimer:</strong> This information is for educational
              purposes only and is not a substitute for professional veterinary
              advice. If you suspect your pet has ingested something toxic,
              contact your veterinarian or the ASPCA Animal Poison Control
              Center (888-426-4435) immediately.
            </div>
          </div>
        </main>

        <footer className="border-t py-6 text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} PetVitals. Always consult your
          veterinarian.
        </footer>
      </div>
    </>
  );
}

function QuickSafetyFact({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "safe" | "caution" | "danger";
}) {
  const toneClass =
    tone === "safe"
      ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/20 dark:text-emerald-300"
      : tone === "caution"
        ? "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950/20 dark:text-amber-300"
        : "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950/20 dark:text-red-300";

  return (
    <div className={`rounded-xl border p-4 ${toneClass}`}>
      <p className="text-xs font-semibold uppercase tracking-wide opacity-80">{label}</p>
      <p className="mt-2 text-sm font-semibold leading-snug">{value}</p>
    </div>
  );
}
