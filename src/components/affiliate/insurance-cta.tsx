import { Shield, ArrowRight } from "lucide-react";
import { INSURANCE_PARTNERS } from "@/lib/affiliate";

export function InsuranceCtaBanner() {
  return (
    <div className="my-6 p-4 rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-950/10">
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center shrink-0">
          <Shield className="h-4.5 w-4.5 text-amber-600 dark:text-amber-400" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold mb-1">Worried about emergency vet bills?</p>
          <p className="text-xs text-muted-foreground mb-2">
            Pet insurance can cover toxin ingestion emergencies. Plans start at $10/month.
          </p>
          <a
            href="https://www.healthypawspetinsurance.com/"
            target="_blank"
            rel="noopener sponsored"
            className="inline-flex items-center gap-1 text-xs font-medium text-amber-700 dark:text-amber-400 hover:underline"
          >
            Compare plans <ArrowRight className="h-3 w-3" />
          </a>
          <span className="text-[9px] text-muted-foreground/60 ml-2">
            We may earn a commission
          </span>
        </div>
      </div>
    </div>
  );
}