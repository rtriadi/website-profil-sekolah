import { getDocumentsByCategory } from "@/lib/content/documents-service";

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
    <div className="py-16">
      <div className="mx-auto max-w-4xl px-4">
        <h1 className="mb-2 text-3xl font-bold text-slate-900">Unduhan</h1>
        <p className="mb-8 text-slate-600">
          Dokumen dan formulir yang dapat diunduh
        </p>

        {categories.length === 0 ? (
          <p className="text-slate-500">Belum ada dokumen tersedia.</p>
        ) : (
          <div className="space-y-10">
            {categories.map((cat) => {
              const docs = getDocumentsByCategory(cat);
              if (docs.length === 0) return null;
              return (
                <section key={cat}>
                  <h2 className="mb-4 text-xl font-semibold text-slate-900">
                    {categoryLabel[cat] ?? cat}
                  </h2>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {docs.map((doc) => (
                      <a
                        key={doc.id}
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-start gap-3 rounded-lg border border-slate-200 bg-white p-4 transition hover:border-slate-300 hover:shadow-sm"
                      >
                        <div className="flex-shrink-0 rounded-md bg-slate-100 p-2">
                          <svg className="h-5 w-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-slate-900">{doc.title}</p>
                          {doc.description && (
                            <p className="mt-0.5 text-xs text-slate-500 line-clamp-2">{doc.description}</p>
                          )}
                          <p className="mt-1 text-xs text-slate-400">{formatBytes(doc.fileSize)}</p>
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
    </div>
  );
}
