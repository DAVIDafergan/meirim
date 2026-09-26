import { redirect } from "next/navigation";
import Link from "next/link";
import { isAdminAuthed } from "@/lib/adminAuth";
import { prisma } from "@/lib/prisma";
import AdminLogoutButton from "@/components/AdminLogoutButton";
import NewCourseForm from "./NewCourseForm";

export const dynamic = "force-dynamic";

export default async function CoursesAdminPage() {
  if (!(await isAdminAuthed())) {
    redirect("/admin/login");
  }

  const courses = await prisma.course.findMany({ orderBy: { order: "asc" } });

  return (
    <main className="min-h-screen bg-black px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl text-gold sm:text-3xl">ניהול קורסים</h1>
            <p className="mt-1 text-sm text-gray-400">
              <Link href="/admin" className="hover:text-gold">
                לידים
              </Link>
              {" · "}
              <Link href="/admin/donations" className="hover:text-gold">
                דשבורד תרומות
              </Link>
              {" · "}
              <Link href="/admin/gallery" className="hover:text-gold">
                גלריה
              </Link>
              {" · "}
              <Link href="/admin/departments" className="hover:text-gold">
                מחלקות
              </Link>
              {" · "}
              קורסים
            </p>
          </div>
          <AdminLogoutButton />
        </div>

        <NewCourseForm />

        <div className="mt-8 flex flex-col gap-3">
          {courses.map((course) => (
            <Link
              key={course.slug}
              href={`/admin/courses/${course.slug}`}
              className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 transition-colors hover:border-gold/50"
            >
              <div className="min-w-0 flex-1">
                <p className="font-bold text-white">
                  {course.title}{" "}
                  {!course.published && (
                    <span className="ms-2 rounded-full bg-white/10 px-2 py-0.5 text-xs text-gray-400">
                      מוסתר
                    </span>
                  )}
                </p>
                <p className="mt-0.5 truncate text-sm text-gray-400">{course.summary}</p>
              </div>
              <span className="shrink-0 font-display text-gold">₪{course.price}</span>
            </Link>
          ))}
          {courses.length === 0 && (
            <p className="py-8 text-center text-gray-500">עדיין אין קורסים - הוסיפו את הראשון למעלה</p>
          )}
        </div>
      </div>
    </main>
  );
}
