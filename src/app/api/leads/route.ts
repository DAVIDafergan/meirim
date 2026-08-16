import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "בקשה לא תקינה" }, { status: 400 });
  }

  const { name, phone } = (body ?? {}) as { name?: unknown; phone?: unknown };

  if (
    typeof name !== "string" ||
    typeof phone !== "string" ||
    !name.trim() ||
    !phone.trim()
  ) {
    return NextResponse.json(
      { error: "יש למלא שם ומספר טלפון" },
      { status: 400 }
    );
  }

  const lead = await prisma.lead.create({
    data: { name: name.trim(), phone: phone.trim() },
  });

  return NextResponse.json({ id: lead.id }, { status: 201 });
}
