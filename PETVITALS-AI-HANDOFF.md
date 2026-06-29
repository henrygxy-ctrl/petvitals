# PetVitals AI Handoff

Last updated: 2026-06-28

## Project Identity

PetVitals is a pet health and safety website for English-speaking pet owners.
Primary domain: https://www.getpetvitals.com

Current stack:
- Next.js 16.2.7 App Router with Turbopack
- React 19, TypeScript, Tailwind CSS 4, shadcn/ui-style components
- Prisma ORM with SQLite for the current local schema
- NextAuth v5 credentials auth
- MDX blog content with dynamic OG image routes
- Vercel deployment with `output: "standalone"`
- Google Analytics, Google AdSense, Impact.com affiliate tracking

Important current source root:
`C:\Users\alienware\Documents\宠物网站20`

## Current Status Summary

The site is functional and already deployed. It has public SEO pages, tools, blog content, AdSense, affiliate components, auth, pet profiles, and SQLite-backed data features.

Recent SEO and CSP fix completed:
- `SITE_BASE_URL` default now uses `https://www.getpetvitals.com`
- canonical, sitemap, robots, and blog OG image URLs now align with the actual `www` host
- Vercel CSP was relaxed for AdSense-compatible HTTPS scripts, frames, and connections
- `npm run build` passed after these changes

If Vercel has `NEXT_PUBLIC_SITE_URL` set manually, it must be `https://www.getpetvitals.com`; otherwise it will override the corrected code default.

## 8 Functional Modules

1. Homepage and navigation
   Current state: public landing page with hero, features, latest blog, newsletter entry, footer navigation, analytics, AdSense script, and Impact.com tracking.
   Key files: `src/app/page.tsx`, `src/app/layout.tsx`, `src/components/landing/*`

2. Toxicity checker
   Current state: searchable toxicity database with severity display and generated detail pages for database items.
   Key files: `src/app/toxicity/page.tsx`, `src/app/toxicity/[item]/page.tsx`, `src/data/toxicity.ts`, `src/components/toxicity/*`

3. Feeding calculator
   Current state: public calorie and feeding calculator based on RER/MER logic with form UI and BCS helper.
   Key files: `src/app/feeding-calculator/page.tsx`, `src/lib/feeding-calculator.ts`, `src/components/feeding/*`

4. Weight tracking and pet profiles
   Current state: authenticated pet profile, weight logs, feeding logs, and public pet route support exist in API and pages.
   Key files: `src/app/pets/*`, `src/app/api/pets/*`, `prisma/schema.prisma`

5. Blog and content engine
   Current state: 25 MDX articles, category pages, related articles, source citations, RSS route, and dynamic OG images.
   Key files: `src/content/blog/*.mdx`, `src/app/blog/*`, `src/lib/blog.ts`, `src/app/api/og/blog/[slug]/route.tsx`

6. Insurance guides
   Current state: insurance index page plus plan pages for accident-only, accident-illness, comprehensive, and lifetime coverage.
   Key files: `src/app/insurance/page.tsx`, `src/app/insurance/*/page.tsx`, `src/components/affiliate/insurance-*`

7. Auth, dashboard, newsletter, community
   Current state: credentials auth, dashboard shell, newsletter subscription API, and community page/API exist. Some areas are intentionally noindex or gated.
   Key files: `src/app/(auth)/*`, `src/app/dashboard/*`, `src/app/api/newsletter/route.ts`, `src/app/community/*`

8. SEO, structured data, and operations
   Current state: metadata, canonical URLs, robots, sitemap, JSON-LD, RSS, manifest, Google verification file, and Vercel security headers are present.
   Key files: `src/lib/constants.ts`, `src/app/sitemap.ts`, `src/app/robots.ts`, `src/components/seo/json-ld.tsx`, `public/googlebf6202aa0f432459.html`, `vercel.json`

## Monetization Status

AdSense:
- Publisher ID: `ca-pub-7248211571487483`
- Global script is in `src/app/layout.tsx`
- Main ad component is `src/components/ads/AdUnit.tsx`
- Default slot uses `NEXT_PUBLIC_ADSENSE_SLOT`
- Article slot uses `NEXT_PUBLIC_ADSENSE_ARTICLE_SLOT`
- Feed slot uses `NEXT_PUBLIC_ADSENSE_FEED_SLOT`
- `public/ads.txt` exists

Current note:
- If article/feed slot env vars are missing, those specific components return null unless a slot fallback is passed.
- The previous public audit saw a default slot ID online: `1350552751`.

Affiliate:
- Insurance partners are configured in `src/lib/affiliate.ts`
- Supported partners: Lemonade, Healthy Paws, Embrace, Spot, Trupanion
- Product link support: Amazon Associates tag and Chewy affiliate ID
- If affiliate env vars are empty, links fall back to official non-affiliate URLs
- Impact.com tracking script is in `src/app/layout.tsx`

SEO-driven revenue strategy:
- Toxicity pages and health articles drive search traffic
- Blog articles include contextual product recommendations
- Insurance pages are commercial-intent pages
- AdSense supports informational pages

## Code Navigation Tree

```text
src/
  app/
    layout.tsx                    # global metadata, GA, AdSense, Impact script
    page.tsx                      # homepage
    sitemap.ts                    # generated sitemap
    robots.ts                     # generated robots.txt
    toxicity/                     # toxicity search and item pages
    feeding-calculator/           # public feeding calculator
    weight-tracking/              # weight tracking landing page
    blog/                         # blog list, article pages, categories, RSS
    insurance/                    # insurance guide pages
    pets/                         # authenticated pet pages
    api/                          # auth, pets, newsletter, OG images
  components/
    ads/                          # AdSense UI wrappers
    affiliate/                    # insurance and product recommendations
    blog/                         # blog cards, citations, TOC, related posts
    feeding/                      # feeding calculator UI
    landing/                      # homepage sections
    newsletter/                   # newsletter signup
    seo/                          # JSON-LD helpers
    toxicity/                     # toxicity search/result UI
    ui/                           # base UI components
  content/blog/                   # MDX blog articles
  data/toxicity.ts                # toxicity database
  lib/
    affiliate.ts                  # affiliate URL helpers and products
    auth.ts                       # NextAuth config
    blog.ts                       # MDX metadata loader
    constants.ts                  # SITE_BASE_URL and site constants
    db.ts                         # Prisma client
    feeding-calculator.ts         # calculator formulas
prisma/
  schema.prisma                   # current SQLite schema
public/
  ads.txt
  googlebf6202aa0f432459.html
  manifest.json
  og-image.png
```

## Completed Optimizations

1. Domain canonicalization fixed
   Current state: code default now uses `https://www.getpetvitals.com`; generated canonical, robots, sitemap, and blog OG URLs were verified locally.

2. AdSense CSP compatibility improved
   Current state: Vercel CSP now allows HTTPS scripts, frames, and connections for dynamic AdSense domains while keeping `object-src 'none'` and `base-uri 'self'`.

3. Sitemap and index coverage expanded
   Current state: sitemap includes static pages, toxicity pages, blog posts, category pages, and insurance pages.

4. Blog SEO strengthened
   Current state: MDX frontmatter supports SEO title, description, OG image, sources, read-next links, and author display.

5. Insurance content added
   Current state: insurance index and four insurance detail pages exist for commercial-intent traffic.

6. Monetization components wired
   Current state: AdSense components, product recommendations, insurance affiliate components, and Impact tracking are present.

## Prioritized TODO

P0 - After deploy checks:
- Deploy latest SEO/CSP changes.
- Verify `NEXT_PUBLIC_SITE_URL` in Vercel is either unset or set to `https://www.getpetvitals.com`.
- Fetch production homepage, `/robots.txt`, and `/sitemap.xml`; confirm all use `www`.
- Check browser console for CSP violations on pages with ads.

P1 - Search and analytics:
- Submit `https://www.getpetvitals.com/sitemap.xml` in Google Search Console.
- Monitor Search Console clicks, impressions, CTR, indexed pages, and duplicate/canonical warnings.
- Confirm GA4 real-time events still arrive after the domain/CSP change.

P1 - AdSense:
- Create separate AdSense units for in-article and feed placements.
- Set `NEXT_PUBLIC_ADSENSE_ARTICLE_SLOT` and `NEXT_PUBLIC_ADSENSE_FEED_SLOT`.
- Check AdSense coverage, page RPM, impressions, and policy warnings.

P2 - Content expansion:
- Add dedicated articles for high-search toxicity terms that currently only route to category pages.
- Expand thin blog posts where useful.
- Add stronger internal links from toxicity pages to related blog and tools.

P2 - Performance:
- Continue `next/image` migration where plain images remain.
- Check Core Web Vitals after traffic data accumulates.
- Watch Partytown/GA behavior; move GA back to main thread only if data drops.

P3 - Product and data:
- Improve authenticated dashboard polish.
- Decide whether production should stay SQLite or move to Postgres.
- Add admin/editor workflows only if needed; avoid speculative abstractions.

## Engineering Notes

Coding:
- Keep changes small and traceable to the request.
- Match the existing App Router, TypeScript, Tailwind, and component style.
- Do not refactor unrelated files.
- Use `apply_patch` for manual file edits.
- Avoid PowerShell `Set-Content` for source edits; previous notes warn it can damage UTF-8 text.

Git:
- Current repo may have pre-existing dirty files. Do not revert unrelated user changes.
- Before editing, check `git status --short`.
- Recent unrelated dirty files seen previously: `.gitignore`, `SUMMARY.md`, `README.md.bak`.

Build:
- Use `npm run build` for production validation.
- Because `next.config.ts` uses `output: "standalone"`, `next start` is not the right local production runner after build.
- If local standalone verification is needed, run `.next/standalone/server.js` with a `PORT`.

Deploy:
- Vercel deploy is configured by `vercel.json`.
- Build command: `npx prisma generate && next build`.
- Security headers are in `vercel.json`.
- Production URL should be treated as `https://www.getpetvitals.com`.

SQLite:
- Current `prisma/schema.prisma` provider is SQLite.
- Do not commit real production database files or secrets.
- Use `npx prisma generate` after schema changes.
- Use `npx prisma db push` only when intentionally changing the database schema.

## Environment Variables

Core:
- `DATABASE_URL` - Prisma database connection; SQLite locally in current schema.
- `DIRECT_URL` - present in Postgres examples; not required for SQLite.
- `AUTH_SECRET` - NextAuth secret.
- `AUTH_URL` - local or production auth URL.
- `NEXT_PUBLIC_SITE_URL` - canonical site base URL. Use `https://www.getpetvitals.com` in production.

Analytics and ads:
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` - GA4 measurement ID if using env-driven setup.
- `NEXT_PUBLIC_ADSENSE_SLOT` - default AdSense slot.
- `NEXT_PUBLIC_ADSENSE_ARTICLE_SLOT` - in-article ad slot.
- `NEXT_PUBLIC_ADSENSE_FEED_SLOT` - feed/list ad slot.

OAuth:
- `GOOGLE_CLIENT_ID` - Google OAuth client ID if enabled.
- `GOOGLE_CLIENT_SECRET` - Google OAuth secret if enabled.

Affiliate:
- `NEXT_PUBLIC_AFFILIATE_LEMONADE_URL`
- `NEXT_PUBLIC_AFFILIATE_HEALTHYPAWS_URL`
- `NEXT_PUBLIC_AFFILIATE_EMBRACE_URL`
- `NEXT_PUBLIC_AFFILIATE_SPOT_URL`
- `NEXT_PUBLIC_AFFILIATE_TRUPANION_URL`
- `NEXT_PUBLIC_AFFILIATE_AMAZON_TAG`
- `NEXT_PUBLIC_AFFILIATE_CHEWY_URL` - preferred full Chewy/Impact tracking URL
- `NEXT_PUBLIC_AFFILIATE_CHEWY_TAG`

## How To Use This Handoff

Paste this whole file into a new AI conversation or upload it with the codebase. Ask the AI to read it before making changes.

For website work, the next AI should first inspect:
- `AGENTS.md`
- `package.json`
- `src/lib/constants.ts`
- `src/app/layout.tsx`
- `vercel.json`
- the specific route/component involved in the request

Do not assume public traffic or revenue numbers from code. Real traffic and monetization performance must come from GA4, Search Console, and AdSense dashboards.
