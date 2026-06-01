import Link from "next/link";
import { getTestimonies } from "@/lib/content/testimony-service";
import { getAchievements } from "@/lib/content/achievement-service";
import { getNews } from "@/lib/content/news-service";
import { getExtracurriculars } from "@/lib/content/extracurricular-service";
import { getMedia } from "@/lib/content/media-service";
import { count } from "@/lib/content/dashboard-utils";
import { getLogs } from "@/lib/content/log-service";
import { getTeachers } from "@/lib/content/teachers-service";
import { getClasses } from "@/lib/content/classes-service";
import { getAnnouncements } from "@/lib/content/announcement-service";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

interface StatCardProps {
  label: string;
  count: number;
  href: string;
  icon: string;
  colorClass: string;
  bgGradClass: string;
}

function StatCard({ label, count, href, icon, colorClass, bgGradClass }: StatCardProps) {
  return (
    <Link
      href={href}
      className="group relative overflow-hidden rounded-2xl border border-slate-200 dark:border-white/5 bg-white dark:bg-slate-900/50 p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
    >
      {/* Decorative gradient overlay */}
      <div className={`absolute top-0 right-0 h-24 w-24 rounded-full filter blur-2xl opacity-20 group-hover:opacity-30 transition-opacity bg-gradient-to-br ${bgGradClass}`} />
      
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold tracking-wider uppercase text-slate-400 dark:text-slate-500">
          {label}
        </span>
        <span className="text-2xl filter drop-shadow-md group-hover:scale-110 transition-transform duration-300">
          {icon}
        </span>
      </div>

      <div className="mt-4 flex items-baseline gap-2">
        <span className={`text-4xl font-extrabold font-heading text-slate-900 dark:text-white group-hover:bg-gradient-to-r group-hover:${bgGradClass} group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300`}>
          {count}
        </span>
      </div>
      
      <div className="mt-3 flex items-center text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        Kelola &rarr;
      </div>
    </Link>
  );
}

export default async function AdminDashboard() {
  const [teachers, classes, announcements] = await Promise.all([
    getTeachers(),
    getClasses(),
    getAnnouncements(),
  ]);

  const testimonies = getTestimonies();
  const achievements = getAchievements();
  const news = getNews();
  const extracurriculars = getExtracurriculars();
  const media = getMedia();
  const logs = getLogs(10);

  const stats = [
    {
      label: "Berita",
      count: count(news),
      href: "/admin/news",
      icon: "📰",
      colorClass: "text-blue-600 dark:text-blue-400",
      bgGradClass: "from-blue-500 to-indigo-500",
    },
    {
      label: "Pengumuman",
      count: count(announcements),
      href: "/admin/announcements",
      icon: "📢",
      colorClass: "text-amber-600 dark:text-amber-400",
      bgGradClass: "from-amber-500 to-orange-500",
    },
    {
      label: "Prestasi",
      count: count(achievements),
      href: "/admin/achievements",
      icon: "🏆",
      colorClass: "text-yellow-600 dark:text-yellow-400",
      bgGradClass: "from-yellow-400 to-amber-500",
    },
    {
      label: "Testimoni",
      count: count(testimonies),
      href: "/admin/testimonies",
      icon: "💬",
      colorClass: "text-emerald-600 dark:text-emerald-400",
      bgGradClass: "from-emerald-500 to-teal-500",
    },
    {
      label: "Ekstrakurikuler",
      count: count(extracurriculars),
      href: "/admin/extracurriculars",
      icon: "⭐",
      colorClass: "text-purple-600 dark:text-purple-400",
      bgGradClass: "from-purple-500 to-pink-500",
    },
    {
      label: "Guru & Staf",
      count: count(teachers),
      href: "/admin/teachers",
      icon: "👨‍🏫",
      colorClass: "text-rose-600 dark:text-rose-400",
      bgGradClass: "from-rose-500 to-pink-500",
    },
    {
      label: "Daftar Kelas",
      count: count(classes),
      href: "/admin/classes",
      icon: "🚪",
      colorClass: "text-sky-600 dark:text-sky-400",
      bgGradClass: "from-sky-500 to-cyan-500",
    },
    {
      label: "Media / Foto",
      count: count(media),
      href: "/admin/media",
      icon: "🖼️",
      colorClass: "text-teal-600 dark:text-teal-400",
      bgGradClass: "from-teal-500 to-cyan-500",
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-top-2 duration-300">
      {/* Header section with greetings */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold text-slate-900 dark:text-white">
            Selamat Datang di Admin Panel 👋
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
            Kelola identitas, akademik, prestasi, galeri, dan visibilitas menu sekolah Anda secara dinamis dari satu pintu.
          </p>
        </div>
      </div>

      {/* Grid statistics cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((s) => (
          <StatCard key={s.href} {...s} />
        ))}
      </div>

      {/* Recent Activities Section */}
      <div className="rounded-2xl border border-slate-200 dark:border-white/5 bg-white dark:bg-slate-900/50 p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="font-heading text-sm font-bold text-slate-900 dark:text-white tracking-wide uppercase">
              Aktivitas Terbaru
            </h2>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium mt-0.5">
              Riwayat log operasi admin untuk menjaga integritas sistem.
            </p>
          </div>
          <Link
            href="/admin/logs"
            className="rounded-lg border border-slate-200 dark:border-white/5 bg-white dark:bg-slate-950 px-3 py-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 transition-all shadow-sm hover:border-slate-300"
          >
            Lihat Semua
          </Link>
        </div>

        {logs.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-200 dark:border-white/10 p-8 text-center">
            <p className="text-sm text-slate-400 dark:text-slate-500">Belum ada aktivitas tercatat.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-white/5">
            {logs.map((log) => (
              <div key={log.id} className="flex items-center justify-between gap-4 py-3.5 first:pt-0 last:pb-0">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="shrink-0 inline-flex items-center justify-center rounded-lg bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 px-2.5 py-1 text-[10px] font-bold text-indigo-600 dark:text-indigo-400 tracking-wide uppercase">
                    {log.section}
                  </span>
                  <span className="text-xs text-slate-700 dark:text-slate-300 truncate font-medium">
                    {log.detail}
                  </span>
                </div>
                <time className="shrink-0 text-[10px] font-bold text-slate-400 dark:text-slate-500">
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
