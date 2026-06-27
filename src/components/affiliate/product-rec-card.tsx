import type { ProductRecommendation } from "@/lib/affiliate";
import { ShoppingBag, Package } from "lucide-react";

interface ProductRecCardProps {
  products: ProductRecommendation[];
  className?: string;
}

const platformIcon = (platform: string) => {
  if (platform === "amazon") return <ShoppingBag className="h-4 w-4" />;
  if (platform === "chewy") return <Package className="h-4 w-4" />;
  return null;
};

const platformLabel = (platform: string) => {
  if (platform === "amazon") return "Amazon";
  if (platform === "chewy") return "Chewy";
  return "";
};

export function ProductRecommendationCard({ products, className = "" }: ProductRecCardProps) {
  if (products.length === 0) return null;

  return (
    <div className={`my-10 p-6 rounded-xl border bg-card ${className}`}>
      <h3 className="text-sm font-semibold mb-1">Recommended for You</h3>
      <p className="text-[10px] text-muted-foreground/50 uppercase tracking-wide mb-4">
        We may earn a commission at no extra cost to you
      </p>
      <div className="grid sm:grid-cols-2 gap-4">
        {products.map((p) => (
          <a
            key={p.name}
            href={p.url}
            target="_blank"
            rel="noopener sponsored"
            className="flex items-start gap-3 p-3 rounded-lg border border-border/60 hover:border-primary/30 hover:bg-muted/50 transition-all group"
          >
            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
              {platformIcon(p.platform)}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="font-medium text-sm group-hover:text-primary transition-colors truncate">
                  {p.name}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mb-1.5">{p.description}</p>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                  {p.priceHint}
                </span>
                <span className="text-[10px] text-muted-foreground">
                  on {platformLabel(p.platform)}
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}