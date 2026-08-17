import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Nedarim Plus's documented outgoing webhook IPs. They occasionally add new
// ones without much notice, so an unrecognized IP is rejected but still
// logged for review rather than silently dropped.
const ALLOWED_IPS = new Set(["18.196.146.117", "18.194.219.73"]);

function getClientIp(request: Request): string | null {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip");
}

type NedarimPayload = Record<string, unknown>;

function str(payload: NedarimPayload, key: string): string | null {
  const v = payload[key];
  return typeof v === "string" && v.trim() ? v.trim() : null;
}

function parseAmount(payload: NedarimPayload): string {
  const v = payload["Amount"];
  const n = typeof v === "string" ? Number(v) : typeof v === "number" ? v : 0;
  return Number.isFinite(n) ? n.toFixed(2) : "0.00";
}

function parseCurrency(payload: NedarimPayload): string {
  const v = str(payload, "Currency");
  if (v === "2") return "USD";
  return "ILS";
}

function parseDate(payload: NedarimPayload, key: string): Date | null {
  const v = str(payload, key);
  if (!v) return null;
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? null : d;
}

function parseInstallments(payload: NedarimPayload): number | null {
  const v = str(payload, "Tashloumim");
  if (!v) return null;
  const n = Number(v);
  return Number.isFinite(n) ? Math.trunc(n) : null;
}

export async function POST(request: Request) {
  const ip = getClientIp(request);

  let payload: NedarimPayload;
  try {
    payload = (await request.json()) as NedarimPayload;
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }

  if (!ip || !ALLOWED_IPS.has(ip)) {
    await prisma.webhookLog.create({
      data: {
        ip: ip ?? "unknown",
        payload: payload as never,
        processed: false,
        error: "rejected: IP not in allowlist",
      },
    });
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  // Save the raw payload first, unconditionally, before any processing -
  // Nedarim Plus does not retry failed calls, so this is our only safety net.
  const log = await prisma.webhookLog.create({
    data: { ip, payload: payload as never, processed: false },
  });

  try {
    const transactionId = str(payload, "TransactionId");
    const kevaId = str(payload, "KevaId");
    const nextDate = str(payload, "NextDate");
    const isRecurringSetup = Boolean(kevaId && nextDate && !transactionId);

    const baseData = {
      kevaId,
      isRecurringSetup,
      clientName: str(payload, "ClientName"),
      phone: str(payload, "Phone"),
      email: str(payload, "Mail"),
      address: str(payload, "Adresse"),
      zeout: str(payload, "Zeout"),
      amount: parseAmount(payload),
      currency: parseCurrency(payload),
      category: str(payload, "Groupe"),
      comments: str(payload, "Comments"),
      installments: parseInstallments(payload),
      transactionTime: parseDate(payload, "TransactionTime"),
      confirmationCode: str(payload, "Confirmation"),
      last4: str(payload, "LastNum"),
      cardExpiry: str(payload, "Tokef"),
      sourceChannel: str(payload, "MasofId"),
      receiptUrl: str(payload, "ReceiptData"),
      receiptDocNum: str(payload, "ReceiptDocNum"),
      rawPayload: payload as never,
    };

    if (isRecurringSetup && kevaId) {
      const existing = await prisma.donation.findFirst({
        where: { kevaId, isRecurringSetup: true },
      });
      if (!existing) {
        await prisma.donation.create({ data: baseData });
      }
    } else if (transactionId) {
      await prisma.donation.upsert({
        where: { transactionId },
        update: {},
        create: { ...baseData, transactionId },
      });
    } else {
      await prisma.donation.create({ data: baseData });
    }

    await prisma.webhookLog.update({
      where: { id: log.id },
      data: { processed: true },
    });
  } catch (err) {
    await prisma.webhookLog.update({
      where: { id: log.id },
      data: {
        error: err instanceof Error ? err.message : "unknown processing error",
      },
    });
  }

  return NextResponse.json({ ok: true });
}
