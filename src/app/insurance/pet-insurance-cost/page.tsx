import type { Metadata } from "next";
import Link from "next/link";
import { CommercialInsurancePage } from "../_components/commercial-insurance-page";
import { SITE_BASE_URL, SITE_NAME } from "@/lib/constants";

const slug = "pet-insurance-cost";

export const metadata: Metadata = {
  title: `Pet Insurance Cost in 2026: Dog & Cat Price Table | ${SITE_NAME}`,
  description:
    "See 2026 pet insurance cost by dog, cat, plan type, deductible, reimbursement rate, and annual limit before comparing quotes.",
  alternates: { canonical: `${SITE_BASE_URL}/insurance/${slug}` },
  openGraph: {
    title: "Pet Insurance Cost in 2026: Dog & Cat Price Table",
    description:
      "Compare dog and cat pet insurance cost, average monthly premiums, plan types, deductibles, and quote settings.",
    url: `${SITE_BASE_URL}/insurance/${slug}`,
    siteName: SITE_NAME,
    type: "website",
    images: [{ url: `${SITE_BASE_URL}/og-image.png`, width: 1200, height: 630, alt: "Pet insurance cost guide" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pet Insurance Cost in 2026: Dog & Cat Price Table",
    description:
      "Compare dog and cat pet insurance cost, average monthly premiums, plan types, deductibles, and quote settings.",
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
    question: "What is the average cost of pet insurance?",
    answer:
      "A useful average cost estimate is about $62 per month for dogs and $32 per month for cats for accident and illness coverage. Accident-only plans can cost less, while lower deductibles, higher reimbursement rates, and higher annual limits usually raise the monthly price.",
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
      title="Pet Insurance Cost in 2026: Dog and Cat Price Table"
      intro="Quick answer: pet insurance often costs about $62 per month for dogs and $32 per month for cats for accident and illness coverage. Use the table below to compare average pet insurance cost, dog insurance cost, cat insurance cost, and the plan settings that change your quote."
      primaryCtaLabel="Compare quotes by price"
      secondaryCtaLabel="See cheaper accident-only plans"
      secondaryCtaHref="/insurance/accident-only"
      heroNote="For the cleanest comparison, request quotes with the same deductible, reimbursement rate, and annual limit across providers."
      stats={[
        { label: "Dog insurance cost", value: "$62/mo", note: "Average accident and illness premium reported by NAPHIA." },
        { label: "Cat insurance cost", value: "$32/mo", note: "Average accident and illness premium reported by NAPHIA." },
        { label: "Price drivers", value: "6", note: "Age, breed, zip code, deductible, reimbursement, and limit change quotes." },
      ]}
      sections={[
        {
          title: "2026 Average Pet Insurance Cost Table",
          content: (
            <>
              <p>
                If you are comparing the cost of pet insurance, start with species and plan type. Dog insurance cost is usually higher than cat insurance cost, and accident-only coverage usually costs less than accident and illness coverage.
              </p>
              <div className="not-prose overflow-x-auto rounded-xl border my-4">
                <table className="w-full text-sm">
                  <thead className="bg-muted/60">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold">Quote type</th>
                      <th className="px-4 py-3 text-left font-semibold">Typical use case</th>
                      <th className="px-4 py-3 text-left font-semibold">Average cost signal</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t">
                      <td className="px-4 py-3">Dog accident and illness</td>
                      <td className="px-4 py-3">Broad coverage for injuries, illness, diagnostics, and emergencies</td>
                      <td className="px-4 py-3">About $62 per month</td>
                    </tr>
                    <tr className="border-t">
                      <td className="px-4 py-3">Cat accident and illness</td>
                      <td className="px-4 py-3">Broad coverage for injuries, illness, urinary issues, diagnostics, and emergencies</td>
                      <td className="px-4 py-3">About $32 per month</td>
                    </tr>
                    <tr className="border-t">
                      <td className="px-4 py-3">Accident-only</td>
                      <td className="px-4 py-3">Poisoning, broken bones, wounds, swallowed objects</td>
                      <td className="px-4 py-3">Usually lower than full illness coverage</td>
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
                If you are pricing one pet, use the dog-specific <Link href="/insurance/dog-insurance-cost" className="underline underline-offset-2">dog insurance cost</Link> and <Link href="/insurance/cat-insurance-cost" className="underline underline-offset-2">cat insurance cost</Link> guides. If you only want backup for injuries and accidental ingestion, compare <Link href="/insurance/accident-only" className="underline underline-offset-2">accident-only pet insurance</Link>. If you want protection from illness and emergency care, compare accident and illness quotes against possible <Link href="/insurance/emergency-vet-cost" className="underline underline-offset-2">emergency vet costs</Link>.
              </p>
            </>
          ),
        },
        {
          title: "Use These Settings Like a Pet Insurance Cost Calculator",
          content: (
            <>
              <p>
                The fastest way to estimate pet insurance price is to hold the quote settings steady. Compare the same pet, zip code, deductible, reimbursement rate, annual limit, and plan type across providers. Otherwise, a cheaper quote may simply be buying less protection.
              </p>
              <ul className="space-y-2">
                <li><strong>Deductible:</strong> Higher deductibles usually lower the monthly price but raise your first out-of-pocket cost.</li>
                <li><strong>Reimbursement:</strong> 70% costs less than 90%, but you pay more of every covered bill.</li>
                <li><strong>Annual limit:</strong> Lower limits reduce premiums but can run out during surgery, hospitalization, or cancer care.</li>
                <li><strong>Plan type:</strong> Accident-only is cheaper, while accident and illness is broader.</li>
              </ul>
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
                Cat insurance cost is often lower, but indoor cats still face emergency risks such as urinary blockage, toxin exposure, falls, and foreign object ingestion. For cats, the right question is not only the monthly price, but whether the plan limit could handle a serious emergency. If the quote is much lower than average, check whether illness coverage, exam fees, dental disease, or hereditary conditions are excluded.
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
        { title: "Dog Insurance Cost", href: "/insurance/dog-insurance-cost", description: "Compare dog premiums by breed, age, and quote settings." },
        { title: "Cat Insurance Cost", href: "/insurance/cat-insurance-cost", description: "Compare cat premiums, indoor risks, and illness coverage." },
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
