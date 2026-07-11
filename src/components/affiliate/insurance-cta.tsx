import { Shield, ArrowRight } from "lucide-react";
import Link from "next/link";
import { INSURANCE_PARTNERS } from "@/lib/affiliate";

export function InsuranceCtaBanner() {
  const affiliatePartner = INSURANCE_PARTNERS.find((partner) => partner.isAffiliate);

  return (
    <div className="my-6 p-4 rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-950/10">
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center shrink-0">
          <Shield className="h-4.5 w-4.5 text-amber-600 dark:text-amber-400" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold mb-1">Plan ahead for emergency vet bills</p>
          <p className="text-xs text-muted-foreground mb-2">
            Poisoning, broken bones, and emergency surgery can get expensive quickly. Compare costs and accident coverage before you need it.
          </p>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <Link
              href="/insurance/emergency-vet-cost"
              className="inline-flex items-center gap-1 text-xs font-medium text-amber-700 dark:text-amber-400 hover:underline"
            >
              Emergency vet costs <ArrowRight className="h-3 w-3" />
            </Link>
            <Link
              href="/insurance/accident-only"
              className="inline-flex items-center gap-1 text-xs font-medium text-amber-700 dark:text-amber-400 hover:underline"
            >
              Accident-only coverage <ArrowRight className="h-3 w-3" />
            </Link>
            <Link
              href="/insurance/pet-insurance-cost"
              className="inline-flex items-center gap-1 text-xs font-medium text-amber-700 dark:text-amber-400 hover:underline"
            >
              Monthly cost guide <ArrowRight className="h-3 w-3" />
            </Link>
            {affiliatePartner && (
              <a
                href={affiliatePartner.url}
                target="_blank"
                rel="noopener sponsored"
                className="inline-flex items-center gap-1 text-xs font-medium text-amber-700 dark:text-amber-400 hover:underline"
              >
                Compare plans <ArrowRight className="h-3 w-3" />
              </a>
            )}
            {affiliatePartner && (
              <span className="text-[9px] text-muted-foreground/60">
                We may earn a commission
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
