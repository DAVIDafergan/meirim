import { NextResponse } from "next/server";
import { unlink } from "fs/promises";
import path from "path";
import { prisma } from "@/lib/prisma";
import { isAdminAuthed } from "@/lib/adminAuth";
import { UPLOADS_DIR } from "@/lib/uploads";

function parseId(raw: string) {
  const id = Number(raw);
  return Number.isInteger(id) && id > 0 ? id : null;
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ error: "לא מורשה" }, { status: 401 });
  }
  const id = parseId((await params).id);
  if (!id) return NextResponse.json({ error: "מזהה לא תקין" }, { status: 400 });

  const update = await prisma.update.findUnique({ where: { id } });
  if (!update) return NextResponse.json({ error: "העדכון לא נמצא" }, { status: 404 });
  return NextResponse.json({ update });
}

export async function PATCH(
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

  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "בקשה לא תקינה" }, { status: 400 });
  }

  const { title, body: text, link, published } = body as {
    title?: unknown;
    body?: unknown;
    link?: unknown;
    published?: unknown;
  };

  if (typeof title !== "string" || !title.trim()) {
    return NextResponse.json({ error: "כותרת נדרשת" }, { status: 400 });
  }
  if (link !== undefined && link !== null && typeof link !== "string") {
    return NextResponse.json({ error: "קישור לא תקין" }, { status: 400 });
  }

  const updated = await prisma.update.update({
    where: { id },
    data: {
      title: title.trim(),
      body: typeof text === "string" && text.trim() ? text.trim() : null,
      link: typeof link === "string" && link.trim() ? link.trim() : null,
      published: Boolean(published),
    },
  });

  return NextResponse.json({ update: updated });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ error: "לא מורשה" }, { status: 401 });
  }
  const id = parseId((await params).id);
  if (!id) return NextResponse.json({ error: "מזהה לא תקין" }, { status: 400 });

  const existing = await prisma.update.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: "העדכון לא נמצא" }, { status: 404 });

  await prisma.update.delete({ where: { id } });

  if (existing.image) {
    await unlink(path.join(UPLOADS_DIR, existing.image)).catch(() => {});
  }

  return NextResponse.json({ ok: true });
}
