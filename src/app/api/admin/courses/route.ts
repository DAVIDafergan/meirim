import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdminAuthed } from "@/lib/adminAuth";

export async function GET() {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ error: "לא מורשה" }, { status: 401 });
  }
  const courses = await prisma.course.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json({ courses });
}

// ASCII-only on purpose: Next.js 16's App Router page segments (unlike route
// handlers) fail to match a dynamic [slug] containing non-Latin characters -
// verified directly against this app's own /admin/courses/[slug] and
// /courses/[slug] pages, which 404 on a Hebrew slug while the equivalent
// /api/.../[slug] route handler resolves it fine. Since course titles here
// are almost always Hebrew, this reliably falls through to the timestamp
// fallback - a stable, working URL beats a pretty one that 404s.
function slugify(title: string) {
  const base = title
    .trim()
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "") // strip accents from any Latin transliteration
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return base || `course-${Date.now().toString(36)}`;
}

export async function POST(request: Request) {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ error: "לא מורשה" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "בקשה לא תקינה" }, { status: 400 });
  }

  const { title, summary, price, accessContent } = body as {
    title?: unknown;
    summary?: unknown;
    price?: unknown;
    accessContent?: unknown;
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

  let slug = slugify(title);
  const existing = await prisma.course.findUnique({ where: { slug } });
  if (existing) slug = `${slug}-${Date.now()}`;

  const maxOrder = await prisma.course.aggregate({ _max: { order: true } });

  const course = await prisma.course.create({
    data: {
      slug,
      order: (maxOrder._max.order ?? 0) + 1,
      title: title.trim(),
      summary: summary.trim(),
      price: Math.round(price),
      accessContent: accessContent.trim(),
      analyticTag: `course-${slug}`,
      published: false,
    },
  });

  return NextResponse.json({ course }, { status: 201 });
}
