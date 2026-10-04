import type { Metadata } from "next";
import Link from "next/link";
import { CommercialInsurancePage } from "../_components/commercial-insurance-page";
import { InsuranceCostEstimator } from "@/components/insurance/insurance-cost-estimator";
import { SITE_BASE_URL, SITE_NAME } from "@/lib/constants";

const slug = "dog-insurance-cost";

export const metadata: Metadata = {
  title: `Dog Insurance Cost Per Month: 2026 Price Guide | ${SITE_NAME}`,
  description:
    "Dog accident and illness insurance averages about $70/month or $836/year. Compare accident-only costs, breed and age factors, deductibles, and quote settings.",
  alternates: { canonical: `${SITE_BASE_URL}/insurance/${slug}` },
  openGraph: {
    title: "Dog Insurance Cost Per Month: 2026 Price Guide",
    description:
      "Estimate average dog insurance cost per month, breed and age price drivers, quote settings, and cheaper coverage options.",
    url: `${SITE_BASE_URL}/insurance/${slug}`,
    siteName: SITE_NAME,
    type: "website",
    images: [{ url: `${SITE_BASE_URL}/og-image.png`, width: 1200, height: 630, alt: "Dog insurance cost guide" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dog Insurance Cost Per Month: 2026 Price Guide",
    description:
      "Estimate average dog insurance cost per month, breed and age price drivers, quote settings, and cheaper coverage options.",
    images: [`${SITE_BASE_URL}/og-image.png`],
  },
};

const faq = [
  {
    question: "How much does dog insurance cost per month?",
    answer:
      "NAPHIA's 2025 U.S. averages, reproduced by NerdWallet, are about $70 per month for dog accident and illness coverage and $16 for accident-only coverage. Your quote can differ with age, breed, location, deductible, reimbursement rate, annual limit, and plan type.",
  },
  {
    question: "How much does dog insurance cost per year?",
    answer:
      "NAPHIA's 2025 U.S. averages, reproduced by NerdWallet, are about $836 per year for dog accident and illness coverage and $190 for accident-only coverage. Monthly averages are rounded. Deductibles, coinsurance, wellness add-ons, and excluded care are additional costs, not part of those premiums.",
  },
  {
    question: "Why is dog insurance more expensive than cat insurance?",
    answer:
      "Dog insurance is often more expensive because many dogs have higher claim costs, more orthopedic risk, larger breed differences, and higher emergency treatment costs than cats.",
  },
  {
    question: "How can I estimate dog insurance cost?",
    answer:
      "Use the same deductible, reimbursement rate, annual limit, plan type, age band, breed risk, and location assumptions across providers. A calculator can show a planning range, but each insurer's quote is the final price.",
  },
  {
    question: "What dog breeds cost more to insure?",
    answer:
      "Large breeds and breeds with common hereditary or orthopedic risks often cost more. Examples can include German Shepherds, Bulldogs, French Bulldogs, Golden Retrievers, Labrador Retrievers, Rottweilers, and Great Danes, but pricing varies by provider.",
  },
  {
    question: "Is accident-only dog insurance cheaper?",
    answer:
      "Yes. Accident-only dog insurance is usually cheaper than accident and illness coverage, but it does not cover illnesses such as cancer, infections, allergies, pancreatitis, or chronic disease.",
  },
  {
    question: "How can I lower my dog insurance premium?",
    answer:
      "You can usually lower the monthly premium by choosing a higher deductible, lower reimbursement rate, lower annual limit, or accident-only coverage. Compare carefully because cheaper settings can increase your out-of-pocket cost during a serious claim.",
  },
  {
    question: "Does dog insurance cover dental cleaning?",
    answer:
      "Routine dental cleaning is usually handled through wellness add-ons, not core accident and illness coverage. Dental injury or dental disease coverage varies by provider, so read the dental rules before choosing a policy.",
  },
  {
    question: "Does dog insurance cover hereditary conditions?",
    answer:
      "Many accident and illness plans may cover eligible hereditary conditions if they are not pre-existing and are not excluded by the policy. Check breed-specific exclusions, orthopedic waiting periods, and bilateral condition rules.",
  },
  {
    question: "Should I buy dog insurance for a puppy?",
    answer:
      "Early enrollment can be useful because puppies are accident-prone and conditions found before coverage may be considered pre-existing. Compare waiting periods, wellness add-ons, and accident and illness coverage before the first big vet bill.",
  },
];

export default function DogInsuranceCostPage() {
  return (
    <CommercialInsurancePage
      slug={slug}
      label="Dog Insurance Cost"
      title="Dog Insurance Cost Per Month: 2026 Price Guide"
      intro="U.S. dog accident and illness insurance averages about $70 per month or $836 per year. Accident-only averages are about $16 per month or $190 per year. These are 2025 industry benchmarks published in 2026, not a personal quote; breed, age, location, and coverage settings change your price."
      primaryCtaLabel="Compare dog insurance quotes"
      secondaryCtaLabel="See monthly and yearly dog costs"
      secondaryCtaHref="#dog-cost-table"
      heroNote="Reviewed October 4, 2026. Compare quotes with the same deductible, reimbursement rate, and annual limit. Calculator adjustments are illustrative, not insurer rates."
      stats={[
        { label: "Dog average", value: "$70/mo", note: "Rounded 2025 U.S. accident and illness average." },
        { label: "Cheaper option", value: "Accident-only", note: "Lower monthly price, but no illness coverage." },
        { label: "Big drivers", value: "Breed + age", note: "Large breeds and older dogs usually quote higher." },
      ]}
      sections={[
        {
          title: "How Much Is Dog Insurance Per Month and Year?",
          content: (
            <>
              <p>
                These 2025 U.S. averages are reported by NAPHIA and reproduced in <a href="https://www.nerdwallet.com/insurance/pet/learn/cost-of-pet-insurance" className="underline underline-offset-2" target="_blank" rel="noopener noreferrer">NerdWallet&apos;s cost guide</a>. Amounts are in U.S. dollars. Rounded monthly figures multiplied by 12 may differ slightly from the annual averages.
              </p>
              <div id="dog-cost-table" className="not-prose overflow-x-auto rounded-lg border my-4 scroll-mt-20">
                <table className="w-full text-sm">
                  <thead className="bg-muted/60">
                    <tr>
                      <th scope="col" className="px-4 py-3 text-left font-semibold">Dog coverage</th>
                      <th scope="col" className="px-4 py-3 text-left font-semibold">Monthly average</th>
                      <th scope="col" className="px-4 py-3 text-left font-semibold">Annual average</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t">
                      <td className="px-4 py-3">Accident and illness</td>
                      <td className="px-4 py-3">About $70</td>
                      <td className="px-4 py-3">About $836</td>
                    </tr>
                    <tr className="border-t">
                      <td className="px-4 py-3">Accident-only</td>
                      <td className="px-4 py-3">About $16</td>
                      <td className="px-4 py-3">About $190</td>
                    </tr>
                    <tr className="border-t">
                      <td className="px-4 py-3">Wellness add-on</td>
                      <td colSpan={2} className="px-4 py-3">Optional additional premium; benefits vary by plan</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>
                Accident-only can cover eligible injuries but excludes illnesses; neither core plan automatically pays for routine vaccines or checkups. A premium is not your total veterinary budget. Compare <Link href="/insurance/pet-insurance-cost#annual-budget" className="underline underline-offset-2">annual premiums plus a sample claim&apos;s out-of-pocket cost</Link> before choosing only by the monthly price.
              </p>
              <p>
                If you are comparing more than dogs, use the broader <Link href="/insurance/pet-insurance-cost" className="underline underline-offset-2">pet insurance cost per month guide</Link> for the average cost of pet insurance across dogs, cats, and plan types. If you only need injury protection, compare <Link href="/insurance/accident-only" className="underline underline-offset-2">accident-only pet insurance</Link>.
              </p>
            </>
          ),
        },
        {
          title: "Dog Insurance Cost Calculator",
          content: <InsuranceCostEstimator defaultSpecies="dog" lockSpecies title="Dog Insurance Cost Calculator" />,
        },
        {
          title: "Why Breed Changes Dog Insurance Cost",
          content: (
            <>
              <p>
                Breed is one of the biggest dog insurance price drivers because claim risk is not equal across dogs. Large breeds can have more expensive orthopedic claims, while some popular breeds have higher risk for breathing, skin, eye, heart, or joint issues.
              </p>
              <p>
                For breeds with known hereditary or orthopedic risk, avoid comparing only the monthly premium. Check hip dysplasia rules, cruciate ligament waiting periods, bilateral condition restrictions, annual limits, and whether specialist care is covered.
              </p>
            </>
          ),
        },
        {
          title: "Dog Age and Monthly Premiums",
          content: (
            <>
              <p>
                Puppies are often cheaper to insure than senior dogs, and early enrollment can matter because symptoms documented before coverage may become pre-existing conditions. First-year dog costs can also include vaccines, parasite prevention, and spay or neuter decisions, which may sit outside core illness coverage.
              </p>
              <p>
                Senior dog insurance can still be useful, but quotes are usually higher and exclusions matter more. Review cancer, chronic disease, dental disease, orthopedic, medication, and hospitalization rules before choosing a low-priced plan.
              </p>
            </>
          ),
        },
        {
          title: "Quote Settings That Move the Price",
          content: (
            <ul className="space-y-2">
              <li><strong>Deductible:</strong> A higher deductible usually lowers the monthly price but raises your first claim cost.</li>
              <li><strong>Reimbursement rate:</strong> 70% costs less than 90%, but you pay more of every covered bill.</li>
              <li><strong>Annual limit:</strong> Lower limits reduce premiums but can run out during surgery, cancer care, or hospitalization.</li>
              <li><strong>Exam fees:</strong> Some plans include emergency or specialist exam fees; others do not.</li>
              <li><strong>Waiting periods:</strong> Orthopedic and illness waiting periods can matter more for dogs than the headline premium.</li>
            </ul>
          ),
        },
        {
          title: "How to Compare Dog Insurance Quotes",
          content: (
            <ol className="space-y-2">
              <li>Pick one deductible, such as $500.</li>
              <li>Pick one reimbursement rate, such as 80%.</li>
              <li>Pick one annual limit, such as $10,000 or unlimited.</li>
              <li>Run the same dog profile through at least three providers.</li>
              <li>Compare exclusions, waiting periods, and claim rules before picking the cheapest quote.</li>
            </ol>
          ),
        },
      ]}
      faq={faq}
      relatedGuides={[
        { title: "Pet Insurance Cost", href: "/insurance/pet-insurance-cost", description: "Compare dog insurance price against cat costs and plan types." },
        { title: "Best Pet Insurance for Dogs", href: "/insurance/best-pet-insurance-for-dogs", description: "Choose dog coverage by breed, age, and risk." },
        { title: "Emergency Vet Cost", href: "/insurance/emergency-vet-cost", description: "See why one urgent dog visit can exceed a year of premiums." },
      ]}
      sources={[
        { label: "NAPHIA Pet Insurance Industry Data", href: "https://naphia.org/industry-data/" },
        { label: "NerdWallet - 2025 NAPHIA Monthly and Annual Premiums", href: "https://www.nerdwallet.com/insurance/pet/learn/cost-of-pet-insurance" },
        { label: "NAIC Pet Insurance Consumer Information", href: "https://content.naic.org/insurance-topics/pet-insurance" },
      ]}
    />
  );
}
