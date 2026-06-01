import { getMedia } from "@/lib/content/media-service";
import { getGalleryAlbums } from "@/lib/content/gallery-album-service";
import AdminMediaClient from "@/components/admin/media-client";

export default function AdminMediaPage() {
  const media = getMedia();
  const albums = getGalleryAlbums();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Media</h1>
      </div>
      <AdminMediaClient initialMedia={media} albums={albums} />
    </div>
  );
}
