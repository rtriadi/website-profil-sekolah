import { getGalleryAlbums } from "@/lib/content/gallery-album-service";
import { AdminGalleryAlbumClient } from "@/components/admin/admin-gallery-album-client";

export default async function AdminGalleryAlbumsPage() {
  const items = getGalleryAlbums();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-slate-900">Album Galeri</h1>
      <div className="max-w-xl rounded-lg border border-slate-200 bg-white p-6">
        <AdminGalleryAlbumClient items={items} />
      </div>
    </div>
  );
}
