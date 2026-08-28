"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { searchToxicity, searchSuggestions, type ToxicityItem, type ToxicityLevel, toxicityCategories } from "@/data/toxicity";
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

type RiskFilter = "all" | ToxicityLevel;
type SortMode = "relevance" | "risk" | "name";

const riskOptions: { value: RiskFilter; label: string }[] = [
  { value: "all", label: "Any risk" },
  { value: "danger", label: "Emergency" },
  { value: "toxic", label: "Toxic" },
  { value: "caution", label: "Caution" },
  { value: "safe", label: "Usually safe" },
];

const sortOptions: { value: SortMode; label: string }[] = [
  { value: "relevance", label: "Best match" },
  { value: "risk", label: "Highest risk first" },
  { value: "name", label: "A to Z" },
];

const symptomFilters = ["vomiting", "diarrhea", "seizures", "drooling", "kidney failure"];

const riskRank: Record<ToxicityLevel, number> = {
  danger: 4,
  toxic: 3,
  caution: 2,
  safe: 1,
};

function matchesSymptomFilter(item: ToxicityItem, symptomQuery: string) {
  if (!symptomQuery) return true;

  const searchable = [
    item.name,
    item.description,
    item.symptoms,
    item.action,
    item.category,
    ...item.aliases,
    ...item.tags,
  ].join(" ").toLowerCase();

  return symptomQuery
    .split(/\s+/)
    .filter(Boolean)
    .every((term) => searchable.includes(term));
}

export function ToxicitySearch({ variant = "hero" }: ToxicitySearchProps) {
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const urlQuery = searchParams.get("q")?.trim() || "";
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ToxicityItem[]>([]);
  const [suggestions, setSuggestions] = useState<ToxicityItem[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(-1);
  const [petFilter, setPetFilter] = useState<"all" | "dog" | "cat">("all");
  const [riskFilter, setRiskFilter] = useState<RiskFilter>("all");
  const [symptomFilter, setSymptomFilter] = useState("");
  const [sortMode, setSortMode] = useState<SortMode>("relevance");
  const [hasSearched, setHasSearched] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  const updateSearchResults = (q: string, nextPetFilter = petFilter) => {
    if (q.trim().length >= 2) {
      const r = searchToxicity(q, nextPetFilter);
      setResults(r);
      setHasSearched(true);
    } else {
      setResults([]);
      setHasSearched(false);
    }
  };

  const handleSearch = (q: string) => {
    setQuery(q);
    setShowSuggestions(false);
    updateSearchResults(q);
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
    updateSearchResults(q);
  };

  const selectSuggestion = (item: ToxicityItem) => {
    handleSearch(item.name);
  };

  const applyPetFilter = (type: "all" | "dog" | "cat") => {
    setPetFilter(type);
    setSelectedIdx(-1);
    if (query.trim().length >= 1) {
      const s = searchSuggestions(query, type);
      setSuggestions(s);
      setShowSuggestions(s.length > 0);
    }
    updateSearchResults(query, type);
  };

  useEffect(() => {
    if (urlQuery.length < 2) return;

    setQuery(urlQuery);
    setSelectedIdx(-1);
    setShowSuggestions(false);
    setSuggestions([]);
    setResults(searchToxicity(urlQuery, petFilter));
    setHasSearched(true);
  }, [urlQuery, petFilter]);

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

  const visibleResults = useMemo(() => {
    const symptomQuery = symptomFilter.trim().toLowerCase();
    const filtered = results.filter((item) => {
      if (riskFilter !== "all" && item.riskLevel !== riskFilter) return false;
      return matchesSymptomFilter(item, symptomQuery);
    });

    if (sortMode === "risk") {
      return [...filtered].sort((a, b) => riskRank[b.riskLevel] - riskRank[a.riskLevel] || a.name.localeCompare(b.name));
    }
    if (sortMode === "name") {
      return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    }
    return filtered;
  }, [results, riskFilter, symptomFilter, sortMode]);

  const hasActiveResultFilter = riskFilter !== "all" || symptomFilter.trim().length > 0 || sortMode !== "relevance";
  const popularSearches = ["wisteria", "sago palm", "chocolate", "grapes", "sesame seeds", "xylitol"];

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative">
        <div className="flex gap-1.5 mb-3 justify-center">
          {(["all", "dog", "cat"] as const).map((type) => (
            <button
              key={type}
              onClick={() => applyPetFilter(type)}
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
              aria-label="Clear search"
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
        {variant === "full" && (
          <div className="mt-4 rounded-lg border bg-card p-3 text-left shadow-sm">
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="space-y-1.5">
                <span className="text-xs font-medium text-muted-foreground">Risk level</span>
                <Select value={riskFilter} onValueChange={(value) => value && setRiskFilter(value as RiskFilter)}>
                  <SelectTrigger className="h-9 w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {riskOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </label>
              <label className="space-y-1.5">
                <span className="text-xs font-medium text-muted-foreground">Sort results</span>
                <Select value={sortMode} onValueChange={(value) => value && setSortMode(value as SortMode)}>
                  <SelectTrigger className="h-9 w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </label>
              <div className="space-y-2 sm:col-span-2">
                <label className="space-y-1.5 block">
                  <span className="text-xs font-medium text-muted-foreground">Symptom keyword</span>
                  <Input
                    value={symptomFilter}
                    onChange={(e) => setSymptomFilter(e.target.value)}
                    placeholder="Filter by vomiting, seizures, drooling..."
                    className="h-9"
                  />
                </label>
                <div className="flex flex-wrap items-center gap-1.5">
                  {symptomFilters.map((symptom) => (
                    <button
                      key={symptom}
                      type="button"
                      aria-pressed={symptomFilter === symptom}
                      onClick={() => setSymptomFilter((current) => current === symptom ? "" : symptom)}
                      className={`rounded-full px-2 py-0.5 text-xs transition-colors ${
                        symptomFilter === symptom
                          ? "bg-foreground text-background"
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                      }`}
                    >
                      {symptom}
                    </button>
                  ))}
                  {hasActiveResultFilter && (
                    <button
                      type="button"
                      onClick={() => { setRiskFilter("all"); setSymptomFilter(""); setSortMode("relevance"); }}
                      className="ml-auto text-xs font-medium text-primary hover:underline"
                    >
                      Reset filters
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {hasSearched && (
        <div className="mt-6 space-y-3">
          {results.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p className="text-lg">{t("toxicity.noResults")} &ldquo;{query}&rdquo;</p>
              <p className="text-sm mt-1">{t("toxicity.tryDifferent")}</p>
            </div>
          ) : visibleResults.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p className="text-lg">No results match the current filters.</p>
              <button
                type="button"
                onClick={() => { setRiskFilter("all"); setSymptomFilter(""); setSortMode("relevance"); }}
                className="mt-2 text-sm font-medium text-primary hover:underline"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <>
              <p className="text-xs text-muted-foreground">
                Showing {visibleResults.length} of {results.length} {results.length > 1 ? t("toxicity.results") : t("toxicity.result")}
              </p>
              {visibleResults.map((item) => (
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
