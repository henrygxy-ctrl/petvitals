"use client";

import { useMemo, useState } from "react";
import { CalendarDays, CheckCircle2 } from "lucide-react";
import { trackAnalyticsEvent } from "@/lib/analytics";

interface ScheduleRow {
  label: string;
  week: number;
  core: string;
  optional: string;
}

const BASE_ROWS: ScheduleRow[] = [
  {
    label: "6-8 weeks",
    week: 8,
    core: "DHPP #1 and parasite discussion",
    optional: "Bordetella if shelter, grooming, boarding, or daycare exposure is likely",
  },
  {
    label: "10-12 weeks",
    week: 12,
    core: "DHPP #2 and leptospirosis discussion around 12 weeks",
    optional: "Lyme or canine influenza if your vet recommends them",
  },
  {
    label: "14-16 weeks",
    week: 16,
    core: "Final puppy DHPP booster, rabies per local law, and leptospirosis booster if started",
    optional: "Second doses for selected lifestyle vaccines",
  },
  {
    label: "12-16 months",
    week: 64,
    core: "First adult booster visit",
    optional: "Risk-based boosters and year-round preventives",
  },
];

function addWeeks(date: Date, weeks: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + weeks * 7);
  return next;
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function PuppyVaccinationPlanner() {
  const [birthDate, setBirthDate] = useState("");
  const [boarding, setBoarding] = useState(false);
  const [ticks, setTicks] = useState(false);
  const [water, setWater] = useState(false);
  const [hasTracked, setHasTracked] = useState(false);

  const optionalNotes = useMemo(() => {
    const notes: string[] = [];
    if (boarding) notes.push("Ask about bordetella and canine influenza for group-dog exposure.");
    if (ticks) notes.push("Ask whether Lyme vaccination is common in your region.");
    if (water) notes.push("Ask how your clinic times leptospirosis protection for wildlife, puddles, lakes, or streams.");
    return notes;
  }, [boarding, ticks, water]);

  const birth = birthDate ? new Date(`${birthDate}T00:00:00`) : null;

  function track(field: string, value: string | boolean) {
    if (!hasTracked) {
      setHasTracked(true);
      trackAnalyticsEvent("puppy_vaccine_planner_start");
    }

    trackAnalyticsEvent("puppy_vaccine_planner_change", {
      changed_field: field,
      changed_value: String(value),
    });
  }

  function updateBirthDate(value: string) {
    setBirthDate(value);
    track("birth_date", Boolean(value));
  }

  function updateRisk(field: "boarding" | "ticks" | "water", value: boolean) {
    if (field === "boarding") setBoarding(value);
    if (field === "ticks") setTicks(value);
    if (field === "water") setWater(value);
    track(field, value);
  }

  return (
    <section className="not-prose my-8 overflow-hidden rounded-xl border bg-card">
      <div className="border-b bg-muted/40 p-5">
        <div className="flex items-center gap-2 text-sm font-semibold text-primary">
          <CalendarDays className="h-4 w-4" />
          <span>Personalized puppy schedule</span>
        </div>
        <h2 className="mt-2 text-xl font-bold text-foreground">
          Puppy Vaccination Schedule Generator
        </h2>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
          Enter a birth date to turn the standard puppy vaccine timeline into calendar dates you can discuss with your veterinarian.
        </p>
      </div>

      <div className="grid gap-5 p-5 lg:grid-cols-[260px_minmax(0,1fr)]">
        <div className="space-y-4">
          <label className="block space-y-2">
            <span className="text-sm font-medium text-foreground">Puppy birth date</span>
            <input
              type="date"
              value={birthDate}
              onChange={(event) => updateBirthDate(event.target.value)}
              className="h-10 w-full rounded-lg border bg-background px-3 text-sm"
            />
          </label>

          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground">Lifestyle risks to discuss</p>
            <RiskCheckbox
              checked={boarding}
              label="Boarding, grooming, daycare"
              onChange={(value) => updateRisk("boarding", value)}
            />
            <RiskCheckbox
              checked={ticks}
              label="Ticks or Lyme-risk region"
              onChange={(value) => updateRisk("ticks", value)}
            />
            <RiskCheckbox
              checked={water}
              label="Wildlife, puddles, lakes, streams"
              onChange={(value) => updateRisk("water", value)}
            />
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border">
          <div className="grid grid-cols-[110px_minmax(0,1fr)] bg-muted/50 text-xs font-semibold uppercase tracking-wide text-muted-foreground sm:grid-cols-[140px_minmax(0,1fr)_minmax(0,1fr)]">
            <div className="px-4 py-3">Timing</div>
            <div className="px-4 py-3">Core discussion</div>
            <div className="hidden px-4 py-3 sm:block">Risk-based discussion</div>
          </div>
          {BASE_ROWS.map((row) => (
            <div
              key={row.label}
              className="grid grid-cols-[110px_minmax(0,1fr)] border-t text-sm sm:grid-cols-[140px_minmax(0,1fr)_minmax(0,1fr)]"
            >
              <div className="px-4 py-3 font-medium text-foreground">
                {birth ? formatDate(addWeeks(birth, row.week)) : row.label}
              </div>
              <div className="px-4 py-3 text-muted-foreground">{row.core}</div>
              <div className="col-span-2 border-t px-4 py-3 text-muted-foreground sm:col-span-1 sm:border-t-0">
                {row.optional}
              </div>
            </div>
          ))}
        </div>
      </div>

      {optionalNotes.length > 0 && (
        <div className="border-t bg-primary/5 p-5">
          <div className="flex items-start gap-2 text-sm">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
            <div>
              <p className="font-medium text-foreground">Bring these questions to your vet</p>
              <ul className="mt-2 space-y-1 text-muted-foreground">
                {optionalNotes.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function RiskCheckbox({
  checked,
  label,
  onChange,
}: {
  checked: boolean;
  label: string;
  onChange: (value: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-2 rounded-lg border bg-background p-3 text-sm">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="h-4 w-4 rounded border-input"
      />
      <span>{label}</span>
    </label>
  );
}
