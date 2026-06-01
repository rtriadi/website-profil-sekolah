import type { Facility } from "@/lib/content/schema";

interface Props {
  facilities: Facility[];
}

function getCategoryIcon(category: string): string {
  const icons: Record<string, string> = {
    Laboratorium: "🔬",
    Perpustakaan: "📚",
    Olahraga: "⚽",
    Kesenian: "🎨",
    Ibadah: "🕌",
    Kesehatan: "🏥",
  };
  return icons[category] ?? "🏫";
}

export function FacilityList({ facilities }: Props) {
  return (
    <section aria-labelledby="heading-facilities">
      <h2
        id="heading-facilities"
        className="mb-6 text-xl font-semibold text-slate-900"
      >
        Fasilitas Sekolah
      </h2>

      <div className="grid gap-6 sm:grid-cols-2">
        {facilities.map((facility) => (
          <article
            key={facility.slug}
            className="flex gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="mt-0.5 text-2xl">
              {getCategoryIcon(facility.category)}
            </div>
            <div>
              <h3 className="mb-1 text-lg font-semibold text-slate-900">
                {facility.name}
              </h3>
              <p className="text-sm leading-relaxed text-slate-600">
                {facility.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
