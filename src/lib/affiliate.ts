// Affiliate configuration — all partner links in one place
// Replace placeholder URLs with your actual affiliate links after program approval.

export interface InsurancePartner {
  name: string;
  tagline: string;
  url: string;
  rating: number; // 1-5
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

// --- Insurance Partners ---
// Apply at: Impact Radius, Commission Junction, or direct partner sites
// Replace urls with your actual affiliate links after approval.

export const INSURANCE_PARTNERS: InsurancePartner[] = [
  {
    name: "Lemonade",
    tagline: "Fast claims, AI-powered, starting at $10/mo",
    url: "https://lemonade.com/pet",
    rating: 4.5,
    highlights: ["Claims paid in seconds", "Preventive care add-on", "Giveback program"],
    bestFor: "Tech-savvy pet parents who want fast digital claims",
  },
  {
    name: "Healthy Paws",
    tagline: "No annual or lifetime payout caps",
    url: "https://www.healthypawspetinsurance.com/",
    rating: 4.5,
    highlights: ["Unlimited annual payouts", "Covers hereditary conditions", "Most vet-reviewed"],
    bestFor: "Pets prone to hereditary or chronic conditions",
  },
  {
    name: "Embrace",
    tagline: "Wellness rewards + diminishing deductible",
    url: "https://www.embracepetinsurance.com/",
    rating: 4,
    highlights: ["Wellness Rewards program", "Diminishing deductible", "Covers exam fees"],
    bestFor: "Comprehensive coverage with preventive care",
  },
  {
    name: "Spot",
    tagline: "Customizable deductibles & reimbursement",
    url: "https://spotpetinsurance.com/",
    rating: 4,
    highlights: ["$100–$1,000 deductible range", "70%–90% reimbursement", "No upper age limit"],
    bestFor: "Budget flexibility and senior pets",
  },
  {
    name: "Trupanion",
    tagline: "Pays vets directly, 90% coverage",
    url: "https://trupanion.com/",
    rating: 4,
    highlights: ["Direct vet payment", "No payout limits", "Per-condition deductible"],
    bestFor: "Pet parents who can't float large upfront vet bills",
  },
];

// --- Product Recommendations ---
// Replace with your Amazon Associates / Chewy affiliate links after approval.

export const PRODUCT_RECS: Record<string, ProductRecommendation[]> = {
  // Toxicity / emergency posts
  "dog-chocolate-toxicity": [
    {
      name: "Pet First Aid Kit",
      description: "Complete emergency kit with vet-approved supplies for poisoning and accidents.",
      url: "https://www.amazon.com/dp/example?tag=your-tag",
      priceHint: "$25–$40",
      platform: "amazon",
    },
    {
      name: "Pet-Safe Carob Treats",
      description: "Chocolate-flavored carob treats that are 100% safe for dogs — a guilt-free alternative.",
      url: "https://www.chewy.com/example",
      priceHint: "$8–$15",
      platform: "chewy",
    },
  ],
  "can-dogs-eat-grapes": [
    {
      name: "Pet Emergency Kit",
      description: "Be prepared for toxin ingestion and emergencies with a vet-stocked first aid kit.",
      url: "https://www.amazon.com/dp/example?tag=your-tag",
      priceHint: "$25–$40",
      platform: "amazon",
    },
    {
      name: "Blueberries & Apple Slices — Pet-Safe Fruit Treats",
      description: "Grapes are toxic, but these freeze-dried fruit treats are safe and dogs love them.",
      url: "https://www.chewy.com/example",
      priceHint: "$6–$12",
      platform: "chewy",
    },
  ],
  "can-dogs-eat-onions": [
    {
      name: "Single-Ingredient Dog Treats",
      description: "No onion, garlic, or hidden alliums — just pure meat or veggie treats.",
      url: "https://www.chewy.com/example",
      priceHint: "$10–$20",
      platform: "chewy",
    },
  ],
  "can-dogs-eat-avocado": [
    {
      name: "Dog-Safe Chew Toys",
      description: "If your dog got into the avocado pit, redirect that chewing instinct to a durable toy.",
      url: "https://www.amazon.com/dp/example?tag=your-tag",
      priceHint: "$12–$25",
      platform: "amazon",
    },
  ],
  "can-cats-eat-tuna": [
    {
      name: "Vet-Formulated Cat Food",
      description: "Nutritionally balanced wet food — safer and healthier than human tuna for your cat.",
      url: "https://www.chewy.com/example",
      priceHint: "$18–$35",
      platform: "chewy",
    },
  ],
  "lily-toxicity-cats": [
    {
      name: "Pet-Safe Indoor Plants Collection",
      description: "Spider plants, Boston ferns, and calatheas — all non-toxic to cats and beautiful.",
      url: "https://www.amazon.com/dp/example?tag=your-tag",
      priceHint: "$15–$40",
      platform: "amazon",
    },
  ],
  "sago-palm-toxicity-pets": [
    {
      name: "Pet-Safe Houseplants Bundle",
      description: "Replace toxic plants with these vet-approved, pet-friendly indoor plants.",
      url: "https://www.amazon.com/dp/example?tag=your-tag",
      priceHint: "$20–$50",
      platform: "amazon",
    },
  ],
  "household-plants-toxic-to-cats": [
    {
      name: "Cat-Safe Plant Starter Kit",
      description: "Cat grass, spider plant, and parlor palm — a safe indoor garden for cat homes.",
      url: "https://www.chewy.com/example",
      priceHint: "$20–$40",
      platform: "chewy",
    },
  ],
  "calculate-dog-calorie-needs": [
    {
      name: "Digital Pet Scale",
      description: "Accurate weight tracking is essential for portion control. High-precision, easy-clean platform.",
      url: "https://www.amazon.com/dp/example?tag=your-tag",
      priceHint: "$30–$60",
      platform: "amazon",
    },
    {
      name: "Weight Management Dog Food",
      description: "Vet-recommended formulas for healthy weight loss with balanced nutrition.",
      url: "https://www.chewy.com/example",
      priceHint: "$40–$70",
      platform: "chewy",
    },
  ],
  "understanding-body-condition-score": [
    {
      name: "Pet Body Weight Scale",
      description: "Track your pet's weight at home and monitor BCS progress between vet visits.",
      url: "https://www.amazon.com/dp/example?tag=your-tag",
      priceHint: "$30–$60",
      platform: "amazon",
    },
  ],
    "pet-insurance-worth-it": [
    {
      name: "Pet Insurance Comparison Tool",
      description: "Get quotes from top providers in minutes. Compare Lemonade, Healthy Paws, and more.",
      url: "https://lemonade.com/pet",
      priceHint: "From $10/mo",
      platform: "other",
    },
  ],
  "bringing-home-new-puppy-checklist": [
    {
      name: "Puppy Starter Kit",
      description: "Crate, bed, bowls, toys, and training pads — everything for the first week home.",
      url: "https://www.amazon.com/dp/example?tag=your-tag",
      priceHint: "$80–$150",
      platform: "amazon",
    },
    {
      name: "Enzymatic Cleaner — Pet Stain & Odor Remover",
      description: "Breaks down urine proteins so your puppy will not keep returning to the same spot.",
      url: "https://www.chewy.com/example",
      priceHint: "$10–$20",
      platform: "chewy",
    },
  ],
  "pet-emergency-kit-checklist": [
    {
      name: "Pet First Aid Kit — Complete",
      description: "Vet-stocked emergency kit with gauze, bandages, antiseptic, thermometer, and tick remover.",
      url: "https://www.amazon.com/dp/example?tag=your-tag",
      priceHint: "$30–$50",
      platform: "amazon",
    },
  ],
  "flea-tick-prevention-guide": [
    {
      name: "Seresto Flea & Tick Collar",
      description: "8-month protection, vet-recommended. Repels and kills fleas and ticks.",
      url: "https://www.chewy.com/example",
      priceHint: "$55–$65",
      platform: "chewy",
    },
    {
      name: "Tick Removal Tool Kit",
      description: "Safe, complete tick removal — removes head and body in one motion.",
      url: "https://www.amazon.com/dp/example?tag=your-tag",
      priceHint: "$5–$12",
      platform: "amazon",
    },
  ],
  "common-household-poisons-pets": [
    {
      name: "Childproof Cabinet Latches",
      description: "Keep cleaning supplies and chemicals secured from curious pets. Adhesive, no drilling.",
      url: "https://www.amazon.com/dp/example?tag=your-tag",
      priceHint: "$8–$15",
      platform: "amazon",
    },
  ],
  "dog-dental-care-guide": [
    {
      name: "Enzymatic Dog Toothpaste Kit",
      description: "Poultry-flavored toothpaste + dual-head brush. VOHC-accepted for plaque reduction.",
      url: "https://www.chewy.com/example",
      priceHint: "$10–$18",
      platform: "chewy",
    },
    {
      name: "Greenies Dental Chews",
      description: "VOHC-accepted daily dental chews that reduce tartar buildup. Available in multiple sizes.",
      url: "https://www.amazon.com/dp/example?tag=your-tag",
      priceHint: "$25–$40",
      platform: "amazon",
    },
  ],
  "best-dog-food-for-weight-loss": [
    {
      name: "Weight Management Dry Dog Food",
      description: "High-protein, low-fat formula with L-carnitine for healthy weight loss.",
      url: "https://www.chewy.com/example",
      priceHint: "$45–$70",
      platform: "chewy",
    },
    {
      name: "Pet Food Scale",
      description: "Precision digital kitchen scale for accurate portion control — cups can be 20% off.",
      url: "https://www.amazon.com/dp/example?tag=your-tag",
      priceHint: "$20–$35",
      platform: "amazon",
    },
  ],
  "senior-dog-care-tips": [
    {
      name: "Orthopedic Dog Bed",
      description: "Memory foam bed for senior dogs with arthritis. Machine-washable cover, non-slip bottom.",
      url: "https://www.amazon.com/dp/example?tag=your-tag",
      priceHint: "$40–$100",
      platform: "amazon",
    },
  ],
  "puppy-vaccination-schedule": [
    {
      name: "Pet Insurance — Accident & Illness Plan",
      description: "Enroll your puppy before any conditions are diagnosed. Early enrollment = no pre-existing exclusions.",
      url: "https://lemonade.com/pet",
      priceHint: "From $10/mo",
      platform: "other",
    },
  ],
  "how-to-read-dog-food-labels": [
    {
      name: "Vet-Formulated Premium Dog Food",
      description: "Transparent labeling, named animal protein first, AAFCO feeding-trial tested.",
      url: "https://www.chewy.com/example",
      priceHint: "$55–$85",
      platform: "chewy",
    },
  ],
  "cat-weight-management": [
    {
      name: "Weight Management Wet Cat Food",
      description: "High-protein, low-carb pate — ideal for feline weight loss. Grain-free, moisture-rich.",
      url: "https://www.chewy.com/example",
      priceHint: "$28–$45/case",
      platform: "chewy",
    },
    {
      name: "Cat Food Puzzle Feeder",
      description: "Makes your cat work for every kibble — slows eating and burns calories.",
      url: "https://www.amazon.com/dp/example?tag=your-tag",
      priceHint: "$12–$25",
      platform: "amazon",
    },
  ],
  "signs-your-cat-is-sick": [
    {
      name: "Pet Insurance — Cats",
      description: "Accident & illness coverage for cats. Early diagnostic tests, specialist visits, and hospitalization covered.",
      url: "https://lemonade.com/pet",
      priceHint: "From $6/mo",
      platform: "other",
    },
  ],
  "best-pet-safe-cleaning-products": [
    {
      name: "Steam Mop — Chemical-Free Floor Cleaning",
      description: "Uses only water — no chemicals, no residues. Safe for pets immediately after use.",
      url: "https://www.amazon.com/dp/example?tag=your-tag",
      priceHint: "$60–$120",
      platform: "amazon",
    },
  ],
  "dog-exercise-needs-by-breed": [
    {
      name: "Dog Food Puzzle Toy",
      description: "Nina Ottosson-style interactive puzzle — 15 minutes = equivalent mental fatigue of a 1-hour walk.",
      url: "https://www.amazon.com/dp/example?tag=your-tag",
      priceHint: "$15–$30",
      platform: "amazon",
    },
  ],
"why-is-my-cat-losing-weight": [
    {
      name: "High-Calorie Recovery Cat Food",
      description: "Veterinary-formulated nutrition for cats needing to gain or maintain weight.",
      url: "https://www.chewy.com/example",
      priceHint: "$25–$45",
      platform: "chewy",
    },
    {
      name: "Pet Insurance — Accident & Illness",
      description: "Unexplained weight loss can mean expensive diagnostics. Get covered before you need it.",
      url: "https://lemonade.com/pet",
      priceHint: "From $10/mo",
      platform: "other",
    },
  ],
};