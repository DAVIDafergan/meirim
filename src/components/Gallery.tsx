"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Item = { id: number; type: string; caption: string | null; url: string };

export default function Gallery() {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/gallery")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!cancelled && Array.isArray(data?.items)) setItems(data.items);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  if (items.length === 0) return null;

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
      {items.map((item, i) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: (i % 8) * 0.05 }}
          className="group relative aspect-square overflow-hidden rounded-2xl border border-white/10 bg-white/5"
        >
          {item.type === "video" ? (
            <GalleryVideo src={item.url} caption={item.caption} />
          ) : (
            <a href={item.url} target="_blank" rel="noopener noreferrer">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.url}
                alt={item.caption ?? ""}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </a>
          )}
          {item.caption && (
            <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-3 py-2 text-xs text-gray-100">
              {item.caption}
            </span>
          )}
        </motion.div>
      ))}
    </div>
  );
}

function GalleryVideo({ src, caption }: { src: string; caption: string | null }) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <video
        src={src}
        controls
        autoPlay
        playsInline
        className="h-full w-full object-cover"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={caption ?? "Play video"}
      className="relative block h-full w-full"
    >
      <video src={src} preload="metadata" muted playsInline className="h-full w-full object-cover" />
      <span className="absolute inset-0 flex items-center justify-center bg-black/25 transition-colors group-hover:bg-black/10">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-yellow-500 to-yellow-300 shadow-[0_0_25px_rgba(253,224,71,0.6)]">
          <svg viewBox="0 0 24 24" fill="black" className="h-5 w-5 -translate-x-0.5">
            <path d="M8 5v14l11-7Z" />
          </svg>
        </span>
      </span>
    </button>
  );
}
