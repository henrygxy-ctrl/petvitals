import type { Metadata } from "next";
import Link from "next/link";
import { SITE_BASE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Newsletter Confirmation | PetVitals",
  alternates: { canonical: `${SITE_BASE_URL}/newsletter/confirmed` },
  robots: { index: false, follow: false },
};

export default function NewsletterConfirmedPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-12 w-full">
      <h1 className="text-2xl font-bold">Thanks for checking your email</h1>
      <p className="mt-4 text-muted-foreground">If you followed a valid confirmation link, your subscription is now managed by our email service. Opening this page by itself does not subscribe you.</p>
      <p className="mt-4 text-sm text-muted-foreground">You can unsubscribe through the link in any PetVitals newsletter.</p>
      <div className="mt-8 flex flex-wrap gap-4">
        <Link href="/pet-safe-cleaning" className="underline">Pet-safe cleaning guides</Link>
        <a href="/downloads/pet-safe-cleaning-checklist.pdf" className="underline">Printable cleaning checklist</a>
        <Link href="/toxicity" className="underline">Toxicity checker</Link>
      </div>
    </main>
  );
}
