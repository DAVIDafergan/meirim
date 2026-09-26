import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  // accessContent is never selected here - it must stay hidden until the
  // buyer is redirected back from a real Nedarim Plus payment.
  const course = await prisma.course.findFirst({
    where: { slug, published: true },
    select: {
      slug: true,
      title: true,
      summary: true,
      description: true,
      price: true,
      image: true,
      analyticTag: true,
    },
  });

  if (!course) {
    return NextResponse.json({ error: "הקורס לא נמצא" }, { status: 404 });
  }

  return NextResponse.json({
    course: { ...course, image: course.image ? `/api/media/${encodeURIComponent(course.image)}` : null },
  });
}
