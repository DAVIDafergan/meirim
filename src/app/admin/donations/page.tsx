import { redirect } from "next/navigation";
import Link from "next/link";
import { isAdminAuthed } from "@/lib/adminAuth";
import { prisma } from "@/lib/prisma";
import { CAMPAIGN_GROUPE } from "@/lib/nedarim";
import AdminLogoutButton from "@/components/AdminLogoutButton";

export const dynamic = "force-dynamic";

function periodStart(period: string): Date | undefined {
  const now = new Date();
  if (period === "today") {
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
  }
  if (period === "week") {
    const d = new Date(now);
    d.setDate(d.getDate() - 7);
    return d;
  }
  if (period === "month") {
    return new Date(now.getFullYear(), now.getMonth(), 1);
  }
  return undefined;
}

const PERIODS = [
  { value: "all", label: "הכל" },
  { value: "today", label: "היום" },
  { value: "week", label: "השבוע" },
  { value: "month", label: "החודש" },
];

export default async function DonationsAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ period?: string; q?: string }>;
}) {
  if (!(await isAdminAuthed())) {
    redirect("/admin/login");
  }

  const params = await searchParams;
  const period = params.period ?? "all";
  const q = params.q?.trim() ?? "";
  const since = periodStart(period);

  const where = {
    isRecurringSetup: false,
    category: CAMPAIGN_GROUPE,
    ...(since ? { createdAt: { gte: since } } : {}),
    ...(q ? { clientName: { contains: q, mode: "insensitive" as const } } : {}),
  };

  const [recentDonations, statsRows, agg, recurringCount, categoryBreakdown] =
    await Promise.all([
      prisma.donation.findMany({
        where,
        orderBy: { createdAt: "desc" },
        take: 50,
      }),
      prisma.donation.findMany({ where, select: { phone: true, email: true } }),
      prisma.donation.aggregate({ where, _sum: { amount: true }, _count: true }),
      prisma.donation.count({
        where: { isRecurringSetup: true, category: CAMPAIGN_GROUPE },
      }),
      prisma.donation.groupBy({
        by: ["category"],
        where,
        _sum: { amount: true },
      }),
    ]);

  const uniqueDonors = new Set(
    statsRows.map((d, i) => d.phone ?? d.email ?? `anon-${i}`)
  ).size;

  const total = Number(agg._sum.amount ?? 0);
  const categories = categoryBreakdown
    .map((c) => ({
      name: c.category ?? "ללא קטגוריה",
      amount: Number(c._sum.amount ?? 0),
    }))
    .sort((a, b) => b.amount - a.amount);
  const maxCategoryAmount = Math.max(1, ...categories.map((c) => c.amount));

  const qs = new URLSearchParams();
  if (period !== "all") qs.set("period", period);
  if (q) qs.set("q", q);

  return (
    <main className="min-h-screen bg-black px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl text-gold sm:text-3xl">
              דשבורד תרומות
            </h1>
            <p className="mt-1 text-sm text-gray-400">
              <Link href="/admin" className="hover:text-gold">
                לידים
              </Link>
              {" · "}
              דשבורד תרומות
              {" · "}
              <Link href="/admin/gallery" className="hover:text-gold">
                גלריה
              </Link>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={`/api/admin/donations/export?${qs.toString()}`}
              className="rounded-full bg-gradient-to-r from-yellow-500 to-yellow-300 px-5 py-2 text-sm font-bold text-black shadow-[0_0_16px_rgba(253,224,71,0.35)]"
            >
              ייצוא ל-CSV
            </a>
            <AdminLogoutButton />
          </div>
        </div>

        {/* Filters */}
        <form className="mt-6 flex flex-wrap items-center gap-3" method="get">
          <div className="flex rounded-full border border-white/15 p-1">
            {PERIODS.map((p) => (
              <Link
                key={p.value}
                href={`/admin/donations?${new URLSearchParams({
                  ...(p.value !== "all" ? { period: p.value } : {}),
                  ...(q ? { q } : {}),
                }).toString()}`}
                className={`rounded-full px-4 py-1.5 text-sm transition-colors ${
                  period === p.value
                    ? "bg-gold text-black font-bold"
                    : "text-gray-300 hover:text-gold"
                }`}
              >
                {p.label}
              </Link>
            ))}
          </div>
          <input
            type="text"
            name="q"
            defaultValue={q}
            placeholder="חיפוש לפי שם תורם"
            className="rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm text-white placeholder:text-gray-500 outline-none focus:border-gold/60"
          />
          {period !== "all" && <input type="hidden" name="period" value={period} />}
          <button
            type="submit"
            className="rounded-full border border-white/15 px-4 py-1.5 text-sm text-gray-300 hover:border-gold/50 hover:text-gold"
          >
            חיפוש
          </button>
        </form>

        {/* Stat cards */}
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center">
            <p className="font-display text-2xl text-gold sm:text-3xl">
              ₪{total.toLocaleString("he-IL")}
            </p>
            <p className="mt-1 text-xs text-gray-400">סה&quot;כ תרומות</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center">
            <p className="font-display text-2xl text-gold sm:text-3xl">
              {agg._count}
            </p>
            <p className="mt-1 text-xs text-gray-400">מספר תרומות</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center">
            <p className="font-display text-2xl text-gold sm:text-3xl">
              {uniqueDonors}
            </p>
            <p className="mt-1 text-xs text-gray-400">תורמים ייחודיים</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center">
            <p className="font-display text-2xl text-gold sm:text-3xl">
              {recurringCount}
            </p>
            <p className="mt-1 text-xs text-gray-400">הוראות קבע פעילות</p>
          </div>
        </div>

        {/* Category breakdown */}
        {categories.length > 0 && (
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="font-display text-lg text-gold">פילוח לפי קטגוריה</h2>
            <div className="mt-4 flex flex-col gap-3">
              {categories.map((c) => (
                <div key={c.name}>
                  <div className="mb-1 flex justify-between text-sm text-gray-300">
                    <span>{c.name}</span>
                    <span>₪{c.amount.toLocaleString("he-IL")}</span>
                  </div>
                  <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/5">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-yellow-500 to-yellow-300"
                      style={{
                        width: `${(c.amount / maxCategoryAmount) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent donations table */}
        <div className="mt-8 overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full min-w-[720px] text-right">
            <thead>
              <tr className="border-b border-white/10 bg-white/5 text-sm text-gray-400">
                <th className="px-4 py-3 font-medium">שם</th>
                <th className="px-4 py-3 font-medium">סכום</th>
                <th className="px-4 py-3 font-medium">קטגוריה</th>
                <th className="px-4 py-3 font-medium">סוג</th>
                <th className="px-4 py-3 font-medium">תאריך</th>
                <th className="px-4 py-3 font-medium">קבלה</th>
              </tr>
            </thead>
            <tbody>
              {recentDonations.map((d) => (
                <tr key={d.id} className="border-b border-white/5 text-gray-200">
                  <td className="px-4 py-3">{d.clientName || "—"}</td>
                  <td className="px-4 py-3">
                    ₪{Number(d.amount).toLocaleString("he-IL")}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-400">
                    {d.category || "—"}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-400">
                    {d.kevaId ? "הוראת קבע" : "חד פעמי"}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-400">
                    {d.createdAt.toLocaleString("he-IL")}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {d.receiptUrl ? (
                      <a
                        href={d.receiptUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gold hover:underline"
                      >
                        קבלה
                      </a>
                    ) : (
                      "—"
                    )}
                  </td>
                </tr>
              ))}
              {recentDonations.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                    עדיין אין תרומות
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
