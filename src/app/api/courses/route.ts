import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const courses = await prisma.course.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
    select: {
      slug: true,
      title: true,
      summary: true,
      price: true,
      image: true,
      analyticTag: true,
    },
  });

  return NextResponse.json({
    courses: courses.map((c) => ({
      ...c,
      image: c.image ? `/api/media/${encodeURIComponent(c.image)}` : null,
    })),
  });
}
