import Link from "next/link";
import { getPPDBConfig } from "@/lib/content/ppdb-service";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Penerimaan Peserta Didik Baru (PPDB)",
  description: "Informasi pendaftaran siswa baru, persyaratan, dan tahapan pendaftaran.",
};

export default function PPDBPage() {
  const ppdb = getPPDBConfig();

  return (
    <>
      <section className="border-b border-slate-200 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
          <h1 className="text-center text-3xl font-bold text-white">
            {ppdb.title} {ppdb.year}
          </h1>
          <p className="mt-2 text-center text-slate-300">
            {ppdb.description}
          </p>
        </div>
      </section>

      <section className="border-b border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-slate-950/20 min-h-[50vh]">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
          {ppdb.active && ppdb.bannerText && (
            <div className="mb-8 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 px-6 py-4 text-white shadow-md">
              <p className="text-base font-semibold">{ppdb.bannerText}</p>
            </div>
          )}

          <div className="grid gap-8 sm:grid-cols-3">
            <div className="sm:col-span-2 space-y-10">
              <section>
                <h2 className="mb-4 text-xl font-semibold text-slate-900">Persyaratan</h2>
                <ul className="space-y-3">
                  {ppdb.requirements.map((req, i) => (
                    <li key={i} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                      <h3 className="font-semibold text-slate-900">{req.label}</h3>
                      {req.description && (
                        <p className="mt-1 text-sm text-slate-600 leading-relaxed">{req.description}</p>
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
                        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-slate-950 text-sm font-bold text-white shadow-sm">
                          {step.order}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-slate-900">{step.title}</h3>
                          <p className="mt-0.5 text-sm text-slate-600 leading-relaxed">{step.description}</p>
                        </div>
                      </div>
                    ))}
                </div>
              </section>
            </div>

            <div className="space-y-6">
              <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <h2 className="mb-3 text-lg font-semibold text-slate-900">Jadwal</h2>
                <pre className="whitespace-pre-wrap text-sm text-slate-600 font-sans leading-relaxed">{ppdb.scheduleText}</pre>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <h2 className="mb-3 text-lg font-semibold text-slate-900">Kontak Panitia</h2>
                <pre className="whitespace-pre-wrap text-sm text-slate-600 font-sans leading-relaxed">{ppdb.contact}</pre>
              </div>

              {ppdb.registrationLink && (
                <a
                  href={ppdb.registrationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-xl bg-indigo-600 px-5 py-3.5 text-center font-bold text-xs tracking-wider uppercase text-white shadow-md shadow-indigo-600/10 hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-600/20 active:scale-[0.98] transition-all"
                >
                  Daftar Sekarang
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
