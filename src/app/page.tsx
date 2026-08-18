"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import TiltCard from "@/components/TiltCard";
import FloatingEmbers from "@/components/FloatingEmbers";
import FloatingOrbs from "@/components/FloatingOrbs";
import MarqueeTicker from "@/components/MarqueeTicker";
import TypewriterText from "@/components/TypewriterText";
import LiveDonationCounter from "@/components/LiveDonationCounter";
import RecentDonations from "@/components/RecentDonations";
import AnimatedCounter from "@/components/AnimatedCounter";
import Divider from "@/components/Divider";
import BlessingModal from "@/components/BlessingModal";
import VideoPlayer from "@/components/VideoPlayer";
import { nedarimPlusUrl } from "@/lib/nedarim";
import { useLanguage } from "@/components/LanguageProvider";
import {
  BookIcon,
  CandleIcon,
  CapIcon,
  CommunityIcon,
  StarIcon,
  RingIcon,
  CoinIcon,
  HeartIcon,
  SynagogueIcon,
  ScrollIcon,
  BlockIcon,
  BowlIcon,
  ChalkboardIcon,
  PrinterIcon,
} from "@/components/icons";

const EASE_LUX = [0.16, 1, 0.3, 1] as const;

// Sent to Nedarim Plus for their internal reporting - kept in Hebrew
// regardless of site language so it matches their own category naming.
const DONATION_GROUPE = "קמפיין מאירים את הגליל";

const donationTierValues = [180, 360, 500, 1000];

const activityIcons = [
  SynagogueIcon,
  CapIcon,
  BlockIcon,
  BookIcon,
  ScrollIcon,
  BowlIcon,
  CandleIcon,
  CommunityIcon,
  ChalkboardIcon,
  PrinterIcon,
];

const banners = ["/banner1.jpg", "/banner2.jpg"];

const blessingIcons = [StarIcon, RingIcon, CoinIcon, HeartIcon];

const statValues = [
  { to: 250, prefix: "", suffix: "+" },
  { to: 350, prefix: "", suffix: "+" },
  { to: 60, prefix: "", suffix: "+" },
];

const logoVariants = {
  hidden: { opacity: 0, scale: 0.7, rotateX: 25, rotateY: -25, y: 40 },
  visible: {
    opacity: 1,
    scale: 1,
    rotateX: 0,
    rotateY: 0,
    y: 0,
    transition: { duration: 1.8, ease: EASE_LUX },
  },
};

const subtitleVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: EASE_LUX, delay: 0.9 },
  },
};

const ctaVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE_LUX, delay: 1.3 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE_LUX },
  },
};

const cardsContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const cardItem = {
  hidden: { opacity: 0, y: 50, rotateX: -20 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.8, ease: EASE_LUX },
  },
};

const goldButton =
  "gold-shimmer font-display font-bold rounded-full bg-gradient-to-r from-yellow-500 to-yellow-300 tracking-wide text-black shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_0_20px_rgba(253,224,71,0.4)] transition-shadow duration-300 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.5),0_0_35px_rgba(253,224,71,0.7)]";

const donateAccents = [
  {
    text: "text-gold",
    ring: "border-gold/40",
    glow: "hover:shadow-[0_0_24px_rgba(253,224,71,0.35)]",
  },
  {
    text: "text-violet-200",
    ring: "border-violet-300/40",
    glow: "hover:shadow-[0_0_24px_rgba(196,132,252,0.3)]",
  },
  {
    text: "text-amber-200",
    ring: "border-amber-300/40",
    glow: "hover:shadow-[0_0_24px_rgba(252,211,77,0.3)]",
  },
  {
    text: "text-rose-200",
    ring: "border-rose-300/40",
    glow: "hover:shadow-[0_0_24px_rgba(253,164,175,0.3)]",
  },
];

function Kicker({ children }: { children: ReactNode }) {
  return <span className="kicker">{children}</span>;
}

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
  const activities = activityIcons.map((Icon, i) => ({
    Icon,
    title: t.activityTitles[i],
  }));
  const blessingCategories = blessingIcons.map((Icon, i) => ({
    Icon,
    title: t.blessingCategories[i],
  }));
  const stats = statValues.map((s, i) => ({ ...s, label: t.statsLabels[i] }));

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroBgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const heroContentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroContentY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  const [currentBanner, setCurrentBanner] = useState(0);
  const [blessingOpen, setBlessingOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev === 0 ? 1 : 0));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="flex flex-col flex-1">
      {/* Section A: Hero */}
      <section
        id="hero"
        ref={heroRef}
        className="relative flex min-h-screen scroll-mt-20 flex-col items-center justify-center overflow-hidden px-6 py-24 text-center"
      >
        <motion.div style={{ y: heroBgY }} className="hero-glow absolute inset-0 -z-10" />
        <FloatingEmbers />

        <motion.div
          style={{ opacity: heroContentOpacity, y: heroContentY }}
          className="mx-auto flex w-full max-w-6xl flex-col items-center gap-12 px-4 lg:flex-row lg:items-center lg:justify-between lg:gap-16"
        >
          {/* Logo - left side on desktop, tilted, no frame - with quick-donate buttons below it */}
          <div className="flex flex-col items-center gap-6 lg:order-2 lg:flex-1">
            <motion.div initial="hidden" animate="visible" variants={logoVariants} style={{ rotate: -6 }}>
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <Image
                  src="/logo-hero.png"
                  alt={isRtl ? "מאירים את הגליל" : "Lighting the Galilee"}
                  width={900}
                  height={526}
                  className="h-auto w-[260px] object-contain drop-shadow-[0_15px_45px_rgba(253,224,71,0.35)] sm:w-[340px] md:w-[400px] lg:w-[420px]"
                  priority
                />
              </motion.div>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={ctaVariants}
              className="grid w-full max-w-sm grid-cols-2 gap-2.5 sm:gap-3"
            >
              {donationTiers.map((tier, i) => {
                const accent = donateAccents[i % donateAccents.length];
                return (
                  <motion.a
                    key={tier.value}
                    href={nedarimPlusUrl({
                      amount: tier.value,
                      lock: true,
                      groupe: DONATION_GROUPE,
                      analytic: `hero-quick-${tier.value}`,
                      redirectPath: "/thanks",
                    })}
                    whileHover={{ scale: 1.05, y: -4 }}
                    whileTap={{ scale: 0.96 }}
                    className={`flex items-center justify-center gap-2 rounded-2xl border ${accent.ring} bg-white/[0.06] px-4 py-3.5 backdrop-blur-md transition-shadow duration-300 ${accent.glow} hover:bg-white/[0.1]`}
                  >
                    <HeartIcon className={`h-4 w-4 ${accent.text}`} />
                    <span className={`font-display font-black text-lg ${accent.text}`}>
                      {tier.amount}
                    </span>
                  </motion.a>
                );
              })}
            </motion.div>
          </div>

          {/* Explanation + CTAs - opposite side of the logo, reading-direction aware */}
          <div className="flex flex-col items-center gap-8 text-center lg:order-1 lg:flex-1 lg:items-start lg:text-start">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={subtitleVariants}
              transition={{ duration: 1, ease: EASE_LUX, delay: 0.5 }}
              className="flex flex-col items-center gap-3 lg:items-start"
            >
              <h1 className="font-display font-black text-3xl leading-snug text-gold sm:text-4xl">
                <TypewriterText delay={0.4}>{t.hero.heading}</TypewriterText>
              </h1>
              <LiveDonationCounter />
            </motion.div>

            <motion.p
              initial="hidden"
              animate="visible"
              variants={subtitleVariants}
              className="max-w-xl text-xl leading-relaxed text-gray-200 sm:text-2xl"
            >
              {t.hero.paragraph}
            </motion.p>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={ctaVariants}
              className="flex flex-col gap-4 sm:flex-row"
            >
              <motion.a
                href="#blessing"
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.95 }}
                className={`inline-block px-8 py-4 text-lg ${goldButton}`}
              >
                {t.hero.blessingCta}
              </motion.a>
              <motion.a
                href="#donate"
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.95 }}
                className={`animate-pulse-gold inline-block px-8 py-4 text-lg ${goldButton}`}
              >
                {t.hero.supportCta}
              </motion.a>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 flex flex-col items-center gap-2 text-gray-400"
        >
          <span className="text-xs tracking-widest">{t.hero.scrollDown}</span>
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="h-6 w-px bg-gradient-to-b from-gold to-transparent"
          />
        </motion.div>
      </section>

      {/* Section: Video */}
      <section
        id="video"
        className="ambient-glow relative scroll-mt-20 overflow-hidden px-6 py-16 sm:py-24"
      >
        <FloatingOrbs />
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.6 }}
            variants={fadeUp}
          >
            <Kicker>{t.video.kicker}</Kicker>
          </motion.div>
          <h2 className="font-display font-black text-3xl text-gold sm:text-4xl">
            <TypewriterText>{t.video.heading}</TypewriterText>
          </h2>

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, ease: EASE_LUX }}
            className="relative mt-2 w-full max-w-[380px] overflow-hidden rounded-3xl border-2 border-gold/40 bg-gradient-to-b from-purple-deep via-[#1a1025] to-purple-deep shadow-[0_0_50px_rgba(253,224,71,0.25)]"
          >
            <VideoPlayer
              src="/video-opt.mp4"
              poster="/video-poster.jpg"
              className="aspect-[9/16] w-full bg-black"
              label={t.video.kicker}
            />
          </motion.div>
        </div>
      </section>

      {/* Section: Names for Blessing at the Rashbi's tomb */}
      <section
        id="blessing"
        className="ambient-glow relative scroll-mt-20 overflow-hidden px-6 py-24 sm:py-32"
      >
        <FloatingOrbs />
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.6 }}
            variants={fadeUp}
          >
            <Kicker>{t.blessing.kicker}</Kicker>
          </motion.div>
          <h2 className="font-display font-black text-4xl leading-snug text-gold sm:text-5xl md:text-6xl">
            <TypewriterText>{t.blessing.heading}</TypewriterText>
          </h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            className="text-lg leading-loose text-gray-200 sm:text-xl"
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
                <span className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/30 bg-gradient-to-b from-gold/10 to-transparent text-gold shadow-[0_0_15px_rgba(253,224,71,0.15)]">
                  <c.Icon className="h-7 w-7" />
                </span>
                <span className="text-sm text-gray-200">{c.title}</span>
              </motion.div>
            ))}
          </motion.div>

          <motion.button
            type="button"
            onClick={() => setBlessingOpen(true)}
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.95 }}
            className={`animate-pulse-gold mt-6 inline-block px-12 py-5 text-xl ${goldButton}`}
          >
            {t.blessing.ctaButton}
          </motion.button>
        </div>
      </section>

      <div className="py-2">
        <Divider />
      </div>

      {/* Banner Carousel */}
      <div className="mt-8 mb-12 flex w-full flex-col items-center gap-8">
        <div className="mb-2">
          <Kicker>{t.banner.kicker}</Kicker>
        </div>
        <div className="relative aspect-[2.7/1] w-full overflow-hidden border-y-2 border-gold/40 bg-gradient-to-b from-purple-deep via-[#1a1025] to-purple-deep shadow-[0_0_50px_rgba(253,224,71,0.25)]">
          <AnimatePresence>
            <motion.div
              key={currentBanner}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0"
            >
              <Image
                src={banners[currentBanner]}
                alt={t.banner.alt}
                fill
                sizes="100vw"
                className="object-contain"
                priority={currentBanner === 0}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.a
          href="#donate"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`animate-pulse-gold inline-block px-10 py-4 text-lg ${goldButton}`}
        >
          {t.banner.cta}
        </motion.a>
      </div>

      <MarqueeTicker />

      {/* Section B: The Story */}
      <section
        id="story"
        className="ambient-glow relative scroll-mt-20 overflow-hidden px-6 py-24 sm:py-32"
      >
        <FloatingOrbs />
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.6 }}
            variants={fadeUp}
          >
            <Kicker>{t.story.kicker}</Kicker>
          </motion.div>
          <h2 className="font-display font-black text-4xl leading-snug text-gold sm:text-5xl md:text-6xl">
            <TypewriterText>{t.story.heading}</TypewriterText>
          </h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            transition={{ delay: 0.15 }}
            className="text-lg leading-loose text-gray-200 sm:text-xl"
          >
            {t.story.paragraph1}
            <br />
            <br />
            {t.story.paragraph2}
          </motion.p>
        </div>
      </section>

      <div className="py-2">
        <Divider />
      </div>

      {/* Section: About the institution */}
      <section
        id="about"
        className="ambient-glow relative scroll-mt-20 overflow-hidden px-6 py-24 sm:py-32"
      >
        <FloatingOrbs />
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.6 }}
            variants={fadeUp}
          >
            <Kicker>{t.about.kicker}</Kicker>
          </motion.div>
          <h2 className="font-display font-black text-4xl leading-snug text-gold sm:text-5xl md:text-6xl">
            <TypewriterText>{t.about.heading}</TypewriterText>
          </h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            className="text-lg leading-loose text-gray-200 sm:text-xl"
          >
            {t.about.paragraph1}
            <br />
            <br />
            {t.about.paragraph2}
          </motion.p>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={cardsContainer}
            className="mt-8 grid w-full grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-8"
          >
            {stats.map((s) => (
              <motion.div key={s.label} variants={cardItem} className="flex flex-col items-center">
                <span className="font-display font-black text-4xl text-gold drop-shadow-[0_0_10px_rgba(253,224,71,0.4)] sm:text-6xl">
                  <AnimatedCounter to={s.to} prefix={s.prefix} suffix={s.suffix} />
                </span>
                <span className="mt-2 text-xs text-gray-300 sm:text-sm">{s.label}</span>
              </motion.div>
            ))}
            <motion.div variants={cardItem} className="flex flex-col items-center">
              <span className="font-display font-black text-4xl text-gold drop-shadow-[0_0_10px_rgba(253,224,71,0.4)] sm:text-6xl">
                ❤️
              </span>
              <span className="mt-2 text-xs text-gray-300 sm:text-sm">
                {t.statsLabels[3]}
              </span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Section: Activities */}
      <section
        id="activities"
        className="ambient-glow relative scroll-mt-20 overflow-hidden px-6 py-24 sm:py-32"
      >
        <FloatingOrbs />
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 flex flex-col items-center gap-6 text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.6 }}
              variants={fadeUp}
            >
              <Kicker>{t.activitiesSection.kicker}</Kicker>
            </motion.div>
            <h2 className="font-display font-black text-4xl leading-snug text-gold sm:text-5xl md:text-6xl">
              <TypewriterText>{t.activitiesSection.heading}</TypewriterText>
            </h2>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={cardsContainer}
            className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5"
          >
            {activities.map((item) => (
              <motion.div key={item.title} variants={cardItem} style={{ perspective: 1000 }}>
                <TiltCard className="flex h-full flex-col items-center gap-3 rounded-2xl border border-white/15 bg-white/[0.08] p-6 text-center shadow-xl backdrop-blur-md transition-shadow duration-300 hover:border-gold/60 hover:shadow-[0_0_30px_rgba(253,224,71,0.25)]">
                  <span className="relative flex h-14 w-14 items-center justify-center rounded-full border border-gold/30 bg-gradient-to-b from-gold/10 to-transparent text-gold shadow-[0_0_20px_rgba(253,224,71,0.15)]">
                    <motion.span
                      className="absolute inset-0 rounded-full border border-gold/50"
                      animate={{ scale: [1, 1.4], opacity: [0.6, 0] }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
                    />
                    <item.Icon className="h-7 w-7" />
                  </span>
                  <h3 className="text-sm font-bold text-white sm:text-base">{item.title}</h3>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <BlessingModal open={blessingOpen} onClose={() => setBlessingOpen(false)} />

      <div className="py-2">
        <Divider />
      </div>

      {/* Section C: Donation Tiers */}
      <section
        id="donate"
        className="ambient-glow relative scroll-mt-20 overflow-hidden px-6 py-24 sm:py-32"
      >
        <FloatingOrbs />
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 flex flex-col items-center gap-6 text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.6 }}
              variants={fadeUp}
            >
              <Kicker>{t.donateSection.kicker}</Kicker>
            </motion.div>
            <h2 className="font-display font-black text-4xl leading-snug text-gold sm:text-5xl md:text-6xl">
              <TypewriterText>{t.donateSection.heading}</TypewriterText>
            </h2>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={cardsContainer}
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
          >
            {donationTiers.map((tier) => (
              <motion.div key={tier.title} variants={cardItem} style={{ perspective: 1000 }}>
                <TiltCard className="flex h-full flex-col items-center gap-4 rounded-2xl border border-white/15 bg-white/[0.08] p-8 text-center shadow-xl backdrop-blur-md transition-shadow duration-300 hover:border-gold/60 hover:shadow-[0_0_30px_rgba(253,224,71,0.25)]">
                  <motion.span
                    animate={{
                      textShadow: [
                        "0 0 10px rgba(253,224,71,0.35)",
                        "0 0 22px rgba(253,224,71,0.6)",
                        "0 0 10px rgba(253,224,71,0.35)",
                      ],
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="font-display font-black text-5xl text-gold"
                  >
                    {tier.amount}
                  </motion.span>
                  <h3 className="text-xl font-bold text-white">{tier.title}</h3>
                  <p className="text-gray-300">{tier.desc}</p>
                  <motion.a
                    href={nedarimPlusUrl({
                      amount: tier.value,
                      lock: true,
                      groupe: DONATION_GROUPE,
                      analytic: `landing-page-${tier.value}`,
                      redirectPath: "/thanks",
                    })}
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className={`mt-auto w-full px-6 py-3 ${goldButton}`}
                  >
                    {t.donateSection.donateNow}
                  </motion.a>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <motion.a
              href={nedarimPlusUrl({
                groupe: DONATION_GROUPE,
                analytic: "landing-page-free-amount",
                redirectPath: "/thanks",
              })}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-full border border-gold/40 px-6 py-3 text-sm font-bold text-gold transition-colors hover:bg-gold/10"
            >
              {t.donateSection.otherAmount}
            </motion.a>
            <motion.a
              href={nedarimPlusUrl({
                groupe: DONATION_GROUPE,
                analytic: "landing-page-monthly",
                redirectPath: "/thanks",
                onlyKeva: true,
              })}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-full border border-gold/40 px-6 py-3 text-sm font-bold text-gold transition-colors hover:bg-gold/10"
            >
              {t.donateSection.monthly}
            </motion.a>
          </div>
        </div>
      </section>

      {/* Section: Recent Donations */}
      <section className="relative overflow-hidden px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex flex-col items-center gap-6 text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.6 }}
              variants={fadeUp}
            >
              <Kicker>{t.recentDonations.kicker}</Kicker>
            </motion.div>
            <h2 className="font-display font-black text-3xl leading-snug text-gold sm:text-4xl">
              <TypewriterText>{t.recentDonations.heading}</TypewriterText>
            </h2>
          </div>
          <RecentDonations />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 px-6 py-10 text-center text-sm text-gray-400">
        <p>{t.footer.text}</p>
        <a
          href="/admin"
          className="mt-4 inline-block text-xs text-gray-500 transition-colors hover:text-gray-300"
        >
          {t.footer.admin}
        </a>
      </footer>
    </main>
  );
}
