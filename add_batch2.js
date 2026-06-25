const fs = require("fs");
const path = "C:/Users/alienware/Documents/petvitals/src/data/toxicity.ts";
const content = fs.readFileSync(path, "utf8");

function qi(id, name, aliases, cat, sd, sc, rl, desc, sa, ben, sym, act, tags) {
  return "  {\n" +
    `    id: "${id}",\n` +
    `    name: "${name}",\n` +
    `    aliases: ["${aliases.join('", "')}"],\n` +
    `    category: "${cat}",\n` +
    `    safeForDog: ${sd},\n` +
    `    safeForCat: ${sc},\n` +
    `    riskLevel: "${rl}",\n` +
    `    description: "${desc}",\n` +
    `    safeAmount: "${sa}",\n` +
    `    benefits: "${ben}",\n` +
    `    symptoms: "${sym}",\n` +
    `    action: "${act}",\n` +
    `    tags: ["${tags.join('", "')}"],\n` +
    "  },";
}

const newItems = [
qi("pomegranate","Pomegranates",["pomegranate","pomegranates"],"fruits",false,false,"caution","Pomegranate is not toxic but the peel and roots contain tannins. Feed only the arils in small amounts.","Small amount of arils only","","Digestive upset in large amounts","Feed only the seed casings (arils). Avoid peel and roots.",["fruit","tannins","caution"]),
qi("dates","Dates",["dates","date fruit"],"fruits",true,false,"safe","Dates are safe in small amounts. Very high in sugar so feed sparingly. Remove the pit.","1-2 dates pitted","Natural energy, fiber, potassium","","Remove pit. Feed in small amounts due to high sugar.",["fruit","treat","high-sugar","fiber"]),
qi("dragonfruit","Dragonfruit",["dragonfruit","pitaya"],"fruits",true,false,"safe","Dragonfruit is safe for dogs. Remove the skin and cut into small pieces.","A few small cubes","Rich in vitamin C, fiber, and antioxidants","","Peel and cut into small pieces.",["fruit","treat","vitamin-c","antioxidant"]),
qi("passion-fruit","Passion Fruit",["passion fruit","passionfruit"],"fruits",true,false,"caution","Passion fruit flesh is safe but seeds contain trace cyanide. Feed in very small amounts.","Small amount of pulp only","Rich in vitamin C and fiber","","Scoop out pulp. Avoid seeds. Feed sparingly.",["fruit","seeds","cyanide","caution"]),
qi("goji-berries","Goji Berries",["goji berries","goji berry","wolfberry"],"fruits",true,true,"safe","Goji berries are safe in small amounts. Rich in antioxidants.","A few berries","Rich in antioxidants, vitamins A and C","","Feed dried or fresh in small amounts.",["fruit","superfood","antioxidant","vitamin-a"]),
qi("radish","Radish",["radish","radishes"],"vegetables",true,false,"safe","Radishes are safe for dogs in small amounts. Crunchy and low-calorie.","1-2 thin slices","Low calorie, rich in vitamin C and fiber","","Wash and slice thinly. Feed raw.",["vegetable","treat","low-calorie","vitamin-c"]),
qi("turnip","Turnip",["turnip","turnips"],"vegetables",true,true,"safe","Turnips are safe for pets when cooked. Can cause gas in large amounts.","Small cubes cooked","Rich in fiber, vitamin C, and potassium","","Cook without seasoning. Cut into small cubes.",["vegetable","fiber","vitamin-c","cooked"]),
qi("artichoke","Artichoke",["artichoke","artichokes"],"vegetables",true,false,"safe","Artichoke hearts are safe for dogs. Leaves and choke are choking hazards.","Small pieces of heart only","Rich in fiber, vitamin C, and antioxidants","","Only feed the cooked heart. Avoid leaves and choke.",["vegetable","fiber","antioxidant","choking-hazard"]),
qi("okra","Okra",["okra","ladys finger"],"vegetables",true,true,"safe","Okra is safe for pets. Contains beneficial fiber and nutrients.","A few slices cooked","Rich in fiber, vitamin C, and folate","","Cook without seasoning. Cut into small pieces.",["vegetable","fiber","vitamin-c","cooked"]),
qi("cooking-oil","Cooking Oils (Large Amounts)",["cooking oil","vegetable oil","olive oil","coconut oil","canola oil"],"human-food",false,false,"caution","Small amounts of healthy oils are fine. Large amounts can cause pancreatitis.","1 tsp per 10lbs","","Vomiting, diarrhea, abdominal pain, pancreatitis risk","Small amounts only. Too much can cause pancreatitis.",["oil","high-fat","pancreatitis","caution"]),
qi("maple-syrup","Maple Syrup",["maple syrup","pure maple syrup"],"human-food",true,false,"caution","Pure maple syrup is not toxic but is pure sugar. Can cause blood sugar spikes.","1/4 tsp max","Contains some antioxidants and minerals","","Only pure maple syrup. Very small amounts.",["sweetener","sugar","antioxidant","caution"]),
qi("spider-plant","Spider Plant",["spider plant","chlorophytum"],"plants",true,true,"safe","Spider plants are non-toxic to pets. Safe houseplants.","","","","No action needed. Safe houseplant.",["plant","houseplant","safe"]),
qi("boston-fern","Boston Fern",["boston fern","sword fern","nephrolepis"],"plants",true,true,"safe","Boston ferns are non-toxic to pets. Safe to have indoors.","","","","No action needed. Safe houseplant.",["plant","houseplant","safe"]),
qi("bamboo-palm","Bamboo Palm",["bamboo palm","parlour palm","chamaedorea"],"plants",true,true,"safe","Bamboo palms are non-toxic and safe for pets. Air-purifying plant.","","","","No action needed. Safe houseplant.",["plant","houseplant","safe","air-purifying"]),
qi("areca-palm","Areca Palm",["areca palm","butterfly palm","dypsis lutescens"],"plants",true,true,"safe","Areca palms are non-toxic and safe for pets. Popular indoor palm.","","","","No action needed. Safe houseplant.",["plant","houseplant","safe"]),
qi("rubber-plant","Rubber Plant",["rubber plant","ficus elastica"],"plants",false,false,"toxic","Rubber plants contain ficin that can cause oral irritation and digestive upset.","","","Oral irritation, drooling, vomiting, diarrhea","Contact vet if large amount ingested.",["toxic","plant","houseplant","ficin"]),
qi("fiddle-leaf-fig","Fiddle Leaf Fig",["fiddle leaf fig","ficus lyrata"],"plants",false,false,"toxic","Fiddle leaf figs contain ficin causing oral irritation and GI upset.","","","Oral irritation, drooling, vomiting, diarrhea","Contact vet if large amount ingested.",["toxic","plant","houseplant","ficin"]),
qi("monstera","Monstera (Swiss Cheese Plant)",["monstera","swiss cheese plant","split leaf philodendron"],"plants",false,false,"toxic","Monstera contains calcium oxalates causing oral irritation and swelling.","","","Oral pain, swelling, drooling, vomiting, difficulty swallowing","Rinse mouth. Contact vet if severe.",["toxic","plant","houseplant","oxalates"]),
qi("zz-plant","ZZ Plant",["zz plant","zamioculcas","zamiifolia"],"plants",false,false,"toxic","ZZ plant contains calcium oxalates. All parts are toxic.","","","Oral irritation, vomiting, diarrhea","Contact vet if ingested.",["toxic","plant","houseplant","oxalates"]),
qi("peperomia","Peperomia",["peperomia","radiator plant"],"plants",true,true,"safe","Peperomia is non-toxic and safe for pets. Many varieties.","","","","No action needed. Safe houseplant.",["plant","houseplant","safe"]),
qi("pine-nuts","Pine Nuts",["pine nuts","pine nut","pignoli","pinyon nuts"],"nuts-seeds",false,false,"caution","Pine nuts are not toxic but high in fat. Can cause digestive upset.","A few nuts","Rich in healthy fats and vitamin E","Digestive upset, pancreatitis risk","Feed in very small amounts. Unsalted only.",["nut","high-fat","caution"]),
qi("hemp-seeds","Hemp Seeds",["hemp seeds","hemp hearts"],"nuts-seeds",true,true,"safe","Hemp seeds are safe and highly nutritious. Rich in omega fatty acids.","1 tsp cats, 1 tbsp dogs","Rich in omega-3 and omega-6, protein, magnesium","","Sprinkle over food. Store in refrigerator.",["seed","omega-3","protein","superfood"]),
qi("poppy-seeds","Poppy Seeds",["poppy seeds","poppy seed"],"nuts-seeds",false,false,"toxic","Poppy seeds contain opiates that can cause nervous system depression.","","","Drowsiness, unsteady gait, pinpoint pupils, slowed breathing","Contact vet if large amount ingested.",["toxic","seed","opiates","neurological"]),
qi("kombucha","Kombucha",["kombucha","fermented tea"],"beverages",false,false,"toxic","Kombucha contains small amounts of alcohol, caffeine, and acidic compounds.","","","Vomiting, diarrhea, alcohol poisoning, acidosis","Keep away from pets. Contact vet if ingested.",["beverage","alcohol","caffeine","fermented"]),
qi("matcha","Matcha (Green Tea Powder)",["matcha","green tea powder","matcha tea"],"beverages",false,false,"danger","Matcha is concentrated green tea with high caffeine content. Very dangerous.","","","Restlessness, rapid heart rate, vomiting, tremors, seizures","Emergency. Contact vet immediately.",["toxic","emergency","caffeine","stimulant"]),
qi("nutmeg","Nutmeg",["nutmeg"],"seasonings",false,false,"danger","Nutmeg contains myristicin which causes hallucinations and seizures. Even small amounts dangerous.","","","Hallucinations, disorientation, agitation, seizures, abdominal pain","Emergency. Contact vet immediately if ingested.",["toxic","emergency","spice","myristicin","hallucinogenic"]),
qi("wasabi","Wasabi",["wasabi","japanese horseradish"],"seasonings",false,false,"caution","Wasabi is very spicy and causes mouth/stomach irritation. Not toxic but very uncomfortable.","","","Mouth irritation, drooling, stomach upset","Avoid feeding. Provide water if ingested.",["spice","irritant","caution"]),
qi("curry-powder","Curry Powder",["curry powder","curry spice"],"seasonings",false,false,"caution","Curry powder contains multiple spices. May contain garlic or onion powder.","","","Digestive upset, mouth irritation","Check ingredients. Avoid if contains garlic or onion powder.",["spice","irritant","garlic-warning","caution"]),
qi("cough-syrup","Cough Syrup (Dextromethorphan)",["cough syrup","dextromethorphan","dxm","robitussin"],"medications",false,false,"danger","Cough syrups often contain dextromethorphan and/or xylitol. Both dangerous.","","","Vomiting, agitation, tremors, seizures, xylitol toxicity","Emergency. Check for xylitol. Contact vet immediately.",["toxic","emergency","medication","xylitol-warning","sedative"]),
qi("antihistamines","Antihistamines (Benadryl)",["antihistamines","benadryl","diphenhydramine","claritin","zyrtec"],"medications",false,false,"danger","Antihistamines can cause serious side effects in pets. Cats are especially sensitive.","","","Drowsiness, lethargy, vomiting, rapid heart rate, agitation","Contact vet. Never medicate without professional guidance.",["medication","antihistamine","sedative","danger"]),
qi("insulin","Insulin",["insulin","diabetes medication","glargine"],"medications",false,false,"danger","Insulin overdose causes severe hypoglycemia. Life-threatening emergency.","","","Weakness, confusion, seizures, coma from low blood sugar","Emergency. Contact vet immediately.",["toxic","emergency","medication","hormone","hypoglycemia"]),
qi("warfarin","Blood Thinners (Warfarin)",["warfarin","coumadin","blood thinner","anticoagulant"],"medications",false,false,"danger","Blood thinners prevent clotting. Even small overdoses cause severe bleeding.","","","Bleeding, bruising, bloody stool, weakness, collapse","Emergency. Contact vet immediately.",["toxic","emergency","medication","bleeding","anticoagulant"]),
qi("thyroid-meds","Thyroid Medication",["thyroid medication","levothyroxine","synthroid"],"medications",false,false,"danger","Thyroid hormone overdose causes severe metabolic and cardiac symptoms.","","","Vomiting, diarrhea, hyperactivity, rapid heart rate, weight loss","Contact vet immediately.",["toxic","emergency","medication","hormone","cardiac"]),
qi("nicotine","Cigarettes & Nicotine",["cigarettes","nicotine","tobacco","e-cigarettes","vape","nicotine gum","nicotine patch"],"household",false,false,"danger","Nicotine is highly toxic. Even cigarette butts can poison a pet.","","","Vomiting, drooling, agitation, tremors, seizures, collapse, coma","Emergency. Nicotine is highly toxic. Contact vet immediately.",["toxic","emergency","household","nicotine","stimulant","fatal"]),
qi("hand-sanitizer","Hand Sanitizer",["hand sanitizer","sanitizer","hand gel","alcohol gel"],"household",false,false,"danger","Hand sanitizer contains high concentration of alcohol. Can cause alcohol poisoning.","","","Alcohol poisoning: vomiting, disorientation, slowed breathing, coma","Emergency. Contact vet immediately.",["toxic","emergency","household","alcohol","fatal"]),
qi("dry-ice","Dry Ice",["dry ice","solid carbon dioxide"],"household",false,false,"danger","Dry ice causes frostbite to mouth and can cause internal injury from gas expansion.","","","Frostbite to mouth, gastrointestinal injury","Contact vet. Do not induce vomiting.",["household","chemical","frostbite","danger"]),
qi("glow-sticks","Glow Sticks & Jewelry",["glow sticks","glow jewelry","light sticks","glow necklace"],"household",false,false,"caution","Glow stick liquid causes mouth irritation but is not highly toxic.","","","Mouth irritation, drooling, pawing at mouth, vomiting","Rinse mouth. Usually self-limiting.",["household","chemical","irritant","caution"]),
qi("incense","Incense & Smudge Sticks",["incense","smudge stick","sage","frankincense"],"household",false,false,"caution","Incense can cause respiratory irritation. Smoke inhalation and ingestion risks.","","","Respiratory irritation, vomiting if ingested","Keep out of reach. Ensure good ventilation.",["household","irritant","respiratory","caution"]),
];

console.log("Generated " + newItems.length + " new items");

// Find the end of the auto-generated section and insert before it
const marker = "ADDITIONAL ITEMS (AUTO-GENERATED)";
const markerIdx = content.indexOf(marker);
if (markerIdx >= 0) {
  // Find the last closing '  },' before the final '];'
  const sectionStart = content.lastIndexOf("]", markerIdx - 2);
  const sectionEnd = content.indexOf("];", markerIdx);
  
  // Insert after the existing auto-generated section, before the closing ];
  if (sectionEnd >= 0) {
    const insertPoint = content.lastIndexOf("\n", sectionEnd - 1);
    const before = content.substring(0, insertPoint);
    const after = content.substring(insertPoint);
    const newCode = "\n" + newItems.join("\n") + "\n";
    const result = before + newCode + after;
    fs.writeFileSync(path, result, "utf8");
    console.log("Inserted " + newItems.length + " items at the end of the auto-generated section");
  }
} else {
  console.log("No auto-generated section found, inserting at end of array");
  const idx = content.lastIndexOf("];", content.indexOf("export const toxicityCategories"));
  const before = content.substring(0, idx);
  const after = content.substring(idx);
  const newCode = "\n\n  // ===== ADDITIONAL ITEMS (BATCH 2) =====\n" + newItems.join("\n") + "\n";
  const result = before + newCode + after;
  fs.writeFileSync(path, result, "utf8");
  console.log("Inserted " + newItems.length + " items");
}
