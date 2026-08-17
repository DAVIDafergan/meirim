import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const where = { isRecurringSetup: false, currency: "ILS" as const };

  const [agg, recent] = await Promise.all([
    prisma.donation.aggregate({ where, _sum: { amount: true }, _count: true }),
    prisma.donation.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: 8,
      select: { clientName: true, amount: true, anonymous: true, createdAt: true },
    }),
  ]);

  return NextResponse.json({
    total: Number(agg._sum.amount ?? 0),
    count: agg._count,
    recent: recent.map((d) => ({
      name: d.anonymous || !d.clientName ? "תורם/ת אנונימי/ת" : d.clientName,
      amount: Number(d.amount),
      createdAt: d.createdAt,
    })),
  });
}
