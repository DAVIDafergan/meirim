"use client";

import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";
import { goldButton } from "@/lib/uiConstants";

export default function ThanksContent() {
  const { t } = useLanguage();

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
