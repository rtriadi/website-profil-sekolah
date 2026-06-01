import { getHeroSlides } from "@/lib/content/hero-slides-service";
import { AdminHeroSlidesClient } from "@/components/admin/admin-hero-slides-client";

export const dynamic = "force-dynamic";

export default async function AdminHeroSlidesPage() {
  const slides = getHeroSlides();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold font-heading text-slate-900 dark:text-white">
          Carousel Slider Beranda
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Kelola slide gambar, judul, dan deskripsi singkat yang tampil di carousel halaman depan.
        </p>
      </div>

      <div className="max-w-4xl rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-slate-950 p-6 shadow-sm">
        <AdminHeroSlidesClient initialSlides={slides} />
      </div>
    </div>
  );
}
