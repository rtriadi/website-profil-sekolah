"use client";

import { useActionState } from "react";
import type { SchoolEvent } from "@/lib/content/schema";
import Link from "next/link";

const categoryLabel: Record<string, string> = {
  akademik: "Akademik",
  "non-akademik": "Non Akademik",
  libur: "Libur",
  rapat: "Rapat",
  lainnya: "Lainnya",
};

interface Props {
  action: (
    prev: unknown,
    formData: FormData,
  ) => Promise<{ fieldErrors?: Record<string, string>; error?: string }>;
  initialData?: SchoolEvent;
}

export function EventForm({ action, initialData }: Props) {
  const [state, formAction, pending] = useActionState(action, undefined);

  return (
    <form action={formAction} className="space-y-5">
      <div>
        <label htmlFor="title" className="mb-1 block text-sm font-medium text-slate-700">Judul</label>
        <input id="title" name="title" defaultValue={initialData?.title} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none" />
        {state?.fieldErrors?.title && <p className="mt-1 text-xs text-red-500">{state.fieldErrors.title}</p>}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="date" className="mb-1 block text-sm font-medium text-slate-700">Tanggal</label>
          <input id="date" name="date" type="date" defaultValue={initialData?.date} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none" />
          {state?.fieldErrors?.date && <p className="mt-1 text-xs text-red-500">{state.fieldErrors.date}</p>}
        </div>
        <div>
          <label htmlFor="time" className="mb-1 block text-sm font-medium text-slate-700">Waktu (opsional)</label>
          <input id="time" name="time" defaultValue={initialData?.time ?? ""} placeholder="08:00 - 12:00" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none" />
        </div>
      </div>

      <div>
        <label htmlFor="location" className="mb-1 block text-sm font-medium text-slate-700">Lokasi (opsional)</label>
        <input id="location" name="location" defaultValue={initialData?.location ?? ""} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none" />
      </div>

      <div>
        <label htmlFor="category" className="mb-1 block text-sm font-medium text-slate-700">Kategori</label>
        <select id="category" name="category" defaultValue={initialData?.category ?? "akademik"} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none">
          {Object.entries(categoryLabel).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="description" className="mb-1 block text-sm font-medium text-slate-700">Deskripsi</label>
        <textarea id="description" name="description" rows={4} defaultValue={initialData?.description} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none" />
        {state?.fieldErrors?.description && <p className="mt-1 text-xs text-red-500">{state.fieldErrors.description}</p>}
      </div>

      {state?.error && <p className="text-sm text-red-500">{state.error}</p>}

      <div className="flex items-center gap-3">
        <button type="submit" disabled={pending} className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700 disabled:opacity-50">
          {pending ? "Menyimpan..." : "Simpan"}
        </button>
        <Link href="/admin/events" className="text-sm font-medium text-slate-600 hover:text-slate-900">Batal</Link>
      </div>
    </form>
  );
}
