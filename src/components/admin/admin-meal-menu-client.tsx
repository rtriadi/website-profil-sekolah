"use client";

import { useActionState, useState } from "react";
import type { MealEntry } from "@/lib/content/schema";
import { saveMealMenuAction } from "@/lib/actions/meal-actions";

interface Props {
  items: MealEntry[];
}

let _counter = 0;
function nextId() {
  _counter++;
  return `meal-${Date.now()}-${_counter}`;
}

const dayOptions = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];

export function AdminMealMenuClient({ items }: Props) {
  const [state, action, pending] = useActionState(saveMealMenuAction, undefined);
  const [menu, setMenu] = useState<MealEntry[]>(items);

  function addItem() {
    setMenu((prev) => [
      ...prev,
      { id: nextId(), day: "", snack: "", main: "", drink: "" },
    ]);
  }

  function removeItem(id: string) {
    setMenu((prev) => prev.filter((item) => item.id !== id));
  }

  function updateItem(id: string, field: string, value: string) {
    setMenu((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
    );
  }

  return (
    <form
      action={action}
      onSubmit={() => {
        const hidden = document.querySelector<HTMLInputElement>("input[name='items']");
        if (hidden) hidden.value = JSON.stringify(menu);
      }}
      className="space-y-4"
    >
      <input type="hidden" name="items" />

      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-slate-900">{menu.length} Hari</h2>
        <button
          type="button"
          onClick={addItem}
          className="rounded-md bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-200"
        >
          + Tambah
        </button>
      </div>

      <div className="space-y-3">
        {menu.map((item) => (
          <div key={item.id} className="rounded-lg border border-slate-200 p-3">
            <div className="mb-2 flex items-start justify-between gap-2">
              <div className="flex-1 space-y-2">
                <select
                  value={item.day}
                  onChange={(e) => updateItem(item.id, "day", e.target.value)}
                  className="w-full rounded-md border border-slate-300 px-3 py-1.5 text-sm"
                >
                  <option value="">Pilih hari</option>
                  {dayOptions.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
                <div className="grid grid-cols-3 gap-2">
                  <input
                    value={item.snack}
                    onChange={(e) => updateItem(item.id, "snack", e.target.value)}
                    placeholder="Snack"
                    className="rounded-md border border-slate-300 px-3 py-1.5 text-sm"
                  />
                  <input
                    value={item.main}
                    onChange={(e) => updateItem(item.id, "main", e.target.value)}
                    placeholder="Menu utama"
                    className="rounded-md border border-slate-300 px-3 py-1.5 text-sm"
                  />
                  <input
                    value={item.drink}
                    onChange={(e) => updateItem(item.id, "drink", e.target.value)}
                    placeholder="Minuman"
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
          </div>
        ))}
      </div>

      {state?.error && <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">{state.error}</div>}
      {state?.success && <div className="rounded-md bg-green-50 p-3 text-sm text-green-600">Menu berhasil disimpan!</div>}

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
