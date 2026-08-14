"use client";

import { useMemo, useState } from "react";
import { AlertTriangle, CheckCircle2, Search } from "lucide-react";
import { trackAnalyticsEvent } from "@/lib/analytics";

type Verdict = "avoid" | "caution" | "usually-safe";

interface IngredientRule {
  id: string;
  label: string;
  aliases: string[];
  verdict: Verdict;
  pets: string;
  summary: string;
  action: string;
}

const RULES: IngredientRule[] = [
  {
    id: "phenols",
    label: "Phenols / pine-oil disinfectants",
    aliases: ["phenol", "phenols", "pine oil", "pine-sol", "lysol"],
    verdict: "avoid",
    pets: "Highest concern for cats",
    summary: "Higher-risk residue and fumes, especially for cats that groom paws after walking on floors.",
    action: "Avoid for routine pet-area cleaning; use a lower-residue alternative when possible.",
  },
  {
    id: "essential-oils",
    label: "Essential oils",
    aliases: ["essential oil", "tea tree", "eucalyptus", "peppermint", "citrus oil", "wintergreen"],
    verdict: "avoid",
    pets: "Cats and sensitive dogs",
    summary: "Concentrated oils and diffusers can irritate airways or create ingestion risk during grooming.",
    action: "Avoid concentrated sprays, diffusers, and freshly treated surfaces around pets.",
  },
  {
    id: "bleach",
    label: "Bleach / sodium hypochlorite",
    aliases: ["bleach", "sodium hypochlorite"],
    verdict: "caution",
    pets: "Dogs and cats",
    summary: "Can irritate skin, eyes, airways, and the stomach. Mixing with ammonia is dangerous.",
    action: "Keep pets away, ventilate, follow the label, rinse if needed, and allow full drying before access.",
  },
  {
    id: "ammonia",
    label: "Ammonia",
    aliases: ["ammonia"],
    verdict: "caution",
    pets: "Dogs and cats",
    summary: "Respiratory irritant and can encourage marking because the smell resembles urine.",
    action: "Avoid pet accident areas and never mix with bleach.",
  },
  {
    id: "quats",
    label: "Quaternary ammonium disinfectants",
    aliases: ["quat", "quats", "benzalkonium", "disinfecting wipe", "disinfectant wipe"],
    verdict: "caution",
    pets: "Dogs and cats",
    summary: "Residue can transfer to paws, bedding, bowls, and grooming surfaces.",
    action: "Use only as directed, keep pets away until dry, and avoid food or water areas unless the label permits it.",
  },
  {
    id: "hydrogen-peroxide",
    label: "3% hydrogen peroxide",
    aliases: ["hydrogen peroxide", "peroxide"],
    verdict: "usually-safe",
    pets: "Dogs and cats after surfaces dry",
    summary: "A lower-residue option for compatible hard surfaces when used properly.",
    action: "Test surfaces first, keep pets away during contact time, and let the surface dry fully.",
  },
  {
    id: "vinegar",
    label: "Diluted white vinegar",
    aliases: ["vinegar", "white vinegar"],
    verdict: "usually-safe",
    pets: "Dogs and cats after surfaces dry",
    summary: "Useful for mild cleaning and odor control, but not a broad disinfectant.",
    action: "Dilute, avoid stone surfaces, ventilate, and let floors dry before pets return.",
  },
  {
    id: "castile",
    label: "Diluted castile soap",
    aliases: ["castile", "castile soap"],
    verdict: "usually-safe",
    pets: "Dogs and cats",
    summary: "Gentle routine cleaner when diluted and not heavily scented.",
    action: "Use unscented formulas when possible and rinse residue from food, water, and floor areas.",
  },
  {
    id: "enzymatic",
    label: "Enzymatic pet accident cleaner",
    aliases: ["enzymatic", "enzyme cleaner", "pet accident cleaner", "urine cleaner"],
    verdict: "usually-safe",
    pets: "Dogs and cats",
    summary: "Designed for urine, feces, and vomit cleanup when used according to the label.",
    action: "Let it work for the labeled contact time and keep pets away until the area is dry.",
  },
  {
    id: "fragrance",
    label: "Strong fragrance / plug-ins",
    aliases: ["fragrance", "air freshener", "plug-in", "scented candle"],
    verdict: "caution",
    pets: "Cats, birds, asthma-prone pets",
    summary: "Can irritate sensitive airways and overwhelm pets' stronger sense of smell.",
    action: "Use ventilation and source cleanup rather than masking odor with heavy scent.",
  },
];

const VERDICT_STYLE: Record<Verdict, { label: string; className: string }> = {
  avoid: {
    label: "Avoid",
    className: "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950/20 dark:text-red-300",
  },
  caution: {
    label: "Use caution",
    className: "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950/20 dark:text-amber-300",
  },
  "usually-safe": {
    label: "Usually safer",
    className: "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/20 dark:text-emerald-300",
  },
};

export function CleaningIngredientChecker() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState("phenols");
  const [hasTracked, setHasTracked] = useState(false);

  const matches = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return RULES;
    return RULES.filter((rule) =>
      [rule.label, ...rule.aliases].some((value) => value.toLowerCase().includes(normalized))
    );
  }, [query]);

  const selected = RULES.find((rule) => rule.id === selectedId) || matches[0] || RULES[0];
  const style = VERDICT_STYLE[selected.verdict];

  function track(field: string, value: string) {
    if (!hasTracked) {
      setHasTracked(true);
      trackAnalyticsEvent("cleaning_ingredient_checker_start");
    }

    trackAnalyticsEvent("cleaning_ingredient_checker_change", {
      changed_field: field,
      changed_value: value,
    });
  }

  function updateQuery(value: string) {
    setQuery(value);
    track("query", value ? "typed" : "cleared");
  }

  function updateSelection(value: string) {
    setSelectedId(value);
    track("ingredient", value);
  }

  return (
    <section className="not-prose my-8 overflow-hidden rounded-xl border bg-card">
      <div className="border-b bg-muted/40 p-5">
        <div className="flex items-center gap-2 text-sm font-semibold text-primary">
          <Search className="h-4 w-4" />
          <span>Pet-safe cleaning tool</span>
        </div>
        <h2 className="mt-2 text-xl font-bold text-foreground">
          Cleaning Ingredient Safety Checker
        </h2>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
          Check common cleaner ingredients before using them on floors, counters, crates, litter areas, or pet bedding.
        </p>
      </div>

      <div className="grid gap-5 p-5 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.85fr)]">
        <div>
          <label className="block space-y-2">
            <span className="text-sm font-medium text-foreground">Search ingredient or product type</span>
            <input
              value={query}
              onChange={(event) => updateQuery(event.target.value)}
              placeholder="Try bleach, vinegar, essential oil, disinfecting wipe..."
              className="h-10 w-full rounded-lg border bg-background px-3 text-sm"
            />
          </label>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {matches.map((rule) => (
              <button
                key={rule.id}
                type="button"
                onClick={() => updateSelection(rule.id)}
                className={`rounded-lg border p-3 text-left text-sm transition-colors hover:border-primary/40 ${
                  selected.id === rule.id ? "border-primary bg-primary/5" : "bg-background"
                }`}
              >
                <span className="font-medium text-foreground">{rule.label}</span>
                <span className="mt-1 block text-xs text-muted-foreground">{rule.pets}</span>
              </button>
            ))}
          </div>
        </div>

        <div className={`rounded-xl border p-5 ${style.className}`}>
          <div className="flex items-center gap-2">
            {selected.verdict === "usually-safe" ? (
              <CheckCircle2 className="h-5 w-5" />
            ) : (
              <AlertTriangle className="h-5 w-5" />
            )}
            <span className="text-sm font-semibold">{style.label}</span>
          </div>
          <h3 className="mt-3 text-lg font-bold">{selected.label}</h3>
          <p className="mt-2 text-sm leading-relaxed">{selected.summary}</p>
          <div className="mt-4 rounded-lg border border-current/20 bg-background/70 p-3 text-sm">
            <strong>Safer use:</strong> {selected.action}
          </div>
          <p className="mt-4 text-xs leading-relaxed opacity-80">
            If your pet licked, inhaled, or walked through a wet cleaner and is vomiting, drooling, coughing, weak, or acting abnormal, call your veterinarian or a pet poison hotline.
          </p>
        </div>
      </div>
    </section>
  );
}
