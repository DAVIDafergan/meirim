import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const departments = await prisma.department.findMany({
    orderBy: { order: "asc" },
    select: {
      slug: true, name: true, icon: true, summary: true, analyticTag: true,
      images: { orderBy: { order: "asc" }, take: 1, select: { filename: true } },
    },
  });
  return NextResponse.json({
    departments: departments.map(({ images, ...d }) => ({
      ...d,
      cover: images[0] ? `/api/media/${encodeURIComponent(images[0].filename)}` : null,
    })),
  });
}
