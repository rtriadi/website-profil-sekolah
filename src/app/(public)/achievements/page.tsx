import { getAchievements } from "@/lib/content/achievement-service";
import type { Achievement } from "@/lib/content/schema";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function AchievementsPage() {
  const items = getAchievements().sort((a, b) => a.sortOrder - b.sortOrder);

  const akademik = items.filter((a) => a.category === "akademik");
  const nonAkademik = items.filter((a) => a.category === "non-akademik");

  return (
    <>
      <section className="border-b border-slate-200 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
          <h1 className="text-center text-3xl font-bold text-white">
            Prestasi
          </h1>
          <p className="mt-2 text-center text-slate-300">
            Kebanggaan dan capaian anak didik kami
          </p>
        </div>
      </section>

      <section className="border-b border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-slate-950/20">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
          {items.length === 0 ? (
            <p className="text-center text-slate-500">Belum ada prestasi.</p>
          ) : (
            <div className="space-y-10">
              {renderSection("Prestasi Akademik", akademik)}
              {renderSection("Prestasi Non-Akademik", nonAkademik)}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function renderSection(title: string, achievements: Achievement[]) {
  if (achievements.length === 0) return null;

  return (
    <div>
      <h2 className="mb-4 text-lg font-semibold text-slate-900">{title}</h2>
      <div className="space-y-4">
        {achievements.map((a) => (
          <div
            key={a.id}
            className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-semibold text-slate-900">{a.title}</h3>
                <p className="mt-1 text-xs text-slate-500">
                  {formatDate(a.date)}
                </p>
              </div>
              <span
                className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  a.category === "akademik"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-orange-100 text-orange-700"
                }`}
              >
                {a.category === "akademik" ? "Akademik" : "Non-Akademik"}
              </span>
            </div>
            {a.description && (
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {a.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
