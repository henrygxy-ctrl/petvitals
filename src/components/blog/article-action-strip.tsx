import Link from "next/link";
import { ArrowRight, Search, ShieldCheck } from "lucide-react";

interface ArticleActionStripProps {
  slug: string;
}

const CLEANING_SLUGS = new Set([
  "best-pet-safe-cleaning-products",
  "cat-friendly-cleaning-products",
  "pet-safe-floor-cleaners-dogs-cats",
  "disinfectants-safe-for-cats",
  "can-cats-walk-on-floors-after-mopping",
  "is-vinegar-floor-cleaner-safe-for-pets",
  "are-essential-oil-cleaners-safe-for-cats",
  "pet-friendly-cleaning-products",
]);

const INSURANCE_SLUGS = new Set([
  "pet-insurance-worth-it",
  "pet-insurance-waiting-period-explained",
  "does-pet-insurance-cover-poisoning",
  "does-pet-insurance-cover-broken-bones",
  "does-pet-insurance-cover-emergency-surgery",
]);

const PUPPY_SLUGS = new Set([
  "bringing-home-new-puppy-checklist",
  "puppy-vaccination-schedule",
  "puppy-first-vet-visit-cost",
]);

function getActions(slug: string) {
  if (CLEANING_SLUGS.has(slug)) {
    return {
      title: "Choose your next step",
      description: "Check a product, compare the cleaning routine, or prepare a printable guide.",
      primary: { label: "Open the toxicity checker", href: "/toxicity" },
      secondary: { label: "Visit the cleaning hub", href: "/pet-safe-cleaning" },
    };
  }

  if (INSURANCE_SLUGS.has(slug)) {
    return {
      title: "Plan the financial next step",
      description: "Compare coverage questions with costs before you request a quote.",
      primary: { label: "Compare pet insurance cost", href: "/insurance/pet-insurance-cost" },
      secondary: { label: "Open the insurance hub", href: "/insurance" },
    };
  }

  if (PUPPY_SLUGS.has(slug)) {
    return {
      title: "Keep your puppy plan moving",
      description: "Use the planning tools for vaccines, first visits, and early-care costs.",
      primary: { label: "Open the puppy care hub", href: "/puppy-care" },
      secondary: { label: "Compare pet insurance cost", href: "/insurance/pet-insurance-cost" },
    };
  }

  return {
    title: "Find a practical next step",
    description: "Use PetVitals tools to check a risk or plan for common veterinary costs.",
    primary: { label: "Open the toxicity checker", href: "/toxicity" },
    secondary: { label: "Browse vet costs", href: "/vet-costs" },
  };
}

export function ArticleActionStrip({ slug }: ArticleActionStripProps) {
  const actions = getActions(slug);

  return (
    <section
      className="mb-8 rounded-xl border-l-4 border-emerald-500 bg-emerald-50/70 p-4 dark:bg-emerald-950/20"
      aria-label="Helpful next steps"
    >
      <div className="flex items-start gap-3">
        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700 dark:text-emerald-300" />
        <div className="min-w-0">
          <h2 className="text-sm font-semibold text-foreground">{actions.title}</h2>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{actions.description}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Link
              href={actions.primary.href}
              className="inline-flex min-h-11 items-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
            >
              <Search className="h-4 w-4" />
              {actions.primary.label}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={actions.secondary.href}
              className="inline-flex min-h-11 items-center gap-2 rounded-md border bg-background px-3 py-2 text-sm font-medium hover:bg-muted"
            >
              {actions.secondary.label}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
