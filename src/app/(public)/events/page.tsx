import Link from "next/link";
import { getEvents } from "@/lib/content/events-service";
import type { EventCategory } from "@/lib/content/schema";

const categoryLabel: Record<string, string> = {
  akademik: "Akademik",
  "non-akademik": "Non Akademik",
  libur: "Libur",
  rapat: "Rapat",
  lainnya: "Lainnya",
};

const categoryColors: Record<string, string> = {
  akademik: "bg-blue-100 text-blue-700",
  "non-akademik": "bg-emerald-100 text-emerald-700",
  libur: "bg-amber-100 text-amber-700",
  rapat: "bg-violet-100 text-violet-700",
  lainnya: "bg-slate-100 text-slate-700",
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

export default async function EventsPage(props: {
  searchParams: Promise<{ kategori?: string }>;
}) {
  const { kategori } = await props.searchParams;
  const all = await getEvents();
  const filtered = kategori && kategori !== "semua"
    ? all.filter((e) => e.category === kategori)
    : all;
  const groups = groupByMonth(filtered);

  return (
    <div className="py-16">
      <div className="mx-auto max-w-4xl px-4">
        <h1 className="mb-2 text-3xl font-bold text-slate-900">Acara Sekolah</h1>
        <p className="mb-8 text-slate-600">
          Kalender kegiatan dan acara sekolah
        </p>

        <div className="mb-8 flex flex-wrap gap-2">
          <Link
            href="/events"
            className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
              !kategori || kategori === "semua"
                ? "bg-slate-900 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            Semua
          </Link>
          {Object.entries(categoryLabel).map(([value, label]) => (
            <Link
              key={value}
              href={`/events?kategori=${value}`}
              className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
                kategori === value
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="text-slate-500">Tidak ada acara untuk kategori ini.</p>
        ) : (
          <div className="space-y-12">
            {groups.map((g) => (
              <section key={g.month}>
                <h2 className="mb-4 text-xl font-semibold text-slate-900">{g.month}</h2>
                <div className="space-y-3">
                  {g.events.map((e) => (
                    <div
                      key={e.slug}
                      className="rounded-lg border border-slate-200 bg-white p-5 transition-shadow hover:shadow-sm"
                    >
                      <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
                        <h3 className="text-lg font-semibold text-slate-900">
                          {e.title}
                        </h3>
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                            categoryColors[e.category] ?? categoryColors.lainnya
                          }`}
                        >
                          {categoryLabel[e.category] ?? e.category}
                        </span>
                      </div>
                      <p className="mb-3 text-sm text-slate-600">{e.description}</p>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
                        <span>{formatDate(e.date)}</span>
                        {e.time && <span>{e.time}</span>}
                        {e.location && <span>{e.location}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
