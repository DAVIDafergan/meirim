"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        setError("סיסמה שגויה");
        setLoading(false);
        return;
      }
      router.push("/admin");
      router.refresh();
    } catch {
      setError("אירעה שגיאה, נסו שוב");
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl border border-gold/30 bg-gradient-to-b from-purple-box/60 via-black to-purple-deep/60 p-8 text-center shadow-[0_0_50px_rgba(253,224,71,0.15)]"
      >
        <h1 className="font-display text-2xl text-gold">כניסת מנהל</h1>
        <p className="mt-2 text-sm text-gray-400">מאירים את הגליל</p>

        <input
          type="password"
          required
          autoFocus
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="סיסמה"
          className="mt-6 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-center text-white outline-none transition-colors focus:border-gold/60 focus:bg-white/10"
        />

        {error && <p className="mt-3 text-sm text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-5 w-full rounded-full bg-gradient-to-r from-yellow-500 to-yellow-300 px-8 py-3 font-bold text-black shadow-[0_0_20px_rgba(253,224,71,0.4)] disabled:opacity-60"
        >
          {loading ? "מתחבר..." : "כניסה"}
        </button>
      </form>
    </main>
  );
}
