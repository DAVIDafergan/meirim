import type { Metadata } from "next";
import LessonsPageContent from "./LessonsPageContent";

export const metadata: Metadata = {
  alternates: { canonical: "/lessons" },
  title: 'שיעורים | מוסדות ברסלב "נחלי התורה" צפת',
  description: "שיעורים מלאים וסרטונים קצרים מהרב, מתעדכן אוטומטית מהערוץ ביוטיוב.",
};

export default function LessonsPage() {
  return <LessonsPageContent />;
}
