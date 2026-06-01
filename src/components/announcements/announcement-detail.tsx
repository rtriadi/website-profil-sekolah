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
    <article className="space-y-6">
      <Link
        href="/announcements"
        className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
      >
        &larr; Kembali ke Pengumuman
      </Link>

      <div className="space-y-2">
        <time
          dateTime={announcement.publishedAt}
          className="block text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500"
        >
          {formatDate(announcement.publishedAt)}
        </time>

        <h1 className="text-2xl font-extrabold font-heading tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          {announcement.title}
        </h1>

        <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
          Oleh: <span className="font-bold text-slate-700 dark:text-slate-300">{announcement.author}</span>
        </p>
      </div>

      <div className="border-t border-slate-100 dark:border-white/5 my-6" />

      <div className="prose prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base space-y-4">
        {announcement.content.split("\n\n").map((paragraph, i) => {
          if (paragraph.startsWith("**") && paragraph.endsWith("**")) {
            return (
              <p key={i} className="font-bold text-slate-900 dark:text-white">
                {paragraph.replace(/\*\*/g, "")}
              </p>
            );
          }
          if (paragraph.startsWith("**")) {
            return <p key={i} className="text-slate-800 dark:text-slate-200">{paragraph}</p>;
          }
          return (
            <p key={i}>
              {paragraph}
            </p>
          );
        })}
      </div>
    </article>
  );
}
