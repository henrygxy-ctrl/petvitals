# PetVitals Operations Guide

## 1. Google Search Console — Submit Sitemap

After each deploy, submit the sitemap to speed up Google indexing.

### Steps
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Select property `getpetvitals.com` (verify ownership via DNS TXT record or HTML file — already done with `googlebf6202aa0f432459.html`)
3. In the left sidebar, click **Sitemaps**
4. In the "Add a new sitemap" field, enter: `sitemap.xml`
5. Click **Submit**
6. Check the "Submitted sitemaps" table — status should show "Success" within a few minutes

### Ongoing
- Check the **Pages** tab to see which URLs are indexed vs. excluded
- After the toxicity consolidation, the 438 `/toxicity/*` URLs will show as "Page with redirect" — this is expected and healthy
- Monitor the **Core Web Vitals** tab for INP/LCP improvements from Partytown

---

## 2. RSS Feed — Submit to Directories

The RSS feed is at: `https://getpetvitals.com/blog/rss.xml`

### Directories to submit to

| Directory | URL | Notes |
|-----------|-----|-------|
| Feedly | https://feedly.com/i/submit | Paste the RSS URL |
| Inoreader | https://www.inoreader.com/feed-submit | Free account required |
| Feedspot | https://www.feedspot.com/fs/add-feed | May email you for verification |
| RSS.app | https://rss.app/ | Creates widgets from RSS |
| Blogarama | https://www.blogarama.com/ | Pet category available |
| AllTop | https://alltop.com/contact | Manual submission |
| Technorati | Not active | Skip |

### How to verify RSS is working
```bash
curl -s https://getpetvitals.com/blog/rss.xml | head -20
```
Should return valid XML with `<rss>` and `<channel>` elements.

---

## 3. AdSense — Create Additional Ad Units

Currently using 1 slot (`1350552751`). For better coverage, create 2 more:

### Steps
1. Go to [Google AdSense](https://www.google.com/adsense)
2. Navigate to **Ads → By ad unit → Display ads**
3. Create new ad units:
   - **In-article ad** — name it "PetVitals In-Article", responsive, auto format
   - **Feed ad** — name it "PetVitals Feed", responsive, auto format
4. Copy each slot ID
5. Add to `.env`:
   ```
   NEXT_PUBLIC_ADSENSE_ARTICLE_SLOT=<in-article-slot-id>
   NEXT_PUBLIC_ADSENSE_FEED_SLOT=<feed-slot-id>
   ```
6. Redeploy

Without these env vars set, the `InArticleAd` and `FeedAd` components fall back to the default slot.

### Ad placement map
| Placement | Component | Location |
|-----------|-----------|----------|
| Blog list | `FeedAd` | Every 4th card in the grid |
| Blog article | `InArticleAd` | After Table of Contents (replaces old AdUnit) |
| Home page | `AdUnit` | Newsletter section |

---

## 4. Partytown — Verify GA is Working

After deploying with Partytown enabled:

1. Open Chrome DevTools → Network tab
2. Filter by `gtag` or `collect`
3. Verify that GA4 hits are sending (you should see requests to `google-analytics.com`)
4. Check that `gtag/js` is loaded via a web worker (look for `partytown` in the initiator column)
5. In Google Analytics → Real-time, confirm traffic is being recorded

If GA data stops flowing after the Partytown deploy:
- Check the browser console for Partytown errors
- As a fallback, revert `strategy="worker"` to remove the strategy prop (defaults to main thread)
- AdSense script remains on the main thread regardless

---

## 5. OG Images — Verify After Deploy

Each blog post now has a dynamic OG image at:
`https://getpetvitals.com/api/og/blog/{slug}`

### Test a few
```bash
curl -I https://getpetvitals.com/api/og/blog/can-dogs-eat-grapes
# Should return: content-type: image/png, 200 OK
```

### Validate with social platforms
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) — paste a blog post URL
- [Twitter Card Validator](https://cards-dev.twitter.com/validator) — paste a blog post URL
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/) — paste a blog post URL

Each should show the OG image, title, and description correctly.

---

## 6. RSS Link Verification

Already verified (2026-06-24):
- Blog list page (`/blog`): RSS link present in header row (orange RSS icon)
- Footer (`/`): RSS Feed link present in the Company section

Both links point to `/blog/rss.xml`.

---

## 7. Toxicity Consolidation — Monitor After Deploy

Old URLs (`/toxibility/chocolate`, etc.) now redirect (308 Permanent) to `/toxicity`.
- This is expected to improve crawl budget efficiency
- Google will gradually drop these URLs from its index
- Monitor Search Console → Pages → "Page with redirect" count over the next 2-4 weeks
- The search functionality and inline expandable cards remain identical