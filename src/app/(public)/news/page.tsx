import Link from "next/link";
import type { Metadata } from "next";
import { getNews } from "@/lib/content/news-service";

export const metadata: Metadata = {
  title: "Berita",
  description: "Berita dan artikel terbaru dari sekolah.",
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function NewsPage() {
  const items = getNews().sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );

  return (
    <>
      <section className="border-b border-slate-200 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
          <h1 className="text-center text-3xl font-bold text-white">Berita</h1>
          <p className="mt-2 text-center text-slate-300">
            Artikel dan informasi terbaru dari sekolah
          </p>
        </div>
      </section>

      <section className="border-b border-slate-200">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
          {items.length === 0 ? (
            <p className="text-center text-slate-500">Belum ada berita.</p>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <Link
                  key={item.id}
                  href={`/news/${item.slug}`}
                  className="block rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <time className="text-sm text-slate-500">
                    {formatDate(item.publishedAt)}
                  </time>
                  <h2 className="mt-1 text-xl font-semibold text-slate-900">
                    {item.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {item.summary || item.content.slice(0, 150) + "..."}
                  </p>
                  <div className="mt-3 flex items-center gap-2 text-sm text-slate-400">
                    <span>Oleh {item.author}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
