import { JsonLdOrganization } from "@/components/seo/json-ld";
import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { NavHeader } from "@/components/landing/nav-header";
import { LatestBlog } from "@/components/landing/latest-blog";
import { NewsletterSignup } from "@/components/newsletter/newsletter-signup";
import { AdUnit } from "@/components/ads/AdUnit";
import Link from "next/link";
import { BookOpen, ShieldCheck, Mail, Car, Stethoscope, Syringe, Clock, Rss } from "lucide-react";

const trustItems = [
  { icon: BookOpen, title: "Science-Based", desc: "All calculations use veterinary standard formulas (RER, MER, BCS) from peer-reviewed research." },
  { icon: ShieldCheck, title: "Vet-Reviewed Data", desc: "Our toxicity database is sourced from ASPCA, Pet Poison Helpline, and veterinary toxicology references." },
  { icon: Mail, title: "Always Free", desc: "No premium tiers, no paywalls. Every tool and feature is available to every pet parent at no cost." },
];

const insuranceTypes = [
  { icon: Car, title: "Accident-Only", href: "/insurance/accident-only", price: "Most affordable", covers: ["Broken bones", "Cuts & lacerations", "Toxin ingestion", "Car accidents", "Bite wounds"], desc: "Covers emergency treatment for accidental injuries. A good starting point for young, healthy pets on a budget." },
  { icon: Stethoscope, title: "Accident & Illness", href: "/insurance/accident-illness", price: "Most popular choice", covers: ["All accident coverage", "Cancer treatment", "Infections & diseases", "Diagnostic tests", "Prescription medications"], desc: "The most common plan type. Covers both unexpected injuries and illnesses, including serious conditions like cancer." },
  { icon: Syringe, title: "Comprehensive / Wellness", href: "/insurance/comprehensive", price: "Full coverage", covers: ["All illness & accident", "Annual checkups", "Vaccinations", "Dental cleaning", "Spay/neuter"], desc: "Adds routine and preventive care on top of accident and illness coverage. Ideal for puppies and kittens." },
  { icon: Clock, title: "Lifetime / Chronic Conditions", href: "/insurance/lifetime", price: "Long-term protection", covers: ["Ongoing conditions", "Hereditary issues", "Hip dysplasia", "Diabetes management", "Annual coverage renewal"], desc: "Covers chronic conditions that require ongoing treatment year after year, without caps per condition." },
];

const insuranceCostGuides = [
  { title: "Pet Insurance Cost", href: "/insurance/pet-insurance-cost", desc: "Monthly premiums, deductibles, and quote comparison tips." },
  { title: "Emergency Vet Cost", href: "/insurance/emergency-vet-cost", desc: "What urgent visits can cost and how insurance changes risk." },
  { title: "Best Pet Insurance for Dogs", href: "/insurance/best-pet-insurance-for-dogs", desc: "Choose coverage by age, breed risk, and budget." },
];

export default function Home() {
  return (
    <>
      <JsonLdOrganization />
      <div className="flex flex-col min-h-screen">
        <NavHeader />
        <Hero />
        <Features />
        {/* How It Works */}
        <section className="py-16 sm:py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">How PetVitals Works</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Three free tools, one mission: give pet parents instant access to reliable health information. No sign-up required for most features.
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">1</span>
                </div>
                <h3 className="font-semibold mb-2">Search or Calculate</h3>
                <p className="text-sm text-muted-foreground">
                  Check if a food or plant is toxic, calculate your pet's daily calorie needs, or track your pet's weight over time.
                </p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">2</span>
                </div>
                <h3 className="font-semibold mb-2">Get Instant Results</h3>
                <p className="text-sm text-muted-foreground">
                  Every result is backed by veterinary references and clinical sources. No ads disguised as content, no sponsored recommendations.
                </p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">3</span>
                </div>
                <h3 className="font-semibold mb-2">Take Action</h3>
                <p className="text-sm text-muted-foreground">
                  Know what to do next — whether it's an emergency vet visit or just adjusting your pet's portion sizes.
                </p>
              </div>
            </div>
          </div>
        </section>
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <AdUnit />
        </div>

        <LatestBlog />

        <section className="py-16 sm:py-20 border-t bg-muted/30">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">Understanding Pet Insurance</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">A straightforward guide to pet insurance types. We compare top providers so you can shop with confidence — and some links may earn us a commission at no cost to you.</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              {insuranceTypes.map((plan, i) => (
                <Link key={i} href={plan.href} className="p-6 rounded-xl border bg-card block hover:border-primary/30 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center"><plan.icon className="h-5 w-5 text-primary" /></div>
                    <div><h3 className="font-semibold">{plan.title}</h3><p className="text-xs text-muted-foreground">{plan.price}</p></div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{plan.desc}</p>
                  <div>
                    <p className="text-xs font-semibold text-foreground/60 mb-2 uppercase tracking-wide">Typically Covers</p>
                    <ul className="grid grid-cols-2 gap-x-2 gap-y-1">
                      {plan.covers.map((item) => (<li key={item} className="text-xs text-muted-foreground flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-emerald-500 shrink-0" />{item}</li>))}
                    </ul>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-8 grid sm:grid-cols-3 gap-3">
              {insuranceCostGuides.map((guide) => (
                <Link key={guide.href} href={guide.href} className="p-4 rounded-xl border bg-card block hover:border-primary/30 transition-colors">
                  <h3 className="text-sm font-semibold">{guide.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{guide.desc}</p>
                </Link>
              ))}
            </div>
            <div className="mt-10 p-5 rounded-xl border bg-card text-center">
            <div className="mt-6 text-center">
              <Link href="/insurance" className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
                Compare all plans &rarr;
              </Link>
            </div>
              <p className="text-sm text-muted-foreground"><strong className="text-foreground">Important:</strong> Coverage details, exclusions, waiting periods, and reimbursement rates vary significantly between providers. Always read the full policy document and compare multiple quotes before choosing. This guide is for educational purposes only.</p>
            </div>
          </div>
        </section>
        <section className="py-16 sm:py-20 border-t bg-muted/30">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">Why Pet Parents Choose PetVitals</h2>
            <div className="grid sm:grid-cols-3 gap-8">
              {trustItems.map((item, i) => (
                <div key={i} className="p-6 rounded-xl border bg-card text-center">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center mx-auto mb-4"><item.icon className="h-5 w-5 text-emerald-600 dark:text-emerald-400" /></div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="py-12 sm:py-16 border-t">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <NewsletterSignup />
          </div>
        </section>
        <footer className="mt-auto border-t bg-muted/30">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
            <div className="grid sm:grid-cols-4 gap-8">
              <div className="sm:col-span-2">
                <h3 className="font-bold text-lg mb-2">PetVitals</h3>
                <p className="text-sm text-muted-foreground mb-3">Free pet health tools for the modern pet parent. Toxicity checker, feeding calculator, and weight tracking ? all in one place.</p>
                <p className="text-xs text-muted-foreground"><strong>Contact:</strong> <a href="mailto:henrygxy@gmail.com" className="hover:text-foreground transition-colors">henrygxy@gmail.com</a></p>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-3">Tools</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><Link href="/toxicity" className="hover:text-foreground transition-colors">Toxicity Checker</Link></li>
                  <li><Link href="/feeding-calculator" className="hover:text-foreground transition-colors">Feeding Calculator</Link></li>
                  <li><Link href="/weight-tracking" className="hover:text-foreground transition-colors">Weight Tracking</Link></li>
                  <li><Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-3">Company</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><Link href="/about" className="hover:text-foreground transition-colors">About Us</Link></li>
                  <li><Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
                  <li><Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link></li>
                  <li><Link href="/contact" className="hover:text-foreground transition-colors">Contact Us</Link></li>
                  <li><Link href="/blog/rss.xml" className="hover:text-foreground transition-colors inline-flex items-center gap-1"><Rss className="h-3 w-3" />RSS Feed</Link></li>
                </ul>
              </div>
            </div>
            <div className="mt-10 pt-6 border-t text-xs text-muted-foreground space-y-2">
              <p className="font-medium text-foreground/70">Medical Disclaimer: PetVitals provides general informational content only. It is not a substitute for professional veterinary advice, diagnosis, or treatment. Always consult a qualified veterinarian with questions about your pet&apos;s health. If you suspect your pet has ingested something toxic, contact your veterinarian or an emergency animal hospital immediately.</p>
              <p>&copy; {new Date().getFullYear()} PetVitals. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
