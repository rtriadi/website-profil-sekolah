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
    <div className="relative min-h-screen overflow-hidden bg-[#070b15] text-slate-100 font-sans pb-24">
      {/* Background Decorative Mesh Glows */}
      <div className="absolute top-0 left-1/4 h-[500px] w-[500px] rounded-full bg-indigo-600/10 blur-3xl animate-pulse-glow" />
      <div className="absolute top-[40%] right-1/4 h-[600px] w-[600px] rounded-full bg-sky-500/10 blur-3xl animate-pulse-glow" style={{ animationDelay: "-4s" }} />

      {/* Hero Banner Grid Section */}
      <section className="relative pt-32 pb-16 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border-b border-white/5">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <span className="inline-flex rounded-full border border-sky-500/30 bg-sky-500/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-sky-300 shadow-[0_0_15px_rgba(56,189,248,0.2)] mb-4">
            🏫 AKADEMIK
          </span>
          <h1 className="font-heading text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Daftar Kelas & Wali Kelas
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-400">
            Informasi lengkap mengenai pembagian kelas, jumlah siswa, ruangan belajar, serta Wali Kelas yang berdedikasi membimbing putra-putri Anda.
          </p>
        </div>
      </section>

      {/* Classes Grid Section */}
      <section className="relative px-6 py-16">
        <div className="mx-auto max-w-5xl">
          {classes.length === 0 ? (
            <div className="rounded-2xl border border-white/5 bg-white/5 p-12 text-center backdrop-blur-md">
              <p className="text-slate-400 text-sm">Belum ada daftar kelas yang dipublikasikan.</p>
            </div>
          ) : (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {classes.map((c) => {
                const teacher = teachers.find((t) => t.id === c.teacherId);
                return (
                  <div
                    key={c.id}
                    className="group relative rounded-2xl border border-white/5 bg-white/5 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/30 hover:bg-white/10 hover:shadow-[0_8px_30px_rgba(99,102,241,0.1)] flex flex-col justify-between"
                  >
                    <div>
                      {/* Top Header Card */}
                      <div className="flex items-center justify-between border-b border-white/5 pb-3">
                        <h3 className="font-heading text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                          {c.name}
                        </h3>
                        {c.studentCount && (
                          <span className="inline-flex rounded-full bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-0.5 text-[10px] font-bold text-indigo-400">
                            👤 {c.studentCount} Siswa
                          </span>
                        )}
                      </div>

                      {/* Main Room Information */}
                      <div className="mt-4 space-y-2">
                        <p className="flex justify-between text-xs">
                          <span className="font-bold text-slate-500 uppercase tracking-wider">Ruangan:</span>
                          <span className="font-semibold text-slate-300">{c.roomName ?? "—"}</span>
                        </p>
                        <p className="flex justify-between text-xs">
                          <span className="font-bold text-slate-500 uppercase tracking-wider">Wali Kelas:</span>
                          <span className="font-semibold text-slate-300 text-right truncate max-w-[180px]" title={teacher?.name}>
                            {teacher?.name ?? "—"}
                          </span>
                        </p>
                      </div>

                      {/* Class Description */}
                      {c.description && (
                        <p className="mt-4 text-xs text-slate-400 leading-relaxed border-t border-white/5 pt-3">
                          {c.description}
                        </p>
                      )}
                    </div>

                    {/* Wali Kelas Photo/Details Indicator */}
                    {teacher && (
                      <div className="mt-6 flex items-center gap-3 border-t border-white/5 pt-4">
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
                          <h4 className="text-[11px] font-bold text-white truncate">{teacher.name}</h4>
                          <p className="text-[9px] text-slate-500 truncate mt-0.5">{teacher.position || "Guru"}</p>
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
    </div>
  );
}
