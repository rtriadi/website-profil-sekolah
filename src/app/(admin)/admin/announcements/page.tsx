import Link from "next/link";
import { getAllAnnouncementsAdmin } from "@/lib/content/announcement-service";
import { deleteAnnouncementAction } from "@/lib/actions/announcement-actions";

const categoryLabel: Record<string, string> = {
  berita: "Berita",
  kegiatan: "Kegiatan",
  pengumuman: "Pengumuman",
};

function isScheduled(scheduledAt?: string): boolean {
  if (!scheduledAt) return false;
  return new Date(scheduledAt) > new Date();
}

export default async function AdminAnnouncementsPage() {
  const announcements = await getAllAnnouncementsAdmin();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Pengumuman</h1>
        <Link
          href="/admin/announcements/create"
          className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
        >
          Buat Pengumuman
        </Link>
      </div>

      {announcements.length === 0 ? (
        <p className="text-slate-500">Belum ada pengumuman.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-slate-500">
                  Judul
                </th>
                <th className="px-4 py-3 text-left font-medium text-slate-500">
                  Kategori
                </th>
                <th className="px-4 py-3 text-left font-medium text-slate-500">
                  Tanggal
                </th>
                <th className="px-4 py-3 text-right font-medium text-slate-500">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {announcements.map((a) => (
                <tr key={a.id}>
                  <td className="px-4 py-3 font-medium text-slate-900">
                    <div className="flex items-center gap-2">
                      {a.title}
                      {isScheduled(a.scheduledAt) && (
                        <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">Terjadwal</span>
                      )}
                      {a.spotlight && (
                        <span className="rounded-full bg-violet-100 px-2 py-0.5 text-xs font-medium text-violet-700">Utama</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
                      {categoryLabel[a.category] ?? a.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    {new Date(a.publishedAt).toLocaleDateString("id-ID", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/announcements/${a.id}`}
                        className="rounded-md bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-200"
                      >
                        Edit
                      </Link>
                      <form action={deleteAnnouncementAction.bind(null, a.id)}>
                        <button
                          type="submit"
                          className="rounded-md bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-100"
                        >
                          Hapus
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
