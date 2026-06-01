import { getAnnouncementBySlug } from "@/lib/content/announcement-service";
import { AnnouncementDetail } from "@/components/announcements/announcement-detail";
import { defaultAnnouncements } from "@/lib/content/schema";

export function generateStaticParams() {
  return defaultAnnouncements.map((a) => ({ slug: a.slug }));
}

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function AnnouncementDetailPage({ params }: Props) {
  const { slug } = await params;
  const announcement = await getAnnouncementBySlug(slug);

  return (
    <>
      <section className="border-b border-slate-200 dark:border-white/10 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
          <h1 className="text-center text-2xl sm:text-3xl font-bold text-white font-heading">
            Detail Pengumuman
          </h1>
        </div>
      </section>

      <section className="border-b border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-slate-950/20 py-12 min-h-[60vh]">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <AnnouncementDetail announcement={announcement} />
        </div>
      </section>
    </>
  );
}
