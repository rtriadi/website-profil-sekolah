import { getTeachers } from "@/lib/content/teachers-service";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tenaga Pendidik & Staf",
  description: "Direktori guru dan staf kependidikan sekolah",
};

export default function TeachersPage() {
  const teachers = getTeachers();

  return (
    <>
      <section className="border-b border-slate-200 dark:border-white/10 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
          <h1 className="text-center text-3xl font-bold text-white font-heading">
            Guru & Staf
          </h1>
          <p className="mt-2 text-center text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
            Mengenal lebih dekat para pendidik dan tenaga kependidikan profesional sekolah kami
          </p>
        </div>
      </section>

      <section className="border-b border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-slate-950/20 py-12 min-h-[60vh]">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          {teachers.length === 0 ? (
            <p className="text-center text-slate-500 dark:text-slate-400">Data guru belum tersedia.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {teachers.map((t) => (
                <div
                  key={t.id}
                  className="rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-slate-900/50 p-6 shadow-sm hover:shadow-md hover:border-slate-300 dark:hover:border-indigo-500/20 transition-all duration-300 group"
                >
                  <div className="mb-4 flex items-center gap-4">
                    <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-indigo-50 dark:bg-indigo-950/40 text-xl font-bold text-indigo-600 dark:text-indigo-400 border border-indigo-100/30 dark:border-indigo-500/10 overflow-hidden group-hover:scale-105 transition-transform duration-200">
                      {t.photoUrl ? (
                        <img src={t.photoUrl} alt={t.name} className="h-full w-full object-cover" />
                      ) : (
                        t.name.charAt(0)
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-base font-bold font-heading text-slate-900 dark:text-white leading-tight">
                        {t.name}
                      </p>
                      <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mt-1">{t.position}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 border-t border-slate-100 dark:border-white/5 pt-4 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    <p className="flex justify-between">
                      <span className="font-bold text-slate-500 dark:text-slate-500 text-xs uppercase tracking-wider">NIP:</span> 
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{t.nip || "—"}</span>
                    </p>
                    <p className="flex justify-between">
                      <span className="font-bold text-slate-500 dark:text-slate-500 text-xs uppercase tracking-wider">Kelas:</span> 
                      <span className="font-semibold text-slate-800 dark:text-slate-200 text-right truncate max-w-[160px]" title={t.subject}>{t.subject || "—"}</span>
                    </p>
                    {t.description && (
                      <p className="text-xs text-slate-500 dark:text-slate-400 border-t border-slate-100/50 dark:border-white/5 pt-2 mt-2 italic leading-relaxed">
                        &ldquo;{t.description}&rdquo;
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
