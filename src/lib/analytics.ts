"use client";

const COOKIE_CONSENT_KEY = "petvitals-cookie-consent";
export const ANALYTICS_CONSENT_EVENT = "petvitals:consent-change";

type AnalyticsEventPayload = Record<string, string | number | boolean | undefined>;

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

  const eventPayload = {
    page_path: window.location.pathname,
    ...payload,
  };

  googleTag("event", eventName, eventPayload);
}

export function isProductionAnalyticsHost() {
  return typeof window !== "undefined" &&
    ["www.getpetvitals.com", "getpetvitals.com"].includes(window.location.hostname);
}
