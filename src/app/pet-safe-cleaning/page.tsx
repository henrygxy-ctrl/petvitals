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
      "No cleaner is universally safe. Match a labeled cleaner to the job and surface, check the complete formula, and keep pets away until all required rinsing, ventilation, drying, and pet-access conditions are met. Steam must also cool before access.",
  },
  {
    question: "Are pet-safe cleaners safe as soon as I mop?",
    answer:
      "No. Keep pets away while cleaning and complete every label-directed contact-time, rinsing, ventilation, and pet-access step. Surfaces must be dry, and steam-treated floors must be cool. Drying alone cannot correct a wrong product or dilution.",
  },
  {
    question: "What cleaning ingredients should cat owners avoid?",
    answer:
      "Cat homes should be cautious with phenols, pine oil, essential oils, ammonia, strong fragrance, and wet disinfectant residue. Cats groom their paws and fur, so residue can turn into ingestion exposure.",
  },
  {
    question: "When is a cleaning-product exposure an emergency?",
    answer:
      "Contact your veterinarian or animal poison control promptly after suspected ingestion or contact with a corrosive or unknown cleaner, even before symptoms. Breathing difficulty, collapse, eye exposure, or chemical burns need urgent veterinary attention. Keep the product container and do not induce vomiting.",
  },
  {
    question: "Are pet-friendly cleaning products the same as pet-safe cleaning products?",
    answer:
      "Not always. Pet-friendly usually means a product is marketed for homes with pets. Pet-safe depends on the exact ingredients, dilution, surface, ventilation, drying time, and whether a dog or cat can lick residue. Treat low-residue, unscented products used as directed as the safer starting point.",
  },
  {
    question: "What should I do if my pet licked floor cleaner?",
    answer:
      "Move your pet away, prevent further licking, save the product label, and contact your veterinarian or animal poison control promptly. Do not wait for symptoms after suspected ingestion or corrosive or unknown product exposure, and do not induce vomiting or give peroxide.",
  },
];

export default function PetSafeCleaningHubPage() {
  return (
    <TopicHubPage
      label="Pet-Safe Cleaning Hub"
      canonicalPath="/pet-safe-cleaning"
      title="Pet-Safe and Pet-Friendly Cleaning Products for Dogs and Cats"
      intro="Choose a cleaner for the job, build a cat-home routine, or check disinfection and floor re-entry directions. If exposure has already happened, contact your veterinarian or animal poison control promptly; do not wait for symptoms."
      primaryCta={{ title: "Compare pet-safe cleaners", href: "/blog/best-pet-safe-cleaning-products", description: "Check bleach, vinegar, essential oils, phenols, and safer alternatives." }}
      secondaryCta={{ title: "Search cleaner toxicity", href: "/toxicity/category/household", description: "Search household toxicity records." }}
      highlights={[
        { value: "Label", label: "Access rule", note: "Complete required contact time, rinsing, ventilation, and drying before pets return." },
        { value: "Cats", label: "Extra caution", note: "Cats groom residue from paws and fur." },
        { value: "Low residue", label: "Best default", note: "Use mild, unscented cleaners, ventilation, and label directions." },
      ]}
      infographic={<CleaningSafetyInfographic />}
      sections={[
        {
          title: "Start With These Guides",
          description: "Choose the guide for the job you need to finish.",
          links: [
            { title: "Compare Cleaning Products", href: "/blog/best-pet-safe-cleaning-products", description: "Categories, label checks, and two real manufacturer-direction examples." },
            { title: "Cat-Friendly Cleaning Routine", href: "/blog/cat-friendly-cleaning-products", description: "Daily care for bowls, bedding, litter areas, and surfaces cats groom after touching." },
            { title: "Pet-Safe Floor Cleaners", href: "/blog/pet-safe-floor-cleaners-dogs-cats", description: "Floor cleaner options for pets that walk, lick, and groom." },
            { title: "Can Cats Walk After Mopping?", href: "/blog/can-cats-walk-on-floors-after-mopping", description: "Drying time, paw residue, wet floor exposure, and safer mopping routines." },
            { title: "Disinfectants Safe for Cats", href: "/blog/disinfectants-safe-for-cats", description: "Contact time, rinsing, ventilation, and disinfectant ingredients to treat carefully." },
            { title: "Common Household Poisons", href: "/blog/common-household-poisons-pets", description: "Broader home safety guide for poison prevention." },
          ],
        },
        {
          title: "Specific Cleaning Questions",
          description: "Ingredient cautions and next steps for individual cleaning problems.",
          links: [
            { title: "What Does Pet-Friendly Mean?", href: "/blog/pet-friendly-cleaning-products", description: "Check marketing claims against the exact product directions." },
            { title: "Disinfectants Safe for Cats", href: "/blog/disinfectants-safe-for-cats", description: "Cat-specific disinfectant rules for floors, bowls, litter boxes, and counters." },
            { title: "Pet-Safe Floor Cleaner", href: "/blog/pet-safe-floor-cleaners-dogs-cats", description: "Compare steam, diluted soap, vinegar, enzymatic cleaners, and disinfectant residue." },
            { title: "Vinegar Floor Cleaner and Pets", href: "/blog/is-vinegar-floor-cleaner-safe-for-pets", description: "When diluted vinegar is reasonable, when to avoid it, and better urine cleaner choices." },
            { title: "Essential-Oil Cleaners and Cats", href: "/blog/are-essential-oil-cleaners-safe-for-cats", description: "Avoid risky oil residues, diffusers, and strong natural fragrance around cats." },
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
      footerNote="Keep pets away during cleaning. Complete label-directed contact time, rinsing, ventilation, drying, and pet-access conditions; steam-treated surfaces must cool too."
    />
  );
}
