import { getDocumentsByCategory } from "@/lib/content/documents-service";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unduhan Dokumen",
  description: "Dokumen resmi, berkas, dan formulir sekolah yang dapat diunduh",
};

const categoryLabel: Record<string, string> = {
  akademik: "Akademik",
  administrasi: "Administrasi",
  tata_tertib: "Tata Tertib",
  lainnya: "Lainnya",
};

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function DownloadsPage() {
  const categories = ["akademik", "administrasi", "tata_tertib", "lainnya"];

  return (
    <>
      <section className="border-b border-slate-200 dark:border-white/10 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
          <h1 className="text-center text-3xl font-bold text-white font-heading">
            Unduhan Dokumen
          </h1>
          <p className="mt-2 text-center text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
            Akses berkas, panduan resmi, formulir pendaftaran, dan dokumen sekolah lainnya
          </p>
        </div>
      </section>

      <section className="border-b border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-slate-950/20 py-12 min-h-[60vh]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          {categories.length === 0 ? (
            <p className="text-center text-slate-500 dark:text-slate-400">Belum ada dokumen tersedia.</p>
          ) : (
            <div className="space-y-12">
              {categories.map((cat) => {
                const docs = getDocumentsByCategory(cat);
                if (docs.length === 0) return null;
                return (
                  <section key={cat}>
                    <h2 className="mb-5 text-xl font-bold text-slate-900 dark:text-white border-l-4 border-indigo-500 pl-3 leading-none font-heading">
                      Kategori {categoryLabel[cat] ?? cat}
                    </h2>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {docs.map((doc) => (
                        <a
                          key={doc.id}
                          href={doc.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-start gap-4 rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-slate-900/50 p-5 transition hover:border-slate-300 dark:hover:border-indigo-500/30 hover:shadow-md group duration-300"
                        >
                          <div className="flex-shrink-0 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 p-3 text-indigo-600 dark:text-indigo-400 border border-indigo-100/30 dark:border-indigo-500/10 group-hover:scale-105 transition-transform duration-200">
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-bold text-slate-900 dark:text-white font-heading tracking-wide group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200">
                              {doc.title}
                            </p>
                            {doc.description && (
                              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                                {doc.description}
                              </p>
                            )}
                            <div className="mt-3 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                              <span>📂 FORMAT: FILE</span>
                              <span>•</span>
                              <span>💾 UKURAN: {formatBytes(doc.fileSize)}</span>
                            </div>
                          </div>
                        </a>
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
