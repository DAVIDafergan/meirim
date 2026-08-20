// The Groupe tag sent to Nedarim Plus for every donation button on this
// site - used to filter the dashboard/live totals to only this campaign,
// in case the same MosadId is ever reused for other campaigns.
export const CAMPAIGN_GROUPE = "קמפיין מאירים את הגליל";

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
  // Built manually (not via URLSearchParams) because Nedarim Plus echoes
  // Groupe back verbatim in webhook payloads without decoding "+" to a
  // space, so we encode spaces as %20 instead of the x-www-form-urlencoded
  // default of "+".
  const pairs: [string, string][] = [["mosad", MOSAD_ID]];
  if (opts.amount) pairs.push(["Amount", String(opts.amount)]);
  if (opts.lock) pairs.push(["AmountLock", "1"]);
  if (opts.groupe) pairs.push(["Groupe", opts.groupe]);
  if (opts.analytic) pairs.push(["Analytic", opts.analytic]);
  if (opts.redirectPath) {
    pairs.push(["Redirect", `${SITE_DOMAIN}${opts.redirectPath}`]);
  }
  if (opts.onlyKeva) pairs.push(["OnlyKeva", "1"]);
  const qs = pairs
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join("&");
  return `${BASE_URL}?${qs}`;
}
