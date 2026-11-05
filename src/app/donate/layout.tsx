import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'תרומה ושותפות | מוסדות ברסלב "נחלי התורה" צפת',
  description:
    'תרמו למוסדות ברסלב "נחלי התורה" בעיר העתיקה בצפת: גנים, תלמוד תורה, ישיבה, כולל, בית התבשיל והוצאת ספרים. כל תרומה מקבלת חלק בלימוד התורה ובחסד.',
  alternates: { canonical: "/donate" },
};

export default function DonateLayout({ children }: { children: React.ReactNode }) {
  return children;
}
