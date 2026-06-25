"use client";

interface BcsGuideProps {
  score: number;
}

const bcsLevels = [
  { score: 1, label: "Emaciated", desc: "Ribs, spine, pelvis visible from distance. Severe muscle loss.", color: "bg-red-100 dark:bg-red-950" },
  { score: 2, label: "Very Thin", desc: "Ribs easily visible. Spine visible. Minimal fat.", color: "bg-red-50 dark:bg-red-950/50" },
  { score: 3, label: "Thin", desc: "Ribs palpable with thin fat cover. Obvious waist.", color: "bg-orange-50 dark:bg-orange-950/50" },
  { score: 4, label: "Lean", desc: "Ribs palpable, slight fat. Waist visible.", color: "bg-yellow-50 dark:bg-yellow-950/50" },
  { score: 5, label: "Ideal", desc: "Ribs easily felt. Waist clear, abdomen tucked.", color: "bg-emerald-50 dark:bg-emerald-950/50" },
  { score: 6, label: "Slightly Over", desc: "Ribs palpable with moderate fat. Waist less defined.", color: "bg-yellow-50 dark:bg-yellow-950/50" },
  { score: 7, label: "Overweight", desc: "Ribs hard to feel. No visible waist. Abdominal bulge.", color: "bg-orange-50 dark:bg-orange-950/50" },
  { score: 8, label: "Obese", desc: "Ribs not palpable. Heavy fat deposits.", color: "bg-red-50 dark:bg-red-950/50" },
  { score: 9, label: "Severely Obese", desc: "Massive fat deposits. Reduced mobility.", color: "bg-red-100 dark:bg-red-950" },
];

export function BcsVisualGuide({ score }: BcsGuideProps) {
  return (
    <div className="mt-4">
      <p className="text-xs font-medium text-muted-foreground mb-2">
        Body Condition Score Visual Guide
      </p>
      <div className="grid grid-cols-9 gap-1">
        {bcsLevels.map((level) => (
          <div key={level.score} className="text-center">
            <div
              className={`h-2 rounded-full mb-1 transition-colors ${
                level.score === score
                  ? "bg-emerald-600 dark:bg-emerald-400 ring-2 ring-emerald-600/30"
                  : level.color + " border"
              }`}
            />
            <span
              className={`text-[10px] block ${
                level.score === score
                  ? "font-bold text-emerald-600 dark:text-emerald-400"
                  : "text-muted-foreground"
              }`}
            >
              {level.score}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-2 grid grid-cols-3 gap-2 text-[10px] text-muted-foreground">
        <span className="text-red-500">1-3: Underweight</span>
        <span className="text-emerald-600 text-center">4-5: Ideal</span>
        <span className="text-orange-500 text-right">6-9: Overweight</span>
      </div>
    </div>
  );
}
