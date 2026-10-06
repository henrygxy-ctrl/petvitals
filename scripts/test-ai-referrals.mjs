import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import ts from "typescript";

const root = path.resolve(import.meta.dirname, "..");
const code = ts.transpileModule(fs.readFileSync(path.join(root, "src/lib/analytics.ts"), "utf8"), {
  compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS },
}).outputText;
function browser({ referrer = "https://chatgpt.com/", url = "https://www.getpetvitals.com/blog/example?prompt=private#answer", storage = new Map(), unavailable = false, reload = false } = {}) {
  let consent = "all";
  let now = 1000000;
  const location = new URL(url);
  const window = {
    location, dispatchEvent() {},
    performance: { getEntriesByType: () => [{ name: url, type: reload ? "reload" : "navigate" }] },
    localStorage: { getItem: () => consent },
    sessionStorage: {
      getItem(key) { if (unavailable) throw new Error("blocked"); return storage.get(key) || null; },
      setItem(key, value) { if (unavailable) throw new Error("blocked"); storage.set(key, value); },
      removeItem(key) { if (unavailable) throw new Error("blocked"); storage.delete(key); },
    },
  };
  const exports = {};
  vm.runInNewContext(code, { exports, window, document: { referrer }, URL, Event, Date: { now: () => now } });
  return { api: exports, window, storage, setConsent(value) { consent = value; }, expire() { now += 30 * 60 * 1000; }, events: () => (window.dataLayer || []).filter((args) => args[0] === "event").map((args) => ({ name: args[1], params: args[2] })) };
}

const { identifyAiReferral } = browser().api;
for (const [host, source] of [
  ["chatgpt.com", "chatgpt"], ["chat.openai.com", "chatgpt"], ["www.perplexity.ai", "perplexity"],
  ["copilot.microsoft.com", "copilot"], ["gemini.google.com", "gemini"], ["claude.ai", "claude"],
  ["chat.deepseek.com", "deepseek"], ["kimi.moonshot.cn", "kimi"], ["www.doubao.com", "doubao"],
]) {
  assert.equal(identifyAiReferral(`https://${host}/?prompt=private`, "https://www.getpetvitals.com/").source, source);
}
for (const host of ["chatgpt.com.attacker.example", "notchatgpt.com", "google.com", "bing.com", "openai.com"]) {
  assert.equal(identifyAiReferral(`https://${host}/`, "https://www.getpetvitals.com/"), null);
}
assert.equal(identifyAiReferral("invalid", "invalid"), null);
assert.equal(identifyAiReferral("", "https://www.getpetvitals.com/?utm_source=ChatGPT").evidence, "utm_source");
assert.equal(identifyAiReferral("https://perplexity.ai/", "https://www.getpetvitals.com/?utm_source=chatgpt").source, "perplexity");
assert.equal(identifyAiReferral("", "https://www.getpetvitals.com/?utm_source=unknown-private-value"), null);
console.log("PASS AI source recognition: allowlist, subdomains, tagged links and no Google/Bing inference");

const landing = browser();
landing.api.trackAiReferralVisit();
landing.api.trackAiReferralVisit();
landing.window.location.pathname = "/tools/cleaning-safety";
landing.api.trackAnalyticsEvent("tool_change", { tool_name: "cleaning_ingredient_checker" });
assert.equal(landing.events().filter((event) => event.name === "ai_referral_visit").length, 1);
assert.equal(landing.events().at(-1).params.ai_source, "chatgpt");
assert.equal(landing.events().at(-1).params.ai_source_evidence, "referrer");
assert.equal(landing.events().at(-1).params.ai_landing_page, "/blog/example");
assert.equal(landing.events().at(-1).params.page_path, "/tools/cleaning-safety");
assert.doesNotMatch(JSON.stringify([...landing.storage.values(), landing.events()]), /private|prompt=|#answer/);
const refreshed = browser({ storage: landing.storage, reload: true });
refreshed.api.trackAiReferralVisit();
assert.equal(refreshed.events().length, 0);
const nextPage = browser({ referrer: "https://www.getpetvitals.com/blog/example", storage: landing.storage });
nextPage.api.trackAiReferralVisit();
nextPage.api.trackAnalyticsEvent("pdf_download_click");
assert.equal(nextPage.events().length, 1);
assert.equal(nextPage.events()[0].params.ai_source, "chatgpt");
const organic = browser({ referrer: "https://www.google.com/", storage: landing.storage });
organic.api.trackAnalyticsEvent("affiliate_click");
assert.equal(organic.events()[0].params.ai_source, undefined);
assert.equal(organic.storage.size, 0);
console.log("PASS attribution: one visit event, preserved landing, tool/PDF events and new organic entry reset");

const delayed = browser({ referrer: "", url: "https://www.getpetvitals.com/blog/original?utm_source=chatgpt&prompt=private" });
delayed.setConsent("essential");
delayed.api.trackAiReferralVisit();
delayed.window.location.href = "https://www.getpetvitals.com/contact";
delayed.setConsent("all");
delayed.api.trackAiReferralVisit();
assert.equal(delayed.events()[0].params.ai_source, "chatgpt");
assert.equal(delayed.events()[0].params.ai_landing_page, "/blog/original");
assert.equal(delayed.events()[0].params.page_path, "/contact");
assert.doesNotMatch(JSON.stringify([...delayed.storage.values(), delayed.events()]), /private|prompt=|utm_source=/);
console.log("PASS delayed consent: document entry preserved after client-side navigation, without full URL retention");

const denied = browser();
denied.setConsent("essential");
denied.api.trackAiReferralVisit();
denied.api.trackAnalyticsEvent("pdf_download_click");
assert.equal(denied.events().length, 0);
assert.equal(denied.storage.size, 0);
denied.setConsent("all");
denied.api.trackAiReferralVisit();
assert.equal(denied.events().length, 1);
denied.setConsent("essential");
denied.api.updateAnalyticsConsent();
assert.equal(denied.storage.size, 0);
denied.setConsent("all");
denied.api.trackAnalyticsEvent("affiliate_click");
assert.equal(denied.events().at(-1).params.ai_source, undefined);
for (const url of ["http://localhost:3101/", "https://preview.vercel.app/"]) {
  const preview = browser({ url });
  preview.api.trackAiReferralVisit();
  assert.equal(preview.events().length, 0);
  assert.equal(preview.storage.size, 0);
}
const expired = browser();
expired.api.trackAiReferralVisit();
expired.expire();
expired.api.trackAnalyticsEvent("pdf_download_click");
assert.equal(expired.events().at(-1).params.ai_source, undefined);
assert.equal(expired.storage.size, 0);
const blocked = browser({ unavailable: true });
blocked.api.trackAiReferralVisit();
blocked.api.trackAiReferralVisit();
assert.equal(blocked.events().length, 1);
const invalid = browser({ referrer: "", storage: new Map([["petvitals-ai-referral", "{invalid"]]) });
invalid.api.trackAnalyticsEvent("tool_start");
assert.equal(invalid.events()[0].params.ai_source, undefined);
console.log("PASS privacy: consent, revocation, preview isolation, expiry, blocked storage and malformed data");
