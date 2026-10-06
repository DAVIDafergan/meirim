import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdminAuthed } from "@/lib/adminAuth";

export async function GET() {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ error: "לא מורשה" }, { status: 401 });
  }
  const updates = await prisma.update.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json({ updates });
}

export async function POST(request: Request) {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ error: "לא מורשה" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "בקשה לא תקינה" }, { status: 400 });
  }

  const { title, body: text, link } = body as {
    title?: unknown;
    body?: unknown;
    link?: unknown;
  };

  if (typeof title !== "string" || !title.trim()) {
    return NextResponse.json({ error: "כותרת נדרשת" }, { status: 400 });
  }
  if (link !== undefined && link !== null && typeof link !== "string") {
    return NextResponse.json({ error: "קישור לא תקין" }, { status: 400 });
  }

  const update = await prisma.update.create({
    data: {
      title: title.trim(),
      body: typeof text === "string" && text.trim() ? text.trim() : null,
      link: typeof link === "string" && link.trim() ? link.trim() : null,
      published: false,
    },
  });

  return NextResponse.json({ update }, { status: 201 });
}
