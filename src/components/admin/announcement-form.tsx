"use client";

import { useActionState } from "react";
import { ToastStateWatcher } from "@/components/ui/toast";
import type { Announcement } from "@/lib/content/schema";
import Link from "next/link";

interface Props {
  action: (
    prev: unknown,
    formData: FormData,
  ) => Promise<{ fieldErrors?: Record<string, string>; error?: string }>;
  initialData?: Announcement;
}

export function AnnouncementForm({ action, initialData }: Props) {
  const [state, formAction, pending] = useActionState(action, undefined);

  // Custom Input styling constants
  const inputClass = "w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 focus:outline-none placeholder-slate-400 shadow-sm";
  const labelClass = "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500";

  return (
    <form action={formAction} className="space-y-6 bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm max-w-4xl">
      <ToastStateWatcher state={state} successMessage="Pengumuman berhasil disimpan!" />
      <div>
        <label htmlFor="title" className={labelClass}>
          Judul Pengumuman
        </label>
        <input
          id="title"
          name="title"
          type="text"
          defaultValue={initialData?.title}
          placeholder="Masukkan judul pengumuman menarik..."
          className={inputClass}
        />
        {state?.fieldErrors?.title && (
          <p className="mt-1.5 text-xs font-semibold text-red-500">{state.fieldErrors.title}</p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="slug" className={labelClass}>
            Slug URL (Kosongkan untuk otomatis)
          </label>
          <input
            id="slug"
            name="slug"
            type="text"
            defaultValue={initialData?.slug}
            placeholder="contoh: judul-pengumuman-baru"
            className={inputClass}
          />
          {state?.fieldErrors?.slug && (
            <p className="mt-1.5 text-xs font-semibold text-red-500">{state.fieldErrors.slug}</p>
          )}
        </div>

        <div>
          <label htmlFor="category" className={labelClass}>
            Kategori Konten
          </label>
          <select
            id="category"
            name="category"
            defaultValue={initialData?.category ?? "pengumuman"}
            className={inputClass}
          >
            <option value="berita">Berita Resmi</option>
            <option value="kegiatan">Kegiatan Sekolah</option>
            <option value="pengumuman">Pengumuman Penting</option>
          </select>
          {state?.fieldErrors?.category && (
            <p className="mt-1.5 text-xs font-semibold text-red-500">
              {state.fieldErrors.category}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="scheduledAt" className={labelClass}>
            Jadwalkan Tayang (Opsional)
          </label>
          <input
            id="scheduledAt"
            name="scheduledAt"
            type="date"
            defaultValue={initialData?.scheduledAt ? initialData.scheduledAt.slice(0, 10) : ""}
            className={inputClass}
          />
          <p className="mt-1 text-[11px] text-slate-400 font-medium">Kosongi untuk langsung ditayangkan</p>
        </div>
        <div className="flex items-center sm:pb-3 pl-1">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              name="spotlight"
              defaultChecked={initialData?.spotlight ?? false}
              className="h-4.5 w-4.5 rounded-md border-slate-300 text-indigo-600 focus:ring-indigo-500 transition-all cursor-pointer"
            />
            <div className="flex flex-col">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600 group-hover:text-slate-800 transition-colors">Tampilkan di Beranda</span>
              <span className="text-[10px] text-slate-400 font-medium">Beri tanda bintang agar tampil sebagai banner utama</span>
            </div>
          </label>
        </div>
      </div>

      <div>
        <label htmlFor="summary" className={labelClass}>
          Ringkasan Singkat
        </label>
        <textarea
          id="summary"
          name="summary"
          rows={2}
          defaultValue={initialData?.summary}
          placeholder="Ringkasan singkat untuk tampilan kartu di beranda (maks 2 kalimat)..."
          className={inputClass}
        />
        {state?.fieldErrors?.summary && (
          <p className="mt-1.5 text-xs font-semibold text-red-500">
            {state.fieldErrors.summary}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="content" className={labelClass}>
          Isi Konten Lengkap (Format Markdown Didukung)
        </label>
        <textarea
          id="content"
          name="content"
          rows={10}
          defaultValue={initialData?.content}
          placeholder="Tulis artikel atau detail pengumuman di sini..."
          className={`${inputClass} font-mono leading-relaxed`}
        />
        {state?.fieldErrors?.content && (
          <p className="mt-1.5 text-xs font-semibold text-red-500">
            {state.fieldErrors.content}
          </p>
        )}
      </div>

      {/* Form Action Controls */}
      <div className="flex items-center gap-3 pt-6 border-t border-slate-100">
        <button
          type="submit"
          disabled={pending}
          className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 px-6 py-2.5 text-sm font-bold text-white shadow-md shadow-indigo-600/10 hover:from-indigo-700 hover:to-indigo-800 hover:shadow-indigo-600/20 active:scale-[0.98] transition-all disabled:opacity-50"
        >
          {pending ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Menyimpan...
            </>
          ) : (
            "Simpan Konten"
          )}
        </button>
        <Link
          href="/admin/announcements"
          className="inline-flex items-center justify-center rounded-xl bg-slate-100 px-6 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-200 transition-all active:scale-[0.98]"
        >
          Batal
        </Link>
      </div>
    </form>
  );
}

