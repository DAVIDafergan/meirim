"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cardsContainer, cardItem } from "@/lib/motionVariants";
import { goldButton, outlineButton, cardHover } from "@/lib/uiConstants";
import { useLanguage } from "@/components/LanguageProvider";

export type CourseSummary = {
  slug: string;
  title: string;
  summary: string;
  price: number;
  image: string | null;
};

export default function CoursesGrid({ courses }: { courses: CourseSummary[] }) {
  const { t, language } = useLanguage();
  const locale = language === "he" ? "he-IL" : "en-US";

  if (courses.length === 0) {
    return <p className="py-12 text-center text-foreground-muted">{t.coursesGrid.empty}</p>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={cardsContainer}
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {courses.map((course) => (
        <motion.div
          key={course.slug}
          variants={cardItem}
          className={`flex h-full flex-col overflow-hidden rounded-2xl border-2 border-jewel-purple/15 bg-background ${cardHover}`}
        >
          <div className="aspect-video w-full overflow-hidden bg-jewel-purple">
            {course.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={course.image} alt={course.title} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-jewel-purple to-jewel-wine text-4xl">
                📖
              </div>
            )}
          </div>
          <div className="flex flex-1 flex-col items-start gap-3 p-6 text-start">
            <h3 className="font-display text-lg font-bold text-jewel-purple">{course.title}</h3>
            <p className="line-clamp-3 flex-1 text-sm text-foreground-muted">{course.summary}</p>
            <span className="font-display text-2xl font-bold text-gold">
              ₪{course.price.toLocaleString(locale)}
            </span>
            <div className="mt-2 flex w-full flex-col gap-2">
              <Link
                href={`/courses/${course.slug}`}
                className={`px-4 py-2 text-center text-sm text-jewel-purple ${outlineButton}`}
              >
                {t.coursesGrid.details}
              </Link>
              <Link
                href={`/courses/${course.slug}`}
                className={`px-4 py-2 text-center text-sm ${goldButton}`}
              >
                {t.coursesGrid.buyNow}
              </Link>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
