"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";
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
    <div ref={ref}>
      <div className="flex items-center gap-3 rounded-2xl border border-line bg-white/60 px-5 py-3.5">
        <span className="relative flex h-2 w-2 shrink-0">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
        <div>
          <p className="text-[11px] tracking-wide text-foreground-muted">
            {t.liveCounter.label}
          </p>
          <p className="font-display font-black text-2xl text-gold sm:text-3xl">
            ₪{displayed.toLocaleString(language === "he" ? "he-IL" : "en-US")}
          </p>
        </div>
      </div>
    </div>
  );
}
