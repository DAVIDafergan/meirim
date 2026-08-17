import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "תודה על תרומתכם | מאירים את הגליל",
};

export default function ThanksPage() {
  return (
    <main className="ambient-glow flex min-h-screen flex-col items-center justify-center px-6 py-24 text-center">
      <span className="text-5xl">🙏</span>
      <h1 className="font-display mt-6 text-3xl text-gold sm:text-4xl">
        תודה רבה על תרומתכם!
      </h1>
      <p className="mt-4 max-w-md text-lg leading-relaxed text-gray-300">
        תרומתכם התקבלה בהצלחה ותעשה שינוי אמיתי עבור ילדי ומשפחות צפת. שכרכם
        רב משמים.
      </p>
      <Link
        href="/"
        className="mt-10 inline-block rounded-full bg-gradient-to-r from-yellow-500 to-yellow-300 px-8 py-3 font-bold tracking-wide text-black shadow-[0_0_20px_rgba(253,224,71,0.4)]"
      >
        חזרה לאתר
      </Link>
    </main>
  );
}
