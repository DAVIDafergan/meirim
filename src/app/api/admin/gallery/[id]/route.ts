import { unlink } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdminAuthed } from "@/lib/adminAuth";
import { UPLOADS_DIR } from "@/lib/uploads";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ error: "לא מורשה" }, { status: 401 });
  }

  const { id } = await params;
  const item = await prisma.galleryItem.findUnique({ where: { id: Number(id) } });
  if (!item) {
    return NextResponse.json({ error: "לא נמצא" }, { status: 404 });
  }

  await unlink(path.join(/* turbopackIgnore: true */ UPLOADS_DIR, item.filename)).catch(() => {});
  await prisma.galleryItem.delete({ where: { id: item.id } });

  return NextResponse.json({ ok: true });
}
