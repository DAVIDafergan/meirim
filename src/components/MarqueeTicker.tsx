"use client";

import { useLanguage } from "@/components/LanguageProvider";

export default function MarqueeTicker() {
  const { language } = useLanguage();
  const phrases =
    language === "he"
      ? ['מוסדות ברסלב "נחלי התורה" צפת', "תורה, קהילה וחסד", "העיר העתיקה בצפת", "כל תרומה משנה חיים"]
      : [
          "Nachalei HaTorah Breslov Institutions, Tzfat",
          "Torah, Community & Kindness",
          "The Old City of Tzfat",
          "Every donation changes a life",
        ];
  const line = phrases.join(" ✦ ") + " ✦ ";

  return (
    <div className="overflow-hidden border-y border-white/10 bg-white/[0.03] py-4">
      <div className="marquee-track flex w-max whitespace-nowrap text-sm font-semibold tracking-wide text-gold/70">
        <span className="pl-8">{line.repeat(6)}</span>
        <span className="pl-8" aria-hidden="true">
          {line.repeat(6)}
        </span>
      </div>
    </div>
  );
}
