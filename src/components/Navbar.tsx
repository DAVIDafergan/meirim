"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "@/components/LanguageProvider";
import { goldButton } from "@/lib/uiConstants";

export default function Navbar() {
  const pathname = usePathname();
  const { t, language, toggleLanguage } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  if (pathname?.startsWith("/admin")) return null;

  const links = [
    { href: "/#about", label: t.nav.about },
    { href: "/departments", label: t.nav.activities },
    { href: "/#gallery", label: t.nav.gallery },
    { href: "/donate", label: t.nav.donate },
  ];

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50 border-b-2 border-gold/70 bg-background/95 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <Link href="/" className="block">
          <Image
            src="/logo2-nav.png"
            alt={
              language === "he"
                ? "מוסדות ברסלב צפת - נחלי התורה"
                : "Nachalei HaTorah Breslov Institutions, Tzfat"
            }
            width={400}
            height={393}
            className="h-14 w-auto sm:h-16"
          />
        </Link>
        <ul className="hidden items-center gap-8 text-sm text-foreground-muted lg:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="nav-link transition-colors duration-200 hover:text-gold"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleLanguage}
            className="rounded-full border border-line px-3 py-1.5 text-xs font-bold text-foreground-muted transition-colors hover:border-gold hover:text-gold"
          >
            {t.languageToggle}
          </button>
          <Link href="/donate" className={`hidden px-5 py-2 text-sm sm:inline-block ${goldButton}`}>
            {t.nav.donateNow}
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={t.nav.menu}
            aria-expanded={mobileOpen}
            className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 rounded-full border border-line lg:hidden"
          >
            <span className="h-px w-4 bg-foreground" />
            <span className="h-px w-4 bg-foreground" />
            <span className="h-px w-4 bg-foreground" />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col gap-1 overflow-hidden border-t border-line px-6 py-3 text-sm text-foreground-muted lg:hidden"
          >
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block py-2 transition-colors duration-200 hover:text-gold"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/donate"
                onClick={() => setMobileOpen(false)}
                className="block py-2 font-bold text-gold"
              >
                {t.nav.donateNow}
              </Link>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
