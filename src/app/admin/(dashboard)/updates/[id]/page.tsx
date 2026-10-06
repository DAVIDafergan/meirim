import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import UpdateEditor from "../UpdateEditor";
import DeleteUpdateButton from "./DeleteUpdateButton";

export const dynamic = "force-dynamic";

export default async function UpdateAdminPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: rawId } = await params;
  const id = Number(rawId);
  const update = Number.isInteger(id) ? await prisma.update.findUnique({ where: { id } }) : null;
  if (!update) {
    notFound();
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <Link href="/admin/updates" className="text-sm text-gray-400 hover:text-gold">
            ← ניהול אירועים ועדכונים
          </Link>
          <h1 className="mt-2 font-display text-2xl text-gold sm:text-3xl">{update.title}</h1>
        </div>
        <DeleteUpdateButton id={update.id} />
      </div>

      <UpdateEditor
        update={{
          id: update.id,
          title: update.title,
          body: update.body,
          link: update.link,
          published: update.published,
          image: update.image,
        }}
      />
    </div>
  );
}
