import type { Metadata } from "next";
import AboutContent from "@/components/AboutContent";

export const metadata: Metadata = {
  alternates: { canonical: "/about" },
  title: 'אודות | מוסדות ברסלב "נחלי התורה" צפת',
  description:
    'מוסדות ברסלב "נחלי התורה" בצפת – ת"ת, ישיבה, כולל אברכים ופעילות קירוב, בראשות הגאון הרב נתן מרדכי ישראל שליט"א.',
};

export default function AboutPage() {
  return <AboutContent />;
}
