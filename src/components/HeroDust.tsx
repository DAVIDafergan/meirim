"use client";

import { useEffect, useRef } from "react";

/** Drifting golden embers / dust - ambient life behind the hero. Pure canvas, no deps. */
export default function HeroDust({ count = 70 }: { count?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let w = 0;
    let h = 0;
    let raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const rnd = (a: number, b: number) => a + Math.random() * (b - a);
    const parts = Array.from({ length: count }, () => ({
      x: rnd(0, 1), y: rnd(0, 1), r: rnd(0.6, 2.6), v: rnd(0.012, 0.05),
      s: rnd(0.2, 1), ph: rnd(0, Math.PI * 2),
    }));

    const tick = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      for (const p of parts) {
        p.y -= p.v * 0.003 * 60 * 0.016 * 4;
        if (p.y < -0.05) { p.y = 1.05; p.x = rnd(0, 1); }
        const x = p.x * w + Math.sin(t / 1800 + p.ph) * 18;
        const y = p.y * h;
        const a = (0.25 + 0.55 * Math.abs(Math.sin(t / 1400 + p.ph))) * p.s;
        const g = ctx.createRadialGradient(x, y, 0, x, y, p.r * 5);
        g.addColorStop(0, `rgba(255, 233, 160, ${a})`);
        g.addColorStop(1, "rgba(255, 233, 160, 0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, p.r * 5, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [count]);

  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full" />;
}
