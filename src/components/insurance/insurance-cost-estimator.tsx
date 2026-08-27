"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, Calculator, DollarSign, ShieldCheck } from "lucide-react";
import { Label } from "@/components/ui/label";
import { trackAnalyticsEvent } from "@/lib/analytics";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Species = "dog" | "cat";
type Coverage = "accident-illness" | "accident-only";
type AgeBand = "young" | "adult" | "mature" | "senior";
type RiskLevel = "lower" | "average" | "higher";
type CostArea = "lower" | "average" | "higher";
type AnnualLimit = "5000" | "10000" | "unlimited";

interface InsuranceCostEstimatorProps {
  defaultSpecies?: Species;
  lockSpecies?: boolean;
  title?: string;
}

const BASE_MONTHLY_COST: Record<Species, Record<Coverage, number>> = {
  dog: {
    "accident-illness": 70,
    "accident-only": 16,
  },
  cat: {
    "accident-illness": 36,
    "accident-only": 9,
  },
};

const AGE_MULTIPLIER: Record<AgeBand, number> = {
  young: 0.9,
  adult: 1,
  mature: 1.15,
  senior: 1.45,
};

const RISK_MULTIPLIER: Record<RiskLevel, number> = {
  lower: 0.9,
  average: 1,
  higher: 1.22,
};

const AREA_MULTIPLIER: Record<CostArea, number> = {
  lower: 0.88,
  average: 1,
  higher: 1.24,
};

const DEDUCTIBLE_MULTIPLIER: Record<string, number> = {
  "250": 1.16,
  "500": 1,
  "750": 0.92,
  "1000": 0.84,
};

const REIMBURSEMENT_MULTIPLIER: Record<string, number> = {
  "70": 0.9,
  "80": 1,
  "90": 1.12,
};

const LIMIT_MULTIPLIER: Record<AnnualLimit, number> = {
  "5000": 0.9,
  "10000": 1,
  unlimited: 1.18,
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function roundDollar(value: number) {
  return Math.max(1, Math.round(value));
}

function getAnnualLimitValue(limit: AnnualLimit) {
  return limit === "unlimited" ? Number.POSITIVE_INFINITY : Number(limit);
}

export function InsuranceCostEstimator({
  defaultSpecies = "dog",
  lockSpecies = false,
  title = "Pet Insurance Cost Calculator",
}: InsuranceCostEstimatorProps) {
  const estimatorRef = useRef<HTMLDivElement>(null);
  const hasTrackedViewRef = useRef(false);
  const [species, setSpecies] = useState<Species>(defaultSpecies);
  const [coverage, setCoverage] = useState<Coverage>("accident-illness");
  const [ageBand, setAgeBand] = useState<AgeBand>("adult");
  const [riskLevel, setRiskLevel] = useState<RiskLevel>("average");
  const [costArea, setCostArea] = useState<CostArea>("average");
  const [deductible, setDeductible] = useState("500");
  const [reimbursement, setReimbursement] = useState("80");
  const [annualLimit, setAnnualLimit] = useState<AnnualLimit>("10000");
  const [wellness, setWellness] = useState(false);
  const [hasTrackedInteraction, setHasTrackedInteraction] = useState(false);

  const estimate = useMemo(() => {
    const base = BASE_MONTHLY_COST[species][coverage];
    const wellnessAddon = wellness ? (species === "dog" ? 18 : 14) : 0;
    const monthly =
      base *
        AGE_MULTIPLIER[ageBand] *
        RISK_MULTIPLIER[riskLevel] *
        AREA_MULTIPLIER[costArea] *
        DEDUCTIBLE_MULTIPLIER[deductible] *
        REIMBURSEMENT_MULTIPLIER[reimbursement] *
        LIMIT_MULTIPLIER[annualLimit] +
      wellnessAddon;

    const low = roundDollar(monthly * 0.78);
    const high = roundDollar(monthly * 1.35);
    const emergencyBill = 3000;
    const annualLimitValue = getAnnualLimitValue(annualLimit);
    const eligibleAfterDeductible = Math.max(0, emergencyBill - Number(deductible));
    const estimatedPayout = Math.min(
      eligibleAfterDeductible * (Number(reimbursement) / 100),
      annualLimitValue
    );

    return {
      low,
      high,
      midpoint: roundDollar(monthly),
      annualLow: low * 12,
      annualHigh: high * 12,
      estimatedPayout,
      estimatedOutOfPocket: emergencyBill - estimatedPayout,
    };
  }, [
    ageBand,
    annualLimit,
    costArea,
    coverage,
    deductible,
    reimbursement,
    riskLevel,
    species,
    wellness,
  ]);

  useEffect(() => {
    const estimator = estimatorRef.current;
    if (!estimator || hasTrackedViewRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const isVisible = entries.some((entry) => entry.isIntersecting);
        if (!isVisible || hasTrackedViewRef.current) return;

        hasTrackedViewRef.current = true;
        trackAnalyticsEvent("insurance_calculator_view", {
          calculator_title: title,
          species,
          coverage,
          estimate_midpoint: estimate.midpoint,
        });
        observer.disconnect();
      },
      { threshold: 0.4 }
    );

    observer.observe(estimator);
    return () => observer.disconnect();
  }, [coverage, estimate.midpoint, species, title]);

  function trackCalculatorInteraction(field: string, value: string | boolean) {
    if (!hasTrackedInteraction) {
      setHasTrackedInteraction(true);
      trackAnalyticsEvent("insurance_calculator_start", {
        calculator_title: title,
        species,
        coverage,
        estimate_midpoint: estimate.midpoint,
      });
    }

    trackAnalyticsEvent("insurance_calculator_change", {
      calculator_title: title,
      changed_field: field,
      changed_value: String(value),
      species,
      coverage,
      deductible,
      reimbursement,
      annual_limit: annualLimit,
      estimate_low: estimate.low,
      estimate_high: estimate.high,
    });
  }

  function updateSpecies(value: Species) {
    setSpecies(value);
    trackCalculatorInteraction("species", value);
  }

  function updateCoverage(value: Coverage) {
    setCoverage(value);
    trackCalculatorInteraction("coverage", value);
  }

  function updateAgeBand(value: AgeBand) {
    setAgeBand(value);
    trackCalculatorInteraction("age_band", value);
  }

  function updateRiskLevel(value: RiskLevel) {
    setRiskLevel(value);
    trackCalculatorInteraction("risk_level", value);
  }

  function updateCostArea(value: CostArea) {
    setCostArea(value);
    trackCalculatorInteraction("cost_area", value);
  }

  function updateDeductible(value: string) {
    setDeductible(value);
    trackCalculatorInteraction("deductible", value);
  }

  function updateReimbursement(value: string) {
    setReimbursement(value);
    trackCalculatorInteraction("reimbursement", value);
  }

  function updateAnnualLimit(value: AnnualLimit) {
    setAnnualLimit(value);
    trackCalculatorInteraction("annual_limit", value);
  }

  function updateWellness(value: boolean) {
    setWellness(value);
    trackCalculatorInteraction("wellness_addon", value);
  }

  function trackCompareClick() {
    trackAnalyticsEvent("insurance_calculator_compare_click", {
      calculator_title: title,
      species,
      coverage,
      deductible,
      reimbursement,
      annual_limit: annualLimit,
      estimate_low: estimate.low,
      estimate_high: estimate.high,
      estimate_midpoint: estimate.midpoint,
    });
  }

  return (
    <div ref={estimatorRef} className="not-prose my-6 overflow-hidden rounded-xl border bg-card">
      <div className="border-b bg-muted/40 p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold text-primary">
              <Calculator className="h-4 w-4" />
              <span>Interactive estimate</span>
            </div>
            <h3 className="mt-2 text-xl font-bold text-foreground">{title}</h3>
            <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
              Estimate a monthly range before requesting quotes. Actual premiums depend on provider rules, zip code, underwriting, exclusions, and discounts.
            </p>
          </div>
          <a
            href="#providers"
            onClick={trackCompareClick}
            className="inline-flex h-9 w-full shrink-0 items-center justify-center gap-1.5 rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 sm:w-auto"
          >
            Compare quotes
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>

      <div className="grid gap-6 p-5 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)]">
        <div className="grid gap-4 sm:grid-cols-2">
          <EstimatorSelect
            label="Pet"
            value={species}
            disabled={lockSpecies}
            onChange={(value) => updateSpecies(value as Species)}
            options={[
              { value: "dog", label: "Dog" },
              { value: "cat", label: "Cat" },
            ]}
          />
          <EstimatorSelect
            label="Coverage"
            value={coverage}
            onChange={(value) => updateCoverage(value as Coverage)}
            options={[
              { value: "accident-illness", label: "Accident and illness" },
              { value: "accident-only", label: "Accident-only" },
            ]}
          />
          <EstimatorSelect
            label="Age"
            value={ageBand}
            onChange={(value) => updateAgeBand(value as AgeBand)}
            options={[
              { value: "young", label: species === "dog" ? "Puppy / young dog" : "Kitten / young cat" },
              { value: "adult", label: "Adult" },
              { value: "mature", label: "Mature" },
              { value: "senior", label: "Senior" },
            ]}
          />
          <EstimatorSelect
            label={species === "dog" ? "Breed risk" : "Health risk"}
            value={riskLevel}
            onChange={(value) => updateRiskLevel(value as RiskLevel)}
            options={[
              { value: "lower", label: species === "dog" ? "Small / lower-risk" : "Lower-risk" },
              { value: "average", label: "Average" },
              { value: "higher", label: species === "dog" ? "Large / higher-risk" : "Higher-risk" },
            ]}
          />
          <EstimatorSelect
            label="Vet cost area"
            value={costArea}
            onChange={(value) => updateCostArea(value as CostArea)}
            options={[
              { value: "lower", label: "Lower-cost area" },
              { value: "average", label: "Average area" },
              { value: "higher", label: "Higher-cost city" },
            ]}
          />
          <EstimatorSelect
            label="Deductible"
            value={deductible}
            onChange={updateDeductible}
            options={[
              { value: "250", label: "$250" },
              { value: "500", label: "$500" },
              { value: "750", label: "$750" },
              { value: "1000", label: "$1,000" },
            ]}
          />
          <EstimatorSelect
            label="Reimbursement"
            value={reimbursement}
            onChange={updateReimbursement}
            options={[
              { value: "70", label: "70%" },
              { value: "80", label: "80%" },
              { value: "90", label: "90%" },
            ]}
          />
          <EstimatorSelect
            label="Annual limit"
            value={annualLimit}
            onChange={(value) => updateAnnualLimit(value as AnnualLimit)}
            options={[
              { value: "5000", label: "$5,000" },
              { value: "10000", label: "$10,000" },
              { value: "unlimited", label: "Unlimited" },
            ]}
          />
          <label className="flex min-h-16 items-center gap-3 rounded-lg border bg-background p-3 sm:col-span-2">
            <input
              type="checkbox"
              checked={wellness}
              onChange={(event) => updateWellness(event.target.checked)}
              className="h-4 w-4 rounded border-input"
            />
            <span>
              <span className="block text-sm font-medium text-foreground">Add wellness budget</span>
              <span className="block text-xs text-muted-foreground">
                Adds a rough monthly allowance for routine exams, vaccines, dental cleaning, and preventives.
              </span>
            </span>
          </label>
        </div>

        <div className="rounded-xl border bg-background p-5">
          <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
            <DollarSign className="h-4 w-4" />
            <span>Estimated monthly premium</span>
          </div>
          <div className="mt-3 text-4xl font-bold tracking-tight text-foreground">
            ${estimate.low}-${estimate.high}
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            midpoint around {formatCurrency(estimate.midpoint)} per month
          </p>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <Metric label="Annual range" value={`${formatCurrency(estimate.annualLow)}-${formatCurrency(estimate.annualHigh)}`} />
            <Metric label="Sample bill" value="$3,000" />
          </div>

          <div className="mt-5 rounded-lg border bg-muted/40 p-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>Sample claim math</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              On a $3,000 eligible emergency bill, this setup could reimburse about{" "}
              <strong className="text-foreground">{formatCurrency(estimate.estimatedPayout)}</strong>, leaving about{" "}
              <strong className="text-foreground">{formatCurrency(estimate.estimatedOutOfPocket)}</strong> before non-covered items.
            </p>
          </div>

          <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
            This is an educational estimate, not a quote or coverage promise. Always compare provider quotes with the same deductible, reimbursement rate, annual limit, waiting periods, and exclusions.
          </p>
        </div>
      </div>
    </div>
  );
}

function EstimatorSelect({
  label,
  value,
  onChange,
  options,
  disabled = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  disabled?: boolean;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Select value={value} onValueChange={(nextValue) => nextValue && onChange(nextValue)} disabled={disabled}>
        <SelectTrigger className="h-10 w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border bg-card p-3">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 text-sm font-semibold text-foreground">{value}</p>
    </div>
  );
}
