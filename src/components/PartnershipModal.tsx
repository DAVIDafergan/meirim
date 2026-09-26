"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "@/components/LanguageProvider";
import { goldButton } from "@/lib/uiConstants";

const inputClass =
  "w-full rounded-xl border border-line bg-white px-4 py-3 text-foreground placeholder:text-foreground-muted outline-none transition-colors focus:border-gold";

export default function PartnershipModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { t, dir } = useLanguage();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("sending");

    const noteLines = [
      "בקשה לשותפות יששכר-זבולון",
      amount ? `סכום חודשי משוער: ${amount}` : "",
      note,
    ].filter(Boolean);

    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, note: noteLines.join(" · ") }),
      });
    } catch {
      // Best-effort: the form still confirms below so the visitor isn't stuck.
    }

    setStatus("sent");
    setTimeout(() => {
      setName("");
      setPhone("");
      setAmount("");
      setNote("");
      setStatus("idle");
      onClose();
    }, 1800);
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
              aria-label={t.partnershipModal.close}
              className="absolute left-4 top-4 text-2xl leading-none text-foreground-muted transition-colors hover:text-gold"
            >
              ×
            </button>

            <h3 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
              {t.partnershipModal.title}
            </h3>
            <p className="mt-2 text-sm text-foreground-muted">{t.partnershipModal.body}</p>

            {status === "sent" ? (
              <p className="mt-8 rounded-xl bg-gold/10 px-4 py-6 text-center font-display font-bold text-gold">
                {t.partnershipModal.success}
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t.partnershipModal.firstName}
                  className={inputClass}
                />
                <input
                  required
                  type="tel"
                  dir="ltr"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={t.partnershipModal.phone}
                  className={`${inputClass} ${dir === "rtl" ? "text-right" : "text-left"}`}
                />
                <input
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder={t.partnershipModal.amount}
                  className={inputClass}
                />
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder={t.partnershipModal.notePlaceholder}
                  rows={2}
                  className={`${inputClass} resize-none`}
                />

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className={`mt-2 px-8 py-3 disabled:opacity-60 ${goldButton}`}
                >
                  {t.partnershipModal.submit}
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
