import type { ToxicityItem } from "@/data/toxicity";

export type ToxicityCategory = ToxicityItem["category"];

export const TOXICITY_CATEGORY_META = {
  fruits: {
    label: "Fruits",
    description: "Check which fruits are safe, risky, or toxic for dogs and cats.",
  },
  vegetables: {
    label: "Vegetables",
    description: "Review common vegetables and allium risks for pets.",
  },
  "human-food": {
    label: "Human Food",
    description: "Look up everyday snacks, prepared foods, and desserts before sharing.",
  },
  plants: {
    label: "Plants",
    description: "Identify toxic houseplants, garden plants, and emergency plant risks.",
  },
  household: {
    label: "Household Items",
    description: "Check pet-safe cleaners, disinfectants, chemicals, and common home products that can harm pets.",
  },
  medications: {
    label: "Medications",
    description: "Review human medications and supplements that are dangerous for pets.",
  },
  seasonings: {
    label: "Seasonings",
    description: "Check spices, herbs, sauces, and flavorings before pets eat them.",
  },
  beverages: {
    label: "Beverages",
    description: "Look up drinks that may contain caffeine, alcohol, sugar, or xylitol.",
  },
  "nuts-seeds": {
    label: "Nuts & Seeds",
    description: "Compare safe treats with toxic or high-fat nut and seed risks.",
  },
} satisfies Record<ToxicityCategory, { label: string; description: string }>;

export function getToxicityCategoryEntries() {
  return Object.entries(TOXICITY_CATEGORY_META).map(([id, meta]) => ({
    id: id as ToxicityCategory,
    ...meta,
  }));
}

export function isToxicityCategory(value: string): value is ToxicityCategory {
  return value in TOXICITY_CATEGORY_META;
}
