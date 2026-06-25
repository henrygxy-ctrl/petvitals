"use client";

import { createContext, useContext, type ReactNode } from "react";
import enTranslations from "./en.json";

type TranslationDict = Record<string, any>;

interface I18nContextType {
  t: (key: string, params?: Record<string, string | number>) => string;
}

const I18nContext = createContext<I18nContextType | null>(null);

function getNested(obj: any, path: string): string | undefined {
  return path.split(".").reduce((acc: any, part: string) => acc?.[part], obj);
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const t = (key: string, params?: Record<string, string | number>) => {
    const dict: TranslationDict = enTranslations;
    let value = getNested(dict, key) || key;
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        value = (value as string).replace(`{${k}}`, String(v));
      });
    }
    return value as string;
  };

  return (
    <I18nContext.Provider value={{ t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useTranslation() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useTranslation must be used within I18nProvider");
  return ctx;
}
