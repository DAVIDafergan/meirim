import { unlink } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdminAuthed } from "@/lib/adminAuth";
import { UPLOADS_DIR } from "@/lib/uploads";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ slug: string; imageId: string }> }
) {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ error: "לא מורשה" }, { status: 401 });
  }

  const { slug, imageId } = await params;
  const image = await prisma.departmentImage.findUnique({
    where: { id: Number(imageId) },
    include: { department: true },
  });
  if (!image || image.department.slug !== slug) {
    return NextResponse.json({ error: "לא נמצא" }, { status: 404 });
  }

  await unlink(path.join(/* turbopackIgnore: true */ UPLOADS_DIR, image.filename)).catch(
    () => {}
  );
  await prisma.departmentImage.delete({ where: { id: image.id } });

  return NextResponse.json({ ok: true });
}
