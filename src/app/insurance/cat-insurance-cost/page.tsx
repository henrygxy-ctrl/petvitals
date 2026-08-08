import type { Metadata } from "next";
import Link from "next/link";
import { CommercialInsurancePage } from "../_components/commercial-insurance-page";
import { SITE_BASE_URL, SITE_NAME } from "@/lib/constants";

const slug = "cat-insurance-cost";

export const metadata: Metadata = {
  title: `Cat Insurance Cost in 2026: Monthly Price Guide | ${SITE_NAME}`,
  description:
    "Compare cat insurance cost by age, indoor risk, deductible, reimbursement rate, annual limit, and plan type before requesting quotes.",
  alternates: { canonical: `${SITE_BASE_URL}/insurance/${slug}` },
  openGraph: {
    title: "Cat Insurance Cost in 2026: Monthly Price Guide",
    description:
      "Compare average cat insurance cost, indoor cat emergency risks, quote settings, and cheaper coverage options.",
    url: `${SITE_BASE_URL}/insurance/${slug}`,
    siteName: SITE_NAME,
    type: "website",
    images: [{ url: `${SITE_BASE_URL}/og-image.png`, width: 1200, height: 630, alt: "Cat insurance cost guide" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cat Insurance Cost in 2026: Monthly Price Guide",
    description:
      "Compare average cat insurance cost, indoor cat emergency risks, quote settings, and cheaper coverage options.",
    images: [`${SITE_BASE_URL}/og-image.png`],
  },
};

const faq = [
  {
    question: "How much does cat insurance cost per month?",
    answer:
      "A useful planning number is about $32 per month for cat accident and illness coverage, based on NAPHIA-reported average premiums. Your actual quote depends on age, location, deductible, reimbursement rate, annual limit, and plan type.",
  },
  {
    question: "Is cat insurance cheaper than dog insurance?",
    answer:
      "Yes, cat insurance is often cheaper than dog insurance because average claim costs and breed-related risk differences are usually lower. Indoor cats can still face expensive emergencies such as urinary blockage, toxin exposure, falls, and foreign object ingestion.",
  },
  {
    question: "Is pet insurance worth it for an indoor cat?",
    answer:
      "It can be worth it if a sudden emergency bill would be hard to pay. Indoor cats still need urgent care for urinary blockage, poisoning, dental injuries, falls, vomiting, respiratory distress, and swallowed objects.",
  },
  {
    question: "Does cat insurance cover urinary blockage?",
    answer:
      "Accident and illness plans may cover eligible urinary blockage treatment after waiting periods, but coverage depends on the policy and whether symptoms existed before enrollment. Accident-only plans usually do not cover illness-related urinary disease.",
  },
  {
    question: "How can I lower my cat insurance premium?",
    answer:
      "You can usually lower the monthly premium by choosing a higher deductible, lower reimbursement rate, lower annual limit, or accident-only coverage. Make sure the cheaper plan still covers the emergencies you care about most.",
  },
];

export default function CatInsuranceCostPage() {
  return (
    <CommercialInsurancePage
      slug={slug}
      label="Cat Insurance Cost"
      title="Cat Insurance Cost in 2026: Monthly Price Guide"
      intro="Quick answer: cat insurance often costs about $32 per month for accident and illness coverage. Cats are usually cheaper to insure than dogs, but serious issues like urinary blockage, toxin exposure, dental injury, and emergency hospitalization can still create large bills."
      primaryCtaLabel="Compare cat insurance quotes"
      secondaryCtaLabel="See all pet insurance costs"
      secondaryCtaHref="/insurance/pet-insurance-cost"
      heroNote="For fair quotes, keep the deductible, reimbursement rate, annual limit, and plan type the same across providers."
      stats={[
        { label: "Cat average", value: "$32/mo", note: "Average accident and illness premium reported by NAPHIA." },
        { label: "Compared with dogs", value: "Lower", note: "Cats often cost less to insure than dogs." },
        { label: "Key risk", value: "Urinary care", note: "Blockage and urinary disease can become urgent quickly." },
      ]}
      sections={[
        {
          title: "Average Cat Insurance Cost",
          content: (
            <>
              <p>
                The average cat insurance cost for accident and illness coverage is about $32 per month. That makes cats one of the more affordable pet insurance segments, but the monthly premium still depends on location, age, plan type, and quote settings.
              </p>
              <div className="not-prose overflow-x-auto rounded-xl border my-4">
                <table className="w-full text-sm">
                  <thead className="bg-muted/60">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold">Cat insurance quote</th>
                      <th className="px-4 py-3 text-left font-semibold">Best fit</th>
                      <th className="px-4 py-3 text-left font-semibold">Cost signal</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t">
                      <td className="px-4 py-3">Accident and illness</td>
                      <td className="px-4 py-3">Broad coverage for injuries, illness, diagnostics, urinary issues, and emergencies</td>
                      <td className="px-4 py-3">About $32 per month on average</td>
                    </tr>
                    <tr className="border-t">
                      <td className="px-4 py-3">Accident-only</td>
                      <td className="px-4 py-3">Lower-cost backup for falls, toxin ingestion, bite wounds, and swallowed objects</td>
                      <td className="px-4 py-3">Usually cheaper than illness coverage</td>
                    </tr>
                    <tr className="border-t">
                      <td className="px-4 py-3">Wellness add-on</td>
                      <td className="px-4 py-3">Routine exams, vaccines, parasite prevention, and dental cleaning budgets</td>
                      <td className="px-4 py-3">Adds to the monthly premium</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>
                For a dog-versus-cat comparison, start with the full <Link href="/insurance/pet-insurance-cost" className="underline underline-offset-2">pet insurance cost guide</Link>. If you only want accident backup, compare <Link href="/insurance/accident-only" className="underline underline-offset-2">accident-only coverage</Link>.
              </p>
            </>
          ),
        },
        {
          title: "Why Indoor Cats Still Need Emergency Planning",
          content: (
            <>
              <p>
                Indoor cats are lower risk than outdoor cats in some ways, but they are not risk-free. Urinary blockage, toxin exposure, string or hair tie ingestion, dental trauma, falls, vomiting, and respiratory distress can all become urgent.
              </p>
              <p>
                Insurance is most useful when the policy is active before symptoms appear. A urinary problem noted in the medical record before enrollment can affect future coverage, even if the cat seems healthy later.
              </p>
            </>
          ),
        },
        {
          title: "Cat Age and Monthly Premiums",
          content: (
            <>
              <p>
                Kittens and young adult cats often quote lower than senior cats. Enrolling earlier can also reduce the chance that a future claim is tied to a pre-existing symptom.
              </p>
              <p>
                For senior cats, compare coverage for kidney disease, diabetes, hyperthyroidism, dental disease, cancer, medication, diagnostics, and hospitalization. A cheap quote is less useful if common senior-cat illnesses are weakly covered.
              </p>
            </>
          ),
        },
        {
          title: "Quote Settings That Move the Price",
          content: (
            <ul className="space-y-2">
              <li><strong>Deductible:</strong> A higher deductible usually lowers the monthly price but raises the first claim cost.</li>
              <li><strong>Reimbursement rate:</strong> 70% lowers the premium compared with 90%, but leaves you paying more of each bill.</li>
              <li><strong>Annual limit:</strong> A low limit can run out during hospitalization, surgery, or ongoing illness care.</li>
              <li><strong>Plan type:</strong> Accident-only is cheaper, but accident and illness is broader for cats.</li>
              <li><strong>Exam fee coverage:</strong> Emergency and specialist exam fees may or may not be reimbursed.</li>
            </ul>
          ),
        },
        {
          title: "How to Compare Cat Insurance Quotes",
          content: (
            <ol className="space-y-2">
              <li>Choose accident and illness if urinary, cancer, kidney, or chronic disease coverage matters.</li>
              <li>Use the same deductible, reimbursement rate, and annual limit for every quote.</li>
              <li>Check whether emergency exam fees and specialist visits are included.</li>
              <li>Review dental disease, prescription medication, and chronic illness rules.</li>
              <li>Compare at least three providers before choosing the lowest monthly price.</li>
            </ol>
          ),
        },
      ]}
      faq={faq}
      relatedGuides={[
        { title: "Pet Insurance Cost", href: "/insurance/pet-insurance-cost", description: "Compare cat costs against dog costs and plan types." },
        { title: "Emergency Vet Cost", href: "/insurance/emergency-vet-cost", description: "See how urgent cat care can affect your budget." },
        { title: "Accident-Only Insurance", href: "/insurance/accident-only", description: "Compare lower-cost accident coverage for cats." },
      ]}
      sources={[
        { label: "NAPHIA 2025 State of the Industry Report", href: "https://naphia.org/news/naphia-news/soi-report-2025/" },
        { label: "NAIC: A Regulator's Guide to Pet Insurance", href: "https://content.naic.org/article/consumer-insight-a-regulators-guide-to-pet-insurance" },
      ]}
    />
  );
}
