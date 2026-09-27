"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import AdminLogoutButton from "@/components/AdminLogoutButton";

function LeadsIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className={className}>
      <path d="M4 20c0-3.3 2.7-6 6-6h1c-1.5 1.5-1.5 4.5 0 6M15 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" strokeLinecap="round" />
      <path d="M14 20c0-3.3 2.7-6 6-6" strokeLinecap="round" />
      <circle cx="19" cy="10" r="2.4" />
    </svg>
  );
}
function DonationsIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className={className}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5v9M9.5 15c0 1.1 1.1 2 2.5 2s2.5-.8 2.5-2-1-1.7-2.5-2-2.5-.9-2.5-2 1.1-2 2.5-2 2.2.5 2.4 1.4" strokeLinecap="round" />
    </svg>
  );
}
function GalleryIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className={className}>
      <rect x="3.5" y="4.5" width="17" height="15" rx="2.2" />
      <circle cx="8.5" cy="9.5" r="1.6" />
      <path d="m5 17 4.5-4.5a2 2 0 0 1 2.8 0L19 19" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function DepartmentsIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className={className}>
      <rect x="3.5" y="3.5" width="7" height="7" rx="1.4" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="1.4" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1.4" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="1.4" />
    </svg>
  );
}
function CoursesIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className={className}>
      <path d="M12 5 2.5 9.5 12 14l9.5-4.5L12 5Z" strokeLinejoin="round" />
      <path d="M6 12v4.5c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5V12" strokeLinecap="round" />
    </svg>
  );
}

const NAV = [
  { href: "/admin", label: "לוח בקרה", Icon: LeadsIcon },
  { href: "/admin/donations", label: "תרומות", Icon: DonationsIcon },
  { href: "/admin/gallery", label: "גלריה", Icon: GalleryIcon },
  { href: "/admin/departments", label: "פעילות", Icon: DepartmentsIcon },
  { href: "/admin/courses", label: "קורסים", Icon: CoursesIcon },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-full shrink-0 flex-col border-white/10 bg-[#0b0b0e] sm:h-screen sm:w-60 sm:border-e sm:sticky sm:top-0">
      <div className="border-b border-white/10 px-6 py-6">
        <p className="font-display text-lg font-bold text-gold">נחלי התורה</p>
        <p className="mt-0.5 text-xs text-gray-500">ממשק ניהול</p>
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-3 py-4">
        {NAV.map(({ href, label, Icon }) => {
          const active = href === "/admin" ? pathname === "/admin" : pathname?.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                active
                  ? "bg-gold/10 font-bold text-gold"
                  : "text-gray-400 hover:bg-white/5 hover:text-gray-200"
              }`}
            >
              <Icon className="h-4.5 w-4.5 shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="flex flex-col gap-2 border-t border-white/10 px-4 py-4">
        <Link href="/" target="_blank" className="px-2 py-1.5 text-xs text-gray-500 hover:text-gray-300">
          ← צפייה באתר
        </Link>
        <AdminLogoutButton />
      </div>
    </aside>
  );
}
