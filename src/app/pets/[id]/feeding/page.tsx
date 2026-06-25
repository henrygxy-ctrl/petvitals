'use client';

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Printer, RefreshCw, Download, Save, History, Check } from "lucide-react";
import Link from "next/link";
import { calculateFeeding, FOOD_BRANDS, getFoodKcal, type FeedingResult, type FeedingInput } from "@/lib/feeding-calculator";
import { AdUnit } from "@/components/ads/AdUnit";

export default function FeedingCalculatorPage() {
  const params = useParams();
  const router = useRouter();
  const petId = params.id as string;

  const [pet, setPet] = useState<any>(null);
  const [foodBrand, setFoodBrand] = useState("Generic (avg 360 kcal/cup)");
  const [result, setResult] = useState<FeedingResult | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [feedLogs, setFeedLogs] = useState<any[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [input, setInput] = useState<FeedingInput>({
    weightLbs: 0,
    species: "dog",
    isNeutered: true,
    activityLevel: "moderate",
    bcsScore: 5,
  });

  useEffect(() => {
    fetch(`/api/pets/${petId}`).then((r) => r.json()).then((data) => {
      if (!data.pet) return router.push("/dashboard");
      const p = data.pet;
      setPet(p);
      const inp: FeedingInput = {
        weightLbs: p.weightLbs || 0,
        species: p.species,
        isNeutered: p.isNeutered ?? true,
        activityLevel: p.activityLevel || "moderate",
        bcsScore: p.bcsScore || 5,
      };
      setInput(inp);
      if (p.currentFoodBrand) setFoodBrand(p.currentFoodBrand);
    });
  }, [petId]);

  const calculate = () => {
    if (input.weightLbs <= 0) return;
    const kcal = getFoodKcal(foodBrand);
    const r = calculateFeeding(input, kcal);
    setResult(r);
  };

  useEffect(() => {
    if (input.weightLbs > 0) calculate();
  }, [input, foodBrand]);

  const loadLogs = async () => {
    const res = await fetch("/api/pets/" + petId + "/feeding");
    const data = await res.json();
    setFeedLogs(data.logs || []);
  };

  const savePlan = async () => {
    if (!result) return;
    setSaving(true);
    await fetch("/api/pets/" + petId + "/feeding", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        mealType: "daily-plan",
        foodBrand: foodBrand,
        amountCups: result.cupsPerDay,
        calories: result.mer,
        notes: "Weight: " + input.weightLbs + " lbs, BCS: " + input.bcsScore + "/9, Activity: " + input.activityLevel,
      }),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    loadLogs();
  };

  const exportFeedingCSV = () => {
    if (!result) return;
    const csv = [
      "Metric,Value",
      "Pet Name," + pet.name,
      "Species," + pet.species,
      "Weight (lbs)," + input.weightLbs,
      "BCS Score," + input.bcsScore + "/9",
      "Activity Level," + input.activityLevel,
      "Food Brand," + foodBrand,
      "Food kcal/cup," + result.foodKcalPerCup,
      "RER (kcal)," + result.rer,
      "MER (kcal/day)," + result.mer,
      "MER Range (kcal)," + result.merRange.min + " - " + result.merRange.max,
      "Cups per Day," + result.cupsPerDay,
      "Cups per Meal," + result.perMealCups,
      "Target Weight (lbs)," + (result.targetWeightLbs || "Maintain"),
      "BCS Assessment," + result.bcsAssessment,
      "Generated," + new Date().toISOString(),
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = pet.name.replace(/\s+/g, "_") + "_feeding_plan.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!pet) return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Loading...</div>;

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b sticky top-0 bg-background/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center gap-2">
          <Link href={`/pets/${petId}`} className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" /> {pet.name}
          </Link>
          <div className="font-bold tracking-tight ml-2">Feeding Calculator</div>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto px-4 py-6 w-full">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Input */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Pet Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Weight (lbs)</Label>
                <div className="flex gap-2 items-center">
                  <Input type="number" step="0.1" value={input.weightLbs || ""}
                    onChange={(e) => setInput({ ...input, weightLbs: parseFloat(e.target.value) || 0 })}
                    placeholder="72" />
                  <Button variant="outline" size="icon" onClick={() => { if (pet?.weightLbs) setInput({ ...input, weightLbs: pet.weightLbs }); }}>
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Body Condition Score: {input.bcsScore}/9</Label>
                <Slider value={[input.bcsScore]} onValueChange={(vals) => { if (Array.isArray(vals) && vals.length > 0) setInput({ ...input, bcsScore: vals[0] }); }} min={1} max={9} step={1} />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>1 (Very thin)</span>
                  <span>5 (Ideal)</span>
                  <span>9 (Obese)</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Activity Level</Label>
                <Select value={input.activityLevel} onValueChange={(v) => { if (v) setInput({ ...input, activityLevel: v as any }); }}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low (couch potato)</SelectItem>
                    <SelectItem value="moderate">Moderate (30 min walk/day)</SelectItem>
                    <SelectItem value="active">Active (1 hr exercise/day)</SelectItem>
                    <SelectItem value="very-active">Very Active (2+ hrs/day)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Food Brand</Label>
                <Select value={foodBrand} onValueChange={(v) => { if (v) setFoodBrand(v); }}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {FOOD_BRANDS.map((b) => (
                      <SelectItem key={b} value={b}>{b}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">{getFoodKcal(foodBrand)} kcal per cup</p>
              </div>

              <Button onClick={calculate} className="w-full" disabled={!input.weightLbs}>
                Calculate
              </Button>
            </CardContent>
          </Card>

          {/* Results */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Daily Recommendation</CardTitle>
            </CardHeader>
            <CardContent>
              {result ? (
                <div className="space-y-5">
                  <div className="text-center py-4">
                    <p className="text-3xl font-bold">{result.mer}</p>
                    <p className="text-sm text-muted-foreground">kcal per day</p>
                    <div className="text-xs text-muted-foreground mt-1">
                      Range: {result.merRange.min} - {result.merRange.max} kcal
                    </div>
                  </div>

                  <div className="border-t pt-4 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Per day (cups)</span>
                      <span className="font-semibold">{result.cupsPerDay} cups</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Per meal ({result.mealsPerDay}x/day)</span>
                      <span className="font-semibold">{result.perMealCups} cups</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Calories per cup</span>
                      <span className="font-semibold">{result.foodKcalPerCup} kcal</span>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <p className="text-sm font-medium mb-1">Body Condition</p>
                    <p className="text-sm text-muted-foreground">{result.bcsAssessment}</p>
                    {result.targetWeightLbs && (
                      <div className="mt-2 flex justify-between text-sm">
                        <span className="text-muted-foreground">Target weight</span>
                        <span className="font-semibold">{result.targetWeightLbs} lbs</span>
                      </div>
                    )}
                  </div>

                  {result.weightChange === "lose" && (
                    <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800">
                      <p className="text-xs text-amber-700 dark:text-amber-300">This plan is designed for gradual weight loss. Monitor every 2 weeks.</p>
                    </div>
                  )}
                  {result.weightChange === "gain" && (
                    <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800">
                      <p className="text-xs text-blue-700 dark:text-blue-300">This plan provides extra calories for healthy weight gain.</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <p>Enter your pet's details and click Calculate</p>
                </div>
              )}
            </CardContent>
          </Card>
  
        <AdUnit />
      </div>

      {result && (
        <div className="flex gap-2 justify-center flex-wrap mt-4">
          <Button onClick={savePlan} disabled={saving || saved} variant="outline" size="sm">
            {saved ? <Check className="h-4 w-4 mr-1" /> : <Save className="h-4 w-4 mr-1" />}
            {saved ? "Saved!" : "Save Plan"}
          </Button>
          <Button onClick={exportFeedingCSV} variant="outline" size="sm">
            <Download className="h-4 w-4 mr-1" /> Export CSV
          </Button>
          <Button onClick={() => { loadLogs(); setShowHistory(!showHistory); }} variant="outline" size="sm">
            <History className="h-4 w-4 mr-1" /> {showHistory ? "Hide" : "Show"} History
          </Button>
        </div>
      )}

      {showHistory && feedLogs.length > 0 && (
        <Card className="mt-4">
          <CardHeader><CardTitle className="text-base">Feeding Plan History</CardTitle></CardHeader>
          <CardContent>
            <div className="text-xs space-y-2">
              {feedLogs.map((log: any) => (
                <div key={log.id} className="flex justify-between py-1.5 border-b last:border-0">
                  <span>{new Date(log.date).toLocaleDateString()}</span>
                  <span>{log.foodBrand || "N/A"}</span>
                  <span className="font-medium">{log.amountCups} cups/day</span>
                  <span>{log.calories} kcal</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
      </main>
    </div>
  );
}