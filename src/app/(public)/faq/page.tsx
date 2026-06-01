import { getFAQItems } from "@/lib/content/faq-service";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pertanyaan Umum (FAQ)",
};

const categoryLabels: Record<string, string> = {
  ppdb: "PPDB",
  biaya: "Biaya",
  akademik: "Akademik",
  fasilitas: "Fasilitas",
  lainnya: "Lainnya",
};

export default async function FAQPage() {
  const items = getFAQItems();

  return (
    <main>
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
          <h1 className="text-3xl font-bold text-slate-900">
            Pertanyaan Umum (FAQ)
          </h1>
          <p className="mt-2 text-slate-600">
            Jawaban cepat untuk pertanyaan yang sering diajukan
          </p>
        </div>
      </section>

      <section className="border-b border-slate-200">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
          {items.length === 0 ? (
            <p className="text-sm text-slate-400">Belum ada pertanyaan.</p>
          ) : (
            <div className="divide-y divide-slate-200 rounded-lg border border-slate-200 bg-white">
              {items
                .sort((a, b) => a.sortOrder - b.sortOrder)
                .map((item) => (
                  <details key={item.id} className="group">
                    <summary className="flex cursor-pointer items-center justify-between px-5 py-4 text-sm font-medium text-slate-900 hover:bg-slate-50 [&::-webkit-details-marker]:hidden">
                      {item.question}
                      <svg
                        className="h-5 w-5 shrink-0 text-slate-400 transition-transform group-open:rotate-180"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                    </summary>
                    <div className="border-t border-slate-100 px-5 py-4">
                      <p className="text-sm leading-relaxed text-slate-600">
                        {item.answer}
                      </p>
                      <span
                        className={`mt-2 inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          ({
                            ppdb: "bg-blue-100 text-blue-700",
                            biaya: "bg-green-100 text-green-700",
                            akademik: "bg-purple-100 text-purple-700",
                            fasilitas: "bg-orange-100 text-orange-700",
                            lainnya: "bg-slate-100 text-slate-700",
                          })[item.category] ?? "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {categoryLabels[item.category] ?? item.category}
                      </span>
                    </div>
                  </details>
                ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
