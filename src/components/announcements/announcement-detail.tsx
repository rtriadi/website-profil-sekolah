import Link from "next/link";
import type { Announcement } from "@/lib/content/schema";
import { notFound } from "next/navigation";

interface Props {
  announcement: Announcement | null;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function AnnouncementDetail({ announcement }: Props) {
  if (!announcement) {
    notFound();
  }

  return (
    <article>
      <Link
        href="/announcements"
        className="mb-6 inline-flex text-sm text-blue-600 hover:text-blue-800"
      >
        &larr; Kembali ke Pengumuman
      </Link>

      <time
        dateTime={announcement.publishedAt}
        className="block text-sm text-slate-500"
      >
        {formatDate(announcement.publishedAt)}
      </time>

      <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        {announcement.title}
      </h1>

      <p className="mt-2 text-sm text-slate-500">
        Oleh: {announcement.author}
      </p>

      <div className="prose prose-slate mt-8 max-w-none">
        {announcement.content.split("\n\n").map((paragraph, i) => {
          if (paragraph.startsWith("**") && paragraph.endsWith("**")) {
            return (
              <p key={i} className="font-semibold text-slate-900">
                {paragraph.replace(/\*\*/g, "")}
              </p>
            );
          }
          if (paragraph.startsWith("**")) {
            return <p key={i} className="text-slate-700">{paragraph}</p>;
          }
          return (
            <p key={i} className="text-slate-700">
              {paragraph}
            </p>
          );
        })}
      </div>
    </article>
  );
}
