"use client";

import { useState } from "react";
import type { MediaItem } from "@/lib/content/media-service";
import type { GalleryAlbum } from "@/lib/content/gallery-album-service";
import { GalleryGrid } from "./gallery-grid";

const ITEMS_PER_PAGE = 24;

interface Props {
  items: MediaItem[];
  albums: GalleryAlbum[];
}

export function GalleryClient({ items, albums }: Props) {
  const [activeAlbum, setActiveAlbum] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const filtered = activeAlbum
    ? items.filter((item) => item.album === activeAlbum)
    : items;

  const displayed = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  function handleLoadMore() {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  }

  function handleAlbumClick(album: string | null) {
    setActiveAlbum(album);
    setVisibleCount(ITEMS_PER_PAGE);
  }

  return (
    <div>
      {albums.length > 0 && (
        <div className="mb-6 flex flex-wrap gap-2">
          <button
            onClick={() => handleAlbumClick(null)}
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
                onClick={() => handleAlbumClick(album.name)}
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
      <GalleryGrid items={displayed} />

      {hasMore && (
        <div className="mt-8 text-center">
          <button
            onClick={handleLoadMore}
            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-bold text-white shadow-sm hover:bg-slate-700 transition-colors"
          >
            Muat Lebih Banyak
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      )}

      <p className="mt-4 text-center text-xs text-slate-400">
        Menampilkan {displayed.length} dari {filtered.length} foto
      </p>
    </div>
  );
}
