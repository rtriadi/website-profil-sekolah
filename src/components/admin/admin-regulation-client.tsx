"use client";

import { useActionState, useState } from "react";
import type { RegulationSection } from "@/lib/content/schema";
import { saveRegulationsAction } from "@/lib/actions/regulation-actions";
import { ToastStateWatcher } from "@/components/ui/toast";

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
      className="space-y-6"
    >
      <input type="hidden" name="items" />

      <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-4 mb-4">
        <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200 tracking-tight flex items-center gap-2">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-100 dark:bg-white/5 text-[10px]">
            📌
          </span>
          {sections.length} Bagian Aturan
        </h2>
        <button
          type="button"
          onClick={addItem}
          className="group inline-flex items-center gap-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 px-4 py-2 text-xs font-bold text-indigo-600 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-500/20 transition-all active:scale-[0.97]"
        >
          <span>+ Tambah Aturan</span>
        </button>
      </div>

      <div className="space-y-4">
        {sections.map((item) => (
          <div key={item.id} className="rounded-2xl border border-slate-200/85 dark:border-white/5 bg-white dark:bg-slate-900/30 p-5 shadow-sm hover:border-indigo-500/20 dark:hover:border-indigo-500/20 transition-all duration-300 space-y-4">
            <div className="flex items-center justify-between gap-4 border-b border-slate-100 dark:border-white/5 pb-3">
              <div className="flex items-center gap-2 flex-1">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-50 dark:bg-indigo-500/10 text-xs text-indigo-650 dark:text-indigo-300 font-bold shrink-0">
                  📋
                </span>
                <input
                  value={item.title}
                  onChange={(e) => updateItem(item.id, "title", e.target.value)}
                  placeholder="Contoh: Jam Masuk Sekolah, Kerapian Seragam..."
                  className="w-full bg-transparent border-none focus:outline-none focus:ring-0 text-sm font-bold text-slate-900 dark:text-white placeholder-slate-400"
                />
              </div>
              <button
                type="button"
                onClick={() => removeItem(item.id)}
                className="rounded-xl p-2 text-slate-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 hover:text-rose-600 transition-colors shrink-0"
                title="Hapus bagian ini"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Isi Kebijakan / Aturan Lengkap
              </label>
              <textarea
                value={item.content}
                onChange={(e) => updateItem(item.id, "content", e.target.value)}
                placeholder="Tuliskan butir-butir aturan secara lengkap di sini..."
                rows={4}
                className="w-full text-slate-700 dark:text-slate-300 leading-relaxed placeholder-slate-400"
              />
            </div>
          </div>
        ))}
      </div>

      <ToastStateWatcher state={state} successMessage="Aturan berhasil disimpan secara aman!" />

      <div className="flex justify-end pt-4 border-t border-slate-100 dark:border-white/5">
        <button
          type="submit"
          disabled={pending}
          className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 px-6 py-2.5 text-sm font-bold text-white shadow-md shadow-indigo-600/10 hover:from-indigo-700 hover:to-indigo-800 hover:shadow-indigo-600/20 active:scale-[0.98] transition-all disabled:opacity-50"
        >
          {pending ? (
            <>
              <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span>Menyimpan...</span>
            </>
          ) : (
            "Simpan Aturan"
          )}
        </button>
      </div>
    </form>
  );
}
