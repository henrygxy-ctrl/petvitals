export interface FeedingInput {
  weightLbs: number;
  species: "dog" | "cat";
  isNeutered: boolean;
  activityLevel: "low" | "moderate" | "active" | "very-active";
  bcsScore: number;
  ageYears?: number;
}

export interface FeedingResult {
  rer: number;
  mer: number;
  merRange: { min: number; max: number };
  cupsPerDay: number;
  mealsPerDay: number;
  perMealCups: number;
  targetWeightLbs?: number;
  weightChange: "maintain" | "lose" | "gain";
  bcsAssessment: string;
  foodKcalPerCup: number;
}

const FOOD_KCAL_PER_CUP = {
  "Blue Buffalo Life Protection": 372,
  "Hill's Science Diet": 361,
  "Royal Canin": 345,
  "Purina Pro Plan": 389,
  "Iams Proactive Health": 352,
  "Pedigree": 335,
  "Taste of the Wild": 370,
  "Wellness CORE": 406,
  "Orijen": 400,
  "Nutro": 355,
  "Generic (avg 360 kcal/cup)": 360,
} as const;

export const FOOD_BRANDS = Object.keys(FOOD_KCAL_PER_CUP);

// Resting Energy Requirement (RER)
function calculateRER(weightKg: number): number {
  return 70 * Math.pow(weightKg, 0.75);
}

// Maintenance Energy Requirement (MER) multipliers
function getMERMultiplier(species: "dog" | "cat", isNeutered: boolean, activityLevel: string, bcsScore: number): number {
  let multiplier = 1.0;

  // Base multiplier by species
  if (species === "dog") {
    multiplier = isNeutered ? 1.6 : 1.8;
  } else {
    multiplier = isNeutered ? 1.2 : 1.4;
  }

  // Activity adjustment (dogs only)
  if (species === "dog") {
    switch (activityLevel) {
      case "low": multiplier *= 0.9; break;
      case "moderate": multiplier *= 1.0; break;
      case "active": multiplier *= 1.2; break;
      case "very-active": multiplier *= 1.4; break;
    }
  }

  // BCS adjustment — single branch for weight targets
  if (bcsScore > 6) {
    multiplier *= 0.8; // weight loss target
  } else if (bcsScore < 4) {
    multiplier *= 1.2; // weight gain target
  }
  // For weight gain with very low BCS, ensure minimum MER
  if (bcsScore < 3) multiplier = Math.max(multiplier, 1.4);

  return Math.round(multiplier * 10) / 10;
}

export function calculateFeeding(input: FeedingInput, foodKcalPerCup?: number): FeedingResult {
  const weightKg = input.weightLbs / 2.205;
  const rer = calculateRER(weightKg);
  const multiplier = getMERMultiplier(input.species, input.isNeutered, input.activityLevel, input.bcsScore);
  const mer = Math.round(rer * multiplier);
  const kcal = foodKcalPerCup || 360;

  // Range of healthy MER
  const merRange = {
    min: Math.round(rer * Math.max(multiplier - 0.3, 1.0)),
    max: Math.round(rer * (multiplier + 0.3)),
  };

  const cupsPerDay = Math.round((mer / kcal) * 10) / 10;
  const mealsPerDay = 2;
  const perMealCups = Math.round((cupsPerDay / mealsPerDay) * 10) / 10;

  // Target weight
  let targetWeightLbs: number | undefined;
  let weightChange: "maintain" | "lose" | "gain" = "maintain";

  if (input.bcsScore > 6) {
    // Rough target: lose ~10% of body weight per BCS point over 5
    targetWeightLbs = Math.round(input.weightLbs * (1 - (input.bcsScore - 5) * 0.06) * 10) / 10;
    weightChange = "lose";
  } else if (input.bcsScore < 4) {
    targetWeightLbs = Math.round(input.weightLbs * (1 + (5 - input.bcsScore) * 0.08) * 10) / 10;
    weightChange = "gain";
  }

  // BCS assessment
  const bcsAssessment = input.bcsScore < 5
    ? `Underweight (BCS ${input.bcsScore}/9). Target: BCS 5/9.`
    : input.bcsScore === 5
      ? `Ideal body condition (BCS ${input.bcsScore}/9). Keep it up!`
      : `Overweight (BCS ${input.bcsScore}/9). Target: BCS 5/9.`;

  return {
    rer: Math.round(rer),
    mer,
    merRange,
    cupsPerDay,
    mealsPerDay,
    perMealCups,
    targetWeightLbs,
    weightChange,
    bcsAssessment,
    foodKcalPerCup: kcal,
  };
}

export function getFoodKcal(brand: string): number {
  return (FOOD_KCAL_PER_CUP as Record<string, number>)[brand] || 360;
}
