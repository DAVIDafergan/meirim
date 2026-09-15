import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { isAdminAuthed } from "@/lib/adminAuth";
import { prisma } from "@/lib/prisma";
import AdminLogoutButton from "@/components/AdminLogoutButton";
import DepartmentEditor from "./DepartmentEditor";

export const dynamic = "force-dynamic";

export default async function DepartmentAdminPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  if (!(await isAdminAuthed())) {
    redirect("/admin/login");
  }

  const { slug } = await params;
  const department = await prisma.department.findUnique({
    where: { slug },
    include: { images: { orderBy: { order: "asc" } } },
  });
  if (!department) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-black px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl text-gold sm:text-3xl">{department.name}</h1>
            <p className="mt-1 text-sm text-gray-400">
              <Link href="/admin/departments" className="hover:text-gold">
                מחלקות
              </Link>
              {" · "}
              {department.name}
            </p>
          </div>
          <AdminLogoutButton />
        </div>

        <DepartmentEditor
          slug={department.slug}
          initialName={department.name}
          initialSummary={department.summary}
          initialBody={department.body ?? ""}
          initialImages={department.images.map((img) => ({
            id: img.id,
            caption: img.caption,
            url: `/api/media/${img.filename}`,
          }))}
        />
      </div>
    </main>
  );
}
