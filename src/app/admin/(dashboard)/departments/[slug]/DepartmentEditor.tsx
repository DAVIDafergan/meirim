"use client";

import { useRef, useState, type FormEvent } from "react";

type Item = { id: number; caption: string | null; url: string };

export default function DepartmentEditor({
  slug,
  initialName,
  initialSummary,
  initialBody,
  initialImages,
}: {
  slug: string;
  initialName: string;
  initialSummary: string;
  initialBody: string;
  initialImages: Item[];
}) {
  const [name, setName] = useState(initialName);
  const [summary, setSummary] = useState(initialSummary);
  const [body, setBody] = useState(initialBody);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [saveError, setSaveError] = useState("");

  const [items, setItems] = useState(initialImages);
  const [caption, setCaption] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleSave(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSaveMessage("");
    setSaveError("");
    try {
      const res = await fetch(`/api/admin/departments/${slug}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, summary, body }),
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

  async function handleUpload(e: FormEvent) {
    e.preventDefault();
    const file = fileInputRef.current?.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadError("");
    try {
      const formData = new FormData();
      formData.set("file", file);
      if (caption.trim()) formData.set("caption", caption.trim());

      const res = await fetch(`/api/admin/departments/${slug}/images`, {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? "העלאה נכשלה");
      }
      const { image } = await res.json();
      setItems((prev) => [...prev, { id: image.id, caption: image.caption, url: `/api/media/${image.filename}` }]);
      setCaption("");
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "העלאה נכשלה");
    } finally {
      setUploading(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("למחוק את התמונה?")) return;
    const res = await fetch(`/api/admin/departments/${slug}/images/${id}`, {
      method: "DELETE",
    });
    if (res.ok) setItems((prev) => prev.filter((i) => i.id !== id));
  }

  async function persistOrder(nextItems: Item[]) {
    setItems(nextItems);
    await fetch(`/api/admin/departments/${slug}/images/reorder`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imageIds: nextItems.map((i) => i.id) }),
    });
  }

  function move(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= items.length) return;
    const next = [...items];
    [next[index], next[target]] = [next[target], next[index]];
    persistOrder(next);
  }

  return (
    <div className="mt-8 flex flex-col gap-10">
      {/* Text content */}
      <form
        onSubmit={handleSave}
        className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-5"
      >
        <h2 className="font-display text-lg text-gold">תוכן טקסטואלי</h2>
        <label className="flex flex-col gap-1.5 text-sm text-gray-300">
          שם המחלקה
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-white outline-none focus:border-gold/60"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm text-gray-300">
          תיאור קצר (2–4 משפטים, מוצג בכרטיס ובראש עמוד המחלקה)
          <textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            required
            rows={3}
            className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-white outline-none focus:border-gold/60"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm text-gray-300">
          תיאור מורחב (אופציונלי, מוצג בהמשך עמוד המחלקה)
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={6}
            className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-white outline-none focus:border-gold/60"
          />
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
      </form>

      {/* Gallery */}
      <div>
        <h2 className="font-display text-lg text-gold">גלריית תמונות</h2>
        <form
          onSubmit={handleUpload}
          className="mt-4 flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-5 sm:flex-row sm:items-center"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            required
            className="flex-1 text-sm text-gray-300 file:mr-3 file:rounded-full file:border-0 file:bg-gold/20 file:px-4 file:py-2 file:text-sm file:font-bold file:text-gold"
          />
          <input
            type="text"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="כיתוב (לא חובה)"
            className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white placeholder:text-gray-500 outline-none focus:border-gold/60 sm:w-64"
          />
          <button
            type="submit"
            disabled={uploading}
            className="rounded-full bg-gradient-to-r from-yellow-500 to-yellow-300 px-6 py-2 text-sm font-bold text-black disabled:opacity-60"
          >
            {uploading ? "מעלה..." : "העלאה"}
          </button>
        </form>
        {uploadError && <p className="mt-2 text-sm text-red-400">{uploadError}</p>}

        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
          {items.map((item, index) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.url}
                alt={item.caption ?? ""}
                className="aspect-square w-full object-cover"
              />
              <div className="absolute inset-x-0 top-0 flex items-center justify-between p-1.5 opacity-0 transition-opacity group-hover:opacity-100">
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={() => move(index, -1)}
                    disabled={index === 0}
                    className="rounded-full bg-black/70 px-2 py-1 text-xs text-gray-200 disabled:opacity-30"
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    onClick={() => move(index, 1)}
                    disabled={index === items.length - 1}
                    className="rounded-full bg-black/70 px-2 py-1 text-xs text-gray-200 disabled:opacity-30"
                  >
                    ↓
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => handleDelete(item.id)}
                  className="rounded-full bg-black/70 px-2 py-1 text-xs text-red-300"
                >
                  מחיקה
                </button>
              </div>
            </div>
          ))}
          {items.length === 0 && (
            <p className="col-span-full py-8 text-center text-gray-500">
              עדיין אין תמונות במחלקה זו
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
