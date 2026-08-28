import { AlertTriangle, CalendarDays, DollarSign, Droplets, ShieldCheck } from "lucide-react";

export function ToxicityRiskInfographic({ pet }: { pet: "dogs" | "cats" }) {
  const species = pet === "dogs" ? "Dog" : "Cat";
  const rows = [
    { label: "Emergency", examples: "xylitol, grapes, lilies, sago palm", tone: "danger" },
    { label: "Call vet", examples: "chocolate, onion, medication, cleaners", tone: "toxic" },
    { label: "Use caution", examples: "fatty foods, dairy, hard seeds, strong scents", tone: "caution" },
    { label: "Usually safer", examples: "plain apple slices, carrots, blueberries", tone: "safe" },
  ];

  return (
    <section className="not-prose my-8 rounded-xl border bg-card p-5" role="img" aria-label={`${species} toxicity risk level infographic`}>
      <div className="flex items-center gap-2 text-sm font-semibold text-primary">
        <ShieldCheck className="h-4 w-4" />
        <span>{species} Toxicity Risk Map</span>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-4">
        {rows.map((row) => (
          <div key={row.label} className={`rounded-xl border p-4 ${riskClass(row.tone)}`}>
            <p className="text-sm font-bold">{row.label}</p>
            <p className="mt-2 text-xs leading-relaxed opacity-90">{row.examples}</p>
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        Use the individual item page for pet-specific symptoms and next steps. Risk depends on amount, pet size, timing, and health history.
      </p>
    </section>
  );
}

export function CleaningSafetyInfographic() {
  const rows = [
    { label: "Keep pets out", detail: "Close the room while cleaning", icon: ShieldCheck },
    { label: "Ventilate", detail: "Open windows or run exhaust fans", icon: Droplets },
    { label: "Let it dry", detail: "Residue on paws becomes ingestion", icon: CalendarDays },
    { label: "Avoid high-risk ingredients", detail: "Phenols, essential oils, ammonia, heavy fragrance", icon: AlertTriangle },
  ];

  return (
    <section className="not-prose my-8 rounded-xl border bg-card p-5" role="img" aria-label="Pet-safe cleaning routine infographic">
      <div className="flex items-center gap-2 text-sm font-semibold text-primary">
        <Droplets className="h-4 w-4" />
        <span>Pet-Safe Cleaning Routine</span>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-4">
        {rows.map((row, index) => (
          <div key={row.label} className="rounded-xl border bg-background p-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
              <row.icon className="h-4 w-4" />
            </div>
            <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Step {index + 1}</p>
            <p className="mt-1 text-sm font-bold text-foreground">{row.label}</p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{row.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function PuppyTimelineInfographic() {
  const rows = [
    { age: "6-8 weeks", care: "DHPP start, exam, deworming, fecal test" },
    { age: "10-12 weeks", care: "DHPP booster, leptospirosis discussion, lifestyle vaccines" },
    { age: "14-16 weeks", care: "Final puppy booster, rabies, lepto booster, socialization plan" },
    { age: "12-16 months", care: "First adult booster, long-term prevention" },
  ];

  return (
    <section className="not-prose my-8 rounded-xl border bg-card p-5" role="img" aria-label="Puppy first-year care timeline infographic">
      <div className="flex items-center gap-2 text-sm font-semibold text-primary">
        <CalendarDays className="h-4 w-4" />
        <span>Puppy First-Year Timeline</span>
      </div>
      <div className="mt-5 space-y-3">
        {rows.map((row, index) => (
          <div key={row.age} className="grid grid-cols-[88px_minmax(0,1fr)] gap-3 sm:grid-cols-[120px_minmax(0,1fr)]">
            <div className="rounded-lg bg-primary px-3 py-2 text-center text-xs font-semibold text-primary-foreground">
              {row.age}
            </div>
            <div className="rounded-lg border bg-background px-4 py-2 text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Visit {index + 1}: </span>
              {row.care}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function VetCostInfographic() {
  const rows = [
    { label: "Routine", range: "$100-$700", detail: "Exam, vaccines, basic dental, minor illness" },
    { label: "Urgent", range: "$700-$2.8k", detail: "Diagnostics, fluids, monitoring, toxin care" },
    { label: "Major", range: "$2.5k-$7.5k+", detail: "Surgery, hospitalization, specialist care" },
  ];

  return (
    <section className="not-prose my-8 rounded-xl border bg-card p-5" role="img" aria-label="Veterinary cost range infographic">
      <div className="flex items-center gap-2 text-sm font-semibold text-primary">
        <DollarSign className="h-4 w-4" />
        <span>Vet Cost Range Map</span>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {rows.map((row) => (
          <div key={row.label} className="rounded-xl border bg-background p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{row.label}</p>
            <p className="mt-2 text-2xl font-bold text-foreground">{row.range}</p>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{row.detail}</p>
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        Ranges are planning estimates. Local prices, pet size, diagnostics, and treatment choices can move the final bill.
      </p>
    </section>
  );
}

function riskClass(tone: string) {
  if (tone === "danger") return "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950/20 dark:text-red-300";
  if (tone === "toxic") return "border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-900 dark:bg-orange-950/20 dark:text-orange-300";
  if (tone === "caution") return "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950/20 dark:text-amber-300";
  return "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/20 dark:text-emerald-300";
}
