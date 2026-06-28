import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { CookieConsent } from "@/components/ui/cookie-consent";
import { I18nProvider } from "@/i18n/context";
import { SITE_NAME, SITE_BASE_URL, SITE_DESCRIPTION } from "@/lib/constants";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_BASE_URL),
  title: {
    default: `${SITE_NAME} — Know What's Safe for Your Pet | Free Pet Health Tools`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "can dogs eat",
    "pet toxicity checker",
    "dog food calculator",
    "cat food calculator",
    "pet weight tracker",
    "pet health tools",
    "pet insurance guide",
    "what can my dog eat",
    "pet safety",
    "free pet tools",
  ],
  alternates: {
    canonical: SITE_BASE_URL,
  },
  openGraph: {
    title: `${SITE_NAME} — Free Pet Health & Safety Tools`,
    description: SITE_DESCRIPTION,
    url: SITE_BASE_URL,
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${SITE_BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "PetVitals — Pet Health & Safety Tools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Free Pet Health & Safety Tools`,
    description: SITE_DESCRIPTION,
    images: [`${SITE_BASE_URL}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const GA_MEASUREMENT_ID = "G-GDWKQMY31K";
const ADSENSE_PUBLISHER_ID = "ca-pub-7248211571487483";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* Google Analytics via Partytown worker */}
        <Script
          strategy="worker"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        />
        <Script
          id="ga-init"
          strategy="worker"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
        <Script
          id="affiliate-click-tracking"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              document.addEventListener('click', function(event) {
                var target = event.target;
                if (!target || !target.closest) return;
                var link = target.closest('a[rel~="sponsored"]');
                if (!link) return;

                var payload = {
                  event_category: 'affiliate',
                  event_label: link.href,
                  affiliate_url: link.href,
                  link_text: (link.textContent || '').trim().slice(0, 80),
                  page_path: window.location.pathname
                };

                if (typeof window.gtag === 'function') {
                  window.gtag('event', 'affiliate_click', payload);
                } else {
                  window.dataLayer = window.dataLayer || [];
                  payload.event = 'affiliate_click';
                  window.dataLayer.push(payload);
                }
              }, true);
            `,
          }}
        />
        {/* hreflang tags for US market */}
        <link rel="alternate" hrefLang="en-US" href={SITE_BASE_URL} />
        <link rel="alternate" hrefLang="x-default" href={SITE_BASE_URL} />
        <link rel="manifest" href="/manifest.json" />

        {/* Impact.com affiliate tracking */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(i,m,p,a,c,t){c.ire_o=p;c[p]=c[p]||function(){(c[p].a=c[p].a||[]).push(arguments)};t=a.createElement(m);var z=a.getElementsByTagName(m)[0];t.async=1;t.src=i;z.parentNode.insertBefore(t,z)})('https://utt.impactcdn.com/P-A7440910-bb49-4579-9324-4620bd64fb791.js','script','impactStat',document,window);impactStat('transformLinks');impactStat('trackImpression');`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        {/* AdSense stays on main thread — Partytown breaks ad serving */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7248211571487483"
          crossOrigin="anonymous"
        ></script>
        <I18nProvider>
          <TooltipProvider>
            {children}
            <Toaster />
          </TooltipProvider>
        </I18nProvider>
        <CookieConsent />
      </body>
    </html>
  );
}
