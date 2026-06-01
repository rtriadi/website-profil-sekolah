import { getLogs } from "@/lib/content/log-service";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AdminLogsPage() {
  const logs = getLogs(200);

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-slate-900">Log Aktivitas</h1>

      {logs.length === 0 ? (
        <div className="rounded-lg border-2 border-dashed border-slate-300 p-12 text-center">
          <p className="text-slate-500">Belum ada aktivitas.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-4 py-3">Waktu</th>
                <th className="px-4 py-3">Bagian</th>
                <th className="px-4 py-3">Aksi</th>
                <th className="px-4 py-3">Detail</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50">
                  <td className="whitespace-nowrap px-4 py-3 text-slate-400">
                    {formatDate(log.createdAt)}
                  </td>
                  <td className="px-4 py-3">
                    <span className="rounded bg-slate-100 px-1.5 py-0.5 text-xs font-medium text-slate-600">
                      {log.section}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-700">{log.action}</td>
                  <td className="px-4 py-3 text-slate-600">{log.detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
