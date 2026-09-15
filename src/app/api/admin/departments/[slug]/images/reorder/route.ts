import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdminAuthed } from "@/lib/adminAuth";

export async function PATCH(
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

  const body = await request.json().catch(() => null);
  const imageIds = (body as { imageIds?: unknown } | null)?.imageIds;
  if (!Array.isArray(imageIds) || !imageIds.every((id) => typeof id === "number")) {
    return NextResponse.json({ error: "בקשה לא תקינה" }, { status: 400 });
  }

  const images = await prisma.departmentImage.findMany({
    where: { departmentId: department.id },
    select: { id: true },
  });
  const validIds = new Set(images.map((i) => i.id));
  if (imageIds.length !== images.length || !imageIds.every((id) => validIds.has(id))) {
    return NextResponse.json({ error: "רשימת התמונות אינה תואמת" }, { status: 400 });
  }

  await prisma.$transaction(
    imageIds.map((id, index) =>
      prisma.departmentImage.update({ where: { id }, data: { order: index } })
    )
  );

  return NextResponse.json({ ok: true });
}
