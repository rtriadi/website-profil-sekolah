import type { SchoolProgram } from "@/lib/content/schema";

interface Props {
  programs: SchoolProgram[];
}

export function ProgramList({ programs }: Props) {
  return (
    <section aria-labelledby="heading-programs">
      <h2
        id="heading-programs"
        className="mb-6 text-xl font-semibold text-slate-900"
      >
        Program Unggulan
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {programs.map((program) => (
          <article
            key={program.slug}
            className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="mb-3 text-2xl">{program.icon}</div>
            <h3 className="mb-2 text-lg font-semibold text-slate-900">
              {program.name}
            </h3>
            <p className="text-sm leading-relaxed text-slate-600">
              {program.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
