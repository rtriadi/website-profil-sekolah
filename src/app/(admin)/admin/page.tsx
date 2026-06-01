import Link from "next/link";
import { getTestimonies } from "@/lib/content/testimony-service";
import { getAchievements } from "@/lib/content/achievement-service";
import { getNews } from "@/lib/content/news-service";
import { getExtracurriculars } from "@/lib/content/extracurricular-service";
import { getMedia } from "@/lib/content/media-service";
import { count } from "@/lib/content/dashboard-utils";
import { getLogs } from "@/lib/content/log-service";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function SectionCard({
  label,
  count,
  href,
}: {
  label: string;
  count: number;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="text-3xl font-bold text-slate-900">{count}</div>
      <div className="mt-1 text-sm text-slate-500">{label}</div>
    </Link>
  );
}

export default function AdminDashboard() {
  const testimonies = getTestimonies();
  const achievements = getAchievements();
  const news = getNews();
  const extracurriculars = getExtracurriculars();
  const media = getMedia();
  const logs = getLogs(10);

  const stats = [
    { label: "Testimoni", count: count(testimonies), href: "/admin/testimonies" },
    { label: "Prestasi", count: count(achievements), href: "/admin/achievements" },
    { label: "Berita", count: count(news), href: "/admin/news" },
    { label: "Ekstrakurikuler", count: count(extracurriculars), href: "/admin/extracurriculars" },
    { label: "Media", count: count(media), href: "/admin/media" },
  ];

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-slate-900">Dashboard</h1>

      <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {stats.map((s) => (
          <SectionCard key={s.href} {...s} />
        ))}
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-5">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">Aktivitas Terbaru</h2>
          <Link
            href="/admin/logs"
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            Lihat semua
          </Link>
        </div>

        {logs.length === 0 ? (
          <p className="text-sm text-slate-400">Belum ada aktivitas.</p>
        ) : (
          <div className="space-y-2">
            {logs.map((log) => (
              <div key={log.id} className="flex items-start justify-between gap-2 text-sm">
                <div>
                  <span className="rounded bg-slate-100 px-1.5 py-0.5 text-xs font-medium text-slate-600">
                    {log.section}
                  </span>{" "}
                  <span className="text-slate-700">{log.detail}</span>
                </div>
                <time className="shrink-0 text-xs text-slate-400">
                  {formatDate(log.createdAt)}
                </time>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
