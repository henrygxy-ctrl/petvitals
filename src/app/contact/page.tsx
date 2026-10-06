import type { Metadata } from "next";
import { SITE_BASE_URL, SITE_NAME } from "@/lib/constants";
import Link from "next/link"
import { Download, Mail } from "lucide-react";
import { DownloadLink } from "@/components/downloads/download-link";

export const metadata: Metadata = {
  title: "Contact Us — PetVitals",
  description: "Get in touch with the PetVitals team. We would love to hear your feedback, suggestions, or questions about our free pet health tools.",
  alternates: { canonical: `${SITE_BASE_URL}/contact` },
  openGraph: {
    title: "Contact PetVitals",
    description: "Get in touch with the PetVitals team. Feedback, suggestions, and questions welcome.",
    url: `${SITE_BASE_URL}/contact`,
    siteName: SITE_NAME,
    type: "website",
    images: [{ url: `${SITE_BASE_URL}/og-image.png`, width: 1200, height: 630, alt: "Contact PetVitals" }],
  },
  robots: { index: true, follow: true },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center gap-2">
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">&larr; Back to Home</Link>
          <span className="font-bold tracking-tight ml-2">PetVitals</span>
        </div>
      </header>
      <main className="flex-1 max-w-3xl mx-auto px-4 py-12 w-full">
        <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
        <p className="text-muted-foreground mb-10">
          Have a question, suggestion, or just want to say hi? We'd love to hear from you.
        </p>

        <div className="space-y-8">
          <div className="p-6 rounded-xl border bg-card">
            <h2 className="font-semibold text-lg mb-2">Email</h2>
            <p className="text-sm text-muted-foreground mb-2">
              The best way to reach us. We typically respond within 24 hours.
            </p>
            <a href="mailto:henrygxy@gmail.com" className="text-primary font-medium hover:underline">
              henrygxy@gmail.com
            </a>
          </div>

          <div className="p-6 rounded-xl border bg-card">
            <h2 className="font-semibold text-lg mb-2">What We Can Help With</h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>&bull; Questions about using the toxicity checker or feeding calculator</li>
              <li>&bull; Suggestions for new foods or substances to add to our database</li>
              <li>&bull; Bug reports or technical issues</li>
              <li>&bull; Feature requests and ideas for improvement</li>
              <li>&bull; Partnership and collaboration inquiries</li>
              <li>&bull; General feedback about PetVitals</li>
            </ul>
          </div>

          <div className="p-6 rounded-xl border bg-card">
            <h2 className="font-semibold text-lg mb-2">Before You Email</h2>
            <div className="text-sm text-muted-foreground space-y-2">
              <p>
                <strong className="text-foreground">Medical emergencies:</strong> PetVitals is not a substitute for veterinary care. If your pet is having a medical emergency, contact your veterinarian or an emergency animal hospital immediately.
              </p>
              <p>
                <strong className="text-foreground">Toxicity concerns:</strong> If you believe your pet has ingested something toxic, call your veterinarian or the{" "}
                <a href="https://www.aspca.org/pet-care/animal-poison-control" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">ASPCA Animal Poison Control Center</a>
                {" "}(888-426-4435) right away. Do not wait for an email response.
              </p>
            </div>
          </div>
        </div>
        <section id="resource-feedback" className="mt-10 border-t pt-8 scroll-mt-6">
          <h2 className="text-lg font-semibold">Resource Feedback and Professional Review</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            For a correction, include the page URL, the specific claim, a primary source or current product label, and your proposed correction. Please omit personal medical records. This inbox does not provide emergency advice.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Qualified veterinary professionals may also propose a page-specific review. Include a public professional profile and the scope you can review. We publish a reviewer credit only after the review is completed and the reviewer approves the attribution; feedback alone is not an endorsement. <Link href="/about#professional-review" className="text-primary underline">Clinical review policy</Link>.
          </p>
          <a href="mailto:henrygxy@gmail.com?subject=PetVitals%20resource%20feedback" className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
            <Mail className="h-4 w-4" />Email resource feedback
          </a>
        </section>
        <section id="resource-trial" className="mt-8 border-t pt-8 scroll-mt-6">
          <h2 className="text-lg font-semibold">Free Resources for Shelters and Pet Educators</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Try these educational checklists alongside your organization's own instructions. Tell us which audience used them, which section was unclear, and what should change. They do not replace your veterinarian's guidance. No payment, backlink, or positive recommendation is required.
          </p>
          <ul className="mt-4 space-y-3 text-sm">
            <li><DownloadLink href="/downloads/pet-safe-cleaning-checklist.pdf" title="Pet-Safe Cleaning Checklist" variant="resource_trial" className="inline-flex items-center gap-2 text-primary hover:underline"><Download className="h-4 w-4" />Pet-safe cleaning checklist</DownloadLink></li>
            <li><DownloadLink href="/downloads/pet-poisoning-emergency-checklist.pdf" title="Pet Poisoning Emergency Checklist" variant="resource_trial" className="inline-flex items-center gap-2 text-primary hover:underline"><Download className="h-4 w-4" />Poisoning emergency checklist</DownloadLink></li>
            <li><Link href="/pet-safe-cleaning" className="text-primary underline">Cleaning resource hub</Link> and <Link href="/toxicity/category/plants" className="text-primary underline">plant safety guide</Link></li>
          </ul>
        </section>
      </main>
      <footer className="border-t py-6 text-center text-xs text-muted-foreground">
        <div className="max-w-3xl mx-auto px-4">&copy; 2026 PetVitals. All rights reserved.</div>
      </footer>
    </div>
  );
}
