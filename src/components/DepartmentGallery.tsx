"use client";

import { motion } from "framer-motion";

type Item = { id: number; caption: string | null; url: string };

export default function DepartmentGallery({ images }: { images: Item[] }) {
  if (images.length === 0) return null;

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
      {images.map((item, i) => (
        <motion.a
          key={item.id}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: (i % 8) * 0.05 }}
          className="group relative aspect-square overflow-hidden rounded-2xl border border-white/10 bg-white/5"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.url}
            alt={item.caption ?? ""}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {item.caption && (
            <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-3 py-2 text-xs text-gray-100">
              {item.caption}
            </span>
          )}
        </motion.a>
      ))}
    </div>
  );
}
