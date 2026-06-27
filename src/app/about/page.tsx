import type { Metadata } from "next";
import { SITE_NAME, SITE_BASE_URL } from "@/lib/constants";
import { BookOpen, FlaskConical, Mail, ShieldCheck, Users, LineChart, UtensilsCrossed, Search } from "lucide-react";
import { JsonLdOrganization, JsonLdBreadcrumb } from "@/components/seo/json-ld";
import Link from 'next/link'

export const metadata: Metadata = {
  title: `About PetVitals — Free Pet Health Tools | ${SITE_NAME}`,
  description: "Learn about PetVitals: who we are, our mission to make pet health information accessible, our data sources, methodology, and how our free tools help pet parents worldwide.",
  alternates: { canonical: `${SITE_BASE_URL}/about` },
  openGraph: {
    title: `About PetVitals — Free Pet Health Tools`,
    description: "Our mission, methodology, and the story behind PetVitals — free tools for pet parents worldwide.",
    url: `${SITE_BASE_URL}/about`,
    siteName: SITE_NAME,
    type: "website",
  },
};

const breadcrumbs = [
  { name: "Home", url: SITE_BASE_URL },
  { name: "About Us", url: `${SITE_BASE_URL}/about` },
];

export default function AboutPage() {
  return (
    <>
      <JsonLdOrganization />
      <JsonLdBreadcrumb items={breadcrumbs} />
      <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center gap-2">
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">&larr; Back to Home</Link>
          <span className="font-bold tracking-tight ml-2">PetVitals</span>
        </div>
      </header>
      <main className="flex-1 max-w-4xl mx-auto px-4 py-12 w-full">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          About PetVitals
        </h1>
        <p className="text-lg text-muted-foreground mb-12 max-w-3xl">
          Free, science-backed pet health tools for the modern pet parent. No paywalls, no premium tiers — just reliable information when you need it.
        </p>

        <div className="prose prose-sm max-w-none space-y-10 text-foreground/80">

          {/* Our Mission */}
          <section>
            <h2 className="text-2xl font-bold text-foreground">Our Mission</h2>
            <p>
              PetVitals was built to solve a simple but frustrating problem: when you're standing in your kitchen 
              wondering whether your dog can eat that grape that just rolled off the counter, you need an answer 
              <em> right now</em>. Not after scrolling through 12 pages of ads, personal anecdotes, and conflicting forum 
              posts.
            </p>
            <p>
              We provide instant, clear, evidence-based answers about what's safe for your pet — and we do it for free. 
              Every tool on PetVitals is built using veterinary-standard formulas and data sourced from established 
              toxicology references, peer-reviewed research, and professional veterinary guidelines.
            </p>
            <p>
              Our core belief: reliable pet health information should be accessible to everyone, regardless of budget. 
              Pet ownership already comes with enough costs — access to basic safety information shouldn't be one of them.
            </p>
          </section>

          {/* Who We Are */}
          <section>
            <h2 className="text-2xl font-bold text-foreground">Who We Are</h2>
            <p>
              PetVitals is an independent project created and maintained by a small team of pet lovers, developers, 
              and health data researchers. We're not a large corporation, a veterinary chain, or a pet food company. 
              We don't sell pet insurance, pet food, or supplements — and we don't accept payments to feature or 
              promote specific products or brands.
            </p>
            <p>
              Our work is supported by advertising (via Google AdSense), which allows us to keep every tool free for 
              every user. We chose this model deliberately: it means we answer to our users, not to corporate partners 
              or investors.
            </p>
          </section>

          {/* Our Tools */}
          <section>
            <h2 className="text-2xl font-bold text-foreground">Our Tools</h2>
            <div className="space-y-5 not-prose">
              <div className="p-5 rounded-xl border bg-card">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Search className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Toxicity Checker</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Search over 500 foods, plants, medications, and household items to instantly check safety for 
                      dogs and cats. Each entry includes toxicity level, symptoms, emergency steps, and clinical 
                      source references. Data sourced from ASPCA Animal Poison Control Center, Pet Poison Helpline, 
                      and veterinary toxicology textbooks.
                    </p>
                    <Link href="/toxicity" className="inline-block mt-2 text-sm font-medium text-primary hover:underline">Try the Toxicity Checker &rarr;</Link>
                  </div>
                </div>
              </div>
              <div className="p-5 rounded-xl border bg-card">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <UtensilsCrossed className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Feeding Calculator</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Calculate exactly how much to feed your dog or cat using AAHA and WSAVA veterinary-standard 
                      formulas. Enter your pet's weight, age, activity level, and body condition score for a 
                      personalized daily calorie target and portion guide. Supports multiple dog food brands with 
                      accurate kcal/cup values.
                    </p>
                    <Link href="/feeding-calculator" className="inline-block mt-2 text-sm font-medium text-primary hover:underline">Use the Feeding Calculator &rarr;</Link>
                  </div>
                </div>
              </div>
              <div className="p-5 rounded-xl border bg-card">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <LineChart className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Weight Tracking</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Track your pet's weight over time with built-in Body Condition Score (BCS) assessment. 
                      Visualize weight trends, export data for your veterinarian, and catch unhealthy changes 
                      early. Free account required to save your pet's data.
                    </p>
                    <Link href="/sign-in?redirect=/dashboard" className="inline-block mt-2 text-sm font-medium text-primary hover:underline">Start Tracking &rarr;</Link>
                  </div>
                </div>
              </div>
              <div className="p-5 rounded-xl border bg-card">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <BookOpen className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Pet Health Blog</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Evidence-based guides covering pet nutrition, toxicity, weight management, and wellness. 
                      Every article cites clinical sources, veterinary guidelines, and peer-reviewed research. 
                      We don't publish listicles, personal anecdotes without sources, or sponsored content.
                    </p>
                    <Link href="/blog" className="inline-block mt-2 text-sm font-medium text-primary hover:underline">Read the Blog &rarr;</Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Data & Methodology */}
          <section>
            <h2 className="text-2xl font-bold text-foreground">Our Data & Methodology</h2>
            <p>
              Accuracy matters when it comes to pet health. Here's exactly where our information comes from:
            </p>
            <h3 className="text-lg font-semibold text-foreground mt-4">Toxicity Database</h3>
            <p>
              Our toxicity data is compiled from multiple authoritative sources, including the ASPCA Animal Poison 
              Control Center database, the Pet Poison Helpline, the Merck Veterinary Manual, and published veterinary 
              toxicology literature such as <em>Small Animal Toxicology</em> (Peterson & Talcott) and 
              <em> Blackwell's Five-Minute Veterinary Consult Clinical Companion: Small Animal Toxicology</em>. 
              Entries are reviewed for accuracy and include toxicity mechanisms, symptom timelines, and emergency 
              response guidance.
            </p>
            <h3 className="text-lg font-semibold text-foreground mt-4">Feeding Calculator Formulas</h3>
            <p>
              Our calculator uses the Resting Energy Requirement (RER) formula — 70 — (body weight in kg)^0.75 — 
              multiplied by life-stage and condition-specific Maintenance Energy Requirement (MER) factors. These 
              formulas and factors are based on AAHA Nutritional Assessment Guidelines and WSAVA Global Nutrition 
              Committee recommendations. Food brand calorie data is sourced from manufacturer-published nutritional 
              information and cross-verified where possible.
            </p>
            <h3 className="text-lg font-semibold text-foreground mt-4">Blog Content</h3>
            <p>
              Every blog article cites its sources. We link directly to peer-reviewed studies, veterinary textbooks, 
              and official guidelines from organizations such as the AVMA, AAHA, WSAVA, ASPCA, and FDA. We do not 
              publish AI-generated content without human review and source verification.
            </p>
          </section>

          {/* Important Disclaimer */}
          <section>
            <h2 className="text-2xl font-bold text-foreground">Important Medical Disclaimer</h2>
            <div className="p-5 rounded-xl border bg-muted/50">
              <p className="text-sm">
                PetVitals provides general informational and educational content only. It is 
                <strong> not</strong> a substitute for professional veterinary advice, diagnosis, or treatment. 
                Always consult a qualified veterinarian with questions about your pet's health, diet, or medical 
                conditions. If you believe your pet has ingested something toxic or is experiencing a medical 
                emergency, contact your veterinarian or an emergency animal hospital immediately — do not wait 
                for information from this website.
              </p>
              <p className="text-sm mt-2">
                For poisoning emergencies in the United States, you can also contact the{" "}
                <a href="https://www.aspca.org/pet-care/animal-poison-control" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  ASPCA Animal Poison Control Center
                </a>{" "}
                at <strong>(888) 426-4435</strong> (consultation fee may apply).
              </p>
            </div>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-bold text-foreground">Contact Us</h2>
            <p>
              We welcome feedback, suggestions, corrections, and questions. If you spot an error in our database 
              or have an idea for a new feature, please reach out.
            </p>
            <div className="flex flex-wrap gap-4 not-prose mt-4">
              <a href="mailto:henrygxy@gmail.com" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border bg-card hover:border-primary/30 transition-colors text-sm">
                <Mail className="h-4 w-4" />
                henrygxy@gmail.com
              </a>
              <Link href="/contact" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border bg-card hover:border-primary/30 transition-colors text-sm">
                <ShieldCheck className="h-4 w-4" />
                Contact Form
              </Link>
            </div>
          </section>
        </div>
      </main>
      <footer className="border-t py-6 text-center text-xs text-muted-foreground">
        &copy; {new Date().getFullYear()} PetVitals. All rights reserved.
      </footer>
    </div>
    </>
  );
}