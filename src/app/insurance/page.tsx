import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME, SITE_BASE_URL } from "@/lib/constants";
import { JsonLdBreadcrumb, JsonLdFAQ } from "@/components/seo/json-ld";
import { InsuranceComparison } from "@/components/affiliate/insurance-comparison";
import { INSURANCE_PARTNERS } from "@/lib/affiliate";
import { Car, Stethoscope, Syringe, Clock, ArrowLeft, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: `Pet Insurance Guide — Compare Coverage Types | ${SITE_NAME}`,
  description:
    "Understand the four main types of pet insurance: accident-only, accident & illness, comprehensive with wellness, and lifetime/chronic condition coverage. Free, unbiased guide.",
  alternates: { canonical: `${SITE_BASE_URL}/insurance` },
  openGraph: {
    title: `Pet Insurance Guide — Compare Coverage Types | ${SITE_NAME}`,
    description:
      "Free, unbiased guide to pet insurance types. Accident-only, accident & illness, comprehensive, and lifetime coverage explained.",
    url: `${SITE_BASE_URL}/insurance`,
    siteName: SITE_NAME,
    type: "website",
  },
};

const plans = [
  {
    icon: Car,
    title: "Accident-Only",
    href: "/insurance/accident-only",
    price: "Most affordable",
    desc: "Covers emergency treatment for accidental injuries like broken bones, cuts, toxin ingestion, and car accidents. A good starting point for young, healthy pets on a budget.",
    covers: ["Broken bones", "Cuts & lacerations", "Toxin ingestion", "Car accidents", "Bite wounds"],
  },
  {
    icon: Stethoscope,
    title: "Accident & Illness",
    href: "/insurance/accident-illness",
    price: "Most popular choice",
    desc: "The most common plan type. Covers both unexpected injuries and illnesses, including serious conditions like cancer, infections, and diagnostic tests.",
    covers: ["All accident coverage", "Cancer treatment", "Infections & diseases", "Diagnostic tests", "Prescription medications"],
  },
  {
    icon: Syringe,
    title: "Comprehensive / Wellness",
    href: "/insurance/comprehensive",
    price: "Full coverage",
    desc: "Adds routine and preventive care on top of accident and illness coverage. Includes annual checkups, vaccinations, dental cleaning, and spay/neuter.",
    covers: ["All illness & accident", "Annual checkups", "Vaccinations", "Dental cleaning", "Spay/neuter"],
  },
  {
    icon: Clock,
    title: "Lifetime / Chronic Conditions",
    href: "/insurance/lifetime",
    price: "Long-term protection",
    desc: "Covers chronic conditions that require ongoing treatment year after year, without caps per condition. Ideal for pets with hereditary or long-term health issues.",
    covers: ["Ongoing conditions", "Hereditary issues", "Hip dysplasia", "Diabetes management", "Annual coverage renewal"],
  },
];

const commercialGuides = [
  {
    title: "Pet Insurance Cost",
    href: "/insurance/pet-insurance-cost",
    desc: "Monthly cost ranges, quote factors, and ways to lower premiums without buying too little coverage.",
  },
  {
    title: "Emergency Vet Cost",
    href: "/insurance/emergency-vet-cost",
    desc: "What urgent visits can cost and how insurance changes the risk of large emergency bills.",
  },
  {
    title: "Best Pet Insurance for Dogs",
    href: "/insurance/best-pet-insurance-for-dogs",
    desc: "Compare dog plans by age, breed risk, deductible, reimbursement, and emergency protection.",
  },
];

const breadcrumbs = [
  { name: "Home", url: SITE_BASE_URL },
  { name: "Pet Insurance", url: `${SITE_BASE_URL}/insurance` },
];

const faqQuestions = [
  {
    question: "What type of pet insurance should I get?",
    answer: "It depends on your pet's age, breed, and health. Accident-only plans are cheapest and suit young healthy pets. Accident & illness is the most popular choice. Comprehensive plans add wellness coverage for routine care. Lifetime plans cover chronic conditions long-term."
  },
  {
    question: "How much does pet insurance cost?",
    answer: "Pet insurance typically ranges from $10 to $100 per month depending on coverage level, deductible, reimbursement rate, and your pet's species, breed, age, and location. Accident-only plans start around $10/mo, while comprehensive plans can be $40-$80/mo."
  },
  {
    question: "Does pet insurance cover pre-existing conditions?",
    answer: "No, most pet insurance providers do not cover pre-existing conditions — anything diagnosed or showing symptoms before the policy starts. That's why it's best to enroll your pet when they're young and healthy."
  },
  {
    question: "Can I use any veterinarian with pet insurance?",
    answer: "Most pet insurance plans are reimbursement-based and let you visit any licensed veterinarian in the US or Canada. Some providers offer direct vet payment options, but network restrictions are rare."
  },
];

export default function InsurancePage() {
  return (
    <>
      <JsonLdFAQ questions={faqQuestions} />
      <JsonLdBreadcrumb items={breadcrumbs} />
      <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center gap-2">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          <span className="font-bold tracking-tight ml-2">{SITE_NAME}</span>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto px-4 py-12 w-full">
        <div className="mb-10">
          <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Pet Insurance Guide
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold mt-2 mb-4">
            Understanding Pet Insurance
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            A straightforward guide to the types of pet insurance available. We don&apos;t sell insurance
            — we just want you to know your options before the unexpected happens.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href="#providers"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
            >
              Compare provider prices
              <ArrowRight className="h-4 w-4" />
            </a>
            <Link
              href="/blog/pet-insurance-worth-it"
              className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium hover:bg-muted transition-colors"
            >
              Is insurance worth it?
            </Link>
          </div>
        </div>

        {/* Plan Cards */}
        <div className="grid sm:grid-cols-2 gap-6 mb-12">
          {plans.map((plan, i) => (
            <Link
              key={i}
              href={plan.href}
              className="p-6 rounded-xl border bg-card hover:border-primary/30 transition-colors group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <plan.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold group-hover:text-primary transition-colors">
                    {plan.title}
                  </h3>
                  <p className="text-xs text-muted-foreground">{plan.price}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4">{plan.desc}</p>
              <div>
                <p className="text-xs font-semibold text-foreground/60 mb-2 uppercase tracking-wide">
                  Typically Covers
                </p>
                <ul className="grid grid-cols-2 gap-x-2 gap-y-1">
                  {plan.covers.map((item) => (
                    <li
                      key={item}
                      className="text-xs text-muted-foreground flex items-center gap-1.5"
                    >
                      <span className="w-1 h-1 rounded-full bg-emerald-500 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-4 flex items-center gap-1 text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                View details
                <ArrowRight className="h-3 w-3" />
              </div>
            </Link>
          ))}
        </div>

        <section className="mb-12">
          <div className="mb-4">
            <h2 className="text-xl font-bold">Insurance Cost Guides</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Commercial-intent guides for comparing monthly premiums, emergency risk, and dog-specific coverage.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {commercialGuides.map((guide) => (
              <Link
                key={guide.href}
                href={guide.href}
                className="rounded-xl border bg-card p-5 hover:border-primary/40 transition-colors group"
              >
                <h3 className="text-sm font-semibold group-hover:text-primary transition-colors">
                  {guide.title}
                </h3>
                <p className="mt-2 text-xs text-muted-foreground">{guide.desc}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary">
                  Read guide
                  <ArrowRight className="h-3 w-3" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section id="providers" className="mb-12 scroll-mt-20">
          <InsuranceComparison partners={INSURANCE_PARTNERS} />
        </section>

        {/* How to Choose */}
        <section className="prose prose-sm max-w-none text-foreground/80 mb-12">
          <h2 className="text-xl font-bold text-foreground">How to Choose the Right Plan</h2>
          <p>
            The right plan depends on your pet&apos;s age, breed, health history, and your budget.
            Here&apos;s a simple framework:
          </p>
          <ul>
            <li>
              <strong>Young, healthy pet on a budget:</strong> Start with accident-only or accident &
              illness. You can always upgrade later.
            </li>
            <li>
              <strong>Puppy or kitten in their first year:</strong> Comprehensive with wellness rider
              — this is the most vet-intensive year with vaccines, spay/neuter, and frequent checkups.
            </li>
            <li>
              <strong>Breed prone to hereditary conditions:</strong> Lifetime coverage — breeds like
              German Shepherds (hip dysplasia), Bulldogs (respiratory issues), or Golden Retrievers
              (cancer) benefit from plans without per-condition caps.
            </li>
            <li>
              <strong>Senior pet:</strong> Accident & illness at minimum. Lifetime coverage if
              available and affordable. Note that some insurers have age limits for new policies.
            </li>
          </ul>
        </section>

        {/* Important Notes */}
        <div className="p-5 rounded-xl border bg-muted/50 mb-8">
          <h2 className="font-semibold mb-3">Before You Buy: Key Questions to Ask</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <strong className="text-foreground">Waiting periods:</strong> How long after enrollment
              before coverage begins? (Typically 2–14 days for accidents, 14–30 days for illnesses)
            </li>
            <li>
              <strong className="text-foreground">Pre-existing conditions:</strong> Are they excluded?
              How does the insurer define pre-existing? Some exclude conditions from the past 12–18 months.
            </li>
            <li>
              <strong className="text-foreground">Reimbursement model:</strong> What percentage do they
              pay (70%, 80%, 90%)? Is there an annual or per-condition deductible?
            </li>
            <li>
              <strong className="text-foreground">Annual limits:</strong> Is there a cap on how much
              they&apos;ll pay per year or per condition?
            </li>
            <li>
              <strong className="text-foreground">Premium increases:</strong> How do premiums change as
              your pet ages? Some insurers raise rates significantly after age 7–8.
            </li>
            <li>
              <strong className="text-foreground">Network restrictions:</strong> Can you use any
              licensed veterinarian, or are you limited to a network?
            </li>
          </ul>
        </div>

        <div className="p-5 rounded-xl border bg-card text-center">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Important:</strong> Coverage details, exclusions,
            waiting periods, and reimbursement rates vary significantly between providers. Always read
            the full policy document and compare multiple quotes before choosing. This guide is for
            educational purposes only and does not constitute financial or insurance advice.
          </p>
        </div>
      </main>

      <footer className="border-t py-6 text-center text-xs text-muted-foreground">
        <div className="max-w-4xl mx-auto px-4">
          &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
        </div>
      </footer>
    </div>
    </>
  );
}
