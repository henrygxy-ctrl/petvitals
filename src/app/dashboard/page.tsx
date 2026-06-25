"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, PawPrint, UtensilsCrossed, LineChart, Search, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { useTranslation } from "@/i18n/context";
import Link from "next/link";

interface Pet {
  id: string;
  name: string;
  species: string;
  breed: string | null;
  weightLbs: number | null;
  birthDate: string | null;
}

export default function DashboardPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    fetch("/api/pets")
      .then((r) => r.json())
      .then((data) => {
        setPets(data.pets || []);
        setLoading(false);
      })
      .catch(() => {
        router.push("/sign-in");
      });

    fetch("/api/auth/session")
      .then((r) => r.json())
      .then((s) => setUserName(s?.user?.name || s?.user?.email || ""))
      .catch(() => {});
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse text-muted-foreground">{t("common.loading")}</div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b sticky top-0 bg-background/80 backdrop-blur-sm z-50">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/dashboard" className="font-bold tracking-tight text-lg">PetVitals</Link>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">{userName}</span>
            <Button variant="ghost" size="sm" onClick={() => signOut({ callbackUrl: "/" })}>
              <LogOut className="h-4 w-4 mr-1" /> {t("nav.signOut")}
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto px-4 py-8 w-full">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">{t("dashboard.title")}</h1>
          <Link href="/pets/new">
            <Button>
              <Plus className="h-4 w-4 mr-1" /> {t("dashboard.addPet")}
            </Button>
          </Link>
        </div>

        {pets.length === 0 ? (
          <div className="text-center py-16 border-2 border-dashed rounded-xl">
            <PawPrint className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
            <h2 className="text-lg font-semibold mb-1">{t("dashboard.noPets")}</h2>
            <p className="text-sm text-muted-foreground mb-4">{t("dashboard.noPetsDesc")}</p>
            <Link href="/pets/new">
              <Button><Plus className="h-4 w-4 mr-1" /> {t("dashboard.addFirstPet")}</Button>
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {pets.map((pet) => (
              <Card key={pet.id} className="hover:border-primary/30 transition-colors">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-lg">
                      {pet.species === "dog" ? "\u{1f415}" : "\u{1f431}"}
                    </div>
                    <div>
                      <h3 className="font-semibold">{pet.name}</h3>
                      <p className="text-xs text-muted-foreground">{pet.breed || pet.species}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <Link href={`/pets/${pet.id}/feeding`} className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors block">
                      <UtensilsCrossed className="h-4 w-4 mx-auto mb-1" />
                      {t("dashboard.feed")}
                    </Link>
                    <Link href={`/pets/${pet.id}`} className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors block">
                      <LineChart className="h-4 w-4 mx-auto mb-1" />
                      {t("dashboard.weight")}
                    </Link>
                    <Link href="/toxicity" className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors block">
                      <Search className="h-4 w-4 mx-auto mb-1" />
                      {t("dashboard.check")}
                    </Link>
                  </div>
                  {pet.weightLbs && (
                    <p className="text-xs text-muted-foreground mt-3">{pet.weightLbs} lbs</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
