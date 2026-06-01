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
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:py-16">
        <AnnouncementDetail announcement={announcement} />
      </div>
    </main>
  );
}
