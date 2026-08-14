"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const links = [
  { href: "#blessing", label: "שם לברכה" },
  { href: "#story", label: "הסיפור" },
  { href: "#about", label: "מי אנחנו" },
  { href: "#activities", label: "הפעילויות" },
  { href: "#donate", label: "תרומה" },
];

export default function Navbar() {
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
            whileHover={{ scale: 1.05, rotate: -8 }}
            style={{ rotate: -6 }}
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
        <motion.a
          href="#donate"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="rounded-full bg-gradient-to-r from-yellow-500 to-yellow-300 px-5 py-2 text-sm font-bold text-black shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_0_16px_rgba(253,224,71,0.35)]"
        >
          תרמו עכשיו
        </motion.a>
      </nav>
    </motion.header>
  );
}
