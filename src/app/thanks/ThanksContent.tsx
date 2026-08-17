"use client";

import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";

export default function ThanksContent() {
  const { t } = useLanguage();

  return (
    <>
      <span className="text-5xl">🙏</span>
      <h1 className="font-display mt-6 text-3xl text-gold sm:text-4xl">
        {t.thanks.heading}
      </h1>
      <p className="mt-4 max-w-md text-lg leading-relaxed text-gray-300">
        {t.thanks.body}
      </p>
      <Link
        href="/"
        className="mt-10 inline-block rounded-full bg-gradient-to-r from-yellow-500 to-yellow-300 px-8 py-3 font-bold tracking-wide text-black shadow-[0_0_20px_rgba(253,224,71,0.4)]"
      >
        {t.thanks.back}
      </Link>
    </>
  );
}
