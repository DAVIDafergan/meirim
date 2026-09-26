"use client";

import { motion } from "framer-motion";
import Kicker from "@/components/Kicker";
import { useLanguage } from "@/components/LanguageProvider";
import { fadeUp } from "@/lib/motionVariants";

export default function CoursesPageHeader() {
  const { t } = useLanguage();

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      className="mb-16 flex flex-col items-center gap-6 text-center"
    >
      <Kicker>{t.coursesPage.kicker}</Kicker>
      <h1 className="font-display font-bold text-4xl leading-snug tracking-tight text-jewel-purple sm:text-5xl md:text-6xl">
        {t.coursesPage.heading}
      </h1>
      <p className="max-w-2xl text-lg leading-relaxed text-foreground-muted">{t.coursesPage.intro}</p>
    </motion.div>
  );
}
