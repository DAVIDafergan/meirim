"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import TiltCard from "@/components/TiltCard";
import { DEPARTMENT_ICONS, type DepartmentIconKey } from "@/components/icons";
import { cardsContainer, cardItem } from "@/lib/motionVariants";
import { nedarimPlusUrl, CAMPAIGN_GROUPE } from "@/lib/nedarim";
import { goldButton } from "@/lib/uiConstants";

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
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
    >
      {departments.map((dept) => {
        const Icon = DEPARTMENT_ICONS[dept.icon as DepartmentIconKey];
        return (
          <motion.div key={dept.slug} variants={cardItem} style={{ perspective: 1000 }}>
            <TiltCard className="flex h-full flex-col items-center gap-3 rounded-2xl border border-white/15 bg-white/[0.08] p-6 text-center shadow-xl backdrop-blur-md transition-shadow duration-300 hover:border-gold/60 hover:shadow-[0_0_30px_rgba(201,162,39,0.25)]">
              {Icon && (
                <span className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/30 bg-gradient-to-b from-gold/10 to-transparent text-gold shadow-[0_0_20px_rgba(201,162,39,0.15)]">
                  <Icon className="h-7 w-7" />
                </span>
              )}
              <h3 className="text-base font-bold text-white">{dept.name}</h3>
              <p className="line-clamp-3 flex-1 text-sm text-gray-300">{dept.summary}</p>
              <div className="mt-2 flex w-full flex-col gap-2">
                <Link
                  href={`/departments/${dept.slug}`}
                  className="rounded-full border border-gold/40 px-4 py-2 text-sm font-bold text-gold transition-colors hover:bg-gold/10"
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
            </TiltCard>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
