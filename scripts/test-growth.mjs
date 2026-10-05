import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { createRequire } from "node:module";
import ts from "typescript";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

const require = createRequire(import.meta.url);
const root = path.resolve(import.meta.dirname, "..");
function load(file, overrides = {}, globals = {}) {
  const exports = {};
  vm.runInNewContext(ts.transpileModule(fs.readFileSync(path.join(root, file), "utf8"), {
    compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
  }).outputText, { exports, require: (name) => overrides[name] || require(name), console: { error() {} }, ...globals });
  return exports;
}

const constants = { SITE_BASE_URL: "https://www.getpetvitals.com", SITE_NAME: "PetVitals" };
const data = load("src/data/toxicity.ts");
const jsonLd = load("src/components/seo/json-ld.tsx", { "@/lib/constants": constants });
const Null = () => null;
const page = load("src/app/toxicity/[item]/page.tsx", {
  "@/data/toxicity": data,
  "@/lib/constants": constants,
  "next/navigation": { notFound() { throw new Error("not found"); } },
  "next/link": { default: ({ children, ...props }) => React.createElement("a", props, children) },
  "@/components/seo/json-ld": jsonLd,
  "@/components/ads/AdUnit": { AdUnit: Null },
  "@/components/affiliate/insurance-cta": { InsuranceCtaBanner: Null },
  "@/components/downloads/resource-card": { DownloadResourceCard: Null },
  "@/components/hubs/contextual-hub-links": { ContextualHubLinks: Null },
});
for (const id of ["nail-polish-remover", "incense", "ranch-dressing"]) {
  const params = Promise.resolve({ item: id });
  const meta = await page.generateMetadata({ params });
  const html = renderToStaticMarkup(await page.default({ params }));
  assert.equal(meta.alternates.canonical, `${constants.SITE_BASE_URL}/toxicity/${id}`);
  assert.ok(meta.description.length <= 155);
  assert.equal((html.match(/<h1\b/g) || []).length, 1);
  const blocks = Array.from(html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g), (match) => JSON.parse(match[1]));
  const faq = blocks.find((block) => block["@type"] === "FAQPage").mainEntity;
  assert.equal(faq.length, 8);
  assert.equal(new Set(faq.map((item) => item.name.toLowerCase())).size, 8);
  assert.equal(blocks.find((block) => block["@type"] === "WebPage").dateModified, "2026-10-05");
  for (const entry of faq) {
    const escape = (text) => renderToStaticMarkup(React.createElement("p", null, text)).slice(3, -4);
    assert.ok(html.includes(escape(entry.name)));
    assert.ok(html.includes(escape(entry.acceptedAnswer.text)));
  }
  const item = data.getToxicityById(id);
  assert.equal(item.updated, "2026-10-05");
  assert.ok(item.sources.every((url) => !url.includes("akc.org") && !url.includes("petmd.com")));
  console.log(`PASS ${id}: metadata, 8 unique FAQs, visible answers and dated sources`);
}
assert.equal(new Set(data.toxicityDatabase.map((item) => item.id)).size, data.toxicityDatabase.length);

let consent = "essential";
const browser = { location: { pathname: "/blog/cat-friendly-cleaning-products" }, localStorage: { getItem: () => consent }, dispatchEvent() {} };
const analytics = load("src/lib/analytics.ts", {}, { window: browser, Event });
analytics.trackAnalyticsEvent("pdf_download_click");
assert.equal(browser.dataLayer, undefined);
consent = "all";
analytics.trackAnalyticsEvent("article_internal_link_click", { destination_path: "/toxicity/incense" });
const command = Array.from(browser.dataLayer[0]);
assert.equal(command[0], "event");
assert.equal(command[1], "article_internal_link_click");
assert.equal(command[2].page_path, browser.location.pathname);
assert.equal(command[2].destination_path, "/toxicity/incense");
assert.ok(!("event" in browser.dataLayer[0]));
consent = "essential";
analytics.updateAnalyticsConsent();
assert.equal(Array.from(browser.dataLayer.at(-1))[2].analytics_storage, "denied");
const queued = browser.dataLayer.length;
analytics.trackAnalyticsEvent("newsletter_signup_submit");
assert.equal(browser.dataLayer.length, queued);
console.log("PASS analytics: real gtag command queue, page attribution and denied consent");

const env = {};
let providerStatus = 201;
let failNetwork = false;
const calls = [];
const route = load("src/app/api/newsletter/route.ts", { "@/lib/constants": constants }, {
  process: { env }, AbortSignal, URL,
  fetch: async (url, options) => {
    calls.push({ url, ...options, body: JSON.parse(options.body) });
    if (failNetwork) throw new Error("test failure");
    return new Response("{}", { status: providerStatus });
  },
});
let ip = 0;
const valid = { email: " TEST@example.com ", consent: true, source: "blog_footer", interest: "cleaning", pagePath: "/blog/example?email=secret#section" };
const request = (body, origin) => new Request(`${constants.SITE_BASE_URL}/api/newsletter`, { method: "POST", headers: { "Content-Type": "application/json", "x-forwarded-for": String(++ip), ...(origin ? { origin } : {}) }, body: typeof body === "string" ? body : JSON.stringify(body) });
assert.equal((await route.POST(request("invalid-json"))).status, 400);
assert.equal((await route.POST(request(null))).status, 400);
assert.equal((await route.POST(request({ ...valid, email: "invalid" }))).status, 400);
assert.equal((await route.POST(request({ ...valid, consent: false }))).status, 400);
assert.equal((await route.POST(request(valid, "https://other.example"))).status, 403);
assert.equal((await route.POST(request(valid))).status, 503);
assert.equal(calls.length, 0);
Object.assign(env, { BREVO_API_KEY: "test-only", BREVO_NEWSLETTER_LIST_ID: "123", BREVO_DOI_TEMPLATE_ID: "456" });
const accepted = await route.POST(request(valid));
assert.equal(accepted.status, 202);
assert.equal((await accepted.json()).pending, true);
assert.equal(calls[0].url, "https://api.brevo.com/v3/contacts/doubleOptinConfirmation");
assert.equal(calls[0].body.email, "test@example.com");
assert.deepEqual(Array.from(calls[0].body.includeListIds), [123]);
assert.equal(calls[0].body.redirectionUrl, `${constants.SITE_BASE_URL}/newsletter/confirmed`);
assert.equal(calls[0].body.attributes.SIGNUP_PAGE, "/blog/example");
providerStatus = 401;
assert.equal((await route.POST(request(valid))).status, 502);
providerStatus = 429;
assert.equal((await route.POST(request(valid))).status, 429);
failNetwork = true;
assert.equal((await route.POST(request(valid))).status, 500);
const shared = new Request(`${constants.SITE_BASE_URL}/api/newsletter`, { method: "POST", headers: { "x-forwarded-for": "rate-limit-test" }, body: JSON.stringify(valid) });
for (let count = 0; count < 3; count++) await route.POST(shared.clone());
assert.equal((await route.POST(shared.clone())).status, 429);
console.log("PASS newsletter: invalid input, opt-in, origin, missing config, provider failures, pending-only response and rate limit");

assert.match(fs.readFileSync(path.join(root, "src/app/globals.css"), "utf8"), /--font-sans: var\(--font-geist-sans\)/);
assert.match(fs.readFileSync(path.join(root, "src/content/newsletter/confirm.html"), "utf8"), /href="\{\{ params.DOIurl \}\}"/);
const welcome = fs.readFileSync(path.join(root, "src/content/newsletter/welcome.html"), "utf8");
assert.match(welcome, /href="\{\{ unsubscribe \}\}"/);
assert.equal((welcome.match(/utm_medium=email/g) || []).length, 3);
assert.ok(!fs.readFileSync(path.join(root, "src/app/newsletter/confirmed/page.tsx"), "utf8").includes("trackAnalyticsEvent"));
console.log("PASS font binding, DOI and unsubscribe placeholders, UTM return links and no fake confirmation event");
