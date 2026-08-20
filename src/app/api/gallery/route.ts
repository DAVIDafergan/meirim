import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const items = await prisma.galleryItem.findMany({
    orderBy: { createdAt: "desc" },
    take: 40,
  });

  return NextResponse.json({
    items: items.map((i) => ({
      id: i.id,
      type: i.type,
      caption: i.caption,
      url: `/api/media/${i.filename}`,
    })),
  });
}
