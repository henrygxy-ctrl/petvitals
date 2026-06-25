import type { Metadata } from "next";
import Link from 'next/link'

export const metadata: Metadata = {
  title: "Terms of Service — PetVitals",
  description: "PetVitals terms of service. Read the terms and conditions for using our pet health tools.",
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center gap-2">
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">&larr; Back to Home</Link>
          <div className="font-bold tracking-tight ml-2">PetVitals</div>
        </div>
      </header>
      <main className="flex-1 max-w-3xl mx-auto px-4 py-12 w-full">
        <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
        <p className="text-sm text-muted-foreground mb-8">Last updated: June 2026</p>

        <div className="prose prose-sm max-w-none space-y-6 text-foreground/80">
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">1. Acceptance of Terms</h2>
            <p>By accessing or using PetVitals (&quot;the Service&quot;), you agree to be bound by these Terms of Service. If you do not agree, please do not use the Service.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">2. Description of Service</h2>
            <p>PetVitals provides free pet health tools including a toxicity checker for foods and substances, a science-based feeding calculator, and weight tracking. The Service is provided &quot;as is&quot; for informational purposes only.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">3. Medical Disclaimer</h2>
            <p className="font-medium text-foreground">PetVitals is not a substitute for professional veterinary advice, diagnosis, or treatment. Always seek the advice of a qualified veterinarian with any questions regarding your pet&apos;s health. Never disregard professional veterinary advice or delay seeking it because of information you have read on PetVitals. If you believe your pet may have a medical emergency, contact your veterinarian or an emergency veterinary clinic immediately.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">4. User Accounts</h2>
            <p>You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account. You must provide accurate and complete information when creating an account.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">5. Acceptable Use</h2>
            <p>You agree not to misuse the Service, including but not limited to: attempting to gain unauthorized access, using the Service for any illegal purpose, or interfering with the operation of the Service.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">6. Intellectual Property</h2>
            <p>All content, features, and functionality of the Service are owned by PetVitals and are protected by applicable intellectual property laws.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">7. Limitation of Liability</h2>
            <p>PetVitals shall not be liable for any indirect, incidental, or consequential damages arising from your use of the Service. The toxicity checker and feeding calculator provide general guidance only and may not cover every situation.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">8. Changes to Terms</h2>
            <p>We reserve the right to modify these terms at any time. Continued use of the Service after changes constitutes acceptance of the new terms.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">9. Contact</h2>
            <p>For questions about these Terms, contact us at: <strong>henrygxy@gmail.com</strong></p>
          </section>
        </div>
      </main>
      <footer className="border-t py-6 text-center text-xs text-muted-foreground">
        <div className="max-w-3xl mx-auto px-4">&copy; 2026 PetVitals. All rights reserved.</div>
      </footer>
    </div>
  );
}
