"use client";

const COOKIE_CONSENT_KEY = "petvitals-cookie-consent";
export const ANALYTICS_CONSENT_EVENT = "petvitals:consent-change";

type AnalyticsEventPayload = Record<string, string | number | boolean | undefined>;

const AI_REFERRAL_KEY = "petvitals-ai-referral";
const AI_REFERRAL_WINDOW_MS = 30 * 60 * 1000;
const AI_HOSTS: Record<string, string[]> = {
  chatgpt: ["chatgpt.com", "chat.openai.com"],
  perplexity: ["perplexity.ai"],
  copilot: ["copilot.microsoft.com"],
  gemini: ["gemini.google.com"],
  claude: ["claude.ai"],
  deepseek: ["chat.deepseek.com"],
  kimi: ["kimi.com", "kimi.moonshot.cn"],
  doubao: ["doubao.com"],
};
type AiReferral = {
  source: string;
  evidence: "referrer" | "utm_source";
  landing: string;
  started: number;
  reported: boolean;
};
let aiReferral: AiReferral | null = null;
let aiReferralInitialized = false;

export function identifyAiReferral(referrer: string, pageUrl: string) {
  try {
    const host = new URL(referrer).hostname;
    for (const [source, domains] of Object.entries(AI_HOSTS)) {
      if (domains.some((domain) => host === domain || host.endsWith(`.${domain}`))) {
        return { source, evidence: "referrer" as const };
      }
    }
  } catch { /* Missing or invalid referrers are normal. */ }
  try {
    const source = new URL(pageUrl).searchParams.get("utm_source")?.toLowerCase();
    const matched = Object.entries(AI_HOSTS).find(([name, domains]) => source === name || domains.includes(source || ""));
    if (matched) return { source: matched[0], evidence: "utm_source" as const };
  } catch { /* Never retain unrecognized query values. */ }
  return null;
}

function saveAiReferral() {
  try {
    if (aiReferral) window.sessionStorage.setItem(AI_REFERRAL_KEY, JSON.stringify(aiReferral));
    else window.sessionStorage.removeItem(AI_REFERRAL_KEY);
  } catch { /* Attribution still works on this page when storage is unavailable. */ }
}

export function clearAiReferral() {
  aiReferral = null;
  aiReferralInitialized = true;
  saveAiReferral();
}

function getAiReferral() {
  if (!isProductionAnalyticsHost() || !hasAnalyticsConsent() || typeof document === "undefined") return null;
  if (!aiReferralInitialized) {
    aiReferralInitialized = true;
    const navigation = window.performance?.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
    const entryUrl = navigation?.name || window.location.href;
    const match = identifyAiReferral(document.referrer, entryUrl);
    const landing = new URL(entryUrl).pathname;
    const reload = navigation?.type === "reload";
    if (match && !reload) {
      aiReferral = { ...match, landing, started: Date.now(), reported: false };
    } else {
      let external = false;
      try { external = !["getpetvitals.com", "www.getpetvitals.com"].includes(new URL(document.referrer).hostname); } catch { /* Direct visits have no referrer. */ }
      if (!external || reload) {
        try {
          const stored = JSON.parse(window.sessionStorage.getItem(AI_REFERRAL_KEY) || "null");
          if (stored && Object.hasOwn(AI_HOSTS, stored.source) &&
            ["referrer", "utm_source"].includes(stored.evidence) &&
            typeof stored.landing === "string" && /^\/(?!\/)[^?#]*$/.test(stored.landing) &&
            typeof stored.started === "number" && typeof stored.reported === "boolean") aiReferral = stored;
        } catch { /* Ignore invalid or unavailable session data. */ }
      }
      if (!aiReferral && match) aiReferral = { ...match, landing, started: Date.now(), reported: false };
    }
    saveAiReferral();
  }
  if (aiReferral && (Date.now() - aiReferral.started >= AI_REFERRAL_WINDOW_MS || aiReferral.started > Date.now())) {
    aiReferral = null;
    saveAiReferral();
  }
  return aiReferral;
}

export function trackAiReferralVisit() {
  const referral = getAiReferral();
  if (!referral || referral.reported) return;
  referral.reported = true;
  saveAiReferral();
  trackAnalyticsEvent("ai_referral_visit");
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (command: string, value: string | Date, params?: AnalyticsEventPayload) => void;
  }
}

export function googleTag(command: string, value: string | Date, params?: AnalyticsEventPayload) {
  window.dataLayer = window.dataLayer || [];
  // gtag.js consumes command arguments, not GTM-style { event: ... } objects.
  window.gtag = window.gtag || function () { window.dataLayer!.push(arguments); };
  window.gtag(command, value, params);
}

export function updateAnalyticsConsent() {
  const state = hasAnalyticsConsent() ? "granted" : "denied";
  if (state === "denied") clearAiReferral();
  googleTag("consent", "update", {
    analytics_storage: state,
    ad_storage: state,
    ad_user_data: state,
    ad_personalization: state,
  });
  window.dispatchEvent(new Event(ANALYTICS_CONSENT_EVENT));
}

export function hasAnalyticsConsent() {
  if (typeof window === "undefined") return false;

  try {
    return window.localStorage.getItem(COOKIE_CONSENT_KEY) === "all";
  } catch {
    return false;
  }
}

export function trackAnalyticsEvent(eventName: string, payload: AnalyticsEventPayload = {}) {
  if (!isProductionAnalyticsHost() || !hasAnalyticsConsent()) return;

  const referral = getAiReferral();
  const eventPayload = {
    page_path: window.location.pathname,
    ...payload,
    ...(referral ? {
      ai_source: referral.source,
      ai_source_evidence: referral.evidence,
      ai_landing_page: referral.landing,
    } : {}),
  };

  googleTag("event", eventName, eventPayload);
}

export function isProductionAnalyticsHost() {
  return typeof window !== "undefined" &&
    ["www.getpetvitals.com", "getpetvitals.com"].includes(window.location.hostname);
}
