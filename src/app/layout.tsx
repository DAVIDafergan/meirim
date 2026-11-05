import type { Metadata } from "next";
import { Assistant, Frank_Ruhl_Libre } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import { LanguageProvider } from "@/components/LanguageProvider";

const heebo = Assistant({
  variable: "--font-heebo",
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "600", "700"],
  display: "swap",
});

const frankRuhlLibre = Frank_Ruhl_Libre({
  variable: "--font-serif-display",
  subsets: ["hebrew", "latin"],
  weight: ["300", "500", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://nachalei-hatorah.org"),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "he_IL",
    siteName: 'נחלי התורה צפת',
    title: 'מוסדות ברסלב "נחלי התורה" | העיר העתיקה, צפת',
    description: "גן, תלמוד תורה, ישיבה, כולל, הוצאת ספרים ובית התבשיל בלב העיר העתיקה בצפת.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: 'מוסדות ברסלב "נחלי התורה" צפת' }],
  },
  twitter: { card: "summary_large_image", images: ["/og-image.jpg"] },
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
          <ScrollProgress />
          <Navbar />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
