import { prisma } from "@/lib/prisma";
import { donationDisplayFilter } from "@/lib/nedarim";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const [leads, donationAgg, coursesCount, departmentsCount, galleryCount] = await Promise.all([
    prisma.lead.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.donation.aggregate({
      where: { isRecurringSetup: false, ...donationDisplayFilter },
      _sum: { amount: true },
      _count: true,
    }),
    prisma.course.count(),
    prisma.department.count(),
    prisma.galleryItem.count(),
  ]);

  const stats = [
    { label: "לידים - שם לתפילה", value: leads.length },
    { label: "סה\"כ תרומות", value: `₪${Number(donationAgg._sum.amount ?? 0).toLocaleString("he-IL")}` },
    { label: "קורסים", value: coursesCount },
    { label: "תחומי פעילות", value: departmentsCount },
    { label: "פריטי גלריה", value: galleryCount },
  ];

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl text-gold sm:text-3xl">לוח בקרה</h1>
          <p className="mt-1 text-sm text-gray-400">סקירה כללית של האתר</p>
        </div>
        <a
          href="/api/admin/export"
          className="rounded-full bg-gradient-to-r from-yellow-500 to-yellow-300 px-5 py-2 text-sm font-bold text-black shadow-[0_0_16px_rgba(253,224,71,0.35)]"
        >
          ייצוא לידים לאקסל
        </a>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center">
            <p className="font-display text-2xl text-gold sm:text-3xl">{s.value}</p>
            <p className="mt-1 text-xs text-gray-400">{s.label}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-10 font-display text-lg text-gold">לידים אחרונים - שם לתפילה</h2>
      <div className="mt-4 overflow-x-auto rounded-2xl border border-white/10">
        <table className="w-full min-w-[480px] text-right">
          <thead>
            <tr className="border-b border-white/10 bg-white/5 text-sm text-gray-400">
              <th className="px-4 py-3 font-medium">שם</th>
              <th className="px-4 py-3 font-medium">טלפון</th>
              <th className="px-4 py-3 font-medium">הערות</th>
              <th className="px-4 py-3 font-medium">תאריך</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id} className="border-b border-white/5 text-gray-200">
                <td className="px-4 py-3">{lead.name}</td>
                <td className="px-4 py-3" dir="ltr">
                  {lead.phone}
                </td>
                <td className="px-4 py-3 text-sm text-gray-400">{lead.note || "—"}</td>
                <td className="px-4 py-3 text-sm text-gray-400">
                  {lead.createdAt.toLocaleString("he-IL")}
                </td>
              </tr>
            ))}
            {leads.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-gray-500">
                  עדיין אין רשומות
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
