// ============================================================
// Affiliate Configuration — Environment-Variable Driven
// ============================================================
// 
// To activate affiliate links, set these env vars in .env:
//
//   Insurance Partners (register at URLs below):
//     NEXT_PUBLIC_AFFILIATE_LEMONADE_URL     — https://www.lemonade.com/pet (via Impact Radius)
//     NEXT_PUBLIC_AFFILIATE_HEALTHYPAWS_URL — https://www.healthypawspetinsurance.com/affiliates
//     NEXT_PUBLIC_AFFILIATE_EMBRACE_URL     — https://www.embracepetinsurance.com/partner
//     NEXT_PUBLIC_AFFILIATE_SPOT_URL        — https://spotpetinsurance.com/affiliate
//     NEXT_PUBLIC_AFFILIATE_TRUPANION_URL   — https://trupanion.com/partners
//
//   Product Links:
//     NEXT_PUBLIC_AFFILIATE_AMAZON_TAG      — Amazon Associates tag (e.g., "petvitals-20")
//     NEXT_PUBLIC_AFFILIATE_CHEWY_URL       — Chewy/Impact tracking URL
//     NEXT_PUBLIC_AFFILIATE_CHEWY_TAG       — Legacy Chewy affiliate ID fallback
//
// REGISTRATION GUIDE:
// ----------------------------------------------------------
// 1. Lemonade:  sign up at https://impact.com → search "Lemonade"
// 2. Healthy Paws: https://www.healthypawspetinsurance.com/affiliates
// 3. Embrace:     https://www.embracepetinsurance.com/about/affiliates
// 4. Spot:        https://spotpetinsurance.com/partners
// 5. Trupanion:   https://trupanion.com/partners
// 6. Amazon:      https://affiliate-program.amazon.com
// 7. Chewy:       https://www.chewy.com/app/content/affiliate-program
// ============================================================

const env = (key: string, fallback: string = "") =>
  typeof process !== "undefined" && (process.env as any)?.[key] ? (process.env as any)[key] : fallback;

const hasEnv = (key: string): boolean => Boolean(env(key, "").trim());

export interface InsurancePartner {
  name: string;
  tagline: string;
  url: string;
  isAffiliate: boolean;
  rating: number;
  highlights: string[];
  bestFor: string;
}

export interface ProductRecommendation {
  name: string;
  description: string;
  url: string;
  priceHint: string;
  platform: "amazon" | "chewy" | "other";
}

// --- Placeholder helpers ---
// When no env var is set, links go to the official (non-affiliate) homepage.
// This means: links always work, they just become affiliate-tracked once you set env vars.

const insuranceUrl = (envKey: string, directUrl: string): string =>
  env(envKey, directUrl);

const amazonUrl = (asin: string): string => {
  const tag = env("NEXT_PUBLIC_AFFILIATE_AMAZON_TAG", "");
  if (tag) return `https://www.amazon.com/dp/${asin}?tag=${tag}`;
  return `https://www.amazon.com/dp/${asin}`;
};

const chewyUrl = (path: string): string => {
  const trackingUrl = env("NEXT_PUBLIC_AFFILIATE_CHEWY_URL", "");
  if (trackingUrl) return trackingUrl.replaceAll("{path}", encodeURIComponent(path));

  const tag = env("NEXT_PUBLIC_AFFILIATE_CHEWY_TAG", "");
  if (tag) return `https://www.chewy.com/${path}?utm_source=affiliate&utm_medium=${tag}`;
  return `https://www.chewy.com/${path}`;
};

// --- Insurance Partners ---

export const INSURANCE_PARTNERS: InsurancePartner[] = [
  {
    name: "Lemonade",
    tagline: "Fast claims, AI-powered, starting at $10/mo",
    url: insuranceUrl("NEXT_PUBLIC_AFFILIATE_LEMONADE_URL", "https://www.lemonade.com/pet"),
    isAffiliate: hasEnv("NEXT_PUBLIC_AFFILIATE_LEMONADE_URL"),
    rating: 4.5,
    highlights: ["Claims paid in seconds", "Preventive care add-on", "Giveback program"],
    bestFor: "Tech-savvy pet parents who want fast digital claims",
  },
  {
    name: "Healthy Paws",
    tagline: "No annual or lifetime payout caps",
    url: insuranceUrl("NEXT_PUBLIC_AFFILIATE_HEALTHYPAWS_URL", "https://www.healthypawspetinsurance.com/"),
    isAffiliate: hasEnv("NEXT_PUBLIC_AFFILIATE_HEALTHYPAWS_URL"),
    rating: 4.5,
    highlights: ["Unlimited annual payouts", "Covers hereditary conditions", "Most vet-reviewed"],
    bestFor: "Pets prone to hereditary or chronic conditions",
  },
  {
    name: "Embrace",
    tagline: "Wellness rewards + diminishing deductible",
    url: insuranceUrl("NEXT_PUBLIC_AFFILIATE_EMBRACE_URL", "https://www.embracepetinsurance.com/"),
    isAffiliate: hasEnv("NEXT_PUBLIC_AFFILIATE_EMBRACE_URL"),
    rating: 4,
    highlights: ["Wellness Rewards program", "Diminishing deductible", "Covers exam fees"],
    bestFor: "Comprehensive coverage with preventive care",
  },
  {
    name: "Spot",
    tagline: "Customizable deductibles & reimbursement",
    url: insuranceUrl("NEXT_PUBLIC_AFFILIATE_SPOT_URL", "https://spotpetinsurance.com/"),
    isAffiliate: hasEnv("NEXT_PUBLIC_AFFILIATE_SPOT_URL"),
    rating: 4,
    highlights: ["$100-$1,000 deductible range", "70%-90% reimbursement", "No upper age limit"],
    bestFor: "Budget flexibility and senior pets",
  },
  {
    name: "Trupanion",
    tagline: "Pays vets directly, 90% coverage",
    url: insuranceUrl("NEXT_PUBLIC_AFFILIATE_TRUPANION_URL", "https://trupanion.com/"),
    isAffiliate: hasEnv("NEXT_PUBLIC_AFFILIATE_TRUPANION_URL"),
    rating: 4,
    highlights: ["Direct vet payment", "No payout limits", "Per-condition deductible"],
    bestFor: "Pet parents who can't float large upfront vet bills",
  },
];

// --- Product Recommendations ---

export const PRODUCT_RECS: Record<string, ProductRecommendation[]> = {
  "dog-chocolate-toxicity": [
    {
      name: "Pet First Aid Kit",
      description: "Complete emergency kit with vet-approved supplies for poisoning and accidents.",
      url: amazonUrl("B07XYZ0000"),
      priceHint: "$25-$40",
      platform: "amazon",
    },
    {
      name: "Pet-Safe Carob Treats",
      description: "Chocolate-flavored carob treats that are 100% safe for dogs.",
      url: chewyUrl("carob-dog-treats"),
      priceHint: "$8-$15",
      platform: "chewy",
    },
  ],
  "can-dogs-eat-grapes": [
    {
      name: "Pet Emergency Kit",
      description: "Be prepared for toxin ingestion and emergencies with a vet-stocked first aid kit.",
      url: amazonUrl("B07XYZ0000"),
      priceHint: "$25-$40",
      platform: "amazon",
    },
    {
      name: "Freeze-Dried Fruit Dog Treats",
      description: "Grapes are toxic, but these pet-safe fruit treats are safe and dogs love them.",
      url: chewyUrl("freeze-dried-fruit-dog-treats"),
      priceHint: "$6-$12",
      platform: "chewy",
    },
  ],
  "can-dogs-eat-onions": [
    {
      name: "Single-Ingredient Dog Treats",
      description: "No onion, garlic, or hidden alliums — just pure meat or veggie treats.",
      url: chewyUrl("single-ingredient-dog-treats"),
      priceHint: "$10-$20",
      platform: "chewy",
    },
  ],
  "can-dogs-eat-avocado": [
    {
      name: "Dog-Safe Chew Toys",
      description: "Redirect that chewing instinct from avocado pits to a durable, safe toy.",
      url: amazonUrl("B07XYZ0001"),
      priceHint: "$12-$25",
      platform: "amazon",
    },
  ],
  "can-cats-eat-tuna": [
    {
      name: "Vet-Formulated Cat Food",
      description: "Nutritionally balanced wet food — safer and healthier than human tuna for your cat.",
      url: chewyUrl("vet-formulated-cat-food"),
      priceHint: "$18-$35",
      platform: "chewy",
    },
  ],
  "lily-toxicity-cats": [
    {
      name: "Pet-Safe Indoor Plants Collection",
      description: "Spider plants, Boston ferns, and calatheas — all non-toxic to cats and beautiful.",
      url: amazonUrl("B07XYZ0002"),
      priceHint: "$15-$40",
      platform: "amazon",
    },
  ],
  "sago-palm-toxicity-pets": [
    {
      name: "Pet-Safe Houseplants Bundle",
      description: "Replace toxic plants with these vet-approved, pet-friendly indoor plants.",
      url: amazonUrl("B07XYZ0002"),
      priceHint: "$20-$50",
      platform: "amazon",
    },
  ],
  "household-plants-toxic-to-cats": [
    {
      name: "Cat-Safe Plant Starter Kit",
      description: "Cat grass, spider plant, and parlor palm — a safe indoor garden for cat homes.",
      url: chewyUrl("cat-safe-plants"),
      priceHint: "$20-$40",
      platform: "chewy",
    },
  ],
  "calculate-dog-calorie-needs": [
    {
      name: "Digital Pet Scale",
      description: "Accurate weight tracking is essential for portion control. High-precision platform.",
      url: amazonUrl("B07XYZ0003"),
      priceHint: "$30-$60",
      platform: "amazon",
    },
    {
      name: "Weight Management Dog Food",
      description: "Vet-recommended formulas for healthy weight loss with balanced nutrition.",
      url: chewyUrl("weight-management-dog-food"),
      priceHint: "$40-$70",
      platform: "chewy",
    },
  ],
  "understanding-body-condition-score": [
    {
      name: "Pet Body Weight Scale",
      description: "Track your pet's weight at home and monitor BCS progress between vet visits.",
      url: amazonUrl("B07XYZ0003"),
      priceHint: "$30-$60",
      platform: "amazon",
    },
  ],
  "why-is-my-cat-losing-weight": [
    {
      name: "High-Calorie Recovery Cat Food",
      description: "Veterinary-formulated nutrition for cats needing to gain or maintain weight.",
      url: chewyUrl("recovery-cat-food"),
      priceHint: "$25-$45",
      platform: "chewy",
    },
    {
      name: "Pet Insurance — Accident & Illness",
      description: "Unexplained weight loss can mean expensive diagnostics. Get covered before you need it.",
      url: insuranceUrl("NEXT_PUBLIC_AFFILIATE_LEMONADE_URL", "https://www.lemonade.com/pet"),
      priceHint: "From $10/mo",
      platform: "other",
    },
  ],
  "pet-insurance-worth-it": [
    {
      name: "Compare Pet Insurance Quotes",
      description: "Get quotes from top providers in minutes. Compare Lemonade, Healthy Paws, and more.",
      url: insuranceUrl("NEXT_PUBLIC_AFFILIATE_LEMONADE_URL", "https://www.lemonade.com/pet"),
      priceHint: "From $10/mo",
      platform: "other",
    },
  ],
  "bringing-home-new-puppy-checklist": [
    {
      name: "Puppy Starter Kit",
      description: "Crate, bed, bowls, toys, and training pads — everything for the first week home.",
      url: amazonUrl("B07XYZ0004"),
      priceHint: "$80-$150",
      platform: "amazon",
    },
    {
      name: "Enzymatic Cleaner — Pet Stain Remover",
      description: "Breaks down urine proteins so your puppy won't keep returning to the same spot.",
      url: chewyUrl("enzymatic-cleaner"),
      priceHint: "$10-$20",
      platform: "chewy",
    },
  ],
  "pet-emergency-kit-checklist": [
    {
      name: "Pet First Aid Kit — Complete",
      description: "Vet-stocked emergency kit with gauze, bandages, antiseptic, thermometer, tick remover.",
      url: amazonUrl("B07XYZ0000"),
      priceHint: "$30-$50",
      platform: "amazon",
    },
  ],
  "flea-tick-prevention-guide": [
    {
      name: "Seresto Flea & Tick Collar",
      description: "8-month protection, vet-recommended. Repels and kills fleas and ticks.",
      url: chewyUrl("seresto-collar"),
      priceHint: "$55-$65",
      platform: "chewy",
    },
    {
      name: "Tick Removal Tool Kit",
      description: "Safe, complete tick removal — removes head and body in one motion.",
      url: amazonUrl("B07XYZ0005"),
      priceHint: "$5-$12",
      platform: "amazon",
    },
  ],
  "common-household-poisons-pets": [
    {
      name: "Childproof Cabinet Latches",
      description: "Keep cleaning supplies and chemicals secured from curious pets. Adhesive, no drilling.",
      url: amazonUrl("B07XYZ0006"),
      priceHint: "$8-$15",
      platform: "amazon",
    },
  ],
  "dog-dental-care-guide": [
    {
      name: "Enzymatic Dog Toothpaste Kit",
      description: "Poultry-flavored toothpaste + dual-head brush. VOHC-accepted for plaque reduction.",
      url: chewyUrl("enzymatic-toothpaste-kit"),
      priceHint: "$10-$18",
      platform: "chewy",
    },
    {
      name: "Greenies Dental Chews",
      description: "VOHC-accepted daily dental chews that reduce tartar buildup. Multiple sizes available.",
      url: amazonUrl("B07XYZ0007"),
      priceHint: "$25-$40",
      platform: "amazon",
    },
  ],
  "best-dog-food-for-weight-loss": [
    {
      name: "Weight Management Dry Dog Food",
      description: "High-protein, low-fat formula with L-carnitine for healthy weight loss.",
      url: chewyUrl("weight-management-dog-food"),
      priceHint: "$45-$70",
      platform: "chewy",
    },
    {
      name: "Pet Food Scale",
      description: "Precision digital kitchen scale for accurate portion control.",
      url: amazonUrl("B07XYZ0008"),
      priceHint: "$20-$35",
      platform: "amazon",
    },
  ],
  "senior-dog-care-tips": [
    {
      name: "Orthopedic Dog Bed",
      description: "Memory foam bed for senior dogs with arthritis. Machine-washable cover, non-slip bottom.",
      url: amazonUrl("B07XYZ0009"),
      priceHint: "$40-$100",
      platform: "amazon",
    },
  ],
  "puppy-vaccination-schedule": [
    {
      name: "Pet Insurance — Accident & Illness Plan",
      description: "Enroll your puppy before any conditions are diagnosed. No pre-existing exclusions.",
      url: insuranceUrl("NEXT_PUBLIC_AFFILIATE_LEMONADE_URL", "https://www.lemonade.com/pet"),
      priceHint: "From $10/mo",
      platform: "other",
    },
  ],
  "how-to-read-dog-food-labels": [
    {
      name: "Vet-Formulated Premium Dog Food",
      description: "Transparent labeling, named animal protein first, AAFCO feeding-trial tested.",
      url: chewyUrl("premium-dog-food"),
      priceHint: "$55-$85",
      platform: "chewy",
    },
  ],
  "cat-weight-management": [
    {
      name: "Weight Management Wet Cat Food",
      description: "High-protein, low-carb pate — ideal for feline weight loss. Grain-free, moisture-rich.",
      url: chewyUrl("weight-management-cat-food"),
      priceHint: "$28-$45/case",
      platform: "chewy",
    },
    {
      name: "Cat Food Puzzle Feeder",
      description: "Makes your cat work for every kibble — slows eating and burns calories.",
      url: amazonUrl("B07XYZ0010"),
      priceHint: "$12-$25",
      platform: "amazon",
    },
  ],
  "signs-your-cat-is-sick": [
    {
      name: "Pet Insurance — Cats",
      description: "Accident & illness coverage for cats. Diagnostic tests, specialist visits, hospitalization covered.",
      url: insuranceUrl("NEXT_PUBLIC_AFFILIATE_LEMONADE_URL", "https://www.lemonade.com/pet"),
      priceHint: "From $6/mo",
      platform: "other",
    },
  ],
  "best-pet-safe-cleaning-products": [
    {
      name: "Steam Mop — Chemical-Free Floor Cleaning",
      description: "Uses only water — no chemicals, no residues. Safe for pets immediately after use.",
      url: amazonUrl("B07XYZ0011"),
      priceHint: "$60-$120",
      platform: "amazon",
    },
  ],
  "dog-exercise-needs-by-breed": [
    {
      name: "Dog Food Puzzle Toy",
      description: "Interactive puzzle — 15 minutes = equivalent mental fatigue of a 1-hour walk.",
      url: amazonUrl("B07XYZ0012"),
      priceHint: "$15-$30",
      platform: "amazon",
    },
  ],
};

export function getProductRecommendations(slug: string): ProductRecommendation[] {
  return (PRODUCT_RECS[slug] || []).filter((product) => {
    if (product.platform === "amazon") return hasEnv("NEXT_PUBLIC_AFFILIATE_AMAZON_TAG");
    if (product.platform === "chewy") {
      return hasEnv("NEXT_PUBLIC_AFFILIATE_CHEWY_URL") || hasEnv("NEXT_PUBLIC_AFFILIATE_CHEWY_TAG");
    }
    return INSURANCE_PARTNERS.some((partner) => partner.isAffiliate);
  });
}
