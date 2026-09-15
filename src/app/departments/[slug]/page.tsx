import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import Kicker from "@/components/Kicker";
import DepartmentGallery from "@/components/DepartmentGallery";
import { DEPARTMENT_ICONS, type DepartmentIconKey } from "@/components/icons";
import { nedarimPlusUrl, CAMPAIGN_GROUPE } from "@/lib/nedarim";
import { goldButton } from "@/lib/uiConstants";

export const dynamic = "force-dynamic";

async function getDepartment(slug: string) {
  return prisma.department.findUnique({
    where: { slug },
    include: { images: { orderBy: { order: "asc" } } },
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const department = await getDepartment(slug);
  if (!department) return {};
  return {
    title: `${department.name} | נחלי התורה צפת`,
    description: department.summary,
  };
}

export default async function DepartmentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const department = await getDepartment(slug);
  if (!department) notFound();

  const Icon = DEPARTMENT_ICONS[department.icon as DepartmentIconKey];
  const bodyParagraphs = department.body?.split("\n").filter((p) => p.trim()) ?? [];

  return (
    <main className="relative flex-1 px-6 py-28 sm:py-32">
      <div className="mx-auto max-w-3xl">
        <Link href="/departments" className="text-sm text-foreground-muted hover:text-gold">
          ← כל המחלקות
        </Link>

        <div className="mt-6 flex flex-col items-center gap-6 text-center">
          {Icon && (
            <span className="flex h-16 w-16 items-center justify-center rounded-full border border-gold/30 text-gold">
              <Icon className="h-8 w-8" />
            </span>
          )}
          <Kicker>המחלקות שלנו</Kicker>
          <h1 className="font-display font-black text-4xl leading-snug text-foreground sm:text-5xl">
            {department.name}
          </h1>
          <p className="text-lg leading-loose text-foreground-muted sm:text-xl">{department.summary}</p>

          {bodyParagraphs.map((p, i) => (
            <p key={i} className="text-base leading-loose text-foreground-muted">
              {p}
            </p>
          ))}

          <a
            href={nedarimPlusUrl({
              groupe: CAMPAIGN_GROUPE,
              analytic: department.analyticTag,
              redirectPath: "/thanks",
            })}
            className={`mt-2 inline-block px-10 py-4 text-lg ${goldButton}`}
          >
            תמכו בפעילות זו
          </a>
        </div>

        {department.images.length > 0 && (
          <div className="mt-16">
            <DepartmentGallery
              images={department.images.map((img) => ({
                id: img.id,
                caption: img.caption,
                url: `/api/media/${img.filename}`,
              }))}
            />
          </div>
        )}
      </div>
    </main>
  );
}
