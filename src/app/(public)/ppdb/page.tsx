import Link from "next/link";
import { getPPDBConfig } from "@/lib/content/ppdb-service";

export default function PPDBPage() {
  const ppdb = getPPDBConfig();

  return (
    <div className="py-16">
      <div className="mx-auto max-w-4xl px-4">
        {ppdb.active && ppdb.bannerText && (
          <div className="mb-8 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 text-white">
            <p className="text-lg font-semibold">{ppdb.bannerText}</p>
          </div>
        )}

        <h1 className="mb-2 text-3xl font-bold text-slate-900">
          {ppdb.title} {ppdb.year}
        </h1>
        <p className="mb-8 text-slate-600">{ppdb.description}</p>

        <div className="grid gap-8 sm:grid-cols-3">
          <div className="sm:col-span-2 space-y-10">
            <section>
              <h2 className="mb-4 text-xl font-semibold text-slate-900">Persyaratan</h2>
              <ul className="space-y-3">
                {ppdb.requirements.map((req, i) => (
                  <li key={i} className="rounded-lg border border-slate-200 bg-white p-4">
                    <h3 className="font-medium text-slate-900">{req.label}</h3>
                    {req.description && (
                      <p className="mt-1 text-sm text-slate-600">{req.description}</p>
                    )}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-xl font-semibold text-slate-900">Tahapan Pendaftaran</h2>
              <div className="space-y-4">
                {ppdb.steps
                  .sort((a, b) => a.order - b.order)
                  .map((step) => (
                    <div key={step.order} className="flex gap-4">
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">
                        {step.order}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-slate-900">{step.title}</h3>
                        <p className="mt-0.5 text-sm text-slate-600">{step.description}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </section>
          </div>

          <div className="space-y-6">
            <div className="rounded-lg border border-slate-200 bg-white p-5">
              <h2 className="mb-3 text-lg font-semibold text-slate-900">Jadwal</h2>
              <pre className="whitespace-pre-wrap text-sm text-slate-600 font-sans">{ppdb.scheduleText}</pre>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-5">
              <h2 className="mb-3 text-lg font-semibold text-slate-900">Kontak Panitia</h2>
              <pre className="whitespace-pre-wrap text-sm text-slate-600 font-sans">{ppdb.contact}</pre>
            </div>

            {ppdb.registrationLink && (
              <a
                href={ppdb.registrationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-lg bg-blue-600 px-5 py-3 text-center font-medium text-white hover:bg-blue-700"
              >
                Daftar Sekarang
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
