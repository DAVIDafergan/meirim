"use client";

import { useRef, useState, type FormEvent } from "react";

type Item = { id: number; type: string; caption: string | null; url: string };

export default function GalleryManager({ initialItems }: { initialItems: Item[] }) {
  const [items, setItems] = useState(initialItems);
  const [caption, setCaption] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleUpload(e: FormEvent) {
    e.preventDefault();
    const file = fileInputRef.current?.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.set("file", file);
      if (caption.trim()) formData.set("caption", caption.trim());

      const res = await fetch("/api/admin/gallery", { method: "POST", body: formData });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? "העלאה נכשלה");
      }
      const { item } = await res.json();
      setItems((prev) => [
        { id: item.id, type: item.type, caption: item.caption, url: `/api/media/${item.filename}` },
        ...prev,
      ]);
      setCaption("");
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      setError(err instanceof Error ? err.message : "העלאה נכשלה");
    } finally {
      setUploading(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("למחוק את הפריט?")) return;
    const res = await fetch(`/api/admin/gallery/${id}`, { method: "DELETE" });
    if (res.ok) setItems((prev) => prev.filter((i) => i.id !== id));
  }

  return (
    <div className="mt-8">
      <form
        onSubmit={handleUpload}
        className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-5 sm:flex-row sm:items-center"
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif,video/mp4,video/webm,video/quicktime"
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
      {error && <p className="mt-2 text-sm text-red-400">{error}</p>}

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5"
          >
            {item.type === "video" ? (
              <video src={item.url} className="aspect-square w-full object-cover" muted />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.url}
                alt={item.caption ?? ""}
                className="aspect-square w-full object-cover"
              />
            )}
            <button
              type="button"
              onClick={() => handleDelete(item.id)}
              className="absolute left-1.5 top-1.5 rounded-full bg-black/70 px-2 py-1 text-xs text-red-300 opacity-0 transition-opacity group-hover:opacity-100"
            >
              מחיקה
            </button>
          </div>
        ))}
        {items.length === 0 && (
          <p className="col-span-full py-8 text-center text-gray-500">
            עדיין אין פריטים בגלריה
          </p>
        )}
      </div>
    </div>
  );
}
