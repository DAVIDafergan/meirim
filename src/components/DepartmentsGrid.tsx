"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { DEPARTMENT_ICONS, type DepartmentIconKey } from "@/components/icons";
import { EASE_LUX } from "@/lib/motionVariants";
import { nedarimPlusUrl, CAMPAIGN_GROUPE } from "@/lib/nedarim";
import { goldButton } from "@/lib/uiConstants";
import { useLanguage } from "@/components/LanguageProvider";

export type DepartmentSummary = {
  slug: string;
  name: string;
  icon: string;
  summary: string;
  analyticTag: string;
  cover?: string | null;
};

// Row palettes: text panel background / text colour, and the media panel's fallback.
const rows = [
  { panel: "bg-jewel-purple text-cream", media: "from-jewel-green to-jewel-purple-deep", dark: true },
  { panel: "bg-background-alt text-foreground", media: "from-jewel-wine to-jewel-purple", dark: false },
  { panel: "bg-jewel-green text-cream", media: "from-jewel-purple to-jewel-wine", dark: true },
];

export default function DepartmentsGrid({
  departments,
}: {
  departments: DepartmentSummary[];
}) {
  const { t } = useLanguage();
  if (departments.length === 0) return null;

  return (
    <div className="flex flex-col">
      {departments.map((dept, i) => {
        const Icon = DEPARTMENT_ICONS[dept.icon as DepartmentIconKey];
        const tone = rows[i % rows.length];
        const flip = i % 2 === 1;
        return (
          <motion.article
            key={dept.slug}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            className={`grid min-h-[28rem] grid-cols-1 md:grid-cols-2 ${tone.panel}`}
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, scale: 1.06 },
                visible: { opacity: 1, scale: 1, transition: { duration: 1.2, ease: EASE_LUX } },
              }}
              className={`relative min-h-64 overflow-hidden ${flip ? "md:order-2" : ""}`}
            >
              {dept.cover ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={dept.cover} alt={dept.name} className="absolute inset-0 h-full w-full object-cover" />
              ) : (
                <div className={`absolute inset-0 bg-gradient-to-br ${tone.media}`}>
                  {Icon && (
                    <Icon className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 text-white/15" />
                  )}
                </div>
              )}
              <span className="absolute bottom-4 start-6 font-display text-7xl font-bold leading-none text-white/80 drop-shadow-lg sm:text-8xl">
                {String(i + 1).padStart(2, "0")}
              </span>
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.9, delay: 0.15, ease: EASE_LUX } },
              }}
              className="flex flex-col items-start justify-center gap-5 px-8 py-14 sm:px-14 lg:px-20"
            >
              <span className="h-px w-14 bg-gold" />
              <h3 className="font-display text-3xl font-bold leading-snug sm:text-4xl">{dept.name}</h3>
              <p className={`max-w-lg text-base leading-loose sm:text-lg ${tone.dark ? "text-cream/80" : "text-foreground-muted"}`}>
                {dept.summary}
              </p>
              <div className="mt-2 flex flex-wrap gap-3">
                <Link
                  href={`/departments/${dept.slug}`}
                  className="rounded-full border border-current px-7 py-3 text-sm font-bold transition-opacity hover:opacity-70"
                >
                  {t.departmentsGrid.details}
                </Link>
                <a
                  href={nedarimPlusUrl({
                    groupe: CAMPAIGN_GROUPE,
                    analytic: dept.analyticTag,
                    redirectPath: "/thanks",
                  })}
                  className={`px-7 py-3 text-sm ${goldButton}`}
                >
                  {t.departmentsGrid.support}
                </a>
              </div>
            </motion.div>
          </motion.article>
        );
      })}
    </div>
  );
}
