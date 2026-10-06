import { randomUUID } from "crypto";
import { mkdir, unlink, writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdminAuthed } from "@/lib/adminAuth";
import { UPLOADS_DIR, resolveUpload } from "@/lib/uploads";

function parseId(raw: string) {
  const id = Number(raw);
  return Number.isInteger(id) && id > 0 ? id : null;
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ error: "לא מורשה" }, { status: 401 });
  }
  const id = parseId((await params).id);
  if (!id) return NextResponse.json({ error: "מזהה לא תקין" }, { status: 400 });

  const existing = await prisma.update.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: "העדכון לא נמצא" }, { status: 404 });

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

  const previous = existing.image;
  const updated = await prisma.update.update({ where: { id }, data: { image: filename } });

  if (previous) {
    await unlink(path.join(UPLOADS_DIR, previous)).catch(() => {});
  }

  return NextResponse.json({ image: `/api/media/${filename}`, update: updated });
}
