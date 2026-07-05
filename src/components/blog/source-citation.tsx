import { ExternalLink, BookOpen, Database, FlaskConical, FileText } from "lucide-react";
import type { BlogSource } from "@/lib/blog";

const typeIcons: Record<BlogSource["type"], typeof ExternalLink> = {
  guideline: BookOpen,
  guide: BookOpen,
  research: FlaskConical,
  database: Database,
  article: FileText,
  report: FileText,
  review: BookOpen,
  government: Database,
  academic: FlaskConical,
  regulation: Database,
  certification: BookOpen,
};

const typeLabels: Record<BlogSource["type"], string> = {
  guideline: "Clinical Guideline",
  guide: "Guide",
  research: "Research",
  database: "Database",
  article: "Article",
  report: "Report",
  review: "Review",
  government: "Government Source",
  academic: "Academic Source",
  regulation: "Regulation",
  certification: "Certification",
};

export function SourceCitation({ sources }: { sources: BlogSource[] }) {
  return (
    <section className="mt-12 pt-8 border-t">
      <h2 className="text-lg font-semibold mb-4">Clinical References</h2>
      <p className="text-sm text-muted-foreground mb-4">
        This article is based on the following publicly available sources. Content
        is written in our own words - we do not copy or translate original text.
      </p>
      <ul className="space-y-2">
        {sources.map((source, i) => {
          const Icon = typeIcons[source.type] || ExternalLink;
          return (
            <li key={i}>
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors p-2 rounded-md hover:bg-muted/50 group"
              >
                <Icon className="h-4 w-4 mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                <span>
                  <span className="font-medium text-foreground/80">
                    {source.name}
                  </span>
                  <span className="ml-2 text-xs">({typeLabels[source.type]})</span>
                </span>
                <ExternalLink className="h-3 w-3 mt-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
