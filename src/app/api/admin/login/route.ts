import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { checkPassword, tokenForCookie, ADMIN_COOKIE } from "@/lib/adminAuth";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "בקשה לא תקינה" }, { status: 400 });
  }

  const { password } = (body ?? {}) as { password?: unknown };

  if (typeof password !== "string" || !checkPassword(password)) {
    return NextResponse.json({ error: "סיסמה שגויה" }, { status: 401 });
  }

  const store = await cookies();
  store.set(ADMIN_COOKIE, tokenForCookie(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return NextResponse.json({ ok: true });
}
