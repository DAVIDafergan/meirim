import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import CourseEditor from "../CourseEditor";
import DeleteCourseButton from "./DeleteCourseButton";

export const dynamic = "force-dynamic";

export default async function CourseAdminPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = await prisma.course.findUnique({ where: { slug } });
  if (!course) {
    notFound();
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <Link href="/admin/courses" className="text-sm text-gray-400 hover:text-gold">
            ← ניהול קורסים
          </Link>
          <h1 className="mt-2 font-display text-2xl text-gold sm:text-3xl">{course.title}</h1>
        </div>
        <DeleteCourseButton slug={course.slug} />
      </div>

      <CourseEditor
        course={{
          slug: course.slug,
          title: course.title,
          summary: course.summary,
          description: course.description,
          price: course.price,
          accessContent: course.accessContent,
          published: course.published,
          image: course.image,
        }}
      />
    </div>
  );
}
