import type { Metadata } from "next";
import { Heebo, Frank_Ruhl_Libre } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import { LanguageProvider } from "@/components/LanguageProvider";

const heebo = Heebo({
  variable: "--font-heebo",
  subsets: ["hebrew", "latin"],
  weight: ["400", "600", "700", "900"],
  display: "swap",
});

const frankRuhlLibre = Frank_Ruhl_Libre({
  variable: "--font-serif-display",
  subsets: ["hebrew", "latin"],
  weight: ["500", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: 'מוסדות ברסלב "נחלי התורה" | העיר העתיקה, צפת',
  description:
    'מוסדות ברסלב "נחלי התורה" בעיר העתיקה בצפת — קהילה של כ-250 משפחות בראשות הגאון רבי נתן מרדכי ישראל שליט"א. חינוך, קהילה וחסד לאורך כל שלבי החיים.',
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="he"
      dir="rtl"
      className={`${heebo.variable} ${frankRuhlLibre.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <LanguageProvider>
          <div className="grain-overlay" />
          <ScrollProgress />
          <Navbar />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
