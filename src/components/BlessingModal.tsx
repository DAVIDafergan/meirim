"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";

// TODO: replace with the real WhatsApp number (international format, no "+"), e.g. "972501234567"
const WHATSAPP_NUMBER = "972500000000";

const categories = [
  { id: "ישועה", label: "ישועה" },
  { id: "זיווג", label: "זיווג הגון" },
  { id: "פרנסה", label: "פרנסה טובה" },
  { id: "רפואה", label: "רפואה שלמה" },
];

const inputClass =
  "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-gray-500 outline-none transition-colors focus:border-gold/60 focus:bg-white/10";

export default function BlessingModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [motherName, setMotherName] = useState("");
  const [phone, setPhone] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [note, setNote] = useState("");

  function toggleCategory(id: string) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const lines = [
      "בקשה לשם לברכה בציון הרשב\"י - מאירים את הגליל",
      `שם: ${name}${motherName ? ` בן/בת ${motherName}` : ""}`,
      `טלפון: ${phone}`,
      selected.length ? `בקשה עבור: ${selected.join(", ")}` : "",
      note ? `הערה: ${note}` : "",
    ].filter(Boolean);

    const text = encodeURIComponent(lines.join("\n"));
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank");

    setName("");
    setMotherName("");
    setPhone("");
    setSelected([]);
    setNote("");
    onClose();
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg rounded-2xl border border-gold/30 bg-gradient-to-b from-purple-box/90 via-[#1a1025]/95 to-purple-deep/95 p-6 shadow-[0_0_60px_rgba(253,224,71,0.25)] sm:p-8"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="סגירה"
              className="absolute left-4 top-4 text-2xl leading-none text-gray-400 transition-colors hover:text-gold"
            >
              ×
            </button>

            <h3 className="text-2xl font-black text-gold sm:text-3xl">
              השאירו שם לברכה
            </h3>
            <p className="mt-2 text-sm text-gray-300">
              מלאו את הפרטים, וההודעה תישלח בוואטסאפ ישירות לרב נתן מרדכי
              ישראל שליט&quot;א לפני עלייתו לציון הרשב&quot;י במירון.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-3">
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="שם פרטי"
                  className={inputClass}
                />
                <input
                  value={motherName}
                  onChange={(e) => setMotherName(e.target.value)}
                  placeholder="שם האם"
                  className={inputClass}
                />
              </div>

              <input
                required
                type="tel"
                dir="ltr"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="טלפון ליצירת קשר"
                className={`${inputClass} text-right`}
              />

              <div>
                <p className="mb-2 text-sm text-gray-400">הבקשה עבור:</p>
                <div className="flex flex-wrap gap-2">
                  {categories.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => toggleCategory(c.id)}
                      className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                        selected.includes(c.id)
                          ? "border-gold bg-gold/20 text-gold"
                          : "border-white/15 text-gray-300 hover:border-gold/40"
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>

              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="הערה נוספת (לא חובה)"
                rows={2}
                className={`${inputClass} resize-none`}
              />

              <motion.button
                type="submit"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="mt-2 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-300 px-8 py-3 font-bold tracking-wide text-black shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_0_20px_rgba(253,224,71,0.4)] transition-shadow hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.5),0_0_35px_rgba(253,224,71,0.7)]"
              >
                שליחה לרב בוואטסאפ
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
