import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { GALLERY_MEDIA } from "@/lib/siteMedia";

export async function GET() {
  const items = await prisma.galleryItem.findMany({
    orderBy: { createdAt: "desc" },
    take: 40,
  });

  const uploaded = items.map((i) => ({
    id: i.id,
    type: i.type,
    caption: i.caption,
    url: `/api/media/${i.filename}`,
  }));
  // uploaded items first, then the default photos from the institutions' video
  const defaults = GALLERY_MEDIA.map((m, i) => ({ id: -(i + 1), type: "image", caption: m.caption, url: m.src }));

  return NextResponse.json({ items: [...uploaded, ...defaults] });
}
