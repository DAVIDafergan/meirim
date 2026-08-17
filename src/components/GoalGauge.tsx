"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";

const GOAL = 1_000_000;
const SPARK_COUNT = 7;
const sparks = Array.from({ length: SPARK_COUNT }).map((_, i) => ({
  id: i,
  left: 8 + ((i * 37) % 84),
  size: 3 + (i % 3),
  duration: 2.2 + (i % 4) * 0.5,
  delay: (i % SPARK_COUNT) * 0.35,
}));

export default function GoalGauge() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });
  const [total, setTotal] = useState<number | null>(null);
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    fetch("/api/donations/summary")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && typeof data.total === "number") setTotal(data.total);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!isInView || total === null) return;
    const controls = animate(0, total, {
      duration: 2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(v) {
        setDisplayed(Math.round(v));
      },
    });
    return () => controls.stop();
  }, [isInView, total]);

  const percent = total === null ? 0 : Math.min(100, (total / GOAL) * 100);

  return (
    <div
      ref={ref}
      className="relative overflow-hidden rounded-3xl border border-gold/30 bg-gradient-to-b from-purple-box/60 via-[#1a1025]/90 to-purple-deep/90 p-6 text-center shadow-[0_0_50px_rgba(253,224,71,0.18)] backdrop-blur-md sm:p-8"
    >
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="hero-glow absolute inset-0" />
      </div>

      <div className="relative">
        <span className="kicker">יחד מתקדמים ליעד</span>

        <p className="mt-3 font-display font-black text-5xl text-gold drop-shadow-[0_0_18px_rgba(253,224,71,0.5)] sm:text-6xl">
          ₪{displayed.toLocaleString("he-IL")}
        </p>
        <p className="mt-1 text-sm text-gray-300">
          גייסנו עד כה &middot; מתוך יעד של ₪{GOAL.toLocaleString("he-IL")}
        </p>

        <div
          dir="ltr"
          className="relative mt-6 h-6 w-full overflow-hidden rounded-full border border-white/10 bg-white/5"
        >
          {/* Milestone ticks, measured from the left - the fixed anchor the
              fill grows away from in this forced-LTR track */}
          <div className="pointer-events-none absolute inset-0 z-10">
            {[25, 50, 75].map((m) => (
              <span
                key={m}
                className="absolute top-0 h-full w-px bg-black/30"
                style={{ left: `${m}%` }}
              />
            ))}
          </div>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percent}%` }}
            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
            className="relative h-full overflow-hidden rounded-full bg-gradient-to-r from-yellow-500 via-gold to-yellow-300 shadow-[0_0_20px_rgba(253,224,71,0.7)]"
          >
            {/* Rising sparks inside the filled portion */}
            {sparks.map((s) => (
              <motion.span
                key={s.id}
                className="absolute rounded-full bg-white"
                style={{
                  left: `${s.left}%`,
                  bottom: 0,
                  width: s.size,
                  height: s.size,
                  boxShadow: "0 0 6px 2px rgba(255,255,255,0.9)",
                }}
                animate={{ y: [0, -22], opacity: [0, 1, 0] }}
                transition={{
                  duration: s.duration,
                  delay: s.delay,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              />
            ))}

            {/* Pulsing glow marker at the leading (growing) edge */}
            <motion.span
              className="absolute -right-1.5 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-white shadow-[0_0_16px_6px_rgba(253,224,71,0.9)]"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </div>

        <div className="mt-3 flex items-center justify-between text-xs text-gray-400">
          <span>{percent.toFixed(1)}% מהיעד</span>
          <span className="text-gold/80">כל תרומה מקרבת אותנו!</span>
        </div>
      </div>
    </div>
  );
}
