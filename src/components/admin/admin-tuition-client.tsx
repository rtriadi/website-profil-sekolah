"use client";

import { useActionState, useState } from "react";
import { ToastStateWatcher } from "@/components/ui/toast";
import type { TuitionData, TuitionItem } from "@/lib/content/schema";
import { saveTuitionAction } from "@/lib/actions/tuition-actions";

interface Props {
  data: TuitionData;
}

let _counter = 0;
function nextId() {
  _counter++;
  return `tui-${Date.now()}-${_counter}`;
}

export function AdminTuitionClient({ data }: Props) {
  const [state, action, pending] = useActionState(saveTuitionAction, undefined);
  const [items, setItems] = useState<TuitionItem[]>(data.items);
  const [academicYear, setAcademicYear] = useState(data.academicYear);

  function addItem() {
    setItems((prev) => [
      ...prev,
      { id: nextId(), label: "", amount: 0, description: "", sortOrder: prev.length + 1 },
    ]);
  }

  function removeItem(id: string) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  function updateItem(id: string, field: string, value: string | number) {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
    );
  }

  function formatRp(n: number) {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(n);
  }

  return (
    <form
      action={action}
      onSubmit={() => {
        const hidden = document.querySelector<HTMLInputElement>("input[name='data']");
        if (hidden) hidden.value = JSON.stringify({ academicYear, items });
      }}
      className="space-y-4"
    >
      <ToastStateWatcher state={state} successMessage="Biaya berhasil disimpan!" />
      <input type="hidden" name="data" />

      <div>
        <label className="block text-sm font-medium text-slate-700">Tahun Ajaran</label>
        <input
          value={academicYear}
          onChange={(e) => setAcademicYear(e.target.value)}
          placeholder="cth: 2025/2026"
          className="mt-1 w-full rounded-md border border-slate-300 px-3 py-1.5 text-sm"
        />
      </div>

      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-slate-900">{items.length} Item Biaya</h2>
        <button
          type="button"
          onClick={addItem}
          className="rounded-md bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-200"
        >
          + Tambah
        </button>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="rounded-lg border border-slate-200 p-3">
            <div className="mb-2 flex items-start justify-between gap-2">
              <div className="flex-1 space-y-2">
                <input
                  value={item.label}
                  onChange={(e) => updateItem(item.id, "label", e.target.value)}
                  placeholder="Nama biaya"
                  className="w-full rounded-md border border-slate-300 px-3 py-1.5 text-sm"
                />
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs text-slate-500">Jumlah (Rp)</label>
                    <input
                      type="number"
                      value={item.amount}
                      onChange={(e) => updateItem(item.id, "amount", parseInt(e.target.value) || 0)}
                      className="w-full rounded-md border border-slate-300 px-3 py-1.5 text-sm"
                    />
                  </div>
                  <input
                    value={item.description || ""}
                    onChange={(e) => updateItem(item.id, "description", e.target.value)}
                    placeholder="Keterangan (opsional)"
                    className="rounded-md border border-slate-300 px-3 py-1.5 text-sm"
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={() => removeItem(item.id)}
                className="rounded-md p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            {item.amount > 0 && (
              <p className="text-xs text-slate-500">Tampilan: {item.label} &mdash; {formatRp(item.amount)}</p>
            )}
          </div>
        ))}
      </div>

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
