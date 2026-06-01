import type { Metadata } from "next";
import { getGalleryItems } from "@/lib/content/media-service";
import { getGalleryAlbums } from "@/lib/content/gallery-album-service";
import { GalleryClient } from "@/components/gallery/gallery-client";

export const metadata: Metadata = {
  title: "Galeri",
  description: "Dokumentasi kegiatan dan fasilitas sekolah.",
};

export default function GalleryPage() {
  const items = getGalleryItems();
  const albums = getGalleryAlbums();

  return (
    <>
      <section className="border-b border-slate-200 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
          <h1 className="text-center text-3xl font-bold text-white">Galeri Sekolah</h1>
          <p className="mt-2 text-center text-slate-300">
            Dokumentasi kegiatan, fasilitas, dan momen-momen berharga di sekolah
          </p>
        </div>
      </section>

      <section className="border-b border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-slate-950/20 min-h-[50vh]">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
          <GalleryClient items={items} albums={albums} />
        </div>
      </section>
    </>
  );
}
