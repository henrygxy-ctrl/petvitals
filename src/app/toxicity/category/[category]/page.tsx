import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AlertTriangle, ArrowLeft, ArrowRight, CheckCircle2, Info, ShieldAlert } from "lucide-react";
import { SITE_BASE_URL, SITE_NAME } from "@/lib/constants";
import { toxicityDatabase, type ToxicityLevel } from "@/data/toxicity";
import {
  getToxicityCategoryEntries,
  isToxicityCategory,
  TOXICITY_CATEGORY_META,
} from "@/lib/toxicity-category-metadata";
import { JsonLdBreadcrumb, JsonLdItemList } from "@/components/seo/json-ld";

interface Props {
  params: Promise<{ category: string }>;
}

const riskRank: Record<ToxicityLevel, number> = {
  danger: 0,
  toxic: 1,
  caution: 2,
  safe: 3,
};

const riskConfig: Record<ToxicityLevel, { label: string; className: string; icon: typeof Info }> = {
  danger: {
    label: "Danger",
    className: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    icon: ShieldAlert,
  },
  toxic: {
    label: "Toxic",
    className: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
    icon: AlertTriangle,
  },
  caution: {
    label: "Caution",
    className: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    icon: Info,
  },
  safe: {
    label: "Safe",
    className: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    icon: CheckCircle2,
  },
};

export async function generateStaticParams() {
  return getToxicityCategoryEntries().map((category) => ({ category: category.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  if (!isToxicityCategory(category)) return { title: "Not Found" };

  const meta = TOXICITY_CATEGORY_META[category];
  const url = `${SITE_BASE_URL}/toxicity/category/${category}`;

  return {
    title: `${meta.label} Toxicity Guide for Dogs & Cats | ${SITE_NAME}`,
    description: `${meta.description} Browse PetVitals safety notes, symptoms, emergency steps, and full toxicity details.`,
    alternates: { canonical: url },
    openGraph: {
      title: `${meta.label} Toxicity Guide for Dogs & Cats`,
      description: meta.description,
      url,
      siteName: SITE_NAME,
      type: "website",
    },
  };
}

export default async function ToxicityCategoryPage({ params }: Props) {
  const { category } = await params;
  if (!isToxicityCategory(category)) notFound();

  const meta = TOXICITY_CATEGORY_META[category];
  const seen = new Set<string>();
  const items = toxicityDatabase
    .filter((item) => item.category === category)
    .filter((item) => {
      if (seen.has(item.id)) return false;
      seen.add(item.id);
      return true;
    })
    .sort((a, b) => riskRank[a.riskLevel] - riskRank[b.riskLevel] || a.name.localeCompare(b.name));

  const riskyCount = items.filter((item) => item.riskLevel === "danger" || item.riskLevel === "toxic").length;

  const breadcrumbs = [
    { name: "Home", url: SITE_BASE_URL },
    { name: "Toxicity Checker", url: `${SITE_BASE_URL}/toxicity` },
    { name: meta.label, url: `${SITE_BASE_URL}/toxicity/category/${category}` },
  ];

  return (
    <>
      <JsonLdBreadcrumb items={breadcrumbs} />
      <JsonLdItemList
        items={items.map((item) => ({
          name: item.name,
          url: `${SITE_BASE_URL}/toxicity/${item.id}`,
          description: item.description,
        }))}
      />
      <div className="min-h-screen flex flex-col">
        <header className="border-b">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-2">
            <Link href="/toxicity" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4" />
              Toxicity Checker
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="font-semibold text-sm">{meta.label}</span>
          </div>
        </header>

        <main className="flex-1 py-8 sm:py-12">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="mb-8">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                Pet Toxicity Directory
              </p>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                {meta.label} Toxicity Guide for Dogs and Cats
              </h1>
              <p className="mt-3 text-muted-foreground max-w-2xl">
                {meta.description} Browse {items.length} items with safety status,
                symptoms to watch for, and emergency guidance.
              </p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs text-muted-foreground">
                <span className="rounded-full bg-muted px-3 py-1">{items.length} total items</span>
                <span className="rounded-full bg-muted px-3 py-1">{riskyCount} toxic or dangerous</span>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {items.map((item) => {
                const config = riskConfig[item.riskLevel];
                const Icon = config.icon;

                return (
                  <Link
                    key={item.id}
                    href={`/toxicity/${item.id}`}
                    className="rounded-xl border bg-card p-5 hover:border-primary/40 transition-colors group"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h2 className="font-semibold group-hover:text-primary transition-colors">
                        {item.name}
                      </h2>
                      <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ${config.className}`}>
                        <Icon className="h-3 w-3" />
                        {config.label}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
                      {item.description}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-primary">
                      View details
                      <ArrowRight className="h-3 w-3" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </main>

        <footer className="border-t py-6 text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} {SITE_NAME}. Always consult your veterinarian.
        </footer>
      </div>
    </>
  );
}
