"use client";

import { useActionState } from "react";
import { ToastStateWatcher } from "@/components/ui/toast";
import type { MediaItem } from "@/lib/content/media-service";
import { uploadMediaAction, deleteMediaAction } from "@/lib/actions/media-actions";
import type { GalleryAlbum } from "@/lib/content/gallery-album-service";

function UploadForm({ albums }: { albums: GalleryAlbum[] }) {
  const [state, formAction, pending] = useActionState(uploadMediaAction, undefined);

  return (
    <form action={formAction} className="space-y-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
      <ToastStateWatcher state={state} successMessage="Media berhasil diunggah!" />
      <h3 className="text-sm font-semibold text-slate-900">Upload Media</h3>
      <div>
        <input
          type="file"
          name="file"
          accept="image/jpeg,image/png,image/webp"
          className="w-full text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-slate-900 file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-white hover:file:bg-slate-700"
        />
      </div>
      <div>
        <input
          name="altText"
          placeholder="Teks alternatif (opsional)"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none"
        />
      </div>
      <div>
        <select
          name="album"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none"
        >
          <option value="">Tanpa Album</option>
          {albums.map((a) => (
            <option key={a.id} value={a.name}>{a.name}</option>
          ))}
        </select>
      </div>
      <button type="submit" disabled={pending} className="rounded-lg bg-slate-900 px-4 py-1.5 text-sm font-medium text-white hover:bg-slate-700 disabled:opacity-50">
        {pending ? "Mengupload..." : "Upload"}
      </button>
    </form>
  );
}

interface Props {
  initialMedia: MediaItem[];
  albums: GalleryAlbum[];
}

export default function AdminMediaClient({ initialMedia, albums }: Props) {
  return (
    <>
      <div className="mb-8 max-w-md">
        <UploadForm albums={albums} />
      </div>

      {initialMedia.length === 0 ? (
        <p className="text-slate-500">Belum ada media.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {initialMedia.map((item) => (
            <div key={item.id} className="group relative overflow-hidden rounded-lg border border-slate-200 bg-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.url}
                alt={item.altText}
                className="aspect-square w-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                <form action={deleteMediaAction.bind(null, item.id)}>
                  <button type="submit" className="rounded-md bg-red-500 px-3 py-1 text-xs font-medium text-white hover:bg-red-600">
                    Hapus
                  </button>
                </form>
              </div>
              <div className="truncate px-2 py-1.5 text-xs text-slate-600">
                {item.altText}
              </div>
              {item.album && (
                <div className="px-2 pb-1.5 text-xs text-slate-400">
                  {item.album}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
