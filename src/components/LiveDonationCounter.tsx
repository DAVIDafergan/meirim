"use client";

import { useEffect, useRef, useState } from "react";
import { motion, animate, useInView } from "framer-motion";
import { useLanguage } from "@/components/LanguageProvider";

export default function LiveDonationCounter() {
  const { t, language } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });
  const [total, setTotal] = useState<number | null>(null);
  const [displayed, setDisplayed] = useState(0);
  const displayedRef = useRef(0);

  useEffect(() => {
    let cancelled = false;
    async function poll() {
      try {
        const res = await fetch("/api/donations/live");
        if (!res.ok) return;
        const data = await res.json();
        if (!cancelled && typeof data.total === "number") setTotal(data.total);
      } catch {}
    }
    poll();
    const interval = setInterval(poll, 15000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (!isInView || total === null) return;
    const controls = animate(displayedRef.current, total, {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(v) {
        displayedRef.current = v;
        setDisplayed(Math.round(v));
      },
    });
    return () => controls.stop();
  }, [isInView, total]);

  return (
    <div ref={ref} style={{ perspective: 900 }}>
      <motion.div
        animate={{ rotateY: [-4, 4, -4], rotateX: [2, -2, 2] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative flex items-center gap-3 rounded-2xl border border-gold/30 bg-gradient-to-br from-purple-box/70 via-[#1a1025]/90 to-purple-deep/80 px-5 py-3.5 shadow-[0_14px_34px_rgba(0,0,0,0.5),0_0_25px_rgba(253,224,71,0.2)] backdrop-blur-md"
      >
        <span className="relative flex h-2.5 w-2.5 shrink-0">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
        </span>
        <div>
          <p className="text-[11px] tracking-wide text-gray-300">
            {t.liveCounter.label}
          </p>
          <p className="font-display font-black text-2xl text-gold drop-shadow-[0_0_12px_rgba(253,224,71,0.5)] sm:text-3xl">
            ₪{displayed.toLocaleString(language === "he" ? "he-IL" : "en-US")}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
