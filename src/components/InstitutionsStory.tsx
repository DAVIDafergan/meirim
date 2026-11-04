"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Kicker from "@/components/Kicker";
import { useLanguage } from "@/components/LanguageProvider";
import { fadeUp } from "@/lib/motionVariants";
import { goldButton } from "@/lib/uiConstants";

type Step = { time: string; title: string; text: string; photo: string };
type Person = { name: string; role: string };

const COPY = {
  he: {
    kicker: "יום במוסדות",
    heading: "כך נראה היום שלנו, מהשער ועד הכולל",
    lead: "מאות ילדים, בחורים ואברכים עוברים כאן מדי יום בין הגן, התלמוד תורה, הישיבה והכולל. הנה מה שרואים כשנכנסים פנימה.",
    steps: [
      { time: "שמונה בבוקר", title: "בשער", text: "ההורים מפקידים בידינו את היקר להם מכל, והצוות החינוכי מקבל כל ילד בחיוך ומוודא שהיום מתחיל כמו שצריך. כל ילד מקבל כאן ארוחת בוקר, עוד לפני שהשיעור הראשון מתחיל.", photo: "/media/tt-building.jpg" },
      { time: "בגנים", title: "חממה של קדושה וערכים", text: "בגני הילדים, לבנים ולבנות, גדלים הדורות הראשונים של התמימות. סביבה חמה ומסודרת שבונה אישיות, ושמכוונת כבר מהגיל הרך את אימהות העתיד ואבות העתיד.", photo: "/media/gan-wall.jpg" },
      { time: "בתלמוד תורה", title: "חום ואהבת תורה טהורה", text: "מחנכים שמכירים כל ילד ונוגעים בו בכל נקודה, בכל זמן. התלמוד תורה בונה את עולמם הרוחני של הילדים ביחס אישי וביראת שמים, ופועל לצידו בית חינוך לבנות.", photo: "/media/tt-yard.jpg" },
      { time: "בישיבה", title: "עומק בלימוד", text: "הבחורים לומדים שלושה סדרים מלאים של תורה, ביגיעה ובהתמדה. שילוב ייחודי של לימוד עמוק, בניית האישיות וחוויית עלייה יומיומית.", photo: "/media/yeshiva-hall.jpg" },
      { time: "בכולל", title: "עד עלות השחר", text: "האברכים הוגים בעיון בתורת הקבלה ובליקוטי מוהר״ן עד עלות השחר, וצומחים לבעלי הוראה ולמורי דרך.", photo: "/media/kollel-chavrusa2.jpg" },
      { time: "מצפת לקצוות תבל", title: "מפעל חיים", text: "מעבר לכותלי המוסדות, פעילות קירוב וזיכוי הרבים מגיעה מצפת עד לקהילות רחוקות בעולם, מפעל חיים אדיר שמתפרש לכל מקום שבו יש יהודי שמחפש.", photo: "/media/campus-aerial.jpg" },
    ] as Step[],
    teamKicker: "הצוות",
    teamHeading: "מי שעומד מאחורי הדברים",
    team: [
      { name: 'הגאון הרב נתן מרדכי ישראל שליט"א', role: "ראש המוסדות" },
      { name: 'הרב שמעון אלישיב שליט"א', role: "מנהל התלמוד תורה" },
      { name: 'הרה"ח דוד שלמה שליט"א', role: "מנהל הישיבה" },
      { name: 'הרב רונן עמוס שליט"א', role: "מחנך כיתה ז׳" },
    ] as Person[],
    ctaHeading: "יש לכם זכות להיות שותפים",
    ctaText: "הצלחת המוסדות היא בזכות הנתינה. כל שותפות, קטנה כגדולה, נשארת לזכותכם ולזכות בני ביתכם, ובכל לימוד תורה שנלמד כאן.",
    cta: "לשותפות ותרומה",
  },
  en: {
    kicker: "A day at the institutions",
    heading: "What our day looks like, from the gate to the kollel",
    lead: "Hundreds of children, young men and scholars pass here every day between the kindergarten, the Talmud Torah, the yeshiva and the kollel. Here is what you see when you walk in.",
    steps: [
      { time: "Eight in the morning", title: "At the gate", text: "Parents entrust us with what is most precious to them, and the educational staff greets every child with a smile and makes sure the day starts right. Every child is given breakfast before the first lesson begins.", photo: "/media/tt-building.jpg" },
      { time: "In the kindergartens", title: "A greenhouse of holiness and values", text: "In the boys' and girls' kindergartens the first generations of innocence grow up: a warm, orderly environment that builds character from the earliest age.", photo: "/media/gan-wall.jpg" },
      { time: "In the Talmud Torah", title: "Warmth and a pure love of Torah", text: "Educators who know every child and reach him at every point, at every time. The Talmud Torah builds the children's spiritual world with personal attention and reverence, and a girls' school operates alongside it.", photo: "/media/tt-yard.jpg" },
      { time: "In the yeshiva", title: "Depth in learning", text: "The young men learn three full sedarim of Torah with diligence and perseverance, a unique combination of deep study, character building and a daily experience of growth.", photo: "/media/yeshiva-hall.jpg" },
      { time: "In the kollel", title: "Until the break of dawn", text: "The scholars delve into the Kabbalah and the Likutey Moharan until dawn, growing into halachic authorities and guides.", photo: "/media/kollel-chavrusa2.jpg" },
      { time: "From Tzfat to the ends of the earth", title: "A life's work", text: "Beyond the walls of the institutions, outreach activity reaches from Tzfat to far-off communities: a vast life's work that extends to every place where a Jew is searching.", photo: "/media/campus-aerial.jpg" },
    ] as Step[],
    teamKicker: "The team",
    teamHeading: "Who stands behind it",
    team: [
      { name: "Rabbi Nathan Mordechai Israel shlita", role: "Head of the institutions" },
      { name: "Rabbi Shimon Elishiv shlita", role: "Director of the Talmud Torah" },
      { name: "Rabbi David Shlomo shlita", role: "Director of the yeshiva" },
      { name: "Rabbi Ronen Amos shlita", role: "7th-grade educator" },
    ] as Person[],
    ctaHeading: "You have the privilege of partnering",
    ctaText: "The institutions' success is thanks to giving. Every partnership, small or large, stays to your credit and to the credit of your household, and in every Torah learned here.",
    cta: "Partner & donate",
  },
};

export default function InstitutionsStory() {
  const { language } = useLanguage();
  const c = COPY[language === "he" ? "he" : "en"];
  const reveal = { initial: "hidden", whileInView: "visible", viewport: { once: true, amount: 0.2 }, variants: fadeUp } as const;

  return (
    <>
      <section className="px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <motion.div {...reveal} className="mx-auto mb-16 flex max-w-3xl flex-col items-center gap-5 text-center">
            <Kicker>{c.kicker}</Kicker>
            <h2 className="font-display text-4xl font-bold leading-snug text-jewel-purple sm:text-5xl">{c.heading}</h2>
            <p className="text-lg leading-relaxed text-foreground-muted sm:text-xl">{c.lead}</p>
          </motion.div>
          <div className="flex flex-col gap-16 sm:gap-24">
            {c.steps.map((s, i) => (
              <motion.article key={s.title} {...reveal} className={`grid items-center gap-8 md:grid-cols-2 md:gap-14 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.photo} alt={s.title} loading="lazy" className="aspect-[16/10] w-full rounded-3xl object-cover shadow-sm ring-1 ring-black/5" />
                <div className="flex flex-col gap-3">
                  <span className="font-display text-sm font-bold tracking-wide text-gold-deep">{s.time}</span>
                  <h3 className="font-display text-3xl font-bold leading-snug text-jewel-purple sm:text-4xl">{s.title}</h3>
                  <p className="text-lg leading-relaxed text-foreground-muted">{s.text}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="surface-alt px-6 py-24 sm:py-28">
        <div className="mx-auto max-w-5xl">
          <motion.div {...reveal} className="mb-12 flex flex-col items-center gap-4 text-center">
            <Kicker>{c.teamKicker}</Kicker>
            <h2 className="font-display text-4xl font-bold leading-snug text-jewel-purple sm:text-5xl">{c.teamHeading}</h2>
          </motion.div>
          <div className="grid gap-5 sm:grid-cols-2">
            {c.team.map((p) => (
              <motion.div key={p.name} {...reveal} className="rounded-3xl bg-white p-7 text-center shadow-sm ring-1 ring-black/5">
                <p className="font-display text-xl font-bold text-jewel-purple sm:text-2xl">{p.name}</p>
                <p className="mt-1 text-foreground-muted">{p.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="night relative overflow-hidden px-6 py-24 sm:py-28">
        <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
          <motion.h2 {...reveal} className="font-display text-4xl font-bold leading-tight gold-text sm:text-5xl">{c.ctaHeading}</motion.h2>
          <motion.p {...reveal} className="text-lg leading-loose text-cream/80 sm:text-xl">{c.ctaText}</motion.p>
          <Link href="/donate" className={`px-12 py-4 text-lg ${goldButton}`}>{c.cta}</Link>
        </div>
      </section>
    </>
  );
}
