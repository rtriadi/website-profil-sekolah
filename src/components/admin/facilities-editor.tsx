"use client";

import { useActionState } from "react";
import { addFacilityAction, deleteFacilityAction } from "@/lib/actions/profile-actions";
import type { Facility } from "@/lib/content/schema";

interface Props {
  facilities: Facility[];
}

function AddFacilityForm() {
  const [state, formAction, pending] = useActionState(addFacilityAction, undefined);

  return (
    <form action={formAction} className="space-y-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
      <h3 className="text-sm font-semibold text-slate-900">Tambah Fasilitas</h3>
      <div>
        <input name="name" placeholder="Nama fasilitas" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none" />
      </div>
      <div>
        <textarea name="description" placeholder="Deskripsi" rows={2} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none" />
      </div>
      <div>
        <select name="category" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none">
          <option value="Laboratorium">Laboratorium</option>
          <option value="Perpustakaan">Perpustakaan</option>
          <option value="Olahraga">Olahraga</option>
          <option value="Kesenian">Kesenian</option>
          <option value="Ibadah">Ibadah</option>
          <option value="Kesehatan">Kesehatan</option>
          <option value="Lainnya">Lainnya</option>
        </select>
      </div>
      {state?.error && <p className="text-xs text-red-500">{state.error}</p>}
      <button type="submit" disabled={pending} className="rounded-lg bg-slate-900 px-4 py-1.5 text-sm font-medium text-white hover:bg-slate-700 disabled:opacity-50">
        {pending ? "Menambah..." : "Tambah"}
      </button>
    </form>
  );
}

export function AdminFacilitiesClient({ facilities }: Props) {
  return (
    <div className="space-y-6">
      <AddFacilityForm />

      <div className="space-y-2">
        {facilities.map((f) => (
          <div key={f.slug} className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-3">
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-slate-900">{f.name}</p>
              <p className="text-xs text-slate-500">{f.category}</p>
            </div>
            <form action={deleteFacilityAction.bind(null, f.slug)}>
              <button type="submit" className="rounded-md bg-red-50 px-3 py-1 text-xs font-medium text-red-600 hover:bg-red-100">
                Hapus
              </button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
