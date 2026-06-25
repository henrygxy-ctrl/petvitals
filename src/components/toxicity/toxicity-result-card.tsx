"use client";

import { AlertTriangle, CheckCircle, Info, ShieldAlert, ChevronDown, ChevronUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import type { ToxicityItem, ToxicityLevel } from "@/data/toxicity";
import { useTranslation } from "@/i18n/context";

interface Props {
  item: ToxicityItem;
}

const riskConfig: Record<ToxicityLevel, { color: string; bg: string; icon: React.ReactNode; }> = {
  safe: {
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800",
    icon: <CheckCircle className="h-6 w-6" />,
  },
  caution: {
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800",
    icon: <Info className="h-6 w-6" />,
  },
  toxic: {
    color: "text-orange-600 dark:text-orange-400",
    bg: "bg-orange-50 dark:bg-orange-950/30 border-orange-200 dark:border-orange-800",
    icon: <AlertTriangle className="h-6 w-6" />,
  },
  danger: {
    color: "text-red-600 dark:text-red-400",
    bg: "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800",
    icon: <ShieldAlert className="h-6 w-6" />,
  },
};

export function ToxicityResultCard({ item }: Props) {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);
  const config = riskConfig[item.riskLevel];

  return (
    <Card className={`border-2 ${config.bg} overflow-hidden transition-all`}>
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-start gap-3 p-4 text-left"
      >
        <div className={`mt-0.5 ${config.color}`}>{config.icon}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-semibold text-base">{item.name}</h3>
            <Badge
              variant={item.riskLevel === "danger" || item.riskLevel === "toxic" ? "destructive" : "secondary"}
              className="text-xs"
            >
              {t("risk." + item.riskLevel)}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
            {item.description}
          </p>
          {item.safeAmount && (
            <p className="text-xs text-muted-foreground mt-1">
              {"\u2705"} {t("result.safeAmount")}: {item.safeAmount}
            </p>
          )}
        </div>
        <div className="text-muted-foreground mt-1">
          {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </div>
      </button>

      {expanded && (
        <div className="px-4 pb-4 pt-0 border-t border-border/50 mt-0">
          <div className="pt-3 space-y-2 text-sm">
            {item.symptoms && (
              <div>
                <span className="font-medium text-foreground">{t("result.symptoms")}: </span>
                <span className="text-muted-foreground">{item.symptoms}</span>
              </div>
            )}
            {item.action && (
              <div>
                <span className="font-medium text-foreground">{t("result.action")}: </span>
                <span className="text-muted-foreground">{item.action}</span>
              </div>
            )}
            {item.benefits && (
              <div>
                <span className="font-medium text-foreground">{t("result.benefits")}: </span>
                <span className="text-muted-foreground">{item.benefits}</span>
              </div>
            )}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {item.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-[10px] px-1.5 py-0">
                  {tag}
                </Badge>
              ))}
            </div>
            {item.sources && item.sources.length > 0 && (
              <div className="pt-2 mt-2 border-t border-border/50">
                <span className="text-xs font-medium text-muted-foreground">Sources: </span>
                {item.sources.map((url, i) => (
                  <a key={i} href={url} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline ml-1">
                    [{i + 1}]
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </Card>
  );
}
