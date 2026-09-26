import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import ThanksContent from "./ThanksContent";

export const metadata: Metadata = {
  title: 'תודה על תרומתכם | מוסדות ברסלב "נחלי התורה" צפת',
};

export default async function ThanksPage({
  searchParams,
}: {
  searchParams: Promise<{ course?: string }>;
}) {
  const { course: slug } = await searchParams;

  // Only reachable via a real redirect back from Nedarim Plus after payment -
  // this is the one moment accessContent is ever sent to the browser.
  const course = slug
    ? await prisma.course.findUnique({
        where: { slug },
        select: { title: true, accessContent: true },
      })
    : null;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 py-24 text-center">
      <ThanksContent course={course} />
    </main>
  );
}
