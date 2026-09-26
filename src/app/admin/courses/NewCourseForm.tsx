"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function NewCourseForm() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [price, setPrice] = useState("");
  const [accessContent, setAccessContent] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-8 w-fit rounded-full bg-gradient-to-r from-yellow-500 to-yellow-300 px-6 py-2 text-sm font-bold text-black"
      >
        + קורס חדש
      </button>
    );
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/admin/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, summary, price: Number(price), accessContent }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.error ?? "היצירה נכשלה");
      router.push(`/admin/courses/${data.course.slug}`);
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
      <h2 className="font-display text-lg text-gold">קורס חדש</h2>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="שם הקורס"
        required
        className={inputClass}
      />
      <textarea
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
        placeholder="תיאור קצר"
        required
        rows={2}
        className={inputClass}
      />
      <input
        type="number"
        min={1}
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="מחיר (₪)"
        required
        className={`${inputClass} w-40`}
      />
      <textarea
        value={accessContent}
        onChange={(e) => setAccessContent(e.target.value)}
        placeholder="מה יימסר לרוכש לאחר התשלום (קישור/הוראות)"
        required
        rows={2}
        className={inputClass}
      />
      {error && <p className="text-sm text-red-400">{error}</p>}
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={saving}
          className="w-fit rounded-full bg-gradient-to-r from-yellow-500 to-yellow-300 px-6 py-2 text-sm font-bold text-black disabled:opacity-60"
        >
          {saving ? "יוצר..." : "יצירת הקורס"}
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
        הקורס ייווצר כ&quot;מוסתר&quot; - תוכלו להשלים פרטים, להעלות תמונה ולפרסם אותו בעמוד העריכה.
      </p>
    </form>
  );
}
