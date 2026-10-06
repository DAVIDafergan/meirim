"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/LanguageProvider";
import { cardsContainer, cardItem } from "@/lib/motionVariants";
import { cardHover } from "@/lib/uiConstants";

type UpdateItem = {
  id: number;
  title: string;
  body: string | null;
  image: string | null;
  link: string | null;
  createdAt: string;
};

export default function UpdatesList({ limit }: { limit?: number }) {
  const { t, language } = useLanguage();
  const locale = language === "he" ? "he-IL" : "en-US";
  const [updates, setUpdates] = useState<UpdateItem[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/updates")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!cancelled && Array.isArray(data?.updates)) setUpdates(data.updates);
      })
      .catch(() => {
        if (!cancelled) setUpdates([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (updates === null) return null;
  const items = limit ? updates.slice(0, limit) : updates;

  if (items.length === 0) {
    return <p className="py-8 text-center text-foreground-muted">{t.updatesPage.empty}</p>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={cardsContainer}
      className="mx-auto flex max-w-3xl flex-col gap-5"
    >
      {items.map((u) => (
        <motion.article
          key={u.id}
          variants={cardItem}
          className={`flex flex-col gap-4 overflow-hidden rounded-2xl border-2 border-jewel-purple/15 bg-background sm:flex-row ${cardHover}`}
        >
          <div className="h-48 shrink-0 bg-jewel-purple sm:h-auto sm:w-56">
            {u.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={u.image} alt={u.title} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-jewel-purple to-jewel-wine text-3xl">
                📣
              </div>
            )}
          </div>
          <div className="flex flex-1 flex-col items-start gap-2 p-6 text-start">
            <span className="text-xs text-foreground-muted">
              {new Date(u.createdAt).toLocaleDateString(locale, { day: "numeric", month: "long", year: "numeric" })}
            </span>
            <h3 className="font-display text-xl font-bold text-jewel-purple">{u.title}</h3>
            {u.body && <p className="text-sm leading-relaxed text-foreground-muted">{u.body}</p>}
            {u.link && (
              <a
                href={u.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto text-sm font-bold text-gold hover:underline"
              >
                {t.updatesPage.readMore}
              </a>
            )}
          </div>
        </motion.article>
      ))}
    </motion.div>
  );
}
