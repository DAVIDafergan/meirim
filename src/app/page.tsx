"use client";

import InstitutionsVideo from "@/components/InstitutionsVideo";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Gallery from "@/components/Gallery";
import DepartmentsGridClient from "@/components/DepartmentsGridClient";
import CoursesGridClient from "@/components/CoursesGridClient";
import UpdatesList from "@/components/UpdatesList";
import YoutubeFeed from "@/components/YoutubeFeed";
import SocialFollow from "@/components/SocialFollow";
import AnimatedCounter from "@/components/AnimatedCounter";
import Divider from "@/components/Divider";
import Kicker from "@/components/Kicker";
import Footer from "@/components/Footer";
import HeroDust from "@/components/HeroDust";
import Marquee from "@/components/Marquee";
import BlessingModal from "@/components/BlessingModal";
import PartnershipModal from "@/components/PartnershipModal";
import AbroadDonation from "@/components/AbroadDonation";
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
  const ribbon = isRtl
    ? ["תורה", "תפילה", "חסד", "קהילה", "צפת העתיקה", "ברסלב", "נחלי התורה", "אש התורה"]
    : ["Torah", "Prayer", "Kindness", "Community", "Old City Tzfat", "Breslov", "Nachalei HaTorah", "Fire of Torah"];
  const stats = statValues.map((s, i) => ({ ...s, label: t.statsLabels[i] }));

  const [blessingOpen, setBlessingOpen] = useState(false);
  const [partnershipOpen, setPartnershipOpen] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const [purposeIndex, setPurposeIndex] = useState(0);
  const purposeGroupe =
    purposeIndex === 0 ? CAMPAIGN_GROUPE : `${CAMPAIGN_GROUPE} · ${t.donatePurposes[purposeIndex]}`;

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroContentY = useTransform(heroScroll, [0, 1], ["0%", "10%"]);
  const heroZoom = useTransform(heroScroll, [0, 1], [1, 1.18]);
  const heroContentOpacity = useTransform(heroScroll, [0, 0.85], [1, 0]);

  return (
    <main className="flex flex-col flex-1">
      {/* Hero - cinematic: Safed video, light rays, drifting gold embers */}
      <section
        id="hero"
        ref={heroRef}
        className="relative flex min-h-[100svh] scroll-mt-20 flex-col items-center justify-center overflow-hidden bg-jewel-purple-deep px-6 pb-48 pt-28 text-center text-cream"
      >
        <div className="hero-backdrop absolute inset-0" aria-hidden="true">
          {!videoFailed && (
            <motion.video
              style={{ scale: heroZoom }}
              className="absolute inset-0 h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              onError={() => setVideoFailed(true)}
            >
              <source src="/videos/safed-hero.mp4" type="video/mp4" onError={() => setVideoFailed(true)} />
            </motion.video>
          )}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(6,11,20,0.35),rgba(6,11,20,0.88)_75%)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-transparent to-ink" />
          <div className="rays" />
          <HeroDust />
        </div>

        {/* arched gold frame */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-4 bottom-36 top-24 hidden rounded-t-[50%] border border-gold/20 md:block lg:inset-x-[12%]"
        />

        <motion.div
          style={{ y: heroContentY, opacity: heroContentOpacity }}
          className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center gap-6 px-4"
        >
          <motion.div initial="hidden" animate="visible" variants={heroFade} className="relative">
            <span className="absolute inset-0 -m-6 rounded-full bg-gold/20 blur-3xl" aria-hidden="true" />
            <Image
              src="/logo2.svg"
              alt={
                isRtl
                  ? "מוסדות ברסלב צפת - נחלי התורה"
                  : "Nachalei HaTorah Breslov Institutions, Tzfat"
              }
              width={500}
              height={500}
              className="relative h-auto w-[84px] object-contain drop-shadow-[0_10px_30px_rgba(212,166,60,0.45)] sm:w-[104px]"
              priority
            />
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={heroFade}
            transition={{ delay: 0.15 }}
            className="flex flex-col items-center gap-7"
          >
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, delay: 0.3, ease: EASE_LUX }}
              className="h-px w-32 bg-gradient-to-r from-transparent via-gold to-transparent"
            />
            <motion.h1
              key={language}
              initial="hidden"
              animate="visible"
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.4 } } }}
              className="max-w-4xl font-display text-4xl font-black leading-[1.12] tracking-tight text-cream drop-shadow-[0_6px_30px_rgba(0,0,0,0.7)] sm:text-5xl md:text-6xl"
            >
              {t.hero.heading.split(" ").map((word, i, arr) => (
                <motion.span
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 28, filter: "blur(12px)" },
                    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.9, ease: EASE_LUX } },
                  }}
                  className={`inline-block ltr:mr-[0.28em] rtl:ml-[0.28em] ${i >= arr.length - 3 ? "gold-text" : ""}`}
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.5, ease: EASE_LUX }}
              className="max-w-2xl text-base font-light leading-loose text-cream/85 sm:text-lg"
            >
              {t.hero.paragraph}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.8, ease: EASE_LUX }}
              className="mt-2 flex flex-col items-center gap-4 sm:flex-row"
            >
              <Link href="/donate" className={`px-12 py-4 text-lg ${goldButton}`}>
                {t.nav.donateNow}
              </Link>
              <a
                href="#departments"
                className="rounded-full border border-gold/50 px-10 py-4 text-lg font-display font-bold text-cream backdrop-blur transition-colors duration-300 hover:border-gold hover:bg-gold/15"
              >
                {t.hero.cta}
              </a>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* scroll cue */}
        <motion.a
          href="#about"
          aria-label="scroll"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.4, duration: 1 }}
          className="absolute bottom-40 left-1/2 z-10 hidden"
        >
          <span className="h-10 w-6 rounded-full border border-gold/60 p-1">
            <span className="block h-2 w-full animate-[float-slow_1.6s_ease-in-out_infinite] rounded-full bg-gold" />
          </span>
        </motion.a>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2, ease: EASE_LUX }}
          className="glass absolute inset-x-4 bottom-6 z-10 mx-auto max-w-5xl rounded-3xl sm:inset-x-6"
        >
          <div className="grid grid-cols-2 divide-gold/15 px-4 sm:grid-cols-4 sm:divide-x sm:divide-x-reverse">
            {stats.map((st) => (
              <div key={st.label} className="flex flex-col items-center gap-1 py-4 sm:py-5">
                <span className="gold-text font-display text-4xl font-black sm:text-5xl">
                  <AnimatedCounter to={st.to} prefix={st.prefix} suffix={st.suffix} />
                </span>
                <span className="text-xs tracking-wide text-cream/80 sm:text-sm">{st.label}</span>
              </div>
            ))}
            <div className="flex flex-col items-center gap-1 py-4 sm:py-5">
              <span className="font-display text-4xl font-black sm:text-5xl">❤️</span>
              <span className="text-xs tracking-wide text-cream/80 sm:text-sm">{t.statsLabels[3]}</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Ribbon */}
      <div className="night border-y border-gold/20 py-5 font-display text-2xl font-bold text-gold/90 sm:text-3xl">
        <Marquee items={ribbon} />
      </div>

      {/* Section: About the institution */}
      <section id="about" className="night relative scroll-mt-20 overflow-hidden px-6 py-28 sm:py-40">
        <span className="watermark -start-10 top-4 text-[28rem] opacity-70" aria-hidden="true">{isRtl ? "א" : "A"}</span>
        <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-8 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.6 }} variants={fadeUp}>
            <Kicker>{t.about.kicker}</Kicker>
          </motion.div>
          <h2 className="font-display font-bold text-5xl leading-[1.05] tracking-tight gold-text sm:text-6xl md:text-7xl">
            {t.about.heading}
          </h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            className="text-lg leading-loose text-cream/80 sm:text-2xl"
          >
            {t.about.paragraph1}
            <br />
            <br />
            {t.about.paragraph2}
          </motion.p>
        </div>
      </section>

      {/* Section: Departments */}
      <section id="departments" className="relative scroll-mt-20 pt-28 sm:pt-40">
        <div>
          <div className="mx-auto mb-16 flex max-w-6xl flex-col items-center gap-6 px-6 text-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.6 }} variants={fadeUp}>
              <Kicker>{t.activitiesSection.kicker}</Kicker>
            </motion.div>
            <h2 className="font-display font-bold text-5xl leading-[1.05] tracking-tight text-jewel-purple sm:text-6xl md:text-7xl">
              {t.activitiesSection.heading}
            </h2>
          </div>

          <DepartmentsGridClient />
        </div>
      </section>

      <BlessingModal open={blessingOpen} onClose={() => setBlessingOpen(false)} />

      {/* Section B: The Old City */}
      <section
        id="heritage"
        className="night ambient-surface relative scroll-mt-20 overflow-hidden px-6 py-32 text-cream sm:py-44"
      >
        <div className="rays" aria-hidden="true" />
        <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.6 }} variants={fadeUp}>
            <Kicker>{t.story.kicker}</Kicker>
          </motion.div>
          <h2 className="font-display font-bold text-5xl leading-[1.05] tracking-tight text-cream sm:text-6xl md:text-7xl">
            {t.story.heading}
          </h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            transition={{ delay: 0.1 }}
            className="text-lg leading-loose text-cream/85 sm:text-2xl"
          >
            {t.story.paragraph1}
            <br />
            <br />
            {t.story.paragraph2}
          </motion.p>
        </div>
      </section>

      <InstitutionsVideo />

      {/* Section: Gallery */}
      <section id="gallery" className="surface-alt relative scroll-mt-20 pt-28 sm:pt-40 pb-0">
        <div>
          <div className="mx-auto mb-12 flex max-w-6xl flex-col items-center gap-6 px-6 text-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.6 }} variants={fadeUp}>
              <Kicker>{t.gallery.kicker}</Kicker>
            </motion.div>
            <h2 className="font-display font-bold text-5xl leading-[1.05] tracking-tight text-jewel-purple sm:text-6xl md:text-7xl">
              {t.gallery.heading}
            </h2>
          </div>
          <Gallery />
        </div>
      </section>


      {/* Section: Events & Updates */}
      <section id="updates" className="relative scroll-mt-20 px-6 py-28 sm:py-40">
        <div className="mx-auto mb-16 flex max-w-6xl flex-col items-center gap-6 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.6 }} variants={fadeUp}>
            <Kicker>{t.updatesPage.kicker}</Kicker>
          </motion.div>
          <h2 className="font-display font-bold text-5xl leading-[1.05] tracking-tight text-jewel-purple sm:text-6xl md:text-7xl">
            {t.updatesPage.heading}
          </h2>
        </div>
        <UpdatesList limit={4} />
        <div className="mt-10 flex justify-center">
          <Link href="/updates" className={`px-8 py-3 text-sm text-jewel-purple ${outlineButton}`}>
            {t.updatesPage.readMore}
          </Link>
        </div>
      </section>


      {/* Section: Lessons teaser - the full feed lives on its own /lessons page */}
      <section id="lessons" className="night ambient-surface relative scroll-mt-20 overflow-hidden px-6 py-20 text-cream sm:py-24">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={fadeUp}
            className="mb-12 flex flex-col items-center gap-6 text-center"
          >
            <Kicker>{t.lessonsPage.kicker}</Kicker>
            <h2 className="font-display font-bold text-3xl leading-snug tracking-tight text-cream sm:text-4xl">
              {t.lessonsPage.heading}
            </h2>
            <p className="max-w-2xl text-lg leading-loose text-cream/80">{t.lessonsPage.intro}</p>
          </motion.div>

          <YoutubeFeed />

          <div className="mx-auto mt-16 flex max-w-4xl flex-col items-center gap-6 border-t border-white/10 pt-12 text-center">
            <Kicker>{t.lessonsPage.followKicker}</Kicker>
            <h3 className="font-display text-2xl font-bold text-cream">{t.lessonsPage.followHeading}</h3>
            <SocialFollow />
          </div>
        </div>
      </section>

      <div className="py-2">
        <Divider />
      </div>

      {/* Section: Courses */}
      <section id="courses" className="relative scroll-mt-20 pt-28 sm:pt-40">
        <div>
          <div className="mx-auto mb-16 flex max-w-6xl flex-col items-center gap-6 px-6 text-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.6 }} variants={fadeUp}>
              <Kicker>{t.coursesPage.kicker}</Kicker>
            </motion.div>
            <h2 className="font-display font-bold text-5xl leading-[1.05] tracking-tight text-jewel-purple sm:text-6xl md:text-7xl">
              {t.coursesPage.heading}
            </h2>
          </div>
          <div className="mx-auto max-w-6xl px-6">
            <CoursesGridClient />
          </div>
        </div>
      </section>

      {/* Section: Pidyon Kaparot (seasonal, ahead of Yom Kippur) */}
      <section id="kaparot" className="scroll-mt-20 px-6 py-16 sm:py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={fadeUp}
          className="mx-auto max-w-4xl"
        >
          <div className="plaque-frame ambient-surface relative overflow-hidden rounded-3xl border-2 border-gold/50 bg-jewel-wine px-6 py-12 text-center text-cream sm:px-12 sm:py-14">
            <div className="flex flex-col items-center gap-5">
              <span className="arch-niche flex h-16 w-14 items-center justify-center border-2 border-gold/60 text-gold">
                <CoinIcon className="h-7 w-7" />
              </span>

              <Kicker>{t.kaparot.kicker}</Kicker>

              <h2 className="font-display font-bold text-3xl leading-snug tracking-tight text-cream sm:text-4xl">
                {t.kaparot.heading}
              </h2>

              <p className="max-w-2xl text-base leading-loose text-cream/80 sm:text-lg">
                {t.kaparot.body}
              </p>

              <Link href="/donate" className={`mt-2 inline-block px-10 py-4 text-lg ${goldButton}`}>
                {t.kaparot.cta}
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Section: Names for Blessing at the Rashbi's tomb */}
      <section id="blessing" className="relative scroll-mt-20 px-6 py-28 sm:py-40">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.6 }} variants={fadeUp}>
            <Kicker>{t.blessing.kicker}</Kicker>
          </motion.div>
          <h2 className="font-display font-bold text-5xl leading-[1.05] tracking-tight text-jewel-purple sm:text-6xl md:text-7xl">
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

      {/* Section: Pidyon Nefesh (year-round, distinct from the seasonal Kaparot above) */}
      <section id="pidyon-nefesh" className="surface-alt scroll-mt-20 px-6 py-16 sm:py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={fadeUp}
          className="mx-auto max-w-4xl"
        >
          <div className="relative overflow-hidden rounded-3xl border-2 border-gold/50 bg-jewel-purple-deep px-6 py-12 text-center text-cream sm:px-12 sm:py-14">
            <div className="flex flex-col items-center gap-5">
              <span className="flex h-16 w-14 items-center justify-center rounded-2xl border-2 border-gold/60 text-gold">
                <HeartIcon className="h-7 w-7" />
              </span>

              <Kicker>{t.pidyonNefesh.kicker}</Kicker>

              <h2 className="font-display font-bold text-3xl leading-snug tracking-tight text-cream sm:text-4xl">
                {t.pidyonNefesh.heading}
              </h2>

              <p className="max-w-2xl text-base leading-loose text-cream/80 sm:text-lg">
                {t.pidyonNefesh.body}
              </p>

              <a
                href={nedarimPlusUrl({
                  groupe: CAMPAIGN_GROUPE,
                  analytic: "landing-page-pidyon-nefesh",
                  redirectPath: "/thanks",
                })}
                className={`mt-2 inline-block px-10 py-4 text-lg ${goldButton}`}
              >
                {t.pidyonNefesh.cta}
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Section: Issachar-Zevulun partnership */}
      <section id="partnership" className="night ambient-surface relative scroll-mt-20 overflow-hidden px-6 py-24 text-cream sm:py-28">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center"
        >
          <Kicker>{t.partnership.kicker}</Kicker>
          <h2 className="font-display font-bold text-4xl leading-snug tracking-tight text-cream sm:text-5xl">
            {t.partnership.heading}
          </h2>
          <p className="text-lg leading-loose text-cream/80 sm:text-xl">{t.partnership.body}</p>
          <button
            type="button"
            onClick={() => setPartnershipOpen(true)}
            className={`mt-2 inline-block px-10 py-4 text-lg ${goldButton}`}
          >
            {t.partnership.ctaButton}
          </button>
        </motion.div>
      </section>

      <PartnershipModal open={partnershipOpen} onClose={() => setPartnershipOpen(false)} />

      {/* Section C: Donation Tiers */}
      <section id="donate" className="relative scroll-mt-20 px-6 py-28 sm:py-40">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 flex flex-col items-center gap-6 text-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.6 }} variants={fadeUp}>
              <Kicker>{t.donateSection.kicker}</Kicker>
            </motion.div>
            <h2 className="font-display font-bold text-5xl leading-[1.05] tracking-tight text-jewel-purple sm:text-6xl md:text-7xl">
              {t.donateSection.heading}
            </h2>
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
                <span className="font-display font-bold text-5xl text-gold">{tier.amount}</span>
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
                analytic: "landing-page-free-amount",
                redirectPath: "/thanks",
              })}
              className={`px-6 py-3 text-sm text-jewel-purple ${outlineButton}`}
            >
              {t.donateSection.otherAmount}
            </a>
            <a
              href={nedarimPlusUrl({
                groupe: purposeGroupe,
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

        {language !== "en" && (
          <div className="mt-16">
            <AbroadDonation />
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
