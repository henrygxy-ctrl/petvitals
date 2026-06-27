import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { toxicityDatabase, getToxicityById, type ToxicityItem } from "@/data/toxicity";
import { SITE_NAME, SITE_BASE_URL } from "@/lib/constants";
import { ArrowLeft, ExternalLink, Shield, AlertTriangle, Info, CheckCircle, Dog, Cat, BookOpen } from "lucide-react";
import { JsonLdBreadcrumb, JsonLdFAQ } from "@/components/seo/json-ld";
import { AdUnit } from "@/components/ads/AdUnit";
import { InsuranceCtaBanner } from "@/components/affiliate/insurance-cta";

const riskLabels: Record<string, string> = {
  safe: "Safe",
  caution: "Caution",
  toxic: "Toxic",
  danger: "Danger",
};

const riskIcons: Record<string, React.ReactNode> = {
  safe: <CheckCircle className="h-7 w-7 text-emerald-500" />,
  caution: <Info className="h-7 w-7 text-amber-500" />,
  toxic: <AlertTriangle className="h-7 w-7 text-orange-500" />,
  danger: <Shield className="h-7 w-7 text-red-500" />,
};

const riskStyles: Record<string, { bg: string; border: string; badge: string }> = {
  safe: {
    bg: "bg-emerald-50 dark:bg-emerald-950/20",
    border: "border-emerald-200 dark:border-emerald-800",
    badge: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  },
  caution: {
    bg: "bg-amber-50 dark:bg-amber-950/20",
    border: "border-amber-200 dark:border-amber-800",
    badge: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  },
  toxic: {
    bg: "bg-orange-50 dark:bg-orange-950/20",
    border: "border-orange-200 dark:border-orange-800",
    badge: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  },
  danger: {
    bg: "bg-red-50 dark:bg-red-950/20",
    border: "border-red-200 dark:border-red-800",
    badge: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  },
};

export async function generateStaticParams() {
  return toxicityDatabase.map((item) => ({
    item: item.id,
  }));
}

function lookupItem(slug: string): ToxicityItem | undefined {
  const byId = getToxicityById(slug);
  if (byId) return byId;
  // Also check aliases
  return toxicityDatabase.find((item) =>
    item.aliases.some((a) => a.toLowerCase() === slug.toLowerCase())
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ item: string }>;
}): Promise<Metadata> {
  const { item: slug } = await params;
  const item = lookupItem(slug);
  if (!item) return { title: "Not Found" };

  const isSafe = item.riskLevel === "safe";
  const petTarget =
    item.safeForDog && item.safeForCat
      ? "Dogs & Cats"
      : item.safeForDog
        ? "Dogs"
        : item.safeForCat
          ? "Cats"
          : "Dogs & Cats";
  const verdict = isSafe ? "Safe" : "Toxic";

  return {
    title: `${item.name}: ${verdict} for ${petTarget}? | ${SITE_NAME}`,
    description: item.description.slice(0, 160),
    alternates: { canonical: `${SITE_BASE_URL}/toxicity/${item.id}` },
    openGraph: {
      title: `Is ${item.name} ${verdict} for ${petTarget}?`,
      description: item.description.slice(0, 160),
      url: `${SITE_BASE_URL}/toxicity/${item.id}`,
      siteName: SITE_NAME,
      type: "article",
    },
  };
}

export default async function ToxicityItemPage({
  params,
}: {
  params: Promise<{ item: string }>;
}) {
  const { item: slug } = await params;
  const item = lookupItem(slug);

  if (!item) {
    notFound();
  }

  const style = riskStyles[item.riskLevel];

  const relatedItems = toxicityDatabase
    .filter(
      (i) =>
        i.id !== item.id &&
        (i.category === item.category || i.tags.some((t) => item.tags.includes(t)))
    )
    .slice(0, 6);

  return (
    <>
      <JsonLdBreadcrumb
        items={[
          { name: "Home", url: SITE_BASE_URL },
          { name: "Toxicity Checker", url: `${SITE_BASE_URL}/toxicity` },
          { name: item.name, url: `${SITE_BASE_URL}/toxicity/${item.id}` },
        ]}
      />
      <div className="min-h-screen flex flex-col">
        <header className="border-b">
          <div className="max-w-4xl mx-auto px-4 h-14 flex items-center gap-2">
            <Link
              href="/toxicity"
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Search
            </Link>
            <span className="ml-2 font-bold tracking-tight">PetVitals</span>
          </div>
        </header>

        <main className="flex-1 py-8 sm:py-12">
          <div className="max-w-4xl mx-auto px-4">
            {/* Hero card */}
            <div
              className={`rounded-xl border-2 ${style.border} ${style.bg} p-6 sm:p-8`}
            >
              <div className="flex items-start gap-4">
                <div className="shrink-0 mt-1">{riskIcons[item.riskLevel]}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                      {item.name}
                    </h1>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${style.badge}`}
                    >
                      {riskLabels[item.riskLevel]}
                    </span>
                  </div>
                  <p className="text-muted-foreground mt-2 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Pet safety badges */}
                  <div className="flex gap-3 mt-3">
                    <div
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                        item.safeForDog
                          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                          : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                      }`}
                    >
                      <Dog className="h-3.5 w-3.5" />
                      {item.safeForDog ? "Safe for Dogs" : "Unsafe for Dogs"}
                    </div>
                    <div
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                        item.safeForCat
                          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                          : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                      }`}
                    >
                      <Cat className="h-3.5 w-3.5" />
                      {item.safeForCat ? "Safe for Cats" : "Unsafe for Cats"}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Ad placement */}
            <div className="mt-6">
              <AdUnit format="rectangle" />
            </div>

            {/* Details grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              {/* Symptoms */}
              {item.symptoms && (
                <div className="p-5 rounded-xl border bg-card">
                  <h2 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground mb-3">
                    Symptoms to Watch For
                  </h2>
                  <p className="text-sm leading-relaxed">{item.symptoms}</p>
                </div>
              )}

              {/* Action */}
              {item.action && (
                <div className="p-5 rounded-xl border bg-card">
                  <h2 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground mb-3">
                    What to Do
                  </h2>
                  <p className="text-sm leading-relaxed">{item.action}</p>
                </div>
              )}

              {/* Safe amount */}
              {item.safeAmount && (
                <div className="p-5 rounded-xl border bg-card">
                  <h2 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground mb-3">
                    Safe Amount
                  </h2>
                  <p className="text-sm leading-relaxed">{item.safeAmount}</p>
                </div>
              )}

              {/* Benefits */}
              {item.benefits && (
                <div className="p-5 rounded-xl border bg-card">
                  <h2 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground mb-3">
                    Benefits
                  </h2>
                  <p className="text-sm leading-relaxed">{item.benefits}</p>
                </div>
              )}
            </div>

            {/* Insurance CTA — relevant for toxic/danger items */}
            {(item.riskLevel === "toxic" || item.riskLevel === "danger") && (
              <InsuranceCtaBanner />
            )}

            {/* Tags */}
            <div className="mt-6 flex flex-wrap gap-1.5">
              <span className="text-xs text-muted-foreground mr-1 self-center">
                Tags:
              </span>
              {item.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/toxicity?q=${encodeURIComponent(tag)}`}
                  className="text-xs px-2 py-0.5 rounded-full bg-muted hover:bg-muted/80 text-muted-foreground transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>

            {/* Sources */}
            {item.sources && item.sources.length > 0 && (
              <div className="mt-6 p-5 rounded-xl border bg-card">
                <h2 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground mb-3">
                  Clinical References
                </h2>
                <ul className="space-y-1.5">
                  {item.sources.map((url, i) => (
                    <li key={i}>
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                      >
                        <ExternalLink className="h-3 w-3" />
                        {url.length > 70 ? url.slice(0, 70) + "..." : url}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Related items */}
            {relatedItems.length > 0 && (
              <div className="mt-10">
                <h2 className="font-bold text-lg mb-4">Related Items</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {relatedItems.map((rel) => {
                    const rs = riskStyles[rel.riskLevel];
                    return (
                      <Link
                        key={rel.id}
                        href={`/toxicity/${rel.id}`}
                        className={`block p-4 rounded-lg border ${rs.border} ${rs.bg} hover:opacity-90 transition-opacity`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm truncate">
                            {rel.name}
                          </span>
                          <span
                            className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium shrink-0 ${rs.badge}`}
                          >
                            {riskLabels[rel.riskLevel]}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                          {rel.description}
                        </p>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Back to search + disclaimer */}
            <div className="mt-10 text-center">
              <Link
                href="/toxicity"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
              >
                <ArrowLeft className="h-4 w-4" />
                Search all 500+ items
              </Link>
            </div>

            <div className="mt-6 p-4 rounded-lg bg-muted/50 text-xs text-muted-foreground leading-relaxed">
              <strong>Disclaimer:</strong> This information is for educational
              purposes only and is not a substitute for professional veterinary
              advice. If you suspect your pet has ingested something toxic,
              contact your veterinarian or the ASPCA Animal Poison Control
              Center (888-426-4435) immediately.
            </div>
          </div>
        </main>

        <footer className="border-t py-6 text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} PetVitals. Always consult your
          veterinarian.
        </footer>
      </div>
    </>
  );
}