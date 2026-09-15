"use client";

import { motion } from "framer-motion";
import FloatingOrbs from "@/components/FloatingOrbs";
import TiltCard from "@/components/TiltCard";
import Kicker from "@/components/Kicker";
import TypewriterText from "@/components/TypewriterText";
import LiveDonationCounter from "@/components/LiveDonationCounter";
import RecentDonations from "@/components/RecentDonations";
import { nedarimPlusUrl, CAMPAIGN_GROUPE, donationTierValues } from "@/lib/nedarim";
import { useLanguage } from "@/components/LanguageProvider";
import { fadeUp, cardsContainer, cardItem } from "@/lib/motionVariants";
import { goldButton } from "@/lib/uiConstants";

export default function DonatePage() {
  const { t, language } = useLanguage();
  const locale = language === "he" ? "he-IL" : "en-US";
  const donationTiers = donationTierValues.map((value, i) => ({
    value,
    amount: `₪${value.toLocaleString(locale)}`,
    title: t.donationTiers[i].title,
    desc: t.donationTiers[i].desc,
  }));

  return (
    <main className="ambient-glow relative flex-1 overflow-hidden px-6 py-28 sm:py-32">
      <FloatingOrbs />
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 flex flex-col items-center gap-6 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <Kicker>{t.donateSection.kicker}</Kicker>
          </motion.div>
          <h1 className="font-display font-black text-4xl leading-snug text-gold sm:text-5xl md:text-6xl">
            <TypewriterText>{t.donateSection.heading}</TypewriterText>
          </h1>
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={cardsContainer}
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {donationTiers.map((tier) => (
            <motion.div key={tier.title} variants={cardItem} style={{ perspective: 1000 }}>
              <TiltCard className="flex h-full flex-col items-center gap-4 rounded-2xl border border-white/15 bg-white/[0.08] p-8 text-center shadow-xl backdrop-blur-md transition-shadow duration-300 hover:border-gold/60 hover:shadow-[0_0_30px_rgba(201,162,39,0.25)]">
                <span className="font-display font-black text-5xl text-gold">{tier.amount}</span>
                <h3 className="text-xl font-bold text-white">{tier.title}</h3>
                <p className="text-gray-300">{tier.desc}</p>
                <a
                  href={nedarimPlusUrl({
                    amount: tier.value,
                    lock: true,
                    groupe: CAMPAIGN_GROUPE,
                    analytic: `donate-page-${tier.value}`,
                    redirectPath: "/thanks",
                  })}
                  className={`mt-auto w-full px-6 py-3 ${goldButton}`}
                >
                  {t.donateSection.donateNow}
                </a>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href={nedarimPlusUrl({
              groupe: CAMPAIGN_GROUPE,
              analytic: "donate-page-free-amount",
              redirectPath: "/thanks",
            })}
            className="rounded-full border border-gold/40 px-6 py-3 text-sm font-bold text-gold transition-colors hover:bg-gold/10"
          >
            {t.donateSection.otherAmount}
          </a>
          <a
            href={nedarimPlusUrl({
              groupe: CAMPAIGN_GROUPE,
              analytic: "donate-page-monthly",
              redirectPath: "/thanks",
              onlyKeva: true,
            })}
            className="rounded-full border border-gold/40 px-6 py-3 text-sm font-bold text-gold transition-colors hover:bg-gold/10"
          >
            {t.donateSection.monthly}
          </a>
        </div>

        <div className="mt-16 flex flex-col items-center gap-8 border-t border-white/10 pt-12">
          <LiveDonationCounter />
          <div className="w-full">
            <p className="mb-4 text-center text-sm text-gray-400">
              {t.recentDonations.heading}
            </p>
            <RecentDonations />
          </div>
        </div>
      </div>
    </main>
  );
}
