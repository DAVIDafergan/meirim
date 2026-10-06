import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const updates = await prisma.update.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    select: { id: true, title: true, body: true, image: true, link: true, createdAt: true },
  });

  return NextResponse.json({
    updates: updates.map((u) => ({
      ...u,
      image: u.image ? `/api/media/${encodeURIComponent(u.image)}` : null,
    })),
  });
}
