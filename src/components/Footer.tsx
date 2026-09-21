"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";

const socials = [
  { label: "WhatsApp", href: "https://chat.whatsapp.com/I9fkagnrPLCKsYEDZvMwfa" },
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61552477960447" },
  { label: "TikTok", href: "https://www.tiktok.com/@haravnatan" },
];

export default function Footer() {
  const { t, language } = useLanguage();
  const links = [
    { href: "/#about", label: t.nav.about },
    { href: "/departments", label: t.nav.activities },
    { href: "/#gallery", label: t.nav.gallery },
    { href: "/donate", label: t.nav.donate },
  ];
  const colTitle = "mb-5 font-display text-lg font-bold text-gold";
  const link = "text-cream/70 transition-colors hover:text-gold";

  return (
    <footer className="bg-ink text-cream">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-[1.5fr_1fr_1fr]">
        <div className="flex flex-col items-start gap-5">
          <Image src="/logo2.svg" alt="" width={120} height={120} className="h-auto w-24" />
          <p className="max-w-sm leading-loose text-cream/70">{t.footer.text}</p>
        </div>
        <div>
          <h4 className={colTitle}>{language === "he" ? "ניווט" : "Navigate"}</h4>
          <ul className="flex flex-col gap-3">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={link}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className={colTitle}>{language === "he" ? "הישארו מחוברים" : "Stay Connected"}</h4>
          <ul className="flex flex-col gap-3">
            {socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className={link}>{s.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 px-6 py-5 text-center text-xs text-cream/40">
        <Link href="/admin" className="transition-colors hover:text-cream/70">{t.footer.admin}</Link>
      </div>
    </footer>
  );
}
