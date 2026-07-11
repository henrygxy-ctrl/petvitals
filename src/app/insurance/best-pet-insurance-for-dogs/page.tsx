import type { Metadata } from "next";
import Link from "next/link";
import { CommercialInsurancePage } from "../_components/commercial-insurance-page";
import { SITE_BASE_URL, SITE_NAME } from "@/lib/constants";

const slug = "best-pet-insurance-for-dogs";

export const metadata: Metadata = {
  title: `Best Pet Insurance for Dogs: Compare Plans | ${SITE_NAME}`,
  description:
    "Find the best pet insurance for your dog by comparing age, breed risk, coverage limits, reimbursement, waiting periods, and emergency protection.",
  alternates: { canonical: `${SITE_BASE_URL}/insurance/${slug}` },
  openGraph: {
    title: "Best Pet Insurance for Dogs",
    description:
      "A practical dog insurance comparison guide by breed, age, budget, and emergency risk.",
    url: `${SITE_BASE_URL}/insurance/${slug}`,
    siteName: SITE_NAME,
    type: "website",
    images: [{ url: `${SITE_BASE_URL}/og-image.png`, width: 1200, height: 630, alt: "Best pet insurance for dogs guide" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Pet Insurance for Dogs",
    description:
      "A practical dog insurance comparison guide by breed, age, budget, and emergency risk.",
    images: [`${SITE_BASE_URL}/og-image.png`],
  },
};

const faq = [
  {
    question: "What is the best pet insurance for dogs?",
    answer:
      "There is no single best plan for every dog. Most dog owners should compare accident and illness plans, then choose based on breed risk, age, deductible, reimbursement rate, annual limit, waiting periods, exclusions, and claim experience.",
  },
  {
    question: "What type of dog insurance is best for puppies?",
    answer:
      "Puppies often benefit from accident and illness coverage started early, before conditions become pre-existing. A wellness add-on can be useful if you want help budgeting vaccines, exams, and spay or neuter costs.",
  },
  {
    question: "What is best for large-breed dogs?",
    answer:
      "Large-breed dogs often need strong orthopedic and hereditary condition coverage. Check hip dysplasia rules, cruciate ligament waiting periods, annual limits, and whether bilateral conditions are restricted.",
  },
  {
    question: "Is accident-only insurance enough for a dog?",
    answer:
      "Accident-only can be a budget option for injury risk, but it usually does not cover illnesses such as cancer, infections, allergies, pancreatitis, or chronic disease. Accident and illness coverage is broader.",
  },
];

export default function BestPetInsuranceForDogsPage() {
  return (
    <CommercialInsurancePage
      slug={slug}
      label="Best Dog Insurance"
      title="Best Pet Insurance for Dogs: How to Choose the Right Plan"
      intro="The best dog insurance is not just the cheapest quote. It is the plan that matches your dog's age, breed risks, emergency exposure, and your ability to handle a large vet bill."
      stats={[
        { label: "Common pick", value: "A&I", note: "Accident and illness coverage is the broad middle ground for many dogs." },
        { label: "Dog average", value: "$62/mo", note: "NAPHIA reported this average for accident and illness coverage." },
        { label: "Quote rule", value: "3+", note: "Compare at least three providers with the same plan settings." },
      ]}
      sections={[
        {
          title: "Best Overall Fit for Many Dogs",
          content: (
            <>
              <p>
                For many dog owners, the best starting point is an <Link href="/insurance/accident-illness" className="underline underline-offset-2">accident and illness policy</Link>. It covers the broadest set of expensive surprises without relying on a wellness add-on for routine care.
              </p>
              <p>
                Choose a deductible you could pay during a stressful week, a reimbursement rate that keeps a large claim manageable, and an annual limit high enough for surgery or hospitalization.
              </p>
            </>
          ),
        },
        {
          title: "Best for Puppies",
          content: (
            <>
              <p>
                Puppies are ideal candidates for early enrollment because fewer conditions are already documented. Starting before symptoms appear can help avoid pre-existing condition exclusions later.
              </p>
              <p>
                If you want help budgeting predictable first-year care, compare wellness add-ons separately from accident and illness coverage. Wellness can be convenient, but it is not the same as protection against a major medical bill.
              </p>
            </>
          ),
        },
        {
          title: "Best for Large Breeds and Hereditary Risk",
          content: (
            <ul className="space-y-2">
              <li><strong>Check orthopedic waiting periods:</strong> Some plans have longer waits for cruciate ligament or hip issues.</li>
              <li><strong>Read hereditary condition rules:</strong> Hip dysplasia, elbow dysplasia, and heart issues can vary by policy.</li>
              <li><strong>Avoid low annual limits:</strong> Large-dog surgery and hospitalization can be expensive.</li>
              <li><strong>Review bilateral exclusions:</strong> One knee injury can affect future coverage for the other knee.</li>
            </ul>
          ),
        },
        {
          title: "Best for Senior Dogs",
          content: (
            <>
              <p>
                Senior dogs can still benefit from coverage, but quotes are usually higher and pre-existing conditions matter more. Compare plans that accept your dog's age and pay close attention to chronic illness, cancer, dental disease, and medication rules.
              </p>
              <p>
                If full accident and illness coverage is too expensive, an accident-only plan may still reduce risk from trauma, toxin ingestion, or sudden injuries.
              </p>
            </>
          ),
        },
        {
          title: "Red Flags When Comparing Dog Insurance",
          content: (
            <ul className="space-y-2">
              <li>A low premium paired with a very low annual limit.</li>
              <li>Unclear definitions of pre-existing conditions.</li>
              <li>Long orthopedic waiting periods for a breed with joint risk.</li>
              <li>Limited coverage for specialist, emergency, or hospitalization fees.</li>
              <li>Quote comparisons that use different deductible or reimbursement settings.</li>
            </ul>
          ),
        },
      ]}
      faq={faq}
      relatedGuides={[
        { title: "Pet Insurance Cost", href: "/insurance/pet-insurance-cost", description: "Understand monthly premiums before comparing dog plans." },
        { title: "Emergency Vet Cost", href: "/insurance/emergency-vet-cost", description: "See how a serious dog emergency can affect your budget." },
        { title: "Comprehensive Plans", href: "/insurance/comprehensive", description: "Learn when wellness add-ons make sense." },
      ]}
      sources={[
        { label: "NAPHIA 2025 State of the Industry Report", href: "https://naphia.org/news/naphia-news/soi-report-2025/" },
        { label: "NAIC: A Regulator's Guide to Pet Insurance", href: "https://content.naic.org/article/consumer-insight-a-regulators-guide-to-pet-insurance" },
      ]}
    />
  );
}
