"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";

const GOAL = 1_000_000;

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
      className="rounded-2xl border border-gold/25 bg-white/5 p-6 text-center shadow-[0_0_30px_rgba(253,224,71,0.12)] backdrop-blur-md sm:p-8"
    >
      <p className="text-sm text-gray-400">גייסנו עד כה</p>
      <p className="font-display font-black mt-1 text-4xl text-gold sm:text-5xl">
        ₪{displayed.toLocaleString("he-IL")}
      </p>
      <p className="mt-1 text-sm text-gray-400">
        מתוך יעד של ₪{GOAL.toLocaleString("he-IL")}
      </p>

      <div className="mt-5 h-4 w-full overflow-hidden rounded-full border border-white/10 bg-white/5">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
          className="h-full rounded-full bg-gradient-to-r from-yellow-500 via-gold to-yellow-300 shadow-[0_0_15px_rgba(253,224,71,0.6)]"
        />
      </div>
      <p className="mt-2 text-xs text-gray-500">
        {percent.toFixed(1)}% מהיעד
      </p>
    </div>
  );
}
