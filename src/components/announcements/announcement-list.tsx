import Link from "next/link";
import type { Announcement } from "@/lib/content/schema";

interface Props {
  announcements: Announcement[];
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function AnnouncementList({ announcements }: Props) {
  if (announcements.length === 0) {
    return (
      <section aria-labelledby="heading-announcements">
        <h2
          id="heading-announcements"
          className="mb-4 text-xl font-semibold text-slate-900"
        >
          Pengumuman
        </h2>
        <p className="text-slate-500">Belum ada pengumuman.</p>
      </section>
    );
  }

  return (
    <section aria-labelledby="heading-announcements">
      <h2
        id="heading-announcements"
        className="mb-6 text-xl font-semibold text-slate-900"
      >
        Pengumuman
      </h2>

      <div className="space-y-4">
        {announcements.map((item) => (
          <article
            key={item.slug}
            className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
          >
            <Link
              href={`/announcements/${item.slug}`}
              className="group block"
            >
              <time
                dateTime={item.publishedAt}
                className="text-sm text-slate-500"
              >
                {formatDate(item.publishedAt)}
              </time>
              <h3 className="mt-1 text-lg font-semibold text-slate-900 group-hover:text-blue-600">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {item.summary}
              </p>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
