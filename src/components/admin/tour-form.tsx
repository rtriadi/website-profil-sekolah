"use client";

import { useActionState } from "react";
import { saveTourAction } from "@/lib/actions/tour-actions";

export function TourForm({ settings }: { settings: { imageUrl: string; title: string } }) {
  const [state, action, pending] = useActionState(saveTourAction, undefined);

  // Custom Input styling constants
  const inputClass = "w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 focus:outline-none placeholder-slate-400 shadow-sm";
  const labelClass = "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500";

  return (
    <form action={action} className="space-y-4 bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm max-w-lg">
      <div>
        <label className={labelClass}>Judul</label>
        <input
          name="title"
          defaultValue={settings.title}
          placeholder="Judul Virtual Tour..."
          className={inputClass}
        />
      </div>
      <div>
        <label className={labelClass}>URL Gambar Panorama 360</label>
        <input
          name="imageUrl"
          defaultValue={settings.imageUrl}
          placeholder="https://example.com/panorama.jpg"
          className={inputClass}
        />
        <p className="mt-1 text-[11px] text-slate-400 font-medium">Gunakan foto panorama 360 (lebar, aspect ratio 2:1)</p>
      </div>

      {state?.error && (
        <div className="rounded-xl border border-red-200 bg-red-50/80 p-3 text-xs font-semibold text-red-600 backdrop-blur-sm shadow-sm">
          {state.error}
        </div>
      )}
      {state?.success && (
        <div className="rounded-xl border border-green-200 bg-green-50/80 p-3 text-xs font-semibold text-green-700 backdrop-blur-sm shadow-sm">
          Disimpan!
        </div>
      )}

      <div className="flex justify-end pt-4 border-t border-slate-100 mt-6">
        <button
          type="submit"
          disabled={pending}
          className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 px-6 py-2.5 text-sm font-bold text-white shadow-md shadow-indigo-600/10 hover:from-indigo-700 hover:to-indigo-800 hover:shadow-indigo-600/20 active:scale-[0.98] transition-all disabled:opacity-50"
        >
          {pending ? "Menyimpan..." : "Simpan"}
        </button>
      </div>
    </form>
  );
}
