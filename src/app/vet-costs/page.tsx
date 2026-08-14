import type { Metadata } from "next";
import { TopicHubPage } from "@/components/hubs/topic-hub-page";
import { VetCostInfographic } from "@/components/infographics/topic-infographics";
import { DownloadResourceCard } from "@/components/downloads/resource-card";
import { SITE_BASE_URL, SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Vet Cost Hub: Emergency, Dental, Puppy & Insurance Costs | ${SITE_NAME}`,
  description:
    "Vet cost hub for emergency vet bills, dog teeth cleaning cost, puppy first vet visit cost, pet insurance cost, and planning calculators.",
  alternates: { canonical: `${SITE_BASE_URL}/vet-costs` },
  openGraph: {
    title: "Vet Cost Hub",
    description:
      "Compare emergency vet costs, dental cleaning costs, puppy first-year costs, and insurance planning tools.",
    url: `${SITE_BASE_URL}/vet-costs`,
    siteName: SITE_NAME,
    type: "website",
    images: [{ url: `${SITE_BASE_URL}/og-image.png`, width: 1200, height: 630, alt: "Vet cost hub" }],
  },
};

export default function VetCostsHubPage() {
  return (
    <TopicHubPage
      label="Vet Cost Hub"
      canonicalPath="/vet-costs"
      title="Vet Cost Hub: Emergency Bills, Dental Cleaning, Puppy Visits, and Insurance"
      intro="A commercial-intent hub for pet owners comparing likely veterinary costs and insurance tradeoffs before a large bill happens."
      primaryCta={{ title: "Estimate insurance cost", href: "/insurance/pet-insurance-cost", description: "Use the pet insurance calculator." }}
      secondaryCta={{ title: "Estimate emergency bill", href: "/insurance/emergency-vet-cost", description: "Use the emergency vet bill estimator." }}
      highlights={[
        { value: "$100+", label: "Basic care", note: "Exams and routine care vary by location and clinic." },
        { value: "$1k+", label: "Surprise bills", note: "Dental disease, diagnostics, and urgent care can climb quickly." },
        { value: "Before", label: "Best timing", note: "Insurance works best before symptoms or injury." },
      ]}
      infographic={<VetCostInfographic />}
      sections={[
        {
          title: "Cost Calculators and Commercial Guides",
          description: "Pages built for high-intent searches and comparison decisions.",
          links: [
            { title: "Pet Insurance Cost Calculator", href: "/insurance/pet-insurance-cost", description: "Estimate monthly premium ranges by species and plan settings.", label: "Tool" },
            { title: "Emergency Vet Cost", href: "/insurance/emergency-vet-cost", description: "Estimate urgent-care bills and compare emergency coverage.", label: "Tool" },
            { title: "Dog Dental Cleaning Cost", href: "/blog/dog-dental-cleaning-cost", description: "Dental cost table and estimator for cleanings, X-rays, and extractions.", label: "Dental" },
            { title: "How Much Is a Dog Teeth Cleaning?", href: "/blog/how-much-is-a-dog-teeth-cleaning", description: "Plain-English dog teeth cleaning cost guide." },
            { title: "Puppy First Vet Visit Cost", href: "/blog/puppy-first-vet-visit-cost", description: "First visit and first-year puppy budget planning.", label: "Puppy" },
            { title: "Dog Insurance Cost", href: "/insurance/dog-insurance-cost", description: "Dog-specific monthly premium estimates." },
          ],
        },
        {
          title: "Coverage Decisions",
          description: "Move users from cost research to plan comparison.",
          links: [
            { title: "Accident-Only Insurance", href: "/insurance/accident-only", description: "Cheaper coverage for injuries, poisoning, and swallowed objects." },
            { title: "Accident and Illness", href: "/insurance/accident-illness", description: "Broader coverage for emergencies and illnesses." },
            { title: "Best Pet Insurance for Dogs", href: "/insurance/best-pet-insurance-for-dogs", description: "Compare coverage by dog age, breed, and risk profile." },
            { title: "Pet Emergency Kit", href: "/blog/pet-emergency-kit-checklist", description: "Prepare supplies and records before urgent care." },
          ],
        },
      ]}
      resource={<DownloadResourceCard variant="both" />}
      footerNote="Cost pages are educational estimates, not quotes. Ask your veterinarian for itemized estimates and compare insurance policy terms before relying on coverage."
    />
  );
}
