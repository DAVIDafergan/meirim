"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Kicker from "@/components/Kicker";
import LiveDonationCounter from "@/components/LiveDonationCounter";
import RecentDonations from "@/components/RecentDonations";
import AbroadDonation from "@/components/AbroadDonation";
import { nedarimPlusUrl, CAMPAIGN_GROUPE, donationTierValues } from "@/lib/nedarim";
import { useLanguage } from "@/components/LanguageProvider";
import { fadeUp, cardsContainer, cardItem } from "@/lib/motionVariants";
import { goldButton, outlineButton, jewelTones, cardHover } from "@/lib/uiConstants";

export default function DonatePage() {
  const { t, language } = useLanguage();
  const locale = language === "he" ? "he-IL" : "en-US";
  const donationTiers = donationTierValues.map((value, i) => ({
    value,
    amount: `₪${value.toLocaleString(locale)}`,
    title: t.donationTiers[i].title,
    desc: t.donationTiers[i].desc,
  }));

  const [purposeIndex, setPurposeIndex] = useState(0);
  const purposeGroupe =
    purposeIndex === 0 ? CAMPAIGN_GROUPE : `${CAMPAIGN_GROUPE} · ${t.donatePurposes[purposeIndex]}`;

  return (
    <main className="relative flex-1 px-6 py-28 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 flex flex-col items-center gap-6 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <Kicker>{t.donateSection.kicker}</Kicker>
          </motion.div>
          <h1 className="font-display font-black text-4xl leading-snug tracking-tight text-jewel-purple sm:text-5xl md:text-6xl">
            {t.donateSection.heading}
          </h1>
        </div>

        {/* English visitors are assumed to be mostly overseas supporters -
            lead with the Zelle/international-card option for them. */}
        {language === "en" && (
          <div className="mb-16">
            <AbroadDonation prominent />
          </div>
        )}

        <motion.div
          initial="hidden"
          animate="visible"
          variants={cardsContainer}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {donationTiers.map((tier, i) => (
            <motion.div
              key={tier.title}
              variants={cardItem}
              className={`arch-niche flex h-full flex-col items-center gap-4 p-8 pt-10 text-center text-cream ${jewelTones[i % jewelTones.length]} ${cardHover}`}
            >
              <span className="font-display font-black text-5xl text-gold">{tier.amount}</span>
              <h3 className="font-display text-xl font-bold text-cream">{tier.title}</h3>
              <p className="text-cream/75">{tier.desc}</p>
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
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-10 flex flex-col items-center gap-3">
          <p className="text-sm font-bold text-foreground-muted">{t.donateSection.purposeLabel}</p>
          <div className="flex flex-wrap justify-center gap-2">
            {t.donatePurposes.map((label, i) => (
              <button
                key={label}
                type="button"
                onClick={() => setPurposeIndex(i)}
                className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                  purposeIndex === i
                    ? "border-gold bg-gold/10 text-gold"
                    : "border-line text-foreground-muted hover:border-gold/50"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href={nedarimPlusUrl({
              groupe: purposeGroupe,
              analytic: "donate-page-free-amount",
              redirectPath: "/thanks",
            })}
            className={`px-6 py-3 text-sm text-jewel-purple ${outlineButton}`}
          >
            {t.donateSection.otherAmount}
          </a>
          <a
            href={nedarimPlusUrl({
              groupe: purposeGroupe,
              analytic: "donate-page-monthly",
              redirectPath: "/thanks",
              onlyKeva: true,
            })}
            className={`px-6 py-3 text-sm text-jewel-purple ${outlineButton}`}
          >
            {t.donateSection.monthly}
          </a>
        </div>

        {language !== "en" && (
          <div className="mt-16">
            <AbroadDonation />
          </div>
        )}

        <div className="mt-16 flex flex-col items-center gap-8 border-t border-line pt-12">
          <LiveDonationCounter />
          <div className="w-full">
            <p className="mb-4 text-center text-sm text-foreground-muted">
              {t.recentDonations.heading}
            </p>
            <RecentDonations />
          </div>
        </div>
      </div>
    </main>
  );
}
