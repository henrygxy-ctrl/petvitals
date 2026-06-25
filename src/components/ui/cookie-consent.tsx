'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const COOKIE_CONSENT_KEY = 'petvitals-cookie-consent';

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!stored) {
      // Small delay so the banner doesn't flash on page load
      const timer = setTimeout(() => setVisible(true), 500);
      return () => clearTimeout(timer);
    }
  }, []);

  function acceptAll() {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'all');
    setVisible(false);
  }

  function acceptEssential() {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'essential');
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 pointer-events-none">
      <div className="max-w-2xl mx-auto pointer-events-auto">
        <div className="rounded-xl border bg-card shadow-lg p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-start gap-4">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm mb-1">Cookie Consent</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                We use cookies to analyze site traffic and serve personalized ads
                via Google AdSense. By clicking &ldquo;Accept All,&rdquo; you consent
                to our use of cookies. You may choose &ldquo;Essential Only&rdquo;
                to decline non-essential cookies.{' '}
                <Link href="/privacy" className="underline hover:text-foreground">
                  Privacy Policy
                </Link>
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={acceptEssential}
                className="px-3 py-1.5 text-xs rounded-md border hover:bg-muted transition-colors"
              >
                Essential Only
              </button>
              <button
                onClick={acceptAll}
                className="px-3 py-1.5 text-xs rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
