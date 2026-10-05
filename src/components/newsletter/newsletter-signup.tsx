import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { DownloadLink } from "@/components/downloads/download-link";
import { NewsletterForm, type NewsletterFormProps } from "@/components/newsletter/newsletter-form";
import { getNewsletterConfig } from "@/lib/newsletter";

export function NewsletterSignup({ fallback = true, ...props }: NewsletterFormProps & { fallback?: boolean }) {
  if (getNewsletterConfig()) return <NewsletterForm {...props} />;
  if (!fallback) return null;

  return (
    <div className="mx-auto max-w-md text-center">
      <h3 className="text-base font-semibold">Keep an Emergency Checklist Handy</h3>
      <p className="my-3 text-sm text-muted-foreground">Pet poison contacts, exposure notes, and what to bring to the clinic. No email required.</p>
      <DownloadLink href="/downloads/pet-poisoning-emergency-checklist.pdf" title="Pet Poisoning Emergency Checklist" variant={props.source || "newsletter_fallback"} className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
        <Download className="h-4 w-4" /> Download Checklist
      </DownloadLink>
      <Link href="/toxicity" className="mt-3 flex min-h-11 items-center justify-center gap-2 text-sm text-primary hover:underline">
        Search the Toxicity Checker <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
