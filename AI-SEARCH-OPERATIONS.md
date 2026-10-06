# PetVitals AI Search Measurement and Review

This runbook covers crawl access, trustworthy source use, independent review, and measurement for the four priority cleaning and plant pages. Code changes are not evidence of increased rankings or citations. Account setup, real professional review, and external resource trials remain separate tasks.

## Crawl Access Checks

Run `node scripts/audit-search-access.mjs` against production, or supply a local preview URL. The read-only audit checks ordinary HTTP responses, server-rendered content, canonical URLs, visible sources, basic index/snippet restrictions, and the current robots/sitemap files. It does not prove indexing or access from verified crawler IPs.

The current `User-Agent: *` rule leaves public articles accessible while excluding API, account, dashboard, and pet-profile routes. Do not add a more-specific AI rule that accidentally bypasses those exclusions. [OpenAI documents OAI-SearchBot as the search crawler, separately from GPTBot training controls](https://developers.openai.com/api/docs/bots). Check Vercel firewall logs against the published crawler IP ranges before changing firewall rules; a user-agent string alone is not proof of crawler identity.

The initial JavaScript-disabled browser test found article and plant-guide content inside hidden streaming fragments behind route loading skeletons. Removing the loading boundaries from the static blog, toxicity, and About routes keeps those public pages directly readable without a script reveal. Account and other unrelated loading states are unchanged. A slow content navigation may now wait for the page rather than showing a skeleton; most public content pages are pre-generated. Disabling metadata streaming alone did not fix the problem, so that attempted configuration was removed. Re-run JavaScript-disabled browser checks after framework upgrades.

No firewall rule, training preference, or GSC inclusion setting was changed in this implementation. Review the property's actual generative-AI inclusion setting when the account is available. [Google's current guidance](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide) does not require special AI schema or an llms.txt file and does not guarantee inclusion.

## Source and Review Records

The two Clorox examples and the priority plant references were checked on October 6, 2026. The Nature's Miracle example retains its October 5 check date because its page could not be re-fetched during the later check. Article update dates describe editorial changes, not clinical review dates.

Each new evidence section distinguishes supported facts from missing dose, timing, formulation, or test information. No product was tested in an animal household. No named veterinarian has reviewed these guides. Botanical photographs are linked to NC State Extension's source galleries, not copied or presented as PetVitals photographs.

For future product checks, retain the source URL, named formula and market, date checked, applicable task, surface restrictions, rinse/contact-time directions, and the discrepancy being corrected. Never transfer a direction between formulas. For professional reviews, retain the reviewed version, scope, corrections, public credential verification, and explicit permission to publish a reviewer credit.

## AI Referral Events

After analytics consent on production hosts, recognized referrers or allowlisted `utm_source` values add these event parameters:

| Parameter | Meaning |
| --- | --- |
| `ai_source` | Recognized service, such as chatgpt or perplexity |
| `ai_source_evidence` | referrer or utm_source; tagged links are not independent proof of a citation |
| `ai_landing_page` | Original landing path without query parameters or fragment |

An `ai_referral_visit` event identifies an entry. The same parameters accompany existing PDF clicks, cleaner-tool interactions, article links, and affiliate clicks. The browser-session record lasts up to 30 minutes from entry, is cleared on consent withdrawal, and is reset for a new non-AI external referral. Internal navigation and ordinary reloads preserve the attribution. This is not a replacement for GA4 session attribution.

Absent referrers, AI answers without clicks, copied links, mobile apps, consent refusal, and blocked analytics are not fully measurable here. Google/Bing referrals are not automatically labeled AI. Click events do not prove a PDF was read, an affiliate sale occurred, or an email subscription was confirmed.

## GA4 Account Setup Still Required

In the correct property's Custom definitions, create three event-scoped dimensions using the exact parameters above. Check for existing definitions first. [Google's custom-dimension documentation](https://support.google.com/analytics/answer/14240153?hl=en) describes reporting availability after processing; registration is an account action, not something a website deployment completes.

After deployment, make one consented test visit using a recognized source tag, then a PDF click and a tool interaction. Verify the source and landing parameters in collected events; keep the test identifiable and exclude it from the baseline. Do not enable production tracking on localhost to run tests.

Build an Exploration with AI source, evidence, original landing page, and event name; compare event counts and active users for visits, PDF clicks, tool use, and affiliate clicks. Separate tagged test/marketing links from referrer-based arrivals. Do not divide raw repeated clicks by visits and call that a user conversion rate. Keep real sales or confirmed subscribers separate from engagement events.

## Citation Checks

Use the actual available GSC generative-AI performance report and [Bing Webmaster Tools AI Performance](https://blogs.bing.com/webmaster/2026/2/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview/) when signed in. Bing citations cover its supported experiences, not every AI service or a universal ranking position. No account report has been exported or configured by this code change.

For a manual baseline, use the same 20 questions below without naming PetVitals or asking the system to cite a particular site. Keep platform, model/mode, language, region, and signed-in status consistent. Record date, exact question, whether search was used, whether an answer was produced, visible cited URLs, and a screenshot. An unavailable answer is not a confirmed zero-citation result. A few prompt samples are an observation, not market-wide traffic data.

| Target page | Fixed question |
| --- | --- |
| best-pet-safe-cleaning-products | How should I choose a cleaner for a home with dogs and cats? |
| best-pet-safe-cleaning-products | Does a pet-friendly cleaning wipe also disinfect? |
| best-pet-safe-cleaning-products | Can household cleaning wipes be used on dog paws? |
| best-pet-safe-cleaning-products | Is disinfectant contact time the same as pet return time? |
| best-pet-safe-cleaning-products | How do enzymatic spot cleaners differ from disinfectants? |
| cat-friendly-cleaning-products | Which cleaner ingredients need special caution around cats? |
| cat-friendly-cleaning-products | Why should cat homes avoid phenol disinfectants? |
| cat-friendly-cleaning-products | How should cat food and water bowls be cleaned? |
| cat-friendly-cleaning-products | Are quaternary ammonium disinfectants a concern for cats? |
| cat-friendly-cleaning-products | Is a dry floor enough to let a cat back after mopping? |
| toxicity/wisteria | Is wisteria poisonous to dogs? |
| toxicity/wisteria | Is wisteria toxic to cats? |
| toxicity/wisteria | What signs can follow wisteria ingestion in pets? |
| toxicity/wisteria | Is any part of wisteria established as safe for pets? |
| toxicity/wisteria | What information should I give a vet after wisteria ingestion? |
| toxicity/sago-palm | Is sago palm toxic to dogs and cats? |
| toxicity/sago-palm | Why are sago palm seeds especially dangerous to pets? |
| toxicity/sago-palm | What if a dog ate sago palm but looks normal? |
| toxicity/sago-palm | Is Cycas revoluta a true palm? |
| toxicity/sago-palm | Can sago palm poisoning cause liver damage? |

Collect a baseline only after the new pages are deployed. Repeat after 28 days alongside the previous comparable 28-day GSC and GA4 exports. Evaluate citations, identifiable visits, useful actions, and real commercial outcomes separately. Do not claim causation from a small or changing prompt sample.

## Resource Trials and External Review

The public contact page now provides feedback fields, review requirements, and two tracked free checklists for shelters and educators. Use the invitation in SEO-OUTREACH-PLAN.md only for relevant recipients selected by the owner. Nothing has been emailed or posted automatically.

Real review completion, permission for attribution, actual resource use, and independently chosen recommendations must be recorded before being represented on the website. No paid or reciprocal backlink is a condition of the trial.
