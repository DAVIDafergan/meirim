import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import DepartmentDetailView from "@/components/DepartmentDetailView";

export const dynamic = "force-dynamic";

async function getDepartment(slug: string) {
  return prisma.department.findUnique({
    where: { slug },
    include: { images: { orderBy: { order: "asc" } } },
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const department = await getDepartment(slug);
  if (!department) return {};
  return {
    title: `${department.name} | נחלי התורה צפת`,
    description: department.summary,
  };
}

export default async function DepartmentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const department = await getDepartment(slug);
  if (!department) notFound();

  return (
    <DepartmentDetailView
      department={{
        name: department.name,
        summary: department.summary,
        body: department.body,
        icon: department.icon,
        analyticTag: department.analyticTag,
        images: department.images.map((img) => ({
          id: img.id,
          caption: img.caption,
          filename: img.filename,
        })),
      }}
    />
  );
}
