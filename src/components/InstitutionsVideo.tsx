"use client";

import { motion } from "framer-motion";
import Kicker from "@/components/Kicker";
import { useLanguage } from "@/components/LanguageProvider";
import { fadeUp } from "@/lib/motionVariants";

const COPY = {
  he: {
    kicker: "הסרטון",
    heading: "מוסדות נחלי התורה — בעיניים של ההורים, התלמידים והרבנים",
    text: "סרטון של כעשר דקות מתוך המוסדות: מהשער בשמונה בבוקר, דרך הגנים והתלמוד תורה, ועד הישיבה והכולל. הורים, בחורים ומחנכים מספרים מה קורה כאן — ולמה כל שותפות בדרך הזו נשארת לדורות.",
    note: "הסרטון כולל כתוביות בעברית",
  },
  en: {
    kicker: "The film",
    heading: "Nachalei HaTorah — through the eyes of parents, students and rabbis",
    text: "A ten-minute film from inside the institutions: from the gate at eight in the morning, through the kindergartens and Talmud Torah, to the yeshiva and kollel. Parents, students and educators tell what happens here — and why every partnership in this path lasts for generations.",
    note: "Hebrew subtitles",
  },
};

/** The institutions' film, with a poster and no download until it is played (preload="none"). */
export default function InstitutionsVideo({ className = "" }: { className?: string }) {
  const { language } = useLanguage();
  const c = COPY[language === "he" ? "he" : "en"];
  const reveal = { initial: "hidden", whileInView: "visible", viewport: { once: true, amount: 0.2 }, variants: fadeUp } as const;

  return (
    <section id="film" className={`night ambient-surface relative scroll-mt-20 overflow-hidden px-6 py-24 text-cream sm:py-32 ${className}`}>
      <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-7 text-center">
        <motion.div {...reveal}><Kicker>{c.kicker}</Kicker></motion.div>
        <motion.h2 {...reveal} className="font-display text-4xl font-bold leading-tight gold-text sm:text-5xl">{c.heading}</motion.h2>
        <motion.p {...reveal} className="max-w-3xl text-lg leading-loose text-cream/80 sm:text-xl">{c.text}</motion.p>
        <motion.div {...reveal} className="w-full overflow-hidden rounded-3xl bg-black shadow-2xl ring-1 ring-gold/40">
          <video
            controls
            playsInline
            preload="none"
            poster="/videos/institutions-poster.jpg"
            className="aspect-video w-full"
          >
            <source src="/videos/institutions.mp4" type="video/mp4" />
          </video>
        </motion.div>
        <p className="text-sm text-cream/50">{c.note}</p>
      </div>
    </section>
  );
}
