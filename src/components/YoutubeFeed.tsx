"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/LanguageProvider";
import { cardsContainer, cardItem } from "@/lib/motionVariants";
import type { YoutubeVideo } from "@/app/api/youtube/latest/route";

const CHANNEL_HANDLE_URL = "https://www.youtube.com/@%D7%A0%D7%AA%D7%9F%D7%99%D7%A9%D7%A8%D7%90%D7%9C-%D7%A16%D7%A7";
const CHANNEL_VIDEOS_URL = `${CHANNEL_HANDLE_URL}/videos`;
const CHANNEL_SHORTS_URL = `${CHANNEL_HANDLE_URL}/shorts`;

function PlayGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 translate-x-0.5">
      <path d="M8 5v14l11-7Z" />
    </svg>
  );
}

export default function YoutubeFeed() {
  const { t, language } = useLanguage();
  const [videos, setVideos] = useState<YoutubeVideo[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/youtube/latest")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!cancelled && Array.isArray(data?.videos)) setVideos(data.videos);
      })
      .catch(() => {
        if (!cancelled) setVideos([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (videos === null || videos.length === 0) return null;

  return (
    <div className="flex flex-col gap-8">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={cardsContainer}
        className="grid grid-cols-2 gap-4 sm:grid-cols-4"
      >
        {videos.map((v) => (
          <motion.a
            key={v.id}
            variants={cardItem}
            href={v.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`group relative overflow-hidden rounded-2xl bg-black/20 ${
              v.isShort ? "aspect-[9/16]" : "aspect-video"
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={v.thumbnail}
              alt={v.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-cream text-ink">
                <PlayGlyph />
              </span>
            </span>
            {v.isShort && (
              <span className="absolute end-2 top-2 rounded-full bg-gold px-2 py-0.5 text-[10px] font-bold text-ink">
                Shorts
              </span>
            )}
            <span className="pointer-events-none absolute inset-x-0 bottom-0 line-clamp-2 bg-gradient-to-t from-black/85 to-transparent px-3 py-2 text-xs text-cream">
              {v.title}
            </span>
          </motion.a>
        ))}
      </motion.div>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <a
          href={CHANNEL_VIDEOS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-bold text-gold underline-offset-4 hover:underline"
        >
          {t.social.cta}
        </a>
        <a
          href={CHANNEL_SHORTS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-bold text-gold underline-offset-4 hover:underline"
        >
          {language === "he" ? "כל הסרטונים הקצרים ←" : "All Shorts ←"}
        </a>
      </div>
    </div>
  );
}
