"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeleteUpdateButton({ id }: { id: number }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    if (!confirm("למחוק את העדכון לצמיתות?")) return;
    setDeleting(true);
    const res = await fetch(`/api/admin/updates/${id}`, { method: "DELETE" });
    if (res.ok) {
      router.push("/admin/updates");
      router.refresh();
    } else {
      setDeleting(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={deleting}
      className="rounded-full border border-red-500/40 px-4 py-1.5 text-sm text-red-300 transition-colors hover:bg-red-500/10 disabled:opacity-60"
    >
      {deleting ? "מוחק..." : "מחיקה"}
    </button>
  );
}
