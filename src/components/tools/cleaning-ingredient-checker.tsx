"use client";

import { useMemo, useState } from "react";
import { AlertTriangle, Search } from "lucide-react";
import { trackAnalyticsEvent } from "@/lib/analytics";

type Verdict = "avoid" | "caution" | "label-dependent";

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
    aliases: ["phenol", "phenols", "2-phenylphenol", "o-phenylphenol", "pine oil"],
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
    action: "Keep pets away, follow the bottle's dilution and contact time, ventilate, complete required rinsing, and allow full drying before access. Never mix cleaners.",
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
    aliases: ["quat", "quats", "benzalkonium", "benzalkonium chloride", "quaternary ammonium", "alkyl dimethyl benzyl ammonium chloride", "didecyl dimethyl ammonium chloride"],
    verdict: "caution",
    pets: "Dogs and cats",
    summary: "These ingredients can cause corrosive injury; cats are particularly sensitive. Wet residue can transfer to paws and be swallowed during grooming.",
    action: "Check the actual active ingredients. Follow surface, contact-time, rinsing, ventilation, and pet-access instructions. Do not use surface wipes on paws or fur.",
  },
  {
    id: "hydrogen-peroxide",
    label: "Hydrogen peroxide",
    aliases: ["hydrogen peroxide", "3% hydrogen peroxide", "hydrogen peroxide 3%", "h2o2"],
    verdict: "caution",
    pets: "Dogs and cats",
    summary: "Exposure can injure eyes and skin or damage the stomach. The ingredient name does not establish a product's concentration or disinfecting directions.",
    action: "Use only a product labeled for the intended surface and job. Follow its contact time, required rinse, ventilation, and pet-access directions. Do not give peroxide to a pet after cleaner exposure.",
  },
  {
    id: "vinegar",
    label: "White vinegar",
    aliases: ["vinegar", "white vinegar"],
    verdict: "label-dependent",
    pets: "Dogs and cats",
    summary: "Useful for mild cleaning and odor control, but not a broad disinfectant.",
    action: "Check surface compatibility and directions; do not infer dilution from the ingredient name. Never mix with bleach. Keep pets away until any required rinse is complete and the surface is dry.",
  },
  {
    id: "castile",
    label: "Castile soap",
    aliases: ["castile", "castile soap"],
    verdict: "label-dependent",
    pets: "Dogs and cats",
    summary: "A routine cleaning option, not a disinfectant. Formulas, added oils, and dilution instructions vary.",
    action: "Check the complete formula and surface directions. Follow dilution and rinsing instructions, keep pets away during use, and let the surface dry before access.",
  },
  {
    id: "enzymatic",
    label: "Enzymatic pet accident cleaner",
    aliases: ["enzymatic", "enzyme cleaner"],
    verdict: "label-dependent",
    pets: "Dogs and cats",
    summary: "Some products are formulated for pet messes, but this category does not identify all ingredients or prove safety.",
    action: "Check the exact product's surface, application, rinsing, and pet-access directions. Keep pets away while it works and until all re-entry conditions are met.",
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
  "label-dependent": {
    label: "Check the product label",
    className: "border-border bg-muted/30 text-foreground",
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

  const selected = matches.find((rule) => rule.id === selectedId) || matches[0];
  const style = selected ? VERDICT_STYLE[selected.verdict] : null;

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
    <section className="not-prose my-8 overflow-hidden rounded-lg border bg-card">
      <div className="border-b bg-muted/40 p-5">
        <div className="flex items-center gap-2 text-sm font-semibold text-primary">
          <Search className="h-4 w-4" />
          <span>Cleaner ingredient cautions</span>
        </div>
        <h2 className="mt-2 text-xl font-bold text-foreground">
          Cleaning Ingredient Checker
        </h2>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
          An ingredient name is not a safety guarantee. Check the exact formula and all label directions; a dry surface can still contain residue.
        </p>
      </div>

      <div className="grid gap-5 p-5 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.85fr)]">
        <div>
          <label className="block space-y-2">
            <span className="text-sm font-medium text-foreground">Ingredient name</span>
            <input
              value={query}
              onChange={(event) => updateQuery(event.target.value)}
              placeholder="Bleach, hydrogen peroxide, benzalkonium..."
              className="h-10 w-full rounded-lg border bg-background px-3 text-sm"
            />
          </label>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {matches.map((rule) => (
              <button
                key={rule.id}
                type="button"
                aria-pressed={selected?.id === rule.id}
                onClick={() => updateSelection(rule.id)}
                className={`rounded-lg border p-3 text-left text-sm transition-colors hover:border-primary/40 ${
                  selected?.id === rule.id ? "border-primary bg-primary/5" : "bg-background"
                }`}
              >
                <span className="font-medium text-foreground">{rule.label}</span>
                <span className="mt-1 block text-xs text-muted-foreground">{rule.pets}</span>
              </button>
            ))}
          </div>
        </div>

        {selected && style ? <div className={`rounded-lg border p-5 ${style.className}`} aria-live="polite">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            <span className="text-sm font-semibold">{style.label}</span>
          </div>
          <h3 className="mt-3 text-lg font-bold">{selected.label}</h3>
          <p className="mt-2 text-sm leading-relaxed">{selected.summary}</p>
          <div className="mt-4 rounded-lg border border-current/20 bg-background/70 p-3 text-sm">
            <strong>Use conditions:</strong> {selected.action}
          </div>
          <p className="mt-4 text-xs leading-relaxed opacity-80">
            For suspected ingestion or contact with a corrosive or unknown cleaner, contact your veterinarian or animal poison control promptly. Do not wait for symptoms or induce vomiting. Breathing difficulty, eye exposure, burns, or collapse need urgent veterinary attention.
          </p>
        </div> : <div className="rounded-lg border bg-muted/30 p-5" role="status">
          <h3 className="text-lg font-bold">Ingredient not identified</h3>
          <p className="mt-2 text-sm leading-relaxed">A brand name or product type does not identify the formula. Read the ingredient list on your exact bottle. No match does not mean a product is safe.</p>
          <p className="mt-3 text-sm leading-relaxed">Keep pets away from an unknown cleaner. For exposure advice, contact your veterinarian or animal poison control with the product label.</p>
        </div>}
      </div>
      <details className="border-t px-5 py-3 text-xs text-muted-foreground">
        <summary className="cursor-pointer font-medium">Evidence and limits</summary>
        <p className="mt-2 leading-relaxed">This reference matches ingredient names to general cautions; it does not measure concentration, analyze a complete formula, or certify a product. No match is not a safety finding. Product-specific directions and veterinary exposure advice take precedence.</p>
        <p className="mt-2 leading-relaxed">
          Exposure cautions: <a className="underline" href="https://www.petpoisonhelpline.com/uncategorized/cleaning-products-and-pets/">Pet Poison Helpline</a>. Cat-home phenol precautions and pet-access guidance: <a className="underline" href="https://www.cdc.gov/healthy-pets/about/cleaning-and-disinfecting-pet-supplies.html">CDC</a>. These are public references, not a clinical review of this tool.
        </p>
      </details>
    </section>
  );
}
