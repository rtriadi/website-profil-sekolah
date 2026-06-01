"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import type { MediaItem } from "@/lib/content/media-service";

interface Props {
  items: MediaItem[];
}

export function GalleryGrid({ items }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const close = useCallback(() => setOpenIndex(null), []);
  const prev = useCallback(
    () =>
      setOpenIndex((i) =>
        i !== null ? (i - 1 + items.length) % items.length : null,
      ),
    [items.length],
  );
  const next = useCallback(
    () =>
      setOpenIndex((i) =>
        i !== null ? (i + 1) % items.length : null,
      ),
    [items.length],
  );

  useEffect(() => {
    if (openIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [openIndex, close, prev, next]);

  if (items.length === 0) {
    return (
      <div className="rounded-lg border border-slate-200 bg-white p-12 text-center">
        <p className="text-slate-500">Belum ada galeri.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {items.map((item, index) => (
          <button
            key={item.id}
            onClick={() => setOpenIndex(index)}
            className="group relative overflow-hidden rounded-lg border border-slate-200 bg-white text-left focus:outline-none focus:ring-2 focus:ring-slate-900"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <Image
                src={item.url}
                alt={item.altText}
                width={400}
                height={300}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="truncate px-2 py-1.5 text-xs text-slate-600">
              {item.altText}
            </div>
          </button>
        ))}
      </div>

      {openIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={close}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              close();
            }}
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            aria-label="Tutup"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            aria-label="Sebelumnya"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div
            className="relative max-h-[85vh] max-w-[90vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={items[openIndex].url}
              alt={items[openIndex].altText}
              width={1200}
              height={900}
              className="max-h-[85vh] rounded-lg object-contain"
              style={{ width: "auto", height: "auto" }}
              priority
            />
            <p className="mt-2 text-center text-sm text-white/70">
              {openIndex + 1} / {items.length}
            </p>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            aria-label="Berikutnya"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}
