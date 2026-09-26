import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import CourseDetailContent from "./CourseDetailContent";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = await prisma.course.findFirst({
    where: { slug, published: true },
    select: { title: true, summary: true },
  });
  return {
    title: course ? `${course.title} | קורסים` : "קורס",
    description: course?.summary,
  };
}

export default async function CoursePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  // accessContent is deliberately left unselected - it's revealed only on
  // /thanks after a real Nedarim Plus redirect back from a completed payment.
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

  if (!course) notFound();

  return (
    <main className="flex-1">
      <CourseDetailContent
        course={{ ...course, image: course.image ? `/api/media/${encodeURIComponent(course.image)}` : null }}
      />
    </main>
  );
}
