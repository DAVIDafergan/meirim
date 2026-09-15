import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const departments = await prisma.department.findMany({
    orderBy: { order: "asc" },
    select: { slug: true, name: true, icon: true, summary: true, analyticTag: true },
  });
  return NextResponse.json({ departments });
}
