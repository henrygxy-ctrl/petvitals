import type { Metadata } from "next";
import Link from "next/link";
import { JsonLdBreadcrumb } from "@/components/seo/json-ld";
import { SITE_NAME, SITE_BASE_URL } from "@/lib/constants";
import { ArrowLeft, Scale, TrendingUp, Bell, LineChart, CalendarCheck, Share2 } from "lucide-react";

export const metadata: Metadata = {
  title: `${SITE_NAME} — Free Dog & Cat Weight Tracker | ${SITE_NAME}`,
  description:
    "Track your pet\u2019s weight over time with charts and trends. Log weigh-ins, set goals, monitor body condition score, and share progress with your vet. Free, no ads.",
  alternates: { canonical: `${SITE_BASE_URL}/weight-tracking` },
  openGraph: {
    title: `Free Pet Weight Tracker | ${SITE_NAME}`,
    description:
      "Log your pet\u2019s weight, track trends with charts, and monitor body condition score. Free tool for dog and cat owners.",
    url: `${SITE_BASE_URL}/weight-tracking`,
    siteName: SITE_NAME,
    type: "website",
    images: [{ url: `${SITE_BASE_URL}/og-image.png`, width: 1200, height: 630, alt: "PetVitals Weight Tracker" }],
  },
};

const breadcrumbs = [
  { name: "Home", url: SITE_BASE_URL },
  { name: "Weight Tracking", url: `${SITE_BASE_URL}/weight-tracking` },
];

const features = [
  {
    icon: Scale,
    title: "Log Weigh-Ins",
    desc: "Record your pet\u2019s weight on any schedule — daily, weekly, or monthly. Track multiple pets in one dashboard.",
  },
  {
    icon: TrendingUp,
    title: "Visual Trends",
    desc: "See weight changes over time with clear, interactive charts. Spot unhealthy trends before they become problems.",
  },
  {
    icon: LineChart,
    title: "Body Condition Score",
    desc: "Track BCS (1–9 scale) alongside weight. The gold standard for assessing whether your pet is underweight, ideal, or overweight.",
  },
  {
    icon: Bell,
    title: "Goal Tracking",
    desc: "Set target weights and get notified when your pet hits milestones. Perfect for weight-loss programs and growing puppies.",
  },
  {
    icon: CalendarCheck,
    title: "Vet-Ready Reports",
    desc: "Export your pet\u2019s weight history as a clean report to share with your veterinarian at checkups.",
  },
  {
    icon: Share2,
    title: "Community Sharing",
    desc: "Optionally share your pet\u2019s progress with the PetVitals community. Inspire others and celebrate milestones together.",
  },
];

const steps = [
  { num: "1", title: "Create a free account", desc: "Sign up in under 30 seconds. No credit card required." },
  { num: "2", title: "Add your pet", desc: "Enter name, species, breed, and starting weight." },
  { num: "3", title: "Log & track", desc: "Record weigh-ins, BCS scores, and activity levels as you go." },
];

export default function WeightTrackingPage() {
  return (
    <>
      <JsonLdBreadcrumb items={breadcrumbs} />
      <div className="min-h-screen flex flex-col">
        <header className="border-b">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-2">
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Link>
            <div className="ml-2 font-bold tracking-tight">{SITE_NAME}</div>
          </div>
        </header>

        <main className="flex-1 py-8 sm:py-12">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            {/* Hero */}
            <div className="text-center mb-12">
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Pet Weight Tracker
              </h1>
              <p className="mt-3 text-muted-foreground text-base sm:text-lg max-w-xl mx-auto">
                Log your pet\u2019s weight, track trends, and monitor body condition — all in one place.
                Free, private, and built for pet parents who want data-driven health insights.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/sign-up"
                  className="inline-flex items-center justify-center gap-1.5 px-6 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  Get Started Free
                </Link>
                <Link
                  href="/sign-in?redirect=/dashboard"
                  className="inline-flex items-center justify-center gap-1.5 px-6 py-2.5 rounded-full border text-sm font-medium hover:bg-muted transition-colors"
                >
                  Sign In
                </Link>
              </div>
            </div>

            {/* Features grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
              {features.map((feat, i) => (
                <div key={i} className="p-5 rounded-xl border bg-card">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                    <feat.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-sm mb-1.5">{feat.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{feat.desc}</p>
                </div>
              ))}
            </div>

            {/* How it works */}
            <section className="mb-16">
              <h2 className="text-xl font-bold text-center mb-8">How It Works</h2>
              <div className="grid sm:grid-cols-3 gap-6">
                {steps.map((step, i) => (
                  <div key={i} className="text-center">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                      <span className="text-xl font-bold text-primary">{step.num}</span>
                    </div>
                    <h3 className="font-semibold text-sm mb-1">{step.title}</h3>
                    <p className="text-xs text-muted-foreground">{step.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Why it matters */}
            <div className="p-6 rounded-xl border bg-muted/30 mb-12">
              <h2 className="font-semibold mb-3">Why Track Your Pet\u2019s Weight?</h2>
              <div className="text-sm text-muted-foreground space-y-2">
                <p>
                  <strong className="text-foreground">60% of US cats and 56% of US dogs</strong> are overweight or obese,
                  according to the Association for Pet Obesity Prevention. Excess weight is linked to diabetes,
                  arthritis, heart disease, and shortened lifespan.
                </p>
                <p>
                  Regular weight tracking is the single most effective way to catch unhealthy trends early.
                  A 10% weight change in either direction is a signal worth investigating — whether it\u2019s
                  unexpected gain in an adult pet or unexplained loss in a senior.
                </p>
                <p>
                  <strong className="text-foreground">Body Condition Score (BCS)</strong> adds context that weight alone
                  cannot. A 9-point scale used by veterinarians worldwide, BCS accounts for body composition
                  differences across breeds and helps you see past the number on the scale.
                </p>
              </div>
            </div>

            {/* Cross-link to feeding calculator */}
            <div className="p-5 rounded-xl border bg-card text-center">
              <p className="text-sm text-muted-foreground mb-2">
                Already tracking weight? Figure out the right portions.
              </p>
              <Link
                href="/feeding-calculator"
                className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
              >
                Open Feeding Calculator &rarr;
              </Link>
            </div>

            {/* Bottom CTA */}
            <div className="mt-12 text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Ready to start tracking? Create your free account and add your first pet in under a minute.
              </p>
              <Link
                href="/sign-up"
                className="inline-flex items-center justify-center gap-1.5 px-6 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Start Tracking Now
              </Link>
            </div>
          </div>
        </main>

        <footer className="border-t py-6 text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} {SITE_NAME}. Always consult your veterinarian.
        </footer>
      </div>
    </>
  );
}