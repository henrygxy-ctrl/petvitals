import type { Metadata } from "next";
import { SITE_BASE_URL, SITE_NAME } from "@/lib/constants";
import Link from "next/link"

export const metadata: Metadata = {
  title: "Privacy Policy — PetVitals",
  description: "PetVitals privacy policy. Learn how we collect, use, and protect your data.",
  alternates: { canonical: `${SITE_BASE_URL}/privacy` },
  openGraph: {
    title: "Privacy Policy | PetVitals",
    description: "Learn how PetVitals collects, uses, and protects your data.",
    url: `${SITE_BASE_URL}/privacy`,
    siteName: SITE_NAME,
    type: "website",
  },
  robots: { index: false, follow: true },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center gap-2">
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">&larr; Back to Home</Link>
          <div className="font-bold tracking-tight ml-2">PetVitals</div>
        </div>
      </header>
      <main className="flex-1 max-w-3xl mx-auto px-4 py-12 w-full">
        <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground mb-8">Last updated: June 21, 2026</p>

        <div className="prose prose-sm max-w-none space-y-6 text-foreground/80">
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">1. Information We Collect</h2>
            <p>When you create an account on PetVitals, we collect the email address and name you provide. When you add pets, we store the pet profile information you enter (name, species, breed, weight, birth date, activity level, and body condition score). We also store weight logs, feeding logs, and toxicity search queries associated with your account.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">2. How We Use Your Information</h2>
            <p>We use your information solely to provide and improve the PetVitals service: to identify your account, display your pet data, perform feeding calculations, and track weight history. We do not sell, rent, or share your personal data with third parties for marketing purposes.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">3. Data Storage and Security</h2>
            <p>Your data is stored securely and access is protected by industry-standard encryption. We implement reasonable security measures to protect against unauthorized access, alteration, or destruction of your personal information.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">4. Cookies &amp; Advertising</h2>
            <p>We use essential cookies to maintain your login session and remember your language preference. These cookies are necessary for the website to function.</p>
            <p className="mt-4">We use Google AdSense to display advertisements. Google and its third-party vendors use cookies to serve ads based on your prior visits to PetVitals and other websites. Google&apos;s use of advertising cookies enables it and its partners to serve ads based on your visit to our site and/or other sites on the Internet.</p>
            <p className="mt-2">You may opt out of personalized advertising by visiting <a href="https://adssettings.google.com" className="underline" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>. You can also opt out of third-party vendor cookies for personalized advertising by visiting <a href="https://www.aboutads.info" className="underline" target="_blank" rel="noopener noreferrer">www.aboutads.info</a>.</p>
            <p className="mt-2">For more information about how Google uses data when you use our site, please visit Google&apos;s <a href="https://policies.google.com/technologies/partner-sites" className="underline" target="_blank" rel="noopener noreferrer">Partner Sites policy</a>.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">5. Your Rights</h2>
            <p>You can access, update, or delete your pet data at any time through your dashboard. To delete your entire account and all associated data, please contact us at the email address below. We will process your request within 30 days.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">6. Children's Privacy</h2>
            <p>PetVitals is not intended for children under 13. We do not knowingly collect information from children under 13.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">7. Changes to This Policy</h2>
            <p>We may update this privacy policy from time to time. We will notify users of significant changes by posting a notice on our website.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">8. Contact Us</h2>
            <p>If you have questions about this privacy policy, please contact us at:</p>
            <p className="mt-2"><strong>Email:</strong> henrygxy@gmail.com</p>
          </section>
        </div>
      </main>
      <footer className="border-t py-6 text-center text-xs text-muted-foreground">
        <div className="max-w-3xl mx-auto px-4">&copy; 2026 PetVitals. All rights reserved.</div>
      </footer>
    </div>
  );
}
