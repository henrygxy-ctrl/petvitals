"use client";

import dynamic from "next/dynamic";

const CleaningIngredientChecker = dynamic(() => import("@/components/tools/cleaning-ingredient-checker").then((module) => module.CleaningIngredientChecker));
const PuppyVaccinationPlanner = dynamic(() => import("@/components/tools/puppy-vaccination-planner").then((module) => module.PuppyVaccinationPlanner));
const VetBillEstimator = dynamic(() => import("@/components/tools/vet-bill-estimator").then((module) => module.VetBillEstimator));

export function ArticleTools({ kind }: { kind: "cleaning" | "vaccines" | "dental" | "puppy" }) {
  if (kind === "cleaning") return <CleaningIngredientChecker />;
  if (kind === "vaccines") return <PuppyVaccinationPlanner />;
  return <VetBillEstimator mode={kind} />;
}
