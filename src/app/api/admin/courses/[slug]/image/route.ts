import { randomUUID } from "crypto";
import { mkdir, unlink, writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdminAuthed } from "@/lib/adminAuth";
import { UPLOADS_DIR, resolveUpload } from "@/lib/uploads";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ error: "לא מורשה" }, { status: 401 });
  }

  const { slug } = await params;
  const course = await prisma.course.findUnique({ where: { slug } });
  if (!course) return NextResponse.json({ error: "הקורס לא נמצא" }, { status: 404 });

  const formData = await request.formData();
  const file = formData.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "לא נבחר קובץ" }, { status: 400 });
  }

  const resolved = resolveUpload(file.type);
  if (!resolved || resolved.kind !== "image") {
    return NextResponse.json({ error: "יש להעלות קובץ תמונה" }, { status: 400 });
  }
  if (file.size > resolved.maxBytes) {
    return NextResponse.json({ error: "הקובץ גדול מדי" }, { status: 400 });
  }

  await mkdir(UPLOADS_DIR, { recursive: true });
  const filename = `${randomUUID()}.${resolved.ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(/* turbopackIgnore: true */ UPLOADS_DIR, filename), buffer);

  const previous = course.image;
  const updated = await prisma.course.update({ where: { slug }, data: { image: filename } });

  if (previous) {
    await unlink(path.join(UPLOADS_DIR, previous)).catch(() => {});
  }

  return NextResponse.json({ image: `/api/media/${filename}`, course: updated });
}
