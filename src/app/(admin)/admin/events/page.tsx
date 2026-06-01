import Link from "next/link";
import { getEvents } from "@/lib/content/events-service";
import { deleteEventAction } from "@/lib/actions/event-actions";

const categoryLabel: Record<string, string> = {
  akademik: "Akademik",
  "non-akademik": "Non Akademik",
  libur: "Libur",
  rapat: "Rapat",
  lainnya: "Lainnya",
};

function formatDate(iso: string): string {
  return new Date(iso + "T00:00:00").toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function AdminEventsPage() {
  const events = await getEvents();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Acara</h1>
        <Link
          href="/admin/events/create"
          className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
        >
          Buat Acara
        </Link>
      </div>

      {events.length === 0 ? (
        <p className="text-slate-500">Belum ada acara.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-slate-500">Judul</th>
                <th className="px-4 py-3 text-left font-medium text-slate-500">Tanggal</th>
                <th className="px-4 py-3 text-left font-medium text-slate-500">Kategori</th>
                <th className="px-4 py-3 text-right font-medium text-slate-500">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {events.map((e) => (
                <tr key={e.id}>
                  <td className="px-4 py-3 font-medium text-slate-900">{e.title}</td>
                  <td className="px-4 py-3 text-slate-600">{formatDate(e.date)}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
                      {categoryLabel[e.category] ?? e.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/events/${e.id}`}
                        className="rounded-md bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-200"
                      >
                        Edit
                      </Link>
                      <form action={deleteEventAction.bind(null, e.id)}>
                        <button type="submit" className="rounded-md bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-100">
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
