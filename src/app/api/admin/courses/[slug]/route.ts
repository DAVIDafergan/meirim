import { NextResponse } from "next/server";
import { unlink } from "fs/promises";
import path from "path";
import { prisma } from "@/lib/prisma";
import { isAdminAuthed } from "@/lib/adminAuth";
import { UPLOADS_DIR } from "@/lib/uploads";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ error: "לא מורשה" }, { status: 401 });
  }
  const { slug } = await params;
  const course = await prisma.course.findUnique({ where: { slug } });
  if (!course) return NextResponse.json({ error: "הקורס לא נמצא" }, { status: 404 });
  return NextResponse.json({ course });
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ error: "לא מורשה" }, { status: 401 });
  }

  const { slug } = await params;
  const course = await prisma.course.findUnique({ where: { slug } });
  if (!course) return NextResponse.json({ error: "הקורס לא נמצא" }, { status: 404 });

  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "בקשה לא תקינה" }, { status: 400 });
  }

  const { title, summary, description, price, accessContent, published } = body as {
    title?: unknown;
    summary?: unknown;
    description?: unknown;
    price?: unknown;
    accessContent?: unknown;
    published?: unknown;
  };

  if (typeof title !== "string" || !title.trim()) {
    return NextResponse.json({ error: "שם הקורס נדרש" }, { status: 400 });
  }
  if (typeof summary !== "string" || !summary.trim()) {
    return NextResponse.json({ error: "תיאור קצר נדרש" }, { status: 400 });
  }
  if (typeof price !== "number" || !Number.isFinite(price) || price <= 0) {
    return NextResponse.json({ error: "מחיר לא תקין" }, { status: 400 });
  }
  if (typeof accessContent !== "string" || !accessContent.trim()) {
    return NextResponse.json(
      { error: "יש להגדיר מה יימסר לרוכש לאחר התשלום" },
      { status: 400 }
    );
  }

  const updated = await prisma.course.update({
    where: { slug },
    data: {
      title: title.trim(),
      summary: summary.trim(),
      description:
        typeof description === "string" && description.trim() ? description.trim() : null,
      price: Math.round(price),
      accessContent: accessContent.trim(),
      published: Boolean(published),
    },
  });

  return NextResponse.json({ course: updated });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ error: "לא מורשה" }, { status: 401 });
  }

  const { slug } = await params;
  const course = await prisma.course.findUnique({ where: { slug } });
  if (!course) return NextResponse.json({ error: "הקורס לא נמצא" }, { status: 404 });

  await prisma.course.delete({ where: { slug } });

  if (course.image) {
    await unlink(path.join(UPLOADS_DIR, course.image)).catch(() => {});
  }

  return NextResponse.json({ ok: true });
}
