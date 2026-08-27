import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { DownloadLink } from "@/components/downloads/download-link";
import { JsonLdBreadcrumb, JsonLdFAQ, JsonLdItemList } from "@/components/seo/json-ld";
import { SITE_BASE_URL, SITE_NAME } from "@/lib/constants";

export interface HubLink {
  title: string;
  href: string;
  description: string;
  label?: string;
}

interface TopicHubPageProps {
  label: string;
  title: string;
  intro: string;
  canonicalPath: string;
  primaryCta: HubLink;
  secondaryCta?: HubLink;
  highlights: { value: string; label: string; note: string }[];
  infographic?: ReactNode;
  sections: { title: string; description: string; links: HubLink[] }[];
  faq?: { question: string; answer: string }[];
  resource?: ReactNode;
  footerNote?: string;
}

export function TopicHubPage({
  label,
  title,
  intro,
  canonicalPath,
  primaryCta,
  secondaryCta,
  highlights,
  infographic,
  sections,
  faq,
  resource,
  footerNote,
}: TopicHubPageProps) {
  const canonical = `${SITE_BASE_URL}${canonicalPath}`;
  const allLinks = sections.flatMap((section) => section.links);

  return (
    <>
      <JsonLdBreadcrumb
        items={[
          { name: "Home", url: SITE_BASE_URL },
          { name: label, url: canonical },
        ]}
      />
      <JsonLdItemList
        items={allLinks.map((link) => ({
          name: link.title,
          url: `${SITE_BASE_URL}${link.href}`,
          description: link.description,
        }))}
      />
      {faq && faq.length > 0 && <JsonLdFAQ questions={faq} />}
      <div className="min-h-screen flex flex-col">
        <header className="border-b">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-2">
            <Link href="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4" />
              Home
            </Link>
            <span className="font-bold tracking-tight ml-2">{SITE_NAME}</span>
          </div>
        </header>

        <main className="flex-1 py-10 sm:py-14">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <section className="mb-8">
              <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {label}
              </span>
              <h1 className="mt-2 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
                {title}
              </h1>
              <p className="mt-4 max-w-2xl text-muted-foreground">{intro}</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href={primaryCta.href}
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
                >
                  {primaryCta.title}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                {secondaryCta && secondaryCta.href.endsWith(".pdf") ? (
                  <DownloadLink
                    href={secondaryCta.href}
                    title={secondaryCta.title}
                    variant={canonicalPath}
                    className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium hover:bg-muted"
                  >
                    {secondaryCta.title}
                  </DownloadLink>
                ) : secondaryCta ? (
                  <Link
                    href={secondaryCta.href}
                    className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium hover:bg-muted"
                  >
                    {secondaryCta.title}
                  </Link>
                ) : null}
              </div>
            </section>

            <section className="mb-8 grid gap-4 sm:grid-cols-3">
              {highlights.map((item) => (
                <div key={item.label} className="rounded-xl border bg-card p-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{item.label}</p>
                  <p className="mt-2 text-2xl font-bold text-foreground">{item.value}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{item.note}</p>
                </div>
              ))}
            </section>

            {infographic}

            <div className="mt-8 space-y-10">
              {sections.map((section) => (
                <section key={section.title}>
                  <div className="mb-4">
                    <h2 className="text-xl font-bold">{section.title}</h2>
                    <p className="mt-1 text-sm text-muted-foreground">{section.description}</p>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {section.links.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="rounded-xl border bg-card p-5 hover:border-primary/40 transition-colors group"
                      >
                        {link.label && (
                          <span className="text-xs font-semibold uppercase tracking-wide text-primary">
                            {link.label}
                          </span>
                        )}
                        <h3 className="mt-1 text-sm font-semibold group-hover:text-primary transition-colors">
                          {link.title}
                        </h3>
                        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                          {link.description}
                        </p>
                        <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary">
                          Open
                          <ArrowRight className="h-3 w-3" />
                        </span>
                      </Link>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            {resource}

            {faq && faq.length > 0 && (
              <section className="mt-10">
                <h2 className="text-xl font-bold">Frequently Asked Questions</h2>
                <div className="mt-4 space-y-3">
                  {faq.map((item) => (
                    <details key={item.question} className="rounded-lg border bg-card">
                      <summary className="cursor-pointer px-5 py-4 text-sm font-medium">
                        {item.question}
                      </summary>
                      <div className="px-5 pb-4 text-sm leading-relaxed text-muted-foreground">
                        {item.answer}
                      </div>
                    </details>
                  ))}
                </div>
              </section>
            )}

            {footerNote && (
              <div className="mt-10 rounded-lg bg-muted/50 p-4 text-xs leading-relaxed text-muted-foreground">
                {footerNote}
              </div>
            )}
          </div>
        </main>

        <footer className="border-t py-6 text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} {SITE_NAME}. Always consult your veterinarian.
        </footer>
      </div>
    </>
  );
}
