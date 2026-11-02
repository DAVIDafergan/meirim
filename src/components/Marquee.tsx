import type { ReactNode } from "react";

/** Endless ribbon of phrases separated by gold diamonds. */
export default function Marquee({ items, className = "" }: { items: string[]; className?: string }) {
  const row: ReactNode = items.map((it, i) => (
    <span key={i} className="flex items-center gap-8 whitespace-nowrap px-4">
      <span>{it}</span>
      <span className="h-2 w-2 rotate-45 bg-gold" aria-hidden="true" />
    </span>
  ));
  return (
    <div className={`marquee overflow-hidden ${className}`} aria-hidden="true">
      <div className="marquee-track">
        <div className="flex">{row}</div>
        <div className="flex">{row}</div>
      </div>
    </div>
  );
}
