import Link from "next/link";
import { notFound } from "next/navigation";
import { getNews } from "@/lib/content/news-service";

interface Props {
  params: Promise<{ slug: string }>;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;
  const articles = getNews();
  const article = articles.find((a) => a.slug === slug);

  if (!article) notFound();

  return (
    <>
      <section className="border-b border-slate-200 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
          <Link
            href="/news"
            className="mb-4 inline-flex items-center gap-1 text-sm text-slate-400 hover:text-white"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            Kembali ke Berita
          </Link>
          <h1 className="text-3xl font-bold text-white">{article.title}</h1>
          <div className="mt-3 flex items-center gap-3 text-sm text-slate-400">
            <span>{formatDate(article.publishedAt)}</span>
            <span>&middot;</span>
            <span>Oleh {article.author}</span>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
          <div className="prose prose-slate max-w-none">
            {article.content.split("\n").map((p, i) => (
              <p key={i} className="mb-4 leading-relaxed text-slate-700">
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
