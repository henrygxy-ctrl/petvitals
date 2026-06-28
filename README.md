# PetVitals — Free Pet Health & Safety Tools

**getpetvitals.com** — Instant pet toxicity checker, feeding calculator, weight tracker, and evidence-based pet health guides.

## Tech Stack

- **Framework:** Next.js 16 (Turbopack) + TypeScript
- **Styling:** Tailwind CSS 4 + shadcn/ui
- **Database:** SQLite via Prisma ORM
- **Auth:** NextAuth v5 with credentials
- **Analytics:** Google Analytics via Partytown worker
- **Monetization:** AdSense + Affiliate (Impact.com, Amazon, Chewy, insurance partners)
- **Deployment:** Vercel (GitHub auto-deploy)

## Quick Start

```bash
# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Push database schema
npx prisma db push

# Start development server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
src/
├── app/          # Next.js App Router pages
│   ├── blog/     # Blog (25+ articles)
│   ├── toxicity/ # Toxicity checker (439 items)
│   ├── insurance/ # Insurance comparison guides
│   └── ...
├── components/   # Reusable UI components
│   ├── affiliate/ # Affiliate link/recommendation components
│   ├── blog/      # Blog article cards, lists
│   ├── landing/   # Homepage sections
│   └── seo/       # JSON-LD structured data
├── content/      # MDX blog articles
├── data/         # Toxicity database
└── lib/          # Utilities, constants, blog helpers
```

## Environment Variables

Copy `.env.example` to `.env` and fill in:

- `DATABASE_URL` — SQLite database path
- `AUTH_SECRET` — NextAuth secret
- `NEXT_PUBLIC_AFFILIATE_*` — Affiliate program URLs (empty = fallback to direct links)
- Google AdSense / Analytics IDs (pre-configured)

## Key Features

- **Toxicity Checker** — 439 substances + plants, searchable with severity badges
- **Feeding Calculator** — RER/MER-based calorie calculations for dogs and cats
- **Weight Tracking** — Log and visualize pet weight over time
- **Pet Insurance Guide** — Compare accident-only, accident & illness, comprehensive, and lifetime plans
- **Blog** — 25+ evidence-based pet health articles with product recommendations
- **Newsletter** — Email subscription with Prisma backend

## Deployment

Push to `main` on GitHub → Vercel auto-deploys to https://getpetvitals.com

```bash
git push origin main
```

## License

Private project — all rights reserved.
