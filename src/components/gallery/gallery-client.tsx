"use client";

import { useState } from "react";
import type { MediaItem } from "@/lib/content/media-service";
import type { GalleryAlbum } from "@/lib/content/gallery-album-service";
import { GalleryGrid } from "./gallery-grid";

interface Props {
  items: MediaItem[];
  albums: GalleryAlbum[];
}

export function GalleryClient({ items, albums }: Props) {
  const [activeAlbum, setActiveAlbum] = useState<string | null>(null);

  const filtered = activeAlbum
    ? items.filter((item) => item.album === activeAlbum)
    : items;

  return (
    <div>
      {albums.length > 0 && (
        <div className="mb-6 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveAlbum(null)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              activeAlbum === null
                ? "bg-slate-900 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            Semua
          </button>
          {albums
            .sort((a, b) => a.sortOrder - b.sortOrder)
            .map((album) => (
              <button
                key={album.id}
                onClick={() => setActiveAlbum(album.name)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  activeAlbum === album.name
                    ? "bg-slate-900 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {album.name}
              </button>
            ))}
        </div>
      )}
      <GalleryGrid items={filtered} />
    </div>
  );
}
