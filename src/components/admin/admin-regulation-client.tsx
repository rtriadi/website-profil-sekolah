"use client";

import { useActionState, useState } from "react";
import type { RegulationSection } from "@/lib/content/schema";
import { saveRegulationsAction } from "@/lib/actions/regulation-actions";

interface Props {
  items: RegulationSection[];
}

let _counter = 0;
function nextId() {
  _counter++;
  return `reg-${Date.now()}-${_counter}`;
}

export function AdminRegulationClient({ items }: Props) {
  const [state, action, pending] = useActionState(saveRegulationsAction, undefined);
  const [sections, setSections] = useState<RegulationSection[]>(items);

  function addItem() {
    setSections((prev) => [
      ...prev,
      { id: nextId(), title: "", content: "", sortOrder: prev.length + 1 },
    ]);
  }

  function removeItem(id: string) {
    setSections((prev) => prev.filter((item) => item.id !== id));
  }

  function updateItem(id: string, field: string, value: string) {
    setSections((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
    );
  }

  return (
    <form
      action={action}
      onSubmit={() => {
        const hidden = document.querySelector<HTMLInputElement>("input[name='items']");
        if (hidden) hidden.value = JSON.stringify(sections);
      }}
      className="space-y-4"
    >
      <input type="hidden" name="items" />

      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-slate-900">{sections.length} Bagian</h2>
        <button
          type="button"
          onClick={addItem}
          className="rounded-md bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-200"
        >
          + Tambah
        </button>
      </div>

      <div className="space-y-3">
        {sections.map((item) => (
          <div key={item.id} className="rounded-lg border border-slate-200 p-3">
            <div className="mb-2 flex items-start justify-between gap-2">
              <input
                value={item.title}
                onChange={(e) => updateItem(item.id, "title", e.target.value)}
                placeholder="Judul bagian"
                className="flex-1 rounded-md border border-slate-300 px-3 py-1.5 text-sm"
              />
              <button
                type="button"
                onClick={() => removeItem(item.id)}
                className="rounded-md p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <textarea
              value={item.content}
              onChange={(e) => updateItem(item.id, "content", e.target.value)}
              placeholder="Isi aturan"
              rows={4}
              className="block w-full rounded-md border border-slate-300 px-3 py-1.5 text-sm"
            />
          </div>
        ))}
      </div>

      {state?.error && <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">{state.error}</div>}
      {state?.success && <div className="rounded-md bg-green-50 p-3 text-sm text-green-600">Aturan berhasil disimpan!</div>}

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
