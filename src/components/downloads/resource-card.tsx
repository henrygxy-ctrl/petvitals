import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";

type DownloadVariant = "poison" | "puppy" | "both";

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
};

export function DownloadResourceCard({ variant }: DownloadResourceCardProps) {
  const resources =
    variant === "both" ? [RESOURCES.poison, RESOURCES.puppy] : [RESOURCES[variant]];

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
              <a
                href={resource.href}
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
              >
                Download PDF
                <Download className="h-4 w-4" />
              </a>
              <Link
                href={resource.followupHref}
                className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium hover:bg-muted"
              >
                {resource.followupLabel}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
