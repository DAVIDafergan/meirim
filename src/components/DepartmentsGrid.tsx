"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { DEPARTMENT_ICONS, type DepartmentIconKey } from "@/components/icons";
import { cardsContainer, cardItem } from "@/lib/motionVariants";
import { nedarimPlusUrl, CAMPAIGN_GROUPE } from "@/lib/nedarim";
import { goldButton, outlineButton } from "@/lib/uiConstants";

export type DepartmentSummary = {
  slug: string;
  name: string;
  icon: string;
  summary: string;
  analyticTag: string;
};

export default function DepartmentsGrid({
  departments,
}: {
  departments: DepartmentSummary[];
}) {
  if (departments.length === 0) return null;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={cardsContainer}
      className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
    >
      {departments.map((dept) => {
        const Icon = DEPARTMENT_ICONS[dept.icon as DepartmentIconKey];
        return (
          <motion.div
            key={dept.slug}
            variants={cardItem}
            className="flex h-full flex-col items-center gap-3 rounded-2xl border-2 border-jewel-purple/15 bg-background p-7 text-center"
          >
            {Icon && (
              <span className="arch-niche flex h-14 w-12 items-center justify-center border-2 border-gold/60 text-gold">
                <Icon className="h-6 w-6" />
              </span>
            )}
            <h3 className="font-display text-base font-bold text-jewel-purple">{dept.name}</h3>
            <p className="line-clamp-3 flex-1 text-sm text-foreground-muted">{dept.summary}</p>
            <div className="mt-2 flex w-full flex-col gap-2">
              <Link
                href={`/departments/${dept.slug}`}
                className={`px-4 py-2 text-sm text-jewel-purple ${outlineButton}`}
              >
                לפרטים
              </Link>
              <a
                href={nedarimPlusUrl({
                  groupe: CAMPAIGN_GROUPE,
                  analytic: dept.analyticTag,
                  redirectPath: "/thanks",
                })}
                className={`px-4 py-2 text-sm ${goldButton}`}
              >
                תמכו בפעילות זו
              </a>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
