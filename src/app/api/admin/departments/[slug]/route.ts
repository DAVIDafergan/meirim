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
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "בקשה לא תקינה" }, { status: 400 });
  }

  const { name, summary, body: longBody } = body as {
    name?: unknown;
    summary?: unknown;
    body?: unknown;
  };

  if (typeof name !== "string" || !name.trim()) {
    return NextResponse.json({ error: "שם המחלקה נדרש" }, { status: 400 });
  }
  if (typeof summary !== "string" || !summary.trim()) {
    return NextResponse.json({ error: "תיאור קצר נדרש" }, { status: 400 });
  }

  const department = await prisma.department.findUnique({ where: { slug } });
  if (!department) {
    return NextResponse.json({ error: "מחלקה לא נמצאה" }, { status: 404 });
  }

  const updated = await prisma.department.update({
    where: { slug },
    data: {
      name: name.trim(),
      summary: summary.trim(),
      body:
        typeof longBody === "string" && longBody.trim() ? longBody.trim() : null,
    },
  });

  return NextResponse.json({ department: updated });
}
