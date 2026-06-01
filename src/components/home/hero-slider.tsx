"use client";

import { useState, useEffect } from "react";
import type { HeroSlide } from "@/lib/content/schema";

interface HeroSliderProps {
  slides: HeroSlide[];
}

export function HeroSlider({ slides }: HeroSliderProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    if (slides.length === 0) return;
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    if (slides.length === 0) return;
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  if (slides.length === 0) return null;

  return (
    <div className="relative w-full max-w-[480px] aspect-[4/3] rounded-3xl overflow-hidden group shadow-2xl dark:shadow-indigo-500/5 border border-slate-200/80 dark:border-white/10">
      
      {/* Background radial glow */}
      <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500 to-sky-400 opacity-20 blur-xl rounded-3xl pointer-events-none group-hover:scale-105 transition-transform duration-500" />

      {/* Main Slides Container */}
      <div className="relative w-full h-full rounded-3xl overflow-hidden bg-slate-900/50">
        {slides.map((slide, idx) => {
          const isActive = idx === current;
          return (
            <div
              key={slide.id || idx}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              {/* Image element with modern zoom effect */}
              <img
                src={slide.src}
                alt={slide.title}
                className={`w-full h-full object-cover transition-transform duration-[6000ms] ease-out ${
                  isActive ? "scale-105" : "scale-100"
                }`}
                loading="eager"
              />

              {/* Elegant Glassmorphic Bottom Caption */}
              <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-slate-950/80 via-slate-950/50 to-transparent text-white backdrop-blur-[2px]">
                <span className="inline-block rounded-full bg-indigo-500/20 border border-indigo-500/30 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-indigo-300 mb-2">
                  Kilas Info
                </span>
                <h3 className="font-heading text-base font-extrabold tracking-tight">
                  {slide.title}
                </h3>
                {slide.description && (
                  <p className="text-[10px] text-slate-300 font-semibold leading-relaxed mt-1 line-clamp-2">
                    {slide.description}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Slide Navigation Chevrons */}
      {slides.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            type="button"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 h-9 w-9 rounded-full bg-slate-950/40 hover:bg-slate-950/60 text-white flex items-center justify-center backdrop-blur-md opacity-0 group-hover:opacity-100 hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg border border-white/5"
            aria-label="Slide sebelumnya"
          >
            <span className="text-sm font-bold">&larr;</span>
          </button>

          <button
            onClick={nextSlide}
            type="button"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 h-9 w-9 rounded-full bg-slate-950/40 hover:bg-slate-950/60 text-white flex items-center justify-center backdrop-blur-md opacity-0 group-hover:opacity-100 hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg border border-white/5"
            aria-label="Slide berikutnya"
          >
            <span className="text-sm font-bold">&rarr;</span>
          </button>

          {/* Bottom Progress Bar indicators */}
          <div className="absolute bottom-5 right-5 z-20 flex gap-1.5 bg-slate-950/40 px-3 py-1.5 rounded-full border border-white/5 backdrop-blur-md">
            {slides.map((_, idx) => {
              const isActive = idx === current;
              return (
                <button
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    isActive ? "w-4 bg-indigo-400" : "w-1.5 bg-white/40 hover:bg-white/60"
                  }`}
                  aria-label={`Lihat slide ke-${idx + 1}`}
                />
              );
            })}
          </div>
        </>
      )}

    </div>
  );
}
