"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { HeartIcon } from "@/components/icons";

type Recent = { name: string; amount: number; createdAt: string };

const cardAccents = [
  "border-gold/30 text-gold",
  "border-violet-300/30 text-violet-200",
  "border-amber-300/30 text-amber-200",
  "border-rose-300/30 text-rose-200",
];

export default function RecentDonations() {
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
          className={`flex flex-col items-center gap-1.5 rounded-2xl border bg-white/[0.05] px-4 py-4 text-center backdrop-blur-md ${cardAccents[i % cardAccents.length]}`}
        >
          <HeartIcon className="h-4 w-4" />
          <p className="w-full truncate text-sm font-semibold text-white">{item.name}</p>
          <p className="font-display font-black text-lg">
            ₪{item.amount.toLocaleString("he-IL")}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
