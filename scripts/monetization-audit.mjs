import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const envFiles = [".env", ".env.local", ".env.production"].map((file) => resolve(process.cwd(), file));
const strict = process.argv.includes("--strict");

function parseEnvFile(file) {
  if (!existsSync(file)) return {};

  return readFileSync(file, "utf8")
    .split(/\r?\n/)
    .reduce((vars, line) => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) return vars;

      const match = trimmed.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
      if (!match) return vars;

      const value = match[2].trim().replace(/^['"]|['"]$/g, "");
      vars[match[1]] = value;
      return vars;
    }, {});
}

const vars = envFiles.reduce((acc, file) => ({ ...acc, ...parseEnvFile(file) }), {});

const checks = [
  {
    label: "Google Analytics",
    keys: ["NEXT_PUBLIC_GA_MEASUREMENT_ID"],
    commercialImpact: "traffic attribution",
  },
  {
    label: "AdSense default slot",
    keys: ["NEXT_PUBLIC_ADSENSE_SLOT"],
    commercialImpact: "sitewide display ad revenue",
  },
  {
    label: "AdSense article slot",
    keys: ["NEXT_PUBLIC_ADSENSE_ARTICLE_SLOT"],
    commercialImpact: "in-article display ad revenue",
  },
  {
    label: "AdSense feed slot",
    keys: ["NEXT_PUBLIC_ADSENSE_FEED_SLOT"],
    commercialImpact: "listing page display ad revenue",
  },
  {
    label: "Insurance affiliates",
    keys: [
      "NEXT_PUBLIC_AFFILIATE_LEMONADE_URL",
      "NEXT_PUBLIC_AFFILIATE_HEALTHYPAWS_URL",
      "NEXT_PUBLIC_AFFILIATE_EMBRACE_URL",
      "NEXT_PUBLIC_AFFILIATE_SPOT_URL",
      "NEXT_PUBLIC_AFFILIATE_TRUPANION_URL",
    ],
    commercialImpact: "insurance quote commission",
    anyKeyWorks: true,
  },
  {
    label: "Amazon Associates",
    keys: ["NEXT_PUBLIC_AFFILIATE_AMAZON_TAG"],
    commercialImpact: "product recommendation commission",
  },
  {
    label: "Chewy affiliate",
    keys: ["NEXT_PUBLIC_AFFILIATE_CHEWY_URL", "NEXT_PUBLIC_AFFILIATE_CHEWY_TAG"],
    commercialImpact: "pet product recommendation commission",
    anyKeyWorks: true,
  },
];

const configured = (key) => Boolean((vars[key] || "").trim());
const missing = [];

console.log("PetVitals monetization audit");
console.log("");

for (const check of checks) {
  const active = check.anyKeyWorks
    ? check.keys.some(configured)
    : check.keys.every(configured);

  console.log(`${active ? "[configured]" : "[missing]"} ${check.label}`);
  console.log(`  Impact: ${check.commercialImpact}`);

  const keyStatus = check.keys.map((key) => `${key}: ${configured(key) ? "set" : "empty"}`);
  console.log(`  Vars: ${keyStatus.join(", ")}`);

  if (!active) missing.push(check.label);
}

console.log("");

if (missing.length === 0) {
  console.log("All monetization channels have the required local environment values.");
} else {
  console.log("Needs attention:");
  for (const item of missing) console.log(`- ${item}`);
  console.log("");
  console.log("Note: NEXT_PUBLIC_ values are embedded at build time, so update Vercel Production env vars before deploying.");
}

if (strict && missing.length > 0) {
  process.exitCode = 1;
}
