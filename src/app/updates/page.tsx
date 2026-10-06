import type { Metadata } from "next";
import UpdatesPageHeader from "@/components/UpdatesPageHeader";
import UpdatesList from "@/components/UpdatesList";

export const metadata: Metadata = {
  title: 'אירועים ועדכונים | מוסדות ברסלב "נחלי התורה" צפת',
  description: "חדשות, אירועים והודעות עדכניות ממוסדות נחלי התורה.",
};

export default function UpdatesPage() {
  return (
    <main className="relative flex-1 px-6 py-28 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <UpdatesPageHeader />
        <UpdatesList />
      </div>
    </main>
  );
}
