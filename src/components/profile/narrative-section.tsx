import type { SchoolNarrative } from "@/lib/content/schema";

interface Props {
  narrative: SchoolNarrative;
}

export function NarrativeSection({ narrative }: Props) {
  return (
    <section aria-labelledby="heading-narrative">
      <h2
        id="heading-narrative"
        className="mb-4 text-xl font-semibold text-slate-900"
      >
        Sejarah & Visi Misi
      </h2>

      <div className="space-y-6">
        <div>
          <h3 className="mb-2 text-lg font-semibold text-slate-900">
            Sejarah
          </h3>
          <div className="space-y-3">
            {narrative.history.map((paragraph, i) => (
              <p key={i} className="text-base leading-relaxed text-slate-700">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-2 text-lg font-semibold text-slate-900">Visi</h3>
          <p className="text-base leading-relaxed text-slate-700">
            {narrative.vision}
          </p>
        </div>

        <div>
          <h3 className="mb-2 text-lg font-semibold text-slate-900">Misi</h3>
          <ol className="list-inside list-decimal space-y-2">
            {narrative.mission.map((item, i) => (
              <li key={i} className="text-base leading-relaxed text-slate-700">
                {item}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
