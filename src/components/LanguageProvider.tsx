"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { translations, type Language, type Translations } from "@/lib/translations";

const STORAGE_KEY = "meirim_language";

type LanguageContextValue = {
  language: Language;
  dir: "rtl" | "ltr";
  t: Translations;
  toggleLanguage: () => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("he");

  useEffect(() => {
    // localStorage isn't available during SSR, so the saved preference can
    // only be applied after hydration, in an effect.
    const saved = localStorage.getItem(STORAGE_KEY);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (saved === "he" || saved === "en") setLanguage(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language === "he" ? "he" : "en";
    document.documentElement.dir = language === "he" ? "rtl" : "ltr";
    localStorage.setItem(STORAGE_KEY, language);
  }, [language]);

  const toggleLanguage = () =>
    setLanguage((prev) => (prev === "he" ? "en" : "he"));

  return (
    <LanguageContext.Provider
      value={{
        language,
        dir: language === "he" ? "rtl" : "ltr",
        t: translations[language],
        toggleLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
