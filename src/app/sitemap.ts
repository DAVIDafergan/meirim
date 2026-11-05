import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://nachalei-hatorah.org";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = ["", "/about", "/departments", "/donate", "/courses", "/lessons", "/updates"].map((p) => ({
    url: `${SITE}${p}`,
    changeFrequency: "weekly" as const,
    priority: p === "" ? 1 : 0.7,
  }));
  let departments: { slug: string }[] = [];
  try {
    departments = await prisma.department.findMany({ select: { slug: true } });
  } catch {}
  return [...pages, ...departments.map((d) => ({ url: `${SITE}/departments/${d.slug}`, changeFrequency: "monthly" as const, priority: 0.6 }))];
}
