"use client";

const COOKIE_CONSENT_KEY = "petvitals-cookie-consent";

type AnalyticsEventPayload = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (command: "event", eventName: string, params?: AnalyticsEventPayload) => void;
  }
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
  if (typeof window === "undefined" || !hasAnalyticsConsent()) return;

  const eventPayload = {
    page_path: window.location.pathname,
    ...payload,
  };

  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, eventPayload);
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: eventName,
    ...eventPayload,
  });
}
