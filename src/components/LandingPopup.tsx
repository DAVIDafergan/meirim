"use client";

import { useEffect, useState, type FormEvent } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

const STORAGE_KEY = "meirim_landing_popup_shown";

const inputClass =
  "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-gray-500 outline-none transition-colors focus:border-gold/60 focus:bg-white/10";

export default function LandingPopup() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  const isAdminRoute = pathname?.startsWith("/admin");

  useEffect(() => {
    if (isAdminRoute) return;
    if (sessionStorage.getItem(STORAGE_KEY)) return;
    const timer = setTimeout(() => {
      setOpen(true);
      sessionStorage.setItem(STORAGE_KEY, "1");
    }, 1400);
    return () => clearTimeout(timer);
  }, [isAdminRoute]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, note }),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("sent");
      setTimeout(() => setOpen(false), 1800);
    } catch {
      setStatus("error");
    }
  }

  if (isAdminRoute) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md rounded-2xl border border-gold/30 bg-gradient-to-b from-purple-box/90 via-[#1a1025]/95 to-purple-deep/95 p-6 text-center shadow-[0_0_60px_rgba(253,224,71,0.25)] sm:p-8"
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="סגירה"
              className="absolute left-4 top-4 text-2xl leading-none text-gray-400 transition-colors hover:text-gold"
            >
              ×
            </button>

            {status === "sent" ? (
              <div className="py-6">
                <p className="text-2xl">🙏</p>
                <h3 className="mt-3 font-display font-black text-xl text-gold">
                  השם שלכם נקלט בהצלחה
                </h3>
                <p className="mt-2 text-sm text-gray-300">
                  תפילתכם תעלה בציון הרשב&quot;י במירון. תודה!
                </p>
              </div>
            ) : (
              <>
                <h3 className="font-display font-black text-2xl text-gold sm:text-3xl">
                  השאירו שם לתפילה
                </h3>
                <p className="mt-2 text-sm text-gray-300">
                  השאירו שם ומספר טלפון, והשם שלכם יעלה בתפילה בציון הרשב&quot;י
                  במירון.
                </p>

                <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3">
                  <input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="שם פרטי (ושם האם אם ידוע)"
                    className={inputClass}
                  />
                  <input
                    required
                    type="tel"
                    dir="ltr"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="טלפון ליצירת קשר"
                    className={`${inputClass} text-right`}
                  />
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="הערות (לא חובה)"
                    rows={2}
                    className={`${inputClass} resize-none`}
                  />

                  {status === "error" && (
                    <p className="text-sm text-red-400">
                      אירעה שגיאה, נסו שוב.
                    </p>
                  )}

                  <motion.button
                    type="submit"
                    disabled={status === "sending"}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="mt-2 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-300 px-8 py-3 font-bold tracking-wide text-black shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_0_20px_rgba(253,224,71,0.4)] transition-shadow hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.5),0_0_35px_rgba(253,224,71,0.7)] disabled:opacity-60"
                  >
                    {status === "sending" ? "שולח..." : "השאירו שם"}
                  </motion.button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
