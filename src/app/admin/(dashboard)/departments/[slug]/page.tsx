import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import DepartmentEditor from "./DepartmentEditor";

export const dynamic = "force-dynamic";

export default async function DepartmentAdminPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const department = await prisma.department.findUnique({
    where: { slug },
    include: { images: { orderBy: { order: "asc" } } },
  });
  if (!department) {
    notFound();
  }

  return (
    <div>
      <Link href="/admin/departments" className="text-sm text-gray-400 hover:text-gold">
        ← ניהול פעילות
      </Link>
      <h1 className="mt-2 font-display text-2xl text-gold sm:text-3xl">{department.name}</h1>

      <DepartmentEditor
        slug={department.slug}
        initialName={department.name}
        initialSummary={department.summary}
        initialBody={department.body ?? ""}
        initialImages={department.images.map((img) => ({
          id: img.id,
          caption: img.caption,
          url: `/api/media/${img.filename}`,
        }))}
      />
    </div>
  );
}
