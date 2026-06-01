import { notFound } from "next/navigation";
import { getAnnouncementById } from "@/lib/content/announcement-service";
import { updateAnnouncementAction } from "@/lib/actions/announcement-actions";
import { AnnouncementForm } from "@/components/admin/announcement-form";

export default async function EditAnnouncementPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  const announcement = await getAnnouncementById(id);
  if (!announcement) notFound();

  const boundAction = updateAnnouncementAction.bind(null, announcement.id);

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-slate-900">Edit Pengumuman</h1>
      <div className="max-w-2xl rounded-lg border border-slate-200 bg-white p-6">
        <AnnouncementForm action={boundAction} initialData={announcement} />
      </div>
    </div>
  );
}
