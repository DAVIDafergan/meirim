import { prisma } from "@/lib/prisma";
import GalleryManager from "./GalleryManager";

export const dynamic = "force-dynamic";

export default async function GalleryAdminPage() {
  const items = await prisma.galleryItem.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <h1 className="font-display text-2xl text-gold sm:text-3xl">ניהול גלריה</h1>
      <p className="mt-1 text-sm text-gray-400">סה&quot;כ {items.length} פריטים</p>

      <GalleryManager
        initialItems={items.map((i) => ({
          id: i.id,
          type: i.type,
          caption: i.caption,
          url: `/api/media/${i.filename}`,
        }))}
      />
    </div>
  );
}
