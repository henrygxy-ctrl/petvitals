'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AddPetPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    species: "dog",
    breed: "",
    birthDate: "",
    weightLbs: "",
    isNeutered: "true",
    activityLevel: "moderate",
    bcsScore: "5",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/pets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        router.push("/dashboard");
        router.refresh();
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Something went wrong. Please try again.");
        setLoading(false);
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-2">
          <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" /> Back
          </Link>
          <div className="font-bold tracking-tight ml-2">PetVitals</div>
        </div>
      </header>
      <main className="flex-1 max-w-2xl mx-auto px-4 py-8 w-full">
        <Card>
          <CardHeader>
            <CardTitle>Add a Pet</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="text-sm text-red-500 bg-red-50 dark:bg-red-950/20 p-2.5 rounded-md">{error}</div>
              )}

              <div className="space-y-2">
                <Label>Species</Label>
                <RadioGroup value={form.species} onValueChange={(v) => { if (v) setForm({ ...form, species: v }); }} className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="dog" id="dog" />
                    <Label htmlFor="dog">{String.fromCodePoint(0x1F415)} Dog</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="cat" id="cat" />
                    <Label htmlFor="cat">{String.fromCodePoint(0x1F431)} Cat</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Pet's Name</Label>
                <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required placeholder="Cooper" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="breed">Breed (optional)</Label>
                  <Input id="breed" value={form.breed} onChange={(e) => setForm({ ...form, breed: e.target.value })} placeholder="Golden Retriever" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="birthDate">Birth Date (optional)</Label>
                  <Input id="birthDate" type="date" value={form.birthDate} onChange={(e) => setForm({ ...form, birthDate: e.target.value })} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="weightLbs">Weight (lbs)</Label>
                  <Input id="weightLbs" type="number" step="0.1" value={form.weightLbs} onChange={(e) => setForm({ ...form, weightLbs: e.target.value })} placeholder="72" />
                </div>
                <div className="space-y-2">
                  <Label>Neutered/Spayed?</Label>
                  <RadioGroup value={form.isNeutered} onValueChange={(v) => { if (v) setForm({ ...form, isNeutered: v }); }} className="flex gap-4 pt-1">
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="true" id="neutered-yes" />
                      <Label htmlFor="neutered-yes" className="text-sm">Yes</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="false" id="neutered-no" />
                      <Label htmlFor="neutered-no" className="text-sm">No</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Activity Level</Label>
                  <Select value={form.activityLevel} onValueChange={(v) => { if (v) setForm({ ...form, activityLevel: v }); }}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low (couch potato)</SelectItem>
                      <SelectItem value="moderate">Moderate</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="very-active">Very Active</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Body Condition (BCS 1-9)</Label>
                  <Select value={form.bcsScore} onValueChange={(v) => { if (v) setForm({ ...form, bcsScore: v }); }}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {[1,2,3,4,5,6,7,8,9].map((n) => (
                        <SelectItem key={n} value={String(n)}>
                          {n} - {n < 5 ? "Underweight" : n === 5 ? "Ideal" : "Overweight"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Saving..." : "Add Pet"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
