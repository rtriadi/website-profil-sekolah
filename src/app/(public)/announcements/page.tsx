import Link from "next/link";
import { getAnnouncements } from "@/lib/content/announcement-service";
import { AnnouncementList } from "@/components/announcements/announcement-list";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pengumuman",
  description: "Pengumuman dan informasi resmi dari sekolah",
};

const ITEMS_PER_PAGE = 10;

export default async function AnnouncementsPage(props: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await props.searchParams;
  const currentPage = Math.max(1, Number(page) || 1);
  const all = await getAnnouncements();
  const totalPages = Math.max(1, Math.ceil(all.length / ITEMS_PER_PAGE));
  const displayed = all.slice(0, currentPage * ITEMS_PER_PAGE);
  const hasMore = currentPage < totalPages;

  return (
    <>
      <section className="border-b border-slate-200 dark:border-white/10 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
          <h1 className="text-center text-3xl font-bold text-white font-heading">
            Pengumuman
          </h1>
          <p className="mt-2 text-center text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
            Informasi dan pengumuman resmi terbaru dari pihak sekolah
          </p>
        </div>
      </section>

      <section className="border-b border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-slate-950/20 py-12 min-h-[50vh]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <AnnouncementList announcements={displayed} />

          {hasMore && (
            <div className="mt-10 text-center">
              <Link
                href={`/announcements?page=${currentPage + 1}`}
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
            Menampilkan {displayed.length} dari {all.length} pengumuman
          </p>
        </div>
      </section>
    </>
  );
}
