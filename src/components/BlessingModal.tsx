"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "@/components/LanguageProvider";
import { goldButton } from "@/lib/uiConstants";

// TODO: replace with the real WhatsApp number (international format, no "+"), e.g. "972501234567"
const WHATSAPP_NUMBER = "972500000000";

// The WhatsApp message itself always goes out in Hebrew, since it's read by
// the Rabbi - only the form UI is translated.
const categoryIds = ["ישועה", "זיווג", "פרנסה", "רפואה"];

const inputClass =
  "w-full rounded-xl border border-line bg-white px-4 py-3 text-foreground placeholder:text-foreground-muted outline-none transition-colors focus:border-gold";

export default function BlessingModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { t, dir } = useLanguage();
  const categories = categoryIds.map((id, i) => ({
    id,
    label: t.blessingCategories[i],
  }));
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
      "בקשה לשם לברכה בציון הרשב\"י - אתר מוסדות נחלי התורה",
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
          className="fixed inset-0 z-[70] flex items-center justify-center bg-foreground/40 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg rounded-2xl border border-line bg-background p-6 shadow-xl sm:p-8"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label={t.blessingModal.close}
              className="absolute left-4 top-4 text-2xl leading-none text-foreground-muted transition-colors hover:text-gold"
            >
              ×
            </button>

            <h3 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
              {t.blessingModal.title}
            </h3>
            <p className="mt-2 text-sm text-foreground-muted">{t.blessingModal.body}</p>

            <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-3">
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t.blessingModal.firstName}
                  className={inputClass}
                />
                <input
                  value={motherName}
                  onChange={(e) => setMotherName(e.target.value)}
                  placeholder={t.blessingModal.motherName}
                  className={inputClass}
                />
              </div>

              <input
                required
                type="tel"
                dir="ltr"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={t.blessingModal.phone}
                className={`${inputClass} ${dir === "rtl" ? "text-right" : "text-left"}`}
              />

              <div>
                <p className="mb-2 text-sm text-foreground-muted">{t.blessingModal.requestFor}</p>
                <div className="flex flex-wrap gap-2">
                  {categories.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => toggleCategory(c.id)}
                      className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                        selected.includes(c.id)
                          ? "border-gold bg-gold/10 text-gold"
                          : "border-line text-foreground-muted hover:border-gold/50"
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
                placeholder={t.blessingModal.notePlaceholder}
                rows={2}
                className={`${inputClass} resize-none`}
              />

              <button type="submit" className={`mt-2 px-8 py-3 ${goldButton}`}>
                {t.blessingModal.submit}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
