"use client";

import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";
import { goldButton } from "@/lib/uiConstants";

type Course = { title: string; accessContent: string } | null;

const isUrl = (s: string) => /^https?:\/\//i.test(s.trim());

export default function ThanksContent({ course }: { course?: Course }) {
  const { t } = useLanguage();

  if (course) {
    return (
      <>
        <span className="text-5xl">🎉</span>
        <h1 className="font-display mt-6 text-3xl text-foreground sm:text-4xl">
          {t.courseThanks.heading}
        </h1>
        <p className="mt-2 text-lg text-foreground-muted">{course.title}</p>

        <div className="mt-8 flex w-full max-w-md flex-col items-center gap-4 rounded-2xl border-2 border-gold/40 bg-background-alt p-6">
          <p className="font-bold text-foreground">{t.courseThanks.accessIntro}</p>
          {isUrl(course.accessContent) ? (
            <a
              href={course.accessContent}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-full px-6 py-3 ${goldButton}`}
            >
              {t.courseThanks.openLink}
            </a>
          ) : (
            <p className="whitespace-pre-line text-foreground-muted">{course.accessContent}</p>
          )}
        </div>
        <p className="mt-4 max-w-sm text-sm text-foreground-muted">{t.courseThanks.note}</p>

        <Link href="/" className={`mt-8 inline-block px-8 py-3 ${goldButton}`}>
          {t.thanks.back}
        </Link>
      </>
    );
  }

  return (
    <>
      <span className="text-5xl">🙏</span>
      <h1 className="font-display mt-6 text-3xl text-foreground sm:text-4xl">
        {t.thanks.heading}
      </h1>
      <p className="mt-4 max-w-md text-lg leading-relaxed text-foreground-muted">
        {t.thanks.body}
      </p>
      <Link href="/" className={`mt-10 inline-block px-8 py-3 ${goldButton}`}>
        {t.thanks.back}
      </Link>
    </>
  );
}
