import { redirect } from "next/navigation";
import { isAdminAuthed } from "@/lib/adminAuth";
import AdminSidebar from "./AdminSidebar";

// Every page under this route group shares this one auth check, instead of
// each page redirecting to /admin/login on its own.
export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  if (!(await isAdminAuthed())) {
    redirect("/admin/login");
  }

  return (
    <div className="flex min-h-screen flex-col bg-black sm:flex-row">
      <AdminSidebar />
      <main className="min-w-0 flex-1 px-4 py-8 sm:px-10 sm:py-10">
        <div className="mx-auto max-w-6xl">{children}</div>
      </main>
    </div>
  );
}
