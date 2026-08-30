import type { Metadata } from "next";
import { TopicHubPage } from "@/components/hubs/topic-hub-page";
import { CleaningSafetyInfographic } from "@/components/infographics/topic-infographics";
import { DownloadResourceCard } from "@/components/downloads/resource-card";
import { SITE_BASE_URL, SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Pet-Safe & Pet-Friendly Cleaning Products Hub | ${SITE_NAME}`,
  description:
    "Pet-safe and pet-friendly cleaning products hub for floor cleaners, cat-safe disinfectants, ingredients to avoid, and cleaning-product poisoning prevention.",
  alternates: { canonical: `${SITE_BASE_URL}/pet-safe-cleaning` },
  openGraph: {
    title: "Pet-Safe and Pet-Friendly Cleaning Products Hub",
    description:
      "Compare safer cleaning routines, floor cleaners, cat-safe disinfectants, ingredients to avoid, and cleaning-product exposure steps.",
    url: `${SITE_BASE_URL}/pet-safe-cleaning`,
    siteName: SITE_NAME,
    type: "website",
    images: [{ url: `${SITE_BASE_URL}/og-image.png`, width: 1200, height: 630, alt: "Pet-safe cleaning hub" }],
  },
};

const faq = [
  {
    question: "What is the safest cleaner to use around pets?",
    answer:
      "For routine cleaning, start with low-residue options such as steam on compatible surfaces, diluted mild soap, enzymatic pet accident cleaners, and fragrance-free products used exactly as directed. Keep pets out until surfaces are fully dry.",
  },
  {
    question: "Are pet-safe cleaners safe as soon as I mop?",
    answer:
      "No. Even milder cleaners can irritate paws, skin, or mouths while wet. Let floors and pet-contact surfaces dry completely before dogs or cats walk, lick, sleep, or eat there.",
  },
  {
    question: "What cleaning ingredients should cat owners avoid?",
    answer:
      "Cat homes should be cautious with phenols, pine oil, essential oils, ammonia, strong fragrance, and wet disinfectant residue. Cats groom their paws and fur, so residue can turn into ingestion exposure.",
  },
  {
    question: "When is a cleaning-product exposure an emergency?",
    answer:
      "Call a veterinarian or poison hotline if a pet licked a concentrated product, walked through wet chemicals and is licking paws, has trouble breathing, vomits, drools, trembles, seems weak, or has burns on skin, eyes, or mouth.",
  },
  {
    question: "Are pet-friendly cleaning products the same as pet-safe cleaning products?",
    answer:
      "Not always. Pet-friendly usually means a product is marketed for homes with pets. Pet-safe depends on the exact ingredients, dilution, surface, ventilation, drying time, and whether a dog or cat can lick residue. Treat low-residue, unscented products used as directed as the safer starting point.",
  },
  {
    question: "What should I do if my pet licked floor cleaner?",
    answer:
      "Move your pet away, prevent more licking, save the product label, and call your veterinarian or a pet poison hotline if the cleaner was concentrated, the amount is unknown, or symptoms such as drooling, vomiting, coughing, tremors, weakness, or mouth irritation appear.",
  },
];

export default function PetSafeCleaningHubPage() {
  return (
    <TopicHubPage
      label="Pet-Safe Cleaning Hub"
      canonicalPath="/pet-safe-cleaning"
      title="Pet-Safe and Pet-Friendly Cleaning Products for Dogs and Cats"
      intro="A central guide for cleaning homes with dogs and cats. Start with pet-safe cleaner choices, compare floor and cat-safe disinfectant guidance, then check poisoning symptoms and cleaner toxicity records if exposure happens."
      primaryCta={{ title: "Compare pet-safe cleaners", href: "/blog/best-pet-safe-cleaning-products", description: "Check bleach, vinegar, essential oils, phenols, and safer alternatives." }}
      secondaryCta={{ title: "Search cleaner toxicity", href: "/toxicity/category/household", description: "Search household toxicity records." }}
      highlights={[
        { value: "Dry", label: "Core rule", note: "Pets should stay away until surfaces are fully dry." },
        { value: "Cats", label: "Extra caution", note: "Cats groom residue from paws and fur." },
        { value: "Low residue", label: "Best default", note: "Use mild, unscented cleaners, ventilation, and label directions." },
      ]}
      infographic={<CleaningSafetyInfographic />}
      sections={[
        {
          title: "Start With These Guides",
          description: "Highest-value cleaning pages for search and retention.",
          links: [
            { title: "Pet-Safe Cleaners", href: "/blog/best-pet-safe-cleaning-products", description: "Main guide with ingredient checker and safer alternatives.", label: "Tool" },
            { title: "Cat-Safe Cleaning Products", href: "/blog/cat-friendly-cleaning-products", description: "Cleaner choices and disinfectant cautions for cat homes." },
            { title: "Pet-Safe Floor Cleaners", href: "/blog/pet-safe-floor-cleaners-dogs-cats", description: "Floor cleaner options for pets that walk, lick, and groom." },
            { title: "Common Household Poisons", href: "/blog/common-household-poisons-pets", description: "Broader home safety guide for poison prevention." },
          ],
        },
        {
          title: "Search Answers by Cleaning Need",
          description: "Direct paths for the cleaning searches already getting impressions.",
          links: [
            { title: "Pet-Friendly Cleaning Products", href: "/blog/best-pet-safe-cleaning-products", description: "Understand what pet-friendly really means and when residue still matters.", label: "Search answer" },
            { title: "Disinfectants Safe for Cats", href: "/blog/cat-friendly-cleaning-products", description: "Cat-specific disinfectant rules for floors, bowls, litter boxes, and counters." },
            { title: "Pet-Safe Floor Cleaner", href: "/blog/pet-safe-floor-cleaners-dogs-cats", description: "Compare steam, diluted soap, vinegar, enzymatic cleaners, and disinfectant residue." },
            { title: "Poisoning Symptoms After Cleaner Exposure", href: "/toxicity/symptoms", description: "Look up vomiting, drooling, tremors, coughing, and other warning signs." },
          ],
        },
        {
          title: "Cleaner Toxicity Checks",
          description: "Quick checks for household products and exposures.",
          links: [
            { title: "Cleaning Wipes", href: "/toxicity/cleaning-wipe", description: "Disinfecting wipe residue and ingestion concerns." },
            { title: "Bleach", href: "/toxicity/bleach", description: "Use caution with wet residue, fumes, and mixing risks." },
            { title: "Ammonia", href: "/toxicity/ammonia", description: "Airway irritation and dangerous mixing risks." },
            { title: "Vinegar", href: "/toxicity/vinegar", description: "Surface limits and odor concerns around pets." },
            { title: "Essential Oils", href: "/toxicity/essential-oils", description: "Concentrated oil and fragrance concerns around pets." },
            { title: "Emergency Vet Cost", href: "/insurance/emergency-vet-cost", description: "Financial planning after accidental toxin exposure." },
          ],
        },
      ]}
      resource={<DownloadResourceCard variant="cleaning" />}
      faq={faq}
      footerNote="Clean when pets are out of the room, ventilate, follow product labels, and let surfaces dry before pets return."
    />
  );
}
