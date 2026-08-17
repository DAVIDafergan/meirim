const MOSAD_ID = "7011515";
const BASE_URL = "https://www.matara.pro/nedarimplus/online/";
const SITE_DOMAIN =
  process.env.NEXT_PUBLIC_SITE_DOMAIN ?? "meirim-production.up.railway.app";

export function nedarimPlusUrl(
  opts: {
    amount?: number;
    lock?: boolean;
    groupe?: string;
    analytic?: string;
    redirectPath?: string;
    onlyKeva?: boolean;
  } = {}
) {
  const params = new URLSearchParams();
  params.set("mosad", MOSAD_ID);
  if (opts.amount) params.set("Amount", String(opts.amount));
  if (opts.lock) params.set("AmountLock", "1");
  if (opts.groupe) params.set("Groupe", opts.groupe);
  if (opts.analytic) params.set("Analytic", opts.analytic);
  if (opts.redirectPath) {
    params.set("Redirect", `${SITE_DOMAIN}${opts.redirectPath}`);
  }
  if (opts.onlyKeva) params.set("OnlyKeva", "1");
  return `${BASE_URL}?${params.toString()}`;
}
