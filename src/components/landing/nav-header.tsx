"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronDown, BookMarked } from "lucide-react";

const blogCategories = [
  { name: "Nutrition & Safety", href: "/blog/category/nutrition-and-safety" },
  { name: "Weight & Wellness", href: "/blog/category/weight-and-wellness" },
  { name: "All Articles", href: "/blog" },
];

export function NavHeader() {
  const [blogOpen, setBlogOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="text-lg font-bold tracking-tight hover:opacity-80 transition-opacity">PetVitals</Link>
        </div>
        <div className="flex items-center gap-1">
          <Link href="/toxicity" className="text-sm text-muted-foreground hover:text-foreground transition-colors px-2.5 py-1.5">Toxicity Checker</Link>
          <Link href="/feeding-calculator" className="text-sm text-muted-foreground hover:text-foreground transition-colors px-2.5 py-1.5">Feeding Calc</Link>
          <Link href="/sign-in?redirect=/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors px-2.5 py-1.5">Weight Tracking</Link>

          {/* Blog dropdown */}
          <div className="relative" tabIndex={0} onMouseEnter={() => setBlogOpen(true)} onMouseLeave={() => setBlogOpen(false)} onFocus={() => setBlogOpen(true)} onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setBlogOpen(false) }}>
            <button
              onClick={() => setBlogOpen(!blogOpen)}
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors px-2.5 py-1.5"
            >
              <BookMarked className="h-4 w-4" />
              Blog
              <ChevronDown className={`h-3 w-3 transition-transform ${blogOpen ? "rotate-180" : ""}`} />
            </button>
            {blogOpen && (
              <div className="absolute top-full right-0 mt-1 w-48 py-1.5 rounded-lg border bg-card shadow-lg z-50">
                {blogCategories.map((cat) => (
                  <Link
                    key={cat.href}
                    href={cat.href}
                    className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/sign-in"><Button variant="ghost" size="sm">Sign In</Button></Link>
          <Link href="/sign-up"><Button size="sm" className="rounded-full">Get Started</Button></Link>
        </div>
      </div>
    </header>
  );
}