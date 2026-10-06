"use client";

import { useState } from "react";
import Kicker from "@/components/Kicker";
import { useLanguage } from "@/components/LanguageProvider";
import { outlineButton, goldButton } from "@/lib/uiConstants";

// TODO: replace with the real link once it's confirmed / a Nedarim Plus
// international-card flow is set up, per the Rav's request to point overseas
// supporters at their shulspace.org donation page.
const ABROAD_DONATE_URL = "https://shulspace.org/toda-el/donate";

// Zelle (US bank-to-bank transfer) recipient, provided directly by the Rav
// for American supporters - Zelle has no "pay" link, just a recipient
// email/phone shown inside the donor's own banking app.
const ZELLE_EMAIL = "a0533123058@gmail.com";

/**
 * The overseas-donor panel (shulspace.org card link + Zelle email). Reused on
 * the homepage and the /donate page.
 *
 * `prominent`: shown for English-speaking visitors, who are assumed to be
 * mostly US-based - renders as the lead donation option (solid gold CTA,
 * heavier card) rather than the secondary block Hebrew visitors see.
 */
export default function AbroadDonation({ prominent = false }: { prominent?: boolean }) {
  const { t } = useLanguage();
  const [zelleCopied, setZelleCopied] = useState(false);

  function copyZelleEmail() {
    navigator.clipboard?.writeText(ZELLE_EMAIL).then(() => {
      setZelleCopied(true);
      setTimeout(() => setZelleCopied(false), 2000);
    });
  }

  return (
    <div
      className={`mx-auto flex w-full max-w-2xl flex-col items-center gap-3 rounded-2xl px-6 py-8 text-center ${
        prominent
          ? "border-2 border-gold bg-jewel-purple text-cream"
          : "border border-line bg-background-alt text-foreground"
      }`}
    >
      <Kicker>{t.abroad.kicker}</Kicker>
      <h3 className={`font-display text-2xl font-bold ${prominent ? "text-cream" : "text-jewel-purple"}`}>
        {t.abroad.heading}
      </h3>
      <p className={prominent ? "text-cream/80" : "text-foreground-muted"}>{t.abroad.body}</p>
      <a
        href={ABROAD_DONATE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={
          prominent
            ? `mt-2 px-8 py-3 ${goldButton}`
            : `mt-2 px-8 py-3 text-jewel-purple ${outlineButton}`
        }
      >
        {t.abroad.cta}
      </a>

      <div className={`mt-6 w-full border-t pt-6 ${prominent ? "border-cream/20" : "border-line"}`}>
        <h4 className={`font-display text-lg font-bold ${prominent ? "text-cream" : "text-jewel-purple"}`}>
          {t.abroad.zelleHeading}
        </h4>
        <p className={`mt-2 text-sm ${prominent ? "text-cream/80" : "text-foreground-muted"}`}>
          {t.abroad.zelleNote}
        </p>
        <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
          <span
            dir="ltr"
            className={`rounded-full px-4 py-2 font-mono text-sm ${
              prominent ? "bg-white/10 text-cream" : "bg-background text-foreground"
            }`}
          >
            {ZELLE_EMAIL}
          </span>
          <button
            type="button"
            onClick={copyZelleEmail}
            className={
              prominent
                ? "rounded-full border border-cream/50 px-4 py-2 text-xs text-cream transition-opacity hover:opacity-70"
                : `px-4 py-2 text-xs text-jewel-purple ${outlineButton}`
            }
          >
            {zelleCopied ? t.abroad.zelleCopied : t.abroad.zelleCopy}
          </button>
        </div>
      </div>
    </div>
  );
}
