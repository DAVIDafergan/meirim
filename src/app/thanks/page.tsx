import type { Metadata } from "next";
import ThanksContent from "./ThanksContent";

export const metadata: Metadata = {
  title: "תודה על תרומתכם | מאירים את הגליל",
};

export default function ThanksPage() {
  return (
    <main className="ambient-glow flex min-h-screen flex-col items-center justify-center px-6 py-24 text-center">
      <ThanksContent />
    </main>
  );
}
