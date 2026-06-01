"use client";

import { useActionState, useState } from "react";
import type { HeroSlide } from "@/lib/content/schema";
import { saveHeroSlidesAction } from "@/lib/actions/hero-slides-actions";
import { ToastStateWatcher } from "@/components/ui/toast";

interface Props {
  initialSlides: HeroSlide[];
}

let _counter = 0;
function nextId() {
  _counter++;
  return `slide-${Date.now()}-${_counter}`;
}

export function AdminHeroSlidesClient({ initialSlides }: Props) {
  const [state, action, pending] = useActionState(saveHeroSlidesAction, undefined);
  const [slides, setSlides] = useState<HeroSlide[]>(initialSlides);

  const addSlide = () => {
    setSlides((prev) => [
      ...prev,
      {
        id: nextId(),
        src: "/images/hero-classroom.png", // default fallback
        title: "",
        description: "",
        sortOrder: prev.length + 1,
      },
    ]);
  };

  const removeSlide = (id: string) => {
    setSlides((prev) => {
      const filtered = prev.filter((s) => s.id !== id);
      // Re-map sort orders
      return filtered.map((s, idx) => ({ ...s, sortOrder: idx + 1 }));
    });
  };

  const updateSlide = (id: string, field: keyof HeroSlide, value: string) => {
    setSlides((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    );
  };

  const moveUp = (idx: number) => {
    if (idx === 0) return;
    setSlides((prev) => {
      const copy = [...prev];
      const temp = copy[idx];
      copy[idx] = copy[idx - 1];
      copy[idx - 1] = temp;
      return copy.map((s, i) => ({ ...s, sortOrder: i + 1 }));
    });
  };

  const moveDown = (idx: number) => {
    if (idx === slides.length - 1) return;
    setSlides((prev) => {
      const copy = [...prev];
      const temp = copy[idx];
      copy[idx] = copy[idx + 1];
      copy[idx + 1] = temp;
      return copy.map((s, i) => ({ ...s, sortOrder: i + 1 }));
    });
  };

  return (
    <form
      action={action}
      onSubmit={() => {
        const hidden = document.querySelector<HTMLInputElement>("input[name='items']");
        if (hidden) hidden.value = JSON.stringify(slides);
      }}
      className="space-y-6"
    >
      <input type="hidden" name="items" />

      {/* Control Header Bar */}
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-4">
        <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200 tracking-tight flex items-center gap-2">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-100 dark:bg-white/5 text-[10px]">
            📸
          </span>
          {slides.length} Slide Carousel
        </h2>
        <button
          type="button"
          onClick={addSlide}
          className="group inline-flex items-center gap-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 px-4 py-2 text-xs font-bold text-indigo-650 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-500/20 transition-all active:scale-[0.97]"
        >
          <span>+ Tambah Slide Baru</span>
        </button>
      </div>

      {/* Dynamic Slide List Grid */}
      <div className="space-y-4">
        {slides.map((slide, idx) => (
          <div
            key={slide.id}
            className="rounded-2xl border border-slate-200/85 dark:border-white/5 bg-white dark:bg-slate-900/30 p-5 shadow-sm hover:border-indigo-500/20 dark:hover:border-indigo-500/20 transition-all duration-300 grid grid-cols-1 md:grid-cols-12 gap-5 items-start"
          >
            {/* Slide Preview Column */}
            <div className="md:col-span-3 space-y-3">
              <div className="aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-950 border border-slate-200/50 dark:border-white/5 flex items-center justify-center shadow-inner relative group/preview">
                {slide.src ? (
                  <img
                    src={slide.src}
                    alt="Preview"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover/preview:scale-105"
                    onError={(e) => {
                      // Fallback placeholder image on error
                      e.currentTarget.src = "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=400";
                    }}
                  />
                ) : (
                  <span className="text-[10px] font-bold text-slate-400 uppercase">No Image</span>
                )}
                <div className="absolute top-2 left-2 rounded-lg bg-slate-950/60 px-2 py-0.5 text-[9px] font-bold text-white backdrop-blur-sm">
                  Slide {idx + 1}
                </div>
              </div>

              {/* Order sorting controls */}
              <div className="flex gap-1.5 justify-center">
                <button
                  type="button"
                  onClick={() => moveUp(idx)}
                  disabled={idx === 0}
                  className="flex-1 py-1 text-center rounded-lg bg-slate-50 hover:bg-slate-100 dark:bg-white/5 dark:hover:bg-white/10 text-xs font-bold text-slate-600 dark:text-slate-300 disabled:opacity-30 disabled:pointer-events-none transition-colors border border-slate-200/30 dark:border-white/5"
                  title="Pindah ke Atas"
                >
                  ▲
                </button>
                <button
                  type="button"
                  onClick={() => moveDown(idx)}
                  disabled={idx === slides.length - 1}
                  className="flex-1 py-1 text-center rounded-lg bg-slate-50 hover:bg-slate-100 dark:bg-white/5 dark:hover:bg-white/10 text-xs font-bold text-slate-600 dark:text-slate-300 disabled:opacity-30 disabled:pointer-events-none transition-colors border border-slate-200/30 dark:border-white/5"
                  title="Pindah ke Bawah"
                >
                  ▼
                </button>
              </div>
            </div>

            {/* Slide Fields Column */}
            <div className="md:col-span-9 space-y-4">
              {/* Header Info */}
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-650 dark:text-indigo-400">
                  Slide Konfigurasi
                </span>
                <button
                  type="button"
                  onClick={() => removeSlide(slide.id)}
                  className="rounded-xl p-2 text-slate-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 hover:text-rose-600 transition-colors shrink-0"
                  title="Hapus slide ini"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Grid fields */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-450 dark:text-slate-500">
                    URL / Path Gambar
                  </label>
                  <input
                    type="text"
                    value={slide.src}
                    onChange={(e) => updateSlide(slide.id, "src", e.target.value)}
                    placeholder="Contoh: /images/nama-file.png atau tautan HTTPS"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-450 dark:text-slate-500">
                    Judul Slide
                  </label>
                  <input
                    type="text"
                    value={slide.title}
                    onChange={(e) => updateSlide(slide.id, "title", e.target.value)}
                    placeholder="Contoh: Ruang Belajar Modern..."
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-450 dark:text-slate-500">
                  Deskripsi / Keterangan Slide
                </label>
                <textarea
                  value={slide.description}
                  onChange={(e) => updateSlide(slide.id, "description", e.target.value)}
                  placeholder="Tuliskan keterangan detail slide di sini..."
                  rows={2}
                />
              </div>
            </div>

          </div>
        ))}

        {slides.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-350 dark:border-white/10 bg-slate-50/50 dark:bg-slate-950/10 p-12 text-center">
            <p className="text-sm font-semibold text-slate-400">Belum ada slide. Klik + Tambah Slide Baru untuk memulai.</p>
          </div>
        )}
      </div>

      <ToastStateWatcher state={state} successMessage="Carousel Beranda berhasil diperbarui secara aman!" />

      {/* Submit footer */}
      <div className="flex justify-end pt-4 border-t border-slate-100 dark:border-white/5">
        <button
          type="submit"
          disabled={pending}
          className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 px-6 py-2.5 text-sm font-bold text-white shadow-md shadow-indigo-600/10 hover:from-indigo-700 hover:to-indigo-800 hover:shadow-indigo-600/20 active:scale-[0.98] transition-all disabled:opacity-50"
        >
          {pending ? (
            <>
              <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span>Menyimpan...</span>
            </>
          ) : (
            "Simpan Slide"
          )}
        </button>
      </div>

    </form>
  );
}
