"use client";

import { motion } from "framer-motion";

const EMBER_COUNT = 16;

const embers = Array.from({ length: EMBER_COUNT }).map((_, i) => ({
  id: i,
  left: (i * 61.8) % 100,
  size: 2 + (i % 4),
  duration: 6 + (i % 5) * 1.4,
  delay: (i % 7) * 0.9,
  drift: (i % 2 === 0 ? 1 : -1) * (10 + (i % 3) * 8),
}));

export default function FloatingEmbers() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {embers.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-gold"
          style={{
            left: `${p.left}%`,
            bottom: "-5%",
            width: p.size,
            height: p.size,
            boxShadow: "0 0 8px 2px rgba(253,224,71,0.8)",
          }}
          animate={{
            y: ["0vh", "-115vh"],
            x: [0, p.drift],
            opacity: [0, 0.9, 0.9, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
