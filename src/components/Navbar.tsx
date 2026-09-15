"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "@/components/LanguageProvider";

export default function Navbar() {
  const pathname = usePathname();
  const { t, toggleLanguage } = useLanguage();
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
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/50 backdrop-blur-md"
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-2">
        <Link href="/" className="block">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="drop-shadow-[0_4px_18px_rgba(201,162,39,0.35)]"
          >
            <Image
              src="/logo2-nav.png"
              alt="מוסדות ברסלב צפת - נחלי התורה"
              width={400}
              height={393}
              className="h-16 w-auto sm:h-20"
            />
          </motion.div>
        </Link>
        <ul className="hidden items-center gap-7 text-sm text-gray-300 lg:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="transition-colors duration-200 hover:text-gold"
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
            className="rounded-full border border-gold/30 px-3 py-1.5 text-xs font-bold text-gold transition-colors hover:bg-gold/10"
          >
            {t.languageToggle}
          </button>
          <motion.a
            href="/donate"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden rounded-full bg-gradient-to-r from-[#c9a227] to-[#e6c869] px-5 py-2 text-sm font-bold text-black shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_0_16px_rgba(201,162,39,0.35)] sm:inline-block"
          >
            {t.nav.donateNow}
          </motion.a>
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="תפריט"
            aria-expanded={mobileOpen}
            className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 rounded-full border border-white/15 lg:hidden"
          >
            <span className="h-px w-4 bg-gray-200" />
            <span className="h-px w-4 bg-gray-200" />
            <span className="h-px w-4 bg-gray-200" />
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
            className="flex flex-col gap-1 overflow-hidden border-t border-white/10 px-6 py-3 text-sm text-gray-300 lg:hidden"
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
