"use client";

import { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { searchToxicity, searchSuggestions, type ToxicityItem, toxicityCategories } from "@/data/toxicity";
import { ToxicityResultCard } from "@/components/toxicity/toxicity-result-card";
import { useTranslation } from "@/i18n/context";

interface ToxicitySearchProps {
  variant?: "hero" | "full";
}

const riskColors: Record<string, string> = {
  danger: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  toxic: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  caution: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  safe: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
};

export function ToxicitySearch({ variant = "hero" }: ToxicitySearchProps) {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ToxicityItem[]>([]);
  const [suggestions, setSuggestions] = useState<ToxicityItem[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(-1);
  const [petFilter, setPetFilter] = useState<"all" | "dog" | "cat">("all");
  const [hasSearched, setHasSearched] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  const handleSearch = (q: string) => {
    setQuery(q);
    setShowSuggestions(false);
    if (q.trim().length >= 2) {
      const r = searchToxicity(q, petFilter);
      setResults(r);
      setHasSearched(true);
    } else {
      setResults([]);
      setHasSearched(false);
    }
  };

  const handleInput = (q: string) => {
    setQuery(q);
    setSelectedIdx(-1);
    if (q.trim().length >= 1) {
      const s = searchSuggestions(q, petFilter);
      setSuggestions(s);
      setShowSuggestions(s.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
    if (q.trim().length >= 2) {
      const r = searchToxicity(q, petFilter);
      setResults(r);
      setHasSearched(true);
    } else {
      setResults([]);
      setHasSearched(false);
    }
  };

  const selectSuggestion = (item: ToxicityItem) => {
    handleSearch(item.name);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIdx(i => Math.min(i + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIdx(i => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && selectedIdx >= 0) {
      e.preventDefault();
      selectSuggestion(suggestions[selectedIdx]);
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(e.target as Node) &&
          inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const popularSearches = ["chocolate", "grapes", "xylitol", "onions", "garlic", "peanut butter"];

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative">
        <div className="flex gap-1.5 mb-3 justify-center">
          {(["all", "dog", "cat"] as const).map((type) => (
            <button
              key={type}
              onClick={() => { setPetFilter(type); if (query.trim()) handleInput(query); }}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                petFilter === type
                  ? "bg-foreground text-background"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {type === "all" ? ("🐾 " + t("toxicity.all")) : type === "dog" ? ("🐕 " + t("toxicity.dogs")) : ("🐱 " + t("toxicity.cats"))}
            </button>
          ))}
        </div>
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            ref={inputRef}
            value={query}
            onChange={(e) => handleInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => { if (suggestions.length > 0) setShowSuggestions(true); }}
            placeholder={t("toxicity.searchPlaceholder")}
            className={`pl-10 pr-10 py-6 text-base rounded-xl border-2 ${
              variant === "hero" ? "border-primary/20 focus-within:border-primary" : ""
            }`}
          />
          {query && (
            <button
              onClick={() => { setQuery(""); setResults([]); setSuggestions([]); setShowSuggestions(false); setHasSearched(false); inputRef.current?.focus(); }}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}

          {showSuggestions && suggestions.length > 0 && (
            <div
              ref={suggestionsRef}
              className="absolute top-full left-0 right-0 mt-1 bg-popover border rounded-lg shadow-lg z-50 overflow-hidden"
            >
              {suggestions.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => selectSuggestion(item)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                    idx === selectedIdx ? "bg-accent" : "hover:bg-accent/50"
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{item.name}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${riskColors[item.riskLevel]}`}>
                        {t("risk." + item.riskLevel)}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate mt-0.5">
                      {item.description.slice(0, 60)}...
                    </p>
                  </div>
                  <span className="text-[10px] text-muted-foreground capitalize shrink-0">
                    {item.category.replace("-", " & ")}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="flex flex-wrap gap-1.5 mt-3 justify-center">
          <span className="text-xs text-muted-foreground mr-1">{t("toxicity.popular")}</span>
          {popularSearches.map((s) => (
            <button
              key={s}
              onClick={() => handleSearch(s)}
              className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground hover:bg-muted/80 transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {hasSearched && (
        <div className="mt-6 space-y-3">
          {results.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p className="text-lg">{t("toxicity.noResults")} &ldquo;{query}&rdquo;</p>
              <p className="text-sm mt-1">{t("toxicity.tryDifferent")}</p>
            </div>
          ) : (
            <>
              <p className="text-xs text-muted-foreground">{results.length} {results.length > 1 ? t("toxicity.results") : t("toxicity.result")}</p>
              {results.map((item) => (
                <ToxicityResultCard key={item.id} item={item} />
              ))}
            </>
          )}
        </div>
      )}

      {!hasSearched && variant === "full" && (
        <div className="mt-8">
          <h3 className="text-sm font-medium text-muted-foreground mb-3">{t("toxicity.browseBy")}</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {toxicityCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleSearch(cat.label.toLowerCase())}
                className="flex items-center gap-2 p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors text-left"
              >
                <span className="text-lg">{cat.emoji}</span>
                <span className="text-sm font-medium">{cat.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
