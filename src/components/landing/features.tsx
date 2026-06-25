"use client";
import Link from "next/link";

const features = [
  { icon: "\u{1f50d}", title: "Toxicity Checker", desc: "Search 200+ foods, plants, and substances to see what's safe for your pet.", href: "/toxicity" },
  { icon: "\u{1f3ca}", title: "Feeding Calculator", desc: "Science-based RER and MER calculations tailored to your pet's breed, age, and activity.", href: "/sign-in?redirect=/dashboard" },
  { icon: "\u{1f4ca}", title: "Weight Tracking", desc: "Track weight trends with BCS scoring. Export data and share with your vet.", href: "/sign-in?redirect=/dashboard" },
  { icon: "\u{1f6e1}\ufe0f", title: "Vet-Approved Data", desc: "All information sourced from veterinary toxicology references and peer-reviewed studies.", href: "/toxicity" },
];

export function Features() {
  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">
          Everything you need
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f) => (
            <Link key={f.title} href={f.href} className="p-5 rounded-xl border bg-card hover:border-primary/20 transition-colors block">
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="font-semibold mb-1">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
