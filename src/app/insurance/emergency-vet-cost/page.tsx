import type { Metadata } from "next";
import Link from "next/link";
import { CommercialInsurancePage } from "../_components/commercial-insurance-page";
import { SITE_BASE_URL, SITE_NAME } from "@/lib/constants";

const slug = "emergency-vet-cost";

export const metadata: Metadata = {
  title: `Emergency Vet Cost: What to Expect | ${SITE_NAME}`,
  description:
    "Emergency vet costs can range from an exam fee to thousands for hospitalization or surgery. Learn what drives the bill and how pet insurance helps.",
  alternates: { canonical: `${SITE_BASE_URL}/insurance/${slug}` },
  openGraph: {
    title: "Emergency Vet Cost: What to Expect",
    description:
      "Understand emergency vet exam fees, common urgent-care cost drivers, and how pet insurance affects out-of-pocket risk.",
    url: `${SITE_BASE_URL}/insurance/${slug}`,
    siteName: SITE_NAME,
    type: "website",
    images: [{ url: `${SITE_BASE_URL}/og-image.png`, width: 1200, height: 630, alt: "Emergency vet cost guide" }],
  },
};

const faq = [
  {
    question: "How much does an emergency vet visit cost?",
    answer:
      "A basic emergency exam may be around $135 to $143, but the total bill can range from under a few hundred dollars to $5,000 or more when diagnostics, hospitalization, surgery, or specialist care are needed.",
  },
  {
    question: "Does pet insurance cover emergency vet visits?",
    answer:
      "Accident and illness plans commonly cover eligible emergency exams, diagnostics, hospitalization, surgery, and medications after waiting periods and exclusions. You still pay deductibles, coinsurance, and any non-covered items.",
  },
  {
    question: "Do emergency vets require payment up front?",
    answer:
      "Many emergency hospitals require payment at the time of service. Most pet insurance is reimbursement-based, so you may need cash, credit, or a financing option before the claim is paid.",
  },
  {
    question: "Can I buy pet insurance after an emergency?",
    answer:
      "You can buy a policy later, but the emergency and related conditions may be considered pre-existing and excluded. Insurance works best when it is in place before symptoms or injuries happen.",
  },
];

export default function EmergencyVetCostPage() {
  return (
    <CommercialInsurancePage
      slug={slug}
      label="Emergency Vet Cost"
      title="Emergency Vet Cost: What to Expect Before You Need It"
      intro="Emergency care is where pet insurance often matters most. The first exam fee is only one part of the bill; diagnostics, overnight care, surgery, and medications can quickly push costs into the thousands."
      stats={[
        { label: "ER exam", value: "$135+", note: "CareCredit lists emergency exam costs around $135 for dogs and $143 for cats." },
        { label: "Full bill", value: "$100-$5k+", note: "BluePearl notes emergency vet bills can range widely by severity." },
        { label: "Best timing", value: "Before", note: "Insurance should be active before symptoms, injury, or diagnosis." },
      ]}
      sections={[
        {
          title: "Emergency Exam Fee vs. the Total Bill",
          content: (
            <>
              <p>
                The emergency exam gets your pet evaluated quickly, but most serious cases need more than the exam. Blood work, X-rays, ultrasound, IV fluids, oxygen, pain medication, hospitalization, or surgery can each add to the final bill.
              </p>
              <p>
                That is why a visit for vomiting may be relatively modest if your pet stabilizes quickly, while a foreign body surgery, bloat case, toxin ingestion, or urinary blockage can become a major financial event.
              </p>
            </>
          ),
        },
        {
          title: "Common Situations That Raise Cost",
          content: (
            <ul className="space-y-2">
              <li><strong>Toxin ingestion:</strong> May involve decontamination, blood tests, IV fluids, and overnight monitoring.</li>
              <li><strong>Foreign object ingestion:</strong> X-rays, ultrasound, endoscopy, or surgery may be needed.</li>
              <li><strong>Trauma:</strong> Wound repair, pain control, imaging, fracture care, or hospitalization can add up quickly.</li>
              <li><strong>Urinary blockage:</strong> Cats often need emergency catheterization, fluids, and monitoring.</li>
              <li><strong>Bloat or GDV:</strong> A true surgical emergency, especially in deep-chested dogs.</li>
            </ul>
          ),
        },
        {
          title: "How Insurance Changes the Risk",
          content: (
            <>
              <p>
                Pet insurance usually does not make the emergency bill disappear at checkout. Most plans reimburse after you pay the clinic. The real value is reducing the net cost after your deductible and coinsurance, especially when a bill is large.
              </p>
              <p>
                For emergency risk, compare <Link href="/insurance/accident-illness" className="underline underline-offset-2">accident and illness plans</Link> first. Accident-only plans may cover injuries and toxin ingestion, but they usually exclude illnesses such as infections, cancer, pancreatitis, or urinary disease.
              </p>
            </>
          ),
        },
        {
          title: "Build a Practical Emergency Plan",
          content: (
            <ol className="space-y-2">
              <li>Save the nearest 24-hour veterinary hospital in your phone.</li>
              <li>Keep a pet emergency fund or credit option for the upfront bill.</li>
              <li>Enroll before your pet has symptoms, injuries, or diagnoses.</li>
              <li>Choose an annual limit that could handle surgery or hospitalization.</li>
              <li>Know your plan's emergency exam, specialist, and hospitalization rules.</li>
            </ol>
          ),
        },
      ]}
      faq={faq}
      relatedGuides={[
        { title: "Pet Insurance Cost", href: "/insurance/pet-insurance-cost", description: "Compare monthly premiums against likely emergency risk." },
        { title: "Accident-Only Insurance", href: "/insurance/accident-only", description: "Understand the cheapest emergency-focused plan type." },
        { title: "Pet Emergency Kit", href: "/blog/pet-emergency-kit-checklist", description: "Prepare the non-insurance side of emergency care." },
      ]}
      sources={[
        { label: "CareCredit: Average Veterinary Pricing by Procedure", href: "https://www.carecredit.com/vetmed/costs/" },
        { label: "BluePearl: Emergency Vet Costs and Bills", href: "https://bluepearlvet.com/articles/emergency-vet-costs/" },
        { label: "NAIC: A Regulator's Guide to Pet Insurance", href: "https://content.naic.org/article/consumer-insight-a-regulators-guide-to-pet-insurance" },
      ]}
    />
  );
}
