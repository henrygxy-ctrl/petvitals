import type { Metadata } from "next";
import Link from "next/link";
import { CommercialInsurancePage } from "../_components/commercial-insurance-page";
import { SITE_BASE_URL, SITE_NAME } from "@/lib/constants";

const slug = "pet-insurance-cost";

export const metadata: Metadata = {
  title: `Pet Insurance Cost: Dog & Cat Monthly Prices in 2026 | ${SITE_NAME}`,
  description:
    "Compare pet insurance cost for dogs and cats in 2026, including average monthly premiums, dog insurance cost factors, deductibles, and quote tips.",
  alternates: { canonical: `${SITE_BASE_URL}/insurance/${slug}` },
  openGraph: {
    title: "Pet Insurance Cost: Dog & Cat Monthly Prices in 2026",
    description:
      "Average monthly pet insurance costs, dog insurance cost factors, and quote comparison tips for dogs and cats.",
    url: `${SITE_BASE_URL}/insurance/${slug}`,
    siteName: SITE_NAME,
    type: "website",
    images: [{ url: `${SITE_BASE_URL}/og-image.png`, width: 1200, height: 630, alt: "Pet insurance cost guide" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pet Insurance Cost: Dog & Cat Monthly Prices in 2026",
    description:
      "Average monthly pet insurance costs, dog insurance cost factors, and quote comparison tips for dogs and cats.",
    images: [`${SITE_BASE_URL}/og-image.png`],
  },
};

const faq = [
  {
    question: "How much does pet insurance cost per month?",
    answer:
      "Accident and illness pet insurance often costs around $62 per month for dogs and $32 per month for cats on average, but your quote can be higher or lower based on age, breed, location, deductible, reimbursement rate, and annual limit.",
  },
  {
    question: "How much does dog insurance cost per month?",
    answer:
      "Dog insurance commonly costs more than cat insurance. A useful planning number is around $62 per month for accident and illness coverage, but large breeds, older dogs, high-cost zip codes, and lower deductibles can push quotes higher.",
  },
  {
    question: "How much does cat insurance cost per month?",
    answer:
      "Cat insurance is often less expensive than dog insurance. A useful planning number is around $32 per month for accident and illness coverage, but age, location, deductible, reimbursement rate, and annual limit still change the final quote.",
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
    question: "Is accident-only pet insurance cheaper?",
    answer:
      "Yes. Accident-only pet insurance is usually cheaper than accident and illness coverage because it covers eligible injuries and accidents, but not illnesses such as cancer, infections, allergies, or chronic disease.",
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
      title="Pet Insurance Cost: Dog and Cat Monthly Prices in 2026"
      intro="Most pet parents want one clear number before comparing quotes: dog insurance often averages around $62 per month, while cat insurance often averages around $32 per month for accident and illness coverage. Your actual cost changes with age, breed, location, deductible, reimbursement rate, and annual limit."
      primaryCtaLabel="Compare pet insurance quotes"
      secondaryCtaLabel="See cheaper accident-only plans"
      secondaryCtaHref="/insurance/accident-only"
      heroNote="For the cleanest comparison, request quotes with the same deductible, reimbursement rate, and annual limit across providers."
      stats={[
        { label: "Dog insurance cost", value: "$62/mo", note: "Average accident and illness premium reported by NAPHIA." },
        { label: "Cat insurance cost", value: "$32/mo", note: "Average accident and illness premium reported by NAPHIA." },
        { label: "Lower-cost option", value: "$10+", note: "Accident-only plans can cost less but exclude illness coverage." },
      ]}
      sections={[
        {
          title: "Quick Cost Breakdown",
          content: (
            <>
              <p>
                If you are comparing the cost of pet insurance, start with the plan type. Accident-only plans are usually the cheapest. Accident and illness plans cost more but cover a much broader set of emergency and medical problems.
              </p>
              <div className="not-prose overflow-x-auto rounded-xl border my-4">
                <table className="w-full text-sm">
                  <thead className="bg-muted/60">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold">Coverage type</th>
                      <th className="px-4 py-3 text-left font-semibold">Typical use case</th>
                      <th className="px-4 py-3 text-left font-semibold">Cost signal</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t">
                      <td className="px-4 py-3">Accident-only</td>
                      <td className="px-4 py-3">Poisoning, broken bones, wounds, swallowed objects</td>
                      <td className="px-4 py-3">Lowest monthly premium</td>
                    </tr>
                    <tr className="border-t">
                      <td className="px-4 py-3">Accident and illness</td>
                      <td className="px-4 py-3">Accidents plus cancer, infections, allergies, diagnostics</td>
                      <td className="px-4 py-3">Higher, but broader protection</td>
                    </tr>
                    <tr className="border-t">
                      <td className="px-4 py-3">Wellness add-on</td>
                      <td className="px-4 py-3">Vaccines, routine exams, prevention</td>
                      <td className="px-4 py-3">Adds monthly cost</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>
                If you only want backup for injuries and accidental ingestion, compare <Link href="/insurance/accident-only" className="underline underline-offset-2">accident-only pet insurance</Link>. If you want protection from illness and emergency care, compare accident and illness quotes against possible <Link href="/insurance/emergency-vet-cost" className="underline underline-offset-2">emergency vet costs</Link>.
              </p>
            </>
          ),
        },
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
          title: "Dog Insurance Cost vs. Cat Insurance Cost",
          content: (
            <>
              <p>
                Dog insurance cost is usually higher because dogs tend to have higher claim costs, larger breed differences, and more orthopedic and accident risk. Large-breed dogs and breeds with common hereditary issues can price well above average.
              </p>
              <p>
                Cat insurance cost is often lower, but indoor cats still face emergency risks such as urinary blockage, toxin exposure, falls, and foreign object ingestion. For cats, the right question is not only the monthly price, but whether the plan limit could handle a serious emergency.
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
                If your goal is predictable protection, start by choosing the coverage you actually want, then compare providers. Starting from the lowest monthly premium can lead to weak limits or exclusions you only notice during a claim. Dog owners can also compare breed and age tradeoffs in our <Link href="/insurance/best-pet-insurance-for-dogs" className="underline underline-offset-2">best pet insurance for dogs</Link> guide.
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
        { title: "Accident-Only Insurance", href: "/insurance/accident-only", description: "Compare the cheaper plan type for injuries and accidental ingestion." },
        { title: "Best Pet Insurance for Dogs", href: "/insurance/best-pet-insurance-for-dogs", description: "Compare dog insurance by age, breed, and risk profile." },
      ]}
      sources={[
        { label: "NAPHIA 2025 State of the Industry Report", href: "https://naphia.org/news/naphia-news/soi-report-2025/" },
        { label: "NAIC: A Regulator's Guide to Pet Insurance", href: "https://content.naic.org/article/consumer-insight-a-regulators-guide-to-pet-insurance" },
      ]}
    />
  );
}
