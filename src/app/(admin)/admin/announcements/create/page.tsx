import { createAnnouncementAction } from "@/lib/actions/announcement-actions";
import { AnnouncementForm } from "@/components/admin/announcement-form";

export default function CreateAnnouncementPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-slate-900">
        Buat Pengumuman
      </h1>
      <div className="max-w-2xl rounded-lg border border-slate-200 bg-white p-6">
        <AnnouncementForm action={createAnnouncementAction} />
      </div>
    </div>
  );
}
