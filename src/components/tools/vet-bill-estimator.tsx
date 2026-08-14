"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Calculator, DollarSign } from "lucide-react";
import { trackAnalyticsEvent } from "@/lib/analytics";

type VetBillMode = "emergency" | "dental" | "puppy";
type CostArea = "lower" | "average" | "higher";

interface VetBillEstimatorProps {
  mode: VetBillMode;
}

const MODE_COPY: Record<
  VetBillMode,
  {
    eyebrow: string;
    title: string;
    description: string;
    scenarioLabel: string;
    scenarios: { value: string; label: string; low: number; high: number }[];
    ctaHref: string;
    ctaLabel: string;
  }
> = {
  emergency: {
    eyebrow: "Emergency planning tool",
    title: "Emergency Vet Bill Estimator",
    description:
      "Build a rough planning range before you are under pressure at an emergency clinic.",
    scenarioLabel: "Emergency type",
    scenarios: [
      { value: "exam", label: "Exam and basic medication", low: 180, high: 650 },
      { value: "diagnostics", label: "Diagnostics, fluids, monitoring", low: 700, high: 2800 },
      { value: "surgery", label: "Surgery or hospitalization", low: 2500, high: 7500 },
    ],
    ctaHref: "/insurance/pet-insurance-cost",
    ctaLabel: "Compare insurance cost",
  },
  dental: {
    eyebrow: "Dental cost tool",
    title: "Dog Dental Cleaning Cost Estimator",
    description:
      "Estimate how X-rays, anesthesia time, extractions, and local prices can change a dental bill.",
    scenarioLabel: "Dental visit type",
    scenarios: [
      { value: "routine", label: "Routine cleaning, no extractions", low: 350, high: 900 },
      { value: "xray", label: "Cleaning with X-rays or bloodwork", low: 600, high: 1400 },
      { value: "extractions", label: "Dental surgery or extractions", low: 1000, high: 3000 },
    ],
    ctaHref: "/insurance/pet-insurance-cost",
    ctaLabel: "Estimate insurance cost",
  },
  puppy: {
    eyebrow: "First-year budget tool",
    title: "Puppy First-Year Vet Cost Estimator",
    description:
      "Plan a practical first-year range for vaccines, exams, preventives, and common add-ons.",
    scenarioLabel: "Care plan",
    scenarios: [
      { value: "basic", label: "Core vaccines and routine exams", low: 250, high: 650 },
      { value: "preventive", label: "Vaccines, preventives, fecal tests", low: 550, high: 1200 },
      { value: "full", label: "Full first-year care with spay/neuter budget", low: 900, high: 2200 },
    ],
    ctaHref: "/blog/puppy-vaccination-schedule",
    ctaLabel: "Build vaccine schedule",
  },
};

const AREA_MULTIPLIER: Record<CostArea, number> = {
  lower: 0.85,
  average: 1,
  higher: 1.3,
};

function money(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}

export function VetBillEstimator({ mode }: VetBillEstimatorProps) {
  const copy = MODE_COPY[mode];
  const [scenario, setScenario] = useState(copy.scenarios[0].value);
  const [area, setArea] = useState<CostArea>("average");
  const [addEmergencyFee, setAddEmergencyFee] = useState(mode === "emergency");
  const [hasTracked, setHasTracked] = useState(false);

  const selectedScenario =
    copy.scenarios.find((item) => item.value === scenario) || copy.scenarios[0];

  const estimate = useMemo(() => {
    const multiplier = AREA_MULTIPLIER[area];
    const urgentFee = addEmergencyFee ? 150 : 0;
    return {
      low: selectedScenario.low * multiplier + urgentFee,
      high: selectedScenario.high * multiplier + urgentFee,
    };
  }, [addEmergencyFee, area, selectedScenario]);

  function track(field: string, value: string | boolean) {
    if (!hasTracked) {
      setHasTracked(true);
      trackAnalyticsEvent("vet_bill_estimator_start", { mode });
    }

    trackAnalyticsEvent("vet_bill_estimator_change", {
      mode,
      changed_field: field,
      changed_value: String(value),
      estimate_low: Math.round(estimate.low),
      estimate_high: Math.round(estimate.high),
    });
  }

  function updateScenario(value: string) {
    setScenario(value);
    track("scenario", value);
  }

  function updateArea(value: CostArea) {
    setArea(value);
    track("cost_area", value);
  }

  function updateEmergencyFee(value: boolean) {
    setAddEmergencyFee(value);
    track("emergency_fee", value);
  }

  return (
    <section className="not-prose my-8 overflow-hidden rounded-xl border bg-card">
      <div className="border-b bg-muted/40 p-5">
        <div className="flex items-center gap-2 text-sm font-semibold text-primary">
          <Calculator className="h-4 w-4" />
          <span>{copy.eyebrow}</span>
        </div>
        <h2 className="mt-2 text-xl font-bold text-foreground">{copy.title}</h2>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
          {copy.description}
        </p>
      </div>

      <div className="grid gap-5 p-5 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm font-medium text-foreground">{copy.scenarioLabel}</span>
            <select
              value={scenario}
              onChange={(event) => updateScenario(event.target.value)}
              className="h-10 w-full rounded-lg border bg-background px-3 text-sm"
            >
              {copy.scenarios.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-foreground">Vet cost area</span>
            <select
              value={area}
              onChange={(event) => updateArea(event.target.value as CostArea)}
              className="h-10 w-full rounded-lg border bg-background px-3 text-sm"
            >
              <option value="lower">Lower-cost area</option>
              <option value="average">Average area</option>
              <option value="higher">Higher-cost city</option>
            </select>
          </label>

          <label className="flex min-h-14 items-center gap-3 rounded-lg border bg-background p-3 sm:col-span-2">
            <input
              type="checkbox"
              checked={addEmergencyFee}
              onChange={(event) => updateEmergencyFee(event.target.checked)}
              className="h-4 w-4 rounded border-input"
            />
            <span>
              <span className="block text-sm font-medium text-foreground">
                Include urgent-care or after-hours fee
              </span>
              <span className="block text-xs text-muted-foreground">
                Useful for emergency hospitals, late-night visits, or same-day urgent care.
              </span>
            </span>
          </label>
        </div>

        <div className="rounded-xl border bg-background p-5">
          <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
            <DollarSign className="h-4 w-4" />
            <span>Planning range</span>
          </div>
          <p className="mt-3 text-3xl font-bold text-foreground">
            {money(estimate.low)}-{money(estimate.high)}
          </p>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            Educational estimate only. Clinics price differently, and a veterinarian may recommend additional diagnostics or treatment after exam findings.
          </p>
          <a
            href={copy.ctaHref}
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            {copy.ctaLabel}
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
