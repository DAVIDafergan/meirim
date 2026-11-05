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
  keywords: ["נחלי התורה", "נחלי התורה צפת", "ברסלב צפת", "מוסדות ברסלב", "תלמוד תורה צפת", "ישיבה בצפת", "כולל אברכים צפת", "תרומה לצפת", "הרב נתן מרדכי ישראל", "ספרי ברסלב", "אור המעשיות", "אור מוהר\"ן"],
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  category: "religion",
  openGraph: {
    type: "website",
    url: "/",
    locale: "he_IL",
    siteName: 'נחלי התורה צפת',
    title: 'מוסדות ברסלב "נחלי התורה" | העיר העתיקה, צפת',
    description: "גן, תלמוד תורה, ישיבה, כולל, הוצאת ספרים ובית התבשיל בלב העיר העתיקה בצפת.",
    images: [{ url: "/og-share.jpg", width: 1200, height: 630, type: "image/jpeg", alt: 'מוסדות ברסלב "נחלי התורה" צפת' }],
  },
  twitter: { card: "summary_large_image", images: ["/og-share.jpg"] },
  title: 'מוסדות ברסלב "נחלי התורה" | העיר העתיקה, צפת',
  description:
    'מוסדות ברסלב "נחלי התורה" בעיר העתיקה בצפת — קהילה של כ-250 משפחות בראשות הגאון רבי נתן מרדכי ישראל שליט"א. חינוך, קהילה וחסד לאורך כל שלבי החיים.',
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://nachalei-hatorah.org";
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["EducationalOrganization", "NGO"],
      "@id": `${SITE_URL}/#organization`,
      name: 'מוסדות ברסלב "נחלי התורה" צפת',
      alternateName: ["נחלי התורה", "Nachalei HaTorah Tzfat", "Breslov Institutions Nachalei HaTorah, Safed"],
      url: SITE_URL,
      logo: `${SITE_URL}/logo2-nav.png`,
      image: `${SITE_URL}/og-share.jpg`,
      description:
        'מוסדות ברסלב "נחלי התורה" בעיר העתיקה בצפת: גני ילדים, תלמוד תורה, ישיבה לבחורים צעירים, כולל אברכים, בית חינוך לבנות, מדרשיה, בית התבשיל ומכון להוצאת ספרים בכמה שפות, בראשות הגאון רבי נתן מרדכי ישראל שליט"א.',
      address: { "@type": "PostalAddress", addressLocality: "צפת", addressRegion: "הגליל העליון", addressCountry: "IL" },
      areaServed: "IL",
      inLanguage: ["he", "en"],
      sameAs: [
        "https://www.facebook.com/profile.php?id=61552477960447",
        "https://www.tiktok.com/@haravnatan",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'נחלי התורה צפת',
      inLanguage: "he",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="he"
      dir="rtl"
      className={`${heebo.variable} ${frankRuhlLibre.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <LanguageProvider>
          <ScrollProgress />
          <Navbar />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
