import type { Metadata } from "next";
import Link from "next/link";
import { CommercialInsurancePage } from "../_components/commercial-insurance-page";
import { SITE_BASE_URL, SITE_NAME } from "@/lib/constants";

const slug = "pet-insurance-cost";

export const metadata: Metadata = {
  title: `Pet Insurance Cost in 2026: Monthly Prices | ${SITE_NAME}`,
  description:
    "See typical pet insurance costs for dogs and cats, what changes your monthly price, and how to compare quotes without choosing too little coverage.",
  alternates: { canonical: `${SITE_BASE_URL}/insurance/${slug}` },
  openGraph: {
    title: "Pet Insurance Cost in 2026",
    description:
      "Typical monthly pet insurance costs, pricing factors, and quote comparison tips for dogs and cats.",
    url: `${SITE_BASE_URL}/insurance/${slug}`,
    siteName: SITE_NAME,
    type: "website",
    images: [{ url: `${SITE_BASE_URL}/og-image.png`, width: 1200, height: 630, alt: "Pet insurance cost guide" }],
  },
};

const faq = [
  {
    question: "How much does pet insurance cost per month?",
    answer:
      "Accident and illness pet insurance often costs around $62 per month for dogs and $32 per month for cats on average, but your quote can be higher or lower based on age, breed, location, deductible, reimbursement rate, and annual limit.",
  },
  {
    question: "Why is dog insurance usually more expensive than cat insurance?",
    answer:
      "Dogs tend to have higher veterinary claim costs and larger breed-related risk differences. Large breeds and breeds with common hereditary issues can cost more to insure than many cats.",
  },
  {
    question: "What is the cheapest way to lower my pet insurance premium?",
    answer:
      "The most common ways are choosing a higher deductible, a lower reimbursement rate, or a lower annual limit. Compare carefully because a cheaper plan can leave you with more out-of-pocket cost during a serious claim.",
  },
  {
    question: "Does pet insurance cost include routine wellness care?",
    answer:
      "Usually no. Core accident and illness policies typically cover unexpected medical care. Wellness coverage for vaccines, exams, dental cleaning, and preventives is often sold as an add-on.",
  },
];

export default function PetInsuranceCostPage() {
  return (
    <CommercialInsurancePage
      slug={slug}
      label="Pet Insurance Cost"
      title="Pet Insurance Cost in 2026: What Pet Parents Should Budget"
      intro="Pet insurance pricing is quote-based, but averages help you know whether a plan is in a normal range. Use this guide to understand the monthly premium, the hidden out-of-pocket costs, and the tradeoffs behind cheaper quotes."
      stats={[
        { label: "Dogs", value: "$62/mo", note: "Average accident and illness premium reported by NAPHIA." },
        { label: "Cats", value: "$32/mo", note: "Average accident and illness premium reported by NAPHIA." },
        { label: "Key levers", value: "4", note: "Deductible, reimbursement, annual limit, and pet risk drive most quote changes." },
      ]}
      sections={[
        {
          title: "What the Average Premium Really Means",
          content: (
            <>
              <p>
                The average premium is a starting point, not a promise. A young mixed-breed cat in a lower-cost area can price far below average, while an older large-breed dog in a higher-cost city can be much higher.
              </p>
              <p>
                When comparing quotes, keep the settings the same. A $500 deductible with 80% reimbursement and a $10,000 annual limit is not the same product as a $1,000 deductible with 70% reimbursement and a $5,000 limit.
              </p>
            </>
          ),
        },
        {
          title: "What Changes Your Monthly Price",
          content: (
            <>
              <ul className="space-y-2">
                <li><strong>Species:</strong> Dogs usually cost more to insure than cats.</li>
                <li><strong>Breed:</strong> Large breeds and breeds prone to hereditary issues often cost more.</li>
                <li><strong>Age:</strong> Premiums usually rise as pets get older.</li>
                <li><strong>Zip code:</strong> Veterinary prices vary by local market.</li>
                <li><strong>Plan settings:</strong> Deductible, reimbursement rate, and annual limit can move the quote a lot.</li>
              </ul>
              <p>
                If your goal is predictable protection, start by choosing the coverage you actually want, then compare providers. Starting from the lowest monthly premium can lead to weak limits or exclusions you only notice during a claim.
              </p>
            </>
          ),
        },
        {
          title: "How to Lower Cost Without Buying Too Little Coverage",
          content: (
            <>
              <p>
                The cleanest way to reduce the monthly premium is usually raising the deductible, because it keeps the plan useful for larger emergencies. Dropping reimbursement from 90% to 70% can lower the bill, but it also increases your share of every claim.
              </p>
              <p>
                For many pet parents, accident and illness coverage with a moderate deductible is a better long-term value than a very cheap plan with a low annual limit. If you only need injury protection, compare <Link href="/insurance/accident-only" className="underline underline-offset-2">accident-only insurance</Link> separately.
              </p>
            </>
          ),
        },
        {
          title: "A Simple Quote Comparison Method",
          content: (
            <ol className="space-y-2">
              <li>Pick one deductible, such as $500.</li>
              <li>Pick one reimbursement rate, such as 80%.</li>
              <li>Pick one annual limit, such as $10,000 or unlimited.</li>
              <li>Request at least three quotes using those same settings.</li>
              <li>Compare exclusions and waiting periods before comparing price.</li>
            </ol>
          ),
        },
      ]}
      faq={faq}
      relatedGuides={[
        { title: "Emergency Vet Cost", href: "/insurance/emergency-vet-cost", description: "See why one urgent visit can cost more than years of premiums." },
        { title: "Best Pet Insurance for Dogs", href: "/insurance/best-pet-insurance-for-dogs", description: "Compare dog insurance by age, breed, and risk profile." },
        { title: "Accident & Illness Plans", href: "/insurance/accident-illness", description: "Understand the most common pet insurance coverage type." },
      ]}
      sources={[
        { label: "NAPHIA 2025 State of the Industry Report", href: "https://naphia.org/news/naphia-news/soi-report-2025/" },
        { label: "NAIC: A Regulator's Guide to Pet Insurance", href: "https://content.naic.org/article/consumer-insight-a-regulators-guide-to-pet-insurance" },
      ]}
    />
  );
}
