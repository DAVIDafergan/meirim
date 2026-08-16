import { createHash } from "crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "meirim_admin_session";

function expectedToken() {
  const password = process.env.ADMIN_PASSWORD ?? "";
  return createHash("sha256").update(`meirim-admin:${password}`).digest("hex");
}

export function checkPassword(password: string) {
  return password === process.env.ADMIN_PASSWORD;
}

export function tokenForCookie() {
  return expectedToken();
}

export async function isAdminAuthed() {
  const store = await cookies();
  const cookie = store.get(ADMIN_COOKIE)?.value;
  if (!cookie) return false;
  return cookie === expectedToken();
}
