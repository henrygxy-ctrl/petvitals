import type { Metadata } from "next";
import { TopicHubPage } from "@/components/hubs/topic-hub-page";
import { PuppyTimelineInfographic } from "@/components/infographics/topic-infographics";
import { DownloadResourceCard } from "@/components/downloads/resource-card";
import { SITE_BASE_URL, SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Puppy Care Hub: Vaccines, First Vet Visit & Costs | ${SITE_NAME}`,
  description:
    "Puppy care hub for vaccination schedules, first vet visit cost, new puppy checklist, prevention, insurance, and first-year planning.",
  alternates: { canonical: `${SITE_BASE_URL}/puppy-care` },
  openGraph: {
    title: "Puppy Care Hub",
    description:
      "Plan puppy vaccines, first vet visit costs, supplies, prevention, and insurance decisions.",
    url: `${SITE_BASE_URL}/puppy-care`,
    siteName: SITE_NAME,
    type: "website",
    images: [{ url: `${SITE_BASE_URL}/og-image.png`, width: 1200, height: 630, alt: "Puppy care hub" }],
  },
};

const faq = [
  {
    question: "When should a new puppy go to the vet?",
    answer:
      "Many new puppies should see a veterinarian within a few days of coming home, sooner if they seem weak, cough, vomit, have diarrhea, or lack reliable vaccine and deworming records.",
  },
  {
    question: "When do puppy vaccinations start?",
    answer:
      "Puppy vaccine series commonly start around 6-8 weeks of age, with boosters every few weeks until at least 16 weeks. Your veterinarian may adjust the schedule based on local risk and records.",
  },
  {
    question: "What should I budget for a puppy's first year?",
    answer:
      "Budget for exams, vaccines, deworming, parasite prevention, fecal testing, spay or neuter planning, supplies, training, and unexpected urgent care. Costs vary by location and clinic.",
  },
  {
    question: "Should I buy pet insurance before the first vet visit?",
    answer:
      "If you plan to buy insurance, earlier enrollment can reduce pre-existing condition complications. Compare waiting periods, exclusions, deductibles, reimbursement rates, and annual limits before relying on a policy.",
  },
];

export default function PuppyCareHubPage() {
  return (
    <TopicHubPage
      label="Puppy Care Hub"
      canonicalPath="/puppy-care"
      title="Puppy Care Hub: Vaccines, First Vet Visit Cost, Supplies, and Insurance"
      intro="A first-year planning hub for new puppy owners. Build a vaccine schedule, estimate vet costs, and prepare the home before common emergencies happen."
      primaryCta={{ title: "Build vaccine schedule", href: "/blog/puppy-vaccination-schedule", description: "Use the puppy vaccination schedule generator." }}
      secondaryCta={{ title: "Download first-year checklist", href: "/downloads/puppy-first-year-vet-cost-checklist.pdf", description: "Printable first-year planning sheet." }}
      highlights={[
        { value: "6-16w", label: "Vaccine series", note: "Puppies usually need repeated boosters through at least 16 weeks." },
        { value: "3-4w", label: "Visit rhythm", note: "Boosters are commonly spaced every few weeks." },
        { value: "Early", label: "Insurance timing", note: "Coverage is cleaner before symptoms or diagnoses." },
      ]}
      infographic={<PuppyTimelineInfographic />}
      sections={[
        {
          title: "First-Year Puppy Guides",
          description: "Start here for schedule, budget, and setup decisions.",
          links: [
            { title: "Puppy Vaccination Schedule", href: "/blog/puppy-vaccination-schedule", description: "Generate dates and discuss core vs. non-core vaccines.", label: "Tool" },
            { title: "Puppy First Vet Visit Cost", href: "/blog/puppy-first-vet-visit-cost", description: "Estimate first visit and first-year care costs.", label: "Cost" },
            { title: "New Puppy Checklist", href: "/blog/bringing-home-new-puppy-checklist", description: "Supplies, home setup, and first-week planning." },
            { title: "Dog Insurance Cost", href: "/insurance/dog-insurance-cost", description: "Compare monthly premiums before pre-existing issues appear." },
            { title: "Best Pet Insurance for Dogs", href: "/insurance/best-pet-insurance-for-dogs", description: "Choose plan settings by age, breed, and risk." },
          ],
        },
        {
          title: "Safety Checks for New Puppies",
          description: "Puppies explore with their mouths, so these pages are high value.",
          links: [
            { title: "Dog Toxicity Hub", href: "/toxicity/dogs", description: "Common dog poisoning searches and emergency links." },
            { title: "Chocolate", href: "/toxicity/chocolate", description: "Common ingestion risk in puppy homes." },
            { title: "Grapes and Raisins", href: "/toxicity/grapes", description: "High-risk food exposure for dogs." },
            { title: "Pet-Safe Cleaning Hub", href: "/pet-safe-cleaning", description: "Safer floor and accident-cleanup routines." },
          ],
        },
      ]}
      resource={<DownloadResourceCard variant="puppy" />}
      faq={faq}
      footerNote="Puppy vaccine timing and prevention should be personalized by a veterinarian based on age, records, health, local disease risk, and lifestyle."
    />
  );
}
