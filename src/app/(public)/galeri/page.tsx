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
    <div className="py-8">
      <h1 className="mb-2 text-3xl font-bold text-slate-900">Galeri Sekolah</h1>
      <p className="mb-8 text-slate-600">
        Dokumentasi kegiatan, fasilitas, dan momen-momen berharga di sekolah.
      </p>
      <GalleryClient items={items} albums={albums} />
    </div>
  );
}
