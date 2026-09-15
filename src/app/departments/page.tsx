import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import FloatingOrbs from "@/components/FloatingOrbs";
import Kicker from "@/components/Kicker";
import DepartmentsGrid from "@/components/DepartmentsGrid";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "המחלקות שלנו | נחלי התורה צפת",
  description: "סקירה של מחלקות מוסדות נחלי התורה צפת — חינוך, קהילה וחסד.",
};

export default async function DepartmentsPage() {
  const departments = await prisma.department.findMany({
    orderBy: { order: "asc" },
    select: { slug: true, name: true, icon: true, summary: true, analyticTag: true },
  });

  return (
    <main className="ambient-glow relative flex-1 overflow-hidden px-6 py-28 sm:py-32">
      <FloatingOrbs />
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 flex flex-col items-center gap-6 text-center">
          <Kicker>מה אנחנו עושים</Kicker>
          <h1 className="font-display font-black text-4xl leading-snug text-gold sm:text-5xl md:text-6xl">
            המחלקות שלנו
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-gray-300">
            שמונה מחלקות הפועלות יחד בלב העיר העתיקה בצפת, ומלוות את בני הקהילה מגיל הרך ולאורך
            כל שלבי החיים.
          </p>
        </div>
        <DepartmentsGrid departments={departments} />
      </div>
    </main>
  );
}
