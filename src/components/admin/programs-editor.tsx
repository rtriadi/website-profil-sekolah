"use client";

import { useActionState } from "react";
import { ToastStateWatcher } from "@/components/ui/toast";
import { addProgramAction, deleteProgramAction } from "@/lib/actions/profile-actions";
import type { SchoolProgram } from "@/lib/content/schema";

interface Props {
  programs: SchoolProgram[];
}

function AddProgramForm() {
  const [state, formAction, pending] = useActionState(addProgramAction, undefined);

  return (
    <form action={formAction} className="space-y-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
      <ToastStateWatcher state={state} successMessage="Program berhasil ditambahkan!" />
      <h3 className="text-sm font-semibold text-slate-900">Tambah Program</h3>
      <div>
        <input name="name" placeholder="Nama program" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none" />
      </div>
      <div>
        <textarea name="description" placeholder="Deskripsi" rows={2} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <input name="type" placeholder="Kategori (mis: Kelompok A, Tahfidz, dll)" className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none" />
        <input name="icon" placeholder="Icon (emoji)" className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none" />
      </div>
      <button type="submit" disabled={pending} className="rounded-lg bg-slate-900 px-4 py-1.5 text-sm font-medium text-white hover:bg-slate-700 disabled:opacity-50">
        {pending ? "Menambah..." : "Tambah"}
      </button>
    </form>
  );
}

export function AdminProgramsClient({ programs }: Props) {
  return (
    <div className="space-y-6">
      <AddProgramForm />

      <div className="space-y-2">
        {programs.map((p) => (
          <div key={p.slug} className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-3">
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-slate-900">
                {p.icon} {p.name}
              </p>
              <p className="text-xs text-slate-500">{p.type}</p>
            </div>
            <form action={deleteProgramAction.bind(null, p.slug)}>
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
