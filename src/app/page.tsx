"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import TiltCard from "@/components/TiltCard";
import FloatingEmbers from "@/components/FloatingEmbers";

const EASE_LUX = [0.16, 1, 0.3, 1] as const;

const donationTiers = [
  {
    amount: "180 ₪",
    title: "מחזירים את החיוך",
    desc: "מימון טיפול רגשי לילד",
  },
  {
    amount: "360 ₪",
    title: "עוגן למשפחה",
    desc: "סל תמיכה בסיסי",
  },
  {
    amount: "500 ₪",
    title: "שומרים על הנוער",
    desc: "תמיכה במסגרות מוגנות",
  },
  {
    amount: "1,000 ₪",
    title: "חזית של חסד",
    desc: "החזקת המוסדות",
  },
];

const activities = [
  {
    icon: "📖",
    title: "ישיבה לחוזרים בתשובה",
    desc: "מסגרת תורנית חמה לבחורים המבקשים לשוב אל שורשיהם ולבנות בית נאמן בישראל.",
  },
  {
    icon: "🕯️",
    title: "בית מדרש לנשים חוזרות בתשובה",
    desc: "לימוד וליווי אישי לנשים בתהליך התקרבות ליהדות, בסביבה תומכת ומכילה.",
  },
  {
    icon: "🎓",
    title: "כולל אברכים",
    desc: "החזקת תלמידי חכמים נשואים הלומדים תורה ברציפות, ומקבלים מלגת קיום למשפחותיהם.",
  },
  {
    icon: "🎨",
    title: "חינוך בלתי פורמלי לילדי הקהילה",
    desc: "חוגים, קייטנות ופעילויות תרבות קהילתיות המעניקות לילדי צפת עוגן ותחושת שייכות.",
  },
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

const headingFlip = {
  hidden: { opacity: 0, rotateX: -80, y: 20 },
  visible: {
    opacity: 1,
    rotateX: 0,
    y: 0,
    transition: { duration: 0.9, ease: EASE_LUX },
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
  "rounded-full bg-gradient-to-r from-yellow-500 to-yellow-300 font-bold text-black shadow-[0_0_20px_rgba(253,224,71,0.4)] transition-shadow duration-300 hover:shadow-[0_0_35px_rgba(253,224,71,0.7)]";

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroBgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const heroContentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroContentY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  return (
    <main className="flex flex-col flex-1">
      {/* Section A: Hero */}
      <section
        id="hero"
        ref={heroRef}
        className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-24 text-center"
      >
        <motion.div style={{ y: heroBgY }} className="hero-glow absolute inset-0 -z-10" />
        <FloatingEmbers />

        <motion.div
          style={{ opacity: heroContentOpacity, y: heroContentY }}
          className="flex flex-col items-center"
        >
          <div style={{ perspective: "1400px" }}>
            <motion.div initial="hidden" animate="visible" variants={logoVariants}>
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <Image
                  src="/logo.png"
                  alt="מאירים את הגליל"
                  width={400}
                  height={200}
                  unoptimized
                  className="h-auto w-[280px] object-contain drop-shadow-[0_0_40px_rgba(253,224,71,0.45)] sm:w-[340px] md:w-[420px]"
                  priority
                />
              </motion.div>
            </motion.div>
          </div>

          <motion.p
            initial="hidden"
            animate="visible"
            variants={subtitleVariants}
            className="mt-8 max-w-2xl text-lg leading-relaxed text-gray-300 sm:text-xl"
          >
            דווקא עכשיו, תחת אש – שומרים על הילדים והמשפחות בצפת!
          </motion.p>

          <motion.a
            href="#donate"
            initial="hidden"
            animate="visible"
            variants={ctaVariants}
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.95 }}
            className={`animate-pulse-gold mt-12 inline-block px-12 py-5 text-xl ${goldButton}`}
          >
            לתרומה דחופה
          </motion.a>
        </motion.div>
      </section>

      {/* Section B: The Story */}
      <section id="story" className="ambient-glow px-6 py-24 sm:py-32">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-8 text-center">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={headingFlip}
            style={{ transformPerspective: 800 }}
            className="text-3xl font-bold text-gold sm:text-4xl"
          >
            הילדים של צפת תחת אש 💔
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            transition={{ delay: 0.15 }}
            className="text-lg leading-loose text-gray-300 sm:text-xl"
          >
            חרדות, מסגרות קורסות ומשפחות במצוקה כלכלית. מוסדות &quot;נחלי
            התורה צפת&quot; הם העוגן של הקהילה, אבל המשאבים שלנו להמשך הסיוע
            פשוט אזלו.
            <br />
            <br />
            קמפיין &apos;מאירים את הגליל&apos; קורא לכם: אל תשאירו את ילדי
            הצפון לבד במערכה! תרומה אחת שלכם משנה חיים של משפחה שלמה.
          </motion.p>
        </div>
      </section>

      {/* Section: About the institution */}
      <section id="about" className="px-6 py-24 sm:py-32">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={headingFlip}
            style={{ transformPerspective: 800 }}
            className="text-3xl font-bold text-gold sm:text-4xl"
          >
            מי אנחנו – קהילת ברסלב בצפת
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            className="text-lg leading-loose text-gray-300 sm:text-xl"
          >
            בלב העיר העתיקה של צפת פועלת קהילת חסידי ברסלב &quot;נחלי
            התורה&quot; – קהילה של כ-400 משפחות הממשיכה את דרכם של גדולי
            החסידות. מוסדות הקהילה כוללים בית כנסת, מקוואות, ישיבה וכולל
            לאברכים נשואים, וישיבה לבחורים צעירים.
            <br />
            <br />
            לאחר כשלוש שנות פעילות ומאות תלמידים – ללא כל תמיכה ממשלתית –
            האחריות הכספית נופלת כולה על כתפי עומדי המוסדות. קמפיין
            &apos;מאירים את הגליל&apos; נולד כדי לחלוק את הנטל ולהבטיח את
            המשך הפעילות התורנית והקהילתית למען ילדי ומשפחות צפת.
          </motion.p>
        </div>
      </section>

      {/* Section: Activities */}
      <section id="activities" className="ambient-glow px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={headingFlip}
            style={{ transformPerspective: 800 }}
            className="mb-16 text-center text-3xl font-bold text-gold sm:text-4xl"
          >
            הפעילויות שלנו
          </motion.h2>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={cardsContainer}
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
          >
            {activities.map((item) => (
              <motion.div key={item.title} variants={cardItem} style={{ perspective: 1000 }}>
                <TiltCard className="flex h-full flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-8 text-center shadow-xl backdrop-blur-md transition-shadow duration-300 hover:border-gold/50 hover:shadow-[0_0_30px_rgba(253,224,71,0.25)]">
                  <span className="text-4xl">{item.icon}</span>
                  <h3 className="text-lg font-bold text-white">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-400">{item.desc}</p>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Section C: Donation Tiers */}
      <section id="donate" className="px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={headingFlip}
            style={{ transformPerspective: 800 }}
            className="mb-16 text-center text-3xl font-bold text-gold sm:text-4xl"
          >
            בחרו כיצד לתרום
          </motion.h2>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={cardsContainer}
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
          >
            {donationTiers.map((tier) => (
              <motion.div key={tier.title} variants={cardItem} style={{ perspective: 1000 }}>
                <TiltCard className="flex h-full flex-col items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-8 text-center shadow-xl backdrop-blur-md transition-shadow duration-300 hover:border-gold/50 hover:shadow-[0_0_30px_rgba(253,224,71,0.25)]">
                  <span className="text-4xl font-black text-gold drop-shadow-[0_0_10px_rgba(253,224,71,0.4)]">
                    {tier.amount}
                  </span>
                  <h3 className="text-xl font-bold text-white">{tier.title}</h3>
                  <p className="text-gray-400">{tier.desc}</p>
                  <motion.a
                    href="#donate"
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className={`mt-auto w-full px-6 py-3 ${goldButton}`}
                  >
                    תרמו עכשיו
                  </motion.a>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 px-6 py-10 text-center text-sm text-gray-500">
        קהילת ברסלב &quot;נחלי התורה&quot; צפת &middot; קמפיין מאירים את הגליל
      </footer>
    </main>
  );
}
