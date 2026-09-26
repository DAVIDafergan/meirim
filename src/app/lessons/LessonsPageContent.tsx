"use client";

import { motion } from "framer-motion";
import LessonsPageHeader from "@/components/LessonsPageHeader";
import YoutubeFeed from "@/components/YoutubeFeed";
import SocialFollow from "@/components/SocialFollow";
import Kicker from "@/components/Kicker";
import { useLanguage } from "@/components/LanguageProvider";
import { fadeUp } from "@/lib/motionVariants";

export default function LessonsPageContent() {
  const { t } = useLanguage();

  return (
    <main className="ambient-surface relative flex-1 overflow-hidden bg-jewel-purple-deep px-6 pb-24 pt-28 text-cream sm:pb-32 sm:pt-32">
      <div className="mx-auto max-w-5xl">
        <LessonsPageHeader />

        <YoutubeFeed />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
          className="mx-auto mt-20 flex max-w-4xl flex-col items-center gap-6 border-t border-white/10 pt-14 text-center"
        >
          <Kicker>{t.lessonsPage.followKicker}</Kicker>
          <h2 className="font-display text-2xl font-bold text-cream sm:text-3xl">
            {t.lessonsPage.followHeading}
          </h2>
          <SocialFollow />
        </motion.div>
      </div>
    </main>
  );
}
