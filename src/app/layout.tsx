import type { Metadata } from "next";
import { Heebo } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";

const heebo = Heebo({
  variable: "--font-heebo",
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "מאירים את הגליל | נחלי התורה צפת",
  description:
    "קמפיין 'מאירים את הגליל' – תרומה דחופה לילדי ומשפחות צפת. מוסדות נחלי התורה צפת זקוקים לכם עכשיו.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="he"
      dir="rtl"
      className={`${heebo.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black text-white font-sans">
        <div className="grain-overlay" />
        <ScrollProgress />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
