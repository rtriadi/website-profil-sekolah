"use client";

import { useActionState, useState } from "react";
import type { Extracurricular } from "@/lib/content/schema";
import { saveExtracurricularsAction } from "@/lib/actions/extracurricular-actions";
import { ToastStateWatcher } from "@/components/ui/toast";

interface Props {
  items: Extracurricular[];
}

let _counter = 0;
function nextId() {
  _counter++;
  return `eks-${Date.now()}-${_counter}`;
}

export function AdminExtracurricularClient({ items }: Props) {
  const [state, action, pending] = useActionState(saveExtracurricularsAction, undefined);
  const [extras, setExtras] = useState<Extracurricular[]>(items);

  function addItem() {
    setExtras((prev) => [
      ...prev,
      { id: nextId(), name: "", description: "", schedule: "", coach: "", icon: "", sortOrder: prev.length + 1 },
    ]);
  }

  function removeItem(id: string) {
    setExtras((prev) => prev.filter((item) => item.id !== id));
  }

  function updateItem(id: string, field: string, value: string) {
    setExtras((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
    );
  }

  return (
    <form
      action={action}
      onSubmit={() => {
        const hidden = document.querySelector<HTMLInputElement>("input[name='items']");
        if (hidden) hidden.value = JSON.stringify(extras);
      }}
      className="space-y-4"
    >
      <input type="hidden" name="items" />

      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-slate-900">{extras.length} Ekstrakurikuler</h2>
        <button
          type="button"
          onClick={addItem}
          className="rounded-md bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-200"
        >
          + Tambah
        </button>
      </div>

      <div className="space-y-3">
        {extras.map((item) => (
          <div key={item.id} className="rounded-lg border border-slate-200 p-3">
            <div className="mb-2 flex items-start justify-between gap-2">
              <div className="flex-1 space-y-2">
                <div className="grid grid-cols-4 gap-2">
                  <input
                    value={item.icon}
                    onChange={(e) => updateItem(item.id, "icon", e.target.value)}
                    placeholder="Icon (emoji)"
                    className="rounded-md border border-slate-300 px-3 py-1.5 text-sm"
                  />
                  <input
                    value={item.name}
                    onChange={(e) => updateItem(item.id, "name", e.target.value)}
                    placeholder="Nama"
                    className="col-span-3 rounded-md border border-slate-300 px-3 py-1.5 text-sm"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    value={item.schedule}
                    onChange={(e) => updateItem(item.id, "schedule", e.target.value)}
                    placeholder="Jadwal (cth: Senin, 14.00-15.00)"
                    className="rounded-md border border-slate-300 px-3 py-1.5 text-sm"
                  />
                  <input
                    value={item.coach}
                    onChange={(e) => updateItem(item.id, "coach", e.target.value)}
                    placeholder="Pembimbing"
                    className="rounded-md border border-slate-300 px-3 py-1.5 text-sm"
                  />
                </div>
                <textarea
                  value={item.description}
                  onChange={(e) => updateItem(item.id, "description", e.target.value)}
                  placeholder="Deskripsi"
                  rows={2}
                  className="block w-full rounded-md border border-slate-300 px-3 py-1.5 text-sm"
                />
              </div>
              <button
                type="button"
                onClick={() => removeItem(item.id)}
                className="rounded-md p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      <ToastStateWatcher state={state} successMessage="Ekstrakurikuler berhasil disimpan!" />

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={pending}
          className="rounded-md bg-slate-900 px-6 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-50"
        >
          {pending ? "Menyimpan..." : "Simpan"}
        </button>
      </div>
    </form>
  );
}
