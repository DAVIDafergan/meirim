import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import CoursesPageHeader from "@/components/CoursesPageHeader";
import CoursesGrid from "@/components/CoursesGrid";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: 'קורסים | מוסדות ברסלב "נחלי התורה" צפת',
  description: "קורסים תורניים מפי הגאון הרב נתן מרדכי ישראל שליט\"א.",
};

export default async function CoursesPage() {
  const courses = await prisma.course.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
    select: { slug: true, title: true, summary: true, price: true, image: true },
  });

  return (
    <main className="relative flex-1 px-6 py-28 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <CoursesPageHeader />
        <CoursesGrid
          courses={courses.map((c) => ({
            ...c,
            image: c.image ? `/api/media/${encodeURIComponent(c.image)}` : null,
          }))}
        />
      </div>
    </main>
  );
}
