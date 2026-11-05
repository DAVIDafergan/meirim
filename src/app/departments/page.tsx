import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import DepartmentsPageHeader from "@/components/DepartmentsPageHeader";
import DepartmentsGrid from "@/components/DepartmentsGrid";
import { DEPARTMENT_MEDIA } from "@/lib/siteMedia";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  alternates: { canonical: "/departments" },
  title: "הפעילות שלנו | נחלי התורה צפת",
  description: "סקירה של הפעילות במוסדות נחלי התורה צפת — חינוך, קהילה וחסד.",
};

export default async function DepartmentsPage() {
  const departments = await prisma.department.findMany({
    orderBy: { order: "asc" },
    select: {
      slug: true, name: true, icon: true, summary: true, analyticTag: true,
      images: { orderBy: { order: "asc" }, take: 1, select: { filename: true } },
    },
  });

  return (
    <main className="relative flex-1 pt-28 sm:pt-32">
      <div className="mx-auto max-w-6xl px-6">
        <DepartmentsPageHeader />
      </div>
      <DepartmentsGrid
        departments={departments.map(({ images, ...d }) => ({
          ...d,
          cover: images[0] ? `/api/media/${encodeURIComponent(images[0].filename)}` : DEPARTMENT_MEDIA[d.slug]?.[0]?.src ?? null,
        }))}
      />
    </main>
  );
}
