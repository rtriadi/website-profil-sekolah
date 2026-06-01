import { getAcademicCalendar } from "@/lib/content/academic-calendar-service";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kalender Akademik",
  description: "Kalender agenda dan jadwal kegiatan akademik sekolah",
};

const typeLabels: Record<string, string> = {
  semester: "Semester",
  libur: "Libur",
  ujian: "Ujian",
  rapot: "Pembagian Rapot",
  kegiatan: "Kegiatan",
};

const typeColors: Record<string, string> = {
  semester: "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400",
  libur: "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400",
  ujian: "bg-purple-100 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400",
  rapot: "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400",
  kegiatan: "bg-orange-100 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400",
};

function formatDate(iso: string) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function AcademicCalendarPage() {
  const calendar = getAcademicCalendar();

  return (
    <>
      <section className="border-b border-slate-200 dark:border-white/10 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
          <h1 className="text-center text-3xl font-bold text-white font-heading">
            {calendar.title}
          </h1>
          <p className="mt-2 text-center text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
            Jadwal kegiatan belajar mengajar dan hari penting Tahun Ajaran {calendar.academicYear}
          </p>
        </div>
      </section>

      <section className="border-b border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-slate-950/20 py-12 min-h-[60vh]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          {calendar.periods.length === 0 ? (
            <p className="text-center text-slate-500 dark:text-slate-400">
              Kalender akademik belum tersedia.
            </p>
          ) : (
            <div className="space-y-12">
              {calendar.periods
                .sort((a, b) => a.sortOrder - b.sortOrder)
                .map((period) => {
                  const startStr = period.startDate ? formatDate(period.startDate) : "";
                  const endStr = period.endDate ? formatDate(period.endDate) : "";

                  return (
                    <div key={period.id} className="rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-slate-900/50 p-6 shadow-sm">
                      <div className="mb-5 border-l-4 border-indigo-500 pl-4 leading-none">
                        <h2 className="text-xl font-bold font-heading text-slate-900 dark:text-white">
                          {period.label}
                        </h2>
                        {(startStr || endStr) && (
                          <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mt-1.5">
                            📅 {startStr} {startStr && endStr && " – "} {endStr}
                          </p>
                        )}
                      </div>

                      {period.events.length === 0 ? (
                        <p className="text-sm text-slate-400 dark:text-slate-500 italic pl-4">
                          Belum ada agenda terdaftar pada periode ini.
                        </p>
                      ) : (
                        <div className="space-y-3 pl-4">
                          {period.events
                            .sort((a, b) => a.date.localeCompare(b.date))
                            .map((evt) => (
                              <div
                                key={evt.id}
                                className="flex items-start gap-4 rounded-xl border border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-slate-950/40 p-4 transition duration-200 hover:border-slate-200 dark:hover:border-white/10"
                              >
                                <span
                                  className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                                    typeColors[evt.type] ?? "bg-slate-100 text-slate-700"
                                  }`}
                                >
                                  {typeLabels[evt.type] ?? evt.type}
                                </span>
                                <div className="min-w-0 flex-1">
                                  <p className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                                    {evt.title}
                                  </p>
                                  {evt.description && (
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                                      {evt.description}
                                    </p>
                                  )}
                                </div>
                                <span className="shrink-0 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider self-center">
                                  {evt.date ? formatDate(evt.date) : ""}
                                </span>
                              </div>
                            ))}
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
