import { getMealMenu } from "@/lib/content/meal-service";

export default async function MealMenuPage() {
  const menu = getMealMenu();

  const dayOrder = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];
  const sorted = [...menu].sort(
    (a, b) => dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day),
  );

  return (
    <>
      <section className="border-b border-slate-200 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
          <h1 className="text-center text-3xl font-bold text-white">
            Menu Makanan
          </h1>
          <p className="mt-2 text-center text-slate-300">
            Jadwal menu makanan mingguan untuk anak didik
          </p>
        </div>
      </section>

      <section className="border-b border-slate-200">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
          {sorted.length === 0 ? (
            <p className="text-center text-slate-500">Belum ada menu.</p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {sorted.map((item) => (
                <div
                  key={item.id}
                  className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <div className="mb-3 inline-block rounded-full bg-indigo-100 px-3 py-1 text-sm font-semibold text-indigo-700">
                    {item.day}
                  </div>
                  <dl className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-slate-500">Snack</dt>
                      <dd className="font-medium text-slate-900">{item.snack}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-slate-500">Makanan</dt>
                      <dd className="font-medium text-slate-900">{item.main}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-slate-500">Minuman</dt>
                      <dd className="font-medium text-slate-900">{item.drink}</dd>
                    </div>
                  </dl>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
