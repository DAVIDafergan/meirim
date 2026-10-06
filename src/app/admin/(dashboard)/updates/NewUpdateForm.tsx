"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function NewUpdateForm() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [link, setLink] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-8 w-fit rounded-full bg-gradient-to-r from-yellow-500 to-yellow-300 px-6 py-2 text-sm font-bold text-black"
      >
        + עדכון חדש
      </button>
    );
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/admin/updates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, body, link }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.error ?? "היצירה נכשלה");
      router.push(`/admin/updates/${data.update.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "היצירה נכשלה");
      setSaving(false);
    }
  }

  const inputClass =
    "rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-white outline-none focus:border-gold/60";

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 flex flex-col gap-4 rounded-2xl border border-gold/30 bg-white/5 p-5"
    >
      <h2 className="font-display text-lg text-gold">עדכון / אירוע חדש</h2>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="כותרת"
        required
        className={inputClass}
      />
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="תוכן (לא חובה)"
        rows={3}
        className={inputClass}
      />
      <input
        value={link}
        onChange={(e) => setLink(e.target.value)}
        placeholder="קישור (לא חובה, למשל לאירוע או לפרטים נוספים)"
        dir="ltr"
        className={inputClass}
      />
      {error && <p className="text-sm text-red-400">{error}</p>}
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={saving}
          className="w-fit rounded-full bg-gradient-to-r from-yellow-500 to-yellow-300 px-6 py-2 text-sm font-bold text-black disabled:opacity-60"
        >
          {saving ? "יוצר..." : "יצירה"}
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="w-fit rounded-full border border-white/15 px-6 py-2 text-sm text-gray-300"
        >
          ביטול
        </button>
      </div>
      <p className="text-xs text-gray-500">
        העדכון ייווצר כ&quot;מוסתר&quot; - תוכלו להוסיף תמונה ולפרסם אותו בעמוד העריכה.
      </p>
    </form>
  );
}
