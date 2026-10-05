# PetVitals — Free Pet Health & Safety Tools

**getpetvitals.com** — Instant pet toxicity checker, feeding calculator, weight tracker, and evidence-based pet health guides.

## Tech Stack

- **Framework:** Next.js 16 (Turbopack) + TypeScript
- **Styling:** Tailwind CSS 4 + shadcn/ui
- **Database:** SQLite via Prisma ORM
- **Auth:** NextAuth v5 with credentials
- **Analytics:** Consent-gated GA4 on the main thread (only the two official PetVitals domains are enabled)
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
- **Newsletter** — Brevo double opt-in; not active until sender, templates, list and environment variables are configured

## Newsletter Activation

The website no longer treats a SQLite insert as a completed email subscription. Missing provider configuration returns 503; accepted DOI requests return 202 (pending confirmation), not a confirmed subscriber count.

1. Use an existing Brevo account or complete account setup with the owner. Verify the sending domain and sender. Do not commit API credentials.
2. Create a newsletter list and three TEXT contact attributes: `SIGNUP_SOURCE`, `SIGNUP_INTEREST`, `SIGNUP_PAGE`.
3. Create a dedicated double-opt-in template from `src/content/newsletter/confirm.html`. Retain `{{ params.DOIurl }}` as the confirmation link; do not replace it with the website confirmation page.
4. Set server-only `BREVO_API_KEY`, `BREVO_NEWSLETTER_LIST_ID`, `BREVO_DOI_TEMPLATE_ID` in Vercel and redeploy.
5. Create a list-entry welcome automation using `src/content/newsletter/welcome.html`. Send only after a contact joins the confirmed list. Configure the operator's real postal address as `SENDER_ADDRESS`, a verified sender, and the provider's marketing unsubscribe link. Do not activate with unresolved placeholders.
6. Test with the owner's authorized test address: no list entry before confirmation, one welcome email after confirmation, unsubscribe blocks later marketing, and duplicate signup does not create another contact. Do not import old SQLite addresses as confirmed subscribers without evidence of consent.

The `/newsletter/confirmed` page is only a return page. Visiting it is not proof of confirmation and does not emit a fake successful-subscription event. Brevo is the source of truth for confirmed contacts and unsubscribe status. The in-memory request limit is per server instance, not a persistent anti-abuse guarantee.

Signup availability is evaluated on the server using the same configuration validation as the API. Missing or invalid configuration hides the email form. Home and blog-index entries offer the existing emergency PDF instead; resource sections retain their topic-specific PDF without a duplicate fallback. Static pages require rebuilding after activation. Configuration validity is not proof of sender verification or email delivery; complete the owner-approved end-to-end test before promoting signup.

API: https://developers.brevo.com/reference/create-doi-contact
Unsubscribe: https://help.brevo.com/hc/en-us/articles/209553645-Insert-a-custom-unsubscribe-link-in-your-emails

## Acquisition and Retention Verification

- Existing events: `article_internal_link_click`, `pdf_download_click`, `download_followup_click`, `newsletter_signup_submit`, `newsletter_confirmation_sent`, `newsletter_signup_error`, `affiliate_click`.
- GA initialization and custom events are restricted to `www.getpetvitals.com` and `getpetvitals.com`; localhost, Vercel aliases and arbitrary hosts are excluded. Consent is still required. This prevents new test events, not historical contamination.
- Article internal clicks include `link_context` (`article_body` or `article_next_steps`). Dedicated PDF/follow-up and sponsored links do not also emit a duplicate internal-click event. Articles display one next-step area and at most two recommended articles, rather than both recommendation lists and generic tool promotions.
- Article tools are dynamically split in a client boundary with SSR retained; non-tool articles do not download the cleaning/vaccine/vet-estimator bundles.
- `newsletter_confirmation_sent` means the provider accepted the confirmation-email request, not that the recipient confirmed or that delivery succeeded. Confirmed subscriber counts come from Brevo, not from visits to a return URL.
- GA4 should show these in Events / Realtime after real consented interactions. Code tests alone do not prove Google received them. As of the October 5 inspection, the recent-events list contained only basic GA4 events.
- In Explore, compare landing page + query string and event name using total users and event count. Internal navigation, PDF downloads and newsletter requests are alternative actions; do not invent a mandatory sequential funnel. For a rate, compare users taking each action with users in the same landing-page cohort and period, not raw event counts divided by sessions.
- Check hostname and exclude preview/test traffic before interpreting Direct traffic. Current GA4 page views and GSC search clicks measure different things and are not interchangeable.
- The saved exploration is [PetVitals Landing Pages and Retention Actions](https://analytics.google.com/analytics/web/#/analysis/a397931580p541575540/edit/Zcu5Hj3ZTneeTfEH5UQPWA). Its event filter retains `page_view` as the baseline alongside the three retention actions. On October 5, the September 7-October 4 report showed only `page_view`; this is not evidence of action-event delivery. Historical data has not been hostname-filtered.
- Veterinary reviewer credit and external recommendations require a real completed review or permission from the organization. The public collaboration brief is `/about#professional-review`; no outreach has been sent and no review is claimed.

## Deployment

Push to `main` on GitHub → Vercel auto-deploys to https://getpetvitals.com

```bash
git push origin main
```

## License

Private project — all rights reserved.
