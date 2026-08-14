"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function VideoPlayer({
  src,
  poster,
  className = "",
}: {
  src: string;
  poster: string;
  className?: string;
}) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <video
        src={src}
        poster={poster}
        controls
        autoPlay
        playsInline
        className={className}
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label="לצפייה בסרטון"
      className={`group relative ${className}`}
    >
      <Image
        src={poster}
        alt="לצפייה בסרטון"
        fill
        sizes="380px"
        className="object-cover"
      />
      <span className="absolute inset-0 bg-black/25 transition-colors group-hover:bg-black/10" />
      <motion.span
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <span className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-yellow-500 to-yellow-300 shadow-[0_0_35px_rgba(253,224,71,0.6)]">
          <svg
            viewBox="0 0 24 24"
            fill="black"
            className="h-8 w-8 -translate-x-0.5"
          >
            <path d="M8 5v14l11-7Z" />
          </svg>
        </span>
      </motion.span>
    </button>
  );
}
