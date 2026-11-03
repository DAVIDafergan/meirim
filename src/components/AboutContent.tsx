"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Kicker from "@/components/Kicker";
import { useLanguage } from "@/components/LanguageProvider";
import YoutubeFeed from "@/components/YoutubeFeed";
import { fadeUp } from "@/lib/motionVariants";
import { goldButton, outlineButton } from "@/lib/uiConstants";

type Block = { title: string; text: string };

const CONTENT = {
  he: {
    kicker: "אודות",
    heading: 'מוסדות ברסלב "נחלי התורה"',
    lead:
      "בלב העיר העתיקה בצפת, עיר הקודש, פועלים מוסדות ברסלב ״נחלי התורה״ – בית לילדים, לבחורים ולאברכים שבוחרים ללמוד תורה ולהאיר אותה הלאה. כל פעילותם מתקיימת בהנהגת הגאון הרב נתן מרדכי ישראל שליט״א.",
    institutionsKicker: "המוסדות",
    institutionsHeading: "כל מה שפועל תחת קורת גג אחת",
    institutions: [
      { title: "תלמוד תורה", text: "חינוך טהור לילדי צפת – לימוד תורה, יראת שמים ומידות טובות, בסביבה חמה ומאירה. מאות תלמידים למדו בין כתליו." },
      { title: "ישיבה", text: "בחורים שמתמידים בלימוד, מסיימים מסכתות ומקבלים הוקרה והדרכה אישית." },
      { title: "כולל אברכים", text: "מסגרת לאברכים הלומדים תורה כל היום, כולל מלגות תמיכה, כך שיוכלו להתמסר ללימוד בלב שלם." },
      { title: "קירוב ופעילות קהילתית", text: "מסגרות לחוזרים בתשובה, מדרשה לבנות, חוגים ופעילות תרבותית למשפחות – יד מושטת לכל מי שמבקש להתקרב." },
    ] as Block[],
    ravKicker: "הרב",
    ravHeading: 'הגאון הרב נתן מרדכי ישראל שליט"א',
    ravText: [
      'הגאון הרב נתן מרדכי ישראל שליט״א הוא ראש מוסדות ברסלב ״נחלי התורה״ ורב הקהילה בצפת.',
      "הרב מלווה את תלמידי המוסדות באופן אישי: בטקסי ההוקרה הוא מברך כל תלמיד וכותב לו הדגשה אישית כאות הצטיינות. מדי חודש הוא עולה להשתטח על ציון התנא רבי שמעון בר יוחאי במירון, ולוקח עמו את שמות השותפים.",
      "בשיעוריו ובקורסיו מקרב הרב את תורת ברסלב ואת דרכה של שמחה, תפילה והתבודדות לכל יהודי.",
    ],
    eventKicker: "מהשטח",
    eventHeading: "תעודות הוקרה לתלמידי הישיבה והת״ת",
    eventText:
      "בכ״ז בשבט תשפ״ה נערך במוסדות מעמד לכבוד התורה ולומדיה: תלמידי הישיבה וילדי התלמוד תורה שסיימו מסכת קיבלו תעודות הוקרה, וכל אחד זכה לברכה אישית מהרב.",
    legalKicker: "פרטי העמותה",
    legalText:
      'המוסדות פועלים כעמותה רשומה בשם ״מוסדות ברסלב נחלי התורה (ע״ר)״, מספר עמותה 580785392. מטרתה המרכזית: קירוב רחוקים, לצד הקמה והפעלה של מוסדות חינוך, כולל אברכים ומלגות.',
    followKicker: "בכל מקום",
    followHeading: "הצטרפו אלינו",
    videoKicker: "שיעורים וסרטונים",
    videoHeading: "מפי הרב – הסרטונים האחרונים",
    ctaDonate: "לשותפות ותרומה",
    ctaLessons: "לשיעורים",
  },
  en: {
    kicker: "About",
    heading: 'Breslov Institutions "Nachalei HaTorah"',
    lead:
      "In the heart of the Old City of Tzfat, the holy city, the Breslov institutions Nachalei HaTorah are a home for children, young men and kollel scholars who choose to learn Torah and spread its light. Everything is led by Rabbi Nathan Mordechai Israel shlita.",
    institutionsKicker: "The institutions",
    institutionsHeading: "Everything under one roof",
    institutions: [
      { title: "Talmud Torah", text: "A pure Torah education for the children of Tzfat – Torah, reverence and good character in a warm, bright environment. Hundreds of students have learned here." },
      { title: "Yeshiva", text: "Young men who persevere in learning, complete tractates and receive recognition and personal guidance." },
      { title: "Kollel", text: "A framework for full-time scholars, including stipends so they can dedicate themselves wholeheartedly to learning." },
      { title: "Outreach & community", text: "Programs for those returning to Torah observance, a women's midrasha, classes and cultural activities for families – an open hand to anyone seeking to draw closer." },
    ] as Block[],
    ravKicker: "The Rabbi",
    ravHeading: "Rabbi Nathan Mordechai Israel shlita",
    ravText: [
      "Rabbi Nathan Mordechai Israel shlita heads the Breslov institutions Nachalei HaTorah and serves as the community rabbi of Tzfat.",
      "The Rabbi accompanies the students personally: at recognition ceremonies he blesses each student and writes a personal note of distinction. Every month he travels to pray at the tomb of Rabbi Shimon bar Yochai in Meron, carrying the names of the partners.",
      "In his lessons and courses he brings the teachings of Breslov – joy, prayer and personal meditation – to every Jew.",
    ],
    eventKicker: "From the field",
    eventHeading: "Certificates of recognition for yeshiva and Talmud Torah students",
    eventText:
      "On 27 Shevat 5785 the institutions held a gathering in honor of Torah and its learners: yeshiva students and Talmud Torah children who completed a tractate received certificates, each with a personal blessing from the Rabbi.",
    legalKicker: "Registered nonprofit",
    legalText:
      'The institutions operate as a registered nonprofit, "Mosdot Breslov Nachalei HaTorah (R.A.)", registration no. 580785392. Its central aim is outreach, alongside establishing and running educational institutions, a kollel and scholarships.',
    followKicker: "Everywhere",
    followHeading: "Join us",
    videoKicker: "Lessons & videos",
    videoHeading: "From the Rabbi – latest videos",
    ctaDonate: "Partner & donate",
    ctaLessons: "Watch lessons",
  },
} as const;

const links = [
  { label: "WhatsApp", href: "https://chat.whatsapp.com/I9fkagnrPLCKsYEDZvMwfa" },
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61552477960447" },
  { label: "TikTok", href: "https://www.tiktok.com/@haravnatan" },
];

export default function AboutContent() {
  const { language } = useLanguage();
  const c = CONTENT[language === "he" ? "he" : "en"];
  const reveal = { initial: "hidden", whileInView: "visible", viewport: { once: true, amount: 0.25 }, variants: fadeUp } as const;

  return (
    <main className="relative flex-1">
      <section className="night relative overflow-hidden px-6 pb-24 pt-36 sm:pt-44">
        <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-7 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}><Kicker>{c.kicker}</Kicker></motion.div>
          <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight gold-text sm:text-6xl md:text-7xl">{c.heading}</h1>
          <motion.p initial="hidden" animate="visible" variants={fadeUp} className="text-lg leading-loose text-cream/80 sm:text-2xl">{c.lead}</motion.p>
        </div>
      </section>

      <section className="px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <motion.div {...reveal} className="mb-14 flex flex-col items-center gap-5 text-center">
            <Kicker>{c.institutionsKicker}</Kicker>
            <h2 className="font-display text-4xl font-bold leading-snug text-jewel-purple sm:text-5xl">{c.institutionsHeading}</h2>
          </motion.div>
          <div className="grid gap-6 sm:grid-cols-2">
            {c.institutions.map((b, i) => (
              <motion.article key={b.title} {...reveal} className="relative overflow-hidden rounded-3xl bg-white p-8 shadow-sm ring-1 ring-black/5 sm:p-10">
                <span className="font-display text-7xl font-black leading-none text-transparent [-webkit-text-stroke:1.5px_rgba(212,166,60,0.7)]" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 font-display text-2xl font-bold text-jewel-purple sm:text-3xl">{b.title}</h3>
                <p className="mt-3 text-lg leading-relaxed text-foreground-muted">{b.text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="night relative overflow-hidden px-6 py-24 sm:py-32">
        <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-7 text-center">
          <motion.div {...reveal}><Kicker>{c.ravKicker}</Kicker></motion.div>
          <h2 className="font-display text-4xl font-bold leading-tight gold-text sm:text-6xl">{c.ravHeading}</h2>
          {c.ravText.map((p) => (
            <motion.p key={p} {...reveal} className="text-lg leading-loose text-cream/80 sm:text-xl">{p}</motion.p>
          ))}
        </div>
      </section>

      <section className="px-6 py-24 sm:py-32">
        <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-2">
          <motion.div {...reveal} className="flex flex-col gap-4">
            <Kicker>{c.eventKicker}</Kicker>
            <h2 className="font-display text-3xl font-bold leading-snug text-jewel-purple sm:text-4xl">{c.eventHeading}</h2>
            <p className="text-lg leading-relaxed text-foreground-muted">{c.eventText}</p>
          </motion.div>
          <motion.div {...reveal} className="flex flex-col gap-4 rounded-3xl bg-white p-8 shadow-sm ring-1 ring-black/5">
            <Kicker>{c.legalKicker}</Kicker>
            <p className="text-lg leading-relaxed text-foreground-muted">{c.legalText}</p>
          </motion.div>
        </div>
      </section>

      <section className="night relative overflow-hidden px-6 py-24 sm:py-32">
        <div className="relative mx-auto max-w-5xl">
          <motion.div {...reveal} className="mb-12 flex flex-col items-center gap-5 text-center">
            <Kicker>{c.videoKicker}</Kicker>
            <h2 className="font-display text-4xl font-bold leading-snug gold-text sm:text-5xl">{c.videoHeading}</h2>
          </motion.div>
          <YoutubeFeed />
        </div>
      </section>

      <section className="night relative overflow-hidden px-6 py-24 text-center sm:py-28">
        <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-7">
          <Kicker>{c.followKicker}</Kicker>
          <h2 className="font-display text-4xl font-bold gold-text sm:text-5xl">{c.followHeading}</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {links.map((l) => (
              <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className={`px-6 py-3 ${outlineButton}`}>{l.label}</a>
            ))}
          </div>
          <div className="mt-2 flex flex-wrap justify-center gap-3">
            <Link href="/donate" className={`px-8 py-3 ${goldButton}`}>{c.ctaDonate}</Link>
            <Link href="/lessons" className={`px-8 py-3 ${outlineButton}`}>{c.ctaLessons}</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
