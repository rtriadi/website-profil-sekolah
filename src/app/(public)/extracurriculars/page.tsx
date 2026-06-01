import { getExtracurriculars } from "@/lib/content/extracurricular-service";

export default async function ExtracurricularsPage() {
  const items = getExtracurriculars().sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <>
      <section className="border-b border-slate-200 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
          <h1 className="text-center text-3xl font-bold text-white">
            Ekstrakurikuler
          </h1>
          <p className="mt-2 text-center text-slate-300">
            Kegiatan pengembangan bakat dan minat anak didik
          </p>
        </div>
      </section>

      <section className="border-b border-slate-200">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
          {items.length === 0 ? (
            <p className="text-center text-slate-500">Belum ada ekstrakurikuler.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <div className="mb-3 text-3xl">{item.icon || "⭐"}</div>
                  <h3 className="text-lg font-semibold text-slate-900">{item.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {item.description}
                  </p>
                  <dl className="mt-4 space-y-1 text-sm">
                    <div className="flex items-center gap-2 text-slate-500">
                      <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      <span>{item.schedule}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-500">
                      <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>
                      <span>{item.coach}</span>
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
