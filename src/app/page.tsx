"use client";

import Image from "next/image";
import { motion } from "framer-motion";

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

const logoVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.5, ease: "easeOut" as const },
  },
};

const subtitleVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: "easeOut" as const, delay: 0.6 },
  },
};

const ctaVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" as const, delay: 1.0 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" as const },
  },
};

const cardsContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const cardItem = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" as const },
  },
};

const goldButton =
  "rounded-full bg-gradient-to-r from-yellow-500 to-yellow-300 font-bold text-black shadow-[0_0_20px_rgba(253,224,71,0.4)] transition-shadow duration-300 hover:shadow-[0_0_35px_rgba(253,224,71,0.7)]";

export default function Home() {
  return (
    <main className="flex flex-col flex-1">
      {/* Section A: Hero */}
      <section
        id="hero"
        className="hero-glow relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-24 text-center"
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={logoVariants}
        >
          <Image
            src="/logo.png"
            alt="מאירים את הגליל"
            width={400}
            height={200}
            className="h-auto w-[280px] object-contain sm:w-[340px] md:w-[400px]"
            priority
          />
        </motion.div>

        <motion.p
          initial="hidden"
          animate="visible"
          variants={subtitleVariants}
          className="mt-10 max-w-2xl text-lg leading-relaxed text-gray-300 sm:text-xl"
        >
          דווקא עכשיו, תחת אש – שומרים על הילדים והמשפחות בצפת!
        </motion.p>

        <motion.a
          href="#donate"
          initial="hidden"
          animate="visible"
          variants={ctaVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`animate-pulse-gold mt-12 inline-block px-12 py-5 text-xl ${goldButton}`}
        >
          לתרומה דחופה
        </motion.a>
      </section>

      {/* Section B: The Story */}
      <section id="story" className="ambient-glow px-6 py-24 sm:py-32">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-8 text-center">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
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

      {/* Section C: Donation Tiers */}
      <section id="donate" className="ambient-glow px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
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
              <motion.div
                key={tier.title}
                variants={cardItem}
                className="flex flex-col items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-8 text-center shadow-xl backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-[0_0_30px_rgba(253,224,71,0.25)]"
              >
                <span className="text-4xl font-black text-gold drop-shadow-[0_0_10px_rgba(253,224,71,0.4)]">
                  {tier.amount}
                </span>
                <h3 className="text-xl font-bold text-white">{tier.title}</h3>
                <p className="text-gray-400">{tier.desc}</p>
                <motion.a
                  href="#donate"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`mt-auto w-full px-6 py-3 ${goldButton}`}
                >
                  תרמו עכשיו
                </motion.a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 px-6 py-10 text-center text-sm text-gray-500">
        מוסדות &quot;נחלי התורה צפת&quot; &middot; קמפיין מאירים את הגליל
      </footer>
    </main>
  );
}
