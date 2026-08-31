import Link from "next/link";
import { Rss } from "lucide-react";
import type { Metadata } from "next";
import { getAllPosts, getAllCategories } from "@/lib/blog";
import { SITE_NAME, SITE_BASE_URL } from "@/lib/constants";
import { NewsletterSignup } from "@/components/newsletter/newsletter-signup";
import { AdUnit } from "@/components/ads/AdUnit";
import { BlogListClient } from "@/components/blog/blog-list-client";
import { JsonLdItemList } from "@/components/seo/json-ld";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: `Blog - Pet Health & Safety Guides | ${SITE_NAME}`,
  description:
    "Expert pet health articles on nutrition, toxicity, weight management, and safety. Evidence-based guides for dog and cat owners.",
  alternates: { canonical: `${SITE_BASE_URL}/blog` },
  openGraph: {
    title: `Pet Health Blog | ${SITE_NAME}`,
    description:
      "Evidence-based pet health guides for dog and cat owners. Nutrition, safety, weight management, and more.",
    url: `${SITE_BASE_URL}/blog`,
    siteName: SITE_NAME,
    type: "website",
    images: [{ url: `${SITE_BASE_URL}/og-image.png`, width: 1200, height: 630, alt: "PetVitals Blog" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Pet Health Blog | ${SITE_NAME}`,
    description:
      "Evidence-based pet health guides for dog and cat owners. Nutrition, safety, weight management, and more.",
    images: [`${SITE_BASE_URL}/og-image.png`],
  },
};

const popularGuides = [
  {
    title: "Dog Toxicity Hub",
    href: "/toxicity/dogs",
    desc: "Common dog poison searches, emergency risks, and prevention guides.",
  },
  {
    title: "Cat Toxicity Hub",
    href: "/toxicity/cats",
    desc: "Cat plant, cleaner, medication, and food toxicity resources.",
  },
  {
    title: "Pet-Safe Cleaning Hub",
    href: "/pet-safe-cleaning",
    desc: "Cleaner ingredient checker, floor cleaner guide, and cat-safe disinfectants.",
  },
  {
    title: "Puppy Care Hub",
    href: "/puppy-care",
    desc: "Vaccines, first vet cost, supplies, and first-year puppy planning.",
  },
  {
    title: "Vet Cost Hub",
    href: "/vet-costs",
    desc: "Emergency, dental, puppy, and insurance cost tools in one place.",
  },
  {
    title: "Pet Toxicity Checker",
    href: "/toxicity",
    desc: "Search foods, plants, cleaners, and household items for dogs and cats.",
  },
  {
    title: "Dog Dental Costs",
    href: "/blog/how-much-is-a-dog-teeth-cleaning",
    desc: "Compare teeth cleaning, dental X-rays, extractions, and insurance rules.",
  },
  {
    title: "Flea and Tick Hub",
    href: "/blog/flea-tick-prevention-guide",
    desc: "Choose safer flea and tick prevention for cats, dogs, and multi-pet homes.",
  },
  {
    title: "New Puppy Costs",
    href: "/blog/puppy-first-vet-visit-cost",
    desc: "Plan first vet visit, vaccine series, supplies, insurance, and emergency buffers.",
  },
  {
    title: "Pet Insurance Cost",
    href: "/insurance/pet-insurance-cost",
    desc: "Use the calculator to compare dog and cat insurance settings.",
  },
  {
    title: "Emergency Vet Cost",
    href: "/insurance/emergency-vet-cost",
    desc: "Understand urgent-care bills before poisoning, injuries, or surgery happen.",
  },
];

const searchOpportunityGuides = [
  {
    title: "Disinfectants Safe for Cats",
    href: "/blog/disinfectants-safe-for-cats",
    desc: "Contact time, drying, rinsing, and ingredient cautions for cat homes.",
  },
  {
    title: "Can Cats Walk After Mopping?",
    href: "/blog/can-cats-walk-on-floors-after-mopping",
    desc: "Drying time, paw residue, floor cleaner choices, and what to do after exposure.",
  },
  {
    title: "Vinegar Floor Cleaner and Pets",
    href: "/blog/is-vinegar-floor-cleaner-safe-for-pets",
    desc: "When diluted vinegar is reasonable, when to avoid it, and better urine cleaners.",
  },
  {
    title: "Essential-Oil Cleaners and Cats",
    href: "/blog/are-essential-oil-cleaners-safe-for-cats",
    desc: "Tea tree, eucalyptus, citrus, pine, diffusers, wet residue, and safer alternatives.",
  },
  {
    title: "Pet-Friendly Cleaning Products",
    href: "/blog/pet-friendly-cleaning-products",
    desc: "Room-by-room cleaner choices for dogs, cats, floors, urine, bowls, toys, and disinfecting.",
  },
  {
    title: "Does Insurance Cover Poisoning?",
    href: "/blog/does-pet-insurance-cover-poisoning",
    desc: "Toxin ingestion, accident-only coverage, emergency treatment, and exclusions.",
  },
  {
    title: "Does Insurance Cover Surgery?",
    href: "/blog/does-pet-insurance-cover-emergency-surgery",
    desc: "Emergency surgery coverage, foreign body claims, deductibles, and annual limits.",
  },
  {
    title: "Pet Insurance Waiting Period",
    href: "/blog/pet-insurance-waiting-period-explained",
    desc: "Accident, illness, orthopedic, wellness, and pre-existing condition timing.",
  },
  {
    title: "Is Wisteria Poisonous to Dogs?",
    href: "/blog/is-wisteria-poisonous-to-dogs",
    desc: "Wisteria seed and pod risks, dog poisoning symptoms, and what to do after exposure.",
  },
  {
    title: "Is Wisteria Toxic to Cats?",
    href: "/blog/is-wisteria-toxic-to-cats",
    desc: "Cat wisteria exposure, toxic plant symptoms, prevention, and emergency next steps.",
  },
  {
    title: "Can Cats Eat Melon?",
    href: "/blog/can-cats-eat-cantaloupe",
    desc: "Cantaloupe, honeydew, watermelon flesh, serving size, and unsafe fruit mixes.",
  },
  {
    title: "Pet-Safe Floor Cleaners",
    href: "/blog/pet-safe-floor-cleaners-dogs-cats",
    desc: "Residue, drying time, paw licking, and safer cleaning routines for dogs and cats.",
  },
  {
    title: "Cat-Friendly Cleaning Products",
    href: "/blog/cat-friendly-cleaning-products",
    desc: "Cleaner ingredients, disinfectants, fragrance risk, and cat household rules.",
  },
  {
    title: "Best Pet-Safe Cleaning Products",
    href: "/blog/best-pet-safe-cleaning-products",
    desc: "A buying checklist for pet-safe cleaners, floors, fabrics, and odor control.",
  },
  {
    title: "Pet Insurance Cost",
    href: "/insurance/pet-insurance-cost",
    desc: "Monthly premiums, deductibles, reimbursement settings, and quote comparison.",
  },
  {
    title: "Cat Insurance Cost",
    href: "/insurance/cat-insurance-cost",
    desc: "What cat owners should compare before choosing accident or illness coverage.",
  },
  {
    title: "Accident-Only Pet Insurance",
    href: "/insurance/accident-only",
    desc: "When a lower-premium accident plan helps with poisoning, injuries, and surgery.",
  },
];

export default function BlogPage() {
  const posts = getAllPosts();
  const categories = getAllCategories();
  const postItems = posts.map((post) => ({
    name: post.title,
    url: `${SITE_BASE_URL}/blog/${post.slug}`,
    description: post.excerpt,
  }));

  return (
    <>
      <JsonLdItemList items={postItems} />
      <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-2">
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Home
          </Link>
          <span className="text-muted-foreground">/</span>
          <span className="font-semibold text-sm">Blog</span>
        </div>
      </header>

      <main className="flex-1 py-8 sm:py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="mb-8"><div className="flex items-center justify-between mb-2"><h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Pet Health Blog</h1><Link href="/blog/rss.xml" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-orange-500 transition-colors shrink-0"><Rss className="h-3.5 w-3.5" />RSS</Link></div>
            
            <p className="mt-2 text-muted-foreground max-w-2xl">Evidence-based guides on pet nutrition, safety, weight management, and more.</p>
          </div>

          <section className="mb-8">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">
              Popular Questions
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {searchOpportunityGuides.map((guide) => (
                <Link
                  key={guide.href}
                  href={guide.href}
                  className="rounded-xl border bg-card p-4 hover:border-primary/40 transition-colors"
                >
                  <h3 className="text-sm font-semibold">{guide.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{guide.desc}</p>
                </Link>
              ))}
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">
              Start Here
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {popularGuides.map((guide) => (
                <Link
                  key={guide.href}
                  href={guide.href}
                  className="rounded-xl border bg-card p-4 hover:border-primary/40 transition-colors"
                >
                  <h3 className="text-sm font-semibold">{guide.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{guide.desc}</p>
                </Link>
              ))}
            </div>
          </section>

          <BlogListClient posts={posts} categories={categories} />

          <AdUnit />
        </div>
      </main>

                <section className="py-12 border-t">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
              <NewsletterSignup
                source="blog_index_footer"
                interest="pet-health-guides"
              />
            </div>
          </section>

      <footer className="border-t py-6 text-center text-xs text-muted-foreground">
        &copy; {new Date().getFullYear()} {SITE_NAME}. Always consult your veterinarian.
      </footer>
    </div>
    </>
  );
}
