import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdminAuthed } from "@/lib/adminAuth";

function periodStart(period: string): Date | undefined {
  const now = new Date();
  if (period === "today") {
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
  }
  if (period === "week") {
    const d = new Date(now);
    d.setDate(d.getDate() - 7);
    return d;
  }
  if (period === "month") {
    return new Date(now.getFullYear(), now.getMonth(), 1);
  }
  return undefined;
}

function csvEscape(value: string) {
  if (/[",\n]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

export async function GET(request: Request) {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ error: "לא מורשה" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const period = searchParams.get("period") ?? "all";
  const q = searchParams.get("q")?.trim() ?? "";
  const since = periodStart(period);

  const donations = await prisma.donation.findMany({
    where: {
      isRecurringSetup: false,
      ...(since ? { createdAt: { gte: since } } : {}),
      ...(q ? { clientName: { contains: q, mode: "insensitive" } } : {}),
    },
    orderBy: { createdAt: "desc" },
  });

  const headers = [
    "שם",
    "טלפון",
    "אימייל",
    "סכום",
    "מטבע",
    "קטגוריה",
    "סוג",
    "תאריך",
    "מזהה עסקה",
    "קבלה",
  ];

  const rows = donations.map((d) =>
    [
      d.clientName ?? "",
      d.phone ?? "",
      d.email ?? "",
      Number(d.amount).toString(),
      d.currency,
      d.category ?? "",
      d.kevaId ? "הוראת קבע" : "חד פעמי",
      d.createdAt.toLocaleString("he-IL"),
      d.transactionId ?? "",
      d.receiptUrl ?? "",
    ]
      .map((v) => csvEscape(String(v)))
      .join(",")
  );

  const csv = "﻿" + [headers.join(","), ...rows].join("\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="donations-${Date.now()}.csv"`,
    },
  });
}
