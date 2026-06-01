import { getFAQItems } from "@/lib/content/faq-service";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pertanyaan Umum (FAQ)",
  description: "Pertanyaan yang sering diajukan seputar sekolah, administrasi, dan PPDB",
};

const categoryLabels: Record<string, string> = {
  ppdb: "PPDB",
  biaya: "Biaya",
  akademik: "Akademik",
  fasilitas: "Fasilitas",
  lainnya: "Lainnya",
};

const categoryColors: Record<string, string> = {
  ppdb: "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400",
  biaya: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
  akademik: "bg-purple-100 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400",
  fasilitas: "bg-orange-100 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400",
  lainnya: "bg-slate-100 text-slate-700 dark:bg-slate-500/10 dark:text-slate-400",
};

export default async function FAQPage() {
  const items = getFAQItems();

  return (
    <>
      <section className="border-b border-slate-200 dark:border-white/10 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
          <h1 className="text-center text-3xl font-bold text-white font-heading">
            Pertanyaan Umum (FAQ)
          </h1>
          <p className="mt-2 text-center text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
            Temukan jawaban ringkas atas pertanyaan yang paling sering diajukan kepada kami
          </p>
        </div>
      </section>

      <section className="border-b border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-slate-950/20 py-12 min-h-[60vh]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          {items.length === 0 ? (
            <p className="text-center text-slate-500 dark:text-slate-400">Belum ada pertanyaan terdaftar.</p>
          ) : (
            <div className="rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-slate-900/50 overflow-hidden shadow-sm divide-y divide-slate-150 dark:divide-white/5">
              {items
                .sort((a, b) => a.sortOrder - b.sortOrder)
                .map((item) => (
                  <details key={item.id} className="group transition-all duration-200">
                    <summary className="flex cursor-pointer items-center justify-between px-6 py-5 text-sm font-bold text-slate-900 dark:text-white hover:bg-slate-50/50 dark:hover:bg-white/5 [&::-webkit-details-marker]:hidden font-heading tracking-wide transition-colors">
                      {item.question}
                      <svg
                        className="h-5 w-5 shrink-0 text-slate-400 dark:text-slate-500 transition-transform group-open:rotate-180"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2.5"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                    </summary>
                    <div className="bg-slate-50/20 dark:bg-slate-950/30 px-6 py-5 border-t border-slate-100 dark:border-white/5 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                      <p className="whitespace-pre-line leading-relaxed">{item.answer}</p>
                      <div className="mt-4">
                        <span
                          className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                            categoryColors[item.category] ?? "bg-slate-100 text-slate-700"
                          }`}
                        >
                          🏷️ {categoryLabels[item.category] ?? item.category}
                        </span>
                      </div>
                    </div>
                  </details>
                ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
