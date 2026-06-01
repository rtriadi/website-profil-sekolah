import { getRegulations } from "@/lib/content/regulation-service";

export default async function RegulationsPage() {
  const items = getRegulations().sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <>
      <section className="border-b border-slate-200 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
          <h1 className="text-center text-3xl font-bold text-white">
            Tata Tertib & Kebijakan
          </h1>
          <p className="mt-2 text-center text-slate-300">
            Aturan dan kebijakan yang berlaku di sekolah
          </p>
        </div>
      </section>

      <section className="border-b border-slate-200">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
          {items.length === 0 ? (
            <p className="text-center text-slate-500">Belum ada aturan.</p>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <details
                  key={item.id}
                  className="group rounded-lg border border-slate-200 bg-white"
                >
                  <summary className="flex cursor-pointer items-center justify-between px-5 py-4 text-sm font-semibold text-slate-900 hover:bg-slate-50 [&::-webkit-details-marker]:hidden">
                    {item.title}
                    <svg className="h-4 w-4 text-slate-400 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </summary>
                  <div className="border-t border-slate-100 px-5 py-4">
                    <p className="whitespace-pre-line text-sm leading-relaxed text-slate-600">
                      {item.content}
                    </p>
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
