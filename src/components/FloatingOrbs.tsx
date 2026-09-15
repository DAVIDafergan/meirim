"use client";

import { motion } from "framer-motion";

const orbs = [
  { size: 380, color: "rgba(201,162,39,0.16)", top: "5%", left: "-8%", dur: 19, mobile: true },
  { size: 340, color: "rgba(107,31,42,0.5)", top: "45%", left: "78%", dur: 23, mobile: false },
  { size: 280, color: "rgba(154,110,20,0.22)", top: "78%", left: "5%", dur: 21, mobile: false },
];

export default function FloatingOrbs() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {orbs.map((o, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full blur-2xl ${o.mobile ? "" : "hidden sm:block"}`}
          style={{
            width: o.size,
            height: o.size,
            top: o.top,
            left: o.left,
            backgroundColor: o.color,
          }}
          animate={{ x: [0, 50, -25, 0], y: [0, -35, 25, 0] }}
          transition={{ duration: o.dur, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}
