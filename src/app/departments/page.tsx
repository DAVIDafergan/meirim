import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import DepartmentsPageHeader from "@/components/DepartmentsPageHeader";
import DepartmentsGrid from "@/components/DepartmentsGrid";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "המחלקות שלנו | נחלי התורה צפת",
  description: "סקירה של מחלקות מוסדות נחלי התורה צפת — חינוך, קהילה וחסד.",
};

export default async function DepartmentsPage() {
  const departments = await prisma.department.findMany({
    orderBy: { order: "asc" },
    select: { slug: true, name: true, icon: true, summary: true, analyticTag: true },
  });

  return (
    <main className="relative flex-1 px-6 py-28 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <DepartmentsPageHeader />
        <DepartmentsGrid departments={departments} />
      </div>
    </main>
  );
}
