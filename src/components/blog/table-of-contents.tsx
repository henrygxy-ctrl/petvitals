"use client";

import { useState, useEffect, useId } from "react";
import { ChevronDown, List } from "lucide-react";
import { trackAnalyticsEvent } from "@/lib/analytics";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [expanded, setExpanded] = useState(false);
  const listId = useId();

  useEffect(() => {
    const seenIds = new Set<string>();
    const elements = Array.from(
      document.querySelectorAll("article .prose-custom h2[id], article .prose-custom h3[id]")
    ).filter((el) => {
      if (!el.id || !el.textContent?.trim() || seenIds.has(el.id)) return false;
      seenIds.add(el.id);
      return true;
    });
    const items: TocItem[] = elements.map((el) => ({
      id: el.id,
      text: el.textContent?.trim() || "",
      level: el.tagName === "H2" ? 2 : 3,
    }));
    setHeadings(items);

    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -80% 0px" }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  if (headings.length === 0) return null;

  return (
    <nav className="mb-8 p-4 rounded-lg border bg-muted/30" aria-label="Article contents">
      <button type="button" className="flex min-h-11 w-full items-center gap-2 text-left" aria-expanded={expanded} aria-controls={listId} onClick={() => {
        setExpanded(!expanded);
        trackAnalyticsEvent("article_contents_toggle", { expanded: !expanded });
      }}>
        <List className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-semibold">Contents</span>
        <ChevronDown className={`ml-auto h-4 w-4 text-muted-foreground transition-transform ${expanded ? "rotate-180" : ""}`} />
      </button>
      <ul id={listId} hidden={!expanded} className="mt-3 space-y-1">
        {headings.map((h) => (
          <li
            key={h.id}
            style={{ paddingLeft: h.level === 3 ? "1rem" : "0" }}
          >
            <a
              href={`#${h.id}`}
              onClick={() => trackAnalyticsEvent("article_contents_click", { heading_id: h.id })}
              className={`block text-sm py-0.5 transition-colors hover:text-foreground ${
                activeId === h.id
                  ? "text-emerald-600 dark:text-emerald-400 font-medium"
                  : "text-muted-foreground"
              }`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
