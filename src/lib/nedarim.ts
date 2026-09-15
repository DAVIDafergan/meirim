// The Groupe tag sent to Nedarim Plus for every donation button on this
// site - used to filter the dashboard/live totals to only this campaign,
// in case the same MosadId is ever reused for other campaigns.
export const CAMPAIGN_GROUPE = "קמפיין מאירים את הגליל";

// Donations sharing MosadId 7011515 come from several sources: this
// campaign's own buttons (tagged with CAMPAIGN_GROUPE), plus direct
// donations to the institution entered under its own name in Nedarim
// Plus. All of these should count toward the totals/lists shown on the
// site; other campaigns on the same MosadId should not.
export const DISPLAY_CATEGORIES = [
  CAMPAIGN_GROUPE,
  "נחלי התורה צפת",
  "מוסדות ברסלב נחלי התורה צפת",
];

// Categories on the shared MosadId that are never real campaign/institution
// donations (e.g. Meron pilgrimage registrations, paid services) - excluded
// even if the amount clears GENERAL_DONATION_MIN_AMOUNT below.
const EXCLUDED_CATEGORY_SUBSTRINGS = ["מירון", "שירות"];

// A large-but-plausible amount: sizable general donations connected to the
// campaign are shown even without an exact category match, but this stays
// well above routine payments (Meron registrations, service fees) so those
// don't slip in just by being pricier than a typical donation.
export const GENERAL_DONATION_MIN_AMOUNT = 1800;

export const donationDisplayFilter = {
  OR: [
    { category: { in: DISPLAY_CATEGORIES } },
    {
      amount: { gte: GENERAL_DONATION_MIN_AMOUNT },
      NOT: EXCLUDED_CATEGORY_SUBSTRINGS.map((s) => ({
        category: { contains: s },
      })),
    },
  ],
};

export const donationTierValues = [180, 360, 500, 1000];

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
