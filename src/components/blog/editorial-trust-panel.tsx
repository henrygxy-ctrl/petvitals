import Link from "next/link";
import { BookOpenCheck, CalendarDays, Stethoscope } from "lucide-react";

interface EditorialTrustPanelProps {
  sourceCount: number;
  editorialDate: string;
  dateLabel: "Published" | "Updated";
}

export function EditorialTrustPanel({ sourceCount, editorialDate, dateLabel }: EditorialTrustPanelProps) {
  return (
    <section className="mb-6 rounded-lg border bg-muted/20 p-4" aria-label="Editorial information">
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="flex gap-2.5">
          <BookOpenCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700 dark:text-emerald-300" />
          <div>
            <p className="text-xs font-semibold text-foreground">Public sources</p>
            <Link href="#article-sources" className="text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground">
              {sourceCount} referenced {sourceCount === 1 ? "source" : "sources"}
            </Link>
          </div>
        </div>
        <div className="flex gap-2.5">
          <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700 dark:text-emerald-300" />
          <div>
            <p className="text-xs font-semibold text-foreground">{dateLabel}</p>
            <time className="text-xs text-muted-foreground" dateTime={editorialDate}>
              {new Date(editorialDate).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
            </time>
          </div>
        </div>
        <div className="flex gap-2.5">
          <Stethoscope className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700 dark:text-emerald-300" />
          <div>
            <p className="text-xs font-semibold text-foreground">Clinical review</p>
            <Link href="/about#professional-review" className="text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground">
              Review status and corrections
            </Link>
          </div>
        </div>
      </div>
      <p className="mt-3 border-t pt-3 text-[11px] leading-relaxed text-muted-foreground">
        Educational guidance, not a diagnosis or substitute for veterinary care. PetVitals separates editorial information from advertising and affiliate relationships.
      </p>
    </section>
  );
}
