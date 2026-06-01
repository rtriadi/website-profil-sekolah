import { getAnnouncements } from "@/lib/content/announcement-service";
import { AnnouncementList } from "@/components/announcements/announcement-list";

export default async function AnnouncementsPage() {
  const announcements = await getAnnouncements();

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:py-16">
        <h1 className="mb-10 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Pengumuman
        </h1>

        <AnnouncementList announcements={announcements} />
      </div>
    </main>
  );
}
