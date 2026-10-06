import Link from "next/link";
import { prisma } from "@/lib/prisma";
import NewUpdateForm from "./NewUpdateForm";

export const dynamic = "force-dynamic";

export default async function UpdatesAdminPage() {
  const updates = await prisma.update.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <h1 className="font-display text-2xl text-gold sm:text-3xl">ניהול אירועים ועדכונים</h1>
      <p className="mt-1 text-sm text-gray-400">סה&quot;כ {updates.length} עדכונים</p>

      <NewUpdateForm />

      <div className="mt-8 flex flex-col gap-3">
        {updates.map((u) => (
          <Link
            key={u.id}
            href={`/admin/updates/${u.id}`}
            className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 transition-colors hover:border-gold/50"
          >
            <div className="min-w-0 flex-1">
              <p className="font-bold text-white">
                {u.title}{" "}
                {!u.published && (
                  <span className="ms-2 rounded-full bg-white/10 px-2 py-0.5 text-xs text-gray-400">
                    מוסתר
                  </span>
                )}
              </p>
              {u.body && <p className="mt-0.5 truncate text-sm text-gray-400">{u.body}</p>}
            </div>
            <span className="shrink-0 text-xs text-gray-500">
              {u.createdAt.toLocaleDateString("he-IL")}
            </span>
          </Link>
        ))}
        {updates.length === 0 && (
          <p className="py-8 text-center text-gray-500">עדיין אין עדכונים - הוסיפו את הראשון למעלה</p>
        )}
      </div>
    </div>
  );
}
