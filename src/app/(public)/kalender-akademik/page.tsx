import { getAcademicCalendar } from "@/lib/content/academic-calendar-service";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kalender Akademik",
};

const typeLabels: Record<string, string> = {
  semester: "Semester",
  libur: "Libur",
  ujian: "Ujian",
  rapot: "Pembagian Rapot",
  kegiatan: "Kegiatan",
};

const typeColors: Record<string, string> = {
  semester: "bg-blue-100 text-blue-700",
  libur: "bg-yellow-100 text-yellow-700",
  ujian: "bg-purple-100 text-purple-700",
  rapot: "bg-green-100 text-green-700",
  kegiatan: "bg-orange-100 text-orange-700",
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
    <main>
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
          <h1 className="text-3xl font-bold text-slate-900">
            {calendar.title}
          </h1>
          <p className="mt-2 text-slate-600">
            Tahun Ajaran {calendar.academicYear}
          </p>
        </div>
      </section>

      <section className="border-b border-slate-200">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
          {calendar.periods.length === 0 ? (
            <p className="text-sm text-slate-400">
              Kalender akademik belum tersedia.
            </p>
          ) : (
            <div className="space-y-10">
              {calendar.periods
                .sort((a, b) => a.sortOrder - b.sortOrder)
                .map((period) => {
                  const startStr = period.startDate
                    ? formatDate(period.startDate)
                    : "";
                  const endStr = period.endDate
                    ? formatDate(period.endDate)
                    : "";

                  return (
                    <div key={period.id}>
                      <div className="mb-4 border-l-4 border-slate-900 pl-4">
                        <h2 className="text-xl font-semibold text-slate-900">
                          {period.label}
                        </h2>
                        {(startStr || endStr) && (
                          <p className="text-sm text-slate-500">
                            {startStr}
                            {startStr && endStr && " – "}
                            {endStr}
                          </p>
                        )}
                      </div>

                      {period.events.length === 0 ? (
                        <p className="ml-4 text-sm text-slate-400">
                          Belum ada event.
                        </p>
                      ) : (
                        <div className="ml-4 space-y-2">
                          {period.events
                            .sort((a, b) => a.date.localeCompare(b.date))
                            .map((evt) => (
                              <div
                                key={evt.id}
                                className="flex items-start gap-3 rounded-lg border border-slate-100 bg-white p-3"
                              >
                                <span
                                  className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${typeColors[evt.type] ?? "bg-slate-100 text-slate-700"}`}
                                >
                                  {typeLabels[evt.type] ?? evt.type}
                                </span>
                                <div className="min-w-0 flex-1">
                                  <p className="text-sm font-medium text-slate-900">
                                    {evt.title}
                                  </p>
                                  {evt.description && (
                                    <p className="text-xs text-slate-500">
                                      {evt.description}
                                    </p>
                                  )}
                                </div>
                                <span className="shrink-0 text-xs text-slate-400">
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
    </main>
  );
}
