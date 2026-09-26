"use client";

import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";
import { goldButton } from "@/lib/uiConstants";
import { nedarimPlusUrl } from "@/lib/nedarim";

type Course = {
  slug: string;
  title: string;
  summary: string;
  description: string | null;
  price: number;
  image: string | null;
  analyticTag: string;
};

export default function CourseDetailContent({ course }: { course: Course }) {
  const { t, language } = useLanguage();
  const locale = language === "he" ? "he-IL" : "en-US";

  const buyUrl = nedarimPlusUrl({
    amount: course.price,
    lock: true,
    groupe: `קורס: ${course.title}`,
    analytic: course.analyticTag,
    redirectPath: `/thanks?course=${encodeURIComponent(course.slug)}`,
  });

  return (
    <div className="mx-auto max-w-3xl px-6 py-28 sm:py-32">
      <Link href="/courses" className="text-sm font-bold text-jewel-purple hover:text-gold">
        {t.courseDetail.back}
      </Link>

      <div className="mt-6 overflow-hidden rounded-3xl bg-jewel-purple">
        <div className="aspect-video w-full">
          {course.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={course.image} alt={course.title} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-jewel-purple to-jewel-wine text-6xl">
              📖
            </div>
          )}
        </div>
      </div>

      <h1 className="mt-8 font-display text-3xl font-bold text-jewel-purple sm:text-4xl">
        {course.title}
      </h1>
      <p className="mt-4 text-lg leading-loose text-foreground-muted">{course.summary}</p>
      {course.description && (
        <p className="mt-4 whitespace-pre-line text-base leading-loose text-foreground-muted">
          {course.description}
        </p>
      )}

      <div className="mt-10 flex flex-col items-start gap-4 rounded-2xl border-2 border-gold/40 bg-background-alt p-6 sm:flex-row sm:items-center sm:justify-between">
        <span className="font-display text-3xl font-bold text-gold">
          ₪{course.price.toLocaleString(locale)}
        </span>
        <a href={buyUrl} className={`w-full px-10 py-4 text-center text-lg sm:w-auto ${goldButton}`}>
          {t.courseDetail.buyNow}
        </a>
      </div>
    </div>
  );
}
