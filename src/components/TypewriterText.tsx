"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

export default function TypewriterText({
  children,
  className = "",
  delay = 0,
  speed = 45,
}: {
  children: string;
  className?: string;
  delay?: number;
  speed?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });
  const chars = Array.from(children);
  const [count, setCount] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (!isInView) return;
    let i = 0;
    const startTimeout = setTimeout(() => {
      const interval = setInterval(() => {
        i += 1;
        setCount(i);
        if (i >= chars.length) clearInterval(interval);
      }, speed);
      return () => clearInterval(interval);
    }, delay * 1000);
    return () => clearTimeout(startTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView]);

  const done = count >= chars.length;

  useEffect(() => {
    if (done) return;
    const blink = setInterval(() => setShowCursor((c) => !c), 500);
    return () => clearInterval(blink);
  }, [done]);

  return (
    <span ref={ref} className={`inline-block ${className}`}>
      {chars.slice(0, count).join("")}
      <span
        aria-hidden
        className={`-mb-1 ml-1 inline-block h-[0.85em] w-[3px] bg-current align-middle transition-opacity duration-150 ${
          done || !showCursor ? "opacity-0" : "opacity-100"
        }`}
      />
    </span>
  );
}
