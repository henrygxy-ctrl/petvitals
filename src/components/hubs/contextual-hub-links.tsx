import Link from "next/link";
import { ArrowRight } from "lucide-react";

export interface ContextualHubLink {
  title: string;
  href: string;
  description: string;
  label?: string;
}

interface ContextualHubLinksProps {
  title: string;
  description: string;
  links: ContextualHubLink[];
  className?: string;
}

export function ContextualHubLinks({
  title,
  description,
  links,
  className = "",
}: ContextualHubLinksProps) {
  if (links.length === 0) return null;

  return (
    <section className={className}>
      <div className="mb-4">
        <h2 className="text-lg font-bold">{title}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-xl border bg-card p-5 transition-colors hover:border-primary/40"
          >
            {link.label && (
              <span className="text-xs font-semibold uppercase tracking-wide text-primary">
                {link.label}
              </span>
            )}
            <h3 className="mt-1 text-sm font-semibold">{link.title}</h3>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              {link.description}
            </p>
            <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary">
              Open hub
              <ArrowRight className="h-3 w-3" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
