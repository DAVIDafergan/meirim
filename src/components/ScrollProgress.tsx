"use client";

import { usePathname } from "next/navigation";
import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const pathname = usePathname();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  if (pathname?.startsWith("/admin")) return null;

  return (
    <motion.div
      style={{ scaleX, transformOrigin: "100% 0%" }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] bg-gradient-to-l from-yellow-300 via-gold to-yellow-600"
    />
  );
}
