"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { HeartIcon } from "@/components/icons";
import { useLanguage } from "@/components/LanguageProvider";

type Recent = { name: string | null; amount: number; createdAt: string };

const cardAccents = ["text-gold", "text-jewel-purple", "text-jewel-green", "text-jewel-wine"];

export default function RecentDonations() {
  const { t, language } = useLanguage();
  const [items, setItems] = useState<Recent[]>([]);

  useEffect(() => {
    let cancelled = false;
    async function poll() {
      try {
        const res = await fetch("/api/donations/live");
        if (!res.ok) return;
        const data = await res.json();
        if (!cancelled && Array.isArray(data.recent)) setItems(data.recent);
      } catch {}
    }
    poll();
    const interval = setInterval(poll, 15000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  if (items.length === 0) return null;

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {items.map((item, i) => (
        <motion.div
          key={`${item.createdAt}-${i}`}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, delay: i * 0.06 }}
          className="flex flex-col items-center gap-1.5 rounded-2xl border border-line bg-white/60 px-4 py-4 text-center"
        >
          <HeartIcon className={`h-4 w-4 ${cardAccents[i % cardAccents.length]}`} />
          <p className="w-full truncate text-sm font-semibold text-foreground">
            {item.name ?? t.recentDonations.anonymous}
          </p>
          <p className={`font-display font-black text-lg ${cardAccents[i % cardAccents.length]}`}>
            ₪{item.amount.toLocaleString(language === "he" ? "he-IL" : "en-US")}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
