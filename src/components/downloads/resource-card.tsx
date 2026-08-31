"use client";

import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { DownloadLink } from "@/components/downloads/download-link";
import { NewsletterSignup } from "@/components/newsletter/newsletter-signup";
import { trackAnalyticsEvent } from "@/lib/analytics";

type DownloadVariant = "poison" | "puppy" | "insurance" | "emergency" | "cleaning" | "both" | "costs";

interface DownloadResourceCardProps {
  variant: DownloadVariant;
}

const RESOURCES = {
  poison: {
    title: "Pet Poisoning Emergency Checklist",
    description:
      "A one-page checklist for symptoms, product labels, emergency contacts, and what to bring to the clinic.",
    href: "/downloads/pet-poisoning-emergency-checklist.pdf",
    followupHref: "/toxicity",
    followupLabel: "Search the toxicity checker",
  },
  puppy: {
    title: "Puppy First-Year Vet Cost Checklist",
    description:
      "A printable planning sheet for vaccine visits, preventives, spay/neuter budget, and insurance comparison notes.",
    href: "/downloads/puppy-first-year-vet-cost-checklist.pdf",
    followupHref: "/blog/puppy-vaccination-schedule",
    followupLabel: "Build a vaccine schedule",
  },
  insurance: {
    title: "Pet Insurance Cost Comparison Checklist",
    description:
      "A quote-comparison sheet for deductibles, reimbursement, annual limits, waiting periods, and exclusions.",
    href: "/downloads/pet-insurance-cost-comparison-checklist.pdf",
    followupHref: "/insurance/pet-insurance-cost",
    followupLabel: "Estimate monthly cost",
  },
  emergency: {
    title: "Emergency Vet Cost Planning Checklist",
    description:
      "A one-page worksheet for emergency hospitals, upfront payment options, insurance details, and urgent-care notes.",
    href: "/downloads/emergency-vet-cost-checklist.pdf",
    followupHref: "/insurance/emergency-vet-cost",
    followupLabel: "Estimate emergency cost",
  },
  cleaning: {
    title: "Pet-Safe Cleaning Checklist",
    description:
      "A printable dry-before-return checklist for floors, litter boxes, bowls, disinfectants, and exposure notes.",
    href: "/downloads/pet-safe-cleaning-checklist.pdf",
    followupHref: "/pet-safe-cleaning",
    followupLabel: "Open cleaning hub",
  },
};

export function DownloadResourceCard({ variant }: DownloadResourceCardProps) {
  const resources =
    variant === "both"
      ? [RESOURCES.poison, RESOURCES.puppy]
      : variant === "costs"
        ? [RESOURCES.insurance, RESOURCES.emergency]
        : [RESOURCES[variant]];
  const interest = resources.map((resource) => resource.title).join(", ");

  return (
    <section className="not-prose my-8 rounded-xl border bg-primary/5 p-5">
      <div className="flex items-center gap-2 text-sm font-semibold text-primary">
        <Download className="h-4 w-4" />
        <span>Free printable resource</span>
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {resources.map((resource) => (
          <div key={resource.href} className="rounded-xl border bg-card p-5">
            <h2 className="text-base font-bold text-foreground">{resource.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{resource.description}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <DownloadLink
                href={resource.href}
                title={resource.title}
                variant={variant}
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
              >
                Download PDF
                <Download className="h-4 w-4" />
              </DownloadLink>
              <Link
                href={resource.followupHref}
                onClick={() =>
                  trackAnalyticsEvent("download_followup_click", {
                    resource_title: resource.title,
                    followup_href: resource.followupHref,
                    download_variant: variant,
                  })
                }
                className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium hover:bg-muted"
              >
                {resource.followupLabel}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5 border-t pt-4">
        <NewsletterSignup
          compact
          source={`download_${variant}`}
          interest={interest}
          title="Get new pet safety checklists"
          description="Receive future printable checklists and timely pet safety updates tied to this topic."
          buttonLabel="Send updates"
        />
      </div>
    </section>
  );
}
