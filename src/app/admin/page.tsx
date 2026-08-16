import { redirect } from "next/navigation";
import { isAdminAuthed } from "@/lib/adminAuth";
import { prisma } from "@/lib/prisma";
import AdminLogoutButton from "@/components/AdminLogoutButton";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!(await isAdminAuthed())) {
    redirect("/admin/login");
  }

  const leads = await prisma.lead.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <main className="min-h-screen bg-black px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl text-gold sm:text-3xl">
              לידים &ndash; שם לתפילה
            </h1>
            <p className="mt-1 text-sm text-gray-400">
              סה&quot;כ {leads.length} רשומות
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/api/admin/export"
              className="rounded-full bg-gradient-to-r from-yellow-500 to-yellow-300 px-5 py-2 text-sm font-bold text-black shadow-[0_0_16px_rgba(253,224,71,0.35)]"
            >
              ייצוא לאקסל
            </a>
            <AdminLogoutButton />
          </div>
        </div>

        <div className="mt-8 overflow-x-auto rounded-2xl border border-white/10">
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
                  <td className="px-4 py-3 text-sm text-gray-400">
                    {lead.note || "—"}
                  </td>
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
    </main>
  );
}
