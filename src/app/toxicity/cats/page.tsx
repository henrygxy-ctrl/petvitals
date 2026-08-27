import type { Metadata } from "next";
import { TopicHubPage } from "@/components/hubs/topic-hub-page";
import { ToxicityRiskInfographic } from "@/components/infographics/topic-infographics";
import { DownloadResourceCard } from "@/components/downloads/resource-card";
import { SITE_BASE_URL, SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Cat Toxicity Guide: Plants, Cleaners, Foods & Medicine | ${SITE_NAME}`,
  description:
    "Cat toxicity guide for lilies, cleaners, human medications, foods, symptoms, emergency steps, and cat-safe home resources.",
  alternates: { canonical: `${SITE_BASE_URL}/toxicity/cats` },
  openGraph: {
    title: "Cat Toxicity Guide",
    description:
      "Find plants, cleaners, medications, and foods that are unsafe for cats.",
    url: `${SITE_BASE_URL}/toxicity/cats`,
    siteName: SITE_NAME,
    type: "website",
    images: [{ url: `${SITE_BASE_URL}/og-image.png`, width: 1200, height: 630, alt: "Cat toxicity guide" }],
  },
};

const faq = [
  {
    question: "What are the most dangerous toxins for cats?",
    answer:
      "High-risk cat exposures include lilies, acetaminophen, ibuprofen, permethrin dog flea products, sago palm, onions, garlic, xylitol, and concentrated cleaning products. Cats are also at risk from residue they groom from paws and fur.",
  },
  {
    question: "Why are cleaners risky for cats?",
    answer:
      "Cats walk on cleaned surfaces and then groom their paws and fur. Wet residue, essential oils, phenols, pine oil, strong fragrance, and some disinfectants can become skin, inhalation, or ingestion exposures.",
  },
  {
    question: "What should I do if my cat licked a cleaner?",
    answer:
      "Move the cleaner away, prevent more licking, check the product label, and call your veterinarian or a pet poison hotline. Do not give home treatments or induce vomiting unless a professional tells you to.",
  },
  {
    question: "Are lilies toxic to cats?",
    answer:
      "Yes. True lilies are an emergency for cats because leaves, flowers, stems, pollen, and vase water may cause severe kidney injury. Contact a veterinarian or poison hotline immediately after possible exposure.",
  },
];

export default function CatToxicityHubPage() {
  return (
    <TopicHubPage
      label="Cat Toxicity Hub"
      canonicalPath="/toxicity/cats"
      title="Cat Toxicity Guide: Plants, Cleaners, Foods, and Medication Risks"
      intro="Cats are exposed through grooming, floor residue, plants, and human medications. Use this hub to reach the most important cat toxicity checks and cat-safe home guides."
      primaryCta={{ title: "Search the toxicity checker", href: "/toxicity", description: "Search 500+ cat and dog safety records." }}
      secondaryCta={{ title: "See cat-safe cleaners", href: "/blog/cat-friendly-cleaning-products", description: "Cleaner choices for cat homes." }}
      highlights={[
        { value: "Cats", label: "Special risk", note: "Grooming turns paw and fur residue into ingestion exposure." },
        { value: "Lilies", label: "Top plant risk", note: "True lilies are among the most urgent cat plant exposures." },
        { value: "Cleaners", label: "High intent", note: "Many cat searches involve floors, wipes, fragrance, and disinfectants." },
      ]}
      infographic={<ToxicityRiskInfographic pet="cats" />}
      sections={[
        {
          title: "Common Cat Poison Searches",
          description: "High-risk cat exposures and common household questions.",
          links: [
            { title: "Lilies", href: "/toxicity/lilies", description: "True lilies can cause severe kidney injury in cats.", label: "Emergency" },
            { title: "Acetaminophen", href: "/toxicity/acetaminophen", description: "Human pain reliever that is especially dangerous for cats.", label: "Emergency" },
            { title: "Sago Palm", href: "/toxicity/sago-palm", description: "Dangerous plant for both cats and dogs." },
            { title: "Cleaning Wipes", href: "/toxicity/cleaning-wipe", description: "Residue risk from disinfecting and household wipes." },
            { title: "Chocolate", href: "/toxicity/chocolate", description: "Less common than dog exposure but still unsafe." },
            { title: "Wisteria", href: "/toxicity/wisteria", description: "Common garden plant poisoning search." },
          ],
        },
        {
          title: "Cat Safety Guides",
          description: "Pages that help cat owners reduce exposure at home.",
          links: [
            { title: "Cat-Safe Cleaning Products", href: "/blog/cat-friendly-cleaning-products", description: "Ingredients to avoid and safer routines for cat homes." },
            { title: "Pet-Safe Floor Cleaners", href: "/blog/pet-safe-floor-cleaners-dogs-cats", description: "Floor residue rules for cats and dogs." },
            { title: "Household Plants Toxic to Cats", href: "/blog/household-plants-toxic-to-cats", description: "Plant list and prevention steps." },
            { title: "Signs Your Cat Is Sick", href: "/blog/signs-your-cat-is-sick", description: "Know when subtle symptoms deserve a vet call." },
            { title: "Emergency Vet Cost", href: "/insurance/emergency-vet-cost", description: "Plan for urgent cat care before it happens." },
          ],
        },
      ]}
      resource={<DownloadResourceCard variant="poison" />}
      faq={faq}
      footerNote="If a cat may have contacted lilies, human medication, concentrated cleaner, or another known toxin, call a veterinarian or pet poison hotline immediately."
    />
  );
}
