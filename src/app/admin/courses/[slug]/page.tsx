import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { isAdminAuthed } from "@/lib/adminAuth";
import { prisma } from "@/lib/prisma";
import AdminLogoutButton from "@/components/AdminLogoutButton";
import CourseEditor from "../CourseEditor";
import DeleteCourseButton from "./DeleteCourseButton";

export const dynamic = "force-dynamic";

export default async function CourseAdminPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  if (!(await isAdminAuthed())) {
    redirect("/admin/login");
  }

  const { slug } = await params;
  const course = await prisma.course.findUnique({ where: { slug } });
  if (!course) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-black px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl text-gold sm:text-3xl">{course.title}</h1>
            <p className="mt-1 text-sm text-gray-400">
              <Link href="/admin/courses" className="hover:text-gold">
                קורסים
              </Link>
              {" · "}
              {course.title}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <DeleteCourseButton slug={course.slug} />
            <AdminLogoutButton />
          </div>
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
    </main>
  );
}
