"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/LanguageProvider";

export default function Navbar() {
  const pathname = usePathname();
  const { t, toggleLanguage } = useLanguage();
  if (pathname?.startsWith("/admin")) return null;

  const links = [
    { href: "#video", label: t.nav.video },
    { href: "#blessing", label: t.nav.blessing },
    { href: "#story", label: t.nav.story },
    { href: "#about", label: t.nav.about },
    { href: "#activities", label: t.nav.activities },
    { href: "#gallery", label: t.nav.gallery },
    { href: "#donate", label: t.nav.donate },
  ];

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/50 backdrop-blur-md"
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-2">
        <a href="#hero" className="block">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="drop-shadow-[0_4px_18px_rgba(253,224,71,0.35)]"
          >
            <Image
              src="/logo2-nav.png"
              alt="מוסדות ברסלב צפת - נחלי התורה"
              width={400}
              height={393}
              className="h-16 w-auto sm:h-20"
            />
          </motion.div>
        </a>
        <ul className="hidden items-center gap-7 text-sm text-gray-300 lg:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="transition-colors duration-200 hover:text-gold"
              >
                {link.label}
              </a>
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
            href="#donate"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-full bg-gradient-to-r from-yellow-500 to-yellow-300 px-5 py-2 text-sm font-bold text-black shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_0_16px_rgba(253,224,71,0.35)]"
          >
            {t.nav.donateNow}
          </motion.a>
        </div>
      </nav>
    </motion.header>
  );
}
