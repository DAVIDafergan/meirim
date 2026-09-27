import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { DEPARTMENT_ICONS, type DepartmentIconKey } from "@/components/icons";

export const dynamic = "force-dynamic";

export default async function DepartmentsAdminPage() {
  const departments = await prisma.department.findMany({
    orderBy: { order: "asc" },
    include: { _count: { select: { images: true } } },
  });

  return (
    <div>
      <h1 className="font-display text-2xl text-gold sm:text-3xl">ניהול פעילות</h1>
      <p className="mt-1 text-sm text-gray-400">סה&quot;כ {departments.length} תחומי פעילות</p>

      <div className="mt-6 flex flex-col gap-3">
        {departments.map((dept) => {
          const Icon = DEPARTMENT_ICONS[dept.icon as DepartmentIconKey];
          return (
            <Link
              key={dept.slug}
              href={`/admin/departments/${dept.slug}`}
              className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 transition-colors hover:border-gold/50"
            >
              {Icon && (
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/30 bg-gold/10 text-gold">
                  <Icon className="h-5 w-5" />
                </span>
              )}
              <div className="min-w-0 flex-1">
                <p className="font-bold text-white">{dept.name}</p>
                <p className="mt-0.5 truncate text-sm text-gray-400">{dept.summary}</p>
              </div>
              <span className="shrink-0 text-xs text-gray-500">{dept._count.images} תמונות</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
