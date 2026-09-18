"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Kicker from "@/components/Kicker";
import DepartmentGallery from "@/components/DepartmentGallery";
import { DEPARTMENT_ICONS, type DepartmentIconKey } from "@/components/icons";
import { nedarimPlusUrl, CAMPAIGN_GROUPE } from "@/lib/nedarim";
import { goldButton } from "@/lib/uiConstants";
import { useLanguage } from "@/components/LanguageProvider";
import { fadeUp } from "@/lib/motionVariants";

export type DepartmentDetail = {
  name: string;
  summary: string;
  body: string | null;
  icon: string;
  analyticTag: string;
  images: { id: number; caption: string | null; filename: string }[];
};

export default function DepartmentDetailView({ department }: { department: DepartmentDetail }) {
  const { t } = useLanguage();
  const Icon = DEPARTMENT_ICONS[department.icon as DepartmentIconKey];
  const bodyParagraphs = department.body?.split("\n").filter((p) => p.trim()) ?? [];

  return (
    <main className="relative flex-1 px-6 py-28 sm:py-32">
      <div className="mx-auto max-w-3xl">
        <Link href="/departments" className="text-sm text-foreground-muted transition-colors hover:text-gold">
          {t.departmentDetail.back}
        </Link>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-6 flex flex-col items-center gap-6 text-center"
        >
          {Icon && (
            <span className="arch-niche flex h-20 w-16 items-center justify-center border-2 border-gold/60 text-gold">
              <Icon className="h-8 w-8" />
            </span>
          )}
          <Kicker>{t.departmentDetail.kicker}</Kicker>
          <h1 className="font-display font-black text-4xl leading-snug tracking-tight text-jewel-purple sm:text-5xl">
            {department.name}
          </h1>
          <p className="text-lg leading-loose text-foreground-muted sm:text-xl">{department.summary}</p>

          {bodyParagraphs.map((p, i) => (
            <p key={i} className="text-base leading-loose text-foreground-muted">
              {p}
            </p>
          ))}

          <a
            href={nedarimPlusUrl({
              groupe: CAMPAIGN_GROUPE,
              analytic: department.analyticTag,
              redirectPath: "/thanks",
            })}
            className={`mt-2 inline-block px-10 py-4 text-lg ${goldButton}`}
          >
            {t.departmentDetail.support}
          </a>
        </motion.div>

        {department.images.length > 0 && (
          <div className="mt-16">
            <DepartmentGallery
              images={department.images.map((img) => ({
                id: img.id,
                caption: img.caption,
                url: `/api/media/${img.filename}`,
              }))}
            />
          </div>
        )}
      </div>
    </main>
  );
}
