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
          Free pet safety tools and educational guides based on published sources. Not a veterinary clinic or a replacement for individual medical advice.
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
              Our guides link to their references, and our calculators explain the formulas and assumptions used. Estimates and general risk categories cannot diagnose an individual pet.
            </p>
            <p>
              Our core belief: reliable pet health information should be accessible to everyone, regardless of budget. 
              Pet ownership already comes with enough costs — access to basic safety information shouldn't be one of them.
            </p>
          </section>

          {/* Who We Are */}
          <section id="editorial-team">
            <h2 className="text-2xl font-bold text-foreground">Who We Are</h2>
            <p>
              PetVitals is an independent website. The byline "PetVitals Editorial Team" identifies the publishing project, not a named veterinarian or a clinical qualification. Editorial questions can be sent to <a href="mailto:henrygxy@gmail.com" className="text-primary hover:underline">henrygxy@gmail.com</a>.
            </p>
            <p>
              Our work may be supported by advertising and affiliate commissions. A tracked purchase may earn a commission; an ordinary link to a provider does not necessarily do so. These relationships are not evidence of product safety or medical approval.
            </p>
            <p>No named veterinary reviewer is currently credited on these guides. We will only display a clinical review after the reviewer has actually checked the specific page and approved attribution.</p>
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
                      Search hundreds of foods, plants, medications, and household items for dog and cat safety
                      guidance. Entries summarize risk categories, symptoms, and next steps with public references
                      where available. General source links do not guarantee a safe exposure for an individual pet.
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
                      Estimate daily calorie needs using RER and MER formulas. Enter your pet's weight, age,
                      activity level, and body condition score for a starting estimate. Check the current food
                      package for calorie values and ask your veterinarian to adjust the plan when needed.
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
                      Guides link to public references where available. Manufacturer-label comparisons are not
                      hands-on tests or veterinary endorsements. Commercial links and important limitations are
                      disclosed separately from educational guidance.
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
              Toxicity entries link to public poison-control and veterinary references where available. General source links do not establish a precise toxic dose or guarantee a safe exposure. Keep the exact product label and ask a veterinarian or poison-control service about an actual ingestion.
            </p>
            <h3 className="text-lg font-semibold text-foreground mt-4">Feeding Calculator Formulas</h3>
            <p>
              Resting Energy Requirement is estimated as RER = 70 * (body weight in kg)^0.75, then multiplied
              by life-stage and condition-specific Maintenance Energy Requirement factors. See the <a href="https://www.aaha.org/resources/2021-aaha-nutrition-and-weight-management-guidelines/feeding-plans-for-healthy-appropriate-weight-cats-and-dogs/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">AAHA feeding-plan guidelines</a>.
              This is a starting estimate, not an exact feeding prescription. Verify food calories on the current
              manufacturer label; your veterinarian may recommend a different target.
            </p>
            <h3 className="text-lg font-semibold text-foreground mt-4">Blog Content</h3>
            <p>
              Articles identify their public sources. AI tools may assist with drafting and maintenance; a source-based summary is not equivalent to a veterinary review. Product-label comparisons are desk research unless a page explicitly documents genuine hands-on testing.
            </p>
          </section>

          {/* Editorial Standards */}
          <section id="editorial-policy">
            <h2 className="text-2xl font-bold text-foreground">Editorial Standards and Corrections</h2>
            <p>
              PetVitals separates educational guidance from advertising and affiliate links. Articles and tool pages
              are written to answer practical pet-owner questions first, then connect readers to calculators,
              toxicity records, source references, or insurance explainers when those next steps are relevant.
            </p>
            <p>
              We update pages when source links change, when a clearer veterinary reference is available, or when
              Search Console data shows that owners are asking a question our page does not answer directly enough.
              If a reader, veterinarian, researcher, or pet owner flags a possible error, we review the claim against
              the cited sources and correct the page when needed.
            </p>
            <p>
              Suggested corrections can be sent through the <Link href="/contact" className="text-primary hover:underline">contact page</Link>.
              For urgent poison or medical situations, contact a veterinarian or pet poison hotline instead of waiting
              for an editorial response.
            </p>
          </section>

          <section id="professional-review">
            <h2 className="text-2xl font-bold text-foreground">Veterinary Review and Resource Partnerships</h2>
            <p>We welcome qualified veterinarians who can review a specific guide for accuracy, missing cautions, and appropriate escalation advice. Please send your public professional profile, the page URL, and any proposed corrections to our editorial email. Reviewer credit requires a completed review and permission to publish the attribution.</p>
            <p>Shelters, rescue groups, and pet-care educators can evaluate our free <Link href="/pet-safe-cleaning" className="text-primary hover:underline">cleaning guides and checklists</Link>, <Link href="/puppy-care" className="text-primary hover:underline">puppy-care hub</Link>, and <Link href="/toxicity" className="text-primary hover:underline">toxicity checker</Link> for their resource lists. Linking to a guide does not imply clinical endorsement. We do not require paid links or reciprocal links.</p>
            <p>For product suggestions, include the exact formula, country, manufacturer instructions, and restrictions. We distinguish public label claims from testing results and disclose any commercial relationship.</p>
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
