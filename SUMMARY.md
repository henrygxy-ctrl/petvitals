# PetVitals — Project Summary

> Last updated: 2026-06-10

## Quick Start

```bash
cd C:\Users\alienware\Documents\petvitals

# Build and run (production mode — do NOT use `npm run dev`)
npm run build
npm start
# → http://localhost:3000
```

⚠️ **Do not use `npm run dev`.** The Next.js 16 dev server (Turbopack) is unstable with SQLite on this machine — it leaks memory to 1GB+ and hangs. Always use `npm run build && npm start`.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5.9 |
| Styling | Tailwind CSS 4 + shadcn/ui |
| Database | SQLite via Prisma ORM (`prisma/dev.db`) |
| Auth | NextAuth v5, Credentials Provider, JWT sessions |
| Icons | Lucide React |
| Charts | Recharts |
| Language | English only (Chinese removed 6/10) |

## Page Structure (21 routes)

```
/                                        Homepage
  ├── Hero (search bar + headline)
  ├── Features (4 cards: Toxicity, Feeding, Weight, Vet-Data)
  ├── Understanding Pet Insurance (4 clickable cards → detail pages)
  ├── Why Pet Parents Choose PetVitals (3 trust cards)
  └── Footer (brand, tools nav, legal links, disclaimer)

/toxicity                                Toxicity Checker (public)
/sign-in                                 Login page
/sign-up                                 Registration page
/dashboard                               Main dashboard (requires auth)
/pets/new                                Add pet form (requires auth)
/pets/[id]                               Pet detail + weight tracking
/pets/[id]/feeding                       Feeding calculator
/privacy                                 Privacy Policy
/terms                                   Terms of Service
/contact                                 Contact Us page (mailto link to HENRYGXY@GMAIL.COM)
/insurance/accident-only                 Accident-Only insurance guide
/insurance/accident-illness              Accident & Illness insurance guide
/insurance/comprehensive                 Comprehensive / Wellness insurance guide
/insurance/lifetime                      Lifetime / Chronic Conditions insurance guide
```

## API Routes (all under /api)

| Route | Methods | Auth Required |
|-------|---------|--------------|
| `/auth/[...nextauth]` | GET, POST | No |
| `/auth/register` | POST | No |
| `/pets` | GET, POST | Yes |
| `/pets/[id]` | GET, PATCH | Yes |
| `/pets/[id]/weight` | POST | Yes |

## Key Files

| File | Purpose |
|------|---------|
| `src/app/page.tsx` | Homepage (Hero, Features, Insurance, Trust, Footer) |
| `src/app/layout.tsx` | Root layout + metadata (LanguageSwitcher removed) |
| `src/app/globals.css` | Global styles + CSS custom properties |
| `src/components/landing/hero.tsx` | Hero section |
| `src/components/landing/features.tsx` | 4-card features (hardcoded English, `<a>` tags) |
| `src/components/toxicity/toxicity-search.tsx` | Toxicity search |
| `src/lib/auth.ts` | NextAuth configuration |
| `src/lib/db.ts` | Prisma singleton |
| `src/i18n/context.tsx` | Translation provider (English-only, simplified) |
| `src/i18n/en.json` | English translations |
| `prisma/schema.prisma` | Database schema (SQLite) |
| `.env` | DATABASE_URL, AUTH_SECRET |

## Design System

- **Palette**: Neutral grayscale (oklch), no dominant color hue
- **Components**: shadcn/ui (Button, Card, Input, Select, RadioGroup, Tabs, Slider)
- **Fonts**: Geist Sans + Geist Mono
- **Border radius**: 0.625rem (--radius)
- **Pattern**: Use `<a>` tags for navigation, NOT Next.js `<Link>` (more stable)

## History of Changes

| Date | Change |
|------|--------|
| 6/7 | API routes: added `try/catch`, `isNeutered` boolean coercion, form error display |
| 6/9 | Features cards: `<Link>` → `<a>` (were unclickable) |
| 6/9 | Removed pricing section; added Why PetVitals, Insurance guide (4 cards) |
| 6/9 | Created `/privacy`, `/terms`, `/contact` pages; rebuilt footer |
| 6/9 | Created 4 insurance detail pages with expanded content |
| 6/9 | Fixed `\u2019` displaying as literal text; optimized meta title/description |
| 6/10 | Changed all contact emails to HENRYGXY@GMAIL.COM |
| 6/10 | Created `/contact` page (was mailto link) |
| 6/10 | Removed Chinese language support and language switcher; English-only |

## Contact Info

- Email: HENRYGXY@GMAIL.COM (used across all pages)
- Contact page: `/contact`
