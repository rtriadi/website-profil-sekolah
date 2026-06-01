import { getTuition } from "@/lib/content/tuition-service";

function formatRp(n: number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(n);
}

export default async function TuitionPage() {
  const data = getTuition();

  return (
    <>
      <section className="border-b border-slate-200 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
          <h1 className="text-center text-3xl font-bold text-white">
            Biaya & SPP
          </h1>
          <p className="mt-2 text-center text-slate-300">
            Informasi biaya pendidikan tahun ajaran {data.academicYear}
          </p>
        </div>
      </section>

      <section className="border-b border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-slate-950/20">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
          {data.items.length === 0 ? (
            <p className="text-center text-slate-500">Belum ada informasi biaya.</p>
          ) : (
            <div className="overflow-hidden rounded-lg border border-slate-200">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="px-4 py-3 font-semibold text-slate-900">Item Biaya</th>
                    <th className="px-4 py-3 font-semibold text-slate-900">Jumlah</th>
                    <th className="px-4 py-3 font-semibold text-slate-900">Keterangan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {data.items
                    .sort((a, b) => a.sortOrder - b.sortOrder)
                    .map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50">
                        <td className="px-4 py-3 font-medium text-slate-900">{item.label}</td>
                        <td className="px-4 py-3 text-slate-700">{formatRp(item.amount)}</td>
                        <td className="px-4 py-3 text-slate-500">{item.description || "-"}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
