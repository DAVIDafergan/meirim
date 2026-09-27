"use client";

import { useRef, useState, type FormEvent } from "react";

type Course = {
  slug: string;
  title: string;
  summary: string;
  description: string | null;
  price: number;
  accessContent: string;
  published: boolean;
  image: string | null;
};

export default function CourseEditor({ course: initial }: { course: Course }) {
  const [title, setTitle] = useState(initial.title);
  const [summary, setSummary] = useState(initial.summary);
  const [description, setDescription] = useState(initial.description ?? "");
  const [price, setPrice] = useState(String(initial.price));
  const [accessContent, setAccessContent] = useState(initial.accessContent);
  const [published, setPublished] = useState(initial.published);
  const [image, setImage] = useState(
    initial.image ? `/api/media/${initial.image}` : null
  );

  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [saveError, setSaveError] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleSave(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSaveMessage("");
    setSaveError("");
    try {
      const res = await fetch(`/api/admin/courses/${initial.slug}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          summary,
          description,
          price: Number(price),
          accessContent,
          published,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? "השמירה נכשלה");
      }
      setSaveMessage("נשמר בהצלחה");
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : "השמירה נכשלה");
    } finally {
      setSaving(false);
    }
  }

  async function handleImageUpload() {
    const file = fileInputRef.current?.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.set("file", file);
      const res = await fetch(`/api/admin/courses/${initial.slug}/image`, {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        const data = await res.json();
        setImage(data.image);
      }
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  const inputClass =
    "rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-white outline-none focus:border-gold/60";

  return (
    <form onSubmit={handleSave} className="mt-8 flex flex-col gap-10">
      <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-5">
        <h2 className="font-display text-lg text-gold">פרטי הקורס</h2>

        <label className="flex flex-col gap-1.5 text-sm text-gray-300">
          שם הקורס
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className={inputClass}
          />
        </label>

        <label className="flex flex-col gap-1.5 text-sm text-gray-300">
          תיאור קצר (מוצג בכרטיס ברשימת הקורסים)
          <textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            required
            rows={2}
            className={inputClass}
          />
        </label>

        <label className="flex flex-col gap-1.5 text-sm text-gray-300">
          תיאור מורחב (מוצג בעמוד הקורס, אופציונלי)
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            className={inputClass}
          />
        </label>

        <label className="flex flex-col gap-1.5 text-sm text-gray-300">
          מחיר (₪)
          <input
            type="number"
            min={1}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className={`${inputClass} w-40`}
          />
        </label>

        <div className="flex flex-col gap-1.5 text-sm text-gray-300">
          תמונת קורס
          <div className="flex items-center gap-4">
            {image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={image} alt="" className="h-20 w-20 rounded-lg object-cover" />
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              onChange={handleImageUpload}
              disabled={uploading}
              className="text-sm text-gray-300 file:mr-3 file:rounded-full file:border-0 file:bg-gold/20 file:px-4 file:py-2 file:text-sm file:font-bold file:text-gold"
            />
            {uploading && <span className="text-xs text-gray-400">מעלה...</span>}
          </div>
        </div>

        <label className="flex flex-col gap-1.5 text-sm text-gray-300">
          מה נשלח/מוצג לרוכש מיד לאחר התשלום (קישור לצפייה/הורדה, או הוראות)
          <textarea
            value={accessContent}
            onChange={(e) => setAccessContent(e.target.value)}
            required
            rows={3}
            placeholder="למשל: https://drive.google.com/... או הוראות ליצירת קשר"
            className={inputClass}
          />
        </label>

        <label className="flex items-center gap-2 text-sm text-gray-300">
          <input
            type="checkbox"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
            className="h-4 w-4 accent-gold"
          />
          מוצג באתר (אחרת מוסתר מהציבור)
        </label>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={saving}
            className="w-fit rounded-full bg-gradient-to-r from-yellow-500 to-yellow-300 px-6 py-2 text-sm font-bold text-black disabled:opacity-60"
          >
            {saving ? "שומר..." : "שמירת שינויים"}
          </button>
          {saveMessage && <span className="text-sm text-emerald-400">{saveMessage}</span>}
          {saveError && <span className="text-sm text-red-400">{saveError}</span>}
        </div>
      </div>
    </form>
  );
}
