import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const result = await prisma.donation.aggregate({
    where: { isRecurringSetup: false, currency: "ILS" },
    _sum: { amount: true },
    _count: true,
  });

  const donors = await prisma.donation.findMany({
    where: { isRecurringSetup: false },
    select: { phone: true, email: true },
  });
  const uniqueDonors = new Set(
    donors.map((d) => d.phone ?? d.email ?? Math.random().toString())
  ).size;

  return NextResponse.json({
    total: Number(result._sum.amount ?? 0),
    count: result._count,
    uniqueDonors,
  });
}
