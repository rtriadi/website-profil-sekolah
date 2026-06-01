import Link from "next/link";
import type { Metadata } from "next";
import { getNews } from "@/lib/content/news-service";

export const metadata: Metadata = {
  title: "Berita",
  description: "Berita dan artikel terbaru dari sekolah.",
};

const ITEMS_PER_PAGE = 10;

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function NewsPage(props: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await props.searchParams;
  const currentPage = Math.max(1, Number(page) || 1);
  const all = getNews().sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
  const totalPages = Math.max(1, Math.ceil(all.length / ITEMS_PER_PAGE));
  const items = all.slice(0, currentPage * ITEMS_PER_PAGE);
  const hasMore = currentPage < totalPages;

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
            <>
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

              {hasMore && (
                <div className="mt-10 text-center">
                  <Link
                    href={`/news?page=${currentPage + 1}`}
                    className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-bold text-white shadow-sm hover:bg-slate-700 transition-colors"
                  >
                    Muat Lebih Banyak
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </Link>
                </div>
              )}

              <p className="mt-4 text-center text-xs text-slate-400">
                Menampilkan {items.length} dari {all.length} berita
              </p>
            </>
          )}
        </div>
      </section>
    </>
  );
}
