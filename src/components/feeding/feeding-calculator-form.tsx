"use client";

import { useState } from "react";
import {
  Calculator,
  UtensilsCrossed,
  Scale,
  Activity,
} from "lucide-react";
import { calculateFeeding, type FeedingInput, type FeedingResult, FOOD_BRANDS } from "@/lib/feeding-calculator";
import { BcsVisualGuide } from "@/components/feeding/bcs-visual-guide";
import Link from 'next/link'

export function FeedingCalculatorForm() {
  const [weight, setWeight] = useState("");
  const [weightUnit, setWeightUnit] = useState<"lbs" | "kg">("lbs");
  const [species, setSpecies] = useState<"dog" | "cat">("dog");
  const [isNeutered, setIsNeutered] = useState(true);
  const [activityLevel, setActivityLevel] = useState<string>("moderate");
  const [bcsScore, setBcsScore] = useState(5);
  const [foodBrand, setFoodBrand] = useState("Generic (avg 360 kcal/cup)");
  const [result, setResult] = useState<FeedingResult | null>(null);

  const handleCalculate = () => {
    const weightNum = parseFloat(weight);
    if (!weightNum || weightNum <= 0) return;

    const weightLbs = weightUnit === "kg" ? weightNum * 2.205 : weightNum;

    const input: FeedingInput = {
      weightLbs,
      species,
      isNeutered,
      activityLevel: activityLevel as FeedingInput["activityLevel"],
      bcsScore,
    };

    const res = calculateFeeding(input);
    setResult(res);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="rounded-xl border bg-card p-6 sm:p-8">
        <div className="flex items-center gap-2 mb-6">
          <Calculator className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          <h2 className="text-lg font-semibold">Calculate Daily Calories</h2>
        </div>

        <div className="space-y-5">
          {/* Weight */}
          <div>
            <label className="flex items-center gap-1.5 text-sm font-medium mb-1.5">
              <Scale className="h-4 w-4 text-muted-foreground" />
              Your pet&apos;s weight
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="Enter weight"
                min="1"
                max="200"
                className="flex-1 px-3 py-2 rounded-md border text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <select
                value={weightUnit}
                onChange={(e) => setWeightUnit(e.target.value as "lbs" | "kg")}
                className="px-3 py-2 rounded-md border text-sm bg-background"
              >
                <option value="lbs">lbs</option>
                <option value="kg">kg</option>
              </select>
            </div>
          </div>

          {/* Species */}
          <div>
            <label className="flex items-center gap-1.5 text-sm font-medium mb-1.5">
              <UtensilsCrossed className="h-4 w-4 text-muted-foreground" />
              Species
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => setSpecies("dog")}
                className={`flex-1 py-2 rounded-md border text-sm transition-colors ${
                  species === "dog"
                    ? "bg-primary text-primary-foreground border-primary"
                    : "hover:bg-muted"
                }`}
              >
                Dog
              </button>
              <button
                onClick={() => setSpecies("cat")}
                className={`flex-1 py-2 rounded-md border text-sm transition-colors ${
                  species === "cat"
                    ? "bg-primary text-primary-foreground border-primary"
                    : "hover:bg-muted"
                }`}
              >
                Cat
              </button>
            </div>
          </div>

          {/* Neutered */}
          <div>
            <label className="text-sm font-medium block mb-1.5">
              Spayed / Neutered?
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => setIsNeutered(true)}
                className={`flex-1 py-2 rounded-md border text-sm transition-colors ${
                  isNeutered
                    ? "bg-primary text-primary-foreground border-primary"
                    : "hover:bg-muted"
                }`}
              >
                Yes
              </button>
              <button
                onClick={() => setIsNeutered(false)}
                className={`flex-1 py-2 rounded-md border text-sm transition-colors ${
                  !isNeutered
                    ? "bg-primary text-primary-foreground border-primary"
                    : "hover:bg-muted"
                }`}
              >
                No
              </button>
            </div>
          </div>

          {/* Activity Level */}
          <div>
            <label className="flex items-center gap-1.5 text-sm font-medium mb-1.5">
              <Activity className="h-4 w-4 text-muted-foreground" />
              Activity Level
            </label>
            <select
              value={activityLevel}
              onChange={(e) => setActivityLevel(e.target.value)}
              className="w-full px-3 py-2 rounded-md border text-sm bg-background"
            >
              <option value="low">Low — mostly indoors, short walks</option>
              <option value="moderate">Moderate — daily walks, occasional play</option>
              <option value="active">Active — runs, hikes, regular exercise</option>
              <option value="very-active">Very Active — working dog, intense daily exercise</option>
            </select>
          </div>

          {/* BCS */}
          <div>
            <label className="text-sm font-medium block mb-1.5">
              Body Condition Score: <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{bcsScore}/9</span>
            </label>
            <input
              type="range"
              min="1"
              max="9"
              value={bcsScore}
              onChange={(e) => setBcsScore(parseInt(e.target.value))}
              className="w-full accent-emerald-600"
            />
            <BcsVisualGuide score={bcsScore} />
          </div>

          {/* Food Brand */}
          <div>
            <label className="text-sm font-medium block mb-1.5">
              Food Brand (for kcal/cup)
            </label>
            <select
              value={foodBrand}
              onChange={(e) => setFoodBrand(e.target.value)}
              className="w-full px-3 py-2 rounded-md border text-sm bg-background"
            >
              {FOOD_BRANDS.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>

          {/* Calculate button */}
          <button
            onClick={handleCalculate}
            disabled={!weight || parseFloat(weight) <= 0}
            className="w-full py-2.5 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Calculate Daily Feeding
          </button>
        </div>
      </div>

      {/* Results */}
      {result && (
        <div className="mt-6 rounded-xl border bg-card p-6 sm:p-8 space-y-4">
          <h3 className="font-semibold text-lg">Your Results</h3>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 rounded-lg bg-muted/50">
              <p className="text-xs text-muted-foreground">Resting Energy (RER)</p>
              <p className="text-xl font-bold">{result.rer} <span className="text-sm font-normal text-muted-foreground">kcal/day</span></p>
            </div>
            <div className="p-3 rounded-lg bg-muted/50">
              <p className="text-xs text-muted-foreground">Maintenance (MER)</p>
              <p className="text-xl font-bold">{result.mer} <span className="text-sm font-normal text-muted-foreground">kcal/day</span></p>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800">
            <p className="text-sm font-semibold text-emerald-800 dark:text-emerald-200">
              Daily Feeding: {result.cupsPerDay} cups/day
            </p>
            <p className="text-xs text-emerald-700 dark:text-emerald-300 mt-0.5">
              ~{result.perMealCups} cups per meal ({result.mealsPerDay} meals/day)
              {result.weightChange !== "maintain" && (
                <span className="block mt-1">
                  {result.weightChange === "lose"
                    ? `Target: weight loss to ~${result.targetWeightLbs} lbs`
                    : `Target: weight gain to ~${result.targetWeightLbs} lbs`}
                </span>
              )}
            </p>
          </div>

          <div className="text-xs text-muted-foreground">
            <p>Based on {result.foodKcalPerCup} kcal/cup. {result.bcsAssessment}</p>
            <p className="mt-1">
              Healthy MER range: {result.merRange.min}?{result.merRange.max} kcal/day.
              Adjust based on your pet&apos;s individual response.
            </p>
          </div>

          {/* Cross-promotion */}
          <div className="pt-4 border-t">
            <p className="text-xs font-medium text-muted-foreground mb-2">Learn more:</p>
            <div className="flex flex-wrap gap-2 text-xs">
              <Link href="/blog/calculate-dog-calorie-needs" className="text-emerald-600 dark:text-emerald-400 hover:underline">
                RER & MER formula guide
              </Link>
              <span className="text-muted-foreground">?</span>
              <Link href="/blog/understanding-body-condition-score" className="text-emerald-600 dark:text-emerald-400 hover:underline">
                BCS scoring guide
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
