import type { Metadata } from "next";
import { TopicHubPage } from "@/components/hubs/topic-hub-page";
import { ToxicityRiskInfographic } from "@/components/infographics/topic-infographics";
import { DownloadResourceCard } from "@/components/downloads/resource-card";
import { SITE_BASE_URL, SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Dog Toxicity Guide: Foods, Plants & Household Risks | ${SITE_NAME}`,
  description:
    "Dog toxicity guide for foods, plants, cleaners, medications, symptoms, emergency steps, and common dog poison searches.",
  alternates: { canonical: `${SITE_BASE_URL}/toxicity/dogs` },
  openGraph: {
    title: "Dog Toxicity Guide",
    description:
      "Find common foods, plants, cleaners, and household items that are unsafe for dogs.",
    url: `${SITE_BASE_URL}/toxicity/dogs`,
    siteName: SITE_NAME,
    type: "website",
    images: [{ url: `${SITE_BASE_URL}/og-image.png`, width: 1200, height: 630, alt: "Dog toxicity guide" }],
  },
};

const faq = [
  {
    question: "What foods are most toxic to dogs?",
    answer:
      "High-risk dog food exposures include chocolate, grapes and raisins, xylitol, onions, garlic, macadamia nuts, alcohol, coffee, and moldy food. Risk depends on the item, amount eaten, and the dog's weight.",
  },
  {
    question: "What should I do if my dog ate something toxic?",
    answer:
      "Move the item away, check what and how much was eaten, and call your veterinarian or a pet poison hotline. Do not induce vomiting unless a professional tells you to, because some toxins can cause more harm if vomited.",
  },
  {
    question: "Are dog poisoning symptoms immediate?",
    answer:
      "Not always. Some toxins cause vomiting quickly, while others can affect the kidneys, liver, blood, or nervous system hours later. With known high-risk exposures, call for advice before waiting for symptoms.",
  },
  {
    question: "Which plants are dangerous for dogs?",
    answer:
      "Sago palm, oleander, autumn crocus, azalea, lilies, tulips, daffodils, and many garden bulbs can be dangerous to dogs. Search the specific plant and call a veterinarian if ingestion may have occurred.",
  },
];

export default function DogToxicityHubPage() {
  return (
    <TopicHubPage
      label="Dog Toxicity Hub"
      canonicalPath="/toxicity/dogs"
      title="Dog Toxicity Guide: Foods, Plants, Cleaners, and Emergency Risks"
      intro="Start here if you are checking whether something is poisonous to dogs. This hub links the highest-risk dog toxicity pages, emergency guides, and prevention resources."
      primaryCta={{ title: "Search the toxicity checker", href: "/toxicity", description: "Search 500+ foods, plants, cleaners, and household items." }}
      secondaryCta={{ title: "Download emergency checklist", href: "/downloads/pet-poisoning-emergency-checklist.pdf", description: "Printable poisoning checklist." }}
      highlights={[
        { value: "500+", label: "Items", note: "Foods, plants, cleaners, medications, and household substances." },
        { value: "Fast", label: "Next steps", note: "Each item shows symptoms and what to do after exposure." },
        { value: "Free", label: "Resource", note: "No sign-up needed for the toxicity checker or PDF." },
      ]}
      infographic={<ToxicityRiskInfographic pet="dogs" />}
      sections={[
        {
          title: "Common Dog Poison Searches",
          description: "Start with these high-intent dog toxicity pages.",
          links: [
            { title: "Chocolate", href: "/toxicity/chocolate", description: "Theobromine and caffeine risk by chocolate type.", label: "Emergency" },
            { title: "Grapes and Raisins", href: "/toxicity/grapes", description: "Kidney failure risk even after small ingestion.", label: "Emergency" },
            { title: "Xylitol", href: "/toxicity/xylitol", description: "Sugar-free gum and candy sweetener emergency.", label: "Emergency" },
            { title: "Onions", href: "/toxicity/onions", description: "Allium family risk for red blood cell damage." },
            { title: "Ibuprofen", href: "/toxicity/ibuprofen", description: "Human pain reliever that can cause severe poisoning." },
            { title: "Sago Palm", href: "/toxicity/sago-palm", description: "High-risk plant that can cause liver failure.", label: "Plant" },
          ],
        },
        {
          title: "Dog Safety Guides",
          description: "Longer guides for prevention, symptoms, and budgeting after an emergency.",
          links: [
            { title: "Common Household Poisons", href: "/blog/common-household-poisons-pets", description: "Poison-proof the home room by room." },
            { title: "Dog Chocolate Toxicity", href: "/blog/dog-chocolate-toxicity", description: "Understand chocolate risk and emergency response." },
            { title: "Can Dogs Eat Grapes?", href: "/blog/can-dogs-eat-grapes", description: "Why grapes and raisins are unsafe for dogs." },
            { title: "Emergency Vet Cost", href: "/insurance/emergency-vet-cost", description: "Plan financially before an urgent visit." },
            { title: "Accident-Only Insurance", href: "/insurance/accident-only", description: "Coverage questions for poisoning, fractures, and swallowed objects." },
          ],
        },
      ]}
      resource={<DownloadResourceCard variant="poison" />}
      faq={faq}
      footerNote="If your dog may have eaten a known toxin, call your veterinarian or a pet poison hotline. Do not wait for symptoms with high-risk exposures."
    />
  );
}
