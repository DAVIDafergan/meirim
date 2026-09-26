import type { Metadata } from "next";
import LessonsPageContent from "./LessonsPageContent";

export const metadata: Metadata = {
  title: 'שיעורים | מוסדות ברסלב "נחלי התורה" צפת',
  description: "שיעורים מלאים וסרטונים קצרים מהרב, מתעדכן אוטומטית מהערוץ ביוטיוב.",
};

export default function LessonsPage() {
  return <LessonsPageContent />;
}
