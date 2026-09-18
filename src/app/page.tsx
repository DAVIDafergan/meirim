"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Gallery from "@/components/Gallery";
import DepartmentsGridClient from "@/components/DepartmentsGridClient";
import SocialFollow from "@/components/SocialFollow";
import AnimatedCounter from "@/components/AnimatedCounter";
import Divider from "@/components/Divider";
import Kicker from "@/components/Kicker";
import BlessingModal from "@/components/BlessingModal";
import { nedarimPlusUrl, CAMPAIGN_GROUPE, donationTierValues } from "@/lib/nedarim";
import { useLanguage } from "@/components/LanguageProvider";
import { EASE_LUX, fadeUp, cardsContainer, cardItem } from "@/lib/motionVariants";
import { goldButton, outlineButton, jewelTones, cardHover } from "@/lib/uiConstants";
import { StarIcon, RingIcon, CoinIcon, HeartIcon } from "@/components/icons";

const blessingIcons = [StarIcon, RingIcon, CoinIcon, HeartIcon];

const statValues = [
  { to: 250, prefix: "", suffix: "+" },
  { to: 8, prefix: "", suffix: "+" },
  { to: 8, prefix: "", suffix: "" },
];

const heroFade = {
  hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1, ease: EASE_LUX },
  },
};

export default function Home() {
  const { t, language } = useLanguage();
  const isRtl = language === "he";
  const locale = isRtl ? "he-IL" : "en-US";
  const donationTiers = donationTierValues.map((value, i) => ({
    value,
    amount: `₪${value.toLocaleString(locale)}`,
    title: t.donationTiers[i].title,
    desc: t.donationTiers[i].desc,
  }));
  const blessingCategories = blessingIcons.map((Icon, i) => ({
    Icon,
    title: t.blessingCategories[i],
  }));
  const stats = statValues.map((s, i) => ({ ...s, label: t.statsLabels[i] }));

  const [blessingOpen, setBlessingOpen] = useState(false);

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroContentY = useTransform(heroScroll, [0, 1], ["0%", "10%"]);
  const heroContentOpacity = useTransform(heroScroll, [0, 0.85], [1, 0]);

  return (
    <main className="flex flex-col flex-1">
      {/* Section A: Hero */}
      <section
        id="hero"
        ref={heroRef}
        className="ambient-surface relative flex min-h-screen scroll-mt-20 flex-col items-center justify-center overflow-hidden bg-jewel-purple px-6 py-32 text-center text-cream"
      >
        <motion.div
          style={{ y: heroContentY, opacity: heroContentOpacity }}
          className="mx-auto flex w-full max-w-6xl flex-col items-center gap-14 px-4 lg:flex-row lg:items-center lg:justify-between lg:gap-16"
        >
          {/* Crest */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={heroFade}
            className="flex flex-col items-center gap-8 lg:order-2 lg:flex-1"
          >
            <div className="arch-niche flex h-56 w-48 items-center justify-center border-2 border-gold/50 bg-white/5 p-6 sm:h-64 sm:w-56">
              <Image
                src="/logo2.svg"
                alt={
                  isRtl
                    ? "מוסדות ברסלב צפת - נחלי התורה"
                    : "Nachalei HaTorah Breslov Institutions, Tzfat"
                }
                width={500}
                height={500}
                className="h-auto w-[150px] object-contain sm:w-[170px]"
                priority
              />
            </div>

            <div className="grid w-full max-w-sm grid-cols-2 gap-2.5 sm:gap-3">
              {donationTiers.map((tier) => (
                <a
                  key={tier.value}
                  href={nedarimPlusUrl({
                    amount: tier.value,
                    lock: true,
                    groupe: CAMPAIGN_GROUPE,
                    analytic: `hero-quick-${tier.value}`,
                    redirectPath: "/thanks",
                  })}
                  className="flex items-center justify-center gap-2 rounded-xl border border-cream/25 bg-white/5 px-4 py-3.5 transition-colors duration-200 hover:border-gold"
                >
                  <HeartIcon className="h-4 w-4 text-gold" />
                  <span className="font-display font-black text-lg text-cream">{tier.amount}</span>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Explanation + CTAs */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={heroFade}
            transition={{ delay: 0.15 }}
            className="flex flex-col items-center gap-8 text-center lg:order-1 lg:flex-1 lg:items-start lg:text-start"
          >
            <h1 className="font-display font-black text-3xl leading-snug tracking-tight text-cream sm:text-4xl">
              {t.hero.heading}
            </h1>

            <p className="max-w-xl text-xl leading-relaxed text-cream/80 sm:text-2xl">
              {t.hero.paragraph}
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <a
                href="#blessing"
                className="inline-block rounded-full border border-cream/40 px-8 py-4 text-lg font-display font-bold tracking-wide text-cream transition-colors duration-300 hover:border-gold hover:text-gold"
              >
                {t.hero.blessingCta}
              </a>
              <a href="#donate" className={`inline-block px-8 py-4 text-lg ${goldButton}`}>
                {t.hero.supportCta}
              </a>
            </div>
          </motion.div>
        </motion.div>

        <div className="absolute bottom-10 flex flex-col items-center gap-2 text-cream/60">
          <span className="text-xs tracking-widest">{t.hero.scrollDown}</span>
          <span className="h-8 w-px bg-gold/50" />
        </div>
      </section>

      {/* Section: Names for Blessing at the Rashbi's tomb */}
      <section id="blessing" className="relative scroll-mt-20 px-6 py-24 sm:py-32">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.6 }} variants={fadeUp}>
            <Kicker>{t.blessing.kicker}</Kicker>
          </motion.div>
          <h2 className="font-display font-black text-4xl leading-snug tracking-tight text-jewel-purple sm:text-5xl md:text-6xl">
            {t.blessing.heading}
          </h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            className="text-lg leading-loose text-foreground-muted sm:text-xl"
          >
            {t.blessing.paragraph1}
            <br />
            <br />
            {t.blessing.paragraph2}
            <br />
            <br />
            {t.blessing.paragraph3}
          </motion.p>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={cardsContainer}
            className="mt-2 grid grid-cols-2 gap-6 sm:grid-cols-4"
          >
            {blessingCategories.map((c) => (
              <motion.div key={c.title} variants={cardItem} className="flex flex-col items-center gap-2">
                <span className="arch-niche flex h-16 w-14 items-center justify-center border-2 border-gold/50 text-gold">
                  <c.Icon className="h-6 w-6" />
                </span>
                <span className="text-sm text-foreground-muted">{c.title}</span>
              </motion.div>
            ))}
          </motion.div>

          <button
            type="button"
            onClick={() => setBlessingOpen(true)}
            className={`mt-6 inline-block px-12 py-5 text-xl ${goldButton}`}
          >
            {t.blessing.ctaButton}
          </button>
        </div>
      </section>

      {/* Section B: The Old City */}
      <section
        id="heritage"
        className="ambient-surface relative scroll-mt-20 overflow-hidden bg-jewel-green px-6 py-24 text-cream sm:py-32"
      >
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.6 }} variants={fadeUp}>
            <Kicker>{t.story.kicker}</Kicker>
          </motion.div>
          <h2 className="font-display font-black text-4xl leading-snug tracking-tight text-cream sm:text-5xl md:text-6xl">
            {t.story.heading}
          </h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            transition={{ delay: 0.1 }}
            className="text-lg leading-loose text-cream/80 sm:text-xl"
          >
            {t.story.paragraph1}
            <br />
            <br />
            {t.story.paragraph2}
          </motion.p>
        </div>
      </section>

      {/* Section: About the institution */}
      <section id="about" className="relative scroll-mt-20 px-6 py-24 sm:py-28">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.6 }} variants={fadeUp}>
            <Kicker>{t.about.kicker}</Kicker>
          </motion.div>
          <h2 className="font-display font-black text-4xl leading-snug tracking-tight text-jewel-purple sm:text-5xl md:text-6xl">
            {t.about.heading}
          </h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            className="text-lg leading-loose text-foreground-muted sm:text-xl"
          >
            {t.about.paragraph1}
            <br />
            <br />
            {t.about.paragraph2}
          </motion.p>
        </div>
      </section>

      {/* Stat bar */}
      <section className="ambient-surface relative overflow-hidden bg-jewel-purple-deep px-6 py-10 text-cream">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={cardsContainer}
          className="mx-auto grid max-w-5xl grid-cols-2 gap-6 sm:grid-cols-4"
        >
          {stats.map((s) => (
            <motion.div key={s.label} variants={cardItem} className="flex flex-col items-center">
              <span className="font-display font-black text-4xl text-gold sm:text-5xl">
                <AnimatedCounter to={s.to} prefix={s.prefix} suffix={s.suffix} />
              </span>
              <span className="mt-1 text-xs text-cream/70 sm:text-sm">{s.label}</span>
            </motion.div>
          ))}
          <motion.div variants={cardItem} className="flex flex-col items-center">
            <span className="font-display font-black text-4xl text-gold sm:text-5xl">❤️</span>
            <span className="mt-1 text-xs text-cream/70 sm:text-sm">{t.statsLabels[3]}</span>
          </motion.div>
        </motion.div>
      </section>

      {/* Section: Departments */}
      <section id="departments" className="relative scroll-mt-20 px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 flex flex-col items-center gap-6 text-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.6 }} variants={fadeUp}>
              <Kicker>{t.activitiesSection.kicker}</Kicker>
            </motion.div>
            <h2 className="font-display font-black text-4xl leading-snug tracking-tight text-jewel-purple sm:text-5xl md:text-6xl">
              {t.activitiesSection.heading}
            </h2>
          </div>

          <DepartmentsGridClient />
        </div>
      </section>

      <BlessingModal open={blessingOpen} onClose={() => setBlessingOpen(false)} />

      {/* Section: Gallery */}
      <section id="gallery" className="surface-alt relative scroll-mt-20 px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 flex flex-col items-center gap-6 text-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.6 }} variants={fadeUp}>
              <Kicker>{t.gallery.kicker}</Kicker>
            </motion.div>
            <h2 className="font-display font-black text-4xl leading-snug tracking-tight text-jewel-purple sm:text-5xl md:text-6xl">
              {t.gallery.heading}
            </h2>
          </div>
          <Gallery />
        </div>
      </section>

      {/* Section: Social Follow */}
      <section className="ambient-surface relative overflow-hidden bg-jewel-wine px-6 py-16 text-cream sm:py-20">
        <div className="mx-auto max-w-4xl">
          <div className="mb-10 flex flex-col items-center gap-6 text-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.6 }} variants={fadeUp}>
              <Kicker>{t.social.kicker}</Kicker>
            </motion.div>
            <h2 className="font-display font-black text-3xl leading-snug tracking-tight text-cream sm:text-4xl">
              {t.social.heading}
            </h2>
          </div>
          <SocialFollow />
        </div>
      </section>

      <div className="py-2">
        <Divider />
      </div>

      {/* Section C: Donation Tiers */}
      <section id="donate" className="relative scroll-mt-20 px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 flex flex-col items-center gap-6 text-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.6 }} variants={fadeUp}>
              <Kicker>{t.donateSection.kicker}</Kicker>
            </motion.div>
            <h2 className="font-display font-black text-4xl leading-snug tracking-tight text-jewel-purple sm:text-5xl md:text-6xl">
              {t.donateSection.heading}
            </h2>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
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
                    analytic: `landing-page-${tier.value}`,
                    redirectPath: "/thanks",
                  })}
                  className={`mt-auto w-full px-6 py-3 ${goldButton}`}
                >
                  {t.donateSection.donateNow}
                </a>
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href={nedarimPlusUrl({
                groupe: CAMPAIGN_GROUPE,
                analytic: "landing-page-free-amount",
                redirectPath: "/thanks",
              })}
              className={`px-6 py-3 text-sm text-jewel-purple ${outlineButton}`}
            >
              {t.donateSection.otherAmount}
            </a>
            <a
              href={nedarimPlusUrl({
                groupe: CAMPAIGN_GROUPE,
                analytic: "landing-page-monthly",
                redirectPath: "/thanks",
                onlyKeva: true,
              })}
              className={`px-6 py-3 text-sm text-jewel-purple ${outlineButton}`}
            >
              {t.donateSection.monthly}
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-ink px-6 py-10 text-center text-sm text-cream/60">
        <p>{t.footer.text}</p>
        <a
          href="/admin"
          className="mt-4 inline-block text-xs text-cream/40 transition-colors hover:text-cream/70"
        >
          {t.footer.admin}
        </a>
      </footer>
    </main>
  );
}
