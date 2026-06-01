import Link from "next/link";
import { getEvents } from "@/lib/content/events-service";
import type { EventCategory } from "@/lib/content/schema";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Acara & Kegiatan",
  description: "Kalender kegiatan dan acara sekolah resmi",
};

const categoryLabel: Record<string, string> = {
  akademik: "Akademik",
  "non-akademik": "Non Akademik",
  libur: "Libur",
  rapat: "Rapat",
  lainnya: "Lainnya",
};

const categoryColors: Record<string, string> = {
  akademik: "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400",
  "non-akademik": "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
  libur: "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
  rapat: "bg-violet-100 text-violet-700 dark:bg-violet-500/10 dark:text-violet-400",
  lainnya: "bg-slate-100 text-slate-700 dark:bg-slate-500/10 dark:text-slate-400",
};

function formatDate(iso: string): string {
  return new Date(iso + "T00:00:00").toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function groupByMonth(events: { date: string; title: string; slug: string; time?: string; location?: string; description: string; category: EventCategory }[]) {
  const groups: { month: string; events: typeof events }[] = [];
  for (const event of events) {
    const d = new Date(event.date + "T00:00:00");
    const key = d.toLocaleDateString("id-ID", { year: "numeric", month: "long" });
    const last = groups[groups.length - 1];
    if (last && last.month === key) {
      last.events.push(event);
    } else {
      groups.push({ month: key, events: [event] });
    }
  }
  return groups;
}

const ITEMS_PER_PAGE = 20;

export default async function EventsPage(props: {
  searchParams: Promise<{ kategori?: string; page?: string }>;
}) {
  const { kategori, page } = await props.searchParams;
  const currentPage = Math.max(1, Number(page) || 1);
  const all = await getEvents();
  const filtered = kategori && kategori !== "semua"
    ? all.filter((e) => e.category === kategori)
    : all;
  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paged = filtered.slice(0, currentPage * ITEMS_PER_PAGE);
  const hasMore = currentPage < totalPages;
  const groups = groupByMonth(paged);

  return (
    <>
      <section className="border-b border-slate-200 dark:border-white/10 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
          <h1 className="text-center text-3xl font-bold text-white font-heading">
            Acara Sekolah
          </h1>
          <p className="mt-2 text-center text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
            Kalender resmi kegiatan, agenda, dan acara sekolah kami
          </p>
        </div>
      </section>

      <section className="border-b border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-slate-950/20 py-12 min-h-[60vh]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="mb-10 flex flex-wrap gap-2 justify-center">
            <Link
              href="/events"
              className={`rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                !kategori || kategori === "semua"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/10"
                  : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              Semua
            </Link>
            {Object.entries(categoryLabel).map(([value, label]) => (
              <Link
                key={value}
                href={`/events?kategori=${value}`}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                  kategori === value
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/10"
                    : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          {filtered.length === 0 ? (
            <p className="text-center text-slate-500 dark:text-slate-400">Tidak ada acara untuk kategori ini.</p>
          ) : (
            <div className="space-y-12">
              {groups.map((g) => (
                <section key={g.month}>
                  <h2 className="mb-5 text-xl font-bold text-slate-900 dark:text-white border-l-4 border-indigo-500 pl-3 leading-none font-heading">
                    {g.month}
                  </h2>
                  <div className="space-y-4">
                    {g.events.map((e) => (
                      <div
                        key={e.slug}
                        className="rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-slate-900/50 p-6 shadow-sm hover:shadow-md hover:border-slate-300 dark:hover:border-indigo-500/20 transition-all duration-300"
                      >
                        <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
                          <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white tracking-tight">
                            {e.title}
                          </h3>
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${
                              categoryColors[e.category] ?? categoryColors.lainnya
                            }`}
                          >
                            {categoryLabel[e.category] ?? e.category}
                          </span>
                        </div>
                        <p className="mb-4 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{e.description}</p>
                        <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-medium text-slate-500 dark:text-slate-500">
                          <span className="flex items-center gap-1.5">
                            📅 {formatDate(e.date)}
                          </span>
                          {e.time && (
                            <span className="flex items-center gap-1.5">
                              ⏰ {e.time}
                            </span>
                          )}
                          {e.location && (
                            <span className="flex items-center gap-1.5">
                              📍 {e.location}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          )}

          {hasMore && (
            <div className="mt-10 text-center">
              <Link
                href={`/events?page=${currentPage + 1}${kategori ? `&kategori=${kategori}` : ""}`}
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-bold text-white shadow-sm hover:bg-slate-700 transition-colors"
              >
                Muat Lebih Banyak
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
            </div>
          )}

          <p className="mt-4 text-center text-xs text-slate-400">
            Menampilkan {filtered.length > 0 ? `${paged.length} dari ${filtered.length} acara` : "0 acara"}
          </p>
        </div>
      </section>
    </>
  );
}
