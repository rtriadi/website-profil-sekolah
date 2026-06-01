import { getClasses } from "@/lib/content/classes-service";
import { getTeachers } from "@/lib/content/teachers-service";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Daftar Kelas",
  description: "Daftar susunan kelas, ruangan belajar, serta wali kelas di sekolah kami.",
};

export default async function PublicClassesPage() {
  const [classes, teachers] = await Promise.all([
    getClasses(),
    getTeachers(),
  ]);

  return (
    <>
      {/* Hero Banner Grid Section */}
      <section className="border-b border-slate-200 dark:border-white/10 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 text-center">
          <span className="inline-flex rounded-full border border-sky-500/30 bg-sky-500/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-sky-300 shadow-[0_0_15px_rgba(56,189,248,0.2)] mb-4">
            🏫 AKADEMIK
          </span>
          <h1 className="font-heading text-3xl font-bold text-white sm:text-4xl">
            Daftar Kelas & Wali Kelas
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-300">
            Informasi lengkap mengenai pembagian kelas, jumlah siswa, ruangan belajar, serta Wali Kelas yang berdedikasi membimbing putra-putri Anda.
          </p>
        </div>
      </section>

      {/* Classes Grid Section */}
      <section className="border-b border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-slate-950/20 py-16 min-h-[60vh]">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          {classes.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 dark:border-white/5 bg-white dark:bg-slate-900/50 p-12 text-center shadow-sm">
              <p className="text-slate-400 dark:text-slate-500 text-sm">Belum ada daftar kelas yang dipublikasikan.</p>
            </div>
          ) : (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {classes.map((c) => {
                const teacher = teachers.find((t) => t.id === c.teacherId);
                return (
                  <div
                    key={c.id}
                    className="group relative rounded-2xl border border-slate-200 dark:border-white/5 bg-white dark:bg-slate-900/50 p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
                  >
                    <div>
                      {/* Top Header Card */}
                      <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-3">
                        <h3 className="font-heading text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                          {c.name}
                        </h3>
                        {c.studentCount && (
                          <span className="inline-flex rounded-full bg-indigo-5 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 px-2.5 py-0.5 text-[10px] font-bold text-indigo-600 dark:text-indigo-400">
                            👤 {c.studentCount} Siswa
                          </span>
                        )}
                      </div>

                      {/* Main Room Information */}
                      <div className="mt-4 space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Ruangan:</span>
                          <span className="font-semibold text-slate-700 dark:text-slate-300">{c.roomName ?? "—"}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Wali Kelas:</span>
                          <span className="font-semibold text-slate-700 dark:text-slate-300 text-right truncate max-w-[180px]" title={teacher?.name}>
                            {teacher?.name ?? "—"}
                          </span>
                        </div>
                      </div>

                      {/* Class Description */}
                      {c.description && (
                        <p className="mt-4 text-xs text-slate-500 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-white/5 pt-3">
                          {c.description}
                        </p>
                      )}
                    </div>

                    {/* Wali Kelas Photo/Details Indicator */}
                    {teacher && (
                      <div className="mt-6 flex items-center gap-3 border-t border-slate-100 dark:border-white/5 pt-4">
                        <div className="h-9 w-9 rounded-full bg-gradient-to-br from-indigo-500 to-sky-400 flex items-center justify-center text-sm font-extrabold text-slate-950 shadow-md">
                          {teacher.photoUrl ? (
                            <img
                              src={teacher.photoUrl}
                              alt={teacher.name}
                              className="h-full w-full rounded-full object-cover"
                            />
                          ) : (
                            teacher.name.charAt(0).toUpperCase()
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="text-[11px] font-bold text-slate-900 dark:text-white truncate">{teacher.name}</h4>
                          <p className="text-[9px] text-slate-400 dark:text-slate-500 truncate mt-0.5">{teacher.position || "Guru"}</p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
