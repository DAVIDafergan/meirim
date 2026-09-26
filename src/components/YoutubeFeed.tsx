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

function ThumbCard({ video, aspect }: { video: YoutubeVideo; aspect: "video" | "9/16" }) {
  return (
    <a
      href={video.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative block shrink-0 overflow-hidden rounded-2xl bg-black/20 ${
        aspect === "video" ? "aspect-video w-full" : "aspect-[9/16] w-40 sm:w-48"
      }`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={video.thumbnail}
        alt={video.title}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <span className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-cream text-ink">
          <PlayGlyph />
        </span>
      </span>
      <span className="pointer-events-none absolute inset-x-0 bottom-0 line-clamp-2 bg-gradient-to-t from-black/85 to-transparent px-3 py-2 text-xs text-cream">
        {video.title}
      </span>
    </a>
  );
}

// Skeleton shown while the feed loads, so the section never jumps once data
// arrives - two rows matching the eventual video/shorts layout.
function Skeleton() {
  return (
    <div className="flex flex-col gap-10 opacity-40">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="aspect-video animate-pulse rounded-2xl bg-white/10" />
        ))}
      </div>
      <div className="flex gap-4 overflow-hidden">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="aspect-[9/16] w-40 shrink-0 animate-pulse rounded-2xl bg-white/10 sm:w-48" />
        ))}
      </div>
    </div>
  );
}

export default function YoutubeFeed() {
  const { t } = useLanguage();
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

  if (videos === null) return <Skeleton />;
  if (videos.length === 0) return <p className="text-center text-cream/70">{t.lessonsPage.empty}</p>;

  const lessons = videos.filter((v) => !v.isShort);
  const shorts = videos.filter((v) => v.isShort);

  return (
    <div className="flex flex-col gap-14">
      {lessons.length > 0 && (
        <div className="flex flex-col gap-6">
          <h3 className="font-display text-xl font-bold text-cream">{t.lessonsPage.videosTitle}</h3>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={cardsContainer}
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {lessons.map((v) => (
              <motion.div key={v.id} variants={cardItem}>
                <ThumbCard video={v} aspect="video" />
              </motion.div>
            ))}
          </motion.div>
          <a
            href={CHANNEL_VIDEOS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-fit text-sm font-bold text-gold underline-offset-4 hover:underline"
          >
            {t.lessonsPage.viewAllVideos}
          </a>
        </div>
      )}

      {shorts.length > 0 && (
        <div className="flex flex-col gap-6">
          <h3 className="font-display text-xl font-bold text-cream">{t.lessonsPage.shortsTitle}</h3>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={cardsContainer}
            className="flex gap-4 overflow-x-auto pb-2"
          >
            {shorts.map((v) => (
              <motion.div key={v.id} variants={cardItem}>
                <ThumbCard video={v} aspect="9/16" />
              </motion.div>
            ))}
          </motion.div>
          <a
            href={CHANNEL_SHORTS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-fit text-sm font-bold text-gold underline-offset-4 hover:underline"
          >
            {t.lessonsPage.viewAllShorts}
          </a>
        </div>
      )}
    </div>
  );
}
