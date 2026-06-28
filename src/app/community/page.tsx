"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Share2, TrendingUp, TrendingDown, Minus } from "lucide-react";
import Link from 'next/link'

interface CommunityPet {
  id: string;
  name: string;
  species: string;
  breed: string | null;
  currentWeight: number | null;
  bcsScore: number | null;
  activityLevel: string | null;
  logsCount: number;
  weightTrend: { weight: number; date: string }[];
}

function MiniWeightChart({ trend }: { trend: { weight: number; date: string }[] }) {
  if (trend.length < 2) return null;
  const weights = trend.map((t) => t.weight);
  const minW = Math.min(...weights) - 1;
  const maxW = Math.max(...weights) + 1;
  const range = maxW - minW || 1;
  const h = 30;
  const w = 80;
  const points = weights.map((wt, i) => {
    const x = weights.length > 1 ? (i / (weights.length - 1)) * w : w / 2;
    const y = h - ((wt - minW) / range) * h;
    return x + "," + y;
  });

  const firstW = weights[0];
  const lastW = weights[weights.length - 1];
  const delta = lastW - firstW;

  return (
    <div className="flex items-center gap-2">
      <svg viewBox={"0 0 " + w + " " + h} className="h-8 w-20" preserveAspectRatio="none">
        <polyline points={points.join(" ")} fill="none" stroke={delta > 0.5 ? "hsl(var(--destructive))" : delta < -0.5 ? "hsl(var(--chart-2))" : "hsl(var(--muted-foreground))"} strokeWidth="1.5" />
      </svg>
      <span className="text-[10px] flex items-center gap-0.5">
        {delta > 0.5 ? <TrendingUp className="h-3 w-3 text-destructive" /> : delta < -0.5 ? <TrendingDown className="h-3 w-3 text-emerald-500" /> : <Minus className="h-3 w-3 text-muted-foreground" />}
        {Math.abs(delta).toFixed(1)} lbs
      </span>
    </div>
  );
}

export default function CommunityPage() {
  useEffect(() => {
    document.title = "Pet Community — See Real Pet Weight Data | PetVitals";
    const meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      const m = document.createElement('meta');
      m.name = 'description';
      m.content = 'Browse real pet weight data shared by the PetVitals community. See weight trends, BCS scores, and activity levels for dogs and cats.';
      document.head.appendChild(m);
    }
  }, []);
  const [pets, setPets] = useState<CommunityPet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/community")
      .then((r) => r.json())
      .then((data) => {
        setPets(data.community || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center gap-2">
          <Link href="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
          <div className="ml-2 font-bold tracking-tight">PetVitals</div>
        </div>
      </header>

      <main className="flex-1 py-8 sm:py-12">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Pet Community
            </h1>
            <p className="mt-3 text-muted-foreground text-base sm:text-lg max-w-xl mx-auto">
              Real pets, real data. See how other pet parents track their furry friends.
              <br />
              <Link href="/dashboard" className="text-primary hover:underline text-sm">
                Sign in to share your pet&apos;s journey
              </Link>
            </p>
          </div>

          {loading ? (
            <div className="text-center py-16 text-muted-foreground animate-pulse">Loading community pets...</div>
          ) : pets.length === 0 ? (
            <div className="text-center py-16 border-2 border-dashed rounded-xl">
              <Share2 className="h-10 w-10 mx-auto text-muted-foreground/40 mb-3" />
              <h2 className="text-lg font-semibold mb-1">No pets shared yet</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Be the first to share your pet&apos;s data with the community!
              </p>
              <Link href="/dashboard" className="text-primary hover:underline font-medium text-sm">
                Sign in and make your pet public
              </Link>
            </div>
          ) : (
            <>
              <p className="text-xs text-muted-foreground mb-4 text-center">
                {pets.length} pet{pets.length > 1 ? "s" : ""} shared with the community
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {pets.map((pet) => (
                  <Card key={pet.id} className="hover:border-primary/20 transition-colors">
                    <CardContent className="p-5">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-lg">
                          {pet.species === "dog" ? "\u{1F415}" : pet.species === "cat" ? "\u{1F431}" : "\u{1F439}"}
                        </div>
                        <div>
                          <h3 className="font-semibold text-sm">{pet.name}</h3>
                          <p className="text-xs text-muted-foreground">{pet.breed || pet.species}</p>
                        </div>
                      </div>
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Weight</span>
                          <span className="font-medium">{pet.currentWeight} lbs</span>
                        </div>
                        {pet.bcsScore && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">BCS</span>
                            <span className="font-medium">{pet.bcsScore}/9</span>
                          </div>
                        )}
                        {pet.activityLevel && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Activity</span>
                            <Badge variant="outline" className="text-[10px]">{pet.activityLevel}</Badge>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Records</span>
                          <span className="font-medium">{pet.logsCount}</span>
                        </div>
                      </div>
                      {pet.weightTrend.length >= 2 && (
                        <div className="mt-3 pt-3 border-t flex justify-center">
                          <MiniWeightChart trend={pet.weightTrend} />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
          <div className="mt-12 p-4 rounded-lg bg-muted/50 text-xs text-muted-foreground leading-relaxed text-center">
            <strong>Privacy note:</strong> Only your pet&apos;s name, species, breed, weight, and activity data are shared.
            Your email and personal information are never shown. You can make your pet private again at any time from your dashboard.
          </div>
        </div>
      </main>
    </div>
  );
}
