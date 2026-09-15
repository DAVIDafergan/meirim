import { randomUUID } from "crypto";
import { mkdir, writeFile } from "fs/promises";
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
  const department = await prisma.department.findUnique({ where: { slug } });
  if (!department) {
    return NextResponse.json({ error: "מחלקה לא נמצאה" }, { status: 404 });
  }

  const formData = await request.formData();
  const file = formData.get("file");
  const caption = formData.get("caption");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "לא נבחר קובץ" }, { status: 400 });
  }

  const resolved = resolveUpload(file.type);
  if (!resolved) {
    return NextResponse.json({ error: "סוג קובץ לא נתמך" }, { status: 400 });
  }
  if (file.size > resolved.maxBytes) {
    return NextResponse.json({ error: "הקובץ גדול מדי" }, { status: 400 });
  }

  await mkdir(UPLOADS_DIR, { recursive: true });
  const filename = `${randomUUID()}.${resolved.ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(/* turbopackIgnore: true */ UPLOADS_DIR, filename), buffer);

  const maxOrder = await prisma.departmentImage.aggregate({
    where: { departmentId: department.id },
    _max: { order: true },
  });

  const image = await prisma.departmentImage.create({
    data: {
      departmentId: department.id,
      filename,
      caption: typeof caption === "string" && caption.trim() ? caption.trim() : null,
      order: (maxOrder._max.order ?? 0) + 1,
    },
  });

  return NextResponse.json({ image });
}
