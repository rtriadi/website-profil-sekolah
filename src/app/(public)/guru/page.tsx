import { getTeachers } from "@/lib/content/teachers-service";

export default function TeachersPage() {
  const teachers = getTeachers();

  return (
    <div className="py-16">
      <div className="mx-auto max-w-5xl px-4">
        <h1 className="mb-2 text-3xl font-bold text-slate-900">Data Guru</h1>
        <p className="mb-8 text-slate-600">
          Tenaga pendidik dan kependidikan sekolah
        </p>

        {teachers.length === 0 ? (
          <p className="text-slate-500">Data guru belum tersedia.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {teachers.map((t) => (
              <div
                key={t.id}
                className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-lg font-bold text-slate-600">
                    {t.name.charAt(0)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-slate-900">
                      {t.name}
                    </p>
                    <p className="text-xs text-slate-500">{t.position}</p>
                  </div>
                </div>
                <div className="space-y-1 text-xs text-slate-600">
                  <p>
                    <span className="font-medium text-slate-700">NIP:</span> {t.nip}
                  </p>
                  <p>
                    <span className="font-medium text-slate-700">Bidang Studi:</span>{" "}
                    {t.subject}
                  </p>
                  {t.description && <p>{t.description}</p>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
