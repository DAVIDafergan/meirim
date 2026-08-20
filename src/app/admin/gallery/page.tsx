import { redirect } from "next/navigation";
import Link from "next/link";
import { isAdminAuthed } from "@/lib/adminAuth";
import { prisma } from "@/lib/prisma";
import AdminLogoutButton from "@/components/AdminLogoutButton";
import GalleryManager from "./GalleryManager";

export const dynamic = "force-dynamic";

export default async function GalleryAdminPage() {
  if (!(await isAdminAuthed())) {
    redirect("/admin/login");
  }

  const items = await prisma.galleryItem.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <main className="min-h-screen bg-black px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl text-gold sm:text-3xl">
              ניהול גלריה
            </h1>
            <p className="mt-1 text-sm text-gray-400">
              <Link href="/admin" className="hover:text-gold">
                לידים
              </Link>
              {" · "}
              <Link href="/admin/donations" className="hover:text-gold">
                דשבורד תרומות
              </Link>
              {" · "}
              גלריה
            </p>
          </div>
          <AdminLogoutButton />
        </div>

        <GalleryManager
          initialItems={items.map((i) => ({
            id: i.id,
            type: i.type,
            caption: i.caption,
            url: `/api/media/${i.filename}`,
          }))}
        />
      </div>
    </main>
  );
}
